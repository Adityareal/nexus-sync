import { Code, Pre } from "@/components/DocPage";
import { DefList, DocLink, H2, Lead } from "@/components/docs/prose";
import type { TocItem } from "@/components/docs/prose";

export const toc: TocItem[] = [
  { id: "usage", label: "Usage" },
  { id: "output", label: "What it prints" },
  { id: "fields", label: "The fields" },
  { id: "errors", label: "Errors and exit codes" },
  { id: "simulated", label: "Real and simulated" },
];

export default function CliStatus() {
  return (
    <>
      <Lead>
        Prints a panel describing the shadow environment: its sync state, the last file synced,
        uptime, live URL and latency. It reads the config and returns at once.
      </Lead>

      <H2 id="usage">Usage</H2>
      <Pre>nexus-sync status</Pre>
      <p>
        It takes no arguments. The only option is <Code>-h</Code>, <Code>--help</Code>. Run it
        from the folder that holds <Code>.nexus/config.json</Code>. It does not need a{" "}
        <DocLink href="/docs/cli-start">start</DocLink> to be running, and it prints the same
        shape of panel either way.
      </p>

      <H2 id="output">What it prints</H2>
      <Pre>{`  Shadow Environment
  ─────────────────────────────────
  Sync state  ● active
  Last synced src/app/page.tsx (2s ago)
  Uptime      00:35:09
  Live URL    https://my-app.nexus-sync.example
  Latency     ⚡ 44ms`}</Pre>
      <p>It exits with code 0.</p>

      <H2 id="fields">The fields</H2>
      <DefList
        items={[
          { term: "Sync state", desc: <>Always <Code>● active</Code>. The command reports no other state.</> },
          {
            term: "Last synced",
            desc: <>Always the fixed text <Code>src/app/page.tsx (2s ago)</Code>. It is not the last file you actually changed.</>,
          },
          { term: "Uptime", desc: "A random duration under two hours, generated for this run. It does not count from when any start began." },
          {
            term: "Live URL",
            desc: (
              <>
                Built from <Code>projectName</Code>, the same address{" "}
                <DocLink href="/docs/cli-start">start</DocLink> and{" "}
                <DocLink href="/docs/cli-deploy">deploy</DocLink> print. See{" "}
                <DocLink href="/docs/preview-urls">preview URLs</DocLink>.
              </>
            ),
          },
          { term: "Latency", desc: "A random number from 20 to 60 ms. It measures nothing." },
        ]}
      />
      <p>
        The region from the config is not shown. The values are regenerated on each run, so two
        calls in a row report different uptime and latency.
      </p>

      <H2 id="errors">Errors and exit codes</H2>
      <DefList
        items={[
          {
            term: "✗ No config found. Run `nexus-sync init` first.",
            desc: (
              <>
                There is no <Code>.nexus/config.json</Code> in the current folder. Exit code 1.
                Change to your project folder, or run <Code>nexus-sync init</Code> there.
              </>
            ),
          },
          {
            term: "SyntaxError about JSON",
            desc: (
              <>
                The config is not valid JSON, or it was saved with a byte order mark. The
                command prints a Node.js stack trace and exits with code 1. See{" "}
                <DocLink href="/docs/common-issues">common issues</DocLink>.
              </>
            ),
          },
        ]}
      />

      <H2 id="simulated">Real and simulated</H2>
      <p>
        Reading the config is real. The panel is not. The sync state, last-synced line, uptime
        and latency are generated for display and do not reflect any running process or
        measurement. The live URL does not resolve. Use this command to confirm the CLI reads
        your config, not to check on a live environment.{" "}
        <DocLink href="/docs/shadow-environments">Shadow environments</DocLink> explains what
        the full product reports.
      </p>
    </>
  );
}
