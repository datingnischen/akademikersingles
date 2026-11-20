// Neues Stadtdossier Klagenfurt am Wörthersee: Universität Klagenfurt, Lakeside Park und die einzige
// Landeshauptstadt unseres Dossiers mit leichtem Frauenüberschuss in der Altersgruppe 30 bis 49.
// Karte danach erzeugen: python scripts/build_city_map.py at/klagenfurt
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { applySources, checkSeo } from "./_sources.mjs";

const file = "data/city-profiles/at/klagenfurt.json";
const old = existsSync(file) ? JSON.parse(readFileSync(file, "utf8")) : {};

const p = {
  path: "/partnersuche/klagenfurt/",
  name: "Klagenfurt",
  heroAlt: "Aquarellzeichnung von Klagenfurt mit dem Lindwurm am Neuen Platz und dem Wörthersee im Hintergrund",
  country: "Österreich",
  region: "Kärnten",
  seoTitle: "Akademiker Singles in Klagenfurt: Uni und Wörthersee",
  seoDescription: "Klagenfurt in Zahlen: 13.655 Studierende, 48,2 % Einpersonenhaushalte und als einzige Landeshauptstadt ein leichter Frauenüberschuss bei 30 bis 49.",
  eyebrow: "Partnersuche für Akademiker · Universitätsstadt am Wörthersee",
  lead: "Klagenfurt ist die einzige Landeshauptstadt in unseren Dossiers, in der auf 100 Frauen zwischen 30 und 49 keine 100 Männer kommen – das Verhältnis liegt bei 99 zu 100. Dazu kommen eine Universität mit mehr als 13.700 Studierenden, der Lakeside Science & Technology Park direkt am Campus und 48,2 Prozent Einpersonenhaushalte. Zwischen Neuem Platz, Lendkanal und Wörthersee ist die Stadt klein genug, dass man sich zweimal begegnet – und groß genug, dass es nicht peinlich wird.",
  briefing: [
    { value: "22,3 %", label: "der Einwohnerinnen und Einwohner ab 15 Jahren haben einen Hochschul-, Akademie- oder Kollegabschluss – österreichweit 17,6 %", source: "aest-gemeinde" },
    { value: "13.655", label: "Studierende an der Universität Klagenfurt", source: "uni-stud", note: "Wintersemester 2025/26; die Universität selbst nennt mehr als 13.700 Studierende, davon rund 3.000 aus dem Ausland" },
    { value: "99", label: "Männer je 100 Frauen in der Altersgruppe 30 bis 49", source: "bev-alter" },
  ],
  kpis: [
    { value: "105.200", label: "Einwohnerinnen und Einwohner in Klagenfurt", source: "aest-gemeinde", note: "Abgestimmte Erwerbsstatistik 2024, Stichtag 31.10.2024" },
    { value: "77.547", label: "Beschäftigte in Klagenfurter Arbeitsstätten", source: "aest-gemeinde", note: "11.264 Arbeitsstätten, 9.319 Unternehmen; Beschäftigungsverhältnisse am Arbeitsort" },
    { value: "48,2 %", label: "Einpersonenhaushalte – gleichauf mit Innsbruck", source: "aest-indikatoren", note: "Abgestimmte Erwerbsstatistik 2024; Kärnten 40,1 %, Österreich 38,9 %" },
    { value: "146", label: "Einpendelnde je 100 Auspendelnde", source: "aest-indikatoren", note: "Pendlersaldo nach der Abgestimmten Erwerbsstatistik 2024; nur 27,2 % der Klagenfurter Erwerbstätigen pendeln aus" },
  ],
  dossier: [
    {
      key: "bildung",
      title: "Bildung",
      intro: "Eine Universität, eine Fachhochschule und eine Pädagogische Hochschule auf rund 105.000 Einwohner – und ein Forschungspark direkt neben dem Campus.",
      metrics: [
        { value: "22,3 %", label: "der Einwohnerinnen und Einwohner ab 15 Jahren haben einen Hochschul-, Akademie- oder Kollegabschluss", source: "aest-gemeinde", note: "Abgestimmte Erwerbsstatistik 2024; Kärnten 14,9 %, Österreich 17,6 %", compare: { city: 22.3, germany: 17.6, unit: " %", max: 32 } },
        { value: "35,8 %", label: "Tertiärquote der Männer ab 25 Jahren (Frauen: 35,4 %)", source: "aest-indikatoren", note: "ISCED 2011, Abgestimmte Erwerbsstatistik 2024; Kärnten 30,0 % (Männer) und 27,6 % (Frauen). Frauen und Männer liegen in Klagenfurt praktisch gleichauf", compare: { city: 35.8, germany: 31.8, unit: " %", max: 46 } },
        { value: "41,4 %", label: "der 20- bis 24-Jährigen sind in weiterführender Ausbildung", source: "aest-indikatoren", note: "Abgestimmte Erwerbsstatistik 2024; Kärnten 34,5 %, Österreich 33,5 %" },
      ],
      takeaway: "Hier studiert man am See und forscht im Park nebenan – eine Kombination, die es sonst nirgends in Österreich gibt.",
    },
    {
      key: "beruf",
      title: "Beruf & Erfolg",
      intro: "Verwaltung, Gesundheitswesen, Handel und ein wachsender Technologiesektor rund um den Lakeside Park prägen den Arbeitsmarkt.",
      metrics: [
        { value: "77.547", label: "Beschäftigte in Klagenfurter Arbeitsstätten", source: "aest-gemeinde", note: "11.264 Arbeitsstätten, 89,8 % davon im tertiären Sektor; Stichtag 31.10.2024" },
        { value: "146", label: "Einpendelnde je 100 Auspendelnde", source: "aest-indikatoren", note: "Abgestimmte Erwerbsstatistik 2024; die durchschnittliche Wegzeit zur Arbeit beträgt 24 Minuten bei 30 Straßenkilometern Pendeldistanz" },
        { value: "50,8 %", label: "der Studierenden unter 30 sind erwerbstätig – der niedrigste Wert aller Landeshauptstädte", source: "aest-indikatoren", note: "Abgestimmte Erwerbsstatistik 2024; Österreich 56,1 %, Graz 60,1 %. In Klagenfurt bleibt neben dem Studium mehr Zeit – auch für anderes" },
      ],
      takeaway: "Wer hier arbeitet, hat selten lange Wege und fast immer einen See in Reichweite.",
    },
    {
      key: "wohnen",
      title: "Wohnen & Alltag",
      intro: "Mehr Quadratmeter als in Wien, fast jeder zweite Haushalt allein: Klagenfurt verbindet Platz mit städtischer Struktur.",
      metrics: [
        { value: "48,2 %", label: "Einpersonenhaushalte", source: "aest-indikatoren", note: "Abgestimmte Erwerbsstatistik 2024; Kärnten 40,1 %, Österreich 38,9 %. 53.825 Privathaushalte mit durchschnittlich 1,92 Personen", compare: { city: 48.2, germany: 38.9, unit: " %", max: 55 } },
        { value: "85,4", label: "Quadratmeter durchschnittliche Wohnfläche – deutlich mehr als in Wien (72,6) oder Innsbruck (74,2)", source: "aest-indikatoren", note: "Abgestimmte Erwerbsstatistik 2024; Österreich 96,7 Quadratmeter" },
        { value: "55,5 %", label: "Mietquote der Hauptwohnsitzwohnungen", source: "aest-indikatoren", note: "Abgestimmte Erwerbsstatistik 2024; Kärnten 37,3 %, Österreich 45,3 %" },
      ],
      takeaway: "Genug Platz für zwei, ohne dass gleich ein Hauskauf im Raum steht – das macht das Zusammenziehen hier leichter.",
    },
    {
      key: "singles",
      title: "Single-Leben",
      intro: "Die einzige Landeshauptstadt unseres Dossiers, in der Frauen in der Altersgruppe 30 bis 49 leicht in der Mehrheit sind.",
      metrics: [
        { value: "99", label: "Männer je 100 Frauen zwischen 30 und 49 Jahren", source: "bev-alter", note: "13.992 Männer zu 14.069 Frauen am 01.01.2026. In Graz sind es 109, in Innsbruck 110, in Leoben 115 – Klagenfurt ist die Ausnahme", compare: { city: 99.5, germany: 109, unit: "", max: 125 } },
        { value: "44,9", label: "Jahre Durchschnittsalter", source: "aest-indikatoren", note: "Abgestimmte Erwerbsstatistik 2024; Kärnten 46,0 Jahre, Österreich 43,6. Klagenfurt ist jünger als sein Bundesland, aber älter als Graz oder Innsbruck", compare: { city: 44.9, germany: 43.6, unit: " J.", max: 52 } },
        { value: "21,3 %", label: "der Bevölkerung haben keine österreichische Staatsangehörigkeit", source: "aest-gemeinde", note: "Abgestimmte Erwerbsstatistik 2024; Kärnten 13,5 %. Nähe zu Italien und Slowenien sowie rund 3.000 internationale Studierende prägen die Stadt", compareSource: "aau-profil" },
      ],
      takeaway: "Für Männer rechnerisch die freundlichste Landeshauptstadt Österreichs – und für Frauen eine Stadt mit überschaubarem, aber ernsthaftem Markt.",
    },
  ],
  universities: [
    { name: "Universität Klagenfurt", kind: "Volluniversität", founded: "1970", students: "13.655", source: "uni-stud", compareSource: "aau-profil", text: "Eine der sechs staatlichen Universitäten Österreichs mit breitem Fächerspektrum: vier Fakultäten, 30 Institute, rund 1.700 Mitarbeitende und nach eigenen Angaben mehr als 13.700 Studierende, davon etwa 3.000 aus dem Ausland. Forschungscluster sind Energiemanagement, Nachhaltigkeit, selbstorganisierende Systeme und visuelle Kultur." },
    { name: "Lakeside Science & Technology Park", kind: "Technologiepark am Campus", students: "", source: "aau-profil", text: "Direkt neben der Universität liegt der Technologiepark, in dem Forschungsgruppen und Technologieunternehmen zusammenarbeiten. Wer in Klagenfurt in IT, Elektronik oder Systemtechnik arbeitet, arbeitet mit hoher Wahrscheinlichkeit hier." },
    { name: "Fachhochschule Kärnten", kind: "Fachhochschule, Standort Klagenfurt", students: "", source: "aest-gemeinde", text: "Gesundheit und Soziales am Standort Klagenfurt-Primoschgasse, Technik und Wirtschaft an den weiteren Kärntner Standorten. Berufsbegleitende Studiengänge bringen ein älteres Publikum mit Berufserfahrung." },
    { name: "Pädagogische Hochschule Kärnten", kind: "Pädagogische Hochschule", students: "", source: "aest-gemeinde", text: "Die Lehrerinnen- und Lehrerbildung des Bundeslandes sitzt in Klagenfurt – und sorgt für eine der wenigen akademischen Berufsgruppen in Kärnten, die flächendeckend gebraucht wird." },
  ],
  universitiesNote: "Studierende an öffentlichen Universitäten im Wintersemester 2025/26; Fachhochschule und Pädagogische Hochschule sind nicht enthalten.",
  clusters: [
    { name: "Hochschulen & Forschung", text: "13.655 Studierende an der Universität Klagenfurt (Wintersemester 2025/26), dazu Fachhochschule Kärnten und Pädagogische Hochschule. Die Universität nennt vier Fakultäten und 30 Institute." },
    { name: "Technologie & Elektronik", text: "Rund um den Lakeside Science & Technology Park am Campus haben sich Forschungsgruppen und Technologieunternehmen angesiedelt – der Kern der Kärntner IT- und Elektronikszene." },
    { name: "Öffentliche Verwaltung", text: "Als Landeshauptstadt beherbergt Klagenfurt die Kärntner Landesverwaltung; 89,8 % der Arbeitsstätten entfallen auf den tertiären Sektor (Abgestimmte Erwerbsstatistik 2024)." },
    { name: "Gesundheit & Soziales", text: "Das Klinikum Klagenfurt am Wörthersee ist das größte Krankenhaus Kärntens und einer der größten Arbeitgeber der Stadt; die FH Kärnten bildet am Standort Klagenfurt Gesundheitsberufe aus." },
    { name: "Tourismus am Wörthersee", text: "Der Wörthersee reicht bis an die Stadtgrenze; Strandbad, Europapark und Seepromenade gehören zum Alltag und nicht nur zur Ferienzeit." },
  ],
  clusterSources: ["uni-stud", "aest-gemeinde", "aau-profil"],
  places: [
    { name: "Universität Klagenfurt", kind: "work", district: "Waidmannsdorf · Universitätsstraße", text: "Vier Fakultäten, 30 Institute und mehr als 13.700 Studierende – und das alles 15 Gehminuten vom Wörthersee entfernt.", lat: 46.6164, lon: 14.2647 },
    { name: "Lakeside Science & Technology Park", kind: "work", district: "Waidmannsdorf · Lakeside", text: "Technologiepark direkt am Campus: Forschungsgruppen und Unternehmen aus IT, Elektronik und Systemtechnik unter einem Dach.", lat: 46.6139, lon: 14.2643 },
    { name: "Klinikum Klagenfurt am Wörthersee", kind: "work", district: "St. Peter · Feschnigstraße", text: "Das größte Krankenhaus Kärntens und einer der größten Arbeitgeber der Stadt – mit entsprechend vielen Dienstplänen im Freundeskreis.", lat: 46.6344, lon: 14.3055 },
    { name: "Fachhochschule Kärnten", kind: "work", district: "St. Ruprecht · Primoschgasse", text: "Am Standort Klagenfurt bildet die FH Kärnten Gesundheits- und Sozialberufe aus, viele davon berufsbegleitend.", lat: 46.6104, lon: 14.3305 },
    { name: "Landesmuseum Kärnten", kind: "work", district: "Innere Stadt · Museumgasse", text: "Landessammlung und Forschungseinrichtung zugleich – und ein Ort, an dem Klagenfurt seine Geschichte ernsthaft verhandelt.", lat: 46.621, lon: 14.3125 },
    { name: "Neuer Platz mit Lindwurm", kind: "date", district: "Innere Stadt", text: "Der zentrale Platz der Stadt mit dem Lindwurmbrunnen: Treffpunkt, an dem sich niemand verlaufen kann.", lat: 46.6242, lon: 14.3071 },
    { name: "Stadttheater Klagenfurt", kind: "date", district: "Innere Stadt · Theaterplatz", text: "Schauspiel, Oper und Konzert in einem Haus – mit Vorstellungsbeginn, der einen frühen Abend verlässlich strukturiert.", lat: 46.6306, lon: 14.3066 },
    { name: "Europapark & Minimundus", kind: "date", district: "Waidmannsdorf · Villacher Straße", text: "Weitläufige Parkanlage zwischen Stadt und See, dazu der Modellpark Minimundus – gut für einen Spaziergang ohne Programmdruck.", lat: 46.6208, lon: 14.2597 },
    { name: "Strandbad Klagenfurt", kind: "date", district: "Wörthersee · Ostbucht", text: "Das größte Strandbad am Wörthersee gehört der Stadt und liegt am Ende der Europapark-Achse. Von Mai bis September der naheliegendste Treffpunkt.", lat: 46.6186, lon: 14.2551 },
    { name: "Kreuzbergl", kind: "date", district: "Kreuzbergl · Waldweg", text: "Der Hausberg direkt über der Stadt: Spazierwege, Sternwarte und Blick über Klagenfurt bis zum See.", lat: 46.6317, lon: 14.2766 },
  ],
  map: {
    bounds: { west: 14.24, east: 14.35, south: 46.59, north: 46.65 },
    rivers: [],
    areas: [],
    labels: [
      { text: "Wörthersee", lat: 46.6155, lon: 14.2555 },
      { text: "Glan", lat: 46.6395, lon: 14.288 },
      { text: "Innere Stadt", lat: 46.6245, lon: 14.3085, district: true },
      { text: "Waidmannsdorf", lat: 46.6155, lon: 14.2795, district: true },
      { text: "St. Ruprecht", lat: 46.6105, lon: 14.3245, district: true },
      { text: "St. Peter", lat: 46.6355, lon: 14.3105, district: true },
      { text: "Welzenegg", lat: 46.6265, lon: 14.3335, district: true },
      { text: "Annabichl", lat: 46.6455, lon: 14.3195, district: true },
    ],
  },
  mapSpec: { rivers: [{ name: "Glan", major: true }, { name: "Lendkanal" }, { name: "Glanfurt" }], lakes: ["Wörther See", "Wörthersee"], parks: ["Europapark", "Schillerpark", "Kreuzbergl"], boundary: "Klagenfurt am Wörthersee" },
  quarters: [
    { name: "Waidmannsdorf", label: "Campusviertel", text: "Universität, Lakeside Park, Studierendenheime und der Weg zum Strandbad liegen hier beieinander. Das Viertel, in dem Klagenfurt am jüngsten ist." },
    { name: "Innere Stadt", label: "Zentrum", text: "Neuer Platz, Alter Platz, Landhaus und die Lokale in den Innenhöfen. Kurze Wege, viel Gastronomie – und abends überschaubar genug, dass man bekannte Gesichter trifft." },
    { name: "St. Ruprecht & Viktring", label: "Südlich der Stadt", text: "Gewachsene Wohnviertel mit mehr Fläche fürs Geld, FH-Standort Primoschgasse und kurzer Weg zum Stift Viktring mit seinem Kultursommer." },
    { name: "St. Peter & Annabichl", label: "Norden", text: "Rund um Klinikum und Flughafen: viele Beschäftigte im Gesundheitswesen, ruhige Wohnlagen und die beste Anbindung Richtung St. Veit." },
    { name: "Wörthersee-Ostbucht", label: "Seeufer", text: "Strandbad, Europapark und Seepromenade gehören zur Stadt und nicht zur Ferienregion. Wer hier wohnt, zahlt mehr Miete und spart die Fahrt an den See." },
    { name: "Welzenegg & Wölfnitz", label: "Wohnviertel am Rand", text: "Einfamilienhäuser, Genossenschaftsbauten und der Hausberg in Sichtweite. Die Adresse für alle, die nach der Stadtwohnung Platz brauchen." },
  ],
  agenda: [
    { title: "Lange Nacht der Forschung", when: "Alle zwei Jahre", text: "Zuletzt am 24. April 2026 mit österreichweit über 3.000 Programmpunkten und mehr als 192.000 Besuchenden bei freiem Eintritt; die nächste Ausgabe ist für den 19. Mai 2028 angekündigt. In Klagenfurt öffnen Universität, Lakeside Park und Fachhochschule ihre Labore.", href: "https://langenachtderforschung.at/" },
    { title: "Sommer am Wörthersee", when: "Mai bis September", text: "Strandbad, Seepromenade und die Bäder rund um die Ostbucht ersetzen in Klagenfurt den halben Veranstaltungskalender. Ein Treffen am See kostet den Eintritt – und sonst nichts." },
    { title: "Stadttheater Klagenfurt", when: "Spielzeit September bis Juni", text: "Oper, Schauspiel und Konzert in einem Haus mitten in der Stadt. Für ein zweites Treffen die zuverlässigste Verabredung mit klarem Anfang und Ende.", href: "https://www.stadttheater-klagenfurt.at/" },
    { title: "Kreuzbergl-Runde", when: "Ganzjährig", text: "Vom Zentrum in 20 Minuten auf den Hausberg, oben die Sternwarte und der Blick über Stadt und See. Das Klagenfurter Gegenstück zum Kaffeehaus-Date." },
  ],
  talkingPoints: [
    { title: "Die Ausnahme in der Statistik", text: "99 Männer je 100 Frauen zwischen 30 und 49 – Klagenfurt ist die einzige Landeshauptstadt in unseren Dossiers mit leichtem Frauenüberschuss. In Graz (109), Innsbruck (110) und Leoben (115) sieht es umgekehrt aus. Für Männer ist das rechnerisch die beste Ausgangslage des Landes." },
    { title: "Universität mit Seeblick", text: "Der Campus liegt in Waidmannsdorf, der Wörthersee 15 Gehminuten entfernt, dazwischen der Lakeside Science & Technology Park. Diese Kombination aus Forschung und Freibad gibt es in Österreich sonst nirgends – und sie prägt den Tagesrhythmus im Sommer spürbar." },
    { title: "Kärnten, Italien, Slowenien", text: "21,3 Prozent der Klagenfurterinnen und Klagenfurter haben keine österreichische Staatsangehörigkeit, die Universität zählt rund 3.000 internationale Studierende. Die Nähe zu Italien und Slowenien ist hier kein Reiseversprechen, sondern Alltag." },
  ],
  faq: [
    { question: "Wie viele Akademiker leben in Klagenfurt?", answer: "22,3 Prozent der Einwohnerinnen und Einwohner ab 15 Jahren haben einen Hochschul-, Akademie- oder Kollegabschluss (Abgestimmte Erwerbsstatistik 2024; Kärnten 14,9 Prozent, Österreich 17,6 Prozent). Die Tertiärquote ab 25 Jahren liegt bei 35,8 Prozent (Männer) und 35,4 Prozent (Frauen) – Frauen und Männer sind praktisch gleichauf." },
    { question: "Gibt es in Klagenfurt mehr Männer oder Frauen?", answer: "Klagenfurt ist die Ausnahme unter den Landeshauptstädten: In der Altersgruppe 30 bis 49 kommen auf 100 Frauen nur 99 Männer (13.992 zu 14.069 am 01.01.2026). In Graz sind es 109, in Innsbruck 110 und in Leoben 115 Männer je 100 Frauen." },
    { question: "Wie viele Studierende hat Klagenfurt?", answer: "An der Universität Klagenfurt sind im Wintersemester 2025/26 13.655 Studierende inskribiert (Statistik Austria); die Universität selbst nennt mehr als 13.700 Studierende, davon rund 3.000 aus dem Ausland. Dazu kommen die Fachhochschule Kärnten und die Pädagogische Hochschule Kärnten." },
    { question: "Was macht die Universität Klagenfurt besonders?", answer: "Sie wurde 1970 gegründet und gehört zu den sechs staatlichen Universitäten Österreichs mit breitem Fächerspektrum. Vier Fakultäten, 30 Institute und rund 1.700 Mitarbeitende arbeiten an Forschungsclustern zu Energiemanagement, Nachhaltigkeit, selbstorganisierenden Systemen und visueller Kultur. Direkt am Campus liegt der Lakeside Science & Technology Park." },
    { question: "Gibt es in Klagenfurt viele Singles?", answer: "48,2 Prozent der Haushalte sind Einpersonenhaushalte – gleichauf mit Innsbruck und deutlich über dem Bundesschnitt von 38,9 Prozent. Die Stadt zählt 53.825 Privathaushalte mit durchschnittlich 1,92 Personen. Alleinlebend heißt dabei nicht automatisch Single." },
    { question: "Wo lernen Akademiker in Klagenfurt Singles kennen?", answer: "Am Campus und im Lakeside Park, bei der Langen Nacht der Forschung, im Stadttheater, am Neuen Platz, im Europapark oder im Sommer im Strandbad an der Ostbucht. Wer gezielt Menschen mit ähnlichem Bildungshintergrund sucht, findet sie bei AkademikerSingles: Jedes Profil wird manuell geprüft." },
    { question: "Ist die Anmeldung kostenlos?", answer: "Ja. Die Registrierung ist kostenfrei und beinhaltet die Basis-Mitgliedschaft. Damit legen Sie Ihr Profil an, nutzen den Fragenflirt und antworten kostenlos auf Nachrichten von Premium-Mitgliedern." },
  ],
  guide: [
    {
      title: "Die Landeshauptstadt, in der die Statistik für Männer spricht",
      html: "<p>In fast allen österreichischen Städten gibt es in der Altersgruppe 30 bis 49 mehr Männer als Frauen: Graz kommt auf 109 Männer je 100 Frauen, Innsbruck auf 110, Leoben sogar auf 115. Klagenfurt ist die Ausnahme – hier stehen 13.992 Männern 14.069 Frauen gegenüber, also 99 zu 100.</p><p>Das klingt nach einer Kleinigkeit, verändert aber die Perspektive. In technisch geprägten Universitätsstädten beklagen Frauen oft zu viele gleichförmige Anfragen und Männer zu wenige Antworten. In Klagenfurt ist dieser Effekt schwächer, weil der Markt ausgeglichen ist – und weil die Stadt mit rund 105.000 Einwohnern klein genug bleibt, dass Kontakte nicht im Rauschen untergehen.</p><p>Gleichzeitig gilt: 48,2 Prozent der Haushalte bestehen aus einer Person. Klagenfurt hat also viele Alleinlebende und einen überschaubaren, aber ernsthaften Partnermarkt. Wer hier sucht, sucht selten anonym.</p>",
    },
    {
      title: "Eine Universität von 1970 – und ein Forschungspark daneben",
      html: "<p>Die Universität Klagenfurt wurde 1970 gegründet und gehört heute zu den sechs staatlichen Universitäten Österreichs mit breitem Fächerspektrum. Vier Fakultäten, 30 Institute, rund 1.700 Mitarbeitende und nach eigenen Angaben mehr als 13.700 Studierende, davon etwa 3.000 aus dem Ausland. Statistik Austria zählt für das Wintersemester 2025/26 13.655 Studierende.</p><p>Das Besondere liegt gleich nebenan: Der Lakeside Science & Technology Park grenzt direkt an den Campus und bringt Forschungsgruppen und Technologieunternehmen zusammen. Wer in Kärnten in IT, Elektronik oder Systemtechnik arbeitet, hat mit hoher Wahrscheinlichkeit hier zu tun. Dazu kommen die Fachhochschule Kärnten mit ihrem Standort in der Primoschgasse und die Pädagogische Hochschule.</p><p>Für Gespräche ist diese Struktur dankbar: Fast jede akademische Biografie in Klagenfurt lässt sich einem dieser drei Häuser zuordnen – und die Wege zwischen ihnen sind kurz genug, dass man sich kennt.</p>",
    },
    {
      title: "Arbeiten mit 24 Minuten Arbeitsweg",
      html: "<p>77.547 Beschäftigte arbeiten in 11.264 Klagenfurter Arbeitsstätten, 89,8 Prozent davon im tertiären Sektor. Auf 100 Auspendelnde kommen 146 Einpendelnde – Klagenfurt ist Arbeitsort für halb Kärnten. Die durchschnittliche Wegzeit zur Arbeit beträgt 24 Minuten.</p><p>Ein Detail aus der Statistik erzählt viel über den Alltag: Nur 50,8 Prozent der Studierenden unter 30 sind erwerbstätig – der niedrigste Wert aller Landeshauptstädte (Österreich: 56,1 Prozent, Graz: 60,1 Prozent). In Klagenfurt bleibt neben dem Studium mehr Zeit. Das merkt man an den Seebädern im Sommer, an den Vereinen und daran, wie leicht sich hier Verabredungen am frühen Abend treffen lassen.</p><p>Wer beruflich einsteigt, findet die größten Arbeitgeber in Landesverwaltung, Klinikum, Handel und im Technologiesektor rund um den Lakeside Park. Konzernzentralen gibt es wenige – dafür viele Positionen mit Verantwortung in überschaubaren Organisationen.</p>",
    },
    {
      title: "Stadt, See, Berg: wie Klagenfurt gebaut ist",
      html: "<p>Die Stadt ist von West nach Ost organisiert: Am westlichen Ende liegt die Ostbucht des Wörthersees mit Strandbad und Europapark, daran schließt Waidmannsdorf mit Universität und Lakeside Park an, dann folgt die Innere Stadt mit Neuem und Altem Platz, im Osten St. Ruprecht und Welzenegg, im Norden St. Peter mit dem Klinikum und Annabichl mit dem Flughafen.</p><p>Praktisch ist das für Verabredungen: Vom Zentrum zum See sind es mit dem Rad gut 15 Minuten entlang des Lendkanals – eine der schönsten Alltagsstrecken, die eine österreichische Landeshauptstadt zu bieten hat. Im Norden führt der Weg in 20 Minuten auf das Kreuzbergl mit Sternwarte und Aussicht.</p><p>Gewohnt wird mit mehr Platz als anderswo: 85,4 Quadratmeter durchschnittliche Wohnfläche, deutlich über Wien (72,6) und Innsbruck (74,2), bei einer Mietquote von 55,5 Prozent. Zusammenziehen scheitert hier seltener an Quadratmetern als an Terminen.</p>",
    },
    {
      title: "Was man hier gemeinsam macht",
      html: "<p>Von Mai bis September übernimmt der See das Programm. Das Strandbad an der Ostbucht gehört der Stadt, der Europapark davor ist frei zugänglich, und die Promenade verbindet beides. Ein Treffen am Wasser ist in Klagenfurt kein besonderer Aufwand, sondern der Normalfall.</p><p>Im Winter verlagert sich das Leben ins Zentrum: Stadttheater mit Oper, Schauspiel und Konzert, die Lokale in den Innenhöfen rund um den Alten Platz, das Landesmuseum. Für akademisches Publikum kommt alle zwei Jahre die Lange Nacht der Forschung dazu – zuletzt am 24. April 2026, österreichweit mit über 3.000 Programmpunkten und mehr als 192.000 Besuchenden bei freiem Eintritt; die nächste ist für den 19. Mai 2028 angekündigt.</p><p>Und wenn nichts geplant ist: Kreuzbergl. Der Hausberg ist vom Zentrum in zwanzig Minuten erreichbar, oben stehen Sternwarte und Aussichtsbänke. Mehr braucht ein erstes Gespräch selten.</p>",
    },
    {
      title: "Was die Zahlen nicht sagen",
      html: "<p>Alle Werte dieser Seite stammen aus der Abgestimmten Erwerbsstatistik 2024 (Stichtag 31. Oktober 2024), dem Bevölkerungsstand zum 1. Januar 2026 und der Hochschulstatistik für das Wintersemester 2025/26. Die Studierendenzahl bezieht sich auf die Universität; Fachhochschule und Pädagogische Hochschule sind nicht enthalten.</p><p>Das Geschlechterverhältnis von 99 zu 100 ist ein Durchschnitt über zwanzig Jahrgänge und sagt nichts über eine einzelne Altersgruppe oder Branche. Ein Einpersonenhaushalt ist kein Beziehungsstatus – viele der 48,2 Prozent leben in einer Partnerschaft, nur in zwei Wohnungen.</p><p>Was bleibt: Klagenfurt ist die Landeshauptstadt mit dem ausgeglichensten Partnermarkt unserer Dossiers, mit einer Universität samt Technologiepark, viel Wohnfläche und einem See, der zur Stadt gehört. Wer Anonymität sucht, ist hier falsch. Wer ernsthaft sucht, richtig.</p>",
    },
  ],
  hubFacts: [
    { label: "Hochschulabschluss ab 15 Jahren", value: "22,3 %" },
    { label: "Studierende", value: "13.655" },
    { label: "Einpersonenhaushalte", value: "48,2 %" },
    { label: "Männer je 100 Frauen (30–49)", value: "99" },
  ],
  sources: [],
};

