import Link from "next/link";
import { notFound } from "next/navigation";
import { docNav, findDoc } from "@/lib/docs/content";
import { QuickstartContent } from "@/components/QuickstartContent";
import { StartFlowContent } from "@/components/StartFlowContent";
import { DocPage } from "@/components/DocPage";

export const dynamicParams = false;

export function generateStaticParams() {
  return docNav.flatMap((g) => g.items.map((i) => ({ slug: i.slug })));
}

type DocParams = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: DocParams) {
  const { slug } = await params;
  const found = findDoc(slug);
  if (!found) return { title: "Not found, Nexus-Sync docs" };
  return { title: `${found.doc.title}, Nexus-Sync docs` };
}

export default async function DocSlugPage({ params }: DocParams) {
  const { slug } = await params;
  const found = findDoc(slug);
  if (!found) notFound();

  const { doc, group } = found;

  if (doc.slug === "quickstart") {
    return <QuickstartContent />;
  }

  if (doc.slug === "start-flow") {
    return <StartFlowContent />;
  }

  const readyDocs = docNav
    .flatMap((g) => g.items)
    .filter((d) => d.status === "ready");

  const linkClass =
    "text-ink underline underline-offset-4 decoration-signal decoration-1 hover:decoration-2";

  return (
    <DocPage kicker={group.label} title={doc.title}>
      <p className="text-body-l text-ink-2">
        Drafting. The outline is fixed; the prose is not written yet.
      </p>
      <p>
        The team writes documentation in the same register as the product,
        which means slowly, with examples that compile.
      </p>
      <p>
        Finished so far:{" "}
        {readyDocs.map((d, i) => (
          <span key={d.slug}>
            {/* Titles contain commas ("Quickstart, two minutes"), so items are split by semicolons. */}
            {i > 0 && "; "}
            <Link href={`/docs/${d.slug}`} className={linkClass}>
              {d.title}
            </Link>
            {i === readyDocs.length - 1 && "."}
          </span>
        ))}
      </p>
      <p>
        If you need this section now, email{" "}
        <a href="mailto:docs@nexus-sync.example" className={linkClass}>
          docs@nexus-sync.example
        </a>{" "}
        with the use case and we will prioritize it.
      </p>
    </DocPage>
  );
}
