import assert from "node:assert/strict";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import test from "node:test";

import { getLiveMarketDomains, hostMarket, isMarketDomainLive, localizePath, parseLiveMarkets, platformOrigin, publicUrl, resolveRequest, stripMarketPrefix } from "../lib/markets.ts";
import { legacyUrl, marketUrl, registrationUrl } from "../lib/site.ts";

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
    if (prefix === "de") assert.deepEqual(resolveRequest("/de/magazin/sitemap.xml", false), rewrite("/magazin/sitemap.xml"));
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
  assert.deepEqual(resolveRequest("/partnersuche/sitemap.xml", false, "akademikersingles.at"), rewrite("/at/sitemap.xml"));
  assert.deepEqual(resolveRequest("/ch/partnersuche/sitemap.xml", false), rewrite("/ch/sitemap.xml"));
  assert.deepEqual(resolveRequest("/partnersuche/sitemap.xml", false, "akademikersingles.de"), next);
  assert.ok(source("proxy.ts").includes('"/partnersuche/sitemap.xml", "/(at|ch)/partnersuche/sitemap.xml"'));
  assert.match(source("lib/market-seo.ts"), /\/partnersuche\/sitemap\.xml/);
});

test("Links auf den Marktseiten bekommen das Präfix, ICONY-Pfade und DE bleiben unberührt", () => {
  assert.equal(localizePath("/partnersuche/", "at"), "/at/partnersuche/");
  assert.equal(localizePath("/magazin/thema/status-luxus/", "ch"), "/ch/magazin/thema/status-luxus/");
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
  assert.match(view, /LIVE_MARKETS\.length/);
  assert.match(view, /isMarketDomainLive\(code\)/);
  assert.match(source("lib/markets.ts"), /process\.env\.NEXT_PUBLIC_LIVE_MARKET_DOMAINS/);
  assert.match(source("lib/market-cities.ts"), /canonical: publicUrl\(market, profile\.path\)/);
  for (const market of ["at", "ch"]) {
    for (const file of [`app/${market}/[[...slug]]/page.tsx`, `app/${market}/ueber-uns/suche/page.tsx`, `app/${market}/robots.txt/route.ts`, `app/${market}/sitemap.xml/route.ts`]) {
      assert.ok(existsSync(new URL(file, root)), `${file} fehlt`);
    }
  }
});

