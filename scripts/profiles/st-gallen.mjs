// Stadtdossier St. Gallen ausbauen: STATPOP 2025, BFS-Hochschulstatistik WS 2025/26, Hochschulporträts
// (HSG, OST, PHSG), Quartiere, Termine und eigener Stadt-Guide.
import { readFileSync, writeFileSync } from "node:fs";
import { applySources } from "./_sources.mjs";

const file = "data/city-profiles/ch/st-gallen.json";
const p = JSON.parse(readFileSync(file, "utf8"));

p.seoTitle = "Akademiker Singles in St. Gallen: HSG, OST und Zahlen";
p.seoDescription = "St. Gallen in Zahlen: 46 % der 25- bis 64-Jährigen mit Tertiärabschluss, 10.116 HSG-Studierende, 127 ledige Männer je 100 ledige Frauen.";
p.eyebrow = "Partnersuche für Akademiker · Universitätsstadt zwischen Stiftsbezirk und Rosenberg";
p.lead = "Die Universität St.Gallen gehört zu den bekanntesten Wirtschaftsuniversitäten Europas, die OST bringt Technik und Gesundheit dazu: Rund 46 Prozent der 25- bis 64-Jährigen haben einen Tertiärabschluss, und auf 100 Einwohnerinnen und Einwohner kommen 111 Beschäftigte. Beim Partnermarkt fällt eine Zahl auf: Auf 100 ledige Frauen zwischen 25 und 54 kommen hier 127 ledige Männer – deutlich mehr als im Schweizer Schnitt. Dieses Dossier erklärt mit amtlichen Zahlen, woran das liegt.";

p.briefing = [
  { value: "46 %", label: "der 25- bis 64-Jährigen haben einen Tertiärabschluss (Hochschule oder höhere Berufsbildung)", source: "sg-stadtstat", note: "Vom Bericht gerundet angegeben (BFS, Eurostat City Statistics, Strukturerhebung)" },
  { value: "15.646", label: "Studierende an HSG, OST und PHSG zusammen", source: "bfs-stud", note: "Wintersemester 2025/26 bzw. eigene Zählung der Hochschulen; OST und PHSG mit allen Standorten" },
  { value: "127", label: "ledige Männer je 100 ledige Frauen zwischen 25 und 54 Jahren", source: "bfs-zivil" },
];

p.kpis = [
  { value: "79.487", label: "Einwohnerinnen und Einwohner der Stadt St. Gallen", source: "einwohner", note: "Ständige Wohnbevölkerung am 31.12.2025" },
  { value: "10.116", label: "Studierende an der Universität St.Gallen", source: "bfs-stud", note: "Wintersemester 2025/26, Bachelor bis Doktorat ohne Weiterbildung; 35,3 % davon sind Frauen" },
  { value: "111", label: "Beschäftigte je 100 Einwohnerinnen und Einwohner", source: "sg-stadtstat", note: "Die Stadt hat mehr Arbeitsplätze als Einwohner – ein Pendlerzentrum für die ganze Ostschweiz" },
  { value: "50,6 %", label: "der 25- bis 54-Jährigen sind ledig", source: "bfs-zivil", note: "18.144 von 35.862 Personen dieser Altersgruppe, 31.12.2025" },
];

