import { defineConfig } from "vite";
import { readdirSync, cpSync, copyFileSync, existsSync } from "node:fs";
import { resolve, sep } from "node:path";
import { isGatedSheet } from "./sheet-access.js";

// Every HTML page in the project root becomes an entry point of the build
const pages = readdirSync(".").filter((file) => file.endsWith(".html"));

// Gated coloring sheets are sent by the Google Apps Script, never copied into the public site
const notGated = (src) => !isGatedSheet(src.split(sep).join("/"));

// Classic scripts, the manifest and the media folders are not bundled by Vite,
// so copy them into the build output unchanged.
const scripts = readdirSync(".").filter(
  (file) => file.endsWith(".js") && file !== "vite.config.js"
);
const folders = ["images", "icons", "printables"];
const extras = ["manifest.webmanifest"];

function copyStaticFiles() {
  let outDir = "dist";
  return {
    name: "copy-static-files",
    // Copy into the folder the build actually writes to, also when --outDir is given
    configResolved(config) {
      outDir = resolve(config.root, config.build.outDir);
    },
    closeBundle() {
      for (const file of [...scripts, ...extras]) {
        copyFileSync(file, resolve(outDir, file));
      }
      for (const folder of folders) {
        if (existsSync(folder)) cpSync(folder, resolve(outDir, folder), { recursive: true, filter: notGated });
      }
    },
  };
}

export default defineConfig({
  plugins: [copyStaticFiles()],
  // Relative asset paths, so the site works under any address (for example a GitHub Pages project path)
  base: "./",
  build: {
    rollupOptions: {
      input: Object.fromEntries(
        pages.map((page) => [page.replace(/\.html$/, ""), resolve(page)])
      ),
    },
  },
});
