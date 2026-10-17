import { Code, Pre } from "@/components/DocPage";
import { DocLink, H2, Kbd, Lead } from "@/components/docs/prose";
import type { TocItem } from "@/components/docs/prose";

export const toc: TocItem[] = [
  { id: "usage", label: "Usage" },
  { id: "output", label: "What it prints" },
  { id: "stopping", label: "Stopping a running watcher" },
  { id: "simulated", label: "Real and simulated" },
];

export default function CliStop() {
  return (
    <>
      <Lead>
        Prints a confirmation that the shadow environment is suspended, then exits. It does not
        stop a running <DocLink href="/docs/cli-start">nexus-sync start</DocLink>.
      </Lead>

      <H2 id="usage">Usage</H2>
      <Pre>nexus-sync stop</Pre>
      <p>
        It takes no arguments. The only option is <Code>-h</Code>, <Code>--help</Code>. It
        needs no config file, so it runs from any folder.
      </p>

      <H2 id="output">What it prints</H2>
      <p>Four lines, then a blank line and a hint, and it exits with code 0.</p>
      <Pre>{`  Shutting down shadow environment...
  ✔ File watcher stopped.
  ✔ Shadow environment suspended.

  Run \`nexus-sync start\` to resume syncing.`}</Pre>
      <p>
        The text is the same every run. There is no state to read and nothing to report, so
        the command prints these lines whether or not <Code>start</Code> has ever run.
      </p>

      <H2 id="stopping">Stopping a running watcher</H2>
      <p>
        A <Code>start</Code> watcher keeps running until you press{" "}
        <Kbd>Ctrl</Kbd>+<Kbd>C</Kbd> in its own terminal. Running <Code>stop</Code> from a
        second terminal does not reach it. In 0.1.0 the two commands share no state and{" "}
        <Code>stop</Code> has no way to signal another process, so the watcher carries on.
      </p>

      <H2 id="simulated">Real and simulated</H2>
      <p>
        Nothing is suspended. No process is stopped, no environment is torn down, and the{" "}
        <Code>File watcher stopped</Code> line does not refer to any watcher that is running.
        The command prints a fixed message and returns. To actually end a sync session, stop
        its <Code>start</Code> with <Kbd>Ctrl</Kbd>+<Kbd>C</Kbd>.{" "}
        <DocLink href="/docs/shadow-environments">Shadow environments</DocLink> explains the
        lifecycle the full product models.
      </p>
    </>
  );
}
