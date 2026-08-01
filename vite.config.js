import { defineConfig } from "vite";
import { readdirSync } from "node:fs";
import { join, relative } from "node:path";

const projectRoot = import.meta.dirname;
const pageDirectories = [
  "about",
  "business-card",
  "career-description-guide",
  "contact",
  "guides",
  "invitation",
  "privacy",
  "resume",
  "resume-entry-level",
  "resume-example",
  "resume-experienced",
  "resume-guide",
  "resume-photo-guide",
  "terms",
];

function collectHtmlEntries(directory, entries = {}) {
  for (const item of readdirSync(directory, { withFileTypes: true })) {
    const fullPath = join(directory, item.name);
    if (item.isDirectory()) {
      collectHtmlEntries(fullPath, entries);
    } else if (item.name.endsWith(".html")) {
      addHtmlEntry(fullPath, entries);
    }
  }
  return entries;
}

function addHtmlEntry(fullPath, entries) {
  const relativePath = relative(projectRoot, fullPath).replaceAll("\\", "/");
  const key =
    relativePath.replace(/\.html$/, "").replaceAll("/", "-") || "index";
  entries[key] = fullPath;
}

const htmlEntries = {};
for (const item of readdirSync(projectRoot, { withFileTypes: true })) {
  if (item.isFile() && item.name.endsWith(".html")) {
    addHtmlEntry(join(projectRoot, item.name), htmlEntries);
  }
}
for (const directory of pageDirectories) {
  collectHtmlEntries(join(projectRoot, directory), htmlEntries);
}

export default defineConfig({
  base: "/",
  build: {
    rollupOptions: {
      input: htmlEntries,
    },
  },
});
