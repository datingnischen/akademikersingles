import { FAQ_GROUPS, faqPlainAnswer } from "@/lib/authored";
import { excerpt, getPages, guideLabel, type PublicPage } from "@/lib/content";

// Seitensuche unter „Über uns“: nginx reicht /ueber-uns/ an Next.js durch, /suche/ gehört der ICONY-Plattform.
export const SEARCH_PATH = "/ueber-uns/suche/";
export const MAX_RESULTS = 50;

export type SearchHit = { section: string; title: string; text: string; href: string };
type Entry = SearchHit & { titleKey: string; textKey: string };

const SECTIONS: Partial<Record<PublicPage["family"], string>> = {
  magazine: "Magazin",
  "magazine-hub": "Magazin",
  "magazine-category": "Magazin-Thema",
  location: "Stadt",
  "location-hub": "Partnersuche",
  guide: "Ratgeber",
  about: "Über uns",
  "about-reviews": "Über uns",
  social: "Über uns",
};

/** Kleinschreibung, ä/ö/ü/ß ≙ ae/oe/ue/ss, übrige Diakritika entfernt. */
export function normalizeSearch(value: string): string {
  return value
    .toLowerCase()
    .replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/ß/g, "ss")
    .normalize("NFD").replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function plainText(html: string): string {
  return html
    .replace(/<(script|style)\b[\s\S]*?<\/\1>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&quot;/g, "\"").replace(/&#0?39;|&apos;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();
}

function entry(hit: SearchHit, extraTitle: string, body: string): Entry {
  return { ...hit, titleKey: normalizeSearch(`${hit.title} ${extraTitle}`), textKey: normalizeSearch(`${hit.text} ${body}`) };
}

function pageTitle(page: PublicPage): string {
  if (page.family === "guide") return guideLabel(page);
  return page.heroTitle;
}

let index: Entry[] | null = null;

function buildIndex(): Entry[] {
  const entries: Entry[] = [];
  for (const page of getPages()) {
    const section = SECTIONS[page.family];
    if (!section) continue;
    const text = excerpt(plainText(page.excerpt || page.description || page.contentHtml), 180);
    entries.push(entry({ section, title: pageTitle(page), text, href: page.path }, `${page.heroTitle} ${page.locationName ?? ""}`, plainText(page.contentHtml)));
  }
  for (const group of FAQ_GROUPS) {
    for (const item of group.items) {
      entries.push(entry({ section: "FAQ", title: item.question, text: excerpt(faqPlainAnswer(item), 180), href: `/faq/#${group.id}` }, group.title, faqPlainAnswer(item)));
    }
  }
  return entries;
}

export function search(query: string): SearchHit[] {
  const phrase = normalizeSearch(query);
  if (!phrase) return [];
  const terms = [...new Set(phrase.split(" "))];
  index ??= buildIndex();
  const scored: { hit: SearchHit; score: number }[] = [];
  for (const item of index) {
    let score = 0;
    let matchesAll = true;
    for (const term of terms) {
      const inTitle = item.titleKey.includes(term);
      const inText = item.textKey.includes(term);
      if (!inTitle && !inText) { matchesAll = false; break; }
      score += inTitle ? 10 : 1;
    }
    if (!matchesAll) continue;
    if (item.titleKey.includes(phrase)) score += 20;
    if (item.titleKey.startsWith(phrase)) score += 5;
    const { section, title, text, href } = item;
    scored.push({ hit: { section, title, text, href }, score });
  }
  return scored
    .sort((a, b) => b.score - a.score || a.hit.title.localeCompare(b.hit.title, "de"))
    .slice(0, MAX_RESULTS)
    .map(({ hit }) => hit);
}
