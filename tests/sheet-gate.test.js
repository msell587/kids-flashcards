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
