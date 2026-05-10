"use client";

import { useEffect, useMemo, useRef, useState } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export type Stage = "form" | "boot" | "success";

export type PodFormData = {
  project: string;
  framework: string;
  branch: string;
  size: "small" | "medium";
  database: boolean;
  envVars: { key: string; value: string }[];
};

const DEFAULT_FORM: PodFormData = {
  project: "nexus-sync",
  framework: "Next.js 14.2.5",
  branch: "feature/auth-flow",
  size: "medium",
  database: true,
  envVars: [
    { key: "DATABASE_URL", value: "•••••••• (inherited)" },
    { key: "STRIPE_SECRET", value: "•••••••• (inherited)" },
    { key: "RESEND_KEY", value: "•••••••• (inherited)" },
    { key: "OPENAI_KEY", value: "•••••••• (inherited)" },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// Boot timeline. Each log line is anchored to a progress value in [0, 1].
// The four stage markers map to milestones in the same timeline.
// ─────────────────────────────────────────────────────────────────────────────

type LogLine = { t: string; text: string; at: number };

function bootLogsFor(branch: string): LogLine[] {
  const slug = slugifyBranch(branch);
  return [
    { t: "00:00.04", text: "nexus-sync v0.34.2", at: 0.02 },
    { t: "00:00.12", text: "resolving ./nexus.config.ts", at: 0.07 },
    { t: "00:00.18", text: "pod requested: us-east-1.b · 2 vCPU · 4 GiB", at: 0.10 },
    { t: "00:00.31", text: "layer cache hit: node:20-alpine (4 layers)", at: 0.17 },
    { t: "00:00.42", text: "forking database from production", at: 0.24 },
    { t: "00:00.71", text: "anonymized 12,847 rows across 3 tables", at: 0.40 },
    { t: "00:01.08", text: "mirror sync engine attached: app/, lib/, prisma/", at: 0.60 },
    { t: "00:01.24", text: "installing dependencies (cached, 0 new)", at: 0.69 },
    { t: "00:01.39", text: "application listening on :3000", at: 0.77 },
    { t: "00:01.62", text: `preview URL minted: pr-${slug}.nexus-sync.dev`, at: 0.90 },
    { t: "00:01.78", text: "pod ready", at: 1.0 },
  ];
}

const STAGES = [
  { name: "Provision", at: 0.24 },
  { name: "Database", at: 0.40 },
  { name: "Sync", at: 0.77 },
  { name: "Preview", at: 1.0 },
];

const BOOT_DURATION_MS = 1800;

// ─────────────────────────────────────────────────────────────────────────────
// Frame chrome: shared header + body container for all stages.
// ─────────────────────────────────────────────────────────────────────────────

function Frame({
  step,
  stepLabel,
  title,
  onClose,
  children,
}: {
  step: string;
  stepLabel: string;
  title: string;
  onClose?: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-paper border border-rule w-full">
      <header className="flex items-start justify-between gap-6 px-6 sm:px-9 pt-7 pb-6 border-b border-rule">
        <div>
          <p className="font-mono text-meta text-ink-2 tracking-wide uppercase">
            {step} <span className="mx-1.5 text-rule">/</span> {stepLabel}
          </p>
          <h2 className="mt-2 font-serif text-[32px] sm:text-[40px] text-ink leading-[1.08] tracking-tight">
            {title}
          </h2>
        </div>
        {onClose ? (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="shrink-0 size-8 grid place-items-center text-ink-2 hover:text-ink transition-colors duration-200"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
              <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.25" />
            </svg>
          </button>
        ) : null}
      </header>
      <div className="px-6 sm:px-9 py-7 sm:py-9">{children}</div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Form stage
// ─────────────────────────────────────────────────────────────────────────────

export function StartPodForm({
  initial = DEFAULT_FORM,
  onSubmit,
  onCancel,
  frozen = false,
}: {
  initial?: PodFormData;
  onSubmit?: (data: PodFormData) => void;
  onCancel?: () => void;
  frozen?: boolean;
}) {
  const [data, setData] = useState<PodFormData>(initial);
  const [envOpen, setEnvOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const submitTimer = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (submitTimer.current !== null) {
        window.clearTimeout(submitTimer.current);
      }
    },
    [],
  );

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (frozen || submitting) return;
    setSubmitting(true);
    // Brief intent feedback before the parent transitions to boot.
    submitTimer.current = window.setTimeout(() => {
      submitTimer.current = null;
      onSubmit?.(data);
    }, 280);
  }

  return (
    <Frame
      step="01 / 03"
      stepLabel="Configure"
      title="Start an ephemeral pod."
      onClose={frozen ? undefined : onCancel}
    >
      <form onSubmit={handleSubmit}>
        <dl className="border-t border-rule">
          <Row icon={<ProjectIcon />} label="Project">
            <div className="flex items-baseline flex-wrap gap-x-3 gap-y-1">
              <span className="font-mono text-[18px] font-medium text-ink tracking-tight">
                {data.project}
              </span>
              <button
                type="button"
                className="font-mono text-meta text-ink-2 hover:text-ink underline underline-offset-4 decoration-rule hover:decoration-signal"
              >
                edit
              </button>
            </div>
          </Row>

          <Row icon={<FrameworkIcon />} label="Framework">
            <span className="font-mono text-mono text-ink">{data.framework}</span>
            <span className="ml-3 inline-flex items-center gap-1.5 font-mono text-meta text-ink-2">
              <Check />
              detected from package.json
            </span>
          </Row>

          <Row icon={<BranchIcon />} label="Branch">
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={data.branch}
                onChange={(e) => setData({ ...data, branch: e.target.value })}
                disabled={frozen}
                className="font-mono text-mono text-ink bg-transparent border-0 border-b border-rule focus:border-signal focus:outline-none focus:ring-0 px-0 py-1 min-w-[14ch] disabled:opacity-100"
              />
              <span className="font-mono text-meta text-ink-2">tracking origin/{data.branch}</span>
            </div>
          </Row>

          <Row icon={<SizeIcon />} label="Size">
            <div className="inline-flex border border-rule">
              {(["small", "medium"] as const).map((s) => {
                const active = data.size === s;
                return (
                  <button
                    type="button"
                    key={s}
                    onClick={() => !frozen && setData({ ...data, size: s })}
                    className={[
                      "px-4 py-2 font-mono text-meta uppercase tracking-wide transition-colors duration-200",
                      active
                        ? "bg-ink text-paper"
                        : "bg-paper text-ink-2 hover:text-ink",
                      s === "small" ? "border-r border-rule" : "",
                    ].join(" ")}
                    aria-pressed={active}
                  >
                    {s}
                  </button>
                );
              })}
            </div>
            <span className="ml-4 font-mono text-meta text-ink-2">
              {data.size === "small" ? "1 vCPU · 2 GiB" : "2 vCPU · 4 GiB"}
            </span>
          </Row>

          <Row icon={<DatabaseIcon />} label="Database">
            <label className="inline-flex items-center gap-3 cursor-pointer">
              <Toggle
                on={data.database}
                onChange={(on) => !frozen && setData({ ...data, database: on })}
                disabled={frozen}
              />
              <span className="font-mono text-mono text-ink">Live sandbox</span>
            </label>
            <p className="mt-1.5 text-meta text-ink-2 max-w-[52ch]">
              Forks production at boot. Anonymizes{" "}
              <code className="font-mono text-mono text-code-ink">users.email</code>,{" "}
              <code className="font-mono text-mono text-code-ink">users.phone</code>,{" "}
              <code className="font-mono text-mono text-code-ink">billing.*</code> per{" "}
              <code className="font-mono text-mono text-code-ink">nexus.config.ts</code>.
            </p>
          </Row>

          <Row label="Env vars">
            <button
              type="button"
              onClick={() => setEnvOpen((v) => !v)}
              className="font-mono text-mono text-ink hover:text-signal-deep transition-colors duration-200 inline-flex items-center gap-2"
              aria-expanded={envOpen}
            >
              <span className="text-ink-2">{data.envVars.length} inherited</span>
              <span className="text-ink-2">·</span>
              <span className="underline underline-offset-4 decoration-rule">
                {envOpen ? "hide" : "review"}
              </span>
            </button>
            {envOpen ? (
              <ul className="mt-4 border-t border-rule">
                {data.envVars.map((v) => (
                  <li
                    key={v.key}
                    className="grid grid-cols-[1fr_2fr] gap-6 border-b border-rule py-2.5 font-mono text-mono"
                  >
                    <span className="text-ink-2">{v.key}</span>
                    <span className="text-ink truncate">{v.value}</span>
                  </li>
                ))}
                <li className="pt-3">
                  <button
                    type="button"
                    className="font-mono text-meta text-ink-2 hover:text-ink underline underline-offset-4 decoration-rule"
                  >
                    + add override
                  </button>
                </li>
              </ul>
            ) : null}
          </Row>
        </dl>

        <div className="mt-9 flex flex-wrap items-center justify-between gap-6">
          <p className="font-mono text-meta text-ink-2">
            Boots in <span className="text-ink">~1.8s</span>. Auto-disposes after 8h idle.
          </p>
          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={onCancel}
              className="font-mono text-meta text-ink-2 hover:text-ink underline underline-offset-4 decoration-rule hover:decoration-signal"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={frozen || submitting}
              aria-busy={submitting}
              className="inline-flex items-center gap-3 bg-signal-deep text-paper px-7 py-3.5 font-mono text-[15px] font-semibold uppercase tracking-[0.04em] hover:bg-ink transition-colors duration-200 disabled:opacity-100 disabled:cursor-default"
            >
              {submitting ? (
                <>
                  <Spinner />
                  <span>Booting</span>
                </>
              ) : (
                <>
                  <span>Boot pod</span>
                  <ArrowRight />
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </Frame>
  );
}

function Row({
  icon,
  label,
  children,
}: {
  icon?: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-[7rem_1fr] sm:grid-cols-[10rem_1fr] gap-6 items-baseline border-b border-rule py-5">
      <dt className="font-mono text-meta uppercase tracking-wide text-ink-2 pt-1 inline-flex items-center gap-2">
        {icon ? (
          <span className="text-ink-2 shrink-0 inline-flex" aria-hidden>
            {icon}
          </span>
        ) : null}
        <span>{label}</span>
      </dt>
      <dd className="text-ink">{children}</dd>
    </div>
  );
}

function Toggle({
  on,
  onChange,
  disabled,
}: {
  on: boolean;
  onChange: (v: boolean) => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={() => !disabled && onChange(!on)}
      role="switch"
      aria-checked={on}
      disabled={disabled}
      className={[
        "relative inline-block h-6 w-11 border align-middle transition-colors duration-200",
        on ? "bg-signal border-signal-deep" : "bg-paper border-rule hover:border-ink-2",
      ].join(" ")}
    >
      <span
        className={[
          "absolute top-1/2 left-[3px] -translate-y-1/2 h-[16px] w-[16px] border transition-transform duration-200 ease-out-quart",
          on
            ? "translate-x-[19px] bg-paper border-signal-deep"
            : "translate-x-0 bg-paper-2 border-rule",
        ].join(" ")}
      />
    </button>
  );
}

function Spinner() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden
      className="animate-spin"
    >
      <circle
        cx="7"
        cy="7"
        r="5.5"
        stroke="currentColor"
        strokeOpacity="0.3"
        strokeWidth="1.5"
      />
      <path
        d="M12.5 7 A 5.5 5.5 0 0 0 7 1.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="square"
      />
    </svg>
  );
}

function ProjectIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path
        d="M1.5 4.5 H12.5 V11.5 H1.5 Z M1.5 4.5 V2.75 H5.5 L6.75 4.5"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinejoin="miter"
      />
    </svg>
  );
}

function FrameworkIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path
        d="M5.25 3.75 L1.75 7 L5.25 10.25 M8.75 3.75 L12.25 7 L8.75 10.25"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="square"
      />
    </svg>
  );
}

function BranchIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden>
      <circle cx="4" cy="3" r="1.25" stroke="currentColor" strokeWidth="1.1" />
      <circle cx="4" cy="11" r="1.25" stroke="currentColor" strokeWidth="1.1" />
      <circle cx="10" cy="7" r="1.25" stroke="currentColor" strokeWidth="1.1" />
      <path
        d="M4 4.25 V9.75 M4 7 H8.75"
        stroke="currentColor"
        strokeWidth="1.1"
      />
    </svg>
  );
}

function SizeIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path
        d="M2 5 V2 H5 M9 2 H12 V5 M2 9 V12 H5 M9 12 H12 V9"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="square"
      />
    </svg>
  );
}

function DatabaseIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden>
      <ellipse cx="7" cy="3.25" rx="4.5" ry="1.4" stroke="currentColor" strokeWidth="1.1" />
      <path
        d="M2.5 3.25 V10.75 C 2.5 11.5 11.5 11.5 11.5 10.75 V3.25"
        stroke="currentColor"
        strokeWidth="1.1"
      />
      <path
        d="M2.5 7 C 2.5 7.75 11.5 7.75 11.5 7"
        stroke="currentColor"
        strokeWidth="1.1"
      />
    </svg>
  );
}

