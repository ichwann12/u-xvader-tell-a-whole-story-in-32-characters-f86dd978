import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = dirname(fileURLToPath(import.meta.url));
const entry = readFileSync(join(repoRoot, "entry.txt"), "utf8").trim();

// The bounty gate only accepts 1–32 characters of non-whitespace text.
if (entry.length < 1 || entry.length > 32 || !/\S/.test(entry)) {
  throw new Error(`entry must be 1–32 characters, got ${entry.length}`);
}

const outputDir =
  process.env.MAKEFUN_OUTPUT_DIR ??
  process.env.MAKEFUN_BOT_DIR ??
  join(repoRoot, "output");

mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, "entry.txt"), entry, "utf8");
