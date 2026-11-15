// Builds the teacher's guide for the topic named in the address, e.g. teacher.html?topic=animals
const topicKey = new URLSearchParams(location.search).get("topic");
const topic = TOPICS[topicKey];
const guide = TEACHER[topicKey];
const main = document.getElementById("guide");

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Topic picker in the top bar: choosing a topic opens its guide
const topicSelect = document.getElementById("topic-select");
topicSelect.innerHTML = `<option value="">All topics</option>` + Object.keys(TOPICS).map(key =>
  `<option value="${key}"${key === topicKey ? " selected" : ""}>${escapeHtml(TOPICS[key].title)}</option>`
).join("");
topicSelect.addEventListener("change", () => {
  location.href = topicSelect.value ? "teacher.html?topic=" + topicSelect.value : "teacher.html";
});

function showChooser() {
  // The topic cards below do the same job as the dropdown, so the dropdown is only shown on a guide
  document.querySelector(".topic-picker").hidden = true;
  main.innerHTML = `
    <h1>Teacher's Corner</h1>
    <p class="lead">Lesson plans, crafts, songs and games for each flashcard topic. For ages 3–6.</p>
    <section>
      <h2>Quick start</h2>
      <p class="quick-start">Show the flashcards, play the Class game, then finish with a colouring sheet from the Print page.</p>
    </section>
    <section>
      <h2>Pick a topic</h2>
      <p class="hint-line">Each topic has its own lesson plan and everything to go with it. Choose what you need below.</p>
      <div class="topic-list">
        ${Object.keys(TOPICS).map(key => `
          <article class="topic-card" style="--tile-color: var(--${key})">
            <img src="${encodeURI(TOPICS[key].cards[0].picture)}" alt="">
            <div class="topic-info">
              <h3>${escapeHtml(TOPICS[key].title)}</h3>
              <p>${TOPICS[key].cards.length} words</p>
              <nav class="topic-actions" aria-label="Tools for ${escapeHtml(TOPICS[key].title)}">
                <a class="action-main" href="teacher.html?topic=${key}">Lesson plan</a>
                <a href="${encodeURI(TOPICS[key].page)}">Flashcards</a>
                <a href="classroom-game.html?topic=${key}">Class game</a>
                ${key === "weather" ? `<a href="weather-chart.html">Weather chart</a>` : ""}
              </nav>
            </div>
          </article>`).join("")}
      </div>
    </section>
    <p class="hint-line">Voice sounds different on each device. <a href="voice-help.html">Voice help</a> shows how to get the most natural one.</p>
    ${saveSectionHtml("")}`;
  setUpBackup();
}

