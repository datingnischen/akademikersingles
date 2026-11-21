import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import type { PublicPage } from "./content.ts";
import { publicUrl, type RegionalMarket } from "./markets.ts";

/**
 * Eigenes Magazin für Österreich und die Schweiz.
 *
 * Die deutschen Magazinbeiträge erscheinen unter /at/ und /ch/ nicht mehr (Christian, 21.11.2026:
 * „Möchte keine Kopie der deutschen Variante“). Stattdessen liegt je Land ein eigenes, kleines Magazin
 * mit Beiträgen, die es nur dort gibt – gebaut aus belegten Zahlen der jeweiligen amtlichen Statistik.
 *
 * Ein Beitrag ist eine Datei unter data/market-magazine/<land>/<slug>.json. Der Text steht nicht als
 * fertiges HTML darin, sondern als Folge von Blöcken (Text, Kennzahlen, Balkendiagramm, Zitat, Liste,
 * Fazit, FAQ). Daraus entsteht hier das HTML – so bleiben die Beiträge gegliedert statt textlastig
 * (Regel „Artikel nicht textlastig“) und die Darstellung ist überall gleich.
 */

export type ArticleBlock =
  | { type: "text"; html: string }
  | { type: "heading"; text: string }
  | { type: "kpis"; items: { value: string; label: string }[] }
  | { type: "chart"; title: string; note?: string; unit?: string; bars: { label: string; value: number; display?: string; highlight?: boolean }[] }
  | { type: "quote"; text: string; source?: string }
  | { type: "list"; items: string[]; ordered?: boolean }
  | { type: "takeaway"; title?: string; html: string }
  | { type: "faq"; items: { question: string; answer: string }[] };

export type MarketArticle = {
  slug: string;
  title: string;
  metaTitle?: string;
  description: string;
  excerpt: string;
  topic: string;
  published: string;
  modified: string;
  readingMinutes: number;
  heroImage?: string | null;
  heroImageAlt: string;
  blocks: ArticleBlock[];
  sources: { publisher: string; title: string; stand: string; url: string }[];
  related?: { href: string; label: string }[];
};

const DIR = join(process.cwd(), "data", "market-magazine");
const cache = new Map<RegionalMarket, MarketArticle[]>();

