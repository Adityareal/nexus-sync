import { Code, Pre } from "@/components/DocPage";
import { DefList, DocLink, H2, Lead, List } from "@/components/docs/prose";
import type { TocItem } from "@/components/docs/prose";

export const toc: TocItem[] = [
  { id: "location", label: "Location" },
  { id: "example", label: "Full example" },
  { id: "fields", label: "Fields" },
  { id: "editing", label: "Editing by hand" },
  { id: "committing", label: "Committing it" },
];

export default function ConfigReference() {
  return (
    <>
      <Lead>
        Every setting the CLI uses lives in one file, <Code>.nexus/config.json</Code>. It is the
        only file the CLI writes, and <DocLink href="/docs/cli-init">nexus-sync init</DocLink>{" "}
        creates it.
      </Lead>

      <H2 id="location">Location</H2>
      <p>
        The file sits at <Code>.nexus/config.json</Code> in the folder you run commands from.
        Each command looks there and nowhere else. It does not search parent folders, so running
        a command from a subfolder of your project reports <Code>No config found</Code>.
      </p>
      <p>
        To keep more than one environment, give each its own folder, each with its own{" "}
        <Code>.nexus/config.json</Code>. See{" "}
        <DocLink href="/docs/branch-isolation">branch isolation</DocLink> and{" "}
        <DocLink href="/docs/custom-pod">custom environment configuration</DocLink>.
      </p>

      <H2 id="example">Full example</H2>
      <p>This is the file <Code>init</Code> writes, with every field it sets.</p>
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
        <Code>init</Code> writes the array one item per line with two-space indentation.{" "}
        <Code>createdAt</Code> is the time you ran <Code>init</Code>, in ISO 8601.
      </p>

      <H2 id="fields">Fields</H2>
      <DefList
        items={[
          {
            term: "projectName",
            desc: (
              <>
                String. Default <Code>my-app</Code> when the field is missing. Read by{" "}
                <Code>start</Code>, <Code>status</Code>, <Code>deploy</Code>, <Code>db sandbox</Code>{" "}
                and <Code>collab invite</Code> to build the environment address{" "}
                <Code>https://&lt;projectName&gt;.nexus-sync.example</Code>. <Code>init</Code>{" "}
                validates your answer against <Code>/^[a-z0-9-]+$/</Code>: lowercase letters,
                digits and hyphens. That check runs during the prompt only. A value you write by
                hand is used as is, so <Code>My App</Code> produces{" "}
                <Code>https://My App.nexus-sync.example</Code>. See{" "}
                <DocLink href="/docs/preview-urls">preview URLs</DocLink>.
              </>
            ),
          },
          {
            term: "framework",
            desc: (
              <>
                String. One of <Code>Next.js</Code>, <Code>Remix</Code>, <Code>SvelteKit</Code> or{" "}
                <Code>Other</Code> when set through <Code>init</Code>. Recorded only. No command
                reads it in 0.1.0, so the value does not change any behaviour. See{" "}
                <DocLink href="/docs/frameworks">frameworks</DocLink>.
              </>
            ),
          },
          {
            term: "region",
            desc: (
              <>
                String. One of <Code>us-east-1</Code>, <Code>eu-west-1</Code> or{" "}
                <Code>ap-south-1</Code> through <Code>init</Code>. Recorded only. No command reads
                it in 0.1.0, and <Code>status</Code> does not print it.
              </>
            ),
          },
          {
            term: "watchPaths",
            desc: (
              <>
                Array of strings, each a folder relative to the current folder. Default{" "}
                <Code>{`["src/", "app/", "pages/", "api/"]`}</Code> when the field is missing. Read by{" "}
                <Code>start</Code>, which watches every file under these folders. An empty array{" "}
                <Code>[]</Code> gives <Code>start</Code> nothing to watch, so it prints{" "}
                <Code>Watching:</Code> with no folders and exits at once with code 0. See{" "}
                <DocLink href="/docs/live-mirroring">live mirroring</DocLink>.
              </>
            ),
          },
          {
            term: "createdAt",
            desc: (
              <>
                String, an ISO 8601 timestamp. <Code>init</Code> sets it to the time it ran.
                Recorded only. No command reads it in 0.1.0.
              </>
            ),
          },
        ]}
      />
      <p>
        Only <Code>projectName</Code> and <Code>watchPaths</Code> affect what any command does.
        The other three fields are stored for your own reference.
      </p>

      <H2 id="editing">Editing by hand</H2>
      <p>
        You can edit the file in any text editor. The CLI does not validate its structure beyond
        parsing the JSON, so a field holds whatever you write.
      </p>
      <List>
        <li>Keep it valid JSON. Double-quoted keys and strings, no trailing commas, no comments.</li>
        <li>
          Save it as UTF-8 without a byte order mark. A BOM makes the parser fail. Windows
          PowerShell 5.1 <Code>Set-Content -Encoding utf8</Code> adds one; PowerShell 7 does not.
        </li>
        <li>
          Add folders to <Code>watchPaths</Code> as strings ending in a slash, for example{" "}
          <Code>components/</Code> or <Code>public/</Code>. Paths are relative to the folder you
          run <Code>start</Code> in.
        </li>
      </List>
      <p>
        When the file is not valid JSON, or carries a BOM, any command that reads it prints a
        Node.js <Code>SyntaxError</Code> stack trace and exits with code 1. The exact wording
        depends on your Node.js version. See{" "}
        <DocLink href="/docs/common-issues">common issues</DocLink> and{" "}
        <DocLink href="/docs/output-reference">output and exit codes</DocLink>.
      </p>

      <H2 id="committing">Committing it</H2>
      <p>
        The file holds no secrets. It records a project name, a framework label, a region label,
        a list of folders and a timestamp. The CLI reads no credentials and writes none here, so
        the file is safe to commit.
      </p>
      <p>
        Committing it is also the way to use the CLI where <Code>init</Code> cannot run.{" "}
        <Code>init</Code> is interactive and needs a terminal, so in CI you commit the config or
        write it with a script instead of running <Code>init</Code>. See{" "}
        <DocLink href="/docs/tutorial-cicd">CI/CD integration</DocLink>. If you prefer to keep it
        out of version control, add <Code>.nexus/</Code> to your ignore file and recreate it per
        machine. See <DocLink href="/docs/git-providers">git providers</DocLink>.
      </p>
    </>
  );
}
