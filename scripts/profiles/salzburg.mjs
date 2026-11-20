// Stadtdossier Salzburg ausbauen: Paris-Lodron-Universität und Mozarteum in Zahlen, Indikatoren der
// Abgestimmten Erwerbsstatistik 2024, Termine (Festspiele, Lange Nacht der Forschung) und Stadt-Guide.
import { readFileSync, writeFileSync } from "node:fs";
import { applySources, checkSeo } from "./_sources.mjs";

const file = "data/city-profiles/at/salzburg.json";
const p = JSON.parse(readFileSync(file, "utf8"));

p.seoTitle = "Akademiker Singles in Salzburg: Uni seit 1622";
p.seoDescription = "Salzburg in Zahlen: 24,4 % mit Hochschulabschluss, 19.959 Studierende an Universität und Mozarteum, 46,9 % Einpersonenhaushalte – alles belegt.";
p.eyebrow = "Partnersuche für Akademiker · Universitäts- und Festspielstadt an der Salzach";
p.lead = "Eine Universität, die 1622 von Fürsterzbischof Paris Lodron gegründet wurde, dazu das Mozarteum, die Paracelsus Medizinische Privatuniversität und die Fachhochschule: In Salzburg haben 24,4 Prozent der Menschen ab 15 Jahren einen Hochschul-, Akademie- oder Kollegabschluss. 46,9 Prozent der Haushalte bestehen aus einer Person, das Geschlechterverhältnis in der Altersgruppe 30 bis 49 ist mit 103 zu 100 fast ausgeglichen. Und jeden Sommer verwandeln die Festspiele die Stadt in ein internationales Publikum.";

p.briefing = [
  { value: "24,4 %", label: "der Einwohnerinnen und Einwohner ab 15 Jahren haben einen Hochschul-, Akademie- oder Kollegabschluss – österreichweit 17,6 %", source: "aest-gemeinde" },
  { value: "19.959", label: "Studierende an Paris-Lodron-Universität und Universität Mozarteum", source: "uni-stud", note: "Wintersemester 2025/26, berechnet; Fachhochschule Salzburg und Paracelsus Medizinische Privatuniversität kommen dazu" },
  { value: "46,9 %", label: "aller Haushalte in der Stadt Salzburg sind Einpersonenhaushalte", source: "aest-indikatoren" },
];

p.kpis = [
  { value: "157.533", label: "Einwohnerinnen und Einwohner in der Stadt Salzburg", source: "aest-gemeinde", note: "Abgestimmte Erwerbsstatistik 2024, Stichtag 31.10.2024" },
  { value: "122.730", label: "Beschäftigte in Salzburger Arbeitsstätten", source: "aest-gemeinde", note: "17.267 Arbeitsstätten, 14.558 Unternehmen; 92,9 % der Arbeitsstätten im tertiären Sektor" },
  { value: "17.691", label: "Studierende an der Paris-Lodron-Universität Salzburg", source: "uni-stud", note: "Wintersemester 2025/26; die Universität Mozarteum zählt weitere 2.268" },
  { value: "103", label: "Männer je 100 Frauen in der Altersgruppe 30 bis 49", source: "bev-alter", note: "22.169 Männer und 21.529 Frauen am 01.01.2026 – eines der ausgeglichensten Verhältnisse unter den Landeshauptstädten" },
];

