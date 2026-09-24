import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const read = path => readFile(new URL(`../${path}`, import.meta.url), "utf8");
const { pages } = JSON.parse(await read("data/public-pages.json"));
const { categories } = JSON.parse(await read("data/magazine-categories.json"));
const provenance = JSON.parse(await read("data/asset-provenance.json"));
const ownership = JSON.parse(await read("data/route-ownership.json"));
const paths = new Set(pages.map(page => page.path));

test("übernimmt die komplette öffentliche URL-Struktur der Live-Seite", () => {
  for (const path of ["/", "/partnersuche/", "/magazin/", "/magazin/author/redaktion/", "/partnervermittlung/", "/universitaeten/", "/ueber-50/", "/einkommen/", "/social-media/"]) {
    assert.ok(paths.has(path), `${path} fehlt`);
  }
  assert.equal(pages.filter(page => page.family === "location").length, 15);
  assert.ok(pages.filter(page => page.family === "magazine").length >= 39);
  for (const category of categories) assert.ok(paths.has(`/magazin/category/${category.slug}/`), `Kategorie ${category.slug} fehlt`);
  for (const page of pages) {
    assert.match(page.path, /^\/(?:[a-z0-9-]+\/)*$/, `${page.path} ist keine saubere Pfadstruktur`);
    assert.equal(page.canonical, `https://akademikersingles.de${page.path}`);
  }
});

test("enthält die fünf Leitkategorien des Magazins", () => {
  const slugs = categories.map(category => category.slug);
  for (const slug of ["erfolg-anziehung", "unternehmer-selbststaendige-daten-anders", "intellektuelle-anziehung-tiefgang", "status-luxus", "beziehung-auf-augenhoehe"]) {
    assert.ok(slugs.includes(slug), `${slug} fehlt`);
  }
});

