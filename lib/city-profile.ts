import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { requestMarket } from "@/lib/market-context";
import type { MarketCode } from "@/lib/markets";

// Stadtdossier: belegte Kennzahlen zu Bildung, Beruf und Single-Leben einer Stadt.
// Jede Zahl verweist per `source` auf einen Eintrag in `sources` (Institution, Stand, URL);
// `compareSource` belegt den Deutschland-Vergleich bzw. eine zweite Quelle. Eine Datei je Stadt in data/city-profiles/.

export type Comparison = { city: number; germany: number; unit: string; max?: number };

export type Metric = {
  value: string;
  label: string;
  note?: string;
  source: string;
  compareSource?: string;
  compare?: Comparison;
};

export type DossierChapter = {
  key: "bildung" | "beruf" | "forschung" | "einkommen" | "wohnen" | "singles";
  title: string;
  intro: string;
  metrics: Metric[];
  takeaway: string;
};

export type Place = {
  name: string;
  kind: "work" | "date";
  district: string;
  text: string;
  lat: number;
  lon: number;
};

export type Source = { id: string; publisher: string; title: string; stand: string; url: string };

// Hochschulporträt: eine Zeile je Hochschule der Stadt (Trägerschaft, Gründung, Studierende, Frauenanteil, Profil).
export type University = {
  name: string;
  kind: string;
  founded?: string;
  students?: string;
  women?: string;
  text: string;
  source: string;
  compareSource?: string;
};

// Quartiere und Bezirke: wo in der Stadt Hochschulnahe wohnen, arbeiten und ausgehen.
export type Quarter = { name: string; label: string; text: string; source?: string };

// Wiederkehrende Termine und Netzwerke mit akademischem Bezug (Lange Nacht der Forschung, Science Slam, Alumni-Clubs).
export type AgendaItem = { title: string; when: string; text: string; href?: string };

// Gesprächsstoff: redaktionelle Themen, über die in dieser Stadt wirklich geredet wird.
export type TalkingPoint = { title: string; text: string };

// Eigener Stadt-Guide der AT/CH-Seiten (in DE liefert den Text der ICONY-Import).
export type GuideChapter = { title: string; html: string };

export type CityProfile = {
  path: string;
  // Nur AT/CH-Dossiers (data/city-profiles/<land>/): Anzeigename, Land (Beschriftung der Vergleichsbalken), Region und SEO-Texte.
  // `compare.germany` enthält dort den Vergleichswert des Landes (Österreich bzw. Schweiz).
  name?: string;
  country?: string;
  region?: string;
  seoTitle?: string;
  seoDescription?: string;
  eyebrow: string;
  lead: string;
  heroAlt?: string;
  heroCredit?: string;
  briefing: Metric[];
  kpis: Metric[];
  dossier: DossierChapter[];
  clusters: { name: string; text: string }[];
  clusterSources?: string[];
  places: Place[];
  map: {
    bounds: { west: number; east: number; south: number; north: number };
    rivers: { name?: string; major?: boolean; points: [number, number][] }[];
    areas: { kind: "water" | "green"; name?: string; points: [number, number][] }[];
    labels: { text: string; lat: number; lon: number; district?: boolean }[];
    boundary?: [number, number][][];
  };
  // Nur AT/CH: eigene Kapitel (Hochschulen, Quartiere, Termine, Gesprächsstoff, Stadt-Guide). DE-Dossiers lassen sie leer.
  universities?: University[];
  universitiesNote?: string;
  quarters?: Quarter[];
  quarterSources?: string[];
  agenda?: AgendaItem[];
  talkingPoints?: TalkingPoint[];
  guide?: GuideChapter[];
  // Vergleichszeile für die Städteübersicht des Marktes (gleiche Reihenfolge je Land).
  hubFacts?: { label: string; value: string }[];
  faq: { question: string; answer: string }[];
  sources: Source[];
  // Redaktioneller Hinweis auf eine eigene Verteilerseite (nur einzelne Städte, z. B. Kassel → kasseler-singles.de/#quiz).
  nicheHint?: { before: string; anchor: string; href: string; after: string };
};

const PROFILE_DIR = join(process.cwd(), "data", "city-profiles");
const cache = new Map<MarketCode, Map<string, CityProfile>>();

