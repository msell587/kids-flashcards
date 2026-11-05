// Print pictures: prints every picture of a guess game on one A4 page, each with its word,
// so the photos can be kept or cut out. A button with data-print-pictures and data-folder
// (the picture folder, e.g. "images/spring-guess/") prints the game's ITEMS.
(function () {
  const sheet = document.createElement("div");
  sheet.id = "print-sheet";
  sheet.setAttribute("aria-hidden", "true");
  document.body.appendChild(sheet);

  document.querySelectorAll("[data-print-pictures]").forEach(button => {
    button.addEventListener("click", () => {
      const folder = button.dataset.folder;
      sheet.innerHTML = ITEMS.map(item =>
        `<figure><img src="${encodeURI(folder + item.word + ".webp")}" alt="${item.word}"><figcaption>${item.word}</figcaption></figure>`
      ).join("");
      document.body.classList.add("printing-pictures");
      printWhenLoaded();
    });
  });
  window.addEventListener("afterprint", () => document.body.classList.remove("printing-pictures"));
})();
