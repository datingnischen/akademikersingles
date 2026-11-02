import { requestMarket } from "./market-context.ts";
import { isAppPath, localizePath, platformOrigin, type MarketCode } from "./markets.ts";

export const DOMAIN = "akademikersingles.de";
export const ORIGIN = `https://${DOMAIN}`;
export const SITE_NAME = "AkademikerSingles";

export type Aid = "magazin" | "location";

// ICONY-Seiten (Registrierung, Login, Trust, Rechtliches) laufen immer über die Live-Plattform, nie über die Vorschau:
// .de, auf den Marktseiten die Landesplattform .at/.ch, sobald deren Domain live ist (lib/markets.ts, platformOrigin).
// Der Markt kommt aus dem Render (lib/market-context.ts), deshalb sind die Linklisten Funktionen statt Konstanten.
export function legacyUrl(path: string, market: MarketCode = requestMarket()): string {
  return `${platformOrigin(market)}${path.startsWith("/") ? path : `/${path}`}`;
}

export function registrationUrl(aid?: Aid | null, market: MarketCode = requestMarket()): string {
  return legacyUrl(aid ? `/registration/?AID=${aid}` : "/registration/", market);
}

// Individuelle ICONY-Suche (Ort, Umkreis, Alter) – ebenfalls nur auf der Live-Plattform.
export function searchUrl(aid?: Aid | null, market: MarketCode = requestMarket()): string {
  return legacyUrl(aid ? `/suche/?AID=${aid}` : "/suche/", market);
}

export function loginUrl(): string {
  return legacyUrl("/login/");
}

// Feste Links auf https://akademikersingles.de/… (FAQ-Links, importierte Texte) auf den Marktseiten umsetzen:
// Seitenpfade der App in den Markt, ICONY-Seiten auf die Landesplattform. Alles andere bleibt unverändert.
const LIVE_DOMAIN_URL = /^https:\/\/(?:www\.)?akademikersingles\.de(\/[^"'\s]*)?$/i;

export function marketUrl(url: string, market: MarketCode = requestMarket()): string {
  if (market === "de") return url;
  const match = LIVE_DOMAIN_URL.exec(url);
  if (!match) return url;
  const path = match[1] || "/";
  return isAppPath(path) ? localizePath(path, market) : legacyUrl(path, market);
}

export const SOCIAL = {
  youtube: { label: "YouTube", handle: "@akademikersingles", url: "https://www.youtube.com/@akademikersingles" },
  facebook: { label: "Facebook", handle: "AkademikerSingles", url: "https://www.facebook.com/profile.php?id=61586656290136" },
};

export const REVIEW_SOURCES = {
  vergleichen: {
    url: "https://www.singleboersen-vergleichen.de/singleportal/akademikersingles-de/",
    seal: "/brand/siegel-singleboersen-vergleichen.png",
  },
  trustpilot: { url: "https://de.trustpilot.com/review/akademikersingles.de" },
};

export const REVIEW = {
  url: "https://singleboersen-ueberblick.de/partnersuche/akademikersingles-de/",
  seal: "/brand/siegel-singleboersen-ueberblick.jpg",
  label: "Testbericht bei Singlebörsen-Überblick",
  rating: "4,5",
};

export const trustLinks = () => [
  { label: "Redaktionelle Kontrolle", href: legacyUrl("/redaktionelle-kontrolle.html") },
  { label: "Sicherheit & Datenschutz", href: legacyUrl("/sicherheit-und-datenschutz.html") },
  { label: "Kostenlose Basis-Mitgliedschaft", href: legacyUrl("/kostenlose-basis-mitgliedschaft.html") },
  { label: "Premium-Mitgliedschaft", href: legacyUrl("/premium-mitgliedschaft.html") },
  { label: "Erfolgsgeschichten", href: legacyUrl("/unsere-erfolgsgeschichten.html") },
];

export const featureLinks = () => [
  { label: "Fragenflirt", href: legacyUrl("/fragenflirt.html") },
  { label: "Fotoflirt", href: legacyUrl("/fotoflirt.html") },
  { label: "Videodate", href: legacyUrl("/videodate.html") },
];

export const legalLinks = () => [
  { label: "Hilfe & Support", href: legacyUrl("/hilfe/") },
  { label: "Kontakt", href: legacyUrl("/kontakt/") },
  { label: "Impressum", href: legacyUrl("/impressum.html") },
  { label: "Datenschutz", href: legacyUrl("/datenschutz.html") },
  { label: "AGB", href: legacyUrl("/agb.html") },
  { label: "Barrierefreiheit", href: legacyUrl("/barrierefreiheit.html") },
  { label: "Vertrag kündigen", href: legacyUrl("/kontakt/k%C3%BCndigen/") },
  { label: "Widerruf", href: legacyUrl("/kontakt/widerruf/") },
];
