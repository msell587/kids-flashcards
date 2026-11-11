// Page hygiene: rules every page must follow, so a new page cannot quietly miss them.
import { readdirSync, readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { CONTENT_SECURITY_POLICY, addSecurityPolicy } from "../build/csp.js";
import { SHEET_WORKER_URL } from "../sheet-access.js";

const pages = readdirSync(".").filter(file => file.endsWith(".html"));
const read = file => readFileSync(file, "utf8");

describe("every page", () => {
  it.each(pages)("%s has a language, title, description, viewport and the Guard script", page => {
    const html = read(page);
    expect(html, "lang").toMatch(/<html lang="en">/);
    expect(html, "title").toMatch(/<title>[^<]{3,}<\/title>/);
    expect(html, "description").toMatch(/<meta name="description" content="[^"]{20,}">/);
    expect(html, "viewport").toMatch(/<meta name="viewport"/);
    expect(html, "guard").toMatch(/<script src="guard\.js"><\/script>/);
  });

  it.each(pages)("%s loads Guard before any other script", page => {
    const html = read(page);
    const guard = html.indexOf('src="guard.js"');
    const firstOther = html.search(/<script\b(?![^>]*guard\.js)/);
    expect(firstOther === -1 || guard < firstOther).toBe(true);
  });

  it.each(pages)("%s has no duplicate ids", page => {
    const ids = [...read(page).matchAll(/\sid="([^"$]+)"/g)].map(match => match[1]);
    expect(ids.filter((id, index) => ids.indexOf(id) !== index)).toEqual([]);
  });

  it.each(pages)("%s has no picture without alt text", page => {
    const images = [...read(page).matchAll(/<img\b[^>]*>/g)].map(match => match[0]);
    expect(images.filter(tag => !/\salt=/.test(tag))).toEqual([]);
  });
});

describe("offline support", () => {
  const sw = read("sw.js");
  const scripts = readdirSync(".").filter(file =>
    file.endsWith(".js") && !/^(sw|vite\.config|vitest\.config|playwright\.config)\.js$/.test(file));

  it.each(pages)("%s is saved for offline use", page => {
    expect(sw).toContain(`"${page}"`);
  });

  it.each(scripts)("%s is saved for offline use", script => {
    expect(sw).toContain(`"${script}"`);
  });
});

describe("spelling in the pages", () => {
  // The app uses British spelling: colour, colouring. File paths such as coloring-sheets keep their old name.
  it.each(pages)("%s does not mix in American 'coloring' in visible text", page => {
    const text = read(page).replace(/<script[\s\S]*?<\/script>/g, "").replace(/<style[\s\S]*?<\/style>/g, "")
      .replace(/<[^>]*>/g, " ");
    expect(text).not.toMatch(/\b[Cc]olor(ing|s)?\b/);
  });
});

describe("Content Security Policy", () => {
  it("lets the page talk to the Apps Script, and nothing else outside the site", () => {
    const origin = new URL(SHEET_WORKER_URL).origin;
    expect(CONTENT_SECURITY_POLICY).toContain(`connect-src 'self' ${origin}`);
    const connect = CONTENT_SECURITY_POLICY.split("; ").find(rule => rule.startsWith("connect-src"));
    expect(connect.match(/https:\/\/[^\s]+/g).sort()).toEqual([origin, "https://script.googleusercontent.com"].sort());
  });

  it("is placed after the viewport tag and before any script", () => {
    const html = addSecurityPolicy('<head><meta name="viewport" content="x"><script src="guard.js"></script></head>');
    expect(html.indexOf("Content-Security-Policy")).toBeGreaterThan(html.indexOf("viewport"));
    expect(html.indexOf("Content-Security-Policy")).toBeLessThan(html.indexOf("guard.js"));
  });

  it("blocks plugins and other base addresses", () => {
    expect(CONTENT_SECURITY_POLICY).toContain("base-uri 'self'");
    expect(CONTENT_SECURITY_POLICY).toContain("default-src 'self'");
  });
});

describe("PDF libraries from the CDN", () => {
  it("are loaded with an integrity hash", () => {
    const source = read("save-print.js");
    expect(source).toMatch(/script\.integrity = integrity/);
    const urls = source.match(/cdnjs\.cloudflare\.com[^"]+/g);
    const hashes = source.match(/integrity: "sha512-[A-Za-z0-9+/=]+"/g);
    expect(hashes).toHaveLength(urls.length);
  });
});
