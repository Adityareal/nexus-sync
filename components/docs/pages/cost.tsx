import { Code, Pre } from "@/components/DocPage";
import { DefList, DocLink, ExtLink, H2, Lead, List } from "@/components/docs/prose";
import type { TocItem } from "@/components/docs/prose";

export const toc: TocItem[] = [
  { id: "cli-is-free", label: "The CLI is free" },
  { id: "plans", label: "The plans on the site" },
  { id: "local-cost", label: "What it costs to run" },
  { id: "watcher-cost", label: "Watcher cost" },
  { id: "polling-cost", label: "Polling cost" },
];

export default function Cost() {
  return (
    <>
      <Lead>
        The <Code>nexus-sync</Code> CLI is free and open source, and it needs no account. The
        paid plans listed on the site describe the hosted product, not the command-line tool.
      </Lead>

      <H2 id="cli-is-free">The CLI is free</H2>
      <p>
        The package is MIT licensed. You install it, run every command and never sign in. Nothing
        in 0.1.0 is metered, billed or rate limited, because nothing leaves your machine. The CLI
        makes no network requests at all; see{" "}
        <DocLink href="/docs/security">the security model</DocLink>.
      </p>

      <H2 id="plans">The plans on the site</H2>
      <p>
        The pricing listed on the homepage is for the hosted product. These are the figures as
        published; the CLI does not read, enforce or report any of them. For the live list see the{" "}
        <DocLink href="/#pricing">pricing section</DocLink>.
      </p>
      <DefList
        items={[
          {
            term: "Solo",
            desc: "$0. Personal projects, one engineer, public previews.",
          },
          {
            term: "Team",
            desc: "$24 per seat per month. Up to twenty-five engineers, private previews, anonymized data fork.",
          },
          {
            term: "Enterprise",
            desc: "Talk to us. SSO, VPC peering, audit log, dedicated tenancy.",
          },
        ]}
      />
      <p>
        The anonymized data fork maps to the{" "}
        <DocLink href="/docs/database-sandbox">database sandbox</DocLink> command, and VPC peering
        to <DocLink href="/docs/vpc-networking">private networking</DocLink>. Neither is
        configured through the CLI in 0.1.0.
      </p>

      <H2 id="local-cost">What it costs to run</H2>
      <p>
        The only cost of 0.1.0 is local machine resources. Most commands start in about half a
        second, do their work and exit. <DocLink href="/docs/cli-start">start</DocLink> is the one
        that keeps running, so it is the one with an ongoing cost.
      </p>
      <List>
        <li>One Node process per running <Code>start</Code>.</li>
        <li>Idle memory for a file watcher, which grows with the number of files watched.</li>
        <li>No disk cost beyond the install and the small config file.</li>
      </List>

      <H2 id="watcher-cost">Watcher cost</H2>
      <p>
        The file watcher holds a handle for each watched file and folder. A wide{" "}
        <Code>watchPaths</Code> over a large tree uses more memory and, on Linux, more inotify
        watches. Keep the list narrow and point it at source folders, not build output. See{" "}
        <DocLink href="/docs/performance">performance tips</DocLink> for the specifics and the
        inotify limit.
      </p>

      <H2 id="polling-cost">Polling cost</H2>
      <p>
        When you set <Code>CHOKIDAR_USEPOLLING=1</Code>, for a network drive, container or VM, the
        watcher checks files on a timer instead of waiting for OS events. Polling uses more CPU,
        and more as the tree grows. The default interval is 100 ms; raise it with{" "}
        <Code>CHOKIDAR_INTERVAL</Code> to trade latency for lower CPU.
      </p>
      <Pre>{`CHOKIDAR_USEPOLLING=1 CHOKIDAR_INTERVAL=300 nexus-sync start`}</Pre>
      <p>
        The CLI itself is free either way. The cost is your own CPU time while the watcher runs.
        The source and package links, if you want to confirm the licence, are on{" "}
        <ExtLink href="https://github.com/Adityareal/nexus-sync-cli">GitHub</ExtLink> and{" "}
        <ExtLink href="https://www.npmjs.com/package/nexus-sync-cli">npm</ExtLink>.
      </p>
    </>
  );
}
