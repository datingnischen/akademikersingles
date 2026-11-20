// Stadtdossier Zürich auf den Ausbaustand 2026-11 heben: neue Kennzahlen (STATPOP 2025, BFS-Hochschulstatistik
// WS 2025/26), Hochschulporträts, Quartiere mit Tertiärquote, Termine, Gesprächsstoff und eigener Stadt-Guide.
import { readFileSync, writeFileSync } from "node:fs";
import { applySources } from "./_sources.mjs";

const file = "data/city-profiles/ch/zuerich.json";
const p = JSON.parse(readFileSync(file, "utf8"));

p.seoTitle = "Akademiker Singles in Zürich: ETH, Uni und Zahlen";
p.seoDescription = "Zürich in Zahlen: 58,7 % mit Tertiärabschluss, 61.400 Studierende an fünf Hochschulen, 58,9 % der 25- bis 54-Jährigen ledig – alles belegt.";
p.eyebrow = "Partnersuche für Akademiker · Hochschulstadt an Limmat und See";
p.lead = "Zwei Hochschulen von Weltrang, rund 545.000 Beschäftigte und fast sechs von zehn Erwachsenen mit Tertiärabschluss: In Zürich ist der akademische Alltag kein Milieu, sondern die Mehrheit. 58,9 Prozent der 25- bis 54-Jährigen sind ledig, und auf 100 ledige Frauen dieser Altersgruppe kommen 116 ledige Männer – ausgeglichener als im Schweizer Schnitt. Dieses Dossier zeigt mit amtlichen Zahlen, wen Sie hier treffen, wo diese Menschen wohnen und arbeiten – und wo aus einem guten Gespräch ein Abend wird.";

p.briefing = [
  { value: "58,7 %", label: "der Einwohnerinnen und Einwohner ab 15 Jahren haben einen Tertiärabschluss (Hochschule oder höhere Berufsbildung)", source: "zh-bildung" },
  { value: "61.394", label: "Studierende an den fünf Hochschulen mit Sitz in der Stadt Zürich", source: "bfs-stud", note: "Wintersemester 2025/26, berechnet; PH Zürich nach eigener Zählung 2025" },
  { value: "58,9 %", label: "der 25- bis 54-Jährigen in Zürich sind ledig", source: "bfs-zivil" },
];

p.kpis = [
  { value: "440.935", label: "Einwohnerinnen und Einwohner der Stadt Zürich", source: "einwohner", note: "Ständige Wohnbevölkerung am 31.12.2025" },
  { value: "545.295", label: "Beschäftigte in Arbeitsstätten der Stadt Zürich", source: "zh-statent", note: "STATENT, Dezember 2024: 47.829 Arbeitsstätten; gezählt werden Beschäftigungsverhältnisse, nicht Personen" },
  { value: "116", label: "ledige Männer je 100 ledige Frauen (25 bis 54 Jahre)", source: "bfs-zivil", note: "72.964 ledige Männer und 62.790 ledige Frauen dieser Altersgruppe, 31.12.2025; Schweiz insgesamt 125" },
  { value: "22", label: "Nobelpreise an Forschende mit ETH-Bezug", source: "eth-geschichte", compareSource: "uzh-excellence", note: "Angabe der ETH Zürich. Die Universität Zürich nennt zwölf Nobelpreisträger, die hier gelehrt und geforscht haben – beide Häuser zählen nach eigenen Kriterien, deshalb werden die Zahlen hier nicht addiert" },
];

