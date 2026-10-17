import { Code, Pre } from "@/components/DocPage";
import { DefList, DocLink, H2, Lead, List } from "@/components/docs/prose";
import type { TocItem } from "@/components/docs/prose";

export const toc: TocItem[] = [
  { id: "no-env", label: "The CLI reads no .env" },
  { id: "config-safe", label: "The config holds no secrets" },
  { id: "dotfiles", label: "Dotfiles in the log" },
  { id: "env-vars", label: "Environment variables it honours" },
];

export default function EnvSecrets() {
  return (
    <>
      <Lead>
        Nexus-Sync does not manage secrets. Version 0.1.0 reads no <Code>.env</Code> file, syncs
        no variables and writes nothing but its own config. Your secrets stay where your
        framework and your host already keep them.
      </Lead>

      <H2 id="no-env">The CLI reads no .env</H2>
      <p>
        The CLI never opens an <Code>.env</Code> file and never reads an environment variable for
        your application. It does not load, forward or inject variables into a shadow environment.
        It reads one file, <Code>.nexus/config.json</Code>, and listens for file-system events.
      </p>
      <p>
        Keep loading secrets the way you do now. Your framework reads <Code>.env</Code> at its own
        start, your host injects variables at deploy time, and none of that passes through
        Nexus-Sync.
      </p>

      <H2 id="config-safe">The config holds no secrets</H2>
      <p>
        <Code>.nexus/config.json</Code> records a project name, a framework label, a region label
        and a list of watch paths. None of those is a credential. The file is safe to commit.
      </p>
      <Pre label=".nexus/config.json">{`{
  "projectName": "my-app",
  "framework": "Next.js",
  "region": "us-east-1",
  "watchPaths": ["src/", "app/", "pages/", "api/"]
}`}</Pre>
      <p>
        Do not add secrets to this file by hand. The CLI reads only{" "}
        <Code>projectName</Code> and <Code>watchPaths</Code>, so any secret you added would be
        ignored and would then sit in version control for no reason. See{" "}
        <DocLink href="/docs/config-reference">the config reference</DocLink> for every field.
      </p>

      <H2 id="dotfiles">Dotfiles in the log</H2>
      <p>
        The watcher includes dotfiles. A file such as <Code>.env</Code> inside a watched folder
        prints a line by name when you save it.
      </p>
      <Pre>{`[09:12:44] ✔ Synced  src/.env  →  shadow (33ms)`}</Pre>
      <p>
        The line shows the path only. The CLI does not read the contents, so no variable or value
        leaves your machine. If seeing the name in the log bothers you, keep <Code>.env</Code>{" "}
        outside the folders listed in <Code>watchPaths</Code>; a file outside those folders raises
        no line. <DocLink href="/docs/security">The security model</DocLink> covers what the CLI
        reads and writes in full.
      </p>

      <H2 id="env-vars">Environment variables it honours</H2>
      <p>
        A few environment variables change how the CLI itself behaves. They control colour and the
        file watcher, not your application.
      </p>
      <DefList
        items={[
          { term: "FORCE_COLOR=0", desc: "Disables coloured output." },
          {
            term: "CHOKIDAR_USEPOLLING=1",
            desc: "Polls the file system instead of using OS events, for network drives, containers and virtual machines.",
          },
          {
            term: "CHOKIDAR_INTERVAL",
            desc: "Poll interval in milliseconds when polling is on. The default is 100.",
          },
        ]}
      />
      <List>
        <li>
          There is no variable that supplies credentials, tokens or an account to the CLI, because
          it needs none.
        </li>
        <li>
          The web demo at <DocLink href="/start">/start</DocLink> shows variables inherited by a
          preview. That is part of the browser demo, not the CLI.
        </li>
      </List>
    </>
  );
}
