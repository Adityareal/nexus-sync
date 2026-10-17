import { Code, Pre } from "@/components/DocPage";
import { DefList, DocLink, ExtLink, H2, Lead, List } from "@/components/docs/prose";
import type { TocItem } from "@/components/docs/prose";

export const toc: TocItem[] = [
  { id: "no-connections", label: "The CLI opens no connections" },
  { id: "nothing-to-allow", label: "Nothing to allowlist" },
  { id: "proxies", label: "Proxies and install" },
  { id: "offline", label: "Working offline" },
  { id: "vpc-peering", label: "VPC peering" },
];

export default function VpcNetworking() {
  return (
    <>
      <Lead>
        The <Code>nexus-sync</Code> CLI makes no network requests. There is nothing to route,
        allowlist or peer for the tool itself in 0.1.0.
      </Lead>

      <H2 id="no-connections">The CLI opens no connections</H2>
      <p>
        Every command reads and writes <Code>.nexus/config.json</Code> and listens for
        file-system events. None of them open a socket, resolve a host or send telemetry. The
        addresses the commands print, such as the live URL and the sandbox URL, are reserved
        example domains that never resolve. The{" "}
        <DocLink href="/docs/security">security model</DocLink> covers what the CLI does and does
        not touch.
      </p>
      <DefList
        items={[
          { term: "Outbound requests", desc: "None. No API calls, no telemetry, no update check." },
          { term: "Listening ports", desc: "None. The sandbox URL names a port but nothing binds it." },
          { term: "DNS", desc: "No lookups. The .example addresses are never resolved." },
        ]}
      />

      <H2 id="nothing-to-allow">Nothing to allowlist</H2>
      <p>
        Because the CLI stays on the local machine, a firewall, security group or egress policy
        does not block it. You do not add a rule to run it inside a VPC, a locked-down corporate
        network or an air-gapped host. A command that needs a config and does not find one still
        fails the same way everywhere, with no network involved.
      </p>

      <H2 id="proxies">Proxies and install</H2>
      <p>
        The one time the network matters is installation, which runs through npm, not the CLI. If
        your network requires a proxy, configure npm before you install.
      </p>
      <Pre>{`npm config set proxy http://proxy.internal:8080
npm config set https-proxy http://proxy.internal:8080
npm install -g nexus-sync-cli`}</Pre>
      <p>
        See npm&apos;s own guidance on{" "}
        <ExtLink href="https://docs.npmjs.com/cli/v10/using-npm/config#proxy">
          proxy configuration
        </ExtLink>{" "}
        for authenticated proxies and registry mirrors. Once the package is installed the CLI
        never contacts the proxy again.
      </p>

      <H2 id="offline">Working offline</H2>
      <p>
        After it is installed, the CLI runs with no network at all. You can disconnect the
        machine and every command behaves the same.
      </p>
      <List>
        <li>
          <DocLink href="/docs/cli-init">init</DocLink>, <DocLink href="/docs/cli-start">start</DocLink>,{" "}
          <DocLink href="/docs/cli-status">status</DocLink> and the rest read local files only.
        </li>
        <li>
          The printed URLs still appear. They are strings built from <Code>projectName</Code>,
          not live endpoints.
        </li>
        <li>
          Installing on an offline machine is the only step that needs planning; see{" "}
          <DocLink href="/docs/self-hosted">offline and self-hosted use</DocLink>.
        </li>
      </List>

      <H2 id="vpc-peering">VPC peering</H2>
      <p>
        VPC peering is listed as part of the Enterprise plan on the site. It describes the hosted
        product, not the CLI, and there is nothing to configure for it in 0.1.0. The CLI needs no
        account and connects to no tenancy. For what each plan includes, see the{" "}
        <DocLink href="/#pricing">pricing section</DocLink> and{" "}
        <DocLink href="/docs/cost">pricing and cost</DocLink>.
      </p>
    </>
  );
}
