// Stadtdossier Wien ausbauen: Hochschulporträts aus der OGD-Unistatistik WS 2025/26, Akademikerquote je
// Gemeindebezirk (Abgestimmte Erwerbsstatistik 2024), Geschlechterverhältnis 30–49, Termine und Stadt-Guide.
import { readFileSync, writeFileSync } from "node:fs";
import { applySources, checkSeo } from "./_sources.mjs";

const file = "data/city-profiles/at/wien.json";
const p = JSON.parse(readFileSync(file, "utf8"));

p.seoTitle = "Akademiker Singles in Wien: 26 Hochschulen, 166.413";
p.seoDescription = "Wien in Zahlen: 26,4 % mit Hochschulabschluss, 166.413 Studierende an den öffentlichen Universitäten, 45,3 % Einpersonenhaushalte.";
p.eyebrow = "Partnersuche für Akademiker · Universitätsstadt an der Donau";
p.lead = "26 Hochschulen, 166.413 Studierende allein an den öffentlichen Universitäten und eine Universität, die seit 1365 besteht: Wien ist der größte Hochschulplatz des deutschsprachigen Raums nach Berlin und München. 26,4 Prozent der Menschen ab 15 Jahren haben einen Hochschul- oder Akademieabschluss, in 45,3 Prozent der Haushalte lebt nur eine Person – und zwischen Neubau (47,9 Prozent Akademikerquote) und Simmering (13,2 Prozent) liegen zwei verschiedene Städte. Dieses Dossier zeigt, wo Sie wen treffen.";

p.briefing = [
  { value: "26,4 %", label: "der Einwohnerinnen und Einwohner ab 15 Jahren haben einen Hochschul- oder Akademieabschluss – österreichweit 17,6 %", source: "aest-gemeinde" },
  { value: "166.413", label: "Studierende an den öffentlichen Universitäten in Wien im Wintersemester 2025/26", source: "uni-stud" },
  { value: "45,3 %", label: "aller Haushalte in Wien sind Einpersonenhaushalte", source: "aest-indikatoren" },
];

p.kpis = [
  { value: "2.040.914", label: "Einwohnerinnen und Einwohner in Wien (Hauptwohnsitz)", source: "einwohner", note: "Wohnbevölkerung am 01.01.2026; Summe der 23 Gemeindebezirke" },
  { value: "26", label: "Hochschulen in der Stadt", source: "wien-wirtschaft", note: "Angabe im Vorwort von „Wien in Zahlen – Wirtschaftsstandort 2024“ (Stadt Wien, MA 23)" },
  { value: "1.192.163", label: "Beschäftigte in Arbeitsstätten in Wien", source: "aest-gemeinde", note: "Beschäftigungsverhältnisse am Arbeitsort, Stichtag 31.10.2024" },
  { value: "103", label: "Männer je 100 Frauen in der Altersgruppe 30 bis 49", source: "bev-alter", note: "310.257 Männer und 302.581 Frauen am 01.01.2026 – ein nahezu ausgeglichenes Verhältnis; in Leoben sind es 115, in Krems 114" },
];

