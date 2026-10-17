import { Code, Pre } from "@/components/DocPage";
import { DefList, DocLink, H2, Lead } from "@/components/docs/prose";
import type { TocItem } from "@/components/docs/prose";

export const toc: TocItem[] = [
  { id: "help", label: "The command list" },
  { id: "commands", label: "What each one does" },
  { id: "global", label: "Global options" },
  { id: "config", label: "Which need a config" },
  { id: "exit", label: "Exit codes" },
];

export default function CliAll() {
  return (
    <>
      <Lead>
        The <Code>nexus-sync</Code> command has eight subcommands. Each one takes no
        arguments beyond its own, and the only option any of them accepts is{" "}
        <Code>-h</Code>, <Code>--help</Code>.
      </Lead>

      <H2 id="help">The command list</H2>
      <p>
        Run <Code>nexus-sync</Code> with no arguments, or with <Code>--help</Code>, to print
        the usage line and the full list. The usage line reads Usage, then the binary name with
        an options and a command placeholder.
      </p>
      <Pre>{`✦ Nexus-Sync ${"\u2014"} develop locally, run in the cloud.

Options:
  -V, --version   output the version number
  -h, --help      display help for command

Commands:
  init            Scaffold a .nexus/ config directory
  start           Start real-time file sync to shadow env
  stop            Stop the shadow sync watcher
  status          Show current sync status
  db              Database management commands
  collab          Collaboration commands
  test            Run simulated test suite
  deploy          Deploy to production
  help [command]  display help for command`}</Pre>
      <p>
        You can also read the help for one command with{" "}
        <Code>nexus-sync help &lt;command&gt;</Code>, for example{" "}
        <Code>nexus-sync help start</Code>. It prints the same text as{" "}
        <Code>nexus-sync start --help</Code>.
      </p>

      <H2 id="commands">What each one does</H2>
      <p>Two commands have a subcommand of their own: <Code>db sandbox</Code> and <Code>collab invite</Code>.</p>
      <DefList
        items={[
          {
            term: "init",
            desc: (
              <>
                Asks three questions and writes <Code>.nexus/config.json</Code>.{" "}
                <DocLink href="/docs/cli-init">nexus-sync init</DocLink>.
              </>
            ),
          },
          {
            term: "start",
            desc: (
              <>
                Watches your folders and prints a line per file event.{" "}
                <DocLink href="/docs/cli-start">nexus-sync start</DocLink>.
              </>
            ),
          },
          {
            term: "stop",
            desc: (
              <>
                Prints a suspend confirmation. It does not stop a running{" "}
                <Code>start</Code>. <DocLink href="/docs/cli-stop">nexus-sync stop</DocLink>.
              </>
            ),
          },
          {
            term: "status",
            desc: (
              <>
                Prints a status panel. The values are generated fresh each run.{" "}
                <DocLink href="/docs/cli-status">nexus-sync status</DocLink>.
              </>
            ),
          },
          {
            term: "db sandbox",
            desc: (
              <>
                Prints two progress bars and a Postgres sandbox URL.{" "}
                <DocLink href="/docs/cli-db">nexus-sync db</DocLink>.
              </>
            ),
          },
          {
            term: "collab invite <email>",
            desc: (
              <>
                Prints an invite line with a generated token.{" "}
                <DocLink href="/docs/cli-collab">nexus-sync collab</DocLink>.
              </>
            ),
          },
          {
            term: "test",
            desc: (
              <>
                Prints a fixed list of five checks, four passing and one failing.{" "}
                <DocLink href="/docs/cli-test">nexus-sync test</DocLink>.
              </>
            ),
          },
          {
            term: "deploy",
            desc: (
              <>
                Prints four build steps and a production URL.{" "}
                <DocLink href="/docs/cli-deploy">nexus-sync deploy</DocLink>.
              </>
            ),
          },
        ]}
      />

      <H2 id="global">Global options</H2>
      <p>
        <Code>nexus-sync --version</Code>, or <Code>-V</Code>, prints the version and exits.
        The current version is 0.1.0.
      </p>
      <Pre>{`$ nexus-sync --version
0.1.0`}</Pre>
      <p>
        <Code>nexus-sync --help</Code>, or <Code>-h</Code>, prints the command list above.
        Every subcommand accepts <Code>--help</Code> as well, and that is its only option.
        There is no verbose flag, no JSON output flag and no colour flag.
      </p>

      <H2 id="config">Which need a config</H2>
      <p>
        Five commands read <Code>.nexus/config.json</Code> from the current folder and stop
        with an error if it is missing: <Code>start</Code>, <Code>status</Code>,{" "}
        <Code>deploy</Code>, <Code>db sandbox</Code> and <Code>collab invite</Code>. Three run
        without one: <Code>init</Code>, <Code>stop</Code> and <Code>test</Code>. The fields in
        that file are described in the{" "}
        <DocLink href="/docs/config-reference">config reference</DocLink>.
      </p>

      <H2 id="exit">Exit codes</H2>
      <p>
        A command exits 0 on success and 1 on failure. A failing check inside{" "}
        <Code>test</Code> still exits 0, so the exit code is not a test result. An unknown
        command, an unknown option, a missing required argument, a missing config file and
        invalid config JSON all exit 1. Each message and its meaning is listed in the{" "}
        <DocLink href="/docs/output-reference">output and exit codes reference</DocLink>.
      </p>
    </>
  );
}
