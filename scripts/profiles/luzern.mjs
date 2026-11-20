// Neues Stadtdossier Luzern: jüngste Universität der Schweiz, höchste Tertiärquote der Zentralschweiz
// und ein Partnermarkt mit deutlichem Männerüberschuss.
// Karte danach erzeugen: python scripts/build_city_map.py ch/luzern
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { applySources, checkSeo } from "./_sources.mjs";

const file = "data/city-profiles/ch/luzern.json";
const old = existsSync(file) ? JSON.parse(readFileSync(file, "utf8")) : {};

const p = {
  path: "/partnersuche/luzern/",
  name: "Luzern",
  heroAlt: "Aquarellzeichnung von Luzern mit Kapellbrücke, Wasserturm und dem Vierwaldstättersee",
  country: "Schweiz",
  region: "Luzern",
  seoTitle: "Akademiker Singles in Luzern: 58 % mit Tertiärabschluss",
  seoDescription: "Luzern in Zahlen: 58 % der 25- bis 64-Jährigen mit Tertiärabschluss, 12.796 Studierende an Uni und HSLU, 114 ledige Männer je 100 ledige Frauen.",
  eyebrow: "Partnersuche für Akademiker · Hochschulstadt am Vierwaldstättersee",
  lead: "Luzern hat in zehn Jahren einen Bildungssprung gemacht: 2015 hatten 46 Prozent der 25- bis 64-Jährigen einen Tertiärabschluss, 2024 waren es 58 Prozent. Dahinter stehen die jüngste Universität der Schweiz, die 2000 gegründet wurde, und die Hochschule Luzern mit 8.683 Studierenden. Beim Partnermarkt fällt eine Zahl auf: Auf 100 ledige Frauen zwischen 25 und 54 kommen 114 ledige Männer, bei den 30- bis 49-Jährigen sogar 122. Dieses Dossier zeigt, was das für die Suche bedeutet.",
  briefing: [
    { value: "58 %", label: "der 25- bis 64-Jährigen in der Stadt Luzern haben einen Tertiärabschluss – 2015 waren es 46 %", source: "lustat-bildung" },
    { value: "12.796", label: "Studierende an Universität Luzern und Hochschule Luzern", source: "bfs-stud", note: "Wintersemester 2025/26, berechnet: Universität 4.113, Hochschule Luzern 8.683" },
    { value: "114", label: "ledige Männer je 100 ledige Frauen zwischen 25 und 54 Jahren", source: "bfs-zivil" },
  ],
  kpis: [
    { value: "86.699", label: "Einwohnerinnen und Einwohner der Stadt Luzern", source: "einwohner", note: "Ständige Wohnbevölkerung am 31.12.2025" },
    { value: "84.500", label: "Beschäftigte in der Stadt Luzern", source: "lustat-beschaeftigung", note: "2024, rund gerechnet; das ergibt eine Beschäftigungsdichte von 0,98 gegenüber 0,63 im Kanton Luzern" },
    { value: "56,3 %", label: "der 25- bis 54-Jährigen sind ledig", source: "bfs-zivil", note: "22.883 von 40.647 Personen dieser Altersgruppe, 31.12.2025; schweizweit 43,7 %" },
    { value: "1.450", label: "Franken Medianmiete für eine 3-Zimmer-Wohnung", source: "lustat-mieten", note: "Stadt Luzern 2024; im Kanton Luzern sind es 1.400 Franken, für 4-Zimmer-Wohnungen 1.650 (Kanton 1.600)" },
  ],
  dossier: [
    {
      key: "bildung",
      title: "Bildung",
      intro: "Kaum eine Schweizer Stadt hat ihren Bildungsstand so schnell verändert: Innerhalb von neun Jahren stieg der Tertiäranteil um zwölf Prozentpunkte.",
      metrics: [
        { value: "58 %", label: "der 25- bis 64-Jährigen haben einen Tertiärabschluss", source: "lustat-bildung", note: "Stadt Luzern 2024 (Strukturerhebung); 2015 waren es 46 %. 89 % dieser Altersgruppe haben mindestens einen Abschluss der Sekundarstufe II (Kanton Luzern 88 %)", compare: { city: 58, germany: 46, unit: " %", max: 70, cityLabel: "Luzern 2024", compareLabel: "Luzern 2015" } },
        { value: "11 %", label: "der 25- bis 64-Jährigen haben keine nachobligatorische Ausbildung abgeschlossen", source: "lustat-bildung", note: "Stadt Luzern 2024; Kanton Luzern 12 %. 2015 lag der Wert in der Stadt noch bei 16 %" },
        { value: "63,3 %", label: "Frauenanteil unter den 4.113 Studierenden der Universität Luzern", source: "bfs-stud", note: "Wintersemester 2025/26, Bachelor bis Doktorat ohne Weiterbildung: 2.603 von 4.113. An der Hochschule Luzern sind es 46,9 % von 8.683 Studierenden – zwei sehr unterschiedlich zusammengesetzte Häuser in einer Stadt" },
      ],
      takeaway: "Universität und Fachhochschule ziehen zwei verschiedene Milieus an – und wer beide kennt, hat in Luzern mehr Auswahl.",
    },
    {
      key: "beruf",
      title: "Beruf & Erfolg",
      intro: "Fast so viele Arbeitsplätze wie Einwohner, konzentriert auf ein sehr kleines Gebiet rund um Bahnhof und See.",
      metrics: [
        { value: "0,98", label: "Beschäftigte je Einwohnerin und Einwohner – im Kanton Luzern sind es 0,63", source: "lustat-beschaeftigung", note: "2024: rund 86.200 Einwohner und rund 84.500 Beschäftigte in der Stadt", compare: { city: 0.98, germany: 0.63, unit: "", max: 1.2, cityLabel: "Stadt Luzern", compareLabel: "Kanton Luzern" } },
        { value: "17,78", label: "Beschäftigte je Einwohner im Quartier Bahnhof/Werft – der dichteste Arbeitsort der Stadt", source: "lustat-beschaeftigung", note: "2024; am anderen Ende liegt das Wohnquartier Oberseeburg/Rebstock mit 0,10. Rund um Bahnhof, KKL und Werftestrasse arbeiten Verwaltung, Versicherungen und die Hochschule Luzern" },
        { value: "55 %", label: "der Zupendelnden kommen mit dem öffentlichen Verkehr", source: "lustat-pendler", note: "Zupendelnde 55 %, Wegpendelnde 54 % ÖV-Anteil; wer innerhalb der Stadt pendelt, ist zu 49 % zu Fuss, mit Velo oder E-Bike unterwegs" },
      ],
      takeaway: "Kurze Wege, dichter Arbeitsplatzkern: Ein Treffen nach Feierabend ist hier keine Logistikfrage.",
    },
    {
      key: "wohnen",
      title: "Wohnen & Alltag",
      intro: "Luzern wohnt städtisch: wenige Familienhaushalte, viele kleine Wohnungen – und Mieten über dem Kantonsschnitt.",
      metrics: [
        { value: "21 %", label: "der Privathaushalte sind Familienhaushalte – im Kanton Luzern 28 %", source: "lustat-haushalte", note: "2024; als Familien gelten Paare oder Alleinerziehende mit Kindern bis 25 Jahre. 19 % der Familienhaushalte sind Alleinerziehende (Kanton 13 %)", compare: { city: 21, germany: 28, unit: " %", max: 35, cityLabel: "Stadt Luzern", compareLabel: "Kanton Luzern" } },
        { value: "1.450", label: "Franken Medianmiete für 3-Zimmer-Wohnungen, 1.650 Franken für 4 Zimmer", source: "lustat-mieten", note: "Stadt Luzern 2024; Kanton Luzern 1.400 bzw. 1.600 Franken. 25 % der 3-Zimmer-Haushalte zahlen weniger als 1.200, weitere 25 % mehr als 1.780 Franken" },
        { value: "49 %", label: "der Binnenpendelnden gehen zu Fuss oder fahren Velo", source: "lustat-pendler", note: "Wer in Luzern wohnt und arbeitet, braucht meist kein Auto: 35 % nutzen den öffentlichen Verkehr, 16 % das Auto" },
      ],
      takeaway: "Eine Stadt, in der man sich zu Fuss verabredet – und in der Zusammenziehen eine Preisfrage ist.",
    },
    {
      key: "singles",
      title: "Single-Leben",
      intro: "Mehr als die Hälfte der 25- bis 54-Jährigen ist ledig – und es gibt deutlich mehr ledige Männer als Frauen.",
      metrics: [
        { value: "56,3 %", label: "der 25- bis 54-Jährigen sind ledig", source: "bfs-zivil", note: "22.883 von 40.647 Personen dieser Altersgruppe (ständige Wohnbevölkerung, 31.12.2025); schweizweit 43,7 %. Ledig heisst nicht automatisch Single, auch unverheiratete Paare zählen dazu", compare: { city: 56.3, germany: 43.7, unit: " %", max: 65 } },
        { value: "114", label: "ledige Männer je 100 ledige Frauen zwischen 25 und 54", source: "bfs-zivil", note: "12.171 Männer zu 10.712 Frauen (31.12.2025). Bei den 30- bis 49-Jährigen sind es sogar 122. Schweizweit liegt der Wert bei 125, in Zürich bei 116, in Bern bei 105", compare: { city: 113.6, germany: 125, unit: "", max: 145 } },
        { value: "44,4 %", label: "der Einwohnerinnen und Einwohner ab 20 Jahren sind ledig", source: "bfs-zivil", note: "Berechnet aus der Altersklassenstatistik (31.12.2025); dazu kommen 10,7 % Geschiedene" },
      ],
      takeaway: "Für Frauen ein komfortabler Markt, für Männer einer, in dem ein gutes Profil den Unterschied macht.",
    },
  ],
  universities: [
    { name: "Universität Luzern", kind: "Jüngste Universität der Schweiz", founded: "2000", students: "4.113", women: "63,3 %", source: "bfs-stud", compareSource: "unilu-portraet", text: "Ihre Wurzeln reichen ins 16. Jahrhundert zurück, als moderne Universität besteht sie erst seit 2000. Fakultäten für Theologie, Kultur- und Sozialwissenschaften, Rechtswissenschaft, Wirtschaftswissenschaften, Gesundheitswissenschaften und Medizin sowie Verhaltenswissenschaften und Psychologie – dazu eine Graduierten- und eine Weiterbildungsakademie. Rund 4.100 Studierende und über 700 Mitarbeitende, direkt am Bahnhof." },
    { name: "Hochschule Luzern", kind: "Fachhochschule der Zentralschweiz", founded: "1997", students: "8.683", women: "46,9 %", source: "bfs-stud", compareSource: "hslu-ueberuns", text: "Eine der sieben öffentlich-rechtlichen Fachhochschulen der Schweiz, getragen vom Konkordat der sechs Zentralschweizer Kantone. Sechs Departemente: Technik & Architektur, Wirtschaft, Informatik, Soziale Arbeit, Design Film Kunst und Musik – also von Bauingenieurwesen bis Jazzstudium." },
    { name: "Pädagogische Hochschule Luzern", kind: "Pädagogische Hochschule", source: "lustat-bildung", text: "Die Lehrerinnen- und Lehrerbildung der Zentralschweiz sitzt mitten in der Stadt an der Pfistergasse und in Horw. Ein Milieu, das in Luzern besonders präsent ist – und das abends tatsächlich Zeit hat." },
    { name: "Luzerner Kantonsspital", kind: "Zentrumsspital mit universitärer Lehre", source: "lustat-beschaeftigung", text: "Das grösste Spital der Zentralschweiz liegt im Norden der Stadt und ist einer ihrer grössten Arbeitgeber – mit Dienstplänen, die das Verabreden prägen." },
  ],
  universitiesNote: "Studierendenzahlen für das Wintersemester 2025/26 ohne Weiterbildung; die Zahl der Hochschule Luzern gilt für alle Standorte der Zentralschweiz.",
  clusters: [
    { name: "Hochschulen", text: "Universität Luzern (4.113 Studierende, 63,3 % Frauen) und Hochschule Luzern (8.683 Studierende, 46,9 % Frauen) im Wintersemester 2025/26, dazu die Pädagogische Hochschule." },
    { name: "Verwaltung & Versicherungen", text: "Als Kantonshauptort bündelt Luzern Verwaltung, Gerichte und Versicherungen; die Beschäftigungsdichte im Quartier Bahnhof/Werft liegt bei 17,78 Beschäftigten je Einwohner." },
    { name: "Gesundheitswesen", text: "Das Luzerner Kantonsspital ist das Zentrumsspital der Zentralschweiz und einer der grössten Arbeitgeber der Stadt." },
    { name: "Kultur & Musik", text: "KKL, Lucerne Festival und das Departement Musik der Hochschule Luzern machen die Stadt zu einem Musikstandort mit internationalem Publikum." },
    { name: "Tourismus", text: "Vierwaldstättersee, Kapellbrücke und Verkehrshaus ziehen Gäste aus aller Welt an – mit entsprechend vielen Arbeitsplätzen in Hotellerie und Gastronomie." },
  ],
  clusterSources: ["bfs-stud", "lustat-beschaeftigung"],
  places: [
    { name: "Universität Luzern", kind: "work", district: "Bahnhof · Frohburgstrasse", text: "Die jüngste Universität der Schweiz residiert im früheren Postgebäude direkt am Bahnhof – kürzer kann ein Arbeitsweg nicht sein.", lat: 47.0494, lon: 8.3125 },
    { name: "Hochschule Luzern, Werftestrasse", kind: "work", district: "Tribschen · Werftestrasse", text: "Verwaltungssitz der Hochschule Luzern mit 8.683 Studierenden in sechs Departementen, wenige Gehminuten vom KKL entfernt.", lat: 47.0476, lon: 8.3147 },
    { name: "Luzerner Kantonsspital", kind: "work", district: "Nord · Spitalstrasse", text: "Zentrumsspital der Zentralschweiz und einer der grössten Arbeitgeber der Stadt.", lat: 47.0586, lon: 8.2972 },
    { name: "PH Luzern, Pfistergasse", kind: "work", district: "Altstadt · Pfistergasse", text: "Die Pädagogische Hochschule mitten in der Stadt – Lehrerinnen und Lehrer der ganzen Zentralschweiz gehen hier ein und aus.", lat: 47.0511, lon: 8.3021 },
    { name: "KKL Luzern", kind: "work", district: "Bahnhof · Europaplatz", text: "Konzertsaal von Weltruf, Heimat des Lucerne Festival und Arbeitsplatz für einen grossen Teil der Luzerner Kulturszene.", lat: 47.0503, lon: 8.3121 },
    { name: "Kapellbrücke & Wasserturm", kind: "date", district: "Altstadt", text: "Das Wahrzeichen der Stadt und der Treffpunkt, den jeder findet – von hier sind Altstadt und Seeufer je zwei Minuten entfernt.", lat: 47.0518, lon: 8.3077 },
    { name: "Nationalquai", kind: "date", district: "Seeufer", text: "Die Seepromenade mit Blick auf Pilatus und Rigi; abends der naheliegendste Spaziergang Luzerns.", lat: 47.0546, lon: 8.3125 },
    { name: "Hofkirche St. Leodegar", kind: "date", district: "Hofquartier", text: "Die Stiftskirche über dem Seeufer mit ihren Doppeltürmen; der Hof davor ist im Sommer Konzertort.", lat: 47.0556, lon: 8.3141 },
    { name: "Gütsch", kind: "date", district: "Gütsch · Hausberg", text: "Mit der Standseilbahn hinauf, Blick über Stadt und See – das Luzerner Standardprogramm für ein Treffen, das Eindruck machen soll.", lat: 47.0511, lon: 8.2951 },
    { name: "Verkehrshaus der Schweiz", kind: "date", district: "Lido · Seeufer", text: "Das meistbesuchte Museum der Schweiz mit Planetarium und Flugsimulatoren – gut für alle, die beim ersten Treffen etwas zu tun haben wollen.", lat: 47.0528, lon: 8.3366 },
  ],
  map: {
    bounds: { west: 8.27, east: 8.36, south: 47.025, north: 47.08 },
    rivers: [],
    areas: [],
    labels: [
      { text: "Vierwaldstättersee", lat: 47.0425, lon: 8.3285 },
      { text: "Reuss", lat: 47.0515, lon: 8.2975 },
      { text: "Altstadt", lat: 47.0525, lon: 8.3055, district: true },
      { text: "Neustadt", lat: 47.0478, lon: 8.3035, district: true },
      { text: "Tribschen", lat: 47.0445, lon: 8.3215, district: true },
      { text: "Wesemlin", lat: 47.0595, lon: 8.3175, district: true },
      { text: "Obergrund", lat: 47.0405, lon: 8.3015, district: true },
      { text: "Littau", lat: 47.0455, lon: 8.2765, district: true },
    ],
  },
  mapSpec: { rivers: [{ name: "Reuss", major: true }, { name: "Kleine Emme" }], lakes: ["Rotsee"], parks: ["Gütschwald", "Ufschötti", "Inseli", "Vögeligärtli"], boundary: "Luzern" },
  quarters: [
    { name: "Altstadt & Hofquartier", label: "Zentrum", text: "Zwischen Kapellbrücke, Hofkirche und Weinmarkt liegt das Luzern, das alle kennen. Die Pädagogische Hochschule sitzt mitten drin, abends ist die Beizendichte die höchste der Stadt." },
    { name: "Neustadt & Hirschmatt", label: "Gründerzeit", text: "Südlich der Reuss liegt das Quartier mit den Jugendstilhäusern, kleinen Läden und dem Bundesplatz-Markt. Beliebt bei allen, die in der Stadt arbeiten und zu Fuss gehen wollen." },
    { name: "Bahnhof & Tribschen", label: "Arbeitsplatzkern", text: "Universität, KKL, Hochschule Luzern an der Werftestrasse und die Versicherungen: Hier liegt mit 17,78 Beschäftigten je Einwohner der dichteste Arbeitsort der Stadt.", source: "lustat-beschaeftigung" },
    { name: "Wesemlin & Maihof", label: "Nördliche Wohnquartiere", text: "Ruhige Hanglagen mit Blick über die Stadt, Nähe zum Kantonsspital und zum Rotsee. Familien und Berufstätige, die es nicht laut brauchen." },
    { name: "Obergrund & Hirschengraben", label: "Westlich der Altstadt", text: "Durchmischte Quartiere mit Schulen, Quartierläden und kurzen Wegen zum Gütsch. Für viele die erste eigene Wohnung nach dem Studium." },
    { name: "Littau & Reussbühl", label: "Seit 2010 Teil der Stadt", text: "Der westliche Stadtteil an der Kleinen Emme bietet deutlich mehr Quadratmeter fürs Geld – bei zehn Minuten Bahnfahrt ins Zentrum." },
  ],
  agenda: [
    { title: "Lucerne Festival", when: "Vier Ausgaben im Jahr", text: "Das Sommerfestival läuft 2027 vom 12. August bis 12. September, dazu kommen Spring (19.–21. März 2027), Pulse (6.–9. Mai 2027) und Forward im November. Für ein Konzert im KKL braucht es keine Opernkenntnisse – nur eine Karte und zwei Stunden.", href: "https://www.lucernefestival.ch/de/" },
    { title: "Spaziergang Nationalquai", when: "Ganzjährig", text: "Vom Schwanenplatz dem See entlang bis zum Lido: eine halbe Stunde Promenade mit Blick auf Pilatus und Rigi. Der verlässlichste erste Treffpunkt der Stadt – und er kostet nichts." },
    { title: "Verkehrshaus der Schweiz", when: "Ganzjährig", text: "Planetarium, Flugsimulatoren und Schweizer Industriegeschichte am Seeufer. Für ein Treffen, bei dem Gesprächspausen nicht auffallen, ist das meistbesuchte Museum des Landes eine sichere Wahl." },
    { title: "Gütsch mit der Standseilbahn", when: "Ganzjährig", text: "In vier Minuten vom Quartier Hirschengraben auf den Hausberg, oben Terrasse mit Blick über Stadt und See. Luzerns Variante des zweiten Dates." },
  ],
  talkingPoints: [
    { title: "Zwölf Punkte in neun Jahren", text: "2015 hatten 46 Prozent der 25- bis 64-Jährigen in der Stadt einen Tertiärabschluss, 2024 waren es 58 Prozent. Kaum eine Schweizer Stadt hat sich so schnell verändert – und viele, die hier aufgewachsen sind, erzählen diese Entwicklung an der eigenen Familie." },
    { title: "Uni oder HSLU?", text: "Die Universität zählt 4.113 Studierende mit 63,3 Prozent Frauenanteil, die Hochschule Luzern 8.683 mit 46,9 Prozent. Zwei Häuser, zwei Milieus: Recht, Gesundheit und Geisteswissenschaften auf der einen Seite, Technik, Informatik und Musik auf der anderen." },
    { title: "114 zu 100", text: "Auf 100 ledige Frauen zwischen 25 und 54 kommen 114 ledige Männer, bei den 30- bis 49-Jährigen sogar 122. Für Frauen heisst das Auswahl, für Männer: Wer schreibt, sollte etwas zu sagen haben – Standardnachrichten gehen hier unter." },
  ],
  faq: [
    { question: "Wie viele Akademiker leben in Luzern?", answer: "58 Prozent der 25- bis 64-Jährigen in der Stadt Luzern haben einen Tertiärabschluss, also Hochschule oder höhere Berufsbildung (LUSTAT, 2024). 2015 lag dieser Anteil noch bei 46 Prozent. 89 Prozent dieser Altersgruppe haben mindestens einen Abschluss der Sekundarstufe II." },
    { question: "Welche Hochschulen gibt es in Luzern?", answer: "Die Universität Luzern mit 4.113 Studierenden (Wintersemester 2025/26), die Hochschule Luzern mit 8.683 Studierenden in sechs Departementen und die Pädagogische Hochschule Luzern. Die Universität wurde erst 2000 gegründet und ist damit die jüngste der Schweiz, ihre Wurzeln reichen allerdings ins 16. Jahrhundert zurück." },
    { question: "Gibt es in Luzern mehr ledige Männer oder Frauen?", answer: "Deutlich mehr Männer: Auf 100 ledige Frauen zwischen 25 und 54 kommen 114 ledige Männer (12.171 zu 10.712, BFS STATPOP am 31.12.2025), bei den 30- bis 49-Jährigen sind es 122. Schweizweit liegt der Wert bei 125, in Bern bei 105." },
    { question: "Wie viele Singles leben in Luzern?", answer: "44,4 Prozent der Erwachsenen ab 20 Jahren sind ledig, bei den 25- bis 54-Jährigen sind es 56,3 Prozent (BFS STATPOP, 31.12.2025). Dazu kommen 10,7 Prozent Geschiedene. Ledig heisst dabei nicht automatisch Single – auch unverheiratete Paare zählen dazu." },
    { question: "Was kostet Wohnen in Luzern?", answer: "Die Medianmiete lag 2024 bei 1.450 Franken für 3-Zimmer-Wohnungen und 1.650 Franken für 4-Zimmer-Wohnungen (Kanton Luzern: 1.400 bzw. 1.600 Franken). Ein Viertel der 3-Zimmer-Haushalte zahlt weniger als 1.200 Franken, ein weiteres Viertel mehr als 1.780 Franken." },
    { question: "Wo lernen Akademiker in Luzern Singles kennen?", answer: "Bei Konzerten des Lucerne Festival im KKL, auf der Seepromenade am Nationalquai, im Verkehrshaus, oben auf dem Gütsch, in den Beizen der Altstadt und der Neustadt oder rund um den Campus am Bahnhof. Wer gezielt Menschen mit ähnlichem Bildungshintergrund sucht, findet sie bei AkademikerSingles: Jedes Profil wird manuell geprüft." },
    { question: "Ist die Anmeldung kostenlos?", answer: "Ja. Die Registrierung ist kostenfrei und beinhaltet die Basis-Mitgliedschaft. Damit legen Sie Ihr Profil an, nutzen den Fragenflirt und antworten kostenlos auf Nachrichten von Premium-Mitgliedern." },
  ],
  guide: [
    {
      title: "Eine Stadt, die akademisch erwachsen geworden ist",
      html: "<p>Luzern war lange eine Stadt ohne Universität. Erst 2000 wurde sie als moderne Hochschule gegründet – damit ist sie die jüngste Universität der Schweiz, auch wenn ihre Wurzeln bis ins 16. Jahrhundert zurückreichen. Die Folgen zeigt die Statistik deutlich: 2015 hatten 46 Prozent der 25- bis 64-Jährigen in der Stadt einen Tertiärabschluss, 2024 waren es 58 Prozent.</p><p>Gleichzeitig ging der Anteil ohne nachobligatorische Ausbildung von 16 auf 11 Prozent zurück. Luzern hat sich also in weniger als einem Jahrzehnt vom Tourismus- und Verwaltungsstandort zu einer Stadt entwickelt, in der mehr als jede zweite Person im erwerbsfähigen Alter einen Hochschul- oder höheren Berufsbildungsabschluss hat.</p><p>Für die Partnersuche heisst das: Das akademische Milieu ist hier jünger und durchlässiger als in Städten mit jahrhundertealten Universitäten. Viele sind die ersten in ihrer Familie mit Hochschulabschluss – und erzählen das, wenn man danach fragt.</p>",
    },
    {
      title: "Universität und Hochschule: zwei Welten, ein Bahnhof",
      html: "<p>Die Universität Luzern sitzt im früheren Postgebäude direkt am Bahnhof und zählt 4.113 Studierende, 63,3 Prozent davon Frauen. Ihre Fakultäten decken Theologie, Kultur- und Sozialwissenschaften, Rechtswissenschaft, Wirtschaftswissenschaften, Gesundheitswissenschaften und Medizin sowie Verhaltenswissenschaften und Psychologie ab, dazu kommen eine Graduierten- und eine Weiterbildungsakademie.</p><p>Die Hochschule Luzern ist mehr als doppelt so gross: 8.683 Studierende, 46,9 Prozent Frauen, sechs Departemente von Technik &amp; Architektur über Informatik bis Design Film Kunst und Musik. Gegründet 1997, getragen vom Konkordat der sechs Zentralschweizer Kantone, ist sie eine der sieben öffentlich-rechtlichen Fachhochschulen der Schweiz.</p><p>Diese Mischung ist für Luzern typisch: Jus-Studierende und Jazzmusikerinnen, Pflegewissenschaft und Bauingenieurwesen, alles in Gehdistanz. Wer hier jemanden kennenlernt, sollte nicht fragen, ob die Person studiert – sondern wo.</p>",
    },
    {
      title: "114 ledige Männer auf 100 ledige Frauen",
      html: "<p>Der Luzerner Partnermarkt ist männlich geprägt: Auf 100 ledige Frauen zwischen 25 und 54 kommen 114 ledige Männer (12.171 zu 10.712), bei den 30- bis 49-Jährigen sogar 122. Schweizweit liegt der Wert bei 125, aber in vergleichbaren Hochschulstädten wie Bern (105) oder Zürich (116) ist das Verhältnis ausgeglichener.</p><p>Dazu kommt ein hoher Ledigenanteil: 56,3 Prozent der 25- bis 54-Jährigen sind ledig, deutlich über dem Landesschnitt von 43,7 Prozent. Und nur 21 Prozent der Privathaushalte sind Familienhaushalte – im Kanton Luzern sind es 28 Prozent.</p><p>Praktisch bedeutet das: Frauen können in Luzern wählerisch sein und sollten es auch. Männer stehen in einem Wettbewerb, den sie nicht über Masse gewinnen: Ein Profil, das konkret sagt, woran man arbeitet, was man am Wochenende macht und was man sucht, hebt sich hier sofort ab.</p>",
    },
    {
      title: "Arbeiten auf engstem Raum",
      html: "<p>Rund 84.500 Beschäftigte arbeiten in einer Stadt mit rund 86.200 Einwohnern – eine Beschäftigungsdichte von 0,98 gegenüber 0,63 im Kanton. Besonders eng wird es rund um Bahnhof und Werft: Dort kommen auf einen Einwohner 17,78 Beschäftigte, während das Wohnquartier Oberseeburg/Rebstock auf 0,10 kommt.</p><p>Das erklärt den Rhythmus der Stadt. Mittags ist die Innenstadt voll, abends leert sie sich Richtung Quartiere und Agglomeration. Wer sich verabredet, sollte das wissen: Ein Treffen um 18 Uhr beim Bahnhof erwischt die halbe Stadt auf dem Heimweg, eines um 19 Uhr in der Neustadt ist entspannter.</p><p>Die gute Nachricht: 49 Prozent der Binnenpendelnden gehen zu Fuss oder fahren Velo. Luzern ist klein genug, dass man sich spontan treffen kann – und gross genug, dass man nicht jeden kennt.</p>",
    },
    {
      title: "Was man hier gemeinsam unternimmt",
      html: "<p>Das KKL am Bahnhof ist nicht nur Konzertsaal, sondern auch Terminkalender: Das Lucerne Festival spielt in vier Ausgaben über das Jahr verteilt – Sommer 2027 vom 12. August bis 12. September, dazu Spring im März, Pulse im Mai und Forward im November. Eine Konzertkarte ist in Luzern eine etablierte Einladung.</p><p>Kostenlos und ebenso bewährt: der Nationalquai. Vom Schwanenplatz dem See entlang bis zum Lido sind es gut dreissig Minuten mit Blick auf Pilatus und Rigi. Wer mehr Programm will, nimmt das Verkehrshaus – das meistbesuchte Museum der Schweiz liegt direkt an dieser Strecke.</p><p>Und wenn es beeindrucken soll: die Standseilbahn auf den Gütsch. Vier Minuten Fahrt, dann Terrasse über der Stadt. Für ein zweites Treffen funktioniert das in Luzern seit Generationen.</p>",
    },
    {
      title: "Was die Zahlen nicht sagen",
      html: "<p>Die Bildungs-, Haushalts- und Beschäftigtenzahlen stammen von LUSTAT Statistik Luzern und beruhen teils auf der Strukturerhebung, also auf Stichproben mit Unschärfebereichen. Die Studierendenzahl der Hochschule Luzern gilt für alle Standorte der Zentralschweiz, nicht nur für das Stadtgebiet.</p><p>„Ledig“ ist auch hier ein Zivilstand und kein Beziehungsstatus: Ein erheblicher Teil der 22.883 ledigen 25- bis 54-Jährigen lebt in einer festen Partnerschaft. Und das Verhältnis von 114 zu 100 ist ein Durchschnitt über drei Jahrzehnte Lebenszeit – in einzelnen Altersgruppen und Milieus sieht es anders aus.</p><p>Was bleibt: Luzern ist eine Stadt mit sehr kurzen Wegen, einem schnell gewachsenen akademischen Milieu, hohen Mieten und einem Männerüberschuss, der beiden Seiten etwas abverlangt – den einen Auswahl, den anderen Sorgfalt.</p>",
    },
  ],
  hubFacts: [
    { label: "Hochschul- oder Tertiärabschluss", value: "58 %" },
    { label: "Studierende", value: "12.796" },
    { label: "ledig (25–54 Jahre)", value: "56,3 %" },
    { label: "ledige Männer je 100 Frauen", value: "114" },
  ],
  sources: [],
};

