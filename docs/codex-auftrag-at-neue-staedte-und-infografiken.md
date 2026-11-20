# Codex-Auftrag: Titelbilder Klagenfurt, Krems, Leoben + zwei Städtevergleich-Infografiken

Stand: 2026-11-20 (Claude Code). Repo `datingnischen/akademikersingles`, Branch `main`.
Trello: Board „Christian Aufgaben“, Liste „in Bearbeitung“, Karte „Codex: Titelbilder Klagenfurt/Krems/Leoben + Infografiken Städtevergleich AT/CH“.

## Hintergrund
Die AT/CH-Stadtdossiers wurden am 20./21.11.2026 stark ausgebaut (Hochschulporträts, Quartiere, Termine, eigener Stadt-Guide, aktuelle amtliche Kennzahlen). Neu dazugekommen sind drei österreichische und zwei Schweizer Stadtseiten, die noch kein Titelbild haben. Außerdem haben die beiden Länderseiten jetzt einen Städtevergleich als Tabelle – dafür fehlt eine Infografik.

## 1. Titelbilder (5 Dateien)
- Format: WebP, **1536 × 1024 px**, je höchstens 450 KB – gleiche Machart wie die bestehenden AT/CH-Titelbilder in `public/brand/` (Aquarellzeichnung, ruhig, hochwertig, helle Töne).
- Keine Logos, Markenzeichen, Schriftzüge, keine erkennbaren realen Personen.
- Einbau: keiner nötig. `lib/market-cities.ts` zeigt das Bild automatisch, sobald die Datei unter dem Zielpfad liegt (Kopf der Stadtseite und Kachel in der Städteübersicht). Der Alt-Text steht als `heroAlt` im Dossier; bei abweichendem Motiv dort anpassen.

| Zielpfad | Motiv (= `heroAlt` im Dossier) |
| --- | --- |
| `public/brand/at-klagenfurt-partnersuche.webp` | Klagenfurt mit dem Lindwurm am Neuen Platz und dem Wörthersee im Hintergrund |
| `public/brand/at-krems-partnersuche.webp` | Krems an der Donau mit Steiner Tor und den Weinbergen der Wachau |
| `public/brand/at-leoben-partnersuche.webp` | Leoben mit dem Schwammerlturm und der Mur im Vordergrund |
| `public/brand/ch-genf-partnersuche.webp` | Genf mit dem Jet d'eau über dem Genfersee und der Altstadt |
| `public/brand/ch-luzern-partnersuche.webp` | Luzern mit Kapellbrücke, Wasserturm und dem Vierwaldstättersee |

Bitte die Wiedererkennbarkeit der Motive prüfen (Göttingen-Fehler: Hero zeigte Hannover).

## 2. Infografiken Städtevergleich (2 Dateien)
Zweck: Die Länderseiten `/at/partnersuche/` und `/ch/partnersuche/` zeigen seit 20.11.2026 eine Vergleichstabelle (Komponente `HubCompare` in `components/templates.tsx`). Eine Infografik soll den Kern dieser Tabelle auf einen Blick zeigen.

- Format: WebP, 1600 × 900 px, höchstens 300 KB, Stil wie die Seite (Navy `#012D6A`, Gold `#B8955A`, Elfenbein `#F7F2E9`, Serifen-Display für Zahlen).
- Zielpfade: `public/brand/vergleich-at-staedte.webp` und `public/brand/vergleich-ch-staedte.webp`
- Einbau durch Codex: in `lib/market-cities.ts` im `body`-Text der jeweiligen Marktseite als `<figure>` mit `<img>` (loading="lazy", Breite/Höhe gesetzt) und `<figcaption>` mit Quelle, oder – sauberer – als eigener Block in der Komponente `HubCompare` oberhalb der Tabelle. Alt-Text Pflicht, Beispiel: „Balkendiagramm: Akademikerquote der acht österreichischen Stadtdossiers, Graz führt mit 30,7 Prozent“.

### Daten Österreich (Quelle: Statistik Austria, Abgestimmte Erwerbsstatistik 2024, Stichtag 31.10.2024)
Anteil der Bevölkerung ab 15 Jahren mit Hochschul-, Akademie- oder Kollegabschluss:
Graz 30,7 % · Innsbruck 29,7 % · Wien 26,4 % · Salzburg 24,4 % · Klagenfurt 22,3 % · Linz 20,4 % · Krems 17,8 % · Leoben 15,8 % · Österreich 17,6 %

### Daten Schweiz (Quellen je Stadt, Stand auf der jeweiligen Stadtseite)
Anteil mit Tertiär- bzw. Hochschulabschluss:
Zürich 58,7 % (Tertiär, ab 15, Strukturerhebung 2024) · St. Gallen 46 % (Tertiär, 25–64) · Bern 43,9 % (Hochschule, ab 25) · Lausanne 42,0 % (Hochschule, ab 30) · Basel 36,6 % (Hochschule, ab 15)
**Wichtig:** Die Schweizer Werte haben unterschiedliche Altersabgrenzungen – das muss in der Grafik als Fußnote stehen, sonst ist der Vergleich irreführend. Alternativ für die Schweiz die eindeutig vergleichbare Kennzahl nehmen: ledige Männer je 100 ledige Frauen (25–54 Jahre, BFS STATPOP 31.12.2025): Bern 105 · Lausanne 111 · Basel 113 · Zürich 116 · St. Gallen 127 · Schweiz 125.

## Prüfen
- `npm test`, `npm run lint`, `npm run typecheck`, `npm run build`
- Zeilenenden bestehender Dateien erhalten (teils CRLF)
- Commit als `Christian M. Haas <christian@datingnischen.de>` (vorher `git var GIT_AUTHOR_IDENT` / `GIT_COMMITTER_IDENT` prüfen), nur eigene Pfade stagen, nach `main` pushen
- Prüf-URLs: https://akademikersingles.vercel.app/at/partnersuche/klagenfurt/ , /at/partnersuche/krems/ , /at/partnersuche/leoben/ (Bild im Kopf) sowie https://akademikersingles.vercel.app/at/partnersuche/ und /ch/partnersuche/ (Kacheln und Infografik)
- Ergebnis als Kommentar in die Trello-Karte
