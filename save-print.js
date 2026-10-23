// Downloads the printable page as one HTML file, with its styles and pictures built in,
// so it still prints the same way later and works offline. Open the file and print it.
// removeSelector: the parts of the page that are only for the screen (buttons, options)
async function savePrintable(filename, removeSelector) {
  const copy = document.documentElement.cloneNode(true);
  copy.querySelectorAll("script, " + removeSelector).forEach(element => element.remove());

  // Stylesheets from this app go inside the file; the Google font stays a link
  for (const link of copy.querySelectorAll('link[rel="stylesheet"]')) {
    if (!link.href.startsWith(location.origin)) continue;
    const style = document.createElement("style");
    style.textContent = await (await fetch(link.href)).text();
    link.replaceWith(style);
  }

  // Pictures go inside the file as data, so the file does not need the app folder
  for (const img of copy.querySelectorAll("img")) {
    const blob = await (await fetch(new URL(img.getAttribute("src"), location.href))).blob();
    img.src = await new Promise(resolve => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  }

  const file = new Blob(["<!DOCTYPE html>\n" + copy.outerHTML], { type: "text/html" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(file);
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(link.href), 1000);
}
