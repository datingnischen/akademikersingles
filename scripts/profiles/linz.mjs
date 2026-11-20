// Stadtdossier Linz ausbauen: JKU und Kunstuniversität in Zahlen, Indikatoren der Abgestimmten
// Erwerbsstatistik 2024 (Einpersonenhaushalte, Mietquote, Pendlersaldo), Termine und eigener Stadt-Guide.
import { readFileSync, writeFileSync } from "node:fs";
import { applySources, checkSeo } from "./_sources.mjs";

const file = "data/city-profiles/at/linz.json";
const p = JSON.parse(readFileSync(file, "utf8"));

p.seoTitle = "Akademiker Singles in Linz: JKU, Technik und Zahlen";
p.seoDescription = "Linz in Zahlen: 48,5 % Einpersonenhaushalte – Österreichs Höchstwert, 28.680 Studierende, 173 Einpendler je 100 Auspendler. Alles belegt.";
p.eyebrow = "Partnersuche für Akademiker · Universitätsstadt an der Donau";
p.lead = "Linz hat den höchsten Anteil an Einpersonenhaushalten aller österreichischen Landeshauptstädte: 48,5 Prozent. Dazu kommen 28.680 Studierende an JKU und Kunstuniversität, 198.306 Arbeitsplätze bei 213.297 Einwohnern und der stärkste Pendlersaldo des Landes – auf 100 Auspendelnde kommen 173 Einpendelnde. Eine Stadt, die arbeitet, forscht und in der viele Menschen allein wohnen: Dieses Dossier zeigt mit amtlichen Zahlen, wen Sie hier treffen.";

p.briefing = [
  { value: "48,5 %", label: "aller Haushalte sind Einpersonenhaushalte – der höchste Wert aller Landeshauptstädte", source: "aest-indikatoren" },
  { value: "28.680", label: "Studierende an Johannes Kepler Universität und Kunstuniversität Linz", source: "uni-stud", note: "Wintersemester 2025/26, berechnet; Fachhochschulen und Privatuniversitäten kommen dazu" },
  { value: "20,4 %", label: "der Einwohnerinnen und Einwohner ab 15 Jahren haben einen Hochschul-, Akademie- oder Kollegabschluss – österreichweit 17,6 %", source: "aest-gemeinde" },
];

p.kpis = [
  { value: "213.297", label: "Einwohnerinnen und Einwohner in Linz", source: "aest-gemeinde", note: "Abgestimmte Erwerbsstatistik 2024, Stichtag 31.10.2024" },
  { value: "198.306", label: "Beschäftigte in Linzer Arbeitsstätten", source: "aest-gemeinde", note: "17.769 Arbeitsstätten, 14.840 Unternehmen; fast so viele Arbeitsplätze wie Einwohner" },
  { value: "26.917", label: "Studierende an der Johannes Kepler Universität", source: "uni-stud", note: "Wintersemester 2025/26; die Kunstuniversität Linz zählt weitere 1.763" },
  { value: "173", label: "Einpendelnde je 100 Auspendelnde", source: "aest-indikatoren", note: "Pendlersaldo nach der Abgestimmten Erwerbsstatistik 2024 – der höchste Wert aller Landeshauptstädte" },
];

