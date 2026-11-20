// Stadtdossier Innsbruck ausbauen: Universität seit 1669 und Medizinische Universität in Zahlen,
// Indikatoren der Abgestimmten Erwerbsstatistik 2024, Termine und eigener Stadt-Guide.
import { readFileSync, writeFileSync } from "node:fs";
import { applySources, checkSeo } from "./_sources.mjs";

const file = "data/city-profiles/at/innsbruck.json";
const p = JSON.parse(readFileSync(file, "utf8"));

p.seoTitle = "Akademiker Singles in Innsbruck: 31.677 Studierende";
p.seoDescription = "Innsbruck in Zahlen: 29,7 % mit Hochschulabschluss, 31.677 Studierende an zwei Universitäten, 48,2 % Einpersonenhaushalte.";
p.eyebrow = "Partnersuche für Akademiker · Universitätsstadt zwischen Nordkette und Inn";
p.lead = "Eine Universität, die Kaiser Leopold I. 1669 gegründet und über eine Sondersteuer auf Haller Salz finanziert hat, dazu die Medizinische Universität und das Management Center: In Innsbruck haben 29,7 Prozent der Menschen ab 15 Jahren einen Hochschul-, Akademie- oder Kollegabschluss – nach Graz der höchste Wert Österreichs. 48,8 Prozent der 20- bis 24-Jährigen sind in Ausbildung, 48,2 Prozent der Haushalte bestehen aus einer Person. Und über allem steht eine Bergkette, die jedes zweite Date mitbestimmt.";

p.briefing = [
  { value: "29,7 %", label: "der Einwohnerinnen und Einwohner ab 15 Jahren haben einen Hochschul-, Akademie- oder Kollegabschluss – österreichweit 17,6 %", source: "aest-gemeinde" },
  { value: "31.677", label: "Studierende an Universität und Medizinischer Universität Innsbruck", source: "uni-stud", note: "Wintersemester 2025/26, berechnet; MCI, UMIT Tirol und Pädagogische Hochschule kommen dazu" },
  { value: "48,2 %", label: "aller Haushalte in Innsbruck sind Einpersonenhaushalte", source: "aest-indikatoren" },
];

p.kpis = [
  { value: "132.166", label: "Einwohnerinnen und Einwohner in Innsbruck", source: "aest-gemeinde", note: "Abgestimmte Erwerbsstatistik 2024, Stichtag 31.10.2024" },
  { value: "110.030", label: "Beschäftigte in Innsbrucker Arbeitsstätten", source: "aest-gemeinde", note: "14.661 Arbeitsstätten, 12.345 Unternehmen; 92,8 % der Arbeitsstätten im tertiären Sektor" },
  { value: "27.793", label: "Studierende an der Universität Innsbruck", source: "uni-stud", note: "Wintersemester 2025/26; die Medizinische Universität Innsbruck zählt weitere 3.884" },
  { value: "40,6 %", label: "Tertiärquote der Männer ab 25 Jahren (Frauen: 39,2 %)", source: "aest-indikatoren", note: "ISCED 2011, Abgestimmte Erwerbsstatistik 2024; Tirol 29,7 % (Männer) und 26,3 % (Frauen)" },
];

