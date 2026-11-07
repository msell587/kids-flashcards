import { defineConfig } from "vitest/config";

// Unit and content tests only; the browser tests run with Playwright
export default defineConfig({
  test: { include: ["tests/*.test.js"] },
});
