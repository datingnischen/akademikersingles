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
