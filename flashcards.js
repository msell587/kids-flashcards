// Shared flashcard behavior. Each topic page defines `cards` before loading this file.
let current = 0;

// direction: 1 for Next, -1 for Back, 0 for the first card (no animation)
function showCard(direction) {
  document.getElementById("word").textContent = cards[current].word;
  document.getElementById("picture").src = cards[current].picture;
  document.getElementById("counter").textContent = (current + 1) + " / " + cards.length;

  if (direction) {
    const card = document.querySelector(".card");
    card.classList.remove("slide-next", "slide-back");
    void card.offsetWidth; // restart the animation even if it's the same class
    card.classList.add(direction > 0 ? "slide-next" : "slide-back");
  }

  // Load the neighbouring pictures early so they appear instantly
  for (const offset of [1, -1]) {
    new Image().src = cards[(current + offset + cards.length) % cards.length].picture;
  }
}

function nextCard() {
  current = (current + 1) % cards.length;
  showCard(1);
}

function prevCard() {
  current = (current - 1 + cards.length) % cards.length;
  showCard(-1);
}

function speakWord() {
  const utterance = new SpeechSynthesisUtterance(cards[current].word);
  utterance.lang = "en-GB";
  utterance.rate = 0.8;
  speechSynthesis.speak(utterance);
}

showCard(0);
