// Coloring sheets are gated: teachers enter an access code and the sheet is fetched from the
// sheet Worker (worker/index.js). The rule below is shared by the build (vite.config.js),
// the Worker and the pages, so a gated file is never copied into the public site.

// After you deploy the Worker, paste its address here (no slash at the end).
export const SHEET_WORKER_URL = "https://sheet-gate.letslearn-teachers.workers.dev";

// Coloring sheets: every PDF in images/coloring-sheets/, and the colouring worksheets in printables/worksheets/
export function isGatedSheet(path) {
  const file = String(path);
  if (file.includes("..")) return false;
  return /^images\/coloring-sheets\/[^/]+\.pdf$/i.test(file) ||
    /^printables\/worksheets\/[^/]*colou?r[^/]*\.pdf$/i.test(file);
}

export function sheetWorkerIsSetUp(workerUrl = SHEET_WORKER_URL) {
  return !workerUrl.includes("YOUR-SUBDOMAIN");
}

// Asks the Worker for a gated sheet. Throws an Error with .status (403 = wrong code).
export async function fetchSheet(path, code, workerUrl = SHEET_WORKER_URL) {
  const response = await fetch(workerUrl + "/sheet", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ path, code }),
  });
  if (!response.ok) {
    const error = new Error("Sheet request failed: " + response.status);
    error.status = response.status;
    throw error;
  }
  return response.blob();
}
