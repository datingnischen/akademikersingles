// Neues Stadtdossier Genf: ausgeglichenster Partnermarkt der Schweiz, höchste Tertiärquote und als
// Besonderheit die OCSTAT-Erhebung, wie Paare im Kanton Genf einander kennengelernt haben.
// Karte danach erzeugen: python scripts/build_city_map.py ch/genf
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { applySources, checkSeo } from "./_sources.mjs";

const file = "data/city-profiles/ch/genf.json";
const old = existsSync(file) ? JSON.parse(readFileSync(file, "utf8")) : {};

const p = {
  path: "/partnersuche/genf/",
  name: "Genf",
  heroAlt: "Aquarellzeichnung von Genf mit dem Jet d'eau über dem Genfersee und der Altstadt",
  country: "Schweiz",
  region: "Genf",
  seoTitle: "Akademiker Singles in Genf: 49 % mit Tertiärabschluss",
  seoDescription: "Genf in Zahlen: 49 % Tertiärabschluss, 103 ledige Männer je 100 ledige Frauen und 24 % der jungen Paare haben sich über Dating-Portale gefunden.",
  eyebrow: "Partnersuche für Akademiker · Universitäts- und UNO-Stadt am See",
  lead: "Genf ist der ausgeglichenste Partnermarkt der Schweiz: Auf 100 ledige Frauen zwischen 25 und 54 kommen 103 ledige Männer – schweizweit sind es 125. Dazu die höchste Tertiärquote des Landes (49 Prozent der 25- bis 64-Jährigen), 210.767 Arbeitsplätze in einer Stadt mit 211.152 Einwohnern und eine Besonderheit, die es sonst nirgends gibt: Die Genfer Statistik erhebt, wie Paare einander kennengelernt haben. Bei Paaren, die seit 2019 zusammengefunden haben, war es in 24,3 Prozent der Fälle ein Dating-Portal.",
  briefing: [
    { value: "49 %", label: "der 25- bis 64-Jährigen im Kanton Genf haben einen Tertiärabschluss – Frauen 50 %, Männer 48 %", source: "ocstat-formation" },
    { value: "103", label: "ledige Männer je 100 ledige Frauen (25 bis 54 Jahre) – schweizweit 125", source: "bfs-zivil" },
    { value: "24,3 %", label: "der Paare, die zwischen 2019 und 2023 entstanden sind, haben sich über Dating-Portale kennengelernt", source: "ocstat-rencontre" },
  ],
  kpis: [
    { value: "211.152", label: "Einwohnerinnen und Einwohner der Stadt Genf", source: "einwohner", note: "Ständige Wohnbevölkerung am 31.12.2025" },
    { value: "210.767", label: "Arbeitsplätze in der Stadt Genf", source: "ocstat-emplois", note: "24.728 Arbeitsstätten, Stand Dezember 2024 – fast so viele Arbeitsplätze wie Einwohner" },
    { value: "17.520", label: "Studierende an Universität Genf und Graduate Institute", source: "bfs-stud", note: "Wintersemester 2025/26: Université de Genève 16.481, Geneva Graduate Institute (IHEID) 1.039; Bachelor bis Doktorat ohne Weiterbildung" },
    { value: "47,5 %", label: "Einpersonenhaushalte in der Stadt Genf", source: "ocstat-menages", note: "42.629 von 89.749 Privathaushalten, Fünfjahresmittel 2020–2024" },
  ],
  dossier: [
    {
      key: "bildung",
      title: "Bildung",
      intro: "Nirgends in der Schweiz ist der Anteil der Hochqualifizierten so hoch – und nirgends liegen Frauen und Männer dabei so gleichauf.",
      metrics: [
        { value: "49 %", label: "der 25- bis 64-Jährigen haben einen Tertiärabschluss", source: "ocstat-formation", note: "Kanton Genf, Fünfjahresmittel 2019–2023 (Strukturerhebung): 49 % Tertiärstufe, 31 % Sekundarstufe II, 20 % obligatorische Schule. Bei den Erwerbstätigen sind es 53 %", compare: { city: 49, germany: 31, unit: " %", max: 60, cityLabel: "Tertiärstufe", compareLabel: "Sekundarstufe II" } },
        { value: "50 %", label: "der Frauen und 48 % der Männer im erwerbsfähigen Alter haben einen Tertiärabschluss", source: "ocstat-formation", note: "Kanton Genf, 25 bis 64 Jahre, Mittel 2019–2023. Bei den 25- bis 44-Jährigen haben 84 % mindestens einen Abschluss der Sekundarstufe II, bei den 45- bis 64-Jährigen 75 %" },
        { value: "62,9 %", label: "Frauenanteil unter den 16.481 Studierenden der Universität Genf", source: "bfs-stud", note: "Wintersemester 2025/26, Bachelor bis Doktorat ohne Weiterbildung: 10.362 von 16.481. Am Geneva Graduate Institute (1.039 Studierende) sind es 67,6 %" },
      ],
      takeaway: "Wer hier sucht, trifft auf ein Umfeld, in dem ein Hochschulabschluss weder Ausnahme noch Statussymbol ist.",
    },
    {
      key: "beruf",
      title: "Beruf & Erfolg",
      intro: "Internationale Organisationen, Banken, Uhren und Forschung: Genf hat fast so viele Arbeitsplätze wie Einwohner.",
      metrics: [
        { value: "210.767", label: "Arbeitsplätze in 24.728 Arbeitsstätten", source: "ocstat-emplois", note: "Stand Dezember 2024; 2011 waren es noch 186.264 Arbeitsplätze in 20.160 Arbeitsstätten" },
        { value: "25", label: "Mitgliedstaaten hat das CERN vor den Toren der Stadt, dazu elf assoziierte Mitglieder", source: "cern-governance", note: "Das europäische Kernforschungszentrum liegt in Meyrin an der französischen Grenze und beschäftigt Forschende aus aller Welt" },
        { value: "1927", label: "gegründet: das Geneva Graduate Institute für internationale Beziehungen und Entwicklung", source: "iheid-about", note: "Seine Absolventinnen und Absolventen arbeiten in UNO-Organisationen, Diplomatie und Entwicklungszusammenarbeit; unter den Alumni sind Nobel- und Pulitzerpreisträger" },
      ],
      takeaway: "Viele Lebensläufe hier haben zwei, drei Länder gesehen – und suchen jemanden, der das nicht erklärt bekommen muss.",
    },
    {
      key: "forschung",
      title: "Wie Paare sich finden",
      intro: "Genf ist der einzige Kanton, der erhebt, wie Paare einander kennengelernt haben. Die Zahlen zeigen, wie stark sich das in zehn Jahren verschoben hat.",
      metrics: [
        { value: "24,3 %", label: "der Paare, die zwischen 2019 und 2023 entstanden sind, haben sich über Dating-Sites oder -Apps gefunden", source: "ocstat-rencontre", note: "Kanton Genf, Erhebung 2023 unter Personen von 25 bis 80 Jahren in einer Partnerschaft. Bei Paaren, die vor 2013 zusammenkamen, waren es 3,2 %, zwischen 2013 und 2018 bereits 21,7 %", compare: { city: 24.3, germany: 3.2, unit: " %", max: 40, cityLabel: "Paare ab 2019", compareLabel: "Paare vor 2013" } },
        { value: "27,3 %", label: "der Menschen mit Tertiärabschluss haben ihre Partnerin oder ihren Partner in Ausbildung oder Beruf kennengelernt", source: "ocstat-rencontre", note: "Kanton Genf, Erhebung 2023; bei Personen mit obligatorischer Schulbildung sind es 13,5 %. Über Dating-Portale fanden 11,1 % der Tertiärgebildeten ihre Beziehung, über Freunde und Bekannte 33,2 %" },
        { value: "34,3 %", label: "aller Paare im Kanton Genf bestehen aus zwei Partnern mit Tertiärabschluss", source: "ocstat-couples", note: "32.240 von 93.983 Paaren, Fünfjahresmittel 2020–2024. Von den Männern mit Tertiärabschluss leben 73 % mit einer Partnerin mit Tertiärabschluss zusammen", compare: { city: 34.3, germany: 13.6, unit: " %", max: 45, cityLabel: "beide Tertiärstufe", compareLabel: "beide obligatorische Schule" } },
      ],
      takeaway: "Akademiker finden Akademiker – und immer häufiger über Portale, in denen das Niveau von Anfang an klar ist.",
    },
    {
      key: "singles",
      title: "Single-Leben",
      intro: "Mehr als die Hälfte der 25- bis 54-Jährigen ist ledig, fast jeder zweite Haushalt besteht aus einer Person – und das Geschlechterverhältnis ist das ausgeglichenste des Landes.",
      metrics: [
        { value: "53,3 %", label: "der 25- bis 54-Jährigen sind ledig", source: "bfs-zivil", note: "54.449 von 102.148 Personen dieser Altersgruppe (ständige Wohnbevölkerung, 31.12.2025); schweizweit 43,7 %. Ledig heisst nicht automatisch Single, auch unverheiratete Paare zählen dazu", compare: { city: 53.3, germany: 43.7, unit: " %", max: 65 } },
        { value: "103", label: "ledige Männer je 100 ledige Frauen zwischen 25 und 54", source: "bfs-zivil", note: "27.617 Männer zu 26.832 Frauen (31.12.2025). Schweizweit sind es 125, in Zürich 116, in St. Gallen 127 – Genf ist der ausgeglichenste Markt unserer Schweizer Dossiers", compare: { city: 103, germany: 125, unit: "", max: 145 } },
        { value: "12,9 %", label: "der Erwachsenen ab 20 sind geschieden – der höchste Wert unserer Schweizer Städte", source: "bfs-zivil", note: "Stand 31.12.2025; schweizweit 11,3 %. Ein zweiter Anlauf ist in Genf besonders verbreitet" },
      ],
      takeaway: "Rechnerisch der fairste Markt des Landes – und einer, in dem zweite Beziehungen zum Alltag gehören.",
    },
  ],
  universities: [
    { name: "Université de Genève (UNIGE)", kind: "Volluniversität des Kantons", students: "16.481", women: "62,9 %", source: "bfs-stud", text: "Eine der grössten Universitäten der Schweiz, mitten in der Stadt: Das Hauptgebäude liegt am Parc des Bastions, Medizin und Life Sciences am Campus Biotech und beim Universitätsspital. Mit knapp 63 Prozent hat sie einen der höchsten Frauenanteile des Landes." },
    { name: "Geneva Graduate Institute (IHEID)", kind: "Hochschulinstitut für internationale Beziehungen", founded: "1927", students: "1.039", women: "67,6 %", source: "bfs-stud", compareSource: "iheid-about", text: "Seit 1927 bildet das Institut an der Maison de la paix für internationale Beziehungen und Entwicklungszusammenarbeit aus – mit Master- und Doktoratsprogrammen und Alumni in UNO-Organisationen, Diplomatie und Forschung." },
    { name: "CERN", kind: "Europäische Organisation für Kernforschung", source: "cern-governance", text: "Das grösste Teilchenphysiklabor der Welt liegt in Meyrin an der Stadtgrenze und wird von 25 Mitgliedstaaten und elf assoziierten Mitgliedern getragen. Wer in Genf jemanden aus der Physik trifft, trifft meistens jemanden von hier." },
    { name: "Hôpitaux universitaires de Genève", kind: "Universitätsspital", source: "ocstat-emplois", text: "Das Universitätsspital ist einer der grössten Arbeitgeber des Kantons und Lehrkrankenhaus der UNIGE – mit allem, was Schichtdienste für Verabredungen bedeuten." },
  ],
  universitiesNote: "Studierendenzahlen für das Wintersemester 2025/26 ohne Weiterbildung. Dazu kommen die HES-SO Genève mit ihren Fachhochschulen und die Haute école d'art et de design.",
  clusters: [
    { name: "Internationale Organisationen", text: "Genf ist europäischer UNO-Sitz und Standort zahlreicher internationaler Organisationen und Nichtregierungsorganisationen – ein Arbeitsmarkt mit hoher Akademikerdichte und vielen befristeten Verträgen." },
    { name: "Forschung & Teilchenphysik", text: "Das CERN in Meyrin wird von 25 Mitgliedstaaten und elf assoziierten Mitgliedern getragen; der Campus Biotech in der Stadt bündelt Neurowissenschaften und Biotechnologie." },
    { name: "Hochschulen", text: "Université de Genève (16.481 Studierende, 62,9 % Frauen) und Geneva Graduate Institute (1.039 Studierende) prägen das akademische Leben der Stadt (Wintersemester 2025/26)." },
    { name: "Finanzplatz & Rohstoffhandel", text: "Private Banken, Vermögensverwaltung und Rohstoffhandel gehören zu den grossen Arbeitgebern; insgesamt zählt die Stadt 210.767 Arbeitsplätze in 24.728 Arbeitsstätten (Dezember 2024)." },
    { name: "Uhren & Luxus", text: "Die Uhrenindustrie und das Luxussegment haben in Genf ihren historischen Kern – mit Entwicklung, Design und Vertrieb auf Stadtgebiet." },
  ],
  clusterSources: ["bfs-stud", "cern-governance", "ocstat-emplois"],
  places: [
    { name: "Université de Genève, Uni Bastions", kind: "work", district: "Cité-Centre · Parc des Bastions", text: "Das Hauptgebäude der Universität liegt direkt am Park – Vorlesungen und Spaziergang trennen hier dreissig Sekunden.", lat: 46.1989, lon: 6.1446 },
    { name: "Campus Biotech", kind: "work", district: "Sécheron · Avenue de Sécheron", text: "Neurowissenschaften, Biotechnologie und Forschungsgruppen der UNIGE und der EPFL unter einem Dach, direkt am See.", lat: 46.2218, lon: 6.1472 },
    { name: "Hôpitaux universitaires de Genève", kind: "work", district: "Champel · Rue Gabrielle-Perret-Gentil", text: "Universitätsspital und Lehrkrankenhaus der UNIGE, einer der grössten Arbeitgeber des Kantons.", lat: 46.192, lon: 6.1479 },
    { name: "Palais des Nations", kind: "work", district: "Nations · Avenue de la Paix", text: "Europäischer Sitz der Vereinten Nationen und Zentrum des internationalen Genf – rundherum liegen Missionen und Organisationen.", lat: 46.2257, lon: 6.1408 },
    { name: "Geneva Graduate Institute", kind: "work", district: "Nations · Maison de la paix", text: "Seit 1927 Ausbildungsort für internationale Beziehungen und Entwicklung, heute an der Maison de la paix neben dem UNO-Quartier.", lat: 46.221, lon: 6.1439 },
    { name: "Parc des Bastions", kind: "date", district: "Cité-Centre", text: "Der Universitätspark mit Reformationsdenkmal und Riesenschachbrettern – der naheliegendste Treffpunkt der Stadt.", lat: 46.1994, lon: 6.1453 },
    { name: "Jet d'eau", kind: "date", district: "Eaux-Vives · Quai Gustave-Ador", text: "Das Wahrzeichen Genfs am Seeufer; der Spaziergang vom Quai bis zum Jardin Anglais dauert genau so lange wie ein gutes erstes Gespräch.", lat: 46.2074, lon: 6.1559 },
    { name: "Bains des Pâquis", kind: "date", district: "Pâquis · Quai du Mont-Blanc", text: "Badeanstalt, Sauna und Buvette mitten im See – im Sommer wie im Winter der demokratischste Ort der Stadt.", lat: 46.2114, lon: 6.1528 },
    { name: "Plaine de Plainpalais", kind: "date", district: "Plainpalais", text: "Flohmarkt, Skatepark und Foodtrucks auf einer Fläche, an der auch die Universität liegt – hier trifft sich studentisches Genf.", lat: 46.1974, lon: 6.1409 },
    { name: "Parc La Grange", kind: "date", district: "Eaux-Vives", text: "Rosengarten und Seeblick auf der linken Seeseite, im Sommer mit Open-Air-Programm.", lat: 46.2105, lon: 6.1706 },
  ],
  map: {
    bounds: { west: 6.1, east: 6.185, south: 46.18, north: 46.24 },
    rivers: [],
    areas: [],
    labels: [
      { text: "Lac Léman", lat: 46.2205, lon: 6.1595 },
      { text: "Rhône", lat: 46.2065, lon: 6.1265 },
      { text: "Arve", lat: 46.1885, lon: 6.1355 },
      { text: "Cité-Centre", lat: 46.2005, lon: 6.1455, district: true },
      { text: "Pâquis", lat: 46.2125, lon: 6.1475, district: true },
      { text: "Eaux-Vives", lat: 46.2055, lon: 6.1645, district: true },
      { text: "Plainpalais", lat: 46.1955, lon: 6.1395, district: true },
      { text: "Champel", lat: 46.1885, lon: 6.1525, district: true },
      { text: "Servette", lat: 46.2155, lon: 6.1285, district: true },
    ],
  },
  mapSpec: { rivers: [{ name: "Le Rhône", major: true }, { name: "L'Arve" }], lakes: [], parks: ["Parc des Bastions", "Parc La Grange", "Parc des Eaux-Vives", "Parc Mon-Repos", "Jardin Anglais"], boundary: "Genève" },
  quarters: [
    { name: "Cité-Centre", label: "Altstadt und Universität", text: "Zwischen Kathedrale Saint-Pierre, Parc des Bastions und Uni-Hauptgebäude liegt das akademische Zentrum. Buchhandlungen, Cafés, kurze Wege – und abends das ruhigste Pflaster der Innenstadt." },
    { name: "Pâquis", label: "Rechtes Seeufer", text: "Dichtes, internationales Quartier zwischen Bahnhof und See: Restaurants aus aller Welt, die Bains des Pâquis als Treffpunkt und die kürzeste Distanz zwischen UNO-Viertel und Innenstadt." },
    { name: "Eaux-Vives", label: "Linkes Seeufer", text: "Jet d'eau, Parc La Grange und die neue Bahnhofslinie nach Annemasse. Beliebt bei allen, die am Wasser wohnen und trotzdem in zehn Minuten im Büro sein wollen." },
    { name: "Plainpalais & Jonction", label: "Studentisches Genf", text: "Rund um die Plaine de Plainpalais liegen Universitätsgebäude, Kinos und die lebendigste Beizenszene. Hier wohnt, wer in Genf jung ist – oder es bleiben will." },
    { name: "Champel", label: "Bürgerliche Hanglage", text: "Zwischen Universitätsspital und Arve-Ufer: ruhige Strassen, Praxen und Kanzleien, viel Grün. Das Quartier für alle, die beruflich angekommen sind." },
    { name: "Nations & Sécheron", label: "Internationales Viertel", text: "Palais des Nations, Missionen, Organisationen und der Campus Biotech. Wer hier arbeitet, hat Kolleginnen und Kollegen aus dreissig Ländern – und Verträge, die oft auf drei Jahre laufen." },
  ],
  agenda: [
    { title: "Öffentliche Vorlesungen und Konferenzen der UNIGE", when: "Semesterweise", text: "Die Universität Genf öffnet Vorlesungsreihen und Konferenzen für die Öffentlichkeit, oft an der Uni Dufour oder in den Instituten. Kostenlos, inhaltlich anspruchsvoll – und ein Thema für danach.", href: "https://www.unige.ch/" },
    { title: "Bains des Pâquis", when: "Ganzjährig", text: "Die Badeanstalt im See ist Treffpunkt, Sauna, Fondue-Stube und Konzertbühne in einem. Eintritt kostet zwei Franken; ein Treffen hier ist unprätentiös und funktioniert bei jedem Wetter.", href: "https://www.bains-des-paquis.ch/" },
    { title: "Spaziergang Quai Wilson bis Jet d'eau", when: "Ganzjährig", text: "Vom rechten Seeufer über die Mont-Blanc-Brücke zum Jardin Anglais und weiter zum Jet d'eau: eine knappe Stunde, bei der man nebeneinander geht statt sich gegenüberzusitzen." },
    { title: "Flohmarkt auf der Plaine de Plainpalais", when: "Mittwoch und Samstag", text: "Zweimal pro Woche verwandelt sich die grosse Fläche neben der Universität in einen Flohmarkt. Guter Ort für ein zweites Treffen: Man läuft, schaut, redet – und kauft am Ende nichts." },
  ],
  talkingPoints: [
    { title: "Der ausgeglichenste Markt der Schweiz", text: "103 ledige Männer je 100 ledige Frauen zwischen 25 und 54 – schweizweit sind es 125. Wer aus Zürich (116) oder St. Gallen (127) nach Genf zieht, merkt den Unterschied nicht in der Statistik, sondern im Antwortverhalten." },
    { title: "Wie man sich hier kennenlernt", text: "Die Genfer Statistik fragt danach: Bei Paaren, die zwischen 2019 und 2023 zusammengekommen sind, war in 24,3 Prozent der Fälle ein Dating-Portal im Spiel, bei Paaren von vor 2013 nur in 3,2 Prozent. Freunde und Bekannte bleiben mit 30,4 Prozent der häufigste Weg." },
    { title: "Befristet, international, mobil", text: "Internationale Organisationen arbeiten mit Verträgen über zwei, drei oder vier Jahre. Die Frage, wie lange jemand bleibt, ist in Genf deshalb keine Floskel – sondern die wichtigste Frage des zweiten Abends." },
  ],
  faq: [
    { question: "Wie viele Akademiker leben in Genf?", answer: "Im Kanton Genf haben 49 Prozent der 25- bis 64-Jährigen einen Tertiärabschluss – der höchste Wert der Schweiz (Fünfjahresmittel 2019–2023, OCSTAT nach Strukturerhebung). Bei den Frauen sind es 50 Prozent, bei den Männern 48 Prozent; unter den Erwerbstätigen 53 Prozent." },
    { question: "Gibt es in Genf mehr ledige Männer oder Frauen?", answer: "Das Verhältnis ist nahezu ausgeglichen: Auf 100 ledige Frauen zwischen 25 und 54 kommen 103 ledige Männer (27.617 zu 26.832, BFS STATPOP am 31.12.2025). Schweizweit sind es 125. Genf ist damit der ausgeglichenste Partnermarkt unserer Schweizer Stadtdossiers." },
    { question: "Wie lernen sich Paare in Genf kennen?", answer: "Die Genfer Statistik hat 2023 Personen von 25 bis 80 Jahren in Partnerschaften befragt: Bei Paaren, die zwischen 2019 und 2023 entstanden sind, kamen 24,3 Prozent über Dating-Sites oder -Apps zusammen, 30,4 Prozent über Freunde und Bekannte und 18 Prozent über Ausbildung oder Arbeit. Vor 2013 lag der Anteil der Dating-Portale bei 3,2 Prozent." },
    { question: "Suchen Akademiker in Genf eher Akademiker?", answer: "Die Zahlen legen das nahe: In 34,3 Prozent aller Genfer Paare haben beide Partner einen Tertiärabschluss (32.240 von 93.983 Paaren, Mittel 2020–2024). Von den Männern mit Tertiärabschluss leben 73 Prozent mit einer Partnerin zusammen, die ebenfalls einen Tertiärabschluss hat." },
    { question: "Wie viele Studierende hat Genf?", answer: "An der Université de Genève sind im Wintersemester 2025/26 16.481 Menschen eingeschrieben (62,9 Prozent davon Frauen), am Geneva Graduate Institute 1.039 (67,6 Prozent Frauen). Dazu kommen die Fachhochschulen der HES-SO Genève und die Haute école d'art et de design." },
    { question: "Wo lernen Akademiker in Genf Singles kennen?", answer: "Bei öffentlichen Vorlesungen und Konferenzen der UNIGE, in den Bains des Pâquis, auf der Plaine de Plainpalais, im Parc des Bastions oder beim Spaziergang vom Quai Wilson zum Jet d'eau. Wer gezielt Menschen mit ähnlichem Bildungshintergrund sucht, findet sie bei AkademikerSingles: Jedes Profil wird manuell geprüft." },
    { question: "Ist die Anmeldung kostenlos?", answer: "Ja. Die Registrierung ist kostenfrei und beinhaltet die Basis-Mitgliedschaft. Damit legen Sie Ihr Profil an, nutzen den Fragenflirt und antworten kostenlos auf Nachrichten von Premium-Mitgliedern." },
  ],
  guide: [
    {
      title: "Die Stadt mit der höchsten Akademikerquote der Schweiz",
      html: "<p>49 Prozent der 25- bis 64-Jährigen im Kanton Genf haben einen Abschluss auf Tertiärstufe – Hochschule oder höhere Berufsbildung. 31 Prozent haben einen Abschluss der Sekundarstufe II, 20 Prozent nicht mehr als die obligatorische Schule. Unter den Erwerbstätigen steigt der Tertiäranteil auf 53 Prozent.</p><p>Bemerkenswert ist, wie gleichmässig sich das verteilt: Bei den Frauen liegt die Quote bei 50 Prozent, bei den Männern bei 48. In vielen Städten klafft hier eine Lücke, die sich bis in die Partnersuche auswirkt – in Genf nicht.</p><p>Das zeigt sich auch beim Nachwuchs: 84 Prozent der 25- bis 44-Jährigen haben mindestens einen Abschluss der Sekundarstufe II, bei den 45- bis 64-Jährigen sind es 75 Prozent. Genf wird also weiter akademischer, nicht weniger.</p>",
    },
    {
      title: "103 zu 100: der fairste Markt des Landes",
      html: "<p>In der Schweiz kommen auf 100 ledige Frauen zwischen 25 und 54 im Schnitt 125 ledige Männer. In Zug sind es 138, in St. Gallen 127, in Zürich 116 – und in Genf 103. Mit 27.617 ledigen Männern und 26.832 ledigen Frauen ist der Genfer Partnermarkt praktisch im Gleichgewicht.</p><p>Hinzu kommt: 53,3 Prozent der 25- bis 54-Jährigen sind ledig, deutlich über dem Landesschnitt von 43,7 Prozent, und 47,5 Prozent der Haushalte bestehen aus einer Person. Genf ist eine Stadt, in der man unabhängig lebt, ohne dass das erklärungsbedürftig wäre.</p><p>Die dritte Zahl gehört dazu: 12,9 Prozent der Erwachsenen ab 20 sind geschieden, der höchste Wert unserer Schweizer Dossiers. Zweite Beziehungen sind hier kein Sonderfall, sondern Normalität – was den Umgang miteinander oft ehrlicher macht.</p>",
    },
    {
      title: "Was die Genfer Statistik über das Kennenlernen weiss",
      html: "<p>Genf ist der einzige Kanton, der systematisch erhebt, wie Paare einander kennengelernt haben. 2023 wurden dafür Personen zwischen 25 und 80 Jahren befragt, die in einer Partnerschaft leben. Das Ergebnis liest sich wie eine Zeitgeschichte der Partnersuche.</p><p>Bei Paaren, die vor 2013 zusammenkamen, spielten Dating-Portale mit 3,2 Prozent kaum eine Rolle. Bei Paaren aus den Jahren 2013 bis 2018 waren es 21,7 Prozent, bei Paaren ab 2019 bereits 24,3 Prozent. Konstant geblieben ist der stärkste Weg: Freunde und Bekannte, zuletzt 30,4 Prozent. Ausbildung und Arbeit folgen mit 18 Prozent.</p><p>Interessant ist der Blick nach Bildungsgrad. Menschen mit Tertiärabschluss lernen ihre Partnerin oder ihren Partner überdurchschnittlich oft in Ausbildung oder Beruf kennen (27,3 Prozent gegenüber 13,5 Prozent bei Personen mit obligatorischer Schulbildung) – und nutzen Dating-Portale mit 11,1 Prozent etwas häufiger als der Durchschnitt. Wer sich also fragt, ob ein Portal das richtige Mittel ist: In Genf ist es für ein Viertel der jüngeren Paare die Antwort gewesen.</p>",
    },
    {
      title: "Akademiker finden Akademiker – mit Zahlen belegt",
      html: "<p>Die zweite Genfer Besonderheit ist eine Tabelle, die es so kaum irgendwo gibt: Paare nach dem Bildungsniveau beider Partner. Von 93.983 Paaren im Kanton haben 32.240 zwei Partner mit Tertiärabschluss – 34,3 Prozent. Zum Vergleich: In 12.823 Paaren haben beide höchstens die obligatorische Schule abgeschlossen.</p><p>Noch deutlicher wird es aus der Perspektive der Einzelnen. Von den 44.230 Männern mit Tertiärabschluss leben 32.240 mit einer Partnerin zusammen, die ebenfalls tertiär gebildet ist – das sind 73 Prozent. Bei den Frauen mit Tertiärabschluss sind es 76 Prozent.</p><p>Diese Zahlen sagen nichts darüber, ob Bildung glücklich macht. Sie zeigen aber, dass gemeinsamer Bildungshintergrund für die meisten Paare keine Nebensache ist – und erklären, warum eine Plattform, die genau dort ansetzt, in dieser Stadt Sinn ergibt.</p>",
    },
    {
      title: "Arbeiten in Genf: international und befristet",
      html: "<p>210.767 Arbeitsplätze in 24.728 Arbeitsstätten zählt die Stadt (Dezember 2024) – bei 211.152 Einwohnern. 2011 waren es noch 186.264 Arbeitsplätze; Genf wächst also als Arbeitsort schneller als als Wohnort, was den Pendelverkehr aus der Waadt und aus Frankreich erklärt.</p><p>Die akademisch geprägten Arbeitgeber sind schnell aufgezählt: das internationale Genf rund um den Palais des Nations, die Universität mit ihren Instituten, das Universitätsspital, das Geneva Graduate Institute, der Campus Biotech – und, gleich vor den Toren der Stadt in Meyrin, das CERN mit seinen 25 Mitgliedstaaten und elf assoziierten Mitgliedern.</p><p>Was man dazu wissen sollte: Viele Stellen in internationalen Organisationen sind befristet. Zwei bis vier Jahre sind üblich, Verlängerungen ungewiss. Beziehungen in Genf stehen deshalb oft früh vor der Frage, wessen Vertrag die gemeinsame Zukunft bestimmt – und wer bereit wäre, mitzugehen.</p>",
    },
    {
      title: "Was die Zahlen nicht sagen",
      html: "<p>Die Bildungs-, Paar- und Kennenlerndaten dieser Seite stammen aus der Strukturerhebung und aus Befragungen des kantonalen Statistikamts und gelten für den <em>Kanton</em> Genf; Haushalts- und Beschäftigtenzahlen beziehen sich auf die Stadt. Befragungsdaten haben Vertrauensintervalle: Je kleiner die Gruppe, desto breiter die Spanne.</p><p>„Ledig“ bleibt ein Zivilstand und kein Beziehungsstatus – in der Westschweiz ist das Zusammenleben ohne Trauschein besonders verbreitet. Und die 24,3 Prozent, die sich über ein Portal gefunden haben, sagen nichts darüber, wie viele es versucht und nicht gefunden haben.</p><p>Was bleibt: Genf ist akademisch so dicht wie keine andere Schweizer Stadt, beim Geschlechterverhältnis nahezu im Gleichgewicht, international geprägt und erstaunlich offen für neue Wege der Partnersuche. Wer Französisch spricht oder lernt, hat es dabei deutlich leichter.</p>",
    },
  ],
  hubFacts: [
    { label: "Hochschul- oder Tertiärabschluss", value: "49 %" },
    { label: "Studierende", value: "17.520" },
    { label: "ledig (25–54 Jahre)", value: "53,3 %" },
    { label: "ledige Männer je 100 Frauen", value: "103" },
  ],
  sources: [],
};

