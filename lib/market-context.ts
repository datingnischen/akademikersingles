import { cache } from "react";
import type { MarketCode } from "@/lib/markets";

// Der Markt der aktuellen Anfrage (de, at, ch). Die Marktrouten (app/at, app/ch) setzen ihn zu Beginn des Renders,
// danach lesen ihn Link, Städtelisten und Suche. React.cache gilt je Render, parallele Seiten teilen ihn nicht.
// Außerhalb eines Renders (Sitemap, generateStaticParams) bleibt es beim Standard „de“.
const state = cache(() => ({ market: "de" as MarketCode }));

export function setRequestMarket(market: MarketCode): void {
  state().market = market;
}

export function requestMarket(): MarketCode {
  return state().market;
}
