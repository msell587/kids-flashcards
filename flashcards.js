// Shared flashcard behavior. Each topic page defines `cards` before loading this file.
let current = 0;

function showCard() {
  document.getElementById("word").textContent = cards[current].word;
  document.getElementById("picture").src = cards[current].picture;
  document.getElementById("counter").textContent = (current + 1) + " / " + cards.length;
}

function nextCard() {
  current = (current + 1) % cards.length;
  showCard();
}

function prevCard() {
  current = (current - 1 + cards.length) % cards.length;
  showCard();
}

function speakWord() {
  const utterance = new SpeechSynthesisUtterance(cards[current].word);
  utterance.lang = "en-GB";
  utterance.rate = 0.8;
  speechSynthesis.speak(utterance);
}

showCard();
