// Stadtdossier Basel ausbauen: STATPOP 2025, BFS-Hochschulstatistik WS 2025/26, Wohnviertel-Kennzahlen des
// Kantons (Gymnasialquote, Einpersonenhaushalte), Hochschulporträts, Termine und eigener Stadt-Guide.
import { readFileSync, writeFileSync } from "node:fs";
import { applySources } from "./_sources.mjs";

const file = "data/city-profiles/ch/basel.json";
const p = JSON.parse(readFileSync(file, "utf8"));

p.seoTitle = "Akademiker Singles in Basel: Uni seit 1460, Pharma";
p.seoDescription = "Basel in Zahlen: älteste Universität der Schweiz, 36,6 % mit Hochschulabschluss, 48,8 % Einpersonenhaushalte, 53,7 % der 25- bis 54-Jährigen ledig.";
p.eyebrow = "Partnersuche für Akademiker · Universitäts- und Pharmastadt am Rhein";
p.lead = "Die älteste Universität der Schweiz, das grösste Life-Sciences-Cluster des Landes und ein Universitätsspital mit 8.000 Mitarbeitenden: Basel lebt von Menschen, die forschen, entwickeln und behandeln. 36,6 Prozent der Erwachsenen im Kanton haben einen Hochschulabschluss, 48,8 Prozent der Stadthaushalte sind Einpersonenhaushalte und 53,7 Prozent der 25- bis 54-Jährigen sind ledig. Dieses Dossier zeigt mit amtlichen Zahlen, wen Sie hier treffen – und wo zwischen Rheinufer, Münsterhügel und Kleinbasel Gespräche entstehen.";

p.briefing = [
  { value: "36,6 %", label: "der Einwohnerinnen und Einwohner ab 15 Jahren haben einen Hochschulabschluss; mit höherer Berufsbildung sind es 48,8 %", source: "bs-bildung" },
  { value: "27.857", label: "Studierende an Universität Basel und FHNW", source: "bfs-stud", note: "Wintersemester 2025/26; die FHNW-Zahl gilt für alle Standorte der Nordwestschweiz" },
  { value: "53,7 %", label: "der 25- bis 54-Jährigen in Basel sind ledig", source: "bfs-zivil" },
];

p.kpis = [
  { value: "180.097", label: "Einwohnerinnen und Einwohner der Stadt Basel", source: "einwohner", note: "Ständige Wohnbevölkerung am 31.12.2025" },
  { value: "13.638", label: "Studierende an der Universität Basel", source: "bfs-stud", note: "Wintersemester 2025/26, Bachelor bis Doktorat ohne Weiterbildung; 58,4 % davon sind Frauen" },
  { value: "17.833", label: "Beschäftigte in der pharmazeutischen Industrie", source: "bs-statent", note: "STATENT 2022, Kanton Basel-Stadt; dazu 3.678 in Forschung und Entwicklung" },
  { value: "113", label: "ledige Männer je 100 ledige Frauen (25 bis 54 Jahre)", source: "bfs-zivil", note: "24.036 ledige Männer und 21.331 ledige Frauen dieser Altersgruppe, 31.12.2025; Schweiz insgesamt 125" },
];

