// Shared flashcard behavior. Each topic page defines `cards` (from topics.js) before loading this file.
let deck = cards.slice(); // the order the cards are shown in; changes when shuffled
let current = 0;
let finished = false;
let guessMode = false; // "Hide words": show the picture first, word on tap

const card = document.querySelector(".card");
const wordEl = document.getElementById("word");
const topicKey = Object.keys(TOPICS).find(key => TOPICS[key].cards === cards);

// The "well done" screen shown after the last card
const celebration = document.createElement("div");
celebration.className = "celebration";
celebration.hidden = true;
celebration.innerHTML =
  '<div class="celebration-emoji">🎉</div>' +
  "<h2>Well done!</h2>" +
  "<p>You finished all " + cards.length + " cards!</p>" +
  '<p class="star-earned">⭐ You earned a star!</p>' +
  '<button onclick="nextCard()">Start again</button>';
card.appendChild(celebration);

// In "Hide words" mode this button sits where the word goes until it's tapped
const revealButton = document.createElement("button");
revealButton.className = "reveal";
revealButton.textContent = "Show the word";
revealButton.addEventListener("click", (event) => {
  event.stopPropagation();
  revealWord();
});
wordEl.after(revealButton);

// The Spanish word under the English one, hidden with it in "Hide words" mode
const spanishEl = document.createElement("p");
spanishEl.className = "spanish-word";
wordEl.after(spanishEl);

// Extra tools under the cards: the game, plus an Options button that opens the rest, grouped
const tools = document.createElement("div");
tools.className = "tools";
tools.innerHTML =
  '<div class="tools-row">' +
    '<button class="tool" id="options-btn" aria-expanded="false" aria-controls="options-panel">Options</button>' +
  '</div>' +
  '<div class="options-panel" id="options-panel" hidden>' +
    '<div class="option-group" role="group" aria-labelledby="practise-label">' +
      '<h2 id="practise-label">Practise</h2>' +
      '<div><button class="tool" id="shuffle-btn">Shuffle</button>' +
      '<button class="tool" id="guess-btn">Hide words</button>' +
      '<a class="tool" id="game-link" href="game.html?topic=' + topicKey + '">Listening game</a>' +
      (topicKey === "seasons" ? '<a class="tool" id="season-sort-link" href="season-game.html">Season Sort</a>' : '') +
      (topicKey === "colors" ? '<a class="tool" id="colour-link" href="colouring.html?topic=colors">Colouring</a>' : '') +
      '</div>' +
    '</div>' +
    '<div class="option-group" role="group" aria-labelledby="screen-label">' +
      '<h2 id="screen-label">Screen &amp; sound</h2>' +
      '<div><button class="tool" id="big-btn">Big screen</button>' +
      '<button class="tool" id="voice-btn">Voice</button>' +
      '<button class="tool" id="speaker-btn" aria-pressed="false">Speaker button</button></div>' +
    '</div>' +
  '</div>';
document.querySelector(".nav-buttons").after(tools);

const optionsButton = document.getElementById("options-btn");
const optionsPanel = document.getElementById("options-panel");
function setOptionsOpen(open) {
  optionsPanel.hidden = !open;
  optionsButton.setAttribute("aria-expanded", open);
  optionsButton.classList.toggle("on", open);
  if (open) optionsPanel.scrollIntoView({ block: "nearest", behavior: "smooth" });
}
optionsButton.addEventListener("click", () => setOptionsOpen(optionsPanel.hidden));

// Picking any option closes the panel again, so it does not cover the cards
optionsPanel.addEventListener("click", (event) => {
  if (event.target.closest("button, a")) {
    setOptionsOpen(false);
    optionsButton.focus({ preventScroll: true });
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !optionsPanel.hidden) {
    setOptionsOpen(false);
    optionsButton.focus();
  }
});

// direction: 1 for Next, -1 for Back, 0 for no animation
function showCard(direction) {
  const word = deck[current].word;
  wordEl.textContent = word;
  spanishEl.textContent = deck[current].es || "";
  document.getElementById("picture").src = deck[current].picture;
  document.getElementById("picture").alt = guessMode ? "Guess the picture" : word;
  document.getElementById("counter").textContent = (current + 1) + " / " + deck.length;
  card.classList.toggle("hidden-word", guessMode);

  if (direction) {
    card.classList.remove("slide-next", "slide-back");
    void card.offsetWidth; // restart the animation even if it's the same class
    card.classList.add(direction > 0 ? "slide-next" : "slide-back");
  }

  // Load the neighbouring pictures early so they appear instantly
  for (const offset of [1, -1]) {
    new Image().src = deck[(current + offset + deck.length) % deck.length].picture;
  }
}

function revealWord() {
  if (!card.classList.contains("hidden-word")) return;
  card.classList.remove("hidden-word");
  document.getElementById("picture").alt = deck[current].word;
  speakWord();
}

function showCelebration() {
  finished = true;
  card.classList.add("finished");
  celebration.hidden = false;
  document.getElementById("counter").textContent = "All done!";
  celebration.querySelector("button").focus();
  earnStar();
  launchConfetti();
  Voice.speak("Yay! You did it! " + Voice.praise());
}

function hideCelebration() {
  finished = false;
  card.classList.remove("finished");
  celebration.hidden = true;
}

function nextCard() {
  if (finished) {
    hideCelebration();
    current = 0;
  } else if (current === deck.length - 1) {
    showCelebration();
    return;
  } else {
    current = current + 1;
  }
  showCard(1);
}

function prevCard() {
  if (finished) {
    hideCelebration(); // go back to the last card
  } else {
    current = (current - 1 + deck.length) % deck.length;
  }
  showCard(-1);
}