function showGuide() {
  document.title = topic.title + " · Teacher's Guide";

  // Every game for this topic (topic-games.js) and whether it has a colouring picture (colouring-scenes.js)
  const games = (typeof TOPIC_GAMES !== "undefined" && TOPIC_GAMES[topicKey]) || [];
  const hasColouringScene = typeof SCENES !== "undefined" && Boolean(SCENES[topicKey]);

  const words = topic.cards.map(card =>
    `<li><img src="${encodeURI(card.picture)}" alt="">${escapeHtml(card.word)}</li>`).join("");

  const crafts = guide.crafts.map(craft => `
    <div class="item">
      <h3>${escapeHtml(craft.name)} <span class="tune">· about ${escapeHtml(craft.time)}</span></h3>
      <div class="two-col">
        <div>
          <strong>You'll need</strong>
          <ul>${craft.supplies.map(s => `<li>${escapeHtml(s)}</li>`).join("")}</ul>
        </div>
        <div>
          <strong>Steps</strong>
          <ol>${craft.steps.map(s => `<li>${escapeHtml(s)}</li>`).join("")}</ol>
        </div>
      </div>
      ${craft.tip ? `<p class="tip"><strong>Tip:</strong> ${escapeHtml(craft.tip)}</p>` : ""}
    </div>`).join("");

  const songs = guide.songs.map(song => `
    <div class="item">
      <h3>${escapeHtml(song.title)}</h3>
      <div class="tune">Tune: ${escapeHtml(song.tune)}</div>
      ${song.words ? `<div class="lyrics">${escapeHtml(song.words)}</div>` : ""}
      <p>${escapeHtml(song.how)}</p>
      ${song.search ? `<p class="no-print">Find the tune by searching for “${escapeHtml(song.search)}”.</p>` : ""}
    </div>`).join("");

  main.innerHTML = `
    <h1>${escapeHtml(topic.title)} · Teacher's Guide</h1>
    <dl class="glance">
      <div><dt>Lesson</dt><dd>${totalMinutes(guide.plan)} min</dd></div>
      <div><dt>Words</dt><dd>${topic.cards.length}</dd></div>
      <div><dt>Ages</dt><dd>3–6</dd></div>
      <div><dt>Crafts</dt><dd>${guide.crafts.length}</dd></div>
    </dl>
    <div class="glance-tools no-print"><button class="btn btn-light" id="print-guide">Print this guide</button></div>
    <div class="actions">
      <div class="action-group" role="group" aria-labelledby="in-class-label">
        <h2 id="in-class-label">In class</h2>
        <div>
          <button type="button" class="btn btn-go" id="run-lesson">▶ Run the lesson</button>
          <a class="btn" href="${encodeURI(topic.page)}">Open flashcards</a>
          <a class="btn" href="game.html?topic=${topicKey}">Listening game</a>
          <a class="btn" href="classroom-game.html?topic=${topicKey}">Class game</a>
        </div>
      </div>
      ${games.length ? `
      <div class="action-group" role="group" aria-labelledby="games-label">
        <h2 id="games-label">More games for ${escapeHtml(topic.title)}</h2>
        <div class="game-chips">
          ${games.map(game => `<a class="chip" href="${escapeHtml(game.href)}">${escapeHtml(game.name)}</a>`).join("")}
        </div>
      </div>` : ""}
      <div class="action-group" role="group" aria-labelledby="print-label">
        <h2 id="print-label">Print</h2>
        <div>
          <a class="btn secondary" href="print.html?topic=${topicKey}">Cards to cut out</a>
          ${hasColouringScene ? `<a class="btn secondary" href="colouring.html?topic=${topicKey}&amp;sheet=1">Colouring sheet</a>` : ""}
          <a class="btn secondary" href="printables.html">Worksheets</a>
        </div>
      </div>
    </div>

    <section>
      <h2>Goal</h2>
      <p>${escapeHtml(guide.goal)}</p>
      <h3>Words</h3>
      <ul class="words">${words}</ul>
    </section>

    <section id="plan-section"></section>

    ${guide.crafts.length ? `
    <section>
      <h2>Crafts</h2>
      ${crafts}
    </section>` : ""}

    ${guide.songs.length ? `
    <section>
      <h2>Songs</h2>
      ${songs}
    </section>` : ""}

    ${guide.photoCredits ? `
      <section>
        <h2>Photo credits</h2>
        <p class="hint">Free photos from Pexels (free to use, no credit required).</p>
        <p>${guide.photoCredits.map(c => `<a href="${escapeHtml(c.url)}" target="_blank" rel="noopener">${escapeHtml(c.word)}</a>`).join(" · ")}</p>
      </section>` : ""}

    ${saveSectionHtml(`
      <details open>
        <summary>My notes</summary>
        <p class="hint">Your own ideas for this topic. They save automatically on this device and browser only.</p>
        <textarea id="notes" aria-label="My notes for ${escapeHtml(topic.title)}" placeholder="e.g. Class loved Animal Moves. Next time add a zebra card."></textarea>
        <p id="saved" aria-live="polite"></p>
      </details>`)}`;

  renderPlanSection();
  setUpNotes();
  setUpBackup();
  document.getElementById("print-guide").addEventListener("click", () => window.print());
  document.getElementById("run-lesson").addEventListener("click", startLesson);
}

/* ---------- Run the lesson: a timer bar that walks through the plan step by step ---------- */

