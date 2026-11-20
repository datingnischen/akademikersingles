// Neues Stadtdossier Krems an der Donau: drei Hochschulen auf dem Campus Krems, darunter Europas führende
// öffentliche Universität für Weiterbildung – die Stadt für Akademiker mitten im Berufsleben.
// Karte danach erzeugen: python scripts/build_city_map.py at/krems
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { applySources, checkSeo } from "./_sources.mjs";

const file = "data/city-profiles/at/krems.json";
const old = existsSync(file) ? JSON.parse(readFileSync(file, "utf8")) : {};

const p = {
  path: "/partnersuche/krems/",
  name: "Krems",
  heroAlt: "Aquarellzeichnung von Krems an der Donau mit Steiner Tor und den Weinbergen der Wachau",
  country: "Österreich",
  region: "Niederösterreich",
  seoTitle: "Akademiker Singles in Krems: drei Hochschulen, Wachau",
  seoDescription: "Krems in Zahlen: drei Hochschulen am Campus, 6.440 Studierende an der Universität für Weiterbildung und 20.323 Arbeitsplätze bei 25.404 Einwohnern.",
  eyebrow: "Partnersuche für Akademiker · Campusstadt am Tor zur Wachau",
  lead: "Krems hat 25.404 Einwohner – und drei Hochschulen auf einem Campus. Die Universität für Weiterbildung Krems ist nach eigenen Angaben die führende öffentliche Universität für Weiterbildung in Europa: Ihre 6.440 Studierenden stehen fast alle mitten im Berufsleben. Dazu kommen die IMC Fachhochschule und die Karl Landsteiner Privatuniversität für Gesundheitswissenschaften. Wer hier jemanden kennenlernt, trifft selten auf Erstsemester – und oft auf Menschen mit zweitem Bildungsweg und klarem Kopf.",
  briefing: [
    { value: "6.440", label: "Studierende an der Universität für Weiterbildung Krems – fast alle berufsbegleitend", source: "uni-stud" },
    { value: "20.323", label: "Arbeitsplätze bei 25.404 Einwohnerinnen und Einwohnern", source: "aest-gemeinde" },
    { value: "17,8 %", label: "der Einwohnerinnen und Einwohner ab 15 Jahren haben einen Hochschul-, Akademie- oder Kollegabschluss – Niederösterreich 15,1 %", source: "aest-gemeinde" },
  ],
  kpis: [
    { value: "25.404", label: "Einwohnerinnen und Einwohner in Krems an der Donau", source: "aest-gemeinde", note: "Abgestimmte Erwerbsstatistik 2024, Stichtag 31.10.2024" },
    { value: "3", label: "Hochschulen auf dem Campus Krems", source: "donau-uni", note: "Universität für Weiterbildung Krems, IMC Fachhochschule Krems und Karl Landsteiner Privatuniversität für Gesundheitswissenschaften teilen sich das Campusgelände" },
    { value: "7.500", label: "Studierende sind an der Universität für Weiterbildung derzeit zugelassen (eigene Angabe)", source: "donau-uni", note: "Statistik Austria zählt für das Wintersemester 2025/26 6.440 Studierende; mehr als 33.000 Menschen haben ihr Studium hier bereits abgeschlossen" },
    { value: "12.244", label: "Privathaushalte mit durchschnittlich 1,97 Personen", source: "aest-gemeinde", note: "Abgestimmte Erwerbsstatistik 2024; die kleine Haushaltsgröße entspricht eher einer Großstadt als einer Bezirksstadt" },
  ],
  dossier: [
    {
      key: "bildung",
      title: "Bildung",
      intro: "Drei Hochschulen auf einem Campus – und eine Universität, deren Studierende überwiegend berufstätig sind.",
      metrics: [
        { value: "17,8 %", label: "der Einwohnerinnen und Einwohner ab 15 Jahren haben einen Hochschul-, Akademie- oder Kollegabschluss", source: "aest-gemeinde", note: "Abgestimmte Erwerbsstatistik 2024; Niederösterreich 15,1 %, Österreich 17,6 %", compare: { city: 17.8, germany: 17.6, unit: " %", max: 26 } },
        { value: "6.440", label: "Studierende an der Universität für Weiterbildung Krems", source: "uni-stud", compareSource: "donau-uni", note: "Wintersemester 2025/26 (Statistik Austria); die Universität selbst nennt rund 7.500 zugelassene Studierende und mehr als 33.000 Absolventinnen und Absolventen" },
        { value: "33.000", label: "Absolventinnen und Absolventen hat die Universität für Weiterbildung bereits hervorgebracht", source: "donau-uni", note: "Eigene Angabe der Universität; sie führt berufsbegleitende Bachelor- und Masterstudien der Weiterbildung, Kurzprogramme und PhD-Studien und trägt das Qualitätssiegel der AQ Austria" },
      ],
      takeaway: "Wer in Krems studiert, hat meist schon einen Beruf – und eine Vorstellung davon, was er oder sie vom Leben will.",
    },
    {
      key: "beruf",
      title: "Beruf & Erfolg",
      intro: "Mehr Arbeitsplätze als Haushalte: Krems ist Zentrum einer Region, die von Bildung, Gesundheit und Weinbau lebt.",
      metrics: [
        { value: "20.323", label: "Beschäftigte in Kremser Arbeitsstätten", source: "aest-gemeinde", note: "2.653 Arbeitsstätten, 2.100 Unternehmen; 88,0 % der Arbeitsstätten im tertiären Sektor (Stichtag 31.10.2024)" },
        { value: "48,6 %", label: "der Kremser Erwerbstätigen pendeln aus der Stadt aus", source: "aest-gemeinde", note: "Abgestimmte Erwerbsstatistik 2024; Niederösterreich 73,3 %. Krems hält also deutlich mehr Menschen in der Stadt als das Bundesland insgesamt" },
        { value: "21,6 %", label: "der Bevölkerung haben keine österreichische Staatsangehörigkeit", source: "aest-gemeinde", note: "Abgestimmte Erwerbsstatistik 2024; Niederösterreich 12,4 %. Hochschulen und Gesundheitswesen ziehen Menschen aus dem Ausland an" },
      ],
      takeaway: "Universität, Klinikum, Kunstmeile: Drei Arbeitswelten, die sich in einer Stadt dieser Größe zwangsläufig begegnen.",
    },
    {
      key: "singles",
      title: "Single-Leben",
      intro: "Kleine Haushalte, deutlicher Männerüberschuss und eine Altersstruktur, die älter ist als in den Universitätsstädten.",
      metrics: [
        { value: "114", label: "Männer je 100 Frauen zwischen 30 und 49 Jahren", source: "bev-alter", note: "3.419 Männer zu 3.002 Frauen am 01.01.2026; in Wien sind es 103, in Graz 109. Für Frauen ist der Kremser Markt damit rechnerisch günstig", compare: { city: 113.9, germany: 103, unit: "", max: 125 } },
        { value: "1,97", label: "Personen je Privathaushalt – kleiner als im niederösterreichischen Schnitt (2,24)", source: "aest-gemeinde", note: "12.244 Privathaushalte, Abgestimmte Erwerbsstatistik 2024. Krems wohnt städtischer, als es die Größe vermuten lässt" },
        { value: "23,4 %", label: "der Bevölkerung sind 65 Jahre oder älter", source: "aest-gemeinde", note: "Abgestimmte Erwerbsstatistik 2024; Niederösterreich 21,6 %, Österreich 20,2 %. Die Weiterbildungsuniversität bringt kaum klassische Studienanfänger in die Stadt" },
      ],
      takeaway: "Hier sucht man selten das erste Mal – und meistens mit sehr konkreten Vorstellungen.",
    },
  ],
  universities: [
    { name: "Universität für Weiterbildung Krems", kind: "Öffentliche Universität für Weiterbildung", founded: "1995", students: "6.440", source: "uni-stud", compareSource: "donau-uni", text: "Nach eigenen Angaben die führende öffentliche Universität für Weiterbildung in Europa: spezialisiert auf die Höherqualifizierung von Berufstätigen, mit berufsbegleitenden Bachelor- und Masterstudien, Kurzprogrammen und PhD-Studien. Rund 7.500 Studierende sind zugelassen, mehr als 33.000 haben bereits abgeschlossen." },
    { name: "IMC Fachhochschule Krems", kind: "Fachhochschule", students: "", source: "imc-krems", text: "Wirtschaft, Gesundheit, Life Sciences und Digitalisierung, stark international ausgerichtet und mit vielen Austauschstudierenden. Die IMC teilt sich das Campusgelände mit Universität und Privatuniversität." },
    { name: "Karl Landsteiner Privatuniversität", kind: "Privatuniversität für Gesundheitswissenschaften", students: "", source: "kl-krems", text: "Medizin und Psychologie in kleinen Jahrgängen, eng verzahnt mit dem Universitätsklinikum Krems und den niederösterreichischen Kliniken. Benannt nach dem Nobelpreisträger Karl Landsteiner." },
    { name: "Universitätsklinikum Krems", kind: "Universitätsklinikum", students: "", source: "kl-krems", text: "Lehr- und Forschungsklinik der Karl Landsteiner Privatuniversität und einer der größten Arbeitgeber der Stadt – mit entsprechend vielen Dienstplänen im Bekanntenkreis." },
  ],
  universitiesNote: "Studierende an öffentlichen Universitäten im Wintersemester 2025/26; Fachhochschule und Privatuniversität sind in dieser Zahl nicht enthalten.",
  clusters: [
    { name: "Weiterbildung & Wissenschaft", text: "Die Universität für Weiterbildung Krems zählt 6.440 Studierende (Wintersemester 2025/26) und nach eigenen Angaben mehr als 33.000 Absolventinnen und Absolventen – ein Netzwerk, das weit über die Stadt hinausreicht." },
    { name: "Gesundheitswissenschaften", text: "Karl Landsteiner Privatuniversität und Universitätsklinikum Krems bilden gemeinsam den medizinischen Schwerpunkt der Stadt." },
    { name: "Fachhochschule & Internationales", text: "Die IMC Fachhochschule Krems bringt Wirtschaft, Life Sciences und Digitalisierung an den Campus – mit einem hohen Anteil internationaler Studierender." },
    { name: "Kunst & Kultur", text: "Die Kunstmeile Krems mit Landesgalerie Niederösterreich, Kunsthalle und Karikaturmuseum macht die Stadt zu einem der dichtesten Ausstellungsorte des Landes." },
    { name: "Wein & Wachau", text: "Krems liegt am östlichen Ende der Wachau; Weinbau, Heurige und die Donau prägen Wirtschaft und Freizeit gleichermaßen." },
  ],
  clusterSources: ["uni-stud", "donau-uni", "kunstmeile"],
  places: [
    { name: "Universität für Weiterbildung Krems", kind: "work", district: "Campus Krems · Dr.-Karl-Dorrek-Straße", text: "Europas führende öffentliche Weiterbildungsuniversität nach eigenen Angaben – mit Studierenden, die fast alle berufstätig sind.", lat: 48.4078, lon: 15.5863 },
    { name: "IMC Fachhochschule Krems", kind: "work", district: "Campus Krems", text: "Wirtschaft, Gesundheit und Life Sciences, international ausgerichtet – direkt neben der Universität.", lat: 48.4086, lon: 15.5889 },
    { name: "Karl Landsteiner Privatuniversität", kind: "work", district: "Campus Krems", text: "Medizin und Psychologie in kleinen Jahrgängen, benannt nach dem Nobelpreisträger Karl Landsteiner.", lat: 48.4075, lon: 15.5886 },
    { name: "Universitätsklinikum Krems", kind: "work", district: "Krems · Mitterweg", text: "Lehrklinik der Privatuniversität und einer der größten Arbeitgeber der Stadt.", lat: 48.412, lon: 15.6156 },
    { name: "Landesgalerie Niederösterreich", kind: "work", district: "Kunstmeile · Museumsplatz", text: "Die Landesgalerie an der Kunstmeile zeigt Kunst des Landes und internationale Positionen – und beschäftigt einen guten Teil der Kremser Kulturszene.", lat: 48.4043, lon: 15.5879 },
    { name: "Kunsthalle Krems", kind: "date", district: "Kunstmeile · Steiner Landstraße", text: "Wechselausstellungen moderner und zeitgenössischer Kunst, zehn Gehminuten vom Campus entfernt.", lat: 48.4047, lon: 15.5871 },
    { name: "Steiner Landstraße", kind: "date", district: "Stein", text: "Die alte Hauptgasse von Stein mit Weinhäusern, Lokalen und Blick auf die Donau – der stimmungsvollste Abendspaziergang der Stadt.", lat: 48.4046, lon: 15.5877 },
    { name: "Steiner Tor", kind: "date", district: "Altstadt", text: "Das Wahrzeichen von Krems und der naheliegendste Treffpunkt: Von hier beginnt die Fußgängerzone in beide Richtungen.", lat: 48.4098, lon: 15.5965 },
    { name: "Hoher Markt & Piaristenkirche", kind: "date", district: "Altstadt", text: "Oberhalb der Altstadt liegen Hoher Markt und Piaristenkirche mit Blick über die Dächer bis zur Donau.", lat: 48.4123, lon: 15.6021 },
    { name: "Sandgrube & Weinberge", kind: "date", district: "Krems · Wachaustraße", text: "Am nördlichen Stadtrand beginnen die Weingärten; Kellereien und Weingüter sind zu Fuß erreichbar – und ein Spaziergang dorthin ersetzt jedes Programm.", lat: 48.4214, lon: 15.6173 },
  ],
  map: {
    bounds: { west: 15.555, east: 15.665, south: 48.375, north: 48.435 },
    rivers: [],
    areas: [],
    labels: [
      { text: "Donau", lat: 48.395, lon: 15.605 },
      { text: "Altstadt", lat: 48.4105, lon: 15.6005, district: true },
      { text: "Stein", lat: 48.4055, lon: 15.584, district: true },
      { text: "Campus", lat: 48.408, lon: 15.587, district: true },
      { text: "Lerchenfeld", lat: 48.4175, lon: 15.6115, district: true },
      { text: "Weinzierl", lat: 48.4145, lon: 15.5825, district: true },
      { text: "Mitterau", lat: 48.3985, lon: 15.6185, district: true },
    ],
  },
  mapSpec: { rivers: [{ name: "Donau", major: true }, { name: "Krems" }, { name: "Donaukanal" }], lakes: [], parks: ["Stadtpark", "Hafen Krems"], boundary: "Krems an der Donau" },
  quarters: [
    { name: "Campus Krems", label: "Drei Hochschulen", text: "Universität für Weiterbildung, IMC Fachhochschule und Karl Landsteiner Privatuniversität teilen sich ein Gelände am westlichen Stadtrand. Wer hier arbeitet oder studiert, kennt die anderen beiden Häuser zwangsläufig." },
    { name: "Stein", label: "Altort an der Donau", text: "Der westliche Stadtteil mit der Steiner Landstraße, Weinhäusern und der ehemaligen Minoritenkirche. Die schönste Adresse der Stadt – und die mit den meisten Lokalen für einen zweiten Abend." },
    { name: "Altstadt & Hoher Markt", label: "Zentrum", text: "Zwischen Steiner Tor und Pfarrplatz liegt die Fußgängerzone, darüber der Hohe Markt mit Piaristenkirche. Kompakt genug, dass man sich innerhalb von zehn Minuten überall trifft." },
    { name: "Kunstmeile", label: "Museumsquartier", text: "Landesgalerie Niederösterreich, Kunsthalle und Karikaturmuseum liegen zwischen Stein und Altstadt. Eine Museumsdichte, die man in einer Stadt dieser Größe nicht erwartet." },
    { name: "Lerchenfeld & Mitterau", label: "Wohnviertel", text: "Gewachsene Wohnquartiere mit Genossenschaftsbauten, Schulen und kurzen Wegen in die Stadt – hier wohnen viele, die am Campus oder im Klinikum arbeiten." },
    { name: "Weinberge & Sandgrube", label: "Nördlicher Stadtrand", text: "Oberhalb der Stadt beginnen die Weingärten der Kremser Lagen. Kellereien, Weingüter und Aussichtspunkte sind zu Fuß erreichbar." },
  ],
  agenda: [
    { title: "donaufestival Krems", when: "April, an zwei Wochenenden", text: "Festival für zeitgenössische Musik und Performance in der Kremser Messehalle und an Spielorten der Stadt. Die Ausgabe 2027 läuft vom 16. bis 18. April und vom 23. bis 25. April – zwei Wochenenden, an denen Krems ein anderes Publikum anzieht als sonst.", href: "https://www.donaufestival.at/" },
    { title: "Kunstmeile Krems", when: "Ganzjährig", text: "Landesgalerie Niederösterreich, Kunsthalle Krems und Karikaturmuseum liegen nebeneinander. Ein Nachmittag dort gibt Gesprächsstoff für den ganzen Abend – und endet zu Fuß in Stein.", href: "https://www.kunstmeile-krems.at/" },
    { title: "Lange Nacht der Forschung", when: "Alle zwei Jahre", text: "Beim letzten Durchgang am 24. April 2026 kamen österreichweit mehr als 192.000 Menschen zu über 3.000 Programmpunkten, der Eintritt war überall frei. In Krems beteiligen sich alle drei Hochschulen des Campus; angekündigt ist der 19. Mai 2028.", href: "https://langenachtderforschung.at/" },
    { title: "Wachau zu Fuß und per Rad", when: "Frühling bis Herbst", text: "Krems ist das östliche Tor zur Wachau: Weinberge, Donauradweg und Heurige beginnen am Stadtrand. Für ein zweites Treffen braucht es hier wenig mehr als festes Schuhwerk." },
  ],
  talkingPoints: [
    { title: "Studieren mit Berufserfahrung", text: "Die Universität für Weiterbildung Krems ist auf die Höherqualifizierung von Berufstätigen spezialisiert. Das heißt: Wer hier studiert, hat meistens schon eine Karriere, oft Familie und fast immer ein klares Ziel. Ein völlig anderes Milieu als in klassischen Studentenstädten." },
    { title: "Drei Hochschulen, ein Campus", text: "Universität, Fachhochschule und Privatuniversität teilen sich ein Gelände. In Wien wäre das Verwaltungsgeschichte, in Krems ist es Alltag – und der Grund, warum sich Medizin, Wirtschaft und Weiterbildung hier dauernd über den Weg laufen." },
    { title: "Wachau als Standortvorteil", text: "Weinberge am Stadtrand, Donauradweg vor der Tür, UNESCO-Kulturlandschaft ab der nächsten Ortschaft. Wer in Krems lebt, braucht für ein Wochenendprogramm kein Auto und keinen Plan." },
  ],
  faq: [
    { question: "Wie viele Akademiker leben in Krems?", answer: "17,8 Prozent der Einwohnerinnen und Einwohner ab 15 Jahren haben einen Hochschul-, Akademie- oder Kollegabschluss (Abgestimmte Erwerbsstatistik 2024; Niederösterreich 15,1 Prozent, Österreich 17,6 Prozent). Durch die drei Hochschulen am Campus ist der Anteil an Menschen mit akademischem Umfeld deutlich höher als in vergleichbaren Bezirksstädten." },
    { question: "Welche Hochschulen gibt es in Krems?", answer: "Drei: die Universität für Weiterbildung Krems (6.440 Studierende im Wintersemester 2025/26), die IMC Fachhochschule Krems und die Karl Landsteiner Privatuniversität für Gesundheitswissenschaften. Alle drei teilen sich den Campus Krems; dazu kommt das Universitätsklinikum als Lehrklinik." },
    { question: "Was ist das Besondere an der Universität für Weiterbildung?", answer: "Sie ist nach eigenen Angaben die führende öffentliche Universität für Weiterbildung in Europa und auf die Höherqualifizierung von Berufstätigen spezialisiert. Angeboten werden berufsbegleitende Bachelor- und Masterstudien, Kurzprogramme und PhD-Studien; mehr als 33.000 Menschen haben hier bereits abgeschlossen." },
    { question: "Gibt es in Krems mehr Männer oder Frauen?", answer: "In der Altersgruppe 30 bis 49 kommen auf 100 Frauen 114 Männer (3.419 zu 3.002 am 01.01.2026). Für Frauen ist der Markt damit rechnerisch günstiger als in Wien (103) oder Graz (109)." },
    { question: "Lohnt sich Krems für Berufstätige?", answer: "In der Stadt gibt es 20.323 Arbeitsplätze bei 25.404 Einwohnern, und nur 48,6 Prozent der Erwerbstätigen pendeln aus – in Niederösterreich insgesamt sind es 73,3 Prozent. Dazu kommt die Bahnverbindung nach Wien, die ein Pendeln in die Hauptstadt möglich macht, ohne dort zu wohnen." },
    { question: "Wo lernen Akademiker in Krems Singles kennen?", answer: "Am Campus und bei Veranstaltungen der drei Hochschulen, auf der Kunstmeile mit Landesgalerie und Kunsthalle, beim donaufestival im April, in den Lokalen an der Steiner Landstraße oder bei einem Spaziergang in die Weinberge. Wer gezielt Menschen mit ähnlichem Bildungshintergrund sucht, findet sie bei AkademikerSingles: Jedes Profil wird manuell geprüft." },
    { question: "Ist die Anmeldung kostenlos?", answer: "Ja. Die Registrierung ist kostenfrei und beinhaltet die Basis-Mitgliedschaft. Damit legen Sie Ihr Profil an, nutzen den Fragenflirt und antworten kostenlos auf Nachrichten von Premium-Mitgliedern." },
  ],
  guide: [
    {
      title: "Eine Stadt für Menschen, die schon im Beruf stehen",
      html: "<p>Krems ist keine klassische Studentenstadt. Die größte Hochschule der Stadt, die Universität für Weiterbildung Krems, ist nach eigenen Angaben die führende öffentliche Weiterbildungsuniversität Europas – spezialisiert auf die Höherqualifizierung von Berufstätigen. Ihre 6.440 Studierenden sitzen nicht mit 19 im Hörsaal, sondern mit 35 im Blockseminar.</p><p>Das prägt die Stadt. 23,4 Prozent der Einwohnerinnen und Einwohner sind 65 Jahre oder älter, der Altersdurchschnitt liegt über dem von Graz oder Innsbruck, und trotzdem leben hier viele Menschen in kleinen Haushalten: 12.244 Privathaushalte mit durchschnittlich 1,97 Personen – ein Wert, den man eher in einer Großstadt erwartet.</p><p>Für die Partnersuche heißt das: In Krems trifft man seltener auf Menschen, die gerade erst anfangen, und häufiger auf solche, die schon wissen, was sie wollen. Zweitstudium, Berufswechsel, Neuanfang nach einer Trennung – das sind hier normale Biografien.</p>",
    },
    {
      title: "Drei Hochschulen auf einem Gelände",
      html: "<p>Der Campus Krems bringt zusammen, was anderswo über eine ganze Stadt verteilt ist: die Universität für Weiterbildung Krems, die IMC Fachhochschule Krems und die Karl Landsteiner Privatuniversität für Gesundheitswissenschaften. Dazu kommt das Universitätsklinikum als Lehrklinik der Privatuniversität.</p><p>Die Universität führt berufsbegleitende Bachelor- und Masterstudien, Kurzprogramme und PhD-Studien und trägt das Qualitätssiegel der AQ Austria. Mehr als 33.000 Absolventinnen und Absolventen hat sie nach eigenen Angaben hervorgebracht – ein Alumni-Netzwerk, das in ganz Österreich und darüber hinaus reicht.</p><p>Die IMC bringt internationale Studierende in die Stadt, die Privatuniversität Medizin und Psychologie in kleinen Jahrgängen. Auf engem Raum entsteht so eine akademische Mischung, die man einer Stadt mit 25.404 Einwohnern nicht zutraut.</p>",
    },
    {
      title: "Arbeiten in Krems – und pendeln nach Wien",
      html: "<p>20.323 Menschen arbeiten in Krems, bei 25.404 Einwohnern. 88,0 Prozent der Arbeitsstätten gehören zum tertiären Sektor, und nur 48,6 Prozent der Kremser Erwerbstätigen pendeln aus der Stadt aus – in Niederösterreich sind es 73,3 Prozent. Krems ist damit kein Vorort, sondern ein eigenes Zentrum.</p><p>Die großen Arbeitgeber sind Hochschulen, Klinikum, Landesverwaltung, Handel und die Weinwirtschaft. Dazu kommt die Nähe zu Wien: Die Bahnverbindung macht Pendeln möglich, ohne in der Hauptstadt wohnen zu müssen – ein Modell, das viele Paare hier leben.</p><p>21,6 Prozent der Kremserinnen und Kremser haben keine österreichische Staatsangehörigkeit, deutlich mehr als in Niederösterreich insgesamt (12,4 Prozent). Hochschulen und Gesundheitswesen ziehen Menschen aus dem Ausland an – was die Stadt internationaler macht, als ihre Größe vermuten lässt.</p>",
    },
    {
      title: "Stein, Altstadt, Weinberge",
      html: "<p>Krems besteht aus drei Teilen, die zu Fuß verbunden sind: Stein mit der alten Landstraße direkt an der Donau, die Altstadt rund um Steiner Tor und Pfarrplatz, und dazwischen die Kunstmeile mit Landesgalerie Niederösterreich, Kunsthalle und Karikaturmuseum. Nördlich beginnen die Weingärten, östlich liegt der Campus.</p><p>Diese Anordnung macht Verabredungen einfach. Treffpunkt Steiner Tor, dann durch die Fußgängerzone, Kunstmeile, weiter nach Stein und dort in eines der Weinhäuser – eine Strecke von zwanzig Minuten, die sich beliebig dehnen lässt.</p><p>Im Frühjahr und Herbst übernimmt die Landschaft: Donauradweg, Wachau-Weinberge, Heurige in den Nachbarorten. Wer hier lebt, hat sein Wochenendprogramm vor der Haustür – und braucht für ein gelungenes zweites Treffen selten einen Tisch zu reservieren.</p>",
    },
    {
      title: "Termine, die Krems größer machen",
      html: "<p>Zweimal im April wird die Stadt zum Festivalort: Das donaufestival bringt zeitgenössische Musik und Performance in die Messehalle und an weitere Spielorte – 2027 vom 16. bis 18. und vom 23. bis 25. April. Das Publikum reist aus Wien und darüber hinaus an, und die Stadt sieht für zwei Wochenenden anders aus als sonst.</p><p>Ganzjährig trägt die Kunstmeile das kulturelle Programm. Drei Häuser nebeneinander, Wechselausstellungen, Vermittlungsangebote – ein Nachmittag dort ist in Krems das, was in größeren Städten ein Museumsbesuch mit Anfahrt wäre.</p><p>Dazu kommt im Zwei-Jahres-Rhythmus die Lange Nacht der Forschung: Beim letzten Durchgang am 24. April 2026 zählte Österreich mehr als 192.000 Besuchende bei über 3.000 Programmpunkten, überall ohne Eintritt. Am Campus Krems machen dann alle drei Hochschulen mit; angekündigt ist der 19. Mai 2028.</p>",
    },
    {
      title: "Was die Zahlen nicht sagen",
      html: "<p>Grundlage sind drei amtliche Erhebungen: die Abgestimmte Erwerbsstatistik mit Stichtag 31. Oktober 2024, der Bevölkerungsstand zu Jahresbeginn 2026 und die Hochschulstatistik des Wintersemesters 2025/26. Die Studierendenzahl von 6.440 betrifft nur die öffentliche Universität; IMC Fachhochschule und Karl Landsteiner Privatuniversität sind nicht enthalten.</p><p>Das Geschlechterverhältnis von 114 Männern je 100 Frauen in der Altersgruppe 30 bis 49 ist ein statistischer Durchschnitt über die gesamte Stadtbevölkerung dieser Jahrgänge; Gründe für solche Abweichungen sind vielfältig und lassen sich aus der Zahl allein nicht ableiten.</p><p>Was bleibt: Krems ist klein, hat aber drei Hochschulen, eine Museumsmeile, ein internationales Festival und die Wachau vor der Tür. Für Akademiker mitten im Berufsleben ist das eine ungewöhnlich gute Mischung – und ein Umfeld, in dem man einander wirklich kennenlernt.</p>",
    },
  ],
  hubFacts: [
    { label: "Hochschulabschluss ab 15 Jahren", value: "17,8 %" },
    { label: "Studierende", value: "6.440" },
    { label: "Einpersonenhaushalte", value: "–" },
    { label: "Männer je 100 Frauen (30–49)", value: "114" },
  ],
  sources: [],
};

