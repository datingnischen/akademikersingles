// Stadtdossier Bern ausbauen: STATPOP 2025, BFS-Hochschulstatistik WS 2025/26, Hochschulporträts,
// Stadtteile, wiederkehrende Wissenschaftstermine und eigener Stadt-Guide.
import { readFileSync, writeFileSync } from "node:fs";
import { applySources } from "./_sources.mjs";

const file = "data/city-profiles/ch/bern.json";
const p = JSON.parse(readFileSync(file, "utf8"));

p.seoTitle = "Akademiker Singles in Bern: 60 % der 25–54 ledig";
p.seoDescription = "Bern in Zahlen: 58,6 % mit Tertiärabschluss, 60,4 % der 25- bis 54-Jährigen ledig, 105 ledige Männer je 100 ledige Frauen – ausgeglichen wie nirgends.";
p.eyebrow = "Partnersuche für Akademiker · Bundesstadt an der Aare";
p.lead = "Universität, Inselspital und Bundesverwaltung machen Bern zur Stadt mit den meisten Arbeitsplätzen je Einwohner der Schweiz: 1,5 Beschäftigte kommen hier auf eine Einwohnerin oder einen Einwohner. 58,6 Prozent der Erwachsenen ab 25 haben einen Tertiärabschluss, 60,4 Prozent der 25- bis 54-Jährigen sind ledig – der höchste Wert unserer Schweizer Stadtdossiers. Und auf 100 ledige Frauen kommen nur 105 ledige Männer: nirgends in der Deutschschweiz ist das Verhältnis ausgeglichener.";

p.briefing = [
  { value: "58,6 %", label: "der Einwohnerinnen und Einwohner ab 25 Jahren haben einen Tertiärabschluss (Hochschule oder höhere Berufsbildung)", source: "be-bildung" },
  { value: "60,4 %", label: "der 25- bis 54-Jährigen in Bern sind ledig – der höchste Wert unserer Schweizer Stadtdossiers", source: "bfs-zivil" },
  { value: "46,7 %", label: "aller Berner Haushalte sind Einpersonenhaushalte – schweizweit 37,5 %", source: "be-hh" },
];

p.kpis = [
  { value: "138.562", label: "Einwohnerinnen und Einwohner der Stadt Bern", source: "einwohner", note: "Ständige Wohnbevölkerung am 31.12.2025" },
  { value: "201.800", label: "Beschäftigte in Arbeitsstätten der Stadt Bern", source: "be-statent", note: "STATENT, Dezember 2023, auf 10 gerundet; 15.110 Arbeitsstätten; 29,9 % aller Beschäftigten im Kanton Bern" },
  { value: "105", label: "ledige Männer je 100 ledige Frauen (25 bis 54 Jahre)", source: "bfs-zivil", note: "21.037 ledige Männer und 20.070 ledige Frauen dieser Altersgruppe, 31.12.2025; Schweiz insgesamt 125" },
  { value: "24.496", label: "Studierende an Universität Bern und Berner Fachhochschule", source: "bfs-stud", note: "Wintersemester 2025/26: Universität 16.810, BFH 7.686 (alle Standorte); dazu PHBern und die Hochschule der Künste Bern" },
];

