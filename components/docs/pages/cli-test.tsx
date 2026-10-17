import { Code, Pre } from "@/components/DocPage";
import { DefList, DocLink, H2, Lead, List } from "@/components/docs/prose";
import type { TocItem } from "@/components/docs/prose";

export const toc: TocItem[] = [
  { id: "usage", label: "Usage" },
  { id: "output", label: "What it prints" },
  { id: "exit", label: "The exit code" },
  { id: "errors", label: "Errors and exit codes" },
  { id: "simulated", label: "Real and simulated" },
];

export default function CliTest() {
  return (
    <>
      <Lead>
        Prints a fixed five line test report: four checks pass and one fails. It needs no config
        and runs in about three seconds.
      </Lead>

      <H2 id="usage">Usage</H2>
      <Pre>nexus-sync test</Pre>
      <p>
        It takes no arguments. The only option is <Code>-h</Code>, <Code>--help</Code>. Unlike{" "}
        <DocLink href="/docs/cli-start">start</DocLink>,{" "}
        <DocLink href="/docs/cli-status">status</DocLink> and{" "}
        <DocLink href="/docs/cli-deploy">deploy</DocLink>, it does not read{" "}
        <Code>.nexus/config.json</Code>, so it runs from any folder.
      </p>

      <H2 id="output">What it prints</H2>
      <p>
        A short progress line goes to standard error while it runs, then the report goes to
        standard output.
      </p>
      <Pre>{`✦ Nexus-Sync

  ✔ API route /api/users returns 200  (12ms)
  ✔ DB connection healthy  (8ms)
  ✔ Auth middleware blocks unauthenticated  (5ms)
  ✔ Edge function /api/geo responds correctly  (19ms)
  ✗ Email service timeout  (3001ms)

  ─────────────────────────────────
  4 passed, 1 failed`}</Pre>
      <p>
        The five check lines and their times are the same on every run. The{" "}
        <Code>Running test suite...</Code> spinner prints to standard error, so a redirect of
        standard output keeps only the report.
      </p>

      <H2 id="exit">The exit code</H2>
      <p>
        The command exits with code 0 even though one check shows as failed. The exit code
        reports that the command ran, not that every check passed. A script that gates on{" "}
        <Code>nexus-sync test</Code> will always see success.
      </p>

      <H2 id="errors">Errors and exit codes</H2>
      <DefList
        items={[
          {
            term: "error: unknown option",
            desc: (
              <>
                There is no flag other than <Code>-h</Code>, <Code>--help</Code>. An unknown
                option prints to standard error and exits with code 1.
              </>
            ),
          },
          {
            term: "exit code 0",
            desc: "Every successful run, including the one with a failed check shown above.",
          },
        ]}
      />
      <p>
        The full list of messages and exit codes is in the{" "}
        <DocLink href="/docs/output-reference">output reference</DocLink>.
      </p>

      <H2 id="simulated">Real and simulated</H2>
      <p>
        In 0.1.0 this command runs no tests. The list is fixed, the times are constant, and
        nothing in your project is read or executed.
      </p>
      <List>
        <li>It does not find, load or run your test files.</li>
        <li>It reaches no server, route, database or email service.</li>
        <li>
          For real results, run your own test runner, such as Vitest or Jest, and gate CI on its
          exit code.
        </li>
      </List>
      <p>
        <DocLink href="/docs/testing">Testing in the shadow environment</DocLink> explains what
        the full product aims at, and{" "}
        <DocLink href="/docs/tutorial-cicd">CI/CD integration</DocLink> shows a real pipeline.
      </p>
    </>
  );
}
