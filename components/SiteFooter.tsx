import Link from "next/link";
import { Logo } from "@/components/Logo";

type FooterLink = { label: string; href?: string };

export function SiteFooter() {
  return (
    <footer className="mx-auto max-w-[1200px] px-6 py-14">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-8 text-meta">
        <div className="col-span-2 md:col-span-1">
          <Logo />
          <p className="mt-3 text-ink-2 max-w-[28ch]">
            An ephemeral cloud for development.
          </p>
        </div>
        <FooterCol
          title="Product"
          links={[
            { label: "Pods" },
            { label: "Sync engine" },
            { label: "Previews" },
            { label: "Database" },
          ]}
        />
        <FooterCol
          title="Resources"
          links={[
            { label: "Docs", href: "/docs" },
            { label: "Engineering note", href: "/#note" },
            { label: "Status" },
            { label: "Changelog" },
          ]}
        />
        <FooterCol
          title="Company"
          links={[
            { label: "About" },
            { label: "Pricing", href: "/#pricing" },
            { label: "Careers", href: "/careers" },
            { label: "Press" },
          ]}
        />
        <FooterCol
          title="Legal"
          links={[
            { label: "Terms" },
            { label: "Privacy" },
            { label: "Security" },
            { label: "DPA" },
          ]}
        />
      </div>
      <div className="mt-10 pt-6 border-t border-rule flex items-center justify-between text-meta text-ink-2">
        <span className="font-mono">© {new Date().getFullYear()} Nexus-Sync, Inc.</span>
        <span className="font-mono flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-signal" aria-hidden />
          status nominal
        </span>
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
            <FooterAnchor href={l.href ?? "#"}>{l.label}</FooterAnchor>
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
  const className = "hover:text-ink hover:underline underline-offset-4";
  if (href.startsWith("/")) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} className={className}>
      {children}
    </a>
  );
}
