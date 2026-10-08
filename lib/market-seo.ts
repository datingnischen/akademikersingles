import { marketCities, marketHub } from "@/lib/market-cities";
import { marketOrigin, publicUrl, type RegionalMarket } from "@/lib/markets";

// robots.txt und sitemap.xml der Marktdomains (akademikersingles.at/.ch, proxy.ts schreibt sie auf /at/… bzw. /ch/…).
// Die Sitemap enthält nur, was dort kanonisch ist: Städteübersicht und Stadtseiten. Magazin, Über uns und FAQ
// zeigen per Canonical auf die DE-Seite und stehen deshalb nicht drin.
export function marketRobots(market: RegionalMarket): Response {
  const body = `User-Agent: *\nAllow: /\n\nSitemap: ${marketOrigin(market)}/sitemap.xml\n`;
  return new Response(body, { headers: { "content-type": "text/plain; charset=utf-8" } });
}

export function marketSitemap(market: RegionalMarket): Response {
  const urls = [marketHub(market), ...marketCities(market)].map(page => `<url><loc>${publicUrl(market, page.path)}</loc></url>`);
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>\n`;
  return new Response(body, { headers: { "content-type": "application/xml; charset=utf-8" } });
}
