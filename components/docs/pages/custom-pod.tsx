import { Code, Pre } from "@/components/DocPage";
import { DefList, DocLink, H2, Lead, List, Steps } from "@/components/docs/prose";
import type { TocItem } from "@/components/docs/prose";

export const toc: TocItem[] = [
  { id: "what-you-can-change", label: "What you can change" },
  { id: "editing", label: "Editing the config" },
  { id: "watch-paths", label: "Changing watch paths" },
  { id: "project-name", label: "Changing the project name" },
  { id: "multiple", label: "Multiple environments" },
  { id: "rerun-init", label: "Re-running init" },
];

export default function CustomPod() {
  return (
    <>
      <Lead>
        A shadow environment is configured by one file, <Code>.nexus/config.json</Code>. You
        shape the environment by editing that file or by re-running{" "}
        <DocLink href="/docs/cli-init">nexus-sync init</DocLink>.
      </Lead>

      <H2 id="what-you-can-change">What you can change</H2>
      <p>
        The config has five fields. In 0.1.0 only two of them change what any command does:{" "}
        <Code>projectName</Code> and <Code>watchPaths</Code>. The full list, with each field&apos;s
        type, default and which command reads it, is in the{" "}
        <DocLink href="/docs/config-reference">config reference</DocLink>.
      </p>
      <DefList
        items={[
          {
            term: "projectName",
            desc: "Names the environment. It appears in the live URL, the sandbox URL and the collab link.",
          },
          {
            term: "watchPaths",
            desc: (
              <>
                The folders <DocLink href="/docs/cli-start">start</DocLink> watches, relative to
                the folder you run it in.
              </>
            ),
          },
          {
            term: "framework, region, createdAt",
            desc: "Recorded when init writes the file. No command reads them in 0.1.0.",
          },
        ]}
      />

      <H2 id="editing">Editing the config</H2>
      <p>
        Open <Code>.nexus/config.json</Code> in your editor and change the values you want. The
        file must stay valid JSON, saved as UTF-8 with no byte order mark. The CLI does not
        validate your edits before using them, so a bad value flows straight into the output.
      </p>
      <Pre label=".nexus/config.json">{`{
  "projectName": "my-app",
  "framework": "Next.js",
  "region": "us-east-1",
  "watchPaths": ["src/", "app/", "pages/", "api/"],
  "createdAt": "2026-10-17T07:30:00.000Z"
}`}</Pre>
      <p>
        An invalid JSON file, or one saved with a byte order mark, makes every command exit with
        a Node.js parse error. On Windows, PowerShell 5.1 adds a byte order mark with{" "}
        <Code>Set-Content -Encoding utf8</Code>; PowerShell 7 does not. See{" "}
        <DocLink href="/docs/common-issues">common issues</DocLink>.
      </p>

      <H2 id="watch-paths">Changing watch paths</H2>
      <p>
        Set <Code>watchPaths</Code> to the folders that hold the source you edit. Each entry is a
        path relative to the folder you run <Code>start</Code> in. A narrow list reports fewer
        events and watches fewer files; see{" "}
        <DocLink href="/docs/performance">performance tips</DocLink>.
      </p>
      <Pre label=".nexus/config.json">{`"watchPaths": ["app/", "components/", "lib/"]`}</Pre>
      <List>
        <li>
          When the field is missing, the defaults are <Code>src/</Code>, <Code>app/</Code>,{" "}
          <Code>pages/</Code> and <Code>api/</Code>.
        </li>
        <li>
          An empty list gives <Code>start</Code> nothing to watch, so it prints an empty{" "}
          <Code>Watching:</Code> line and exits at once.
        </li>
        <li>
          Folders inside a watched folder are included at any depth, except{" "}
          <Code>node_modules</Code>, <Code>.git</Code> and <Code>.nexus</Code>.
        </li>
      </List>

      <H2 id="project-name">Changing the project name</H2>
      <p>
        <Code>projectName</Code> sets the environment address. Change it and the URLs change with
        it on the next run.
      </p>
      <Pre>{`✦ Shadow live at: https://checkout-service.nexus-sync.example`}</Pre>
      <p>
        The CLI does not check the value against the DNS label rules that{" "}
        <DocLink href="/docs/cli-init">init</DocLink> enforces at the prompt. A name with a space,
        such as <Code>My App</Code>, produces a URL with a space in it. The address is a reserved
        example domain and does not resolve either way; see{" "}
        <DocLink href="/docs/preview-urls">preview URLs</DocLink>.
      </p>

      <H2 id="multiple">Multiple environments</H2>
      <p>
        The CLI reads <Code>.nexus/config.json</Code> from the current folder only, not from
        parent folders. One config per folder means one environment per folder. To run two
        environments from the same codebase, give each its own folder with its own config. Git
        worktrees are the clean way to do that.
      </p>
      <Steps>
        <li>
          <Code>git worktree add ../my-app-staging staging</Code> creates a second checkout.
        </li>
        <li>
          Run <Code>nexus-sync init</Code> in each folder and give each a different{" "}
          <Code>projectName</Code>.
        </li>
        <li>
          Run <Code>nexus-sync start</Code> in each. Each watches its own folder and prints its
          own URL.
        </li>
      </Steps>
      <p>
        <DocLink href="/docs/branch-isolation">Branch isolation</DocLink> covers this pattern in
        full, including why the CLI does not read git itself.
      </p>

      <H2 id="rerun-init">Re-running init</H2>
      <p>
        Run <Code>nexus-sync init</Code> again to rebuild the config through the prompts. When a
        config already exists, init warns and asks whether to overwrite it.
      </p>
      <Pre>{`  ⚠ A .nexus/config.json already exists.
? Overwrite existing config? (y/N)`}</Pre>
      <p>
        Answer no and init leaves the file alone and exits. Answer yes and it writes a fresh file
        from your new answers, including a new <Code>createdAt</Code>. init needs an interactive
        terminal; in a pipe or CI it exits with an error, so edit the file directly there.
      </p>
    </>
  );
}
