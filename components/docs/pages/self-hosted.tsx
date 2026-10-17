import { Code, Pre } from "@/components/DocPage";
import { DocLink, ExtLink, H2, Lead, List, Steps } from "@/components/docs/prose";
import type { TocItem } from "@/components/docs/prose";

export const toc: TocItem[] = [
  { id: "already-local", label: "It already runs locally" },
  { id: "no-server", label: "There is no server to host" },
  { id: "offline-install", label: "Installing on an offline machine" },
  { id: "registry-mirror", label: "A private registry mirror" },
  { id: "forking", label: "Forking it" },
];

export default function SelfHosted() {
  return (
    <>
      <Lead>
        The <Code>nexus-sync</Code> CLI runs entirely on your machine. There is no backend to
        stand up, so self-hosting is a question of getting the package onto a disconnected host.
      </Lead>

      <H2 id="already-local">It already runs locally</H2>
      <p>
        Every command reads and writes <Code>.nexus/config.json</Code> and listens for file
        events. None of them contact a service. Once the package is installed, you can disconnect
        the machine and each command behaves the same. The{" "}
        <DocLink href="/docs/vpc-networking">networking page</DocLink> covers why nothing needs to
        be allowlisted, and <DocLink href="/docs/security">the security model</DocLink> covers
        what it reads and writes.
      </p>

      <H2 id="no-server">There is no server to host</H2>
      <p>
        The shadow environment, live URL, sandbox and deploy in 0.1.0 are simulated locally.
        There is no daemon, no control plane and no component you run on your own infrastructure.
        What each command does and does not do is listed under{" "}
        <DocLink href="/docs/shadow-environments">shadow environments</DocLink>. Self-hosting
        therefore means installing the CLI where you need it, not operating a service.
      </p>

      <H2 id="offline-install">Installing on an offline machine</H2>
      <p>
        The install itself is the only step that needs the network. For an air-gapped host,
        stage the package on a connected machine and copy it across with its dependencies in
        place.
      </p>
      <Steps>
        <li>
          On a connected machine, install into a project folder:{" "}
          <Code>npm install nexus-sync-cli</Code>. This writes the package and its dependencies
          under <Code>node_modules/</Code>.
        </li>
        <li>
          Copy the whole folder, including <Code>node_modules/</Code>, to the offline machine.
        </li>
        <li>
          Run it with <Code>npx nexus-sync</Code> from that folder, or add a script to{" "}
          <Code>package.json</Code> that calls it.
        </li>
      </Steps>
      <p>
        A bare <Code>npm pack</Code> tarball is not enough on its own. It holds the CLI&apos;s 14 files
        but none of its dependencies, so it still needs <Code>npm install</Code> to resolve
        commander, chalk, chokidar and the rest. Copying an installed{" "}
        <Code>node_modules/</Code> is what makes the offline host self-contained.
      </p>

      <H2 id="registry-mirror">A private registry mirror</H2>
      <p>
        If your network runs an internal npm registry, mirror <Code>nexus-sync-cli</Code> into it
        and point npm at the mirror. The install then resolves the package and its dependencies
        from inside the network.
      </p>
      <Pre>{`npm config set registry https://registry.internal/
npm install -g nexus-sync-cli`}</Pre>
      <p>
        This is standard npm behaviour; the CLI has no registry setting of its own. For proxy and
        registry details see npm&apos;s{" "}
        <ExtLink href="https://docs.npmjs.com/cli/v10/using-npm/config#registry">
          config documentation
        </ExtLink>
        .
      </p>

      <H2 id="forking">Forking it</H2>
      <p>
        The package is MIT licensed, so you can fork it and run your own build.
      </p>
      <List>
        <li>
          Clone the source:{" "}
          <ExtLink href="https://github.com/Adityareal/nexus-sync-cli">
            github.com/Adityareal/nexus-sync-cli
          </ExtLink>
          .
        </li>
        <li>
          <Code>npm install</Code>, then <Code>node bin/nexus-sync.js --help</Code> to run it from
          source, or <Code>npm link</Code> for a global command.
        </li>
        <li>
          Publish your fork to your own registry under your own name, keeping the MIT licence and
          attribution.
        </li>
      </List>
      <p>
        The source install steps are the same ones in{" "}
        <DocLink href="/docs/install-cli">installing the CLI</DocLink>.
      </p>
    </>
  );
}
