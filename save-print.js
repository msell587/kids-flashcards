// Prints once every picture on the page has loaded, so none are left blank on paper
function printWhenLoaded() {
  const waiting = [...document.images].filter(img => !img.complete);
  Promise.all(waiting.map(img => new Promise(resolve => {
    img.addEventListener("load", resolve, { once: true });
    img.addEventListener("error", resolve, { once: true });
  }))).then(() => window.print());
}

// The PDF maker is loaded the first time a Download PDF button is pressed
const PDF_LIBRARIES = [
  "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"
];

function loadScript(url) {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = url;
    script.onload = resolve;
    script.onerror = () => reject(new Error("Could not load " + url));
    document.head.appendChild(script);
  });
}

// A4 page in millimetres, and the page size in pixels at 96 per inch, so the layout
// matches the printed page. The content keeps a margin on every side.
const A4_WIDTH_PX = 794;
const A4_WIDTH_MM = 210;
const A4_HEIGHT_MM = 297;
const MARGIN_MM = 10;
const CONTENT_WIDTH_MM = A4_WIDTH_MM - 2 * MARGIN_MM;
const CONTENT_HEIGHT_MM = A4_HEIGHT_MM - 2 * MARGIN_MM;

// Parts that must never be split across two pages: a page breaks between them, not through them
const WHOLE_PARTS = ".card, .pic, .word, .trace-row, .find-row, .sheet-head, .instructions, .cover > *";

// The print styles are the ones that matter on paper, so the copy uses them and drops the screen-only ones
function printStyles(css) {
  return css.replace(/@media\s+print/g, "@media all").replace(/@media\s+screen/g, "@media not all");
}

// Where the page can be cut: a cut line may not pass through any whole part
function pageCuts(doc, ratio) {
  const boxes = [...doc.querySelectorAll(WHOLE_PARTS)]
    .map(el => el.getBoundingClientRect())
    .filter(box => box.width > 0 && box.height > 0)
    .map(box => ({ top: box.top * ratio, bottom: box.bottom * ratio }));
  return boxes.map(box => box.bottom).filter(cut =>
    boxes.every(box => !(box.top < cut && cut < box.bottom)));
}

// Downloads the printable page as a PDF. The page is copied with its styles and pictures
// built in, drawn at A4 width, then cut into A4 pages between its parts.
// removeSelector: the parts of the page that are only for the screen (buttons, options)
// options.centre: when everything fits on one page (a single sheet), it is centred on the A4 page
async function savePrintable(filename, removeSelector, options = {}) {
  const copy = document.documentElement.cloneNode(true);
  copy.querySelectorAll("script, " + removeSelector).forEach(element => element.remove());

  // Stylesheets from this app go inside the file; the Google font stays a link
  for (const link of copy.querySelectorAll('link[rel="stylesheet"]')) {
    if (!link.href.startsWith(location.origin)) continue;
    const style = document.createElement("style");
    style.textContent = await (await fetch(link.href)).text();
    link.replaceWith(style);
  }
  copy.querySelectorAll("style").forEach(style => style.textContent = printStyles(style.textContent));

  // Pictures go inside the copy as data, so it does not need the app folder
  for (const img of copy.querySelectorAll("img")) {
    const blob = await (await fetch(new URL(img.getAttribute("src"), location.href))).blob();
    img.src = await new Promise(resolve => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  }

  // Draw the copy in a hidden frame of A4 width, so nothing on the screen page gets in the way
  const frame = document.createElement("iframe");
  frame.style.cssText = "position:fixed;left:-10000px;top:0;border:0;width:" + A4_WIDTH_PX + "px;height:1px";
  document.body.appendChild(frame);

  try {
    await loadScript(PDF_LIBRARIES[0]);
    await loadScript(PDF_LIBRARIES[1]);

    frame.contentDocument.open();
    frame.contentDocument.write("<!DOCTYPE html>\n" + copy.outerHTML);
    frame.contentDocument.close();
    await Promise.all([...frame.contentDocument.images].map(img => img.complete ? null : new Promise(resolve => {
      img.addEventListener("load", resolve, { once: true });
      img.addEventListener("error", resolve, { once: true });
    })));
    frame.style.height = frame.contentDocument.documentElement.scrollHeight + "px";

    const picture = await html2canvas(frame.contentDocument.body, {
      scale: 2,
      width: A4_WIDTH_PX,
      windowWidth: A4_WIDTH_PX,
      backgroundColor: "#ffffff"
    });

    // Cut the picture into A4 pages, each one as tall as the page allows, ending between parts
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF({ unit: "mm", format: "a4", orientation: "portrait" });
    const ratio = picture.width / A4_WIDTH_PX;
    const pageHeight = CONTENT_HEIGHT_MM * picture.width / CONTENT_WIDTH_MM;
    const cuts = pageCuts(frame.contentDocument, ratio);
    const wholeHeightMm = picture.height * CONTENT_WIDTH_MM / picture.width;
    const offsetMm = options.centre && wholeHeightMm <= CONTENT_HEIGHT_MM ? (CONTENT_HEIGHT_MM - wholeHeightMm) / 2 : 0;
    for (let top = 0, page = 0; top < picture.height - 1; page++) {
      const limit = Math.min(top + pageHeight, picture.height);
      const fitting = cuts.filter(cut => cut > top && cut <= limit);
      const end = limit === picture.height || fitting.length === 0 ? limit : Math.max(...fitting);
      const slice = document.createElement("canvas");
      slice.width = picture.width;
      slice.height = Math.round(end - top);
      slice.getContext("2d").drawImage(picture, 0, top, picture.width, slice.height, 0, 0, slice.width, slice.height);
      if (page > 0) pdf.addPage();
      const heightMm = slice.height * CONTENT_WIDTH_MM / slice.width;
      pdf.addImage(slice.toDataURL("image/jpeg", 0.92), "JPEG", MARGIN_MM, MARGIN_MM + offsetMm, CONTENT_WIDTH_MM, heightMm);
      top = end;
    }

    pdf.save(filename);
  } catch (error) {
    alert("Sorry, the PDF could not be made. Check your internet connection and try again.");
  } finally {
    frame.remove();
  }
}
