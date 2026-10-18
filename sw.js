// Offline support: saves every page, script, style and flashcard picture on the device the first time
// the app is opened, then serves them from there. Pictures are read from topics.js, so new topics are included.
// Change VERSION when you change or remove pictures, so devices fetch them again.
const VERSION = "v6";
const CACHE = "lets-learn-" + VERSION;

importScripts("topics.js");

const APP_FILES = [
  "./", "index.html", "teacher.html", "game.html", "print.html", "worksheet.html",
  "theme.css", "style.css", "game.css", "teacher.css",
  "topics.js", "flashcards.js", "animals.js", "voice.js", "game.js", "teacher.js", "teacher-content.js", "pwa.js",
  "manifest.webmanifest", "icons/icon.svg", "icons/icon-192.png", "icons/apple-touch-icon.png"
];

function topicFiles() {
  const files = [];
  Object.values(TOPICS).forEach(topic => {
    files.push(topic.page);
    topic.cards.forEach(card => {
      files.push(card.picture);
      if (card.drawing) files.push(card.drawing);
    });
  });
  return files;
}

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE)
      .then(cache => cache.addAll(APP_FILES.concat(topicFiles()).map(encodeURI)))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

function save(request, response) {
  if (response.ok || response.type === "opaque") {
    const copy = response.clone();
    caches.open(CACHE).then(cache => cache.put(request, copy));
  }
  return response;
}

// Pages, scripts and styles: fresh from the internet when online (so updates show straight away),
// the saved copy when offline. Pictures and fonts: saved copy first, because they rarely change.
self.addEventListener("fetch", event => {
  const request = event.request;
  if (request.method !== "GET") return;
  const fresh = request.mode === "navigate" || ["script", "style", "manifest"].includes(request.destination);
  if (fresh) {
    event.respondWith(
      // "no-cache" asks the server whether there's a newer copy instead of trusting the browser's short-term cache
      fetch(request.mode === "navigate" ? request.url : request, { cache: "no-cache" })
        .then(response => save(request, response))
        .catch(() => caches.match(request, { ignoreSearch: true }))
    );
  } else {
    event.respondWith(
      caches.match(request).then(saved => saved || fetch(request).then(response => save(request, response)))
    );
  }
});
