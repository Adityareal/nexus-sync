export function Logo({ size = 18 }: { size?: number }) {
  return (
    <span
      className="inline-block font-serif text-ink select-none whitespace-nowrap"
      style={{ fontSize: `${size}px`, fontWeight: 600, letterSpacing: "-0.01em" }}
      aria-label="Nexus-Sync"
    >
      Nexus-S
      <span className="relative inline-block">
        y
        <span
          aria-hidden
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
  );
}
