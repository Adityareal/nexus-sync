import { Code, Pre } from "@/components/DocPage";
import { DefList, DocLink, H2, Lead, List } from "@/components/docs/prose";
import type { TocItem } from "@/components/docs/prose";

export const toc: TocItem[] = [
  { id: "shape", label: "Shape of every run" },
  { id: "messages", label: "Messages" },
  { id: "streams", label: "stdout and stderr" },
  { id: "non-tty", label: "Without a terminal" },
  { id: "colours", label: "Colours" },
  { id: "exit-codes", label: "Exit codes" },
  { id: "scripting", label: "Scripting" },
];

export default function OutputReference() {
  return (
    <>
      <Lead>
        Every line the CLI can print, what it means, which stream it uses, and the exit code each
        command returns. This is the reference the command pages link to.
      </Lead>

      <H2 id="shape">Shape of every run</H2>
      <p>
        Each command starts with a blank line and the branded header, then its own output.
      </p>
      <Pre>{`✦ Nexus-Sync`}</Pre>
      <p>
        Lines that report a result use a leading glyph: <Code>✔</Code> for success,{" "}
        <Code>⚠</Code> for a warning, <Code>✗</Code> for an error, <Code>→</Code> for a step in
        progress and <Code>✦</Code> for the branded result lines. These are Unicode characters; an
        old console may show them as boxes. See{" "}
        <DocLink href="/docs/system-requirements">system requirements</DocLink>.
      </p>

      <H2 id="messages">Messages</H2>
      <p>
        The result lines you can see, grouped by the command that prints them. The{" "}
        <DocLink href="/docs/cli-all">command pages</DocLink> show each in context.
      </p>
      <DefList
        items={[
          {
            term: <Code>✔ Project initialized!</Code>,
            desc: (
              <>
                <Code>init</Code> wrote the config. The next line is{" "}
                <Code>Config written to .nexus/config.json</Code>.
              </>
            ),
          },
          {
            term: "⚠ A .nexus/config.json already exists.",
            desc: (
              <>
                <Code>init</Code> found a config and asks{" "}
                <Code>? Overwrite existing config? (y/N)</Code>. Answering no prints{" "}
                <Code>Aborted.</Code> and exits with code 0.
              </>
            ),
          },
          {
            term: ">> Lowercase alphanumeric + hyphens only",
            desc: (
              <>
                The project-name prompt rejected your answer. It accepts lowercase letters, digits
                and hyphens, matching <Code>/^[a-z0-9-]+$/</Code>.
              </>
            ),
          },
          {
            term: "Watching: src/, app/, pages/, api/",
            desc: (
              <>
                <Code>start</Code> listing the folders from <Code>watchPaths</Code>. When that list
                is empty it prints <Code>Watching:</Code> with nothing after it and exits at once.
                See <DocLink href="/docs/config-reference">config reference</DocLink>.
              </>
            ),
          },
          {
            term: "✔ Synced  <path>  →  shadow (NNms)",
            desc: (
              <>
                <Code>start</Code> saw an existing file change. The number is random, from 20 to
                60, and measures nothing. See <DocLink href="/docs/cli-start">nexus-sync start</DocLink>.
              </>
            ),
          },
          {
            term: "✔ Added   <path>  →  shadow (NNms)",
            desc: <><Code>start</Code> saw a new file, including one created by a rename.</>,
          },
          {
            term: "⚠ Removed <path>",
            desc: <><Code>start</Code> saw a file deleted or renamed away. No number is printed.</>,
          },
          {
            term: "✗ Watcher error: <message>",
            desc: <><Code>start</Code> reported a file-system watcher error and kept running.</>,
          },
          {
            term: <Code>✔ Shadow sync stopped. Goodbye! 👋</Code>,
            desc: (
              <>
                You pressed Ctrl+C in the terminal running <Code>start</Code>. It exits with code 0.
              </>
            ),
          },
          {
            term: "✔ Shadow environment suspended.",
            desc: (
              <>
                <Code>stop</Code> finished. It prints a confirmation and exits with code 0. It does
                not reach a running <Code>start</Code>. See{" "}
                <DocLink href="/docs/cli-stop">nexus-sync stop</DocLink>.
              </>
            ),
          },
          {
            term: "● active",
            desc: (
              <>
                <Code>status</Code> sync state. It is always <Code>active</Code>. The uptime and
                latency it shows are regenerated each run. See{" "}
                <DocLink href="/docs/cli-status">nexus-sync status</DocLink>.
              </>
            ),
          },
          {
            term: "✔ Sandbox ready at: postgres://...",
            desc: (
              <>
                <Code>db sandbox</Code> finished. The URL is{" "}
                <Code>postgres://sandbox.nexus-sync.example:5432/&lt;projectName&gt;_sandbox</Code>,
                the same every run. Nothing listens there. See{" "}
                <DocLink href="/docs/database-sandbox">database sandbox</DocLink>.
              </>
            ),
          },
          {
            term: "✔ Invite sent to <email>",
            desc: (
              <>
                <Code>collab invite</Code> finished. The next line carries a join link with a
                16-character token, new each run and never stored. No email is sent. See{" "}
                <DocLink href="/docs/multiplayer">multiplayer</DocLink>.
              </>
            ),
          },
          {
            term: "4 passed, 1 failed",
            desc: (
              <>
                <Code>test</Code> summary. The five checks are fixed and the same check fails every
                run. It still exits with code 0. See{" "}
                <DocLink href="/docs/cli-test">nexus-sync test</DocLink>.
              </>
            ),
          },
          {
            term: "✦ Production deploy complete: https://...",
            desc: (
              <>
                <Code>deploy</Code> finished. The address is the same one <Code>start</Code> and{" "}
                <Code>status</Code> print. The following line reports a measured time of about 2.4
                to 2.5 seconds. Nothing was built or pushed. See{" "}
                <DocLink href="/docs/cli-deploy">nexus-sync deploy</DocLink>.
              </>
            ),
          },
          {
            term: "✗ No config found. Run `nexus-sync init` first.",
            desc: (
              <>
                The command needs a config and found none in the current folder. Exit code 1. It is
                printed by <Code>start</Code>, <Code>status</Code>, <Code>deploy</Code>,{" "}
                <Code>db sandbox</Code> and <Code>collab invite</Code>.
              </>
            ),
          },
          {
            term: "error: unknown command '<name>'",
            desc: (
              <>
                You typed a command the CLI does not have. Exit code 1. A near miss adds a hint, so{" "}
                <Code>share</Code> prints <Code>(Did you mean start?)</Code>. The old names were{" "}
                <Code>up</Code>, <Code>down</Code> and <Code>share</Code>; use <Code>start</Code>,{" "}
                <Code>stop</Code> and <Code>collab invite</Code>.
              </>
            ),
          },
          {
            term: "error: unknown option '<flag>'",
            desc: (
              <>
                You passed a flag the CLI does not have. Exit code 1. Every command accepts only{" "}
                <Code>-h</Code>, <Code>--help</Code>; the root also accepts <Code>-V</Code>,{" "}
                <Code>--version</Code>. There is no <Code>--json</Code>, <Code>--verbose</Code> or{" "}
                <Code>--no-color</Code>.
              </>
            ),
          },
          {
            term: "error: missing required argument 'email'",
            desc: (
              <>
                <Code>collab invite</Code> ran with no address. Exit code 1. Pass one address;
                extra arguments are ignored.
              </>
            ),
          },
          {
            term: "SyntaxError (JSON)",
            desc: (
              <>
                The config is not valid JSON, or it carries a byte order mark. The command prints a
                Node.js stack trace and exits with code 1. See{" "}
                <DocLink href="/docs/config-reference">config reference</DocLink>.
              </>
            ),
          },
        ]}
      />

      <H2 id="streams">stdout and stderr</H2>
      <p>
        Results go to stdout. The animated lines go to stderr: the spinner that{" "}
        <Code>test</Code> shows while it runs, and the four step spinners in <Code>deploy</Code>.
        A bare <Code>db</Code> or <Code>collab</Code> with no subcommand prints its help to stderr
        and exits with code 1.
      </p>
      <p>
        This means a redirect keeps the two apart. <Code>nexus-sync test &gt; out.txt</Code>{" "}
        captures the checks and the summary while the spinner line stays on your terminal.
      </p>

      <H2 id="non-tty">Without a terminal</H2>
      <p>
        When output is not a terminal, in CI or through a pipe, the animated widgets degrade to
        plain text.
      </p>
      <List>
        <li>
          Spinners print a line with a leading <Code>-</Code> when they start, then a line with a
          leading <Code>✔</Code> when they finish. On some Windows consoles the check is{" "}
          <Code>√</Code>.
        </li>
        <li>
          The two <Code>db sandbox</Code> progress bars are not drawn, so their labels run together
          on one line before the <Code>✔</Code> result.
        </li>
        <li>
          <Code>init</Code> needs a terminal for its prompts. With stdin piped or in CI it fails
          with a readline error. Commit the config or write it with a script instead. See{" "}
          <DocLink href="/docs/tutorial-cicd">CI/CD integration</DocLink>.
        </li>
      </List>

      <H2 id="colours">Colours</H2>
      <p>
        The CLI colours its output with chalk. Set <Code>FORCE_COLOR=0</Code> to turn colour off,
        or <Code>TERM=dumb</Code>. GitHub Actions receives colour even though it is not a terminal.
        There is no <Code>--no-color</Code> flag, and the <Code>NO_COLOR</Code> convention is not
        honoured in 0.1.0.
      </p>

      <H2 id="exit-codes">Exit codes</H2>
      <DefList
        items={[
          {
            term: "0",
            desc: (
              <>
                Success. This includes <Code>test</Code> even when one of its checks fails, and{" "}
                <Code>init</Code> when you decline to overwrite an existing config.
              </>
            ),
          },
          {
            term: "1",
            desc: (
              <>
                No config found, invalid config JSON, an unknown command, an unknown option, a
                missing argument, or help printed for a bare <Code>db</Code> or <Code>collab</Code>.
              </>
            ),
          },
        ]}
      />
      <p>
        There are no other exit codes in 0.1.0. A crash from invalid JSON exits with code 1
        through the Node.js runtime rather than through the CLI.
      </p>

      <H2 id="scripting">Scripting</H2>
      <p>
        Exit code 0 means the command ran, not that your project is healthy. The{" "}
        <Code>test</Code> command always reports one failing check and still exits 0, so do not
        gate a merge on it. Run your own test runner for real results. See{" "}
        <DocLink href="/docs/testing">testing in the shadow environment</DocLink>.
      </p>
      <p>
        To read a specific line, remember which stream it uses. Parse stdout for the result lines;
        the spinner and progress animations are on stderr and are absent when output is not a
        terminal.
      </p>
    </>
  );
}