p.dossier = [
  {
    key: "bildung",
    title: "Bildung",
    intro: "Universität, Fachhochschule und Pädagogische Hochschule: In Bern haben fast sechs von zehn Erwachsenen eine Ausbildung auf Tertiärstufe abgeschlossen.",
    metrics: [
      { value: "58,6 %", label: "der Einwohnerinnen und Einwohner ab 25 Jahren haben einen Tertiärabschluss", source: "be-bildung", note: "Strukturerhebung 2022 bis 2024 (gepoolt), 59.908 von 102.308 Personen in Privathaushalten; relatives Vertrauensintervall ±1,9 %. Die Tertiärstufe umfasst höhere Berufsbildung und Hochschulen" },
      { value: "7,2 %", label: "der Einwohnerinnen und Einwohner ab 25 Jahren haben promoviert oder habilitiert", source: "be-bildung", note: "Geschätzt 7.388 Personen (Doktorat, Habilitation); relatives Vertrauensintervall ±7,4 %" },
      { value: "59,6 %", label: "Frauenanteil unter den 16.810 Studierenden der Universität Bern", source: "bfs-stud", note: "Wintersemester 2025/26, Bachelor bis Doktorat ohne Weiterbildung; an der Berner Fachhochschule sind 55,1 % der 7.686 Studierenden Frauen" },
    ],
    takeaway: "Wer in Bern studiert hat, bleibt oft: Verwaltung, Spital und Hochschulen bieten Laufbahnen, für die man nicht wegziehen muss.",
  },
  {
    key: "beruf",
    title: "Beruf & Erfolg",
    intro: "Gesundheitswesen, öffentliche Verwaltung und wissensnahe Dienstleistungen prägen den Arbeitsmarkt der Bundesstadt.",
    metrics: [
      { value: "201.800", label: "Beschäftigte in Berner Arbeitsstätten", source: "be-statent", note: "STATENT, Dezember 2023, auf 10 gerundet; 151.380 Vollzeitäquivalente; einzig die Stadt Zürich zählt mehr Beschäftigte" },
      { value: "1,5", label: "Beschäftigte je Einwohnerin und Einwohner – schweizweit rund 0,6", source: "be-statent-mm", note: "Laut Statistik Stadt Bern erreicht keine andere Schweizer Stadt einen so hohen Wert" },
      { value: "92,7 %", label: "der Beschäftigten arbeiten im Dienstleistungssektor", source: "be-statent-mm", note: "7,2 % im sekundären, 0,1 % im primären Sektor (STATENT 2023)" },
    ],
    takeaway: "Hier trifft man seltener auf Konzernkarrieren als auf Menschen mit Dossierverantwortung – und mit planbarem Feierabend.",
  },
  {
    key: "forschung",
    title: "Forschung",
    intro: "Die Universität Bern setzt fünf Themenschwerpunkte; zwei davon – Nachhaltigkeit und Gesundheit – prägen ganze Stadtquartiere.",
    metrics: [
      { value: "5", label: "Themenschwerpunkte der Universität Bern, darunter Nachhaltigkeit sowie Gesundheit und Medizin", source: "unibe-schwerpunkte", note: "Zur Nachhaltigkeit gehören das Centre for Development and Environment (CDE), das Oeschger-Zentrum für Klimaforschung (OCCR), das World Trade Institute und die Wyss Academy for Nature" },
      { value: "2", label: "Universitätskliniken gehören zur Medizinischen Fakultät: Inselspital und Universitäres Psychiatrisches Zentrum", source: "unibe-schwerpunkte", note: "Dazu die Vetsuisse-Fakultät mit dem Tierspital Bern und Partnerinstitutionen wie das CSEM, das Diabetes Center Berne und sitem-insel" },
      { value: "16.810", label: "Studierende an der Universität Bern", source: "bfs-stud", note: "Wintersemester 2025/26; die Universität ist eine Volluniversität mit acht Fakultäten, was interdisziplinäre Zentren wie das OCCR erst möglich macht" },
    ],
    takeaway: "Klimaforschung, Weltraum, Medizin: In Bern reden Menschen über Projekte, die länger laufen als jede Legislatur.",
  },
  {
    key: "singles",
    title: "Single-Leben",
    intro: "Nirgends in unseren Schweizer Dossiers sind mehr 25- bis 54-Jährige ledig – und nirgends in der Deutschschweiz ist das Geschlechterverhältnis so ausgeglichen.",
    metrics: [
      { value: "60,4 %", label: "der 25- bis 54-Jährigen sind ledig", source: "bfs-zivil", note: "41.107 von 68.022 Personen dieser Altersgruppe (ständige Wohnbevölkerung, 31.12.2025); schweizweit sind es 43,7 %. Ledig heisst nicht automatisch Single, auch unverheiratete Paare zählen dazu", compare: { city: 60.4, germany: 43.7, unit: " %", max: 70 } },
      { value: "105", label: "ledige Männer je 100 ledige Frauen zwischen 25 und 54", source: "bfs-zivil", note: "21.037 Männer zu 20.070 Frauen (31.12.2025). Schweizweit sind es 125, in Zürich 116, in St. Gallen 127 – Bern ist der ausgeglichenste Markt der Deutschschweiz", compare: { city: 105, germany: 125, unit: "", max: 145 } },
      { value: "46,7 %", label: "Einpersonenhaushalte", source: "be-hh", note: "31.882 von 68.313 Privathaushalten, Stand 2025 (STATPOP); Schweiz: 1.537.386 von 4.105.458 Haushalten" },
    ],
    takeaway: "Wenn Statistik je für eine Stadt spricht, dann hier: viele Ledige, fast gleich viele Männer wie Frauen, kurze Wege.",
  },
];

