import Link from "next/link";
import { Logo } from "@/components/Logo";
import { DocsSidebar } from "@/components/DocsSidebar";
import { DocsSearch } from "@/components/DocsSearch";

export const metadata = {
  title: "Documentation, Nexus-Sync",
  description:
    "Quickstart, CLI reference, integrations, and troubleshooting for Nexus-Sync.",
};

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <DocsMasthead />
      <div className="flex-1 mx-auto max-w-[1320px] w-full px-6 py-10 lg:py-12 grid lg:grid-cols-[240px_1fr] gap-x-10 lg:gap-x-12">
        <aside className="hidden lg:block">
          <div className="sticky top-10 max-h-[calc(100vh-5rem)] overflow-y-auto pr-3 pb-12">
            <DocsSearch />
            <div className="mt-8">
              <DocsSidebar />
            </div>
          </div>
        </aside>

        <main id="main" className="min-w-0 pb-24">
          <div className="lg:hidden mb-10 space-y-5">
            <DocsSearch />
            <details className="docs-toggle border-y border-rule">
              <summary className="py-3 flex items-center justify-between gap-3">
                <span className="font-serif italic text-meta text-ink">
                  Browse docs
                </span>
                <span
                  className="docs-toggle-marker font-mono text-meta text-ink-2"
                  aria-hidden
                />
              </summary>
              <div className="pb-4">
                <DocsSidebar />
              </div>
            </details>
          </div>
          {children}
        </main>
      </div>
      <DocsFooter />
    </div>
  );
}

function DocsMasthead() {
  return (
    <header className="border-b border-rule">
      <div className="mx-auto max-w-[1320px] px-6 py-5 flex items-center justify-between">
        <Link href="/" aria-label="Nexus-Sync home" className="block">
          <Logo />
        </Link>
        <nav
          aria-label="Primary"
          className="hidden sm:flex items-center gap-8 text-meta text-ink-2"
        >
          <Link
            href="/#product"
            className="hover:text-ink underline-offset-4 hover:underline"
          >
            Product
          </Link>
          <Link
            href="/#pricing"
            className="hover:text-ink underline-offset-4 hover:underline"
          >
            Pricing
          </Link>
          <Link
            href="/docs"
            aria-current="page"
            className="text-ink font-semibold underline underline-offset-4 decoration-signal decoration-2"
          >
            Docs
          </Link>
        </nav>
      </div>
    </header>
  );
}

function DocsFooter() {
  return (
    <footer className="border-t border-rule">
      <div className="mx-auto max-w-[1320px] w-full px-6 py-8 text-meta text-ink-2 font-mono flex flex-wrap items-center justify-between gap-3">
        <span>© {new Date().getFullYear()} Nexus-Sync, Inc.</span>
        <span className="flex items-center gap-2">
          <span
            className="inline-block w-2 h-2 rounded-full bg-signal"
            aria-hidden
          />
          docs v1, in revision
        </span>
      </div>
    </footer>
  );
}