p.dossier = [
  {
    key: "bildung",
    title: "Bildung",
    intro: "Linz ist eine späte Universitätsstadt: Die JKU wurde erst 1966 eröffnet – heute ist sie mit 26.917 Studierenden eine der größten Hochschulen Österreichs.",
    metrics: [
      { value: "20,4 %", label: "der Einwohnerinnen und Einwohner ab 15 Jahren haben einen Hochschul-, Akademie- oder Kollegabschluss", source: "aest-gemeinde", note: "Abgestimmte Erwerbsstatistik 2024; Oberösterreich 13,8 %, Österreich 17,6 %", compare: { city: 20.4, germany: 17.6, unit: " %", max: 28 } },
      { value: "32,7 %", label: "Tertiärquote der Männer ab 25 Jahren (Frauen: 29,3 %)", source: "aest-indikatoren", note: "ISCED 2011, Abgestimmte Erwerbsstatistik 2024; Oberösterreich 29,9 % (Männer) und 24,4 % (Frauen)", compare: { city: 32.7, germany: 31.8, unit: " %", max: 46 } },
      { value: "28.680", label: "Studierende an den beiden öffentlichen Universitäten", source: "uni-stud", note: "Wintersemester 2025/26, berechnet: Johannes Kepler Universität 26.917 und Universität für künstlerische und industrielle Gestaltung Linz 1.763; dazu kommen die Fachhochschule Oberösterreich und die Anton Bruckner Privatuniversität" },
    ],
    takeaway: "Technik, Wirtschaft, Recht und Medizin an einem Campus: In Linz studiert man zielgerichtet – und bleibt danach oft in der Region.",
  },
  {
    key: "beruf",
    title: "Beruf & Erfolg",
    intro: "Industrie, Technik und Dienstleistung: Linz hat fast so viele Arbeitsplätze wie Einwohner und zieht Beschäftigte aus ganz Oberösterreich an.",
    metrics: [
      { value: "198.306", label: "Beschäftigte in Linzer Arbeitsstätten", source: "aest-gemeinde", note: "17.769 Arbeitsstätten; Beschäftigungsverhältnisse am Arbeitsort, Stichtag 31.10.2024" },
      { value: "173", label: "Einpendelnde je 100 Auspendelnde – Höchstwert unter den Landeshauptstädten", source: "aest-indikatoren", note: "Abgestimmte Erwerbsstatistik 2024; 32,8 % der Linzer Erwerbstätigen pendeln aus, die durchschnittliche Wegzeit liegt bei 20 Minuten", compare: { city: 173.8, germany: 118.4, unit: "", max: 200 } },
      { value: "57,0 %", label: "der Studierenden unter 30 sind erwerbstätig", source: "aest-indikatoren", note: "Abgestimmte Erwerbsstatistik 2024; Österreich 56,1 %. Der Softwarepark Hagenberg und die Industrie bieten viele studienbegleitende Stellen", compareSource: "jku-geschichte" },
    ],
    takeaway: "Wer in Linz arbeitet, arbeitet oft an etwas Konkretem – Maschinen, Software, Patienten. Das macht Gespräche angenehm greifbar.",
  },
  {
    key: "wohnen",
    title: "Wohnen & Alltag",
    intro: "Nirgends in Österreich leben anteilig mehr Menschen allein, und nur Wien hat eine höhere Mietquote.",
    metrics: [
      { value: "48,5 %", label: "Einpersonenhaushalte – Höchstwert aller Landeshauptstädte", source: "aest-indikatoren", note: "Abgestimmte Erwerbsstatistik 2024; Österreich 38,9 %, Oberösterreich 35,9 %. 107.150 Privathaushalte mit durchschnittlich 1,94 Personen", compare: { city: 48.5, germany: 38.9, unit: " %", max: 55 } },
      { value: "77,3 %", label: "Mietquote der Hauptwohnsitzwohnungen – nach Wien der zweithöchste Wert", source: "aest-indikatoren", note: "Abgestimmte Erwerbsstatistik 2024; Oberösterreich 39,0 %, Österreich 45,3 %", compare: { city: 77.3, germany: 45.3, unit: " %", max: 85 } },
      { value: "20", label: "Minuten durchschnittliche Wegzeit zur Arbeit – kürzeste unter den größeren Landeshauptstädten nach Wien", source: "aest-indikatoren", note: "Abgestimmte Erwerbsstatistik 2024; durchschnittliche Pendeldistanz 21,1 Straßenkilometer" },
    ],
    takeaway: "Eigene Wohnung, kurzer Arbeitsweg, viel Zeit am Abend – die Rahmenbedingungen fürs Kennenlernen sind hier besser als der Ruf der Stadt.",
  },
  {
    key: "singles",
    title: "Single-Leben",
    intro: "Jünger als Oberösterreich, mit hohem Anteil Alleinlebender und einem leichten Männerüberschuss.",
    metrics: [
      { value: "42,3", label: "Jahre Durchschnittsalter – jünger als Oberösterreich (43,3) und Österreich (43,6)", source: "aest-indikatoren", note: "Abgestimmte Erwerbsstatistik 2024, Stichtag 31.10.2024", compare: { city: 42.3, germany: 43.6, unit: " J.", max: 50 } },
      { value: "109", label: "Männer je 100 Frauen zwischen 30 und 49 Jahren", source: "bev-alter", note: "31.802 Männer zu 29.175 Frauen am 01.01.2026; in Wien sind es 103, in Salzburg 103", compare: { city: 109, germany: 103, unit: "", max: 125 } },
      { value: "29,9 %", label: "der Bevölkerung haben keine österreichische Staatsangehörigkeit", source: "aest-gemeinde", note: "Abgestimmte Erwerbsstatistik 2024; Oberösterreich 16,2 %. Linz ist internationaler, als es von außen wirkt" },
    ],
    takeaway: "Viele sind für die Arbeit hergezogen und suchen Anschluss – ein ehrliches Profil wirkt hier schneller als Inszenierung.",
  },
];