p.dossier = [
  {
    key: "bildung",
    title: "Bildung",
    intro: "Seit 1460 Universitätsstadt: Basel ist der älteste Hochschulplatz der Schweiz – und bis heute einer der forschungsdichtesten.",
    metrics: [
      { value: "48,8 %", label: "der Einwohnerinnen und Einwohner des Kantons Basel-Stadt ab 15 Jahren haben einen Tertiärabschluss", source: "bs-bildung", note: "Strukturerhebung 2022 (Stichprobe): Hochschule 60.430 und höhere Berufsbildung 20.072 von 165.064 Personen in Privathaushalten (berechnet). Der Kanton Basel-Stadt umfasst Basel, Riehen und Bettingen" },
      { value: "36,6 %", label: "haben einen Hochschulabschluss (Universität, ETH, Fachhochschule, Pädagogische Hochschule)", source: "bs-bildung", note: "Berechnet: 60.430 von 165.064; Vertrauensintervall der Schätzung ±3,8 % (relativ), Strukturerhebung 2022" },
      { value: "58,4 %", label: "Frauenanteil unter den 13.638 Studierenden der Universität Basel", source: "bfs-stud", note: "Wintersemester 2025/26, Bachelor bis Doktorat ohne Weiterbildung; an der FHNW (alle Standorte) sind es 54,1 % von 14.219 Studierenden" },
    ],
    takeaway: "Wer in Basel akademisch arbeitet, tut das meist in Medizin, Life Sciences oder Pharmazie – Gesprächsstoff mit Substanz inklusive.",
  },
  {
    key: "beruf",
    title: "Beruf & Erfolg",
    intro: "Pharma, Gesundheitswesen, Forschung und Finanzdienstleistungen tragen den Arbeitsmarkt am Rheinknie.",
    metrics: [
      { value: "199.737", label: "Beschäftigte im Kanton Basel-Stadt", source: "bs-statent", note: "STATENT 2022 (Beschäftigungsverhältnisse, nicht Personen)" },
      { value: "17.833", label: "Beschäftigte in der pharmazeutischen Industrie", source: "bs-statent", note: "STATENT 2022; dazu 608 in Raffinerie und chemischer Industrie und 3.678 in Forschung und Entwicklung" },
      { value: "23.075", label: "Beschäftigte im Gesundheitswesen", source: "bs-statent", note: "STATENT 2022; allein das Universitätsspital Basel zählt rund 8.000 Mitarbeitende aus 84 Nationen in 52 Kliniken", compareSource: "usb-portrait" },
    ],
    takeaway: "Viele hier arbeiten an Projekten mit jahrelangem Horizont – das prägt auch, wie sie über Partnerschaft denken.",
  },
  {
    key: "wohnen",
    title: "Wohnen & Quartiere",
    intro: "Basel ist klein genug, um alles zu Fuss zu erreichen – und doch deutlich nach Milieus sortiert. Die Gymnasialquote der Wohnviertel macht das sichtbar.",
    metrics: [
      { value: "61,5 %", label: "Gymnasialquote im Wohnviertel Wettstein – der höchste Wert der Stadt", source: "bs-viertel", compareSource: "bs-viertel", note: "Anteil der Übertritte ins Gymnasium, Datenjahr 2024 (Publikation 2025). Im Klybeck sind es 13,9 %, in Bachletten 60,4 % und in der Altstadt Grossbasel 57,9 %", compare: { city: 61.5, germany: 13.9, unit: " %", max: 70, cityLabel: "Wettstein", compareLabel: "Klybeck" } },
      { value: "48,8 %", label: "Einpersonenhaushalte in der Stadt Basel", source: "bs-hh", compareSource: "bfs-hh-ch", note: "44.740 von 91.603 Privathaushalten, 31.12.2023 (kantonale Bevölkerungsstatistik). Schweiz insgesamt: 37,5 % (BFS STATPOP 2025); die Zählweisen sind nicht identisch, daher ohne Balkenvergleich" },
      { value: "35,7 %", label: "Anteil der Menschen in Einpersonenhaushalten in der Altstadt Kleinbasel – Spitzenwert unter den Wohnvierteln", source: "bs-viertel", note: "Datenjahr 2024; in den Vorstädten sind es 32,7 %, auf dem Bruderholz dagegen 14,3 %" },
    ],
    takeaway: "In Basel entscheidet die Rheinseite mehr über den Alltag als die Postleitzahl – ein erstes Treffen überquert sie am besten.",
  },
  {
    key: "singles",
    title: "Single-Leben",
    intro: "Fast jeder zweite Haushalt besteht aus einer Person, und mehr als vier von zehn Erwachsenen sind ledig.",
    metrics: [
      { value: "42,8 %", label: "der Einwohnerinnen und Einwohner ab 20 Jahren sind ledig", source: "bfs-zivil", note: "Berechnet aus der Altersklassenstatistik (ständige Wohnbevölkerung, 31.12.2025); ledig heisst nicht automatisch Single, auch unverheiratete Paare zählen dazu", compare: { city: 42.8, germany: 33.5, unit: " %", max: 55 } },
      { value: "113", label: "ledige Männer je 100 ledige Frauen zwischen 25 und 54", source: "bfs-zivil", note: "24.036 Männer zu 21.331 Frauen (31.12.2025); schweizweit sind es 125. Basel gehört damit zu den ausgeglichensten Städten des Landes", compare: { city: 113, germany: 125, unit: "", max: 145 } },
      { value: "42,5", label: "Jahre Durchschnittsalter – so alt wie der Schweizer Schnitt", source: "bfs-alter", note: "Berechnet aus den Einzelaltersjahren (vollendete Jahre) der ständigen Wohnbevölkerung, 31.12.2024; gleiche Rechenweise für Stadt und Schweiz", compare: { city: 42.5, germany: 42.5, unit: " J.", max: 52 } },
      { value: "11,9 %", label: "der Erwachsenen ab 20 sind geschieden – mehr als im Schweizer Schnitt (11,3 %)", source: "bfs-zivil", note: "Stand 31.12.2025; ein zweiter Anlauf ist in Basel also alles andere als ungewöhnlich" },
    ],
    takeaway: "Wer hier neu anfängt, ist in guter Gesellschaft – und trifft auf Menschen, die wissen, was sie beim zweiten Mal wollen.",
  },
];

