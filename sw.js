// Offline support: saves every page, script and style on the device the first time the app is opened.
// Each flashcard picture is saved the first time it is shown, so the first visit stays small.
// Change VERSION when you change or remove pictures, so devices fetch them again.
const VERSION = "v118";
const CACHE = "lets-learn-" + VERSION;

importScripts("topics.js");

const APP_FILES = [
  "./", "index.html", "teacher.html", "game.html", "season-game.html", "autumn-guess.html", "summer-guess.html", "spring-guess.html",  "winter-guess.html", "season-quiz.html","weather-sort.html","weather-quiz.html","weather-memory.html","weather-chart.html","picture-guess.html","classroom-game.html", "colouring.html", "print.html", "worksheet.html",
  "theme.css", "style.css", "game.css", "teacher.css",
  "topics.js", "flashcards.js", "animals.js", "effects.js", "voice.js", "game.js", "teacher.js", "teacher-content.js", "colouring-scenes.js", "pwa.js", "save-print.js", "bigscreen.js", "guess-print.js", "guess-pdf.js",
  "manifest.webmanifest", "icons/icon.svg", "icons/icon-192.png", "icons/apple-touch-icon.png"
];

// Topic pages are saved up front; their pictures are saved when first shown (see the fetch handler)
function topicPages() {
  return [...new Set(Object.values(TOPICS).map(topic => topic.page))];
}

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE)
      .then(cache => Promise.all(
        APP_FILES.concat(topicPages()).map(url =>
          // Save each file on its own: one missing file should not stop the others being saved
          cache.add(encodeURI(url)).catch(() => {
            console.warn("Could not save for offline use:", url);
          })
        )
      ))
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