let lesson = null;      // the running LessonTimer, or null
let lessonBar = null;   // the bar at the bottom of the page
let chimeContext = null;
const CHIME_KEY = "lesson-chime";

function chimeOn() {
  return Guard.store.getString(CHIME_KEY, "on") !== "off";
}

// A short three-note chime made in the browser, so no sound file is needed. Silent if audio is not allowed.
function chime() {
  if (!chimeOn()) return;
  try {
    const Context = window.AudioContext || window.webkitAudioContext;
    if (!Context) return;
    chimeContext = chimeContext || new Context();
    if (chimeContext.state === "suspended") chimeContext.resume();
    const start = chimeContext.currentTime;
    [523.25, 659.25, 783.99].forEach((frequency, i) => {
      const at = start + i * 0.16;
      const note = chimeContext.createOscillator();
      const volume = chimeContext.createGain();
      note.type = "sine";
      note.frequency.value = frequency;
      volume.gain.setValueAtTime(0.0001, at);
      volume.gain.exponentialRampToValueAtTime(0.18, at + 0.03);
      volume.gain.exponentialRampToValueAtTime(0.0001, at + 0.7);
      note.connect(volume).connect(chimeContext.destination);
      note.start(at);
      note.stop(at + 0.75);
    });
  } catch (error) {
    // No sound on this device; the bar still shows the change
  }
}

function buildLessonBar() {
  if (lessonBar) return lessonBar;
  lessonBar = document.createElement("div");
  lessonBar.className = "lesson-bar no-print";
  lessonBar.id = "lesson-bar";
  lessonBar.setAttribute("role", "region");
  lessonBar.setAttribute("aria-label", "Lesson timer");
  lessonBar.innerHTML = `
    <div class="lesson-progress" aria-hidden="true"><span id="lesson-fill"></span></div>
    <div class="lesson-row">
      <div class="lesson-info">
        <span class="lesson-step" id="lesson-step"></span>
        <strong class="lesson-title" id="lesson-title" aria-live="polite"></strong>
      </div>
      <div class="lesson-time" id="lesson-time" aria-live="off">0:00</div>
      <div class="lesson-buttons">
        <button type="button" class="btn btn-light" id="lesson-back" aria-label="Back one step">◀</button>
        <button type="button" class="btn btn-light" id="lesson-pause">Pause</button>
        <button type="button" class="btn" id="lesson-next">Next step ▶</button>
        <button type="button" class="btn btn-light" id="lesson-chime" aria-pressed="${chimeOn()}" title="Chime when a step ends">${chimeOn() ? "🔔" : "🔕"}</button>
        <button type="button" class="btn btn-light" id="lesson-stop" aria-label="Stop the lesson">✕</button>
      </div>
    </div>`;
  document.body.appendChild(lessonBar);

  lessonBar.querySelector("#lesson-back").addEventListener("click", () => lesson && lesson.back());
  lessonBar.querySelector("#lesson-next").addEventListener("click", () => lesson && lesson.next());
  lessonBar.querySelector("#lesson-pause").addEventListener("click", () => {
    if (!lesson) return;
    if (lesson.state().paused) lesson.resume();
    else lesson.pause();
  });
  lessonBar.querySelector("#lesson-chime").addEventListener("click", (event) => {
    const on = !chimeOn();
    Guard.store.setString(CHIME_KEY, on ? "on" : "off");
    event.currentTarget.textContent = on ? "🔔" : "🔕";
    event.currentTarget.setAttribute("aria-pressed", String(on));
    if (on) chime();
  });
  lessonBar.querySelector("#lesson-stop").addEventListener("click", stopLesson);
  return lessonBar;
}