p.universities = [
  { name: "Universität Bern", kind: "Volluniversität des Kantons", students: "16.810", women: "59,6 %", source: "bfs-stud", compareSource: "unibe-schwerpunkte", text: "Volluniversität mit fünf Themenschwerpunkten – von Nachhaltigkeit über Gesundheit und Medizin bis zur Vetsuisse-Fakultät mit dem Tierspital. Zur Medizinischen Fakultät gehören Inselspital und Universitäres Psychiatrisches Zentrum." },
  { name: "Berner Fachhochschule BFH", kind: "Fachhochschule, Standorte Bern, Biel und Burgdorf", students: "7.686", women: "55,1 %", source: "bfs-stud", text: "Technik, Wirtschaft, Gesundheit, Soziale Arbeit und Künste – die BFH ist über die Region verteilt und hat in Bern selbst mehrere Standorte. Sie ist zugleich Trägerin der öffentlichen Wissenschaftscafés." },
  { name: "PHBern", kind: "Pädagogische Hochschule", students: "", source: "wissenschaftscafe", text: "Die Pädagogische Hochschule bildet Lehrerinnen und Lehrer für den ganzen Kanton aus und gehört wie Universität und BFH zu den Trägern der Wissenschaftscafés in Bern und Thun." },
  { name: "Inselspital / Insel Gruppe", kind: "Universitätsspital", students: "", source: "unibe-schwerpunkte", text: "Universitätsklinik der Medizinischen Fakultät und einer der grössten Arbeitgeber der Stadt. Rundherum hat sich ein Medizinaltechnik-Cluster angesiedelt, unter anderem mit sitem-insel und dem Diabetes Center Berne." },
];
p.universitiesNote = "Studierendenzahlen für das Wintersemester 2025/26 ohne Weiterbildung; die BFH-Zahl gilt für alle Standorte des Kantons.";

p.quarters = [
  { name: "Länggasse", label: "Universitätsquartier", text: "Hauptgebäude, Institute und die vonRoll-Areale liegen hier; entsprechend hoch ist der Anteil an Studierenden und Mitarbeitenden der Universität im Quartier. Cafés mit Laptops am Nachmittag, Quartierbeizen am Abend." },
  { name: "Kirchenfeld & Brunnadern", label: "Diplomatisches Bern", text: "Botschaften, Gymnasien und das Historische Museum prägen das Quartier südlich der Aare. Ruhig, bürgerlich, mit dem kürzesten Weg zum Rosengarten – dem Aussichtspunkt, an dem in Bern traditionell Verabredungen beginnen." },
  { name: "Breitenrain & Lorraine", label: "Nordseite der Aare", text: "Zwischen Breitsch und Lorrainebad liegt das Bern, das abends unterwegs ist: Quartierbeizen, Genossenschaften, viele Wohngemeinschaften und Einpersonenhaushalte. Hier treffen sich Hochschulnahe, die nicht in der Altstadt wohnen wollen." },
  { name: "Altstadt & Matte", label: "UNESCO-Welterbe", text: "Arkaden, Zytglogge, Bundeshaus – und die Matte direkt am Wasser. Praktisch für ein erstes Treffen, weil alles in Gehdistanz liegt und der Weg zur Aare nie weiter als fünf Minuten ist." },
  { name: "Insel-Areal & Holligen", label: "Medizinquartier", text: "Rund um das Inselspital arbeitet ein grosser Teil der akademischen Berufe der Stadt: Ärztinnen, Pflegende, Forschende, Medizintechnik. Schichtdienste prägen hier den Takt, auch beim Verabreden." },
  { name: "Wankdorf & Ostring", label: "Verwaltung und Sport", text: "Bundesämter, Stade de Suisse und Wankdorf-City: viele Verwaltungsjobs mit geregelten Zeiten. Wer hier arbeitet, hat abends Zeit – ein unterschätzter Vorteil." },
];