p.dossier = [
  {
    key: "bildung",
    title: "Bildung",
    intro: "Universität und ETH prägen die Stadt seit dem 19. Jahrhundert. In keiner anderen Schweizer Grossstadt ist der Anteil der Hochqualifizierten so hoch.",
    metrics: [
      { value: "58,7 %", label: "der Einwohnerinnen und Einwohner ab 15 Jahren haben einen Tertiärabschluss", source: "zh-bildung", note: "Strukturerhebung 2024 (Stichprobe), 95-%-Vertrauensintervall 57,7 bis 59,6 %. Die Tertiärstufe umfasst Hochschulen und die höhere Berufsbildung, nicht nur Universitätsabschlüsse" },
      { value: "76,1 %", label: "der 25- bis 34-Jährigen haben einen Tertiärabschluss", source: "zh-bildung-alter", note: "Strukturerhebung 2024, Vertrauensintervall 74,2 bis 77,9 %; bei den 35- bis 44-Jährigen sind es 73,9 %" },
      { value: "61.394", label: "Studierende an fünf Hochschulen in der Stadt", source: "bfs-stud", compareSource: "phzh-zahlen", note: "Berechnet für das Wintersemester 2025/26: Universität Zürich 28.556, ETH Zürich 25.787, Zürcher Hochschule der Künste 2.198, HWZ Hochschule für Wirtschaft Zürich 935 (BFS, Bachelor bis Doktorat ohne Weiterbildung) sowie PH Zürich 3.918 nach eigener Zählung 2025. Die ZHAW mit Sitz in Winterthur (15.224) ist nicht eingerechnet" },
    ],
    takeaway: "Ein Hochschulabschluss ist hier kein Gesprächsthema, sondern Grundrauschen – umso mehr zählt, was jemand daraus macht.",
  },
  {
    key: "beruf",
    title: "Beruf & Erfolg",
    intro: "Beratung, Finanzwirtschaft, IT, Gesundheit und Bildung tragen den Arbeitsmarkt. 94,7 Prozent der Beschäftigten arbeiten im Dienstleistungssektor.",
    metrics: [
      { value: "90.195", label: "Beschäftigte in freiberuflichen, wissenschaftlichen und technischen Dienstleistungen – dem grössten Wirtschaftsabschnitt der Stadt", source: "zh-statent", note: "Darunter Unternehmensberatung und Unternehmensführung 37.497, Architektur- und Ingenieurbüros 20.050, Rechts- und Steuerberatung 18.693 (STATENT 2024)" },
      { value: "63.632", label: "Beschäftigte bei Banken, Versicherungen und weiteren Finanzdienstleistern", source: "zh-statent", note: "Davon 33.879 in Finanzdienstleistungen und 11.248 bei Versicherungen und Pensionskassen (STATENT 2024)" },
      { value: "60.380", label: "Beschäftigte in Erziehung und Unterricht", source: "zh-statent", note: "Hochschulen, Schulen und Weiterbildung zusammen; dazu kommen 71.313 Beschäftigte im Gesundheits- und Sozialwesen (STATENT 2024)" },
    ],
    takeaway: "Wer hier sucht, trifft Menschen mit Verantwortung im Beruf – und mit dem Wunsch, das Leben mit jemandem zu teilen, der diese Taktung kennt.",
  },
  {
    key: "wohnen",
    title: "Wohnen & Quartiere",
    intro: "Zürich ist in Quartiere sortiert, auch nach Bildung: Zwischen dem höchsten und dem niedrigsten Tertiäranteil liegen mehr als 40 Prozentpunkte.",
    metrics: [
      { value: "79,0 %", label: "Tertiäranteil im Quartier Escher Wyss (Kreis 5) – der höchste Wert aller Wohnquartiere", source: "zh-quartier", compareSource: "zh-quartier", note: "Strukturerhebung, Pooling 2022–2024, ständige Wohnbevölkerung ab 15 Jahren; Vertrauensintervall 75,2 bis 82,8 %. Im Quartier Hirzenbach (Kreis 12) sind es 34,9 %", compare: { city: 79, germany: 34.9, unit: " %", max: 90, cityLabel: "Escher Wyss", compareLabel: "Hirzenbach" } },
      { value: "44,0 %", label: "Einpersonenhaushalte", source: "zh-hh", compareSource: "bfs-hh-ch", note: "95.871 von 217.807 Privathaushalten, Stand 2025 (wirtschaftlicher Wohnsitz, ohne Kollektivhaushalte). Schweiz insgesamt: 37,5 % (BFS STATPOP 2025); die Zählweisen sind nicht identisch, daher ohne Balkenvergleich" },
      { value: "217.807", label: "Privathaushalte in der Stadt", source: "zh-hh", note: "Stand 2025; die kleinteilige Haushaltsstruktur ist einer der Gründe, warum in Zürich so viele Menschen allein wohnen, ohne allein zu sein" },
    ],
    takeaway: "Die Quartierfrage ist in Zürich eine Milieufrage – wer das weiss, versteht ein Profil schon an der Adresse besser.",
  },
  {
    key: "singles",
    title: "Single-Leben",
    intro: "Rund die Hälfte der Erwachsenen ist ledig, die Stadt ist jünger als das Land – und das Geschlechterverhältnis unter Ledigen ist ausgeglichener als fast überall sonst in der Schweiz.",
    metrics: [
      { value: "49,9 %", label: "der Einwohnerinnen und Einwohner ab 20 Jahren sind ledig", source: "bfs-zivil", note: "Berechnet aus der Altersklassenstatistik (ständige Wohnbevölkerung, 31.12.2025); ledig heisst nicht automatisch Single, auch unverheiratete Paare zählen dazu", compare: { city: 49.9, germany: 33.5, unit: " %", max: 57 } },
      { value: "116", label: "ledige Männer je 100 ledige Frauen zwischen 25 und 54", source: "bfs-zivil", note: "72.964 Männer zu 62.790 Frauen (31.12.2025). Schweizweit sind es 125, in der Stadt Zug 138, in Genf 103 – Zürich liegt also deutlich näher am Gleichgewicht als das Land", compare: { city: 116, germany: 125, unit: "", max: 145 } },
      { value: "40,0", label: "Jahre Durchschnittsalter – rund zweieinhalb Jahre jünger als der Schweizer Schnitt", source: "bfs-alter", note: "Berechnet aus den Einzelaltersjahren (vollendete Jahre) der ständigen Wohnbevölkerung, 31.12.2024; gleiche Rechenweise für Stadt und Schweiz", compare: { city: 40, germany: 42.5, unit: " J.", max: 52 } },
    ],
    takeaway: "Viele nehmen sich Zeit für Studium, Doktorat und erste Karrierejahre – und suchen danach sehr bewusst.",
  },
];

