// Seasons and Weather page only: tap the picture and the weather happens on the card
// (leaves fall in fall, snow falls on the snowy card, rain pours on the rainy card...).
(function weatherEffects() {
  const picture = document.getElementById("picture");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  const sky = document.createElement("div");
  sky.className = "weather";
  sky.setAttribute("aria-hidden", "true");
  document.querySelector(".card").appendChild(sky);

  // Each card's effect is a list of particle groups.
  // motion: fall (sways down), rain (straight down, fast), rise (floats up), blow (crosses left to right),
  // twinkle (pops in place), sun (one big sun). count, size [min, max] in px, time [min, max] in seconds.
  const EFFECTS = {
    summer: [
      { motion: "sun", shapes: ["☀️"], size: [90, 90], place: "corner" },
      { motion: "twinkle", shapes: ["✨"], count: 10, size: [20, 34], time: [1.2, 1.8] },
      { motion: "rise", shapes: ["🍉", "🍦", "🕶️", "🌻"], count: 8, size: [30, 42], time: [2.6, 3.4] }
    ],
    winter: [
      { motion: "fall", shapes: ["❄️"], count: 18, size: [22, 40], time: [3, 4.2], sway: 30, spin: 180 },
      { motion: "rise", shapes: ["⛄"], count: 2, size: [44, 52], time: [3.2, 3.6] }
    ],
    spring: [
      { motion: "fall", shapes: ["🌸", "🌼"], count: 16, size: [22, 34], time: [3, 4], sway: 40, spin: 270 },
      { motion: "rise", shapes: ["🦋"], count: 4, size: [32, 40], time: [3, 3.8], sway: 50 }
    ],
    fall: [
      { motion: "fall", shapes: ["🍂", "🍁", "🍂"], count: 20, size: [26, 42], time: [2.8, 4], sway: 45, spin: 360 }
    ],
    sunny: [
      { motion: "sun", shapes: ["☀️"], size: [140, 140], place: "middle" },
      { motion: "twinkle", shapes: ["✨", "🌟"], count: 12, size: [20, 34], time: [1.2, 1.8] }
    ],
    rainy: [
      { motion: "rain", shapes: [""], count: 45, size: [18, 30], time: [0.6, 1], className: "drop" },
      { motion: "rain", shapes: ["💧"], count: 6, size: [22, 30], time: [1, 1.4] }
    ],
    cloudy: [
      { motion: "blow", shapes: ["☁️"], count: 7, size: [50, 90], time: [3.2, 4.4], drift: 10 }
    ],
    snowy: [
      { motion: "fall", shapes: [""], count: 45, size: [6, 12], time: [2.6, 3.8], sway: 20, className: "flake" },
      { motion: "fall", shapes: ["❄️"], count: 12, size: [18, 30], time: [2.8, 3.8], sway: 25, spin: 180 }
    ],
    windy: [
      { motion: "blow", shapes: [""], count: 10, size: [60, 120], time: [0.9, 1.4], drift: 20, className: "gust" },
      { motion: "blow", shapes: ["🍃", "🍂", "🍃"], count: 12, size: [24, 36], time: [1.4, 2.2], drift: 60, spin: 540 }
    ]
  };

  const between = (min, max) => min + Math.random() * (max - min);
  let clearTimer = 0;

  function clear() {
    clearTimeout(clearTimer);
    sky.replaceChildren();
  }

  function play() {
    if (finished || reduceMotion.matches) return;
    const groups = EFFECTS[deck[current].word];
    if (!groups) return;
    clear();
    sky.style.setProperty("--w", sky.clientWidth + "px");
    sky.style.setProperty("--h", sky.clientHeight + "px");

    let longest = 0;
    groups.forEach(group => {
      const count = group.count || 1;
      for (let i = 0; i < count; i++) {
        const piece = document.createElement("span");
        piece.className = "wx wx-" + group.motion + (group.className ? " " + group.className : "");
        piece.textContent = group.shapes[i % group.shapes.length];
        const size = between(group.size[0], group.size[1]);
        // Spread pieces evenly across the card, with a little randomness
        const spread = ((i + Math.random()) / count) * 100;
        const time = group.time ? between(group.time[0], group.time[1]) : 3;
        const delay = group.motion === "sun" ? 0 : Math.random() * (group.motion === "rain" ? 1.6 : 1.2);
        piece.style.setProperty("--size", size + "px");
        piece.style.setProperty("--x", spread + "%");
        piece.style.setProperty("--y", between(5, 85) + "%");
        piece.style.setProperty("--sway", between(-1, 1) * (group.sway || 0) + "px");
        piece.style.setProperty("--drift", between(-1, 1) * (group.drift || 0) + "px");
        piece.style.setProperty("--spin", between(-1, 1) * (group.spin || 0) + "deg");
        if (group.place) piece.classList.add(group.place);
        piece.style.animationDuration = time + "s";
        piece.style.animationDelay = delay + "s";
        sky.appendChild(piece);
        longest = Math.max(longest, time + delay);
      }
    });
    clearTimer = setTimeout(clear, longest * 1000 + 200);
  }

  picture.addEventListener("click", play);
  picture.style.cursor = "pointer";

  // Moving to another card stops the old weather
  new MutationObserver(clear).observe(picture, { attributes: true, attributeFilter: ["src"] });
})();