p.dossier = [
  {
    key: "bildung",
    title: "Bildung",
    intro: "Eine Wirtschaftsuniversität mit internationalem Ruf, eine junge Fachhochschule und eine Pädagogische Hochschule – St. Gallen ist akademisch ungewöhnlich spezialisiert.",
    metrics: [
      { value: "46 %", label: "der 25- bis 64-Jährigen haben einen Tertiärabschluss", source: "sg-stadtstat", note: "Angabe der Stadtstatistik im europäischen Städtevergleich (Strukturerhebung, Eurostat City Statistics)" },
      { value: "35,3 %", label: "Frauenanteil an der Universität St.Gallen – der tiefste Wert aller Schweizer Volluniversitäten", source: "bfs-stud", note: "Wintersemester 2025/26: 3.571 von 10.116 Studierenden; zum Vergleich: Universität Zürich 59,1 %, Universität Bern 59,6 %", compare: { city: 35.3, germany: 59.1, unit: " %", max: 70 }, compareSource: "bfs-stud" },
      { value: "4.030", label: "Studierende an der OST Ostschweizer Fachhochschule", source: "ost-zahlen", note: "Stand 31.12.2025: 3.583 Bachelor, 447 Master; 42,7 % Frauen (1.721 von 4.030). Die OST hat Standorte in St.Gallen, Rapperswil-Jona und Buchs" },
    ],
    takeaway: "Wirtschaft, Technik, Gesundheit, Bildung: Wer hier studiert hat, hat sich früh für eine klare Richtung entschieden.",
  },
  {
    key: "beruf",
    title: "Beruf & Erfolg",
    intro: "Mehr Arbeitsplätze als Einwohner: St. Gallen ist das Zentrum einer Region, die jeden Morgen hierher pendelt.",
    metrics: [
      { value: "111", label: "Beschäftigte je 100 Einwohnerinnen und Einwohner", source: "sg-stadtstat", note: "Die Stadt ist Arbeitsort für die ganze Ostschweiz; entsprechend hoch ist der Anteil der Einpendelnden" },
      { value: "1.998", label: "Mitarbeitende an der OST", source: "ost-zahlen", note: "1.049 Professorinnen, Professoren und Dozierende, 493 wissenschaftliche Mitarbeitende und Assistierende, 456 Personen im administrativen und technischen Bereich (Stand 31.12.2025)" },
      { value: "35", label: "Forschungsinstitute allein an der OST", source: "ost-zahlen", note: "Das älteste Institut wurde 1981 gegründet, das jüngste 2024; dazu kommen die Institute der Universität St.Gallen" },
    ],
    takeaway: "Hier trifft man auf Menschen, die Verantwortung übernehmen, ohne nach Zürich ziehen zu müssen.",
  },
  {
    key: "singles",
    title: "Single-Leben",
    intro: "Der Partnermarkt ist in St. Gallen deutlich männlich geprägt – eine direkte Folge der Hochschul- und Branchenstruktur.",
    metrics: [
      { value: "50,6 %", label: "der 25- bis 54-Jährigen sind ledig", source: "bfs-zivil", note: "18.144 von 35.862 Personen dieser Altersgruppe (ständige Wohnbevölkerung, 31.12.2025); schweizweit 43,7 %. Ledig heisst nicht automatisch Single, auch unverheiratete Paare zählen dazu", compare: { city: 50.6, germany: 43.7, unit: " %", max: 65 } },
      { value: "127", label: "ledige Männer je 100 ledige Frauen zwischen 25 und 54", source: "bfs-zivil", note: "10.135 Männer zu 8.009 Frauen (31.12.2025); schweizweit 125. Bei den 30- bis 49-Jährigen sind es sogar 137 Männer je 100 Frauen", compare: { city: 127, germany: 125, unit: "", max: 145 } },
      { value: "41,1 %", label: "der Einwohnerinnen und Einwohner ab 20 Jahren sind ledig", source: "bfs-zivil", note: "Berechnet aus der Altersklassenstatistik (ständige Wohnbevölkerung, 31.12.2025); dazu kommen 11,2 % Geschiedene" },
    ],
    takeaway: "Für Frauen ist St. Gallen rechnerisch einer der günstigsten Märkte der Schweiz – für Männer lohnt sich ein klares, ehrliches Profil umso mehr.",
  },
];

