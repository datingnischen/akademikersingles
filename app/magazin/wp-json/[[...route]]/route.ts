import { hostMarket, type RegionalMarket } from "@/lib/markets";
import { handleWpRest, loadMagazineSource, wpRestPreflight, wpRestResponse } from "@/lib/wp-rest-compat";
import { isTeaserImageRoute, teaserImageResponse } from "@/lib/teaser-image";

// WordPress-kompatibler REST-Endpunkt (aus den Magazin-Dateien erzeugt), siehe lib/wp-rest-compat.ts.
// Die URL bleibt wie im früheren WordPress: https://akademikersingles.de/magazin/wp-json/wp/v2/posts
export const dynamic = "force-dynamic";

type RouteContext = { params: Promise<{ route?: string[] }> };

export async function GET(request: Request, context: RouteContext) {
  const { route = [] } = await context.params;
  // Teaserbilder für ICONY ohne Dateiendung (lib/teaser-image.ts)
  if (isTeaserImageRoute(route)) return teaserImageResponse(route, request.method);
  const url = new URL(request.url);
  // Auf akademikersingles.at/.ch liest ICONY die Teaser der Landesbeiträge, nicht der deutschen (lib/market-magazine.ts).
  // Der Markt steht im Host; ?market=at|ch dient nur dazu, die Antwort in der Vorschau unter /at/ und /ch/ zu prüfen.
  const market = hostMarket(request.headers.get("host") ?? url.host) ?? marketParam(url.searchParams.get("market"));
  const result = handleWpRest(`/${route.join("/")}`, url.searchParams, loadMagazineSource(market ?? "de"));
  return wpRestResponse(result, request.method);
}

export const HEAD = GET;

export function OPTIONS() {
  return wpRestPreflight();
}

function marketParam(value: string | null): RegionalMarket | null {
  return value === "at" || value === "ch" ? value : null;
}
