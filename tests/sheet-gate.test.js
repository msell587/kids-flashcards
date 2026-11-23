// Checks which files count as gated coloring sheets, and how the page reads the Apps Script's replies.
import { afterEach, describe, expect, it, vi } from "vitest";
import { fetchSheet, isGatedSheet, sheetWorkerIsSetUp } from "../sheet-access.js";

const URL_UNDER_TEST = "https://script.google.com/macros/s/TEST/exec";

afterEach(() => {
  vi.unstubAllGlobals();
});

function replyWith(body, status = 200) {
  vi.stubGlobal("fetch", vi.fn(async () => new Response(JSON.stringify(body), { status })));
}

describe("isGatedSheet", () => {
  it("gates the coloring-sheet PDFs and the colouring worksheets", () => {
    expect(isGatedSheet("images/coloring-sheets/spring.pdf")).toBe(true);
    expect(isGatedSheet("images/coloring-sheets/my house.pdf")).toBe(true);
    expect(isGatedSheet("printables/worksheets/simple-colouring.pdf")).toBe(true);
    expect(isGatedSheet("printables/worksheets/feelings-colouring-boxes.pdf")).toBe(true);
  });

  it("leaves ordinary printables and coloring-sheet previews public", () => {
    expect(isGatedSheet("printables/worksheets/tracing-shapes.pdf")).toBe(false);
    expect(isGatedSheet("images/coloring-sheets/spring.webp")).toBe(false);
    expect(isGatedSheet("printables/weather-chart.pdf")).toBe(false);
  });

  it("refuses paths that try to leave the folder", () => {
    expect(isGatedSheet("images/coloring-sheets/../../topics.js")).toBe(false);
    expect(isGatedSheet("images/coloring-sheets/nested/spring.pdf")).toBe(false);
  });
});

describe("fetchSheet", () => {
  it("returns the sheet as a PDF when the script sends it", async () => {
    replyWith({ base64: Buffer.from("%PDF-test").toString("base64") });
    const blob = await fetchSheet("images/coloring-sheets/spring.pdf", "teacher-code", URL_UNDER_TEST);
    expect(blob.type).toBe("application/pdf");
    expect(Buffer.from(await blob.arrayBuffer()).toString()).toBe("%PDF-test");
  });

  it("reports a wrong code as status 403", async () => {
    replyWith({ error: "wrong code" });
    const error = await fetchSheet("images/coloring-sheets/spring.pdf", "guess", URL_UNDER_TEST)
      .catch(e => e);
    expect(error.status).toBe(403);
  });

  it("reports other failures with their own status", async () => {
    replyWith({ error: "not found" }, 500);
    const error = await fetchSheet("images/coloring-sheets/spring.pdf", "teacher-code", URL_UNDER_TEST)
      .catch(e => e);
    expect(error.status).toBe(500);
  });

  it("sends the request as a simple text/plain POST", async () => {
    replyWith({ error: "not found" });
    await fetchSheet("images/coloring-sheets/spring.pdf", "teacher-code", URL_UNDER_TEST).catch(() => {});
    const [url, options] = fetch.mock.calls[0];
    expect(url).toBe(URL_UNDER_TEST);
    expect(options.method).toBe("POST");
    expect(options.headers["content-type"]).toBe("text/plain");
  });
});

describe("sheetWorkerIsSetUp", () => {
  it("is false until the placeholder address is replaced", () => {
    expect(sheetWorkerIsSetUp("https://script.google.com/macros/s/PASTE_DEPLOYMENT_ID/exec")).toBe(false);
    expect(sheetWorkerIsSetUp(URL_UNDER_TEST)).toBe(true);
  });
});

