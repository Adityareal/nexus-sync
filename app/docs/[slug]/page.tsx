import { notFound } from "next/navigation";
import { docNav, findDoc } from "@/lib/docs/content";
import { docPages } from "@/components/docs/registry";
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
  const pageSlug = doc.slug;

  if (pageSlug === "start-flow") {
    return <StartFlowContent />;
  }

  const { default: Body, toc } = docPages[pageSlug];

  return (
    <DocPage kicker={group.label} title={doc.title} toc={toc}>
      <Body />
    </DocPage>
  );
}
