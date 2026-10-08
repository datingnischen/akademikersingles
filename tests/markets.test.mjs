import assert from "node:assert/strict";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import test from "node:test";

import { hostMarket, localizePath, publicUrl, resolveRequest, stripMarketPrefix } from "../lib/markets.ts";

const root = new URL("../", import.meta.url);
const source = path => readFileSync(new URL(path, root), "utf8");
const rewrite = pathname => ({ action: "rewrite", pathname });
const next = { action: "next" };

test("Marktpräfix: /de liefert den DE-Inhalt, /at und /ch bleiben bei ihren Routen", () => {
  assert.deepEqual(resolveRequest("/de/", false), rewrite("/"));
  assert.deepEqual(resolveRequest("/de", false), rewrite("/"));
  assert.deepEqual(resolveRequest("/de/partnersuche/", false), rewrite("/partnersuche/"));
  assert.deepEqual(resolveRequest("/de/magazin/ist-status-sexy", false), rewrite("/magazin/ist-status-sexy/"));
  assert.deepEqual(resolveRequest("/at/partnersuche/", false), next);
  assert.deepEqual(resolveRequest("/ch/partnersuche", false), rewrite("/ch/partnersuche/"));
  assert.deepEqual(resolveRequest("/at", false), rewrite("/at/"));
});

test("Unpräfixierte Pfade (Live-Domain .de über nginx) verhalten sich wie vorher", () => {
  assert.deepEqual(resolveRequest("/partnersuche/", false), next);
  assert.deepEqual(resolveRequest("/partnersuche", false), rewrite("/partnersuche/"));
  assert.deepEqual(resolveRequest("/magazin", false, "akademikersingles.de"), rewrite("/magazin/"));
  assert.deepEqual(resolveRequest("/", false, "akademikersingles.vercel.app"), next);
  assert.deepEqual(resolveRequest("/robots.txt", false), next);
  assert.deepEqual(resolveRequest("/sitemap.xml", false, "akademikersingles.de"), next);
});

test("WordPress-REST für ICONY: unpräfixiert unverändert und ohne Slash-Umleitung, mit Präfix auf denselben Endpunkt", () => {
  for (const host of ["", "akademikersingles.de", "akademikersingles.at"]) {
    assert.deepEqual(resolveRequest("/magazin/wp-json/wp/v2/posts", false, host), next);
    assert.deepEqual(resolveRequest("/magazin/wp-json", false, host), next);
    assert.deepEqual(resolveRequest("/magazin", true, host), next);
    assert.deepEqual(resolveRequest("/magazin/", true, host), next);
  }
  for (const prefix of ["de", "at", "ch"]) {
    assert.deepEqual(resolveRequest(`/${prefix}/magazin/wp-json/wp/v2/posts`, false), rewrite("/magazin/wp-json/wp/v2/posts"));
    assert.deepEqual(resolveRequest(`/${prefix}/magazin/`, true), rewrite("/magazin/index.php"));
    assert.deepEqual(resolveRequest(`/${prefix}/magazin/index.php`, true), rewrite("/magazin/index.php"));
  }
});

test("Marktdomains akademikersingles.at/.ch schreiben intern auf /at bzw. /ch", () => {
  assert.equal(hostMarket("akademikersingles.at"), "at");
  assert.equal(hostMarket("www.akademikersingles.ch:443"), "ch");
  assert.equal(hostMarket("akademikersingles.de"), null);
  assert.equal(hostMarket("akademikersingles.vercel.app"), null);
  assert.deepEqual(resolveRequest("/partnersuche/wien/", false, "akademikersingles.at"), rewrite("/at/partnersuche/wien/"));
  assert.deepEqual(resolveRequest("/partnersuche/wien", false, "akademikersingles.at"), rewrite("/at/partnersuche/wien/"));
  assert.deepEqual(resolveRequest("/", false, "akademikersingles.ch"), rewrite("/ch/"));
  assert.deepEqual(resolveRequest("/at/partnersuche/", false, "akademikersingles.at"), next);
  assert.deepEqual(resolveRequest("/robots.txt", false, "akademikersingles.at"), rewrite("/at/robots.txt"));
  assert.deepEqual(resolveRequest("/sitemap.xml", false, "akademikersingles.ch"), rewrite("/ch/sitemap.xml"));
  assert.deepEqual(resolveRequest("/at/sitemap.xml", false), next);
});

