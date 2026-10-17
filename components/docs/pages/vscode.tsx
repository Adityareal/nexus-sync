import { Code, Pre } from "@/components/DocPage";
import { DocLink, H2, Lead, List } from "@/components/docs/prose";
import type { TocItem } from "@/components/docs/prose";

export const toc: TocItem[] = [
  { id: "no-extension", label: "There is no extension" },
  { id: "terminal", label: "The integrated terminal" },
  { id: "task", label: "A background task on open" },
  { id: "autosave", label: "Autosave" },
  { id: "other", label: "Running other commands" },
];

export default function VsCode() {
  return (
    <>
      <Lead>
        Nexus-Sync has no VS Code extension. You use it from the integrated terminal, the same way
        you would in any shell. If you want it to start with the window, define a background task.
      </Lead>

      <H2 id="no-extension">There is no extension</H2>
      <p>
        There is nothing to install in the Marketplace, and no VS Code commands or settings are
        added. The CLI is editor-agnostic: it watches files on disk, so it works the same whatever
        you edit them with. See <DocLink href="/docs/ide-integration">local IDE integration</DocLink>{" "}
        for other editors.
      </p>

      <H2 id="terminal">The integrated terminal</H2>
      <p>
        Open a terminal in VS Code and run the CLI from your project folder. Create the config
        once, then start the watcher:
      </p>
      <Pre>{`nexus-sync init
nexus-sync start`}</Pre>
      <p>
        <Code>init</Code> prompts for three answers, so run it in a real terminal, not a task. The
        integrated terminal is interactive, so it works. Leave{" "}
        <DocLink href="/docs/cli-start">start</DocLink> running in its own terminal tab.
      </p>

      <H2 id="task">A background task on open</H2>
      <p>
        To run <Code>start</Code> automatically when you open the folder, add a{" "}
        <Code>.vscode/tasks.json</Code> file. VS Code asks once to allow automatic tasks for the
        folder.
      </p>
      <Pre label=".vscode/tasks.json">{`{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "nexus-sync start",
      "type": "shell",
      "command": "nexus-sync start",
      "isBackground": true,
      "problemMatcher": [],
      "runOptions": { "runOn": "folderOpen" },
      "presentation": { "reveal": "always", "panel": "dedicated" }
    }
  ]
}`}</Pre>
      <List>
        <li>
          <Code>runOptions.runOn</Code> set to <Code>folderOpen</Code> starts the task with the
          window.
        </li>
        <li>
          <Code>isBackground</Code> tells VS Code the task keeps running rather than finishing.
        </li>
        <li>
          <Code>problemMatcher</Code> is empty because the output is a sync log, not compiler
          errors.
        </li>
      </List>
      <p>
        The task needs the config to exist first. Run <Code>nexus-sync init</Code> in a terminal
        before you rely on the task.
      </p>

      <H2 id="autosave">Autosave</H2>
      <p>
        VS Code autosave with <Code>files.autoSave</Code> set to <Code>afterDelay</Code> saves on a
        short timer. Each save under a watched folder prints one line in the{" "}
        <Code>start</Code> output, the same as a manual save. A busy autosave setting produces a
        line per save, so a narrow set of{" "}
        <DocLink href="/docs/config-reference">watchPaths</DocLink> keeps the log readable.
      </p>

      <H2 id="other">Running other commands</H2>
      <p>
        Keep <Code>start</Code> in one terminal and run the rest in a second terminal in the same
        folder. <Code>nexus-sync status</Code>, <Code>nexus-sync test</Code>,{" "}
        <Code>nexus-sync db sandbox</Code> and <Code>nexus-sync deploy</Code> all print and return,
        so they fit a normal terminal. The CLI reference has a page for each.
      </p>
    </>
  );
}
