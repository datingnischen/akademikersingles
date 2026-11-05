import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import test from "node:test";

import { seoDescription, seoTitle, TITLE_SUFFIX } from "../lib/seo-meta.ts";

// Regel 2026-11-04 (Christian: „Brauche individuell passende Titel“): jede Stadtseite hat einen eigenen <title>
// mit Suchabsicht, Stadt und einem belegten Aspekt – keine Schablone, in der nur der Stadtname wechselt.
const root = new URL("../", import.meta.url);
const json = path => JSON.parse(readFileSync(new URL(path, root), "utf8"));
const seo = json("data/partnersuche-seo.json");
const { pages } = json("data/public-pages.json");

const slugOf = path => path.split("/").filter(Boolean).pop();
const deSlugs = new Set([
  ...pages.filter(page => page.family === "location").map(page => slugOf(page.path)),
  ...readdirSync(new URL("data/city-profiles/", root)).filter(file => file.endsWith(".json")).map(file => file.replace(/\.json$/, "")),
]);
const name = slug => {
  const imported = pages.find(page => page.family === "location" && slugOf(page.path) === slug);
  return (imported?.locationName ?? (slug === "kassel" ? "Kassel" : slug)).replace(/ (am Main|im Breisgau)$/, "");
};

const cities = [
  ...[...deSlugs].map(slug => ({ id: `de/${slug}`, city: name(slug), metaTitle: seo[slug]?.metaTitle, description: seo[slug]?.description })),
  ...["at", "ch"].flatMap(market => readdirSync(new URL(`data/city-profiles/${market}/`, root)).map(file => {
    const profile = json(`data/city-profiles/${market}/${file}`);
    return { id: `${market}/${file.replace(/\.json$/, "")}`, city: profile.name, metaTitle: profile.seoTitle, description: profile.seoDescription };
  })),
];

test("jede Stadtseite hat einen individuellen <title> (max. 60 Zeichen, mit Stadt, ohne Dublette)", () => {
  assert.ok(cities.length >= 26, `nur ${cities.length} Städte gefunden`);
  const rendered = new Set();
  for (const city of cities) {
    assert.ok(city.metaTitle, `${city.id}: Titel fehlt (data/partnersuche-seo.json bzw. seoTitle im Dossier)`);
    const title = seoTitle({ path: `/partnersuche/${city.id}/`, title: "", metaTitle: city.metaTitle });
    assert.ok(title.length <= 60, `${city.id}: <title> hat ${title.length} Zeichen`);
    assert.ok(title.includes(city.city), `${city.id}: Stadt „${city.city}“ fehlt im Titel`);
    assert.doesNotMatch(city.metaTitle, /^Partnersuche (für Akademiker )?in [^:]+$/, `${city.id}: Schablonen-Titel`);
    assert.ok(!rendered.has(title), `${city.id}: Titel doppelt`);
    rendered.add(title);
  }
  // Schablone erkennen: ersetzt man den Stadtnamen, dürfen nicht mehrere Titel gleich lauten.
  const shapes = cities.map(city => city.metaTitle.replace(city.city, "<Stadt>"));
  assert.equal(new Set(shapes).size, shapes.length, "zwei Titel unterscheiden sich nur im Stadtnamen");
  assert.ok(!cities.some(city => city.metaTitle.endsWith(TITLE_SUFFIX.trim())), "Suffix gehört nicht in den gepflegten Titel");
});

test("jede Stadtseite hat eine eigene Description (110–150 Zeichen, ungekürzt)", () => {
  const seen = new Set();
  for (const city of cities) {
    assert.ok(city.description, `${city.id}: Description fehlt`);
    assert.ok(city.description.length >= 110 && city.description.length <= 150, `${city.id}: Description ${city.description.length} Zeichen`);
    assert.equal(seoDescription({ path: "/x/", description: city.description, family: "location", categories: [] }), city.description, `${city.id}: Description wird gekürzt`);
    assert.doesNotMatch(city.description, /…|\.\.\./);
    assert.ok(!seen.has(city.description), `${city.id}: Description doppelt`);
    seen.add(city.description);
  }
});