p.universities = [
  { name: "Universität St.Gallen (HSG)", kind: "Wirtschaftsuniversität des Kantons", students: "10.116", women: "35,3 %", source: "bfs-stud", compareSource: "hsg-ueber", text: "Seit mehr als hundert Jahren in St. Gallen, zu Beginn als Handelsakademie. Heute eine der bekanntesten Wirtschaftsuniversitäten Europas mit eigenen Instituten – und mit 35,3 Prozent dem tiefsten Frauenanteil aller Schweizer Volluniversitäten." },
  { name: "OST Ostschweizer Fachhochschule", kind: "Fachhochschule, Standorte St.Gallen, Rapperswil-Jona und Buchs", founded: "2020", students: "4.030", women: "42,7 %", source: "ost-zahlen", text: "Am 1. September 2020 aus der Fusion von FHS St.Gallen, HSR Rapperswil und NTB Buchs entstanden. Sechs Departemente von Architektur über Gesundheit und Informatik bis Wirtschaft, 35 Forschungsinstitute und 1.998 Mitarbeitende. Getragen von sechs Kantonen und dem Fürstentum Liechtenstein." },
  { name: "Pädagogische Hochschule St.Gallen", kind: "Pädagogische Hochschule", students: "1.500", source: "phsg-portraet", text: "Über 1.500 Studierende und knapp 600 Mitarbeitende an vier Hochschulgebäuden in St.Gallen, Rorschach und Gossau. Jährlich nutzen rund 10.000 Personen das Weiterbildungsangebot – ein grosser Teil der Ostschweizer Lehrerschaft geht hier ein und aus." },
];
p.universitiesNote = "Studierendenzahlen für das Wintersemester 2025/26 (HSG) bzw. nach eigener Zählung der Hochschulen; OST und PHSG mit allen Standorten.";

p.quarters = [
  { name: "Rosenberg", label: "Universitätshügel", text: "Oberhalb der Stadt liegt der HSG-Campus mit seinen Instituten und der markanten Nachkriegsarchitektur. Studierende und Dozierende prägen hier den Tagesrhythmus – und abends führt der Weg hinunter in die Innenstadt." },
  { name: "Stiftsbezirk & Innenstadt", label: "UNESCO-Welterbe", text: "Stiftsbibliothek, Kathedrale, Gallusplatz: Der historische Kern ist kompakt und gut für einen Spaziergang, der unterwegs in ein Lokal münden kann. Die Stiftsbibliothek gehört zum UNESCO-Welterbe und ist der naheliegendste Treffpunkt der Stadt." },
  { name: "St.Fiden & Neudorf", label: "Östliche Quartiere", text: "Gewachsene Wohnquartiere mit Quartierbeizen und kurzem Weg zum Bahnhof St.Fiden. Hier wohnen viele, die in der Stadt arbeiten, aber nicht im Zentrum leben wollen." },
  { name: "Drei Weieren & Freudenberg", label: "Naherholung über der Stadt", text: "Die drei Weiher am Hang sind im Sommer Badeort und ganzjährig Spazierziel mit Blick über die Stadt bis zum Bodensee. Der verlässlichste Ort St. Gallens für ein Treffen ohne grossen Aufwand." },
  { name: "Riethüsli & Bruggen", label: "Westlich der Innenstadt", text: "Ruhiger, familiärer und günstiger als das Zentrum, mit eigener Bahnlinie Richtung Appenzell. Für viele die erste Adresse nach dem Studium, wenn aus der WG eine eigene Wohnung wird." },
  { name: "Lerchenfeld & Innovationspark", label: "Technologie und Gründung", text: "Am Campus Lerchenfeld sitzt das Startfeld des Switzerland Innovation Park Ost, das Gründerinnen und Gründer mit Förderpaketen und Seed-Finanzierungen unterstützt. Wer hier arbeitet, redet über Prototypen statt über Quartalszahlen." },
];

