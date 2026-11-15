// Coloring sheets are gated: teachers enter an access code and the sheet is fetched from the
// Google Apps Script web app (apps-script/Code.gs). The rule below is shared by the build
// (vite.config.js) and the page, so a gated file is never copied into the public site.

// After you deploy the Apps Script, paste its web app address here.
export const SHEET_WORKER_URL = "https://script.google.com/macros/s/AKfycbyhTI-ofvGY3NEtTY5NaUvGbxjQrNpFbtmX78_MMmkbGzh6h2RNvfX9DqDe_epxmZC7xQ/exec";

// Coloring sheets: every PDF in images/coloring-sheets/, and the colouring worksheets in printables/worksheets/
export function isGatedSheet(path) {
  const file = String(path);
  if (file.includes("..")) return false;
  return /^images\/coloring-sheets\/[^/]+\.pdf$/i.test(file) ||
    /^printables\/worksheets\/[^/]*colou?r[^/]*\.pdf$/i.test(file);
}

export function sheetWorkerIsSetUp(workerUrl = SHEET_WORKER_URL) {
  return !workerUrl.includes("PASTE_DEPLOYMENT_ID");
}

// A code longer than this is never sent (the script refuses it too)
export const MAX_CODE_LENGTH = 64;
// The biggest sheet accepted, as base64 text (about 15 MB of PDF), so a wrong reply cannot fill the device's memory
const MAX_BASE64_LENGTH = 20 * 1024 * 1024;
const BASE64_PATTERN = /^[A-Za-z0-9+/]+={0,2}$/;

function sheetError(message, status, extra) {
  return Object.assign(new Error(message), { status }, extra);
}

// Asks the script for a gated sheet. Throws an Error with .status:
//   403 wrong code, 429 too many attempts (.retryAfterMs says how long to wait), 400 request not allowed,
//   0 no answer in time or no network (.code is "timeout" or "network"), or the server's own status.
// Apps Script always answers 200, so a wrong code is recognised from the reply itself.
export async function fetchSheet(path, code, workerUrl = SHEET_WORKER_URL, { timeoutMs = 30000 } = {}) {
  if (!isGatedSheet(path)) throw sheetError("That sheet is not gated", 400);
  if (typeof code !== "string" || !code || code.length > MAX_CODE_LENGTH) throw sheetError("Wrong code", 403);

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  let response;
  let data = null;
  try {
    // text/plain keeps the request "simple", so the browser does not need a CORS preflight
    response = await fetch(workerUrl, {
      method: "POST",
      headers: { "content-type": "text/plain" },
      body: JSON.stringify({ path, code }),
      signal: controller.signal,
    });
    data = response.ok ? await response.json().catch(() => null) : null;
  } catch {
    const timedOut = controller.signal.aborted;
    throw sheetError(timedOut ? "The request timed out" : "No network", 0, { code: timedOut ? "timeout" : "network" });
  } finally {
    clearTimeout(timer);
  }

  if (data && data.error === "too many attempts") {
    const seconds = Number(data.retryAfter);
    throw sheetError("Too many attempts", 429, { retryAfterMs: Number.isFinite(seconds) ? seconds * 1000 : 600000 });
  }
  if (!data || typeof data.base64 !== "string" || !data.base64) {
    throw sheetError("Sheet request failed", data && data.error === "wrong code" ? 403 : response.status);
  }
  if (data.base64.length > MAX_BASE64_LENGTH || !BASE64_PATTERN.test(data.base64)) {
    throw sheetError("The sheet arrived damaged", 502);
  }
  let bytes;
  try {
    bytes = Uint8Array.from(atob(data.base64), char => char.charCodeAt(0));
  } catch {
    throw sheetError("The sheet arrived damaged", 502);
  }
  // Every PDF starts with "%PDF-": anything else is not a sheet
  if (String.fromCharCode(...bytes.slice(0, 5)) !== "%PDF-") throw sheetError("The sheet arrived damaged", 502);
  return new Blob([bytes], { type: "application/pdf" });
}
