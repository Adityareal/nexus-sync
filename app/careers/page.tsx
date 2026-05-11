import Link from "next/link";
import { Logo } from "@/components/Logo";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata = {
  title: "Careers, Nexus-Sync",
  description:
    "Four roles open. Two hires this year. Published bands, no trick questions, eighteen days from first call to offer.",
};

export default function CareersPage() {
  return (
    <main id="main">
      <Masthead />
      <Intro />
      <HowWeWork />
      <OpenRoles />
      <WhatYouGet />
      <HowWeHire />
      <NotHiring />
      <Closing />
      <SiteFooter />
    </main>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

function Masthead() {
  return (
    <header className="border-b border-rule">
      <div className="mx-auto max-w-[1200px] px-6 py-5 flex items-center justify-between">
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
            className="hover:text-ink underline-offset-4 hover:underline"
          >
            Docs
          </Link>
        </nav>
      </div>
    </header>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

function Intro() {
  return (
    <section className="mx-auto max-w-[1100px] px-6 pt-20 sm:pt-28 md:pt-36 pb-16 sm:pb-24">
      <p className="font-mono text-meta uppercase tracking-wide text-ink-2">
        Careers <span className="mx-1.5 text-rule">·</span> Updated May 2026
      </p>
      <h1 className="mt-6 font-serif text-ink text-[40px] sm:text-[60px] md:text-display leading-[1.04] font-bold tracking-tight max-w-[18ch]">
        Hiring slowly,
        <br />
        <em className="italic font-bold">with taste.</em>
      </h1>
      <p className="mt-8 text-body-l text-ink-2 max-w-[58ch]">
        Four roles are open. We will fill two of them this year. The bar is narrow, the
        conversation is long, and the bands are published below. If you have shipped the
        kind of tool other engineers use every day, read on.
      </p>
      <p className="mt-10 sm:mt-12 text-meta text-ink-2 font-mono">
        (47 people. 11 time zones. Last hire: March 2026.)
      </p>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

function HowWeWork() {
  const principles = [
    {
      n: "01",
      name: "Boring where boring pays off.",
      body: "We use Postgres, not a new vector database a director read about. We run tests before shipping. We write down why. Novelty is expensive; we save it for the problems that deserve the cost.",
    },
    {
      n: "02",
      name: "Numbers earn their place.",
      body: "A claim without a measurement is a hope. We benchmark the cold start budget weekly. The 1.8 seconds on the homepage is the number from last Tuesday's run, not a marketing rounding.",
    },
    {
      n: "03",
      name: "Docs are a feature.",
      body: "If it is not documented, it is not finished. Documentation ships in the same pull request as the code, reviewed by the same humans, written by the author of the change.",
    },
    {
      n: "04",
      name: "One meeting a week.",
      body: "Monday, forty minutes, on camera. The rest is async. Calendar holds are a code smell. You keep your own hours and you keep notifications off on weekends. The work is the output.",
    },
  ];
  return (
    <section className="border-t border-rule bg-paper-2">
      <div className="mx-auto max-w-[1100px] px-6 py-20 sm:py-28">
        <p className="font-mono text-meta uppercase tracking-wide text-ink-2">Principles</p>
        <h2 className="mt-2 font-serif text-h2 sm:text-h1 text-ink max-w-[22ch] leading-[1.08]">
          How the work actually gets done.
        </h2>
        <ol className="mt-12 border-t border-rule">
          {principles.map((p) => (
            <li
              key={p.n}
              className="border-b border-rule py-8 sm:py-10 grid grid-cols-[3rem_1fr] gap-x-6"
            >
              <span className="font-mono text-meta text-ink-2 pt-1.5">{p.n}</span>
              <div>
                <h3 className="font-serif italic text-h3 text-ink">{p.name}</h3>
                <p className="mt-3 text-body text-ink-2 max-w-[60ch]">{p.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

function OpenRoles() {
  const roles = [
    {
      n: "01",
      title: "Systems engineer, sync runtime",
      meta: "San Francisco or remote (US, EU) · Senior to staff · $220k-$290k base + equity",
      body: "Kernel-adjacent work on the mirror sync engine. Interpretation of inotify, FSEvents, and ReadDirectoryChangesW at scale; protocol design for the wire format; profiling the 94-millisecond budget until there is nothing left to shave. Prior experience with high-throughput systems in Rust or C++. You will move the number.",
    },
    {
      n: "02",
      title: "Platform engineer, pod orchestration",
      meta: "Remote (US, EU, UK) · Senior · $200k-$260k base + equity",
      body: "Kubernetes custom controllers, scheduler work, pod lifecycle at 1.8-second cold-start budgets. You have operated a multi-tenant platform before, either at a cloud provider or at a developer-tools company. You know why the boring answer is usually right, and when it is not.",
    },
    {
      n: "03",
      title: "Product engineer, CLI and dashboard",
      meta: "Remote (US, EU) · Mid-senior to senior · $180k-$240k base + equity",
      body: "Full-stack work on the CLI in Rust and the web dashboard in TypeScript and Next.js. You care about ergonomics. You have opinions about flag parsing. The CLI is the product for 60 percent of users; you will own it end to end, from the error message to the release notes.",
    },
    {
      n: "04",
      title: "Developer advocate",
      meta: "Remote (US, EU) · Senior · $170k-$210k base + equity",
      body: "Docs, example repos, office hours. Not conference keynotes. You write like the engineers on the team but you answer Slack questions faster, and you ship the example repo before the meeting ends. Prior experience shipping something developers actually used.",
    },
  ];
  return (
    <section className="mx-auto max-w-[1100px] px-6 py-20 sm:py-28">
      <div className="max-w-[60ch]">
        <p className="font-mono text-meta uppercase tracking-wide text-ink-2">Open roles</p>
        <h2 className="mt-2 font-serif text-h2 sm:text-h1 text-ink leading-[1.08]">
          Four seats, specifically.
        </h2>
        <p className="mt-5 text-body text-ink-2">
          Each band is the same number we paid the last person at that level. No negotiation
          theatre, no ambush at offer stage. Anchors below are the midpoint after the first
          conversation.
        </p>
      </div>
      <ol className="mt-12 border-t border-rule">
        {roles.map((r) => (
          <li
            key={r.n}
            className="border-b border-rule py-9 sm:py-11 grid grid-cols-[3rem_1fr] gap-x-6"
          >
            <span className="font-mono text-meta text-ink-2 pt-2">{r.n}</span>
            <div>
              <h3 className="font-serif text-h3 sm:text-h2 text-ink leading-[1.15]">
                {r.title}
              </h3>
              <p className="mt-3 font-mono text-meta text-ink-2">{r.meta}</p>
              <p className="mt-5 text-body text-ink-2 max-w-[62ch]">{r.body}</p>
            </div>
          </li>
        ))}
      </ol>
      <p className="mt-10 text-body text-ink-2 max-w-[60ch]">
        All four roles share one inbox:{" "}
        <a
          href="mailto:careers@nexus-sync.dev"
          className="text-ink hover:text-signal-deep underline underline-offset-4 decoration-signal decoration-1 hover:decoration-2"
        >
          careers@nexus-sync.dev
        </a>
        . Include the role title in the subject. A human replies within three business days,
        even if the answer is no.
      </p>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

function WhatYouGet() {
  const items = [
    {
      term: "Equity",
      body: "Real options, early-employee bands, four-year vest with a one-year cliff. Your specific grant is shared in writing during the first call, before the take-home.",
    },
    {
      term: "Healthcare",
      body: "Fully covered medical, dental, and vision for employee and dependents in the US. Cash equivalent at local market rates for employees outside the US.",
    },
    {
      term: "Retirement",
      body: "Four percent 401(k) match, vested immediately, in the US. SIPP or national pension top-up elsewhere, matched on the same schedule.",
    },
    {
      term: "Time off",
      body: "Five weeks. Not unlimited. Unlimited is what teams say to take less; five weeks is what people on this team actually take, tracked openly in the shared calendar.",
    },
    {
      term: "Hardware",
      body: "Whatever laptop you ask for. A monitor if you want one, a desk if you want one, a mechanical keyboard if you want one. No productivity theatre, no receipts to justify.",
    },
    {
      term: "Travel",
      body: "Two team weeks a year, usually Lisbon in spring and New York in autumn. Flight and lodging on us. Partners welcome at their own cost.",
    },
  ];
  return (
    <section className="border-y border-rule bg-paper-2">
      <div className="mx-auto max-w-[1100px] px-6 py-20 sm:py-28">
        <div className="max-w-[60ch]">
          <p className="font-mono text-meta uppercase tracking-wide text-ink-2">
            Compensation and benefits
          </p>
          <h2 className="mt-2 font-serif text-h2 sm:text-h1 text-ink leading-[1.08]">
            The rest of the offer.
          </h2>
        </div>
        <dl className="mt-12 border-t border-rule">
          {items.map((it) => (
            <div
              key={it.term}
              className="grid grid-cols-1 md:grid-cols-[12rem_1fr] gap-x-10 gap-y-2 md:gap-y-0 py-7 sm:py-8 border-b border-rule"
            >
              <dt className="font-serif text-h3 text-ink">{it.term}</dt>
              <dd className="text-body text-ink-2 max-w-[60ch]">{it.body}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

function HowWeHire() {
  const steps = [
    {
      n: "01",
      duration: "30 min",
      name: "Intro call.",
      body: "A video call with someone from the team, usually an engineer close to the role. We describe what the work looks like this quarter. You describe what you want it to look like.",
    },
    {
      n: "02",
      duration: "2 to 3 hrs",
      name: "Your choice.",
      body: "Take-home, three hours, a real recent ticket from the repo, paid at $150 an hour. Or live pairing, two hours, the same kinds of tasks, unpaid. Same evaluation in either path.",
    },
    {
      n: "03",
      duration: "2 × 2 hrs",
      name: "Two panels.",
      body: "One systems design, one code review of your submission. Separated by a week so neither conversation is rushed. No surprise algorithmic puzzles.",
    },
    {
      n: "04",
      duration: "1 hr",
      name: "Team conversation.",
      body: "One hour with three people you would work with weekly. Not a culture screen; a realistic sample of the discussions we have on Mondays.",
    },
    {
      n: "05",
      duration: "48 hrs",
      name: "Offer.",
      body: "References called concurrently with the team conversation, so nothing is held up at the end. The salary band has been in writing since step one; there is no ambush to negotiate against.",
    },
  ];
  return (
    <section className="mx-auto max-w-[1100px] px-6 py-20 sm:py-28">
      <div className="max-w-[60ch]">
        <p className="font-mono text-meta uppercase tracking-wide text-ink-2">Process</p>
        <h2 className="mt-2 font-serif text-h2 sm:text-h1 text-ink leading-[1.08]">
          Eighteen days, typically.
        </h2>
        <p className="mt-5 text-body text-ink-2">
          Slower than a FAANG loop, faster than a founder-led seed startup. The timeline is
          symmetric: we aim to give you a decision within two business days of the last
          panel. We expect the same in return.
        </p>
      </div>
      <ol className="mt-12 border-t border-rule">
        {steps.map((s) => (
          <li
            key={s.n}
            className="border-b border-rule py-7 sm:py-9 grid grid-cols-[3rem_1fr] sm:grid-cols-[3rem_1fr_8rem] gap-x-6 sm:gap-x-8 items-baseline"
          >
            <span className="font-mono text-meta text-ink-2 pt-1">{s.n}</span>
            <div>
              <h3 className="font-serif italic text-h3 text-ink">{s.name}</h3>
              <p className="mt-3 text-body text-ink-2 max-w-[58ch]">{s.body}</p>
            </div>
            <p className="font-mono text-meta text-ink-2 pt-1 sm:text-right tabular-nums">
              {s.duration}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

function NotHiring() {
  const nos = [
    "A head of developer advocacy. The DA above is an IC role reporting to the CEO. It will stay that way until the team is twice the size.",
    "Generalist engineering managers. Managers here come from the engineering side after twelve months as an IC on the team they manage.",
    "A VP of engineering. The founding team handles the work. Revisit in 2027.",
    "Contract arrangements with recruiting agencies. We do not reply to outbound mail from firms. Save yourself the follow-ups.",
  ];
  return (
    <section className="border-t border-rule">
      <div className="mx-auto max-w-[1100px] px-6 py-20 sm:py-28">
        <div className="max-w-[60ch]">
          <p className="font-mono text-meta uppercase tracking-wide text-ink-2">
            Also, for clarity
          </p>
          <h2 className="mt-2 font-serif text-h2 sm:text-h1 text-ink leading-[1.08]">
            What we are <em className="italic">not</em> hiring for.
          </h2>
          <p className="mt-5 text-body text-ink-2">
            Most careers pages hide these. We publish them so you do not waste a week writing
            an application we will not read.
          </p>
        </div>
        <ul className="mt-10 border-t border-rule">
          {nos.map((n) => (
            <li
              key={n}
              className="border-b border-rule py-5 sm:py-6 grid grid-cols-[1.25rem_1fr] gap-x-4 text-body text-ink-2"
            >
              <span aria-hidden className="font-mono text-signal pt-0.5 select-none">
                ×
              </span>
              <span className="max-w-[62ch]">{n}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

function Closing() {
  return (
    <section className="bg-paper-2 border-y border-rule py-20 sm:py-28">
      <div className="mx-auto max-w-[860px] px-6">
        <blockquote className="font-serif text-ink text-[28px] sm:text-[40px] md:text-[48px] leading-[1.1] font-semibold tracking-tight">
          Don&apos;t see your role?{" "}
          <em className="italic">We hire the senior engineer we wish we already had.</em>
        </blockquote>
        <p className="mt-8 text-body-l text-ink-2 max-w-[60ch]">
          Write to{" "}
          <a
            href="mailto:careers@nexus-sync.dev"
            className="text-ink hover:text-signal-deep underline underline-offset-4 decoration-signal decoration-2 hover:decoration-2"
          >
            careers@nexus-sync.dev
          </a>{" "}
          with a paragraph about the best thing you shipped and the hardest thing you
          debugged. Three people read every note. A human replies either way.
        </p>
      </div>
    </section>
  );
}
