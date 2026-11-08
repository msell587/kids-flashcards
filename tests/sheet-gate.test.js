// Checks which files count as gated coloring sheets, and that the sheet Worker only
// returns a sheet to a request with a valid teacher code.
import { describe, expect, it } from "vitest";
import worker from "../worker/index.js";
import { isGatedSheet } from "../sheet-access.js";

const ORIGIN = "https://msell587.github.io";

function fakeEnv(objects = { "images/coloring-sheets/spring.pdf": "PDF-SPRING" }) {
  return {
    TEACHER_CODES: "teacher-code-one,teacher-code-two",
    ALLOWED_ORIGINS: `${ORIGIN},http://localhost:5173`,
    SHEETS: {
      get: async key => (key in objects ? { body: objects[key] } : null),
    },
  };
}

function post(body, { origin = ORIGIN } = {}) {
  return new Request("https://sheet-gate.example.workers.dev/sheet", {
    method: "POST",
    headers: { "content-type": "application/json", origin },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
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

describe("sheet Worker", () => {
  it("returns the sheet when the teacher code is valid", async () => {
    const response = await worker.fetch(
      post({ path: "images/coloring-sheets/spring.pdf", code: "teacher-code-two" }),
      fakeEnv()
    );
    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toBe("application/pdf");
    expect(response.headers.get("cache-control")).toBe("private, no-store");
    expect(response.headers.get("access-control-allow-origin")).toBe(ORIGIN);
    expect(await response.text()).toBe("PDF-SPRING");
  });

  it("refuses a wrong or missing code", async () => {
    const wrong = await worker.fetch(
      post({ path: "images/coloring-sheets/spring.pdf", code: "guess" }),
      fakeEnv()
    );
    const missing = await worker.fetch(
      post({ path: "images/coloring-sheets/spring.pdf" }),
      fakeEnv()
    );
    expect(wrong.status).toBe(403);
    expect(missing.status).toBe(403);
  });

  it("does not serve public files or paths outside the gate", async () => {
    const response = await worker.fetch(
      post({ path: "printables/worksheets/tracing-shapes.pdf", code: "teacher-code-one" }),
      fakeEnv()
    );
    expect(response.status).toBe(404);
  });

  it("returns 404 for a gated sheet that is not in the bucket", async () => {
    const response = await worker.fetch(
      post({ path: "images/coloring-sheets/winter.pdf", code: "teacher-code-one" }),
      fakeEnv()
    );
    expect(response.status).toBe(404);
  });

  it("rejects requests that are not valid JSON or not POST /sheet", async () => {
    const badJson = await worker.fetch(post("{not json"), fakeEnv());
    const getRequest = await worker.fetch(
      new Request("https://sheet-gate.example.workers.dev/sheet"),
      fakeEnv()
    );
    expect(badJson.status).toBe(400);
    expect(getRequest.status).toBe(404);
  });

  it("answers the browser's preflight only for allowed sites", async () => {
    const allowed = await worker.fetch(
      new Request("https://sheet-gate.example.workers.dev/sheet", {
        method: "OPTIONS",
        headers: { origin: ORIGIN },
      }),
      fakeEnv()
    );
    const other = await worker.fetch(
      new Request("https://sheet-gate.example.workers.dev/sheet", {
        method: "OPTIONS",
        headers: { origin: "https://elsewhere.example" },
      }),
      fakeEnv()
    );
    expect(allowed.status).toBe(204);
    expect(allowed.headers.get("access-control-allow-origin")).toBe(ORIGIN);
    expect(other.headers.get("access-control-allow-origin")).toBeNull();
  });
});
