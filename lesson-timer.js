// Lesson timer for the Teacher's Corner: runs a lesson plan one step at a time with a countdown.
// The timing is worked out from the clock, not from counting ticks, so it stays right even when the
// tab is in the background. Everything that touches the page lives in teacher.js; this file is plain
// logic, which tests/lesson-timer.test.js checks. Classic script: it sets window.LessonTimer.
const LessonTimer = (() => {
  // "3 min" -> 3, "10 mins" -> 10, "1.5 min" -> 1.5, "a while" -> 0
  function parseMinutes(text) {
    const match = String(text == null ? "" : text).match(/(\d+(?:[.,]\d+)?)/);
    return match ? Number(match[1].replace(",", ".")) : 0;
  }

  // 125 -> "2:05"; never negative
  function formatTime(seconds) {
    const whole = Math.max(0, Math.ceil(seconds));
    const minutes = Math.floor(whole / 60);
    const rest = whole % 60;
    return minutes + ":" + (rest < 10 ? "0" : "") + rest;
  }

  // steps: [{ time: "5 min", step: "Hello circle", ... }]
  // hooks.onChange(state) is called whenever the step, the time left or the paused state changes;
  // hooks.onStepEnd(state) when a step's time runs out (before moving on); hooks.onFinish() after the last step.
  // options.now, setInterval, clearInterval can be replaced in tests.
  function create(steps, hooks = {}, options = {}) {
    const now = options.now || (() => Date.now());
    const start = options.setInterval || ((fn, ms) => setInterval(fn, ms));
    const stop = options.clearInterval || (id => clearInterval(id));
    const tickMs = options.tickMs || 250;
    // Steps with no readable time still get a minute, so the lesson never skips past them
    const plan = steps.map(step => ({
      title: step.step || "Untitled step",
      seconds: Math.max(60, Math.round(parseMinutes(step.time) * 60))
    }));

    let index = 0;
    let endsAt = 0;       // clock time when the current step ends (while running)
    let remaining = 0;    // seconds left (while paused)
    let paused = false;
    let running = false;
    let timer = null;

    function secondsLeft() {
      return paused ? remaining : Math.max(0, (endsAt - now()) / 1000);
    }

    function state() {
      return {
        index,
        total: plan.length,
        title: plan[index] ? plan[index].title : "",
        seconds: plan[index] ? plan[index].seconds : 0,
        remaining: secondsLeft(),
        paused,
        running
      };
    }

    function notify() {
      if (hooks.onChange) hooks.onChange(state());
    }

    function beginStep(i) {
      index = i;
      paused = false;
      endsAt = now() + plan[index].seconds * 1000;
      notify();
    }

    function tick() {
      if (!running || paused) return;
      if (now() < endsAt) {
        notify();
        return;
      }
      if (hooks.onStepEnd) hooks.onStepEnd(state());
      if (index + 1 < plan.length) {
        beginStep(index + 1);
      } else {
        finish();
      }
    }

    function finish() {
      if (!running) return;
      running = false;
      stop(timer);
      timer = null;
      notify();
      if (hooks.onFinish) hooks.onFinish();
    }

    return {
      start() {
        if (running || plan.length === 0) return;
        running = true;
        timer = start(tick, tickMs);
        beginStep(0);
      },
      pause() {
        if (!running || paused) return;
        remaining = secondsLeft();
        paused = true;
        notify();
      },
      resume() {
        if (!running || !paused) return;
        endsAt = now() + remaining * 1000;
        paused = false;
        notify();
      },
      // Move on before the time is up (or back to the step before)
      next() {
        if (!running) return;
        if (index + 1 < plan.length) beginStep(index + 1);
        else finish();
      },
      back() {
        if (!running) return;
        beginStep(Math.max(0, index - 1));
      },
      stop() {
        if (!running) return;
        running = false;
        stop(timer);
        timer = null;
        notify();
      },
      state
    };
  }

  return { parseMinutes, formatTime, create };
})();
