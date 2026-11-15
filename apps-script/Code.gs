// Coloring sheet gate, run by Google Apps Script (script.google.com).
// Deploy as a web app: Execute as "Me", Who has access "Anyone".
// After changing this file: Deploy > Manage deployments > Edit > New version, so the live address uses it.
//
// Project settings > Script properties:
//   TEACHER_CODES     teacher access codes, separated by commas (no spaces)
//   SHEET_FOLDER_ID   the ID of the private Google Drive folder that holds the PDFs
//
// Guards against guessing and spam:
//   - requests that are too big or malformed are refused before anything else happens
//   - every wrong code slows the next answer down a little
//   - after MAX_WRONG_CODES wrong codes within WINDOW_SECONDS, ALL codes are refused until the window ends
//     (Apps Script cannot see the visitor's address, so the limit is shared by everyone. Trade-off: someone
//     could lock the sheets for ten minutes, but could not guess a code. The sheets are not secret data.)

var MAX_BODY_LENGTH = 2000;
var MAX_PATH_LENGTH = 200;
var MAX_CODE_LENGTH = 64;
var MAX_WRONG_CODES = 40;
var WINDOW_SECONDS = 600;

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

// Compares two strings in the same time wherever they differ, so the time taken gives nothing away
function safeEqual(a, b) {
  var result = a.length === b.length ? 0 : 1;
  var length = Math.max(a.length, b.length);
  for (var i = 0; i < length; i++) {
    result |= (a.charCodeAt(i) || 0) ^ (b.charCodeAt(i) || 0);
  }
  return result === 0;
}

// The wrong-code counter lives in the script cache and is changed under a lock, so parallel requests count correctly
function readWrongCodes() {
  var raw = CacheService.getScriptCache().get("wrongCodes");
  if (!raw) return { count: 0, start: Date.now() };
  try {
    var state = JSON.parse(raw);
    if (typeof state.count === "number" && typeof state.start === "number") return state;
  } catch (error) {
    // Unreadable counter: start again
  }
  return { count: 0, start: Date.now() };
}

function secondsLeft(state) {
  return Math.max(1, WINDOW_SECONDS - Math.floor((Date.now() - state.start) / 1000));
}

function countWrongCode() {
  var lock = LockService.getScriptLock();
  var locked = lock.tryLock(3000);
  try {
    var state = readWrongCodes();
    state.count += 1;
    CacheService.getScriptCache().put("wrongCodes", JSON.stringify(state), secondsLeft(state));
    return state;
  } finally {
    if (locked) lock.releaseLock();
  }
}

function doGet() {
  return jsonOut({ error: "send a POST request" });
}

function doPost(e) {
  var body = e && e.postData && e.postData.contents;
  if (typeof body !== "string" || body.length > MAX_BODY_LENGTH) return jsonOut({ error: "bad request" });

  var request;
  try {
    request = JSON.parse(body);
  } catch (error) {
    return jsonOut({ error: "bad request" });
  }
  if (!request || typeof request !== "object") return jsonOut({ error: "bad request" });

  var path = typeof request.path === "string" ? request.path : "";
  var code = typeof request.code === "string" ? request.code : "";
  if (path.length > MAX_PATH_LENGTH || code.length > MAX_CODE_LENGTH) return jsonOut({ error: "bad request" });
  if (!isGatedSheet(path)) return jsonOut({ error: "not found" });

  // Too many wrong codes lately: refuse everything, without even checking the code
  var state = readWrongCodes();
  if (state.count >= MAX_WRONG_CODES) {
    return jsonOut({ error: "too many attempts", retryAfter: secondsLeft(state) });
  }

  var properties = PropertiesService.getScriptProperties();
  var codes = (properties.getProperty("TEACHER_CODES") || "")
    .split(",").map(function (item) { return item.trim(); }).filter(Boolean);
  var match = false;
  for (var i = 0; i < codes.length; i++) {
    if (safeEqual(codes[i], code)) match = true; // no early exit: every code is always compared
  }
  if (!code || !match) {
    var after = countWrongCode();
    Utilities.sleep(Math.min(after.count, 6) * 400); // each wrong guess makes the next answer a little slower
    return jsonOut({ error: "wrong code" });
  }

  // Files in the Drive folder are named like the sheet, e.g. "spring.pdf"
  var name = path.split("/").pop();
  var folder = DriveApp.getFolderById(properties.getProperty("SHEET_FOLDER_ID"));
  var files = folder.getFilesByName(name);
  if (!files.hasNext()) return jsonOut({ error: "not found" });

  var bytes = files.next().getBlob().getBytes();
  return jsonOut({ base64: Utilities.base64Encode(bytes) });
}
