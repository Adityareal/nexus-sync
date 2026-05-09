"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { allDocs } from "@/lib/docs/content";

export function DocsSearch() {
  const [q, setQ] = useState("");

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return [];
    return allDocs
      .filter(
        (d) =>
          d.title.toLowerCase().includes(term) ||
          d.groupLabel.toLowerCase().includes(term)
      )
      .slice(0, 8);
  }, [q]);

  const open = q.trim().length > 0;

  return (
    <div className="relative">
      <label htmlFor="docs-search" className="sr-only">
        Search documentation
      </label>
      <input
        id="docs-search"
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search documentation"
        autoComplete="off"
        spellCheck={false}
        className="w-full bg-paper-2 border border-rule px-4 py-3 font-mono text-meta text-ink placeholder:text-ink-2 focus:outline-none focus:border-signal"
      />
      {open && (
        <ul
          role="listbox"
          className="absolute left-0 right-0 top-full mt-1 bg-paper border border-rule max-h-72 overflow-y-auto z-20"
        >
          {results.length === 0 ? (
            <li className="px-4 py-3 font-mono text-meta text-ink-2">no results</li>
          ) : (
            results.map((r) => (
              <li key={r.slug}>
                <Link
                  href={`/docs/${r.slug}`}
                  onClick={() => setQ("")}
                  className="flex items-baseline gap-3 px-4 py-2 hover:bg-paper-2"
                >
                  <span className="font-serif text-body text-ink">{r.title}</span>
                  <span className="font-mono text-meta text-ink-2 ml-auto">
                    {r.groupLabel}
                  </span>
                </Link>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}
