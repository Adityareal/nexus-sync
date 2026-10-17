import { Code, Pre } from "@/components/DocPage";
import { DefList, DocLink, H2, Lead, List } from "@/components/docs/prose";
import type { TocItem } from "@/components/docs/prose";

export const toc: TocItem[] = [
  { id: "usage", label: "Usage" },
  { id: "output", label: "What it prints" },
  { id: "link", label: "The invite link" },
  { id: "errors", label: "Errors and exit codes" },
  { id: "simulated", label: "Real and simulated" },
];

export default function CliCollab() {
  return (
    <>
      <Lead>
        Groups the collaboration commands. The one command it carries is{" "}
        <Code>collab invite</Code>, which prints a join link for a teammate.
      </Lead>

      <H2 id="usage">Usage</H2>
      <Pre>nexus-sync collab invite &lt;email&gt;</Pre>
      <p>
        The email argument is required. Running <Code>nexus-sync collab</Code> on its own prints
        the group help to standard error and exits with code 1. The only subcommand is{" "}
        <Code>invite</Code>, and the only option anywhere is <Code>-h</Code>, <Code>--help</Code>.
        Run it from the folder that holds <Code>.nexus/config.json</Code>, which{" "}
        <DocLink href="/docs/cli-init">nexus-sync init</DocLink> creates.
      </p>

      <H2 id="output">What it prints</H2>
      <p>Two lines, then the command exits with code 0.</p>
      <Pre>{`✦ Nexus-Sync

  ✔ Invite sent to teammate@example.com
  They can join at: https://my-app.nexus-sync.example?collab=1d471c2ec0372814`}</Pre>
      <p>
        The first line echoes the address you passed. The second is the join link for your
        environment, with a token on the end.
      </p>

      <H2 id="link">The invite link</H2>
      <DefList
        items={[
          {
            term: "https://my-app.nexus-sync.example",
            desc: (
              <>
                Your environment address, built from <Code>projectName</Code>. The same address{" "}
                <DocLink href="/docs/cli-start">start</DocLink> and{" "}
                <DocLink href="/docs/cli-status">status</DocLink> print.
              </>
            ),
          },
          {
            term: "?collab=1d471c2ec0372814",
            desc: "A 16 character hex token, new on every run. It is generated locally and never stored or checked.",
          },
        ]}
      />
      <p>
        The address is not validated. Passing <Code>not-an-email</Code> prints{" "}
        <Code>Invite sent to not-an-email</Code>. Extra arguments are ignored, so{" "}
        <Code>collab invite a@example.com b@example.com</Code> invites only the first.
      </p>

      <H2 id="errors">Errors and exit codes</H2>
      <DefList
        items={[
          {
            term: "error: missing required argument 'email'",
            desc: "You ran collab invite with no address. Printed to standard error, exit code 1.",
          },
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
            term: "nexus-sync collab with no subcommand",
            desc: "Prints the collab group help to standard error and exits with code 1.",
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
        Every message and exit code is listed in the{" "}
        <DocLink href="/docs/output-reference">output reference</DocLink>.
      </p>

      <H2 id="simulated">Real and simulated</H2>
      <p>
        In 0.1.0 no email is sent and no invite is recorded. The command formats a link and
        prints it.
      </p>
      <List>
        <li>The address is not checked against a mailbox or a format.</li>
        <li>
          The token is random bytes generated on your machine. It is not saved, so the link
          grants nothing and opening it reaches nothing.
        </li>
        <li>
          To share work with a teammate today, use your own code host or a pairing tool and run
          both copies locally.
        </li>
      </List>
      <p>
        <DocLink href="/docs/multiplayer">Multiplayer</DocLink> covers the collaboration model
        the full product aims at.
      </p>
    </>
  );
}
