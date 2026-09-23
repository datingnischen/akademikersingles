import snapshot from "@/data/public-pages.json";
import categorySnapshot from "@/data/magazine-categories.json";
import { registrationUrl, type Aid } from "@/lib/site";

export type Family = "home" | "location-hub" | "location" | "guide" | "magazine-hub" | "magazine" | "magazine-category" | "magazine-author";

export type PublicPage = {
  path: string;
  sourceUrl: string;
  canonical: string;
  family: Family;
  title: string;
  description: string;
  heroTitle: string;
  heroImage: string | null;
  heroImageAlt?: string;
  categories: string[];
  contentHtml: string;
  readingMinutes?: number;
  locationName?: string | null;
  cityWidget?: { url: string; postcode: string } | null;
  published?: string;
  modified?: string;
  author?: { name: string; path: string };
  excerpt?: string;
};

export type MagazineCategory = {
  id: number;
  slug: string;
  name: string;
  count: number;
  description: string;
  path: string;
};

// Die fünf Leitthemen des Magazins – in dieser Reihenfolge überall zuerst, mit kurzem Navigationsnamen.
export const LEAD_CATEGORIES: Record<string, string> = {
  "erfolg-anziehung": "Erfolg & Anziehung",
  "unternehmer-selbststaendige-daten-anders": "Unternehmer Dating",
  "intellektuelle-anziehung-tiefgang": "Intellektuelle Anziehung",
  "status-luxus": "Lifestyle, Status & Luxus",
  "beziehung-auf-augenhoehe": "Beziehung auf Augenhöhe",
};

// Kachelmotive der Leitthemen: ohne eingebrannten Text und mit der gewünschten Lifestyle-Anmutung.
const TOPIC_COVERS: Record<string, string> = {
  "erfolg-anziehung": "/magazin/ist-status-sexy/",
  "unternehmer-selbststaendige-daten-anders": "/magazin/selten-zeit-haben-aber-lieben/",
  "intellektuelle-anziehung-tiefgang": "/magazin/mentale-kompatibilitaet/",
  "status-luxus": "/magazin/gold-digger/",
  "beziehung-auf-augenhoehe": "/magazin/nicht-akademiker/",
};

const CITY_WIDGET = /^https:\/\/js\.icony\.com\/frame\/\?h=300&id=akademikersingles&pc=a7060c&z=([0-9]{5})&ds=&ctr=49&it=1$/;

const pages = snapshot.pages as PublicPage[];
const pageIndex = new Map(pages.map(page => [page.path, page]));
const leadOrder = Object.keys(LEAD_CATEGORIES);
const categories = (categorySnapshot.categories as MagazineCategory[]).slice().sort((a, b) => {
  const rank = (slug: string) => (leadOrder.includes(slug) ? leadOrder.indexOf(slug) : leadOrder.length);
  return rank(a.slug) - rank(b.slug) || a.name.localeCompare(b.name, "de");
});

for (const page of pages) {
  if (page.cityWidget) {
    const match = CITY_WIDGET.exec(page.cityWidget.url);
    if (!match || match[1] !== page.cityWidget.postcode || page.family !== "location") {
      throw new Error(`Invalid city widget contract for ${page.path}`);
    }
  }
}

export function normalizeContentPath(slug?: string[]): string {
  return !slug?.length ? "/" : `/${slug.map(part => decodeURIComponent(part)).join("/")}/`;
}

export function getPage(path: string): PublicPage | null {
  return pageIndex.get(path) ?? null;
}

export function getPages(): PublicPage[] {
  return pages;
}

export function getArticles(): PublicPage[] {
  return pages.filter(page => page.family === "magazine").sort((a, b) => (b.published ?? "").localeCompare(a.published ?? ""));
}

export function getCities(): PublicPage[] {
  return pages.filter(page => page.family === "location").sort((a, b) => (a.locationName ?? "").localeCompare(b.locationName ?? "", "de"));
}

export function getGuides(): PublicPage[] {
  return pages.filter(page => page.family === "guide");
}

const GUIDE_LABELS: Record<string, string> = {
  "/partnervermittlung/": "Seriöse Partnervermittlung",
  "/universitaeten/": "Top-Universitäten",
  "/ueber-50/": "Akademiker über 50",
  "/einkommen/": "Einkommen von Akademikern",
  "/social-media/": "Social Media",
};

export function guideLabel(page: PublicPage): string {
  return GUIDE_LABELS[page.path] ?? page.heroTitle;
}

export function getCategories(): MagazineCategory[] {
  return categories;
}