p.agenda = [
  { title: "St. Gallen Symposium", when: "Ende April", text: "Seit 1969 bringt die von Studierenden organisierte Konferenz Führungskräfte und junge Talente an die HSG: Die 56. Ausgabe läuft am 28. und 29. April 2027, mit über 1.400 Teilnehmenden aus mehr als 90 Nationen. In diesen Tagen ist die ganze Stadt internationaler.", href: "https://symposium.org/" },
  { title: "Öffentliche Formate der HSG", when: "Semesterweise", text: "Die Universität versteht sich ausdrücklich auch als Ort für die Bevölkerung der Region – mit Campusführungen, Vorträgen und Veranstaltungen, die nicht nur Studierenden offenstehen.", href: "https://www.unisg.ch/de/universitaet/ueber-uns/" },
  { title: "Baden an den Drei Weieren", when: "Mai bis September", text: "Die historischen Badhäuser am Hang über der Stadt sind das St. Galler Sommerritual. Ein Treffen hier kostet nichts, dauert so lange man will und hat den besten Blick der Stadt inklusive." },
  { title: "Startfeld-Netzwerk am Campus Lerchenfeld", when: "Laufend", text: "Das Gründernetzwerk des Switzerland Innovation Park Ost fördert Start-ups mit Paketen von 18.000 Franken und Seed-Finanzierungen bis 500.000 Franken; Standorte sind St.Gallen, Buchs und Rapperswil. Rundherum entsteht die Szene, in der sich die technisch geprägte Seite der Stadt trifft.", href: "https://innovationspark-ost.ch/startfeld" },
];

p.talkingPoints = [
  { title: "Die 127er-Frage", text: "Auf 100 ledige Frauen zwischen 25 und 54 kommen in St. Gallen 127 ledige Männer, bei den 30- bis 49-Jährigen sogar 137. Das hat mit der HSG (35,3 Prozent Frauenanteil) und mit technischen Berufen in der Region zu tun. Wer das weiss, versteht, warum Männer hier mit einem durchdachten Profil deutlich mehr erreichen als mit einer Standardnachricht." },
  { title: "HSG oder Ostschweiz?", text: "Die Universität ist international, die Region bodenständig – und beide Welten begegnen sich weniger, als man meinen würde. Wer beide Seiten mag, hat in St. Gallen einen seltenen Vorteil: Er kann übersetzen." },
  { title: "Pendlerstadt mit 111 Prozent", text: "Auf 100 Einwohnerinnen und Einwohner kommen 111 Beschäftigte. Viele, die in St. Gallen arbeiten, wohnen in Appenzell, im Rheintal oder am Bodensee. Beim Kennenlernen ist die Frage nach dem Wohnort deshalb oft eine Frage nach der Zugverbindung." },
];

