// Stadtdossier Lausanne ausbauen: STATPOP 2025, BFS-Hochschulstatistik WS 2025/26 (UNIL und EPFL mit
// Frauenanteil), Hochschulporträts, Quartiere, Termine und eigener Stadt-Guide.
import { readFileSync, writeFileSync } from "node:fs";
import { applySources } from "./_sources.mjs";

const file = "data/city-profiles/ch/lausanne.json";
const p = JSON.parse(readFileSync(file, "utf8"));

p.seoTitle = "Akademiker Singles in Lausanne: UNIL, EPFL und CHUV";
p.seoDescription = "Lausanne in Zahlen: 42 % mit Hochschulabschluss, 30.433 Studierende an UNIL und EPFL, 57,1 % der 25- bis 54-Jährigen ledig – alles belegt.";
p.eyebrow = "Partnersuche für Akademiker · Hochschulstadt am Genfersee";
p.lead = "Zwei Hochschulen mit 30.433 Studierenden, das Universitätsspital CHUV und eine Stadt, die jünger ist als das Land: In Lausanne hat jede zweite Person ab 30 einen Tertiärabschluss, 42 Prozent haben einen Hochschulabschluss. 57,1 Prozent der 25- bis 54-Jährigen sind ledig, in fast jedem zweiten Haushalt lebt eine Person allein. Dieses Dossier zeigt mit amtlichen Zahlen, wen Sie zwischen Dorigny, Altstadt und Ouchy treffen – und warum UNIL und EPFL zwei völlig verschiedene Welten sind.";

p.briefing = [
  { value: "42,0 %", label: "der Einwohnerinnen und Einwohner ab 30 Jahren haben einen Hochschulabschluss; mit höherer Berufsbildung sind es 48,7 %", source: "la-formation" },
  { value: "30.433", label: "Studierende an Universität Lausanne und EPFL", source: "bfs-stud", note: "Wintersemester 2025/26, berechnet: UNIL 16.831 und EPFL 13.602" },
  { value: "57,1 %", label: "der 25- bis 54-Jährigen in Lausanne sind ledig", source: "bfs-zivil" },
];

p.kpis = [
  { value: "145.596", label: "Einwohnerinnen und Einwohner der Stadt Lausanne", source: "einwohner", note: "Ständige Wohnbevölkerung am 31.12.2025" },
  { value: "131.223", label: "Beschäftigte in Arbeitsstätten der Stadt Lausanne", source: "la-emplois", note: "STATENT, Dezember 2024 (Beschäftigungsverhältnisse); 94,9 % davon im Dienstleistungssektor (berechnet: 124.478 von 131.223)" },
  { value: "31,2 %", label: "Frauenanteil an der EPFL – an der Universität Lausanne sind es 58,7 %", source: "bfs-stud", note: "Wintersemester 2025/26, Bachelor bis Doktorat ohne Weiterbildung: EPFL 4.246 von 13.602, UNIL 9.877 von 16.831" },
  { value: "111", label: "ledige Männer je 100 ledige Frauen (25 bis 54 Jahre)", source: "bfs-zivil", note: "21.358 ledige Männer und 19.323 ledige Frauen dieser Altersgruppe, 31.12.2025; Schweiz insgesamt 125" },
];

