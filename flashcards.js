// Shared flashcard behavior. Each topic page defines `cards` before loading this file.
let current = 0;
let finished = false;

const card = document.querySelector(".card");

// The "well done" screen shown after the last card
const celebration = document.createElement("div");
celebration.className = "celebration";
celebration.hidden = true;
celebration.innerHTML =
  '<div class="celebration-emoji">🎉</div>' +
  "<h2>Well done!</h2>" +
  "<p>You finished all " + cards.length + " cards!</p>" +
  '<button onclick="nextCard()">Start again</button>';
card.appendChild(celebration);

// direction: 1 for Next, -1 for Back, 0 for the first card (no animation)
function showCard(direction) {
  const word = cards[current].word;
  document.getElementById("word").textContent = word;
  document.getElementById("picture").src = cards[current].picture;
  document.getElementById("picture").alt = word;
  document.getElementById("counter").textContent = (current + 1) + " / " + cards.length;

  if (direction) {
    card.classList.remove("slide-next", "slide-back");
    void card.offsetWidth; // restart the animation even if it's the same class
    card.classList.add(direction > 0 ? "slide-next" : "slide-back");
  }

  // Load the neighbouring pictures early so they appear instantly
  for (const offset of [1, -1]) {
    new Image().src = cards[(current + offset + cards.length) % cards.length].picture;
  }
}

function showCelebration() {
  finished = true;
  card.classList.add("finished");
  celebration.hidden = false;
  document.getElementById("counter").textContent = "All done!";
  celebration.querySelector("button").focus();
  launchConfetti();
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
  } else if (current === cards.length - 1) {
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
    current = (current - 1 + cards.length) % cards.length;
  }
  showCard(-1);
}

function speakWord() {
  const utterance = new SpeechSynthesisUtterance(cards[current].word);
  utterance.lang = "en-GB";
  utterance.rate = 0.8;
  speechSynthesis.speak(utterance);
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

// Keyboard: left and right arrow keys move between cards
document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight") nextCard();
  if (event.key === "ArrowLeft") prevCard();
});

// Touch: swipe left for the next card, swipe right to go back
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
