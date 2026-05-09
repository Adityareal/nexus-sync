import { ReactNode } from "react";
import { DocsToc } from "@/components/DocsToc";

export function DocPage({
  title,
  kicker,
  children,
  toc,
}: {
  title: string;
  kicker?: string;
  children: ReactNode;
  toc?: { id: string; label: string }[];
}) {
  const hasToc = !!toc && toc.length >= 4;
  return (
    <div
      className={
        hasToc
          ? "grid xl:grid-cols-[1fr_200px] gap-x-12"
          : ""
      }
    >
      <article className="max-w-[68ch] min-w-0">
        {kicker && (
          <p className="font-mono text-meta text-ink-2 mb-3">{kicker}</p>
        )}
        <h1 className="font-serif text-h1 text-ink mb-8 leading-[1.1]">
          {title}
        </h1>
        <div className="text-body text-ink space-y-6">{children}</div>
        <hr className="my-16 border-t border-rule" />
        <p className="font-mono text-meta text-ink-2">
          Sharper way to say this?{" "}
          <a
            href="mailto:docs@nexus-sync.dev"
            className="text-ink hover:text-signal-deep underline underline-offset-4 decoration-signal decoration-1 hover:decoration-2"
          >
            docs@nexus-sync.dev
          </a>
        </p>
      </article>
      {hasToc && (
        <aside className="hidden xl:block">
          <DocsToc items={toc!} />
        </aside>
      )}
    </div>
  );
}

export function Code({ children }: { children: ReactNode }) {
  return (
    <code className="font-mono text-mono text-code-ink bg-paper-2 px-1.5 py-0.5">
      {children}
    </code>
  );
}

export function Pre({ children }: { children: ReactNode }) {
  return (
    <pre className="font-mono text-mono text-ink bg-paper-2 border border-rule px-4 py-3 overflow-x-auto leading-relaxed">
      <code>{children}</code>
    </pre>
  );
}