p.universities = [
  { name: "Universität Basel", kind: "Älteste Universität der Schweiz", founded: "1460", students: "13.638", women: "58,4 %", source: "bfs-stud", compareSource: "unibas-geschichte", text: "Am 4. April 1460 im Basler Münster eröffnet, einst Zentrum des europäischen Humanismus, heute sieben Fakultäten mit über 350 Professorinnen und Professoren. Zwei Nobelpreise für Medizin gingen an Basler Professoren: 1950 an Tadeusz Reichstein, 1978 an Werner Arber." },
  { name: "Fachhochschule Nordwestschweiz FHNW", kind: "Fachhochschule, Standorte Basel und Muttenz", founded: "2006", students: "14.219", women: "54,1 %", source: "bfs-stud", compareSource: "fhnw-portrait", text: "Rund 14.500 Studierende, 4.000 Weiterbildungsteilnehmende und 3.000 Mitarbeitende aus über 60 Nationen – 2026 feiert die FHNW ihr 20-jähriges Bestehen. In Basel sitzen unter anderem die Hochschule für Gestaltung und Kunst und Teile der Pädagogischen Hochschule." },
  { name: "ETH Zürich, Departement Biosysteme (D-BSSE)", kind: "ETH-Departement in Basel", students: "180", source: "eth-dbsse", text: "Die ETH Zürich forscht mitten in Basel: Auf dem Campus Schällemätteli, in Gehdistanz zur Universität und ihren Spitälern, arbeiten 360 Mitarbeitende aus über 40 Nationen mit 180 Studierenden an Biosystemen und Bioengineering." },
  { name: "Swiss TPH", kind: "Assoziiertes Institut der Universität Basel", students: "", source: "swiss-tph", text: "Am Schweizerischen Tropen- und Public Health-Institut arbeiten rund 950 Menschen aus 90 Nationen in über 135 Ländern. Wer hier beschäftigt ist, war fast sicher schon länger im Ausland – und erzählt entsprechend." },
  { name: "Universitätsspital Basel", kind: "Universitätsspital, grösster Arbeitgeber der Region", students: "", source: "usb-portrait", text: "Rund 8.000 Mitarbeitende aus 84 Nationen in 36 Berufsgruppen, 52 Kliniken und 15 medizinischen Zentren versorgen über eine Million Menschen. Der Campus Gesundheit liegt mitten in der Stadt." },
];
p.universitiesNote = "Studierendenzahlen für das Wintersemester 2025/26 ohne Weiterbildung. Dazu kommen Forschungsinstitute, die Basel weit über die Universität hinaus prägen.";

