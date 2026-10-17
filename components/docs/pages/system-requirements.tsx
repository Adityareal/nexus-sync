import { Code, Pre } from "@/components/DocPage";
import { DefList, DocLink, ExtLink, H2, Lead, List } from "@/components/docs/prose";
import type { TocItem } from "@/components/docs/prose";

export const toc: TocItem[] = [
  { id: "node", label: "Node.js and npm" },
  { id: "os", label: "Operating systems and shells" },
  { id: "terminal", label: "An interactive terminal" },
  { id: "glyphs", label: "Unicode output" },
  { id: "disk-network", label: "Disk, network and permissions" },
];

export default function SystemRequirements() {
  return (
    <>
      <Lead>
        The CLI runs on Node.js. It installs small, writes one file in your project, and makes no
        network requests after install. Most machines that run a modern web project already meet
        every requirement.
      </Lead>

      <H2 id="node">Node.js and npm</H2>
      <p>
        You need Node.js 18 or newer. The package declares that range in its{" "}
        <Code>engines</Code> field. npm comes with Node.js and is how you install the CLI. Check
        both:
      </p>
      <Pre>{`$ node --version
v24.14.0
$ npm --version
10.8.0`}</Pre>
      <p>
        Any 18 or newer version works. Install Node.js from{" "}
        <ExtLink href="https://nodejs.org/">nodejs.org</ExtLink> if you do not have it.
      </p>

      <H2 id="os">Operating systems and shells</H2>
      <p>
        The CLI runs natively on macOS, Linux and Windows. It was verified on Windows with Node 24.
      </p>
      <DefList
        items={[
          { term: "macOS", desc: "Terminal, iTerm2 or any shell." },
          { term: "Linux", desc: "Any distribution with a supported Node.js." },
          {
            term: "Windows",
            desc: "PowerShell and cmd both work. The Windows Subsystem for Linux works too.",
          },
        ]}
      />
      <p>
        On Linux, watching a large tree can hit the inotify watch limit and print an{" "}
        <Code>ENOSPC</Code> error. If that happens, raise{" "}
        <Code>fs.inotify.max_user_watches</Code>. See{" "}
        <DocLink href="/docs/sync-failures">environment failed to sync</DocLink>.
      </p>

      <H2 id="terminal">An interactive terminal</H2>
      <p>
        <Code>nexus-sync init</Code> asks three questions, so it needs a terminal that can read
        keyboard input. Running it with piped input, or in a CI job with no TTY, makes it exit with
        an error. In CI, commit the config file or write it with a script instead of running{" "}
        <Code>init</Code>. See <DocLink href="/docs/tutorial-cicd">CI/CD integration</DocLink>.
      </p>
      <p>
        The other commands do not prompt and run fine without a terminal. Progress bars and spinners
        draw differently when there is no TTY, which{" "}
        <DocLink href="/docs/output-reference">output and exit codes</DocLink> describes.
      </p>

      <H2 id="glyphs">Unicode output</H2>
      <p>
        The output uses symbols such as <Code>✦</Code>, <Code>✔</Code> and <Code>⚠</Code>. Modern
        terminals render them correctly, including Windows Terminal. An older console may show boxes
        or question marks in their place. The text is still correct; only the glyphs differ.
      </p>

      <H2 id="disk-network">Disk, network and permissions</H2>
      <List>
        <li>
          Disk: the install is about 6.7 MB across 82 packages. The config file it writes is a few
          hundred bytes.
        </li>
        <li>
          Network: needed only to install from npm. After that the CLI makes no network requests
          and sends no telemetry. See <DocLink href="/docs/security">the security model</DocLink>.
        </li>
        <li>
          Permissions: write access to the project folder, so it can create{" "}
          <Code>.nexus/config.json</Code>. Global install may need elevated permissions depending
          on how Node.js was set up; <DocLink href="/docs/common-issues">common issues</DocLink>{" "}
          covers that.
        </li>
      </List>
    </>
  );
}