p.dossier = [
  {
    key: "bildung",
    title: "Bildung",
    intro: "Seit 1622 Universitätsstadt, seit 1962 wieder: Salzburg verbindet eine alte Universitätstradition mit einer der bekanntesten Musikhochschulen der Welt.",
    metrics: [
      { value: "24,4 %", label: "der Einwohnerinnen und Einwohner ab 15 Jahren haben einen Hochschul-, Akademie- oder Kollegabschluss", source: "aest-gemeinde", note: "Abgestimmte Erwerbsstatistik 2024; Land Salzburg 16,8 %, Österreich 17,6 %", compare: { city: 24.4, germany: 17.6, unit: " %", max: 32 } },
      { value: "35,8 %", label: "Tertiärquote der Männer ab 25 Jahren (Frauen: 34,9 %)", source: "aest-indikatoren", note: "ISCED 2011, Abgestimmte Erwerbsstatistik 2024; Land Salzburg 31,0 % (Männer) und 28,1 % (Frauen). Das Verhältnis zwischen Frauen und Männern ist hier besonders ausgeglichen", compare: { city: 35.8, germany: 31.8, unit: " %", max: 46 } },
      { value: "19.959", label: "Studierende an den beiden öffentlichen Universitäten", source: "uni-stud", note: "Wintersemester 2025/26, berechnet: Paris-Lodron-Universität Salzburg 17.691 und Universität Mozarteum 2.268; dazu kommen die Fachhochschule Salzburg und die Paracelsus Medizinische Privatuniversität" },
    ],
    takeaway: "Geistes- und Naturwissenschaften, Recht, Theologie und Musik: In Salzburg trifft man auf Lebensläufe mit kulturellem Schwerpunkt.",
  },
  {
    key: "beruf",
    title: "Beruf & Erfolg",
    intro: "Dienstleistung, Tourismus, Verwaltung und Gesundheitswesen prägen die Stadt – dazu kommt eine internationale Festspielwirtschaft.",
    metrics: [
      { value: "122.730", label: "Beschäftigte in Salzburger Arbeitsstätten", source: "aest-gemeinde", note: "17.267 Arbeitsstätten; Beschäftigungsverhältnisse am Arbeitsort, Stichtag 31.10.2024" },
      { value: "139", label: "Einpendelnde je 100 Auspendelnde", source: "aest-indikatoren", note: "Pendlersaldo nach der Abgestimmten Erwerbsstatistik 2024; nur 30,7 % der Salzburger Erwerbstätigen pendeln aus der Stadt aus" },
      { value: "33,1 %", label: "der Bevölkerung haben keine österreichische Staatsangehörigkeit – nach Wien der höchste Wert", source: "aest-gemeinde", note: "Abgestimmte Erwerbsstatistik 2024; Land Salzburg 20,6 %, Österreich 20,0 %. Grenznähe, Tourismus und Hochschulen bringen viele Menschen aus dem Ausland in die Stadt" },
    ],
    takeaway: "Viele arbeiten hier in Berufen mit Publikum – und bringen deshalb Gesprächsroutine mit, die beim ersten Treffen hilft.",
  },
  {
    key: "wohnen",
    title: "Wohnen & Alltag",
    intro: "Teurer Wohnraum, kleine Haushalte, hoher Mietanteil: Salzburg verlangt mehr vom Budget als andere Landeshauptstädte.",
    metrics: [
      { value: "46,9 %", label: "Einpersonenhaushalte", source: "aest-indikatoren", note: "Abgestimmte Erwerbsstatistik 2024; Land Salzburg 37,8 %, Österreich 38,9 %. 77.120 Privathaushalte mit durchschnittlich 1,99 Personen", compare: { city: 46.9, germany: 38.9, unit: " %", max: 55 } },
      { value: "61,9 %", label: "Mietquote der Hauptwohnsitzwohnungen", source: "aest-indikatoren", note: "Abgestimmte Erwerbsstatistik 2024; Land Salzburg 41,8 %, Österreich 45,3 %. Die durchschnittliche Wohnfläche liegt bei 74,9 Quadratmetern" },
      { value: "21", label: "Minuten durchschnittliche Wegzeit zur Arbeit", source: "aest-indikatoren", note: "Abgestimmte Erwerbsstatistik 2024; durchschnittliche Pendeldistanz 22,6 Straßenkilometer. Innerhalb der Stadt sind Rad und Bus meist schneller als das Auto" },
    ],
    takeaway: "Wer in Salzburg wohnt, hat sich bewusst dafür entschieden – das verbindet mehr, als man denkt.",
  },
  {
    key: "singles",
    title: "Single-Leben",
    intro: "Fast jeder zweite Haushalt besteht aus einer Person, und Männer und Frauen sind in der entscheidenden Altersgruppe fast gleich verteilt.",
    metrics: [
      { value: "103", label: "Männer je 100 Frauen zwischen 30 und 49 Jahren", source: "bev-alter", note: "22.169 Männer zu 21.529 Frauen am 01.01.2026; in Graz sind es 109, in Innsbruck 110", compare: { city: 103, germany: 109, unit: "", max: 125 } },
      { value: "43,9", label: "Jahre Durchschnittsalter", source: "aest-indikatoren", note: "Abgestimmte Erwerbsstatistik 2024; Österreich 43,6 Jahre, Land Salzburg 43,6. Salzburg ist damit älter als Graz (41,4) oder Innsbruck (42,8)", compare: { city: 43.9, germany: 43.6, unit: " J.", max: 50 } },
      { value: "34,8 %", label: "der 20- bis 24-Jährigen sind in weiterführender Ausbildung", source: "aest-indikatoren", note: "Abgestimmte Erwerbsstatistik 2024; Österreich 33,5 %. Salzburg ist weniger stark studentisch geprägt als Graz (50,5 %) oder Innsbruck (48,8 %)" },
    ],
    takeaway: "Hier sucht man seltener zwischen zwei Semestern und öfter mit klaren Vorstellungen – das macht Gespräche konkreter.",
  },
];