function Check() {
  return (
    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden>
      <path
        d="M1 5.5L4 8.5L10 1.5"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="square"
      />
    </svg>
  );
}

function ArrowRight() {
  return (
    <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden>
      <path d="M1 5H13M13 5L9 1M13 5L9 9" stroke="currentColor" strokeWidth="1.25" />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Boot stage
// ─────────────────────────────────────────────────────────────────────────────

export function StartPodBoot({
  branch,
  autoplay = true,
  frozenProgress,
  onComplete,
}: {
  branch: string;
  autoplay?: boolean;
  frozenProgress?: number;
  onComplete?: () => void;
}) {
  const [progress, setProgress] = useState(frozenProgress ?? (autoplay ? 0 : 0));
  const startedRef = useRef(false);

  useEffect(() => {
    if (typeof frozenProgress === "number") {
      setProgress(frozenProgress);
      return;
    }
    if (!autoplay || startedRef.current) return;
    startedRef.current = true;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / BOOT_DURATION_MS);
      // Smooth ease-out so the bar isn't linear, but the milestones still snap
      // because logs are gated by raw t, not the eased value.
      setProgress(t);
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        onComplete?.();
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [autoplay, frozenProgress, onComplete]);

  const seconds = progress * (BOOT_DURATION_MS / 1000);
  const elapsed = seconds.toFixed(2);
  const elapsedTimestamp = `00:${seconds.toFixed(2).padStart(5, "0")}`;
  const logs = useMemo(() => bootLogsFor(branch), [branch]);
  const visibleLogs = logs.filter((l) => progress >= l.at);
  const currentStage =
    [...STAGES].reverse().find((s) => progress >= s.at - 0.01)?.name ?? STAGES[0].name;

  return (
    <Frame step="02 / 03" stepLabel="Boot" title="Booting your pod.">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-8 lg:gap-12">
        {/* Left: pod mark + elapsed + branch */}
        <div className="flex flex-col items-start">
          <PodMark progress={progress} />
          <p className="mt-7 font-serif text-[44px] leading-[1] text-ink tabular-nums">
            {elapsed}
            <span className="text-ink-2 text-h3 font-mono ml-1">s</span>
          </p>
          <p className="mt-3 font-mono text-meta text-ink-2">
            target <span className="text-ink">1.80s</span>
          </p>
          <dl className="mt-8 space-y-2.5 font-mono text-meta">
            <MetaRow k="branch" v={branch} />
            <MetaRow k="region" v="us-east-1.b" />
            <MetaRow k="image" v="node:20-alpine" />
            <MetaRow k="stage" v={currentStage.toLowerCase()} />
          </dl>
        </div>

        {/* Right: terminal logs */}
        <div className="bg-paper-2 border border-rule">
          <div className="border-b border-rule px-4 py-2.5 flex items-center justify-between">
            <p className="font-mono text-meta text-ink-2 uppercase tracking-wide">
              nexus boot · streaming
            </p>
            <span className="inline-flex items-center gap-1.5 font-mono text-meta text-ink-2">
              <span className="size-1.5 rounded-full bg-signal animate-pulse" />
              live
            </span>
          </div>
          <ol className="px-4 py-3.5 font-mono text-mono text-ink leading-[1.7] min-h-[280px] max-h-[280px] overflow-hidden">
            {visibleLogs.map((l) => (
              <li
                key={l.t}
                className="grid grid-cols-[7.5ch_1fr] gap-4 animate-[logIn_220ms_cubic-bezier(0.16,1,0.3,1)_both]"
              >
                <span className="text-ink-2 tabular-nums">{l.t}</span>
                <span>{l.text}</span>
              </li>
            ))}
            {progress < 1 ? (
              <li className="grid grid-cols-[7.5ch_1fr] gap-4 text-ink-2">
                <span className="tabular-nums">{elapsedTimestamp}</span>
                <span>
                  <span className="inline-block w-[7px] h-[14px] -mb-[2px] bg-signal animate-[caret_900ms_steps(2,end)_infinite]" />
                </span>
              </li>
            ) : null}
          </ol>
        </div>
      </div>

      {/* Progress bar with stage milestones */}
      <div className="mt-9">
        <div className="relative h-px bg-rule">
          <div
            className="absolute inset-y-0 left-0 bg-signal-deep origin-left transition-transform duration-200 ease-out-quart"
            style={{ width: "100%", transform: `scaleX(${progress})` }}
          />
          {STAGES.map((s) => (
            <span
              key={s.name}
              className="absolute -top-[3px] size-[7px] -translate-x-1/2 border border-rule bg-paper"
              style={{
                left: `${s.at * 100}%`,
                background: progress >= s.at - 0.005 ? "var(--signal-deep)" : "var(--paper)",
                borderColor:
                  progress >= s.at - 0.005 ? "var(--signal-deep)" : "var(--rule)",
              }}
              aria-hidden
            />
          ))}
        </div>
        <div className="mt-3 grid grid-cols-4 font-mono text-meta">
          {STAGES.map((s) => {
            const done = progress >= s.at - 0.005;
            const active =
              progress < s.at &&
              progress >= (STAGES[STAGES.indexOf(s) - 1]?.at ?? 0) - 0.005;
            return (
              <span
                key={s.name}
                className={[
                  "uppercase tracking-wide",
                  done ? "text-ink" : active ? "text-signal-deep" : "text-ink-2",
                ].join(" ")}
              >
                {s.name}
              </span>
            );
          })}
        </div>
      </div>
    </Frame>
  );
}

function MetaRow({ k, v }: { k: string; v: string }) {
  return (
    <div className="grid grid-cols-[5.5rem_1fr] gap-4">
      <dt className="text-ink-2 uppercase tracking-wide">{k}</dt>
      <dd className="text-ink">{v}</dd>
    </div>
  );
}

function PodMark({ progress }: { progress: number }) {
  const C = 2 * Math.PI * 30;
  const offset = C * (1 - progress);
  return (
    <svg width="84" height="84" viewBox="0 0 84 84" aria-hidden>
      <circle cx="42" cy="42" r="30" fill="none" stroke="var(--rule)" strokeWidth="1" />
      <circle
        cx="42"
        cy="42"
        r="30"
        fill="none"
        stroke="var(--signal-deep)"
        strokeWidth="1.5"
        strokeDasharray={C}
        strokeDashoffset={offset}
        transform="rotate(-90 42 42)"
        style={{ transition: "stroke-dashoffset 200ms cubic-bezier(0.16,1,0.3,1)" }}
      />
      {/* Leading edge dot */}
      <circle
        cx={42 + 30 * Math.cos(2 * Math.PI * progress - Math.PI / 2)}
        cy={42 + 30 * Math.sin(2 * Math.PI * progress - Math.PI / 2)}
        r="2.5"
        fill="var(--signal)"
      />
      {/* Center monogram */}
      <text
        x="42"
        y="46.5"
        textAnchor="middle"
        fontFamily="var(--font-mono)"
        fontSize="11"
        fill="var(--ink-2)"
        letterSpacing="1"
      >
        POD
      </text>
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Success stage
// ─────────────────────────────────────────────────────────────────────────────

export function StartPodSuccess({
  branch,
  bootSeconds = 1.78,
  onClose,
  frozen = false,
}: {
  branch: string;
  bootSeconds?: number;
  onClose?: () => void;
  frozen?: boolean;
}) {
  const slug = useMemo(() => slugifyBranch(branch), [branch]);
  const url = `https://pr-${slug}.nexus-sync.dev`;
  const [copied, setCopied] = useState(false);
  const [stopArmed, setStopArmed] = useState(false);

  function handleCopy() {
    if (frozen) {
      setCopied(true);
      return;
    }
    navigator.clipboard?.writeText(url).then(() => {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    });
  }

  return (
    <Frame
      step="03 / 03"
      stepLabel="Live"
      title="Your pod is running."
      onClose={frozen ? undefined : onClose}
    >
      {/* URL block: the proof. Large, typeset, copper underline. */}
      <div className="border-t border-rule pt-7">
        <p className="font-mono text-meta uppercase tracking-wide text-ink-2">Preview URL</p>
        <div className="mt-3 flex flex-wrap items-baseline gap-x-6 gap-y-3">
          <a
            href={url}
            className="font-serif text-[28px] sm:text-[34px] leading-[1.1] text-ink underline decoration-signal underline-offset-[6px] decoration-1 hover:decoration-2"
          >
            pr-{slug}.nexus-sync.dev
          </a>
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-2 font-mono text-meta text-ink-2 hover:text-ink transition-colors duration-200"
          >
            <CopyIcon />
            {copied ? "copied" : "copy"}
          </button>
        </div>
        <p className="mt-3 font-mono text-meta text-ink-2">
          Booted in <span className="text-ink">{bootSeconds.toFixed(2)}s</span>. Auto-disposes
          after 8h idle.
        </p>
      </div>

      {/* Pod metadata: definition list, hairline rules. */}
      <MetaGrid
        items={[
          { k: "branch", v: branch },
          { k: "region", v: "us-east-1.b" },
          { k: "image", v: "node:20-alpine · 2 vCPU · 4 GiB" },
          { k: "database", v: "forked · anonymized · 12,847 rows" },
          { k: "mirror sync", v: "attached · 94ms median" },
          { k: "auto-dispose", v: "in 7h 59m" },
        ]}
      />

      {/* Action row: hierarchy, not a button grid. */}
      <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
        <a
          href={url}
          className="inline-flex items-center gap-3 bg-signal-deep text-paper px-6 py-3 font-mono text-meta uppercase tracking-wide hover:bg-ink transition-colors duration-200"
        >
          Open in browser
          <ArrowOut />
        </a>
        <a
          href={`vscode://nexus-sync.dev/open?pod=pr-${slug}`}
          className="font-mono text-meta text-ink hover:text-signal-deep underline underline-offset-4 decoration-rule hover:decoration-signal"
        >
          Open in VS Code
        </a>
        <button
          type="button"
          onClick={handleCopy}
          className="font-mono text-meta text-ink hover:text-signal-deep underline underline-offset-4 decoration-rule hover:decoration-signal"
        >
          {copied ? "Link copied" : "Copy link"}
        </button>
        <a
          href="#logs"
          className="font-mono text-meta text-ink hover:text-signal-deep underline underline-offset-4 decoration-rule hover:decoration-signal"
        >
          View logs
        </a>
        <span className="grow" aria-hidden />
        {!stopArmed ? (
          <button
            type="button"
            onClick={() => !frozen && setStopArmed(true)}
            className="font-mono text-meta text-ink-2 hover:text-ink underline underline-offset-4 decoration-rule"
          >
            Stop pod
          </button>
        ) : (
          <span className="inline-flex items-center gap-3 font-mono text-meta">
            <span className="text-ink-2">Stop now?</span>
            <button
              type="button"
              onClick={() => {
                setStopArmed(false);
                onClose?.();
              }}
              className="text-ink underline underline-offset-4 decoration-signal"
            >
              confirm
            </button>
            <button
              type="button"
              onClick={() => setStopArmed(false)}
              className="text-ink-2 underline underline-offset-4 decoration-rule"
            >
              cancel
            </button>
          </span>
        )}
      </div>
    </Frame>
  );
}

function MetaGrid({ items }: { items: { k: string; v: string }[] }) {
  return (
    <dl className="mt-8 grid grid-cols-1 sm:grid-cols-2 border-t border-rule">
      {items.map((item, i) => {
        const isLeft = i % 2 === 0;
        return (
          <div
            key={item.k}
            className={[
              "border-b border-rule py-3.5 sm:px-5",
              isLeft ? "sm:border-r sm:border-rule" : "",
              i === 0 ? "sm:pl-0" : "",
              !isLeft ? "sm:pr-0" : "",
            ].join(" ")}
          >
            <dt className="font-mono text-meta uppercase tracking-wide text-ink-2">
              {item.k}
            </dt>
            <dd className="mt-1 font-mono text-mono text-ink">{item.v}</dd>
          </div>
        );
      })}
    </dl>
  );
}

function CopyIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
      <rect x="3.5" y="3.5" width="7" height="7" stroke="currentColor" strokeWidth="1" />
      <path d="M1.5 8.5V1.5H8.5" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

function ArrowOut() {
  return (
    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden>
      <path d="M3 8L8 3M8 3H4M8 3V7" stroke="currentColor" strokeWidth="1.25" />
    </svg>
  );
}

function slugifyBranch(b: string) {
  return b
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 32);
}

// ─────────────────────────────────────────────────────────────────────────────
// Orchestrator: drives the full flow with internal state machine.
// Used both inline (on /start) and as overlay (from homepage trigger).
// ─────────────────────────────────────────────────────────────────────────────

export function StartPodFlow({
  display = "inline",
  open = true,
  onClose,
}: {
  display?: "inline" | "overlay";
  open?: boolean;
  onClose?: () => void;
}) {
  const [stage, setStage] = useState<Stage>("form");
  const [data, setData] = useState<PodFormData>(DEFAULT_FORM);

  function handleSubmit(d: PodFormData) {
    setData(d);
    setStage("boot");
  }

  function handleClose() {
    setStage("form");
    onClose?.();
  }

  // Reset to form when re-opened from outside
  useEffect(() => {
    if (open) setStage("form");
  }, [open]);

  // Prevent body scroll while overlay is open
  useEffect(() => {
    if (display !== "overlay" || !open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [display, open]);

  // Escape to close overlay
  useEffect(() => {
    if (display !== "overlay" || !open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [display, open]);

  const inner = (
    <>
      {stage === "form" ? (
        <StartPodForm
          initial={data}
          onSubmit={handleSubmit}
          onCancel={display === "overlay" ? handleClose : undefined}
        />
      ) : null}
      {stage === "boot" ? (
        <StartPodBoot branch={data.branch} onComplete={() => setStage("success")} />
      ) : null}
      {stage === "success" ? (
        <StartPodSuccess branch={data.branch} onClose={handleClose} />
      ) : null}
    </>
  );

  if (display === "inline") {
    return <div className="w-full">{inner}</div>;
  }

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 grid place-items-start sm:place-items-center overflow-y-auto"
    >
      {/* Flat ink-tinted scrim. No blur. */}
      <button
        type="button"
        aria-label="Close"
        onClick={handleClose}
        className="fixed inset-0 bg-ink/55 animate-[fadeIn_220ms_cubic-bezier(0.16,1,0.3,1)_both]"
      />
      <div className="relative w-full sm:max-w-[820px] sm:my-12 px-0 sm:px-6 animate-[panelIn_380ms_cubic-bezier(0.16,1,0.3,1)_both]">
        {inner}
      </div>
    </div>
  );
}
