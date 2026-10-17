import { Code, Pre } from "@/components/DocPage";
import { DefList, DocLink, H2, Lead, List } from "@/components/docs/prose";
import type { TocItem } from "@/components/docs/prose";

export const toc: TocItem[] = [
  { id: "sandbox-url", label: "The sandbox URL" },
  { id: "anatomy", label: "URL anatomy" },
  { id: "do-not-connect", label: "Do not point your app at it" },
  { id: "your-database", label: "Your own database" },
];

export default function Databases() {
  return (
    <>
      <Lead>
        The <DocLink href="/docs/cli-db">db sandbox</DocLink> command prints a Postgres
        connection URL. In 0.1.0 nothing listens at that address, and your real database is never
        read or changed.
      </Lead>

      <H2 id="sandbox-url">The sandbox URL</H2>
      <p>
        Run <Code>nexus-sync db sandbox</Code> from a folder with a config. It shows two progress
        bars for a few seconds, then prints one address and exits 0.
      </p>
      <Pre>{`  → Cloning production schema...  ████████████████████████████████████████ 100%
  → Anonymizing PII fields...     ████████████████████████████████████████ 100%

  ✔ Sandbox ready at: postgres://sandbox.nexus-sync.example:5432/my-app_sandbox`}</Pre>
      <p>
        No schema is cloned and no data is anonymized. The URL is the same on every run for a
        given project name. The product concept is an anonymized fork of production data; that
        work is simulated here. See <DocLink href="/docs/database-sandbox">database
        sandbox</DocLink> for the concept.
      </p>

      <H2 id="anatomy">URL anatomy</H2>
      <p>
        The address follows the Postgres connection scheme. It is built entirely from the
        project name in your config.
      </p>
      <Pre>{`postgres://sandbox.nexus-sync.example:5432/my-app_sandbox`}</Pre>
      <DefList
        items={[
          { term: "postgres://", desc: "The Postgres URI scheme. No other database engine is offered." },
          { term: "sandbox.nexus-sync.example", desc: <>A host under the reserved <Code>.example</Code> domain. It never resolves.</> },
          { term: ":5432", desc: "The default Postgres port. Nothing listens there." },
          {
            term: "/my-app_sandbox",
            desc: (
              <>
                The database name: your <Code>projectName</Code> with <Code>_sandbox</Code>{" "}
                appended.
              </>
            ),
          },
        ]}
      />
      <p>
        There is no username and no password in the URL, because there is no server to
        authenticate against.
      </p>

      <H2 id="do-not-connect">Do not point your app at it</H2>
      <p>
        The host is under <Code>.example</Code>, which is reserved by RFC 2606 and does not
        resolve. A client that tries to connect fails to find the host. Do not set{" "}
        <Code>DATABASE_URL</Code> to this address and do not run a migration against it. It is a
        printed string, not a live endpoint.
      </p>
      <List>
        <li>The URL is generated, not provisioned.</li>
        <li>No port is open and no credentials exist.</li>
        <li>Connecting to it fails at DNS resolution.</li>
      </List>

      <H2 id="your-database">Your own database</H2>
      <p>
        The CLI never reads your application&apos;s database configuration and never connects to
        a database. It watches files and writes <Code>.nexus/config.json</Code>, nothing else.
        Your real <Code>DATABASE_URL</Code>, your migrations and your data are untouched. For a
        real sandbox today, create one with your database&apos;s own tooling, for example{" "}
        <Code>pg_dump</Code> and <Code>createdb</Code>, or a managed branch feature from your
        provider. A per-branch walkthrough is in{" "}
        <DocLink href="/docs/tutorial-sandbox">a database sandbox per branch</DocLink>.
      </p>
    </>
  );
}
