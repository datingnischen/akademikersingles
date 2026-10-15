import type { PublicPage } from "./content";

/**
 * Suchmaschinen-Titel und Meta-Descriptions zur Laufzeit glätten (Seobility-Crawl 15.10.2026), ohne die importierten
 * Seitendaten zu ändern. Google und Seobility messen in Pixeln: Titel Arial 20px (Grenze 580 px), Descriptions
 * Arial 14px (Grenze 1.000 px). Überschriften, Linktexte und Seiteninhalte bleiben unverändert.
 */
export const TITLE_SUFFIX = " | AkademikerSingles";
export const TITLE_MAX_WIDTH = 570;
export const META_DESCRIPTION_MAX = 150;
export const META_DESCRIPTION_MAX_WIDTH = 980;
const MIN_SENTENCE_LENGTH = 90;

// Zeichenbreiten von Arial 20px (Canvas measureText), wie sie Google/Seobility für die Titelbreite ansetzen.
const ARIAL_20: Record<string, number> = {
  '0': 11.12, '1': 11.12, '2': 11.12, '3': 11.12, '4': 11.12, '5': 11.12, '6': 11.12, '7': 11.12, '8': 11.12, '9': 11.12,
  a: 11.12, b: 11.12, c: 10, d: 11.12, e: 11.12, f: 5.56, g: 11.12, h: 11.12, i: 4.44, j: 4.44, k: 10, l: 4.44, m: 16.66,
  n: 11.12, o: 11.12, p: 11.12, q: 11.12, r: 6.66, s: 10, t: 5.56, u: 11.12, v: 10, w: 14.44, x: 10, y: 10, z: 10,
  A: 13.34, B: 13.34, C: 14.44, D: 14.44, E: 13.34, F: 12.22, G: 15.56, H: 14.44, I: 5.56, J: 10, K: 13.34, L: 11.12,
  M: 16.66, N: 14.44, O: 15.56, P: 13.34, Q: 15.56, R: 14.44, S: 13.34, T: 12.22, U: 14.44, V: 13.34, W: 18.88, X: 13.34,
  Y: 13.34, Z: 12.22, ä: 11.12, ö: 11.12, ü: 11.12, Ä: 13.34, Ö: 15.56, Ü: 14.44, ß: 12.22, ' ': 5.56, '.': 5.56, ',': 5.56,
  ':': 5.56, ';': 5.56, '!': 5.56, '?': 11.12, '-': 6.66, '–': 11.12, '—': 20, '|': 5.2, '&': 13.34, '(': 6.66, ')': 6.66,
  '/': 5.56, '’': 4.44, '„': 6.66, '“': 6.66, '”': 6.66, '"': 7.1, "'": 3.82, '+': 11.68, '%': 17.78, '#': 11.12, '*': 7.78,
};

export function titleWidth(text: string) {
  let width = 0;
  for (const char of text) width += ARIAL_20[char] ?? 11.12;
  return width;
}
export function descriptionWidth(text: string) { return titleWidth(text) * 0.7; }

// Kürzere Titel (nur <title>) für Seiten, deren Überschrift allein über 570 px liegt; H1 und Linktexte bleiben.
const TITLE_OVERRIDES: Record<string, string> = {
  "/magazin/": "Magazin für Akademiker-Singles: Erfolg, Stil & Tiefgang",
  "/magazin/depression-dating-loslassen/": "Depression und Dating: Warum Loslassen schwerfällt",
  "/magazin/exklusive-dating-apps/": "Warteliste statt Match: Exklusive Dating-Apps",
  "/magazin/finanzielle-unabhaengigkeit-dating/": "Finanzielle Unabhängigkeit und Dating",
  "/magazin/gemeinsame-interessen-online-dating/": "Bücherliebe beim Online-Dating: Gemeinsame Interessen",
  "/magazin/high-value-dating-akademiker/": "High Value Dating: Partnersuche für Akademiker",
  "/magazin/ki-begleiter-partnersuche/": "KI-Begleiter statt Beziehung: Künstliche Nähe",
  "/magazin/ki-partner-chatbot-naehe/": "KI-Partner statt Beziehung? Chatbot-Nähe verstehen",
  "/magazin/author/redaktion/": "Die Redaktion von AkademikerSingles",
  // ICONY liefert /social-media/ mit dem Originaltitel weiter aus: eigene Metadaten gegen Dubletten.
  "/ueber-uns/social-media/": "AkademikerSingles auf Social Media: Videos & Tipps",
};

