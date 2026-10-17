import { Code, Pre } from "@/components/DocPage";
import { DocLink, H2, Lead, Steps } from "@/components/docs/prose";
import type { TocItem } from "@/components/docs/prose";

export const toc: TocItem[] = [
  { id: "idea", label: "The idea" },
  { id: "worktrees", label: "Add a second worktree" },
  { id: "configs", label: "Two configs, two names" },
  { id: "run", label: "A sandbox in each" },
  { id: "simulated", label: "What is simulated" },
  { id: "cleanup", label: "Clean up" },
];

export default function TutorialSandbox() {
  return (
    <>
      <Lead>
        Give each branch its own sandbox URL by giving each branch its own folder and project
        name. In 0.1.0 the URLs are generated from the project name; no database is cloned.
      </Lead>

      <H2 id="idea">The idea</H2>
      <p>
        The <DocLink href="/docs/cli-db">db sandbox</DocLink> command builds its URL from the{" "}
        <Code>projectName</Code> in the current folder. Two folders with two project names give
        two URLs. Git worktrees let one repository have two working folders at once, one per
        branch, so you can hold a sandbox URL for each branch side by side.
      </p>
      <p>
        Nexus-Sync does not read git in 0.1.0. The branch name has no effect on its own; what
        changes the URL is the project name you set in each folder. See{" "}
        <DocLink href="/docs/branch-isolation">branch isolation</DocLink> for the full model.
      </p>

      <H2 id="worktrees">Add a second worktree</H2>
      <p>
        Start in your repository on the main branch. Create a worktree for a feature branch in a
        sibling folder.
      </p>
      <Pre>{`git worktree add ../my-app-feature feature/new-schema`}</Pre>
      <p>
        You now have two folders: the original, and <Code>../my-app-feature</Code> checked out to{" "}
        <Code>feature/new-schema</Code>. List them to confirm.
      </p>
      <Pre>git worktree list</Pre>

      <H2 id="configs">Two configs, two names</H2>
      <p>
        Give each folder its own config with a distinct project name. Run{" "}
        <DocLink href="/docs/cli-init">init</DocLink> in each, or copy the config and edit the
        name. In the main folder:
      </p>
      <Pre label=".nexus/config.json">{`{
  "projectName": "my-app",
  "watchPaths": ["app/", "src/"]
}`}</Pre>
      <p>In the worktree folder, change the name.</p>
      <Pre label="../my-app-feature/.nexus/config.json">{`{
  "projectName": "my-app-feature",
  "watchPaths": ["app/", "src/"]
}`}</Pre>
      <p>
        Only <Code>projectName</Code> and <Code>watchPaths</Code> are read in 0.1.0, so a short
        config is enough. The <DocLink href="/docs/config-reference">config reference</DocLink>{" "}
        lists the defaults that fill in the rest.
      </p>

      <H2 id="run">A sandbox in each</H2>
      <p>Run the sandbox command in the main folder.</p>
      <Pre>nexus-sync db sandbox</Pre>
      <Pre>{`  → Cloning production schema...  ████████████████████████████████████████ 100%
  → Anonymizing PII fields...     ████████████████████████████████████████ 100%

  ✔ Sandbox ready at: postgres://sandbox.nexus-sync.example:5432/my-app_sandbox`}</Pre>
      <p>Change into the worktree and run it there.</p>
      <Pre>{`cd ../my-app-feature
nexus-sync db sandbox`}</Pre>
      <Pre>{`  ✔ Sandbox ready at: postgres://sandbox.nexus-sync.example:5432/my-app-feature_sandbox`}</Pre>
      <p>
        The two URLs differ by the project name. Both end in <Code>_sandbox</Code> and carry no
        user or password. The same name always gives the same URL.
      </p>

      <H2 id="simulated">What is simulated</H2>
      <p>
        Nothing is cloned and no database listens at either address. The progress bars animate
        for about three seconds, then print a fixed URL. The <Code>.example</Code> domain is
        reserved and does not resolve, so do not point <Code>DATABASE_URL</Code> at it. Your real
        databases are never read or changed. See{" "}
        <DocLink href="/docs/database-sandbox">the database sandbox page</DocLink> and{" "}
        <DocLink href="/docs/databases">database connections</DocLink>.
      </p>

      <H2 id="cleanup">Clean up</H2>
      <Steps>
        <li>
          Remove the worktree when the branch is done:{" "}
          <Code>git worktree remove ../my-app-feature</Code>. This deletes the folder, including
          its <Code>.nexus/</Code>.
        </li>
        <li>
          To drop only the Nexus-Sync config while keeping the folder, delete the{" "}
          <Code>.nexus/</Code> directory in it. There is no uninstall or teardown step; the
          command writes nothing outside that folder.
        </li>
      </Steps>
    </>
  );
}
