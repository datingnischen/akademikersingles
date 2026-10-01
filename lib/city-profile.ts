import hamburg from "@/data/city-profiles/hamburg.json";

// Stadtdossier: belegte Kennzahlen zu Bildung, Beruf und Single-Leben einer Stadt.
// Jede Zahl verweist per `source` auf einen Eintrag in `sources` (Institution, Stand, URL).

export type Comparison = { city: number; germany: number; unit: string; max?: number };

export type Metric = {
  value: string;
  label: string;
  note?: string;
  source: string;
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
  places: Place[];
  map: {
    bounds: { west: number; east: number; south: number; north: number };
    rivers: { major?: boolean; points: [number, number][] }[];
    lakes: { lat: number; lon: number; rx: number; ry: number }[];
    labels: { text: string; lat: number; lon: number; district?: boolean }[];
  };
  faq: { question: string; answer: string }[];
  sources: Source[];
};

const PROFILES = new Map<string, CityProfile>([[hamburg.path, hamburg as CityProfile]]);

for (const profile of PROFILES.values()) {
  const ids = new Set(profile.sources.map(source => source.id));
  const metrics = [...profile.briefing, ...profile.kpis, ...profile.dossier.flatMap(chapter => chapter.metrics)];
  for (const metric of metrics) {
    if (!ids.has(metric.source)) throw new Error(`${profile.path}: Kennzahl „${metric.label}“ ohne Quelle ${metric.source}`);
  }
}

export function getCityProfile(path: string): CityProfile | null {
  return PROFILES.get(path) ?? null;
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
