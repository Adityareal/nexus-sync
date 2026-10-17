import { Code, Pre } from "@/components/DocPage";
import { DefList, DocLink, H2, Lead, List } from "@/components/docs/prose";
import type { TocItem } from "@/components/docs/prose";

export const toc: TocItem[] = [
  { id: "watched", label: "Edge files are watched" },
  { id: "test-check", label: "The geo check" },
  { id: "running", label: "Running functions for real" },
  { id: "simulated", label: "Real and simulated" },
];

export default function EdgeFunctions() {
  return (
    <>
      <Lead>
        Nexus-Sync treats an edge or serverless function as another file in your project. It is
        watched and reported like any other source file. Version 0.1.0 has no edge runtime of
        its own, so nothing runs your functions.
      </Lead>

      <H2 id="watched">Edge files are watched</H2>
      <p>
        The default <Code>watchPaths</Code> include <Code>api/</Code>, where many frameworks
        keep route handlers and edge functions. When the config has no <Code>watchPaths</Code>{" "}
        field the defaults are <Code>src/</Code>, <Code>app/</Code>, <Code>pages/</Code> and{" "}
        <Code>api/</Code>. A function file under one of those folders prints the same line any
        file does when you save it.
      </p>
      <Pre>{`[12:04:31] ✔ Synced  api/geo.ts  →  shadow (28ms)
[12:04:33] ✔ Added   app/api/edge/route.ts  →  shadow (30ms)`}</Pre>
      <p>
        The CLI does not read the file, so it does not know whether the file is an edge function,
        a page or a stylesheet. It reports the path and a random latency number, nothing more.
        See <DocLink href="/docs/cli-start">nexus-sync start</DocLink> for the full output and{" "}
        <DocLink href="/docs/live-mirroring">live mirroring</DocLink> for what counts as an event.
      </p>
      <p>
        If your functions live outside the watched folders, add that folder to{" "}
        <Code>watchPaths</Code> in <DocLink href="/docs/config-reference">the config</DocLink>.
        A file in the project root, or in an unlisted folder, raises no line.
      </p>

      <H2 id="test-check">The geo check</H2>
      <p>
        The <DocLink href="/docs/cli-test">nexus-sync test</DocLink> command prints a fixed list
        of five checks, one of which names an edge function.
      </p>
      <Pre>{`  ✔ Edge function /api/geo responds correctly  (19ms)`}</Pre>
      <p>
        That line is the same on every run. It does not call <Code>/api/geo</Code>, read a file
        named <Code>geo</Code>, or measure a response. The whole suite is a fixed script that
        prints four passing checks and one failing one, then exits with code 0 either way.
      </p>

      <H2 id="running">Running functions for real</H2>
      <p>
        Use your framework for local execution. The dev server that ships with your framework
        runs edge and serverless handlers on your machine so you can call them and read the
        result.
      </p>
      <DefList
        items={[
          { term: "Next.js", desc: <>Run <Code>npm run dev</Code>, then call the route at <Code>http://localhost:3000/api/geo</Code>.</> },
          { term: "Remix", desc: <>Run <Code>npm run dev</Code> and call your loader or action route locally.</> },
          { term: "SvelteKit", desc: <>Run <Code>npm run dev</Code> and call the endpoint under <Code>src/routes</Code>.</> },
        ]}
      />
      <p>
        Run <Code>nexus-sync start</Code> in a second terminal beside the dev server if you want
        the sync log. The two do not interact; one serves your functions, the other watches files.
      </p>

      <H2 id="simulated">Real and simulated</H2>
      <List>
        <li>Real: a function file under a watched folder prints a line when you change it.</li>
        <li>Simulated: no function is deployed, invoked or warmed by the CLI.</li>
        <li>
          Simulated: the <Code>/api/geo</Code> line in <Code>test</Code> is fixed text, not a
          request.
        </li>
      </List>
      <p>
        <DocLink href="/docs/shadow-environments">Shadow environments</DocLink> describes what
        the full product does with these events. The addresses it prints end in{" "}
        <Code>.example</Code> and do not resolve.
      </p>
    </>
  );
}
