import { Code, Pre } from "@/components/DocPage";
import { DefList, DocLink, H2, Lead, List } from "@/components/docs/prose";
import type { TocItem } from "@/components/docs/prose";

export const toc: TocItem[] = [
  { id: "what", label: "What a pod is" },
  { id: "address", label: "How a pod is addressed" },
  { id: "region", label: "Region" },
  { id: "lifetime", label: "Lifetime" },
  { id: "simulated", label: "What 0.1.0 does" },
];

export default function EphemeralPods() {
  return (
    <>
      <Lead>
        A pod is the container a shadow environment runs in. It is addressed by your project
        name and lives while <DocLink href="/docs/cli-start">nexus-sync start</DocLink> is
        running. In 0.1.0 no pod is created; the CLI describes one.
      </Lead>

      <H2 id="what">What a pod is</H2>
      <p>
        In the product, a pod holds a running copy of your stack: the frontend, the backend, the
        database and the edge functions. It is ephemeral because it exists for the length of a
        session rather than as standing infrastructure. You start one, work against it, and it
        goes away. The pod is the thing a{" "}
        <DocLink href="/docs/shadow-environments">shadow environment</DocLink> is.
      </p>

      <H2 id="address">How a pod is addressed</H2>
      <p>
        A pod has one identity: your project name. The CLI reads{" "}
        <Code>projectName</Code> from <Code>.nexus/config.json</Code> and builds the environment
        address from it.
      </p>
      <Pre>{`  ✦ Shadow live at: https://my-app.nexus-sync.example`}</Pre>
      <p>
        Two folders with the same project name describe the same pod. Two folders with different
        project names describe two separate pods. To run isolated environments, give each one its
        own project name; see <DocLink href="/docs/branch-isolation">branch isolation</DocLink>.
        The project name follows DNS label rules because it becomes a host name, so it is
        lowercase letters, digits and hyphens. For the address rules in full, see{" "}
        <DocLink href="/docs/preview-urls">preview URLs</DocLink>.
      </p>

      <H2 id="region">Region</H2>
      <p>
        <Code>init</Code> asks for a preferred region and records it in the config as{" "}
        <Code>region</Code>. In 0.1.0 no command reads that field. The region names look like
        cloud regions, but nothing is placed in one and the environment address does not change
        with it. Treat the field as a note to yourself until a release reads it. See{" "}
        <DocLink href="/docs/config-reference">config reference</DocLink>.
      </p>

      <H2 id="lifetime">Lifetime</H2>
      <p>
        A pod is tied to a running <Code>start</Code> session.
      </p>
      <List>
        <li>Running <Code>start</Code> brings the pod up and prints its address.</li>
        <li>
          Pressing <Code>Ctrl</Code> and <Code>C</Code> ends the session. The CLI prints a
          shutdown line and exits.
        </li>
        <li>
          There are no pod sizes, no idle timers and no automatic shutdown in 0.1.0. The only
          thing that persists between sessions is <Code>.nexus/config.json</Code>.
        </li>
      </List>
      <p>
        For the order commands run in and what each one leaves behind, see{" "}
        <DocLink href="/docs/lifecycle">lifecycle</DocLink>.
      </p>

      <H2 id="simulated">What 0.1.0 does</H2>
      <DefList
        items={[
          {
            term: "start",
            desc: "Prints the pod address and watches your files. No container is created.",
          },
          {
            term: "status",
            desc: (
              <>
                Prints a view of the pod with a sync state, an uptime and a latency. The uptime
                and latency are generated each run and measure nothing. See{" "}
                <DocLink href="/docs/cli-status">nexus-sync status</DocLink>.
              </>
            ),
          },
          {
            term: "stop",
            desc: (
              <>
                Prints a suspended-environment message. It does not reach a running{" "}
                <Code>start</Code> and there is no pod to suspend. See{" "}
                <DocLink href="/docs/cli-stop">nexus-sync stop</DocLink>.
              </>
            ),
          },
        ]}
      />
      <p>
        Nothing listens at the pod address. Opening it in a browser fails because{" "}
        <Code>.nexus-sync.example</Code> is a reserved domain that does not resolve.
      </p>
    </>
  );
}
