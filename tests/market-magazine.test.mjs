import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import test from "node:test";

import { articleHtml, marketArticles, marketMagazineHub, marketMagazinePages } from "../lib/market-magazine.ts";
import { buildMarketMagazineSource } from "../lib/wp-rest-compat.ts";

// Eigenes Magazin für Österreich und die Schweiz (Christian, 21.11.2026: „Möchte keine Kopie der deutschen Variante.
// Hier müssen wir unique und hochwertige eigene Texte bringen“). Diese Tests halten den Baustandard fest: belegte
// Zahlen, gegliederte Beiträge statt Textwände, Landesschreibweise, unregelmäßige Zeitstempel, keine doppelten Sätze.
const MARKETS = ["at", "ch"];
const MIN_ARTICLES = 5;

const root = new URL("../", import.meta.url);
const files = (market) => readdirSync(new URL(`data/market-magazine/${market}/`, root)).filter((file) => file.endsWith(".json"));
const raw = (market, file) => JSON.parse(readFileSync(new URL(`data/market-magazine/${market}/${file}`, root), "utf8"));
const blockTypes = (article) => article.blocks.map((block) => block.type);
const isRound = (stamp) => /T\d\d:(00|30):00$/.test(stamp) || /:00$/.test(stamp);

test("beide Länder haben ein eigenes Magazin mit genügend Beiträgen", () => {
  for (const market of MARKETS) {
    const articles = marketArticles(market);
    assert.ok(articles.length >= MIN_ARTICLES, `${market}: nur ${articles.length} Beiträge`);
    assert.equal(articles.length, files(market).length);
    const slugs = articles.map((article) => article.slug);
    assert.equal(new Set(slugs).size, slugs.length, `${market}: doppelte Slugs`);
  }
});

test("Dateiname und Slug stimmen überein, Slug ist URL-tauglich", () => {
  for (const market of MARKETS) {
    for (const file of files(market)) {
      const article = raw(market, file);
      assert.equal(`${article.slug}.json`, file, `${market}/${file}: Slug passt nicht zum Dateinamen`);
      assert.match(article.slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/, `${market}/${file}: Slug ${article.slug}`);
    }
  }
});

test("SEO-Felder: Titel, Description 110 bis 150 Zeichen, Anriss, Lesezeit, Alt-Text", () => {
  for (const market of MARKETS) {
    for (const article of marketArticles(market)) {
      const id = `${market}/${article.slug}`;
      assert.ok(article.title.length >= 20 && article.title.length <= 95, `${id}: Titel ${article.title.length} Zeichen`);
      assert.ok((article.metaTitle ?? article.title).length <= 60, `${id}: Meta-Title zu lang`);
      assert.ok(
        article.description.length >= 110 && article.description.length <= 150,
        `${id}: Description ${article.description.length} Zeichen`,
      );
      assert.ok(article.excerpt.length >= 80, `${id}: Anriss zu kurz`);
      assert.ok(article.readingMinutes >= 3 && article.readingMinutes <= 20, `${id}: Lesezeit ${article.readingMinutes}`);
      assert.ok(article.heroImageAlt.trim().length >= 25, `${id}: Alt-Text fehlt oder ist zu knapp`);
      assert.ok(article.topic.trim().length > 0, `${id}: kein Themenlabel`);
    }
  }
});