test("ICONY-Plattform und Rechtliches bleiben auf der Live-Domain", async () => {
  const skipped = ownership.notMigrated.map(item => item.path);
  for (const path of ["/registration/", "/login/", "/impressum.html/", "/datenschutz.html/", "/redaktionelle-kontrolle.html/", "/unsere-erfolgsgeschichten.html/"]) {
    assert.ok(skipped.includes(path), `${path} darf nicht migriert werden`);
  }
  const site = await read("lib/site.ts");
  assert.match(site, /export const ORIGIN = `https:\/\/\$\{DOMAIN\}`/);
  for (const file of ["components/site-shell.tsx", "components/home.tsx", "components/templates.tsx", "components/ui.tsx"]) {
    assert.doesNotMatch(await read(file), /href="\/(?:registration|login|hilfe|impressum|datenschutz|agb|redaktionelle-kontrolle|sicherheit-und-datenschutz|unsere-erfolgsgeschichten)/, `${file} verlinkt ICONY relativ`);
  }
});

test("Snapshot enthält weder ausführbares Markup noch Mitgliederbilder", () => {
  const html = pages.map(page => page.contentHtml).join("\n");
  assert.doesNotMatch(html, /<(?:script|iframe|form|input|button|select|textarea|style)\b/i);
  assert.doesNotMatch(html, /\son[a-z]+\s*=/i);
  assert.doesNotMatch(html, /(?:href|src)=["']\s*(?:javascript|data|file):/i);
  assert.doesNotMatch(html, /cdn[123]\.icony-hosting\.de|\/user-media\//i);
});

test("alle referenzierten Grafiken liegen lokal mit Herkunftsnachweis vor", async () => {
  const known = new Set(provenance.map(asset => asset.localPath));
  const referenced = new Set();
  for (const page of pages) {
    if (page.heroImage) referenced.add(page.heroImage);
    for (const match of page.contentHtml.matchAll(/src="(\/imported\/[^"]+)"/g)) referenced.add(match[1]);
  }
  for (const path of referenced) {
    assert.ok(known.has(path), `${path} ohne Provenienz`);
    await access(new URL(`../public${path}`, import.meta.url));
  }
  for (const brand of ["logo.svg", "logo-light.svg", "hero-couple.jpg", "siegel-singleboersen-ueberblick.jpg", "feature-fotoflirt.png", "feature-fragenflirt.png", "feature-videodate-hand.png", "success-stories.jpg"]) {
    await access(new URL(`../public/brand/${brand}`, import.meta.url));
  }
});

test("jede Stadtseite hat Bild, Namen und ein valides ICONY-Widget", () => {
  for (const city of pages.filter(page => page.family === "location")) {
    assert.ok(city.heroImage, `${city.path} ohne Bild`);
    assert.ok(city.locationName, `${city.path} ohne Stadtname`);
    assert.match(city.cityWidget?.url ?? "", /^https:\/\/js\.icony\.com\/frame\/\?h=300&id=akademikersingles&pc=a7060c&z=\d{5}&ds=&ctr=49&it=1$/, `${city.path} Widget`);
  }
});

test("Siegel verlinkt auf den Testbericht von Singlebörsen-Überblick", async () => {
  const site = await read("lib/site.ts");
  assert.match(site, /https:\/\/singleboersen-ueberblick\.de\/partnersuche\/akademikersingles-de\//);
  assert.match(site, /siegel-singleboersen-ueberblick\.jpg/);
});

test("Registrierungslinks tragen die AID-Konvention", async () => {
  const content = await read("lib/content.ts");
  assert.match(content, /page\.family === "location" \|\| page\.family === "location-hub"\) return "location"/);
  assert.match(content, /page\.family\.startsWith\("magazine"\)\) return "magazin"/);
  const site = await read("lib/site.ts");
  assert.match(site, /registration\/\?AID=\$\{aid\}/);
});

test("interne Links auf migrierte Seiten sind relativ", () => {
  for (const page of pages) {
    for (const match of page.contentHtml.matchAll(/href="https:\/\/(?:www\.)?akademikersingles\.de(\/[^"?#]*)"/g)) {
      const path = match[1].endsWith("/") ? match[1] : `${match[1]}/`;
      assert.ok(!paths.has(path), `${page.path} verlinkt ${path} absolut`);
    }
  }
});

test("Über uns und FAQ existieren als eigene Seiten mit FAQPage-Daten", async () => {
  const authored = await read("lib/authored.ts");
  assert.match(authored, /"\/ueber-uns\/", "about"/);
  assert.match(authored, /"\/faq\/", "faq"/);
  const company = await read("components/company.tsx");
  assert.match(company, /"@type": "FAQPage"/);
  assert.match(company, /"@type": "AboutPage"/);
  const shell = await read("components/site-shell.tsx");
  assert.match(shell, /href="\/ueber-uns\/"/);
  assert.match(shell, /href="\/faq\/"/);
});

test("Bildquellen werden als kompakte Nachweise statt roher URLs dargestellt", async () => {
  const content = await read("lib/content.ts");
  assert.match(content, /const CREDIT_PARAGRAPH = /);
  assert.match(content, /withoutHero\.replace\(CREDIT_PARAGRAPH, ""\)/);
  const templates = await read("components/templates.tsx");
  assert.match(templates, /<ImageCredits credits=\{imageCredits\(page\)\} \/>/);
  const withCredits = pages.filter(page => /<p>\s*Bildquelle:/i.test(page.contentHtml));
  assert.ok(withCredits.some(page => page.path === "/partnersuche/"), "Hub-Bildquellen fehlen im Snapshot");
});

test("Über uns nennt Christian M. Haas als Gründer mit eigenem Porträt", async () => {
  const company = await read("components/company.tsx");
  assert.match(company, /name: "Christian M\. Haas"/);
  assert.match(company, /Gründer von AkademikerSingles\.de/);
  assert.match(company, /founder: \{ "@id": `\$\{page\.canonical\}#gruender` \}/);
  await access(new URL("../public/brand/christian-m-haas.jpg", import.meta.url));
});

test("Über uns hat Unterpunkte für Bewertungen und Social Media", async () => {
  const authored = await read("lib/authored.ts");
  assert.match(authored, /"\/ueber-uns\/bewertungen\/", "about-reviews"/);
  const company = await read("components/company.tsx");
  for (const href of ["/ueber-uns/", "/ueber-uns/#gruender", "/ueber-uns/bewertungen/", "/ueber-uns/social-media/", "/faq/"]) {
    assert.ok(company.includes(`href: "${href}"`), `Unterpunkt ${href} fehlt`);
  }
  assert.match(company, /singleboersen-vergleichen|REVIEW_SOURCES\.vergleichen/);
  assert.match(company, /REVIEW_SOURCES\.trustpilot\.url/);
  const config = await read("next.config.ts");
  assert.match(config, /source: "\/social-media\/", destination: "\/ueber-uns\/social-media\/"/);
  assert.match(await read("lib/content.ts"), /export const SOCIAL_PATH = "\/ueber-uns\/social-media\/"/);
  assert.match(await read("lib/site.ts"), /facebook\.com\/profile\.php\?id=61586656290136/);
  await access(new URL("../public/brand/siegel-singleboersen-vergleichen.png", import.meta.url));
});

test("Erfahrung wird einheitlich mit „seit 2008“ angegeben", async () => {
  for (const file of ["components/company.tsx", "components/home.tsx", "lib/authored.ts"]) {
    assert.doesNotMatch(await read(file), /20\+ Jahre|über 20 Jahre/i, file);
  }
});

test("Städteübersicht verweist auf die individuelle Suche der Live-Domain", async () => {
  const templates = await read("components/templates.tsx");
  const hub = templates.slice(templates.indexOf("export function LocationHubTemplate"), templates.indexOf("export function LocationTemplate"));
  assert.match(hub, /<CitySearchFallback \/>/, "Städteübersicht rendert den Suchhinweis nicht");
  const fallback = await read("components/city-search-fallback.tsx");
  assert.match(fallback, /href=\{searchUrl\("location"\)\}/);
  assert.doesNotMatch(fallback, /href="\/suche/);
  const site = await read("lib/site.ts");
  assert.match(site, /\$\{ORIGIN\}\/suche\/\?AID=\$\{aid\}/);
});
