export function DocsToc({
  items,
}: {
  items: { id: string; label: string }[];
}) {
  return (
    <nav aria-label="On this page" className="sticky top-12 font-sans">
      <p className="font-serif italic text-meta text-ink-2 mb-3">On this page</p>
      <ul className="space-y-2">
        {items.map((it) => (
          <li key={it.id}>
            <a
              href={`#${it.id}`}
              className="block text-meta text-ink-2 hover:text-ink hover:underline underline-offset-4 decoration-signal py-1"
            >
              {it.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