test("Beiträge sind gegliedert, nicht textlastig: Kennzahlen, Diagramm, Fazit, FAQ", () => {
  for (const market of MARKETS) {
    for (const article of marketArticles(market)) {
      const id = `${market}/${article.slug}`;
      const types = blockTypes(article);
      assert.ok(article.blocks.length >= 8, `${id}: nur ${article.blocks.length} Blöcke`);
      for (const needed of ["kpis", "chart", "takeaway", "faq"]) {
        assert.ok(types.includes(needed), `${id}: Block „${needed}“ fehlt`);
      }
      assert.ok(types.filter((type) => type === "chart").length >= 2, `${id}: weniger als zwei Diagramme`);
      const faq = article.blocks.filter((block) => block.type === "faq").flatMap((block) => block.items);
      assert.ok(faq.length >= 6, `${id}: nur ${faq.length} FAQ-Einträge`);
      for (const item of faq) {
        assert.ok(item.question.trim().endsWith("?"), `${id}: FAQ ohne Fragezeichen`);
        assert.ok(item.answer.length >= 80, `${id}: FAQ-Antwort zu kurz: ${item.question}`);
      }
      for (const block of article.blocks) {
        if (block.type === "kpis") assert.ok(block.items.length >= 3, `${id}: Kennzahlenblock mit ${block.items.length} Werten`);
        if (block.type === "chart") {
          assert.ok(block.bars.length >= 3, `${id}: Diagramm „${block.title}“ mit ${block.bars.length} Balken`);
          assert.ok(block.title.trim().length > 0, `${id}: Diagramm ohne Beschriftung`);
          assert.ok(block.note && /Quelle/.test(block.note), `${id}: Diagramm „${block.title}“ ohne Quellenhinweis`);
          for (const bar of block.bars) assert.ok(Number.isFinite(bar.value) && bar.value > 0, `${id}: Balken ohne Wert`);
        }
      }
    }
  }
});