if (old.map?.rivers?.length || old.map?.areas?.length) p.map = { ...p.map, rivers: old.map.rivers, areas: old.map.areas, boundary: old.map.boundary };

applySources(p, {
  einwohner: { publisher: "Bundesamt für Statistik (BFS)", title: "STATPOP, Tabelle px-x-0102010000_103: ständige Wohnbevölkerung nach Gemeinde (Bevölkerungsstand)", stand: "Stand 31.12.2025", url: "https://www.pxweb.bfs.admin.ch/api/v1/de/px-x-0102010000_103/px-x-0102010000_103.px" },
  "bfs-zivil": { publisher: "Bundesamt für Statistik (BFS)", title: "STATPOP, Tabelle px-x-0102010000_103: ständige Wohnbevölkerung nach Gemeinde, Geschlecht, Zivilstand und Altersklasse (Anteil Ledige, Geschiedene, Geschlechterverhältnis)", stand: "Stand 31.12.2025", url: "https://www.pxweb.bfs.admin.ch/api/v1/de/px-x-0102010000_103/px-x-0102010000_103.px" },
  "bfs-stud": { publisher: "Bundesamt für Statistik (BFS)", title: "Studierende an den universitären Hochschulen (px-x-1502040100_106) nach Fachbereich, Studienstufe, Geschlecht und Hochschule; Bachelor bis Doktorat ohne Weiterbildung", stand: "Wintersemester 2025/26", url: "https://www.pxweb.bfs.admin.ch/api/v1/de/px-x-1502040100_106/px-x-1502040100_106.px" },
  "ocstat-formation": { publisher: "Office cantonal de la statistique (OCSTAT), Kanton Genf", title: "Meldung vom 24.06.2025: Niveau de formation de la population résidant dans le canton de Genève – 49 % der 25- bis 64-Jährigen mit Tertiärabschluss (Frauen 50 %, Männer 48 %), 31 % Sekundarstufe II, 20 % obligatorische Schule", stand: "Fünfjahresmittel 2019–2023 (Strukturerhebung)", url: "https://statistique.ge.ch/actualites/welcome.asp?actu=5677" },
  "ocstat-menages": { publisher: "Office cantonal de la statistique (OCSTAT), Kanton Genf", title: "Tabelle T 01.05.3.04: Ménages privés selon la taille du ménage, par commune – Stadt Genf 42.629 Einpersonenhaushalte von 89.749 Privathaushalten", stand: "Fünfjahresmittel 2020–2024", url: "https://statistique.ge.ch/tel/domaines/01/01_05/T_01_05_3_04.xlsx" },
  "ocstat-emplois": { publisher: "Office cantonal de la statistique (OCSTAT), Kanton Genf", title: "Tabelle T 06.02.2.1.02: Etablissements et emplois par commune – Stadt Genf 210.767 Arbeitsplätze in 24.728 Arbeitsstätten", stand: "Stand Dezember 2024", url: "https://statistique.ge.ch/tel/domaines/06/06_02/T_06_02_2_1_02.xlsx" },
  "ocstat-rencontre": { publisher: "Office cantonal de la statistique (OCSTAT), Kanton Genf", title: "Tabelle T 01.05.5.03: Mode de rencontre de la ou du partenaire, selon la date de formation du couple, le groupe d'âges et le niveau de formation (Personen von 25 bis 80 Jahren in Partnerschaft)", stand: "Erhebung 2023", url: "https://statistique.ge.ch/tel/domaines/01/01_05/T_01_05_5_03.xlsx" },
  "ocstat-couples": { publisher: "Office cantonal de la statistique (OCSTAT), Kanton Genf", title: "Tabelle T 01.05.1.04: Couples selon le sexe et le niveau de formation achevée le plus élevé des conjoints – 32.240 von 93.983 Paaren mit zwei Tertiärabschlüssen", stand: "Fünfjahresmittel 2020–2024", url: "https://statistique.ge.ch/tel/domaines/01/01_05/T_01_05_1_04.xlsx" },
  "cern-governance": { publisher: "CERN", title: "Our governance: CERN wird von 25 Mitgliedstaaten und elf assoziierten Mitgliedstaaten getragen", stand: "abgerufen 11/2026", url: "https://home.cern/about/who-we-are/our-governance" },
  "iheid-about": { publisher: "Geneva Graduate Institute (IHEID)", title: "Discover the Institute: Master- und PhD-Programme für internationale Beziehungen und Entwicklung, seit 1927", stand: "abgerufen 11/2026", url: "https://www.graduateinstitute.ch/discover-institute" },
});

checkSeo(p);
writeFileSync(file, JSON.stringify(p, null, 1) + "\n");
console.log("Genf geschrieben:", p.sources.length, "Quellen,", p.guide.length, "Guide-Kapitel,", p.universities.length, "Hochschulen");