p.quarters = [
  { name: "Wettstein", label: "Kleinbasel am Rhein", text: "Mit 61,5 Prozent die höchste Gymnasialquote der Stadt, dazu Rheinpromenade, Museum Tinguely und Fähri. Eine der wenigen Lagen, in der bildungsnahes Publikum auf der Kleinbasler Seite wohnt.", source: "bs-viertel" },
  { name: "Bachletten & Gotthelf", label: "Westliches Grossbasel", text: "60,4 und 50,9 Prozent Gymnasialquote, viel Jugendstil, ruhige Strassen, hohe Erwerbstätigenquote. Das Quartier für alle, die akademisch arbeiten und Garten statt Ausgang wollen.", source: "bs-viertel" },
  { name: "Altstadt Grossbasel & Vorstädte", label: "Universitätsviertel", text: "57,9 und 51,1 Prozent Gymnasialquote – und ein Drittel der Menschen lebt allein (32,7 Prozent in beiden Vierteln). Hier liegen Kollegienhaus, Münster und Theater, und hier beginnen die meisten ersten Treffen.", source: "bs-viertel" },
  { name: "Bruderholz", label: "Hanglage im Süden", text: "54,6 Prozent Gymnasialquote, die höchste Steuerkraft der Stadt – und nur 14,3 Prozent leben allein. Wer hier wohnt, wohnt in der Regel nicht mehr allein, sondern zu zweit oder als Familie.", source: "bs-viertel" },
  { name: "St. Alban", label: "Dalbeloch am Rhein", text: "44,2 Prozent Gymnasialquote, Papiermühle, Kunstmuseum Gegenwart und das ruhigste Rheinufer der Stadt. Ein Spaziergang hier ist die sichere Variante für ein zweites Treffen.", source: "bs-viertel" },
  { name: "Matthäus & Klybeck", label: "Kleinbasler Gegenpol", text: "25,9 und 13,9 Prozent Gymnasialquote, dafür die jüngste Bevölkerung und die lebendigste Beizenszene. Die Viertel, in denen Basel am wenigsten nach Pharmakonzern aussieht.", source: "bs-viertel" },
];
p.quarterSources = ["bs-viertel"];

p.agenda = [
  { title: "Museumsnacht Basel", when: "Dritter Freitag im Januar", text: "Rund 43 Museen und Gastinstitutionen öffnen bis zwei Uhr nachts; 2026 kamen rund 41.000 Menschen, rund die Hälfte davon Jugendliche und junge Erwachsene. Die nächste Ausgabe ist am 22. Januar 2027 – ein Abend, der jede Gesprächspause füllt.", href: "https://www.museumsnacht.ch/" },
  { title: "Öffentliche Ringvorlesungen der Universität Basel", when: "Semesterweise", text: "Die Universität öffnet ihre Ringvorlesungen für alle – zuletzt etwa „Falsche Götter“ als Begleitprogramm zur Oper „Moses und Aron“ am Theater Basel. Kostenlos, ohne Anmeldung, mit Publikum jeden Alters.", href: "https://www.unibas.ch/de/Aktuell/Veranstaltungen.html" },
  { title: "Art Basel", when: "Juni", text: "Die wichtigste Kunstmesse der Welt verwandelt die Stadt für vier Tage: 2027 vom 17. bis 20. Juni. Rundherum laufen Satellitenmessen und Partys – die Woche, in der Basel am wenigsten nach Feierabend um 18 Uhr aussieht.", href: "https://www.artbasel.com/basel" },
  { title: "Basler Fasnacht", when: "Montag nach Aschermittwoch", text: "Die „drey scheenschte Dääg“ beginnen mit dem Morgestraich Schlag vier Uhr früh. Rund 500 Fasnachtsgruppierungen und etwa 200 Fasnachtsmärsche – wer hierher zieht, versteht Basel erst nach der ersten Fasnacht.", href: "https://fasnacht.ch/service/hintergrundiges-zur-basler-fasnacht/" },
];

