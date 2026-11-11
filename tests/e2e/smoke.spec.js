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
