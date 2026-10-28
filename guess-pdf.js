// Download PDF: a chooser for the pictures of a guess game. The user picks the picture size
// (how many per page) and which pictures to include, and the PDF is made in the browser.
// A button with data-pdf-choose, data-folder (the picture folder) and data-name (the game's name) opens it.
(function () {
  const SIZES = {
    big: { label: "Big: 1 per page", cols: 1, rows: 1, font: 22 },
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
  function makePdf(title, pictures, size) {
    const perPage = size.cols * size.rows;
    const cellW = (PAGE_W - 2 * MARGIN - (size.cols - 1) * GAP) / size.cols;
    const cellH = (PAGE_H - 2 * MARGIN - TITLE_H - (size.rows - 1) * GAP) / size.rows;
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
      const ops = [`BT /F2 18 Tf ${MARGIN} ${PAGE_H - MARGIN - 18} Td (${escapePdf(title)}) Tj ET`];
      group.forEach((picture, n) => {
        const { w, h } = jpegSize(picture.bytes);
        const imageId = add([`<< /Type /XObject /Subtype /Image /Width ${w} /Height ${h} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${picture.bytes.length} >>\nstream\n`, picture.bytes, "\nendstream"]);
        const name = "Im" + (n + 1);
        xobjects.push(`/${name} ${imageId} 0 R`);

        const col = n % size.cols;
        const row = Math.floor(n / size.cols);
        const x0 = MARGIN + col * (cellW + GAP);
        const cellTop = PAGE_H - MARGIN - TITLE_H - row * (cellH + GAP);
        const boxH = cellH - captionH;
        const scale = Math.min(cellW / w, boxH / h);
        const dw = w * scale;
        const dh = h * scale;
        const dx = x0 + (cellW - dw) / 2;
        const dy = cellTop - dh;
        ops.push(`q ${dw.toFixed(2)} 0 0 ${dh.toFixed(2)} ${dx.toFixed(2)} ${dy.toFixed(2)} cm /${name} Do Q`);
        const textW = picture.word.length * 0.5 * size.font;
        const tx = x0 + Math.max(0, (cellW - textW) / 2);
        const ty = cellTop - boxH - size.font;
        ops.push(`BT /F1 ${size.font} Tf ${tx.toFixed(2)} ${ty.toFixed(2)} Td (${escapePdf(picture.word)}) Tj ET`);
      });
      const content = ops.join("\n");
      const contentId = add([`<< /Length ${content.length} >>\nstream\n${content}\nendstream`]);
      pageIds.push(add([`<< /Type /Page /Parent ${pagesId} 0 R /MediaBox [0 0 ${PAGE_W} ${PAGE_H}] /Contents ${contentId} 0 R ` +
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
    '<fieldset><legend>Pictures</legend>' +
    '<div class="pdf-pick-tools"><button type="button" data-pdf-all>Select all</button><button type="button" data-pdf-none>Clear</button></div>' +
    '<div class="pdf-pick-list" id="pdf-list"></div>' +
    '</fieldset>' +
    '<p class="pdf-count" id="pdf-count" aria-live="polite"></p>' +
    '<div class="pdf-actions"><button type="button" data-pdf-cancel>Cancel</button>' +
    '<button type="button" class="primary" id="pdf-make">Download PDF</button></div>';
  document.body.appendChild(dialog);

  let current = { folder: "", name: "" };
  const list = dialog.querySelector("#pdf-list");
  const count = dialog.querySelector("#pdf-count");
  const make = dialog.querySelector("#pdf-make");

  function checkedBoxes() {
    return [...list.querySelectorAll("input[type=checkbox]:checked")];
  }
  function updateCount() {
    const picked = checkedBoxes().length;
    const size = SIZES[dialog.querySelector("input[name=pdf-size]:checked").value];
    const pages = Math.ceil(picked / (size.cols * size.rows));
    count.textContent = picked === 0 ? "Choose at least one picture." :
      picked + (picked === 1 ? " picture" : " pictures") + ", on " + pages + (pages === 1 ? " page" : " pages");
    make.disabled = picked === 0;
  }

  function openChooser(button) {
    current = { folder: button.dataset.folder, name: button.dataset.name };
    list.innerHTML = ITEMS.map((item, n) =>
      `<label class="pdf-pick"><input type="checkbox" data-n="${n}" checked>` +
      `<img src="${encodeURI(current.folder + item.word + ".jpg")}" alt="">` +
      `<span>${item.word}</span></label>`).join("");
    updateCount();
    dialog.showModal();
  }

  document.querySelectorAll("[data-pdf-choose]").forEach(button =>
    button.addEventListener("click", () => openChooser(button)));
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
    const chosen = checkedBoxes().map(box => ITEMS[Number(box.dataset.n)]);
    make.disabled = true;
    make.textContent = "Making PDF…";
    try {
      const pictures = await Promise.all(chosen.map(async item => {
        const response = await fetch(encodeURI(current.folder + item.word + ".jpg"));
        if (!response.ok) throw new Error("Missing picture: " + item.word);
        return { word: item.word, bytes: new Uint8Array(await response.arrayBuffer()) };
      }));
      const title = current.name + " pictures";
      saveBlob(makePdf(title, pictures, SIZES[sizeKey]), title + " (" + sizeKey + ").pdf");
      dialog.close();
    } catch (error) {
      count.textContent = "Sorry, the PDF could not be made. " + error.message;
    } finally {
      make.disabled = false;
      make.textContent = "Download PDF";
    }
  });
})();
