import { Code, Pre } from "@/components/DocPage";
import { DefList, DocLink, H2, Lead, List } from "@/components/docs/prose";
import type { TocItem } from "@/components/docs/prose";

export const toc: TocItem[] = [
  { id: "what-matters", label: "What actually matters" },
  { id: "nextjs", label: "Next.js" },
  { id: "remix", label: "Remix" },
  { id: "sveltekit", label: "SvelteKit" },
  { id: "other", label: "Other frameworks" },
];

export default function Frameworks() {
  return (
    <>
      <Lead>
        Nexus-Sync works with any framework. The framework you pick during{" "}
        <DocLink href="/docs/cli-init">init</DocLink> is recorded and never read again. What
        decides what gets watched is <Code>watchPaths</Code>.
      </Lead>

      <H2 id="what-matters">What actually matters</H2>
      <p>
        The <Code>framework</Code> field in <Code>.nexus/config.json</Code> is one of four
        choices: <Code>Next.js</Code>, <Code>Remix</Code>, <Code>SvelteKit</Code> or{" "}
        <Code>Other</Code>. In 0.1.0 no command reads it. It changes nothing about which files{" "}
        <DocLink href="/docs/cli-start">start</DocLink> reports. See{" "}
        <DocLink href="/docs/config-reference">config reference</DocLink> for the full field
        list.
      </p>
      <p>
        The field that governs behaviour is <Code>watchPaths</Code>. It lists the folders{" "}
        <Code>start</Code> watches, relative to the folder you run it from. When the config has
        no <Code>watchPaths</Code>, the defaults are <Code>src/</Code>, <Code>app/</Code>,{" "}
        <Code>pages/</Code> and <Code>api/</Code>. Set it to the folders your framework keeps
        source in, and nothing else. Narrow lists watch fewer files; see{" "}
        <DocLink href="/docs/performance">performance tips</DocLink>.
      </p>

      <H2 id="nextjs">Next.js</H2>
      <p>
        A Next.js app keeps routes in <Code>app/</Code> or <Code>pages/</Code>, shared code in{" "}
        <Code>src/</Code>, components in <Code>components/</Code> and static assets in{" "}
        <Code>public/</Code>. A reasonable <Code>watchPaths</Code>:
      </p>
      <Pre label=".nexus/config.json">{`"watchPaths": ["app/", "pages/", "src/", "components/", "public/"]`}</Pre>
      <p>
        The build output folder <Code>.next/</Code> is not ignored. If it sits inside a watched
        folder, every file Next.js writes during a build prints a line. Keep <Code>.next/</Code>{" "}
        out of your watch list. A full Next.js walkthrough is in{" "}
        <DocLink href="/docs/tutorial-nextjs">building a Next.js app</DocLink>.
      </p>

      <H2 id="remix">Remix</H2>
      <p>
        Remix keeps routes and server code under <Code>app/</Code> and static files under{" "}
        <Code>public/</Code>.
      </p>
      <Pre label=".nexus/config.json">{`"watchPaths": ["app/", "public/"]`}</Pre>
      <p>
        The compiled output in <Code>build/</Code> is not ignored either. Leave it off the list.
      </p>

      <H2 id="sveltekit">SvelteKit</H2>
      <p>
        SvelteKit keeps source under <Code>src/</Code> and static assets under{" "}
        <Code>static/</Code>.
      </p>
      <Pre label=".nexus/config.json">{`"watchPaths": ["src/", "static/"]`}</Pre>
      <p>
        The generated <Code>.svelte-kit/</Code> folder and the <Code>build/</Code> output are
        not ignored. Keep them out of the watch list.
      </p>

      <H2 id="other">Other frameworks</H2>
      <p>
        Pick <Code>Other</Code> at init for anything else. The CLI does not care what tool built
        your project. Point <Code>watchPaths</Code> at the folders that hold the files you edit.
      </p>
      <DefList
        items={[
          { term: "Vite", desc: <>Watch <Code>src/</Code> and <Code>public/</Code>. The output folder is <Code>dist/</Code>.</> },
          { term: "Astro", desc: <>Watch <Code>src/</Code> and <Code>public/</Code>. The output folder is <Code>dist/</Code>.</> },
          { term: "Nuxt", desc: <>Watch <Code>pages/</Code>, <Code>components/</Code>, <Code>server/</Code> and <Code>public/</Code>.</> },
        ]}
      />
      <p>
        The CLI never reads file contents and runs no framework code. It reports file-system
        events and nothing more. To run your app for real, use your framework&apos;s own dev
        server. Nothing is uploaded, and the <Code>.example</Code> address never resolves.{" "}
        <DocLink href="/docs/shadow-environments">Shadow environments</DocLink> explains the
        simulation model.
      </p>
      <List>
        <li>The framework field is recorded, not acted on.</li>
        <li>Set watchPaths to your source folders.</li>
        <li>Keep build output folders off the list.</li>
      </List>
    </>
  );
}