function showLessonState(state) {
  const bar = buildLessonBar();
  const finished = !state.running;
  bar.querySelector("#lesson-step").textContent = finished ? "" : `Step ${state.index + 1} of ${state.total}`;
  bar.querySelector("#lesson-title").textContent = finished ? "Lesson finished! 🎉" : state.title;
  bar.querySelector("#lesson-time").textContent = LessonTimer.formatTime(state.remaining);
  bar.querySelector("#lesson-fill").style.width = state.seconds ? (100 - (state.remaining / state.seconds) * 100) + "%" : "0%";
  bar.querySelector("#lesson-pause").textContent = state.paused ? "Resume" : "Pause";
  bar.querySelector("#lesson-pause").hidden = finished;
  bar.querySelector("#lesson-next").hidden = finished;
  bar.querySelector("#lesson-back").hidden = finished || state.index === 0;
  bar.querySelector("#lesson-stop").textContent = finished ? "Close" : "✕";
  bar.querySelector("#lesson-stop").setAttribute("aria-label", finished ? "Close the lesson timer" : "Stop the lesson");
  bar.classList.toggle("paused", state.paused);
  bar.classList.toggle("ending", state.running && !state.paused && state.remaining <= 30);
  bar.classList.toggle("finished", finished);
  // Mark the step in the plan list too, so the teacher can read the details
  document.querySelectorAll(".plan li").forEach((item, i) => item.classList.toggle("now", state.running && i === state.index));
}

function startLesson() {
  if (editing) return;
  const plan = currentPlan();
  if (!plan.steps.length) return;
  if (lesson) lesson.stop();
  chimeContext = null;
  if (chimeOn()) {
    // Audio can only start from a tap or click, so warm it up here and keep it for the chimes
    try {
      const Context = window.AudioContext || window.webkitAudioContext;
      if (Context) chimeContext = new Context();
    } catch (error) {
      chimeContext = null;
    }
  }
  lesson = LessonTimer.create(plan.steps, {
    onChange: showLessonState,
    onStepEnd: () => {
      chime();
      const bar = buildLessonBar();
      bar.classList.remove("flash");
      void bar.offsetWidth;
      bar.classList.add("flash");
    },
    onFinish: () => chime()
  });
  buildLessonBar().hidden = false;
  document.body.classList.add("lesson-running");
  lesson.start();
  document.getElementById("plan-section").scrollIntoView({ block: "start", behavior: "smooth" });
}

function stopLesson() {
  if (lesson) lesson.stop();
  lesson = null;
  if (lessonBar) lessonBar.hidden = true;
  document.body.classList.remove("lesson-running");
  document.querySelectorAll(".plan li.now").forEach(item => item.classList.remove("now"));
}

/* ---------- The "How to use" box: open the first time, closed after that ---------- */

(function rememberHowTo() {
  const howto = document.querySelector(".howto");
  if (!howto) return;
  howto.open = Guard.store.getString("teacher-howto", "") !== "seen";
  Guard.store.setString("teacher-howto", "seen");
})();

/* ---------- Lesson plans: the ready-made plan plus any the teacher edits or creates ---------- */

const plansKey = "teacher-plans-" + topicKey;
const READY_MADE = "ready-made";
let storageWorks = true;
let planStore = loadPlanStore(); // { plans: [...saved plans], selected: id }
let editing = null; // a working copy of the plan while it's being edited

function loadPlanStore() {
  let raw = null;
  try {
    raw = localStorage.getItem(plansKey);
  } catch (error) {
    storageWorks = false;
  }
  try {
    const saved = JSON.parse(raw);
    // Plans that are damaged are left out, so one bad entry cannot stop the page from drawing
    if (saved && Array.isArray(saved.plans)) return { ...saved, plans: saved.plans.filter(isValidPlan) };
  } catch (error) {
    // Saved plans were damaged; start fresh rather than breaking the page
  }
  return { plans: [], selected: READY_MADE };
}

function savePlanStore() {
  try {
    localStorage.setItem(plansKey, JSON.stringify(planStore));
    storageWorks = true;
  } catch (error) {
    storageWorks = false;
  }
}

function readyMadePlan() {
  return { id: READY_MADE, name: "Ready-made plan", steps: guide.plan, materials: guide.materials };
}

