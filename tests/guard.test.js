// Checks the Guard safety layer: safe storage, the wrong-code limiter, throttling and error reporting.
import { beforeAll, describe, expect, it, vi } from "vitest";

let Guard;
beforeAll(async () => {
  await import("../guard.js"); // a classic script: it puts Guard on globalThis
  Guard = globalThis.Guard;
});

// A Storage that behaves like a real one, or throws like a blocked one
function memoryStorage() {
  const data = new Map();
  return {
    getItem: key => (data.has(key) ? data.get(key) : null),
    setItem: (key, value) => data.set(key, String(value)),
    removeItem: key => data.delete(key),
  };
}
const blockedStorage = {
  getItem() { throw new Error("blocked"); },
  setItem() { throw new Error("blocked"); },
  removeItem() { throw new Error("blocked"); },
};

describe("createStore", () => {
  it("saves and reads JSON", () => {
    const store = Guard.createStore(memoryStorage());
    expect(store.setJSON("a", ["x"])).toBe(true);
    expect(store.getJSON("a", [])).toEqual(["x"]);
  });

  it("gives the fallback for damaged JSON", () => {
    const storage = memoryStorage();
    storage.setItem("a", "{not json");
    expect(Guard.createStore(storage).getJSON("a", "fallback")).toBe("fallback");
  });

  it("gives the fallback when the validator refuses the value", () => {
    const storage = memoryStorage();
    storage.setItem("a", JSON.stringify({ plans: "oops" }));
    const store = Guard.createStore(storage);
    expect(store.getJSON("a", [], Array.isArray)).toEqual([]);
  });

  it("refuses to save or read values that are too big", () => {
    const store = Guard.createStore(memoryStorage(), { maxLength: 10 });
    expect(store.setString("a", "x".repeat(11))).toBe(false);
    expect(store.getString("a", "none")).toBe("none");
  });

  it("keeps working for the visit when storage is blocked", () => {
    const store = Guard.createStore(blockedStorage);
    expect(store.setString("a", "yes")).toBe(false); // not saved for later...
    expect(store.getString("a", "no")).toBe("yes"); // ...but remembered for now
    expect(() => store.remove("a")).not.toThrow();
    expect(store.getString("a", "no")).toBe("no");
  });

  it("works with no storage at all", () => {
    const store = Guard.createStore(null);
    expect(store.getJSON("x", 7)).toBe(7);
  });
});

describe("createLimiter", () => {
  function limiterAt(clock, options) {
    return Guard.createLimiter("test", Guard.createStore(memoryStorage()), { now: () => clock.t, ...options });
  }

  it("allows a few wrong tries, then locks", () => {
    const clock = { t: 1000 };
    const limiter = limiterAt(clock, { max: 3, lockMs: 30000 });
    expect(limiter.fail()).toBe(0);
    expect(limiter.fail()).toBe(0);
    expect(limiter.fail()).toBe(30000); // third wrong try locks
    expect(limiter.waitMs()).toBe(30000);
    clock.t += 10000;
    expect(limiter.waitMs()).toBe(20000);
    clock.t += 20000;
    expect(limiter.waitMs()).toBe(0);
  });

  it("doubles the pause each time, up to a ceiling", () => {
    const clock = { t: 0 };
    const limiter = limiterAt(clock, { max: 1, lockMs: 1000, maxLockMs: 3000 });
    expect(limiter.fail()).toBe(1000);
    clock.t += 5000;
    expect(limiter.fail()).toBe(2000);
    clock.t += 5000;
    expect(limiter.fail()).toBe(3000);
    clock.t += 5000;
    expect(limiter.fail()).toBe(3000);
  });

  it("forgets old mistakes outside the window", () => {
    const clock = { t: 0 };
    const limiter = limiterAt(clock, { max: 2, windowMs: 1000 });
    limiter.fail();
    clock.t += 5000;
    expect(limiter.fail()).toBe(0); // the first one has expired
  });

  it("clears everything after a success", () => {
    const clock = { t: 0 };
    const limiter = limiterAt(clock, { max: 1, lockMs: 1000 });
    limiter.fail();
    limiter.succeed();
    expect(limiter.waitMs()).toBe(0);
    expect(limiter.fail()).toBe(1000); // back to the first lock, not the doubled one
  });

  it("survives tampered saved state", () => {
    const storage = memoryStorage();
    storage.setItem("guard:test", JSON.stringify({ fails: "x", lockedUntil: "never" }));
    const limiter = Guard.createLimiter("test", Guard.createStore(storage), { now: () => 0 });
    expect(limiter.waitMs()).toBe(0);
  });
});

describe("timing helpers", () => {
  it("throttle drops calls that come too soon", () => {
    const clock = { t: 0 };
    const fn = vi.fn();
    const throttled = Guard.throttle(fn, 100, () => clock.t);
    throttled();
    clock.t = 50;
    throttled();
    clock.t = 150;
    throttled();
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it("singleFlight shares one running job", async () => {
    let runs = 0;
    const run = Guard.singleFlight(async () => { runs++; return "done"; });
    const [a, b] = await Promise.all([run(), run()]);
    expect([a, b, runs]).toEqual(["done", "done", 1]);
    await run();
    expect(runs).toBe(2); // free again once the first job finished
  });
});

describe("fetchLimited", () => {
  it("gives up with code 'timeout' when the server never answers", async () => {
    vi.stubGlobal("fetch", (url, init) => new Promise((resolve, reject) => {
      init.signal.addEventListener("abort", () => reject(new DOMException("aborted", "AbortError")));
    }));
    const error = await Guard.fetchLimited("https://example.test", {}, { timeoutMs: 20 }).catch(e => e);
    expect(error.code).toBe("timeout");
    vi.unstubAllGlobals();
  });

  it("refuses a reply that is too big", async () => {
    vi.stubGlobal("fetch", async () => new Response("x".repeat(50)));
    const error = await Guard.fetchLimited("https://example.test", {}, { maxBytes: 10 }).catch(e => e);
    expect(error.code).toBe("too-big");
    vi.unstubAllGlobals();
  });

  it("reports a network failure", async () => {
    vi.stubGlobal("fetch", async () => { throw new TypeError("Failed to fetch"); });
    const error = await Guard.fetchLimited("https://example.test").catch(e => e);
    expect(error.code).toBe("network");
    vi.unstubAllGlobals();
  });
});

describe("createReporter", () => {
  const quiet = { error() {} };

  it("shows a message once per distinct error and stops after the limit", () => {
    const shown = [];
    const report = Guard.createReporter(message => shown.push(message), { maxShown: 2, log: quiet });
    report(new Error("one"));
    report(new Error("one"));
    report(new Error("two"));
    report(new Error("three"));
    expect(shown).toHaveLength(2);
  });

  it("ignores noise that is not a bug in the app", () => {
    const shown = [];
    const report = Guard.createReporter(message => shown.push(message), { log: quiet });
    report("ResizeObserver loop completed with undelivered notifications.");
    report("Script error.");
    report(new Error("x"), "chrome-extension://abc/content.js".replace("chrome-", "moz-"));
    expect(shown).toHaveLength(0);
  });
});
