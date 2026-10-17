import { Code, Pre } from "@/components/DocPage";
import { DocLink, ExtLink, H2, Kbd, Lead, Steps } from "@/components/docs/prose";
import type { TocItem } from "@/components/docs/prose";

export const toc: TocItem[] = [
  { id: "flow", label: "The intended flow" },
  { id: "start", label: "Start the environment" },
  { id: "invite", label: "Invite a teammate" },
  { id: "simulated", label: "What 0.1.0 does" },
  { id: "today", label: "Pairing for real today" },
];

export default function TutorialDebugging() {
  return (
    <>
      <Lead>
        Nexus-Sync describes a shared debugging session where a teammate opens the same live URL
        and watches your changes. In 0.1.0 that session is simulated: the invite prints a link
        but sends no email, and the URL does not resolve.
      </Lead>

      <H2 id="flow">The intended flow</H2>
      <p>
        The product idea is that one engineer runs the environment while another joins it from a
        link, so both see the same running stack while you track down a bug. The steps below
        follow that flow and note what each one does in this release.
      </p>
      <Steps>
        <li>Start the environment and keep the watcher running.</li>
        <li>Invite a teammate and share the join link.</li>
        <li>Both of you open the same URL and watch each save.</li>
      </Steps>

      <H2 id="start">Start the environment</H2>
      <p>
        From your project folder, start the watcher. It prints the environment address, built
        from the project name.
      </p>
      <Pre>nexus-sync start</Pre>
      <Pre>{`✦ Nexus-Sync

  Watching: src/, app/, pages/, api/
  ✦ Shadow live at: https://my-app.nexus-sync.example`}</Pre>
      <p>
        Leave it running. Each file you save prints a line, as{" "}
        <DocLink href="/docs/cli-start">the start reference</DocLink> describes. Stop it later
        with <Kbd>Ctrl</Kbd>+<Kbd>C</Kbd>.
      </p>

      <H2 id="invite">Invite a teammate</H2>
      <p>
        In a second terminal, run <DocLink href="/docs/cli-collab">collab invite</DocLink> with
        the teammate address. The email argument is required.
      </p>
      <Pre>nexus-sync collab invite teammate@example.com</Pre>
      <Pre>{`  ✔ Invite sent to teammate@example.com
  They can join at: https://my-app.nexus-sync.example?collab=1d471c2ec0372814`}</Pre>
      <p>
        The <Code>collab</Code> value is a 16-character token generated locally for each run. It
        is never stored or checked, so a new run prints a new token. See{" "}
        <DocLink href="/docs/multiplayer">multiplayer collaboration</DocLink> for the invite
        model.
      </p>

      <H2 id="simulated">What 0.1.0 does</H2>
      <p>
        The command prints the two lines above and exits with code 0. No email is sent. The
        address you typed is not validated, so a value that is not an email still prints as
        given. The join URL uses the reserved <Code>.example</Code> domain and does not resolve,
        so a teammate who opens it reaches nothing. There is no shared session and no second
        viewer of your files.
      </p>
      <p>
        In short, the real part is the local token and the printed link. The shared environment,
        the delivered invite and the live join are the simulated part. See{" "}
        <DocLink href="/docs/shadow-environments">shadow environments</DocLink> for the full
        list of what is real and what is not.
      </p>

      <H2 id="today">Pairing for real today</H2>
      <p>
        To pair on a bug now, use tools that exchange real sessions. Share your screen in a call,
        or use the live-share feature in your editor. Push the branch and open a pull request so a
        teammate can read the diff and run it themselves; see{" "}
        <DocLink href="/docs/git-providers">git providers</DocLink>. For a shared running app,
        each person runs the dev server that ships with the project, or you expose your local
        server with a tunnel such as{" "}
        <ExtLink href="https://github.com/cloudflare/cloudflared">cloudflared</ExtLink>. The{" "}
        <DocLink href="/start">browser demo</DocLink> shows how the full product is meant to
        feel once the shared environment is real.
      </p>
    </>
  );
}
