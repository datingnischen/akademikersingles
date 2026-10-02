import { NextResponse, type NextRequest } from "next/server";

// Seitenpfade enden mit "/" (trailingSlash). Die eingebaute Umleitung ist abgeschaltet (skipTrailingSlashRedirect in
// next.config.ts), weil der WordPress-kompatible REST-Endpunkt /magazin/wp-json/... (ICONY ruft ohne Slash am Ende auf)
// 200 JSON statt 308 liefern muss. Seiten ohne Slash werden deshalb unter der Slash-Adresse bedient; ihr Canonical
// zeigt auf die Variante mit Slash. (Eine Umleitung hätte hinter dem ICONY-nginx den Vercel-Host als Ziel.)
export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  if (pathname.endsWith("/")) return NextResponse.next();
  if (pathname.startsWith("/magazin/wp-json") || pathname === "/magazin/index.php") return NextResponse.next();
  // /magazin?rest_route=/wp/v2/posts ist der REST-Aufruf ohne schöne Permalinks (Rewrite in next.config.ts).
  if (pathname === "/magazin" && request.nextUrl.searchParams.has("rest_route")) return NextResponse.next();
  return NextResponse.rewrite(new URL(`${pathname}/${search}`, request.url));
}

export const config = {
  // Nur Seitenrouten: keine Dateien mit Endung, keine Next.js-Interna, keine Assets, keine API.
  matcher: ["/((?!_next/|app-assets/|api/|.*\\..*).*)"],
};
