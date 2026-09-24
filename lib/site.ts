export const DOMAIN = "akademikersingles.de";
export const ORIGIN = `https://${DOMAIN}`;
export const SITE_NAME = "AkademikerSingles";

export type Aid = "magazin" | "location";

// ICONY-Seiten (Registrierung, Login, Trust, Rechtliches) laufen immer über die Live-Domain, nie über die Vorschau.
export function legacyUrl(path: string): string {
  return `${ORIGIN}${path.startsWith("/") ? path : `/${path}`}`;
}

export function registrationUrl(aid?: Aid | null): string {
  return aid ? `${ORIGIN}/registration/?AID=${aid}` : `${ORIGIN}/registration/`;
}

export const LOGIN_URL = legacyUrl("/login/");

export const SOCIAL = {
  youtube: { label: "YouTube", handle: "@akademikersingles", url: "https://www.youtube.com/@akademikersingles" },
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

export const TRUST_LINKS = [
  { label: "Redaktionelle Kontrolle", href: legacyUrl("/redaktionelle-kontrolle.html") },
  { label: "Sicherheit & Datenschutz", href: legacyUrl("/sicherheit-und-datenschutz.html") },
  { label: "Kostenlose Basis-Mitgliedschaft", href: legacyUrl("/kostenlose-basis-mitgliedschaft.html") },
  { label: "Premium-Mitgliedschaft", href: legacyUrl("/premium-mitgliedschaft.html") },
  { label: "Erfolgsgeschichten", href: legacyUrl("/unsere-erfolgsgeschichten.html") },
];

export const FEATURE_LINKS = [
  { label: "Fragenflirt", href: legacyUrl("/fragenflirt.html") },
  { label: "Fotoflirt", href: legacyUrl("/fotoflirt.html") },
  { label: "Videodate", href: legacyUrl("/videodate.html") },
];

export const LEGAL_LINKS = [
  { label: "Hilfe & Support", href: legacyUrl("/hilfe/") },
  { label: "Kontakt", href: legacyUrl("/kontakt/") },
  { label: "Impressum", href: legacyUrl("/impressum.html") },
  { label: "Datenschutz", href: legacyUrl("/datenschutz.html") },
  { label: "AGB", href: legacyUrl("/agb.html") },
  { label: "Barrierefreiheit", href: legacyUrl("/barrierefreiheit.html") },
  { label: "Vertrag kündigen", href: legacyUrl("/kontakt/k%C3%BCndigen/") },
  { label: "Widerruf", href: legacyUrl("/kontakt/widerruf/") },
];