p.universities = [
  { name: "Universität Zürich", kind: "Volluniversität des Kantons", founded: "1833", students: "28.556", women: "59,1 %", source: "bfs-stud", compareSource: "uzh-excellence", text: "Mit sieben Fakultäten und über 150 Instituten die grösste Volluniversität der Schweiz – und 1833 die erste Universität Europas, die von einem demokratischen Staat gegründet wurde, nicht von einem Monarchen oder der Kirche. Zwölf Nobelpreisträger haben hier gelehrt und geforscht." },
  { name: "ETH Zürich", kind: "Eidgenössische Technische Hochschule", founded: "1855", students: "25.787", women: "33,7 %", source: "bfs-stud", compareSource: "eth-geschichte", text: "1855 als «Polytechnikum» gegründet, heute mit 16 Departementen an zwei Standorten: Zentrum an der Rämistrasse und Campus Hönggerberg. Bis heute wurden 22 Nobelpreise an Forschende vergeben, die mit der ETH in Verbindung standen – ein Umfeld, in dem Fachgespräche auch privat selten enden." },
  { name: "PH Zürich", kind: "Pädagogische Hochschule", students: "3.918", source: "phzh-zahlen", text: "Eine der grössten Pädagogischen Hochschulen der Schweiz, mitten in der Stadt an der Europaallee. 1.609 Menschen haben 2025 ein Studium begonnen, 439 der Studierenden kommen als Quereinsteigende aus einem anderen Beruf – ein Milieu mit zweiter Berufsbiografie." },
  { name: "Zürcher Hochschule der Künste", kind: "Kunsthochschule", students: "2.198", women: "59,1 %", source: "bfs-stud", text: "Design, Film, Musik, Tanz, Theater und Kunst unter einem Dach im Toni-Areal in Zürich-West. Wer hier arbeitet, bringt die kulturelle Seite der Stadt in ein Gespräch – und oft Premierenkarten." },
  { name: "HWZ Hochschule für Wirtschaft Zürich", kind: "Fachhochschule, berufsbegleitend", founded: "1986", students: "935", women: "47,6 %", source: "bfs-stud", compareSource: "hwz-portrait", text: "Seit 1986 vollständig auf berufsbegleitende Wirtschaftsstudien ausgerichtet, nach eigenen Angaben rund 3.000 Studierende inklusive Weiterbildung und 800 Dozierende aus der Praxis. Hier studiert, wer tagsüber im Beruf steht – und abends am Sihlhof sitzt." },
  { name: "ZHAW (Standort Zürich)", kind: "Fachhochschule, Sitz Winterthur", students: "15.224", women: "54,6 %", source: "bfs-stud", compareSource: "zhaw-zahlen", text: "Die grösste Fachhochschule der Deutschschweiz hat ihren Sitz in Winterthur, unterrichtet aber auch in Zürich. Acht Departemente, 3.729 Mitarbeitende, 34 Bachelor- und 20 Masterstudiengänge – die Studierendenzahl gilt für alle drei Standorte." },
];
p.universitiesNote = "Fünf Hochschulen haben ihren Sitz in der Stadt, eine weitere unterrichtet hier. Studierendenzahlen für das Wintersemester 2025/26 ohne Weiterbildung; der Frauenanteil zeigt, wie unterschiedlich die Häuser zusammengesetzt sind.";

