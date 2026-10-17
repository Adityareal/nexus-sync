import { Code, Pre } from "@/components/DocPage";
import { DefList, DocLink, H2, Kbd, Lead, List } from "@/components/docs/prose";
import type { TocItem } from "@/components/docs/prose";

export const toc: TocItem[] = [
  { id: "usage", label: "Usage" },
  { id: "prompts", label: "The three prompts" },
  { id: "output", label: "What it writes" },
  { id: "overwrite", label: "Running it again" },
  { id: "errors", label: "Errors and exit codes" },
  { id: "simulated", label: "Real and simulated" },
];

export default function CliInit() {
  return (
    <>
      <Lead>
        Asks three questions and writes <Code>.nexus/config.json</Code> in the current folder.
        Run it once per project, before any other command that needs a config.
      </Lead>

      <H2 id="usage">Usage</H2>
      <Pre>nexus-sync init</Pre>
      <p>
        It takes no arguments. The only option is <Code>-h</Code>, <Code>--help</Code>. It
        writes into the folder you run it from, creating a <Code>.nexus</Code> directory there.
        It does not need a config to run, since it is the command that creates one.
      </p>

      <H2 id="prompts">The three prompts</H2>
      <p>
        It asks three questions in turn. Use the arrow keys for a choice and{" "}
        <Kbd>Enter</Kbd> to accept, or <Kbd>Enter</Kbd> on its own to take the default shown in
        parentheses.
      </p>
      <DefList
        items={[
          {
            term: "? Project name: (my-app)",
            desc: (
              <>
                Must match <Code>/^[a-z0-9-]+$/</Code>: lowercase letters, digits and hyphens.
                A rejected name shows <Code>{">> Lowercase alphanumeric + hyphens only"}</Code>.
                This name becomes the environment address, so a label that is valid as a DNS
                label is the safe choice.
              </>
            ),
          },
          {
            term: "? Framework:",
            desc: <>Next.js, Remix, SvelteKit or Other. Recorded in the config and nothing more.</>,
          },
          {
            term: "? Preferred region:",
            desc: <>us-east-1, eu-west-1 or ap-south-1. Recorded in the config and nothing more.</>,
          },
        ]}
      />
      <p>
        The framework and region are stored but never read by any command in 0.1.0. Only{" "}
        <Code>projectName</Code> and <Code>watchPaths</Code> change what the other commands do.
      </p>

      <H2 id="output">What it writes</H2>
      <p>On the last two lines it confirms the write, then it exits with code 0.</p>
      <Pre>{`  ✔ Project initialized!
  Config written to .nexus/config.json`}</Pre>
      <p>The file holds five fields. A fresh config looks like this.</p>
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
        <Code>createdAt</Code> is the time the file was written. The{" "}
        <DocLink href="/docs/config-reference">config reference</DocLink> describes each field,
        its default when missing, and which commands read it.
      </p>

      <H2 id="overwrite">Running it again</H2>
      <p>
        When <Code>.nexus/config.json</Code> already exists, it warns you and asks before
        replacing it.
      </p>
      <Pre>{`  ⚠ A .nexus/config.json already exists.
? Overwrite existing config? (y/N)`}</Pre>
      <p>
        Answer no, the default, and it prints <Code>Aborted.</Code> and leaves the file
        untouched, exit code 0. Answer yes and it runs the three prompts again and writes a new
        file.
      </p>

      <H2 id="errors">Errors and exit codes</H2>
      <List>
        <li>
          A project name that fails the pattern is rejected in place, with{" "}
          <Code>{">> Lowercase alphanumeric + hyphens only"}</Code>, and the prompt stays open
          until you give a valid one.
        </li>
        <li>
          With no interactive terminal, when stdin is piped or you are in CI, the command
          cannot read the prompts and exits with code 1. Commit the config file to your
          repository, or write it with a script, instead of running <Code>init</Code> there.
          See <DocLink href="/docs/tutorial-cicd">CI/CD integration</DocLink>.
        </li>
      </List>

      <H2 id="simulated">Real and simulated</H2>
      <p>
        Writing the config file is real. It is the only file the CLI ever writes, and every
        other command reads it from the current folder. Nothing is provisioned, no account is
        created, and the region and framework you pick are recorded without effect in 0.1.0.{" "}
        <DocLink href="/docs/shadow-environments">Shadow environments</DocLink> explains what
        the full product does.
      </p>
    </>
  );
}
