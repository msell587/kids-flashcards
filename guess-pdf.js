// Download PDF: a chooser for the pictures of a guess game. The user picks the picture size
// (how many per page) and which pictures to include, and the PDF is made in the browser.
// A button with data-pdf-choose, data-folder (the picture folder) and data-name (the game's name) opens it.
(function () {
  const SIZES = {
    big: { label: "Big: 1 per page", cols: 1, rows: 1, font: 22 },
    four: { label: "Four: 4 per page", cols: 2, rows: 2, font: 18 },
    medium: { label: "Medium: 6 per page", cols: 2, rows: 3, font: 16 },
    small: { label: "Small: 12 per page", cols: 3, rows: 4, font: 12 }
  };
  const PAGE_W = 595;      // A4 in points
  const PAGE_H = 842;
  const MARGIN = 30;
  const GAP = 12;
  const TITLE_H = 44;
  const enc = new TextEncoder();

  // Read the width, height and colour parts from a JPEG file
  function jpegSize(bytes) {
    let i = 2;
    while (i < bytes.length) {
      if (bytes[i] !== 0xFF) { i++; continue; }
      const marker = bytes[i + 1];
      if (marker === 0xC0 || marker === 0xC1 || marker === 0xC2) {
        const h = (bytes[i + 5] << 8) | bytes[i + 6];
        const w = (bytes[i + 7] << 8) | bytes[i + 8];
        return { w, h, comps: bytes[i + 9] };
      }
      i += 2 + ((bytes[i + 2] << 8) | bytes[i + 3]);
    }
    throw new Error("Not a JPEG picture");
  }

  function escapePdf(text) {
    return text.replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
  }

  // Lay the chosen pictures out on A4 pages and write the PDF file
  function makePdf(title, pictures, size, landscape) {
    const PW = landscape ? PAGE_H : PAGE_W;
    const PH = landscape ? PAGE_W : PAGE_H;
    // Crosswise pages use the grid turned sideways, so a 2 x 3 grid becomes 3 x 2 across the wide page
    const cols = landscape ? size.rows : size.cols;
    const rows = landscape ? size.cols : size.rows;
    const perPage = cols * rows;
    const cellW = (PW - 2 * MARGIN - (cols - 1) * GAP) / cols;
    const cellH = (PH - 2 * MARGIN - TITLE_H - (rows - 1) * GAP) / rows;
    const captionH = size.font + 10;
    const objects = [];
    const add = parts => { objects.push(parts); return objects.length; };

    add(["<< /Type /Catalog /Pages 2 0 R >>"]);     // object 1
    const pagesId = add([""]);                      // object 2, filled in below
    const fontId = add(["<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>"]);
    const boldId = add(["<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>"]);

    const pageIds = [];
    for (let start = 0; start < pictures.length; start += perPage) {
      const group = pictures.slice(start, start + perPage);
      const xobjects = [];
      const ops = [`BT /F2 18 Tf ${MARGIN} ${PH - MARGIN - 18} Td (${escapePdf(title)}) Tj ET`];
      group.forEach((picture, n) => {
        const { w, h } = jpegSize(picture.bytes);
        const imageId = add([`<< /Type /XObject /Subtype /Image /Width ${w} /Height ${h} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${picture.bytes.length} >>\nstream\n`, picture.bytes, "\nendstream"]);
        const name = "Im" + (n + 1);
        xobjects.push(`/${name} ${imageId} 0 R`);

        const col = n % cols;
        const row = Math.floor(n / cols);
        const x0 = MARGIN + col * (cellW + GAP);
        const cellTop = PH - MARGIN - TITLE_H - row * (cellH + GAP);
        const boxH = cellH - captionH;
        // Every picture has the same frame on the page, so all cells line up; the picture keeps its shape inside it
        const pad = 6; // keeps the picture inside the frame line
        const scale = Math.min((cellW - 2 * pad) / w, (boxH - 2 * pad) / h);
        const dw = w * scale;
        const dh = h * scale;
        const dx = x0 + (cellW - dw) / 2;
        const dy = cellTop - dh;
        ops.push(`q ${dw.toFixed(2)} 0 0 ${dh.toFixed(2)} ${dx.toFixed(2)} ${dy.toFixed(2)} cm /${name} Do Q`);
        ops.push(`0.8 G 0.6 w ${x0.toFixed(2)} ${(cellTop - boxH).toFixed(2)} ${cellW.toFixed(2)} ${boxH.toFixed(2)} re S`);
        const textW = picture.word.length * 0.5 * size.font;
        const tx = x0 + Math.max(0, (cellW - textW) / 2);
        const ty = cellTop - boxH - size.font;
        ops.push(`BT /F1 ${size.font} Tf ${tx.toFixed(2)} ${ty.toFixed(2)} Td (${escapePdf(picture.word)}) Tj ET`);
      });
      const content = ops.join("\n");
      const contentId = add([`<< /Length ${content.length} >>\nstream\n${content}\nendstream`]);
      pageIds.push(add([`<< /Type /Page /Parent ${pagesId} 0 R /MediaBox [0 0 ${PW} ${PH}] /Contents ${contentId} 0 R ` +
        `/Resources << /Font << /F1 ${fontId} 0 R /F2 ${boldId} 0 R >> /XObject << ${xobjects.join(" ")} >> >> >>`]));
    }
    objects[pagesId - 1] = [`<< /Type /Pages /Kids [${pageIds.map(id => id + " 0 R").join(" ")}] /Count ${pageIds.length} >>`];

    // Write the file: header, each object, cross-reference table, trailer
    const pieces = [];
    let position = 0;
    const offsets = [];
    const push = part => {
      const bytes = typeof part === "string" ? enc.encode(part) : part;
      pieces.push(bytes);
      position += bytes.length;
    };
    push("%PDF-1.4\n%\xE2\xE3\xCF\xD3\n");
    objects.forEach((parts, i) => {
      offsets.push(position);
      push(`${i + 1} 0 obj\n`);
      parts.forEach(push);
      push("\nendobj\n");
    });
    const xrefAt = position;
    let xref = `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
    offsets.forEach(offset => { xref += String(offset).padStart(10, "0") + " 00000 n \n"; });
    xref += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefAt}\n%%EOF\n`;
    push(xref);

    const file = new Uint8Array(position);
    let at = 0;
    pieces.forEach(piece => { file.set(piece, at); at += piece.length; });
    return new Blob([file], { type: "application/pdf" });
  }

  function saveBlob(blob, filename) {
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(link.href), 1000);
  }

  // The chooser dialog, built once and reused
  const dialog = document.createElement("dialog");
  dialog.className = "pdf-dialog";
  dialog.innerHTML =
    '<h2>Download pictures as PDF</h2>' +
    '<fieldset><legend>Picture size</legend>' +
    Object.keys(SIZES).map(key =>
      `<label><input type="radio" name="pdf-size" value="${key}"${key === "medium" ? " checked" : ""}> ${SIZES[key].label}</label>`).join("") +
    '</fieldset>' +
    '<div class="pdf-preview" id="pdf-preview" aria-label="How the first page will look"></div>' +
    '<fieldset><legend>Page direction</legend>' +
    '<label><input type="radio" name="pdf-orient" value="portrait" checked> Upright (tall page)</label>' +
    '<label><input type="radio" name="pdf-orient" value="landscape"> Crosswise (wide page)</label>' +
    '</fieldset>' +
    '<fieldset><legend>Pictures</legend>' +
    '<div class="pdf-pick-tools"><button type="button" data-pdf-all>Select all</button><button type="button" data-pdf-none>Clear</button></div>' +
    '<div class="pdf-pick-list" id="pdf-list"></div>' +
    '</fieldset>' +
    '<p class="pdf-count" id="pdf-count" aria-live="polite"></p>' +
    '<style>' +
    '.pdf-preview { margin: 10px auto; text-align: center; }' +
    '.pdf-page { width: min(100%, 240px); aspect-ratio: 595 / 842; margin: 0 auto; background: #fff; border: 1px solid #999;' +
    '  box-shadow: 0 2px 8px rgba(0,0,0,0.15); padding: 8px; box-sizing: border-box; display: grid; gap: 6px; }' +
    '.pdf-cell { border: 1px solid #bbb; display: flex; align-items: center; justify-content: center; overflow: hidden; min-height: 0; }' +
    '.pdf-cell img { max-width: 100%; max-height: 100%; object-fit: contain; }' +
    '.pdf-preview p { font-size: 14px; margin: 6px 0 0; }' +
    '.pdf-dialog { max-width: 520px; width: calc(100% - 24px); border: none; border-radius: 20px; padding: 20px; box-shadow: 0 10px 40px rgba(0,0,0,0.25); }' +
    '.pdf-dialog h2 { margin: 0 0 10px; font-size: 22px; }' +
    '.pdf-dialog fieldset { border: 1px solid #d8dee6; border-radius: 12px; margin: 0 0 12px; padding: 8px 12px 12px; }' +
    '.pdf-dialog legend { font-weight: 700; padding: 0 6px; }' +
    '.pdf-dialog fieldset > label { display: block; padding: 4px 0; font-size: 15px; }' +
    '.pdf-pick-tools { display: flex; gap: 8px; margin: 4px 0 10px; }' +
    '.pdf-pick-tools button { padding: 6px 12px; font-size: 14px; box-shadow: none; }' +
    '.pdf-pick-list { display: grid; grid-template-columns: repeat(auto-fill, minmax(96px, 1fr)); gap: 8px; max-height: 36vh; overflow-y: auto; padding: 2px; }' +
    '.pdf-pick { display: flex; flex-direction: column; align-items: center; gap: 4px; padding: 6px; border: 1px solid #d8dee6; border-radius: 10px; font-size: 13px; text-align: center; }' +
    '.pdf-pick input { margin: 0; }' +
    '.pdf-pick img { width: 100%; height: 64px; object-fit: contain; border-radius: 6px; background: #f6f7f9; }' +
    '.pdf-count { font-size: 14px; margin: 8px 0 0; }' +
    '.pdf-actions { display: flex; justify-content: flex-end; gap: 10px; margin-top: 14px; }' +
    '.pdf-actions button { padding: 8px 16px; font-size: 15px; box-shadow: none; }' +
    '</style>' +
    '<div class="pdf-actions"><button type="button" data-pdf-cancel>Cancel</button>' +
    '<button type="button" class="primary" id="pdf-make">Download PDF</button></div>';
  document.body.appendChild(dialog);

  let current = { folder: "", name: "" };
  let items = [];
  const list = dialog.querySelector("#pdf-list");
  const count = dialog.querySelector("#pdf-count");
  const make = dialog.querySelector("#pdf-make");

  // The PDF needs JPEG bytes, so each picture (saved as WebP) is redrawn on a canvas and encoded as JPEG
  async function jpegBytes(url, word) {
    const image = new Image();
    try {
      await new Promise((resolve, reject) => {
        image.onload = resolve;
        image.onerror = reject;
        image.src = url;
      });
    } catch (error) {
      throw new Error("Missing picture: " + word);
    }
    const canvas = document.createElement("canvas");
    canvas.width = image.naturalWidth;
    canvas.height = image.naturalHeight;
    canvas.getContext("2d").drawImage(image, 0, 0);
    const blob = await new Promise(resolve => canvas.toBlob(resolve, "image/jpeg", 0.92));
    return new Uint8Array(await blob.arrayBuffer());
  }

  function checkedBoxes() {
    return [...list.querySelectorAll("input[type=checkbox]:checked")];
  }
  // Shows the first A4 page with the chosen layout, so the size and grid can be seen before downloading
  function renderPreview() {
    const preview = dialog.querySelector("#pdf-preview");
    const size = SIZES[dialog.querySelector("input[name=pdf-size]:checked").value];
    const chosen = checkedBoxes().map(box => items[Number(box.dataset.n)]);
    const landscape = dialog.querySelector("input[name=pdf-orient]:checked").value === "landscape";
    const cols = landscape ? size.rows : size.cols;
    const rows = landscape ? size.cols : size.rows;
    const perPage = size.cols * size.rows;
    const pages = Math.max(1, Math.ceil(chosen.length / perPage));
    const cells = Array.from({ length: perPage }, (_, i) => chosen[i]
      ? `<div class="pdf-cell"><img src="${encodeURI(pictureUrl(chosen[i]))}" alt=""></div>`
      : `<div class="pdf-cell"></div>`).join("");
    preview.innerHTML =
      `<div class="pdf-page" style="aspect-ratio: ${landscape ? "842 / 595" : "595 / 842"}; width: ${landscape ? "min(100%, 320px)" : "min(100%, 240px)"}; grid-template-columns: repeat(${cols}, 1fr); grid-template-rows: repeat(${rows}, 1fr);">${cells}</div>` +
      `<p>Page 1 of ${pages} (A4 ${landscape ? "crosswise" : "upright"}, ${perPage} per page)</p>`;
  }

  function updateCount() {
    const picked = checkedBoxes().length;
    const size = SIZES[dialog.querySelector("input[name=pdf-size]:checked").value];
    const pages = Math.ceil(picked / (size.cols * size.rows));
    count.textContent = picked === 0 ? "Choose at least one picture." :
      picked + (picked === 1 ? " picture" : " pictures") + ", on " + pages + (pages === 1 ? " page" : " pages");
    make.disabled = picked === 0;
    renderPreview();
  }

  // Each picture is { word, src }; guess games give only the word and use the folder + word + ".webp"
  function pictureUrl(item) {
    return item.src || current.folder + item.word + ".webp";
  }

  // opts: { name, folder, items } where items is a list of { word, src? }
  function openChooser(opts) {
    current = { folder: opts.folder || "", name: opts.name };
    items = opts.items;
    list.innerHTML = items.map((item, n) =>
      `<label class="pdf-pick"><input type="checkbox" data-n="${n}" checked>` +
      `<img src="${encodeURI(pictureUrl(item))}" alt="">` +
      `<span>${item.word}</span></label>`).join("");
    updateCount();
    dialog.showModal();
  }

  // Guess-game pages: a button with data-pdf-choose, data-folder and data-name, using the page's ITEMS list
  document.querySelectorAll("[data-pdf-choose]").forEach(button =>
    button.addEventListener("click", () => openChooser({
      name: button.dataset.name,
      folder: button.dataset.folder,
      items: typeof ITEMS !== "undefined" ? ITEMS : [],
    })));

  // Other pages (such as the topic flashcards) call this with their own name and pictures
  window.openPdfChooser = (name, items) => openChooser({ name, folder: "", items });
  dialog.addEventListener("change", updateCount);
  dialog.querySelector("[data-pdf-all]").addEventListener("click", () => {
    list.querySelectorAll("input[type=checkbox]").forEach(box => box.checked = true);
    updateCount();
  });
  dialog.querySelector("[data-pdf-none]").addEventListener("click", () => {
    list.querySelectorAll("input[type=checkbox]").forEach(box => box.checked = false);
    updateCount();
  });
  dialog.querySelector("[data-pdf-cancel]").addEventListener("click", () => dialog.close());

  make.addEventListener("click", async () => {
    const sizeKey = dialog.querySelector("input[name=pdf-size]:checked").value;
    const chosen = checkedBoxes().map(box => items[Number(box.dataset.n)]);
    make.disabled = true;
    make.textContent = "Making PDF…";
    try {
      const pictures = await Promise.all(chosen.map(async item => ({
        word: item.word,
        bytes: await jpegBytes(encodeURI(pictureUrl(item)), item.word),
      })));
      const title = current.name + " pictures";
      const landscape = dialog.querySelector("input[name=pdf-orient]:checked").value === "landscape";
      saveBlob(makePdf(title, pictures, SIZES[sizeKey], landscape), title + " (" + sizeKey + (landscape ? ", crosswise" : "") + ").pdf");
      dialog.close();
    } catch (error) {
      count.textContent = "Sorry, the PDF could not be made. " + error.message;
    } finally {
      make.disabled = false;
      make.textContent = "Download PDF";
    }
  });
})();
