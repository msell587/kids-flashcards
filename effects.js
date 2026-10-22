// Tap the picture and something happens on the card: the weather in Seasons and Weather
// (leaves fall in autumn, snow falls on the snowy card...), and fitting effects for Christmas and My Little Garden.
// Load it after flashcards.js on a topic page that has an entry below.
(function tapEffects() {
  const picture = document.getElementById("picture");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  // Each card can move its picture (move: a name from the "move-" animations in style.css)
  // and play groups of pieces over the card (parts).
  // motion: fall (sways down), rain (straight down, fast), rise (floats up), blow (crosses left to right),
  // twinkle (pops in place), burst (flies out from the middle), sun (one big sun).
  // count, size [min, max] in px, time [min, max] in seconds, y [min, max] in % for blow and twinkle,
  // reverse: true crosses right to left instead (for emoji that face left, like 🐌 and 🐝).
  const EFFECTS = {
    seasons: {
      summer: { parts: [
        { motion: "sun", shapes: ["☀️"], size: [90, 90], place: "corner" },
        { motion: "twinkle", shapes: ["✨"], count: 10, size: [20, 34], time: [1.2, 1.8] },
        { motion: "rise", shapes: ["🍉", "🍦", "🕶️", "🌻"], count: 8, size: [30, 42], time: [2.6, 3.4] }
      ] },
      winter: { parts: [
        { motion: "fall", shapes: ["❄️"], count: 18, size: [22, 40], time: [3, 4.2], sway: 30, spin: 180 },
        { motion: "rise", shapes: ["⛄"], count: 2, size: [44, 52], time: [3.2, 3.6] }
      ] },
      spring: { parts: [
        { motion: "fall", shapes: ["🌸", "🌼"], count: 16, size: [22, 34], time: [3, 4], sway: 40, spin: 270 },
        { motion: "rise", shapes: ["🦋"], count: 4, size: [32, 40], time: [3, 3.8], sway: 50 }
      ] },
      autumn: { parts: [
        { motion: "fall", shapes: ["🍂", "🍁", "🍂"], count: 20, size: [26, 42], time: [2.8, 4], sway: 45, spin: 360 }
      ] }
    },

    weather: {
      sunny: { parts: [
        { motion: "sun", shapes: ["☀️"], size: [140, 140], place: "middle" },
        { motion: "twinkle", shapes: ["✨", "🌟"], count: 12, size: [20, 34], time: [1.2, 1.8] }
      ] },
      rainy: { parts: [
        { motion: "rain", shapes: [""], count: 45, size: [18, 30], time: [0.6, 1], className: "drop" },
        { motion: "rain", shapes: ["💧"], count: 6, size: [22, 30], time: [1, 1.4] }
      ] },
      cloudy: { parts: [
        { motion: "blow", shapes: ["☁️"], count: 7, size: [50, 90], time: [3.2, 4.4], drift: 10 }
      ] },
      snowy: { parts: [
        { motion: "fall", shapes: [""], count: 45, size: [6, 12], time: [2.6, 3.8], sway: 20, className: "flake" },
        { motion: "fall", shapes: ["❄️"], count: 12, size: [18, 30], time: [2.8, 3.8], sway: 25, spin: 180 }
      ] },
      windy: { parts: [
        { motion: "blow", shapes: [""], count: 10, size: [60, 120], time: [0.9, 1.4], drift: 20, className: "gust" },
        { motion: "blow", shapes: ["🍃", "🍂", "🍃"], count: 12, size: [24, 36], time: [1.4, 2.2], drift: 60, spin: 540 }
      ] },
      stormy: { parts: [
        { motion: "rain", shapes: [""], count: 60, size: [18, 30], time: [0.5, 0.8], className: "drop" },
        { motion: "twinkle", shapes: ["⚡"], count: 3, size: [40, 56], time: [0.6, 1] }
      ] }
    },

    christmas: {
      "Santa": { move: "bounce", parts: [
        { motion: "fall", shapes: ["🎁", "🎁", "❄️"], count: 12, size: [26, 38], time: [2.6, 3.6], sway: 25, spin: 90 },
        { motion: "twinkle", shapes: ["✨"], count: 8, size: [20, 30], time: [1.2, 1.8] }
      ] },
      "Christmas tree": { move: "sway", parts: [
        { motion: "twinkle", shapes: ["✨", "🌟", "✨"], count: 16, size: [18, 32], time: [1, 1.6] },
        { motion: "fall", shapes: ["❄️"], count: 8, size: [16, 26], time: [3, 4], sway: 25, spin: 180 }
      ] },
      "star": { move: "spin", parts: [
        { motion: "burst", shapes: ["⭐", "✨", "🌟"], count: 18, size: [20, 36], time: [1.4, 2] }
      ] },
      "present": { move: "shake", parts: [
        { motion: "burst", shapes: ["🎉", "🎈", "🎊", "✨", "⭐"], count: 20, size: [24, 38], time: [1.6, 2.2], delay: 0.6 }
      ] },
      "bell": { move: "ring", parts: [
        { motion: "rise", shapes: ["🎵", "🎶"], count: 10, size: [26, 38], time: [2.2, 3], sway: 40 }
      ] },
      "snowman": { move: "wiggle", parts: [
        { motion: "fall", shapes: [""], count: 30, size: [6, 11], time: [2.6, 3.6], sway: 20, className: "flake" },
        { motion: "fall", shapes: ["❄️"], count: 10, size: [18, 28], time: [2.8, 3.8], sway: 25, spin: 180 }
      ] },
      "reindeer": { move: "hop", parts: [
        { motion: "rise", shapes: ["✨", "⭐", "✨"], count: 12, size: [18, 30], time: [2, 2.8], sway: 30 },
        { motion: "fall", shapes: ["❄️"], count: 8, size: [16, 24], time: [3, 4], sway: 20, spin: 180 }
      ] },
      "candle": { move: "flicker", parts: [
        { motion: "rise", shapes: ["✨"], count: 10, size: [14, 24], time: [1.8, 2.6], sway: 20, x: [35, 65] },
        { motion: "twinkle", shapes: ["🌟"], count: 6, size: [18, 26], time: [1.2, 1.8] }
      ] },
      "stocking": { move: "swing", parts: [
        { motion: "fall", shapes: ["🍬", "🍭", "🎁", "🧸"], count: 14, size: [26, 36], time: [2.4, 3.4], sway: 25, spin: 180 }
      ] },
      "gingerbread man": { move: "dance", parts: [
        { motion: "burst", shapes: ["🍪", "✨"], count: 12, size: [22, 32], time: [1.6, 2.2] }
      ] },
      "snowflake": { move: "spin", parts: [
        { motion: "fall", shapes: ["❄️"], count: 24, size: [18, 38], time: [2.8, 4], sway: 30, spin: 240 }
      ] },
      "candy cane": { move: "wiggle", parts: [
        { motion: "fall", shapes: ["🍬", "🍭", "🍬"], count: 16, size: [24, 34], time: [2.4, 3.4], sway: 25, spin: 300 }
      ] }
    },

    garden: {
      "flower": { move: "grow", parts: [
        { motion: "fall", shapes: ["🌸", "🌼"], count: 12, size: [20, 30], time: [3, 4], sway: 35, spin: 270 },
        { motion: "rise", shapes: ["🦋"], count: 3, size: [30, 38], time: [3, 3.6], sway: 50 }
      ] },
      "tree": { move: "sway", parts: [
        { motion: "fall", shapes: ["🍃", "🍃", "🍂"], count: 14, size: [22, 34], time: [3, 4], sway: 40, spin: 360 },
        { motion: "blow", shapes: ["🐦"], count: 2, size: [30, 36], time: [3, 3.6], drift: 30, y: [8, 25], reverse: true }
      ] },
      "leaf": { move: "sway", parts: [
        { motion: "fall", shapes: ["🍃", "🌿", "🍃"], count: 16, size: [24, 38], time: [3, 4], sway: 45, spin: 360 }
      ] },
      "seed": { move: "grow", parts: [
        { motion: "rain", shapes: ["💧"], count: 8, size: [18, 26], time: [1, 1.4] },
        { motion: "rise", shapes: ["🌱", "🌱", "🌷"], count: 8, size: [26, 36], time: [2.6, 3.2], delay: 0.8 }
      ] },
      "grass": { move: "sway", parts: [
        { motion: "twinkle", shapes: ["💧", "✨"], count: 10, size: [16, 24], time: [1.2, 1.8], y: [50, 85] },
        { motion: "rise", shapes: ["🌼", "🦗"], count: 5, size: [24, 32], time: [2.6, 3.2], sway: 30 }
      ] },
      "butterfly": { move: "flutter", parts: [
        { motion: "rise", shapes: ["🦋"], count: 9, size: [26, 42], time: [2.6, 3.6], sway: 60 }
      ] },
      "bee": { move: "buzz", parts: [
        { motion: "blow", shapes: ["🐝"], count: 6, size: [26, 36], time: [2, 2.8], drift: 60, y: [10, 80], reverse: true },
        { motion: "twinkle", shapes: ["🌼"], count: 5, size: [22, 30], time: [1.4, 2] }
      ] },
      "ladybird": { move: "wiggle", parts: [
        { motion: "rise", shapes: ["🐞"], count: 6, size: [24, 34], time: [2.4, 3.2], sway: 50 },
        { motion: "twinkle", shapes: ["✨"], count: 6, size: [16, 24], time: [1.2, 1.8] }
      ] },
      "snail": { move: "slide", parts: [
        { motion: "blow", shapes: ["🐌"], count: 3, size: [28, 36], time: [4, 4.6], y: [80, 88], reverse: true },
        { motion: "rain", shapes: ["💧"], count: 6, size: [16, 22], time: [1.2, 1.6] }
      ] },
      "worm": { move: "wiggle", parts: [
        { motion: "blow", shapes: ["🪱"], count: 3, size: [28, 36], time: [3.4, 4.2], drift: 6, y: [80, 88] },
        { motion: "rise", shapes: ["🌱"], count: 5, size: [22, 30], time: [2.4, 3] }
      ] },
      "watering can": { move: "tip", parts: [
        { motion: "rain", shapes: [""], count: 30, size: [14, 24], time: [0.7, 1.1], className: "drop" },
        { motion: "rise", shapes: ["🌱", "🌷", "🌻"], count: 7, size: [26, 36], time: [2.4, 3], delay: 1 }
      ] },
      "spade": { move: "dig", parts: [
        { motion: "burst", shapes: [""], count: 16, size: [8, 16], time: [1, 1.4], className: "soil", delay: 0.3 },
        { motion: "rise", shapes: ["🌱", "🪱", "🥕"], count: 6, size: [24, 34], time: [2.4, 3], delay: 0.8 }
      ] }
    }
  };

  const effects = EFFECTS[topicKey];
  if (!effects) return;

  const sky = document.createElement("div");
  sky.className = "weather";
  sky.setAttribute("aria-hidden", "true");
  card.appendChild(sky);

  // Cards with a video and crop play their part of the video over the picture
  const clip = document.createElement("div");
  clip.className = "clip";
  clip.hidden = true;
  const video = document.createElement("video");
  video.muted = true;
  video.playsInline = true;
  video.preload = "auto";
  clip.appendChild(video);
  card.insertBefore(clip, sky);
  const firstVideo = deck.find(item => item.video);
  if (firstVideo) video.src = firstVideo.video;

  // Cover exactly the visible photo: inside the picture's padding, fitted the same way as the picture
  // (object-fit: contain shrinks it to fit, cover fills the box and trims the edges)
  function placeClip() {
    const crop = deck[current].crop;
    if (!crop) return;
    const style = getComputedStyle(picture);
    const pad = parseFloat(style.paddingLeft);
    const boxWidth = picture.clientWidth - 2 * pad;
    const boxHeight = picture.clientHeight - 2 * pad;
    const fit = style.objectFit === "cover" ? Math.max : Math.min;
    const scale = fit(boxWidth / crop[2], boxHeight / crop[3]);
    const width = Math.min(boxWidth, crop[2] * scale);
    const height = Math.min(boxHeight, crop[3] * scale);
    // Centre the crop in the box, like object-position: center
    const x = crop[0] * scale + (crop[2] * scale - width) / 2;
    const y = crop[1] * scale + (crop[3] * scale - height) / 2;
    Object.assign(clip.style, {
      left: picture.offsetLeft + pad + (boxWidth - width) / 2 + "px",
      top: picture.offsetTop + pad + (boxHeight - height) / 2 + "px",
      width: width + "px",
      height: height + "px"
    });
    video.style.width = (video.videoWidth || 1920) * scale + "px";
    video.style.transform = `translate(${-x}px, ${-y}px)`;
  }

  function startClip() {
    const shown = deck[current];
    if (!video.src.endsWith(encodeURI(shown.video))) video.src = shown.video;
    placeClip();
    video.currentTime = 0;
    clip.hidden = false;
    video.play().catch(stopClip);
  }

  function stopClip() {
    video.pause();
    clip.hidden = true;
  }

  video.addEventListener("loadedmetadata", placeClip);
  video.addEventListener("ended", stopClip);
  window.addEventListener("resize", placeClip);

  const between = (min, max) => min + Math.random() * (max - min);
  let clearTimer = 0;

  function clear() {
    clearTimeout(clearTimer);
    sky.replaceChildren();
  }

  function play() {
    if (finished) return;
    const shown = deck[current];
    // Tapping again while the video plays stops it and shows the still photo
    if (shown.video) {
      if (!clip.hidden) {
        stopClip();
        return clear();
      }
      startClip();
    }
    const effect = effects[shown.word];
    if (!effect || reduceMotion.matches) return;
    clear();

    if (effect.move && !shown.video) {
      picture.classList.remove("moving");
      picture.dataset.move = effect.move;
      void picture.offsetWidth; // restart the movement if it is tapped again
      picture.classList.add("moving");
    }

    const width = sky.clientWidth;
    const height = sky.clientHeight;
    sky.style.setProperty("--w", width + "px");
    sky.style.setProperty("--h", height + "px");

    let longest = 0;
    effect.parts.forEach(group => {
      const count = group.count || 1;
      for (let i = 0; i < count; i++) {
        const piece = document.createElement("span");
        piece.className = "wx wx-" + group.motion + (group.className ? " " + group.className : "");
        piece.textContent = group.shapes[i % group.shapes.length];
        const size = between(group.size[0], group.size[1]);
        // Spread pieces evenly across the card (or the part of it given by x), with a little randomness
        const [left, right] = group.x || [0, 100];
        const spread = left + ((i + Math.random()) / count) * (right - left);
        const [top, bottom] = group.y || [5, 85];
        const time = group.time ? between(group.time[0], group.time[1]) : 3;
        const start = group.delay || 0;
        const delay = group.motion === "sun" ? 0
          : start + Math.random() * (group.motion === "burst" ? 0.3 : group.motion === "rain" ? 1.6 : 1.2);
        // Burst pieces fly out from the middle in every direction
        const angle = ((i + Math.random() * 0.6) / count) * Math.PI * 2;
        const reach = between(0.3, 0.5) * Math.min(width, height);
        piece.style.setProperty("--size", size + "px");
        piece.style.setProperty("--x", spread + "%");
        piece.style.setProperty("--y", between(top, bottom) + "%");
        piece.style.setProperty("--sway", between(-1, 1) * (group.sway || 0) + "px");
        piece.style.setProperty("--drift", between(-1, 1) * (group.drift || 0) + "px");
        piece.style.setProperty("--spin", between(-1, 1) * (group.spin || 0) + "deg");
        piece.style.setProperty("--bx", Math.cos(angle) * reach + "px");
        piece.style.setProperty("--by", Math.sin(angle) * reach + "px");
        if (group.place) piece.classList.add(group.place);
        if (group.reverse) piece.style.animationDirection = "reverse";
        piece.style.animationDuration = time + "s";
        piece.style.animationDelay = delay + "s";
        sky.appendChild(piece);
        longest = Math.max(longest, time + delay);
      }
    });
    clearTimer = setTimeout(clear, longest * 1000 + 200);
  }

  picture.addEventListener("animationend", (event) => {
    if (event.animationName.startsWith("move-")) picture.classList.remove("moving");
  });
  picture.addEventListener("click", play);
  picture.style.cursor = "pointer";

  // Moving to another card stops the old effect and video
  new MutationObserver(() => {
    clear();
    stopClip();
  }).observe(picture, { attributes: true, attributeFilter: ["src"] });
})();
