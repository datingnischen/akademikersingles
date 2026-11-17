import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { citySearchUrl, searchUrl } from "../lib/site.ts";
import { setRequestMarket } from "../lib/market-context.ts";

const sources = await Promise.all(
  ["components/city-dossier.tsx", "components/templates.tsx"].map(async (file) => [
    file,
    await readFile(new URL(`../${file}`, import.meta.url), "utf8"),
  ]),
);

// Christian, 18.11.2026: Die PLZ muss immer mit in die Suche, sonst startet die Stadtkarte ohne Umkreis.
test("die Stadtkarte verlinkt die Suche mit der PLZ der Stadt", () => {
  for (const [file, source] of sources) {
    assert.match(source, /href=\{citySearchUrl\(page\.cityWidget\.postcode\)\}/, file);
  }
});

test("citySearchUrl hängt die PLZ an, sonst bleibt die offene Suche", () => {
  setRequestMarket("de");
  assert.equal(citySearchUrl("34117"), "https://akademikersingles.de/suche/?plz=34117&AID=location");
  assert.equal(citySearchUrl("1010"), searchUrl("location"));
  assert.equal(citySearchUrl(""), searchUrl("location"));
  assert.equal(citySearchUrl(null), searchUrl("location"));
});