p.dossier = [
  {
    key: "bildung",
    title: "Bildung",
    intro: "Seit 1365 Universitätsstadt: In Wien hat mehr als jede vierte Person ab 15 Jahren einen Hochschul- oder Akademieabschluss, deutlich mehr als im Bundesschnitt.",
    metrics: [
      { value: "26,4 %", label: "der Einwohnerinnen und Einwohner ab 15 Jahren haben einen Hochschul-, Akademie- oder Kollegabschluss", source: "aest-gemeinde", note: "Abgestimmte Erwerbsstatistik 2024; berechnet rund 457.000 Personen (Anteil mal Bevölkerung ab 15 Jahren, auf Tausend gerundet); Österreich 17,6 %", compare: { city: 26.4, germany: 17.6, unit: " %", max: 32 } },
      { value: "37,9 %", label: "der Frauen ab 25 Jahren haben einen tertiären Abschluss (Männer: 37,6 %)", source: "aest-indikatoren", note: "Tertiärquote nach ISCED 2011, Abgestimmte Erwerbsstatistik 2024; Österreich: Frauen 28,9 %, Männer 31,8 %", compare: { city: 37.9, germany: 28.9, unit: " %", max: 46 } },
      { value: "166.413", label: "Studierende an den öffentlichen Universitäten in Wien, Wintersemester 2025/26", source: "uni-stud", note: "Berechnet: Universität Wien 87.161, Technische Universität Wien 27.264, Wirtschaftsuniversität Wien 23.003, Universität für Bodenkultur 10.413, Medizinische Universität Wien 9.040, Universität für Musik und darstellende Kunst 3.096, Veterinärmedizinische Universität 2.589, Universität für angewandte Kunst 2.131, Akademie der bildenden Künste 1.716; Mehrfachzählung bei Studium an mehreren Universitäten möglich; ohne Fachhochschulen, Pädagogische Hochschulen und Privatuniversitäten" },
    ],
    takeaway: "Ob Studium, Forschung oder Lehre: Hier treffen Sie Menschen, für die neugieriges Fragen zum Alltag gehört.",
  },
  {
    key: "beruf",
    title: "Beruf & Erfolg",
    intro: "Fast neun von zehn Beschäftigten arbeiten in Wien im Dienstleistungssektor – ein Arbeitsmarkt, der auch von Hochschulen und Forschung geprägt ist.",
    metrics: [
      { value: "88,8 %", label: "der Beschäftigten arbeiten am Arbeitsort Wien im Dienstleistungssektor", source: "aest-gemeinde", note: "Beschäftigte in Arbeitsstätten nach Wirtschaftssektoren, Abgestimmte Erwerbsstatistik 2024; Österreich 75,4 %", compare: { city: 88.8, germany: 75.4, unit: " %", max: 100 } },
      { value: "4,04 %", label: "Forschungsquote: F&E-Ausgaben in Prozent des Bruttoregionalprodukts", source: "wien-wirtschaft", note: "2021; rund 4,1 Mrd. € F&E-Ausgaben in Wien, nach Angabe der Stadt Wien fast ein Drittel aller österreichischen F&E-Ausgaben und Platz 2 unter den Bundesländern" },
      { value: "158.182", label: "Unternehmen mit Sitz in Wien", source: "aest-gemeinde", note: "Abgestimmte Erwerbsstatistik 2024 (Stichtag 31.10.2024); 2023 kamen nach Angabe der Stadt 9.483 Neugründungen dazu – rechnerisch alle 55 Minuten eine", compareSource: "wien-wirtschaft" },
    ],
    takeaway: "Wer hier sucht, begegnet Menschen mit Verantwortung im Beruf – und dem Wunsch, ihr Leben mit jemandem zu teilen, der das versteht.",
  },
  {
    key: "wohnen",
    title: "Wohnen & Bezirke",
    intro: "Wien ist nach Bezirken sortiert, auch nach Bildung: Zwischen Neubau und Simmering liegen 35 Prozentpunkte Akademikerquote.",
    metrics: [
      { value: "47,9 %", label: "Akademikerquote im 7. Bezirk (Neubau) – der höchste Wert aller Gemeindebezirke", source: "aest-bezirke", compareSource: "aest-bezirke", note: "Anteil der Bevölkerung ab 15 Jahren mit Hochschul-, Akademie- oder Kollegabschluss, Abgestimmte Erwerbsstatistik 2024. Es folgen Josefstadt (47,5 %), Innere Stadt (47,2 %) und Alsergrund (46,3 %); Schlusslichter sind Simmering (13,2 %) und Favoriten (15,0 %)", compare: { city: 47.9, germany: 13.2, unit: " %", max: 55, cityLabel: "Neubau", compareLabel: "Simmering" } },
      { value: "78,7 %", label: "Mietquote der Hauptwohnsitzwohnungen – der höchste Wert aller Bundesländer", source: "aest-indikatoren", note: "Abgestimmte Erwerbsstatistik 2024; Österreich 45,3 %. Wohneigentum spielt in Wien eine viel kleinere Rolle als im Rest des Landes", compare: { city: 78.7, germany: 45.3, unit: " %", max: 90 } },
      { value: "72,6", label: "Quadratmeter durchschnittliche Wohnfläche je Hauptwohnsitzwohnung – österreichweit 96,7", source: "aest-indikatoren", note: "Abgestimmte Erwerbsstatistik 2024; kleinere Wohnungen, dafür kurze Wege: Nur 11,9 % der Erwerbstätigen pendeln aus Wien aus" },
    ],
    takeaway: "Die Bezirksfrage ist in Wien eine Milieufrage – und sie entscheidet, wie weit der Heimweg nach einem guten Abend ist.",
  },
  {
    key: "singles",
    title: "Single-Leben",
    intro: "Wien ist jünger als der Bundesschnitt, in mehr als vier von zehn Haushalten lebt nur eine Person – und das Geschlechterverhältnis ist fast ausgeglichen.",
    metrics: [
      { value: "45,3 %", label: "Einpersonenhaushalte", source: "aest-indikatoren", note: "Abgestimmte Erwerbsstatistik 2024; Österreich 38,9 %", compare: { city: 45.3, germany: 38.9, unit: " %", max: 55 } },
      { value: "41,1", label: "Jahre Durchschnittsalter – 2,5 Jahre jünger als der österreichische Schnitt", source: "aest-indikatoren", note: "Abgestimmte Erwerbsstatistik 2024 (Stichtag 31.10.2024)", compare: { city: 41.1, germany: 43.6, unit: " J.", max: 52 } },
      { value: "103", label: "Männer je 100 Frauen zwischen 30 und 49 Jahren", source: "bev-alter", note: "310.257 Männer zu 302.581 Frauen am 01.01.2026. In kleineren Universitätsstädten mit technischem Schwerpunkt ist das Verhältnis deutlich unausgeglichener – in Leoben etwa 115 zu 100", compare: { city: 103, germany: 115, unit: "", max: 130, cityLabel: "Wien", compareLabel: "Leoben" } },
    ],
    takeaway: "Viele nehmen sich Zeit für Studium und Beruf – und suchen danach sehr bewusst jemanden, der die eigene Taktung versteht.",
  },
];

