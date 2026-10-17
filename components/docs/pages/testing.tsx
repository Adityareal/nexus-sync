import { Code, Pre } from "@/components/DocPage";
import { DocLink, H2, Lead, List } from "@/components/docs/prose";
import type { TocItem } from "@/components/docs/prose";

export const toc: TocItem[] = [
  { id: "purpose", label: "What the command is for" },
  { id: "output", label: "What it prints" },
  { id: "exit", label: "The exit code" },
  { id: "real", label: "Running your own tests" },
];

export default function Testing() {
  return (
    <>
      <Lead>
        The <Code>test</Code> command stands in for a test run against the shadow environment. In
        0.1.0 it prints a fixed list of checks and does not run any of your tests.
      </Lead>

      <H2 id="purpose">What the command is for</H2>
      <p>
        In the full product this runs your suite inside the environment that mirrors production,
        so a check meets the same database, edge functions and routes your app will. The command
        needs no config and takes no arguments.
      </p>
      <Pre>nexus-sync test</Pre>

      <H2 id="output">What it prints</H2>
      <p>
        It runs for about three seconds, then prints the same five checks every time: four passes
        and one failure.
      </p>
      <Pre>{`  ✔ API route /api/users returns 200  (12ms)
  ✔ DB connection healthy  (8ms)
  ✔ Auth middleware blocks unauthenticated  (5ms)
  ✔ Edge function /api/geo responds correctly  (19ms)
  ✗ Email service timeout  (3001ms)

  ─────────────────────────────────
  4 passed, 1 failed`}</Pre>
      <p>
        The lines are fixed text. The checks do not correspond to code in your project, the
        timings are not measured, and the failing <Code>Email service timeout</Code> line is part
        of the fixed list rather than a real fault.
      </p>

      <H2 id="exit">The exit code</H2>
      <p>
        The command exits with code 0 even though one check is shown as failed. A script that
        reads the exit code sees success.
      </p>
      <List>
        <li>Do not gate a merge or a deploy on this command. It always reports the same result.</li>
        <li>
          For the full table of exit codes across the CLI, see{" "}
          <DocLink href="/docs/output-reference">output and exit codes</DocLink>.
        </li>
      </List>

      <H2 id="real">Running your own tests</H2>
      <p>
        To get real results, run your project&apos;s own test runner, the one you would run without
        Nexus-Sync. The <Code>test</Code> command does not replace it and does not call it.
      </p>
      <List>
        <li>
          In CI, run your test runner directly and let its exit code decide the build. A{" "}
          <DocLink href="/docs/tutorial-cicd">CI/CD workflow</DocLink> shows this alongside the
          CLI.
        </li>
        <li>
          For how this command behaves in detail, including its streams and non-terminal output,
          see <DocLink href="/docs/cli-test">nexus-sync test</DocLink>.
        </li>
      </List>
    </>
  );
}
