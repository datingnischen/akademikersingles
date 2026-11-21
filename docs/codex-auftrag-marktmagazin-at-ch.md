# Codex-Auftrag: Titelbilder und Infografiken für das AT/CH-Magazin

Stand: 2026-11-21 (Claude Code). Repo `datingnischen/akademikersingles`, Branch `main`, Commit `ec3a14e`.
Trello: Board „Christian Aufgaben“, Liste „in Bearbeitung“ (die erste der beiden), Karte „Codex: Titelbilder + Infografiken Marktmagazin AT/CH“.

## Hintergrund

Österreich und die Schweiz haben seit dem 21.11.2026 ein eigenes Magazin unter `/at/magazin/` und `/ch/magazin/` – keine Übersetzung der deutschen Beiträge, sondern je fünf eigene Texte aus der amtlichen Statistik des jeweiligen Landes. Die Beiträge liegen als Blöcke in `data/market-magazine/<land>/<slug>.json`, gerendert von `lib/market-magazine.ts`.

Die Balkendiagramme im Text sind bereits als HTML/CSS gebaut (Klasse `.mag-chart`) – dafür wird **nichts** gebraucht. Offen sind die Titelbilder und vier Infografiken, die eine Kernaussage auf einen Blick zeigen.

## 1. Titelbilder (10 Dateien)

- Format: WebP, **1536 × 1024 px**, je höchstens 450 KB.
- Stil wie die bestehenden Titelbilder in `public/brand/`: ruhige, hochwertige Aquarellzeichnung, helle Töne, Navy `#012D6A` und Gold `#B8955A` als Akzente.
- Keine Logos, Markenzeichen, Schriftzüge, keine erkennbaren realen Personen, keine lesbaren Zahlen im Bild.
- **Einbau: keiner nötig.** `lib/market-magazine.ts` zeigt das Bild automatisch, sobald die Datei unter dem Zielpfad liegt (Beitragskopf, Kachel im Magazin-Hub, Teaser für ICONY). Der Alt-Text steht als `heroImageAlt` im Beitrags-JSON; bei abweichendem Motiv dort anpassen.

| Zielpfad (unter `public/`) | Motiv (= `heroImageAlt` im Beitrag) |
| --- | --- |
| `/brand/magazin-ch-partnermarkt-schweiz-staedte.webp` | Abendlicher Blick über eine Schweizer Stadt mit beleuchteten Wohnhäusern am Hang |
| `/brand/magazin-ch-wie-paare-sich-kennenlernen.webp` | Zwei Menschen im Gespräch an einem Caféhaustisch mit Blick auf den Genfersee |
| `/brand/magazin-ch-bildung-und-partnerwahl.webp` | Paar beim Spaziergang entlang einer Hochschulfassade in der Genfer Altstadt |
| `/brand/magazin-ch-frauenanteil-studienfaecher.webp` | Studierende verlassen einen Hörsaal mit grossen Fenstern |
| `/brand/magazin-ch-wo-die-akademiker-wohnen.webp` | Wohnhäuser an einem Zürcher Hang mit Blick über die Stadt |
| `/brand/magazin-at-akademikerquote-oesterreich.webp` | Altstadtgasse mit Kaffeehaus und Universitätsgebäude im Hintergrund |
| `/brand/magazin-at-wien-nach-bezirken.webp` | Wiener Gründerzeithäuser mit Straßencafé an einem Nachmittag |
| `/brand/magazin-at-maennerueberschuss-staedte.webp` | Industriestadt im Tal mit Hochschulgebäude und Berghängen im Hintergrund |
| `/brand/magazin-at-studieren-neben-dem-beruf.webp` | Erwachsene in einem Seminarraum mit Notebooks an einem Abendtermin |
| `/brand/magazin-at-kleine-haushalte-grosse-staedte.webp` | Beleuchtete Fenster eines Wohnhauses am Abend, dahinter Dächer einer Stadt |

Bitte die Wiedererkennbarkeit der Motive prüfen (Göttingen-Fehler: Hero zeigte Hannover). Schweizer Motive ohne österreichische Architektur und umgekehrt.

## 2. Infografiken (4 Dateien)

- Format: WebP, 1600 × 900 px, höchstens 300 KB, Stil der Seite: Navy `#012D6A`, Gold `#B8955A`, Elfenbein `#F7F2E9`, Serifen-Display für Zahlen.
- Alt-Text ist Pflicht und muss die Kernaussage enthalten, nicht nur „Infografik“.
- Quelle und Stand gehören sichtbar in die Grafik (kleine Fußzeile).
- Einbau durch Codex: als `text`-Block mit `<figure><img loading="lazy" width height alt><figcaption>` an der im Beitrag genannten Stelle in das jeweilige JSON unter `data/market-magazine/…`. Die Blocktypen stehen oben in `lib/market-magazine.ts`.

### 2.1 `/brand/magazin-ch-kennenlernen-zeitstrahl.webp`
Beitrag `ch/wie-paare-sich-kennenlernen`, Stelle: nach dem Abschnitt „Das Portal hat die Bar überholt – und zwar deutlich“.
Kernaussage: Wie sich die Wege zum Partner in zehn Jahren verschoben haben, Kanton Genf, Anteile in Prozent.

