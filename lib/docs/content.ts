export type DocStatus = "ready" | "drafting";

export type DocPage = {
  slug: string;
  title: string;
  status: DocStatus;
  estimate?: string;
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
      { slug: "intro", title: "Introduction to Nexus-Sync", status: "drafting", estimate: "next week" },
      { slug: "quickstart", title: "Quickstart, two minutes", status: "ready" },
      { slug: "start-flow", title: "Start flow, four stages", status: "ready" },
      { slug: "system-requirements", title: "System requirements", status: "drafting", estimate: "next week" },
      { slug: "install-cli", title: "Installing the CLI", status: "drafting", estimate: "next week" },
      { slug: "vscode-extension", title: "VS Code extension setup", status: "drafting", estimate: "two weeks" },
      { slug: "first-environment", title: "Creating your first ephemeral environment", status: "drafting", estimate: "two weeks" },
    ],
  },
  {
    id: "core-concepts",
    label: "Core concepts",
    items: [
      { slug: "shadow-environments", title: "Shadow environments", status: "drafting", estimate: "two weeks" },
      { slug: "ephemeral-pods", title: "Ephemeral pods, in detail", status: "drafting", estimate: "two weeks" },
      { slug: "live-mirroring", title: "Live mirroring and real-time sync", status: "drafting", estimate: "two weeks" },
      { slug: "branch-isolation", title: "Branch and PR isolation", status: "drafting", estimate: "two weeks" },
      { slug: "lifecycle", title: "Environment lifecycle", status: "drafting", estimate: "two weeks" },
    ],
  },
  {
    id: "features",
    label: "Features",
    items: [
      { slug: "preview-urls", title: "Instant preview URLs", status: "drafting", estimate: "next sprint" },
      { slug: "database-sandbox", title: "Live database sandbox", status: "drafting", estimate: "next sprint" },
      { slug: "edge-functions", title: "Edge and serverless function simulation", status: "drafting", estimate: "next sprint" },
      { slug: "auto-testing", title: "Automatic testing on save", status: "drafting", estimate: "next sprint" },
      { slug: "multiplayer", title: "Multiplayer collaboration", status: "drafting", estimate: "next sprint" },
      { slug: "ide-integration", title: "Local IDE integration", status: "drafting", estimate: "next sprint" },
      { slug: "env-secrets", title: "Environment variables and secrets", status: "drafting", estimate: "next sprint" },
    ],
  },
  {
    id: "cli-reference",
    label: "CLI reference",
    items: [
      { slug: "cli-init", title: "nxs init", status: "drafting", estimate: "next sprint" },
      { slug: "cli-up-down", title: "nxs up and nxs down", status: "drafting", estimate: "next sprint" },
      { slug: "cli-deploy", title: "nxs deploy", status: "drafting", estimate: "next sprint" },
      { slug: "cli-share", title: "nxs share", status: "drafting", estimate: "next sprint" },
      { slug: "cli-all", title: "All commands", status: "drafting", estimate: "next sprint" },
    ],
  },
  {
    id: "integrations",
    label: "Integrations",
    items: [
      { slug: "frameworks", title: "Next.js, Remix, SvelteKit", status: "drafting", estimate: "next sprint" },
      { slug: "docker", title: "Docker and Docker Compose", status: "drafting", estimate: "next sprint" },
      { slug: "git-providers", title: "GitHub, GitLab, Bitbucket", status: "drafting", estimate: "next sprint" },
      { slug: "cloud-providers", title: "Vercel, Railway, AWS", status: "drafting", estimate: "next sprint" },
      { slug: "databases", title: "Database connections", status: "drafting", estimate: "next sprint" },
    ],
  },
  {
    id: "advanced",
    label: "Advanced topics",
    items: [
      { slug: "custom-pod", title: "Custom ephemeral pod configuration", status: "drafting", estimate: "Q3" },
      { slug: "vpc-networking", title: "VPC and private networking", status: "drafting", estimate: "Q3" },
      { slug: "security", title: "SOC2 and security model", status: "drafting", estimate: "Q3" },
      { slug: "cost", title: "Cost optimization", status: "drafting", estimate: "Q3" },
      { slug: "self-hosted", title: "Self-hosted option", status: "drafting", estimate: "Q4" },
    ],
  },
  {
    id: "tutorials",
    label: "Tutorials and examples",
    items: [
      { slug: "tutorial-nextjs", title: "Building a Next.js app", status: "drafting", estimate: "next sprint" },
      { slug: "tutorial-seeding", title: "Database seeding", status: "drafting", estimate: "next sprint" },
      { slug: "tutorial-debugging", title: "Collaborative debugging", status: "drafting", estimate: "next sprint" },
      { slug: "tutorial-cicd", title: "CI/CD integration", status: "drafting", estimate: "next sprint" },
    ],
  },
  {
    id: "troubleshooting",
    label: "Troubleshooting",
    items: [
      { slug: "common-issues", title: "Common issues", status: "drafting", estimate: "next sprint" },
      { slug: "sync-failures", title: "Environment failed to sync", status: "drafting", estimate: "next sprint" },
      { slug: "performance", title: "Performance tips", status: "drafting", estimate: "next sprint" },
      { slug: "support", title: "Support and contact", status: "drafting", estimate: "next sprint" },
    ],
  },
  {
    id: "api",
    label: "API reference",
    items: [
      { slug: "rest-api", title: "REST API", status: "drafting", estimate: "Q3" },
      { slug: "webhooks", title: "Webhooks", status: "drafting", estimate: "Q3" },
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
