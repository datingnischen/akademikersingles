# Codex-Auftrag: Titelbild Stadtdossier Kassel

Stand: 2026-10-30 (Claude Code). Trello-Karte: Board „Christian Aufgaben“, Liste „in Bearbeitung“, Karte „Codex: Titelbild Kassel für akademikersingles.de“.

## Ziel
Die neue Stadtseite https://akademikersingles.de/partnersuche/kassel/ (Commit `fdd1833`) hat noch kein Titelbild. Es erscheint im Dossier-Kopf und als Kachel auf `/partnersuche/` und bei den Nachbarstädten.

## Datei
- Repo `datingnischen/akademikersingles`, Branch `main`
- Zielpfad: `public/brand/kassel-herkules-bergpark-partnersuche.webp`
- Format: WebP, **1536 × 1024 px** wie `public/brand/goettingen-altstadt-gaenseliesel-partnersuche.webp`, höchstens 450 KB

## Motiv
- Gleicher Stil wie das Göttingen-Bild: Aquarellzeichnung, ruhig, hochwertig, helle Töne.
- Kassel erkennbar: der Herkules über den Kaskaden im Bergpark Wilhelmshöhe, optional mit Schloss Wilhelmshöhe im Vordergrund.
- Keine Logos, Markenzeichen, Schriftzüge, keine erkennbaren realen Personen.
- Der Alt-Text steht schon im Dossier (`heroAlt` in `data/city-profiles/kassel.json`: „Aquarellzeichnung von Kassel mit dem Herkules im Bergpark Wilhelmshöhe“); bei abweichendem Motiv dort anpassen.

## Einbau
In `lib/authored.ts` beim Kassel-Eintrag `heroImage: null` durch `heroImage: "/brand/kassel-herkules-bergpark-partnersuche.webp"` ersetzen (Zeilenenden CRLF erhalten).

## Prüfen
- `npm test`, `npm run lint`, `npm run typecheck`, `npm run build`
- Commit als `Christian M. Haas <christian@datingnischen.de>` (vorher `git var GIT_AUTHOR_IDENT` / `GIT_COMMITTER_IDENT`), nur eigene Pfade stagen, nach `main` pushen
- Prüf-URLs: https://akademikersingles.vercel.app/partnersuche/kassel/ (Bild im Kopf) und https://akademikersingles.vercel.app/partnersuche/ (Kachel Kassel)
- Ergebnis als Kommentar in die Trello-Karte
