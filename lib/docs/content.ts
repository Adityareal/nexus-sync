export type DocStatus = "ready" | "drafting";

export type DocPage = {
  slug: string;
  title: string;
  status: DocStatus;
};

export type DocGroup = {
  id: string;
  label: string;
  items: DocPage[];
};

export const docNav: DocGroup[] = [
  {
    id: "getting-started",
    label: "Getting started",
    items: [
      { slug: "intro", title: "Introduction to Nexus-Sync", status: "drafting" },
      { slug: "quickstart", title: "Quickstart, two minutes", status: "ready" },
      { slug: "start-flow", title: "Start flow, four stages", status: "ready" },
      { slug: "system-requirements", title: "System requirements", status: "drafting" },
      { slug: "install-cli", title: "Installing the CLI", status: "drafting" },
      { slug: "vscode-extension", title: "VS Code extension setup", status: "drafting" },
      { slug: "first-environment", title: "Creating your first ephemeral environment", status: "drafting" },
    ],
  },
  {
    id: "core-concepts",
    label: "Core concepts",
    items: [
      { slug: "shadow-environments", title: "Shadow environments", status: "drafting" },
      { slug: "ephemeral-pods", title: "Ephemeral pods, in detail", status: "drafting" },
      { slug: "live-mirroring", title: "Live mirroring and real-time sync", status: "drafting" },
      { slug: "branch-isolation", title: "Branch and PR isolation", status: "drafting" },
      { slug: "lifecycle", title: "Environment lifecycle", status: "drafting" },
    ],
  },
  {
    id: "features",
    label: "Features",
    items: [
      { slug: "preview-urls", title: "Instant preview URLs", status: "drafting" },
      { slug: "database-sandbox", title: "Live database sandbox", status: "drafting" },
      { slug: "edge-functions", title: "Edge and serverless function simulation", status: "drafting" },
      { slug: "auto-testing", title: "Automatic testing on save", status: "drafting" },
      { slug: "multiplayer", title: "Multiplayer collaboration", status: "drafting" },
      { slug: "ide-integration", title: "Local IDE integration", status: "drafting" },
      { slug: "env-secrets", title: "Environment variables and secrets", status: "drafting" },
    ],
  },
  {
    id: "cli-reference",
    label: "CLI reference",
    items: [
      { slug: "cli-init", title: "nxs init", status: "drafting" },
      { slug: "cli-up-down", title: "nxs up and nxs down", status: "drafting" },
      { slug: "cli-deploy", title: "nxs deploy", status: "drafting" },
      { slug: "cli-share", title: "nxs share", status: "drafting" },
      { slug: "cli-all", title: "All commands", status: "drafting" },
    ],
  },
  {
    id: "integrations",
    label: "Integrations",
    items: [
      { slug: "frameworks", title: "Next.js, Remix, SvelteKit", status: "drafting" },
      { slug: "docker", title: "Docker and Docker Compose", status: "drafting" },
      { slug: "git-providers", title: "GitHub, GitLab, Bitbucket", status: "drafting" },
      { slug: "cloud-providers", title: "Vercel, Railway, AWS", status: "drafting" },
      { slug: "databases", title: "Database connections", status: "drafting" },
    ],
  },
  {
    id: "advanced",
    label: "Advanced topics",
    items: [
      { slug: "custom-pod", title: "Custom ephemeral pod configuration", status: "drafting" },
      { slug: "vpc-networking", title: "VPC and private networking", status: "drafting" },
      { slug: "security", title: "SOC2 and security model", status: "drafting" },
      { slug: "cost", title: "Cost optimization", status: "drafting" },
      { slug: "self-hosted", title: "Self-hosted option", status: "drafting" },
    ],
  },
  {
    id: "tutorials",
    label: "Tutorials and examples",
    items: [
      { slug: "tutorial-nextjs", title: "Building a Next.js app", status: "drafting" },
      { slug: "tutorial-seeding", title: "Database seeding", status: "drafting" },
      { slug: "tutorial-debugging", title: "Collaborative debugging", status: "drafting" },
      { slug: "tutorial-cicd", title: "CI/CD integration", status: "drafting" },
    ],
  },
  {
    id: "troubleshooting",
    label: "Troubleshooting",
    items: [
      { slug: "common-issues", title: "Common issues", status: "drafting" },
      { slug: "sync-failures", title: "Environment failed to sync", status: "drafting" },
      { slug: "performance", title: "Performance tips", status: "drafting" },
      { slug: "support", title: "Support and contact", status: "drafting" },
    ],
  },
  {
    id: "api",
    label: "API reference",
    items: [
      { slug: "rest-api", title: "REST API", status: "drafting" },
      { slug: "webhooks", title: "Webhooks", status: "drafting" },
    ],
  },
];

export type FlatDoc = DocPage & { groupId: string; groupLabel: string };

export const allDocs: FlatDoc[] = docNav.flatMap((g) =>
  g.items.map((d) => ({ ...d, groupId: g.id, groupLabel: g.label }))
);

export function findDoc(slug: string): { group: DocGroup; doc: DocPage } | null {
  for (const group of docNav) {
    const doc = group.items.find((d) => d.slug === slug);
    if (doc) return { group, doc };
  }
  return null;
}
