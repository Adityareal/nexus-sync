import { notFound } from "next/navigation";
import { docNav, findDoc } from "@/lib/docs/content";
import { QuickstartContent } from "@/components/QuickstartContent";
import { DocPage } from "@/components/DocPage";

export function generateStaticParams() {
  return docNav.flatMap((g) => g.items.map((i) => ({ slug: i.slug })));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const found = findDoc(params.slug);
  if (!found) return { title: "Not found, Nexus-Sync docs" };
  return { title: `${found.doc.title}, Nexus-Sync docs` };
}

export default function DocSlugPage({
  params,
}: {
  params: { slug: string };
}) {
  const found = findDoc(params.slug);
  if (!found) notFound();

  const { doc, group } = found;

  if (doc.slug === "quickstart") {
    return <QuickstartContent />;
  }

  return (
    <DocPage kicker={group.label} title={doc.title}>
      <p className="text-body-l text-ink-2">
        Drafting. Estimated {doc.estimate ?? "soon"}.
      </p>
      <p>
        This page is in the writing queue. The shape is fixed; the prose is in
        revision. The team writes documentation in the same register as the
        product, which means slowly, with examples that compile.
      </p>
      <p>
        If you need this section sooner than the estimate, email{" "}
        <a
          href="mailto:docs@nexus-sync.dev"
          className="text-ink underline underline-offset-4 decoration-signal decoration-1 hover:decoration-2"
        >
          docs@nexus-sync.dev
        </a>{" "}
        with the use case and we will prioritize it.
      </p>
    </DocPage>
  );
}