p.dossier = [
  {
    key: "bildung",
    title: "Bildung",
    intro: "Seit 1669 Universitätsstadt – und bis heute das akademische Zentrum Westösterreichs: Fast jede zweite Person zwischen 20 und 24 ist in Ausbildung.",
    metrics: [
      { value: "29,7 %", label: "der Einwohnerinnen und Einwohner ab 15 Jahren haben einen Hochschul-, Akademie- oder Kollegabschluss", source: "aest-gemeinde", note: "Abgestimmte Erwerbsstatistik 2024; Tirol 16,3 %, Österreich 17,6 %. Nur Graz liegt mit 30,7 % höher", compare: { city: 29.7, germany: 17.6, unit: " %", max: 36 } },
      { value: "48,8 %", label: "der 20- bis 24-Jährigen sind in weiterführender Ausbildung", source: "aest-indikatoren", note: "Abgestimmte Erwerbsstatistik 2024; Österreich 33,5 %, Tirol 32,0 %. Innsbruck liegt damit knapp hinter Graz (50,5 %)", compare: { city: 48.8, germany: 33.5, unit: " %", max: 60 } },
      { value: "31.677", label: "Studierende an den beiden öffentlichen Universitäten", source: "uni-stud", note: "Wintersemester 2025/26, berechnet: Universität Innsbruck 27.793 und Medizinische Universität Innsbruck 3.884; dazu kommen MCI Management Center Innsbruck, UMIT Tirol und die Pädagogische Hochschule Tirol" },
    ],
    takeaway: "Auf 132.166 Einwohner kommen über 31.000 Universitätsstudierende – statistisch jeder vierte Mensch in dieser Stadt studiert.",
  },
  {
    key: "beruf",
    title: "Beruf & Erfolg",
    intro: "Universität, Klinik, Tourismus und Verwaltung: Innsbruck ist das Arbeitszentrum Tirols und zieht Beschäftigte aus dem ganzen Inntal an.",
    metrics: [
      { value: "110.030", label: "Beschäftigte in Innsbrucker Arbeitsstätten", source: "aest-gemeinde", note: "14.661 Arbeitsstätten; Beschäftigungsverhältnisse am Arbeitsort, Stichtag 31.10.2024" },
      { value: "152", label: "Einpendelnde je 100 Auspendelnde", source: "aest-indikatoren", note: "Pendlersaldo nach der Abgestimmten Erwerbsstatistik 2024; nur 28,3 % der Innsbrucker Erwerbstätigen pendeln aus der Stadt aus", compare: { city: 151.8, germany: 118.4, unit: "", max: 200, cityLabel: "Innsbruck", compareLabel: "Wien" } },
      { value: "31,9 %", label: "der Bevölkerung haben keine österreichische Staatsangehörigkeit", source: "aest-gemeinde", note: "Abgestimmte Erwerbsstatistik 2024; Tirol 18,9 %, Österreich 20,0 %. Hochschulen, Klinik und Tourismus bringen viele Menschen aus dem Ausland in die Stadt" },
    ],
    takeaway: "Viele Lebensläufe verbinden hier Beruf und Berg – wer das nicht teilt, sollte zumindest Verständnis dafür mitbringen.",
  },
  {
    key: "wohnen",
    title: "Wohnen & Alltag",
    intro: "Wenig Fläche zwischen den Bergen, hohe Nachfrage, kleine Haushalte: Wohnen ist in Innsbruck das Thema, über das alle reden.",
    metrics: [
      { value: "48,2 %", label: "Einpersonenhaushalte", source: "aest-indikatoren", note: "Abgestimmte Erwerbsstatistik 2024; Tirol 37,3 %, Österreich 38,9 %. 65.658 Privathaushalte mit durchschnittlich 1,93 Personen", compare: { city: 48.2, germany: 38.9, unit: " %", max: 55 } },
      { value: "68,2 %", label: "Mietquote der Hauptwohnsitzwohnungen", source: "aest-indikatoren", note: "Abgestimmte Erwerbsstatistik 2024; Tirol 38,1 %, Österreich 45,3 %. Die durchschnittliche Wohnfläche liegt bei 74,2 Quadratmetern (Österreich 96,7)", compare: { city: 68.2, germany: 45.3, unit: " %", max: 85 } },
      { value: "23", label: "Minuten durchschnittliche Wegzeit zur Arbeit", source: "aest-indikatoren", note: "Abgestimmte Erwerbsstatistik 2024; durchschnittliche Pendeldistanz 29,9 Straßenkilometer – das Inntal zieht sich" },
    ],
    takeaway: "Kleine Wohnung, großer Außenraum: In Innsbruck spielt sich das Leben ohnehin draußen ab.",
  },
  {
    key: "singles",
    title: "Single-Leben",
    intro: "Jung, studentisch geprägt – und mit einem spürbaren Männerüberschuss in der Altersgruppe zwischen 30 und 49.",
    metrics: [
      { value: "110", label: "Männer je 100 Frauen zwischen 30 und 49 Jahren", source: "bev-alter", note: "20.179 Männer zu 18.434 Frauen am 01.01.2026; in Salzburg sind es 103, in Wien 103", compare: { city: 109.5, germany: 103, unit: "", max: 125, cityLabel: "Innsbruck", compareLabel: "Wien" } },
      { value: "42,8", label: "Jahre Durchschnittsalter – jünger als Tirol (43,4) und Österreich (43,6)", source: "aest-indikatoren", note: "Abgestimmte Erwerbsstatistik 2024, Stichtag 31.10.2024", compare: { city: 42.8, germany: 43.6, unit: " J.", max: 50 } },
      { value: "19,2 %", label: "der Bevölkerung sind 65 Jahre oder älter", source: "aest-gemeinde", note: "Abgestimmte Erwerbsstatistik 2024; Tirol 19,8 %, Österreich 20,2 %. Der Anteil der unter 15-Jährigen liegt mit 11,7 % besonders niedrig – eine Stadt der Studierenden und Berufstätigen" },
    ],
    takeaway: "Für Frauen rechnerisch günstig, für Männer anspruchsvoll – und für beide gilt: Wer die Berge mag, hat hier einen Vorteil.",
  },
];

