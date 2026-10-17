import Link from "next/link";
import { Logo } from "@/components/Logo";

export type SiteSection = "product" | "pricing" | "docs";

const NAV: { id: SiteSection; label: string; href: string }[] = [
  { id: "product", label: "Product", href: "/#product" },
  { id: "pricing", label: "Pricing", href: "/#pricing" },
  { id: "docs", label: "Docs", href: "/docs/quickstart" },
];

/**
 * The masthead every page shares. `current` marks the section a page belongs
 * to; `wide` matches the docs layout's 1320px measure. Below about 360px the
 * nav wraps under the logo instead of disappearing.
 */
export function SiteHeader({
  current,
  wide = false,
}: {
  current?: SiteSection;
  wide?: boolean;
}) {
  return (
    <header className="border-b border-rule">
      <div
        className={[
          "mx-auto px-6 py-5 flex flex-wrap items-center justify-between gap-x-8 gap-y-2",
          wide ? "max-w-[1320px]" : "max-w-[1200px]",
        ].join(" ")}
      >
        <Link href="/" aria-label="Nexus-Sync home" className="block">
          <Logo />
        </Link>
        <nav aria-label="Primary" className="flex items-center gap-6 sm:gap-8 text-meta text-ink-2">
          {NAV.map((item) =>
            item.id === current ? (
              <Link
                key={item.id}
                href={item.href}
                aria-current="true"
                className="py-1 text-ink font-semibold underline underline-offset-4 decoration-signal decoration-2"
              >
                {item.label}
              </Link>
            ) : (
              <Link
                key={item.id}
                href={item.href}
                className="py-1 hover:text-ink underline-offset-4 hover:underline"
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>
      </div>
    </header>
  );
}
