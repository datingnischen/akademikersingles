// Neues Stadtdossier Leoben: Österreichs einzige Montanuniversität, 2.929 Studierende – und mit 115 Männern
// je 100 Frauen (30–49) der schiefste Partnermarkt unserer österreichischen Dossiers.
// Karte danach erzeugen: python scripts/build_city_map.py at/leoben
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { applySources, checkSeo } from "./_sources.mjs";

const file = "data/city-profiles/at/leoben.json";
const old = existsSync(file) ? JSON.parse(readFileSync(file, "utf8")) : {};

const p = {
  path: "/partnersuche/leoben/",
  name: "Leoben",
  heroAlt: "Aquarellzeichnung von Leoben mit dem Schwammerlturm und der Mur im Vordergrund",
  country: "Österreich",
  region: "Steiermark",
  seoTitle: "Akademiker Singles in Leoben: Montanuniversität",
  seoDescription: "Leoben in Zahlen: Österreichs einzige Montanuniversität mit 2.929 Studierenden und 115 Männer je 100 Frauen zwischen 30 und 49 Jahren.",
  eyebrow: "Partnersuche für Akademiker · Universitätsstadt an der Mur",
  lead: "Leoben hat 24.581 Einwohner und eine Universität, die es in Österreich nur hier gibt: die Montanuniversität mit 2.929 Studierenden in den Bereichen Rohstoffe, Werkstoffe und Prozesse. Das prägt die Stadt bis in die Statistik – mit 1,85 Personen je Haushalt der kleinste Wert unserer österreichischen Dossiers und mit 115 Männern je 100 Frauen zwischen 30 und 49 der deutlichste Männerüberschuss. Wer das weiß, kann es nutzen: Für Frauen ist Leoben rechnerisch der günstigste Markt des Landes.",
  briefing: [
    { value: "2.929", label: "Studierende an der Montanuniversität Leoben – Österreichs einziger Universität dieser Art", source: "uni-stud" },
    { value: "115", label: "Männer je 100 Frauen zwischen 30 und 49 Jahren – der höchste Wert unserer österreichischen Dossiers", source: "bev-alter" },
    { value: "1,85", label: "Personen je Privathaushalt – kleiner als in Wien (2,04) oder Graz (1,94)", source: "aest-gemeinde" },
  ],
  kpis: [
    { value: "24.581", label: "Einwohnerinnen und Einwohner in Leoben", source: "aest-gemeinde", note: "Abgestimmte Erwerbsstatistik 2024, Stichtag 31.10.2024" },
    { value: "18.533", label: "Beschäftigte in Leobener Arbeitsstätten", source: "aest-gemeinde", note: "1.695 Arbeitsstätten, 1.296 Unternehmen; 87,7 % der Arbeitsstätten im tertiären Sektor" },
    { value: "15,8 %", label: "der Einwohnerinnen und Einwohner ab 15 Jahren haben einen Hochschul-, Akademie- oder Kollegabschluss", source: "aest-gemeinde", note: "Abgestimmte Erwerbsstatistik 2024; Steiermark 16,0 %, Österreich 17,6 %" },
    { value: "12.779", label: "Privathaushalte mit durchschnittlich 1,85 Personen", source: "aest-gemeinde", note: "Abgestimmte Erwerbsstatistik 2024 – die kleinste durchschnittliche Haushaltsgröße unter den österreichischen Städten dieses Dossiers" },
  ],
  dossier: [
    {
      key: "bildung",
      title: "Bildung",
      intro: "Eine Universität, die es in Österreich nur einmal gibt – mit 2.929 Studierenden auf 24.581 Einwohner.",
      metrics: [
        { value: "2.929", label: "Studierende an der Montanuniversität Leoben", source: "uni-stud", note: "Wintersemester 2025/26. In der Liste der 22 öffentlichen Universitäten Österreichs ist sie die einzige Montanuniversität; ihre Studienbereiche sind Rohstoffe, Werkstoffe und Prozesse", compareSource: "mul-profil" },
        { value: "119", label: "Studierende je 1.000 Einwohnerinnen und Einwohner", source: "uni-stud", compareSource: "aest-gemeinde", note: "Berechnet: 2.929 Studierende auf 24.581 Einwohner. Zum Vergleich: In Wien sind es rund 82, in Graz rund 181 je 1.000 Einwohner" },
        { value: "15,8 %", label: "der Einwohnerinnen und Einwohner ab 15 Jahren haben einen Hochschul-, Akademie- oder Kollegabschluss", source: "aest-gemeinde", note: "Abgestimmte Erwerbsstatistik 2024; Steiermark 16,0 %, Österreich 17,6 %. Viele Absolventinnen und Absolventen der Montanuniversität gehen nach dem Studium in die Industriezentren", compare: { city: 15.8, germany: 17.6, unit: " %", max: 26 } },
      ],
      takeaway: "Wer hier studiert hat, arbeitet später oft in der Industrie – und bringt ein Fachwissen mit, das man sonst selten am Tisch hat.",
    },
    {
      key: "beruf",
      title: "Beruf & Erfolg",
      intro: "Industrie, Forschung und Gesundheitswesen: In Leoben arbeiten mehr Menschen, als dort wohnen – ein Erbe der Montanregion.",
      metrics: [
        { value: "18.533", label: "Beschäftigte in Leobener Arbeitsstätten", source: "aest-gemeinde", note: "1.695 Arbeitsstätten; 38,7 % der Leobener Erwerbstätigen pendeln aus der Stadt aus (Stichtag 31.10.2024)" },
        { value: "6,7 %", label: "Arbeitslosenquote ab 15 Jahren – niedriger als in Graz (8,2 %) oder Linz (7,9 %)", source: "aest-gemeinde", note: "Abgestimmte Erwerbsstatistik 2024; Steiermark 5,3 %, Österreich 6,6 %" },
        { value: "24,6 %", label: "der Bevölkerung haben keine österreichische Staatsangehörigkeit", source: "aest-gemeinde", note: "Abgestimmte Erwerbsstatistik 2024; Steiermark 14,4 %. Die internationale Studierendenschaft der Montanuniversität und die Industrie prägen diesen Wert" },
      ],
      takeaway: "Hier wird an Material, Energie und Kreislaufwirtschaft gearbeitet – Themen, über die man abends tatsächlich reden kann.",
    },
    {
      key: "singles",
      title: "Single-Leben",
      intro: "Der deutlichste Männerüberschuss unserer österreichischen Dossiers – und die kleinsten Haushalte.",
      metrics: [
        { value: "115", label: "Männer je 100 Frauen zwischen 30 und 49 Jahren", source: "bev-alter", note: "3.483 Männer zu 3.022 Frauen am 01.01.2026. In Klagenfurt sind es 99, in Wien 103, in Graz 109 – Leoben ist das andere Ende der Skala", compare: { city: 115.3, germany: 103, unit: "", max: 125 } },
        { value: "1,85", label: "Personen je Privathaushalt – der kleinste Wert unserer österreichischen Städte", source: "aest-gemeinde", note: "12.779 Privathaushalte, Abgestimmte Erwerbsstatistik 2024; Steiermark 2,17, Österreich 2,18" },
        { value: "23,9 %", label: "der Bevölkerung sind 65 Jahre oder älter", source: "aest-gemeinde", note: "Abgestimmte Erwerbsstatistik 2024; Steiermark 22,0 %, Österreich 20,2 %. Leoben ist älter als die Universitätsstädte – ein Effekt des industriellen Strukturwandels" },
      ],
      takeaway: "Für Frauen ist Leoben statistisch der freundlichste Markt des Landes – für Männer zählt hier mehr als anderswo, wie ein Profil geschrieben ist.",
    },
  ],
  universities: [
    { name: "Montanuniversität Leoben", kind: "Technische Universität für Rohstoffe, Werkstoffe und Prozesse", students: "2.929", source: "uni-stud", compareSource: "mul-profil", text: "Österreichs einzige Montanuniversität: Die Studienbereiche reichen von Rohstoffen über Werkstoffe bis zu Prozessen, der Forschungsansatz rund um Circular Engineering zielt auf ressourcenschonende Produkte und Kreislaufwirtschaft. Thematische Schwerpunkte sind Digitalisierung und KI, Energiewende, Rohstoffsicherheit und nachhaltige Technologien." },
    { name: "Erzherzog-Johann-Auditorium", kind: "Veranstaltungszentrum der Universität", students: "", source: "mul-profil", text: "Der zentrale Hörsaal der Universität ist zugleich Konzert- und Festsaal der Stadt: Hier spielt das Universitätsblasorchester Bergkapelle Leoben-Seegraben, hier findet das Absolvententreffen mit der Verleihung der Silbernen Diplome statt." },
    { name: "LKH Hochsteiermark, Standort Leoben", kind: "Landeskrankenhaus", students: "", source: "aest-gemeinde", text: "Das Krankenhaus versorgt die obersteirische Region und ist einer der größten Arbeitgeber der Stadt – mit entsprechend vielen Gesundheitsberufen im Bekanntenkreis." },
  ],
  universitiesNote: "Studierende an öffentlichen Universitäten im Wintersemester 2025/26 nach Statistik Austria.",
  clusters: [
    { name: "Montanuniversität & Forschung", text: "2.929 Studierende in den Bereichen Rohstoffe, Werkstoffe und Prozesse (Wintersemester 2025/26); die Universität arbeitet schwerpunktmäßig zu Kreislaufwirtschaft, Energiewende und Rohstoffsicherheit." },
    { name: "Werkstoffe & Industrie", text: "Die Obersteiermark lebt von Metall-, Werkstoff- und Elektronikindustrie; 18.533 Menschen arbeiten in Leobener Arbeitsstätten – bei 24.581 Einwohnern." },
    { name: "Gesundheitswesen", text: "Das LKH Hochsteiermark am Standort Leoben versorgt die Region und zählt zu den größten Arbeitgebern der Stadt." },
    { name: "Kultur & Museen", text: "Museumscenter und Kunsthalle Leoben zeigen Ausstellungen, die regelmäßig überregionales Publikum anziehen." },
    { name: "Internationale Studierende", text: "24,6 % der Leobener Bevölkerung haben keine österreichische Staatsangehörigkeit – ein Wert, der für eine Stadt dieser Größe ungewöhnlich hoch ist (Steiermark 14,4 %)." },
  ],
  clusterSources: ["uni-stud", "aest-gemeinde", "mul-profil"],
  places: [
    { name: "Montanuniversität Leoben", kind: "work", district: "Josef-Heißl-Straße · Campus", text: "Österreichs einzige Montanuniversität mit 2.929 Studierenden – Rohstoffe, Werkstoffe, Prozesse und Circular Engineering.", lat: 47.3854, lon: 15.0935 },
    { name: "Rohstoff- und Werkstoffzentrum", kind: "work", district: "Campus · Franz-Josef-Straße", text: "Labore und Institute der Universität, in denen an Materialien für Energiewende und Kreislaufwirtschaft gearbeitet wird.", lat: 47.382, lon: 15.0908 },
    { name: "LKH Hochsteiermark, Standort Leoben", kind: "work", district: "Leoben · Vordernberger Straße", text: "Schwerpunktkrankenhaus der Obersteiermark und einer der größten Arbeitgeber der Stadt.", lat: 47.3805, lon: 15.085 },
    { name: "AT&S Leoben-Hinterberg", kind: "work", district: "Hinterberg · Fabriksgasse", text: "Leiterplatten- und Hochtechnologiestandort im Süden der Stadt – einer der Gründe, warum Leoben technisch geprägte Lebensläufe anzieht.", lat: 47.3593, lon: 15.0653 },
    { name: "Museumscenter & Kunsthalle Leoben", kind: "work", district: "Altstadt · Kirchgasse", text: "Ausstellungshaus mit überregionalem Programm, mitten in der Altstadt.", lat: 47.3807, lon: 15.0917 },
    { name: "Hauptplatz Leoben", kind: "date", district: "Altstadt", text: "Der zentrale Platz mit Arkadenhäusern und Gastgärten – der Treffpunkt, den jeder findet.", lat: 47.3805, lon: 15.0947 },
    { name: "Schwammerlturm", kind: "date", district: "Altstadt · Murbrücke", text: "Das Wahrzeichen der Stadt am Übergang zur Mur; von hier beginnt der Spazierweg am Fluss.", lat: 47.38, lon: 15.0926 },
    { name: "Stadtpark Leoben", kind: "date", district: "Zentrum", text: "Grüner Ruhepunkt zwischen Hauptplatz und Bahnhof – gut für ein erstes Treffen ohne großen Aufwand.", lat: 47.3787, lon: 15.0955 },
    { name: "Asia Spa Leoben", kind: "date", district: "Nördlich der Mur", text: "Thermen- und Saunabad am Flussufer, das die ganze Region nutzt. Für ein späteres Treffen eine naheliegende Idee.", lat: 47.387, lon: 15.0971 },
    { name: "Massenburg", kind: "date", district: "Südlich der Altstadt", text: "Ruine über der Stadt mit Blick über Leoben und das Murtal – zwanzig Minuten bergauf, dafür das beste Panorama.", lat: 47.3754, lon: 15.0974 },
  ],
  map: {
    bounds: { west: 15.05, east: 15.14, south: 47.352, north: 47.4 },
    rivers: [],
    areas: [],
    labels: [
      { text: "Mur", lat: 47.3835, lon: 15.1035 },
      { text: "Altstadt", lat: 47.3803, lon: 15.0938, district: true },
      { text: "Donawitz", lat: 47.3753, lon: 15.072, district: true },
      { text: "Göss", lat: 47.3635, lon: 15.0917, district: true },
      { text: "Judendorf", lat: 47.3895, lon: 15.1005, district: true },
      { text: "Leitendorf", lat: 47.3705, lon: 15.0885, district: true },
      { text: "Hinterberg", lat: 47.3598, lon: 15.0668, district: true },
    ],
  },
  mapSpec: { rivers: [{ name: "Mur", major: true }, { name: "Vordernberger Bach" }], lakes: [], parks: ["Stadtpark", "Schwammerlpark"], boundary: "Leoben" },
  quarters: [
    { name: "Altstadt", label: "Zentrum an der Mur", text: "Hauptplatz mit Arkaden, Schwammerlturm an der Brücke, Museumscenter und Kunsthalle in Gehweite. Alles, was Leoben an Gastronomie hat, liegt in diesen paar hundert Metern." },
    { name: "Universitätsviertel", label: "Campus", text: "Nördlich der Altstadt liegen Universitätsgebäude, Institute und Studierendenheime. Hier ist Leoben am internationalsten – und abends am lautesten." },
    { name: "Judendorf", label: "Nördlich der Mur", text: "Wohnviertel mit Asia Spa, Sportstätten und kurzem Weg zur Universität. Beliebt bei Mitarbeitenden der Hochschule und des Krankenhauses." },
    { name: "Donawitz", label: "Industriegeschichte", text: "Der westliche Stadtteil ist seit über einem Jahrhundert Standort der Stahlindustrie. Wer die Geschichte der Region verstehen will, fängt hier an." },
    { name: "Göss", label: "Brauerei und Grün", text: "Im Süden liegt der Stadtteil mit der Brauerei und dem ehemaligen Stift. Ruhiger als das Zentrum, mit Radweg entlang der Mur." },
    { name: "Hinterberg", label: "Technologiestandort", text: "Hochtechnologie im Süden der Stadt, unter anderem der Leiterplattenstandort von AT&S. Arbeitsplätze, die Akademikerinnen und Akademiker in der Region halten." },
  ],
  agenda: [
    { title: "Ledersprung der Montanuniversität", when: "Dezember", text: "Der traditionelle Aufnahmeritus der Montanuniversität gehört zum akademischen Jahreslauf der Stadt und steht im offiziellen Veranstaltungskalender der Universität. Wer in Leoben studiert hat, erzählt davon noch Jahrzehnte später.", href: "https://www.unileoben.ac.at/" },
    { title: "Konzerte der Bergkapelle Leoben-Seegraben", when: "Mehrmals im Jahr", text: "Das Universitätsblasorchester spielt im Erzherzog-Johann-Auditorium der Montanuniversität – ein Abend, bei dem Stadt und Hochschule tatsächlich zusammenkommen.", href: "https://www.unileoben.ac.at/" },
    { title: "Lange Nacht der Forschung", when: "Alle zwei Jahre", text: "Zuletzt am 24. April 2026 mit österreichweit über 3.000 Programmpunkten und mehr als 192.000 Besuchenden bei freiem Eintritt; die nächste Ausgabe ist für den 19. Mai 2028 angekündigt. In Leoben öffnen die Labore der Montanuniversität.", href: "https://langenachtderforschung.at/" },
    { title: "Murradweg und Massenburg", when: "Frühling bis Herbst", text: "Der Radweg entlang der Mur führt von der Altstadt nach Göss und weiter; wer lieber steigt, nimmt den Weg hinauf zur Massenburg mit Blick über das Murtal." },
  ],
  talkingPoints: [
    { title: "Die einzige ihrer Art", text: "Unter Österreichs 22 öffentlichen Universitäten ist die Montanuniversität Leoben die einzige, die sich Rohstoffen, Werkstoffen und Prozessen widmet. Wer hier studiert hat, gehört einem kleinen, gut vernetzten Kreis an – und merkt das spätestens beim ersten Jobwechsel." },
    { title: "115 zu 100", text: "Auf 100 Frauen zwischen 30 und 49 kommen 115 Männer – der deutlichste Überschuss unserer österreichischen Dossiers. Für Frauen heißt das viel Auswahl, für Männer: Ein Profil, das die eigene Arbeit verständlich erklärt, hebt sich hier sofort ab." },
    { title: "Kleinstadt mit Weltmarkt", text: "24,6 Prozent der Leobenerinnen und Leobener haben keine österreichische Staatsangehörigkeit. Internationale Studierende und Industrie sorgen dafür, dass man in einer 24.000-Einwohner-Stadt regelmäßig Englisch hört." },
  ],
  faq: [
    { question: "Was ist die Montanuniversität Leoben?", answer: "Sie ist Österreichs einzige Montanuniversität und widmet sich den Studienbereichen Rohstoffe, Werkstoffe und Prozesse – mit Schwerpunkten in Digitalisierung und KI, Energiewende, Rohstoffsicherheit und Kreislaufwirtschaft. Im Wintersemester 2025/26 sind dort 2.929 Studierende inskribiert (Statistik Austria)." },
    { question: "Wie viele Akademiker leben in Leoben?", answer: "15,8 Prozent der Einwohnerinnen und Einwohner ab 15 Jahren haben einen Hochschul-, Akademie- oder Kollegabschluss (Abgestimmte Erwerbsstatistik 2024; Steiermark 16,0 Prozent, Österreich 17,6 Prozent). Der Wert liegt unter dem Bundesschnitt, weil viele Absolventinnen und Absolventen nach dem Studium in die Industriezentren ziehen." },
    { question: "Gibt es in Leoben mehr Männer oder Frauen?", answer: "In der Altersgruppe 30 bis 49 kommen auf 100 Frauen 115 Männer (3.483 zu 3.022 am 01.01.2026) – der deutlichste Männerüberschuss unserer österreichischen Stadtdossiers. In Klagenfurt liegt der Wert bei 99, in Wien bei 103." },
    { question: "Lohnt sich eine Stadt mit 24.581 Einwohnern für die Partnersuche?", answer: "Leoben hat 18.533 Arbeitsplätze, eine Universität mit internationalem Publikum und 12.779 Privathaushalte mit durchschnittlich nur 1,85 Personen – der kleinste Wert unserer österreichischen Städte. Der Markt ist überschaubar, dafür begegnet man einander wirklich. Für die Umgebung lohnt sich die Suche mit größerem Umkreis: Graz ist rund 60 Kilometer entfernt." },
    { question: "Wo lernen Akademiker in Leoben Singles kennen?", answer: "Bei Veranstaltungen der Montanuniversität im Erzherzog-Johann-Auditorium, bei der Langen Nacht der Forschung, im Museumscenter und in der Kunsthalle, am Hauptplatz, im Stadtpark, im Asia Spa oder bei einem Aufstieg zur Massenburg. Wer gezielt Menschen mit ähnlichem Bildungshintergrund sucht, findet sie bei AkademikerSingles: Jedes Profil wird manuell geprüft." },
    { question: "Wie international ist Leoben?", answer: "24,6 Prozent der Bevölkerung haben keine österreichische Staatsangehörigkeit – deutlich mehr als in der Steiermark insgesamt (14,4 Prozent). Die Montanuniversität zieht Studierende aus vielen Ländern an, und die Industrie der Region beschäftigt internationale Fachkräfte." },
    { question: "Ist die Anmeldung kostenlos?", answer: "Ja. Die Registrierung ist kostenfrei und beinhaltet die Basis-Mitgliedschaft. Damit legen Sie Ihr Profil an, nutzen den Fragenflirt und antworten kostenlos auf Nachrichten von Premium-Mitgliedern." },
  ],
  guide: [
    {
      title: "Eine Universität, die es in Österreich nur hier gibt",
      html: "<p>Unter den 22 öffentlichen Universitäten Österreichs ist die Montanuniversität Leoben die einzige ihrer Art. Sie widmet sich den Studienbereichen Rohstoffe, Werkstoffe und Prozesse; ihr Forschungsansatz rund um Circular Engineering zielt auf ressourcenschonende Produkte und Kreislaufwirtschaft, die thematischen Schwerpunkte reichen von Digitalisierung und KI über die Energiewende bis zur Rohstoffsicherheit.</p><p>2.929 Studierende sind im Wintersemester 2025/26 inskribiert – auf 24.581 Einwohner gerechnet sind das 119 Studierende je 1.000 Einwohner. Zum Vergleich: In Wien liegt dieser Wert bei rund 82. Leoben ist also, relativ betrachtet, eine der dichtesten Universitätsstädte des Landes.</p><p>Für die Partnersuche heißt das zweierlei. Erstens: Das akademische Milieu ist klein, aber sehr präsent – man kennt einander. Zweitens: Es ist technisch geprägt, mit allem, was daraus folgt – auch beim Geschlechterverhältnis.</p>",
    },
    {
      title: "115 zu 100: der schiefste Markt unserer Dossiers",
      html: "<p>Auf 100 Frauen zwischen 30 und 49 kommen in Leoben 115 Männer (3.483 zu 3.022 am 1. Januar 2026). Das ist der höchste Wert unserer österreichischen Stadtdossiers – deutlich über Graz (109), Innsbruck (110) oder Wien (103). Klagenfurt liegt am anderen Ende mit 99.</p><p>Statistik ist kein Schicksal, aber sie beschreibt Ausgangslagen. Für Frauen bedeutet dieser Wert: viel Auswahl, viele Anfragen, und die Möglichkeit, in Ruhe auszuwählen. Für Männer bedeutet er: Standardnachrichten gehen unter. Was hier wirklich hilft, ist Konkretheit – welches Projekt gerade läuft, was an der eigenen Arbeit spannend ist, warum man in Leoben lebt und nicht in Graz.</p><p>Dazu kommt die Haushaltsstruktur: 12.779 Privathaushalte mit durchschnittlich 1,85 Personen, der kleinste Wert unserer österreichischen Städte. Viele hier wohnen allein – Studierende, Pendlerinnen und Pendler, ältere Menschen nach dem industriellen Strukturwandel.</p>",
    },
    {
      title: "Industrie, Forschung, Klinik: wer hier arbeitet",
      html: "<p>18.533 Menschen arbeiten in Leobener Arbeitsstätten – bei 24.581 Einwohnern. 87,7 Prozent der Arbeitsstätten gehören zum tertiären Sektor, die industriellen Arbeitsplätze konzentrieren sich auf wenige große Standorte. Im Süden der Stadt liegt mit Hinterberg ein Hochtechnologiestandort, im Westen Donawitz mit über hundertjähriger Stahlgeschichte.</p><p>Die Arbeitslosenquote liegt bei 6,7 Prozent – niedriger als in Graz (8,2) oder Linz (7,9). Und 24,6 Prozent der Bevölkerung haben keine österreichische Staatsangehörigkeit, fast doppelt so viel wie in der Steiermark insgesamt. Universität und Industrie bringen Menschen aus vielen Ländern in eine kleine Stadt.</p><p>Beim Kennenlernen ist das praktisch: Fast jede Biografie hier lässt sich auf Universität, Industrie oder Gesundheitswesen zurückführen. Die Frage, woran jemand gerade arbeitet, führt in Leoben fast immer zu einer konkreten Antwort.</p>",
    },
    {
      title: "Wie die Stadt gebaut ist",
      html: "<p>Leoben liegt in einer Schleife der Mur. Im Zentrum die Altstadt mit Hauptplatz, Arkadenhäusern und dem Schwammerlturm an der Brücke, nördlich davon der Universitätscampus, jenseits des Flusses Judendorf mit dem Asia Spa, im Westen Donawitz, im Süden Göss mit Brauerei und ehemaligem Stift, ganz im Süden der Technologiestandort Hinterberg.</p><p>Alles liegt in Gehweite oder wenigen Radminuten. Das macht Verabredungen einfach: Hauptplatz als Treffpunkt, Stadtpark oder Murradweg für den Spaziergang, Museumscenter für Regentage, Massenburg für alle, die zwanzig Minuten bergauf nicht scheuen.</p><p>Wer mehr Auswahl braucht, fährt nach Graz – rund 60 Kilometer, mit der Bahn gut erreichbar. Viele Leobener Lebensläufe pendeln ohnehin zwischen beiden Städten, und für die Partnersuche lohnt es sich, den Suchradius entsprechend zu setzen.</p>",
    },
    {
      title: "Termine, bei denen Stadt und Universität zusammenkommen",
      html: "<p>Der Ledersprung ist der traditionelle Aufnahmeritus der Montanuniversität und steht im offiziellen Veranstaltungskalender der Hochschule – ein Abend im Dezember, an dem die Stadt sieht, wie eng Universität und Bergbautradition verbunden sind.</p><p>Regelmäßig spielt außerdem das Universitätsblasorchester Bergkapelle Leoben-Seegraben im Erzherzog-Johann-Auditorium, und zum Absolvententreffen mit der Verleihung der Silbernen Diplome kommen Jahrgänge zurück, die hier vor Jahrzehnten studiert haben.</p><p>Alle zwei Jahre kommt die Lange Nacht der Forschung dazu: zuletzt am 24. April 2026 mit österreichweit über 3.000 Programmpunkten und mehr als 192.000 Besuchenden bei freiem Eintritt, die nächste ist für den 19. Mai 2028 angekündigt. Für ein erstes Treffen ist das ideal – Programm, Bewegung und Gesprächsstoff inklusive.</p>",
    },
    {
      title: "Was die Zahlen nicht sagen",
      html: "<p>Die Werte dieser Seite stammen aus der Abgestimmten Erwerbsstatistik 2024 (Stichtag 31. Oktober 2024), dem Bevölkerungsstand zum 1. Januar 2026 und der Hochschulstatistik für das Wintersemester 2025/26. Dass die Montanuniversität Österreichs einzige Universität dieser Art ist, ergibt sich aus der amtlichen Liste der öffentlichen Universitäten.</p><p>Das Geschlechterverhältnis von 115 zu 100 betrifft die gesamte Stadtbevölkerung zwischen 30 und 49, nicht nur Singles – Zivilstandsdaten auf Gemeindeebene gibt es in Österreich nicht in dieser Form. Und die Akademikerquote von 15,8 Prozent misst, wer hier wohnt, nicht wer hier studiert hat.</p><p>Was bleibt: eine kleine Stadt mit einer einzigartigen Universität, internationalem Publikum, kurzen Wegen und einem klaren statistischen Ungleichgewicht. Wer das weiß, kann es für sich nutzen – in beide Richtungen.</p>",
    },
  ],
  hubFacts: [
    { label: "Hochschulabschluss ab 15 Jahren", value: "15,8 %" },
    { label: "Studierende", value: "2.929" },
    { label: "Personen je Haushalt", value: "1,85" },
    { label: "Männer je 100 Frauen (30–49)", value: "115" },
  ],
  sources: [],
};