p.quarters = [
  { name: "Fluntern & Oberstrass", label: "Hochschulquartier", text: "Oberhalb der Rämistrasse, zwischen ETH-Hauptgebäude, Universitätsspital und Zoo: 72,9 bzw. 71,9 Prozent der Erwachsenen haben hier einen Tertiärabschluss. Wer am Zürichberg wohnt, hat den kürzesten Weg zur Vorlesung – und zum Waldspaziergang.", source: "zh-quartier" },
  { name: "Seefeld & Mühlebach", label: "Seeufer, Kreis 8", text: "Der Kreis 8 kommt auf 70,7 Prozent Tertiäranteil, das Seefeld allein auf 74,9. Dichte Beiz-, Galerie- und Badi-Infrastruktur am Wasser – das Quartier, in dem Zürich am ehesten so aussieht, wie Auswärtige es sich vorstellen.", source: "zh-quartier" },
  { name: "Escher Wyss & Kreis 5", label: "Zürich-West", text: "Der höchste Tertiäranteil aller Wohnquartiere: 79,0 Prozent. Aus dem Industriequartier wurden Technopark, Toni-Areal und Hochhäuser – abends die grösste Dichte an Feierabendgesprächen zwischen Beratung, IT und Kunst.", source: "zh-quartier" },
  { name: "Hottingen & Hirslanden", label: "Bürgerliche Hanglage", text: "74,3 und 72,3 Prozent Tertiäranteil, viele Arzt- und Anwaltspraxen, das Kunsthaus gleich unterhalb. Ruhiger als der Kreis 5 und mit etwas älterem Publikum – wer hier wohnt, bleibt meist länger.", source: "zh-quartier" },
  { name: "Enge & Wollishofen", label: "Linkes Seeufer", text: "Enge 72,6 Prozent, Wollishofen 63,2 Prozent. Nähe zum Kulturbetrieb der Roten Fabrik und zu den Seebädern, dazu Versicherungen und Pensionskassen als Arbeitgeber im Quartier.", source: "zh-quartier" },
  { name: "Langstrasse & Kreis 4", label: "Ausgangsquartier", text: "67,0 Prozent Tertiäranteil – und trotzdem das durchmischteste Ausgangsquartier der Stadt. Hier verabreden sich Doktorierende und Start-up-Leute, wenn das Seefeld zu glatt wirkt.", source: "zh-quartier" },
];
p.quarterSources = ["zh-quartier"];

p.agenda = [
  { title: "Scientifica – Zürcher Wissenschaftstage", when: "Spätsommer, mehrtägig", text: "Das gemeinsame Wissenschaftsfestival von ETH und Universität Zürich: 2026 waren an neun Tagen rund 1.500 Forschende im Einsatz, gegen 40.000 Menschen kamen. Labore öffnen, Vorträge sind kostenlos – ein Anlass, zu dem man auch zu zweit geht, ohne Fachkenner zu sein.", href: "https://www.scientifica.ch/" },
  { title: "Ringvorlesungen der Universität Zürich", when: "Semesterweise, Herbst und Frühling", text: "Interdisziplinäre Vorlesungsreihen zu gesellschaftlichen Fragen, offen für alle, dazu die Antrittsvorlesungen neuer Professorinnen und Professoren. Anderthalb Stunden Stoff, danach ein Glas im Niederdorf – das unkomplizierteste zweite Date der Stadt.", href: "https://www.uzh.ch/de/explore/events.html" },
  { title: "Zürcher Theater Spektakel", when: "August bis September", text: "Internationales Festival der freien Künste am Seeufer; die nächste Ausgabe läuft vom 19. August bis 5. September 2027, 2026 war es die 47. Auflage. Viel Programm am Wasser, viele Gespräche zwischen den Vorstellungen.", href: "https://www.theaterspektakel.ch/" },
  { title: "Sechseläuten", when: "Dritter Montag im April", text: "Das zünftige Frühlingsfest mit dem Böögg: 2027 fällt der Umzug auf den 19. April, Gastkanton ist Luzern. Wer in Zürich neu ist, lernt an diesem Tag mehr über die Stadt als in jedem Stadtführer.", href: "https://www.sechselaeuten.ch/" },
];