p.universities = [
  { name: "Universität Wien", kind: "Volluniversität", founded: "1365", students: "87.161", source: "uni-stud", compareSource: "univie-geschichte", text: "Die älteste Universität im deutschsprachigen Raum und mit 87.161 Studierenden die größte Hochschule Österreichs. Das Hauptgebäude am Universitätsring ist zugleich einer der zentralsten Treffpunkte der Stadt – und das Café davor Teil der Studienerfahrung." },
  { name: "Technische Universität Wien", kind: "Technische Universität", students: "27.264", source: "uni-stud", text: "Hauptgebäude am Karlsplatz, mitten im vierten Bezirk. Technik, Informatik, Architektur und Maschinenbau prägen das Haus – und damit auch die Freundeskreise, in denen Männer traditionell in der Mehrheit sind." },
  { name: "Wirtschaftsuniversität Wien", kind: "Wirtschaftsuniversität", students: "23.003", source: "uni-stud", text: "Der Campus am Welthandelsplatz neben dem Prater gehört zu den architektonisch auffälligsten Hochschulbauten Europas. 23.003 Studierende, viele davon international – und ein Campus, der auch ohne Studienausweis einen Spaziergang wert ist." },
  { name: "Universität für Bodenkultur (BOKU)", kind: "Universität für Lebensressourcen", students: "10.413", source: "uni-stud", text: "Nachhaltigkeit, Lebensmittel, Wasser, Wald: Die BOKU an der Türkenschanze ist die Universität für alle, die an Umwelt und Ressourcen arbeiten. Der Türkenschanzpark nebenan ist ihr inoffizieller Lesesaal." },
  { name: "Medizinische Universität Wien", kind: "Medizinische Universität", students: "9.040", source: "uni-stud", text: "Mit dem AKH verbunden, einem der größten Krankenhäuser Europas. Wer hier arbeitet, lebt in Diensten – ein Umstand, der beim Verabreden mehr zählt als jedes gemeinsame Hobby." },
  { name: "Kunstuniversitäten", kind: "mdw, Angewandte, Akademie der bildenden Künste", students: "6.943", source: "uni-stud", text: "Universität für Musik und darstellende Kunst (3.096), Universität für angewandte Kunst (2.131) und Akademie der bildenden Künste (1.716) bringen zusammen fast 7.000 Studierende in die Stadt – und einen großen Teil ihres Abendprogramms." },
];
p.universitiesNote = "Studierende an den öffentlichen Universitäten im Wintersemester 2025/26; Mehrfachzählung bei Studium an mehreren Universitäten möglich. Dazu kommen Fachhochschulen, Pädagogische Hochschulen und Privatuniversitäten – insgesamt zählt die Stadt 26 Hochschulen.";

