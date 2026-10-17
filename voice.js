// Shared voice for the flashcards and the listening game.
// Picks the most natural-sounding English voice on this device, or the one chosen in the 🗣 Voice picker.
const Voice = (() => {
  const supported = "speechSynthesis" in window;

  // Joke/robot voices that ship with some computers; never picked or offered
  const NOVELTY = ["Albert", "Bad News", "Bahh", "Bells", "Boing", "Bubbles", "Cellos", "Fred", "Good News",
    "Jester", "Junior", "Organ", "Ralph", "Superstar", "Trinoids", "Whisper", "Wobble", "Zarvox", "Kathy"];
  // Older robotic-sounding voices: offered in the picker, but never chosen automatically over a better one
  const ROBOTIC = ["Eddy", "Flo", "Grandma", "Grandpa", "Reed", "Rocko", "Sandy", "Shelley"];
  // Voices that sound natural (names used by Apple, Microsoft and Google)
  const NATURAL = /natural|neural|premium|enhanced|siri|google|samantha|daniel|martha|arthur|serena|kate|oliver|karen|moira|tessa|catherine|libby|sonia|ryan|aria|jenny|guy/i;

  const SPEEDS = { slow: 0.7, normal: 0.85, fast: 1 };
  const PITCHES = { calm: 1, cheerful: 1.15, silly: 1.4 };
  const PRAISE = ["Great job!", "You got it!", "Super!", "Well done!", "Hooray!", "Brilliant!", "Amazing!", "Fantastic!"];
  const ACCENTS = { GB: "UK", US: "US", AU: "Australia", IE: "Ireland", IN: "India", ZA: "South Africa", NZ: "New Zealand", CA: "Canada" };

  let voices = [];

  function baseName(voice) {
    return voice.name.split(" (")[0];
  }

  function loadVoices() {
    voices = speechSynthesis.getVoices().filter(v =>
      v.lang.replace("_", "-").toLowerCase().startsWith("en") && !NOVELTY.includes(baseName(v)));
  }

  function settings() {
    try {
      return JSON.parse(localStorage.getItem("voice-settings")) || {};
    } catch (error) {
      return {};
    }
  }

  function saveSettings(newSettings) {
    try {
      localStorage.setItem("voice-settings", JSON.stringify(newSettings));
    } catch (error) {
      // Settings just won't be remembered in this browser
    }
  }

  // Higher score = more natural; British English first, as the app has always used
  function score(voice) {
    let points = 0;
    if (/natural|neural|premium|enhanced/i.test(voice.name)) points += 100;
    if (NATURAL.test(voice.name)) points += 50;
    if (ROBOTIC.includes(baseName(voice))) points -= 100;
    if (voice.lang.replace("_", "-") === "en-GB") points += 20;
    if (voice.lang.replace("_", "-") === "en-US") points += 10;
    return points;
  }

  function ranked() {
    return voices.slice().sort((a, b) => score(b) - score(a));
  }

  function current() {
    const chosen = settings().name;
    return voices.find(v => v.name === chosen) || ranked()[0] || null;
  }

  function label(voice) {
    const region = voice.lang.replace("_", "-").split("-")[1] || "";
    const natural = NATURAL.test(voice.name) && !ROBOTIC.includes(baseName(voice));
    return baseName(voice) + " (" + (ACCENTS[region] || voice.lang) + ")" + (natural ? " ★" : "");
  }

  // options.queue: wait for anything already speaking instead of interrupting it
  function speak(text, options = {}) {
    if (!supported) return;
    if (!options.queue) speechSynthesis.cancel();
    const s = settings();
    const utterance = new SpeechSynthesisUtterance(text);
    const voice = current();
    if (voice) {
      utterance.voice = voice;
      utterance.lang = voice.lang;
    } else {
      utterance.lang = "en-GB";
    }
    utterance.rate = SPEEDS[s.speed] || SPEEDS.normal;
    utterance.pitch = PITCHES[s.pitch] || PITCHES.cheerful;
    speechSynthesis.speak(utterance);
  }

  function praise() {
    return PRAISE[Math.floor(Math.random() * PRAISE.length)];
  }

  /* ---------- The 🗣 Voice picker ---------- */

  function escapeHtml(text) {
    return String(text).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  function openPicker() {
    if (!supported) {
      alert("This browser can't speak. Try Chrome, Edge or Safari.");
      return;
    }
    loadVoices();
    const s = settings();
    const chosen = current();
    let dialog = document.getElementById("voice-dialog");
    if (!dialog) {
      dialog = document.createElement("dialog");
      dialog.id = "voice-dialog";
      dialog.className = "voice-dialog";
      document.body.appendChild(dialog);
    }

    const choices = (name, options, selected) => Object.keys(options).map(key =>
      `<label><input type="radio" name="${name}" value="${key}"${key === selected ? " checked" : ""}> ${key[0].toUpperCase() + key.slice(1)}</label>`).join("");

    dialog.innerHTML = `
      <h2>🗣 Choose a voice</h2>
      <label class="voice-row">Voice
        <select id="voice-name">
          ${ranked().map(v => `<option value="${escapeHtml(v.name)}"${chosen && v.name === chosen.name ? " selected" : ""}>${escapeHtml(label(v))}</option>`).join("")}
        </select>
      </label>
      <p class="voice-hint">★ = natural-sounding voice</p>
      <fieldset><legend>Speed</legend>${choices("voice-speed", SPEEDS, s.speed || "normal")}</fieldset>
      <fieldset><legend>Style</legend>${choices("voice-pitch", PITCHES, s.pitch || "cheerful")}</fieldset>
      <div class="voice-buttons">
        <button type="button" id="voice-test">▶ Test</button>
        <button type="button" id="voice-done" class="voice-primary">Done</button>
      </div>
      <p class="voice-hint">Want even more natural voices? See the tips in the Teacher's Corner.</p>`;

    const read = () => ({
      name: dialog.querySelector("#voice-name").value,
      speed: dialog.querySelector('input[name="voice-speed"]:checked').value,
      pitch: dialog.querySelector('input[name="voice-pitch"]:checked').value
    });
    const test = () => {
      saveSettings(read());
      speak("Hello! Let's learn some words. Elephant! " + praise());
    };

    dialog.querySelector("#voice-test").addEventListener("click", test);
    dialog.querySelector("#voice-name").addEventListener("change", test);
    dialog.querySelectorAll("input[type=radio]").forEach(r => r.addEventListener("change", test));
    dialog.querySelector("#voice-done").addEventListener("click", () => {
      saveSettings(read());
      dialog.close();
    });

    if (dialog.showModal) dialog.showModal();
    else dialog.setAttribute("open", "");
  }

  // Picker styles live here so every page that loads voice.js gets them
  const style = document.createElement("style");
  style.textContent = `
    .voice-dialog { font-family: "Trebuchet MS", Arial, sans-serif; color: #2d3b45; border: 6px solid #6bcb77;
      border-radius: 20px; padding: 20px 24px; width: min(90vw, 420px); box-sizing: border-box; }
    .voice-dialog::backdrop { background: rgba(0, 0, 0, 0.35); }
    .voice-dialog h2 { color: #3a7ca5; margin: 0 0 14px 0; font-size: 26px; }
    .voice-dialog .voice-row { display: block; font-size: 17px; }
    .voice-dialog select { display: block; width: 100%; margin-top: 4px; padding: 8px; font: inherit; font-size: 17px;
      border: 2px solid #cfe3cb; border-radius: 10px; }
    .voice-dialog fieldset { border: none; padding: 0; margin: 12px 0 0 0; display: flex; flex-wrap: wrap; gap: 6px 14px; font-size: 17px; }
    .voice-dialog legend { font-weight: bold; margin-bottom: 4px; padding: 0; }
    .voice-dialog .voice-hint { color: #5f6f7a; font-size: 14px; margin: 6px 0 0 0; }
    .voice-dialog .voice-buttons { display: flex; gap: 10px; margin-top: 18px; }
    .voice-dialog button { margin: 0; padding: 10px 22px; font: inherit; font-size: 18px; border-radius: 12px; cursor: pointer;
      color: #3a7ca5; background: white; border: 2px solid #3a7ca5; box-shadow: none; }
    .voice-dialog button.voice-primary { color: white; background: #3a7ca5; }
    .voice-dialog :focus-visible { outline: 3px solid #6bcb77; outline-offset: 2px; }`;
  document.head.appendChild(style);

  if (supported) {
    loadVoices();
    speechSynthesis.addEventListener("voiceschanged", loadVoices);
  }

  return { supported, speak, praise, openPicker, current, ranked };
})();
