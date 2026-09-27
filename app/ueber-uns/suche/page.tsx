import type { Metadata } from "next";
import { SearchTemplate } from "@/components/search";
import { SiteShell } from "@/components/site-shell";
import { SEARCH_PATH, search } from "@/lib/search";
import { ORIGIN, SITE_NAME } from "@/lib/site";

// Statische Route: gewinnt gegen den Catch-all app/[[...slug]] und liegt unter /ueber-uns/, das nginx an Next.js durchreicht.
type Props = { searchParams: Promise<{ q?: string | string[] }> };

async function queryFrom(searchParams: Props["searchParams"]): Promise<string> {
  const { q } = await searchParams;
  return (Array.isArray(q) ? q[0] ?? "" : q ?? "").trim().slice(0, 100);
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const query = await queryFrom(searchParams);
  const title = query ? `Suche nach „${query}“ – ${SITE_NAME}` : `Suche – ${SITE_NAME}`;
  return {
    title: { absolute: title },
    description: "Durchsuchen Sie Magazin, Ratgeber, Städteseiten und häufige Fragen von AkademikerSingles.de.",
    alternates: { canonical: `${ORIGIN}${SEARCH_PATH}` },
    robots: { index: false, follow: true },
  };
}

export default async function SearchRoute({ searchParams }: Props) {
  const query = await queryFrom(searchParams);
  return <SiteShell current={SEARCH_PATH}>
    <SearchTemplate query={query} hits={search(query)} />
  </SiteShell>;
}