p.universities = [
  { name: "Paris-Lodron-Universität Salzburg", kind: "Volluniversität", founded: "1622", students: "17.691", source: "uni-stud", compareSource: "plus-portraet", text: "1622 von Fürsterzbischof Paris Lodron gegründet, 1810 aufgelöst und 1962 wiedererrichtet: Heute bietet sie sechs Fakultäten mit 34 Fachbereichen und rund 90 Studien – von digitalen und analytischen über natur- und gesellschaftswissenschaftliche bis zu theologischen und rechtswissenschaftlichen Fächern." },
  { name: "Universität Mozarteum Salzburg", kind: "Kunstuniversität für Musik und darstellende Kunst", students: "2.268", source: "uni-stud", text: "Eine der bekanntesten Musikhochschulen der Welt, mit 2.268 Studierenden aus allen Kontinenten. Ihre Konzerte und Prüfungsvorspiele prägen das Musikleben der Stadt weit über die Festspielzeit hinaus." },
  { name: "Paracelsus Medizinische Privatuniversität", kind: "Private Medizinuniversität", students: "", source: "sbg-zahlen", text: "Medizin, Pflegewissenschaft und Molekulare Medizin am Campus der Salzburger Landeskliniken. Ein kleines, international besetztes Haus – und ein wichtiger Grund, warum in Salzburg so viele Menschen in Gesundheitsberufen arbeiten." },
  { name: "Fachhochschule Salzburg", kind: "Fachhochschule, Campus Urstein und Kuchl", students: "", source: "sbg-zahlen", text: "Technik, Wirtschaft, Design, Gesundheit und Holztechnologie, überwiegend berufsnah und oft berufsbegleitend. Der Campus Urstein liegt wenige S-Bahn-Minuten südlich der Stadt." },
];
p.universitiesNote = "Studierende an den öffentlichen Universitäten im Wintersemester 2025/26; Fachhochschule und Privatuniversität sind nicht enthalten.";

