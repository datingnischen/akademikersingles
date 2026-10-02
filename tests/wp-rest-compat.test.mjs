import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

import { berlinToGmt, handleWpRest, mediaIdForPostId, postIdForSlug, wpRestPreflight, wpRestResponse } from "../lib/wp-rest-compat.ts";

const root = new URL("../", import.meta.url);
const source = (path) => readFileSync(new URL(path, root), "utf8");
const get = (route, query = "") => handleWpRest(route, new URLSearchParams(query));
const { pages } = JSON.parse(source("data/public-pages.json"));
const articles = pages.filter((page) => page.family === "magazine");

test("IDs: echte WordPress-IDs aus dem Abzug, für neue Artikel stabile Ableitung aus dem Slug (fixiert)", () => {
  const live = get("/wp/v2/posts", "slug=depression-dating-loslassen").body[0];
  assert.equal(live.id, 545, "echte WordPress-ID");
  assert.equal(live.featured_media, 547);
  assert.equal(live.date, "2026-09-09T07:02:05");
  assert.equal(live.modified, "2026-09-10T00:04:05");
  assert.deepEqual(live.categories, [9]);
  assert.equal(live.author, 1);
  assert.equal(get("/wp/v2/posts/545").body.slug, "depression-dating-loslassen");
  const snapshot = JSON.parse(source("data/wp-posts.json")).posts;
  assert.equal(snapshot.length, articles.length, "jeder Artikel hat einen Abzug");
  assert.equal(new Set(snapshot.map((post) => post.id)).size, snapshot.length);

  assert.equal(postIdForSlug("akademiker-daten"), 205102);
  assert.equal(postIdForSlug("depression-dating-loslassen"), 344566);
  assert.equal(postIdForSlug("timing"), 556599);
  assert.equal(mediaIdForPostId(205102), 1205102);
  const ids = articles.map((page) => postIdForSlug(page.path.split("/")[2]));
  assert.equal(new Set(ids).size, ids.length, "keine ID-Kollision");
  assert.ok(ids.every((id) => id >= 100000 && id < 1000000));
  assert.ok(!ids.some((id) => snapshot.some((post) => post.id === id)), "abgeleitete IDs kollidieren nicht mit echten");
});

test("Zeitzone: Ortszeit Europe/Berlin wird korrekt nach GMT umgerechnet (Winter- und Sommerzeit)", () => {
  assert.equal(berlinToGmt("2026-01-15T22:31:39"), "2026-01-15T21:31:39");
  assert.equal(berlinToGmt("2026-07-07T12:57:23"), "2026-07-07T10:57:23");
});