p.talkingPoints = [
  { title: "Gross- oder Kleinbasel?", text: "Die Rheinseite ist in Basel kein Detail, sondern Identität. Die Gymnasialquote zeigt, warum: Wettstein (61,5 Prozent) und Klybeck (13,9 Prozent) liegen beide im Kleinbasel, und doch trennen sie Welten. Wer beide Seiten kennt und mag, hat in dieser Stadt einen Startvorteil." },
  { title: "Pharma ist hier Alltag, nicht Branche", text: "17.833 Menschen arbeiten im Kanton in der pharmazeutischen Industrie, dazu 3.678 in Forschung und Entwicklung. Entsprechend selbstverständlich wird hier über Studien, Zulassungen und Standortfragen geredet – auch am Esstisch." },
  { title: "Die Dreiländer-Frage", text: "Basel endet nicht an der Stadtgrenze: Viele wohnen im Elsass oder in Südbaden und arbeiten in der Stadt. Beim Kennenlernen ist die Wohnadresse deshalb oft eine Länderfrage – und die Antwort entscheidet, wer sonntags fährt." },
];

p.faq = [
  { question: "Wie viele Akademiker leben in Basel?", answer: "36,6 Prozent der Einwohnerinnen und Einwohner des Kantons Basel-Stadt ab 15 Jahren haben einen Hochschulabschluss, mit der höheren Berufsbildung zusammen sind es 48,8 Prozent (Strukturerhebung 2022, Statistisches Amt Basel-Stadt nach BFS-Daten). An der Universität Basel studieren im Wintersemester 2025/26 13.638 Menschen." },
  { question: "Warum ist Basel ein besonderer Hochschulplatz?", answer: "Die Universität Basel wurde am 4. April 1460 eröffnet und ist damit die älteste Universität der Schweiz. Sie hat sieben Fakultäten und über 350 Professuren, zwei Nobelpreise für Medizin gingen an Basler Professoren (Tadeusz Reichstein 1950, Werner Arber 1978). Dazu kommen die FHNW, das ETH-Departement Biosysteme auf dem Campus Schällemätteli und das Swiss TPH." },
  { question: "Wie viele Singles leben in Basel?", answer: "42,8 Prozent der Erwachsenen ab 20 Jahren sind ledig, bei den 25- bis 54-Jährigen sind es 53,7 Prozent (BFS STATPOP, 31.12.2025). 48,8 Prozent der Basler Privathaushalte sind Einpersonenhaushalte – einer der höchsten Werte der Schweiz. Ledig heisst dabei nicht automatisch Single." },
  { question: "Gibt es in Basel mehr ledige Männer oder Frauen?", answer: "Auf 100 ledige Frauen zwischen 25 und 54 kommen 113 ledige Männer (24.036 zu 21.331, Stand 31.12.2025). Schweizweit sind es 125. Basel gehört damit zu den ausgeglichensten Partnermärkten des Landes." },
  { question: "In welchen Basler Wohnvierteln wohnen besonders viele Akademiker?", answer: "Als Anhaltspunkt dient die Gymnasialquote der Wohnviertel (Datenjahr 2024): Wettstein 61,5 Prozent, Bachletten 60,4, Altstadt Grossbasel 57,9, Bruderholz 54,6, Vorstädte 51,1 und Gotthelf 50,9 Prozent. Am anderen Ende liegen Klybeck mit 13,9 und die Altstadt Kleinbasel mit 15,4 Prozent." },
  { question: "Wo lernen Akademiker in Basel Singles kennen?", answer: "An den öffentlichen Ringvorlesungen der Universität, in der Museumsnacht im Januar, während der Art Basel im Juni, auf der Pfalz hinter dem Münster, am St. Alban-Rheinweg oder in den Beizen im Kleinbasel. Wer gezielt Menschen mit ähnlichem Bildungshintergrund sucht, findet sie bei AkademikerSingles: Jedes Profil wird manuell geprüft." },
  { question: "Ist die Anmeldung kostenlos?", answer: "Ja. Die Registrierung ist kostenfrei und beinhaltet die Basis-Mitgliedschaft. Damit legen Sie Ihr Profil an, nutzen den Fragenflirt und antworten kostenlos auf Nachrichten von Premium-Mitgliedern." },
];