p.quarters = [
  { name: "Altstadt & Nonntal", label: "Universität und Welterbe", text: "Die Altstadt gehört zum UNESCO-Welterbe, die Universität ist mit mehreren Standorten mitten in der Stadt – Unipark Nonntal, Rudolfskai, Toskanatrakt. Wer hier arbeitet, hat den kürzesten Arbeitsweg Österreichs und das teuerste Mittagessen." },
  { name: "Mülln & Riedenburg", label: "Studentisch", text: "Zwischen Augustiner Bräustübl und Müllner Steg liegt das Viertel, in dem Studierende und junge Berufstätige wohnen. Der Biergarten im Bräustübl ist einer der wenigen Orte, an denen Salzburg unkompliziert ist." },
  { name: "Itzling & Elisabeth-Vorstadt", label: "Science City", text: "Im Norden entsteht rund um Fachbereiche der Universität und Technologieunternehmen ein Forschungsstandort. Günstigere Mieten als in der Altstadt, gute Bahnanbindung, wachsende Lokalszene." },
  { name: "Aigen & Parsch", label: "Grüner Osten", text: "Villen, Gärten und der Weg auf den Gaisberg vor der Haustür. Hier wohnt, wer im Beruf angekommen ist – und die Stadt lieber von oben betrachtet." },
  { name: "Lehen & Liefering", label: "Westlich der Salzach", text: "Dichter bebaut, jünger und günstiger: Lehen hat sich mit Stadtwerk-Areal und neuer Bibliothek stark verändert. Für Berufseinsteiger die realistischste Adresse in der Stadt." },
  { name: "Landeskliniken & Müllner Hügel", label: "Medizinviertel", text: "Rund um die Salzburger Landeskliniken und die Paracelsus-Universität arbeitet ein großer Teil der medizinischen Berufe des Bundeslandes. Dienstpläne bestimmen hier den Kalender." },
];

p.agenda = [
  { title: "Salzburger Festspiele", when: "Sommer, Mitte Juli bis Ende August", text: "Das wichtigste Festival klassischer Musik und Oper weltweit läuft 2027 vom 16. Juli bis 29. August, dazu die Pfingstfestspiele vom 14. bis 17. Mai. Sechs Wochen, in denen die halbe Stadt arbeitet und die andere Hälfte im Publikum sitzt.", href: "https://www.salzburgerfestspiele.at/" },
  { title: "Lange Nacht der Forschung", when: "Alle zwei Jahre", text: "Zuletzt am 24. April 2026 mit über 3.000 Programmpunkten und mehr als 192.000 Besuchenden österreichweit, bei freiem Eintritt. In Salzburg öffnen dabei Universität, Fachhochschule und Forschungseinrichtungen ihre Labore; die nächste Ausgabe ist für den 19. Mai 2028 angekündigt.", href: "https://langenachtderforschung.at/" },
  { title: "Konzerte und Vorspiele am Mozarteum", when: "Semesterweise", text: "Die Universität Mozarteum zeigt Abschlusskonzerte, Klassenabende und Opernproduktionen – oft zu kleinen Preisen oder frei zugänglich. Musikalisch anspruchsvoll, gesellschaftlich unkompliziert: ein gutes zweites Date." },
  { title: "Gaisberg, Mönchsberg, Salzachufer", when: "Ganzjährig", text: "Ein Aufstieg auf den Mönchsberg mit Blick über die Altstadt oder eine Runde am Salzachufer kostet nichts und funktioniert bei fast jedem Wetter. Für Salzburg ist das die Standardlösung für ein erstes Treffen." },
];

p.talkingPoints = [
  { title: "Die Stadt lebt sechs Wochen anders", text: "Von Mitte Juli bis Ende August verändern die Festspiele den Alltag komplett: volle Straßen, internationales Publikum, Überstunden in halben Branchen. Wer in Salzburg verabredet ist, sollte wissen, ob das Gegenüber in dieser Zeit arbeitet – das entscheidet über den ganzen Sommer." },
  { title: "Fast gleich viele Männer und Frauen", text: "103 Männer je 100 Frauen zwischen 30 und 49 – ein ausgeglicheneres Verhältnis als in Graz (109) oder Innsbruck (110). Salzburg hat weniger technische Studienrichtungen und mehr Berufe im Gesundheits-, Kultur- und Dienstleistungsbereich." },
  { title: "Wohnen als Dauerthema", text: "61,9 Prozent Mietquote, 74,9 Quadratmeter durchschnittliche Wohnfläche und ein Wohnungsmarkt, über den in Salzburg jeder eine Geschichte hat. Beim Kennenlernen ist das ein sicherer Gesprächseinstieg – und eine realistische Frage für die gemeinsame Zukunft." },
];

