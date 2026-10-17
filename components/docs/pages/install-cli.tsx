import { Code, Pre } from "@/components/DocPage";
import { DocLink, ExtLink, H2, Lead, List } from "@/components/docs/prose";
import type { TocItem } from "@/components/docs/prose";

export const toc: TocItem[] = [
  { id: "global", label: "Global install" },
  { id: "npx", label: "Run without installing" },
  { id: "project", label: "Project-local install" },
  { id: "source", label: "From source" },
  { id: "verify", label: "Verify" },
  { id: "update", label: "Update and uninstall" },
];

export default function InstallCli() {
  return (
    <>
      <Lead>
        The CLI is the npm package <Code>nexus-sync-cli</Code>. Install it globally for a{" "}
        <Code>nexus-sync</Code> command, run it through npx with no install, or add it to one
        project. All three use the same published code.
      </Lead>

      <H2 id="global">Global install</H2>
      <p>This is the usual choice. It adds a <Code>nexus-sync</Code> command on your PATH.</p>
      <Pre>npm install -g nexus-sync-cli</Pre>
      <p>
        The install pulls 82 packages, about 6.7 MB, and runs no install scripts. If the command is
        not found afterwards, open a new terminal so your PATH is reloaded; see{" "}
        <DocLink href="/docs/common-issues">common issues</DocLink> for PATH and permission
        problems.
      </p>

      <H2 id="npx">Run without installing</H2>
      <p>
        Use npx to run the latest published version without a global install. The command name is
        the package name here:
      </p>
      <Pre>npx nexus-sync-cli start</Pre>
      <p>
        npx downloads the package the first time and caches it. This is handy for a one-off or for
        trying the CLI before you install it.
      </p>

      <H2 id="project">Project-local install</H2>
      <p>Add it as a dev dependency so the version is pinned per project:</p>
      <Pre>npm install --save-dev nexus-sync-cli</Pre>
      <p>
        Then run it through npx, which finds the local copy:
      </p>
      <Pre>npx nexus-sync start</Pre>
      <p>
        A local install keeps the CLI version in your <Code>package.json</Code>, so everyone on the
        project runs the same one.
      </p>

      <H2 id="source">From source</H2>
      <p>
        The source is on <ExtLink href="https://github.com/Adityareal/nexus-sync-cli">GitHub</ExtLink>{" "}
        under the MIT licence. Clone it, install dependencies, then run the entry point directly:
      </p>
      <Pre>{`git clone https://github.com/Adityareal/nexus-sync-cli.git
cd nexus-sync-cli
npm install
node bin/nexus-sync.js --help`}</Pre>
      <p>
        To get a global <Code>nexus-sync</Code> command that points at your clone, run{" "}
        <Code>npm link</Code> in the cloned folder.
      </p>

      <H2 id="verify">Verify</H2>
      <p>Check the version. It prints <Code>0.1.0</Code>.</p>
      <Pre>{`$ nexus-sync --version
0.1.0`}</Pre>
      <p>
        Then run <Code>nexus-sync --help</Code> to see the command list. Every command also accepts{" "}
        <Code>-h</Code>, <Code>--help</Code>.
      </p>

      <H2 id="update">Update and uninstall</H2>
      <List>
        <li>
          Update a global install: <Code>npm install -g nexus-sync-cli@latest</Code>.
        </li>
        <li>
          Uninstall a global install: <Code>npm uninstall -g nexus-sync-cli</Code>. This removes
          the command. It does not delete any <Code>.nexus/</Code> folder in your projects; remove
          those by hand if you want them gone.
        </li>
      </List>
    </>
  );
}
