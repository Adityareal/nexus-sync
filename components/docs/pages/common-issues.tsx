import { Code, Pre } from "@/components/DocPage";
import { DocLink, ExtLink, H2, Kbd, Lead } from "@/components/docs/prose";
import type { TocItem } from "@/components/docs/prose";

export const toc: TocItem[] = [
  { id: "not-found", label: "Command not found" },
  { id: "permissions", label: "Permission errors on install" },
  { id: "powershell", label: "PowerShell blocks the script" },
  { id: "no-config", label: "No config found" },
  { id: "unknown", label: "Unknown command or option" },
  { id: "init-terminal", label: "init needs a terminal" },
  { id: "config-json", label: "Config name and JSON errors" },
  { id: "display", label: "Boxes instead of glyphs" },
  { id: "example-url", label: "The .example URL does not load" },
];

export default function CommonIssues() {
  return (
    <>
      <Lead>
        Most problems with nexus-sync come from the shell, the install, or the config file, not
        from the command itself. This page lists the errors you are likely to see and the fix
        for each.
      </Lead>

      <H2 id="not-found">Command not found</H2>
      <p>
        After a global install the shell may still report that the command is not found, or on
        Windows that <Code>nexus-sync</Code> is not recognized as a command. The npm global bin
        folder is not on your <Code>PATH</Code>, or the current shell loaded its <Code>PATH</Code>{" "}
        before the install.
      </p>
      <Pre>{`npm config get prefix
# add the printed path's bin folder to PATH, then open a new terminal`}</Pre>
      <p>
        Open a new terminal so the updated <Code>PATH</Code> takes effect. If you would rather
        not change <Code>PATH</Code>, run the CLI through npx instead, which needs no global
        install.
      </p>
      <Pre>npx nexus-sync-cli status</Pre>

      <H2 id="permissions">Permission errors on install</H2>
      <p>
        A global install that prints <Code>EACCES</Code> means npm cannot write to its global
        folder. Do not rerun the install with <Code>sudo</Code>, which leaves root-owned files
        in your npm tree. Use npx, which installs nothing, or follow npm&apos;s own guide to move the
        global folder somewhere you own.
      </p>
      <p>
        <ExtLink href="https://docs.npmjs.com/resolving-eacces-permissions-errors-when-installing-packages-globally">
          Resolving EACCES permissions errors
        </ExtLink>{" "}
        covers the folder change in full.
      </p>

      <H2 id="powershell">PowerShell blocks the script</H2>
      <p>
        On Windows, PowerShell may refuse to run the <Code>nexus-sync.ps1</Code> shim with{" "}
        <Code>running scripts is disabled on this system</Code>. That is the execution policy,
        not the CLI. Allow local scripts for your own account, or run the command from{" "}
        <Code>cmd</Code> instead.
      </p>
      <Pre>Set-ExecutionPolicy -Scope CurrentUser RemoteSigned</Pre>

      <H2 id="no-config">No config found</H2>
      <p>
        Commands that read the config print this and exit with code 1:
      </p>
      <Pre>{`  ✗ No config found. Run \`nexus-sync init\` first.`}</Pre>
      <p>
        The CLI looks for <Code>.nexus/config.json</Code> in the current folder only, never in a
        parent. Change to the folder that holds <Code>.nexus/</Code>, or run{" "}
        <DocLink href="/docs/cli-init">nexus-sync init</DocLink> there.{" "}
        <DocLink href="/docs/cli-start">start</DocLink>,{" "}
        <DocLink href="/docs/cli-status">status</DocLink>,{" "}
        <DocLink href="/docs/cli-deploy">deploy</DocLink>,{" "}
        <DocLink href="/docs/cli-db">db sandbox</DocLink> and{" "}
        <DocLink href="/docs/cli-collab">collab invite</DocLink> all need the config;{" "}
        <DocLink href="/docs/cli-init">init</DocLink>,{" "}
        <DocLink href="/docs/cli-stop">stop</DocLink> and{" "}
        <DocLink href="/docs/cli-test">test</DocLink> do not.
      </p>

      <H2 id="unknown">Unknown command or option</H2>
      <p>
        An old name or a flag the CLI does not have prints a commander error to stderr and exits
        with code 1. Older versions of these docs used command names the CLI has never had:{" "}
        <Code>up</Code> is <Code>start</Code>, <Code>down</Code> is{" "}
        <Code>stop</Code>, and <Code>share</Code> is <Code>collab invite</Code>.
      </p>
      <Pre>{`$ nexus-sync share
error: unknown command 'share'
(Did you mean start?)

$ nexus-sync status --json
error: unknown option '--json'`}</Pre>
      <p>
        There is no <Code>--json</Code>, <Code>--verbose</Code> or <Code>--no-color</Code> flag.
        The only option on any command is <Code>-h</Code>, <Code>--help</Code>. See{" "}
        <DocLink href="/docs/cli-all">all commands</DocLink> for the full list.
      </p>

      <H2 id="init-terminal">init needs a terminal</H2>
      <p>
        <Code>init</Code> asks three questions, so it needs an interactive terminal. Piped input
        or a CI runner closes stdin and the command crashes with a readline error. In CI, commit{" "}
        <Code>.nexus/config.json</Code> to the repo or write it with a script rather than running{" "}
        <Code>init</Code>.
      </p>
      <p>
        A project name that is not lowercase letters, digits and hyphens is rejected at the
        prompt with <Code>Lowercase alphanumeric + hyphens only</Code>.
      </p>

      <H2 id="config-json">Config name and JSON errors</H2>
      <p>
        The CLI does not validate a hand-edited config. A name such as <Code>My App</Code>{" "}
        produces an address with a space in it, because only the prompt enforces the naming rule.
        Invalid JSON, or a file saved with a UTF-8 byte order mark, crashes the command with a
        Node.js <Code>SyntaxError</Code> and exit code 1:
      </p>
      <Pre>{`SyntaxError: Expected double-quoted property name in JSON at position 27`}</Pre>
      <p>
        Windows PowerShell 5.1 <Code>Set-Content -Encoding utf8</Code> adds a byte order mark;
        PowerShell 7 does not. Save the file as UTF-8 without a BOM and keep the JSON valid. See{" "}
        <DocLink href="/docs/config-reference">config reference</DocLink>.
      </p>

      <H2 id="display">Boxes instead of glyphs</H2>
      <p>
        The output uses Unicode glyphs such as <Code>✦</Code> and <Code>✔</Code>. A modern
        terminal renders them. An old console may show boxes or question marks instead. The
        command still works; only the display differs. Windows Terminal and current macOS and
        Linux terminals show the glyphs correctly.
      </p>

      <H2 id="example-url">The .example URL does not load</H2>
      <p>
        Every address the CLI prints ends in <Code>.nexus-sync.example</Code>. The{" "}
        <Code>.example</Code> top-level domain is reserved and never resolves, so opening the
        link in a browser fails by design. In 0.1.0 those URLs are printed, not served. See{" "}
        <DocLink href="/docs/preview-urls">preview URLs</DocLink> for what they represent, and{" "}
        the <DocLink href="/start">/start</DocLink> demo for the full product flow in a
        browser.
      </p>
      <p>
        When you report a problem, press <Kbd>Ctrl</Kbd>+<Kbd>C</Kbd> to stop a running{" "}
        <Code>start</Code> first, then open an issue. See{" "}
        <DocLink href="/docs/support">support</DocLink>.
      </p>
    </>
  );
}
