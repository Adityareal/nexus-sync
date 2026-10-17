import { Code, Pre } from "@/components/DocPage";
import { DefList, DocLink, ExtLink, H2, Lead, List } from "@/components/docs/prose";
import type { TocItem } from "@/components/docs/prose";

export const toc: TocItem[] = [
  { id: "address", label: "The address" },
  { id: "where", label: "Where it appears" },
  { id: "collab", label: "The collaboration link" },
  { id: "naming", label: "Naming rules" },
  { id: "simulated", label: "Real and simulated" },
];

export default function PreviewUrls() {
  return (
    <>
      <Lead>
        Every environment has one preview address, built from the project name in your config.
        The same address is reported by <Code>start</Code>, <Code>status</Code> and{" "}
        <Code>deploy</Code>.
      </Lead>

      <H2 id="address">The address</H2>
      <p>
        The address is <Code>https://&lt;projectName&gt;.nexus-sync.example</Code>. With the
        default project name <Code>my-app</Code> it reads:
      </p>
      <Pre>https://my-app.nexus-sync.example</Pre>
      <p>
        The value comes from <Code>projectName</Code> in{" "}
        <DocLink href="/docs/config-reference">.nexus/config.json</DocLink>. When that field is
        missing, the CLI uses <Code>my-app</Code>. Change the project name and the address
        changes with it.
      </p>

      <H2 id="where">Where it appears</H2>
      <p>Three commands print the same address for one project.</p>
      <DefList
        items={[
          {
            term: "start",
            desc: (
              <>
                Prints <Code>Shadow live at:</Code> with the address when it begins watching.
                See <DocLink href="/docs/cli-start">nexus-sync start</DocLink>.
              </>
            ),
          },
          {
            term: "status",
            desc: (
              <>
                Shows it on the <Code>Live URL</Code> line. See{" "}
                <DocLink href="/docs/cli-status">nexus-sync status</DocLink>.
              </>
            ),
          },
          {
            term: "deploy",
            desc: (
              <>
                Reports it as the production address on the final line. See{" "}
                <DocLink href="/docs/cli-deploy">nexus-sync deploy</DocLink>.
              </>
            ),
          },
        ]}
      />
      <p>
        There is no separate staging or production host in 0.1.0. The deploy address is the same
        string as the one <Code>start</Code> prints.
      </p>

      <H2 id="collab">The collaboration link</H2>
      <p>
        <Code>collab invite</Code> prints a join link that is the project address with a{" "}
        <Code>collab</Code> query parameter:
      </p>
      <Pre>{`https://my-app.nexus-sync.example?collab=1d471c2ec0372814`}</Pre>
      <p>
        The token is 16 hexadecimal characters, generated locally on each run and never stored
        or checked. A new one is produced every time you run the command.{" "}
        <DocLink href="/docs/multiplayer">Multiplayer collaboration</DocLink> covers the invite
        flow.
      </p>

      <H2 id="naming">Naming rules</H2>
      <p>
        When you run <DocLink href="/docs/cli-init">nexus-sync init</DocLink>, the project-name
        prompt accepts lowercase letters, digits and hyphens only. That keeps the address a
        valid host name.
      </p>
      <List>
        <li>
          The CLI does not re-check the name when it reads the config. If you edit{" "}
          <Code>projectName</Code> by hand to <Code>My App</Code>, the address becomes{" "}
          <Code>https://My App.nexus-sync.example</Code>, which is not a valid host.
        </li>
        <li>
          There is no length check at the prompt. A DNS label allows up to 63 characters, so
          keep the name within that if you want a usable host name.
        </li>
      </List>

      <H2 id="simulated">Real and simulated</H2>
      <p>
        The address is a string the CLI builds from your config. Nothing listens there. The{" "}
        <Code>.example</Code> suffix is a reserved example domain under{" "}
        <ExtLink href="https://www.rfc-editor.org/rfc/rfc2606">RFC 2606</ExtLink>, so it never
        resolves and opening it fails to load. Use it to see how the real product would address
        an environment, not as a working URL.{" "}
        <DocLink href="/docs/shadow-environments">Shadow environments</DocLink> explains the
        simulation model.
      </p>
    </>
  );
}
