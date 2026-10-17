"use client";

import {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";

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
  framework: "Next.js 15.5.28",
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

// One source of truth for the size specs, shared by the form, the boot log and
// the success stage.
const SIZE_SPECS: Record<PodFormData["size"], string> = {
  small: "1 vCPU · 2 GiB",
  medium: "2 vCPU · 4 GiB",
};

// ─────────────────────────────────────────────────────────────────────────────
// Boot timeline. Each log line is anchored to a progress value in [0, 1].
// The four stage markers map to milestones in the same timeline.
// ─────────────────────────────────────────────────────────────────────────────

type LogLine = { t: string; text: string; at: number };

function bootLogsFor(pod: PodFormData = DEFAULT_FORM): LogLine[] {
  const branch = pod.branch.trim();
  const slug = slugifyBranch(branch);
  const spec = SIZE_SPECS[pod.size];
  const lines: LogLine[] = [
    { t: "00:00.04", text: "nxs v0.34.2", at: 0.02 },
    { t: "00:00.12", text: "resolving ./nexus.config.ts", at: 0.07 },
    { t: "00:00.18", text: `pod requested: us-east-1.b · ${spec}`, at: 0.1 },
    { t: "00:00.31", text: "layer cache hit: node:20-alpine (4 layers)", at: 0.17 },
  ];
  if (pod.database) {
    lines.push(
      { t: "00:00.42", text: "forking database from production", at: 0.24 },
      { t: "00:00.71", text: "anonymized 12,847 rows across 3 tables", at: 0.4 },
    );
  } else {
    lines.push({ t: "00:00.42", text: "database sandbox off, no fork", at: 0.24 });
  }
  lines.push(
    { t: "00:01.08", text: "mirror sync engine attached: app/, lib/, prisma/", at: 0.6 },
    { t: "00:01.24", text: "installing dependencies (cached, 0 new)", at: 0.69 },
    { t: "00:01.39", text: "application listening on :3000", at: 0.77 },
    { t: "00:01.62", text: `preview URL minted: pr-${slug}.nexus-sync.example`, at: 0.9 },
    { t: "00:01.78", text: "pod ready", at: 1.0 },
  );
  return lines;
}

const STAGES = [
  { name: "Provision", at: 0.24 },
  { name: "Database", at: 0.4 },
  { name: "Sync", at: 0.77 },
  { name: "Preview", at: 1.0 },
];

const BOOT_DURATION_MS = 1780;
const DEFAULT_BOOT_SECONDS = BOOT_DURATION_MS / 1000;

// The active stage is the first milestone the progress has not yet reached; once
// everything is reached, the last stage is active. This is the same rule the
// milestone labels use for `active`, computed once and shared.
function activeStageIndex(progress: number): number {
  const idx = STAGES.findIndex((s) => progress < s.at - 0.005);
  return idx === -1 ? STAGES.length - 1 : idx;
}

// ─────────────────────────────────────────────────────────────────────────────
// Frame chrome: shared header + body container for all stages.
// ─────────────────────────────────────────────────────────────────────────────

function Frame({
  step,
  stepLabel,
  title,
  autoFocusTitle = false,
  children,
}: {
  step: string;
  stepLabel: string;
  title: string;
  autoFocusTitle?: boolean;
  children: React.ReactNode;
}) {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (autoFocusTitle) {
      titleRef.current?.focus({ preventScroll: true });
    }
    // Focus once on mount when the orchestrator signals a stage transition.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="bg-paper border border-rule w-full">
      <header className="flex items-start justify-between gap-6 px-6 sm:px-9 pt-7 pb-6 border-b border-rule">
        <div>
          <p className="font-mono text-meta text-ink-2 tracking-wide uppercase">
            {step} <span className="mx-1.5 text-rule">/</span> {stepLabel}
          </p>
          <h2
            ref={titleRef}
            tabIndex={-1}
            className="mt-2 font-serif text-[32px] sm:text-[40px] text-ink leading-[1.08] tracking-tight focus:outline-none"
          >
            {title}
          </h2>
        </div>
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
  frozen = false,
  autoFocusTitle = false,
}: {
  initial?: PodFormData;
  onSubmit?: (data: PodFormData) => void;
  frozen?: boolean;
  autoFocusTitle?: boolean;
}) {
  const [data, setData] = useState<PodFormData>(initial);
  const [envOpen, setEnvOpen] = useState(false);
  const [branchError, setBranchError] = useState(false);
  const branchId = useId();
  const branchHintId = useId();
  const branchErrorId = useId();
  const sizeLabelId = useId();
  const inputRef = useRef<HTMLInputElement>(null);

  const branchTrimmed = data.branch.trim();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (frozen) return;
    if (slugifyBranch(branchTrimmed) === "") {
      setBranchError(true);
      inputRef.current?.focus();
      return;
    }
    setBranchError(false);
    onSubmit?.({ ...data, branch: branchTrimmed });
  }

  function handleBranchChange(value: string) {
    setData({ ...data, branch: value });
    if (branchError) setBranchError(false);
  }

  const describedBy = branchError
    ? `${branchHintId} ${branchErrorId}`
    : branchHintId;

  return (
    <Frame
      step="02 / 04"
      stepLabel="Configure"
      title="Start an ephemeral pod."
      autoFocusTitle={autoFocusTitle}
    >
      <form onSubmit={handleSubmit} noValidate>
        <dl className="border-t border-rule">
          <Row icon={<ProjectIcon />} label="Project">
            <span className="font-mono text-[18px] font-medium text-ink tracking-tight">
              {data.project}
            </span>
          </Row>

          <Row icon={<FrameworkIcon />} label="Framework">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="font-mono text-mono text-ink">{data.framework}</span>
              <span className="inline-flex items-center gap-1.5 font-mono text-meta text-ink-2">
                <Check />
                detected from package.json
              </span>
            </div>
          </Row>

          <Row icon={<BranchIcon />} label="Branch" htmlFor={branchId}>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <input
                id={branchId}
                ref={inputRef}
                type="text"
                value={data.branch}
                onChange={(e) => handleBranchChange(e.target.value)}
                disabled={frozen}
                maxLength={100}
                aria-describedby={describedBy}
                aria-invalid={branchError ? "true" : undefined}
                className="font-mono text-mono text-ink bg-transparent border-0 border-b border-rule-strong focus:border-signal focus:outline-none focus:ring-0 px-0 py-1 w-full min-w-0 sm:w-auto sm:min-w-[14ch] disabled:opacity-100"
              />
              {branchTrimmed !== "" ? (
                <span id={branchHintId} className="min-w-0 font-mono text-meta text-ink-2 [overflow-wrap:anywhere]">
                  tracking origin/{branchTrimmed}
                </span>
              ) : (
                <span id={branchHintId} className="sr-only">
                  The preview URL is built from the branch name.
                </span>
              )}
            </div>
            {branchError ? (
              <p id={branchErrorId} className="mt-2 font-mono text-meta text-signal-deep">
                Enter a branch name. The preview URL is built from it.
              </p>
            ) : null}
          </Row>

          <Row icon={<SizeIcon />} label="Size" labelId={sizeLabelId}>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <div
                role="radiogroup"
                aria-labelledby={sizeLabelId}
                className="inline-flex border border-rule"
              >
                {(["small", "medium"] as const).map((s) => {
                  const checked = data.size === s;
                  return (
                    <label
                      key={s}
                      className={[
                        frozen ? "cursor-default" : "cursor-pointer",
                        s === "small" ? "border-r border-rule" : "",
                      ].join(" ")}
                    >
                      <input
                        type="radio"
                        name={`${sizeLabelId}-size`}
                        value={s}
                        checked={checked}
                        disabled={frozen}
                        onChange={() => setData({ ...data, size: s })}
                        className="sr-only peer"
                      />
                      <span
                        className={[
                          "block px-4 py-2 font-mono text-meta uppercase tracking-wide transition-colors duration-200",
                          "bg-paper text-ink-2",
                          frozen ? "" : "hover:text-ink",
                          "peer-checked:bg-ink peer-checked:text-paper",
                          "peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-signal peer-focus-visible:outline-offset-2",
                        ].join(" ")}
                      >
                        {s}
                      </span>
                    </label>
                  );
                })}
              </div>
              <span className="font-mono text-meta text-ink-2 whitespace-nowrap">
                {SIZE_SPECS[data.size]}
              </span>
            </div>
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
              </ul>
            ) : null}
          </Row>
        </dl>

        <div className="mt-9 flex flex-wrap items-center justify-between gap-6">
          <p className="font-mono text-meta text-ink-2">
            Boots in <span className="text-ink">~1.8s</span>. Auto-disposes after 8h idle.
          </p>
          <button
            type="submit"
            disabled={frozen}
            className="inline-flex items-center gap-3 bg-signal-deep text-paper px-7 py-3.5 font-mono text-[15px] font-semibold uppercase tracking-[0.04em] hover:bg-ink transition-colors duration-200 disabled:opacity-100 disabled:cursor-default"
          >
            <span>Boot pod</span>
            <ArrowRight />
          </button>
        </div>
      </form>
    </Frame>
  );
}