p.agenda = [
  { title: "Nacht der Forschung der Universität Bern", when: "Alle zwei bis drei Jahre, September", text: "Die fünfte Ausgabe am 6. September 2025 brachte rund 10.000 Besucherinnen und Besucher mit Hunderten Forschenden zusammen – Experimente, Vorträge und Diskussionen von 16 bis 23 Uhr. Der Anlass, an dem die ganze Universität ihre Türen öffnet.", href: "https://www.nachtderforschung.unibe.ch/" },
  { title: "Wissenschaftscafés Bern", when: "Montagabends, wechselnde Orte", text: "Drei Fachleute, ein aktuelles Thema, Publikum mit Fragen: Die Wissenschaftscafés von Science et Cité werden von den Akademien der Wissenschaften, der Universität Bern, der BFH und der PHBern getragen. Eintritt frei, keine Anmeldung – und ein Getränk steht ohnehin auf dem Tisch.", href: "https://www.science-et-cite.ch/unsere-projekte/details/wissenschaftscafes" },
  { title: "Museumsnacht Bern", when: "März", text: "2026 kamen 102.993 Eintritte in 40 Institutionen mit über 300 Programmpunkten zusammen. Die nächste Museumsnacht ist am 19. März 2027 von 18 bis 2 Uhr – ein Ticket, ein Abend, so viele Häuser wie man schafft.", href: "https://www.museumsnacht-bern.ch/" },
  { title: "Buskers Bern", when: "August", text: "Strassenkunst in der ganzen Altstadt; die 24. Ausgabe läuft vom 12. bis 14. August 2027. Man läuft, bleibt stehen, läuft weiter – das ideale Format für ein erstes Treffen ohne Tischgespräch.", href: "https://www.buskersbern.ch/" },
];

p.talkingPoints = [
  { title: "Das ausgeglichenste Verhältnis der Deutschschweiz", text: "105 ledige Männer je 100 ledige Frauen zwischen 25 und 54 – schweizweit sind es 125. Wer aus Zürich (116), St. Gallen (127) oder Zug (138) nach Bern zieht, merkt den Unterschied im Alltag, nicht nur in der Statistik." },
  { title: "Verwaltung heisst nicht langweilig", text: "Als Bundesstadt lebt Bern von Menschen, die Dossiers führen, Gesetze vorbereiten und Projekte über Legislaturen hinweg betreuen. Das Gegenstück zur Konzernkarriere: weniger Tempo, mehr Tiefe – und fast immer ein planbarer Feierabend." },
  { title: "Die Aare als Taktgeber", text: "Von Mai bis September ist das Aareschwimmen vom Eichholz zum Marzili die verlässlichste Verabredung der Stadt. Wer das erste Mal mitgeht, lernt mehr über sein Gegenüber als in drei Restaurantabenden." },
];

