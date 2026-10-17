import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { describe, expect, it } from "vitest";

const ROOT = join(__dirname, "..");
const SCAN_DIRS = ["app", "components", "lib"];

/** Recursively collect .ts/.tsx source files, skipping test files. */
function collectSources(): string[] {
  const out: string[] = [];
  const walk = (dir: string) => {
    for (const entry of readdirSync(dir)) {
      const full = join(dir, entry);
      if (statSync(full).isDirectory()) {
        walk(full);
        continue;
      }
      if (!/\.tsx?$/.test(entry)) continue;
      if (/\.test\./.test(entry)) continue;
      out.push(full);
    }
  };
  for (const d of SCAN_DIRS) {
    const abs = join(ROOT, d);
    try {
      if (statSync(abs).isDirectory()) walk(abs);
    } catch {
      // directory absent; nothing to scan
    }
  }
  return out;
}

type Match = { file: string; line: number; text: string };

/** Find every line in every source file that matches the pattern. */
function findMatches(pattern: RegExp): Match[] {
  const matches: Match[] = [];
  for (const file of collectSources()) {
    const lines = readFileSync(file, "utf8").split(/\r?\n/);
    lines.forEach((text, i) => {
      // Reset lastIndex for global/sticky patterns reused across lines.
      pattern.lastIndex = 0;
      if (pattern.test(text)) {
        matches.push({ file: relative(ROOT, file), line: i + 1, text: text.trim() });
      }
    });
  }
  return matches;
}

function format(matches: Match[]): string {
  return matches.map((m) => `${m.file}:${m.line}  ${m.text}`).join("\n");
}

function expectNoMatches(pattern: RegExp) {
  const matches = findMatches(pattern);
  expect(matches, `\n${format(matches)}\n`).toHaveLength(0);
}

describe("copy rules", () => {
  it("has no em dashes (U+2014)", () => {
    expectNoMatches(/\u2014/);
  });

  it('does not use the banned word "seamless"', () => {
    expectNoMatches(/seamless/i);
  });

  it('uses the reserved "nexus-sync.example" domain, not "nexus-sync.dev"', () => {
    expectNoMatches(/nexus-sync\.dev/);
  });

  it('installs the published "nexus-sync-cli" package, never the unowned "nexus-sync" name', () => {
    expectNoMatches(/npm (?:install|i) (?:-g |--global |-D |--save-dev )?nexus-sync(?!-cli)\b/);
  });

  it('does not reference the "@nexus-sync/" npm scope', () => {
    expectNoMatches(/@nexus-sync\//);
  });

  it('has no placeholder href="#" links', () => {
    expectNoMatches(/href="#"/);
  });

  it('uses the "nxs" binary, not the old "nexus <command>" CLI name', () => {
    expectNoMatches(/\bnexus (up|pod|sync|preview|db|invite|share)\b/);
  });

  it('does not use the placeholder "ada@team.com" address', () => {
    expectNoMatches(/ada@team\.com/);
  });
});