function escape(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function chartHtml(block: Extract<ArticleBlock, { type: "chart" }>): string {
  const max = Math.max(...block.bars.map(bar => bar.value)) * 1.08 || 1;
  const rows = block.bars.map(bar => {
    const width = Math.max(2, Math.round((bar.value / max) * 1000) / 10);
    const display = bar.display ?? `${bar.value.toLocaleString("de-DE")}${block.unit ?? ""}`;
    return `<li${bar.highlight ? ' class="is-highlight"' : ""}><span class="mag-chart-label">${escape(bar.label)}</span><span class="mag-chart-bar"><i style="width:${width}%"></i></span><span class="mag-chart-value">${escape(display)}</span></li>`;
  });
  return `<figure class="mag-chart"><figcaption>${escape(block.title)}</figcaption><ul>${rows.join("")}</ul>${block.note ? `<p class="mag-chart-note">${block.note}</p>` : ""}</figure>`;
}

function blockHtml(block: ArticleBlock): string {
  switch (block.type) {
    case "text":
      return block.html;
    case "heading":
      return `<h2>${escape(block.text)}</h2>`;
    case "kpis":
      return `<div class="mag-kpis">${block.items.map(item => `<div><span class="mag-kpi-value">${escape(item.value)}</span><span class="mag-kpi-label">${item.label}</span></div>`).join("")}</div>`;
    case "chart":
      return chartHtml(block);
    case "quote":
      return `<blockquote class="mag-quote"><p>${block.text}</p>${block.source ? `<cite>${block.source}</cite>` : ""}</blockquote>`;
    case "list": {
      const tag = block.ordered ? "ol" : "ul";
      return `<${tag} class="mag-list">${block.items.map(item => `<li>${item}</li>`).join("")}</${tag}>`;
    }
    case "takeaway":
      return `<aside class="mag-takeaway"><p class="mag-takeaway-title">${escape(block.title ?? "Fazit")}</p>${block.html}</aside>`;
    case "faq":
      return `<section class="mag-faq"><h2>Häufige Fragen</h2>${block.items.map(item => `<details><summary>${escape(item.question)}</summary><p>${item.answer}</p></details>`).join("")}</section>`;
  }
}

/** Beitrags-HTML aus den Blöcken; die Quellenliste hängt hinten an und wird von collapseSourceSections eingeklappt. */
export function articleHtml(article: MarketArticle): string {
  const body = article.blocks.map(blockHtml).join("\n");
  const sources = article.sources.map(source => `<li>${escape(source.publisher)}: <a href="${source.url}" target="_blank" rel="nofollow noopener">${escape(source.title)}</a> (${escape(source.stand)})</li>`).join("");
  const related = article.related?.length
    ? `<h2>Passend dazu</h2><ul class="mag-list">${article.related.map(link => `<li><a href="${link.href}">${escape(link.label)}</a></li>`).join("")}</ul>`
    : "";
  return `${body}\n${related}\n<h2>Quellen</h2><ul class="mag-sources">${sources}</ul>`;
}

function load(market: RegionalMarket): MarketArticle[] {
  const dir = join(DIR, market);
  const files = existsSync(dir) ? readdirSync(dir).filter(file => file.endsWith(".json")) : [];
  const articles = files.map(file => JSON.parse(readFileSync(join(dir, file), "utf8")) as MarketArticle);
  for (const article of articles) {
    if (!article.sources.length) throw new Error(`${market}/${article.slug}: Beitrag ohne Quellen`);
    if (article.modified < article.published) throw new Error(`${market}/${article.slug}: modified vor published`);
  }
  return articles.sort((a, b) => b.published.localeCompare(a.published));
}

export function marketArticles(market: RegionalMarket): MarketArticle[] {
  if (process.env.NODE_ENV !== "production") return load(market);
  let articles = cache.get(market);
  if (!articles) cache.set(market, articles = load(market));
  return articles;
}

/**
 * Titelbild nur, wenn die Datei wirklich im Repo liegt. Die Bilder kommen von Codex (Regel „Bilder immer Codex“);
 * bis sie da sind, erscheint der Beitrag ohne Bild statt mit einem toten Pfad – genauso wie bei den Stadtseiten.
 */
function heroImage(market: RegionalMarket, article: MarketArticle): string | null {
  const file = article.heroImage ?? `/brand/magazin-${market}-${article.slug}.webp`;
  return existsSync(join(process.cwd(), "public", file)) ? file : null;
}

function articlePage(market: RegionalMarket, article: MarketArticle): PublicPage {
  const path = `/magazin/${article.slug}/`;
  return {
    path,
    sourceUrl: publicUrl(market, path),
    canonical: publicUrl(market, path),
    family: "magazine",
    title: article.metaTitle ?? article.title,
    metaTitle: article.metaTitle,
    description: article.description,
    heroTitle: article.title,
    heroImage: heroImage(market, article),
    heroImageAlt: article.heroImageAlt,
    categories: [],
    topicLabel: article.topic,
    contentHtml: articleHtml(article),
    readingMinutes: article.readingMinutes,
    published: article.published,
    modified: article.modified,
    author: { name: "Redaktion", path: "/ueber-uns/" },
    excerpt: article.excerpt,
    faq: article.blocks.flatMap(block => (block.type === "faq" ? block.items : [])),
  };
}

export function marketArticlePages(market: RegionalMarket): PublicPage[] {
  return marketArticles(market).map(article => articlePage(market, article));
}

const HUBS: Record<RegionalMarket, { title: string; description: string; lead: string }> = {
  at: {
    title: "Magazin für Akademiker Singles in Österreich – AkademikerSingles",
    description: "Partnermarkt, Hochschulen und Alltag in Österreich in Zahlen: eigene Beiträge aus der amtlichen Statistik, nicht aus Deutschland übernommen.",
    lead: "Beiträge über Bildung, Partnersuche und Alltag in Österreich – jede Zahl mit Quelle, kein übersetzter Deutschland-Text.",
  },
  ch: {
    title: "Magazin für Akademiker Singles in der Schweiz – AkademikerSingles",
    description: "Partnermarkt, Hochschulen und Alltag in der Schweiz in Zahlen: eigene Beiträge, belegt mit Daten des Bundesamts für Statistik und der Kantone.",
    lead: "Beiträge über Bildung, Partnersuche und Alltag in der Schweiz – jede Zahl mit Quelle, kein übersetzter Deutschland-Text.",
  },
};

export function marketMagazineHub(market: RegionalMarket): PublicPage {
  const hub = HUBS[market];
  return {
    path: "/magazin/",
    sourceUrl: publicUrl(market, "/magazin/"),
    canonical: publicUrl(market, "/magazin/"),
    family: "magazine-hub",
    title: hub.title,
    description: hub.description,
    heroTitle: market === "at" ? "Das Magazin für Österreich" : "Das Magazin für die Schweiz",
    heroImage: null,
    categories: [],
    contentHtml: "",
    excerpt: hub.lead,
  };
}

export function marketMagazinePages(market: RegionalMarket): PublicPage[] {
  return [marketMagazineHub(market), ...marketArticlePages(market)];
}