let speakingTurn = 0;
function speakWord() {
  const speakButton = card.querySelector(".speak");
  // Starting a new word interrupts the old one, which reports "finished"; ignore that
  const turn = ++speakingTurn;
  const stop = () => {
    if (turn !== speakingTurn) return;
    card.classList.remove("speaking");
    speakButton.classList.remove("speaking");
  };
  // Clear the slide-in so it doesn't replay when the wiggle stops
  card.classList.remove("slide-next", "slide-back");
  card.classList.add("speaking");
  speakButton.classList.add("speaking");
  Voice.speak(deck[current].word, { onEnd: stop });
  setTimeout(stop, 3000); // in case the device never says it has finished
}

// Remember finished topics so the home page can show a star on their tile
function earnStar() {
  try {
    let done = JSON.parse(localStorage.getItem("finished-topics") || "[]");
    if (!Array.isArray(done)) done = [];
    if (!done.includes(topicKey)) {
      done.push(topicKey);
      localStorage.setItem("finished-topics", JSON.stringify(done));
    }
  } catch (error) {
    // Stars just won't be remembered in this browser
  }
}

function launchConfetti() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const shapes = ["🎉", "⭐", "🌟", "🎈"];
  for (let i = 0; i < 30; i++) {
    const piece = document.createElement("span");
    piece.className = "confetti";
    piece.textContent = shapes[i % shapes.length];
    piece.style.left = Math.random() * 100 + "vw";
    piece.style.animationDelay = Math.random() * 0.8 + "s";
    piece.style.animationDuration = 2 + Math.random() * 1.5 + "s";
    document.body.appendChild(piece);
    setTimeout(() => piece.remove(), 4500);
  }
}

/* ---------- Tools ---------- */

const shuffleButton = document.getElementById("shuffle-btn");
shuffleButton.addEventListener("click", () => {
  const isShuffled = shuffleButton.classList.toggle("on");
  shuffleButton.textContent = isShuffled ? "Back to order" : "Shuffle";
  applyDeck();
});

// Rebuilds the deck from all the words, shuffled or in order
function applyDeck() {
  deck = shuffleButton.classList.contains("on") ? shuffled(cards) : cards.slice();
  if (finished) hideCelebration();
  current = 0;
  showCard(1);
}

const guessButton = document.getElementById("guess-btn");
guessButton.addEventListener("click", () => {
  guessMode = guessButton.classList.toggle("on");
  guessButton.textContent = guessMode ? "Show words" : "Hide words";
  showCard(0);
});

// Tapping the card in "Hide words" mode shows the word
card.addEventListener("click", (event) => {
  if (!event.target.closest("button")) revealWord();
});

document.getElementById("voice-btn").addEventListener("click", () => Voice.openPicker());

// Optional 🔊 button on the card; off unless the user switches it on, and remembered
const speakerButton = document.getElementById("speaker-btn");
function setSpeakerButton(on) {
  document.body.classList.toggle("show-speaker", on);
  speakerButton.setAttribute("aria-pressed", on);
  speakerButton.classList.toggle("on", on);
  speakerButton.textContent = on ? "Speaker button: on" : "Speaker button";
}
try {
  setSpeakerButton(localStorage.getItem("show-speaker") === "1");
} catch (error) {
  setSpeakerButton(false);
}
speakerButton.addEventListener("click", () => {
  const on = !document.body.classList.contains("show-speaker");
  setSpeakerButton(on);
  try {
    localStorage.setItem("show-speaker", on ? "1" : "0");
  } catch (error) {
    // The choice just won't be remembered in this browser
  }
});

const bigButton = document.getElementById("big-btn");
bigButton.addEventListener("click", () => {
  if (document.body.classList.contains("classroom")) {
    exitBigScreen();
  } else {
    document.body.classList.add("classroom");
    bigButton.textContent = "Exit big screen";
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen().catch(() => {});
    }
  }
});

function exitBigScreen() {
  document.body.classList.remove("classroom");
  bigButton.textContent = "Big screen";
  if (document.fullscreenElement) document.exitFullscreen();
}

// Leaving full screen with the Esc key also leaves big-screen mode
document.addEventListener("fullscreenchange", () => {
  if (!document.fullscreenElement && document.body.classList.contains("classroom")) exitBigScreen();
});

/* ---------- Keyboard and touch ---------- */

// Arrow keys move between cards; Space shows the word in "Hide words" mode
document.addEventListener("keydown", (event) => {
  // Leave the keys alone while choosing in the Voice picker or another form field
  const inForm = event.target instanceof Element && event.target.closest("dialog, input, select, textarea");
  if (inForm || document.querySelector("dialog[open]")) return;
  if (event.key === "ArrowRight") nextCard();
  if (event.key === "ArrowLeft") prevCard();
  const onControl = event.target instanceof Element && event.target.closest("button, a");
  if (event.key === " " && card.classList.contains("hidden-word") && !onControl) {
    event.preventDefault();
    revealWord();
  }
});

// Swipe left for the next card, swipe right to go back
let touchStartX = 0;
let touchStartY = 0;
card.addEventListener("touchstart", (event) => {
  touchStartX = event.changedTouches[0].clientX;
  touchStartY = event.changedTouches[0].clientY;
}, { passive: true });
card.addEventListener("touchend", (event) => {
  const dx = event.changedTouches[0].clientX - touchStartX;
  const dy = event.changedTouches[0].clientY - touchStartY;
  if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
    if (dx < 0) nextCard();
    else prevCard();
  }
});

showCard(0);