p.dossier = [
  {
    key: "bildung",
    title: "Bildung",
    intro: "Universität und Eidgenössische Technische Hochschule liegen nebeneinander am Seeufer – kaum eine Stadt dieser Grösse hat eine höhere Hochschuldichte.",
    metrics: [
      { value: "48,7 %", label: "der Einwohnerinnen und Einwohner ab 30 Jahren haben einen Tertiärabschluss", source: "la-formation", note: "Strukturerhebung 2024, ständige Wohnbevölkerung ab 30 Jahren; die Tertiärstufe umfasst Hochschulen und höhere Berufsbildung" },
      { value: "42,0 %", label: "haben einen Hochschulabschluss (Universität, EPFL, Fachhochschule, Pädagogische Hochschule)", source: "la-formation", note: "Berechnet: 38.662 von 92.004 Personen ab 30 Jahren" },
      { value: "30.433", label: "Studierende an UNIL und EPFL zusammen", source: "bfs-stud", note: "Wintersemester 2025/26, Bachelor bis Doktorat ohne Weiterbildung: Universität Lausanne 16.831, EPFL 13.602. Beide Campus liegen in Dorigny und Ecublens direkt nebeneinander" },
    ],
    takeaway: "Wer hier jemanden kennenlernt, landet schnell bei der Frage: UNIL oder EPFL? Sie sagt mehr über den Alltag aus als der Beruf.",
  },
  {
    key: "beruf",
    title: "Beruf & Erfolg",
    intro: "Gesundheit, Bildung, Verwaltung und internationale Organisationen prägen den Arbeitsmarkt – Industrie spielt kaum eine Rolle.",
    metrics: [
      { value: "32.200", label: "Beschäftigte in Gesundheit, Sozialem und Medizinisch-Sozialem – der grösste Bereich der Stadt", source: "la-flyer", note: "Auswertung der STATENT 2024 durch die Stadt Lausanne; das CHUV ist eines von fünf Universitätsspitälern der Schweiz", compareSource: "chuv-bref" },
      { value: "10.717", label: "Beschäftigte im Unterrichtswesen", source: "la-emplois", note: "STATENT 2024; Hochschulen, Schulen und Weiterbildung zusammen" },
      { value: "94,9 %", label: "der Beschäftigten arbeiten im Dienstleistungssektor", source: "la-emplois", note: "Berechnet: 124.478 von 131.223 Beschäftigten (STATENT 2024)" },
    ],
    takeaway: "Spital, Hochschule, Verwaltung: Drei Arbeitswelten mit sehr unterschiedlichen Arbeitszeiten – ein Thema fürs erste Gespräch.",
  },
  {
    key: "singles",
    title: "Single-Leben",
    intro: "Lausanne ist drei Jahre jünger als die Schweiz, fast die Hälfte der Haushalte besteht aus einer Person.",
    metrics: [
      { value: "57,1 %", label: "der 25- bis 54-Jährigen sind ledig", source: "bfs-zivil", note: "40.681 von 71.200 Personen dieser Altersgruppe (ständige Wohnbevölkerung, 31.12.2025); schweizweit 43,7 %. Ledig heisst nicht automatisch Single, auch unverheiratete Paare zählen dazu", compare: { city: 57.1, germany: 43.7, unit: " %", max: 70 } },
      { value: "111", label: "ledige Männer je 100 ledige Frauen zwischen 25 und 54", source: "bfs-zivil", note: "21.358 Männer zu 19.323 Frauen (31.12.2025); schweizweit 125. Nur Genf (103) und Bern (105) sind ausgeglichener", compare: { city: 111, germany: 125, unit: "", max: 145 } },
      { value: "49,4 %", label: "Einpersonenhaushalte", source: "la-menages", compareSource: "bfs-hh-ch", note: "Stand Dezember 2025 (Stadt Lausanne); Schweiz insgesamt 37,5 % (BFS STATPOP 2025); die Zählweisen sind nicht identisch, daher ohne Balkenvergleich" },
      { value: "39,4", label: "Jahre Durchschnittsalter – gut drei Jahre jünger als der Schweizer Schnitt", source: "bfs-alter", note: "Berechnet aus den Einzelaltersjahren (vollendete Jahre) der ständigen Wohnbevölkerung, 31.12.2024; gleiche Rechenweise für Stadt und Schweiz", compare: { city: 39.4, germany: 42.5, unit: " J.", max: 52 } },
    ],
    takeaway: "Jung, ledig, oft zugezogen: In Lausanne beginnt vieles mit einem Studienort – und bleibt danach.",
  },
];

p.universities = [
  { name: "Université de Lausanne (UNIL)", kind: "Universität des Kantons Waadt", students: "16.831", women: "58,7 %", source: "bfs-stud", text: "Sieben Fakultäten – von Theologie und Religionswissenschaften über Recht, Geisteswissenschaften, Sozial- und Sportwissenschaften, Wirtschaft und Geowissenschaften bis zur Biologie und Medizin. Der Campus Dorigny liegt zwischen Stadt und See, die Faculté de biologie et médecine arbeitet eng mit dem CHUV zusammen." },
  { name: "EPFL", kind: "Eidgenössische Technische Hochschule", founded: "1853", students: "13.602", women: "31,2 %", source: "bfs-stud", compareSource: "epfl-about", text: "1853 als École Spéciale de Lausanne gegründet und 1969 in École Polytechnique Fédérale de Lausanne umbenannt. Der Campus in Ecublens grenzt direkt an denjenigen der UNIL – und hat mit 31,2 Prozent den tiefsten Frauenanteil aller grossen Schweizer Hochschulen." },
  { name: "CHUV", kind: "Universitätsspital des Kantons Waadt", students: "", source: "chuv-bref", text: "Eines von fünf Universitätsspitälern der Schweiz, laut Newsweek-Ranking 2025 eines der besten Spitäler der Welt. Die Zusammenarbeit mit der medizinischen Fakultät der UNIL macht es zum grössten akademischen Arbeitgeber der Stadt." },
  { name: "EHL Hospitality Business School", kind: "Hochschule für Hotellerie und Gastgewerbe", students: "", source: "la-emplois", text: "Die traditionsreiche Lausanner Hotelfachschule bringt ein internationales Publikum in die Stadt – und ist einer der Gründe, warum im Gastgewerbe hier überdurchschnittlich viele Menschen mit Hochschulabschluss arbeiten." },
];
p.universitiesNote = "Studierendenzahlen für das Wintersemester 2025/26 ohne Weiterbildung. UNIL und EPFL teilen sich faktisch einen Campus am Seeufer – und haben doch zwei völlig verschiedene Geschlechterverhältnisse.";

