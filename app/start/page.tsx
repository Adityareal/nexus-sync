import Link from "next/link";
import { Logo } from "@/components/Logo";
import {
  StartPodFlow,
  StartPodForm,
  StartPodBoot,
  StartPodSuccess,
} from "@/components/StartPodFlow";

export const metadata = {
  title: "Start a pod, Nexus-Sync",
  description:
    "Configure, boot, and connect to an ephemeral cloud pod. The full sequence, four stages, 1.8 seconds.",
};

export default function StartPage() {
  return (
    <main id="main">
      <Header />
      <Intro />
      <LiveFlow />
      <StoryboardHeader />
      <StageOne />
      <StagePanel
        n="02"
        label="Configure"
        title="Six fields, five auto-filled."
        body="The form should not feel like a Google form. Definition list rhythm, mono labels, hairline rules between rows. Project, framework, branch are read or detected. Size is a binary radio. The database toggle includes the anonymization policy inline so the consequence is visible at the moment of choice. Env vars stay collapsed by default."
        notes={[
          "Framework auto-detected from package.json.",
          "Branch tracks the current checkout, editable in place.",
          "Anonymization rule shown next to the toggle. Consequence at the point of consent.",
        ]}
      >
        <StartPodForm frozen />
      </StagePanel>
      <StagePanel
        n="03"
        label="Boot"
        title="1.8 seconds, four milestones."
        body="The progress bar snaps to four named stages that match the log lines on the right. Provision, database, sync, preview. Real bootstrap, real timestamps. The pod mark on the left fills clockwise as a single purposeful motion. No spinner."
        notes={[
          "Logs reveal as a function of progress, not a fixed delay.",
          "Elapsed counter is tabular-numerical so digits do not jitter.",
          "Caret blinks at 900ms, two-step, to signal the next line is coming.",
        ]}
      >
        <StartPodBoot branch="feature/auth-flow" autoplay={false} frozenProgress={0.62} />
      </StagePanel>
      <StagePanel
        n="04"
        label="Live"
        title="The proof is the URL."
        body="No green checkmark, no confetti. The success state is a typeset preview URL with a copper underline, large enough to read across the room. Five actions, ranked. One copper primary, three bare-text utilities, and Stop pod set apart with a two-step inline confirmation so it never lives in a second modal."
        notes={[
          "Preview URL slug is derived live from the branch name.",
          "Pod metadata is a definition list, not a stat tile grid.",
          "Stop pod uses inline confirmation, not a destructive-red button.",
        ]}
      >
        <StartPodSuccess branch="feature/auth-flow" frozen />
      </StagePanel>
      <Footer />
    </main>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

function Header() {
  return (
    <header className="border-b border-rule">
      <div className="mx-auto max-w-[1200px] px-6 py-5 flex items-center justify-between">
        <Logo />
        <nav className="hidden sm:flex items-center gap-8 text-meta text-ink-2">
          <Link href="/" className="hover:text-ink underline-offset-4 hover:underline">
            Home
          </Link>
          <Link href="/docs" className="hover:text-ink underline-offset-4 hover:underline">
            Docs
          </Link>
        </nav>
      </div>
    </header>
  );
}

function Intro() {
  return (
    <section className="mx-auto max-w-[1100px] px-6 pt-16 sm:pt-24 pb-12 sm:pb-16">
      <p className="font-mono text-meta uppercase tracking-wide text-ink-2">
        Flow <span className="mx-1.5 text-rule">/</span> Ephemeral pod
      </p>
      <h1 className="mt-4 font-serif text-ink text-[44px] sm:text-h1 leading-[1.06] font-bold tracking-tight max-w-[20ch]">
        From click to running pod, in four stages.
      </h1>
      <p className="mt-6 text-body-l text-ink-2 max-w-[60ch]">
        A platform engineer should be able to configure a pod, watch it boot, and open the
        preview URL without learning a new mental model. The form is short. The boot is honest
        about what is happening. The success state is a URL, not a celebration.
      </p>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Live interactive flow
// ─────────────────────────────────────────────────────────────────────────────

function LiveFlow() {
  return (
    <section className="bg-paper-2 border-y border-rule py-12 sm:py-16">
      <div className="mx-auto max-w-[1100px] px-6">
        <div className="mb-8 sm:mb-10 max-w-[60ch]">
          <p className="font-mono text-meta uppercase tracking-wide text-ink-2">Live</p>
          <h2 className="mt-2 font-serif text-h2 text-ink">Try it.</h2>
          <p className="mt-3 text-body text-ink-2">
            The form below is the real component. Submit it to watch the boot sequence and reach
            the success state. No backend yet, no pod actually starts; the timing and behaviour
            are production.
          </p>
        </div>
        <StartPodFlow display="inline" />
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Storyboard
// ─────────────────────────────────────────────────────────────────────────────

function StoryboardHeader() {
  return (
    <section className="mx-auto max-w-[1100px] px-6 pt-20 sm:pt-28 pb-10 sm:pb-14">
      <p className="font-mono text-meta uppercase tracking-wide text-ink-2">Storyboard</p>
      <h2 className="mt-2 font-serif text-h1 text-ink">Four stages, annotated.</h2>
      <p className="mt-4 text-body text-ink-2 max-w-[60ch]">
        The same components, frozen at a representative moment in each stage, with notes on the
        decisions behind them.
      </p>
    </section>
  );
}

function StageOne() {
  return (
    <section className="mx-auto max-w-[1100px] px-6 pb-16 sm:pb-24">
      <StagePanelHeader
        n="01"
        label="Trigger"
        title="The CTA is a plain anchor."
        body="No JavaScript dependency, no event listener required. The button is a real link to /start so the primary call to action works without scripting. With JavaScript on, a future enhancement intercepts the click to open the flow as an overlay; the URL still resolves."
        notes={[
          "Mono label, copper background, square corners. Matches the homepage hero CTA exactly.",
          "Hover state shifts to ink. Focus ring is copper, 2px offset.",
          "No loading spinner on click. The next stage takes over the surface.",
        ]}
      />
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-0 lg:gap-px bg-rule border border-rule">
        {/* Left: simulated hero context with the CTA */}
        <div className="bg-paper px-8 sm:px-12 py-12 sm:py-16">
          <p className="font-mono text-meta text-ink-2">homepage hero, in context</p>
          <h3 className="mt-6 font-serif text-ink text-[28px] sm:text-[36px] leading-[1.06] font-bold tracking-tight max-w-[16ch]">
            Local environments are a tax. <em className="italic">Nexus-Sync collects it for you.</em>
          </h3>
          <p className="mt-5 text-body text-ink-2 max-w-[44ch]">
            Your laptop boots a fresh cloud pod in 1.8 seconds. Every save streams under 100
            milliseconds.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-x-8 gap-y-4">
            <span className="inline-block bg-signal-deep text-paper px-6 py-3 font-mono text-meta uppercase tracking-wide ring-2 ring-signal/40 ring-offset-2 ring-offset-paper">
              Start a pod
            </span>
            <span className="text-meta text-ink-2 underline underline-offset-4 decoration-signal decoration-1">
              Read the engineering note
            </span>
          </div>
          <p className="mt-12 font-mono text-meta text-ink-2">
            (Mirror Local. Deploy Cloud. Ship Faster.)
          </p>
        </div>
        {/* Right: pointer annotation */}
        <div className="bg-paper-2 px-8 py-10 sm:py-12">
          <p className="font-mono text-meta uppercase tracking-wide text-ink-2">Click target</p>
          <p className="mt-3 font-mono text-mono text-ink">{`<a href="/start">Start a pod</a>`}</p>
          <ul className="mt-6 space-y-3 text-body text-ink-2 max-w-[36ch]">
            <li>Background: signal-deep copper.</li>
            <li>Padding: 24px horizontal, 12px vertical.</li>
            <li>Type: mono meta, uppercase, tracking 0.025em.</li>
            <li>Hover: ink background, 200ms ease-out.</li>
            <li>Focus: 2px copper ring, 2px paper offset.</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

function StagePanel({
  n,
  label,
  title,
  body,
  notes,
  children,
}: {
  n: string;
  label: string;
  title: string;
  body: string;
  notes: string[];
  children: React.ReactNode;
}) {
  return (
    <section className="mx-auto max-w-[1100px] px-6 pb-16 sm:pb-24">
      <StagePanelHeader n={n} label={label} title={title} body={body} notes={notes} />
      <div className="mt-8">{children}</div>
    </section>
  );
}

function StagePanelHeader({
  n,
  label,
  title,
  body,
  notes,
}: {
  n: string;
  label: string;
  title: string;
  body: string;
  notes: string[];
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[7rem_1fr_22rem] gap-x-8 gap-y-3 items-baseline border-t border-rule pt-7">
      <p className="font-mono text-meta uppercase tracking-wide text-ink-2">
        Stage {n}
        <br />
        <span className="text-ink">{label}</span>
      </p>
      <div>
        <h3 className="font-serif text-h2 text-ink">{title}</h3>
        <p className="mt-3 text-body text-ink-2 max-w-[60ch]">{body}</p>
      </div>
      <ul className="text-meta text-ink-2 space-y-2 lg:border-l lg:border-rule lg:pl-6">
        {notes.map((note) => (
          <li key={note} className="leading-snug">
            {note}
          </li>
        ))}
      </ul>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="border-t border-rule">
      <div className="mx-auto max-w-[1100px] px-6 py-10 flex flex-wrap items-center justify-between gap-4">
        <p className="font-mono text-meta text-ink-2">Nexus-Sync</p>
        <Link
          href="/"
          className="font-mono text-meta text-ink-2 hover:text-ink underline underline-offset-4 decoration-rule hover:decoration-signal"
        >
          ← Back to home
        </Link>
      </div>
    </footer>
  );
}