test("Links auf den Marktseiten bekommen das Präfix, ICONY-Pfade und DE bleiben unberührt", () => {
  assert.equal(localizePath("/partnersuche/", "at"), "/at/partnersuche/");
  assert.equal(localizePath("/magazin/category/status-luxus/", "ch"), "/ch/magazin/category/status-luxus/");
  assert.equal(localizePath("/ueber-uns/#gruender", "at"), "/at/ueber-uns/#gruender");
  assert.equal(localizePath("/faq/#sicherheit", "ch"), "/ch/faq/#sicherheit");
  assert.equal(localizePath("/", "at"), "/at/");
  assert.equal(localizePath("/partnersuche/", "de"), "/partnersuche/");
  assert.equal(localizePath("/registration/", "at"), "/registration/");
  assert.equal(localizePath("https://akademikersingles.de/registration/", "at"), "https://akademikersingles.de/registration/");
  assert.equal(localizePath("//evil.example/partnersuche/", "at"), "//evil.example/partnersuche/");
  assert.deepEqual(stripMarketPrefix("/at/faq/"), { market: "at", path: "/faq/" });
  assert.deepEqual(stripMarketPrefix("/atlas/"), { market: null, path: "/atlas/" });
  assert.equal(publicUrl("ch", "/partnersuche/zuerich/"), "https://akademikersingles.ch/partnersuche/zuerich/");
});