function loadProfiles(market: MarketCode): Map<string, CityProfile> {
  // DE liegt direkt in data/city-profiles/, AT und CH in den Unterordnern at/ und ch/.
  const dir = market === "de" ? PROFILE_DIR : join(PROFILE_DIR, market);
  const files = existsSync(dir) ? readdirSync(dir).filter(file => file.endsWith(".json")) : [];
  const profiles = new Map<string, CityProfile>(files.map(file => {
    const profile = JSON.parse(readFileSync(join(dir, file), "utf8")) as CityProfile;
    return [profile.path, profile];
  }));
  for (const profile of profiles.values()) {
    const ids = new Set(profile.sources.map(source => source.id));
    const metrics = [...profile.briefing, ...profile.kpis, ...profile.dossier.flatMap(chapter => chapter.metrics)];
    const used = [
      ...metrics.flatMap(metric => [metric.source, metric.compareSource ?? metric.source]),
      ...(profile.clusterSources ?? []),
      ...(profile.quarterSources ?? []),
      ...(profile.universities ?? []).flatMap(item => [item.source, item.compareSource ?? item.source]),
      ...(profile.quarters ?? []).flatMap(item => (item.source ? [item.source] : [])),
    ];
    for (const id of used) {
      if (!ids.has(id)) throw new Error(`${profile.path}: Quelle ${id} fehlt in sources`);
    }
  }
  return profiles;
}

function profilesFor(market: MarketCode): Map<string, CityProfile> {
  // Im Dev-Modus jedes Mal neu lesen, damit neue Profile ohne Neustart erscheinen.
  if (process.env.NODE_ENV !== "production") return loadProfiles(market);
  let profiles = cache.get(market);
  if (!profiles) cache.set(market, profiles = loadProfiles(market));
  return profiles;
}

export function getCityProfile(path: string, market: MarketCode = requestMarket()): CityProfile | null {
  return profilesFor(market).get(path) ?? null;
}

export function getMarketProfiles(market: MarketCode): CityProfile[] {
  return [...profilesFor(market).values()].sort((a, b) => (a.name ?? a.path).localeCompare(b.name ?? b.path, "de"));
}

export function sourceNumber(profile: CityProfile, id: string): number {
  return profile.sources.findIndex(source => source.id === id) + 1;
}

export type GuideSection = { id: string; title: string; html: string };
export type GuideParts = { intro: string; sections: GuideSection[]; related: { href: string; label: string }[] };

function slugify(value: string): string {
  return value.toLowerCase().replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/ß/g, "ss").replace(/<[^>]+>/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

/** Eigener Stadt-Guide der AT/CH-Dossiers als Abschnitte mit Anker-IDs (DE nutzt splitGuide auf dem ICONY-Text). */
export function profileGuide(profile: CityProfile): GuideSection[] {
  return (profile.guide ?? []).map(chapter => ({ id: slugify(chapter.title), title: chapter.title, html: chapter.html }));
}

/**
 * Zerlegt den importierten Stadttext an seinen h2 in Kapitel (der Wortlaut bleibt unverändert).
 * Die Registrierungs-Buttons des ICONY-Textes entfallen, die Seite hat eigene CTAs;
 * die Linkliste „Diese Städte könnten auch interessant …“ wird als Chips separat gezeigt.
 */
export function splitGuide(html: string): GuideParts {
  const cleaned = html.replace(/<a\b[^>]*class="registration-cta"[^>]*>[\s\S]*?<\/a>/g, "").trim();
  const parts = cleaned.split(/(?=<h2\b)/);
  const intro = parts[0].startsWith("<h2") ? "" : parts.shift()!.trim();
  const sections: GuideSection[] = [];
  const related: GuideParts["related"] = [];
  for (const part of parts) {
    const match = /^<h2\b[^>]*>([\s\S]*?)<\/h2>/.exec(part);
    if (!match) continue;
    const title = match[1].replace(/<[^>]+>/g, "").trim();
    if (/könnten auch interessant/i.test(title)) {
      for (const link of part.matchAll(/<a\b[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g)) related.push({ href: link[1], label: link[2].replace(/<[^>]+>/g, "").trim() });
      continue;
    }
    sections.push({ id: slugify(title), title, html: part.slice(match[0].length).trim() });
  }
  return { intro, sections, related };
}