p.talkingPoints = [
  { title: "ETH oder Uni?", text: "Die beiden Häuser liegen 200 Meter voneinander entfernt und sind doch zwei Welten: An der ETH sind 33,7 Prozent der Studierenden Frauen, an der Universität 59,1 Prozent. Wer beide Kulturen kennt, hat Gesprächsstoff für einen ganzen Abend – und eine Erklärung dafür, warum Zürcher Freundeskreise oft so einseitig sortiert sind." },
  { title: "Die Quartierfrage", text: "Zwischen Escher Wyss (79,0 Prozent Tertiäranteil) und Hirzenbach (34,9 Prozent) liegen zwölf Minuten Tram und zwei Lebenswelten. Über Quartiere zu reden, ist in Zürich nie nur Immobilienkunde – es ist die höfliche Variante der Frage, wie jemand lebt." },
  { title: "Pendeln als Beziehungsmodell", text: "545.295 Beschäftigte arbeiten in einer Stadt mit 440.935 Einwohnern. Viele Lebensläufe pendeln zwischen Zürich, Zug und Winterthur, und viele Beziehungen beginnen in einem Zug um 18.12 Uhr. Die Frage, ob jemand auch hier wohnt, ist deshalb selten banal." },
];

p.faq = [
  { question: "Wie viele Akademiker leben in Zürich?", answer: "58,7 Prozent der Einwohnerinnen und Einwohner ab 15 Jahren haben einen Tertiärabschluss, also Hochschule oder höhere Berufsbildung (Strukturerhebung 2024, Statistik Stadt Zürich nach BFS-Daten). Bei den 25- bis 34-Jährigen sind es 76,1 Prozent. An den fünf Hochschulen mit Sitz in der Stadt studieren im Wintersemester 2025/26 zusammen rund 61.400 Menschen." },
  { question: "Kommen in Zürich auf ledige Frauen mehr ledige Männer?", answer: "Ja, aber weniger ausgeprägt als in der übrigen Schweiz: Auf 100 ledige Frauen zwischen 25 und 54 kommen in Zürich 116 ledige Männer (72.964 zu 62.790, BFS STATPOP am 31.12.2025). Schweizweit sind es 125, in der Stadt Zug 138 und in Genf 103. Zürich ist damit einer der ausgeglicheneren Märkte des Landes." },
  { question: "In welchen Zürcher Quartieren wohnen besonders viele Hochschulabsolventen?", answer: "Den höchsten Tertiäranteil hat Escher Wyss im Kreis 5 mit 79,0 Prozent, gefolgt von Seefeld (74,9), Hottingen (74,3), Fluntern (72,9) und Enge (72,6). Am anderen Ende stehen Hirzenbach (34,9) und Saatlen (35,0) in Schwamendingen. Grundlage ist die Strukturerhebung, Pooling 2022 bis 2024." },
  { question: "Wie viele Studierende hat Zürich?", answer: "Im Wintersemester 2025/26 zählt die Universität Zürich 28.556 Studierende, die ETH Zürich 25.787 (jeweils Bachelor bis Doktorat ohne Weiterbildung), die Zürcher Hochschule der Künste 2.198 und die HWZ 935. Die PH Zürich kommt nach eigener Zählung 2025 auf 3.918. Die ZHAW mit Sitz in Winterthur hat weitere 15.224 Studierende." },
  { question: "Wo lernen Akademiker in Zürich Singles kennen?", answer: "Im Alltag: auf der Polyterrasse, im Botanischen Garten der Universität, im Kunsthaus, bei den öffentlichen Ringvorlesungen der UZH, an der Scientifica im Spätsommer oder abends in den Beizen zwischen Langstrasse und Zürich-West. Wer gezielt Menschen mit ähnlichem Bildungshintergrund sucht, findet sie bei AkademikerSingles: Jedes Profil wird manuell geprüft." },
  { question: "Ist Zürich ohne Hochschulabschluss ein schwieriges Pflaster?", answer: "Nein. Die Tertiärstufe umfasst auch die höhere Berufsbildung – ein grosser Teil der 58,7 Prozent hat einen Fachhochschul- oder HF-Abschluss, nicht zwingend eine Universität hinter sich. Entscheidend ist, dass Interessen und Gesprächsniveau passen, nicht das Diplom an der Wand." },
  { question: "Ist die Anmeldung kostenlos?", answer: "Ja. Die Registrierung ist kostenfrei und beinhaltet die Basis-Mitgliedschaft. Damit legen Sie Ihr Profil an, nutzen den Fragenflirt und antworten kostenlos auf Nachrichten von Premium-Mitgliedern." },
];