p.universities = [
  { name: "Universität Innsbruck", kind: "Volluniversität", founded: "1669", students: "27.793", source: "uni-stud", compareSource: "uibk-geschichte", text: "Am 15. Oktober 1669 gründete Kaiser Leopold I. die Universität und sicherte ihre Finanzierung durch eine Sondersteuer auf das Haller Salz, den „Haller Salzaufschlag“; die Vorgeschichte reicht bis zum Jesuitengymnasium von 1562 zurück. 1677 folgte die Errichtungsurkunde mit vier Fakultäten – heute ist sie die größte Hochschule Westösterreichs." },
  { name: "Medizinische Universität Innsbruck", kind: "Medizinische Universität", students: "3.884", source: "uni-stud", text: "Mit der Universitätsklinik verbunden und damit einer der größten Arbeitgeber Tirols. Wer hier arbeitet, lebt in Dienstplänen – und trifft Kolleginnen und Kollegen aus halb Europa." },
  { name: "MCI Management Center Innsbruck", kind: "Unternehmerische Hochschule", students: "", source: "ibk-zahlen", text: "Wirtschaft, Technik und Tourismus, stark international und berufsbegleitend organisiert. Das MCI bringt ein älteres, berufserfahrenes Publikum in die Hochschullandschaft der Stadt." },
  { name: "UMIT Tirol und Pädagogische Hochschule Tirol", kind: "Privatuniversität und Pädagogische Hochschule", students: "", source: "ibk-zahlen", text: "Gesundheitswissenschaften in Hall in Tirol und die Lehrerinnen- und Lehrerbildung in Innsbruck ergänzen das Angebot. Zusammen sorgen sie dafür, dass in Tirol fast jeder akademische Beruf vor Ort erlernt werden kann." },
];
p.universitiesNote = "Studierende an den öffentlichen Universitäten im Wintersemester 2025/26; MCI, UMIT Tirol und Pädagogische Hochschule sind nicht enthalten.";

