import { Code, Pre } from "@/components/DocPage";
import { DocLink, ExtLink, H2, Lead, List } from "@/components/docs/prose";
import type { TocItem } from "@/components/docs/prose";

export const toc: TocItem[] = [
  { id: "commit-config", label: "Commit the config" },
  { id: "workflow", label: "A GitHub Actions workflow" },
  { id: "exit-codes", label: "Exit codes are not results" },
  { id: "output", label: "Output without a terminal" },
];

export default function TutorialCicd() {
  return (
    <>
      <Lead>
        Run Nexus-Sync commands in a CI pipeline by committing the config and calling the CLI
        from a workflow step. In 0.1.0 the commands print realistic output but build, push and
        test nothing, so do not gate a merge on them.
      </Lead>

      <H2 id="commit-config">Commit the config</H2>
      <p>
        The <DocLink href="/docs/cli-init">init</DocLink> command is interactive. It reads three
        prompts from the terminal, and without one it exits with an error. A CI runner has no
        terminal, so init cannot create the config there.
      </p>
      <p>
        Commit <Code>.nexus/config.json</Code> to the repository instead. It holds no secrets, so
        it is safe to track. Run init once on your machine, then add the file.
      </p>
      <Pre>{`git add .nexus/config.json
git commit -m "Add Nexus-Sync config"`}</Pre>
      <p>
        If you would rather not commit it, write the file in a workflow step with a small script
        that prints the JSON. Either way the config must exist before any command that needs one.
        See <DocLink href="/docs/config-reference">the config reference</DocLink> for the fields.
      </p>

      <H2 id="workflow">A GitHub Actions workflow</H2>
      <p>
        This workflow installs the CLI, runs the simulated test command on every push, and runs
        the deploy command only on the <Code>main</Code> branch.
      </p>
      <Pre label=".github/workflows/nexus-sync.yml">{`name: Nexus-Sync

on:
  push:
    branches: ["**"]

jobs:
  shadow:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm install -g nexus-sync-cli
      - run: nexus-sync test
      - if: github.ref == 'refs/heads/main'
        run: nexus-sync deploy`}</Pre>
      <p>
        The <Code>test</Code> step needs no config. The <Code>deploy</Code> step needs one, so
        the committed <Code>.nexus/config.json</Code> is what lets it run. See{" "}
        <DocLink href="/docs/cli-test">the test reference</DocLink> and{" "}
        <DocLink href="/docs/cli-deploy">the deploy reference</DocLink> for what each prints.
      </p>

      <H2 id="exit-codes">Exit codes are not results</H2>
      <p>
        The <Code>test</Code> command always prints the same five checks, four passing and one
        failing, and it exits with code 0 even with that failure. A green step does not mean your
        code passed; it means the command ran.
      </p>
      <Pre>{`  ✔ API route /api/users returns 200  (12ms)
  ✔ DB connection healthy  (8ms)
  ✔ Auth middleware blocks unauthenticated  (5ms)
  ✔ Edge function /api/geo responds correctly  (19ms)
  ✗ Email service timeout  (3001ms)

  ─────────────────────────────────
  4 passed, 1 failed`}</Pre>
      <p>
        Run your own test runner for real results, and let its exit code decide the merge. Use
        Nexus-Sync commands here for a demonstration, not as a gate.
      </p>
      <List>
        <li>
          <Code>deploy</Code> exits 0 and prints a deploy time, but nothing is built or pushed.
        </li>
        <li>
          Only a missing config, invalid JSON, an unknown command or a missing argument exits 1.
          See <DocLink href="/docs/output-reference">output and exit codes</DocLink>.
        </li>
      </List>

      <H2 id="output">Output without a terminal</H2>
      <p>
        A CI runner is not an interactive terminal, so the spinners and progress bars are not
        drawn. The commands print plain lines instead: a step shows as{" "}
        <Code>- Building project...</Code> then <Code>✔ Building project...</Code>, and the two
        database-sandbox labels run together on one line before the result. The checkmark may
        render as <Code>√</Code> on some Windows consoles.
      </p>
      <p>
        GitHub Actions receives colour even though it is not a terminal. To drop colour, set{" "}
        <Code>FORCE_COLOR=0</Code> on the step. There is no flag for it. Read logs by the text,
        not the glyphs; the{" "}
        <ExtLink href="https://github.com/Adityareal/nexus-sync-cli">source on GitHub</ExtLink>{" "}
        shows exactly what each command prints.
      </p>
    </>
  );
}
