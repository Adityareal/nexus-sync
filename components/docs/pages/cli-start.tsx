import { Code, Pre } from "@/components/DocPage";
import { DefList, DocLink, H2, Kbd, Lead, List } from "@/components/docs/prose";
import type { TocItem } from "@/components/docs/prose";

export const toc: TocItem[] = [
  { id: "usage", label: "Usage" },
  { id: "output", label: "What it prints" },
  { id: "watched", label: "What it watches" },
  { id: "stopping", label: "Stopping it" },
  { id: "errors", label: "Errors and exit codes" },
  { id: "simulated", label: "Real and simulated" },
];

export default function CliStart() {
  return (
    <>
      <Lead>
        Watches your project folders and prints one line for every file you save, add or
        delete. It keeps running until you press <Kbd>Ctrl</Kbd>+<Kbd>C</Kbd>.
      </Lead>

      <H2 id="usage">Usage</H2>
      <Pre>nexus-sync start</Pre>
      <p>
        It takes no arguments. The only option is <Code>-h</Code>, <Code>--help</Code>. Run it
        from the folder that holds <Code>.nexus/config.json</Code>, which{" "}
        <DocLink href="/docs/cli-init">nexus-sync init</DocLink> creates. The command looks for
        that file in the current folder only, not in parent folders.
      </p>

      <H2 id="output">What it prints</H2>
      <p>
        Two lines when it starts, then one line per file event. The session below saved one
        file, created another in a new folder, and deleted a third.
      </p>
      <Pre>{`✦ Nexus-Sync

  Watching: src/, app/, pages/, api/
  ✦ Shadow live at: https://my-app.nexus-sync.example

[12:04:31] ✔ Synced  src/index.js  →  shadow (28ms)
[12:04:33] ✔ Added   src/lib/util.ts  →  shadow (30ms)
[12:04:40] ⚠ Removed src/lib/old.ts`}</Pre>
      <DefList
        items={[
          { term: "Watching:", desc: <>The folders from <Code>watchPaths</Code> in the config, in the order listed.</> },
          {
            term: "Shadow live at:",
            desc: (
              <>
                The environment address, built from <Code>projectName</Code>. See{" "}
                <DocLink href="/docs/preview-urls">preview URLs</DocLink>.
              </>
            ),
          },
          { term: "✔ Synced", desc: "An existing file changed." },
          { term: "✔ Added", desc: "A new file appeared, including one created by a rename." },
          { term: "⚠ Removed", desc: "A file was deleted or renamed away. A rename prints Added for the new name and Removed for the old one." },
          {
            term: "[12:04:31]",
            desc: "Your local time when the event arrived, on a 24-hour clock.",
          },
          {
            term: "(28ms)",
            desc: "A random number from 20 to 60. It measures nothing; see the last section.",
          },
        ]}
      />
      <p>
        Paths are relative to the folder you ran the command in. On Windows they use
        backslashes, for example <Code>src\index.js</Code>.
      </p>

      <H2 id="watched">What it watches</H2>
      <p>
        Every file under the folders in <Code>watchPaths</Code>, at any depth. When the config
        has no <Code>watchPaths</Code> field, the defaults are <Code>src/</Code>,{" "}
        <Code>app/</Code>, <Code>pages/</Code> and <Code>api/</Code>.
      </p>
      <List>
        <li>
          Anything inside <Code>node_modules</Code>, <Code>.git</Code> or <Code>.nexus</Code> is
          ignored, at any depth.
        </li>
        <li>Files in the project root, or in any folder not listed, are not watched.</li>
        <li>
          Folders are not reported on their own. A new folder shows up through the first file
          you create in it.
        </li>
        <li>
          Files that already exist when <Code>start</Code> begins are not listed. Only changes
          after that point print a line.
        </li>
        <li>
          Dotfiles are included. A <Code>.env</Code> inside <Code>src/</Code> prints a line with
          its name. The CLI never reads file contents.
        </li>
      </List>
      <p>
        In our test on Windows, a listed folder that did not exist at startup was picked up as
        soon as it was created. If a new folder stays silent on your system, stop{" "}
        <Code>start</Code> and run it again.
      </p>

      <H2 id="stopping">Stopping it</H2>
      <p>
        Press <Kbd>Ctrl</Kbd>+<Kbd>C</Kbd> in the terminal where it runs. It closes the watcher,
        prints two lines and exits with code 0.
      </p>
      <Pre>{`  Stopping file watcher...
  ✔ Shadow sync stopped. Goodbye! 👋`}</Pre>
      <p>
        Running <DocLink href="/docs/cli-stop">nexus-sync stop</DocLink> from a second terminal
        does not end it. In 0.1.0 that command only prints a confirmation, and it has no way to
        reach another process.
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
                The config file is not valid JSON, or it was saved with a byte order mark. The
                command prints a Node.js stack trace and exits with code 1. The exact wording
                depends on your Node.js version. See{" "}
                <DocLink href="/docs/common-issues">common issues</DocLink>.
              </>
            ),
          },
          {
            term: "Watching: and nothing after it",
            desc: (
              <>
                <Code>watchPaths</Code> is an empty list. The command has nothing to watch, so it
                exits at once with code 0.
              </>
            ),
          },
        ]}
      />

      <H2 id="simulated">Real and simulated</H2>
      <p>
        The watching is real: each line reports an event your file system raised. The sync is
        not. Nothing is uploaded, the <Code>.example</Code> address does not resolve, and the
        number in parentheses is chosen at random for each line.{" "}
        <DocLink href="/docs/shadow-environments">Shadow environments</DocLink> explains what
        the full product does with the same events.
      </p>
    </>
  );
}
