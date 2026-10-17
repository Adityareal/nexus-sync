"use client";

import { useId, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { allDocs } from "@/lib/docs/content";

export function DocsSearch() {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [active, setActive] = useState(-1);
  const [focused, setFocused] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  const baseId = useId();
  const inputId = `${baseId}-input`;
  const listboxId = `${baseId}-listbox`;
  const statusId = `${baseId}-status`;
  const optionId = (i: number) => `${baseId}-option-${i}`;

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

  const hasQuery = q.trim().length > 0;
  const open = focused && hasQuery && results.length > 0;

  const statusText = !hasQuery
    ? ""
    : results.length === 0
      ? "No results"
      : results.length === 1
        ? "1 result"
        : `${results.length} results`;

  function updateQuery(value: string) {
    setQ(value);
    setActive(-1);
  }

  function navigateTo(slug: string) {
    router.push(`/docs/${slug}`);
    setQ("");
    setActive(-1);
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown") {
      if (results.length === 0) return;
      e.preventDefault();
      setActive((prev) => (prev < results.length - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      if (results.length === 0) return;
      e.preventDefault();
      setActive((prev) => (prev <= 0 ? results.length - 1 : prev - 1));
    } else if (e.key === "Enter") {
      if (results.length === 0) return;
      e.preventDefault();
      const target = active >= 0 ? results[active] : results[0];
      navigateTo(target.slug);
    } else if (e.key === "Escape") {
      setQ("");
      setActive(-1);
    }
  }

  function onBlur(e: React.FocusEvent<HTMLDivElement>) {
    if (!e.relatedTarget || !wrapRef.current?.contains(e.relatedTarget as Node)) {
      setFocused(false);
    }
  }

  const activeId = open && active >= 0 ? optionId(active) : undefined;

  return (
    <div
      ref={wrapRef}
      className="relative"
      onFocus={() => setFocused(true)}
      onBlur={onBlur}
    >
      <label htmlFor={inputId} className="sr-only">
        Search documentation
      </label>
      <input
        id={inputId}
        type="search"
        role="combobox"
        aria-expanded={open}
        aria-controls={open ? listboxId : undefined}
        aria-autocomplete="list"
        aria-activedescendant={activeId}
        value={q}
        onChange={(e) => updateQuery(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder="Search documentation"
        autoComplete="off"
        spellCheck={false}
        className="w-full bg-paper-2 border border-rule px-4 py-3 font-mono text-meta text-ink placeholder:text-ink-2 focus:outline-none focus:border-signal"
      />
      <span id={statusId} role="status" className="sr-only">
        {statusText}
      </span>
      {open && (
        <ul
          id={listboxId}
          role="listbox"
          aria-label="Search results"
          onMouseDown={(e) => e.preventDefault()}
          className="absolute left-0 right-0 top-full mt-1 bg-paper border border-rule max-h-72 overflow-y-auto z-20"
        >
          {results.map((r, i) => (
            <li
              key={r.slug}
              id={optionId(i)}
              role="option"
              aria-selected={i === active}
              className={i === active ? "bg-paper-2" : undefined}
            >
              <Link
                href={`/docs/${r.slug}`}
                tabIndex={-1}
                onClick={() => setQ("")}
                className="flex items-baseline gap-3 px-4 py-2 hover:bg-paper-2"
              >
                <span className="font-serif text-body text-ink">{r.title}</span>
                <span className="font-mono text-meta text-ink-2 ml-auto">
                  {r.groupLabel}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
      {focused && hasQuery && results.length === 0 && (
        <div
          aria-hidden="true"
          className="absolute left-0 right-0 top-full mt-1 bg-paper border border-rule z-20 px-4 py-3 font-mono text-meta text-ink-2"
        >
          no results
        </div>
      )}
    </div>
  );
}
