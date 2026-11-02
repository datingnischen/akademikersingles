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

## Umsetzung durch Codex (2026-11-02)

- Bilder mit Built-in ImageGen erstellt, Göttingen-Bild ausschließlich als Stilreferenz. WebP-Export mit Sharp; 1536 × 1024, höchstens 450.000 Bytes pro Datei.
- Originale Wortmarke und Hut-Herz der SVGs erhalten. Landesendungen als Pfadkonturen ergänzt: Punkt und a aus dem Original, h aus dessen n-Kontur abgeleitet; c/t mit passender Strichstärke und Rundung konstruiert. Keine Laufzeit-Schriftabhängigkeit. Alle Varianten haben zehn Pfade und viewBox `0 0 2347.321 303.134`.
- Alt-Texte `AkademikerSingles.at` / `AkademikerSingles.ch`, Breiten 232 px (Header) und 200 px (Footer), Höhen 30/26 px.
- Linz: ersten Entwurf wegen einer erfundenen großen gotischen Kirche im Hintergrund verworfen; korrigiert auf niedrige Urfahr-Bebauung und die kleine Pfarrkirche.

### Referenzen für die Motivprüfung

Nur zum Abgleich der Bauwerke; keine fremden Fotografien als Website-Assets übernommen:
- Wien: https://event.univie.ac.at/hauptgebaeude
- Graz: https://www.graztourismus.at/de/sightseeing-kultur/sehenswuerdigkeiten/uhrturm_shg_1488
- Linz: https://www.austria.info/sl/regije/donava/
- Salzburg: https://www.salzburg.info/de/reiseinfos/salzburg-a-z/festung-hohensalzburg_az_7955
- Innsbruck: https://www.innsbruck.info/blog/de/kunst-kultur/mariahilf-vom-neuen-leben-in-alten-mauern/
- Zürich: https://ethz.ch/de/campus/erreichen/zentrum.html
- Bern: Aareschlaufe und einzelne hohe Münster-Turmspitze mit Referenzansichten verglichen.
- Basel: Münster mit zwei schlanken Türmen, rotem Sandstein und gemustertem Dach über dem Rhein.
- Lausanne: Kathedrale auf dem Altstadthügel mit Genfersee im Hintergrund.
- St. Gallen: https://sg.kath.ch/kultur/post-1/

### Verwendete ImageGen-Prompts

