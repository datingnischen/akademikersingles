import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { cardSource } from "../lib/card-text.ts";

const { pages } = JSON.parse(await readFile(new URL("../data/public-pages.json", import.meta.url), "utf8"));

test("Kartentexte der Magazinartikel ohne importierten Audio-Vorspann", () => {
  for (const page of pages.filter(item => item.family === "magazine")) {
    const text = cardSource(page.excerpt, page.description);
    assert.doesNotMatch(text, /^\s*Artikel (?:kurz )?anhören/i, `${page.path} beginnt mit dem Audio-Block`);
    assert.doesNotMatch(text, /Dein Browser unterstützt/i, `${page.path} enthält den Audio-Hinweis`);
    assert.ok(text.length >= 60, `${page.path} hat einen zu kurzen Kartentext`);
  }
});

test("Kartentext: Vorspann weg, Rest bleibt; zu kurzer Rest nimmt die Beschreibung", () => {
  const description = "Meta-Beschreibung des Artikels mit genug Länge für eine Karte im Magazin.";
  const long = "Gerade für Unternehmer ist das Thema Dating oft enger mit Lebensstil, Zeitbudget und";
  assert.equal(cardSource(`Artikel anhören Die wichtigsten Punkte verständlich zusammengefasst. ${long}`, description), long);
  assert.equal(cardSource("Artikel kurz anhören Die wichtigsten Punkte kurz und verständlich zusammengefasst. Dein Browser unterstützt das Audio-Element nicht. Zeit als knappstes Gut", description), description);
  assert.equal(cardSource(undefined, description), description);
  assert.equal(cardSource(long, description), long);
});