p.faq = [
  { question: "Wie viele Akademiker leben in Bern?", answer: "58,6 Prozent der Einwohnerinnen und Einwohner ab 25 Jahren haben einen Tertiärabschluss, 43,9 Prozent einen Hochschulabschluss und 7,2 Prozent ein Doktorat oder eine Habilitation (Strukturerhebung 2022–2024, Statistik Stadt Bern). An der Universität Bern studieren im Wintersemester 2025/26 16.810 Menschen, an der Berner Fachhochschule 7.686." },
  { question: "Wie viele Singles leben in Bern?", answer: "48,9 Prozent der Erwachsenen ab 20 Jahren sind ledig, bei den 25- bis 54-Jährigen sind es 60,4 Prozent – der höchste Wert unserer Schweizer Stadtdossiers (BFS STATPOP, 31.12.2025). 46,7 Prozent der Haushalte sind Einpersonenhaushalte. Ledig heisst dabei nicht automatisch Single." },
  { question: "Gibt es in Bern mehr ledige Männer oder Frauen?", answer: "Das Verhältnis ist fast ausgeglichen: Auf 100 ledige Frauen zwischen 25 und 54 kommen 105 ledige Männer (21.037 zu 20.070, Stand 31.12.2025). Schweizweit sind es 125. In der Deutschschweiz ist uns keine Stadt mit einem ausgeglicheneren Verhältnis begegnet." },
  { question: "Welche Hochschulen gibt es in Bern?", answer: "Die Universität Bern als Volluniversität mit fünf Themenschwerpunkten, die Berner Fachhochschule BFH mit Standorten in Bern, Biel und Burgdorf, die PHBern für die Lehrerinnen- und Lehrerbildung sowie die Hochschule der Künste Bern. Dazu kommen das Inselspital als Universitätsklinik und Forschungspartner wie sitem-insel und das Diabetes Center Berne." },
  { question: "Wo lernen Akademiker in Bern Singles kennen?", answer: "Bei den Wissenschaftscafés am Montagabend (Eintritt frei), an der Nacht der Forschung der Universität, in der Museumsnacht im März, an den Buskers im August, im Sommer beim Aareschwimmen Richtung Marzili oder im Rosengarten. Wer gezielt Menschen mit ähnlichem Bildungshintergrund sucht, findet sie bei AkademikerSingles: Jedes Profil wird manuell geprüft." },
  { question: "Lohnt sich Bern für Zugezogene?", answer: "Die Stadt zählt 201.800 Beschäftigte bei 138.562 Einwohnern – 1,5 Arbeitsplätze je Einwohnerin und Einwohner, mehr als jede andere Schweizer Stadt. Wer eine Stelle in Verwaltung, Spital oder Hochschule findet, braucht nicht zu pendeln. Das macht Bern für Paare mit zwei Karrieren vergleichsweise einfach." },
  { question: "Ist die Anmeldung kostenlos?", answer: "Ja. Die Registrierung ist kostenfrei und beinhaltet die Basis-Mitgliedschaft. Damit legen Sie Ihr Profil an, nutzen den Fragenflirt und antworten kostenlos auf Nachrichten von Premium-Mitgliedern." },
];

