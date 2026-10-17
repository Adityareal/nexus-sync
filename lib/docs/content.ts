export type DocNavItem = {
  slug: string;
  title: string;
};

export type DocGroup = {
  id: string;
  label: string;
  items: readonly DocNavItem[];
};

// Every entry has a written page in components/docs/pages/<slug>.tsx, except
// start-flow, which renders the /start components directly. The CLI reference
// documents nexus-sync-cli exactly as published; see lib/docs/cli.ts.
export const docNav = [
  {
    id: "getting-started",
    label: "Getting started",
    items: [
      { slug: "intro", title: "Introduction to Nexus-Sync" },
      { slug: "quickstart", title: "Quickstart, two minutes" },
      { slug: "start-flow", title: "Start flow, four stages" },
      { slug: "system-requirements", title: "System requirements" },
      { slug: "install-cli", title: "Installing the CLI" },
      { slug: "vscode", title: "VS Code setup" },
      { slug: "first-environment", title: "Creating your first ephemeral environment" },
    ],
  },
  {
    id: "core-concepts",
    label: "Core concepts",
    items: [
      { slug: "shadow-environments", title: "Shadow environments" },
      { slug: "ephemeral-pods", title: "Ephemeral pods, in detail" },
      { slug: "live-mirroring", title: "Live mirroring and real-time sync" },
      { slug: "branch-isolation", title: "Branch and PR isolation" },
      { slug: "lifecycle", title: "Environment lifecycle" },
    ],
  },
  {
    id: "features",
    label: "Features",
    items: [
      { slug: "preview-urls", title: "Instant preview URLs" },
      { slug: "database-sandbox", title: "Live database sandbox" },
      { slug: "edge-functions", title: "Edge and serverless functions" },
      { slug: "testing", title: "Testing in the shadow environment" },
      { slug: "multiplayer", title: "Multiplayer collaboration" },
      { slug: "ide-integration", title: "Local IDE integration" },
      { slug: "env-secrets", title: "Environment variables and secrets" },
    ],
  },
  {
    id: "cli-reference",
    label: "CLI reference",
    items: [
      { slug: "cli-all", title: "All commands" },
      { slug: "cli-init", title: "nexus-sync init" },
      { slug: "cli-start", title: "nexus-sync start" },
      { slug: "cli-stop", title: "nexus-sync stop" },
      { slug: "cli-status", title: "nexus-sync status" },
      { slug: "cli-db", title: "nexus-sync db sandbox" },
      { slug: "cli-collab", title: "nexus-sync collab invite" },
      { slug: "cli-test", title: "nexus-sync test" },
      { slug: "cli-deploy", title: "nexus-sync deploy" },
      { slug: "config-reference", title: "Config file reference" },
      { slug: "output-reference", title: "Output and exit codes" },
    ],
  },
  {
    id: "integrations",
    label: "Integrations",
    items: [
      { slug: "frameworks", title: "Next.js, Remix, SvelteKit" },
      { slug: "docker", title: "Docker and Docker Compose" },
      { slug: "git-providers", title: "GitHub, GitLab, Bitbucket" },
      { slug: "cloud-providers", title: "Vercel, Railway, AWS" },
      { slug: "databases", title: "Database connections" },
    ],
  },
  {
    id: "advanced",
    label: "Advanced topics",
    items: [
      { slug: "custom-pod", title: "Custom environment configuration" },
      { slug: "vpc-networking", title: "VPC and private networking" },
      { slug: "security", title: "Security model" },
      { slug: "cost", title: "Pricing and cost" },
      { slug: "self-hosted", title: "Offline and self-hosted use" },
    ],
  },
  {
    id: "tutorials",
    label: "Tutorials and examples",
    items: [
      { slug: "tutorial-nextjs", title: "Building a Next.js app" },
      { slug: "tutorial-sandbox", title: "A database sandbox per branch" },
      { slug: "tutorial-debugging", title: "Collaborative debugging" },
      { slug: "tutorial-cicd", title: "CI/CD integration" },
    ],
  },
  {
    id: "troubleshooting",
    label: "Troubleshooting",
    items: [
      { slug: "common-issues", title: "Common issues" },
      { slug: "sync-failures", title: "Environment failed to sync" },
      { slug: "performance", title: "Performance tips" },
      { slug: "support", title: "Support and contact" },
    ],
  },
] as const satisfies readonly DocGroup[];

export type DocSlug = (typeof docNav)[number]["items"][number]["slug"];

export type FlatDoc = { slug: DocSlug; title: string; groupId: string; groupLabel: string };

export const allDocs: FlatDoc[] = docNav.flatMap((g) =>
  g.items.map((d) => ({ slug: d.slug, title: d.title, groupId: g.id, groupLabel: g.label }))
);

export function findDoc(
  slug: string
): { group: DocGroup; doc: { slug: DocSlug; title: string } } | null {
  for (const group of docNav) {
    const doc = group.items.find((d) => d.slug === slug);
    if (doc) return { group, doc };
  }
  return null;
}