// All plans for this topic: the ready-made one first (or the teacher's edited version of it), then their own
function allPlans() {
  const edited = planStore.plans.find(p => p.id === READY_MADE);
  return [edited || readyMadePlan(), ...planStore.plans.filter(p => p.id !== READY_MADE)];
}

function currentPlan() {
  const plans = allPlans();
  return plans.find(p => p.id === planStore.selected) || plans[0];
}

function copyOf(plan) {
  return JSON.parse(JSON.stringify(plan));
}

function totalMinutes(steps) {
  return steps.reduce((sum, s) => sum + (parseInt(s.time, 10) || 0), 0);
}

function renderPlanSection() {
  const section = document.getElementById("plan-section");
  if (editing) {
    section.innerHTML = planEditorHtml();
    setUpPlanEditor();
    return;
  }

  const plan = currentPlan();
  const plans = allPlans();
  const isReadyMade = plan.id === READY_MADE;
  const isEdited = isReadyMade && planStore.plans.some(p => p.id === READY_MADE);

  section.innerHTML = `
    <div class="plan-head">
      <h2>Lesson plan</h2>
      ${plans.length > 1 ? `
        <label class="no-print picker">Plan:
          <select id="plan-picker">
            ${plans.map(p => `<option value="${escapeHtml(p.id)}"${p.id === plan.id ? " selected" : ""}>${escapeHtml(p.name)}</option>`).join("")}
          </select>
        </label>` : ""}
    </div>
    <p class="plan-meta"><strong>${escapeHtml(plan.name)}</strong> · Total: ${totalMinutes(plan.steps)} min${isEdited ? " · edited by you" : ""}</p>
    <ol class="plan">
      ${plan.steps.map(row => `
        <li>
          <span class="time">${escapeHtml(row.time)}</span>
          <div><strong>${escapeHtml(row.step)}</strong><p>${escapeHtml(row.details)}</p></div>
        </li>`).join("")}
    </ol>
    ${plan.materials.length ? `
      <h3>You'll need</h3>
      <ul>${plan.materials.map(m => `<li>${escapeHtml(m)}</li>`).join("")}</ul>` : ""}
    <div class="plan-tools no-print">
      <button class="btn btn-go" id="run-plan">▶ Run this plan</button>
      <button class="btn" id="edit-plan">Edit this plan</button>
      <button class="btn btn-light" id="copy-plan">Copy as new plan</button>
      <button class="btn btn-light" id="new-plan">New blank plan</button>
      ${isEdited ? '<button class="btn btn-light" id="reset-plan">Reset to original</button>' : ""}
      ${!isReadyMade ? '<button class="btn btn-danger" id="delete-plan">Delete plan</button>' : ""}
    </div>
    ${storageWorks ? "" : '<p class="hint no-print">This browser can\'t save plans, so changes will be lost when you close the page.</p>'}`;

  const picker = document.getElementById("plan-picker");
  if (picker) {
    picker.addEventListener("change", () => {
      stopLesson();
      planStore.selected = picker.value;
      savePlanStore();
      renderPlanSection();
    });
  }

  document.getElementById("run-plan").addEventListener("click", startLesson);

  document.getElementById("edit-plan").addEventListener("click", () => {
    stopLesson(); // the steps are about to change, so the timer would be out of step
    editing = copyOf(plan);
    renderPlanSection();
  });

  document.getElementById("copy-plan").addEventListener("click", () => {
    editing = copyOf(plan);
    editing.id = "plan-" + Date.now();
    editing.name = "My copy of " + plan.name.replace(/^My copy of /, "");
    renderPlanSection();
  });

  document.getElementById("new-plan").addEventListener("click", () => {
    const ownCount = allPlans().length; // ready-made counts as 1, so the first new plan is "My plan 1"
    editing = {
      id: "plan-" + Date.now(),
      name: "My plan " + ownCount,
      steps: [{ time: "5 min", step: "", details: "" }],
      materials: []
    };
    renderPlanSection();
  });

  const reset = document.getElementById("reset-plan");
  if (reset) {
    reset.addEventListener("click", () => {
      if (!confirm("Undo all your changes and go back to the original ready-made plan?")) return;
      planStore.plans = planStore.plans.filter(p => p.id !== READY_MADE);
      savePlanStore();
      renderPlanSection();
    });
  }

  const del = document.getElementById("delete-plan");
  if (del) {
    del.addEventListener("click", () => {
      if (!confirm(`Delete “${plan.name}”? This can't be undone.`)) return;
      planStore.plans = planStore.plans.filter(p => p.id !== plan.id);
      planStore.selected = READY_MADE;
      savePlanStore();
      renderPlanSection();
    });
  }
}