export function getLeadCategories(): MagazineCategory[] {
  return categories.filter(category => category.slug in LEAD_CATEGORIES);
}

export function getCategory(slug: string): MagazineCategory | null {
  return categories.find(category => category.slug === slug) ?? null;
}

export function categoryLabel(category: MagazineCategory): string {
  return LEAD_CATEGORIES[category.slug] ?? category.name;
}

export function primaryCategory(page: PublicPage): MagazineCategory | null {
  return page.categories.map(getCategory).find((category): category is MagazineCategory => Boolean(category)) ?? null;
}

export function articlesInCategory(slug: string): PublicPage[] {
  return getArticles().filter(article => article.categories.includes(slug));
}

export function topicCover(slug: string): PublicPage | null {
  const curated = TOPIC_COVERS[slug] ? getPage(TOPIC_COVERS[slug]) : null;
  return curated?.heroImage ? curated : articlesInCategory(slug).find(article => article.heroImage) ?? null;
}

export function relatedArticles(page: PublicPage, count = 3): PublicPage[] {
  const articles = getArticles().filter(article => article.path !== page.path);
  const sameTopic = articles.filter(article => article.categories.some(slug => page.categories.includes(slug)));
  return [...sameTopic, ...articles.filter(article => !sameTopic.includes(article))].slice(0, count);
}

// Rotierend ab der aktuellen Stadt, damit jede Stadtseite andere Nachbarn verlinkt.
export function moreCities(page: PublicPage, count = 6): PublicPage[] {
  const cities = getCities();
  const start = cities.findIndex(city => city.path === page.path) + 1;
  return [...cities.slice(start), ...cities.slice(0, start)].filter(city => city.path !== page.path).slice(0, count);
}

export function aidFor(page: PublicPage): Aid | null {
  if (page.family === "location" || page.family === "location-hub") return "location";
  if (page.family.startsWith("magazine")) return "magazin";
  return null;
}

export function pageRegistrationUrl(page: PublicPage): string {
  return registrationUrl(aidFor(page));
}

export function formatDate(value?: string): string {
  if (!value) return "";
  return new Intl.DateTimeFormat("de-DE", { day: "numeric", month: "long", year: "numeric" }).format(new Date(value));
}

export function excerpt(value: string, length = 170): string {
  return value.length > length ? `${value.slice(0, length - 3).replace(/\s+\S*$/, "")} …` : value;
}

export function cardText(page: PublicPage): string {
  return excerpt(page.excerpt || page.description);
}

function optimizedImage(src: string, width: number): string {
  return `/_next/image?url=${encodeURIComponent(src)}&amp;w=${width}&amp;q=78`;
}

function withoutImage(html: string, src: string): string {
  const at = html.indexOf(`src="${src}"`);
  if (at < 0) return html;
  const start = html.lastIndexOf("<img", at);
  const end = html.indexOf(">", at) + 1;
  return (html.slice(0, start) + html.slice(end)).replace(/<p>\s*<\/p>/, "");
}

/**
 * Bereitet den importierten Fließtext auf: Registrierungslinks tragen die AID der Seitenfamilie,
 * Inhaltsbilder laufen über die Bildoptimierung (die Originale sind teils mehrere MB große PNGs).
 */
export function renderedContentHtml(page: PublicPage): string {
  const registration = pageRegistrationUrl(page).replace(/&/g, "&amp;");
  // Stadt- und Ratgeberseiten zeigen ihr erstes Inhaltsbild bereits im Seitenkopf.
  const body = page.family !== "magazine" && page.heroImage ? withoutImage(page.contentHtml, page.heroImage) : page.contentHtml;
  return body
    .replace(/href=(["'])https:\/\/(?:www\.)?akademikersingles\.de\/registration\/?(?:\?[^"']*)?\1/gi, (_match, quote) => `href=${quote}${registration}${quote} class="registration-cta"`)
    .replace(/<img\b([^>]*?)src="(\/imported\/[^"]+\.(?:jpe?g|png|webp))"([^>]*)>/gi, (_match, before, src, after) =>
      `<img${before}src="${optimizedImage(src, 1200)}" srcset="${optimizedImage(src, 640)} 640w, ${optimizedImage(src, 1080)} 1080w, ${optimizedImage(src, 1920)} 1920w" sizes="(max-width: 760px) 100vw, 720px" decoding="async"${after}>`);
}

export function hasAudio(page: PublicPage): boolean {
  return /<audio\b/i.test(page.contentHtml);
}