p.faq = [
  { question: "Wie viele Akademiker leben in Salzburg?", answer: "24,4 Prozent der Einwohnerinnen und Einwohner ab 15 Jahren haben einen Hochschul-, Akademie- oder Kollegabschluss (Abgestimmte Erwerbsstatistik 2024; Land Salzburg 16,8 Prozent, Österreich 17,6 Prozent). Die Tertiärquote ab 25 Jahren liegt bei 35,8 Prozent (Männer) und 34,9 Prozent (Frauen)." },
  { question: "Seit wann gibt es die Universität Salzburg?", answer: "Die Paris-Lodron-Universität wurde 1622 von Fürsterzbischof Paris Lodron gegründet, 1810 aufgelöst und 1962 wiedererrichtet. Heute bietet sie sechs Fakultäten mit 34 Fachbereichen und rund 90 Studien; im Wintersemester 2025/26 sind 17.691 Studierende inskribiert." },
  { question: "Wie viele Studierende hat Salzburg?", answer: "An den öffentlichen Universitäten sind es im Wintersemester 2025/26 zusammen 19.959: 17.691 an der Paris-Lodron-Universität und 2.268 an der Universität Mozarteum. Dazu kommen die Fachhochschule Salzburg mit Standorten in Urstein und Kuchl sowie die Paracelsus Medizinische Privatuniversität." },
  { question: "Gibt es in Salzburg mehr Männer oder Frauen?", answer: "In der Altersgruppe 30 bis 49 kommen auf 100 Frauen 103 Männer (22.169 zu 21.529 am 01.01.2026) – eines der ausgeglichensten Verhältnisse unter den Landeshauptstädten. In Graz sind es 109, in Innsbruck 110 Männer je 100 Frauen." },
  { question: "Gibt es in Salzburg viele Singles?", answer: "46,9 Prozent der Haushalte sind Einpersonenhaushalte (Österreich 38,9 Prozent), bei 77.120 Privathaushalten mit durchschnittlich 1,99 Personen. Alleinlebend heißt nicht automatisch Single, zeigt aber, wie verbreitet das eigenständige Wohnen in der Stadt ist." },
  { question: "Wo lernen Akademiker in Salzburg Singles kennen?", answer: "Bei Konzerten und Vorspielen des Mozarteums, während der Festspielzeit im Sommer, bei der Langen Nacht der Forschung, im Unipark Nonntal, im Augustiner Bräustübl in Mülln oder auf dem Mönchsberg. Wer gezielt Menschen mit ähnlichem Bildungshintergrund sucht, findet sie bei AkademikerSingles: Jedes Profil wird manuell geprüft." },
  { question: "Ist die Anmeldung kostenlos?", answer: "Ja. Die Registrierung ist kostenfrei und beinhaltet die Basis-Mitgliedschaft. Damit legen Sie Ihr Profil an, nutzen den Fragenflirt und antworten kostenlos auf Nachrichten von Premium-Mitgliedern." },
];

