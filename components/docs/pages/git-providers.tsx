import { Code, Pre } from "@/components/DocPage";
import { DefList, DocLink, H2, Lead, List } from "@/components/docs/prose";
import type { TocItem } from "@/components/docs/prose";

export const toc: TocItem[] = [
  { id: "no-git", label: "No git integration" },
  { id: "commit-or-ignore", label: "Commit or ignore the config" },
  { id: "branches", label: "Branch strategy" },
  { id: "ci", label: "A minimal CI step" },
];

export default function GitProviders() {
  return (
    <>
      <Lead>
        Nexus-Sync does not read git. It works the same on GitHub, GitLab and Bitbucket. The one
        git decision that affects you is whether you commit <Code>.nexus/config.json</Code>.
      </Lead>

      <H2 id="no-git">No git integration</H2>
      <p>
        The CLI does not run git, read your current branch, or call any provider API. It watches
        files under <Code>watchPaths</Code> and writes <Code>.nexus/config.json</Code>. Anything
        inside <Code>.git</Code> is ignored at any depth, so branch switches and commits raise no
        sync lines. The product concept of branch-based previews is a feature of the{" "}
        <DocLink href="/start">/start</DocLink> browser demo, not the CLI.
      </p>

      <H2 id="commit-or-ignore">Commit or ignore the config</H2>
      <p>
        The config holds no secrets. It records a project name, a framework label, a region
        label and the watch paths. See <DocLink href="/docs/config-reference">config
        reference</DocLink> for every field. You can commit it or ignore it; here is what each
        choice means.
      </p>
      <DefList
        items={[
          {
            term: "Commit it",
            desc: (
              <>
                Everyone on the repo shares one <Code>projectName</Code> and{" "}
                <Code>watchPaths</Code>. This is what CI needs, because{" "}
                <DocLink href="/docs/cli-init">init</DocLink> asks interactive questions and
                cannot run without a terminal.
              </>
            ),
          },
          {
            term: "Ignore it",
            desc: (
              <>
                Add <Code>.nexus/</Code> to <Code>.gitignore</Code>. Each person runs{" "}
                <Code>init</Code> locally and picks their own project name. Useful when you want
                separate preview addresses per developer.
              </>
            ),
          },
        ]}
      />
      <Pre label=".gitignore">{`.nexus/`}</Pre>

      <H2 id="branches">Branch strategy</H2>
      <p>
        One folder holds one config, so one checkout maps to one project name and one preview
        address. The CLI does not give each git branch its own environment. To isolate a branch,
        give it its own <Code>projectName</Code>, which is cleanest with a separate worktree so
        each folder carries its own config. See{" "}
        <DocLink href="/docs/branch-isolation">branch isolation</DocLink>.
      </p>

      <H2 id="ci">A minimal CI step</H2>
      <p>
        You can call the CLI from any provider&apos;s CI. Commit the config first, since{" "}
        <Code>init</Code> needs a terminal. The <DocLink href="/docs/cli-test">test</DocLink>{" "}
        command exits 0 even when a check fails, so it cannot gate a merge. A full workflow for
        each provider is in <DocLink href="/docs/tutorial-cicd">CI/CD integration</DocLink>.
      </p>
      <Pre>{`npm install -g nexus-sync-cli
nexus-sync test`}</Pre>
      <List>
        <li>GitHub Actions runs this in a <Code>run:</Code> step after checkout and setup-node.</li>
        <li>GitLab CI runs it in a job&apos;s <Code>script:</Code> list.</li>
        <li>Bitbucket Pipelines runs it in a step&apos;s <Code>script:</Code> list.</li>
      </List>
      <p>
        None of these touch a provider API. The command runs locally in the runner, prints its
        fixed output, and exits. See <DocLink href="/docs/output-reference">output and exit
        codes</DocLink> before you script around it.
      </p>
    </>
  );
}
