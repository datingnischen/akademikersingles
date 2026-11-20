// Stadtdossier Graz ausbauen: Hochschulporträts (vier öffentliche Universitäten), Indikatoren der
// Abgestimmten Erwerbsstatistik 2024, Geschlechterverhältnis 30–49, Termine und eigener Stadt-Guide.
import { readFileSync, writeFileSync } from "node:fs";
import { applySources, checkSeo } from "./_sources.mjs";

const file = "data/city-profiles/at/graz.json";
const p = JSON.parse(readFileSync(file, "utf8"));

p.seoTitle = "Akademiker Singles in Graz: 55.254 Studierende";
p.seoDescription = "Graz in Zahlen: 30,7 % mit Hochschulabschluss – Österreichs höchster Wert, 55.254 Studierende, jede zweite Person zwischen 20 und 24 in Ausbildung.";
p.eyebrow = "Partnersuche für Akademiker · Studentenhauptstadt der Steiermark";
p.lead = "Keine österreichische Großstadt ist akademischer als Graz: 30,7 Prozent der Menschen ab 15 Jahren haben einen Hochschul-, Akademie- oder Kollegabschluss, die Tertiärquote liegt bei 43,5 Prozent (Männer) und 42,1 Prozent (Frauen) – jeweils Höchstwerte in Österreich. 50,5 Prozent der 20- bis 24-Jährigen sind in weiterführender Ausbildung, an den vier öffentlichen Universitäten studieren 55.254 Menschen. Dazu 47,9 Prozent Einpersonenhaushalte und mit 41,4 Jahren das zweitjüngste Durchschnittsalter aller Landeshauptstädte.";

p.briefing = [
  { value: "30,7 %", label: "der Einwohnerinnen und Einwohner ab 15 Jahren haben einen Hochschul-, Akademie- oder Kollegabschluss – österreichweit 17,6 %", source: "aest-gemeinde" },
  { value: "55.254", label: "Studierende an den vier öffentlichen Universitäten in Graz", source: "uni-stud", note: "Wintersemester 2025/26, berechnet; Fachhochschulen und Pädagogische Hochschulen kommen dazu" },
  { value: "50,5 %", label: "der 20- bis 24-Jährigen sind in weiterführender Ausbildung – Höchstwert in Österreich", source: "aest-indikatoren" },
];

p.kpis = [
  { value: "304.459", label: "Einwohnerinnen und Einwohner in Graz", source: "aest-gemeinde", note: "Abgestimmte Erwerbsstatistik 2024, Stichtag 31.10.2024" },
  { value: "218.216", label: "Beschäftigte in Grazer Arbeitsstätten", source: "aest-gemeinde", note: "28.198 Arbeitsstätten, 23.982 Unternehmen; Beschäftigungsverhältnisse am Arbeitsort, Stichtag 31.10.2024" },
  { value: "43,5 %", label: "Tertiärquote der Männer ab 25 Jahren – Österreichs höchster Wert (Frauen: 42,1 %)", source: "aest-indikatoren", note: "ISCED 2011, Abgestimmte Erwerbsstatistik 2024; Österreich 31,8 % (Männer) und 28,9 % (Frauen)" },
  { value: "109", label: "Männer je 100 Frauen in der Altersgruppe 30 bis 49", source: "bev-alter", note: "47.807 Männer und 44.011 Frauen am 01.01.2026; in Wien sind es 103" },
];

