// Lets the app be installed and used offline (works once it's served from a web address, not from a file)
if ("serviceWorker" in navigator && location.protocol !== "file:") {
  navigator.serviceWorker.register("sw.js").catch(() => {
    // Offline mode isn't available here; the app still works online
  });
}

// Every page except Home gets a Back button that returns to the page the teacher came from, not only to Home.
// Pages that already have their own Back button (autumn-guess, colouring) are left as they are.
(function addBackButton() {
  if (location.pathname === "/" || location.pathname.endsWith("/index.html")) return;
  if (document.getElementById("back-link") || document.getElementById("back-btn")) return;
  const bar = document.querySelector("nav.topbar, nav.links, header.top, .bar");
  if (!bar) return;
  // A bar that already has a Back link or button does not get a second one
  if ([...bar.querySelectorAll("a, button")].some(el => el.textContent.trim() === "Back")) return;
  const back = document.createElement("a");
  back.id = "page-back";
  back.href = "index.html";
  back.textContent = "Back";
  // Match the buttons already on the page: the bottom link row uses link-btn, other bars get an inline pill
  if (bar.classList.contains("links")) {
    back.className = "link-btn";
  } else {
    back.style.cssText = "padding:7px 14px;font-size:15px;font-weight:800;font-family:inherit;" +
      "color:var(--word,#2f6f9f);background-color:var(--surface,#fff);border-radius:999px;" +
      "text-decoration:none;white-space:nowrap;justify-self:end;box-shadow:0 2px 4px rgba(36,90,131,0.12);";
  }
  back.addEventListener("click", event => {
    // Go back to the page before this one; Home is only the fallback when there is no earlier page
    if (history.length > 1) {
      event.preventDefault();
      history.back();
    }
  });
  bar.appendChild(back);
})();

// Drop-down menus (the More and Tools menus) close when anything else on the page is clicked,
// or when one of their links or buttons is used. Clicking a menu's own button still opens and closes it.
document.addEventListener("click", event => {
  document.querySelectorAll("details[open]").forEach(menu => {
    if (!menu.querySelector("summary").contains(event.target)) menu.open = false;
  });
});