p.quarters = [
  { name: "Neubau & Josefstadt", label: "Höchste Akademikerquote", text: "47,9 und 47,5 Prozent der Menschen ab 15 haben hier einen Hochschul-, Akademie- oder Kollegabschluss – die Spitzenwerte Wiens. Dazu Spittelberg, Museumsquartier und die kleinteiligste Lokalszene der Stadt. Wer im Siebten wohnt, hat sein Date in Gehdistanz.", source: "aest-bezirke" },
  { name: "Alsergrund", label: "Universitätsviertel", text: "46,3 Prozent Akademikerquote, AKH und Medizinische Universität im Bezirk, dazu Altbauten und der Servitenviertel-Grätzl. Das Viertel der Ärztinnen, Pflegenden und Forschenden – und der Menschen, die mit Nachtdiensten leben.", source: "aest-bezirke" },
  { name: "Innere Stadt & Wieden", label: "Zentrum und TU-Bezirk", text: "47,2 und 43,8 Prozent Akademikerquote. Im ersten Bezirk arbeiten 137.870 Menschen bei 16.264 Einwohnern; die Wieden rund um Karlsplatz und TU ist das dichteste Studierendenviertel der Innenstadt.", source: "aest-bezirke" },
  { name: "Währing & Döbling", label: "Bürgerlicher Westen", text: "44,3 und 36,3 Prozent Akademikerquote, dazu Türkenschanzpark, Weinberge und die ruhigsten Altbauwohnungen der Stadt. Hier wohnen viele, die das Studium hinter sich und die Familienplanung vor sich haben.", source: "aest-bezirke" },
  { name: "Leopoldstadt & Landstraße", label: "Donaukanal und Prater", text: "33,7 und 37,0 Prozent Akademikerquote – und zwei Bezirke, die sich in zehn Jahren stark verändert haben. WU-Campus, Karmelitermarkt und Donaukanal machen sie zu den beliebtesten Zuzugsadressen für Berufseinsteiger.", source: "aest-bezirke" },
  { name: "Favoriten & Simmering", label: "Das andere Wien", text: "15,0 und 13,2 Prozent Akademikerquote, dafür die größten Bezirke mit der jüngsten Bevölkerung. Wer behauptet, Wien sei eine Akademikerstadt, hat diese Bezirke nicht gesehen – sie zeigen, wie unterschiedlich dieselbe Stadt sein kann.", source: "aest-bezirke" },
];
p.quarterSources = ["aest-bezirke"];

p.agenda = [
  { title: "Wiener Ball der Wissenschaften", when: "Jänner, Rathaus", text: "Der Ball, auf dem Wissenschaft und Stadt zusammenkommen: 2027 am 23. Jänner im Wiener Rathaus. Ein Abend, an dem Hochschulen, Institute und Forschungseinrichtungen gemeinsam auftreten – und an dem Tanzschuhe keine akademische Hürde sind.", href: "https://www.wissenschaftsball.at/" },
  { title: "Lange Nacht der Forschung", when: "Alle zwei Jahre, österreichweit", text: "Österreichs größtes Wissenschaftsevent: Zuletzt am 24. April 2026 mit über 3.000 Programmpunkten und mehr als 192.000 Besucherinnen und Besuchern in allen neun Bundesländern, bei freiem Eintritt. Die nächste Ausgabe ist für den 19. Mai 2028 angekündigt.", href: "https://langenachtderforschung.at/" },
  { title: "Öffentliche Vorlesungen und Antrittsvorlesungen", when: "Semesterweise", text: "Die Wiener Universitäten öffnen zahlreiche Vorlesungen und Vortragsreihen für die Allgemeinheit. Ein Hörsaalabend kostet nichts, dauert anderthalb Stunden – und liefert ein Thema für das Lokal danach." },
  { title: "Spaziergang Prater Hauptallee", when: "Ganzjährig", text: "Die 4,5 Kilometer lange Allee ist der zuverlässigste Treffpunkt der Stadt: Man geht nebeneinander, redet, und niemand muss die Rechnung zahlen, bevor klar ist, ob es passt." },
];

