import { Code, Pre } from "@/components/DocPage";
import { DefList, DocLink, H2, Kbd, Lead, Steps } from "@/components/docs/prose";
import type { TocItem } from "@/components/docs/prose";

export const toc: TocItem[] = [
  { id: "init", label: "Run init" },
  { id: "config", label: "The file it writes" },
  { id: "start", label: "Start the watcher" },
  { id: "status", label: "Check status" },
  { id: "stop", label: "Stop" },
  { id: "remove", label: "Remove the environment" },
];

export default function FirstEnvironment() {
  return (
    <>
      <Lead>
        This walks through one environment from end to end: the prompts, the file written, each
        line the watcher prints, and how to remove it. At every step it says what 0.1.0 actually
        does, so you know what is real.
      </Lead>

      <H2 id="init">Run init</H2>
      <p>
        From your project folder, run <Code>nexus-sync init</Code>. It asks three questions. Arrow
        keys move between choices and Enter selects. Enter on its own accepts the default.
      </p>
      <Pre>{`$ nexus-sync init

✦ Nexus-Sync

? Project name: my-app
? Framework: Next.js
? Preferred region: us-east-1
  ✔ Project initialized!
  Config written to .nexus/config.json`}</Pre>
      <DefList
        items={[
          {
            term: "Project name",
            desc: (
              <>
                Lowercase letters, digits and hyphens. An invalid name shows{" "}
                <Code>{">> Lowercase alphanumeric + hyphens only"}</Code> and asks again. This
                becomes your environment address.
              </>
            ),
          },
          {
            term: "Framework",
            desc: "Next.js, Remix, SvelteKit or Other. Recorded in the config and not read by any command in 0.1.0.",
          },
          {
            term: "Preferred region",
            desc: "us-east-1, eu-west-1 or ap-south-1. Also recorded and not read in 0.1.0.",
          },
        ]}
      />
      <p>
        If a config already exists, <Code>init</Code> warns and asks whether to overwrite. Answering
        no prints <Code>Aborted.</Code> and exits with code 0. <Code>init</Code> needs an
        interactive terminal; without one it exits with an error.
      </p>

      <H2 id="config">The file it writes</H2>
      <p>
        The only thing <Code>init</Code> creates is <Code>.nexus/config.json</Code> in the current
        folder:
      </p>
      <Pre label=".nexus/config.json">{`{
  "projectName": "my-app",
  "framework": "Next.js",
  "region": "us-east-1",
  "watchPaths": [
    "src/",
    "app/",
    "pages/",
    "api/"
  ],
  "createdAt": "2026-10-17T07:30:00.000Z"
}`}</Pre>
      <p>
        Only <Code>projectName</Code> and <Code>watchPaths</Code> are read by any command.{" "}
        <Code>framework</Code>, <Code>region</Code> and <Code>createdAt</Code> are stored and never
        read in 0.1.0. The full field list is in the{" "}
        <DocLink href="/docs/config-reference">config reference</DocLink>.
      </p>

      <H2 id="start">Start the watcher</H2>
      <p>
        Run <Code>nexus-sync start</Code> in the same folder. It prints two lines, then stays
        running.
      </p>
      <Pre>{`$ nexus-sync start

✦ Nexus-Sync

  Watching: src/, app/, pages/, api/
  ✦ Shadow live at: https://my-app.nexus-sync.example`}</Pre>
      <p>Now change files under those folders. Each event prints a line.</p>
      <Pre>{`[12:04:31] ✔ Synced  src/index.js  →  shadow (28ms)
[12:04:33] ✔ Added   src/lib/util.ts  →  shadow (30ms)
[12:04:40] ⚠ Removed src/lib/old.ts`}</Pre>
      <Steps>
        <li>A save to an existing file prints <Code>✔ Synced</Code>.</li>
        <li>A new file prints <Code>✔ Added</Code>, including the new name from a rename.</li>
        <li>A delete prints <Code>⚠ Removed</Code> with no number.</li>
      </Steps>
      <p>
        The watching is real: each line reports an event from your file system. The sync is
        simulated. Nothing is uploaded, the address does not resolve, and the latency in
        parentheses is a random number that measures nothing. See{" "}
        <DocLink href="/docs/live-mirroring">live mirroring</DocLink> for what is watched and
        ignored.
      </p>

      <H2 id="status">Check status</H2>
      <p>
        In a second terminal in the same folder, run <Code>nexus-sync status</Code>. It prints a
        snapshot and exits with code 0.
      </p>
      <Pre>{`  Shadow Environment
  ─────────────────────────────────
  Sync state  ● active
  Last synced src/app/page.tsx (2s ago)
  Uptime      00:35:09
  Live URL    https://my-app.nexus-sync.example
  Latency     ⚡ 44ms`}</Pre>
      <p>
        These values are generated on each run and are not measured. Sync state is always active,
        uptime and latency are random, and status works whether or not{" "}
        <Code>start</Code> is running. See <DocLink href="/docs/cli-status">status</DocLink>.
      </p>

      <H2 id="stop">Stop</H2>
      <p>
        In the terminal running <Code>start</Code>, press <Kbd>Ctrl</Kbd>+<Kbd>C</Kbd>.
      </p>
      <Pre>{`  Stopping file watcher...
  ✔ Shadow sync stopped. Goodbye! 👋`}</Pre>
      <p>
        That ends the watcher and exits with code 0. The separate{" "}
        <DocLink href="/docs/cli-stop">nexus-sync stop</DocLink> command only prints a confirmation
        and cannot reach a running <Code>start</Code> process.
      </p>

      <H2 id="remove">Remove the environment</H2>
      <p>
        The environment lives only while <Code>start</Code> runs, and the only thing left on disk
        is the config folder. Delete <Code>.nexus/</Code> to remove the environment from the
        project. On Windows that folder is <Code>.nexus\config.json</Code> under your project root.
        Uninstalling the CLI does not delete it.
      </p>
    </>
  );
}
