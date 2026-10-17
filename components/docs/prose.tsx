import Link from "next/link";
import type { ReactNode } from "react";

// Building blocks for docs page bodies. Pages render inside <DocPage>, which
// supplies the kicker, the h1 and the "On this page" list, and spaces its
// children with space-y-6.

export type TocItem = { id: string; label: string };

const linkClass =
  "text-ink underline underline-offset-4 decoration-signal decoration-1 hover:decoration-2";

/** Section heading. Every H2 needs an id; list it in the page's toc. */
export function H2({ id, children }: { id: string; children: ReactNode }) {
  return (
    <h2 id={id} className="font-serif text-h2 text-ink !mt-12 mb-4 leading-[1.15]">
      {children}
    </h2>
  );
}

/** Sub-section heading inside an H2 section. */
export function H3({ id, children }: { id?: string; children: ReactNode }) {
  return (
    <h3 id={id} className="font-serif text-h3 text-ink !mt-10 leading-[1.3]">
      {children}
    </h3>
  );
}

/** The opening paragraph: the page's main claim, one size up. */
export function Lead({ children }: { children: ReactNode }) {
  return <p className="text-body-l text-ink">{children}</p>;
}

/** A link to another page on this site, for example "/docs/cli-init". */
export function DocLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className={linkClass}>
      {children}
    </Link>
  );
}

/** A link to another site. */
export function ExtLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} className={linkClass}>
      {children}
    </a>
  );
}

export function List({ children }: { children: ReactNode }) {
  return <ul className="list-disc pl-6 space-y-2 marker:text-ink-2">{children}</ul>;
}

/** Ordered steps the reader performs in sequence. */
export function Steps({ children }: { children: ReactNode }) {
  return <ol className="list-decimal pl-6 space-y-2 marker:text-ink-2">{children}</ol>;
}

/** Term and description pairs: config fields, output lines, error messages. */
export function DefList({ items }: { items: { term: ReactNode; desc: ReactNode }[] }) {
  return (
    <dl className="border-b border-rule">
      {items.map((item, i) => (
        <div
          key={i}
          className="border-t border-rule py-4 grid gap-y-1 sm:grid-cols-[minmax(0,14rem)_minmax(0,1fr)] sm:gap-x-6"
        >
          <dt className="font-mono text-mono text-ink break-words">{item.term}</dt>
          <dd className="text-body text-ink-2">{item.desc}</dd>
        </div>
      ))}
    </dl>
  );
}

/** A key the reader presses, for example <Kbd>Ctrl</Kbd>+<Kbd>C</Kbd>. */
export function Kbd({ children }: { children: ReactNode }) {
  return (
    <kbd className="font-mono text-[0.88em] text-ink border border-rule-strong px-1.5 py-px">
      {children}
    </kbd>
  );
}
