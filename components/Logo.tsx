export function Logo({ size = 18 }: { size?: number }) {
  return (
    <span className="inline-block">
      <span className="sr-only">Nexus-Sync</span>
      <span
        aria-hidden="true"
        className="inline-block font-serif text-ink select-none whitespace-nowrap"
        style={{ fontSize: `${size}px`, fontWeight: 600, letterSpacing: "-0.01em" }}
      >
        Nexus-S
        <span className="relative inline-block">
          y
          <span
            aria-hidden="true"
            className="absolute left-1/2 -translate-x-1/2 rounded-full bg-signal"
            style={{
              top: "-0.55em",
              width: "0.18em",
              height: "0.18em",
            }}
          />
        </span>
        nc
      </span>
    </span>
  );
}