p.dossier = [
  {
    key: "bildung",
    title: "Bildung",
    intro: "Vier öffentliche Universitäten, zwei Fachhochschulen und eine Pädagogische Hochschule auf 300.000 Einwohner: Graz ist die Stadt mit Österreichs höchster Akademikerquote.",
    metrics: [
      { value: "30,7 %", label: "der Einwohnerinnen und Einwohner ab 15 Jahren haben einen Hochschul-, Akademie- oder Kollegabschluss", source: "aest-gemeinde", note: "Abgestimmte Erwerbsstatistik 2024; Österreich 17,6 %, Wien 26,4 %, Innsbruck 29,7 %", compare: { city: 30.7, germany: 17.6, unit: " %", max: 36 } },
      { value: "50,5 %", label: "der 20- bis 24-Jährigen sind in weiterführender Ausbildung", source: "aest-indikatoren", note: "Abgestimmte Erwerbsstatistik 2024; Österreich 33,5 %, Innsbruck 48,8 %, Wien 41,2 %. Jede zweite Person in diesem Alter studiert oder lernt also noch", compare: { city: 50.5, germany: 33.5, unit: " %", max: 60 } },
      { value: "55.254", label: "Studierende an den vier öffentlichen Universitäten", source: "uni-stud", note: "Wintersemester 2025/26, berechnet: Universität Graz 29.561, Technische Universität Graz 17.400, Medizinische Universität Graz 5.903, Universität für Musik und darstellende Kunst Graz 2.390; Mehrfachzählung bei Studium an mehreren Universitäten möglich" },
    ],
    takeaway: "Wer in Graz lebt, hat fast zwangsläufig mit Hochschulen zu tun – als Studierende, Lehrende oder Nachbarn von beidem.",
  },
  {
    key: "beruf",
    title: "Beruf & Erfolg",
    intro: "Forschung, Fahrzeugtechnik und Medizin prägen die Wirtschaft; 60,1 Prozent der Studierenden unter 30 arbeiten nebenbei – der höchste Wert Österreichs.",
    metrics: [
      { value: "218.216", label: "Beschäftigte in Grazer Arbeitsstätten", source: "aest-gemeinde", note: "92,2 % der Arbeitsstätten entfallen auf den tertiären Sektor; Stichtag 31.10.2024" },
      { value: "60,1 %", label: "der Studierenden unter 30 Jahren sind erwerbstätig – Österreichs höchster Wert", source: "aest-indikatoren", note: "Abgestimmte Erwerbsstatistik 2024; Österreich 56,1 %. Studium und Job laufen in Graz besonders häufig parallel", compare: { city: 60.1, germany: 56.1, unit: " %", max: 70 } },
      { value: "132", label: "Pendlersaldo: Auf 100 auspendelnde Erwerbstätige kommen 132 einpendelnde", source: "aest-indikatoren", note: "Abgestimmte Erwerbsstatistik 2024; nur 26,6 % der Grazer Erwerbstätigen pendeln aus der Stadt aus" },
    ],
    takeaway: "Viele Lebensläufe hier verbinden Forschung mit Industrie – und wer das kann, erklärt es meist auch gut.",
  },
  {
    key: "wohnen",
    title: "Wohnen & Alltag",
    intro: "Mehr als jeder zweite Haushalt ist klein, die Mietquote hoch, die Wege kurz: Graz ist auf das Leben als Einzelperson eingerichtet.",
    metrics: [
      { value: "47,9 %", label: "Einpersonenhaushalte", source: "aest-indikatoren", note: "Abgestimmte Erwerbsstatistik 2024; Österreich 38,9 %. In Graz leben also fast halb so viele Haushalte allein wie Haushalte insgesamt im Bundesschnitt", compare: { city: 47.9, germany: 38.9, unit: " %", max: 55 } },
      { value: "59,2 %", label: "Mietquote der Hauptwohnsitzwohnungen", source: "aest-indikatoren", note: "Abgestimmte Erwerbsstatistik 2024; Österreich 45,3 %, Steiermark 37,2 %. Die durchschnittliche Wohnfläche liegt bei 76,2 Quadratmetern (Österreich 96,7)" },
      { value: "22", label: "Minuten durchschnittliche Wegzeit zur Arbeit", source: "aest-indikatoren", note: "Abgestimmte Erwerbsstatistik 2024; durchschnittliche Pendeldistanz 23,9 Straßenkilometer. Innerhalb der Stadt ist fast alles mit Rad oder Tram erreichbar" },
    ],
    takeaway: "Kleine Wohnungen, kurze Wege, viel Öffentlichkeit: In Graz spielt sich das Leben draußen ab – gut für alle, die jemanden kennenlernen wollen.",
  },
  {
    key: "singles",
    title: "Single-Leben",
    intro: "Die zweitjüngste Landeshauptstadt Österreichs mit einem leichten Männerüberschuss in der entscheidenden Altersgruppe.",
    metrics: [
      { value: "41,4", label: "Jahre Durchschnittsalter – nur Wien ist jünger", source: "aest-indikatoren", note: "Abgestimmte Erwerbsstatistik 2024; Österreich 43,6 Jahre, Steiermark 44,8", compare: { city: 41.4, germany: 43.6, unit: " J.", max: 50 } },
      { value: "109", label: "Männer je 100 Frauen zwischen 30 und 49 Jahren", source: "bev-alter", note: "47.807 Männer zu 44.011 Frauen am 01.01.2026. Der Überschuss hat auch mit der TU Graz und den technischen Studienrichtungen zu tun", compare: { city: 109, germany: 103, unit: "", max: 125, cityLabel: "Graz", compareLabel: "Wien" } },
      { value: "17,1 %", label: "der Bevölkerung sind 65 Jahre oder älter – der niedrigste Wert aller Landeshauptstädte außer Wien", source: "aest-gemeinde", note: "Abgestimmte Erwerbsstatistik 2024; Steiermark 22,0 %, Österreich 20,2 %" },
    ],
    takeaway: "Eine junge Stadt mit hoher Fluktuation: Hier lernt man leicht jemanden kennen – und sollte früh über Bleiben oder Weiterziehen reden.",
  },
];