p.guide = [
  {
    title: "Basel in einem Satz: klein, gebildet, international",
    html: "<p>Basel ist die kompakteste Grossstadt der Schweiz – und eine der akademischsten. 36,6 Prozent der Erwachsenen im Kanton haben einen Hochschulabschluss, mit der höheren Berufsbildung sind es 48,8 Prozent. Gleichzeitig leben 48,8 Prozent der Basler Haushalte aus einer Person, ein Spitzenwert im Land.</p><p>Die Kombination erklärt viel: Wer hier wohnt, ist oft wegen einer Stelle gekommen – am Universitätsspital mit seinen rund 8.000 Mitarbeitenden aus 84 Nationen, in der Pharmaindustrie mit 17.833 Beschäftigten oder an einem der Forschungsinstitute. Diese Menschen bringen Lebensläufe mit, in denen schon zwei, drei Städte stehen, und eine Offenheit, die in gewachsenen Städten selten ist.</p><p>Für die Partnersuche heisst das: Der Anteil an Zugezogenen mit Hochschulabschluss ist hoch, die Freundeskreise sind jünger als die Stadt – und die Wege sind kurz genug, dass ein spontanes zweites Treffen am selben Abend möglich bleibt.</p>",
  },
  {
    title: "566 Jahre Universität: was das für den Alltag bedeutet",
    html: "<p>Am 4. April 1460 wurde die Universität Basel im Münster eröffnet; im ersten Jahr verzeichnete die Matrikel 226 Studenten und Dozenten. Heute sind es 13.638 Studierende in sieben Fakultäten, dazu über 350 Professorinnen und Professoren. 58,4 Prozent der Studierenden sind Frauen – ein deutlich anderes Bild als an technischen Hochschulen.</p><p>Diese lange Geschichte ist keine Folklore. Sie hat Basel eine Dichte an Institutionen beschert, die man sonst nur in viel grösseren Städten findet: das Biozentrum, das Swiss TPH mit rund 950 Beschäftigten aus 90 Nationen, das ETH-Departement Biosysteme auf dem Campus Schällemätteli mit 360 Mitarbeitenden und 180 Studierenden. Dazu die FHNW mit rund 14.500 Studierenden an ihren Standorten in der Nordwestschweiz.</p><p>Praktisch bedeutet das: Wenn Sie in Basel jemanden mit Doktortitel treffen, ist die Wahrscheinlichkeit hoch, dass er oder sie in Medizin, Biologie, Chemie oder Public Health arbeitet. Das ist ein guter Gesprächseinstieg – und ein noch besserer Grund, nicht nach dem Fachgebiet, sondern nach der Fragestellung zu fragen.</p>",
  },
  {
    title: "Die Rheinseite entscheidet",
    html: "<p>Basel sortiert sich nicht nach Himmelsrichtungen, sondern nach Rheinseiten und Wohnvierteln. Die Gymnasialquote macht die Unterschiede messbar: Wettstein 61,5 Prozent, Bachletten 60,4, Altstadt Grossbasel 57,9, Bruderholz 54,6 – und auf der anderen Seite Klybeck mit 13,9 und Altstadt Kleinbasel mit 15,4 Prozent (Datenjahr 2024).</p><p>Spannend ist, dass Alleinleben und Bildungsnähe nicht dasselbe Muster haben: Am meisten Menschen in Einpersonenhaushalten leben in der Altstadt Kleinbasel (35,7 Prozent) und in den Vorstädten (32,7), am wenigsten auf dem Bruderholz (14,3). Wer also Menschen sucht, die tatsächlich allein wohnen, sucht eher in der Innenstadt als am Hang.</p><p>Für ein erstes Treffen hat sich die Mitte bewährt: Mittlere Brücke, Rheinufer, Kleinbasler Beizen. Man überquert den Fluss, beide Seiten geben ein Stück nach – und der Spaziergang entlang des Wassers ersetzt jede Gesprächspause.</p>",
  },
  {
    title: "Pharma, Spital, Forschung: die drei Taktgeber",
    html: "<p>199.737 Beschäftigte zählt der Kanton Basel-Stadt. Die grössten akademisch geprägten Blöcke: 17.833 in der pharmazeutischen Industrie, 23.075 im Gesundheitswesen, 3.678 in Forschung und Entwicklung, dazu Bildung, Finanzdienstleistungen und Kultur. Das ist eine ungewöhnlich hohe Konzentration auf wenige, sehr spezialisierte Felder.</p><p>Diese Struktur prägt Arbeitszeiten und Lebensrhythmen. Spital heisst Dienstplan und Wochenenddienste; Pharma heisst Projektzyklen, Reisen und internationale Teams; Forschung heisst Drittmittelanträge und befristete Verträge. Wer in Basel datet, sollte diese Realitäten früh ansprechen – nicht als Problem, sondern als Planungsgrundlage.</p><p>Der Vorteil: Viele hier kennen beides, intensive Phasen und die bewusste Entscheidung, trotzdem Zeit zu reservieren. Dass der Feierabend in Basel oft am Rhein stattfindet und nicht im Auto, hilft zusätzlich.</p>",
  },
  {
    title: "Vom Münsterhügel zum zweiten Treffen",
    html: "<p>Basel ist eine Stadt für Verabredungen ohne grossen Aufwand. Klassisch und immer richtig: Pfalz hinter dem Münster mit Blick über den Rhein, danach hinunter zur Fähri und auf die Kleinbasler Seite. Wer mehr Struktur will, nimmt das Kunstmuseum oder die Fondation Beyeler in Riehen – beides Orte, an denen Schweigen nicht peinlich ist.</p><p>Im Sommer ist der Rhein selbst das Programm: Das Schwimmen flussabwärts mit dem Wickelfisch gehört zur Stadt wie die Fähren. Im Januar übernimmt die Museumsnacht mit rund 43 Häusern bis zwei Uhr nachts, im Juni die Art Basel (2027 vom 17. bis 20. Juni), im Frühjahr die Fasnacht, die um vier Uhr morgens beginnt und nach drei Tagen endet.</p><p>Wer akademisches Publikum ohne Eintrittspreis sucht, geht in die öffentlichen Ringvorlesungen der Universität. Sie laufen semesterweise, sind kostenlos und haben den angenehmen Nebeneffekt, dass man hinterher über den Vortrag reden kann statt über sich selbst.</p>",
  },
  {
    title: "Was die Zahlen nicht sagen",
    html: "<p>Alle Werte dieser Seite stammen aus amtlichen Quellen und sind am Seitenende mit Stand aufgeführt. Trotzdem: Die Gymnasialquote ist ein Milieu-Indikator, keine Akademikerquote – sie misst Schulübertritte, nicht Abschlüsse. Die Bildungsdaten des Kantons stammen aus einer Stichprobe mit Vertrauensintervallen, und sie umfassen Basel, Riehen und Bettingen, nicht nur die Stadt.</p><p>„Ledig“ wiederum ist ein Zivilstand: In den 45.367 ledigen 25- bis 54-Jährigen stecken auch viele feste Partnerschaften ohne Trauschein. Umgekehrt sind 11,9 Prozent der Erwachsenen geschieden – mehr als im Schweizer Mittel. Beides zusammen beschreibt eine Stadt, in der Lebensläufe selten geradlinig verlaufen.</p><p>Was bleibt: Basel hat eine hohe Dichte an Menschen mit Hochschulabschluss, kurze Wege und eine Kulturdichte, die Verabredungen leicht macht. Den Rest entscheidet, wie gut das erste Gespräch läuft.</p>",
  },
];