p.guide = [
  {
    title: "Zürich in einem Satz: viele Abschlüsse, viele eigene Wohnungen",
    html: "<p>Zürich ist die Stadt, in der ein Hochschulabschluss keine Auszeichnung mehr ist, sondern eine Ausgangslage. 58,7 Prozent der Erwachsenen haben einen Tertiärabschluss, bei den 25- bis 34-Jährigen sind es 76,1 Prozent – die Strukturerhebung zählt dabei Hochschulen und höhere Berufsbildung zusammen. Gleichzeitig ist die Stadt kleinteilig organisiert: 44 Prozent der 217.807 Privathaushalte sind Einpersonenhaushalte.</p><p>Für die Partnersuche heisst das zwei Dinge. Erstens: Sie werden kaum jemanden treffen, der Ihre Studienzeit nicht in ähnlicher Form erlebt hat. Zweitens: Alleinwohnen ist hier Normalität, keine Zwischenstation. Fast die Hälfte der Erwachsenen ab 20 ist ledig (49,9 Prozent), bei den 25- bis 54-Jährigen sind es 58,9 Prozent. Dass so viele Menschen allein wohnen, macht Verabredungen einfacher – und das Gegenüber oft selbstständiger, als es in anderen Städten üblich ist.</p><p>Was die Zahlen nicht sagen: wie lange gewachsene Zürcher Freundeskreise brauchen, um jemanden Neues aufzunehmen. Genau dort hilft eine Plattform, die Menschen mit ähnlichem Hintergrund zusammenbringt, statt auf den Zufall im Tram zu hoffen.</p>",
  },
  {
    title: "ETH oder Uni: zwei Häuser, zwei Geschlechterverhältnisse",
    html: "<p>Die beiden grossen Hochschulen liegen an derselben Strasse und ticken völlig unterschiedlich. Die Universität Zürich, 1833 als erste Universität Europas von einem demokratischen Staat gegründet, hat sieben Fakultäten, über 150 Institute und im Wintersemester 2025/26 28.556 Studierende – 59,1 Prozent davon Frauen. Die ETH Zürich, 1855 als Polytechnikum gestartet, kommt auf 25.787 Studierende, davon 33,7 Prozent Frauen, verteilt auf 16 Departemente in Zentrum und Hönggerberg.</p><p>Diese Schieflage prägt das Verabredungsverhalten einer ganzen Stadt. Wer in einem ETH-Departement arbeitet, erlebt Freundeskreise, in denen Männer in der Mehrheit sind; in den Geistes-, Sozial- und Gesundheitswissenschaften ist es umgekehrt. Beide Gruppen suchen deshalb häufig ausserhalb des eigenen Instituts – und beide Seiten unterschätzen, wie anziehend der Blick über den Fachrand wirkt.</p><p>Dazu kommen die kleineren Häuser: die PH Zürich mit 3.918 Studierenden, darunter 439 Quereinsteigende mit zweiter Berufsbiografie, die Zürcher Hochschule der Künste mit 2.198 Studierenden im Toni-Areal und die HWZ, an der 935 Menschen berufsbegleitend Wirtschaft studieren. Wer abends am Sihlhof oder im Toni jemanden kennenlernt, trifft fast zwangsläufig auf eine ungewöhnliche Biografie.</p>",
  },
  {
    title: "Die Quartierfrage: wo Zürich studiert hat",
    html: "<p>Kaum eine Stadt lässt sich so präzise nach Bildung kartieren. Die Strukturerhebung weist den Tertiäranteil für jedes Stadtquartier aus, und die Spannweite ist enorm: Escher Wyss im Kreis 5 kommt auf 79,0 Prozent, Lindenhof auf 79,1, Seefeld auf 74,9, Hottingen auf 74,3, Fluntern auf 72,9. In Hirzenbach und Saatlen in Schwamendingen liegen die Werte bei 34,9 und 35,0 Prozent.</p><p>Praktisch heisst das: Wenn Sie Ihre Suche auf Quartiere eingrenzen, grenzen Sie damit auch Milieus ein – und sollten sich fragen, ob Sie das wirklich wollen. Die Zahlen sagen nichts über Humor, Haltung oder Lebensziele. Sie erklären aber, warum ein Treffen in Zürich-West anders verläuft als eines am Zürichberg: Im Kreis 5 trifft man Beratung, IT und Kunst nach Feierabend in denselben Hallen, in Fluntern und Hirslanden sind es Praxen, Spital und ruhige Hanglagen.</p><p>Wer pragmatisch sucht, nimmt die Tramlinie als Kriterium. Vieles Interessante liegt an der 6, der 7 und der 11 – von Hochschulquartier über Bahnhofstrasse bis Escher Wyss. Ein Treffpunkt in der Mitte dieser Achsen erspart beiden Seiten den Umweg.</p>",
  },
  {
    title: "Was hinter den Lebensläufen steckt",
    html: "<p>545.295 Beschäftigte arbeiten in 47.829 Arbeitsstätten der Stadt – deutlich mehr Arbeitsplätze als Einwohner. 94,7 Prozent davon sind Dienstleistungen. Der grösste Abschnitt sind freiberufliche, wissenschaftliche und technische Dienstleistungen mit 90.195 Beschäftigten: Unternehmensberatung (37.497), Architektur- und Ingenieurbüros (20.050), Rechts- und Steuerberatung (18.693). Dahinter folgen Gesundheit und Soziales mit 71.313, Finanz und Versicherung mit 63.632, Erziehung und Unterricht mit 60.380 sowie Information und Kommunikation mit 48.360 Beschäftigten.</p><p>Für ein erstes Gespräch ist das nützlicher als jede Floskel. Wer in Zürich jemanden kennenlernt, trifft mit hoher Wahrscheinlichkeit auf eine dieser Welten – und jede hat ihren eigenen Takt: Beratung und Finanz leben in Quartalen und Deadlines, Spital und Hochschule in Diensten und Semestern, IT in Releases. Dass man diese Taktung beim Gegenüber versteht, ist in dieser Stadt oft wichtiger als jedes gemeinsame Hobby.</p><p>Und es erklärt die vielen Spätentscheider: Wer bis 32 promoviert, bis 35 Oberärztin oder Partner in einer Kanzlei wird, verlegt die Partnerwahl bewusst nach hinten. Nicht aus Unlust – sondern weil die Entscheidung dann halten soll.</p>",
  },
  {
    title: "Erste Dates zwischen Polyterrasse und Seebecken",
    html: "<p>Zürich macht es einfach, weil fast alles zu Fuss erreichbar ist. Bewährt hat sich die Kombination aus einem festen Ankerpunkt und einer offenen Fortsetzung: Treffpunkt Polyterrasse mit Blick über die Altstadt, danach entweder hinunter ins Niederdorf oder mit der Polybahn zum Central und weiter ans Wasser. Wer tagsüber verabredet ist, nimmt den Botanischen Garten der Universität – Eintritt frei, Gewächshäuser bei Regen.</p><p>Für Gespräche mit Substanz ohne Smalltalk-Druck sind öffentliche Vorlesungen die unterschätzte Variante: Die Ringvorlesungen der UZH laufen semesterweise, die Antrittsvorlesungen sind ebenfalls offen. Danach hat man ein Thema, in dem keiner von beiden Herr der Lage sein muss. Im Spätsommer übernimmt die Scientifica diese Rolle für mehrere Tage, mit Laboren, Experimenten und rund 1.500 beteiligten Forschenden.</p><p>Etwas verbindlicher wird es beim Zürcher Theater Spektakel im August am Seeufer oder beim Sechseläuten im April, wenn die halbe Stadt am Umzug steht – 2027 am 19. April. Und wenn alles gut läuft: Kunsthaus, dann Bürkliplatz, dann Schiff. Diese Reihenfolge funktioniert in Zürich seit Jahrzehnten.</p>",
  },
  {
    title: "Was die Zahlen nicht sagen",
    html: "<p>Alle Werte auf dieser Seite sind amtlich belegt und am Seitenende mit Quelle und Stand aufgeführt. Trotzdem gehört dazugesagt, was sie nicht leisten. „Ledig“ ist ein Zivilstand, kein Beziehungsstatus: In den 135.754 ledigen 25- bis 54-Jährigen stecken auch viele feste Paare ohne Trauschein. Die Tertiärquote stammt aus einer Stichprobe und hat Vertrauensintervalle; für kleine Quartiere sind die Spannen breiter als für die Gesamtstadt.</p><p>Auch das Verhältnis von 116 ledigen Männern je 100 ledige Frauen sagt nichts über eine einzelne Altersgruppe, eine Branche oder einen Freundeskreis. Es ist ein Durchschnitt über drei Jahrzehnte Lebenszeit. Er erklärt aber, warum sich viele Frauen in Zürich über zu viele gleichförmige Anfragen beklagen und viele Männer über zu wenige Antworten: Beides ist dieselbe Statistik, von zwei Seiten gesehen.</p><p>Was bleibt, ist die einfachste Erkenntnis dieses Dossiers: Zürich bietet eine ungewöhnlich hohe Dichte an Menschen mit vergleichbarem Bildungsweg, eigener Wohnung und eigener Agenda. Was daraus wird, entscheidet kein Prozentwert, sondern das erste echte Gespräch.</p>",
  },
];

