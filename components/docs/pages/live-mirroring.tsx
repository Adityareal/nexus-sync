import { Code, Pre } from "@/components/DocPage";
import { DefList, DocLink, H2, Lead, List } from "@/components/docs/prose";
import type { TocItem } from "@/components/docs/prose";

export const toc: TocItem[] = [
  { id: "what", label: "What it watches" },
  { id: "events", label: "The events it reports" },
  { id: "latency", label: "The latency number" },
  { id: "polling", label: "Polling mode" },
  { id: "simulated", label: "Real and simulated" },
];

export default function LiveMirroring() {
  return (
    <>
      <Lead>
        The mirror sync engine watches your project folders and reports every file you save, add
        or delete. The watching is real. The sync to a shadow environment is simulated in 0.1.0.
      </Lead>

      <H2 id="what">What it watches</H2>
      <p>
        <DocLink href="/docs/cli-start">nexus-sync start</DocLink> watches every file under the
        folders in <Code>watchPaths</Code>, at any depth. When the config has no{" "}
        <Code>watchPaths</Code> field, the defaults are <Code>src/</Code>, <Code>app/</Code>,{" "}
        <Code>pages/</Code> and <Code>api/</Code>. Paths are relative to the folder you ran the
        command in.
      </p>
      <List>
        <li>
          Anything inside <Code>node_modules</Code>, <Code>.git</Code> or <Code>.nexus</Code> is
          ignored, at any depth.
        </li>
        <li>Files in the project root, or in a folder not listed, are not watched.</li>
        <li>
          Folders are not reported on their own. A new folder appears through the first file you
          create in it.
        </li>
        <li>
          Files that already exist when <Code>start</Code> begins are not announced. Only changes
          after that point print a line.
        </li>
        <li>
          Dotfiles are included. A <Code>.env</Code> under a watched folder prints a line with
          its name. The CLI never reads file contents.
        </li>
      </List>
      <p>
        An empty <Code>watchPaths</Code> list gives the engine nothing to watch, so{" "}
        <Code>start</Code> prints an empty <Code>Watching:</Code> line and exits at once. When a
        save prints nothing you expected, see{" "}
        <DocLink href="/docs/sync-failures">environment failed to sync</DocLink>.
      </p>

      <H2 id="events">The events it reports</H2>
      <p>One line per event, prefixed with your local time on a 24-hour clock.</p>
      <Pre>{`[12:04:31] ✔ Synced  src/index.js  →  shadow (28ms)
[12:04:33] ✔ Added   src/lib/util.ts  →  shadow (30ms)
[12:04:40] ⚠ Removed src/lib/old.ts`}</Pre>
      <DefList
        items={[
          { term: "✔ Synced", desc: "An existing file changed." },
          { term: "✔ Added", desc: "A new file appeared, including the new name of a rename." },
          {
            term: "⚠ Removed",
            desc: "A file was deleted, or renamed away. A rename prints Added for the new name and Removed for the old one.",
          },
        ]}
      />
      <p>
        Editors that save atomically, writing a temporary file and swapping it in, are reported
        as a single change on Windows and Linux. A watcher error prints a line that begins{" "}
        <Code>✗ Watcher error:</Code> and the command keeps running.
      </p>

      <H2 id="latency">The latency number</H2>
      <p>
        The number in parentheses, such as <Code>(28ms)</Code>, is a random value from 20 to 60.
        It is generated for each line and measures nothing. No transfer happens, so there is no
        real duration to report. Do not benchmark with it. For a measured command time, see{" "}
        <DocLink href="/docs/performance">performance tips</DocLink>.
      </p>

      <H2 id="polling">Polling mode</H2>
      <p>
        The engine uses your operating system file-system events by default. When those do not
        arrive, for example on a network drive, inside a container, or when a Windows file is
        edited from WSL, switch to polling with the environment variables the watcher honours.
      </p>
      <DefList
        items={[
          {
            term: "CHOKIDAR_USEPOLLING=1",
            desc: "Poll the file system on an interval instead of waiting for OS events.",
          },
          {
            term: "CHOKIDAR_INTERVAL=300",
            desc: "The poll interval in milliseconds. The default is 100.",
          },
        ]}
      />
      <p>
        Polling costs CPU in proportion to how many files you watch, so keep{" "}
        <Code>watchPaths</Code> narrow. On Linux a large tree can reach the inotify watch limit
        and print an <Code>ENOSPC</Code> error; raise{" "}
        <Code>fs.inotify.max_user_watches</Code>.
      </p>

      <H2 id="simulated">Real and simulated</H2>
      <p>
        Each line reports an event your file system raised, so the engine is a real file watcher.
        The arrow to <Code>shadow</Code> and the address are the simulated part. Nothing is
        uploaded and the <Code>.nexus-sync.example</Code> address does not resolve. What the full
        product does with these same events is described in{" "}
        <DocLink href="/docs/shadow-environments">shadow environments</DocLink>.
      </p>
    </>
  );
}