const sources = {
  "einwohner": { publisher: "Bundesamt für Statistik (BFS)", title: "STATPOP, Tabelle px-x-0102010000_103: ständige Wohnbevölkerung nach Gemeinde (Bevölkerungsstand)", stand: "Stand 31.12.2025", url: "https://www.pxweb.bfs.admin.ch/api/v1/de/px-x-0102010000_103/px-x-0102010000_103.px" },
  "bfs-zivil": { publisher: "Bundesamt für Statistik (BFS)", title: "STATPOP, Tabelle px-x-0102010000_103: ständige Wohnbevölkerung nach Gemeinde, Geschlecht, Zivilstand und Altersklasse (Anteil Ledige, Geschiedene, Geschlechterverhältnis)", stand: "Stand 31.12.2025", url: "https://www.pxweb.bfs.admin.ch/api/v1/de/px-x-0102010000_103/px-x-0102010000_103.px" },
  "bfs-stud": { publisher: "Bundesamt für Statistik (BFS)", title: "Studierende an den universitären Hochschulen (px-x-1502040100_106) sowie an Fachhochschulen und pädagogischen Hochschulen (px-x-1502040400_136) nach Fachbereich, Studienstufe, Geschlecht und Hochschule; Bachelor bis Doktorat ohne Weiterbildung", stand: "Wintersemester 2025/26", url: "https://www.pxweb.bfs.admin.ch/api/v1/de/px-x-1502040100_106/px-x-1502040100_106.px" },
  "bs-viertel": { publisher: "Statistisches Amt des Kantons Basel-Stadt", title: "Kennzahlen zu den Basler Wohnvierteln und Landgemeinden (Open-Data-Datensatz 100011/100226): Gymnasialquote, Anteil Personen in Einpersonenhaushalten, Einkommenssteuer pro Veranlagung", stand: "Datenjahr 2024, Publikation 2025", url: "https://data.bs.ch/explore/dataset/100011/" },
  "unibas-geschichte": { publisher: "Universität Basel", title: "Geschichte und Porträt: Eröffnung am 4. April 1460 als älteste Universität der Schweiz, sieben Fakultäten, über 350 Professuren, Nobelpreise 1950 und 1978", stand: "abgerufen 11/2026", url: "https://www.unibas.ch/de/Universitaet/Portraet/Geschichte.html" },
  "fhnw-portrait": { publisher: "Fachhochschule Nordwestschweiz FHNW", title: "Porträt: rund 14.500 Studierende, 4.000 Weiterbildungsteilnehmende und 3.000 Mitarbeitende aus über 60 Nationen, 20-jähriges Bestehen 2026", stand: "abgerufen 11/2026", url: "https://www.fhnw.ch/de/die-fhnw/portraet" },
  "eth-dbsse": { publisher: "ETH Zürich, Departement Biosysteme (D-BSSE)", title: "Standort Campus Schällemätteli Basel: 180 Studierende und 360 Mitarbeitende aus über 40 Nationen", stand: "abgerufen 11/2026", url: "https://bsse.ethz.ch/" },
  "swiss-tph": { publisher: "Schweizerisches Tropen- und Public Health-Institut (Swiss TPH)", title: "Über uns: assoziiertes Institut der Universität Basel, rund 950 Mitarbeitende aus 90 Nationen, Projekte in über 135 Ländern", stand: "abgerufen 11/2026", url: "https://www.swisstph.ch/de/about" },
  "usb-portrait": { publisher: "Universitätsspital Basel", title: "Über uns: rund 8.000 Mitarbeitende aus 84 Nationen, 36 Berufsgruppen, 52 Kliniken und 15 medizinische Zentren", stand: "abgerufen 11/2026", url: "https://www.unispital-basel.ch/ueber-uns" },
};
applySources(p, sources);

writeFileSync(file, JSON.stringify(p, null, 1) + "\n");
console.log("Basel geschrieben:", p.sources.length, "Quellen,", p.guide.length, "Guide-Kapitel,", p.universities.length, "Hochschulen");