p.universities = [
  { name: "Johannes Kepler Universität Linz", kind: "Volluniversität mit Technik, Wirtschaft, Recht und Medizin", founded: "1966", students: "26.917", source: "uni-stud", compareSource: "jku-geschichte", text: "Am 8. Oktober 1966 als Hochschule für Sozial- und Wirtschaftswissenschaften eröffnet, heute mit Technik, Recht und Medizin eine Volluniversität. 1990 startete hier das weltweit erste reine Mechatronikstudium; aus dem Forschungsinstitut für Symbolisches Rechnen entstand ab 1987 der Softwarepark Hagenberg." },
  { name: "Universität für künstlerische und industrielle Gestaltung", kind: "Kunstuniversität", students: "1.763", source: "uni-stud", text: "Die Kunstuniversität Linz verbindet Gestaltung, Architektur und Medienkunst – und ist einer der Gründe, warum in Linz das Ars Electronica Festival und nicht in einer größeren Stadt stattfindet." },
  { name: "Fachhochschule Oberösterreich", kind: "Fachhochschule, Campus Linz und Hagenberg", students: "", source: "linz-hochschulen", text: "Gesundheit und Soziales in Linz, Informatik und Medien in Hagenberg: Die FH Oberösterreich bringt berufsnahe Studiengänge und ein deutlich älteres Durchschnittspublikum als die Universität." },
  { name: "Anton Bruckner Privatuniversität", kind: "Privatuniversität für Musik, Schauspiel und Tanz", students: "", source: "linz-hochschulen", text: "Im Neubau am Pöstlingberg-Hang ausgebildet, prägt die Bruckneruni das Konzertleben der Stadt – vom Brucknerhaus bis zu kleinen Bühnen in der Altstadt." },
];
p.universitiesNote = "Studierende an den öffentlichen Universitäten im Wintersemester 2025/26; Mehrfachzählung bei Studium an mehreren Universitäten möglich.";

