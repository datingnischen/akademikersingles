import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import { handleWpRest } from "../lib/wp-rest-compat.ts";

// Zeitstempel erscheinen in JSON-LD, Sitemap und /magazin/wp-json. Sie dürfen nicht nach Automatik aussehen
// (Christian, 2026-11-13): keine runden Uhrzeiten, keine gemeinsamen Sekunden, keine Sammel-Aktualisierungen,
// höchstens zwei Beiträge je Erscheinungstag. Neue Artikel: unregelmäßige Uhrzeit (7–22 Uhr, Sekunde ≠ 0) und
// dieselben Werte in data/wp-posts.json (date/modified) und data/public-pages.json (published/modified).
const root = new URL("../", import.meta.url);
const source = (path) => readFileSync(new URL(path, root), "utf8");
const snapshot = JSON.parse(source("data/wp-posts.json")).posts;
const articles = JSON.parse(source("data/public-pages.json")).pages.filter((page) => page.family === "magazine" && page.published);
const rest = handleWpRest("/wp/v2/posts", new URLSearchParams("per_page=100")).body;

// Datumsgebundene Ausnahmen von „höchstens zwei Beiträge je Tag“ (slug → Grund). Derzeit keine.
const SAME_DAY_EXCEPTIONS = {};

const berlinOffsetHours = (local) => {
  const year = Number(local.slice(0, 4));
  const lastSunday = (month) => {
    const day = new Date(Date.UTC(year, month + 1, 0));
    day.setUTCDate(day.getUTCDate() - day.getUTCDay());
    return day.toISOString().slice(0, 10);
  };
  return local >= `${lastSunday(2)}T02:00:00` && local < `${lastSunday(9)}T03:00:00` ? 2 : 1;
};
const toGmt = (local) => new Date(Date.parse(`${local}Z`) - berlinOffsetHours(local) * 3_600_000).toISOString().slice(0, 19);
const isRound = (stamp) => /T\d\d:(00|30):00$/.test(stamp) || /T00:00:\d\d$/.test(stamp);
const nowBerlin = () => new Date(Date.now() + berlinOffsetHours(new Date().toISOString().slice(0, 19)) * 3_600_000).toISOString().slice(0, 19);
const slugOf = (path) => path.split("/").filter(Boolean).at(-1);

test("Abzug und Seitenimport tragen dieselben Zeiten", () => {
  const bySlug = new Map(snapshot.map((post) => [post.slug, post]));
  for (const page of articles) {
    const post = bySlug.get(slugOf(page.path));
    assert.ok(post, `${page.path} fehlt in data/wp-posts.json`);
    assert.equal(page.published, post.date, `${page.path} published`);
    assert.equal(page.modified, post.modified, `${page.path} modified`);
  }
});

test("WP-REST: GMT passt zur Berliner Ortszeit, modified nie vor date, nichts in der Zukunft", () => {
  const now = nowBerlin();
  assert.ok(rest.length > 0);
  for (const row of rest) {
    assert.equal(row.date_gmt, toGmt(row.date), `${row.slug} date_gmt`);
    assert.equal(row.modified_gmt, toGmt(row.modified), `${row.slug} modified_gmt`);
    assert.ok(row.modified >= row.date, `${row.slug}: modified vor date`);
    assert.ok(row.modified <= now, `${row.slug}: modified in der Zukunft`);
  }
});

test("Zeitstempel ab 2026 sind nicht rund und nicht doppelt", () => {
  const seen = new Map();
  for (const post of snapshot) {
    for (const field of ["date", "modified"]) {
      const stamp = post[field];
      if (stamp < "2026") continue;
      assert.ok(!isRound(stamp), `${post.slug} ${field}: runde Uhrzeit ${stamp}`);
      if (field === "modified" && stamp === post.date) continue;
      assert.ok(!seen.has(stamp), `${post.slug} ${field}: gleiche Sekunde wie ${seen.get(stamp)}`);
      seen.set(stamp, post.slug);
    }
  }
});

test("keine Sammel-Aktualisierung vieler Beiträge am selben Tag", () => {
  const limit = snapshot.length < 30 ? 4 : 8;
  const perDay = new Map();
  for (const post of snapshot) {
    const day = post.modified.slice(0, 10);
    if (day > post.date.slice(0, 10) && day >= "2026") perDay.set(day, (perDay.get(day) ?? 0) + 1);
  }
  for (const [day, count] of perDay) assert.ok(count <= limit, `${count} Beiträge mit modified am ${day}`);
});

test("höchstens zwei Beiträge je Erscheinungstag", () => {
  const perDay = new Map();
  for (const post of snapshot) {
    if (SAME_DAY_EXCEPTIONS[post.slug]) continue;
    const day = post.date.slice(0, 10);
    perDay.set(day, [...(perDay.get(day) ?? []), post.slug]);
  }
  for (const [day, slugs] of perDay) assert.ok(slugs.length <= 2, `${slugs.length} Beiträge am ${day}: ${slugs.join(", ")}`);
});