// Eigene Beschreibung je Magazin-Thema (Import ohne Kategorietexte); auch als Einleitung der Themenseite genutzt.
const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  "erfolg-anziehung": "Erfolg & Anziehung: warum Erfolg anziehend wirken kann, welche Rolle Status und Einkommen spielen und warum Erfolgreiche manchmal die falschen Partner wählen.",
  "unternehmer-selbststaendige-daten-anders": "Unternehmer & Selbstständige daten anders: wenig Zeit, bewusste Entscheidungen und wo Unternehmer abseits klassischer Dating-Apps neue Partner kennenlernen.",
  "intellektuelle-anziehung-tiefgang": "Intellektuelle Anziehung & Tiefgang: Sapiosexualität, mentale Kompatibilität, gemeinsame Interessen und warum Smalltalk viele Akademiker abschreckt.",
  "status-luxus": "Lifestyle, Status & Luxus: ob es oberflächlich ist, auf Geld zu achten, was eine ambitionierte Partnerwahl ausmacht und wann Luxus Freiheit bedeutet.",
  "beziehung-auf-augenhoehe": "Beziehung auf Augenhöhe: wenn beide stark sind, warum Gleichwertigkeit mehr zählt als Gleichheit und wie Akademiker und Nicht-Akademiker zusammenpassen.",
  "psychologie-erfolgreicher-singles": "Psychologie erfolgreicher Singles: Perfektionismus, Kontrollbedürfnis, emotionale Vorsicht und warum leistungsorientierte Menschen anders lieben.",
  "die-gezielt-akademiker-suchen": "Frauen, die gezielt Akademiker suchen: Motive, Klischees und die Frage, ob Sicherheit, Status oder Intellekt bei der Partnerwahl wirklich zählt.",
  "gesellschaft-moderne-partnersuche": "Gesellschaft & moderne Partnersuche: exklusive Dating-Apps, KI-Begleiter, späte Partnersuche und warum viele Akademiker länger Single bleiben.",
};

const DESCRIPTION_OVERRIDES: Record<string, string> = {
  "/magazin/": "Das Magazin von AkademikerSingles: Beiträge über Erfolg und Anziehung, Unternehmer-Dating, intellektuellen Tiefgang und Beziehungen auf Augenhöhe.",
  "/magazin/author/redaktion/": "Die Redaktion von AkademikerSingles schreibt über Partnersuche, Erfolg, Psychologie und Beziehungen für Akademiker und Singles mit Anspruch.",
  "/ueber-uns/social-media/": "AkademikerSingles auf Social Media: Videos, Expertenwissen und Inspiration rund um Partnerschaft, Dating und Beziehungen für anspruchsvolle Singles.",
};

export function categoryDescription(slug?: string | null) {
  return (slug && CATEGORY_DESCRIPTIONS[slug]) || "";
}

const LEGACY_SUFFIX = /\s*-\s*AkademikerSingles\s*-\s*Magazin\s*$/i;

export function seoTitle(page: Pick<PublicPage, "path" | "title">): string {
  const base = (TITLE_OVERRIDES[page.path] ?? page.title).replace(LEGACY_SUFFIX, "").replace(/AkademikerSingles\.de/g, "AkademikerSingles").trim();
  if (/AkademikerSingles/i.test(base)) return base;
  const branded = `${base}${TITLE_SUFFIX}`;
  return titleWidth(branded) <= TITLE_MAX_WIDTH ? branded : base;
}

export function clampMetaDescription(text?: string | null, max = META_DESCRIPTION_MAX): string {
  if (!text) return "";
  const normalized = String(text).replace(/\s+/g, " ").replace(/\s*(?:\[(?:…|\.\.\.)\]|\.\.\.|…)\s*$/, "").trim();
  if (normalized.length <= max && descriptionWidth(normalized) <= META_DESCRIPTION_MAX_WIDTH) return normalized;
  let end = Math.min(normalized.length, max);
  while (end > 0 && descriptionWidth(normalized.slice(0, end)) > META_DESCRIPTION_MAX_WIDTH - 12) end--;
  const window = normalized.slice(0, end);
  let sentenceEnd = -1;
  for (const match of window.matchAll(/[.!?](?=\s|$)/g)) sentenceEnd = match.index ?? sentenceEnd;
  if (sentenceEnd + 1 >= MIN_SENTENCE_LENGTH) return window.slice(0, sentenceEnd + 1);
  const cut = window.slice(0, -1);
  const lastSpace = cut.lastIndexOf(" ");
  const words = (lastSpace > 0 ? cut.slice(0, lastSpace) : cut).replace(/[\s,;:–—-]+$/, "");
  return `${words} …`;
}

export function seoDescription(page: Pick<PublicPage, "path" | "description" | "family" | "categories">): string {
  const own = (page.description || "").trim();
  const fallback = DESCRIPTION_OVERRIDES[page.path] || (page.family === "magazine-category" ? categoryDescription(page.categories[0]) : "");
  return clampMetaDescription(own.length >= 90 && !DESCRIPTION_OVERRIDES[page.path] ? own : fallback || own);
}
