import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

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
  key: "bildung" | "beruf" | "singles";
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

export type CityProfile = {
  path: string;
  eyebrow: string;
  lead: string;
  heroAlt: string;
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
  faq: { question: string; answer: string }[];
  sources: Source[];
};

const PROFILE_DIR = join(process.cwd(), "data", "city-profiles");
let cache: Map<string, CityProfile> | null = null;

function loadProfiles(): Map<string, CityProfile> {
  const profiles = new Map<string, CityProfile>(readdirSync(PROFILE_DIR).filter(file => file.endsWith(".json")).map(file => {
    const profile = JSON.parse(readFileSync(join(PROFILE_DIR, file), "utf8")) as CityProfile;
    return [profile.path, profile];
  }));
  for (const profile of profiles.values()) {
    const ids = new Set(profile.sources.map(source => source.id));
    const metrics = [...profile.briefing, ...profile.kpis, ...profile.dossier.flatMap(chapter => chapter.metrics)];
    const used = [...metrics.flatMap(metric => [metric.source, metric.compareSource ?? metric.source]), ...(profile.clusterSources ?? [])];
    for (const id of used) {
      if (!ids.has(id)) throw new Error(`${profile.path}: Quelle ${id} fehlt in sources`);
    }
  }
  return profiles;
}

// Im Dev-Modus jedes Mal neu lesen, damit neue Profile ohne Neustart erscheinen.
export function getCityProfile(path: string): CityProfile | null {
  const profiles = process.env.NODE_ENV === "production" ? (cache ??= loadProfiles()) : loadProfiles();
  return profiles.get(path) ?? null;
}

export function sourceNumber(profile: CityProfile, id: string): number {
  return profile.sources.findIndex(source => source.id === id) + 1;
}

export type GuideSection = { id: string; title: string; html: string };
export type GuideParts = { intro: string; sections: GuideSection[]; related: { href: string; label: string }[] };

function slugify(value: string): string {
  return value.toLowerCase().replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/ß/g, "ss").replace(/<[^>]+>/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
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
