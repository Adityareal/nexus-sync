import { Code, Pre } from "@/components/DocPage";
import { DocLink, H2, Kbd, Lead, Steps } from "@/components/docs/prose";
import type { TocItem } from "@/components/docs/prose";

export const toc: TocItem[] = [
  { id: "create", label: "Create the app" },
  { id: "init", label: "Add a config" },
  { id: "run", label: "Run both watchers" },
  { id: "edit", label: "Save a file" },
  { id: "watch-more", label: "Watch more folders" },
  { id: "try", label: "Try the rest" },
];

export default function TutorialNextjs() {
  return (
    <>
      <Lead>
        Scaffold a Next.js app, point Nexus-Sync at it, and watch each save print a line. The
        real app runs on your own dev server; the shadow environment is simulated.
      </Lead>

      <H2 id="create">Create the app</H2>
      <p>
        Use the official scaffolder. Accept its defaults when it asks about TypeScript, ESLint,
        Tailwind and the App Router.
      </p>
      <Pre>npx create-next-app@latest my-app</Pre>
      <p>
        Change into the folder it creates. Every command below runs from there, because
        Nexus-Sync reads its config from the current folder only.
      </p>
      <Pre>cd my-app</Pre>

      <H2 id="init">Add a config</H2>
      <p>
        Run <DocLink href="/docs/cli-init">init</DocLink> and answer its three prompts. Pick
        Next.js for the framework. The framework answer is recorded and never read in 0.1.0; the
        field that matters is <Code>watchPaths</Code>.
      </p>
      <Pre>nexus-sync init</Pre>
      <p>
        This writes <Code>.nexus/config.json</Code> with the default watch list, which already
        covers the folders <Code>create-next-app</Code> made.
      </p>
      <Pre label=".nexus/config.json">{`{
  "projectName": "my-app",
  "framework": "Next.js",
  "region": "us-east-1",
  "watchPaths": [
    "src/",
    "app/",
    "pages/",
    "api/"
  ],
  "createdAt": "2026-10-17T07:30:00.000Z"
}`}</Pre>
      <p>
        A default App Router project keeps its code under <Code>app/</Code>, so the list fits
        without edits. See <DocLink href="/docs/config-reference">the config reference</DocLink>{" "}
        for every field.
      </p>

      <H2 id="run">Run both watchers</H2>
      <p>
        Open two terminals in the project folder. In the first, start the Next.js dev server,
        which serves the real application.
      </p>
      <Pre>npm run dev</Pre>
      <p>In the second, start the file watcher.</p>
      <Pre>nexus-sync start</Pre>
      <p>It prints two lines, then waits for changes.</p>
      <Pre>{`✦ Nexus-Sync

  Watching: src/, app/, pages/, api/
  ✦ Shadow live at: https://my-app.nexus-sync.example`}</Pre>
      <p>
        Open the app at <Code>http://localhost:3000</Code> to see it. The{" "}
        <Code>.example</Code> address the watcher prints is a{" "}
        <DocLink href="/docs/preview-urls">simulated preview URL</DocLink> and does not resolve.
      </p>

      <H2 id="edit">Save a file</H2>
      <p>
        Edit <Code>app/page.tsx</Code>, change the heading text, and save. The dev server
        reloads the browser, and the watcher prints one line.
      </p>
      <Pre>{`[12:04:31] ✔ Synced  app/page.tsx  →  shadow (28ms)`}</Pre>
      <p>
        The number in parentheses is random and measures nothing. The watcher reports the
        file-system event; it does not read the file or upload it.
      </p>

      <H2 id="watch-more">Watch more folders</H2>
      <p>
        A new Next.js project often grows a <Code>components/</Code> folder and keeps assets in{" "}
        <Code>public/</Code>. Neither is in the default list, so saves there print nothing until
        you add them. Stop the watcher with <Kbd>Ctrl</Kbd>+<Kbd>C</Kbd>, edit the config, and
        start it again.
      </p>
      <Pre label=".nexus/config.json">{`  "watchPaths": [
    "app/",
    "components/",
    "public/",
    "src/"
  ]`}</Pre>
      <p>
        Keep the list to the folders you edit. A wide list that includes a build output folder
        such as <Code>.next</Code> reports every generated file; see{" "}
        <DocLink href="/docs/performance">performance tips</DocLink>.
      </p>

      <H2 id="try">Try the rest</H2>
      <Steps>
        <li>
          Run <DocLink href="/docs/cli-status">nexus-sync status</DocLink> in a third terminal
          for a snapshot of the environment. Its values are regenerated each run.
        </li>
        <li>
          Run <DocLink href="/docs/cli-test">nexus-sync test</DocLink> for a fixed list of five
          checks, four passing and one failing, with exit code 0.
        </li>
        <li>
          Run <DocLink href="/docs/cli-deploy">nexus-sync deploy</DocLink> to see the deploy
          steps. Nothing is built or pushed, and the production URL is the same{" "}
          <Code>.example</Code> address.
        </li>
      </Steps>
      <p>
        For a real deployment, keep your existing pipeline. See{" "}
        <DocLink href="/docs/tutorial-cicd">CI/CD integration</DocLink> for a GitHub Actions
        example.
      </p>
    </>
  );
}