if (old.map?.rivers?.length || old.map?.areas?.length) p.map = { ...p.map, rivers: old.map.rivers, areas: old.map.areas, boundary: old.map.boundary };

applySources(p, {
  "aest-gemeinde": { publisher: "Statistik Austria", title: "Abgestimmte Erwerbsstatistik 2024, Gemeindeergebnisse (Blatt „Gemeindetab“, Gebietsstand 2026): Bevölkerung, höchste abgeschlossene Bildung ab 15 Jahren, Privathaushalte, Arbeitsstätten, Beschäftigte, Unternehmen, Arbeitslosenquote", stand: "Stichtag 31.10.2024, erstellt 09.06.2026", url: "https://www.statistik.at/fileadmin/pages/54/AEST_Gemeindeergebnisse_2024.ods" },
  "uni-stud": { publisher: "Statistik Austria", title: "Studierende an öffentlichen Universitäten nach Uni (Open Government Data, Datensatz OGD_unistud3_ext_UNI_STUD3_1): Montanuniversität Leoben 2.929 Studierende; die Liste der 22 öffentlichen Universitäten führt keine zweite Montanuniversität", stand: "Wintersemester 2025/26", url: "https://data.statistik.gv.at/web/meta.jsp?dataset=OGD_unistud3_ext_UNI_STUD3_1" },
  "bev-alter": { publisher: "Statistik Austria", title: "Bevölkerungsstand zu Jahresbeginn 2026 nach Gemeinde, Alter in Einzeljahren und Geschlecht (Open Government Data, Datensatz OGD_bevstandjbab2002_BevStand_2026)", stand: "Stand 01.01.2026", url: "https://data.statistik.gv.at/web/meta.jsp?dataset=OGD_bevstandjbab2002_BevStand_2026" },
  "mul-profil": { publisher: "Montanuniversität Leoben", title: "Startseite und Veranstaltungskalender: Studienbereiche Rohstoffe, Werkstoffe und Prozesse, Circular Engineering, Schwerpunkte Digitalisierung und KI, Energiewende, Rohstoffsicherheit; Veranstaltungen im Erzherzog-Johann-Auditorium", stand: "abgerufen 11/2026", url: "https://www.unileoben.ac.at/" },
});

checkSeo(p);
writeFileSync(file, JSON.stringify(p, null, 1) + "\n");
console.log("Leoben geschrieben:", p.sources.length, "Quellen,", p.guide.length, "Guide-Kapitel,", p.universities.length, "Hochschulen");
