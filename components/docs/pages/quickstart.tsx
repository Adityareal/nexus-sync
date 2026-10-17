import { Code, Pre } from "@/components/DocPage";
import { DocLink, H2, Kbd, Lead, Steps } from "@/components/docs/prose";
import type { TocItem } from "@/components/docs/prose";

export const toc: TocItem[] = [
  { id: "install", label: "Install" },
  { id: "init", label: "Create a config" },
  { id: "start", label: "Start syncing" },
  { id: "second-terminal", label: "From a second terminal" },
  { id: "stop", label: "Stop" },
  { id: "next", label: "Where to go next" },
];

export default function Quickstart() {
  return (
    <>
      <Lead>
        Install the CLI, create a config, start the watcher, and save a file. This takes about two
        minutes. You need Node.js 18 or newer and a terminal.
      </Lead>

      <H2 id="install">Install</H2>
      <p>Install the published package globally:</p>
      <Pre>npm install -g nexus-sync-cli</Pre>
      <p>
        That gives you the <Code>nexus-sync</Code> command. To run it without installing, use{" "}
        <Code>npx nexus-sync-cli start</Code>. Confirm the version:
      </p>
      <Pre>{`$ nexus-sync --version
0.1.0`}</Pre>
      <p>
        See <DocLink href="/docs/install-cli">installing the CLI</DocLink> for npx, project-local
        and from-source options.
      </p>

      <H2 id="init">Create a config</H2>
      <p>
        From your project folder, run <Code>nexus-sync init</Code>. It asks three questions and
        writes one file.
      </p>
      <Pre>{`$ nexus-sync init

✦ Nexus-Sync

? Project name: my-app
? Framework: Next.js
? Preferred region: us-east-1
  ✔ Project initialized!
  Config written to .nexus/config.json`}</Pre>
      <p>
        <Code>init</Code> needs an interactive terminal. The project name must be lowercase
        letters, digits and hyphens. The file it writes is{" "}
        <DocLink href="/docs/config-reference">.nexus/config.json</DocLink>.
      </p>

      <H2 id="start">Start syncing</H2>
      <p>
        In the same folder, run <Code>nexus-sync start</Code>. It watches your folders and keeps
        running until you stop it.
      </p>
      <Pre>{`$ nexus-sync start

✦ Nexus-Sync

  Watching: src/, app/, pages/, api/
  ✦ Shadow live at: https://my-app.nexus-sync.example`}</Pre>
      <p>
        Edit a file under one of those folders and save it. A line appears for the change:
      </p>
      <Pre>{`[12:04:31] ✔ Synced  src/index.js  →  shadow (28ms)`}</Pre>
      <p>
        The watching is real. The sync is not: the address does not resolve and the number in
        parentheses is random. <DocLink href="/docs/cli-start">nexus-sync start</DocLink> covers
        every line it prints.
      </p>

      <H2 id="second-terminal">From a second terminal</H2>
      <p>
        Leave <Code>start</Code> running and open another terminal in the same folder. Try the other
        commands:
      </p>
      <Steps>
        <li>
          <Code>nexus-sync status</Code> prints a snapshot of the environment. The values are
          generated each run. See <DocLink href="/docs/cli-status">status</DocLink>.
        </li>
        <li>
          <Code>nexus-sync collab invite you@example.com</Code> prints a join link. No email is
          sent. See <DocLink href="/docs/cli-collab">collab invite</DocLink>.
        </li>
        <li>
          <Code>nexus-sync db sandbox</Code> prints a sandbox database URL. Nothing is cloned and
          nothing listens there. See <DocLink href="/docs/cli-db">db sandbox</DocLink>.
        </li>
        <li>
          <Code>nexus-sync test</Code> prints five checks, four passing and one failing, then exits
          with code 0. See <DocLink href="/docs/cli-test">test</DocLink>.
        </li>
        <li>
          <Code>nexus-sync deploy</Code> prints four build steps and a production URL. Nothing is
          built or pushed. See <DocLink href="/docs/cli-deploy">deploy</DocLink>.
        </li>
      </Steps>

      <H2 id="stop">Stop</H2>
      <p>
        In the terminal running <Code>start</Code>, press <Kbd>Ctrl</Kbd>+<Kbd>C</Kbd>. It closes
        the watcher and exits with code 0.
      </p>
      <Pre>{`  Stopping file watcher...
  ✔ Shadow sync stopped. Goodbye! 👋`}</Pre>

      <H2 id="next">Where to go next</H2>
      <p>
        For a fuller walkthrough with each prompt and line explained, read{" "}
        <DocLink href="/docs/first-environment">your first environment</DocLink>. To understand what
        the simulation does and does not do, read{" "}
        <DocLink href="/docs/shadow-environments">shadow environments</DocLink>.
      </p>
    </>
  );
}