p.quarters = [
  { name: "Dorigny & Ecublens", label: "Campusgürtel", text: "Hier liegen die beiden Hochschulen nebeneinander: 16.831 UNIL-Studierende, 13.602 an der EPFL, dazu Bibliotheken, Mensen und das Rolex Learning Center. Wer am See joggt, läuft hier durch die grösste Studierendendichte der Westschweiz.", source: "bfs-stud" },
  { name: "Centre & Flon", label: "Ausgehviertel", text: "Zwischen Place Saint-François, Riponne und dem umgebauten Industrieareal Flon liegt das Lausanne, das abends arbeitet und ausgeht. Metro, Bars, Kinos, Plateforme 10 – die naheliegende Wahl für ein erstes Treffen." },
  { name: "Cité & Kathedrale", label: "Altstadt am Hügel", text: "Die Oberstadt mit der Kathedrale, dem Rathaus und steilen Gassen. Ruhig, historisch, mit dem besten Blick über den See – und dem Nachtwächter, der seit Jahrhunderten die Stunden ruft." },
  { name: "Ouchy & Sous-Gare", label: "Seeufer", text: "Hafenpromenade, Olympisches Museum, Quais: Der Teil der Stadt, in dem Lausanne am meisten nach Ferien aussieht. Beliebt bei allen, die am Wasser wohnen wollen und dafür den Aufstieg in Kauf nehmen." },
  { name: "CHUV-Quartier & Bugnon", label: "Medizinviertel", text: "Rund um das Universitätsspital arbeiten Ärztinnen, Pflegende und Forschende der medizinischen Fakultät. Schichtbetrieb bestimmt hier den Tag – und damit auch, wann Verabredungen möglich sind." },
  { name: "Chailly & Mon-Repos", label: "Bürgerliche Hanglage", text: "Villen, Parks und der Parc de Mon Repos. Ruhiger und älter als die Innenstadt; hier wohnen viele, die nach dem Studium in Lausanne geblieben sind und inzwischen Familie haben." },
];

p.agenda = [
  { title: "Festival de la Cité", when: "Anfang Juli", text: "Sechs Tage Theater, Musik und Performance in der Oberstadt – vollständig kostenlos. Die 55. Ausgabe läuft vom 6. bis 11. Juli 2027. Man schlendert von Bühne zu Bühne; ein Abend, der sich ohne Plan verlängern lässt.", href: "https://festivalcite.ch/" },
  { title: "La Nuit des Musées Lausanne & Pully", when: "Ende September", text: "Ein Ticket, alle Museen, bis spät in die Nacht: 2026 fand die Nuit des Musées am 26. September statt. Gute Wahl für ein zweites Treffen, weil das Programm Gesprächsstoff liefert und man jederzeit weiterziehen kann.", href: "https://lanuitdesmusees.ch/" },
  { title: "Öffentliche Veranstaltungen der EPFL", when: "Laufend, Semesterprogramm", text: "Die EPFL führt eine eigene Rubrik mit Veranstaltungen, die ausdrücklich für die Öffentlichkeit offen sind, dazu Informationstage und das Kulturfestival „Les Culturelles“. Wer die Technik-Welt der Stadt kennenlernen will, beginnt hier.", href: "https://www.epfl.ch/campus/events/" },
  { title: "Lausanne als olympische Stadt", when: "Ganzjährig", text: "Das Olympische Museum in Ouchy ist nicht nur für Sportfans ein verlässlicher Treffpunkt: Ausstellung, Park und Terrasse mit Seeblick liegen beieinander – und der Spaziergang den Quai entlang ergibt sich von selbst." },
];