test("proxy.ts: Marktlogik zentral, REST-/Slash-Sonderfall dokumentiert, Matcher lässt Seitenrouten und robots/sitemap durch", () => {
  const proxy = source("proxy.ts");
  assert.match(proxy, /resolveRequest\(/);
  assert.match(proxy, /x-forwarded-host/);
  assert.match(proxy, /skipTrailingSlashRedirect/);
  assert.ok(proxy.includes('"/robots.txt", "/sitemap.xml"'));
  assert.ok(proxy.includes("_next/|app-assets/|api/|"));
  // Zwei Backslashes im Quelltext (String-Escape für den Punkt); mit einem hätte der Matcher alle Pfade ausgeschlossen.
  assert.ok(proxy.includes("|.*\\\\..*).*)"), "Matcher-Punkt muss im Quelltext doppelt escaped sein");
  const config = source("next.config.ts");
  assert.match(config, /skipTrailingSlashRedirect: true/);
  assert.match(config, /rest_route/);
});

test("Marktrouten: Canonical der Magazin-/Über-uns-Seiten bleibt die DE-Seite, Städte kanonisch auf der Landesdomain", () => {
  const route = source("components/market-route.tsx");
  assert.match(route, /getMarketPage\(market, normalizeContentPath\(slug\)\)/);
  assert.match(route, /setRequestMarket\(market\)/);
  const view = source("components/page-view.tsx");
  assert.match(view, /canonical: page\.canonical, \.\.\.hreflang\(page\)/);
  assert.match(view, /MARKET_DOMAINS_LIVE/);
  assert.match(source("lib/markets.ts"), /MARKET_DOMAINS_LIVE = false/);
  assert.match(source("lib/market-cities.ts"), /canonical: publicUrl\(market, profile\.path\)/);
  for (const market of ["at", "ch"]) {
    for (const file of [`app/${market}/[[...slug]]/page.tsx`, `app/${market}/ueber-uns/suche/page.tsx`, `app/${market}/robots.txt/route.ts`, `app/${market}/sitemap.xml/route.ts`]) {
      assert.ok(existsSync(new URL(file, root)), `${file} fehlt`);
    }
  }
});

for (const [market, country, expected] of [["at", "Österreich", ["wien", "graz", "salzburg", "innsbruck", "linz"]], ["ch", "Schweiz", ["zuerich", "bern", "basel", "lausanne", "st-gallen"]]]) {
  test(`${country}: Stadtdossiers mit belegten Quellen`, () => {
    const dir = new URL(`data/city-profiles/${market}/`, root);
    const files = readdirSync(dir).filter(file => file.endsWith(".json"));
    assert.ok(files.length >= 4, `mindestens vier Städte in ${market}`);
    for (const file of files) {
      const slug = file.replace(/\.json$/, "");
      assert.ok(expected.includes(slug), `${file} ist keine vorgesehene Stadt`);
      const profile = JSON.parse(readFileSync(new URL(file, dir), "utf8"));
      assert.equal(profile.path, `/partnersuche/${slug}/`);
      assert.equal(profile.country, country);
      assert.ok(profile.name && profile.seoTitle && profile.seoDescription, `${file}: Name/SEO-Texte`);
      assert.ok(profile.seoTitle.length <= 60, `${file}: seoTitle zu lang`);
      assert.ok(profile.seoDescription.length >= 110 && profile.seoDescription.length <= 155, `${file}: seoDescription ${profile.seoDescription.length} Zeichen`);
      const ids = new Set(profile.sources.map(entry => entry.id));
      for (const entry of profile.sources) {
        assert.match(entry.url, /^https:\/\//, `${file} ${entry.id}`);
        assert.ok(entry.publisher && entry.title && entry.stand, `${file} ${entry.id}: Herausgeber/Titel/Stand`);
      }
      const metrics = [...profile.briefing, ...profile.kpis, ...profile.dossier.flatMap(chapter => chapter.metrics)];
      const used = new Set([...metrics.flatMap(metric => [metric.source, metric.compareSource].filter(Boolean)), ...(profile.clusterSources ?? [])]);
      for (const id of used) assert.ok(ids.has(id), `${file}: Quelle ${id} fehlt`);
      for (const id of ids) assert.ok(used.has(id), `${file}: Quelle ${id} wird nicht verwendet`);
      assert.equal(profile.briefing.length, 3, file);
      assert.ok(profile.kpis.length >= 3 && profile.kpis.length <= 4, file);
      assert.deepEqual(profile.dossier.map(chapter => chapter.key), ["bildung", "beruf", "singles"], file);
      for (const chapter of profile.dossier) assert.ok(chapter.metrics.length >= 2, `${file}: ${chapter.key} braucht mindestens zwei Kennzahlen`);
      const { west, east, south, north } = profile.map.bounds;
      for (const place of profile.places) assert.ok(place.lat > south && place.lat < north && place.lon > west && place.lon < east, `${file}: ${place.name} außerhalb der Karte`);
      assert.ok(profile.map.rivers.length + profile.map.areas.length > 0, `${file}: Karte ohne Geometrie (scripts/build_city_map.py)`);
      assert.equal(profile.faq.length, 4, file);
      const text = JSON.stringify(profile);
      assert.doesNotMatch(text, /garantiert|Garantie/i, `${file}: Werbeversprechen`);
      assert.doesNotMatch(text, /lebensfreunde/i, `${file}: fremde Marke`);
      if (market === "ch") assert.doesNotMatch(text.replace(/https?:\/\/[^"\s]+/g, ""), /ß/, `${file}: Schweizer Schreibung ohne ß`);
    }
  });
}

test("Marktseiten: keine rohen Bilder ohne Alt-Text, ICONY-Links nie über den Vercel-Host", () => {
  for (const file of ["components/market-link.tsx", "components/market-route.tsx", "components/page-view.tsx", "lib/market-cities.ts", "lib/market-seo.ts"]) {
    const text = source(file);
    assert.doesNotMatch(text, /<img\b/i, `${file}: Bilder über next/image mit Alt-Text`);
    assert.doesNotMatch(text, /akademikersingles\.vercel\.app/, `${file}: ICONY-Seiten nie über den Vercel-Host`);
  }
  assert.doesNotMatch(source("components/city-dossier.tsx"), /alt=""/);
});