// Karte aus dem bestehenden Profil übernehmen, falls scripts/build_city_map.py schon gelaufen ist.
if (old.map?.rivers?.length || old.map?.areas?.length) p.map = { ...p.map, rivers: old.map.rivers, areas: old.map.areas, boundary: old.map.boundary };

applySources(p, {
  "aest-gemeinde": { publisher: "Statistik Austria", title: "Abgestimmte Erwerbsstatistik 2024, Gemeindeergebnisse (Blatt „Gemeindetab“, Gebietsstand 2026): Bevölkerung, höchste abgeschlossene Bildung ab 15 Jahren, Privathaushalte, Arbeitsstätten, Beschäftigte, Unternehmen", stand: "Stichtag 31.10.2024, erstellt 09.06.2026", url: "https://www.statistik.at/fileadmin/pages/54/AEST_Gemeindeergebnisse_2024.ods" },
  "aest-indikatoren": { publisher: "Statistik Austria", title: "Abgestimmte Erwerbsstatistik 2024, Indikatoren für die Bundesländer und Landeshauptstädte (Blatt „Indikatoren 2024“): Durchschnittsalter, Einpersonenhaushalte, Tertiärquote, Mietquote, Wohnfläche, Pendlersaldo, Ausbildungsbeteiligung", stand: "Stichtag 31.10.2024, erstellt 09.06.2026", url: "https://www.statistik.at/fileadmin/pages/54/AEST_Gemeindeergebnisse_2024.ods" },
  "uni-stud": { publisher: "Statistik Austria", title: "Studierende an öffentlichen Universitäten nach Uni (Open Government Data, Datensatz OGD_unistud3_ext_UNI_STUD3_1)", stand: "Wintersemester 2025/26", url: "https://data.statistik.gv.at/web/meta.jsp?dataset=OGD_unistud3_ext_UNI_STUD3_1" },
  "bev-alter": { publisher: "Statistik Austria", title: "Bevölkerungsstand zu Jahresbeginn 2026 nach Gemeinde, Alter in Einzeljahren und Geschlecht (Open Government Data, Datensatz OGD_bevstandjbab2002_BevStand_2026)", stand: "Stand 01.01.2026", url: "https://data.statistik.gv.at/web/meta.jsp?dataset=OGD_bevstandjbab2002_BevStand_2026" },
  "aau-profil": { publisher: "Universität Klagenfurt", title: "Profil der Universität: Gründung 1970, vier Fakultäten und 30 Institute, mehr als 13.700 Studierende (rund 3.000 aus dem Ausland), rund 1.700 Mitarbeitende, Forschungscluster", stand: "abgerufen 11/2026", url: "https://www.aau.at/universitaet/" },
});

checkSeo(p);
writeFileSync(file, JSON.stringify(p, null, 1) + "\n");
console.log("Klagenfurt geschrieben:", p.sources.length, "Quellen,", p.guide.length, "Guide-Kapitel,", p.universities.length, "Hochschulen");
