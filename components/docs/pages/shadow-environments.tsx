import { Code } from "@/components/DocPage";
import { DefList, DocLink, H2, Lead, List } from "@/components/docs/prose";
import type { TocItem } from "@/components/docs/prose";

export const toc: TocItem[] = [
  { id: "concept", label: "The concept" },
  { id: "primitives", label: "The five primitives" },
  { id: "simulated", label: "What 0.1.0 simulates" },
  { id: "real", label: "What 0.1.0 does for real" },
  { id: "why", label: "Why a simulation" },
];

export default function ShadowEnvironments() {
  return (
    <>
      <Lead>
        A shadow environment is a live cloud container that mirrors your full stack while you
        develop locally. In nexus-sync-cli 0.1.0 the environment is simulated. The commands
        print the output a real one would, and nothing leaves your machine.
      </Lead>

      <H2 id="concept">The concept</H2>
      <p>
        You run your editor and your app on your own machine. A shadow environment is meant to
        hold a running copy of the same stack in the cloud: the frontend, the backend, the
        database and the edge functions. You save a file, the change reflects in that copy, and
        a live URL built from your project name lets a teammate see it. That is the product
        Nexus-Sync describes.
      </p>
      <p>
        The CLI represents that environment with five commands. Each command stands for one part
        of the product and prints what the real system would report.
      </p>

      <H2 id="primitives">The five primitives</H2>
      <DefList
        items={[
          {
            term: "Ephemeral pod",
            desc: (
              <>
                The container the environment runs in, addressed by your project name.{" "}
                <DocLink href="/docs/ephemeral-pods">Ephemeral pods</DocLink>.
              </>
            ),
          },
          {
            term: "Mirror sync engine",
            desc: (
              <>
                The watcher that reports every file you save, add or delete.{" "}
                <DocLink href="/docs/live-mirroring">Live mirroring</DocLink>.
              </>
            ),
          },
          {
            term: "Instant preview",
            desc: (
              <>
                The shared address for the environment.{" "}
                <DocLink href="/docs/preview-urls">Preview URLs</DocLink>.
              </>
            ),
          },
          {
            term: "Database sandbox",
            desc: (
              <>
                An anonymized fork of your production schema.{" "}
                <DocLink href="/docs/database-sandbox">Database sandbox</DocLink>.
              </>
            ),
          },
          {
            term: "Multiplayer collaboration",
            desc: (
              <>
                An invite link that lets a teammate join.{" "}
                <DocLink href="/docs/multiplayer">Multiplayer</DocLink>.
              </>
            ),
          },
        ]}
      />

      <H2 id="simulated">What 0.1.0 simulates</H2>
      <p>
        Nothing in this list happens off your machine. The output is realistic so you can see the
        shape of the product, but no resource exists behind it.
      </p>
      <List>
        <li>No container or pod is created. There is nothing to connect to or shut down.</li>
        <li>
          No files are uploaded. The sync lines report local events; the transfer is not real.
        </li>
        <li>
          Every <Code>.nexus-sync.example</Code> address is a reserved example domain. It does
          not resolve, so opening it in a browser fails.
        </li>
        <li>No database is cloned and nothing listens on the sandbox URL.</li>
        <li>No email is sent for a collaboration invite and the token is never stored.</li>
        <li>
          Latency, uptime and the test results are generated for display. They measure nothing.
        </li>
      </List>
      <p>
        Act on this before you wire anything up. Do not point a connection string at a sandbox
        URL, do not wait for an invite email, and do not gate a deploy on the exit code.
      </p>

      <H2 id="real">What 0.1.0 does for real</H2>
      <p>
        Two things are real. The CLI reads and writes{" "}
        <Code>.nexus/config.json</Code> in the current folder, and{" "}
        <DocLink href="/docs/cli-start">nexus-sync start</DocLink> watches the folders in{" "}
        <Code>watchPaths</Code> and prints a line for each file-system event it receives. The
        prompts, spinners and progress bars are real terminal output too. Everything else is a
        rehearsal of the product.
      </p>

      <H2 id="why">Why a simulation</H2>
      <p>
        0.1.0 is the command surface before the cloud backend exists. You can install it, learn
        the commands, script against the exit codes and see the output your tooling will meet,
        without an account or a network connection. For the full product flow in a browser, see
        the <DocLink href="/start">/start</DocLink> demo.
      </p>
    </>
  );
}
