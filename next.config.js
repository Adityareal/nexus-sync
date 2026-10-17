/** @type {import('next').NextConfig} */

// Docs pages that moved when the docs were rewritten against the published
// nexus-sync-cli. Old address -> replacement slug. tests/docs-pages.test.tsx
// checks every destination exists.
const movedDocs = {
  "vscode-extension": "vscode",
  "auto-testing": "testing",
  "tutorial-seeding": "tutorial-sandbox",
  "cli-up-down": "cli-start",
  "cli-share": "cli-collab",
  "rest-api": "output-reference",
  webhooks: "output-reference",
};

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async redirects() {
    return [
      {
        source: "/docs",
        destination: "/docs/quickstart",
        permanent: false,
      },
      ...Object.entries(movedDocs).map(([from, to]) => ({
        source: `/docs/${from}`,
        destination: `/docs/${to}`,
        permanent: true,
      })),
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "DENY" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};
module.exports = nextConfig;
