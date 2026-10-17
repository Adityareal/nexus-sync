import { Code, Pre } from "@/components/DocPage";
import { DefList, DocLink, H2, Lead, List } from "@/components/docs/prose";
import type { TocItem } from "@/components/docs/prose";

export const toc: TocItem[] = [
  { id: "usage", label: "Usage" },
  { id: "output", label: "What it prints" },
  { id: "url", label: "The sandbox URL" },
  { id: "errors", label: "Errors and exit codes" },
  { id: "simulated", label: "Real and simulated" },
];

export default function CliDb() {
  return (
    <>
      <Lead>
        Groups the database commands. The one command it carries is{" "}
        <Code>db sandbox</Code>, which prints a connection string for an isolated copy of your
        data.
      </Lead>

      <H2 id="usage">Usage</H2>
      <Pre>nexus-sync db sandbox</Pre>
      <p>
        Running <Code>nexus-sync db</Code> on its own prints the group help to standard error
        and exits with code 1. The only subcommand is <Code>sandbox</Code>, and the only option
        anywhere is <Code>-h</Code>, <Code>--help</Code>. Run it from the folder that holds{" "}
        <Code>.nexus/config.json</Code>, which{" "}
        <DocLink href="/docs/cli-init">nexus-sync init</DocLink> creates.
      </p>

      <H2 id="output">What it prints</H2>
      <p>
        Two progress bars fill in order, each to 100 percent, then one line with the sandbox
        address. The whole run takes about three and a half seconds.
      </p>
      <Pre>{`✦ Nexus-Sync

  → Cloning production schema...  ████████████████████████████████████████ 100%
  → Anonymizing PII fields...     ████████████████████████████████████████ 100%

  ✔ Sandbox ready at: postgres://sandbox.nexus-sync.example:5432/my-app_sandbox`}</Pre>
      <p>
        The two bars draw only when the output is a terminal. In CI or a pipe they do not draw,
        so the two labels run together on one line before the final line.
      </p>

      <H2 id="url">The sandbox URL</H2>
      <p>
        The address follows one pattern, with your project name in the database segment.
      </p>
      <Pre>postgres://sandbox.nexus-sync.example:5432/&lt;projectName&gt;_sandbox</Pre>
      <DefList
        items={[
          { term: "postgres://", desc: "The Postgres connection scheme." },
          {
            term: "sandbox.nexus-sync.example",
            desc: (
              <>
                The host. <Code>.example</Code> is a reserved domain that does not resolve. See{" "}
                <DocLink href="/docs/preview-urls">preview URLs</DocLink>.
              </>
            ),
          },
          { term: "5432", desc: "The default Postgres port." },
          {
            term: "<projectName>_sandbox",
            desc: (
              <>
                The database name, built from <Code>projectName</Code> in your config. A missing
                name falls back to <Code>my-app</Code>.
              </>
            ),
          },
        ]}
      />
      <p>
        The address is the same on every run. There is no user or password in it.
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
            term: "nexus-sync db with no subcommand",
            desc: "Prints the db group help to standard error and exits with code 1.",
          },
          {
            term: "SyntaxError about JSON",
            desc: (
              <>
                The config file is not valid JSON, or it was saved with a byte order mark. The
                command prints a Node.js stack trace and exits with code 1. See{" "}
                <DocLink href="/docs/common-issues">common issues</DocLink>.
              </>
            ),
          },
        ]}
      />
      <p>
        The full list of messages and exit codes is in the{" "}
        <DocLink href="/docs/output-reference">output reference</DocLink>.
      </p>

      <H2 id="simulated">Real and simulated</H2>
      <p>
        In 0.1.0 nothing is cloned and no PII is touched. The bars are an animation on a timer,
        the address is a fixed string, and nothing listens at that host.
      </p>
      <List>
        <li>Your real database is not read, copied or changed.</li>
        <li>
          Do not point <Code>DATABASE_URL</Code> at the sandbox address. It does not resolve.
        </li>
        <li>
          To work with a real copy today, create a database from your own backup or your
          provider&apos;s branching feature, then use that URL.
        </li>
      </List>
      <p>
        <DocLink href="/docs/database-sandbox">Database sandbox</DocLink> covers the concept the
        full product aims at.
      </p>
    </>
  );
}
