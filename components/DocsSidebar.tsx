"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { docNav } from "@/lib/docs/content";

export function DocsSidebar() {
  const pathname = usePathname() ?? "/docs";
  const match = pathname.match(/^\/docs(?:\/([^\/]+))?$/);
  const activeSlug = (match?.[1] ?? "quickstart").replace(/\/$/, "");

  return (
    <nav aria-label="Documentation navigation" className="font-sans">
      {docNav.map((group) => {
        const isActiveGroup = group.items.some((i) => i.slug === activeSlug);
        const defaultOpen = group.id === "getting-started" || isActiveGroup;
        return (
          <details
            key={group.id}
            open={defaultOpen}
            className="docs-toggle border-b border-rule last:border-b-0"
          >
            <summary className="py-3 flex items-center justify-between gap-3">
              <span className="font-serif italic text-meta text-ink">{group.label}</span>
              <span className="docs-toggle-marker font-mono text-meta text-ink-2" aria-hidden />
            </summary>
            <ul className="pb-4 space-y-1">
              {group.items.map((item) => {
                const isActive = item.slug === activeSlug;
                return (
                  <li key={item.slug}>
                    <Link
                      href={`/docs/${item.slug}`}
                      aria-current={isActive ? "page" : undefined}
                      className={
                        isActive
                          ? "block text-meta text-ink font-semibold py-1"
                          : "block text-meta text-ink-2 hover:text-ink hover:underline underline-offset-4 decoration-signal py-1"
                      }
                    >
                      {item.title}
                      {item.status === "drafting" && (
                        <span className="ml-2 font-mono text-[11px] text-ink-2 opacity-70">
                          drafting
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </details>
        );
      })}
    </nav>
  );
}