p.talkingPoints = [
  { title: "UNIL oder EPFL – die Lausanner Grundfrage", text: "Die beiden Campus grenzen aneinander, und doch sind es zwei Welten: An der EPFL sind 31,2 Prozent der Studierenden Frauen, an der UNIL 58,7 Prozent. Wer beide Seiten kennt, kann erklären, warum Freundeskreise in dieser Stadt oft so einseitig zusammengesetzt sind – und warum sich das lohnt zu ändern." },
  { title: "Zugezogen ist hier die Mehrheit", text: "Lausanne ist mit 39,4 Jahren Durchschnittsalter gut drei Jahre jünger als die Schweiz, und ein grosser Teil der Bevölkerung ist für Studium oder Stelle hergekommen. Die Frage „Seit wann bist du hier?“ ist deshalb kein Smalltalk, sondern der Einstieg in die eigentliche Geschichte." },
  { title: "Oben oder unten", text: "Lausanne ist eine Stadt mit 500 Höhenmetern Unterschied zwischen Seeufer und Oberstadt. Wer wo wohnt, entscheidet über Metro-Linie, Abendgestaltung und darüber, wer nach dem Treffen bergauf laufen muss." },
];

p.faq = [
  { question: "Wie viele Akademiker leben in Lausanne?", answer: "42,0 Prozent der Einwohnerinnen und Einwohner ab 30 Jahren haben einen Hochschulabschluss, mit der höheren Berufsbildung zusammen 48,7 Prozent (Strukturerhebung 2024, Stadt Lausanne nach BFS-Daten). Im Wintersemester 2025/26 studieren 16.831 Menschen an der UNIL und 13.602 an der EPFL." },
  { question: "Wie unterscheiden sich UNIL und EPFL?", answer: "Die Université de Lausanne ist eine Volluniversität mit sieben Fakultäten und 58,7 Prozent Frauenanteil. Die EPFL, 1853 als École Spéciale de Lausanne gegründet und 1969 umbenannt, ist eine technische Hochschule des Bundes mit 31,2 Prozent Frauenanteil. Beide Campus liegen in Dorigny und Ecublens direkt nebeneinander." },
  { question: "Wie viele Singles leben in Lausanne?", answer: "47,6 Prozent der Erwachsenen ab 20 Jahren sind ledig, bei den 25- bis 54-Jährigen sind es 57,1 Prozent (BFS STATPOP, 31.12.2025). 49,4 Prozent der Haushalte sind Einpersonenhaushalte. Ledig heisst dabei nicht automatisch Single – auch unverheiratete Paare zählen dazu." },
  { question: "Gibt es in Lausanne mehr ledige Männer oder Frauen?", answer: "Auf 100 ledige Frauen zwischen 25 und 54 kommen 111 ledige Männer (21.358 zu 19.323, Stand 31.12.2025). Schweizweit sind es 125. Nur Genf mit 103 und Bern mit 105 sind in unseren Dossiers ausgeglichener." },
  { question: "Wo lernen Akademiker in Lausanne Singles kennen?", answer: "Beim Festival de la Cité Anfang Juli (Eintritt frei), an der Nuit des Musées im September, bei öffentlichen Veranstaltungen der EPFL, im Plateforme 10 mit seinen drei Museen, am Quai von Ouchy oder in den Bars im Flon. Wer gezielt Menschen mit ähnlichem Bildungshintergrund sucht, findet sie bei AkademikerSingles: Jedes Profil wird manuell geprüft." },
  { question: "Ist Lausanne für Deutschsprachige geeignet?", answer: "Lausanne ist französischsprachig, aber durch die beiden Hochschulen und das CHUV stark international geprägt – an der EPFL ist Englisch im Master- und Doktoratsstudium verbreitet. Wer Französisch lernt oder spricht, hat es im Alltag und beim Kennenlernen deutlich leichter." },
  { question: "Ist die Anmeldung kostenlos?", answer: "Ja. Die Registrierung ist kostenfrei und beinhaltet die Basis-Mitgliedschaft. Damit legen Sie Ihr Profil an, nutzen den Fragenflirt und antworten kostenlos auf Nachrichten von Premium-Mitgliedern." },
];

