// Länderlogik wie bei alleinerziehende-singles: DE ist der unpräfixierte Standard (Live-Domain akademikersingles.de),
// AT und CH liegen unter /at/ und /ch/ (Vorschau auf Vercel) und bekommen später eigene Domains.
// Dieses Modul ist bewusst ohne Next.js-Importe, damit proxy.ts und die Tests es direkt laden können.

export const MARKET_CODES = ["de", "at", "ch"] as const;
export type MarketCode = (typeof MARKET_CODES)[number];
export type RegionalMarket = "at" | "ch";

export type MarketConfig = {
  code: MarketCode;
  countryName: string;
  countryPhrase: string;
  domain: string;
  locale: "de-DE" | "de-AT" | "de-CH";
  ogLocale: "de_DE" | "de_AT" | "de_CH";
};

const MARKETS: Record<MarketCode, MarketConfig> = {
  de: { code: "de", countryName: "Deutschland", countryPhrase: "Deutschland", domain: "akademikersingles.de", locale: "de-DE", ogLocale: "de_DE" },
  at: { code: "at", countryName: "Österreich", countryPhrase: "Österreich", domain: "akademikersingles.at", locale: "de-AT", ogLocale: "de_AT" },
  ch: { code: "ch", countryName: "Schweiz", countryPhrase: "der Schweiz", domain: "akademikersingles.ch", locale: "de-CH", ogLocale: "de_CH" },
};

// Die Domains akademikersingles.at/.ch sind noch nicht angelegt. hreflang verweist erst dann auf sie, wenn dieser
// Schalter true ist (sonst zeigten die Alternativen ins Leere).
export const MARKET_DOMAINS_LIVE = false;

export function isMarketCode(value: string): value is MarketCode {
  return (MARKET_CODES as readonly string[]).includes(value);
}

export function getMarket(code: MarketCode): MarketConfig {
  return MARKETS[code];
}

export function marketOrigin(code: MarketCode): string {
  return `https://${MARKETS[code].domain}`;
}

export function publicUrl(code: MarketCode, pathname = "/"): string {
  const path = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `${marketOrigin(code)}${path}`;
}

// Nur diese Wurzeln gehören der App; alles andere (ICONY, Dateien) bleibt unverändert.
const APP_PATH = /^\/(?:(?:magazin|partnersuche|ueber-uns|faq)(?:\/|$|[?#])|$|[?#])/;

/** Hängt das Marktpräfix an interne Seitenpfade; DE bleibt unpräfixiert. */
export function localizePath(path: string, market: MarketCode): string {
  if (market === "de" || !path.startsWith("/") || path.startsWith("//")) return path;
  if (!APP_PATH.test(path)) return path;
  return path === "/" ? `/${market}/` : `/${market}${path}`;
}

export function hostMarket(hostname = ""): RegionalMarket | null {
  const host = hostname.toLowerCase().replace(/:\d+$/, "").replace(/^www\./, "");
  if (host === MARKETS.at.domain) return "at";
  if (host === MARKETS.ch.domain) return "ch";
  return null;
}

export type ProxyDecision = { action: "next" } | { action: "rewrite"; pathname: string };

const WP_REST_PATH = /^\/magazin\/wp-json(?:\/|$)/;
const MARKET_PREFIX = /^\/(de|at|ch)(\/.*)?$/;
const LAST_SEGMENT_HAS_DOT = /\/[^/]*\.[^/]*$/;

export function stripMarketPrefix(pathname: string): { market: MarketCode | null; path: string } {
  const match = MARKET_PREFIX.exec(pathname);
  return match ? { market: match[1] as MarketCode, path: match[2] || "/" } : { market: null, path: pathname };
}

/**
 * Entscheidet im proxy.ts, wohin eine Anfrage geht. Reihenfolge ist wichtig:
 * - Dateien (robots.txt, sitemap.xml): auf Marktdomains zur Markt-Variante, sonst unverändert.
 * - WordPress-REST für ICONY (/magazin/wp-json, /magazin/index.php, /magazin?rest_route=): immer der unpräfixierte
 *   Endpunkt, ohne Slash-Umleitung. Mit Marktpräfix wird das Präfix abgestreift.
 * - Seitenpfade enden mit "/": Pfade ohne Slash werden unter der Slash-Adresse bedient (keine Umleitung, siehe next.config.ts).
 * - /de/… liefert den unpräfixierten DE-Inhalt, /at/… und /ch/… die Marktseiten (app/at, app/ch).
 * - Marktdomain ohne Präfix wird intern auf /at/… bzw. /ch/… geschrieben.
 */
export function resolveRequest(pathname: string, hasRestRoute: boolean, hostname = ""): ProxyDecision {
  const host = hostMarket(hostname);
  const { market: prefix, path } = stripMarketPrefix(pathname);

  if (LAST_SEGMENT_HAS_DOT.test(pathname)) {
    if (!prefix && host && (pathname === "/robots.txt" || pathname === "/sitemap.xml")) return { action: "rewrite", pathname: `/${host}${pathname}` };
    if (path === "/magazin/index.php" && prefix) return { action: "rewrite", pathname: path };
    return { action: "next" };
  }

  const isRestEntry = hasRestRoute && /^\/magazin\/?$/.test(path);
  if (WP_REST_PATH.test(path) || isRestEntry) {
    if (!prefix) return { action: "next" };
    return { action: "rewrite", pathname: isRestEntry ? "/magazin/index.php" : path };
  }

  const slashed = path.endsWith("/") ? path : `${path}/`;
  if (prefix === "de") return { action: "rewrite", pathname: slashed };
  if (prefix) return pathname.endsWith("/") ? { action: "next" } : { action: "rewrite", pathname: `/${prefix}${slashed}` };
  if (host) return { action: "rewrite", pathname: `/${host}${slashed}` };
  return path.endsWith("/") ? { action: "next" } : { action: "rewrite", pathname: slashed };
}
