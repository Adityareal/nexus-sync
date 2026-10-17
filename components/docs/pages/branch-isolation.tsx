import { Code, Pre } from "@/components/DocPage";
import { DocLink, H2, Lead, List, Steps } from "@/components/docs/prose";
import type { TocItem } from "@/components/docs/prose";

export const toc: TocItem[] = [
  { id: "no-git", label: "The CLI does not know your branch" },
  { id: "one-per-name", label: "One environment per project name per folder" },
  { id: "worktree", label: "Isolating a branch with git worktree" },
  { id: "hand-editing", label: "Changing the name by hand" },
];

export default function BranchIsolation() {
  return (
    <>
      <Lead>
        Nexus-Sync 0.1.0 does not read git. One environment belongs to one project name in one
        folder. To isolate a branch, give it its own project name in its own folder, which a git
        worktree makes clean.
      </Lead>

      <H2 id="no-git">The CLI does not know your branch</H2>
      <p>
        The CLI reads only <Code>.nexus/config.json</Code> and file-system events. It does not
        run git, read <Code>.git</Code>, or notice when you switch branches. Switching a branch
        in place leaves the config untouched, so the project name and the environment address
        stay the same. Two branches checked out in the same folder, one at a time, share one
        environment identity.
      </p>

      <H2 id="one-per-name">One environment per project name per folder</H2>
      <p>
        An environment is identified by the <Code>projectName</Code> in the config of the folder
        you run from. The address comes from that name.
      </p>
      <List>
        <li>Same folder, same config: the same environment, whatever branch is checked out.</li>
        <li>Two folders with the same project name: still the same environment identity.</li>
        <li>Two folders with different project names: two separate environments.</li>
      </List>
      <p>
        So isolation is a matter of giving each branch its own folder and its own project name,
        not of any branch awareness in the CLI. For how the name becomes an address, see{" "}
        <DocLink href="/docs/ephemeral-pods">ephemeral pods</DocLink> and{" "}
        <DocLink href="/docs/preview-urls">preview URLs</DocLink>.
      </p>

      <H2 id="worktree">Isolating a branch with git worktree</H2>
      <p>
        A git worktree checks a branch out into a separate folder that shares the same
        repository. Each worktree folder gets its own <Code>.nexus/config.json</Code>, so each
        branch can carry its own project name.
      </p>
      <Steps>
        <li>
          Create a worktree for the branch:{" "}
          <Code>git worktree add ../app-feature feature</Code>.
        </li>
        <li>
          Change into it: <Code>cd ../app-feature</Code>.
        </li>
        <li>
          Run <DocLink href="/docs/cli-init">nexus-sync init</DocLink> and give this worktree a
          distinct project name, for example <Code>my-app-feature</Code>.
        </li>
        <li>
          Run <DocLink href="/docs/cli-start">nexus-sync start</DocLink> here and in your main
          folder at the same time. Each prints its own address.
        </li>
      </Steps>
      <Pre>{`  ✦ Shadow live at: https://my-app-feature.nexus-sync.example`}</Pre>
      <p>
        The two sessions watch different folders and report different files. Because 0.1.0 is a
        simulation, the addresses do not resolve and nothing is actually mirrored; the value here
        is the isolated config and the separate watch scope. A paired walkthrough is in{" "}
        <DocLink href="/docs/tutorial-sandbox">a database sandbox per branch</DocLink>.
      </p>

      <H2 id="hand-editing">Changing the name by hand</H2>
      <p>
        You can also change <Code>projectName</Code> in an existing config to point a folder at a
        different environment identity. The CLI does not validate a hand-edited name, so a value
        with spaces or uppercase produces a malformed address. Keep names to lowercase letters,
        digits and hyphens. For the field and its defaults, see{" "}
        <DocLink href="/docs/config-reference">config reference</DocLink>.
      </p>
    </>
  );
}