test("posts: Teaser-Abruf wie bei ICONY liefert drei Beiträge im WordPress-Format mit Gesamtzahl-Headern", () => {
  const result = get("/wp/v2/posts", "per_page=3&_embed=1&orderby=date&order=desc");
  assert.equal(result.status, 200);
  assert.equal(result.body.length, 3);
  assert.equal(result.headers["X-WP-Total"], String(articles.length));
  assert.equal(result.headers["X-WP-TotalPages"], String(Math.ceil(articles.length / 3)));
  assert.match(result.headers.Link, /rel="next"/);
  assert.equal(result.body[0].slug, "depression-dating-loslassen", "neuester Artikel zuerst");

  const [first, second] = result.body;
  assert.ok(first.date >= second.date, "neueste zuerst");
  for (const post of result.body) {
    for (const key of ["id", "date", "date_gmt", "modified", "modified_gmt", "slug", "status", "type", "link", "title", "excerpt", "content", "featured_media", "categories", "tags", "author"]) {
      assert.ok(key in post, `${post.slug}: ${key}`);
    }
    assert.equal(post.status, "publish");
    assert.equal(post.type, "post");
    assert.ok(post.id > 0 && post.id < 100000, "echte WordPress-ID");
    assert.match(post.excerpt.rendered, /^<p>.+<\/p>\n$/s);
    assert.equal(typeof post.author, "number", "author nur als ID");
    assert.ok(post.categories.length > 0);
    assert.equal(post.link, `https://akademikersingles.de/magazin/${post.slug}/`, "kanonische Live-URL, nie vercel.app");
    assert.doesNotMatch(JSON.stringify(post), /vercel\.app\/magazin/);
    assert.doesNotMatch(post.content.rendered, /(?:src|href|poster)="\//, "keine relativen Adressen im Fließtext");

    const media = post._embedded["wp:featuredmedia"][0];
    assert.equal(media.id, post.featured_media);
    assert.match(media.source_url, /^https:\/\/akademikersingles\.vercel\.app\/app-assets\/imported\/[0-9a-f]+\.jpg$/, "absolut auf dem Asset-Host");
    assert.ok(media.media_details.width > 0 && media.media_details.height > 0);
    assert.ok(media.alt_text.trim(), "Alt-Text nie leer");
    assert.ok(media.media_details.sizes.full && media.media_details.sizes.medium_large);
    assert.ok(post._embedded["wp:term"][0].length > 0);
    assert.deepEqual(post._embedded["wp:term"][1], []);
    assert.equal(post._embedded.author, undefined, "keine eingebetteten Autoren");
  }
});

test("alle Magazin-Artikel (und nur diese) sind Beiträge; Beitragsbilder liegen vor und messen echte Größen", () => {
  const all = get("/wp/v2/posts", "per_page=100&_embed").body;
  assert.equal(all.length, articles.length);
  const slugs = all.map((post) => post.slug);
  for (const page of pages) {
    const slug = page.path.split("/")[2];
    if (page.family === "magazine") assert.ok(slugs.includes(slug), page.path);
    else assert.ok(!slugs.includes(slug) || page.family === "magazine", `${page.path} ist kein Beitrag`);
  }
  for (const slug of ["author", "category", "partnersuche"]) assert.ok(!slugs.includes(slug));
  for (const post of all) {
    const page = articles.find((item) => item.path === `/magazin/${post.slug}/`);
    assert.equal(post.date, page.published, "Datum stimmt mit dem Seitenimport überein");
    assert.ok(existsSync(new URL(`public${page.heroImage}`, root)), page.heroImage);
    assert.ok(post._embedded["wp:featuredmedia"][0].alt_text.trim());
  }
});

test("posts: _fields, slug, categories, order und Paginierung verhalten sich wie WordPress", () => {
  const slim = get("/wp/v2/posts", "per_page=2&_fields=id,link,title.rendered,excerpt");
  assert.deepEqual(Object.keys(slim.body[0]).sort(), ["excerpt", "id", "link", "title"]);
  assert.deepEqual(Object.keys(slim.body[0].title), ["rendered"]);

  const embedded = get("/wp/v2/posts", "per_page=1&_embed&_fields=id,_embedded");
  assert.deepEqual(Object.keys(embedded.body[0]).sort(), ["_embedded", "id"]);

  const bySlug = get("/wp/v2/posts", "slug=timing");
  assert.equal(bySlug.body.length, 1);
  assert.equal(bySlug.headers["X-WP-Total"], "1");

  const category = get("/wp/v2/categories", "slug=erfolg-anziehung").body[0];
  const inCategory = get("/wp/v2/posts", `categories=${category.id}&per_page=100`);
  assert.equal(inCategory.body.length, category.count);
  assert.ok(inCategory.body.every((post) => post.categories.includes(category.id)));

  const included = get("/wp/v2/posts", "include=235,119");
  assert.equal(included.body.length, 2);

  assert.equal(get("/wp/v2/posts", "search=sapiosexual").body.length > 0, true);
  assert.equal(get("/wp/v2/posts", "after=2026-09-01T00:00:00").body.length, 2);
  assert.equal(get("/wp/v2/posts", "before=2025-11-01T00:00:00").body.length, 4);

  const ascending = get("/wp/v2/posts", "orderby=date&order=asc&per_page=2").body;
  assert.ok(ascending[0].date <= ascending[1].date);

  const page2 = get("/wp/v2/posts", "per_page=10&page=2");
  assert.equal(page2.body.length, 10);
  assert.match(page2.headers.Link, /rel="prev"/);
  assert.equal(get("/wp/v2/posts", "per_page=10&page=99").status, 400);
  assert.equal(get("/wp/v2/posts", "per_page=500").body.length, articles.length, "per_page wird auf 100 begrenzt");
});

test("einzelne Beiträge, Kategorien, Beitragsbilder; Schlagwörter leer; Seiten und Unbekanntes antworten 404", () => {
  const post = get("/wp/v2/posts", "slug=timing").body[0];
  assert.equal(post.id, 235);
  const single = get(`/wp/v2/posts/${post.id}`);
  assert.equal(single.status, 200);
  assert.equal(single.body.slug, "timing");
  assert.equal(get("/wp/v2/posts/999999").status, 404);
  const media = get(`/wp/v2/media/${post.featured_media}`);
  assert.equal(media.body.id, post.featured_media);
  assert.equal(media.body.post, post.id);
  assert.equal(get("/wp/v2/media").status, 404, "keine Liste der Mediathek");
  assert.equal(get("/wp/v2/categories", "per_page=100").body.length, 8);
  const tags = get("/wp/v2/tags");
  assert.equal(tags.status, 200);
  assert.deepEqual(tags.body, []);
  for (const route of ["/wp/v2/pages", "/wp/v2/pages/1", "/wp/v2/types", "/wp/v2/comments", "/wp/v2/search", "/oembed/1.0", "/wp/v2/posts/1/revisions/9"]) {
    assert.equal(get(route).status, 404, route);
  }
});

test("KEIN users-Endpunkt: Autoren gibt es nur als ID, kein Name oder Avatar in irgendeiner Antwort", () => {
  for (const route of ["/wp/v2/users", "/wp/v2/users/1", "/wp/v2/users/me"]) {
    const result = get(route);
    assert.equal(result.status, 404, route);
    assert.equal(result.body.code, "rest_no_route", route);
  }
  assert.equal(get("/wp/v2/users", "slug=redaktion").status, 404);
  assert.equal(get("/wp/v2/users", "search=Redaktion").status, 404);

  const all = JSON.stringify(get("/wp/v2/posts", "per_page=100&_embed&_fields=id,author,_embedded,_links").body);
  assert.doesNotMatch(all, /gravatar|avatar_urls|\/users\//);
  assert.doesNotMatch(all, /Redaktion/);

  assert.doesNotMatch(JSON.stringify(get("/").body), /users/);
  assert.doesNotMatch(JSON.stringify(get("/wp/v2").body), /users|pages/);
});

test("Antwort-Header: CORS offen, Cache-Header, JSON, noindex; OPTIONS und HEAD funktionieren", async () => {
  const response = wpRestResponse(get("/wp/v2/posts", "per_page=3"));
  assert.equal(response.status, 200);
  assert.equal(response.headers.get("access-control-allow-origin"), "*");
  assert.match(response.headers.get("access-control-expose-headers"), /X-WP-Total, X-WP-TotalPages/);
  assert.match(response.headers.get("cache-control"), /s-maxage=3600/);
  assert.match(response.headers.get("content-type"), /^application\/json/);
  assert.equal(response.headers.get("x-wp-total"), String(articles.length));
  assert.equal(response.headers.get("x-robots-tag"), "noindex");
  assert.equal((await response.json()).length, 3);

  const notFound = wpRestResponse(get("/wp/v2/users"));
  assert.equal(notFound.status, 404);
  assert.equal(notFound.headers.get("access-control-allow-origin"), "*");

  const head = wpRestResponse(get("/wp/v2/posts"), "HEAD");
  assert.equal(await head.text(), "");
  assert.equal(head.headers.get("x-wp-total"), String(articles.length));

  const preflight = wpRestPreflight();
  assert.equal(preflight.status, 204);
  assert.equal(preflight.headers.get("access-control-allow-origin"), "*");
});

test("Routen: wp-json und ?rest_route= sind verdrahtet, kein 308-Loop, Catch-all und Sitemap bleiben unberührt", () => {
  const wpJson = source("app/magazin/wp-json/[[...route]]/route.ts");
  assert.match(wpJson, /handleWpRest\(`\/\$\{route\.join\("\/"\)\}`/);
  assert.match(wpJson, /export function OPTIONS/);
  const indexPhp = source("app/magazin/index.php/route.ts");
  assert.match(indexPhp, /params\.get\("rest_route"\)/);
  assert.match(indexPhp, /params\.delete\("rest_route"\)/);

  const config = source("next.config.ts");
  assert.match(config, /skipTrailingSlashRedirect: true/);
  assert.match(config, /key: "rest_route"[\s\S]*destination: "\/magazin\/index\.php"/);

  const proxy = source("proxy.ts");
  assert.match(proxy, /startsWith\("\/magazin\/wp-json"\)/);
  assert.match(proxy, /NextResponse\.rewrite/);

  assert.doesNotMatch(source("lib/wp-rest-compat.ts"), /"\/wp\/v2\/users"|resource === "users"|resource === "pages"/);
  assert.doesNotMatch(source("app/sitemap.ts"), /wp-json/);
  assert.doesNotMatch(source("lib/search.ts"), /wp-json/);
});