- **at-wien** (417676 Bytes, 1536 × 1024): Create one standalone landscape watercolor illustration, 1536x1024 (3:2). Subject: Vienna: main building of University of Vienna on Ringstrasse, long symmetrical Italian Renaissance facade, central projecting entrance loggia, pale stone and arched windows. Faithful recognizable architectural silhouettes and geography, do not invent landmarks or duplicate buildings. Match the attached style reference only: refined detailed architectural watercolor with fine pencil/ink details, luminous warm ivory paper, soft pale blue sky, muted sage foliage, warm ochre and terracotta, calm high-end editorial city portrait. Soft edges and subtle paper texture, natural daylight, balanced wide composition. No typography, lettering, signs, logos, watermarks or recognizable real people. Do not reproduce Göttingen landmarks from reference.
- **at-graz** (382086 Bytes, 1536 × 1024): Create one standalone landscape watercolor illustration, 1536x1024 (3:2). Subject: Graz: unmistakable Uhrturm clock tower on wooded Schlossberg hill over red tiled old town, squat white clock tower with huge clock faces, dark timber gallery and steep red roof. Faithful recognizable architectural silhouettes and geography, do not invent landmarks or duplicate buildings. Match the attached style reference only: refined detailed architectural watercolor with fine pencil/ink details, luminous warm ivory paper, soft pale blue sky, muted sage foliage, warm ochre and terracotta, calm high-end editorial city portrait. Soft edges and subtle paper texture, natural daylight, balanced wide composition. No typography, lettering, signs, logos, watermarks or recognizable real people. Do not reproduce Göttingen landmarks from reference.
- **at-linz** (270158 Bytes, 1536 × 1024): Create one standalone landscape watercolor illustration, 1536x1024 (3:2). Subject: Linz: Ars Electronica Center beside Danube, distinctive angular contemporary glass building with pale blue illuminated glass panels, broad river foreground. Faithful recognizable architectural silhouettes and geography, do not invent landmarks or duplicate buildings. Match the attached style reference only: refined detailed architectural watercolor with fine pencil/ink details, luminous warm ivory paper, soft pale blue sky, muted sage foliage, warm ochre and terracotta, calm high-end editorial city portrait. Soft edges and subtle paper texture, natural daylight, balanced wide composition. No typography, lettering, signs, logos, watermarks or recognizable real people. Do not reproduce Göttingen landmarks from reference.
- **at-salzburg** (429902 Bytes, 1536 × 1024): Create one standalone landscape watercolor illustration, 1536x1024 (3:2). Subject: Salzburg: Hohensalzburg fortress on hill above baroque old town, Salzburg cathedral domes, Salzach river foreground. Faithful recognizable architectural silhouettes and geography, do not invent landmarks or duplicate buildings. Match the attached style reference only: refined detailed architectural watercolor with fine pencil/ink details, luminous warm ivory paper, soft pale blue sky, muted sage foliage, warm ochre and terracotta, calm high-end editorial city portrait. Soft edges and subtle paper texture, natural daylight, balanced wide composition. No typography, lettering, signs, logos, watermarks or recognizable real people. Do not reproduce Göttingen landmarks from reference.
- **at-innsbruck** (450000 Bytes, 1536 × 1024): Create one standalone landscape watercolor illustration, 1536x1024 (3:2). Subject: Innsbruck: famous colorful row of houses in Mariahilf directly along Inn river, dramatic jagged Nordkette mountains behind. Faithful recognizable architectural silhouettes and geography, do not invent landmarks or duplicate buildings. Match the attached style reference only: refined detailed architectural watercolor with fine pencil/ink details, luminous warm ivory paper, soft pale blue sky, muted sage foliage, warm ochre and terracotta, calm high-end editorial city portrait. Soft edges and subtle paper texture, natural daylight, balanced wide composition. No typography, lettering, signs, logos, watermarks or recognizable real people. Do not reproduce Göttingen landmarks from reference.
- **ch-zuerich** (447544 Bytes, 1536 × 1024): Create one standalone landscape watercolor illustration, 1536x1024 (3:2). Subject: Zurich: ETH main building with its recognizable broad pale neoclassical facade and central dome on terrace above old town, Limmat river in lower foreground, do not substitute university tower. Faithful recognizable architectural silhouettes and geography, do not invent landmarks or duplicate buildings. Match the attached style reference only: refined detailed architectural watercolor with fine pencil/ink details, luminous warm ivory paper, soft pale blue sky, muted sage foliage, warm ochre and terracotta, calm high-end editorial city portrait. Soft edges and subtle paper texture, natural daylight, balanced wide composition. No typography, lettering, signs, logos, watermarks or recognizable real people. Do not reproduce Göttingen landmarks from reference.
- **ch-bern** (423630 Bytes, 1536 × 1024): Create one standalone landscape watercolor illustration, 1536x1024 (3:2). Subject: Bern: aerial oblique view of medieval old town peninsula encircled by turquoise Aare loop, tall single Gothic spire of Bern Minster prominent. Faithful recognizable architectural silhouettes and geography, do not invent landmarks or duplicate buildings. Match the attached style reference only: refined detailed architectural watercolor with fine pencil/ink details, luminous warm ivory paper, soft pale blue sky, muted sage foliage, warm ochre and terracotta, calm high-end editorial city portrait. Soft edges and subtle paper texture, natural daylight, balanced wide composition. No typography, lettering, signs, logos, watermarks or recognizable real people. Do not reproduce Göttingen landmarks from reference.
- **ch-basel** (342800 Bytes, 1536 × 1024): Create one standalone landscape watercolor illustration, 1536x1024 (3:2). Subject: Basel: red sandstone Basel Minster with two distinct slender Gothic towers, patterned roof above Rhine river, terrace and old town. Faithful recognizable architectural silhouettes and geography, do not invent landmarks or duplicate buildings. Match the attached style reference only: refined detailed architectural watercolor with fine pencil/ink details, luminous warm ivory paper, soft pale blue sky, muted sage foliage, warm ochre and terracotta, calm high-end editorial city portrait. Soft edges and subtle paper texture, natural daylight, balanced wide composition. No typography, lettering, signs, logos, watermarks or recognizable real people. Do not reproduce Göttingen landmarks from reference.
- **ch-lausanne** (382278 Bytes, 1536 × 1024): Create one standalone landscape watercolor illustration, 1536x1024 (3:2). Subject: Lausanne: Gothic Lausanne cathedral above steep hillside old town, Lake Geneva in distance with alpine horizon, distinctive cathedral crossing tower and tall western tower. Faithful recognizable architectural silhouettes and geography, do not invent landmarks or duplicate buildings. Match the attached style reference only: refined detailed architectural watercolor with fine pencil/ink details, luminous warm ivory paper, soft pale blue sky, muted sage foliage, warm ochre and terracotta, calm high-end editorial city portrait. Soft edges and subtle paper texture, natural daylight, balanced wide composition. No typography, lettering, signs, logos, watermarks or recognizable real people. Do not reproduce Göttingen landmarks from reference.
- **ch-st-gallen** (369598 Bytes, 1536 × 1024): Create one standalone landscape watercolor illustration, 1536x1024 (3:2). Subject: St Gallen: abbey precinct with Stiftskirche, symmetrical baroque abbey cathedral facade with twin towers and green domes, broad grassy square. Faithful recognizable architectural silhouettes and geography, do not invent landmarks or duplicate buildings. Match the attached style reference only: refined detailed architectural watercolor with fine pencil/ink details, luminous warm ivory paper, soft pale blue sky, muted sage foliage, warm ochre and terracotta, calm high-end editorial city portrait. Soft edges and subtle paper texture, natural daylight, balanced wide composition. No typography, lettering, signs, logos, watermarks or recognizable real people. Do not reproduce Göttingen landmarks from reference.