p.universities = [
  { name: "Universität Graz", kind: "Volluniversität", students: "29.561", source: "uni-stud", text: "Die größte Hochschule der Steiermark mit Geistes-, Sozial-, Rechts- und Naturwissenschaften. Ihr Campus im Bezirk Geidorf ist zugleich Parkanlage – und die Universität betreibt mit der Montagsakademie eine kostenlose öffentliche Vortragsreihe." },
  { name: "Technische Universität Graz", kind: "Technische Universität", students: "17.400", source: "uni-stud", text: "Mit 17.400 Studierenden einer der großen Technikstandorte Österreichs, eng verbunden mit der steirischen Fahrzeug- und Zulieferindustrie. Die TU ist einer der Gründe, warum Graz in der Altersgruppe 30 bis 49 einen Männerüberschuss von 109 zu 100 hat." },
  { name: "Medizinische Universität Graz", kind: "Medizinische Universität", students: "5.903", source: "uni-stud", text: "Gemeinsam mit dem LKH-Universitätsklinikum einer der größten Arbeitgeber der Stadt. Wer hier arbeitet, lebt in Dienstplänen – ein Thema, das beim Kennenlernen früher zur Sprache kommen sollte als später." },
  { name: "Universität für Musik und darstellende Kunst Graz", kind: "Kunstuniversität", students: "2.390", source: "uni-stud", text: "2.390 Studierende aus aller Welt prägen das Konzert- und Theaterprogramm der Stadt weit über den Campus hinaus. Ein Abend im MUMUTH ist in Graz ein verlässlich gutes zweites Date." },
  { name: "Fachhochschulen und Pädagogische Hochschule", kind: "FH Joanneum, FH Campus 02, PH Steiermark", students: "", source: "graz-hochschulen", text: "Neben den vier Universitäten bilden Fachhochschulen und die Pädagogische Hochschule weitere Tausende aus – berufsbegleitend, praxisnah und mit einem spürbar anderen Altersschnitt als an den Universitäten." },
];
p.universitiesNote = "Studierende an den öffentlichen Universitäten im Wintersemester 2025/26; Mehrfachzählung bei Studium an mehreren Universitäten möglich.";

