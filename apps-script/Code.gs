// Colouring sheet server, run by Google Apps Script (script.google.com).
// It sends the colouring-sheet PDFs from a private Google Drive folder, so the PDFs never go into
// the public GitHub repository. The sheets are open to everyone.
// Deploy as a web app: Execute as "Me", Who has access "Anyone".
//
// Project settings > Script properties:
//   SHEET_FOLDER_ID   the ID of the private Google Drive folder that holds the PDFs
//   REQUIRE_CODE      optional. Set it to "yes" to ask teachers for an access code again
//   TEACHER_CODES     only used when REQUIRE_CODE is "yes": access codes, separated by commas

// Same rule as sheet-access.js: the coloring-sheet PDFs and the colouring worksheets
function isGatedSheet(path) {
  if (path.indexOf("..") !== -1) return false;
  return /^images\/coloring-sheets\/[^\/]+\.pdf$/i.test(path) ||
    /^printables\/worksheets\/[^\/]*colou?r[^\/]*\.pdf$/i.test(path);
}

function jsonOut(object) {
  return ContentService.createTextOutput(JSON.stringify(object))
    .setMimeType(ContentService.MimeType.JSON);
}

function doGet() {
  return jsonOut({ error: "send a POST request" });
}

function doPost(e) {
  let request;
  try {
    request = JSON.parse(e.postData.contents);
  } catch (error) {
    return jsonOut({ error: "bad request" });
  }

  const path = typeof request.path === "string" ? request.path : "";
  if (!isGatedSheet(path)) return jsonOut({ error: "not found" });

  const properties = PropertiesService.getScriptProperties();
  // Open to everyone, unless REQUIRE_CODE is set to "yes" in the script properties
  const requireCode = String(properties.getProperty("REQUIRE_CODE") || "").trim().toLowerCase() === "yes";
  if (requireCode) {
    const codes = (properties.getProperty("TEACHER_CODES") || "")
      .split(",").map(code => code.trim()).filter(Boolean);
    if (!request.code || codes.indexOf(String(request.code)) === -1) {
      return jsonOut({ error: "wrong code" });
    }
  }

  // Files in the Drive folder are named like the sheet, e.g. "spring.pdf"
  const name = path.split("/").pop();
  const folder = DriveApp.getFolderById(properties.getProperty("SHEET_FOLDER_ID"));
  const files = folder.getFilesByName(name);
  if (!files.hasNext()) return jsonOut({ error: "not found" });

  const bytes = files.next().getBlob().getBytes();
  return jsonOut({ base64: Utilities.base64Encode(bytes) });
}