function planEditorHtml() {
  const isReadyMade = editing.id === READY_MADE;
  return `
    <h2>Editing: ${escapeHtml(editing.name)}</h2>
    ${isReadyMade ? "" : `
      <label class="field">Plan name
        <input type="text" id="plan-name" value="${escapeHtml(editing.name)}">
      </label>`}
    <p class="plan-meta">Total: <span id="plan-total">${totalMinutes(editing.steps)}</span> min</p>
    <ol class="plan-editor">
      ${editing.steps.map((row, i) => `
        <li data-index="${i}">
          <div class="step-fields">
            <input type="text" class="f-time" value="${escapeHtml(row.time)}" aria-label="Step ${i + 1} time" placeholder="5 min">
            <input type="text" class="f-step" value="${escapeHtml(row.step)}" aria-label="Step ${i + 1} title" placeholder="Step title, e.g. Hello circle">
            <textarea class="f-details" aria-label="Step ${i + 1} details" placeholder="What happens in this step?">${escapeHtml(row.details)}</textarea>
          </div>
          <div class="step-buttons">
            <button class="icon-btn" data-move="-1" aria-label="Move step ${i + 1} up"${i === 0 ? " disabled" : ""}>↑</button>
            <button class="icon-btn" data-move="1" aria-label="Move step ${i + 1} down"${i === editing.steps.length - 1 ? " disabled" : ""}>↓</button>
            <button class="icon-btn" data-remove aria-label="Remove step ${i + 1}">✕</button>
          </div>
        </li>`).join("")}
    </ol>
    <button class="btn btn-light" id="add-step">Add step</button>
    <label class="field">You'll need (one item per line)
      <textarea id="plan-materials" rows="5">${escapeHtml(editing.materials.join("\n"))}</textarea>
    </label>
    <div class="plan-tools">
      <button class="btn" id="save-plan">Save plan</button>
      <button class="btn btn-light" id="cancel-edit">Cancel</button>
    </div>`;
}

function setUpPlanEditor() {
  const section = document.getElementById("plan-section");

  // Keep the working copy up to date as the teacher types (oninput replaces itself on each redraw)
  section.oninput = (event) => {
    if (!editing) return;
    const row = event.target.closest("li[data-index]");
    if (row) {
      const step = editing.steps[row.dataset.index];
      if (event.target.classList.contains("f-time")) step.time = event.target.value;
      if (event.target.classList.contains("f-step")) step.step = event.target.value;
      if (event.target.classList.contains("f-details")) step.details = event.target.value;
      document.getElementById("plan-total").textContent = totalMinutes(editing.steps);
    }
    if (event.target.id === "plan-name") editing.name = event.target.value;
    if (event.target.id === "plan-materials") {
      editing.materials = event.target.value.split("\n").map(s => s.trim()).filter(Boolean);
    }
  };

  section.querySelectorAll("[data-move]").forEach(button => {
    button.addEventListener("click", () => {
      const i = Number(button.closest("li").dataset.index);
      const j = i + Number(button.dataset.move);
      [editing.steps[i], editing.steps[j]] = [editing.steps[j], editing.steps[i]];
      renderPlanSection();
      section.querySelectorAll("li[data-index]")[j].querySelector(".f-step").focus();
    });
  });

  section.querySelectorAll("[data-remove]").forEach(button => {
    button.addEventListener("click", () => {
      const i = Number(button.closest("li").dataset.index);
      const step = editing.steps[i];
      if ((step.step || step.details) && !confirm(`Remove the step “${step.step || "untitled"}”?`)) return;
      editing.steps.splice(i, 1);
      renderPlanSection();
    });
  });

  document.getElementById("add-step").addEventListener("click", () => {
    editing.steps.push({ time: "5 min", step: "", details: "" });
    renderPlanSection();
    const rows = section.querySelectorAll("li[data-index]");
    rows[rows.length - 1].querySelector(".f-step").focus();
  });

  document.getElementById("save-plan").addEventListener("click", () => {
    editing.name = editing.name.trim() || "My plan";
    editing.steps = editing.steps.filter(s => s.step.trim() || s.details.trim());
    const others = planStore.plans.filter(p => p.id !== editing.id);
    const original = planStore.plans.findIndex(p => p.id === editing.id);
    if (original >= 0) {
      others.splice(original, 0, editing); // keep its place in the list
    } else {
      others.push(editing);
    }
    planStore.plans = others;
    planStore.selected = editing.id;
    editing = null;
    savePlanStore();
    renderPlanSection();
    document.getElementById("plan-section").scrollIntoView({ block: "start" });
  });

  document.getElementById("cancel-edit").addEventListener("click", () => {
    editing = null;
    renderPlanSection();
  });
}

