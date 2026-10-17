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

// Topic switcher in the top bar
document.getElementById("topic-nav").innerHTML = Object.keys(TOPICS).map(key =>
  `<a class="pill" href="teacher.html?topic=${key}"${key === topicKey ? ' aria-current="page"' : ""}>${escapeHtml(TOPICS[key].title)}</a>`
).join("");

function showChooser() {
  main.innerHTML = `
    <h1>Teacher's Corner</h1>
    <p class="lead">Lesson plans, crafts, songs and games for each flashcard topic. For ages 3–5.</p>
    <section>
      <h2>Pick a topic</h2>
      <div class="chooser">
        ${Object.keys(TOPICS).map(key =>
          `<a class="btn" href="teacher.html?topic=${key}">${escapeHtml(TOPICS[key].title)}</a>`).join("")}
      </div>
    </section>`;
}

function showGuide() {
  document.title = topic.title + " · Teacher's Guide";

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
      ${craft.tip ? `<p class="tip">💡 ${escapeHtml(craft.tip)}</p>` : ""}
    </div>`).join("");

  const songs = guide.songs.map(song => `
    <div class="item">
      <h3>${escapeHtml(song.title)}</h3>
      <div class="tune">Tune: ${escapeHtml(song.tune)}</div>
      ${song.words ? `<div class="lyrics">${escapeHtml(song.words)}</div>` : ""}
      <p>${escapeHtml(song.how)}</p>
      ${song.search ? `<p class="no-print"><a href="https://www.youtube.com/results?search_query=${encodeURIComponent(song.search)}" target="_blank" rel="noopener">Find the tune on YouTube ↗</a></p>` : ""}
    </div>`).join("");

  const games = guide.games.map(game => `
    <div class="item">
      <h3>${escapeHtml(game.name)}</h3>
      <p>${escapeHtml(game.how)}</p>
    </div>`).join("");

  main.innerHTML = `
    <h1>${escapeHtml(topic.title)} · Teacher's Guide</h1>
    <p class="lead">For ages 3–5 · 1-hour lesson · ${topic.cards.length} words</p>
    <div class="actions">
      <a class="btn" href="${encodeURI(topic.page)}">▶ Open flashcards</a>
      <a class="btn" href="print.html?topic=${topicKey}">🖨 Print flashcards</a>
      <button class="btn" onclick="window.print()">🖨 Print this guide</button>
    </div>

    <section>
      <h2>🎯 Goal</h2>
      <p>${escapeHtml(guide.goal)}</p>
      <h3>Words</h3>
      <ul class="words">${words}</ul>
    </section>

    <section id="plan-section"></section>

    <section>
      <h2>✂️ Crafts</h2>
      ${crafts}
    </section>

    <section>
      <h2>🎵 Songs</h2>
      ${songs}
    </section>

    <section>
      <h2>🎲 Games</h2>
      ${games}
    </section>

    <section>
      <h2>✏️ My notes</h2>
      <p class="hint no-print">Your own ideas for this topic. They save automatically on this device and browser only.</p>
      <textarea id="notes" aria-label="My notes for ${escapeHtml(topic.title)}" placeholder="e.g. Class loved Animal Moves. Next time add a zebra card."></textarea>
      <p id="saved" class="no-print" aria-live="polite"></p>
    </section>`;

  renderPlanSection();
  setUpNotes();
}

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
    if (saved && Array.isArray(saved.plans)) return saved;
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
      <h2>📋 Lesson plan</h2>
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
      <button class="btn" id="edit-plan">✏️ Edit this plan</button>
      <button class="btn btn-light" id="copy-plan">⧉ Copy as new plan</button>
      <button class="btn btn-light" id="new-plan">＋ New blank plan</button>
      ${isEdited ? '<button class="btn btn-light" id="reset-plan">↺ Reset to original</button>' : ""}
      ${!isReadyMade ? '<button class="btn btn-danger" id="delete-plan">🗑 Delete plan</button>' : ""}
    </div>
    ${storageWorks ? "" : '<p class="hint no-print">⚠️ This browser can\'t save plans, so changes will be lost when you close the page.</p>'}`;

  const picker = document.getElementById("plan-picker");
  if (picker) {
    picker.addEventListener("change", () => {
      planStore.selected = picker.value;
      savePlanStore();
      renderPlanSection();
    });
  }

  document.getElementById("edit-plan").addEventListener("click", () => {
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
    <h2>✏️ Editing: ${escapeHtml(editing.name)}</h2>
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
    <button class="btn btn-light" id="add-step">＋ Add step</button>
    <label class="field">You'll need (one item per line)
      <textarea id="plan-materials" rows="5">${escapeHtml(editing.materials.join("\n"))}</textarea>
    </label>
    <div class="plan-tools">
      <button class="btn" id="save-plan">💾 Save plan</button>
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

  let timer;
  box.addEventListener("input", () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      try {
        localStorage.setItem(storageKey, box.value);
        status.textContent = "Saved ✓";
      } catch (error) {
        status.textContent = "Couldn't save. Copy your notes somewhere safe.";
      }
    }, 400);
  });
}

// Start: show the chosen topic's guide, or the topic list if none was picked
if (!topic || !guide) {
  showChooser();
} else {
  showGuide();
}
