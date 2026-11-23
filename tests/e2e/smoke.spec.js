import { expect, test } from "@playwright/test";
import { readFileSync } from "node:fs";
import vm from "node:vm";

// Card counts come from topics.js, so adding a card or a topic does not break these tests
const TOPICS = vm.runInNewContext(readFileSync("topics.js", "utf8") + "\n;TOPICS", {});
const total = key => TOPICS[key].cards.length;
const firstWord = key => TOPICS[key].cards[0].word;

test("a topic card moves on when Next is pressed", async ({ page }) => {
  await page.goto("/city.html");
  const word = page.locator("#word");
  await expect(word).toHaveText(firstWord("city"));
  await page.getByRole("button", { name: "Next" }).click();
  await expect(word).not.toHaveText(firstWord("city"));
  await expect(page.locator("#counter")).toHaveText(`2 / ${total("city")}`);
});

test("the Animals Farm filter shows only farm animals", async ({ page }) => {
  await page.goto("/animals.html");
  await expect(page.locator("#counter")).toHaveText(`1 / ${total("animals")}`);
  await page.locator('[data-group="farm"]').click();
  await expect(page.locator("#counter")).toHaveText(`1 / ${TOPICS.animals.cards.filter(card => card.group === "farm").length}`);
  await expect(page.locator('[data-group="farm"]')).toHaveClass(/on/);
});

test("the printables page lists the colouring sheets for a topic", async ({ page }) => {
  await page.goto("/printables.html");
  await page.locator("#topic-select").selectOption({ label: "Parts of the House" });
  await expect(page.locator("#sheet-select option", { hasText: "House colouring sheet" })).toHaveCount(1);
});

test("Hide words turns the card over to show the word", async ({ page }) => {
  await page.goto("/city.html");
  await page.locator("#options-btn").click();
  await page.locator("#guess-btn").click();
  await page.locator("#options-btn").click();
  await expect(page.locator(".card")).toHaveClass(/hidden-word/);
  await page.locator(".card").click();
  await expect(page.locator(".card")).not.toHaveClass(/hidden-word/);
  await expect(page.locator("#word")).toHaveText(firstWord("city"));
});

test("the Animals farm filter keeps Shuffle working on the chosen group", async ({ page }) => {
  await page.goto("/animals.html");
  await page.locator('[data-group="farm"]').click();
  await page.locator("#options-btn").click();
  await page.locator("#shuffle-btn").click();
  const farm = TOPICS.animals.cards.filter(card => card.group === "farm").length;
  await expect(page.locator("#counter")).toHaveText(`1 / ${farm}`);
});

test("the teacher's guide runs a lesson timer through the plan", async ({ page }) => {
  await page.goto("/teacher.html?topic=animals");
  await page.locator("#run-lesson").click();
  await expect(page.locator("#lesson-bar")).toBeVisible();
  await expect(page.locator("#lesson-step")).toHaveText(/Step 1 of/);
  await page.locator("#lesson-next").click();
  await expect(page.locator("#lesson-step")).toHaveText(/Step 2 of/);
  await page.locator("#lesson-stop").click();
  await expect(page.locator("#lesson-bar")).toBeHidden();
});

test("the class game lists the other games for the topic", async ({ page }) => {
  await page.goto("/classroom-game.html?topic=animals");
  await expect(page.locator("#game-select option", { hasText: "Find the ___" })).toHaveCount(1);
});