/* ---------- Backup and sharing: plans and notes for every topic, as a file ---------- */

function saveSectionHtml(notesHtml) {
  return `
    <section class="no-print save-section">
      <h2>Save your work</h2>
      ${notesHtml}
      <details>
        <summary>Back up and share</summary>
      <p class="hint">Your plans and notes for all topics are saved only in this browser. Download a backup file to keep them safe, or send it to another teacher so they can load your plans.</p>
      <div class="plan-tools">
        <button class="btn" id="download-backup">Download my plans and notes</button>
        <label class="btn btn-light file-btn">Load from a file
          <input type="file" id="load-backup" accept=".json,application/json">
        </label>
      </div>
      <p id="backup-status" class="hint" aria-live="polite"></p>
      </details>
    </section>`;
}

function isValidPlan(plan) {
  const isText = value => typeof value === "string";
  return plan && isText(plan.id) && isText(plan.name) &&
    Array.isArray(plan.steps) && plan.steps.every(s => s && isText(s.time) && isText(s.step) && isText(s.details)) &&
    Array.isArray(plan.materials) && plan.materials.every(isText);
}

function setUpBackup() {
  const status = document.getElementById("backup-status");

  document.getElementById("download-backup").addEventListener("click", () => {
    const data = {};
    try {
      for (const key of Object.keys(TOPICS)) {
        for (const name of ["teacher-plans-" + key, "teacher-notes-" + key]) {
          const value = localStorage.getItem(name);
          if (value) data[name] = value;
        }
      }
    } catch (error) {
      status.textContent = "This browser isn't letting the page read saved plans.";
      return;
    }
    if (Object.keys(data).length === 0) {
      status.textContent = "There's nothing to back up yet. Edit a plan or write some notes first.";
      return;
    }
    const file = new Blob([JSON.stringify({ app: "flashcards-teacher", version: 1, saved: new Date().toISOString(), data }, null, 2)],
      { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(file);
    link.download = "flashcards-teacher-backup-" + new Date().toISOString().slice(0, 10) + ".json";
    link.click();
    URL.revokeObjectURL(link.href);
    status.textContent = "Downloaded ✓ Keep the file somewhere safe, or send it to a colleague.";
  });

  document.getElementById("load-backup").addEventListener("change", async (event) => {
    const file = event.target.files[0];
    event.target.value = ""; // let the same file be picked again later
    if (!file) return;
    // A real backup is a few kilobytes; refuse anything huge rather than loading it into memory
    if (file.size > 1024 * 1024) {
      status.textContent = "That file is too big to be a backup from this app.";
      return;
    }

    let backup;
    try {
      backup = JSON.parse(await file.text());
    } catch (error) {
      status.textContent = "That file couldn't be read. Please choose a backup made by this app.";
      return;
    }
    if (!backup || backup.app !== "flashcards-teacher" || !backup.data || typeof backup.data !== "object") {
      status.textContent = "That doesn't look like a backup from this app.";
      return;
    }

    // Collect what's usable from the file before changing anything
    const incoming = [];
    for (const key of Object.keys(TOPICS)) {
      const notes = backup.data["teacher-notes-" + key];
      if (typeof notes === "string" && notes.trim()) incoming.push({ key, notes });
      try {
        const plans = JSON.parse(backup.data["teacher-plans-" + key] || "null");
        if (plans && Array.isArray(plans.plans)) {
          const valid = plans.plans.filter(isValidPlan);
          if (valid.length) incoming.push({ key, plans: valid });
        }
      } catch (error) {
        // Skip a damaged topic, keep the rest
      }
    }
    if (incoming.length === 0) {
      status.textContent = "That backup doesn't have any plans or notes in it.";
      return;
    }

    const planCount = incoming.reduce((n, item) => n + (item.plans ? item.plans.length : 0), 0);
    const noteCount = incoming.filter(item => item.notes).length;
    if (!confirm(`Load ${planCount} plan(s) and notes for ${noteCount} topic(s) from this file?\n\n` +
      "Your own plans stay. Plans from the file are added (or updated if they're the same plan), and notes from the file are added below yours.")) return;

    try {
      for (const item of incoming) {
        if (item.notes) {
          const name = "teacher-notes-" + item.key;
          const existing = localStorage.getItem(name) || "";
          if (!existing.trim()) {
            localStorage.setItem(name, item.notes);
          } else if (!existing.includes(item.notes)) {
            localStorage.setItem(name, existing + "\n\n--- From backup file ---\n" + item.notes);
          }
        }
        if (item.plans) {
          const name = "teacher-plans-" + item.key;
          let store;
          try {
            store = JSON.parse(localStorage.getItem(name));
          } catch (error) {
            store = null;
          }
          if (!store || !Array.isArray(store.plans)) store = { plans: [], selected: READY_MADE };
          for (const plan of item.plans) {
            const mine = store.plans.findIndex(p => p.id === plan.id);
            if (plan.id === READY_MADE && mine >= 0 && JSON.stringify(store.plans[mine]) !== JSON.stringify(plan)) {
              // Both have edited the ready-made plan: keep theirs as a separate plan
              store.plans.push({ ...plan, id: "plan-" + Date.now() + "-" + store.plans.length, name: "Edited ready-made plan (from file)" });
            } else if (mine >= 0) {
              store.plans[mine] = plan;
            } else {
              store.plans.push(plan);
            }
          }
          localStorage.setItem(name, JSON.stringify(store));
        }
      }
    } catch (error) {
      status.textContent = "This browser couldn't save the loaded plans.";
      return;
    }
    status.textContent = "Loaded ✓ Refreshing…";
    setTimeout(() => location.reload(), 800);
  });
}

/* ---------- Notes ---------- */

function setUpNotes() {
  const box = document.getElementById("notes");
  const status = document.getElementById("saved");
  const storageKey = "teacher-notes-" + topicKey;

  try {
    box.value = localStorage.getItem(storageKey) || "";
  } catch (error) {
    status.textContent = "Notes can't be saved in this browser, so copy them somewhere safe.";
    return;
  }

  // Notes are saved a moment after typing stops, and straight away when the page is left
  let timer = null;
  function save() {
    clearTimeout(timer);
    timer = null;
    try {
      localStorage.setItem(storageKey, box.value);
      status.textContent = "Saved ✓";
    } catch (error) {
      status.textContent = "Couldn't save. Copy your notes somewhere safe.";
    }
  }
  box.addEventListener("input", () => {
    clearTimeout(timer);
    timer = setTimeout(save, 400);
  });
  window.addEventListener("pagehide", () => {
    if (timer !== null) save();
  });
}

// Start: show the chosen topic's guide, or the topic list if none was picked
if (!topic || !guide) {
  showChooser();
} else {
  showGuide();
}
