import { Code, Pre } from "@/components/DocPage";
import { DefList, DocLink, ExtLink, H2, Lead, List } from "@/components/docs/prose";
import type { TocItem } from "@/components/docs/prose";

export const toc: TocItem[] = [
  { id: "what", label: "What it is" },
  { id: "primitives", label: "The five primitives" },
  { id: "version", label: "What 0.1.0 is" },
  { id: "demo", label: "The browser demo" },
  { id: "organised", label: "How these docs are organised" },
];

export default function Intro() {
  return (
    <>
      <Lead>
        Nexus-Sync gives every project a cloud environment that mirrors what you run locally. You
        edit files on your machine and the environment reflects each change. The command line tool
        is the way you drive it.
      </Lead>

      <H2 id="what">What it is</H2>
      <p>
        The product is a Shadow Environment: a cloud container that mirrors your full stack, so a
        file you save locally shows up there and a single URL is shared with your team. The CLI is{" "}
        <Code>nexus-sync-cli</Code>, published on{" "}
        <ExtLink href="https://www.npmjs.com/package/nexus-sync-cli">npm</ExtLink> under the MIT
        licence. You install it once and run <Code>nexus-sync</Code> from any project folder. It
        needs no account and no login.
      </p>

      <H2 id="primitives">The five primitives</H2>
      <p>Each primitive maps to one command you already have.</p>
      <DefList
        items={[
          {
            term: "Ephemeral pods",
            desc: (
              <>
                The container a shadow environment runs in, addressed by your project name.{" "}
                <DocLink href="/docs/cli-start">nexus-sync start</DocLink> brings one up while it
                runs. See <DocLink href="/docs/ephemeral-pods">ephemeral pods</DocLink>.
              </>
            ),
          },
          {
            term: "Mirror sync engine",
            desc: (
              <>
                File changes reflected into the environment.{" "}
                <DocLink href="/docs/cli-start">start</DocLink> watches your folders and prints a
                line per event. See <DocLink href="/docs/live-mirroring">live mirroring</DocLink>.
              </>
            ),
          },
          {
            term: "Instant previews",
            desc: (
              <>
                A shareable address for the running environment, shown by{" "}
                <DocLink href="/docs/cli-status">status</DocLink> and{" "}
                <DocLink href="/docs/cli-deploy">deploy</DocLink>. See{" "}
                <DocLink href="/docs/preview-urls">preview URLs</DocLink>.
              </>
            ),
          },
          {
            term: "Live database sandbox",
            desc: (
              <>
                A separate database fork with its own URL from{" "}
                <DocLink href="/docs/cli-db">nexus-sync db sandbox</DocLink>. See{" "}
                <DocLink href="/docs/database-sandbox">the database sandbox</DocLink>.
              </>
            ),
          },
          {
            term: "Multiplayer collaboration",
            desc: (
              <>
                A join link for a teammate from{" "}
                <DocLink href="/docs/cli-collab">nexus-sync collab invite</DocLink>. See{" "}
                <DocLink href="/docs/multiplayer">multiplayer</DocLink>.
              </>
            ),
          },
        ]}
      />

      <H2 id="version">What 0.1.0 is</H2>
      <p>
        Version 0.1.0 is a simulation. The commands print realistic output and the file watching is
        real, but nothing leaves your machine. No pod or container exists, no file is uploaded, no
        database is cloned, no email is sent, and no deploy happens. Every{" "}
        <Code>.nexus-sync.example</Code> address is a reserved example domain that does not resolve.
      </p>
      <p>Two things are real in 0.1.0:</p>
      <List>
        <li>
          Reading and writing <Code>.nexus/config.json</Code>, the only file the CLI touches.
        </li>
        <li>
          Watching the folders in your config and reporting each change while{" "}
          <DocLink href="/docs/cli-start">start</DocLink> runs.
        </li>
      </List>
      <p>
        Everything else, including sync, live URLs, latency, sandboxes, invites, tests and deploys,
        is simulated. <DocLink href="/docs/shadow-environments">Shadow environments</DocLink>{" "}
        explains the model in one place.
      </p>

      <H2 id="demo">The browser demo</H2>
      <p>
        The <DocLink href="/start">/start</DocLink> page on this site walks through the full product
        flow in the browser, including the branch-based preview URLs. That demo is part of the
        website, not the CLI. The CLI does what the pages under CLI reference describe.
      </p>

      <H2 id="organised">How these docs are organised</H2>
      <p>Start here, then follow the section that fits what you are doing.</p>
      <List>
        <li>
          Getting started: <DocLink href="/docs/quickstart">quickstart</DocLink>,{" "}
          <DocLink href="/docs/install-cli">installing the CLI</DocLink> and{" "}
          <DocLink href="/docs/first-environment">your first environment</DocLink>.
        </li>
        <li>
          Core concepts and features: what each primitive does and what 0.1.0 does with it.
        </li>
        <li>
          CLI reference: one page per command, plus the{" "}
          <DocLink href="/docs/config-reference">config reference</DocLink> and{" "}
          <DocLink href="/docs/output-reference">output and exit codes</DocLink>.
        </li>
      </List>
      <p>
        Every command first prints a blank line and <Code>✦ Nexus-Sync</Code>, like this:
      </p>
      <Pre>{`✦ Nexus-Sync`}</Pre>
    </>
  );
}