test("jede Zahl hat eine Quelle mit Herausgeber, Stand und https-Link", () => {
  for (const market of MARKETS) {
    for (const article of marketArticles(market)) {
      const id = `${market}/${article.slug}`;
      assert.ok(article.sources.length >= 1, `${id}: keine Quelle`);
      for (const source of article.sources) {
        for (const field of ["publisher", "title", "stand", "url"]) {
          assert.ok(source[field] && String(source[field]).trim().length > 0, `${id}: Quelle ohne ${field}`);
        }
        assert.match(source.url, /^https:\/\//, `${id}: Quelle ohne https: ${source.url}`);
      }
      const html = articleHtml(article);
      assert.match(html, /<h2>Quellen<\/h2>/, `${id}: Quellenkapitel fehlt im HTML`);
      for (const source of article.sources) assert.ok(html.includes(source.url), `${id}: Quelle nicht verlinkt`);
    }
  }
});

test("interne Links sind marktneutral und zeigen auf vorhandene Seiten", () => {
  const cityPaths = new Set(
    MARKETS.flatMap((market) =>
      readdirSync(new URL(`data/city-profiles/${market}/`, root))
        .filter((file) => file.endsWith(".json"))
        .map((file) => `/partnersuche/${file.replace(/\.json$/, "")}/`),
    ),
  );
  for (const market of MARKETS) {
    const own = new Set(marketArticles(market).map((article) => `/magazin/${article.slug}/`));
    for (const article of marketArticles(market)) {
      const id = `${market}/${article.slug}`;
      const links = [...articleHtml(article).matchAll(/href="(\/[^"]*)"/g)].map((match) => match[1]);
      assert.ok(links.length > 0, `${id}: keine internen Links`);
      for (const href of links) {
        assert.ok(!/^\/(?:at|ch|de)\//.test(href), `${id}: Link mit Marktpräfix ${href} (localizePath setzt es selbst)`);
        if (href.startsWith("/magazin/")) assert.ok(own.has(href), `${id}: Link auf fehlenden Beitrag ${href}`);
        if (href.startsWith("/partnersuche/") && href !== "/partnersuche/") {
          assert.ok(cityPaths.has(href), `${id}: Link auf fehlende Stadtseite ${href}`);
        }
      }
    }
  }
});

test("Zeitstempel sind unregelmäßig, einmalig, nicht in der Zukunft, höchstens zwei je Tag", () => {
  const now = new Date().toISOString().slice(0, 19);
  const seen = new Map();
  for (const market of MARKETS) {
    const perDay = new Map();
    for (const article of marketArticles(market)) {
      const id = `${market}/${article.slug}`;
      for (const field of ["published", "modified"]) {
        const stamp = article[field];
        assert.match(stamp, /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/, `${id} ${field}: ${stamp}`);
        assert.ok(!isRound(stamp), `${id} ${field}: runde Uhrzeit ${stamp}`);
        assert.ok(stamp <= now, `${id} ${field}: liegt in der Zukunft`);
        const hour = Number(stamp.slice(11, 13));
        assert.ok(hour >= 7 && hour <= 22, `${id} ${field}: Uhrzeit ${stamp} außerhalb 7 bis 22 Uhr`);
        if (field === "modified" && stamp === article.published) continue;
        assert.ok(!seen.has(stamp), `${id} ${field}: gleiche Sekunde wie ${seen.get(stamp)}`);
        seen.set(stamp, id);
      }
      assert.ok(article.modified >= article.published, `${id}: modified vor published`);
      const day = article.published.slice(0, 10);
      perDay.set(day, [...(perDay.get(day) ?? []), article.slug]);
    }
    for (const [day, slugs] of perDay) assert.ok(slugs.length <= 2, `${market}: ${slugs.length} Beiträge am ${day}`);
  }
});

test("Schweizer Beiträge in Schweizer Rechtschreibung, österreichische mit Eszett erlaubt", () => {
  for (const article of marketArticles("ch")) {
    const text = JSON.stringify(article);
    assert.ok(!text.includes("ß"), `ch/${article.slug}: Eszett in der Schweizer Fassung`);
  }
});

test("kein Satz steht in zwei Beiträgen", () => {
  const seen = new Map();
  for (const market of MARKETS) {
    for (const article of marketArticles(market)) {
      const text = articleHtml(article).replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");
      for (const sentence of text.split(/(?<=[.!?])\s+/)) {
        const key = sentence.trim();
        if (key.length < 70) continue;
        const where = `${market}/${article.slug}`;
        assert.ok(!seen.has(key) || seen.get(key) === where, `Satz doppelt in ${seen.get(key)} und ${where}: ${key.slice(0, 70)}…`);
        seen.set(key, where);
      }
    }
  }
});

test("Magazinseiten: Hub und Beiträge liegen unter /magazin/", () => {
  for (const market of MARKETS) {
    const pages = marketMagazinePages(market);
    const hub = marketMagazineHub(market);
    assert.equal(pages[0].path, "/magazin/");
    assert.equal(hub.family, "magazine-hub");
    assert.ok(hub.description.length >= 110 && hub.description.length <= 180, `${market}: Hub-Description ${hub.description.length}`);
    assert.equal(pages.length, marketArticles(market).length + 1);
    for (const page of pages.slice(1)) {
      assert.equal(page.family, "magazine");
      assert.match(page.path, /^\/magazin\/[a-z0-9-]+\/$/);
      assert.equal(page.canonical, `https://akademikersingles.${market}${page.path}`);
      assert.deepEqual(page.categories, []);
      assert.ok(page.faq.length >= 6, `${page.path}: FAQ fehlt in der Seite`);
      assert.ok(page.published && page.modified, `${page.path}: Zeitstempel fehlen`);
    }
    // Neueste zuerst
    const dates = pages.slice(1).map((page) => page.published);
    assert.deepEqual(dates, [...dates].sort().reverse(), `${market}: Beiträge nicht nach Datum sortiert`);
  }
});

test("REST-Knoten liefert je Land die eigenen Beiträge", () => {
  const deIds = new Set();
  for (const market of MARKETS) {
    const source = buildMarketMagazineSource(market);
    assert.equal(source.posts.length, marketArticles(market).length);
    for (const post of source.posts) {
      assert.equal(post.link, `https://akademikersingles.${market}/magazin/${post.slug}/`);
      assert.ok(post.content.includes(`https://akademikersingles.${market}/partnersuche/`) || post.content.includes(`https://akademikersingles.${market}/magazin/`), `${market}/${post.slug}: interne Links nicht auf die Landesdomain`);
      assert.ok(!/href="\//.test(post.content), `${market}/${post.slug}: relativer Link im REST-Inhalt`);
      assert.ok(!deIds.has(post.id), `ID ${post.id} doppelt über die Märkte`);
      deIds.add(post.id);
      assert.ok(post.dateGmt < post.date, `${market}/${post.slug}: GMT nicht vor Ortszeit`);
      assert.equal(post.categories.length, 0);
    }
    assert.deepEqual(source.categories, []);
  }
});
