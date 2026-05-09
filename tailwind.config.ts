import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "oklch(0.972 0.008 75)",
        "paper-2": "oklch(0.945 0.012 75)",
        ink: "oklch(0.18 0.012 75)",
        "ink-2": "oklch(0.42 0.010 75)",
        rule: "oklch(0.86 0.012 75)",
        signal: "oklch(0.62 0.165 38)",
        "signal-deep": "oklch(0.48 0.140 38)",
        "code-ink": "oklch(0.30 0.045 235)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "ui-serif", "Georgia", "serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      fontSize: {
        display: ["76px", { lineHeight: "1.04", fontWeight: "700" }],
        h1: ["48px", { lineHeight: "1.1", fontWeight: "600" }],
        h2: ["32px", { lineHeight: "1.15", fontWeight: "600" }],
        h3: ["22px", { lineHeight: "1.3", fontWeight: "600" }],
        "body-l": ["19px", { lineHeight: "1.55" }],
        body: ["17px", { lineHeight: "1.6" }],
        meta: ["14px", { lineHeight: "1.45", fontWeight: "500" }],
        mono: ["15px", { lineHeight: "1.55" }],
      },
      transitionTimingFunction: {
        "out-quart": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};
export default config;
