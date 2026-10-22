// Listening game: hear a word, tap the matching picture out of three.
// The topic comes from the address, e.g. game.html?topic=animals
const params = new URLSearchParams(location.search);
const topicKey = TOPICS[params.get("topic")] ? params.get("topic") : "animals";
const topic = TOPICS[topicKey];
const canSpeak = Voice.supported;

let rounds = [];
let round = 0;
let firstTryCount = 0;
let missedThisRound = false;
let answered = false;

document.title = topic.title + " · Listening Game";
document.getElementById("game-title").textContent = topic.title + " Listening Game";
document.getElementById("cards-link").href = encodeURI(topic.page);

function show(id) {
  for (const panel of ["start", "play", "end"]) {
    document.getElementById(panel).hidden = panel !== id;
  }
}

function say(text, options) {
  Voice.speak(text, options);
}

// Timers for the next word and the next round, cancelled when the game restarts
let wordTimer = null;
let nextTimer = null;

function startGame() {
  clearTimeout(wordTimer);
  clearTimeout(nextTimer);
  rounds = shuffled(topic.cards);
  round = 0;
  firstTryCount = 0;
  show("play");
  startRound();
}

function startRound() {
  const target = rounds[round];
  const others = shuffled(topic.cards.filter(c => c !== target)).slice(0, 2);
  const options = shuffled([target, ...others]);
  missedThisRound = false;
  answered = false;

  document.getElementById("progress").textContent = (round + 1) + " / " + rounds.length;
  document.getElementById("score").textContent = "⭐".repeat(firstTryCount);
  document.getElementById("feedback").textContent = "";

  // Without a voice on this device, show the word instead so the game still works
  const prompt = document.getElementById("prompt");
  prompt.hidden = canSpeak;
  prompt.textContent = canSpeak ? "" : "Find: " + target.word;
  document.getElementById("listen-btn").hidden = !canSpeak;

  const choices = document.getElementById("choices");
  choices.innerHTML = "";
  for (const option of options) {
    const button = document.createElement("button");
    button.className = "choice";
    button.setAttribute("aria-label", option.word);
    const img = document.createElement("img");
    img.src = option.picture;
    img.alt = "";
    button.appendChild(img);
    button.addEventListener("click", () => choose(button, option, target));
    choices.appendChild(button);
  }

  // Load the next round's picture early
  if (rounds[round + 1]) new Image().src = rounds[round + 1].picture;

  wordTimer = setTimeout(() => say(target.word), 400);
}

function choose(button, option, target) {
  if (answered) return;
  const feedback = document.getElementById("feedback");

  if (option === target) {
    answered = true;
    button.classList.add("right");
    if (!missedThisRound) firstTryCount++;
    document.getElementById("score").textContent = "⭐".repeat(firstTryCount);
    const cheer = Voice.praise();
    feedback.textContent = cheer + " " + target.word + "!";
    say("Yes! " + target.word + "! " + cheer);
    document.querySelectorAll(".choice").forEach(b => (b.disabled = true));
    nextTimer = setTimeout(nextRound, 2400);
  } else {
    missedThisRound = true;
    button.classList.add("wrong");
    button.disabled = true;
    feedback.textContent = "Oops! Try again!";
    say("Oops! Try again.");
    say(target.word, { queue: true });
  }
}

function nextRound() {
  round++;
  if (round < rounds.length) {
    startRound();
  } else {
    document.getElementById("end-message").textContent =
      "You found " + firstTryCount + " of " + rounds.length + " on the first try!";
    show("end");
    say("Yay! You found " + firstTryCount + " on the first try! " + Voice.praise());
    document.getElementById("again-btn").focus();
  }
}

document.getElementById("start-btn").addEventListener("click", startGame);
document.getElementById("again-btn").addEventListener("click", startGame);
document.getElementById("listen-btn").addEventListener("click", () => say(rounds[round].word));
document.getElementById("voice-link").addEventListener("click", () => Voice.openPicker());
