import { Logo } from "@/components/Logo";
import { MirrorDiagram } from "@/components/HeroIllustration";
import { SiteFooter } from "@/components/SiteFooter";

export default function Page() {
  return (
    <main id="main">
      <Masthead />
      <Hero />
      <MirrorSection />
      <ClaimsSection />
      <PrimitivesSection />
      <CodeListing />
      <CompareSection />
      <Pricing />
      <Closing />
      <SiteFooter />
    </main>
  );
}

function Masthead() {
  return (
    <header className="border-b border-rule">
      <div className="mx-auto max-w-[1200px] px-6 py-5 flex items-center justify-between">
        <Logo />
        <nav className="hidden sm:flex items-center gap-8 text-meta text-ink-2">
          <a href="#product" className="hover:text-ink underline-offset-4 hover:underline">
            Product
          </a>
          <a href="#pricing" className="hover:text-ink underline-offset-4 hover:underline">
            Pricing
          </a>
          <a href="/docs" className="hover:text-ink underline-offset-4 hover:underline">
            Docs
          </a>
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="mx-auto max-w-[1100px] px-6 pt-20 sm:pt-32 md:pt-44 pb-16 sm:pb-20">
      <div className="max-w-[640px]">
        <h1 className="font-serif text-ink text-[36px] sm:text-[52px] md:text-display leading-[1.06] md:leading-[1.04] font-bold tracking-tight">
          Local environments are a tax.
          <br />
          <em className="italic font-bold">Nexus-Sync collects it for you.</em>
        </h1>
        <p className="mt-8 text-body-l text-ink-2 max-w-[540px]">
          Your laptop boots a fresh cloud pod in 1.8 seconds. Every save streams under 100
          milliseconds to a sandbox with anonymized production data. Share a preview link, pair on
          the same running app, ship without ceremony.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
          <a
            href="/start"
            className="inline-block bg-signal-deep text-paper px-6 py-3 font-mono text-meta tracking-wide hover:bg-ink transition-colors duration-200"
          >
            Start a pod
          </a>
          <a
            href="#note"
            className="text-meta text-ink-2 hover:text-ink underline underline-offset-4 decoration-signal decoration-1 hover:decoration-2"
          >
            Read the engineering note
          </a>
        </div>
        <p className="mt-12 sm:mt-14 text-meta text-ink-2 font-mono">
          (Mirror Local. Deploy Cloud. Ship Faster.)
        </p>
      </div>
    </section>
  );
}

function MirrorSection() {
  return (
    <section className="mx-auto max-w-[1100px] px-6 pb-20 sm:pb-28">
      <MirrorDiagram />
    </section>
  );
}

function ClaimsSection() {
  return (
    <section id="note" className="mx-auto max-w-[680px] px-6 pb-24 sm:pb-32 md:pb-40">
      <p className="font-mono text-meta uppercase tracking-wide text-ink-2">
        Engineering note
      </p>
      <h2 className="mt-3 font-serif text-h2 text-ink">Three numbers.</h2>
      <div className="mt-10 sm:mt-14">
        <Claim
          n="1.8 seconds."
          body="A pod with your repository, dependencies, and a hot database fork is ready before your terminal redraws. The cold start budget is the pause between two keystrokes."
        />
        <Claim
          n="94 milliseconds."
          body="Round trip from save on your laptop to a running cloud preview. Below the threshold the human eye registers as latency. Faster than your local language server some days."
        />
        <Claim
          n="Zero leaked rows."
          body="Every database fork is anonymized at the column level by a policy you write once and forget. Production data shape, none of the liability."
        />
      </div>
    </section>
  );
}

function Claim({ n, body }: { n: string; body: string }) {
  return (
    <div className="mt-12 sm:mt-14 first:mt-0">
      <h3 className="font-serif text-h3 text-ink">{n}</h3>
      <p className="mt-3 text-body text-ink-2">{body}</p>
    </div>
  );
}

