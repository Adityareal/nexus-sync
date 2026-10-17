import { Code, Pre } from "@/components/DocPage";
import { DocLink, H2, Lead, List } from "@/components/docs/prose";
import type { TocItem } from "@/components/docs/prose";

export const toc: TocItem[] = [
  { id: "cost", label: "Where the cost is" },
  { id: "narrow", label: "Keep watchPaths narrow" },
  { id: "generated", label: "Generated output folders" },
  { id: "polling", label: "Polling cost" },
  { id: "inotify", label: "Linux watch limit" },
  { id: "latency", label: "The latency number is not a measurement" },
  { id: "timings", label: "Command run times" },
];

export default function Performance() {
  return (
    <>
      <Lead>
        The CLI runs as one Node process that watches your files. Its cost grows with the number
        of files under <Code>watchPaths</Code>, so the main lever is watching fewer of them.
      </Lead>

      <H2 id="cost">Where the cost is</H2>
      <p>
        <DocLink href="/docs/cli-start">start</DocLink> is the only long-running command. It
        holds a watcher open on every file under <Code>watchPaths</Code> until you stop it. The
        other commands start in about half a second and exit. There is no background daemon and
        no network traffic, so the only resources in play are the watcher&apos;s memory and CPU on
        your own machine.
      </p>

      <H2 id="narrow">Keep watchPaths narrow</H2>
      <p>
        List only the folders you edit. Each extra folder adds every file beneath it to the
        watch set. Watching the whole project root pulls in build output and caches you do not
        edit, which costs memory for no benefit.
      </p>
      <List>
        <li>Point watchPaths at source folders, not the project root.</li>
        <li>Drop a folder from the list when you are not working in it.</li>
        <li>Give each project the paths it actually uses rather than a shared default.</li>
      </List>
      <p>
        Set the list in <Code>.nexus/config.json</Code>. See{" "}
        <DocLink href="/docs/config-reference">config reference</DocLink>.
      </p>

      <H2 id="generated">Generated output folders</H2>
      <p>
        The watcher ignores <Code>node_modules</Code>, <Code>.git</Code> and <Code>.nexus</Code>{" "}
        at any depth. It does not ignore build output. A folder such as <Code>.next</Code>,{" "}
        <Code>dist</Code>, <Code>build</Code> or <Code>coverage</Code> that sits inside a watched
        folder is watched, and a build that rewrites hundreds of files there prints a line for
        each one.
      </p>
      <p>
        Keep generated folders out of <Code>watchPaths</Code>. If a build writes into a folder
        you do watch, move the output elsewhere or point the watch at the source subfolders
        instead of their parent.
      </p>

      <H2 id="polling">Polling cost</H2>
      <p>
        By default the watcher waits for operating-system file events, which cost almost nothing
        while idle. Polling is different. With <Code>CHOKIDAR_USEPOLLING=1</Code> the watcher
        checks every file on a timer, so CPU use rises with the number of files and the poll
        rate.
      </p>
      <Pre>{`CHOKIDAR_USEPOLLING=1 CHOKIDAR_INTERVAL=300 nexus-sync start`}</Pre>
      <p>
        Use polling only where native events do not arrive, such as a network drive or a bind
        mount. Raise <Code>CHOKIDAR_INTERVAL</Code> (the interval in milliseconds, default 100)
        to trade latency for lower CPU. See{" "}
        <DocLink href="/docs/sync-failures">sync failures</DocLink>.
      </p>

      <H2 id="inotify">Linux watch limit</H2>
      <p>
        On Linux the kernel caps how many files inotify can watch. A large tree can exceed it and
        the watcher reports <Code>ENOSPC</Code>. Narrowing <Code>watchPaths</Code> is the first
        fix. Raise the kernel limit if you still need more.
      </p>
      <Pre>sudo sysctl fs.inotify.max_user_watches=524288</Pre>

      <H2 id="latency">The latency number is not a measurement</H2>
      <p>
        Each sync line ends with a figure such as <Code>(28ms)</Code>, and{" "}
        <DocLink href="/docs/cli-status">status</DocLink> shows a <Code>Latency</Code> value.
        Both are random numbers between 20 and 60, regenerated every time. In 0.1.0 nothing is
        sent anywhere, so there is no round trip to measure. Do not treat these figures as a
        benchmark or compare them across runs.
      </p>

      <H2 id="timings">Command run times</H2>
      <p>
        The timed commands run on a fixed schedule rather than on real work.{" "}
        <DocLink href="/docs/cli-test">test</DocLink> takes about three seconds because one check
        has a built-in delay. <DocLink href="/docs/cli-deploy">deploy</DocLink> prints a deploy
        time of about 2.4 seconds, which is how long its own spinners ran, not a build or upload.{" "}
        <DocLink href="/docs/cli-db">db sandbox</DocLink> takes about three and a half seconds
        while its progress bars fill. These times reflect the simulation, not the size of your
        project.
      </p>
    </>
  );
}