if (old.map?.rivers?.length || old.map?.areas?.length) p.map = { ...p.map, rivers: old.map.rivers, areas: old.map.areas, boundary: old.map.boundary };

applySources(p, {
  einwohner: { publisher: "Bundesamt für Statistik (BFS)", title: "STATPOP, Tabelle px-x-0102010000_103: ständige Wohnbevölkerung nach Gemeinde (Bevölkerungsstand)", stand: "Stand 31.12.2025", url: "https://www.pxweb.bfs.admin.ch/api/v1/de/px-x-0102010000_103/px-x-0102010000_103.px" },
  "bfs-zivil": { publisher: "Bundesamt für Statistik (BFS)", title: "STATPOP, Tabelle px-x-0102010000_103: ständige Wohnbevölkerung nach Gemeinde, Geschlecht, Zivilstand und Altersklasse (Anteil Ledige, Geschiedene, Geschlechterverhältnis)", stand: "Stand 31.12.2025", url: "https://www.pxweb.bfs.admin.ch/api/v1/de/px-x-0102010000_103/px-x-0102010000_103.px" },
  "bfs-stud": { publisher: "Bundesamt für Statistik (BFS)", title: "Studierende an den universitären Hochschulen (px-x-1502040100_106) sowie an Fachhochschulen und pädagogischen Hochschulen (px-x-1502040400_136) nach Fachbereich, Studienstufe, Geschlecht und Hochschule; Bachelor bis Doktorat ohne Weiterbildung", stand: "Wintersemester 2025/26", url: "https://www.pxweb.bfs.admin.ch/api/v1/de/px-x-1502040100_106/px-x-1502040100_106.px" },
  "lustat-bildung": { publisher: "LUSTAT Statistik Luzern", title: "Kennzahlen Stadt Luzern – Bildungsstand der Bevölkerung: 58 % der 25- bis 64-Jährigen mit Tertiärabschluss (2015: 46 %), 89 % mit mindestens Sekundarstufe II, 11 % ohne nachobligatorische Ausbildung", stand: "Jahr 2024", url: "https://www.lustat.ch/monitoring/kennzahlen-stadt-luzern/bildung-und-kultur/bildungsstand-der-bevoelkerung" },
  "lustat-beschaeftigung": { publisher: "LUSTAT Statistik Luzern", title: "Kennzahlen Stadt Luzern – Beschäftigungsdichte: rund 86.200 Einwohner und rund 84.500 Beschäftigte, Dichte 0,98 (Kanton Luzern 0,63); Quartier Bahnhof/Werft 17,78", stand: "Jahr 2024", url: "https://www.lustat.ch/monitoring/kennzahlen-stadt-luzern/wirtschaft-und-arbeit/beschaeftigungsdichte" },
  "lustat-haushalte": { publisher: "LUSTAT Statistik Luzern", title: "Kennzahlen Stadt Luzern – Haushalte mit Kindern: 21 % Familienhaushalte (Kanton Luzern 28 %), davon 19 % Alleinerziehende", stand: "Jahr 2024", url: "https://www.lustat.ch/monitoring/kennzahlen-stadt-luzern/bevoelkerung/haushalte-mit-kindern" },
  "lustat-mieten": { publisher: "LUSTAT Statistik Luzern", title: "Kennzahlen Stadt Luzern – Mietpreise: Medianmiete 1.450 Franken (3 Zimmer) und 1.650 Franken (4 Zimmer)", stand: "Jahr 2024", url: "https://www.lustat.ch/monitoring/kennzahlen-stadt-luzern/bauen-und-wohnen/mietpreise" },
  "lustat-pendler": { publisher: "LUSTAT Statistik Luzern", title: "Kennzahlen Stadt Luzern – Pendlermobilität: ÖV-Anteil 55 % (Zupendelnde) und 54 % (Wegpendelnde), Binnenpendelnde zu 49 % im Langsamverkehr", stand: "abgerufen 11/2026", url: "https://www.lustat.ch/monitoring/kennzahlen-stadt-luzern/mobilitaet-und-verkehr/pendlermobilitaet" },
  "unilu-portraet": { publisher: "Universität Luzern", title: "Porträt: moderne Universität seit 2000, Wurzeln im 16. Jahrhundert, jüngste Universität der Schweiz, rund 4.100 Studierende und über 700 Mitarbeitende, sechs Fakultäten sowie Graduierten- und Weiterbildungsakademie", stand: "abgerufen 11/2026", url: "https://www.unilu.ch/universitaet/portraet/" },
  "hslu-ueberuns": { publisher: "Hochschule Luzern", title: "Über uns: eine von sieben öffentlich-rechtlichen Fachhochschulen der Schweiz, 1997 gegründet, getragen vom Konkordat der sechs Zentralschweizer Kantone, sechs Departemente", stand: "abgerufen 11/2026", url: "https://www.hslu.ch/de-ch/hochschule-luzern/ueber-uns/" },
});

checkSeo(p);
writeFileSync(file, JSON.stringify(p, null, 1) + "\n");
console.log("Luzern geschrieben:", p.sources.length, "Quellen,", p.guide.length, "Guide-Kapitel,", p.universities.length, "Hochschulen");