p.faq = [
  { question: "Wie viele Akademiker leben in St. Gallen?", answer: "Rund 46 Prozent der 25- bis 64-Jährigen haben einen Tertiärabschluss, also Hochschule oder höhere Berufsbildung (Stadtstatistik St.Gallen im europäischen Städtevergleich). An der Universität St.Gallen studieren im Wintersemester 2025/26 10.116 Menschen, an der OST 4.030 und an der PHSG über 1.500." },
  { question: "Gibt es in St. Gallen mehr ledige Männer oder Frauen?", answer: "Deutlich mehr Männer: Auf 100 ledige Frauen zwischen 25 und 54 kommen 127 ledige Männer (10.135 zu 8.009, Stand 31.12.2025), bei den 30- bis 49-Jährigen sind es 137. Schweizweit liegt der Wert bei 125. Gründe sind die Zusammensetzung der Hochschulen und der technisch geprägte Arbeitsmarkt der Region." },
  { question: "Warum ist der Frauenanteil an der HSG so tief?", answer: "Die Universität St.Gallen ist auf Wirtschafts-, Rechts- und Sozialwissenschaften spezialisiert; Fächer mit traditionell höherem Frauenanteil wie Medizin, Geistes- oder Erziehungswissenschaften fehlen weitgehend. Das Ergebnis: 35,3 Prozent Frauenanteil im Wintersemester 2025/26 gegenüber 59,1 Prozent an der Universität Zürich." },
  { question: "Wie viele Singles leben in St. Gallen?", answer: "41,1 Prozent der Erwachsenen ab 20 Jahren sind ledig, bei den 25- bis 54-Jährigen sind es 50,6 Prozent (BFS STATPOP, 31.12.2025). Dazu kommen 11,2 Prozent Geschiedene. Ledig heisst dabei nicht automatisch Single – auch unverheiratete Paare zählen dazu." },
  { question: "Wo lernen Akademiker in St. Gallen Singles kennen?", answer: "An den Drei Weieren im Sommer, bei Veranstaltungen und Campusführungen der HSG, rund um das St. Gallen Symposium Ende April, im Stiftsbezirk und in den Lokalen am Gallusplatz oder im Gründernetzwerk am Campus Lerchenfeld. Wer gezielt Menschen mit ähnlichem Bildungshintergrund sucht, findet sie bei AkademikerSingles: Jedes Profil wird manuell geprüft." },
  { question: "Lohnt sich St. Gallen trotz der Nähe zu Zürich?", answer: "Die Stadt zählt 111 Beschäftigte je 100 Einwohnerinnen und Einwohner – sie ist Arbeitsort für die ganze Ostschweiz, nicht Schlafstadt von Zürich. Wer hier arbeitet und wohnt, spart Pendelzeit und bekommt mehr Wohnfläche für dasselbe Geld." },
  { question: "Ist die Anmeldung kostenlos?", answer: "Ja. Die Registrierung ist kostenfrei und beinhaltet die Basis-Mitgliedschaft. Damit legen Sie Ihr Profil an, nutzen den Fragenflirt und antworten kostenlos auf Nachrichten von Premium-Mitgliedern." },
];