for (const [market, country, expected] of [["at", "Österreich", ["wien", "graz", "salzburg", "innsbruck", "linz", "klagenfurt", "krems", "leoben"]], ["ch", "Schweiz", ["zuerich", "bern", "basel", "lausanne", "st-gallen", "genf", "luzern"]]]) {
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
      assert.match(profile.heroAlt ?? "", /^Aquarellzeichnung von /, `${file}: Alt-Text für das Codex-Titelbild`);
      assert.ok(profile.seoTitle.length <= 60, `${file}: seoTitle zu lang`);
      assert.ok(profile.seoDescription.length >= 110 && profile.seoDescription.length <= 155, `${file}: seoDescription ${profile.seoDescription.length} Zeichen`);
      const ids = new Set(profile.sources.map(entry => entry.id));
      for (const entry of profile.sources) {
        assert.match(entry.url, /^https:\/\//, `${file} ${entry.id}`);
        assert.ok(entry.publisher && entry.title && entry.stand, `${file} ${entry.id}: Herausgeber/Titel/Stand`);
      }
      const metrics = [...profile.briefing, ...profile.kpis, ...profile.dossier.flatMap(chapter => chapter.metrics)];
      const used = new Set([
        ...metrics.flatMap(metric => [metric.source, metric.compareSource].filter(Boolean)),
        ...(profile.clusterSources ?? []),
        ...(profile.quarterSources ?? []),
        ...(profile.universities ?? []).flatMap(item => [item.source, item.compareSource].filter(Boolean)),
        ...(profile.quarters ?? []).map(item => item.source).filter(Boolean),
      ]);
      for (const id of used) assert.ok(ids.has(id), `${file}: Quelle ${id} fehlt`);
      for (const id of ids) assert.ok(used.has(id), `${file}: Quelle ${id} wird nicht verwendet`);
      assert.equal(profile.briefing.length, 3, file);
      assert.ok(profile.kpis.length >= 3 && profile.kpis.length <= 4, file);
      // Dossier: Bildung zuerst, Single-Leben zuletzt; dazwischen sind Beruf und optionale Kapitel erlaubt.
      const keys = profile.dossier.map(chapter => chapter.key);
      assert.ok(keys.length >= 3 && keys.length <= 5, `${file}: ${keys.length} Dossier-Kapitel`);
      assert.equal(keys[0], "bildung", file);
      assert.equal(keys[keys.length - 1], "singles", file);
      assert.ok(keys.includes("beruf"), file);
      for (const key of keys) assert.ok(["bildung", "beruf", "forschung", "einkommen", "wohnen", "singles"].includes(key), `${file}: unbekanntes Kapitel ${key}`);
      assert.equal(new Set(keys).size, keys.length, `${file}: Kapitel doppelt`);
      for (const chapter of profile.dossier) assert.ok(chapter.metrics.length >= 2, `${file}: ${chapter.key} braucht mindestens zwei Kennzahlen`);
      const { west, east, south, north } = profile.map.bounds;
      for (const place of profile.places) assert.ok(place.lat > south && place.lat < north && place.lon > west && place.lon < east, `${file}: ${place.name} außerhalb der Karte`);
      assert.ok(profile.map.rivers.length + profile.map.areas.length > 0, `${file}: Karte ohne Geometrie (scripts/build_city_map.py)`);
      assert.ok(profile.faq.length >= 6, `${file}: nur ${profile.faq.length} FAQ-Einträge (Standard ab 20.11.2026: mindestens 6)`);
      // Ausbaustand der AT/CH-Dossiers (20.11.2026): Hochschulen, Quartiere, Termine, Gesprächsstoff, eigener Stadt-Guide.
      assert.ok((profile.universities ?? []).length >= 3, `${file}: mindestens drei Hochschulporträts`);
      for (const item of profile.universities) assert.ok(item.name && item.kind && item.text && item.source, `${file}: Hochschule unvollständig (${item.name})`);
      assert.ok((profile.quarters ?? []).length >= 4, `${file}: mindestens vier Quartiere`);
      for (const quarter of profile.quarters) assert.ok(quarter.name && quarter.label && quarter.text.length > 80, `${file}: Quartier unvollständig (${quarter.name})`);
      assert.ok((profile.agenda ?? []).length >= 3, `${file}: mindestens drei Termine`);
      for (const item of profile.agenda) assert.ok(item.title && item.when && item.text.length > 80, `${file}: Termin unvollständig (${item.title})`);
      assert.ok((profile.talkingPoints ?? []).length >= 3, `${file}: mindestens drei Gesprächsthemen`);
      assert.ok((profile.guide ?? []).length >= 4, `${file}: eigener Stadt-Guide mit mindestens vier Kapiteln`);
      for (const chapter of profile.guide) {
        assert.ok(chapter.title && chapter.html.length > 600, `${file}: Guide-Kapitel zu dünn (${chapter.title})`);
        assert.match(chapter.html, /^<p>/, `${file}: Guide-Kapitel ohne Absatz (${chapter.title})`);
      }
      assert.equal(new Set(profile.guide.map(chapter => chapter.title)).size, profile.guide.length, `${file}: Guide-Titel doppelt`);
      assert.equal((profile.hubFacts ?? []).length, 4, `${file}: vier Vergleichswerte für die Städteübersicht`);
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

test("Landesdomains live (NEXT_PUBLIC_LIVE_MARKET_DOMAINS): Links absolut auf .at/.ch, ICONY-Seiten auf die Landesplattform", () => {
  assert.deepEqual(parseLiveMarkets(""), []);
  assert.deepEqual(parseLiveMarkets(" AT, ch ,de,xx"), ["at", "ch"]);
  assert.equal(isMarketDomainLive("de", []), true);
  assert.equal(isMarketDomainLive("at", []), false);
  assert.equal(isMarketDomainLive("at", ["at"]), true);
  // Vorschau ohne Landesdomain: Präfix wie bisher, ICONY auf .de.
  assert.equal(localizePath("/partnersuche/wien/", "at", []), "/at/partnersuche/wien/");
  assert.equal(platformOrigin("at", []), "https://akademikersingles.de");
  // Landesdomain live: nginx reicht dort nur Seitenwurzeln ohne Präfix weiter, deshalb absolut.
  assert.equal(localizePath("/partnersuche/wien/", "at", ["at"]), "https://akademikersingles.at/partnersuche/wien/");
  assert.equal(localizePath("/", "ch", ["ch"]), "https://akademikersingles.ch/");
  assert.equal(localizePath("/faq/#sicherheit", "ch", ["ch"]), "https://akademikersingles.ch/faq/#sicherheit");
  assert.equal(localizePath("/partnersuche/zuerich/", "ch", ["at"]), "/ch/partnersuche/zuerich/");
  assert.equal(localizePath("/registration/", "at", ["at"]), "/registration/");
  assert.equal(localizePath("/partnersuche/", "de", ["at", "ch"]), "/partnersuche/");
  assert.equal(platformOrigin("at", ["at"]), "https://akademikersingles.at");
  assert.equal(platformOrigin("de", ["at", "ch"]), "https://akademikersingles.de");
});

test("Direkte Landesdomains veröffentlichen redaktionelle Links ohne eigene ICONY-Plattform", () => {
  const domains = getLiveMarketDomains(["ch"], ["at", "ch"]);
  assert.deepEqual(domains, ["ch", "at"]);
  assert.equal(localizePath("/magazin/", "at", domains), "https://akademikersingles.at/magazin/");
  assert.equal(platformOrigin("at", ["ch"]), "https://akademikersingles.de");
  assert.deepEqual(resolveRequest("/at/magazin", false, "akademikersingles.at", ["at", "ch"]), {
    action: "redirect", url: "https://akademikersingles.at/magazin/",
  });
  assert.deepEqual(resolveRequest("/ch/magazin/", false, "akademikersingles.at", ["at", "ch"]), {
    action: "redirect", url: "https://akademikersingles.ch/magazin/",
  });
  assert.deepEqual(resolveRequest("/at/magazin/", false, "akademikersingles.vercel.app", ["at", "ch"]), next);
  assert.deepEqual(resolveRequest("/at/magazin/", false, "akademikersingles.at", []), next);
});

test("ICONY-Links je Markt: ohne live geschaltete Landesdomain (Standard) bleiben sie auf .de", () => {
  assert.equal(registrationUrl("location", "at"), "https://akademikersingles.de/registration/?AID=location");
  assert.equal(legacyUrl("/impressum.html", "ch"), "https://akademikersingles.de/impressum.html");
  assert.equal(marketUrl("https://akademikersingles.de/partnersuche/", "at"), "/at/partnersuche/");
  assert.equal(marketUrl("https://www.akademikersingles.de/agb.html", "ch"), "https://akademikersingles.de/agb.html");
  assert.equal(marketUrl("https://akademikersingles.de/magazin/", "de"), "https://akademikersingles.de/magazin/");
  assert.equal(marketUrl("https://example.org/x", "at"), "https://example.org/x");
  for (const file of ["components/site-shell.tsx", "components/company.tsx", "components/home.tsx", "components/ui.tsx", "components/city-dossier.tsx"]) {
    assert.doesNotMatch(source(file), /TRUST_LINKS|FEATURE_LINKS|LEGAL_LINKS|LOGIN_URL/, `${file}: Linklisten müssen je Render (Markt) gebaut werden`);
    assert.doesNotMatch(source(file), /^const [A-Z_]+ = \[[^\]]*legacyUrl\(/ms, `${file}: legacyUrl nicht in Modulkonstanten`);
  }
});

test("Logo je Markt: AT/CH mit eigener Domainendung", () => {
  const shell = source("components/site-shell.tsx");
  assert.match(shell, /logo-\$\{market\}\.svg/);
  assert.match(shell, /logo-light-\$\{market\}\.svg/);
  assert.match(shell, /alt: `AkademikerSingles\.\$\{market\}`/);
  for (const market of ["at", "ch"]) {
    for (const name of ["logo", "logo-light"]) {
      const svg = source(`public/brand/${name}-${market}.svg`);
      assert.match(svg, /viewBox="0 0 2347\.321 303\.134"/, `${name}-${market}.svg`);
      assert.equal((svg.match(/<path\b/g) ?? []).length, 10, `${name}-${market}.svg: mit Landesendung`);
    }
  }
});


// Unique-Prüfung über alle AT/CH-Dossiers: kein Satz aus Guide, Quartieren, Terminen, Gesprächsstoff oder
// Hochschulporträts darf wortgleich in zwei Städten stehen (Regel „Content muss unique sein“, 20.11.2026).
test("AT/CH: Stadttexte sind je Stadt einzigartig und die Vergleichswerte einheitlich", () => {
  const seen = new Map();
  const labels = {};
  let sentences = 0;
  for (const market of ["at", "ch"]) {
    const dir = new URL(`data/city-profiles/${market}/`, root);
    for (const file of readdirSync(dir).filter(name => name.endsWith(".json"))) {
      const profile = JSON.parse(readFileSync(new URL(file, dir), "utf8"));
      const key = `${market}/${file}`;
      const names = (profile.hubFacts ?? []).map(fact => fact.label).join(" | ");
      labels[market] ??= names;
      assert.equal(names, labels[market], `${key}: andere Vergleichswerte als die übrigen ${market.toUpperCase()}-Städte`);
      const text = [
        ...(profile.guide ?? []).map(chapter => chapter.html),
        ...(profile.quarters ?? []).map(quarter => quarter.text),
        ...(profile.talkingPoints ?? []).map(point => point.text),
        ...(profile.agenda ?? []).map(item => item.text),
        ...(profile.universities ?? []).map(item => item.text),
      ].join(" ").replace(/<[^>]+>/g, " ");
      for (const sentence of text.split(/(?<=[.!?])\s+(?=[A-ZÄÖÜ])/)) {
        const normalized = sentence.trim().replace(/\s+/g, " ");
        if (normalized.length < 70) continue;
        sentences++;
        const other = seen.get(normalized);
        assert.ok(!other || other === key, `${key}: Satz steht wortgleich in ${other} – „${normalized.slice(0, 70)}…“`);
        seen.set(normalized, key);
      }
    }
  }
  assert.ok(sentences > 500, `nur ${sentences} geprüfte Sätze`);
});