p.guide = [
  {
    title: "Zwei Hochschulen, ein Seeufer",
    html: "<p>Es gibt in Europa wenige Orte, an denen eine Volluniversität und eine technische Hochschule des Bundes so direkt nebeneinander liegen wie in Lausanne. 16.831 Studierende an der UNIL, 13.602 an der EPFL, zusammen 30.433 Menschen auf zwei Campus, die ineinander übergehen – mit Metro-Anschluss, Seeblick und einer gemeinsamen Mensa-Kultur.</p><p>Für die Partnersuche ist das eine Besonderheit. Denn die beiden Häuser sind völlig unterschiedlich zusammengesetzt: An der UNIL sind 58,7 Prozent der Studierenden Frauen, an der EPFL 31,2 Prozent. Beide Gruppen leben in derselben Stadt, nehmen dieselbe Metrolinie und begegnen sich trotzdem seltener, als die Geografie vermuten lässt.</p><p>Wer das weiss, kann es nutzen: Veranstaltungen, die beide Welten mischen – öffentliche Vorträge, Kulturprogramme, Sport – sind in Lausanne die effizienteste Art, den eigenen Kreis zu erweitern.</p>",
  },
  {
    title: "Eine junge Stadt mit hoher Fluktuation",
    html: "<p>Mit einem Durchschnittsalter von 39,4 Jahren ist Lausanne gut drei Jahre jünger als die Schweiz. 57,1 Prozent der 25- bis 54-Jährigen sind ledig, 49,4 Prozent der Haushalte bestehen aus einer Person. Das sind Werte, die man sonst nur in Universitätsstädten findet – und sie haben eine Kehrseite: Viele ziehen nach dem Abschluss weiter.</p><p>Das macht Lausanner Freundeskreise durchlässiger als in anderen Schweizer Städten. Neue Leute kennenzulernen ist hier leichter, Bindungen aufzubauen manchmal schwerer. Wer bleibt, tut das meist wegen einer Stelle am CHUV, an einer Hochschule, in der Verwaltung oder bei einer der internationalen Organisationen.</p><p>Für die Partnersuche heisst das: Die Frage nach den Plänen der nächsten zwei Jahre ist in Lausanne kein Übergriff, sondern Höflichkeit. Sie klärt früh, ob beide dieselbe Zeitachse haben.</p>",
  },
  {
    title: "Wer hier arbeitet",
    html: "<p>131.223 Beschäftigte zählt die Stadt, 94,9 Prozent davon im Dienstleistungssektor. Der grösste Block mit 32.200 Beschäftigten ist Gesundheit und Soziales – angeführt vom CHUV, einem der fünf Universitätsspitäler der Schweiz. Es folgen das Unterrichtswesen mit 10.717 Beschäftigten, Verwaltung, Recht und der Tourismus.</p><p>Lausanne ist damit eine Stadt ohne nennenswerte Industrie, aber mit hoher akademischer Dichte. Das prägt die Gespräche: Hier wird über Forschung, Gesundheitspolitik, Lehre und internationale Organisationen geredet, seltener über Produktionszahlen.</p><p>Praktisch relevant sind vor allem die Arbeitszeiten. Spitalpersonal arbeitet in Diensten, Hochschulmitarbeitende haben unregelmässige, aber selbstbestimmte Zeiten, Verwaltung und Organisationen sind planbar. Das zu wissen, erspart beim Verabreden viele Missverständnisse.</p>",
  },
  {
    title: "Oben, unten, dazwischen: die Stadt lesen",
    html: "<p>Lausanne ist in Terrassen gebaut, zwischen Seeufer und Oberstadt liegen rund 500 Höhenmeter. Unten Ouchy mit Quai und Olympischem Museum, in der Mitte Flon und Centre mit Bars, Kinos und Plateforme 10, oben die Cité mit Kathedrale. Die Metro verbindet alles in wenigen Minuten – sie ist das heimliche Rückgrat jedes Dates.</p><p>Westlich schliessen Dorigny und Ecublens mit den beiden Campus an, nordöstlich das CHUV-Quartier, östlich Chailly und Mon-Repos mit Villen und Parks. Wer in Lausanne eine Adresse hört, weiss meistens sofort, wie der Alltag des Gegenübers aussieht.</p><p>Bewährtes Programm für ein erstes Treffen: Kathedrale und Altstadt, dann hinunter in den Flon, und wenn es gut läuft, mit der Metro nach Ouchy an den See. Die Stadt macht den Ablauf fast von selbst.</p>",
  },
  {
    title: "Termine, die Gespräche leicht machen",
    html: "<p>Das Festival de la Cité verwandelt Anfang Juli die Oberstadt in eine Bühnenlandschaft – vollständig gratis, die 55. Ausgabe läuft vom 6. bis 11. Juli 2027. Im September folgt die Nuit des Musées in Lausanne und Pully mit einem Ticket für alle Häuser; 2026 war sie am 26. September.</p><p>Wer es wissenschaftlicher mag, schaut in die Veranstaltungsrubrik der EPFL: Sie führt eigens Formate, die für die Öffentlichkeit offen sind, dazu Informationstage und das Kulturfestival „Les Culturelles“. Das Olympische Museum in Ouchy funktioniert ganzjährig als Treffpunkt – mit Park und Seeterrasse direkt davor.</p><p>Der gemeinsame Nenner: Alle diese Formate erlauben Bewegung. Man steht nicht gegenüber, man geht nebeneinander – die bequemste Art, ein erstes Gespräch zu führen.</p>",
  },
  {
    title: "Was die Zahlen nicht sagen",
    html: "<p>Die Bildungszahlen der Stadt gelten für Personen ab 30 Jahren und stammen aus der Strukturerhebung, also aus einer Stichprobe mit Unsicherheitsbereichen. Die Studierendenzahlen umfassen Bachelor bis Doktorat ohne Weiterbildung; ein Teil dieser Menschen wohnt ausserhalb der Stadtgrenze, etwa in Renens, Ecublens oder Pully.</p><p>„Ledig“ ist auch hier ein Zivilstand und kein Beziehungsstatus: In der Westschweiz ist das Zusammenleben ohne Trauschein besonders verbreitet, was den hohen Wert von 57,1 Prozent bei den 25- bis 54-Jährigen zusätzlich erklärt.</p><p>Was bleibt: eine junge, international geprägte Stadt mit zwei grossen Hochschulen, kurzen Wegen und einem Geschlechterverhältnis, das näher am Gleichgewicht liegt als im Schweizer Mittel. Der Rest hängt davon ab, ob man die Sprache spricht – und ob man bereit ist, den Berg hochzulaufen.</p>",
  },
];

