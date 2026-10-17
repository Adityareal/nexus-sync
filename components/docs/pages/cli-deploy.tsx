import { Code, Pre } from "@/components/DocPage";
import { DefList, DocLink, H2, Lead, List } from "@/components/docs/prose";
import type { TocItem } from "@/components/docs/prose";

export const toc: TocItem[] = [
  { id: "usage", label: "Usage" },
  { id: "output", label: "What it prints" },
  { id: "errors", label: "Errors and exit codes" },
  { id: "simulated", label: "Real and simulated" },
];

export default function CliDeploy() {
  return (
    <>
      <Lead>
        Prints four build steps, then a production URL and a deploy time. It takes about two and
        a half seconds and exits with code 0.
      </Lead>

      <H2 id="usage">Usage</H2>
      <Pre>nexus-sync deploy</Pre>
      <p>
        It takes no arguments. The only option is <Code>-h</Code>, <Code>--help</Code>. It needs
        a <Code>.nexus/config.json</Code> in the current folder, which{" "}
        <DocLink href="/docs/cli-init">nexus-sync init</DocLink> creates. There is no target,
        environment or provider flag.
      </p>

      <H2 id="output">What it prints</H2>
      <p>
        Four spinner steps run to standard error, each for about 600 milliseconds, then the
        result goes to standard output.
      </p>
      <Pre>{`✦ Nexus-Sync

  ✔ ⚡ Building project...
  ✔ ⚡ Running pre-deploy tests...
  ✔ ⚡ Pushing to Shadow Environment...
  ✔ ⚡ Warming edge nodes...

  ✦ Production deploy complete: https://my-app.nexus-sync.example
  ✦ Deploy time: 2.4s`}</Pre>
      <DefList
        items={[
          {
            term: "Production deploy complete:",
            desc: (
              <>
                The environment address, built from <Code>projectName</Code>. It is the same
                address <DocLink href="/docs/cli-start">start</DocLink> and{" "}
                <DocLink href="/docs/cli-status">status</DocLink> print.
              </>
            ),
          },
          {
            term: "Deploy time:",
            desc: "The real time the four steps took, around 2.4 to 2.5 seconds. It measures the animation, not a build.",
          },
        ]}
      />
      <p>
        The spinner lines go to standard error. Without a terminal they print as plain lines
        rather than animating.
      </p>

      <H2 id="errors">Errors and exit codes</H2>
      <DefList
        items={[
          {
            term: "✗ No config found. Run `nexus-sync init` first.",
            desc: (
              <>
                There is no <Code>.nexus/config.json</Code> in the current folder. Exit code 1.
                Change to your project folder, or run <Code>nexus-sync init</Code> there.
              </>
            ),
          },
          {
            term: "SyntaxError about JSON",
            desc: (
              <>
                The config file is not valid JSON, or it was saved with a byte order mark. The
                command prints a Node.js stack trace and exits with code 1. See{" "}
                <DocLink href="/docs/common-issues">common issues</DocLink>.
              </>
            ),
          },
          {
            term: "exit code 0",
            desc: "Every successful run.",
          },
        ]}
      />
      <p>
        Every message and exit code is listed in the{" "}
        <DocLink href="/docs/output-reference">output reference</DocLink>.
      </p>

      <H2 id="simulated">Real and simulated</H2>
      <p>
        In 0.1.0 nothing is built or pushed. The steps are an animation, the URL is a fixed
        string, and no provider is contacted.
      </p>
      <List>
        <li>Your code is not compiled, bundled or uploaded.</li>
        <li>
          The pre-deploy step does not run your tests. The{" "}
          <DocLink href="/docs/cli-test">test</DocLink> command is also simulated.
        </li>
        <li>
          The address does not resolve, so the deploy reaches no edge or production host.
        </li>
        <li>
          To ship for real, keep your own pipeline, such as Vercel, Railway or AWS. See{" "}
          <DocLink href="/docs/cloud-providers">Vercel, Railway, AWS</DocLink>.
        </li>
      </List>
      <p>
        <DocLink href="/docs/lifecycle">Lifecycle</DocLink> shows where deploy sits in the full
        flow.
      </p>
    </>
  );
}
