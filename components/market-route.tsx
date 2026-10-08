import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageView, pageMetadata } from "@/components/page-view";
import { SearchTemplate } from "@/components/search";
import { SiteShell } from "@/components/site-shell";
import { getMarketPage, getMarketPages, normalizeContentPath, type PublicPage } from "@/lib/content";
import { setRequestMarket } from "@/lib/market-context";
import { getMarket, publicUrl, type RegionalMarket } from "@/lib/markets";
import { SEARCH_PATH, search } from "@/lib/search";
import { SITE_NAME } from "@/lib/site";

// Marktrouten /at/… und /ch/…: dieselben Magazin-, Über-uns- und FAQ-Seiten wie in DE (Canonical auf die DE-Seite,
// keine Dublette), eigene Städteübersicht und Stadtdossiers (lib/market-cities.ts). Die Routen setzen den Markt für
// Link, Städtelisten und Suche (lib/market-context.ts).
export type MarketSlugProps = { params: Promise<{ slug?: string[] }> };

export function marketStaticParams(market: RegionalMarket) {
  return getMarketPages(market).map(page => ({ slug: page.path === "/" ? undefined : page.path.split("/").filter(Boolean) }));
}

async function activePage(market: RegionalMarket, params: MarketSlugProps["params"]): Promise<PublicPage> {
  const { slug } = await params;
  const page = getMarketPage(market, normalizeContentPath(slug));
  if (!page) notFound();
  return page;
}

export async function marketMetadata(market: RegionalMarket, params: MarketSlugProps["params"]): Promise<Metadata> {
  return pageMetadata(await activePage(market, params), market);
}

export async function MarketPageRoute({ market, params }: { market: RegionalMarket; params: MarketSlugProps["params"] }) {
  setRequestMarket(market);
  return <PageView page={await activePage(market, params)} />;
}

// Seitensuche /at/ueber-uns/suche/?q= (statische Route, gewinnt gegen den Catch-all).
type SearchProps = { searchParams: Promise<{ q?: string | string[] }> };

async function queryFrom(searchParams: SearchProps["searchParams"]): Promise<string> {
  const { q } = await searchParams;
  return (Array.isArray(q) ? q[0] ?? "" : q ?? "").trim().slice(0, 100);
}

export async function marketSearchMetadata(market: RegionalMarket, searchParams: SearchProps["searchParams"]): Promise<Metadata> {
  const query = await queryFrom(searchParams);
  return {
    title: { absolute: query ? `Suche nach „${query}“ – ${SITE_NAME}` : `Suche – ${SITE_NAME}` },
    description: "Durchsuchen Sie Magazin, Städteseiten und häufige Fragen von AkademikerSingles.",
    alternates: { canonical: publicUrl(market, SEARCH_PATH) },
    robots: { index: false, follow: true },
    openGraph: { locale: getMarket(market).ogLocale },
  };
}

export async function MarketSearchRoute({ market, searchParams }: { market: RegionalMarket; searchParams: SearchProps["searchParams"] }) {
  setRequestMarket(market);
  const query = await queryFrom(searchParams);
  return <SiteShell current={SEARCH_PATH}>
    <SearchTemplate query={query} hits={search(query)} />
  </SiteShell>;
}
