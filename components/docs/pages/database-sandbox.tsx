import { Code, Pre } from "@/components/DocPage";
import { DefList, DocLink, H2, Lead, List } from "@/components/docs/prose";
import type { TocItem } from "@/components/docs/prose";

export const toc: TocItem[] = [
  { id: "concept", label: "What it is for" },
  { id: "command", label: "The command" },
  { id: "url", label: "The sandbox URL" },
  { id: "simulated", label: "Real and simulated" },
];

export default function DatabaseSandbox() {
  return (
    <>
      <Lead>
        A database sandbox is a disposable copy of your production schema with the sensitive
        columns anonymized. You get one by running <Code>nexus-sync db sandbox</Code>.
      </Lead>

      <H2 id="concept">What it is for</H2>
      <p>
        The idea is to develop and test against data shaped like production without touching the
        real rows. The schema matches, personal fields are masked, and the copy is yours to
        change or throw away. In the full product this is a forked database you connect your app
        to while you work.
      </p>

      <H2 id="command">The command</H2>
      <p>
        Run it from the folder that holds your{" "}
        <DocLink href="/docs/config-reference">.nexus/config.json</DocLink>. It needs a config;
        without one it prints <Code>✗ No config found</Code> and exits with code 1.
      </p>
      <Pre>nexus-sync db sandbox</Pre>
      <p>
        It runs for about three seconds, drawing two progress bars, then prints the sandbox
        address.
      </p>
      <Pre>{`  → Cloning production schema...  ████████████████████████████████████████ 100%
  → Anonymizing PII fields...     ████████████████████████████████████████ 100%

  ✔ Sandbox ready at: postgres://sandbox.nexus-sync.example:5432/my-app_sandbox`}</Pre>
      <p>
        The only subcommand under <Code>db</Code> is <Code>sandbox</Code>. Running{" "}
        <Code>nexus-sync db</Code> on its own prints the help for <Code>db</Code> and exits with
        code 1.
      </p>

      <H2 id="url">The sandbox URL</H2>
      <p>
        The address is a Postgres connection string built from your project name:{" "}
        <Code>postgres://sandbox.nexus-sync.example:5432/&lt;projectName&gt;_sandbox</Code>.
      </p>
      <DefList
        items={[
          { term: "postgres://", desc: "The scheme a Postgres client expects." },
          {
            term: "sandbox.nexus-sync.example",
            desc: "The host. It is a reserved example domain and does not resolve.",
          },
          { term: "5432", desc: "The default Postgres port." },
          {
            term: "my-app_sandbox",
            desc: (
              <>
                The database name, your <Code>projectName</Code> with <Code>_sandbox</Code>{" "}
                appended.
              </>
            ),
          },
        ]}
      />
      <p>
        There is no user or password in the string. The same address comes back on every run.
      </p>

      <H2 id="simulated">Real and simulated</H2>
      <p>
        In 0.1.0 the command prints the bars and the address and nothing else happens. No schema
        is cloned, no fields are anonymized, and nothing is listening on that host, so a Postgres
        client cannot connect to it.
      </p>
      <List>
        <li>Your real database is never read, copied or changed by this command.</li>
        <li>
          Do not point <Code>DATABASE_URL</Code> at the printed address. It will not connect. See{" "}
          <DocLink href="/docs/databases">database connections</DocLink>.
        </li>
        <li>
          Without a terminal, as in CI or a pipe, the two bars are not drawn, so the labels run
          together on one line before the final line.
        </li>
      </List>
      <p>
        <DocLink href="/docs/shadow-environments">Shadow environments</DocLink> explains which
        parts of the product are simulated in this release.
      </p>
    </>
  );
}