p.quarters = [
  { name: "Innenstadt & Universitätsviertel", label: "Campus in Gehweite", text: "Zwischen Hauptgebäude, Innrain und Altstadt liegt alles, was Innsbruck akademisch ausmacht. Die Universität verteilt sich über mehrere Standorte, und fast alle sind zu Fuß erreichbar – ein Luxus, den größere Universitätsstädte nicht bieten." },
  { name: "Hötting & Hungerburg", label: "Hangseite im Norden", text: "Über dem Inn steigt die Stadt an: Hötting mit Altbauten und Studierenden-WGs, darüber die Hungerburg mit der Standseilbahn. Wer hier wohnt, hat die Nordkette praktisch vor der Tür." },
  { name: "Wilten & Westbahnhof", label: "Studentisch und dicht", text: "Rund um die Leopoldstraße und das Wiltener Viertel liegen die Lokale, in denen sich Studierende und junge Berufstätige treffen. Günstiger als die Innenstadt, trotzdem alles zu Fuß erreichbar." },
  { name: "Universitätsklinik & Hötting West", label: "Medizinviertel", text: "Rund um die Klinik arbeitet ein großer Teil der medizinischen Berufe Tirols. Schichtdienste bestimmen den Kalender – was Verabredungen unter der Woche zur Planungsaufgabe macht." },
  { name: "Pradl & Reichenau", label: "Östliche Wohnviertel", text: "Dichter bebaut, familiärer, mit mehr Quadratmetern fürs Geld als im Zentrum. Hier zieht hin, wer nach der WG eine eigene Wohnung sucht und auf den Altbau verzichten kann." },
  { name: "Igls & Vill", label: "Über der Stadt", text: "Auf dem Mittelgebirgsplateau südlich der Stadt, mit Olympia-Bobbahn und Patscherkofelbahn. Ruhig, grün und teuer – die Adresse für alle, die beruflich angekommen sind." },
];

p.agenda = [
  { title: "Lange Nacht der Forschung", when: "Alle zwei Jahre", text: "Zuletzt am 24. April 2026 mit über 3.000 Programmpunkten und mehr als 192.000 Besuchenden österreichweit, bei freiem Eintritt; die nächste Ausgabe ist für den 19. Mai 2028 angekündigt. In Innsbruck öffnen dabei Universität, Medizinische Universität und außeruniversitäre Institute ihre Labore.", href: "https://langenachtderforschung.at/" },
  { title: "Innsbrucker Festwochen der Alten Musik", when: "Sommer", text: "Barockoper und Alte Musik an historischen Spielorten – ein Festival mit internationalem Publikum, das die Stadt jeden Sommer für einige Wochen klassisch stimmt.", href: "https://www.altemusik.at/" },
  { title: "Öffentliche Veranstaltungen der Universität Innsbruck", when: "Semesterweise", text: "Vorträge, Ringvorlesungen und Antrittsvorlesungen stehen regelmäßig auch Gästen offen. Ein kostenloser Abend mit Thema – und mit Publikum, das gerne weiterdiskutiert.", href: "https://www.uibk.ac.at/de/" },
  { title: "Nordkettenbahn und Inn-Promenade", when: "Ganzjährig", text: "In 20 Minuten vom Zentrum auf 2.000 Meter: Die Nordkettenbahn ist das Innsbrucker Standardprogramm für ein Treffen, das Eindruck machen soll, ohne gestellt zu wirken. Günstiger und ebenso bewährt: ein Spaziergang am Inn entlang zu den bunten Häusern von Mariahilf." },
];

p.talkingPoints = [
  { title: "Jeder Vierte studiert", text: "31.677 Universitätsstudierende auf 132.166 Einwohner – statistisch studiert fast jede vierte Person in dieser Stadt. Das prägt Lokalszene, Mietmarkt und Altersstruktur. Wer hier über dreißig ist und nicht studiert, ist in Innsbruck fast schon ein Sonderfall." },
  { title: "Der Berg als Beziehungsfrage", text: "In einer Stadt, in der die Nordkette in 20 Minuten erreichbar ist, entscheidet die Haltung zum Wochenende viel. Skitour oder Brunch, Hüttenabend oder Konzert – diese Frage kommt in Innsbruck schneller auf den Tisch als in jeder anderen Landeshauptstadt." },
  { title: "110 zu 100", text: "Auf 100 Frauen zwischen 30 und 49 kommen 110 Männer. Das hat mit technischen und naturwissenschaftlichen Studienrichtungen zu tun, aber auch mit dem Arbeitsmarkt im Inntal. Für Frauen heißt das mehr Auswahl, für Männer: Ein Profil, das über „Berge und Reisen“ hinausgeht, fällt sofort auf." },
];

