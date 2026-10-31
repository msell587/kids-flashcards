// Helpers shared by the game pages. Load after voice.js, before the page's own script.

// A shuffled copy of the list (the original is left alone)
function shuffled(list) {
  const copy = [...list];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function pick(list) {
  return list[Math.floor(Math.random() * list.length)];
}

// Read text aloud when speech is available on this device
function say(text) {
  if (Voice.supported) Voice.speak(text);
}

// Back returns to the page the child came from, not always the topic page.
// Call with the Back link; the link's own href is used when there is no history.
function backToPrevious(button) {
  button.addEventListener("click", event => {
    if (history.length > 1) {
      event.preventDefault();
      history.back();
    }
  });
}