p.guide = [
  {
    title: "Die ehrlichste Zahl dieses Dossiers",
    html: "<p>St. Gallen hat einen Männerüberschuss unter den Ledigen: 127 ledige Männer je 100 ledige Frauen zwischen 25 und 54, bei den 30- bis 49-Jährigen sogar 137. Das ist mehr als in Zürich (116), Bern (105) oder Basel (113) und liegt über dem Schweizer Mittel von 125.</p><p>Die Gründe sind strukturell: Die Universität St.Gallen ist auf Wirtschaft, Recht und Sozialwissenschaften spezialisiert und zählt 35,3 Prozent Frauen – der tiefste Wert aller Schweizer Volluniversitäten. Die Region lebt zusätzlich von Technik, Maschinenbau und Informatik, Branchen mit ähnlicher Zusammensetzung.</p><p>Was heisst das praktisch? Für Frauen ist St. Gallen rechnerisch einer der komfortabelsten Partnermärkte des Landes. Für Männer bedeutet es: Ein durchdachtes Profil, eine persönliche erste Nachricht und Geduld bringen hier deutlich mehr als Masse. Wer das akzeptiert statt es zu beklagen, hat schon die halbe Miete.</p>",
  },
  {
    title: "Eine Universität, die die Stadt prägt",
    html: "<p>Die HSG gehört seit über hundert Jahren zu St. Gallen – anfangs als Handelsakademie, heute als eine der bekanntesten Wirtschaftsuniversitäten Europas mit 10.116 Studierenden und einer dichten Institutslandschaft. Der Campus liegt am Rosenberg oberhalb der Stadt, was in St. Gallen auch als soziale Grenze gelesen wird.</p><p>Daneben steht die OST, seit dem 1. September 2020 aus drei Fachhochschulen fusioniert: 4.030 Studierende, 42,7 Prozent davon Frauen, sechs Departemente, 35 Forschungsinstitute und 1.998 Mitarbeitende an Standorten in St.Gallen, Rapperswil-Jona und Buchs. Getragen wird sie von sechs Kantonen und dem Fürstentum Liechtenstein. Die PHSG bringt über 1.500 angehende Lehrerinnen und Lehrer dazu.</p><p>Für die Partnersuche ist dieser Mix wertvoller, als er zunächst aussieht: Die drei Hochschulen bringen sehr unterschiedliche Milieus in eine kleine Stadt – internationale Wirtschaftsstudierende, praxisorientierte Technikerinnen und Techniker, pädagogische Berufe. Sie begegnen sich im Alltag öfter als in einer Grossstadt.</p>",
  },
  {
    title: "Mehr Arbeitsplätze als Einwohner",
    html: "<p>Auf 100 Einwohnerinnen und Einwohner kommen in St. Gallen 111 Beschäftigte. Die Stadt ist das Zentrum einer Region, die jeden Morgen einpendelt – aus dem Appenzellerland, dem Rheintal, vom Bodensee und aus dem Toggenburg.</p><p>Das verändert den Alltag: Vieles spielt sich zwischen 8 und 18 Uhr ab, abends leert sich die Innenstadt schneller als in Zürich. Wer sich mit jemandem aus der Region verabredet, sollte die letzte Verbindung im Kopf haben – und ein Treffen lieber früher ansetzen.</p><p>Umgekehrt ist das eine Chance: Wer in der Stadt wohnt, hat kurze Wege zu allem, zahlt weniger Miete als in Zürich und erreicht Bodensee, Alpstein und Appenzell in weniger als einer Stunde. Für Paare mit zwei Berufen ist St. Gallen deshalb attraktiver, als es von aussen wirkt.</p>",
  },
  {
    title: "Was man hier gemeinsam unternimmt",
    html: "<p>Das verlässlichste Programm der Stadt sind die Drei Weieren: historische Badhäuser am Hang, kostenlos, mit Blick über die Stadt bis zum Bodensee. Von Mai bis September ist das der Ort, an dem sich halb St. Gallen nach Feierabend trifft.</p><p>Kulturell führt der Weg in den Stiftsbezirk mit der Stiftsbibliothek, die zum UNESCO-Welterbe gehört – einer der wenigen Orte, an denen man gemeinsam schweigen kann, ohne dass es unangenehm wird. Rundherum liegen Gallusplatz und Altstadt mit den bemalten Erkern.</p><p>Einmal im Jahr wird es international: Ende April findet das St. Gallen Symposium statt, seit 1969 von Studierenden organisiert, 2027 am 28. und 29. April mit über 1.400 Teilnehmenden aus mehr als 90 Nationen. Und wer die technisch-unternehmerische Seite der Stadt sucht, landet am Campus Lerchenfeld beim Startfeld-Netzwerk.</p>",
  },
  {
    title: "Wer hier bleibt und wer weiterzieht",
    html: "<p>Eine Universitätsstadt mit 79.487 Einwohnern hat immer zwei Bevölkerungen: die, die bleiben, und die, die nach dem Abschluss nach Zürich, Zug oder ins Ausland gehen. 50,6 Prozent der 25- bis 54-Jährigen sind ledig, 41,1 Prozent der Erwachsenen ab 20 – Werte, die zeigen, wie stark die Hochschulen die Altersstruktur prägen.</p><p>Gleichzeitig sind 11,2 Prozent der Erwachsenen geschieden. Die Partnersuche hier betrifft also beides: Menschen am Anfang und Menschen, die zum zweiten Mal anfangen. Beide Gruppen suchen in einer Stadt, in der man sich schnell über den Weg läuft.</p><p>Wer von aussen dazukommt, sollte wissen: St. Gallen ist freundlich, aber nicht aufdringlich. Kontakte entstehen über gemeinsame Aktivitäten – Verein, Chor, Sport, Weiterbildung – seltener über zufällige Gespräche an der Bar. Eine Plattform, auf der das Interesse von Anfang an klar ist, nimmt genau diese Hürde.</p>",
  },
  {
    title: "Was die Zahlen nicht sagen",
    html: "<p>Der Tertiäranteil von rund 46 Prozent stammt aus dem europäischen Städtevergleich der Stadtstatistik und bezieht sich auf die 25- bis 64-Jährigen; er ist gerundet und basiert auf einer Stichprobe. Die Studierendenzahlen der OST und der PHSG umfassen alle Standorte, nicht nur die Stadt.</p><p>Das Geschlechterverhältnis von 127 zu 100 ist ein Durchschnitt über drei Jahrzehnte Lebenszeit und sagt nichts über eine einzelne Altersgruppe oder ein einzelnes Milieu. Und „ledig“ bleibt ein Zivilstand: Viele der 18.144 ledigen 25- bis 54-Jährigen leben in festen Partnerschaften.</p><p>Was bleibt: eine kompakte Stadt mit drei Hochschulen, mehr Arbeitsplätzen als Einwohnern, kurzen Wegen in die Berge und einem Partnermarkt, der für Frauen statistisch günstig und für Männer anspruchsvoll ist. Beides lässt sich nutzen, wenn man es kennt.</p>",
  },
];