function PrimitivesSection() {
  const items = [
    {
      n: "01",
      name: "Ephemeral pods",
      body: "An isolated environment that boots in under two seconds and disposes of itself when you close the laptop. Branches get their own. Reviews get their own. Nothing is shared.",
      cmd: "nexus pod create",
    },
    {
      n: "02",
      name: "Mirror sync engine",
      body: "A bidirectional file stream between your laptop and the pod, optimized for the editor save loop. Round trip is sub 100 milliseconds on a typical broadband connection.",
      cmd: "nexus sync watch",
    },
    {
      n: "03",
      name: "Instant previews",
      body: "Every save produces a unique URL. Designers, product managers, and customers see your work without you screen sharing or pushing a branch.",
      cmd: "nexus preview share",
    },
    {
      n: "04",
      name: "Live database sandbox",
      body: "Fork production data with personally identifiable columns anonymized at fork time. Real query plans, real edge cases, no liability.",
      cmd: "nexus db fork --anonymize",
    },
    {
      n: "05",
      name: "Multiplayer collaboration",
      body: "Invite a teammate to inspect the same running request, set a breakpoint, edit a file. The pod is the shared workspace.",
      cmd: "nexus invite ada@team.com",
    },
  ];
  return (
    <section id="product" className="mx-auto max-w-[820px] px-6 pb-20 sm:pb-28">
      <h2 className="font-serif text-h2 text-ink mb-8 sm:mb-12">Five primitives.</h2>
      <ol className="border-t border-rule">
        {items.map((it) => (
          <li
            key={it.n}
            className="border-b border-rule py-7 sm:py-9 grid grid-cols-[3rem_1fr] gap-x-6"
          >
            <span className="font-mono text-meta text-ink-2 pt-1.5">{it.n}</span>
            <div>
              <h3 className="font-serif italic text-h3 text-ink">{it.name}</h3>
              <p className="mt-3 text-body text-ink-2 max-w-[55ch]">{it.body}</p>
              <code className="mt-4 inline-block font-mono text-mono text-code-ink bg-paper-2 px-3 py-1.5">
                {it.cmd}
              </code>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

function CodeListing() {
  const code = `import { defineConfig } from "@nexus-sync/core";

export default defineConfig({
  pod: {
    image: "node:20-alpine",
    cpu: "2",
    memory: "4Gi",
    ttl: "8h",
  },
  sync: {
    watch: ["app/**", "lib/**", "prisma/**"],
    ignore: ["node_modules", ".next"],
  },
  preview: {
    domain: "pr-{branch}.nexus-sync.dev",
    auth: "team",
  },
  database: {
    fork: "production",
    anonymize: ["users.email", "users.phone", "billing.*"],
  },
});`;
  return (
    <section className="bg-paper-2 border-y border-rule py-12 sm:py-16">
      <div className="mx-auto max-w-[1100px] px-6">
        <div className="mb-8 sm:mb-10 max-w-[60ch]">
          <p className="font-mono text-meta text-ink-2 mb-3">
            01 — Configuration
          </p>
          <h2 className="font-serif text-h2 text-ink">
            One file. Your whole environment.
          </h2>
          <p className="mt-3 text-body text-ink-2">
            Declare the pod, sync rules, preview domain, and database fork in a
            single typed config. Commit it, and every teammate gets the same
            environment on their next <code className="font-mono text-mono text-code-ink">nexus up</code>.
          </p>
        </div>
        <p className="font-mono text-meta text-ink-2 mb-3">nexus.config.ts</p>
        <pre className="font-mono text-[13px] sm:text-mono text-ink leading-relaxed overflow-x-auto">
          <code>{code}</code>
        </pre>
      </div>
    </section>
  );
}

function CompareSection() {
  const without = [
    "Docker compose breaks on a coworker's machine three times this week.",
    "Staging is shared, so risky migrations wait until Friday.",
    "Mocked databases lie about edge cases your customers find first.",
    "Reviews happen by Slack screenshot.",
    "Onboarding a new engineer costs a week.",
  ];
  const withNs = [
    "A pod boots in 1.8 seconds with the same dependencies as production.",
    "Every branch gets its own anonymized data fork.",
    "Previews are live URLs, not screenshots.",
    "Two engineers can inspect the same running request.",
    "New engineers ship code on day one.",
  ];
  return (
    <section className="mx-auto max-w-[1100px] px-6 py-24 sm:py-36">
      <h2 className="sr-only">Side by side</h2>
      <div className="grid md:grid-cols-[5fr_7fr] gap-x-16 gap-y-12">
        <div>
          <h3 className="font-serif italic text-h3 text-ink-2 mb-6">Without Nexus-Sync.</h3>
          <ul className="space-y-4">
            {without.map((s) => (
              <li key={s} className="text-body text-ink-2">
                {s}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-serif italic text-h3 text-ink mb-6">With Nexus-Sync.</h3>
          <ul className="space-y-4">
            {withNs.map((s) => (
              <li key={s} className="text-body text-ink">
                {s}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  const tiers = [
    { name: "Solo", desc: "Free for personal projects, one engineer, public previews.", price: "$0" },
    {
      name: "Team",
      desc: "Up to twenty five engineers, private previews, anonymized data fork.",
      price: "$24 per seat per month",
    },
    {
      name: "Enterprise",
      desc: "SSO, VPC peering, audit log, dedicated tenancy.",
      price: "Talk to us",
    },
  ];
  return (
    <section
      id="pricing"
      className="mx-auto max-w-[820px] px-6 py-20 sm:py-24 border-t border-rule"
    >
      <h2 className="font-serif text-h2 text-ink mb-8 sm:mb-10">Pricing.</h2>
      <ul>
        {tiers.map((t) => (
          <li
            key={t.name}
            className="grid grid-cols-[1fr_auto] items-baseline gap-6 py-6 sm:py-7 border-b border-rule"
          >
            <div>
              <p className="font-serif text-h3 text-ink">{t.name}</p>
              <p className="mt-1 text-body text-ink-2 max-w-[48ch]">{t.desc}</p>
            </div>
            <p className="font-mono text-mono text-ink whitespace-nowrap">{t.price}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Closing() {
  return (
    <section className="bg-paper-2 border-y border-rule py-24 sm:py-36">
      <div className="mx-auto max-w-[860px] px-6">
        <blockquote className="font-serif italic text-ink text-[32px] sm:text-[44px] md:text-[52px] leading-[1.1] font-semibold tracking-tight">
          The fastest way to feel like the team that built the tool.
        </blockquote>
      </div>
    </section>
  );
}