p.quarters = [
  { name: "Auhof & Dornach", label: "Universitätscampus", text: "Der JKU-Campus im Nordosten mit Teichen, Mensa und Science Park: ein eigener kleiner Stadtteil, in dem 26.917 Studierende ein- und ausgehen. Die Straßenbahnlinie 1 verbindet ihn direkt mit der Innenstadt." },
  { name: "Innenstadt & Landstraße", label: "Zentrum", text: "Hauptplatz, Landstraße, Altstadtviertel: Hier liegen Lokale, Kinos und das Brucknerhaus in Gehweite. Für ein erstes Treffen in Linz ist der Hauptplatz mit dem Blick auf die Donau der naheliegende Startpunkt." },
  { name: "Urfahr & Pöstlingberg", label: "Nördliche Donauseite", text: "Über die Nibelungenbrücke beginnt ein anderes Linz: das Ars Electronica Center am Ufer, darüber der Pöstlingberg mit Bergbahn und Aussicht. Beliebt bei allen, die Stadtnähe und Grün verbinden wollen." },
  { name: "Industrielinz & Hafen", label: "Arbeit und Umbau", text: "Zwischen Stahlwerk, Hafen und Tabakfabrik liegt das Linz, das die Stadt groß gemacht hat – und das sich seit Jahren neu erfindet. Die Tabakfabrik ist heute Kreativquartier mit Veranstaltungen und Gastronomie." },
  { name: "Froschberg & Bindermichl", label: "Wohnviertel im Süden", text: "Ruhiger, grüner und mit mehr Quadratmetern fürs Geld als die Innenstadt. Hier zieht hin, wer nach der ersten eigenen Wohnung Platz braucht – und trotzdem in 20 Minuten im Büro sein will." },
  { name: "Hagenberg", label: "Softwarepark im Mühlviertel", text: "Keine halbe Stunde nördlich liegt der Softwarepark Hagenberg, der ab 1987 um das Forschungsinstitut für Symbolisches Rechnen entstand: Institute, Fachhochschule und IT-Unternehmen an einem Ort.", source: "jku-geschichte" },
];

p.agenda = [
  { title: "Ars Electronica Festival", when: "September", text: "Das weltweit bekannteste Festival für Kunst, Technologie und Gesellschaft findet seit Jahrzehnten in Linz statt – die nächste Ausgabe vom 8. bis 12. September 2027. Fünf Tage, an denen die ganze Stadt zum Ausstellungsraum wird.", href: "https://ars.electronica.art/festival/de/" },
  { title: "Kepler Salon", when: "Mehrmals im Monat, Innenstadt", text: "Der Wissenschaftssalon der JKU bringt seit über fünfzehn Jahren Forschung, Kultur und Gesellschaft in einen Raum – seit 2024 unter neuer Intendanz, mit Beteiligung des Publikums statt Frontalvortrag. Das vielleicht beste akademische Date der Stadt.", href: "https://www.kepler-salon.at/" },
  { title: "Lange Nacht der Forschung", when: "Alle zwei Jahre", text: "Zuletzt am 24. April 2026, österreichweit mit über 3.000 Programmpunkten und mehr als 192.000 Besuchenden bei freiem Eintritt; die nächste Ausgabe ist für den 19. Mai 2028 angekündigt. In Linz öffnen dabei auch Industrie- und Technologielabore.", href: "https://langenachtderforschung.at/" },
  { title: "Donaulände und Pöstlingbergbahn", when: "Ganzjährig", text: "Spaziergang an der Donaulände, dann mit der steilsten Adhäsionsbahn Europas hinauf auf den Pöstlingberg: ein Nachmittag, der ohne Programmdruck auskommt und trotzdem etwas hermacht." },
];

p.talkingPoints = [
  { title: "Die Stadt der Alleinwohnenden", text: "48,5 Prozent der Linzer Haushalte bestehen aus einer Person – mehr als in jeder anderen Landeshauptstadt, mehr sogar als in Wien (45,3 Prozent). Alleinleben ist hier Normalität, nicht Übergangszustand. Das macht Verabredungen unkompliziert und die Frage nach dem Zusammenziehen zu einer bewussten Entscheidung." },
  { title: "Vom Stahl zur Software", text: "Linz war jahrzehntelang Industriestadt und ist heute ein Technologiestandort mit JKU, Softwarepark Hagenberg und Ars Electronica. Wer hier aufgewachsen ist, erzählt diese Verwandlung meistens anhand der eigenen Familie – ein Gesprächsthema, das sofort Tiefe hat." },
  { title: "173 zu 100", text: "Auf 100 Auspendelnde kommen 173 Einpendelnde: Tagsüber ist Linz deutlich größer als nachts. Beim Kennenlernen heißt das, früh zu klären, ob das Gegenüber in der Stadt wohnt oder nur arbeitet – das entscheidet über jeden Feierabendplan." },
];

