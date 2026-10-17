import { Code, Pre } from "@/components/DocPage";
import { DefList, DocLink, H2, Lead, List } from "@/components/docs/prose";
import type { TocItem } from "@/components/docs/prose";

export const toc: TocItem[] = [
  { id: "agnostic", label: "Editor agnostic" },
  { id: "saves", label: "How saves appear" },
  { id: "editors", label: "Per editor" },
  { id: "generated", label: "Generated files" },
];

export default function IdeIntegration() {
  return (
    <>
      <Lead>
        Nexus-Sync works with any editor. It watches the file system, not your editor, so a save
        from any tool prints a line. There is no plugin to install and no editor integration to
        configure.
      </Lead>

      <H2 id="agnostic">Editor agnostic</H2>
      <p>
        Run <DocLink href="/docs/cli-start">nexus-sync start</DocLink> in a terminal and edit
        files with whatever you use. The CLI listens for file-system events under the folders in{" "}
        <Code>watchPaths</Code>. It does not know or care which program wrote the file. Nothing
        reads your editor state, your open tabs or your cursor.
      </p>
      <p>
        There is no VS Code extension and no plugin for any editor. Any claim that one exists is
        wrong for 0.1.0. The integration is the terminal command plus your editor saving files.
      </p>

      <H2 id="saves">How saves appear</H2>
      <p>
        One line per save, add or delete. The path is relative to the folder you ran{" "}
        <Code>start</Code> in.
      </p>
      <Pre>{`[14:21:08] ✔ Synced  src/app/page.tsx  →  shadow (41ms)`}</Pre>
      <p>
        Some editors save by writing a temporary file and renaming it over the original. On
        Windows and Linux in our tests those atomic saves were reported as a single change, not as
        an add and a delete. Autosave features that write on a delay print one line each time they
        fire, so a long autosave interval prints fewer lines than save-on-keystroke. The CLI never
        reads file contents; only the path and the event type matter.
      </p>

      <H2 id="editors">Per editor</H2>
      <DefList
        items={[
          {
            term: "VS Code",
            desc: (
              <>
                Use the integrated terminal, or a background task. See{" "}
                <DocLink href="/docs/vscode">VS Code setup</DocLink> for a task that starts the
                watcher when you open the folder.
              </>
            ),
          },
          {
            term: "JetBrains",
            desc: (
              <>
                Open the built-in terminal and run <Code>nexus-sync start</Code>. JetBrains IDEs
                save on focus loss by default, so expect a line when you switch windows.
              </>
            ),
          },
          {
            term: "Vim and Neovim",
            desc: (
              <>
                Run <Code>nexus-sync start</Code> in a split terminal or a separate pane. A{" "}
                <Code>:w</Code> prints one line.
              </>
            ),
          },
          {
            term: "Zed",
            desc: (
              <>
                Use the integrated terminal. Zed autosave on focus change prints a line per save.
              </>
            ),
          },
        ]}
      />

      <H2 id="generated">Generated files</H2>
      <p>
        The watcher reports files your tools write, not only the files you type. A formatter,
        compiler or code generator that writes into a watched folder prints a line for each file
        it touches.
      </p>
      <List>
        <li>A build step inside a watched folder prints a line per output file.</li>
        <li>
          Output folders such as <Code>.next</Code>, <Code>dist</Code> and <Code>build</Code> are
          not ignored when they sit inside a watched folder.
        </li>
        <li>
          Only <Code>node_modules</Code>, <Code>.git</Code> and <Code>.nexus</Code> are ignored,
          at any depth.
        </li>
      </List>
      <p>
        Keep <Code>watchPaths</Code> narrow so generated output does not flood the log. See{" "}
        <DocLink href="/docs/performance">performance tips</DocLink> for narrowing the watch set,
        and <DocLink href="/docs/sync-failures">sync failures</DocLink> when a save prints nothing.
      </p>
    </>
  );
}
