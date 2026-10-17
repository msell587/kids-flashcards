// Lets the app be installed and used offline (works once it's served from a web address, not from a file)
if ("serviceWorker" in navigator && location.protocol !== "file:") {
  navigator.serviceWorker.register("sw.js").catch(() => {
    // Offline mode isn't available here; the app still works online
  });
}
