import { NextResponse, type NextRequest } from "next/server";
import { hostMarket, resolveRequest } from "@/lib/markets";

// Seitenpfade enden mit "/" (trailingSlash). Die eingebaute Umleitung ist abgeschaltet (skipTrailingSlashRedirect in
// next.config.ts), weil der WordPress-kompatible REST-Endpunkt /magazin/wp-json/... (ICONY ruft ohne Slash am Ende auf)
// 200 JSON statt 308 liefern muss. Seiten ohne Slash werden deshalb unter der Slash-Adresse bedient; ihr Canonical
// zeigt auf die Variante mit Slash. (Eine Umleitung hätte hinter dem ICONY-nginx den Vercel-Host als Ziel.)
//
// Länderlogik (lib/markets.ts, resolveRequest): /de/… liefert den DE-Inhalt, /at/… und /ch/… die Marktseiten, und
// Anfragen auf akademikersingles.at/.ch (Host oder X-Forwarded-Host) werden intern auf /at/… bzw. /ch/… geschrieben.
// Der REST-Endpunkt /magazin/wp-json bleibt zusätzlich unpräfixiert erreichbar und läuft nie durch die Marktlogik.
function requestHostname(request: NextRequest) {
  const normalize = (value: string | null) => value?.split(",")[0]?.trim().toLowerCase().replace(/:\d+$/, "").replace(/^www\./, "") ?? "";
  const direct = normalize(request.headers.get("host"));
  const forwarded = normalize(request.headers.get("x-forwarded-host"));
  if (hostMarket(direct)) return direct;
  if (hostMarket(forwarded)) return forwarded;
  return direct || request.nextUrl.hostname;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const decision = resolveRequest(pathname, request.nextUrl.searchParams.has("rest_route"), requestHostname(request));
  if (decision.action === "next") return NextResponse.next();
  const destination = request.nextUrl.clone();
  destination.pathname = decision.pathname;
  return NextResponse.rewrite(destination);
}

export const config = {
  // Nur Seitenrouten: keine Dateien mit Endung, keine Next.js-Interna, keine Assets, keine API.
  // Ausnahmen mit Endung: robots.txt/sitemap.xml (Marktdomains) und der Präfix-Zugang zu /magazin/index.php.
  matcher: ["/robots.txt", "/sitemap.xml", "/(de|at|ch)/magazin/index.php", "/((?!_next/|app-assets/|api/|.*\\..*).*)"],
};