p.faq = [
  { question: "Wie viele Akademiker leben in Linz?", answer: "20,4 Prozent der Einwohnerinnen und Einwohner ab 15 Jahren haben einen Hochschul-, Akademie- oder Kollegabschluss (Abgestimmte Erwerbsstatistik 2024; Oberösterreich 13,8 Prozent, Österreich 17,6 Prozent). Die Tertiärquote ab 25 Jahren liegt bei 32,7 Prozent (Männer) und 29,3 Prozent (Frauen)." },
  { question: "Wie viele Studierende hat Linz?", answer: "An der Johannes Kepler Universität studieren im Wintersemester 2025/26 26.917 Menschen, an der Universität für künstlerische und industrielle Gestaltung 1.763 – zusammen 28.680. Dazu kommen die Fachhochschule Oberösterreich mit Standorten in Linz und Hagenberg sowie die Anton Bruckner Privatuniversität." },
  { question: "Warum leben in Linz so viele Menschen allein?", answer: "48,5 Prozent der Haushalte sind Einpersonenhaushalte – der höchste Wert aller Landeshauptstädte (Österreich 38,9 Prozent). Gründe sind der hohe Mietwohnungsanteil von 77,3 Prozent, die Zuwanderung wegen Arbeitsplätzen und die vielen Studierenden. Alleinlebend heißt dabei nicht automatisch Single." },
  { question: "Gibt es in Linz mehr Männer oder Frauen?", answer: "In der Altersgruppe 30 bis 49 kommen auf 100 Frauen 109 Männer (31.802 zu 29.175 am 01.01.2026). Der Überschuss hängt mit technischen Studienrichtungen und der Industrie zusammen. In Wien und Salzburg liegt der Wert bei 103." },
  { question: "Wo lernen Akademiker in Linz Singles kennen?", answer: "Im Kepler Salon der JKU, beim Ars Electronica Festival im September, bei der Langen Nacht der Forschung, in der Tabakfabrik, am Donauufer oder auf dem Pöstlingberg. Wer gezielt Menschen mit ähnlichem Bildungshintergrund sucht, findet sie bei AkademikerSingles: Jedes Profil wird manuell geprüft." },
  { question: "Was macht die JKU besonders?", answer: "Sie wurde erst am 8. Oktober 1966 als Hochschule für Sozial- und Wirtschaftswissenschaften eröffnet und ist heute eine Volluniversität mit Technik, Recht und Medizin. 1990 startete hier das weltweit erste reine Mechatronikstudium, und aus dem Forschungsinstitut für Symbolisches Rechnen entwickelte sich ab 1987 der Softwarepark Hagenberg." },
  { question: "Ist die Anmeldung kostenlos?", answer: "Ja. Die Registrierung ist kostenfrei und beinhaltet die Basis-Mitgliedschaft. Damit legen Sie Ihr Profil an, nutzen den Fragenflirt und antworten kostenlos auf Nachrichten von Premium-Mitgliedern." },
];

