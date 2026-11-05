import { defineConfig } from "vite";
import { readdirSync, cpSync, copyFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

// Every HTML page in the project root becomes an entry point of the build
const pages = readdirSync(".").filter((file) => file.endsWith(".html"));

// Classic scripts, the manifest and the media folders are not bundled by Vite,
// so copy them into the build output unchanged.
const scripts = readdirSync(".").filter(
  (file) => file.endsWith(".js") && file !== "vite.config.js"
);
const folders = ["images", "icons", "printables"];
const extras = ["manifest.webmanifest"];

function copyStaticFiles() {
  return {
    name: "copy-static-files",
    closeBundle() {
      for (const file of [...scripts, ...extras]) {
        copyFileSync(file, resolve("dist", file));
      }
      for (const folder of folders) {
        if (existsSync(folder)) cpSync(folder, resolve("dist", folder), { recursive: true });
      }
    },
  };
}

export default defineConfig({
  plugins: [copyStaticFiles()],
  build: {
    rollupOptions: {
      input: Object.fromEntries(
        pages.map((page) => [page.replace(/\.html$/, ""), resolve(page)])
      ),
    },
  },
});
