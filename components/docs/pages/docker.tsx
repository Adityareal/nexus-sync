import { Code, Pre } from "@/components/DocPage";
import { DocLink, H2, Lead, List } from "@/components/docs/prose";
import type { TocItem } from "@/components/docs/prose";

export const toc: TocItem[] = [
  { id: "no-docker", label: "The CLI needs no Docker" },
  { id: "beside", label: "Beside a Compose project" },
  { id: "inside", label: "Inside a container" },
  { id: "polling", label: "When edits do not show up" },
];

export default function Docker() {
  return (
    <>
      <Lead>
        Nexus-Sync runs as a plain Node.js process. It needs no Docker. You can still run it
        beside a Docker Compose project, or inside a container, when that suits your setup.
      </Lead>

      <H2 id="no-docker">The CLI needs no Docker</H2>
      <p>
        The CLI watches files and writes <Code>.nexus/config.json</Code>. It opens no network
        connections and starts no containers. Install it with{" "}
        <DocLink href="/docs/install-cli">npm</DocLink> and run it on the host next to your
        editor. The product concept of a cloud pod is simulated in 0.1.0: no container is
        created, and the live address does not resolve. See{" "}
        <DocLink href="/docs/shadow-environments">shadow environments</DocLink>.
      </p>

      <H2 id="beside">Beside a Compose project</H2>
      <p>
        A common layout runs your services with Docker Compose and edits their source on the
        host. Run <DocLink href="/docs/cli-start">start</DocLink> from the project root and set{" "}
        <Code>watchPaths</Code> to the source folders your services are built from, so each save
        prints a line.
      </p>
      <Pre label=".nexus/config.json">{`{
  "projectName": "my-app",
  "watchPaths": ["api/src/", "web/src/"]
}`}</Pre>
      <p>
        The CLI watches the host file system directly. It does not read your{" "}
        <Code>docker-compose.yml</Code> and does not know which service maps to which folder.
        List the folders yourself.
      </p>

      <H2 id="inside">Inside a container</H2>
      <p>
        You can run the CLI in a container that bind-mounts your project. Use a Node image, mount
        the project, and run from the mounted folder.
      </p>
      <Pre>{`docker run -it --rm \\
  -v "$PWD":/app -w /app \\
  node:20 \\
  npx nexus-sync-cli start`}</Pre>
      <List>
        <li>
          <Code>-v &quot;$PWD&quot;:/app</Code> mounts the current folder into the container.
        </li>
        <li>
          <Code>-w /app</Code> runs from it, so the CLI finds <Code>.nexus/config.json</Code> in
          the current folder.
        </li>
        <li>
          <Code>-it</Code> gives a terminal. The <DocLink href="/docs/cli-init">init</DocLink>{" "}
          command asks interactive questions and needs a terminal, so run <Code>init</Code> with{" "}
          <Code>-it</Code> or write the config file another way before you start.
        </li>
      </List>
      <p>
        On Windows, mount paths differ between PowerShell and cmd. Use the path syntax your shell
        expects for the <Code>-v</Code> argument.
      </p>

      <H2 id="polling">When edits do not show up</H2>
      <p>
        Bind mounts do not always forward native file-system events into a container, so a save
        on the host can go unreported inside it. Set <Code>CHOKIDAR_USEPOLLING=1</Code> to make
        the watcher poll instead.
      </p>
      <Pre>{`docker run -it --rm \\
  -v "$PWD":/app -w /app \\
  -e CHOKIDAR_USEPOLLING=1 \\
  node:20 \\
  npx nexus-sync-cli start`}</Pre>
      <p>
        Polling checks files on an interval instead of waiting for events, so it costs CPU. Set{" "}
        <Code>CHOKIDAR_INTERVAL</Code> in milliseconds to tune it; the default is 100. More
        causes in <DocLink href="/docs/sync-failures">environment failed to sync</DocLink>.
      </p>
    </>
  );
}
