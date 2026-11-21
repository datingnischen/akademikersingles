import { marketCities, marketHub } from "@/lib/market-cities";
import { marketMagazinePages } from "@/lib/market-magazine";
import { isMarketDomainLive, marketOrigin, publicUrl, type RegionalMarket } from "@/lib/markets";

// robots.txt und sitemap.xml der Marktdomains (akademikersingles.at/.ch, proxy.ts schreibt sie auf /at/… bzw. /ch/…).
// Die Sitemap enthält, was dort kanonisch ist: Startseite (sobald die Landesdomain live ist), Städteübersicht,
// Stadtseiten und das eigene Magazin des Landes. Über uns und FAQ sind wortgleiche Dubletten, zeigen per Canonical
// auf die DE-Seite und stehen deshalb nicht drin.
export function marketRobots(market: RegionalMarket): Response {
  const body = `User-Agent: *\nAllow: /\n\nSitemap: ${marketOrigin(market)}/partnersuche/sitemap.xml\n`;
  return new Response(body, { headers: { "content-type": "text/plain; charset=utf-8" } });
}

export function marketSitemap(market: RegionalMarket): Response {
  // Die Startseite steht nur drin, wenn die Landesdomain erreichbar ist: erst dann zeigt sie auf sich selbst
  // und nicht mehr per Canonical auf die deutsche Startseite (components/page-view.tsx).
  const paths = [...(isMarketDomainLive(market) ? ["/"] : []), ...[marketHub(market), ...marketCities(market), ...marketMagazinePages(market)].map(page => page.path)];
  const urls = paths.map(path => `<url><loc>${publicUrl(market, path)}</loc></url>`);
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>\n`;
  return new Response(body, { headers: { "content-type": "application/xml; charset=utf-8" } });
}