function Row({
  icon,
  label,
  htmlFor,
  labelId,
  children,
}: {
  icon?: React.ReactNode;
  label: string;
  htmlFor?: string;
  labelId?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-1 gap-y-2 sm:grid-cols-[10rem_1fr] sm:gap-x-6 sm:gap-y-0 items-baseline border-b border-rule py-5">
      <dt className="font-mono text-meta uppercase tracking-wide text-ink-2 sm:pt-1 inline-flex items-center gap-2">
        {icon ? (
          <span className="text-ink-2 shrink-0 inline-flex" aria-hidden>
            {icon}
          </span>
        ) : null}
        {htmlFor ? (
          <label htmlFor={htmlFor}>{label}</label>
        ) : (
          <span id={labelId}>{label}</span>
        )}
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
        on
          ? "bg-signal border-signal-deep"
          : "bg-paper border-rule-strong hover:border-ink-2",
      ].join(" ")}
    >
      <span
        className={[
          "absolute top-1/2 left-[3px] -translate-y-1/2 h-[16px] w-[16px] border transition-transform duration-200 ease-out-quart",
          on
            ? "translate-x-[19px] bg-paper border-signal-deep"
            : "translate-x-0 bg-paper-2 border-rule-strong",
        ].join(" ")}
      />
    </button>
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
      <path d="M4 4.25 V9.75 M4 7 H8.75" stroke="currentColor" strokeWidth="1.1" />
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
  pod = DEFAULT_FORM,
  autoplay = true,
  frozenProgress,
  onComplete,
  autoFocusTitle = false,
}: {
  pod?: PodFormData;
  autoplay?: boolean;
  frozenProgress?: number;
  onComplete?: () => void;
  autoFocusTitle?: boolean;
}) {
  const [progress, setProgress] = useState(frozenProgress ?? 0);
  const onCompleteRef = useRef(onComplete);
  const listRef = useRef<HTMLOListElement>(null);

  // Keep the latest callback in a ref so the animation effect never depends on
  // the parent's inline arrow (a new identity every render would restart boot).
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    if (typeof frozenProgress === "number") {
      setProgress(frozenProgress);
      return;
    }
    if (!autoplay) return;
    const start = performance.now();
    let raf = 0;
    // Read the clock here rather than using the rAF timestamp: that is the
    // frame's start time, which can be earlier than `start` (and in jsdom comes
    // from a different clock), so progress could go negative.
    const tick = () => {
      const t = Math.min(1, (performance.now() - start) / BOOT_DURATION_MS);
      setProgress(t);
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        onCompleteRef.current?.();
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [autoplay, frozenProgress]);

  const branch = pod.branch.trim();
  const seconds = progress * (BOOT_DURATION_MS / 1000);
  const elapsed = seconds.toFixed(2);
  const elapsedTimestamp = `00:${seconds.toFixed(2).padStart(5, "0")}`;
  const logs = useMemo(() => bootLogsFor(pod), [pod]);
  const visibleLogs = logs.filter((l) => progress >= l.at);
  const stageIndex = activeStageIndex(progress);
  const currentStage = STAGES[stageIndex].name;
  // Only a boot that is really running gets a pulsing "live" dot; the frozen
  // storyboard shows a still.
  const streaming = typeof frozenProgress !== "number" && autoplay && progress < 1;

  // Terminal tail: the log box is a fixed height and the newest lines overflow
  // it near the end of the boot (much earlier on phones, where lines wrap), so
  // pin the scroll to the bottom whenever the visible line count changes.
  const visibleCount = visibleLogs.length + (progress < 1 ? 1 : 0);
  useLayoutEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [visibleCount]);

  return (
    <Frame step="03 / 04" stepLabel="Boot" title="Booting your pod." autoFocusTitle={autoFocusTitle}>
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
            <MetaRow k="image" v={`node:20-alpine · ${SIZE_SPECS[pod.size]}`} />
            <MetaRow k="stage" v={currentStage.toLowerCase()} />
          </dl>
        </div>

        {/* Right: terminal logs */}
        <div className="bg-paper-2 border border-rule">
          <div className="border-b border-rule px-4 py-2.5 flex items-center justify-between">
            <p className="font-mono text-meta text-ink-2 uppercase tracking-wide">
              nxs up · streaming
            </p>
            <span className="inline-flex items-center gap-1.5 font-mono text-meta text-ink-2">
              <span
                aria-hidden
                className={[
                  "size-1.5 rounded-full bg-signal",
                  streaming ? "animate-pulse" : "",
                ].join(" ")}
              />
              live
            </span>
          </div>
          <ol
            ref={listRef}
            className="px-4 py-3.5 font-mono text-mono text-ink leading-[1.7] h-[280px] overflow-hidden"
          >
            {visibleLogs.map((l) => (
              <li
                key={l.t}
                className="grid grid-cols-[7.5ch_1fr] gap-4 animate-[logIn_220ms_cubic-bezier(0.16,1,0.3,1)_both]"
              >
                <span className="text-ink-2 tabular-nums">{l.t}</span>
                <span className="[overflow-wrap:anywhere]">{l.text}</span>
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
        <div
          role="progressbar"
          aria-label="Boot progress"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(progress * 100)}
          aria-valuetext={`${currentStage}, ${seconds.toFixed(2)} seconds`}
          className="relative h-px bg-rule"
        >
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
        <div className="mt-3 grid grid-cols-2 gap-y-1 sm:grid-cols-4 font-mono text-meta">
          {STAGES.map((s, i) => {
            const done = progress >= s.at - 0.005;
            const active = i === stageIndex && !done;
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
      <dd className="text-ink min-w-0 [overflow-wrap:anywhere]">{v}</dd>
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
  pod = DEFAULT_FORM,
  bootSeconds = DEFAULT_BOOT_SECONDS,
  onStop,
  frozen = false,
  autoFocusTitle = false,
}: {
  pod?: PodFormData;
  bootSeconds?: number;
  onStop?: () => void;
  frozen?: boolean;
  autoFocusTitle?: boolean;
}) {
  const branch = pod.branch.trim();
  const slug = useMemo(() => slugifyBranch(branch), [branch]);
  const url = `https://pr-${slug}.nexus-sync.example`;
  const [copied, setCopied] = useState(false);
  const [copyFailed, setCopyFailed] = useState(false);
  const [stopArmed, setStopArmed] = useState(false);
  const [logsOpen, setLogsOpen] = useState(false);
  const [demoNote, setDemoNote] = useState("");
  const [copyStatus, setCopyStatus] = useState("");
  const resetTimer = useRef<number | null>(null);
  const logsId = useId();

  const logs = useMemo(() => bootLogsFor(pod), [pod]);
  const dbRow = pod.database ? "forked · anonymized · 12,847 rows" : "off";

  useEffect(
    () => () => {
      if (resetTimer.current !== null) window.clearTimeout(resetTimer.current);
    },
    [],
  );

  const handleCopy = useCallback(() => {
    if (frozen) {
      setCopied(true);
      return;
    }
    const done = () => {
      setCopied(true);
      setCopyFailed(false);
      setCopyStatus("Link copied.");
      if (resetTimer.current !== null) window.clearTimeout(resetTimer.current);
      resetTimer.current = window.setTimeout(() => {
        setCopied(false);
        resetTimer.current = null;
      }, 1600);
    };
    const fail = () => {
      setCopyFailed(true);
      setCopied(false);
      setCopyStatus("Copy failed. Select the address and copy it.");
    };
    const clip = navigator.clipboard;
    if (!clip) {
      fail();
      return;
    }
    clip.writeText(url).then(done, fail);
  }, [frozen, url]);

  function handleOpen(e: React.MouseEvent) {
    e.preventDefault();
    if (frozen) return;
    setDemoNote(
      `Demo only. No pod is running, so pr-${slug}.nexus-sync.example does not resolve.`,
    );
  }

  function confirmStop() {
    setStopArmed(false);
    onStop?.();
  }

  return (
    <Frame
      step="04 / 04"
      stepLabel="Live"
      title="Your pod is running."
      autoFocusTitle={autoFocusTitle}
    >
      {/* URL block: the proof. Large, typeset, copper underline. */}
      <div className="border-t border-rule pt-7">
        <p className="font-mono text-meta uppercase tracking-wide text-ink-2">Preview URL</p>
        <div className="mt-3 flex flex-wrap items-baseline gap-x-6 gap-y-3">
          <a
            href={url}
            onClick={handleOpen}
            className="font-serif text-[28px] sm:text-[34px] leading-[1.1] text-ink underline decoration-signal underline-offset-[6px] decoration-1 hover:decoration-2 min-w-0 [overflow-wrap:anywhere]"
          >
            pr-{slug}.nexus-sync.example
          </a>
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-2 font-mono text-meta text-ink-2 hover:text-ink transition-colors duration-200"
          >
            <CopyIcon />
            {copyFailed ? "copy failed" : copied ? "copied" : "copy"}
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
          { k: "image", v: `node:20-alpine · ${SIZE_SPECS[pod.size]}` },
          { k: "database", v: dbRow },
          { k: "mirror sync", v: "attached · 94ms median" },
          { k: "auto-dispose", v: "in 7h 59m" },
        ]}
      />

      {/* Action row: hierarchy, not a button grid. */}
      <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
        <a
          href={url}
          onClick={handleOpen}
          className="inline-flex items-center gap-3 bg-signal-deep text-paper px-6 py-3 font-mono text-meta uppercase tracking-wide hover:bg-ink transition-colors duration-200"
        >
          Open in browser
          <ArrowOut />
        </a>
        <a
          href={`vscode://vscode-remote/ssh-remote+pr-${slug}.nexus-sync.example/workspace`}
          onClick={handleOpen}
          className="font-mono text-meta text-ink hover:text-signal-deep underline underline-offset-4 decoration-rule hover:decoration-signal"
        >
          Open in VS Code
        </a>
        <button
          type="button"
          onClick={handleCopy}
          className="font-mono text-meta text-ink hover:text-signal-deep underline underline-offset-4 decoration-rule hover:decoration-signal"
        >
          {copyFailed ? "Copy failed" : copied ? "Link copied" : "Copy link"}
        </button>
        <button
          type="button"
          onClick={() => setLogsOpen((v) => !v)}
          aria-expanded={logsOpen}
          aria-controls={logsId}
          className="font-mono text-meta text-ink hover:text-signal-deep underline underline-offset-4 decoration-rule hover:decoration-signal"
        >
          {logsOpen ? "Hide logs" : "View logs"}
        </button>
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
              onClick={confirmStop}
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

      {/* Polite status for the demo note. The region stays mounted so the message is announced. */}
      <p
        role="status"
        className={demoNote ? "mt-4 font-mono text-meta text-ink-2" : "sr-only"}
      >
        {demoNote}
      </p>

      {/* sr-only copy status region. */}
      <p role="status" className="sr-only">
        {copyStatus}
      </p>

      {/* View logs: the full boot log for this pod. */}
      {logsOpen ? (
        <ol
          id={logsId}
          className="mt-6 bg-paper-2 border border-rule px-4 py-3.5 font-mono text-mono text-ink leading-[1.7]"
        >
          {logs.map((l) => (
            <li key={l.t} className="grid grid-cols-[7.5ch_1fr] gap-4">
              <span className="text-ink-2 tabular-nums">{l.t}</span>
              <span className="[overflow-wrap:anywhere]">{l.text}</span>
            </li>
          ))}
        </ol>
      ) : null}
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
              "border-b border-rule py-3.5",
              isLeft ? "sm:pr-5 sm:border-r sm:border-rule" : "sm:pl-5",
            ].join(" ")}
          >
            <dt className="font-mono text-meta uppercase tracking-wide text-ink-2">
              {item.k}
            </dt>
            <dd className="mt-1 font-mono text-mono text-ink min-w-0 [overflow-wrap:anywhere]">
              {item.v}
            </dd>
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
// Orchestrator: drives the full flow with an internal state machine.
// Rendered inline on /start.
// ─────────────────────────────────────────────────────────────────────────────

export function StartPodFlow() {
  const [stage, setStage] = useState<Stage>("form");
  const [data, setData] = useState<PodFormData>(DEFAULT_FORM);
  // True only after a stage transition, so the heading takes focus then but
  // never on first render (the /start page must not steal focus on load).
  const [transitioned, setTransitioned] = useState(false);
  const [announcement, setAnnouncement] = useState("");

  function handleSubmit(d: PodFormData) {
    setData(d);
    setStage("boot");
    setTransitioned(true);
  }

  function handleBootComplete() {
    setStage("success");
    setTransitioned(true);
    setAnnouncement(
      `Pod running. Preview URL pr-${slugifyBranch(data.branch)}.nexus-sync.example.`,
    );
  }

  function handleStop() {
    setStage("form");
    setTransitioned(true);
    setAnnouncement("Pod stopped.");
  }

  return (
    <div className="w-full">
      <p role="status" className="sr-only">
        {announcement}
      </p>
      {stage === "form" ? (
        <StartPodForm
          initial={data}
          onSubmit={handleSubmit}
          autoFocusTitle={transitioned}
        />
      ) : null}
      {stage === "boot" ? (
        <StartPodBoot
          pod={data}
          onComplete={handleBootComplete}
          autoFocusTitle={transitioned}
        />
      ) : null}
      {stage === "success" ? (
        <StartPodSuccess
          pod={data}
          onStop={handleStop}
          autoFocusTitle={transitioned}
        />
      ) : null}
    </div>
  );
}
