/// <reference types="vite/client" />
import { readdirSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it, vi } from "vitest";
import { render } from "@testing-library/react";
import type { ComponentType } from "react";
import { allDocs } from "@/lib/docs/content";
import type { TocItem } from "@/components/docs/prose";
import nextConfig from "../next.config.js";

// next/link mocked to a plain anchor so pages render without a router.
vi.mock("next/link", () => ({
  default: ({
    href,
    children,
    ...rest
  }: { href: string; children: React.ReactNode } & React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a href={href} {...rest}>
      {children}
    </a>
  ),
}));

type PageModule = { default: ComponentType; toc: TocItem[] };

const PAGES_DIR = join(__dirname, "..", "components", "docs", "pages");
// Lazy loaders, so one broken page fails only its own tests.
const loaders = import.meta.glob<PageModule>("../components/docs/pages/*.tsx");

const validSlugs = new Set<string>(allDocs.map((d) => d.slug));
const pageSlugs = allDocs.map((d) => d.slug).filter((s) => s !== "start-flow");

// Everything nexus-sync-cli 0.1.0 accepts (see `nexus-sync --help`).
const COMMANDS = new Set(["init", "start", "stop", "status", "db", "collab", "test", "deploy", "help"]);
const SUBCOMMANDS: Record<string, Set<string>> = {
  db: new Set(["sandbox", "help"]),
  collab: new Set(["invite", "help"]),
};
const FLAGS = new Set(["--help", "-h", "--version", "-V"]);

