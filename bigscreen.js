// Big screen: fills the whole screen with the picture, for a TV or projector.
// Any button with data-big-screen turns it on or off; the page gets the class "big-screen" while it is on.
(function () {
  const buttons = [...document.querySelectorAll("[data-big-screen]")];
  // Some devices (most iPhones) cannot go full screen in a browser, so the button is not shown there
  if (!document.fullscreenEnabled) {
    buttons.forEach(button => button.hidden = true);
    return;
  }
  buttons.forEach(button => button.addEventListener("click", () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen().catch(() => {});
    }
  }));
  document.addEventListener("fullscreenchange", () => {
    const on = Boolean(document.fullscreenElement);
    document.body.classList.toggle("big-screen", on);
    buttons.forEach(button => button.textContent = on ? "Exit big screen" : "Big screen");
  });
})();
