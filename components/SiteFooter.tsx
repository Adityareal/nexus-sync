import Link from "next/link";
import { Logo } from "@/components/Logo";

type FooterLink = { label: string; href: string };

export function SiteFooter() {
  return (
    <footer className="mx-auto max-w-[1200px] px-6 py-14">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-meta">
        <div className="col-span-2 md:col-span-1">
          <Logo />
          <p className="mt-3 text-ink-2 max-w-[28ch]">
            An ephemeral cloud for development.
          </p>
        </div>
        <nav
          aria-label="Footer"
          className="col-span-2 md:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-8"
        >
          <FooterCol
            title="Product"
            links={[
              { label: "Pods", href: "/docs/ephemeral-pods" },
              { label: "Sync engine", href: "/docs/live-mirroring" },
              { label: "Previews", href: "/docs/preview-urls" },
              { label: "Database", href: "/docs/database-sandbox" },
            ]}
          />
          <FooterCol
            title="Resources"
            links={[
              { label: "Docs", href: "/docs/quickstart" },
              { label: "Start a pod", href: "/start" },
              { label: "Engineering note", href: "/#note" },
              { label: "Security", href: "/docs/security" },
            ]}
          />
          <FooterCol
            title="Company"
            links={[
              { label: "Pricing", href: "/#pricing" },
              { label: "Careers", href: "/careers" },
            ]}
          />
        </nav>
      </div>
      <div className="mt-10 pt-6 border-t border-rule flex items-center justify-between text-meta text-ink-2">
        <span className="font-mono">© {new Date().getFullYear()} Nexus-Sync, Inc.</span>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: FooterLink[] }) {
  return (
    <div>
      <p className="text-ink mb-3">{title}</p>
      <ul className="space-y-2 text-ink-2">
        {links.map((l) => (
          <li key={l.label}>
            <FooterAnchor href={l.href}>{l.label}</FooterAnchor>
          </li>
        ))}
      </ul>
    </div>
  );
}

function FooterAnchor({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link href={href} className="hover:text-ink hover:underline underline-offset-4">
      {children}
    </Link>
  );
}
