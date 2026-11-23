// Checks the lesson timer logic (lesson-timer.js) with a fake clock, so no real time passes.
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";
import { describe, expect, it, vi } from "vitest";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const LessonTimer = vm.runInNewContext(readFileSync(join(root, "lesson-timer.js"), "utf8") + "\n;LessonTimer", {});

// A fake clock: `clock.now` moves only when the test says so, and ticks are run by hand
function fakeClock() {
  const clock = { now: 0, tick: null };
  return {
    clock,
    now: () => clock.now,
    setInterval: (fn) => { clock.tick = fn; return 1; },
    clearInterval: () => { clock.tick = null; },
    advance(ms) { clock.now += ms; if (clock.tick) clock.tick(); }
  };
}

const steps = [
  { time: "1 min", step: "Hello" },
  { time: "2 min", step: "Games" }
];

describe("LessonTimer.parseMinutes", () => {
  it("reads minutes from the plan's time text", () => {
    expect(LessonTimer.parseMinutes("3 min")).toBe(3);
    expect(LessonTimer.parseMinutes("10 mins")).toBe(10);
    expect(LessonTimer.parseMinutes("1.5 min")).toBe(1.5);
  });

  it("gives 0 when there is no number", () => {
    expect(LessonTimer.parseMinutes("a while")).toBe(0);
    expect(LessonTimer.parseMinutes(undefined)).toBe(0);
  });
});

describe("LessonTimer.formatTime", () => {
  it("shows minutes and seconds", () => {
    expect(LessonTimer.formatTime(125)).toBe("2:05");
    expect(LessonTimer.formatTime(60)).toBe("1:00");
    expect(LessonTimer.formatTime(0)).toBe("0:00");
  });

  it("never shows a negative time", () => {
    expect(LessonTimer.formatTime(-3)).toBe("0:00");
  });
});

describe("LessonTimer.create", () => {
  it("starts on the first step with its full time", () => {
    const fake = fakeClock();
    const timer = LessonTimer.create(steps, {}, fake);
    timer.start();
    expect(timer.state()).toMatchObject({ index: 0, total: 2, title: "Hello", seconds: 60, running: true });
    expect(timer.state().remaining).toBe(60);
  });

  it("moves to the next step when the time runs out, and says so", () => {
    const fake = fakeClock();
    const onStepEnd = vi.fn();
    const timer = LessonTimer.create(steps, { onStepEnd }, fake);
    timer.start();
    fake.advance(60000);
    expect(onStepEnd).toHaveBeenCalledTimes(1);
    expect(timer.state()).toMatchObject({ index: 1, title: "Games", seconds: 120 });
  });

  it("finishes after the last step and calls onFinish once", () => {
    const fake = fakeClock();
    const onFinish = vi.fn();
    const timer = LessonTimer.create(steps, { onFinish }, fake);
    timer.start();
    fake.advance(60000);
    fake.advance(120000);
    expect(onFinish).toHaveBeenCalledTimes(1);
    expect(timer.state().running).toBe(false);
  });

  it("keeps the time left when paused, and carries on from there", () => {
    const fake = fakeClock();
    const timer = LessonTimer.create(steps, {}, fake);
    timer.start();
    fake.clock.now = 20000;
    timer.pause();
    expect(timer.state().remaining).toBe(40);
    fake.clock.now = 50000; // time passes while paused
    fake.advance(0);
    expect(timer.state()).toMatchObject({ index: 0, paused: true, remaining: 40 });
    timer.resume();
    fake.advance(39000);
    expect(timer.state().index).toBe(0);
    fake.advance(2000);
    expect(timer.state().index).toBe(1);
  });

  it("gives every step at least a minute, even when its time is missing", () => {
    const fake = fakeClock();
    const timer = LessonTimer.create([{ time: "", step: "Quick" }], {}, fake);
    timer.start();
    expect(timer.state().seconds).toBe(60);
  });

  it("moves on with next and back, and never goes below the first step", () => {
    const fake = fakeClock();
    const timer = LessonTimer.create(steps, {}, fake);
    timer.start();
    timer.back();
    expect(timer.state().index).toBe(0);
    timer.next();
    expect(timer.state().index).toBe(1);
    timer.next();
    expect(timer.state().running).toBe(false);
  });

  it("stops cleanly and does nothing after", () => {
    const fake = fakeClock();
    const onFinish = vi.fn();
    const timer = LessonTimer.create(steps, { onFinish }, fake);
    timer.start();
    timer.stop();
    expect(timer.state().running).toBe(false);
    expect(fake.clock.tick).toBe(null);
    expect(onFinish).not.toHaveBeenCalled();
  });
});
