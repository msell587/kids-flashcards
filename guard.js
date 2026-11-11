// Guard: one small safety layer that every page loads first (classic script, no dependencies).
// It protects the app from three kinds of trouble:
//   1. Future bugs: any uncaught error or rejected promise shows a calm message instead of a frozen page.
//   2. Broken storage: every read and write of saved settings goes through one safe, validated place.
//   3. Spam: rapid taps, held keys and repeated code guesses are throttled and rate limited.
// Nothing here sends data anywhere. Errors are only written to the browser console.
(function (root) {
  "use strict";

  /* ---------- Safe storage ---------- */

  // Wraps a Storage object (localStorage or sessionStorage). Private browsing, blocked cookies and a full disk
  // all make real storage throw, so every call is wrapped and falls back to a plain in-memory copy.
  function createStore(storage, options) {
    const maxLength = (options && options.maxLength) || 20000;
    const memory = new Map();

    function read(key) {
      try {
        if (storage) {
          const value = storage.getItem(key);
          if (value !== null) return value;
        }
      } catch (error) {
        // Fall through to the in-memory copy
      }
      return memory.has(key) ? memory.get(key) : null;
    }

    return {
      // validate(value) must return true for a value that is safe to use; anything else gives the fallback
      getJSON(key, fallback, validate) {
        const text = read(key);
        if (text === null || text.length > maxLength) return fallback;
        try {
          const value = JSON.parse(text);
          return !validate || validate(value) ? value : fallback;
        } catch (error) {
          return fallback;
        }
      },
      setJSON(key, value) {
        let text;
        try {
          text = JSON.stringify(value);
        } catch (error) {
          return false;
        }
        if (text === undefined || text.length > maxLength) return false;
        memory.set(key, text);
        try {
          if (storage) storage.setItem(key, text);
          return true;
        } catch (error) {
          return false; // Saved for this page visit only
        }
      },
      getString(key, fallback) {
        const text = read(key);
        return text === null || text.length > maxLength ? fallback : text;
      },
      setString(key, text) {
        const value = String(text);
        if (value.length > maxLength) return false;
        memory.set(key, value);
        try {
          if (storage) storage.setItem(key, value);
          return true;
        } catch (error) {
          return false;
        }
      },
      remove(key) {
        memory.delete(key);
        try {
          if (storage) storage.removeItem(key);
        } catch (error) {
          // Nothing to clear
        }
      }
    };
  }

  /* ---------- Rate limiting ---------- */

  // Limits how often something may fail. After `max` failures inside `windowMs`, it locks for `lockMs`,
  // and each further lock lasts twice as long (up to `maxLockMs`). A success clears everything.
  // State lives in the given store, so closing and reopening the tab does not reset it.
  // This is a courtesy and a first line of defence in the browser; the real limit is on the server.
  function createLimiter(name, store, options) {
    const opts = Object.assign({ max: 5, windowMs: 60000, lockMs: 30000, maxLockMs: 600000, now: Date.now }, options);
    const key = "guard:" + name;
    const valid = value => value && typeof value === "object" &&
      Array.isArray(value.fails) && value.fails.every(Number.isFinite) &&
      Number.isFinite(value.lockedUntil) && Number.isFinite(value.locks);

    function load() {
      return store.getJSON(key, { fails: [], lockedUntil: 0, locks: 0 }, valid);
    }

    return {
      // Milliseconds left on the lock, or 0 when attempts are allowed
      waitMs() {
        return Math.max(0, load().lockedUntil - opts.now());
      },
      fail() {
        const now = opts.now();
        const state = load();
        state.fails = state.fails.filter(time => now - time < opts.windowMs).slice(-opts.max);
        state.fails.push(now);
        if (state.fails.length >= opts.max) {
          state.locks += 1;
          state.lockedUntil = now + Math.min(opts.lockMs * Math.pow(2, state.locks - 1), opts.maxLockMs);
          state.fails = [];
        }
        store.setJSON(key, state);
        return Math.max(0, state.lockedUntil - now);
      },
      succeed() {
        store.remove(key);
      }
    };
  }

  /* ---------- Timing helpers ---------- */

  // Runs fn at most once every `ms`; calls in between are dropped (good for taps and held keys)
  function throttle(fn, ms, now) {
    const clock = now || Date.now;
    let last = -Infinity;
    return function throttled() {
      const time = clock();
      if (time - last < ms) return undefined;
      last = time;
      return fn.apply(this, arguments);
    };
  }

  // Runs fn once the calls have stopped for `ms`
  function debounce(fn, ms) {
    let timer = null;
    return function debounced() {
      const args = arguments;
      const self = this;
      clearTimeout(timer);
      timer = setTimeout(() => fn.apply(self, args), ms);
    };
  }

  // While an async job is running, further calls get the same promise instead of starting a second job
  function singleFlight(job) {
    let running = null;
    return function run() {
      if (running) return running;
      running = Promise.resolve(job.apply(this, arguments)).finally(() => { running = null; });
      return running;
    };
  }

  /* ---------- Network ---------- */

  // fetch with a time limit and a size limit. Rejects with an Error whose .code says why:
  // "timeout", "too-big" or "network". Without this, a stalled request would leave the page waiting for ever.
  async function fetchLimited(url, init, limits) {
    const opts = Object.assign({ timeoutMs: 25000, maxBytes: 25 * 1024 * 1024 }, limits);
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), opts.timeoutMs);
    try {
      const response = await fetch(url, Object.assign({}, init, { signal: controller.signal }));
      const declared = Number(response.headers && response.headers.get && response.headers.get("content-length"));
      if (declared > opts.maxBytes) throw Object.assign(new Error("Response too big"), { code: "too-big" });
      const text = await response.text();
      if (text.length > opts.maxBytes) throw Object.assign(new Error("Response too big"), { code: "too-big" });
      return { ok: response.ok, status: response.status, text };
    } catch (error) {
      if (typeof error.code === "string") throw error; // already one of ours (a DOMException has a numeric code)
      const code = controller.signal.aborted ? "timeout" : "network";
      throw Object.assign(new Error(code === "timeout" ? "Request timed out" : "Network error"), { code });
    } finally {
      clearTimeout(timer);
    }
  }

  /* ---------- Friendly error handling ---------- */

  // Errors that are noise, not bugs in this app: browser extensions, cross-origin "Script error." and
  // harmless layout notices. Showing a message for these would only worry a teacher.
  const IGNORED = /ResizeObserver|Script error|extension:\/\/|moz-extension|safari-extension|Non-Error promise rejection|AbortError/i;

  function describe(value) {
    if (value && typeof value === "object") return String(value.message || value.name || value);
    return String(value);
  }

  // Remembers what was already shown, so one bug in a loop cannot flood the screen
  function createReporter(show, options) {
    const opts = Object.assign({ maxShown: 3, log: root.console }, options);
    const seen = new Set();
    return function report(value, where) {
      const message = describe(value);
      if (IGNORED.test(message) || IGNORED.test(where || "")) return false;
      if (opts.log && opts.log.error) opts.log.error("[Guard]", message, where || "");
      if (seen.has(message) || seen.size >= opts.maxShown) return false;
      seen.add(message);
      show("Something went wrong on this page. If it looks stuck, reload it.");
      return true;
    };
  }

  /* ---------- Toast (a small message that slides in) ---------- */

  const doc = root.document;
  let toastEl = null;
  let toastTimer = null;

  function toast(message, options) {
    if (!doc || !doc.body) return;
    const opts = Object.assign({ ms: 7000, reload: false }, options);
    if (!toastEl) {
      toastEl = doc.createElement("div");
      toastEl.className = "guard-toast";
      toastEl.setAttribute("role", "status");
      toastEl.setAttribute("aria-live", "polite");
      doc.body.appendChild(toastEl);
    }
    toastEl.textContent = "";
    const text = doc.createElement("span");
    text.textContent = message;
    toastEl.appendChild(text);
    if (opts.reload) {
      const button = doc.createElement("button");
      button.type = "button";
      button.textContent = "Reload";
      button.addEventListener("click", () => root.location.reload());
      toastEl.appendChild(button);
    }
    const close = doc.createElement("button");
    close.type = "button";
    close.className = "guard-toast-close";
    close.setAttribute("aria-label", "Dismiss message");
    close.textContent = "×";
    close.addEventListener("click", hideToast);
    toastEl.appendChild(close);
    toastEl.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(hideToast, opts.ms);
  }

  function hideToast() {
    if (toastEl) toastEl.classList.remove("show");
  }

  function installStyles() {
    const style = doc.createElement("style");
    style.textContent =
      ".guard-toast{position:fixed;left:50%;bottom:20px;z-index:1000;display:flex;align-items:center;gap:12px;" +
      "max-width:min(92vw,460px);padding:12px 14px 12px 18px;border-radius:18px;color:#fff;background:#24323d;" +
      "font:700 15px/1.3 var(--font,Arial,sans-serif);box-shadow:0 10px 30px rgba(0,0,0,.25);" +
      "transform:translate(-50%,24px);opacity:0;visibility:hidden;pointer-events:none;" +
      "transition:transform .3s cubic-bezier(.2,.8,.2,1),opacity .25s,visibility 0s .3s}" +
      ".guard-toast.show{transform:translate(-50%,0);opacity:1;visibility:visible;pointer-events:auto;transition-delay:0s}" +
      ".guard-toast button{margin:0;padding:6px 14px;font:inherit;color:#24323d;background:#fff;border:0;" +
      "border-radius:999px;cursor:pointer;box-shadow:none}" +
      ".guard-toast .guard-toast-close{padding:2px 10px;font-size:20px;color:#fff;background:transparent}" +
      ".guard-toast button:focus-visible{outline:3px solid #5cbf6e;outline-offset:2px}";
    doc.head.appendChild(style);
  }

  /* ---------- Start-up ---------- */

  const Guard = {
    createStore, createLimiter, createReporter, throttle, debounce, singleFlight, fetchLimited, toast,
    // Ready-made stores for the page; they never throw
    store: createStore(safeStorage("localStorage")),
    session: createStore(safeStorage("sessionStorage"))
  };

  function safeStorage(name) {
    try {
      return root[name];
    } catch (error) {
      return null; // Some browsers throw even when the property is read
    }
  }

  if (doc && root.addEventListener) {
    installStyles();
    const report = createReporter(message => toast(message, { reload: true, ms: 10000 }));
    root.addEventListener("error", event => {
      // Failed pictures and scripts fire "error" on the element, not on the window: those are handled where they load
      if (event.target && event.target !== root) return;
      report(event.error || event.message, event.filename);
    });
    root.addEventListener("unhandledrejection", event => report(event.reason, "promise"));
  }

  root.Guard = Guard;
})(typeof globalThis !== "undefined" ? globalThis : window);
