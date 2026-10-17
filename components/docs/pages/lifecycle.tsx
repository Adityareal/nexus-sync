import { Code, Pre } from "@/components/DocPage";
import { DefList, DocLink, H2, Kbd, Lead, Steps } from "@/components/docs/prose";
import type { TocItem } from "@/components/docs/prose";

export const toc: TocItem[] = [
  { id: "order", label: "The usual order" },
  { id: "start-stop", label: "Starting and stopping" },
  { id: "stop-command", label: "The stop command" },
  { id: "persists", label: "What persists" },
];

export default function Lifecycle() {
  return (
    <>
      <Lead>
        A session runs in one order: scaffold a config, start the watcher, check status while it
        runs, stop with <Kbd>Ctrl</Kbd>+<Kbd>C</Kbd>, deploy when you are ready. The only thing
        that outlives a session is the config file.
      </Lead>

      <H2 id="order">The usual order</H2>
      <Steps>
        <li>
          <DocLink href="/docs/cli-init">nexus-sync init</DocLink> scaffolds{" "}
          <Code>.nexus/config.json</Code> in the current folder. Run it once per project folder.
        </li>
        <li>
          <DocLink href="/docs/cli-start">nexus-sync start</DocLink> prints the environment
          address and watches your folders, one line per file event. It keeps running.
        </li>
        <li>
          <DocLink href="/docs/cli-status">nexus-sync status</DocLink>, in a second terminal,
          prints a view of the environment. It reads the config and does not need{" "}
          <Code>start</Code> to be running.
        </li>
        <li>
          Press <Kbd>Ctrl</Kbd>+<Kbd>C</Kbd> in the <Code>start</Code> terminal to end the
          watcher.
        </li>
        <li>
          <DocLink href="/docs/cli-deploy">nexus-sync deploy</DocLink> prints four build steps
          and a production address.
        </li>
      </Steps>
      <p>
        You can also run <DocLink href="/docs/cli-test">nexus-sync test</DocLink>,{" "}
        <DocLink href="/docs/cli-db">nexus-sync db sandbox</DocLink> and{" "}
        <DocLink href="/docs/cli-collab">nexus-sync collab invite</DocLink> at any point. Of
        these, <Code>start</Code>, <Code>status</Code>, <Code>deploy</Code>,{" "}
        <Code>db sandbox</Code> and <Code>collab invite</Code> need a config;{" "}
        <Code>init</Code>, <Code>stop</Code> and <Code>test</Code> do not.
      </p>

      <H2 id="start-stop">Starting and stopping</H2>
      <p>
        <Code>start</Code> runs in the foreground and holds the terminal. End it in that same
        terminal.
      </p>
      <Pre>{`  Stopping file watcher...
  ✔ Shadow sync stopped. Goodbye! 👋`}</Pre>
      <p>
        It closes the watcher and exits with code 0. This is the only way to stop a running{" "}
        <Code>start</Code> session.
      </p>

      <H2 id="stop-command">The stop command</H2>
      <p>
        <DocLink href="/docs/cli-stop">nexus-sync stop</DocLink> is a separate command, not a way
        to end a running session. In 0.1.0 it prints a confirmation and exits. It has no way to
        reach the <Code>start</Code> process, and there is no background pod to suspend.
      </p>
      <Pre>{`  Shutting down shadow environment...
  ✔ File watcher stopped.
  ✔ Shadow environment suspended.`}</Pre>
      <p>
        Read it as a message about what the product would do, not as an action against a process.
        To actually stop syncing, use <Kbd>Ctrl</Kbd>+<Kbd>C</Kbd> in the right terminal.
      </p>

      <H2 id="persists">What persists</H2>
      <DefList
        items={[
          {
            term: ".nexus/config.json",
            desc: "The only file the CLI writes. It stays until you delete it and carries your settings between sessions.",
          },
          {
            term: "The environment",
            desc: "Nothing. No pod, no container and no cloud state exists, so there is nothing left running after a session ends.",
          },
          {
            term: "Invite tokens",
            desc: (
              <>
                Not stored. Each <Code>collab invite</Code> generates a new token and keeps none.
                See <DocLink href="/docs/multiplayer">multiplayer</DocLink>.
              </>
            ),
          },
        ]}
      />
      <p>
        To remove an environment, delete the <Code>.nexus</Code> folder. There is no uninstall
        step for cloud state because none was created. For the full set of fields the config
        holds, see <DocLink href="/docs/config-reference">config reference</DocLink>.
      </p>
    </>
  );
}
