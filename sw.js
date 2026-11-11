// Offline support: saves every page, script and style on the device the first time the app is opened.
// Each flashcard picture is saved the first time it is shown, so the first visit stays small.
// Change VERSION when you change or remove pictures, so devices fetch them again.
const VERSION = "v224";
const CACHE = "lets-learn-" + VERSION;

importScripts("topics.js");

// Every page, script and style the app needs. tests/hygiene.test.js fails if a page or script is missing here.
const APP_FILES = [
  "./",
  // Pages
  "animals-game.html",
  "animals.html",
  "autumn-guess.html",
  "christmas.html",
  "city.html",
  "classroom-game.html",
  "clothes-game.html",
  "colors.html",
  "colouring.html",
  "community-game.html",
  "community.html",
  "days-game.html",
  "days.html",
  "explorers.html",
  "feelings.html",
  "food-game.html",
  "game.html",
  "garden.html",
  "hot-cold-game.html",
  "house.html",
  "index.html",
  "insect-or-bug.html",
  "madrid.html",
  "on-the-move-games.html",
  "opposites.html",
  "pdf-view.html",
  "picture-guess.html",
  "print.html",
  "printables.html",
  "privacy.html",
  "school.html",
  "season-game.html",
  "season-quiz.html",
  "seasons.html",
  "shapes.html",
  "spring-guess.html",
  "summer-guess.html",
  "teacher.html",
  "topic-game.html",
  "toys-game.html",
  "toys.html",
  "transport.html",
  "undersea-game.html",
  "undersea.html",
  "voice-help.html",
  "weather-chart.html",
  "weather-feelings-game.html",
  "weather-memory.html",
  "weather-quiz.html",
  "weather-sentence-game.html",
  "weather-sort.html",
  "weather.html",
  "what-can-it-do.html",
  "winter-guess.html",
  "worksheet.html",
  // Styles
  "theme.css",
  "style.css",
  "game.css",
  "teacher.css",
  // Scripts
  "animals.js",
  "bigscreen.js",
  "colouring-scenes.js",
  "effects.js",
  "flashcards.js",
  "game-common.js",
  "game.js",
  "guard.js",
  "guess-pdf.js",
  "guess-print.js",
  "pwa.js",
  "save-print.js",
  "sheet-access.js",
  "teacher-content.js",
  "teacher.js",
  "topics.js",
  "voice.js",
  // Install settings and icons
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

// Pages, scripts and styles: the saved copy is shown straight away (so a page never waits on the network
// and no page appears before its styles), and the internet copy is checked in the background and saved
// for next time. A new VERSION re-saves everything on install, so changes still reach devices.
// Pictures and fonts: saved copy first, because they rarely change.
self.addEventListener("fetch", event => {
  const request = event.request;
  if (request.method !== "GET") return;
  const fresh = request.mode === "navigate" || ["script", "style", "manifest"].includes(request.destination);
  if (fresh) {
    event.respondWith(
      caches.open(CACHE).then(async cache => {
        const saved = await cache.match(request, { ignoreSearch: true });
        // "no-cache" asks the server whether there's a newer copy instead of trusting the browser's short-term cache
        const update = fetch(request.mode === "navigate" ? request.url : request, { cache: "no-cache" })
          .then(response => save(request, response));
        if (saved) {
          update.catch(() => {});
          return saved;
        }
        return update.catch(() => caches.match(request, { ignoreSearch: true }));
      })
    );
  } else {
    event.respondWith(
      caches.match(request).then(saved => saved || fetch(request).then(response => save(request, response)))
    );
  }
});