p.quarters = [
  { name: "Geidorf", label: "Universitätsviertel", text: "Zwischen Uni-Hauptgebäude, Botanischem Garten und Rosenhain: das klassische Viertel für alle, die an der Karl-Franzens-Universität arbeiten oder studieren. Altbauten, Kaffeehäuser, kurzer Weg in die Innenstadt." },
  { name: "Innere Stadt & Schlossberg", label: "UNESCO-Altstadt", text: "Die Altstadt gehört zum UNESCO-Welterbe, der Schlossberg darüber ist mit Lift oder 260 Stufen erreichbar. Für ein erstes Treffen gibt es in Graz kaum eine schlechtere Idee, als hier nicht hinaufzugehen." },
  { name: "Lend & Gries", label: "Linkes Murufer", text: "Die früheren Arbeiterbezirke sind heute die kreativste Ecke der Stadt: Lendplatz, Kunsthaus, kleine Lokale. Hier trifft sich, wer Graz jung erlebt – und wer die Mieten der Innenstadt nicht zahlen will." },
  { name: "Inffeldgasse & St. Peter", label: "TU-Campus", text: "Der Technikcampus der TU Graz mit Instituten, Laboren und Spin-offs. Rundherum wohnen viele technische Studierende und Mitarbeitende – statistisch der männlichste Teil der Stadt." },
  { name: "Universitätsklinikum & Ragnitz", label: "Medizinviertel", text: "Rund um das LKH-Universitätsklinikum arbeitet ein großer Teil der medizinischen Berufe der Steiermark. Schichtdienste bestimmen den Takt, dafür ist der Hilmteich für die Feierabendrunde nah." },
  { name: "Puntigam & Straßgang", label: "Süden der Stadt", text: "Neubaugebiete mit mehr Quadratmetern pro Euro, gut angebunden über die Tram. Hier zieht hin, wer aus der WG in die erste eigene Wohnung wechselt – oder zu zweit mehr Platz braucht." },
];

p.agenda = [
  { title: "Montagsakademie der Universität Graz", when: "Montagabends im Semester", text: "Allgemein verständliche Vorträge aus der Wissenschaft, frei zugänglich und kostenlos, zusätzlich live in Partnereinrichtungen und im Internet übertragen. Das wohl unkomplizierteste akademische Date der Stadt.", href: "https://montagsakademie.uni-graz.at/de/" },
  { title: "Lange Nacht der Forschung", when: "Alle zwei Jahre", text: "Österreichs größtes Wissenschaftsevent öffnet auch in Graz Labore und Institute: zuletzt am 24. April 2026, österreichweit mit über 3.000 Programmpunkten und mehr als 192.000 Besuchenden bei freiem Eintritt. Nächster Termin: 19. Mai 2028.", href: "https://langenachtderforschung.at/" },
  { title: "Styriarte", when: "Sommer", text: "Das Festival für klassische Musik bespielt im Sommer Helmut-List-Halle, Stefaniensaal und ungewöhnliche Spielorte in der Steiermark. Konzertkarten sind in Graz ein etabliertes Mittel, um ein zweites Treffen zu verabreden.", href: "https://www.styriarte.com/" },
  { title: "Schlossberg und Murinsel", when: "Ganzjährig", text: "Der Aufstieg über die Kriegssteige, der Uhrturm, danach die Murinsel oder ein Lokal am Lendplatz: Diese Abfolge funktioniert in Graz zu jeder Jahreszeit und kostet im einfachsten Fall nichts." },
];