p.guide = [
  {
    title: "Warum Bern statistisch die freundlichste Stadt für Suchende ist",
    html: "<p>Drei Zahlen beschreiben Bern besser als jede Imagebroschüre. Erstens: 60,4 Prozent der 25- bis 54-Jährigen sind ledig – schweizweit sind es 43,7 Prozent. Zweitens: Auf 100 ledige Frauen dieser Altersgruppe kommen 105 ledige Männer, während es im Landesschnitt 125 sind. Drittens: 46,7 Prozent der Haushalte bestehen aus einer Person.</p><p>Diese Kombination ist selten. In den meisten Schweizer Städten – und erst recht in den Wirtschaftszentren – sind ledige Männer deutlich in der Überzahl, in Zug etwa mit 138 je 100 Frauen. Bern liegt fast im Gleichgewicht. Für beide Seiten heisst das: weniger Konkurrenz, weniger unbeantwortete Nachrichten, mehr Gespräche, die tatsächlich zustande kommen.</p><p>Der zweite Berner Vorteil ist die Grösse. 138.562 Einwohnerinnen und Einwohner, alles in 20 Minuten erreichbar, und 201.800 Arbeitsplätze in derselben Stadt. Wer sich hier verabredet, verbringt den Abend nicht im Zug.</p>",
  },
  {
    title: "Bildung in Bern: hoch, aber unaufgeregt",
    html: "<p>58,6 Prozent der Erwachsenen ab 25 haben einen Tertiärabschluss, 43,9 Prozent einen Hochschulabschluss, 7,2 Prozent ein Doktorat oder eine Habilitation. Das ist für eine Stadt dieser Grösse aussergewöhnlich – und wird hier trotzdem selten zur Schau gestellt. Berner Zurückhaltung ist kein Klischee, sondern ein Gesprächsstil.</p><p>Die Hochschullandschaft erklärt die Zahlen: 16.810 Studierende an der Universität (59,6 Prozent davon Frauen), 7.686 an der Berner Fachhochschule, dazu PHBern und die Hochschule der Künste Bern. Die Universität ist eine Volluniversität mit fünf Themenschwerpunkten; zur Medizinischen Fakultät gehören Inselspital und Universitäres Psychiatrisches Zentrum, zur Vetsuisse-Fakultät das Tierspital.</p><p>Praktisch heisst das für die Partnersuche: Der Hochschulabschluss trennt in Bern kaum – fast alle haben einen. Interessanter ist die Frage, in welchem der drei grossen Systeme jemand arbeitet: Verwaltung, Spital oder Hochschule. Daraus folgen Arbeitszeiten, Reisetätigkeit und Planbarkeit, und die bestimmen den Alltag zu zweit mehr als jeder Titel.</p>",
  },
  {
    title: "Die drei Systeme: Verwaltung, Spital, Hochschule",
    html: "<p>201.800 Beschäftigte arbeiten in der Stadt Bern, 92,7 Prozent davon im Dienstleistungssektor. Auf eine Einwohnerin oder einen Einwohner kommen 1,5 Arbeitsplätze – schweizweit sind es rund 0,6, und laut Statistik Stadt Bern erreicht keine andere Schweizer Stadt diesen Wert.</p><p>Die öffentliche Verwaltung bringt Kolleginnen und Kollegen mit geregelten Zeiten und langen Projekten. Das Gesundheitswesen rund um das Inselspital bringt Schichtdienste, Wochenenden und eine Berufsgruppe, die beim ersten Treffen oft erst um 20 Uhr Zeit hat. Die Hochschulen bringen befristete Verträge, Konferenzreisen und Menschen, die ihre Arbeit auch am Samstag erklären können, ohne sich zu langweilen.</p><p>Wer diese drei Welten kennt, versteht Berner Profile schneller. Und wer selbst in einer davon arbeitet, sollte das ruhig konkret beschreiben: „Ich betreue ein Dossier zur Verkehrsfinanzierung“ sagt mehr als „Bundesverwaltung“ – und ist ein besserer Gesprächsanfang.</p>",
  },
  {
    title: "Wo Bern wohnt und wo es sich trifft",
    html: "<p>Bern ist nach Quartieren sortiert, nicht nach Schichten. Die Länggasse ist Universitätsquartier mit Instituten, vonRoll-Arealen und Cafés voller Laptops. Breitenrain und Lorraine sind die Nordseite der Aare: Quartierbeizen, Genossenschaften, viele kleine Haushalte. Kirchenfeld steht für Botschaften, Gymnasien und Museen, das Insel-Areal für Medizin, Wankdorf für Verwaltung.</p><p>Verabredet wird sich meist dort, wo alle hinkommen: Altstadt und Matte, Rosengarten für den Blick über die Dächer, Bundesterrasse für den Blick auf die Alpen. Im Sommer ersetzt die Aare jedes Programm – vom Eichholz bis zum Marzili, mit der Badetasche als einzigem Gepäck.</p><p>Ein praktischer Hinweis: In Bern beginnen Abende früher und enden früher als in Zürich. Ein Treffen um 18 Uhr ist hier kein Nachmittagstermin, sondern der normale Beginn. Wer das weiss, wirkt nicht abweisend, wenn er um 22 Uhr den Heimweg vorschlägt.</p>",
  },
  {
    title: "Termine, zu denen man zu zweit gehen kann",
    html: "<p>Bern hat ein ungewöhnlich dichtes Angebot an öffentlichen Wissenschaftsformaten. Die Wissenschaftscafés finden montagabends an wechselnden Orten statt: drei Fachleute, ein Thema, Publikum mit Fragen. Getragen werden sie von den Akademien der Wissenschaften, der Universität, der BFH und der PHBern. Eintritt frei, keine Anmeldung.</p><p>Grösser und seltener ist die Nacht der Forschung der Universität: Zur fünften Ausgabe am 6. September 2025 kamen rund 10.000 Menschen und trafen Hunderte Forschende. Im März folgt die Museumsnacht – 2026 waren es 102.993 Eintritte in 40 Institutionen mit über 300 Programmpunkten, die nächste ist am 19. März 2027. Im August füllt Buskers Bern die Altstadt mit Strassenkunst, 2027 vom 12. bis 14. August.</p><p>Alle vier Formate haben denselben Vorteil für ein erstes oder zweites Treffen: Es gibt immer etwas zu sehen, man kann jederzeit weitergehen, und kein Gespräch muss künstlich am Leben gehalten werden.</p>",
  },
  {
    title: "Was die Zahlen nicht sagen",
    html: "<p>Die Berner Bildungszahlen stammen aus einer gepoolten Stichprobe der Jahre 2022 bis 2024 und gelten für Personen ab 25 Jahren in Privathaushalten; sie haben Vertrauensintervalle, die bei kleinen Gruppen – etwa den Promovierten – deutlich breiter sind. Die Beschäftigtenzahlen zählen Arbeitsverhältnisse, nicht Köpfe.</p><p>Und „ledig“ bleibt ein Zivilstand: Unter den 41.107 ledigen 25- bis 54-Jährigen sind viele, die seit Jahren in einer Partnerschaft leben, nur eben ohne Trauschein. Der hohe Berner Wert hat auch damit zu tun, dass hier überdurchschnittlich viele Menschen in dieser Form zusammenleben.</p><p>Was trotzdem bleibt: Bern ist klein genug für kurze Wege, gross genug für Anonymität, akademisch geprägt und beim Geschlechterverhältnis näher am Gleichgewicht als jede andere Deutschschweizer Stadt in unseren Dossiers. Schlechtere Ausgangslagen gibt es.</p>",
  },
];