p.guide = [
  {
    title: "Die Stadt, in der fast jeder zweite Haushalt aus einer Person besteht",
    html: "<p>48,5 Prozent – das ist der Anteil der Einpersonenhaushalte in Linz, der höchste aller österreichischen Landeshauptstädte. Selbst Wien liegt mit 45,3 Prozent darunter. Dazu kommt die zweithöchste Mietquote des Landes mit 77,3 Prozent und eine durchschnittliche Wohnfläche von 73,9 Quadratmetern.</p><p>Für die Partnersuche ist das eine gute Nachricht: Wer allein wohnt, kann spontan zusagen, muss sich mit niemandem absprechen und hat abends Zeit. Die Kehrseite: Alleinleben ist in Linz so normal, dass daraus kein Handlungsdruck entsteht. Viele richten sich darin ein.</p><p>Wer das ändern möchte, braucht deshalb weniger Gelegenheiten als Entschlossenheit. Die Stadt bietet mit kurzen Wegen – 20 Minuten durchschnittliche Wegzeit zur Arbeit – und einer dichten Innenstadt eigentlich ideale Bedingungen.</p>",
  },
  {
    title: "Eine Universität, jünger als die meisten ihrer Professoren",
    html: "<p>Die Johannes Kepler Universität wurde am 8. Oktober 1966 eröffnet – als Hochschule für Sozial- und Wirtschaftswissenschaften, nachdem Linz jahrzehntelang vergeblich um eine technische Hochschule gekämpft hatte. Heute ist sie eine Volluniversität mit Technik, Recht und Medizin und zählt 26.917 Studierende.</p><p>Zwei Daten erklären das Selbstverständnis der Stadt: 1987 entstand das Forschungsinstitut für Symbolisches Rechnen, um das sich der heutige Softwarepark Hagenberg entwickelte. Und 1990 startete an der JKU das weltweit erste reine Mechatronikstudium – ausgerechnet dort, wo zuvor Stahl das Thema war.</p><p>Dazu kommt die Universität für künstlerische und industrielle Gestaltung mit 1.763 Studierenden, die Linz seine Medienkunst-Identität gibt. Dass das weltweit bekannteste Festival für Kunst und Technologie in Linz und nicht in Wien stattfindet, hat genau hier seinen Ursprung.</p>",
  },
  {
    title: "Tagsüber groß, abends kompakt",
    html: "<p>198.306 Beschäftigte arbeiten in Linz – bei 213.297 Einwohnern. Auf 100 Auspendelnde kommen 173 Einpendelnde, der höchste Wert aller Landeshauptstädte. Linz ist damit das Arbeitszentrum Oberösterreichs, und die Stadt ist tagsüber eine andere als am Abend.</p><p>Beim Kennenlernen ist das relevanter, als es klingt. Ein großer Teil der Menschen, denen man in der Mittagspause begegnet, fährt um 17 Uhr nach Hause – nach Wels, Steyr, ins Mühlviertel. Wer abends verabredet ist, trifft eher die Stadtbevölkerung: jünger, häufiger allein wohnend, häufiger zugezogen.</p><p>29,9 Prozent der Linzerinnen und Linzer haben keine österreichische Staatsangehörigkeit – deutlich mehr als in Oberösterreich insgesamt (16,2 Prozent). Linz ist internationaler, als sein Ruf vermuten lässt.</p>",
  },
  {
    title: "Wo Linz lebt",
    html: "<p>Die Stadt ist entlang der Donau und zwischen zwei Polen organisiert: Im Nordosten liegt der JKU-Campus in Auhof mit Teichen, Mensa und Science Park, über die Straßenbahnlinie 1 direkt mit dem Zentrum verbunden. Im Süden und Osten liegen die Industrieflächen, dazwischen die Innenstadt mit Hauptplatz und Landstraße.</p><p>Über die Nibelungenbrücke beginnt Urfahr mit dem Ars Electronica Center am Ufer und dem Pöstlingberg darüber, erreichbar mit einer der steilsten Adhäsionsbahnen Europas. Die Tabakfabrik im Osten ist aus einem denkmalgeschützten Industriebau zum Kreativquartier geworden.</p><p>Praktisch heißt das für Verabredungen: Hauptplatz als Treffpunkt, Donaulände für den Spaziergang, Tabakfabrik oder Altstadt für den Abend – und bei gutem Wetter der Pöstlingberg als Programm, das sich selbst erklärt.</p>",
  },
  {
    title: "Termine mit akademischem Publikum",
    html: "<p>Der Kepler Salon ist das Format, das man kennen sollte: ein Wissenschaftssalon der JKU mitten in der Innenstadt, seit über fünfzehn Jahren, seit 2024 unter neuer Intendanz und mit dem erklärten Anspruch, Wissen gemeinsam zu verhandeln statt nur zu vermitteln. Klein, diskussionsfreudig, ideal für ein zweites Treffen.</p><p>Im September übernimmt das Ars Electronica Festival die Stadt – die nächste Ausgabe läuft vom 8. bis 12. September 2027. Fünf Tage Kunst, Technologie und Gesellschaft an ungewöhnlichen Orten, von der Universität bis in Industriehallen.</p><p>Jedes zweite Jahr kommt die Lange Nacht der Forschung dazu – beim Durchgang am 24. April 2026 waren es österreichweit über 3.000 Programmpunkte und mehr als 192.000 Besuchende, ohne Eintritt. In Linz öffnen dabei auch Labore der Industrie, die sonst niemand von innen sieht.</p>",
  },
  {
    title: "Was die Zahlen nicht sagen",
    html: "<p>Die Werte dieser Seite stammen aus der Abgestimmten Erwerbsstatistik 2024 mit Stichtag 31. Oktober 2024 und aus der Hochschulstatistik für das Wintersemester 2025/26. Die Studierendenzahlen zählen belegte Studien an öffentlichen Universitäten – Fachhochschule und Privatuniversität sind nicht enthalten, die tatsächliche Zahl liegt höher.</p><p>Ein Einpersonenhaushalt ist kein Beziehungsstatus: Ein erheblicher Teil der 48,5 Prozent lebt in einer festen Partnerschaft, nur eben in zwei Wohnungen. Und das Geschlechterverhältnis von 109 zu 100 in der Altersgruppe 30 bis 49 ist ein Durchschnitt über zwanzig Jahrgänge.</p><p>Was bleibt: Linz ist eine Stadt mit eigener Wohnung für fast jeden Zweiten, kurzen Wegen, einer jungen Universität und einer Kulturszene, die ihren Ruf der Technik verdankt. Für die Partnersuche sind das bessere Voraussetzungen, als der Industrie-Ruf vermuten lässt.</p>",
  },
];

