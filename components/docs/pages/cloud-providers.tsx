import { Code, Pre } from "@/components/DocPage";
import { DefList, DocLink, H2, Lead, List } from "@/components/docs/prose";
import type { TocItem } from "@/components/docs/prose";

export const toc: TocItem[] = [
  { id: "no-target", label: "Deploy has no target" },
  { id: "regions", label: "Region names" },
  { id: "keep-pipeline", label: "Keep your real pipeline" },
  { id: "where-it-fits", label: "Where Nexus-Sync fits" },
];

export default function CloudProviders() {
  return (
    <>
      <Lead>
        The <DocLink href="/docs/cli-deploy">deploy</DocLink> command takes no provider and no
        target. It touches no cloud account. Vercel, Railway and AWS keep working exactly as they
        do now, and Nexus-Sync sits beside them.
      </Lead>

      <H2 id="no-target">Deploy has no target</H2>
      <p>
        <Code>nexus-sync deploy</Code> takes no arguments and its only option is <Code>-h</Code>,{" "}
        <Code>--help</Code>. You cannot point it at Vercel, Railway, AWS or any other provider,
        because 0.1.0 has no such option. It prints four progress steps and a production
        address, then exits 0.
      </p>
      <Pre>{`  ✔ ⚡ Building project...
  ✔ ⚡ Running pre-deploy tests...
  ✔ ⚡ Pushing to Shadow Environment...
  ✔ ⚡ Warming edge nodes...

  ✦ Production deploy complete: https://my-app.nexus-sync.example
  ✦ Deploy time: 2.4s`}</Pre>
      <p>
        Nothing is built and nothing is pushed. The address is the same one{" "}
        <DocLink href="/docs/cli-start">start</DocLink> shows, built from{" "}
        <Code>projectName</Code>, and it does not resolve. The deploy time is measured locally
        against the four spinner steps. See{" "}
        <DocLink href="/docs/cli-deploy">deploy</DocLink> for the full breakdown.
      </p>

      <H2 id="regions">Region names</H2>
      <p>
        At <DocLink href="/docs/cli-init">init</DocLink> you pick a region:{" "}
        <Code>us-east-1</Code>, <Code>eu-west-1</Code> or <Code>ap-south-1</Code>. The names look
        like AWS regions. In 0.1.0 the value is recorded in the config and never read by any
        command. It selects no data centre and appears in no output. See{" "}
        <DocLink href="/docs/config-reference">config reference</DocLink>.
      </p>

      <H2 id="keep-pipeline">Keep your real pipeline</H2>
      <p>
        Nexus-Sync does not replace your deploy tooling. Keep using each provider&apos;s own
        path.
      </p>
      <DefList
        items={[
          { term: "Vercel", desc: <>Keep deploying with <Code>vercel</Code> or a git integration. Nexus-Sync changes nothing about it.</> },
          { term: "Railway", desc: <>Keep using <Code>railway up</Code> or Railway&apos;s git deploys.</> },
          { term: "AWS", desc: "Keep your existing CDK, SAM, Terraform or console workflow." },
        ]}
      />
      <p>
        The <Code>deploy</Code> command is a demonstration of the one-command flow the product
        describes. Treat its exit code as a sign the command ran, not as proof a release went
        out.
      </p>

      <H2 id="where-it-fits">Where Nexus-Sync fits</H2>
      <p>
        The CLI is a local file watcher and config writer. Its place in your workflow is during
        development, not release. Run <DocLink href="/docs/cli-start">start</DocLink> beside your
        editor to see a line per save, and run your provider&apos;s deploy when you ship. See{" "}
        <DocLink href="/docs/shadow-environments">shadow environments</DocLink> for what the full
        product does with those file events.
      </p>
      <List>
        <li>Deploy picks no provider and reaches no account.</li>
        <li>Region is a recorded label, not a data-centre choice.</li>
        <li>Your real deploy pipeline is unchanged.</li>
      </List>
    </>
  );
}