p.talkingPoints = [
  { title: "Österreichs akademischste Stadt", text: "30,7 Prozent Akademikerquote, 43,5 Prozent Tertiärquote bei den Männern, 42,1 bei den Frauen – Graz liegt in allen drei Werten vor Wien und Innsbruck. Wer hier über Bildung redet, redet nicht über Status, sondern über Alltag." },
  { title: "Uni oder TU?", text: "Die Karl-Franzens-Universität mit 29.561 Studierenden und die TU mit 17.400 prägen zwei verschiedene Milieus, die sich im Alltag seltener begegnen, als die Entfernung vermuten lässt. Der Männerüberschuss von 109 zu 100 bei den 30- bis 49-Jährigen hat hier eine seiner Ursachen." },
  { title: "Arbeiten neben dem Studium", text: "60,1 Prozent der Studierenden unter 30 sind erwerbstätig – Österreichs höchster Wert. Das heißt: Viele haben wenig Zeit, aber früh Berufserfahrung. Wer in Graz nach einem Treffen fragt, fragt am besten gleich mit zwei Terminvorschlägen." },
];

p.faq = [
  { question: "Wie viele Akademiker leben in Graz?", answer: "30,7 Prozent der Einwohnerinnen und Einwohner ab 15 Jahren haben einen Hochschul-, Akademie- oder Kollegabschluss – der höchste Wert aller österreichischen Großstädte (Abgestimmte Erwerbsstatistik 2024, Österreich 17,6 Prozent). Die Tertiärquote ab 25 Jahren liegt bei 43,5 Prozent (Männer) und 42,1 Prozent (Frauen)." },
  { question: "Wie viele Studierende hat Graz?", answer: "An den vier öffentlichen Universitäten studieren im Wintersemester 2025/26 zusammen 55.254 Menschen: 29.561 an der Universität Graz, 17.400 an der TU Graz, 5.903 an der Medizinischen Universität und 2.390 an der Universität für Musik und darstellende Kunst. Dazu kommen FH Joanneum, FH Campus 02 und die Pädagogische Hochschule." },
  { question: "Gibt es in Graz mehr Männer oder Frauen?", answer: "In der Altersgruppe 30 bis 49 kommen auf 100 Frauen 109 Männer (47.807 zu 44.011 am 01.01.2026). Der Überschuss hängt mit den technischen Studienrichtungen und der steirischen Industrie zusammen. In Wien liegt der Wert bei 103." },
  { question: "Gibt es in Graz viele Singles?", answer: "47,9 Prozent der Haushalte sind Einpersonenhaushalte (Österreich 38,9 Prozent), und mit 41,4 Jahren ist Graz nach Wien die jüngste Landeshauptstadt. Alleinlebend heißt nicht automatisch Single, zeigt aber, wie verbreitet das eigenständige Wohnen hier ist." },
  { question: "Wo lernen Akademiker in Graz Singles kennen?", answer: "Bei der kostenlosen Montagsakademie der Universität Graz, bei der Langen Nacht der Forschung, im Sommer bei der Styriarte, am Schlossberg, auf der Murinsel oder in den Lokalen rund um den Lendplatz. Wer gezielt Menschen mit ähnlichem Bildungshintergrund sucht, findet sie bei AkademikerSingles: Jedes Profil wird manuell geprüft." },
  { question: "Lohnt sich Graz für Berufseinsteiger?", answer: "Auf 100 auspendelnde Erwerbstätige kommen 132 einpendelnde, nur 26,6 Prozent der Grazerinnen und Grazer pendeln aus der Stadt aus. Die durchschnittliche Wegzeit zur Arbeit liegt bei 22 Minuten. Wer hier Arbeit findet, muss also selten weit fahren – ein Vorteil, der auch Beziehungen zugutekommt." },
  { question: "Ist die Anmeldung kostenlos?", answer: "Ja. Die Registrierung ist kostenfrei und beinhaltet die Basis-Mitgliedschaft. Damit legen Sie Ihr Profil an, nutzen den Fragenflirt und antworten kostenlos auf Nachrichten von Premium-Mitgliedern." },
];

