import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Not found, Nexus-Sync",
};

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <section className="mx-auto max-w-[1100px] px-6 pt-20 sm:pt-28 pb-24 sm:pb-32">
          <h1 className="font-serif text-ink text-[40px] sm:text-h1 md:text-[60px] leading-[1.06] font-bold tracking-tight">
            Nothing lives at this address.
          </h1>
          <p className="mt-6 text-body-l text-ink-2 max-w-[58ch]">
            The link is old, or the page was never written. These are the pages
            people usually want.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <a
              href="/start"
              className="inline-block bg-signal-deep text-paper px-6 py-3 font-mono text-meta tracking-wide hover:bg-ink transition-colors duration-200"
            >
              Start a pod
            </a>
            <Link
              href="/docs/quickstart"
              className="text-meta text-ink-2 hover:text-ink underline underline-offset-4 decoration-signal decoration-1 hover:decoration-2"
            >
              Read the quickstart
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