p.talkingPoints = [
  { title: "Der Bezirk als Visitenkarte", text: "Zwischen Neubau (47,9 Prozent Akademikerquote) und Simmering (13,2 Prozent) liegen zwölf U-Bahn-Minuten und zwei Lebenswelten. In Wien sagt die Bezirksnummer mehr über den Alltag als der Beruf – und sie ist eine höfliche Art, danach zu fragen." },
  { title: "Mieten statt kaufen", text: "78,7 Prozent der Hauptwohnsitzwohnungen in Wien sind Mietwohnungen, österreichweit sind es 45,3 Prozent. Das prägt auch Beziehungen: Zusammenziehen ist hier seltener eine Frage von Krediten und öfter eine Frage von Gemeindebau, Genossenschaft oder Altbau." },
  { title: "Die Stadt der kurzen Wege", text: "Nur 11,9 Prozent der Wiener Erwerbstätigen pendeln aus der Stadt aus – der niedrigste Wert Österreichs. Wer sich hier verabredet, verbringt den Abend nicht im Auto. Dafür sind die Wohnungen mit durchschnittlich 72,6 Quadratmetern die kleinsten des Landes." },
];

p.faq = [
  { question: "Wie viele Akademiker leben in Wien?", answer: "26,4 Prozent der Einwohnerinnen und Einwohner ab 15 Jahren haben einen Hochschul-, Akademie- oder Kollegabschluss – rund 457.000 Personen (Abgestimmte Erwerbsstatistik 2024); österreichweit sind es 17,6 Prozent. Die Tertiärquote der Frauen ab 25 liegt bei 37,9 Prozent, die der Männer bei 37,6 Prozent." },
  { question: "In welchen Wiener Bezirken wohnen die meisten Akademiker?", answer: "Die höchsten Quoten haben Neubau (47,9 Prozent), Josefstadt (47,5), Innere Stadt (47,2), Alsergrund (46,3), Währing (44,3) und Wieden (43,8). Am unteren Ende liegen Simmering (13,2), Favoriten (15,0) und Floridsdorf (16,6). Grundlage ist die Abgestimmte Erwerbsstatistik 2024, Bevölkerung ab 15 Jahren." },
  { question: "Wie viele Studierende hat Wien?", answer: "An den öffentlichen Universitäten studieren im Wintersemester 2025/26 zusammen 166.413 Menschen – allein 87.161 an der Universität Wien, 27.264 an der TU Wien und 23.003 an der Wirtschaftsuniversität. Dazu kommen Fachhochschulen, Pädagogische Hochschulen und Privatuniversitäten; die Stadt zählt insgesamt 26 Hochschulen." },
  { question: "Gibt es in Wien viele Singles?", answer: "In 45,3 Prozent aller Haushalte lebt nur eine Person (Abgestimmte Erwerbsstatistik 2024, österreichweit 38,9 Prozent). Alleinlebend heißt nicht automatisch Single – die Zahl zeigt aber, wie verbreitet das Leben ohne Partner im selben Haushalt ist. Das Durchschnittsalter liegt bei 41,1 Jahren (Österreich 43,6)." },
  { question: "Gibt es in Wien mehr Männer oder Frauen?", answer: "In der Altersgruppe 30 bis 49 kommen auf 100 Frauen 103 Männer (310.257 zu 302.581 am 01.01.2026) – praktisch ausgeglichen. In kleineren Universitätsstädten mit technischem Schwerpunkt ist das Verhältnis deutlich schiefer, etwa in Leoben mit 115 Männern je 100 Frauen." },
  { question: "Wo lernen Akademiker in Wien Singles kennen?", answer: "Bei öffentlichen Vorlesungen der Universitäten, am Wiener Ball der Wissenschaften im Jänner, bei der Langen Nacht der Forschung, im MuseumsQuartier, im Burggarten oder bei einem Spaziergang über die Prater Hauptallee. Wer gezielt Menschen mit ähnlichem Bildungshintergrund sucht, findet sie bei AkademikerSingles: Jedes Profil wird manuell geprüft." },
  { question: "Ist die Anmeldung kostenlos?", answer: "Ja. Die Registrierung ist kostenfrei und beinhaltet die Basis-Mitgliedschaft. Damit legen Sie Ihr Profil an, nutzen den Fragenflirt und antworten kostenlos auf Nachrichten von Premium-Mitgliedern." },
];