p.guide = [
  {
    title: "Die akademischste Stadt Österreichs",
    html: "<p>Graz führt in Österreich gleich drei Bildungsstatistiken an: 30,7 Prozent der Menschen ab 15 Jahren haben einen Hochschul-, Akademie- oder Kollegabschluss, die Tertiärquote der Männer ab 25 liegt bei 43,5 Prozent, die der Frauen bei 42,1 Prozent. Zum Vergleich: Österreichweit sind es 17,6 beziehungsweise 31,8 und 28,9 Prozent.</p><p>Dahinter stehen vier öffentliche Universitäten mit 55.254 Studierenden, dazu Fachhochschulen und die Pädagogische Hochschule. Und ein Wert, der die Stadt noch besser beschreibt: 50,5 Prozent der 20- bis 24-Jährigen sind in weiterführender Ausbildung – jede zweite Person in diesem Alter.</p><p>Für die Partnersuche heißt das: Das Bildungsniveau ist kein Unterscheidungsmerkmal, sondern die Grundlage. Interessanter sind die Fragen danach – welches Fach, welche Universität, welcher Plan danach. Graz ist eine Stadt, in der man über Inhalte ins Gespräch kommt, nicht über Titel.</p>",
  },
  {
    title: "Uni, TU, Med und Kunst: vier Welten",
    html: "<p>Die Universität Graz ist mit 29.561 Studierenden die größte Hochschule der Steiermark und deckt Geistes-, Sozial-, Rechts- und Naturwissenschaften ab. Die Technische Universität Graz kommt auf 17.400 Studierende und ist eng mit der steirischen Fahrzeug- und Zulieferindustrie verbunden. Die Medizinische Universität zählt 5.903, die Universität für Musik und darstellende Kunst 2.390 Studierende.</p><p>Diese vier Häuser erzeugen vier sehr unterschiedliche Alltage: Semesterrhythmus und Hausarbeiten an der Uni, Laborzeiten und Projektarbeit an der TU, Dienstpläne am Klinikum, Probenpläne und Abendvorstellungen an der Kunstuniversität.</p><p>Statistisch schlägt sich das im Geschlechterverhältnis nieder: Auf 100 Frauen zwischen 30 und 49 kommen in Graz 109 Männer. Wer als Frau in dieser Stadt sucht, hat rechnerisch mehr Auswahl als in Wien – wer als Mann sucht, sollte entsprechend sorgfältiger schreiben.</p>",
  },
  {
    title: "Studium und Job gleichzeitig",
    html: "<p>60,1 Prozent der Grazer Studierenden unter 30 arbeiten nebenbei – österreichweit sind es 56,1 Prozent, und kein anderes Bundesland oder keine andere Landeshauptstadt liegt höher. Das prägt den Takt der Stadt: Vorlesung am Vormittag, Schicht am Nachmittag, Lernen am Abend.</p><p>Für Verabredungen bedeutet das zweierlei. Erstens: Spontaneität ist begrenzt, zwei Terminvorschläge sind hilfreicher als die Frage „Wann hast du Zeit?“. Zweitens: Viele bringen früh Berufserfahrung mit und wissen, wie man Prioritäten setzt – auch in einer Beziehung.</p><p>Der Arbeitsmarkt selbst ist breiter, als das Klischee der Studentenstadt vermuten lässt: 218.216 Beschäftigte in 28.198 Arbeitsstätten, und auf 100 auspendelnde Erwerbstätige kommen 132 einpendelnde. Graz zieht die ganze Region an.</p>",
  },
  {
    title: "Wie Graz wohnt",
    html: "<p>47,9 Prozent der Haushalte bestehen aus einer Person, die Mietquote liegt bei 59,2 Prozent, die durchschnittliche Wohnfläche bei 76,2 Quadratmetern – deutlich unter dem österreichischen Schnitt von 96,7. Graz ist also eine Stadt kleiner Wohnungen und kurzer Wege: 22 Minuten dauert der durchschnittliche Arbeitsweg.</p><p>Die Viertel sind klar unterscheidbar. Geidorf ist Universitätsviertel mit Altbau und Botanischem Garten. Lend und Gries am linken Murufer sind die kreative, jüngere Seite mit Lendplatz und Kunsthaus. Rund um die Inffeldgasse liegt der Technikcampus, rund um das LKH das Medizinviertel, im Süden die Neubaugebiete mit mehr Platz fürs Geld.</p><p>Wer neu ist, orientiert sich am besten an der Mur: Innenstadtseite für Kultur und Kaffeehaus, Lend-Seite für Lokale und Kreativszene, dazwischen die Murinsel als Treffpunkt, den jeder findet.</p>",
  },
  {
    title: "Termine, die den Einstieg leicht machen",
    html: "<p>Das beste akademische Format der Stadt kostet nichts: Die Montagsakademie der Universität Graz bringt allgemein verständliche Vorträge aus der Wissenschaft, frei zugänglich, zusätzlich live in Partnereinrichtungen und im Internet übertragen. Montagabend, anderthalb Stunden, danach ein Lokal – ein Ablauf, der sich seit Jahren bewährt.</p><p>Im Zwei-Jahres-Takt folgt die Lange Nacht der Forschung: Beim Durchgang am 24. April 2026 zählte Österreich über 3.000 Programmpunkte und mehr als 192.000 Besuchende, überall gratis; der nächste Termin ist der 19. Mai 2028. Im Sommer bespielt die Styriarte die Stadt mit klassischer Musik an ungewöhnlichen Orten.</p><p>Und wenn gar nichts geplant ist: Schlossberg hinauf, Uhrturm anschauen, auf der anderen Seite wieder hinunter. Die Grazer Variante des Spaziergangs, bei dem sich Gespräche von selbst ergeben.</p>",
  },
  {
    title: "Was die Zahlen nicht sagen",
    html: "<p>Die Studierendenzahlen zählen belegte Studien an öffentlichen Universitäten; wer parallel an zwei Universitäten eingeschrieben ist, erscheint doppelt. Fachhochschulen, Pädagogische Hochschulen und Privatuniversitäten sind in den 55.254 nicht enthalten – die tatsächliche Zahl der Studierenden in Graz liegt also höher.</p><p>Die hohe Akademikerquote ist zum Teil ein Effekt der Studierenden selbst: Eine Stadt mit vielen Hochschulen hat zwangsläufig viele Menschen mit oder kurz vor dem Abschluss. Und das Geschlechterverhältnis von 109 zu 100 ist ein Durchschnitt über zwanzig Jahrgänge, kein Versprechen für eine einzelne Altersgruppe.</p><p>Was bleibt: Graz ist jung, akademisch geprägt, kompakt und hat ein öffentliches Leben, das zum Kennenlernen einlädt. Wer hier niemanden trifft, hat meistens zu wenig das Haus verlassen – nicht zu wenig Auswahl gehabt.</p>",
  },
];

applySources(p, {
  "bev-alter": { publisher: "Statistik Austria", title: "Bevölkerungsstand zu Jahresbeginn 2026 nach Gemeinde, Alter in Einzeljahren und Geschlecht (Open Government Data, Datensatz OGD_bevstandjbab2002_BevStand_2026)", stand: "Stand 01.01.2026", url: "https://data.statistik.gv.at/web/meta.jsp?dataset=OGD_bevstandjbab2002_BevStand_2026" },
  "uni-stud": { publisher: "Statistik Austria", title: "Studierende an öffentlichen Universitäten nach Uni (Open Government Data, Datensatz OGD_unistud3_ext_UNI_STUD3_1)", stand: "Wintersemester 2025/26", url: "https://data.statistik.gv.at/web/meta.jsp?dataset=OGD_unistud3_ext_UNI_STUD3_1" },
});

checkSeo(p);
writeFileSync(file, JSON.stringify(p, null, 1) + "\n");
console.log("Graz geschrieben:", p.sources.length, "Quellen,", p.guide.length, "Guide-Kapitel,", p.universities.length, "Hochschulen");
