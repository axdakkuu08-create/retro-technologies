import { execFileSync } from "node:child_process";
import { cpSync, existsSync, mkdirSync, mkdtempSync, readdirSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { basename, join, resolve } from "node:path";

const root = process.cwd();
const archive = join(root, "retro-website-v1.zip");
const updatedHome = join(root, "index (1).html");
const output = join(root, "dist");

if (!existsSync(archive)) throw new Error("Required source archive retro-website-v1.zip is missing.");
if (!existsSync(updatedHome)) throw new Error('Updated portal source "index (1).html" is missing.');

const temp = mkdtempSync(join(tmpdir(), "retro-pages-"));
try {
  execFileSync("unzip", ["-q", "-o", archive, "-d", temp], { stdio: "inherit" });

  const candidates = [];
  function scan(dir, depth = 0) {
    const entries = readdirSync(dir, { withFileTypes: true });
    const files = new Set(entries.filter((entry) => entry.isFile()).map((entry) => entry.name));
    if (files.has("styles.css") && files.has("script.js")) {
      candidates.push({ dir, score: (files.has("index.html") ? 0 : 1) + depth / 100 });
    }
    if (depth < 5) {
      for (const entry of entries) {
        if (entry.isDirectory() && !entry.name.startsWith(".")) scan(join(dir, entry.name), depth + 1);
      }
    }
  }
  scan(temp);
  candidates.sort((a, b) => a.score - b.score);
  if (!candidates.length) {
    throw new Error("The ZIP archive did not contain a site directory with both styles.css and script.js.");
  }

  const siteRoot = candidates[0].dir;
  rmSync(output, { recursive: true, force: true });
  mkdirSync(output, { recursive: true });
  cpSync(siteRoot, output, { recursive: true });

  // Publish the reviewed PR version of the home page while retaining the
  // supporting assets and additional pages from the checked-in site archive.
  cpSync(updatedHome, join(output, "index.html"));

  for (const required of ["index.html", "styles.css", "script.js"]) {
    if (!existsSync(join(output, required))) {
      throw new Error(`Prepared site is missing required file: ${required}`);
    }
  }

  const home = await (await import("node:fs/promises")).readFile(join(output, "index.html"), "utf8");
  if (!home.includes("https://nexus-ai-preview-onuy8rca4-axdakkuu08-create.vercel.app/")) {
    throw new Error("Prepared home page does not contain the reviewed NEXUS-AI destination.");
  }

  console.log("Prepared RETRO Technologies Pages site in dist/.");
  console.log("Verified index.html, styles.css, script.js, and the reviewed NEXUS-AI link.");
} finally {
  rmSync(temp, { recursive: true, force: true });
}