applySources(p, {
  einwohner: { publisher: "Bundesamt für Statistik (BFS)", title: "STATPOP, Tabelle px-x-0102010000_103: ständige Wohnbevölkerung nach Gemeinde (Bevölkerungsstand)", stand: "Stand 31.12.2025", url: "https://www.pxweb.bfs.admin.ch/api/v1/de/px-x-0102010000_103/px-x-0102010000_103.px" },
  "bfs-zivil": { publisher: "Bundesamt für Statistik (BFS)", title: "STATPOP, Tabelle px-x-0102010000_103: ständige Wohnbevölkerung nach Gemeinde, Geschlecht, Zivilstand und Altersklasse (Anteil Ledige, Geschiedene, Geschlechterverhältnis)", stand: "Stand 31.12.2025", url: "https://www.pxweb.bfs.admin.ch/api/v1/de/px-x-0102010000_103/px-x-0102010000_103.px" },
  "bfs-stud": { publisher: "Bundesamt für Statistik (BFS)", title: "Studierende an den universitären Hochschulen (px-x-1502040100_106) nach Fachbereich, Studienstufe, Geschlecht und Hochschule; Bachelor bis Doktorat ohne Weiterbildung", stand: "Wintersemester 2025/26", url: "https://www.pxweb.bfs.admin.ch/api/v1/de/px-x-1502040100_106/px-x-1502040100_106.px" },
  "ost-zahlen": { publisher: "OST Ostschweizer Fachhochschule", title: "Zahlen und Fakten: 4.030 Studierende (42,7 % Frauen), 1.998 Mitarbeitende, sechs Departemente, 35 Forschungsinstitute, drei Standorte; Fusion am 1. September 2020", stand: "Stand 31.12.2025", url: "https://www.ost.ch/de/die-ost/ueber-uns/zahlen-und-fakten" },
  "phsg-portraet": { publisher: "Pädagogische Hochschule St.Gallen", title: "Über uns: über 1.500 Studierende, knapp 600 Mitarbeitende, vier Hochschulgebäude in St.Gallen, Rorschach und Gossau", stand: "abgerufen 11/2026", url: "https://www.phsg.ch/de/ueber-uns" },
  "hsg-ueber": { publisher: "Universität St.Gallen (HSG)", title: "Über uns: seit mehr als hundert Jahren in St.Gallen, zu Beginn als Handelsakademie; Universität als Ort für Studierende und für die Bevölkerung der Region", stand: "abgerufen 11/2026", url: "https://www.unisg.ch/de/universitaet/ueber-uns/" },
});

writeFileSync(file, JSON.stringify(p, null, 1) + "\n");
console.log("St. Gallen geschrieben:", p.sources.length, "Quellen,", p.guide.length, "Guide-Kapitel,", p.universities.length, "Hochschulen");
