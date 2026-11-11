import { copyFile, mkdir, rm, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const output = path.join(root, "dist");

// Explicit allowlist: internal docs, source-control metadata, templates, and
// project-planning files are never copied into the public hosting directory.
const publicFiles = [
  "index.html",
  "styles.css",
  "script.js",
  "project.html",
  "privacy.html",
  "terms.html",
  "404.html",
  "robots.txt",
  "products/nexus-ai/index.html",
  "products/repilot-ai/index.html",
  "products/ai-engineering-os/index.html",
  "products/arcane-protocol/index.html",
  "products/pulse/index.html",
  "products/gemini-github-bridge/index.html"
];

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });

for (const relativePath of publicFiles) {
  const source = path.join(root, relativePath);
  const destination = path.join(output, relativePath);
  const sourceInfo = await stat(source);

  if (!sourceInfo.isFile()) {
    throw new Error(`Expected a regular public file: ${relativePath}`);
  }

  await mkdir(path.dirname(destination), { recursive: true });
  await copyFile(source, destination);
}

console.log(`Prepared ${publicFiles.length} allowlisted public files in dist/.`);