// Site routes outside the docs that a page may link to.
const SITE_ROUTES = /^\/(?:#(?:note|product|pricing))?$|^\/start$|^\/careers$/;

const PLACEHOLDER = /\b(?:drafting|lorem|tbd|todo|coming soon|next week)\b/i;
const SLOP =
  /\b(?:seamless(?:ly)?|effortless(?:ly)?|blazing|supercharge|delve|elevate|unlock|unleash|harness|game-changer|cutting-edge|revolutioni[sz]e|robust|streamline|empower|let's|ship faster)\b|in today's|whether you're|in this (?:guide|page|tutorial|section)/i;

async function renderPage(slug: string) {
  const load = loaders[`../components/docs/pages/${slug}.tsx`];
  expect(load, `components/docs/pages/${slug}.tsx is missing`).toBeDefined();
  const mod = await load();
  const { container } = render(<mod.default />);
  return { mod, container };
}

/** Text a reader sees in prose, with code, terminal output and keys removed. */
function proseText(container: HTMLElement): string {
  const clone = container.cloneNode(true) as HTMLElement;
  clone.querySelectorAll("pre, code, kbd").forEach((el) => el.remove());
  return clone.textContent ?? "";
}

/** Every `nexus-sync ...` invocation inside code, except blocks that show an error. */
function invocations(container: HTMLElement): string[][] {
  const out: string[][] = [];
  container.querySelectorAll("code").forEach((code) => {
    const text = code.textContent ?? "";
    if (/\berror:/.test(text)) return;
    const re = /(?:^|[\s`$(])(?:nexus-sync|npx nexus-sync-cli)((?:[ \t]+[^\s`)]+)*)/gm;
    for (const m of text.matchAll(re)) {
      const tokens = m[1].trim().split(/[ \t]+/).filter(Boolean);
      // Stop at shell syntax and comments: the rest is not CLI input.
      const end = tokens.findIndex((t) => /^(?:#|&&|\|\||\||;|>|2>|<)/.test(t));
      out.push(end === -1 ? tokens : tokens.slice(0, end));
    }
  });
  return out;
}

describe.each(pageSlugs)("docs page %s", (slug) => {
  it("is written", async () => {
    const { container } = await renderPage(slug);
    const words = (container.textContent ?? "").split(/\s+/).filter(Boolean);
    expect(words.length, "fewer than 150 words").toBeGreaterThanOrEqual(150);
    expect(container.textContent).not.toMatch(PLACEHOLDER);
  });

  it("follows the copy rules in its prose", async () => {
    const { container } = await renderPage(slug);
    const prose = proseText(container);
    expect(prose, "exclamation point in prose").not.toMatch(/!/);
    expect(prose.match(SLOP)?.[0] ?? null, "banned word or phrase").toBeNull();
    expect(container.textContent).not.toMatch(/\bnxs\b/);
  });

  it("keeps a space between words and inline code, links and keys", async () => {
    const { container } = await renderPage(slug);
    const glued: string[] = [];
    container.querySelectorAll("p code, li code, dd code, a, kbd").forEach((el) => {
      if (el.closest("pre")) return;
      const before = el.previousSibling;
      const after = el.nextSibling;
      if (before?.nodeType === 3 && /[A-Za-z0-9,;:.)]$/.test(before.textContent ?? "")) {
        glued.push(`...${(before.textContent ?? "").slice(-15)}|${el.textContent}`);
      }
      if (after?.nodeType === 3 && /^[A-Za-z0-9]/.test(after.textContent ?? "")) {
        glued.push(`${el.textContent}|${(after.textContent ?? "").slice(0, 15)}...`);
      }
    });
    expect(glued, "missing space (add {\" \"} at the line break)").toEqual([]);
  });

  it("lists exactly its H2 sections in the toc", async () => {
    const { mod, container } = await renderPage(slug);
    const h2Ids = Array.from(container.querySelectorAll("h2")).map((h) => h.id);
    expect(h2Ids.every(Boolean), "an H2 without an id").toBe(true);
    expect(mod.toc.map((t) => t.id)).toEqual(h2Ids);
    const ids = Array.from(container.querySelectorAll("[id]")).map((el) => el.id);
    expect(new Set(ids).size, "duplicate id").toBe(ids.length);
  });

  it("links only to pages and sections that exist", async () => {
    const { container } = await renderPage(slug);
    for (const a of Array.from(container.querySelectorAll("a"))) {
      const href = a.getAttribute("href") ?? "";
      expect(href, "link to an .example address").not.toMatch(/nexus-sync\.example/);
      if (href.startsWith("/docs/")) {
        const target = href.slice("/docs/".length).split("#")[0];
        expect(validSlugs.has(target), `unknown docs page ${href}`).toBe(true);
      } else if (href.startsWith("#")) {
        expect(container.querySelector(`[id="${href.slice(1)}"]`), `missing anchor ${href}`).not.toBeNull();
      } else if (href.startsWith("/")) {
        expect(href, `unknown site route ${href}`).toMatch(SITE_ROUTES);
      } else {
        expect(href, `external links must use https: ${href}`).toMatch(/^https:\/\//);
      }
    }
  });

  it("uses only commands and flags that nexus-sync-cli has", async () => {
    const { container } = await renderPage(slug);
    for (const tokens of invocations(container)) {
      const words = tokens.filter((t) => !t.startsWith("-"));
      const flags = tokens.filter((t) => t.startsWith("-"));
      for (const f of flags) expect(FLAGS.has(f), `unknown flag ${f} in: ${tokens.join(" ")}`).toBe(true);
      if (words.length === 0) continue;
      const [cmd, sub] = words;
      expect(COMMANDS.has(cmd), `unknown command "${cmd}" in: ${tokens.join(" ")}`).toBe(true);
      if (SUBCOMMANDS[cmd] && sub !== undefined && !sub.startsWith("<")) {
        expect(SUBCOMMANDS[cmd].has(sub), `unknown subcommand "${cmd} ${sub}"`).toBe(true);
      }
    }
  });
});

describe("docs pages directory", () => {
  it("has exactly one page module per docs page", () => {
    const files = readdirSync(PAGES_DIR)
      .filter((f) => f.endsWith(".tsx") && !f.includes(".test."))
      .map((f) => f.replace(/\.tsx$/, ""))
      .sort();
    expect(files).toEqual([...pageSlugs].sort());
  });

  it("redirects every moved page to a page that exists", async () => {
    const redirects = (await nextConfig.redirects?.()) ?? [];
    for (const r of redirects) {
      const to = r.destination.replace(/^\/docs\//, "");
      expect(validSlugs.has(to), `redirect to unknown page ${r.destination}`).toBe(true);
      const from = r.source.replace(/^\/docs\/?/, "");
      expect(validSlugs.has(from), `redirect shadows a live page ${r.source}`).toBe(false);
    }
  });
});
