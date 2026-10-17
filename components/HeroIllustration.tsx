export function MirrorDiagram() {
  return (
    <figure className="group relative">
      {/* Horizontal layout for sm and up */}
      <svg
        viewBox="0 0 800 220"
        className="hidden sm:block w-full h-auto"
        role="img"
        aria-label="A file on a laptop mirrored to a cloud pod"
      >
        <defs>
          <marker
            id="arrow-ink-h"
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="8"
            markerHeight="8"
            orient="auto-start-reverse"
          >
            <path d="M0 0 L10 5 L0 10 z" className="fill-ink" />
          </marker>
        </defs>

        <g transform="translate(60, 60)">
          <path
            d="M0 0 H110 L130 20 V100 H0 Z"
            fill="none"
            className="stroke-ink"
            strokeWidth="1.25"
          />
          <path
            d="M110 0 V20 H130"
            fill="none"
            className="stroke-ink"
            strokeWidth="1.25"
          />
          <text
            x="65"
            y="60"
            textAnchor="middle"
            className="fill-ink"
            fontFamily="var(--font-mono), ui-monospace, monospace"
            fontSize="13"
          >
            app/page.tsx
          </text>
        </g>

        <line
          x1="200"
          y1="110"
          x2="610"
          y2="110"
          className="stroke-ink"
          strokeWidth="1.25"
          markerEnd="url(#arrow-ink-h)"
        />

        {/* One copper save rides the connector on hover, then resets on leave. */}
        <rect
          x="200"
          y="108.5"
          width="18"
          height="3"
          aria-hidden="true"
          className="fill-signal-deep opacity-0 group-hover:animate-[mirrorTick_640ms_cubic-bezier(0.16,1,0.3,1)_both]"
        />

        <g transform="translate(620, 60)">
          <rect x="0" y="0" width="130" height="100" className="fill-signal" />
          <text
            x="65"
            y="58"
            textAnchor="middle"
            className="fill-ink"
            fontFamily="var(--font-mono), ui-monospace, monospace"
            fontSize="13"
          >
            pod-7f2a
          </text>
        </g>

        <text
          x="405"
          y="100"
          textAnchor="middle"
          className="fill-signal-deep opacity-0 transition-opacity duration-200 group-hover:opacity-100 [@media(hover:none)]:opacity-100"
          fontFamily="var(--font-mono), ui-monospace, monospace"
          fontSize="13"
        >
          94ms
        </text>
      </svg>

      {/* Vertical layout below sm: text reads at phone sizes */}
      <svg
        viewBox="0 0 320 360"
        className="block sm:hidden w-full max-w-[260px] mx-auto h-auto"
        role="img"
        aria-label="A file on a laptop mirrored to a cloud pod"
      >
        <defs>
          <marker
            id="arrow-ink-v"
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="8"
            markerHeight="8"
            orient="auto-start-reverse"
          >
            <path d="M0 0 L10 5 L0 10 z" className="fill-ink" />
          </marker>
        </defs>

        <g transform="translate(95, 30)">
          <path
            d="M0 0 H110 L130 20 V100 H0 Z"
            fill="none"
            className="stroke-ink"
            strokeWidth="1.5"
          />
          <path
            d="M110 0 V20 H130"
            fill="none"
            className="stroke-ink"
            strokeWidth="1.5"
          />
          <text
            x="65"
            y="60"
            textAnchor="middle"
            className="fill-ink"
            fontFamily="var(--font-mono), ui-monospace, monospace"
            fontSize="16"
          >
            app/page.tsx
          </text>
        </g>

        <line
          x1="160"
          y1="140"
          x2="160"
          y2="220"
          className="stroke-ink"
          strokeWidth="1.5"
          markerEnd="url(#arrow-ink-v)"
        />

        <text
          x="184"
          y="186"
          className="fill-signal-deep"
          fontFamily="var(--font-mono), ui-monospace, monospace"
          fontSize="14"
        >
          94ms
        </text>

        <g transform="translate(95, 230)">
          <rect x="0" y="0" width="130" height="100" className="fill-signal" />
          <text
            x="65"
            y="58"
            textAnchor="middle"
            className="fill-ink"
            fontFamily="var(--font-mono), ui-monospace, monospace"
            fontSize="16"
          >
            pod-7f2a
          </text>
        </g>
      </svg>

      <figcaption className="mt-4 font-mono text-meta text-ink-2 text-center sm:text-left">
        a single save, mirrored at 94 milliseconds.
      </figcaption>
    </figure>
  );
}