applySources(p, {
  einwohner: { publisher: "Bundesamt für Statistik (BFS)", title: "STATPOP, Tabelle px-x-0102010000_103: ständige Wohnbevölkerung nach Gemeinde (Bevölkerungsstand)", stand: "Stand 31.12.2025", url: "https://www.pxweb.bfs.admin.ch/api/v1/de/px-x-0102010000_103/px-x-0102010000_103.px" },
  "bfs-zivil": { publisher: "Bundesamt für Statistik (BFS)", title: "STATPOP, Tabelle px-x-0102010000_103: ständige Wohnbevölkerung nach Gemeinde, Geschlecht, Zivilstand und Altersklasse (Anteil Ledige, Geschlechterverhältnis)", stand: "Stand 31.12.2025", url: "https://www.pxweb.bfs.admin.ch/api/v1/de/px-x-0102010000_103/px-x-0102010000_103.px" },
  "bfs-stud": { publisher: "Bundesamt für Statistik (BFS)", title: "Studierende an den universitären Hochschulen (px-x-1502040100_106) sowie an Fachhochschulen und pädagogischen Hochschulen (px-x-1502040400_136) nach Fachbereich, Studienstufe, Geschlecht und Hochschule; Bachelor bis Doktorat ohne Weiterbildung", stand: "Wintersemester 2025/26", url: "https://www.pxweb.bfs.admin.ch/api/v1/de/px-x-1502040100_106/px-x-1502040100_106.px" },
  "unibe-schwerpunkte": { publisher: "Universität Bern", title: "Themenschwerpunkte der Universität Bern: fünf Schwerpunkte, Zentren (CDE, OCCR, WTI, Wyss Academy), Medizinische Fakultät mit Inselspital und UPZ, Vetsuisse-Fakultät", stand: "abgerufen 11/2026", url: "https://www.unibe.ch/universitaet/portraet/themenschwerpunkte/index_ger.html" },
  wissenschaftscafe: { publisher: "Stiftung Science et Cité", title: "Wissenschaftscafés: Bern und Thun, jeweils Montagabend, Eintritt frei und ohne Anmeldung; Trägerschaft Akademien der Wissenschaften Schweiz, Universität Bern, Berner Fachhochschule, PHBern", stand: "abgerufen 11/2026", url: "https://www.science-et-cite.ch/unsere-projekte/details/wissenschaftscafes" },
});

writeFileSync(file, JSON.stringify(p, null, 1) + "\n");
console.log("Bern geschrieben:", p.sources.length, "Quellen,", p.guide.length, "Guide-Kapitel,", p.universities.length, "Hochschulen");