applySources(p, {
  einwohner: { publisher: "Bundesamt für Statistik (BFS)", title: "STATPOP, Tabelle px-x-0102010000_103: ständige Wohnbevölkerung nach Gemeinde (Bevölkerungsstand)", stand: "Stand 31.12.2025", url: "https://www.pxweb.bfs.admin.ch/api/v1/de/px-x-0102010000_103/px-x-0102010000_103.px" },
  "bfs-zivil": { publisher: "Bundesamt für Statistik (BFS)", title: "STATPOP, Tabelle px-x-0102010000_103: ständige Wohnbevölkerung nach Gemeinde, Geschlecht, Zivilstand und Altersklasse (Anteil Ledige, Geschlechterverhältnis)", stand: "Stand 31.12.2025", url: "https://www.pxweb.bfs.admin.ch/api/v1/de/px-x-0102010000_103/px-x-0102010000_103.px" },
  "bfs-stud": { publisher: "Bundesamt für Statistik (BFS)", title: "Studierende an den universitären Hochschulen (px-x-1502040100_106) nach Fachbereich, Studienstufe, Geschlecht und Hochschule; Bachelor bis Doktorat ohne Weiterbildung", stand: "Wintersemester 2025/26", url: "https://www.pxweb.bfs.admin.ch/api/v1/de/px-x-1502040100_106/px-x-1502040100_106.px" },
  "epfl-about": { publisher: "EPFL", title: "About EPFL – Overview: Gründung 1853 als École Spéciale de Lausanne, Umbenennung in École Polytechnique Fédérale de Lausanne 1969", stand: "abgerufen 11/2026", url: "https://www.epfl.ch/about/overview/" },
  "chuv-bref": { publisher: "Centre hospitalier universitaire vaudois (CHUV)", title: "Le CHUV en bref: eines von fünf Universitätsspitälern der Schweiz, Zusammenarbeit mit der Faculté de biologie et de médecine der Universität Lausanne", stand: "Stand der Seite 04.12.2025", url: "https://www.chuv.ch/fr/chuv-home/le-chuv/le-chuv-en-bref" },
});

writeFileSync(file, JSON.stringify(p, null, 1) + "\n");
console.log("Lausanne geschrieben:", p.sources.length, "Quellen,", p.guide.length, "Guide-Kapitel,", p.universities.length, "Hochschulen");