describe("fetchSheet guards", () => {
  const PDF = Buffer.from("%PDF-1.4 test").toString("base64");

  it("never sends a code that is empty or too long", async () => {
    replyWith({ base64: PDF });
    for (const code of ["", "x".repeat(65), 42, null]) {
      const error = await fetchSheet("images/coloring-sheets/spring.pdf", code, URL_UNDER_TEST).catch(e => e);
      expect(error.status).toBe(403);
    }
    expect(fetch).not.toHaveBeenCalled();
  });

  it("never asks for a file that is not a gated sheet", async () => {
    replyWith({ base64: PDF });
    const error = await fetchSheet("topics.js", "code", URL_UNDER_TEST).catch(e => e);
    expect(error.status).toBe(400);
    expect(fetch).not.toHaveBeenCalled();
  });

  it("reports the script's rate limit as 429 with the wait time", async () => {
    replyWith({ error: "too many attempts", retryAfter: 120 });
    const error = await fetchSheet("images/coloring-sheets/spring.pdf", "code", URL_UNDER_TEST).catch(e => e);
    expect(error.status).toBe(429);
    expect(error.retryAfterMs).toBe(120000);
  });

  it("rejects a reply that is not a PDF", async () => {
    replyWith({ base64: Buffer.from("<html>not a pdf</html>").toString("base64") });
    const error = await fetchSheet("images/coloring-sheets/spring.pdf", "code", URL_UNDER_TEST).catch(e => e);
    expect(error.status).toBe(502);
  });

  it("rejects text that is not base64", async () => {
    replyWith({ base64: "<script>alert(1)</script>" });
    const error = await fetchSheet("images/coloring-sheets/spring.pdf", "code", URL_UNDER_TEST).catch(e => e);
    expect(error.status).toBe(502);
  });

  it("gives up with status 0 when the script never answers", async () => {
    vi.stubGlobal("fetch", vi.fn((url, init) => new Promise((resolve, reject) => {
      init.signal.addEventListener("abort", () => reject(new DOMException("aborted", "AbortError")));
    })));
    const error = await fetchSheet("images/coloring-sheets/spring.pdf", "code", URL_UNDER_TEST, { timeoutMs: 20 }).catch(e => e);
    expect(error.status).toBe(0);
    expect(error.code).toBe("timeout");
  });

  it("reports no network as status 0", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => { throw new TypeError("Failed to fetch"); }));
    const error = await fetchSheet("images/coloring-sheets/spring.pdf", "code", URL_UNDER_TEST).catch(e => e);
    expect(error.status).toBe(0);
    expect(error.code).toBe("network");
  });
});

describe("the Apps Script and the page agree", () => {
  // Code.gs cannot import sheet-access.js, so its copy of the rule is checked against the original here
  it("gate the same files", async () => {
    const { readFileSync } = await import("node:fs");
    const source = readFileSync(new URL("../apps-script/Code.gs", import.meta.url), "utf8");
    const body = source.match(/function isGatedSheet\(path\) \{[\s\S]*?\n\}/)[0];
    const scriptVersion = new Function(body + "\nreturn isGatedSheet;")();
    const samples = [
      "images/coloring-sheets/spring.pdf", "images/coloring-sheets/my house.pdf", "images/coloring-sheets/a/b.pdf",
      "images/coloring-sheets/../../topics.js", "images/coloring-sheets/spring.webp",
      "printables/worksheets/simple-colouring.pdf", "printables/worksheets/color-me.pdf",
      "printables/worksheets/tracing-shapes.pdf", "printables/weather-chart.pdf", "topics.js", "",
    ];
    for (const path of samples) expect(scriptVersion(path), path).toBe(isGatedSheet(path));
  });

  it("refuses oversized requests and limits wrong codes", async () => {
    const { readFileSync } = await import("node:fs");
    const source = readFileSync(new URL("../apps-script/Code.gs", import.meta.url), "utf8");
    expect(source).toMatch(/MAX_BODY_LENGTH/);
    expect(source).toMatch(/MAX_WRONG_CODES/);
    expect(source).toMatch(/safeEqual\(codes\[i\], code\)/);
  });
});

describe("the Apps Script's code comparison", () => {
  it("matches only identical codes", async () => {
    const { readFileSync } = await import("node:fs");
    const source = readFileSync(new URL("../apps-script/Code.gs", import.meta.url), "utf8");
    const safeEqual = new Function(source.match(/function safeEqual\(a, b\) \{[\s\S]*?\n\}/)[0] + "\nreturn safeEqual;")();
    expect(safeEqual("teacher-2026", "teacher-2026")).toBe(true);
    expect(safeEqual("teacher-2026", "teacher-2025")).toBe(false);
    expect(safeEqual("teacher", "teacher-2026")).toBe(false);
    expect(safeEqual("", "x")).toBe(false);
    expect(safeEqual("", "")).toBe(true);
  });
});