// Quellen: bestehende behalten, aktualisieren, neue anhängen
const sources = {
  "einwohner": { publisher: "Bundesamt für Statistik (BFS)", title: "STATPOP, Tabelle px-x-0102010000_103: ständige Wohnbevölkerung nach Gemeinde (Bevölkerungsstand)", stand: "Stand 31.12.2025", url: "https://www.pxweb.bfs.admin.ch/api/v1/de/px-x-0102010000_103/px-x-0102010000_103.px" },
  "bfs-zivil": { publisher: "Bundesamt für Statistik (BFS)", title: "STATPOP, Tabelle px-x-0102010000_103: ständige Wohnbevölkerung nach Gemeinde, Geschlecht, Zivilstand und Altersklasse (Anteil Ledige, Geschlechterverhältnis)", stand: "Stand 31.12.2025", url: "https://www.pxweb.bfs.admin.ch/api/v1/de/px-x-0102010000_103/px-x-0102010000_103.px" },
  "bfs-stud": { publisher: "Bundesamt für Statistik (BFS)", title: "Studierende an den universitären Hochschulen (px-x-1502040100_106) sowie an Fachhochschulen und pädagogischen Hochschulen (px-x-1502040400_136) nach Fachbereich, Studienstufe, Geschlecht und Hochschule; Bachelor, Master, Lizenziat/Diplom und Doktorat ohne Weiterbildung", stand: "Wintersemester 2025/26", url: "https://www.pxweb.bfs.admin.ch/api/v1/de/px-x-1502040100_106/px-x-1502040100_106.px" },
  "zh-quartier": { publisher: "Statistik Stadt Zürich (nach BFS-Strukturerhebung)", title: "Bevölkerung nach Bildungsstand, Stadtkreis und Stadtquartier (BIL101OD1012): Anteil Tertiärstufe an der ständigen Wohnbevölkerung ab 15 Jahren", stand: "Strukturerhebung, Pooling 2022–2024", url: "https://data.stadt-zuerich.ch/dataset/bfs_bev_bildungsstand_statquartier_od1012" },
  "eth-geschichte": { publisher: "ETH Zürich", title: "Geschichte der ETH Zürich: Gründung 1855 als «Polytechnikum», 22 Nobelpreise an Forschende mit ETH-Bezug", stand: "abgerufen 11/2026", url: "https://ethz.ch/de/die-eth-zuerich/portraet/geschichte.html" },
  "uzh-excellence": { publisher: "Universität Zürich", title: "Porträt, Fakultäten und Exzellenz: Gründung 1833, sieben Fakultäten und über 150 Institute, zwölf Nobelpreisträger", stand: "abgerufen 11/2026", url: "https://www.uzh.ch/de/explore/portrait.html" },
  "phzh-zahlen": { publisher: "Pädagogische Hochschule Zürich", title: "PH Zürich in Zahlen: 3.918 Studierende (gewichteter Durchschnitt dreier Stichtage), 1.609 Studieneintritte, 439 Quereinsteigende", stand: "Jahr 2025", url: "https://phzh.ch/ueber-die-phzh/aktuell/zahlen-und-fakten/" },
  "zhaw-zahlen": { publisher: "ZHAW Zürcher Hochschule für Angewandte Wissenschaften", title: "Zahlen und Fakten: acht Departemente, drei Standorte, 3.729 Mitarbeitende, 34 Bachelor- und 20 Masterstudiengänge (Jahresbericht 2025)", stand: "Jahresbericht 2025", url: "https://www.zhaw.ch/de/ueber-uns/zahlen-und-fakten/" },
  "hwz-portrait": { publisher: "HWZ Hochschule für Wirtschaft Zürich", title: "Über uns: rund 3.000 Studierende und 800 Dozierende aus der Praxis, seit 1986 ausschliesslich berufsbegleitend", stand: "abgerufen 11/2026", url: "https://www.fh-hwz.ch/ueber-uns/" },
};
applySources(p, sources);

writeFileSync(file, JSON.stringify(p, null, 1) + "\n");
console.log("Zürich geschrieben:", p.sources.length, "Quellen,", p.guide.length, "Guide-Kapitel,", p.universities.length, "Hochschulen");