applySources(p, {
  "bev-alter": { publisher: "Statistik Austria", title: "Bevölkerungsstand zu Jahresbeginn 2026 nach Gemeinde, Alter in Einzeljahren und Geschlecht (Open Government Data, Datensatz OGD_bevstandjbab2002_BevStand_2026)", stand: "Stand 01.01.2026", url: "https://data.statistik.gv.at/web/meta.jsp?dataset=OGD_bevstandjbab2002_BevStand_2026" },
  "uni-stud": { publisher: "Statistik Austria", title: "Studierende an öffentlichen Universitäten nach Uni (Open Government Data, Datensatz OGD_unistud3_ext_UNI_STUD3_1)", stand: "Wintersemester 2025/26", url: "https://data.statistik.gv.at/web/meta.jsp?dataset=OGD_unistud3_ext_UNI_STUD3_1" },
  "jku-geschichte": { publisher: "Johannes Kepler Universität Linz", title: "Geschichte der JKU: Eröffnung am 8. Oktober 1966 als Hochschule für Sozial- und Wirtschaftswissenschaften, Forschungsinstitut für Symbolisches Rechnen 1987 und Softwarepark Hagenberg, weltweit erstes reines Mechatronikstudium ab 1990", stand: "abgerufen 11/2026", url: "https://www.jku.at/die-jku/ueber-uns/geschichte/" },
});

checkSeo(p);
writeFileSync(file, JSON.stringify(p, null, 1) + "\n");
console.log("Linz geschrieben:", p.sources.length, "Quellen,", p.guide.length, "Guide-Kapitel,", p.universities.length, "Hochschulen");
