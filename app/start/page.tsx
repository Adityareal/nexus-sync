import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { StartPodFlow } from "@/components/StartPodFlow";

export const metadata = {
  title: "Start a pod, Nexus-Sync",
  description:
    "Configure, boot, and connect to an ephemeral cloud pod. The full sequence, four stages, 1.8 seconds.",
};

export default function StartPage() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <Intro />
        <LiveFlow />
        <NeedHelp />
      </main>
      <SiteFooter />
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

function Intro() {
  return (
    <section className="mx-auto max-w-[1100px] px-6 pt-16 sm:pt-24 pb-12 sm:pb-16">
      <h1 className="font-serif text-ink text-[44px] sm:text-h1 leading-[1.06] font-bold tracking-tight max-w-[20ch]">
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
          <h2 className="font-serif text-h2 text-ink">Try it.</h2>
          <p className="mt-3 text-body text-ink-2">
            The form below is the real component. Submit it to watch the boot sequence and reach
            the success state. No backend yet, no pod actually starts; the timing and behaviour
            are production.
          </p>
        </div>
        <StartPodFlow />
      </div>
    </section>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// Need help
// ────────────────────────────────────────────────────────────────────────────

function NeedHelp() {
  return (
    <section className="border-t border-rule">
      <div className="mx-auto max-w-[1100px] px-6 py-16 sm:py-24 grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-x-12 gap-y-6 items-baseline">
        <div>
          <h2 className="font-serif text-h2 sm:text-[40px] text-ink leading-[1.06] tracking-tight">
            Need help?
          </h2>
        </div>
        <div>
          <p className="text-body-l text-ink-2 max-w-[58ch]">
            A walkthrough of all four stages, with notes on the decisions behind each, lives
            in the docs.
          </p>
          <p className="mt-7">
            <Link
              href="/docs/start-flow"
              className="inline-flex items-center gap-3 font-mono text-meta uppercase tracking-[0.04em] text-ink hover:text-signal-deep underline underline-offset-[6px] decoration-signal decoration-1 hover:decoration-2 transition-colors duration-200"
            >
              Read the walkthrough
              <span aria-hidden>→</span>
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

