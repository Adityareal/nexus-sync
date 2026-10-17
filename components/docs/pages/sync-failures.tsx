import { Code, Pre } from "@/components/DocPage";
import { DefList, DocLink, H2, Kbd, Lead } from "@/components/docs/prose";
import type { TocItem } from "@/components/docs/prose";

export const toc: TocItem[] = [
  { id: "expected", label: "What a working sync looks like" },
  { id: "wrong-folder", label: "Wrong folder" },
  { id: "outside-watch", label: "File outside watchPaths" },
  { id: "not-reported", label: "Events that never print" },
  { id: "empty", label: "Empty watchPaths" },
  { id: "polling", label: "Network drives, containers and WSL" },
  { id: "watcher-errors", label: "Watcher error lines" },
  { id: "inotify", label: "Linux watch limit" },
];

export default function SyncFailures() {
  return (
    <>
      <Lead>
        When <Code>start</Code> runs but saving a file prints nothing, the watcher is almost
        always looking somewhere other than where you are editing. Work through the causes below
        in order.
      </Lead>

      <H2 id="expected">What a working sync looks like</H2>
      <p>
        A running <DocLink href="/docs/cli-start">start</DocLink> prints a line the moment a
        watched file changes. If you see the banner but no event lines after you save, the sync
        is not failing in the network sense. The file you touched is not one the watcher is
        looking at.
      </p>
      <Pre>{`[12:04:31] ✔ Synced  src/index.js  →  shadow (28ms)`}</Pre>

      <H2 id="wrong-folder">Wrong folder</H2>
      <p>
        The CLI reads <Code>.nexus/config.json</Code> from the current folder only. Run{" "}
        <Code>start</Code> from the project root that holds <Code>.nexus/</Code>. Started from a
        subfolder, the command reports no config and exits:
      </p>
      <Pre>{`  ✗ No config found. Run \`nexus-sync init\` first.`}</Pre>
      <p>
        Watched paths are resolved relative to the folder you ran the command in, so running
        from the wrong place also points the watcher at the wrong tree.
      </p>

      <H2 id="outside-watch">File outside watchPaths</H2>
      <p>
        The watcher only sees files under the folders listed in <Code>watchPaths</Code>. When
        that field is absent, the defaults are <Code>src/</Code>, <Code>app/</Code>,{" "}
        <Code>pages/</Code> and <Code>api/</Code>. A file in the project root, or in a folder
        you did not list, raises no line.
      </p>
      <p>
        Check the <Code>Watching:</Code> line the banner prints. It lists the exact folders in
        effect. If the folder you are editing is missing, add it to <Code>watchPaths</Code> in
        the config. See <DocLink href="/docs/config-reference">config reference</DocLink>.
      </p>

      <H2 id="not-reported">Events that never print</H2>
      <p>
        Some changes produce no line by design, so their silence is not a fault.
      </p>
      <DefList
        items={[
          {
            term: "Files that already existed",
            desc: "Only changes after start begins are announced. The existing tree is not listed at startup.",
          },
          {
            term: "New folders on their own",
            desc: "A folder is reported through the first file you create inside it, not when the folder appears.",
          },
          {
            term: "Ignored paths",
            desc: (
              <>
                Anything under <Code>node_modules</Code>, <Code>.git</Code> or{" "}
                <Code>.nexus</Code> is ignored at any depth.
              </>
            ),
          },
          {
            term: "Atomic saves",
            desc: "An editor that writes a temp file and renames it is reported as one change on Windows and Linux.",
          },
        ]}
      />
      <p>
        A watched folder created after <Code>start</Code> began was picked up as soon as its
        first file appeared in our test on Windows. If a new folder stays silent on your system,
        press <Kbd>Ctrl</Kbd>+<Kbd>C</Kbd> and run <Code>start</Code> again.
      </p>

      <H2 id="empty">Empty watchPaths</H2>
      <p>
        An empty <Code>watchPaths</Code> list gives the watcher nothing to watch. The command
        prints the banner with an empty <Code>Watching:</Code> line and exits at once with code
        0. If <Code>start</Code> returns to the prompt immediately, check the config for an empty
        list.
      </p>
      <Pre>{`  Watching: 
  ✦ Shadow live at: https://my-app.nexus-sync.example`}</Pre>

      <H2 id="polling">Network drives, containers and WSL</H2>
      <p>
        The watcher uses the operating system&apos;s native file events. Those events do not cross
        some boundaries: a network or mapped drive, a bind mount into a container, or files on
        the Windows filesystem edited from inside WSL. Save a file and see no line in one of
        these setups, switch the watcher to polling.
      </p>
      <Pre>{`CHOKIDAR_USEPOLLING=1 nexus-sync start`}</Pre>
      <p>
        Polling checks for changes on a timer instead of waiting for OS events.{" "}
        <Code>CHOKIDAR_INTERVAL</Code> sets the interval in milliseconds; the default is 100.
        Polling uses more CPU, so raise the interval on a large tree. See{" "}
        <DocLink href="/docs/performance">performance tips</DocLink>.
      </p>

      <H2 id="watcher-errors">Watcher error lines</H2>
      <p>
        A file-system error from the watcher prints a line and the command keeps running:
      </p>
      <Pre>{`  ✗ Watcher error: <message>`}</Pre>
      <p>
        The text comes from the operating system. A permission problem on a specific path is the
        usual cause. The watcher does not stop, so other folders keep reporting.
      </p>

      <H2 id="inotify">Linux watch limit</H2>
      <p>
        On Linux a large tree can exhaust the kernel&apos;s inotify watch allowance, which surfaces
        as <Code>ENOSPC</Code>. Raise the limit, or narrow <Code>watchPaths</Code> so fewer
        folders are watched.
      </p>
      <Pre>sudo sysctl fs.inotify.max_user_watches=524288</Pre>
      <p>
        Narrowing the watched folders is the cheaper fix and helps on every platform. See{" "}
        <DocLink href="/docs/performance">performance tips</DocLink>.
      </p>
    </>
  );
}
