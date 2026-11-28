// Coloring sheets are open to everyone, but their PDFs are kept out of the public repository:
// the viewer page fetches them from the Google Apps Script web app (apps-script/Code.gs), which
// reads them from a private Google Drive folder. The rule below is shared by the build
// (vite.config.js) and the page, so one of these files is never copied into the public site.
// ("Gated" below means "served by the Apps Script", not "needs a code".)

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

// Asks the script for a sheet. No code is needed; one is only sent if the script has been set to
// ask for it (REQUIRE_CODE). Throws an Error with .status (403 = the script wants a code, or it was wrong).
// Apps Script always answers 200, so a code problem is recognised from the reply itself.
export async function fetchSheet(path, code = "", workerUrl = SHEET_WORKER_URL) {
  // text/plain keeps the request "simple", so the browser does not need a CORS preflight
  const response = await fetch(workerUrl, {
    method: "POST",
    headers: { "content-type": "text/plain" },
    body: JSON.stringify({ path, code }),
  });
  const data = response.ok ? await response.json().catch(() => null) : null;
  if (!data || !data.base64) {
    const error = new Error("Sheet request failed");
    error.status = data && data.error === "wrong code" ? 403 : response.status;
    throw error;
  }
  const bytes = Uint8Array.from(atob(data.base64), char => char.charCodeAt(0));
  return new Blob([bytes], { type: "application/pdf" });
}
