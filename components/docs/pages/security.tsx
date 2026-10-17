import { Code, Pre } from "@/components/DocPage";
import { DefList, DocLink, ExtLink, H2, Lead, List } from "@/components/docs/prose";
import type { TocItem } from "@/components/docs/prose";

export const toc: TocItem[] = [
  { id: "reads-writes", label: "What it reads and writes" },
  { id: "network", label: "No network, no telemetry" },
  { id: "install", label: "No install scripts" },
  { id: "tokens", label: "Invite tokens" },
  { id: "dependencies", label: "Dependencies" },
  { id: "audit", label: "Auditing it yourself" },
  { id: "reporting", label: "Reporting a problem" },
];

export default function Security() {
  return (
    <>
      <Lead>
        The <Code>nexus-sync</Code> CLI touches one file, opens no connections and sends no
        telemetry. You can verify every claim on this page from the published source.
      </Lead>

      <H2 id="reads-writes">What it reads and writes</H2>
      <p>
        The CLI reads <Code>.nexus/config.json</Code> in the current folder and listens for
        file-system events under the folders in <Code>watchPaths</Code>. It writes one file, the
        same <Code>.nexus/config.json</Code>, created by{" "}
        <DocLink href="/docs/cli-init">init</DocLink>. Nothing else on disk is read or changed.
      </p>
      <DefList
        items={[
          { term: "Reads", desc: ".nexus/config.json, and file-system change events for watched folders." },
          { term: "Writes", desc: ".nexus/config.json, which init creates. No other file is modified." },
          {
            term: "File contents",
            desc: "Never read. start reports that a file changed, not what changed inside it.",
          },
        ]}
      />

      <H2 id="network">No network, no telemetry</H2>
      <p>
        No command opens a socket, resolves a host or reports usage. The live URL, sandbox URL
        and collab link are reserved example addresses that do not resolve. What the commands
        simulate, rather than do, is listed under{" "}
        <DocLink href="/docs/shadow-environments">shadow environments</DocLink>. The CLI needs no
        account and stores no credentials.
      </p>

      <H2 id="install">No install scripts</H2>
      <p>
        The package has no <Code>postinstall</Code> or other lifecycle scripts, so{" "}
        <Code>npm install</Code> runs no code from it. It ships 14 files, about 6.7 MB installed.
        You can install with scripts disabled and the CLI still works.
      </p>
      <Pre>npm install -g nexus-sync-cli --ignore-scripts</Pre>

      <H2 id="tokens">Invite tokens</H2>
      <p>
        <DocLink href="/docs/cli-collab">collab invite</DocLink> prints a join link with a token
        on the end. The token is 16 hexadecimal characters, generated locally with Node&apos;s{" "}
        <Code>crypto.randomBytes</Code>. A new token is produced every run. It is never stored,
        sent or checked, because 0.1.0 sends no email and validates no address. The token is part
        of the printed string and nothing more.
      </p>
      <Pre>{`  ✔ Invite sent to teammate@example.com
  They can join at: https://my-app.nexus-sync.example?collab=1d471c2ec0372814`}</Pre>

      <H2 id="dependencies">Dependencies</H2>
      <p>
        The install pulls 82 packages in total. The CLI&apos;s own runtime dependencies are small and
        widely used.
      </p>
      <List>
        <li><Code>commander</Code> for argument parsing</li>
        <li><Code>chalk</Code> for colour</li>
        <li><Code>ora</Code> for spinners</li>
        <li><Code>cli-progress</Code> for progress bars</li>
        <li><Code>chokidar</Code> for file watching</li>
        <li><Code>inquirer</Code> for the init prompts</li>
      </List>

      <H2 id="audit">Auditing it yourself</H2>
      <p>
        You do not have to trust this page. Inspect the package or read the source.
      </p>
      <Pre>{`npm pack nexus-sync-cli
tar -tf nexus-sync-cli-0.1.0.tgz`}</Pre>
      <p>
        <Code>npm pack</Code> downloads the tarball without installing it, so you can list and
        read its 14 files before running anything. The full source is on{" "}
        <ExtLink href="https://github.com/Adityareal/nexus-sync-cli">GitHub</ExtLink>, and the
        package page is on{" "}
        <ExtLink href="https://www.npmjs.com/package/nexus-sync-cli">npm</ExtLink>.
      </p>

      <H2 id="reporting">Reporting a problem</H2>
      <p>
        There is no formal security program and no SOC 2 report for 0.1.0. Report a problem on{" "}
        <ExtLink href="https://github.com/Adityareal/nexus-sync-cli/issues">GitHub issues</ExtLink>.
        Include the CLI and Node versions, your OS and shell, and the command and its output.
        Never paste secrets or private file contents into an issue.
      </p>
    </>
  );
}
