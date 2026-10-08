import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageView, pageMetadata } from "@/components/page-view";
import { getPage, getPages, normalizeContentPath, type PublicPage } from "@/lib/content";

type Props = { params: Promise<{ slug?: string[] }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getPages().map(page => ({ slug: page.path === "/" ? undefined : page.path.split("/").filter(Boolean) }));
}

async function activePage(params: Props["params"]): Promise<PublicPage> {
  const { slug } = await params;
  const page = getPage(normalizeContentPath(slug));
  if (!page) notFound();
  return page;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return pageMetadata(await activePage(params));
}

export default async function PublicPageRoute({ params }: Props) {
  return <PageView page={await activePage(params)} />;
}