p.guide = [
  {
    title: "Eine kleine Stadt mit großem Publikum",
    html: "<p>157.533 Einwohnerinnen und Einwohner, 122.730 Arbeitsplätze, 19.959 Studierende an zwei öffentlichen Universitäten: Salzburg ist kompakt und trotzdem international. 33,1 Prozent der Bevölkerung haben keine österreichische Staatsangehörigkeit – nach Wien der höchste Wert aller Landeshauptstädte.</p><p>Das prägt den Alltag. In kaum einer anderen österreichischen Stadt dieser Größe hört man im Bus so viele Sprachen, und kaum irgendwo sonst ist der Anteil an Menschen so hoch, die für eine bestimmte Stelle hergezogen sind – ans Mozarteum, an die Landeskliniken, in den Tourismus oder an die Universität.</p><p>Für die Partnersuche heißt das: Viele sind offen für neue Kontakte, weil sie selbst einmal neu waren. Und viele haben einen Zeithorizont im Kopf, weil ihr Vertrag oder ihr Studium ein Ende hat. Beides gehört früh ins Gespräch.</p>",
  },
  {
    title: "1622, 1810, 1962: die Universität und ihre Brüche",
    html: "<p>Die Paris-Lodron-Universität wurde 1622 von Fürsterzbischof Paris Lodron gegründet – und 1810 wieder aufgelöst. Erst 1962 wurde sie wiedererrichtet. Heute bietet sie sechs Fakultäten mit 34 Fachbereichen und rund 90 Studien, von digitalen und analytischen über natur- und lebenswissenschaftliche bis zu theologischen und rechtswissenschaftlichen Fächern, und zählt 17.691 Studierende.</p><p>Daneben steht mit dem Mozarteum eine der bekanntesten Musikhochschulen der Welt: 2.268 Studierende, international besetzt, mit eigenem Konzert- und Opernbetrieb. Dazu kommen die Paracelsus Medizinische Privatuniversität an den Landeskliniken und die Fachhochschule Salzburg mit Campus in Urstein und Kuchl.</p><p>Diese Mischung erklärt, warum Salzburg akademisch anders aussieht als Graz oder Linz: weniger Technik, mehr Kultur, Medizin und Geisteswissenschaft. Wer hier jemanden kennenlernt, landet im Gespräch eher bei Musik und Sprache als bei Maschinenbau.</p>",
  },
  {
    title: "Der Sommer, der alles verändert",
    html: "<p>Von Mitte Juli bis Ende August gehört die Stadt den Festspielen – 2027 vom 16. Juli bis 29. August, dazu die Pfingstfestspiele vom 14. bis 17. Mai. In diesen Wochen arbeiten Tausende in Produktion, Gastronomie, Hotellerie und Technik, während internationales Publikum die Altstadt füllt.</p><p>Für Beziehungen ist das ein eigener Faktor. Wer in einem der betroffenen Berufe arbeitet, hat im Hochsommer kaum freie Abende – dafür im Herbst und Winter umso mehr. Umgekehrt ist die Festspielzeit die Phase, in der die Stadt am meisten Gelegenheiten bietet: Vorplatzkonzerte, Jedermann auf dem Domplatz, Public Viewing der Opern.</p><p>Praktisch heißt das: Verabredungen im Juli und August brauchen Vorlauf. Dafür ist ein gemeinsamer Festspielabend eine Einladung, die in Salzburg wirklich zählt.</p>",
  },
  {
    title: "Wohnen zwischen Welterbe und Realität",
    html: "<p>46,9 Prozent der Salzburger Haushalte bestehen aus einer Person, die Mietquote liegt bei 61,9 Prozent, die durchschnittliche Wohnfläche bei 74,9 Quadratmetern. Der Wohnungsmarkt ist angespannt, und das ist in Salzburg kein Randthema, sondern Dauergespräch.</p><p>Die Viertel unterscheiden sich entsprechend: Altstadt und Nonntal mit Universität und Welterbe sind teuer und zentral, Mülln und Riedenburg studentisch geprägt, Lehen und Liefering westlich der Salzach dichter und günstiger, Aigen und Parsch im Osten grün und gesetzt. Im Norden entsteht rund um Itzling ein Forschungs- und Technologiestandort.</p><p>Die gute Nachricht: Die durchschnittliche Wegzeit zur Arbeit beträgt 21 Minuten. Wer in der Stadt wohnt, kann sich unter der Woche verabreden, ohne den halben Abend im Verkehr zu verbringen.</p>",
  },
  {
    title: "Wo man sich trifft, wenn keine Festspiele sind",
    html: "<p>Zehn Monate im Jahr ist Salzburg eine normale Landeshauptstadt – und bietet dann die unkomplizierteren Gelegenheiten. Das Augustiner Bräustübl in Mülln ist einer der wenigen Orte, an denen Herkunft und Abschluss keine Rolle spielen. Der Mönchsberg mit dem Museum der Moderne verbindet Spaziergang und Ausstellung.</p><p>Akademisch wird es bei den Konzerten und Klassenabenden des Mozarteums, die oft günstig oder frei zugänglich sind, und alle zwei Jahre bei der Langen Nacht der Forschung – zuletzt am 24. April 2026 mit österreichweit über 3.000 Programmpunkten und mehr als 192.000 Besuchenden, bei freiem Eintritt. Die nächste ist für den 19. Mai 2028 angekündigt.</p><p>Und wenn gar nichts geplant ist: Salzachufer flussabwärts, über den Müllner Steg zurück, mit Blick auf die Festung. Das funktioniert in dieser Stadt seit Generationen.</p>",
  },
  {
    title: "Was die Zahlen nicht sagen",
    html: "<p>Die Werte dieser Seite stammen aus der Abgestimmten Erwerbsstatistik 2024 (Stichtag 31. Oktober 2024) und der Hochschulstatistik für das Wintersemester 2025/26. Die Studierendenzahlen umfassen nur die öffentlichen Universitäten; Fachhochschule und Privatuniversität sind nicht enthalten.</p><p>Ein Einpersonenhaushalt ist kein Beziehungsstatus – viele der 46,9 Prozent leben in einer Partnerschaft, nur in zwei Wohnungen. Und das ausgeglichene Geschlechterverhältnis von 103 zu 100 ist ein Durchschnitt über zwanzig Jahrgänge; in einzelnen Berufsfeldern sieht es deutlich anders aus.</p><p>Was bleibt: Salzburg ist klein, international und kulturell dicht, mit ausgeglichenem Geschlechterverhältnis und einer hohen Zahl an Menschen, die wegen einer Aufgabe hergezogen sind. Wer hier sucht, sollte den Wohnungsmarkt im Blick behalten – und den Festspielkalender.</p>",
  },
];

