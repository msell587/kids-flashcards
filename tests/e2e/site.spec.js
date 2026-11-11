import { readdirSync } from "node:fs";
import { expect, test } from "@playwright/test";

const pages = readdirSync(".").filter(file => file.endsWith(".html"));

// Google Fonts are not part of what is being tested, and the tests should not need the internet
test.beforeEach(async ({ page }) => {
  await page.route("https://fonts.googleapis.com/**", route => route.fulfill({ contentType: "text/css", body: "" }));
});

test.describe("every page opens cleanly", () => {
  for (const file of pages) {
    test(file, async ({ page }) => {
      const problems = [];
      page.on("pageerror", error => problems.push("page error: " + error.message));
      page.on("console", message => {
        if (message.type() === "error") problems.push("console: " + message.text());
      });
      page.on("requestfailed", request => problems.push("request failed: " + request.url()));
      const response = await page.goto("/" + file);
      expect(response.status()).toBe(200);
      await page.waitForLoadState("networkidle");
      await expect(page.locator("body")).toBeVisible();
      expect(problems).toEqual([]);
    });
  }
});

test("every page sends a Content Security Policy that the browser accepts", async ({ page }) => {
  const violations = [];
  await page.addInitScript(() => {
    document.addEventListener("securitypolicyviolation", event => {
      (window.__violations ||= []).push(event.violatedDirective + " " + event.blockedURI);
    });
  });
  for (const file of ["index.html", "animals.html", "game.html", "teacher.html", "printables.html", "colouring.html"]) {
    await page.goto("/" + file);
    await page.waitForLoadState("networkidle");
    violations.push(...(await page.evaluate(() => window.__violations || [])));
  }
  expect(violations).toEqual([]);
});

test("holding the right arrow key does not skip through the whole deck", async ({ page }) => {
  await page.goto("/city.html");
  await page.keyboard.down("ArrowRight");
  for (let i = 0; i < 12; i++) await page.keyboard.down("ArrowRight"); // a held key sends repeats
  await page.keyboard.up("ArrowRight");
  await expect(page.locator("#counter")).toHaveText("2 / 12");
});

test("two quick taps on Next move one card, not two", async ({ page }) => {
  await page.goto("/city.html");
  const next = page.getByRole("button", { name: "Next" });
  await next.dblclick();
  await expect(page.locator("#counter")).toHaveText("2 / 12");
});

test("the progress bar follows the card", async ({ page }) => {
  await page.goto("/city.html");
  const bar = page.getByRole("progressbar");
  await expect(bar).toHaveAttribute("aria-valuenow", "1");
  await page.getByRole("button", { name: "Next" }).click();
  await expect(bar).toHaveAttribute("aria-valuenow", "2");
});

test("a damaged saved setting does not break a page", async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem("finished-topics", "{this is not json");
    localStorage.setItem("voice-settings", "42");
    localStorage.setItem("show-spanish", "maybe");
  });
  const problems = [];
  page.on("pageerror", error => problems.push(error.message));
  await page.goto("/index.html");
  await expect(page.locator(".tile").first()).toBeVisible();
  await page.goto("/city.html");
  await expect(page.locator("#word")).toHaveText("city");
  expect(problems).toEqual([]);
});

test("an unexpected error shows a calm message instead of a frozen page", async ({ page }) => {
  await page.goto("/city.html");
  await page.evaluate(() => setTimeout(() => { throw new Error("test bug"); }, 0));
  await expect(page.locator(".guard-toast.show")).toContainText("Something went wrong");
  await page.getByRole("button", { name: "Dismiss message" }).click();
  await expect(page.locator(".guard-toast.show")).toHaveCount(0);
});

test.describe("the colouring sheet code gate", () => {
  const sheet = "/pdf-view.html?file=images/coloring-sheets/spring.pdf&name=Spring.pdf";

  test("locks the form after five wrong codes", async ({ page }) => {
    let requests = 0;
    await page.route("https://script.google.com/**", route => {
      requests++;
      return route.fulfill({
        contentType: "application/json",
        headers: { "access-control-allow-origin": "*" },
        body: JSON.stringify({ error: "wrong code" }),
      });
    });
    await page.goto(sheet);
    const input = page.getByLabel("Teacher access code");
    for (let i = 0; i < 5; i++) {
      await input.fill("guess" + i);
      await page.getByRole("button", { name: "Show sheet" }).click();
      await expect(page.locator("#gate-error")).not.toHaveText("");
    }
    await expect(page.locator("#gate-error")).toContainText("Too many tries");
    await expect(page.getByRole("button", { name: "Show sheet" })).toBeDisabled();
    expect(requests).toBe(5);
    // Reloading the page does not give a fresh set of tries
    await page.reload();
    await expect(page.getByRole("button", { name: "Show sheet" })).toBeDisabled();
    expect(requests).toBe(5);
  });

  test("shows the wait when the script says there were too many attempts", async ({ page }) => {
    await page.route("https://script.google.com/**", route => route.fulfill({
      contentType: "application/json",
      headers: { "access-control-allow-origin": "*" },
      body: JSON.stringify({ error: "too many attempts", retryAfter: 300 }),
    }));
    await page.goto(sheet);
    await page.getByLabel("Teacher access code").fill("anything");
    await page.getByRole("button", { name: "Show sheet" }).click();
    await expect(page.locator("#gate-error")).toContainText("Too many tries");
    await expect(page.locator("#gate-error")).toContainText("minutes");
  });

  test("shows the sheet when the code is right", async ({ page }) => {
    await page.route("https://script.google.com/**", route => route.fulfill({
      contentType: "application/json",
      headers: { "access-control-allow-origin": "*" },
      body: JSON.stringify({ base64: Buffer.from("%PDF-1.4 test").toString("base64") }),
    }));
    await page.goto(sheet);
    await page.getByLabel("Teacher access code").fill("right-code");
    await page.getByRole("button", { name: "Show sheet" }).click();
    await expect(page.locator("#gate")).toBeHidden();
    await expect(page.locator("#download-btn")).toBeVisible();
  });
});
