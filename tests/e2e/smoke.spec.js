import { expect, test } from "@playwright/test";

test("a topic card moves on when Next is pressed", async ({ page }) => {
  await page.goto("/city.html");
  const word = page.locator("#word");
  await expect(word).toHaveText("city");
  await page.getByRole("button", { name: "Next" }).click();
  await expect(word).not.toHaveText("city");
  await expect(page.locator("#counter")).toHaveText("2 / 12");
});

test("the Animals Farm filter shows only farm animals", async ({ page }) => {
  await page.goto("/animals.html");
  await expect(page.locator("#counter")).toHaveText("1 / 36");
  await page.locator('[data-group="farm"]').click();
  await expect(page.locator("#counter")).toHaveText("1 / 12");
  await expect(page.locator('[data-group="farm"]')).toHaveClass(/on/);
});

test("the printables page lists the colouring sheets for a topic", async ({ page }) => {
  await page.goto("/printables.html");
  await page.locator("#topic-select").selectOption({ label: "Parts of the House" });
  await expect(page.locator("#sheet-select option", { hasText: "House colouring sheet" })).toHaveCount(1);
});