if (old.map?.rivers?.length || old.map?.areas?.length) p.map = { ...p.map, rivers: old.map.rivers, areas: old.map.areas, boundary: old.map.boundary };

applySources(p, {
  "aest-gemeinde": { publisher: "Statistik Austria", title: "Abgestimmte Erwerbsstatistik 2024, Gemeindeergebnisse (Blatt „Gemeindetab“, Gebietsstand 2026): Bevölkerung, höchste abgeschlossene Bildung ab 15 Jahren, Privathaushalte, Arbeitsstätten, Beschäftigte, Unternehmen, Pendler", stand: "Stichtag 31.10.2024, erstellt 09.06.2026", url: "https://www.statistik.at/fileadmin/pages/54/AEST_Gemeindeergebnisse_2024.ods" },
  "uni-stud": { publisher: "Statistik Austria", title: "Studierende an öffentlichen Universitäten nach Uni (Open Government Data, Datensatz OGD_unistud3_ext_UNI_STUD3_1)", stand: "Wintersemester 2025/26", url: "https://data.statistik.gv.at/web/meta.jsp?dataset=OGD_unistud3_ext_UNI_STUD3_1" },
  "bev-alter": { publisher: "Statistik Austria", title: "Bevölkerungsstand zu Jahresbeginn 2026 nach Gemeinde, Alter in Einzeljahren und Geschlecht (Open Government Data, Datensatz OGD_bevstandjbab2002_BevStand_2026)", stand: "Stand 01.01.2026", url: "https://data.statistik.gv.at/web/meta.jsp?dataset=OGD_bevstandjbab2002_BevStand_2026" },
  "donau-uni": { publisher: "Universität für Weiterbildung Krems", title: "Über uns: führende öffentliche Universität für Weiterbildung in Europa, rund 7.500 zugelassene Studierende, mehr als 33.000 Absolvent_innen, berufsbegleitende Studien und Qualitätssiegel der AQ Austria", stand: "abgerufen 11/2026", url: "https://www.donau-uni.ac.at/de/universitaet/ueber-uns.html" },
  "imc-krems": { publisher: "IMC Fachhochschule Krems", title: "Über uns: Studienangebot in Wirtschaft, Gesundheit, Life Sciences und Digitalisierung am Campus Krems", stand: "abgerufen 11/2026", url: "https://www.imc.ac.at/de/" },
  "kl-krems": { publisher: "Karl Landsteiner Privatuniversität für Gesundheitswissenschaften", title: "Universität: Medizin und Psychologie am Campus Krems, Zusammenarbeit mit dem Universitätsklinikum Krems", stand: "abgerufen 11/2026", url: "https://www.kl.ac.at/universitaet" },
  kunstmeile: { publisher: "Kunstmeile Krems", title: "Kunstmeile Krems: Landesgalerie Niederösterreich, Kunsthalle Krems und Karikaturmuseum", stand: "abgerufen 11/2026", url: "https://www.kunstmeile-krems.at/" },
});

checkSeo(p);
writeFileSync(file, JSON.stringify(p, null, 1) + "\n");
console.log("Krems geschrieben:", p.sources.length, "Quellen,", p.guide.length, "Guide-Kapitel,", p.universities.length, "Hochschulen");