p.guide = [
  {
    title: "Wien ist nicht eine Stadt, sondern 23",
    html: "<p>Keine andere Zahl beschreibt Wien so gut wie die Spannweite zwischen den Bezirken: In Neubau haben 47,9 Prozent der Menschen ab 15 Jahren einen Hochschul-, Akademie- oder Kollegabschluss, in Simmering 13,2 Prozent. Dazwischen liegen zwölf U-Bahn-Minuten. Wer in Wien sucht, sucht deshalb immer auch in einem Milieu.</p><p>Die Bezirke mit den höchsten Quoten sind die inneren Westbezirke: Neubau, Josefstadt, Innere Stadt, Alsergrund, Währing, Wieden, Mariahilf. Sie sind kleinteilig, dicht bebaut, haben viele Einpersonenhaushalte und die höchste Lokaldichte. Die großen Flächenbezirke im Süden und Osten – Favoriten, Simmering, Donaustadt, Floridsdorf – sind jünger, familiärer und preiswerter.</p><p>Das ist keine Wertung, sondern Planungshilfe. Wenn Sie Menschen mit ähnlichem Bildungsweg treffen wollen, lohnt es sich, Verabredungen dorthin zu legen, wo diese Menschen abends ohnehin sind. Und wenn Ihnen Herkunft und Abschluss weniger wichtig sind als Haltung, ist Wien groß genug, dass beides funktioniert.</p>",
  },
  {
    title: "166.413 Studierende und was daraus wird",
    html: "<p>Die Universität Wien besteht seit 1365 und ist mit 87.161 Studierenden die größte Hochschule Österreichs. Dazu kommen die TU Wien (27.264), die Wirtschaftsuniversität (23.003), die BOKU (10.413), die Medizinische Universität (9.040), die Veterinärmedizinische Universität (2.589) und die drei Kunstuniversitäten mit zusammen 6.943 Studierenden. Insgesamt zählt die Stadt 26 Hochschulen.</p><p>Diese Masse hat eine Folge, die man beim Daten spürt: Wien ist voll von Menschen Anfang bis Mitte dreißig, die gerade erst mit dem Studium fertig geworden sind – Doktorat, Zweitstudium, Berufseinstieg mit 28, erste feste Stelle mit 31. Die Lebensläufe verschieben sich nach hinten, die Partnersuche auch.</p><p>Wer das weiß, stellt die richtigen Fragen. Nicht „Was machst du beruflich?“, sondern „Woran arbeitest du gerade?“ – in einer Stadt mit dieser Hochschuldichte ist das fast immer die interessantere Antwort.</p>",
  },
  {
    title: "Arbeiten in Wien: Dienstleistung, Forschung, Verwaltung",
    html: "<p>1.192.163 Beschäftigte arbeiten in Wien, 88,8 Prozent davon im Dienstleistungssektor (Österreich: 75,4 Prozent). 158.182 Unternehmen haben hier ihren Sitz; 2023 kamen nach Angabe der Stadt 9.483 Neugründungen dazu, rechnerisch alle 55 Minuten eine.</p><p>Besonders relevant für diese Seite ist die Forschung: Mit einer Forschungsquote von 4,04 Prozent des Bruttoregionalprodukts liegt Wien an zweiter Stelle unter den Bundesländern, rund 4,1 Milliarden Euro flossen 2021 in Forschung und Entwicklung – fast ein Drittel der österreichischen F&E-Ausgaben.</p><p>Das erklärt, warum so viele Gespräche in dieser Stadt um Projekte, Förderanträge und Befristungen kreisen. Wer in Forschung oder Verwaltung arbeitet, kennt beides: lange Horizonte und unsichere Verlängerungen. Eine Partnerschaft, die das aushält, beginnt am besten damit, dass man offen darüber redet.</p>",
  },
  {
    title: "Wohnen, Mieten und die Frage nach dem Zusammenziehen",
    html: "<p>78,7 Prozent der Wiener Hauptwohnsitzwohnungen sind Mietwohnungen – mit Abstand der höchste Wert Österreichs, wo der Durchschnitt bei 45,3 Prozent liegt. Die Wohnungen sind mit durchschnittlich 72,6 Quadratmetern die kleinsten des Landes (Österreich: 96,7).</p><p>Für Paare hat das praktische Folgen. Zusammenziehen bedeutet in Wien fast nie Hauskauf, sondern Wohnungstausch, Gemeindebau-Vormerkung oder Genossenschaft. Es geht schneller als in Eigentumsmärkten, ist aber auch leichter wieder rückgängig zu machen – was manche als Freiheit und andere als Unverbindlichkeit erleben.</p><p>Dafür sind die Wege kurz: Nur 11,9 Prozent der Wiener Erwerbstätigen pendeln aus der Stadt aus, der niedrigste Wert Österreichs. Ein Abendtermin um 19 Uhr ist hier realistisch, auch unter der Woche.</p>",
  },
  {
    title: "Wo man sich verabredet",
    html: "<p>Wien macht es Suchenden leicht, weil die Stadt öffentliche Orte in hoher Dichte anbietet. Tagsüber: Burggarten, Türkenschanzpark, Augarten, Prater Hauptallee. Abends: MuseumsQuartier, Naschmarkt, Stadtpark, die Lokale rund um Spittelberg und Karmelitermarkt.</p><p>Für Menschen mit akademischem Hintergrund gibt es dazu Formate, die ein Gespräch gleich mitliefern. Die Universitäten öffnen Vorlesungen und Antrittsvorlesungen für alle. Alle zwei Jahre kommt die Lange Nacht der Forschung dazu – zuletzt am 24. April 2026 mit über 3.000 Programmpunkten und mehr als 192.000 Besuchenden österreichweit, bei freiem Eintritt; die nächste ist für den 19. Mai 2028 angekündigt.</p><p>Und einmal im Jahr tanzt die Wissenschaft: Der Wiener Ball der Wissenschaften findet 2027 am 23. Jänner im Rathaus statt. Für ein zweites oder drittes Treffen ist das eine der charmantesten Einladungen, die Wien zu bieten hat.</p>",
  },
  {
    title: "Was die Zahlen nicht sagen",
    html: "<p>Alle Werte dieser Seite stammen aus amtlichen Quellen und sind unten mit Stand aufgeführt. Trotzdem gilt: Die Studierendenzahlen zählen belegte Studien an öffentlichen Universitäten; wer an zwei Universitäten eingeschrieben ist, erscheint doppelt. Fachhochschulen, Pädagogische Hochschulen und Privatuniversitäten sind in den 166.413 nicht enthalten.</p><p>Die Akademikerquote je Bezirk bezieht sich auf die Bevölkerung ab 15 Jahren – in Bezirken mit vielen jungen Familien drückt das den Wert, unabhängig vom Bildungsstand der Erwachsenen. Und ein Einpersonenhaushalt ist kein Beziehungsstatus: Viele der 45,3 Prozent leben in einer festen Partnerschaft, nur eben in zwei Wohnungen.</p><p>Was bleibt: Wien bietet die größte Dichte an Hochschulabsolventen im deutschsprachigen Raum außerhalb Deutschlands, ein nahezu ausgeglichenes Geschlechterverhältnis in der entscheidenden Altersgruppe und kurze Wege. Der Rest ist eine Frage des ersten Gesprächs.</p>",
  },
];

