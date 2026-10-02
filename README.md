# akademikersingles.de

Next.js/Vercel-Frontend für die **öffentlichen redaktionellen Inhalte** von akademikersingles.de – im Premium-Look für Akademiker, Unternehmer und Singles mit Anspruch an Stil und Lifestyle.

## Abgrenzung

**Next.js (identische URL-Struktur wie live):**

- `/` Startseite
- `/partnersuche/` und 15 Stadtseiten `/partnersuche/<stadt>/`
- Ratgeber `/partnervermittlung/`, `/universitaeten/`, `/ueber-50/`, `/einkommen/`
- Über uns `/ueber-uns/` mit `/ueber-uns/bewertungen/` und `/ueber-uns/social-media/` (die Live-URL `/social-media/` leitet per 308 dorthin), dazu `/faq/`
- `/magazin/`, alle Artikel `/magazin/<slug>/`, Kategorien `/magazin/category/<slug>/`, Autor `/magazin/author/redaktion/`
- `sitemap.xml`, `robots.txt`

Die WordPress-Paginierung (`/magazin/page/<n>/`, auch in Kategorien) leitet per 308 auf die Übersicht um, denn dort stehen alle Artikel auf einer Seite.

**ICONY/Legacy (immer absolut auf `https://akademikersingles.de`):** Registrierung, Login, Fragenflirt, Fotoflirt, Videodate, Mitgliedschaften, Redaktionelle Kontrolle, Sicherheit & Datenschutz, Erfolgsgeschichten, Hilfe, Kontakt, Kündigen, Widerruf, Impressum, Datenschutz, AGB und Barrierefreiheit. Mitgliederprofile und -bilder werden nicht importiert.

## Magazin-Leitthemen

Erfolg & Anziehung · Unternehmer Dating · Intellektuelle Anziehung · Lifestyle, Status & Luxus · Beziehung auf Augenhöhe. Reihenfolge und Kurzname stehen in `LEAD_CATEGORIES` (`lib/content.ts`), die Kachelmotive in `TOPIC_COVERS`.

## Datenimport

```bash
npm install
npm run import   # benötigt python mit requests, beautifulsoup4, pillow
```

Der Importer liest ausschließlich `akademikersingles.de` und die ICONY-CMS-Hosts, entfernt ausführbares Markup und Mitgliederbereiche und lädt alle redaktionellen Grafiken (inklusive der Audio-Fassungen der Artikel) nach `public/imported/`. PNGs über 350 KB ohne Transparenz werden als JPEG (max. 2000 px) abgelegt. Er erzeugt:

- `data/public-pages.json`
- `data/magazine-categories.json`
- `data/route-ownership.json`
- `data/asset-provenance.json` (SHA-256 von Quelle und lokaler Datei)

Marken-Grafiken der Live-Startseite (Logo, Hero, Feature-Mockups, Erfolgsgeschichten) und das Siegel von Singlebörsen-Überblick liegen in `public/brand/`.

## AID-Konvention

- Stadt-/Partnersuche-Seiten: `?AID=location`
- Magazin-Seiten: `?AID=magazin`

## Qualitätsprüfung

```bash
npm test
npm run lint
npm run typecheck
npm run build
```

## WordPress-kompatibler REST-Endpunkt (für ICONY)

ICONY liest auf den Plattform-Startseiten drei Magazin-Teaser im WordPress-Format. Der Endpunkt bleibt unter der alten Adresse erreichbar, wird aber aus den Repo-Dateien erzeugt (`lib/wp-rest-compat.ts`):

- `https://akademikersingles.de/magazin/wp-json/wp/v2/posts` (auch `?per_page=3&_embed=1&orderby=date&order=desc`, `/posts/<id>`, `categories`, `tags` (leer), `media/<id>`)
- `https://akademikersingles.de/magazin/?rest_route=/wp/v2/posts` und `/magazin/index.php?rest_route=/wp/v2/posts`
- Parameter: `per_page` (max. 100), `page`, `_embed`, `_fields`, `orderby`, `order`, `categories`, `slug`, `search`, `include`, `after`, `before`. Header: CORS `*`, `X-WP-Total`, `X-WP-TotalPages`, `Cache-Control` (s-maxage 3600), `X-Robots-Tag: noindex`; `OPTIONS` und `HEAD` funktionieren.
- Nur Magazin-Artikel (`family: magazine`). `/wp/v2/users`, `/wp/v2/pages` und alles Unbekannte antworten 404; `author` ist nur eine ID.
- `link` ist die kanonische Live-URL, Bilder und Audio im Fließtext sowie das Beitragsbild liegen absolut auf dem Asset-Host (`staticAsset`, `/app-assets/imported/...`), verkleinerte Größen laufen über `/_next/image/` des Asset-Hosts.
- `excerpt.rendered` ist die Meta-Description des Artikels (der importierte Auszug beginnt mit dem Audio-Block).

**nginx/ICONY:** Der Pfad `/magazin/wp-json/*` (sowie `/magazin/index.php` und `/magazin/` mit `?rest_route=`) muss an Vercel durchgereicht werden, ohne Umleitung auf Slash. Aufruf ohne Slash am Ende liefert 200 JSON (`skipTrailingSlashRedirect` plus `proxy.ts`).

**IDs:** Die Importdaten kennen keine WordPress-IDs. Beitrags-ID = `100000 + FNV-1a(Slug) mod 900000`, Beitragsbild-ID = `1000000 + Beitrags-ID`, Kategorie-IDs aus `data/magazine-categories.json`, Autor `Redaktion` = 1. Datum und Änderungsdatum stammen aus `published`/`modified` (Ortszeit Europe/Berlin, `date_gmt` wird umgerechnet). Bildmaße stehen in `data/wp-media.json` (`python scripts/build_wp_media.py` nach jedem Import).
