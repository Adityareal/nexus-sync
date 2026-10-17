import { Code, Pre } from "@/components/DocPage";
import { DefList, DocLink, H2, Lead, List } from "@/components/docs/prose";
import type { TocItem } from "@/components/docs/prose";

export const toc: TocItem[] = [
  { id: "concept", label: "What it is for" },
  { id: "invite", label: "Inviting a teammate" },
  { id: "link", label: "The join link" },
  { id: "simulated", label: "Real and simulated" },
];

export default function Multiplayer() {
  return (
    <>
      <Lead>
        Multiplayer collaboration lets a teammate join your environment from one shared link. You
        create an invite with <Code>nexus-sync collab invite</Code>.
      </Lead>

      <H2 id="concept">What it is for</H2>
      <p>
        One engineer runs an environment, invites another, and both work against the same live
        URL. In the full product the link grants a collaborator access to the running environment
        so they can view and edit alongside you.
      </p>

      <H2 id="invite">Inviting a teammate</H2>
      <p>
        Pass the teammate&apos;s email address as the argument. Run it from the folder that holds your{" "}
        <DocLink href="/docs/config-reference">.nexus/config.json</DocLink>; it needs a config.
      </p>
      <Pre>nexus-sync collab invite teammate@example.com</Pre>
      <p>It prints two lines and exits with code 0.</p>
      <Pre>{`  ✔ Invite sent to teammate@example.com
  They can join at: https://my-app.nexus-sync.example?collab=1d471c2ec0372814`}</Pre>
      <DefList
        items={[
          {
            term: "missing required argument 'email'",
            desc: (
              <>
                You ran <Code>collab invite</Code> with no address. Exit code 1.
              </>
            ),
          },
          {
            term: "Extra arguments",
            desc: (
              <>
                Only the first address is used. <Code>collab invite a@x b@x</Code> invites{" "}
                <Code>a@x</Code> and ignores the rest.
              </>
            ),
          },
        ]}
      />

      <H2 id="link">The join link</H2>
      <p>
        The link is your project&apos;s preview address with a <Code>collab</Code> query parameter
        holding a token of 16 hexadecimal characters. The token is generated locally on each run,
        so the link changes every time.{" "}
        <DocLink href="/docs/preview-urls">Preview URLs</DocLink> covers the address itself.
      </p>

      <H2 id="simulated">Real and simulated</H2>
      <p>
        In 0.1.0 the command only prints these lines. Nothing else happens.
      </p>
      <List>
        <li>No email is sent. The address in the output is text, not a message to anyone.</li>
        <li>
          The address is not validated. Any string is accepted and printed back on the first
          line.
        </li>
        <li>
          The token is never stored or checked. It is produced fresh each run and the{" "}
          <Code>.example</Code> address does not resolve, so the link cannot be opened.
        </li>
      </List>
      <p>
        For a step-by-step pairing walkthrough and real alternatives today, see{" "}
        <DocLink href="/docs/tutorial-debugging">collaborative debugging</DocLink>.{" "}
        <DocLink href="/docs/shadow-environments">Shadow environments</DocLink> explains the
        simulation model.
      </p>
    </>
  );
}
