// Checks the content in topics.js: every topic has its words in English and Spanish,
// and every picture the app uses is in the project.
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";
import { describe, expect, it } from "vitest";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const TOPICS = vm.runInNewContext(readFileSync(join(root, "topics.js"), "utf8") + "\n;TOPICS", {});

// Pictures are optional on some cards, so only cards that name a picture are checked for it
const picturesOf = card => [card.picture, card.picture2].filter(Boolean);

describe("topics", () => {
  it("has topics with cards", () => {
    const keys = Object.keys(TOPICS);
    expect(keys.length).toBeGreaterThan(0);
    for (const key of keys) {
      expect(TOPICS[key].cards.length, key).toBeGreaterThan(0);
      expect(TOPICS[key].title, key).toBeTruthy();
      expect(TOPICS[key].page, key).toBeTruthy();
    }
  });

  for (const key of Object.keys(TOPICS)) {
    it(`${key}: every card has an English word`, () => {
      for (const card of TOPICS[key].cards) {
        expect(card.word, JSON.stringify(card)).toBeTruthy();
      }
    });

    it(`${key}: every card has a Spanish word`, () => {
      for (const card of TOPICS[key].cards) {
        expect(card.es, `${key}: ${card.word} has no Spanish`).toBeTruthy();
      }
    });

    it(`${key}: every picture exists in the project`, () => {
      for (const card of TOPICS[key].cards) {
        for (const picture of picturesOf(card)) {
          expect(existsSync(join(root, picture)), `${key}: ${picture} is missing`).toBe(true);
        }
      }
    });
  }
});