p.faq = [
  { question: "Wie viele Akademiker leben in Innsbruck?", answer: "29,7 Prozent der Einwohnerinnen und Einwohner ab 15 Jahren haben einen Hochschul-, Akademie- oder Kollegabschluss – nach Graz der höchste Wert Österreichs (Abgestimmte Erwerbsstatistik 2024; Tirol 16,3 Prozent). Die Tertiärquote ab 25 Jahren liegt bei 40,6 Prozent (Männer) und 39,2 Prozent (Frauen)." },
  { question: "Seit wann gibt es die Universität Innsbruck?", answer: "Kaiser Leopold I. gründete sie am 15. Oktober 1669 und finanzierte sie über eine Sondersteuer auf das Haller Salz, den sogenannten Haller Salzaufschlag. Die Vorgeschichte reicht bis zum Jesuitengymnasium von 1562 zurück; 1677 folgte die Errichtungsurkunde mit vier Fakultäten." },
  { question: "Wie viele Studierende hat Innsbruck?", answer: "An den öffentlichen Universitäten sind es im Wintersemester 2025/26 zusammen 31.677: 27.793 an der Universität Innsbruck und 3.884 an der Medizinischen Universität. Dazu kommen das MCI Management Center Innsbruck, die UMIT Tirol in Hall und die Pädagogische Hochschule Tirol." },
  { question: "Gibt es in Innsbruck mehr Männer oder Frauen?", answer: "In der Altersgruppe 30 bis 49 kommen auf 100 Frauen 110 Männer (20.179 zu 18.434 am 01.01.2026). In Salzburg und Wien liegt der Wert bei 103, in Graz bei 109. Technische und naturwissenschaftliche Studienrichtungen sowie der Tiroler Arbeitsmarkt erklären den Unterschied." },
  { question: "Gibt es in Innsbruck viele Singles?", answer: "48,2 Prozent der Haushalte sind Einpersonenhaushalte (Tirol 37,3 Prozent, Österreich 38,9 Prozent), bei 65.658 Privathaushalten mit durchschnittlich 1,93 Personen. Alleinlebend heißt nicht automatisch Single, zeigt aber, wie stark die Stadt von Studierenden und Berufstätigen geprägt ist." },
  { question: "Wo lernen Akademiker in Innsbruck Singles kennen?", answer: "Bei öffentlichen Vorträgen und Ringvorlesungen der Universität, bei der Langen Nacht der Forschung, im Sommer bei den Festwochen der Alten Musik, in den Lokalen in Wilten, am Inn-Ufer in Mariahilf oder auf der Nordkette. Wer gezielt Menschen mit ähnlichem Bildungshintergrund sucht, findet sie bei AkademikerSingles: Jedes Profil wird manuell geprüft." },
  { question: "Ist die Anmeldung kostenlos?", answer: "Ja. Die Registrierung ist kostenfrei und beinhaltet die Basis-Mitgliedschaft. Damit legen Sie Ihr Profil an, nutzen den Fragenflirt und antworten kostenlos auf Nachrichten von Premium-Mitgliedern." },
];