applySources(p, {
  "aest-bezirke": { publisher: "Statistik Austria", title: "Abgestimmte Erwerbsstatistik 2024, Gemeindeergebnisse (Blatt „Gemeindetab“, Gebietsstand 2026): Bevölkerung ab 15 Jahren mit Hochschul-, Akademie- oder Kollegabschluss je Wiener Gemeindebezirk", stand: "Stichtag 31.10.2024, erstellt 09.06.2026", url: "https://www.statistik.at/fileadmin/pages/54/AEST_Gemeindeergebnisse_2024.ods" },
  "bev-alter": { publisher: "Statistik Austria", title: "Bevölkerungsstand zu Jahresbeginn 2026 nach Gemeinde, Alter in Einzeljahren und Geschlecht (Open Government Data, Datensatz OGD_bevstandjbab2002_BevStand_2026)", stand: "Stand 01.01.2026", url: "https://data.statistik.gv.at/web/meta.jsp?dataset=OGD_bevstandjbab2002_BevStand_2026" },
  "uni-stud": { publisher: "Statistik Austria", title: "Studierende an öffentlichen Universitäten nach Uni (Open Government Data, Datensatz OGD_unistud3_ext_UNI_STUD3_1)", stand: "Wintersemester 2025/26", url: "https://data.statistik.gv.at/web/meta.jsp?dataset=OGD_unistud3_ext_UNI_STUD3_1" },
});

checkSeo(p);
writeFileSync(file, JSON.stringify(p, null, 1) + "\n");
console.log("Wien geschrieben:", p.sources.length, "Quellen,", p.guide.length, "Guide-Kapitel,", p.universities.length, "Hochschulen");