applySources(p, {
  "bev-alter": { publisher: "Statistik Austria", title: "Bevölkerungsstand zu Jahresbeginn 2026 nach Gemeinde, Alter in Einzeljahren und Geschlecht (Open Government Data, Datensatz OGD_bevstandjbab2002_BevStand_2026)", stand: "Stand 01.01.2026", url: "https://data.statistik.gv.at/web/meta.jsp?dataset=OGD_bevstandjbab2002_BevStand_2026" },
  "uni-stud": { publisher: "Statistik Austria", title: "Studierende an öffentlichen Universitäten nach Uni (Open Government Data, Datensatz OGD_unistud3_ext_UNI_STUD3_1)", stand: "Wintersemester 2025/26", url: "https://data.statistik.gv.at/web/meta.jsp?dataset=OGD_unistud3_ext_UNI_STUD3_1" },
  "plus-portraet": { publisher: "Paris-Lodron-Universität Salzburg", title: "Über die Universität: 1622 von Fürsterzbischof Paris Lodron gegründet und 1962 wiedererrichtet; sechs Fakultäten, 34 Fachbereiche, rund 90 Studien", stand: "abgerufen 11/2026", url: "https://www.plus.ac.at/universitaet/ueber-die-universitaet/" },
});

checkSeo(p);
writeFileSync(file, JSON.stringify(p, null, 1) + "\n");
console.log("Salzburg geschrieben:", p.sources.length, "Quellen,", p.guide.length, "Guide-Kapitel,", p.universities.length, "Hochschulen");