p.guide = [
  {
    title: "Eine Universitätsstadt mit Bergkulisse – und mit Statistik",
    html: "<p>Innsbruck hat 132.166 Einwohnerinnen und Einwohner und 31.677 Studierende an den beiden öffentlichen Universitäten. Rechnerisch studiert damit fast jede vierte Person in dieser Stadt. 48,8 Prozent der 20- bis 24-Jährigen sind in weiterführender Ausbildung, 29,7 Prozent der Menschen ab 15 Jahren haben einen Hochschul-, Akademie- oder Kollegabschluss – nach Graz der höchste Wert des Landes.</p><p>Dazu kommt ein Detail, das den Alltag stärker prägt als jede Bildungsstatistik: Der Anteil der unter 15-Jährigen liegt bei 11,7 Prozent, der niedrigste Wert aller Landeshauptstädte. Innsbruck ist eine Stadt der Studierenden und Berufstätigen, nicht der Familien – zumindest innerhalb des Stadtgebiets.</p><p>Für die Partnersuche heißt das: Das Umfeld ist jung, akademisch und mobil. Viele bleiben für ein Studium drei bis fünf Jahre und ziehen dann weiter. Wer bleiben will, sagt das besser früh – und fragt genauso früh nach.</p>",
  },
  {
    title: "1669, Leopold I. und das Haller Salz",
    html: "<p>Die Gründungsgeschichte der Universität ist in Innsbruck Allgemeinwissen: Am 15. Oktober 1669 gründete Kaiser Leopold I. die Universität und sicherte ihre Finanzierung durch eine Sondersteuer auf das Haller Salz, den „Haller Salzaufschlag“. 1677 folgte die Errichtungsurkunde mit vier Fakultäten, die Vorgeschichte reicht bis zum Jesuitengymnasium von 1562 zurück.</p><p>Heute ist die Universität Innsbruck mit 27.793 Studierenden die größte Hochschule Westösterreichs, daneben steht die Medizinische Universität mit 3.884 Studierenden und der Universitätsklinik als einem der größten Arbeitgeber Tirols. Ergänzt wird das durch das MCI Management Center Innsbruck, die UMIT Tirol in Hall und die Pädagogische Hochschule.</p><p>Was das praktisch bedeutet: In Innsbruck trifft man auf Geistes- und Naturwissenschaften, Medizin, Wirtschaft und Technik in einer Dichte, die für eine Stadt dieser Größe ungewöhnlich ist – und auf viele Menschen, die ihr Fach als Teil ihrer Identität verstehen.</p>",
  },
  {
    title: "Der Männerüberschuss und was daraus folgt",
    html: "<p>Auf 100 Frauen zwischen 30 und 49 kommen in Innsbruck 110 Männer (20.179 zu 18.434). Zum Vergleich: In Salzburg und Wien liegt der Wert bei 103, in Graz bei 109. Die Gründe sind ähnlich wie in anderen Technik- und Industriestandorten – naturwissenschaftliche Studienrichtungen, Bauwirtschaft, Tourismusmanagement.</p><p>Für Frauen bedeutet das rechnerisch mehr Auswahl, aber auch mehr Nachrichten, die sich ähneln. Für Männer bedeutet es, dass Austauschbarkeit das größte Risiko ist: „Berge, Sport und Reisen“ steht in Innsbruck in sehr vielen Profilen. Wer stattdessen konkret schreibt – welche Tour, welches Projekt, welche Frage gerade beschäftigt – fällt sofort auf.</p><p>Und noch ein Detail aus der Statistik: 31,9 Prozent der Innsbruckerinnen und Innsbrucker haben keine österreichische Staatsangehörigkeit, deutlich mehr als in Tirol insgesamt (18,9 Prozent). Die Stadt ist internationaler, als die Postkartenansicht vermuten lässt.</p>",
  },
  {
    title: "Wohnen zwischen Hang und Inn",
    html: "<p>48,2 Prozent der Haushalte bestehen aus einer Person, die Mietquote liegt bei 68,2 Prozent, die durchschnittliche Wohnfläche bei 74,2 Quadratmetern – gegenüber 96,7 im Bundesschnitt. Der Grund ist Geografie: Zwischen Nordkette und Patscherkofel ist der Platz begrenzt, die Nachfrage aber hoch.</p><p>Die Viertel sind schnell erklärt. Innenstadt und Universitätsviertel sind zentral und teuer, Hötting steigt den Hang hinauf und ist studentisch geprägt, Wilten rund um die Leopoldstraße ist dicht und lebendig, Pradl und Reichenau im Osten bieten mehr Fläche fürs Geld, Igls und Vill auf dem Mittelgebirge sind ruhig und gehoben.</p><p>Die gute Nachricht für Verabredungen: Fast alles ist zu Fuß oder mit dem Rad erreichbar, die durchschnittliche Wegzeit zur Arbeit beträgt 23 Minuten. Wer in Innsbruck wohnt, verbringt den Abend nicht auf der Straße.</p>",
  },
  {
    title: "Was man hier gemeinsam macht",
    html: "<p>Das naheliegendste Programm ist auch das beste: In 20 Minuten bringt die Nordkettenbahn vom Zentrum auf rund 2.000 Meter. Für ein erstes Treffen ist das mutig, für ein zweites nahezu unschlagbar. Günstiger und ebenso bewährt ist der Spaziergang am Inn entlang zu den bunten Häusern von Mariahilf.</p><p>Akademisch wird es bei den öffentlichen Vorträgen und Ringvorlesungen der Universität, die regelmäßig auch Gästen offenstehen, und alle zwei Jahre bei der Langen Nacht der Forschung – zuletzt am 24. April 2026 mit über 3.000 Programmpunkten österreichweit und mehr als 192.000 Besuchenden bei freiem Eintritt. Nächster Termin: 19. Mai 2028.</p><p>Im Sommer kommen die Innsbrucker Festwochen der Alten Musik dazu, mit Barockoper an historischen Spielorten. Und im Winter übernimmt ohnehin der Berg: Wer in Innsbruck jemanden kennenlernt, sollte wissen, wie er oder sie zum Schnee steht.</p>",
  },
  {
    title: "Was die Zahlen nicht sagen",
    html: "<p>Die Werte dieser Seite stammen aus der Abgestimmten Erwerbsstatistik 2024 (Stichtag 31. Oktober 2024), der Bevölkerungsstatistik zum 1. Januar 2026 und der Hochschulstatistik für das Wintersemester 2025/26. Die Studierendenzahlen umfassen nur die öffentlichen Universitäten; MCI, UMIT und Pädagogische Hochschule kommen dazu.</p><p>Die hohe Akademikerquote von 29,7 Prozent ist zum Teil ein Effekt der Studierenden selbst, und das Geschlechterverhältnis von 110 zu 100 ist ein Durchschnitt über zwanzig Jahrgänge – in einzelnen Milieus sieht es ganz anders aus. Ein Einpersonenhaushalt ist zudem kein Beziehungsstatus.</p><p>Was bleibt: Innsbruck ist jung, akademisch dicht, international und klein genug, dass man sich zweimal über den Weg läuft. Dafür ist der Wohnungsmarkt eng und die Fluktuation hoch. Wer hier sucht, sollte beides einkalkulieren – und die Bergfrage nicht unterschätzen.</p>",
  },
];

