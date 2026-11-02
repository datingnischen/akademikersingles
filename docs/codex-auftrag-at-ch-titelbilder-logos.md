# Codex-Auftrag: Titelbilder AT/CH-Stadtdossiers und Logos .at/.ch

Stand: 2026-11-02 (Claude Code). Trello-Karte: Board „Christian Aufgaben“, Liste „in Bearbeitung“, Karte „Codex: Titelbilder AT/CH + Logos .at/.ch für AkademikerSingles“.

## Ziel
AkademikerSingles geht mit akademikersingles.at und akademikersingles.ch live (über den ICONY-nginx). Die zehn Stadtdossiers für Österreich und die Schweiz haben noch kein Titelbild, und die Länderseiten zeigen bisher ein Logo ohne Domainendung (Übergangslösung). Gebraucht werden zehn Titelbilder und vier Logo-Varianten.

Repo `datingnischen/akademikersingles`, Branch `main`.

## 1. Titelbilder (10 Dateien)
- Format: WebP, **1536 × 1024 px** wie `public/brand/goettingen-altstadt-gaenseliesel-partnersuche.webp`, je höchstens 450 KB
- Stil wie das Göttingen-Bild: Aquarellzeichnung, ruhig, hochwertig, helle Töne. Jede Stadt mit eigenem Motiv, kein Motiv doppelt.
- Keine Logos, Markenzeichen, Schriftzüge, keine erkennbaren realen Personen.
- Einbau: keiner nötig. `lib/market-cities.ts` zeigt das Bild automatisch, sobald die Datei unter dem Zielpfad liegt (Dossier-Kopf und Kachel in der Städteübersicht). Der Alt-Text steht schon als `heroAlt` im Dossier; bei abweichendem Motiv dort anpassen.

| Zielpfad | Motiv (= `heroAlt` in `data/city-profiles/…`) |
| --- | --- |
| `public/brand/at-wien-partnersuche.webp` | Wien mit dem Hauptgebäude der Universität Wien an der Ringstraße |
| `public/brand/at-graz-partnersuche.webp` | Graz mit dem Uhrturm auf dem Schloßberg über der Altstadt |
| `public/brand/at-linz-partnersuche.webp` | Linz mit dem Ars Electronica Center an der Donau |
| `public/brand/at-salzburg-partnersuche.webp` | Salzburg mit der Festung Hohensalzburg über der Altstadt an der Salzach |
| `public/brand/at-innsbruck-partnersuche.webp` | Innsbruck mit der bunten Häuserzeile am Inn vor der Nordkette |
| `public/brand/ch-zuerich-partnersuche.webp` | Zürich mit dem Hauptgebäude der ETH über der Altstadt an der Limmat |
| `public/brand/ch-bern-partnersuche.webp` | Bern mit der Altstadt in der Aareschlaufe und dem Berner Münster |
| `public/brand/ch-basel-partnersuche.webp` | Basel mit dem Münster über dem Rhein |
| `public/brand/ch-lausanne-partnersuche.webp` | Lausanne mit der Kathedrale über der Altstadt und dem Genfersee |
| `public/brand/ch-st-gallen-partnersuche.webp` | St. Gallen mit der Stiftskirche im Stiftsbezirk |

Das Gebäude- bzw. Stadtbild jeweils auf echte Wiedererkennbarkeit prüfen (Göttingen-Fehler: Hero zeigte Hannover).

## 2. Logos .at/.ch (4 Dateien, SVG)
- Vorlage: `public/brand/logo.svg` (dunkel) und `public/brand/logo-light.svg` (hell, Footer). Dort ist „.de“ der zehnte Pfad (`fill="#012D6A"` bzw. `#F7F2E9`, beginnt bei x ≈ 1929).
- Ersetzen: `public/brand/logo-at.svg`, `logo-light-at.svg`, `logo-ch.svg`, `logo-light-ch.svg`. Derzeit liegen dort Übergangsversionen ohne Endung (9 Pfade, `viewBox="0 0 2179.321 303.134"`).
- Neu: „.at“ bzw. „.ch“ an derselben Stelle, in derselben Schrift, Größe und Farbe wie „.de“, Doktorhut-Herz wie im Original rechts daneben; Seitenverhältnis wie das Original (2347.321 × 303.134) oder passend zur neuen Breite.
- Danach in `components/site-shell.tsx` (Funktion `brand`) für AT/CH `alt` auf „AkademikerSingles.at“/„AkademikerSingles.ch“ und `width`/`footerWidth` auf das neue Seitenverhältnis setzen (Höhe 30 bzw. 26 px), und den Logo-Test in `tests/markets.test.mjs` („Logo je Markt“) auf die neuen Dateien anpassen (10 Pfade, neue viewBox).

## Prüfen
- `npm test`, `npm run lint`, `npm run typecheck`, `npm run build`
- Zeilenenden der bestehenden Dateien erhalten (teils CRLF)
- Commit als `Christian M. Haas <christian@datingnischen.de>` (vorher `git var GIT_AUTHOR_IDENT` / `GIT_COMMITTER_IDENT`), nur eigene Pfade stagen, nach `main` pushen
- Prüf-URLs: https://akademikersingles.vercel.app/at/partnersuche/ und https://akademikersingles.vercel.app/ch/partnersuche/ (Kacheln), je eine Stadtseite, z. B. https://akademikersingles.vercel.app/at/partnersuche/wien/ und https://akademikersingles.vercel.app/ch/partnersuche/zuerich/ (Bild im Kopf, Logo oben und im Footer)
- Ergebnis als Kommentar in die Trello-Karte