| Weg | vor 2013 | 2013–2018 | 2019–2023 |
| --- | --- | --- | --- |
| Freunde, Bekannte | 36,7 | 31,8 | 30,4 |
| Schule, Studium, Arbeit | 23,6 | 19,2 | 18,0 |
| Bar, Club, Fest | 12,2 | 7,4 | 8,9 |
| Familie | 7,4 | 7,8 | 3,3 |
| Hobby, Sport, Verein | 5,2 | 5,9 | 5,7 |
| Dating-Portale | 3,2 | 21,7 | 24,3 |

Dating-Portale als hervorgehobene Linie. Quelle: Office cantonal de la statistique Genf, T 01.05.5.03, Erhebung 2023.

### 2.2 `/brand/magazin-ch-bildungshomogamie.webp`
Beitrag `ch/bildung-und-partnerwahl`, Stelle: nach dem Abschnitt „Wer tertiär gebildet ist, hat meist einen tertiär gebildeten Partner“.
Kernaussage: 3×3-Matrix der Genfer Paare nach Bildungsniveau beider Partner, Diagonale hervorgehoben.

Zeilen = Mann, Spalten = Frau (obligatorische Schule / Sekundarstufe II / Tertiärstufe):

| | Frau oblig. | Frau Sek II | Frau tertiär |
| --- | --- | --- | --- |
| **Mann oblig.** | 12.823 | 4.523 | 2.018 |
| **Mann Sek II** | 5.773 | 15.682 | 8.034 |
| **Mann tertiär** | 2.335 | 9.547 | **32.240** |

Hinweiszeile: 64,6 Prozent aller 93.983 Paare haben dasselbe Bildungsniveau. Quelle: OCSTAT Genf, T 01.05.1.04, Fünfjahresmittel 2020–2024.

### 2.3 `/brand/magazin-at-wien-bezirke.webp`
Beitrag `at/wien-nach-bezirken`, Stelle: nach dem Abschnitt „Die Geschlechterkarte folgt einer anderen Logik“.
Kernaussage: Streudiagramm der 23 Wiener Bezirke – x-Achse Akademikerquote (13 bis 48 Prozent), y-Achse Männer je 100 Frauen 30–49 (89 bis 115). Vier Punkte beschriften: Neubau (47,9 / 100,2), Josefstadt (47,5 / 109,6), Innere Stadt (47,2 / 90,4), Simmering (13,2 / 104,5). Hilfslinie bei 100.

Vollständige Werte (Akademikerquote % | Männer je 100 Frauen): Neubau 47,9 | 100,2 · Josefstadt 47,5 | 109,6 · Innere Stadt 47,2 | 90,4 · Alsergrund 46,3 | 100,8 · Währing 44,3 | 92,3 · Wieden 43,8 | 105,1 · Mariahilf 42,9 | 109,2 · Hietzing 38,1 | 93,6 · Landstraße 37,0 | 100,2 · Döbling 36,3 | 93,3 · Leopoldstadt 33,7 | 101,8 · Margareten 32,7 | 110,4 · Hernals 30,6 | 104,0 · Penzing 28,5 | 99,1 · Rudolfsheim-Fünfhaus 24,9 | 113,5 · Ottakring 23,8 | 109,4 · Liesing 22,0 | 97,2 · Meidling 21,5 | 106,3 · Brigittenau 21,5 | 109,3 · Donaustadt 21,2 | 93,5 · Floridsdorf 16,6 | 100,4 · Favoriten 15,0 | 113,4 · Simmering 13,2 | 104,5.
Quellen: Statistik Austria, Abgestimmte Erwerbsstatistik 2024 (31.10.2024) und Bevölkerungsstand 01.01.2026.

### 2.4 `/brand/magazin-at-akademikerquote.webp`
Beitrag `at/akademikerquote-oesterreich`, Stelle: nach dem Abschnitt „Der Wiener Speckgürtel liegt vor den Universitätsstädten“.
Kernaussage: Rangliste der zwölf Gemeinden ab 10.000 Einwohnern mit der höchsten Akademikerquote, mit Österreich-Linie bei 17,6 Prozent.

Perchtoldsdorf 35,6 · Klosterneuburg 35,4 · Graz 30,7 · Mödling 29,8 · Innsbruck 29,7 · Baden 28,1 · Wien 26,4 · Brunn am Gebirge 26,1 · Salzburg 24,4 · Eisenstadt 23,7 · Gmunden 23,2 · Leonding 22,9 · (Linie) Österreich 17,6.
Quelle: Statistik Austria, Abgestimmte Erwerbsstatistik 2024, Stichtag 31.10.2024.

## Prüfen

- `npm test`, `npm run lint`, `npm run typecheck`, `npm run build`
- Der Test `tests/market-magazine.test.mjs` prüft unter anderem, dass interne Links kein Marktpräfix tragen und dass kein Satz in zwei Beiträgen steht – Bildunterschriften entsprechend eigenständig formulieren.
- Schweizer Beiträge enthalten kein Eszett (eigener Test), österreichische schon.
- Zeilenenden bestehender Dateien erhalten (teils CRLF)
- Commit als `Christian M. Haas <christian@datingnischen.de>` (vorher `git var GIT_AUTHOR_IDENT` / `GIT_COMMITTER_IDENT` prüfen), nur eigene Pfade stagen, nach `main` pushen
- Prüf-URLs: https://akademikersingles.vercel.app/ch/magazin/ und /at/magazin/ (Kacheln mit Bild) sowie die zehn Beitragsseiten
- Ergebnis als Kommentar in die Trello-Karte
