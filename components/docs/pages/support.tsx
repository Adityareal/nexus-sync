import { Pre } from "@/components/DocPage";
import { DocLink, ExtLink, H2, Lead, List } from "@/components/docs/prose";
import type { TocItem } from "@/components/docs/prose";

export const toc: TocItem[] = [
  { id: "issues", label: "Report a problem" },
  { id: "include", label: "What to include" },
  { id: "source", label: "Source and package" },
  { id: "feedback", label: "Docs feedback" },
  { id: "demo", label: "The browser demo" },
];

export default function Support() {
  return (
    <>
      <Lead>
        Support for nexus-sync runs through its GitHub repository. There is no support inbox, and
        the example addresses in the output do not receive mail. File an issue and include enough
        for someone to reproduce the problem.
      </Lead>

      <H2 id="issues">Report a problem</H2>
      <p>
        Open an issue on the repository. The CLI makes no network requests and sends no
        telemetry, so nothing is reported automatically. An issue with the details below is the
        only channel that reaches the maintainer.
      </p>
      <p>
        <ExtLink href="https://github.com/Adityareal/nexus-sync-cli/issues">
          github.com/Adityareal/nexus-sync-cli/issues
        </ExtLink>
      </p>

      <H2 id="include">What to include</H2>
      <p>
        Give the version, your environment, the command you ran and its full output. Collect the
        first two with the commands below.
      </p>
      <Pre>{`nexus-sync --version
node --version`}</Pre>
      <List>
        <li>The nexus-sync version (the command above prints 0.1.0).</li>
        <li>Your Node.js version, operating system and shell.</li>
        <li>The exact command you ran.</li>
        <li>The full output, including any stack trace.</li>
      </List>
      <p>
        The CLI never reads file contents, but a path or project name can still be private.
        Remove anything sensitive before you paste output into an issue, and do not include
        secrets from files under your watched folders.
      </p>

      <H2 id="source">Source and package</H2>
      <p>
        The package is published on npm and the source is on GitHub. You can read every line the
        CLI runs before you install it.
      </p>
      <List>
        <li>
          Package:{" "}
          <ExtLink href="https://www.npmjs.com/package/nexus-sync-cli">
            npmjs.com/package/nexus-sync-cli
          </ExtLink>
        </li>
        <li>
          Source:{" "}
          <ExtLink href="https://github.com/Adityareal/nexus-sync-cli">
            github.com/Adityareal/nexus-sync-cli
          </ExtLink>
        </li>
        <li>
          Node.js: <ExtLink href="https://nodejs.org/">nodejs.org</ExtLink>
        </li>
      </List>
      <p>
        For what the CLI reads, writes and runs, see the{" "}
        <DocLink href="/docs/security">security model</DocLink>.
      </p>

      <H2 id="feedback">Docs feedback</H2>
      <p>
        These docs live alongside the CLI. If a page is wrong or missing, open an issue on the
        same repository and name the page. A verified output that differs from what a page shows
        is worth reporting, since every example here is quoted from a real run.
      </p>

      <H2 id="demo">The browser demo</H2>
      <p>
        The <DocLink href="/start">/start</DocLink> page runs the full product flow in
        your browser. It is a demonstration of what the product does, separate from the CLI, and
        a useful reference when you are describing expected behaviour in an issue. The CLI itself
        needs no account to run. Pricing for the hosted product is listed on the{" "}
        <DocLink href="/#pricing">pricing section</DocLink>.
      </p>
    </>
  );
}