applySources(p, {
  "bev-alter": { publisher: "Statistik Austria", title: "Bevölkerungsstand zu Jahresbeginn 2026 nach Gemeinde, Alter in Einzeljahren und Geschlecht (Open Government Data, Datensatz OGD_bevstandjbab2002_BevStand_2026)", stand: "Stand 01.01.2026", url: "https://data.statistik.gv.at/web/meta.jsp?dataset=OGD_bevstandjbab2002_BevStand_2026" },
  "uni-stud": { publisher: "Statistik Austria", title: "Studierende an öffentlichen Universitäten nach Uni (Open Government Data, Datensatz OGD_unistud3_ext_UNI_STUD3_1)", stand: "Wintersemester 2025/26", url: "https://data.statistik.gv.at/web/meta.jsp?dataset=OGD_unistud3_ext_UNI_STUD3_1" },
  "uibk-geschichte": { publisher: "Universität Innsbruck", title: "Geschichte der Universität Innsbruck: Gründung am 15. Oktober 1669 durch Kaiser Leopold I., Finanzierung über den „Haller Salzaufschlag“, Errichtungsurkunde 1677 mit vier Fakultäten, Vorgeschichte ab 1562", stand: "abgerufen 11/2026", url: "https://www.uibk.ac.at/de/universitaet/profil/geschichte/" },
});

checkSeo(p);
writeFileSync(file, JSON.stringify(p, null, 1) + "\n");
console.log("Innsbruck geschrieben:", p.sources.length, "Quellen,", p.guide.length, "Guide-Kapitel,", p.universities.length, "Hochschulen");
