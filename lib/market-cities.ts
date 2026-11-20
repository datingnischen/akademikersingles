import { existsSync } from "node:fs";
import { join } from "node:path";
import { getMarketProfiles, type CityProfile } from "@/lib/city-profile";
import { getMarket, publicUrl, type RegionalMarket } from "@/lib/markets";
import type { PublicPage } from "@/lib/content";

// Stadtseiten und Städteübersicht für Österreich und die Schweiz. Anders als in DE gibt es keine ICONY-Quelltexte:
// Die Seiten bestehen aus den Stadtdossiers (data/city-profiles/<land>/<stadt>.json) und dieser Übersicht.
// Canonical zeigt auf die künftige Landesdomain (publicUrl), die Seiten laufen bis dahin unter /at/… bzw. /ch/….

const HUB_PATH = "/partnersuche/";

// Titelbilder liefert Codex (docs/codex-auftrag-at-ch-titelbilder-logos.md) nach public/brand/<land>-<stadt>-partnersuche.webp.
// Die Seite zeigt das Bild, sobald die Datei existiert; den Alt-Text trägt das Dossier (heroAlt).
export function marketHeroPath(market: RegionalMarket, profile: CityProfile): string {
  const slug = profile.path.split("/").filter(Boolean).pop();
  return `/brand/${market}-${slug}-partnersuche.webp`;
}

function marketHeroImage(market: RegionalMarket, profile: CityProfile): string | null {
  const file = marketHeroPath(market, profile);
  return existsSync(join(process.cwd(), "public", file)) ? file : null;
}

function cityPage(market: RegionalMarket, profile: CityProfile): PublicPage {
  const name = profile.name ?? profile.path;
  const { countryName } = getMarket(market);
  return {
    path: profile.path,
    sourceUrl: publicUrl(market, profile.path),
    canonical: publicUrl(market, profile.path),
    family: "location",
    title: `Partnersuche für Akademiker in ${name}`,
    // Individueller <title> aus dem Dossier (max. 60 Zeichen, seo-meta hängt den Suffix nur an, wenn er passt).
    metaTitle: profile.seoTitle,
    description: profile.seoDescription ?? `Akademiker Singles in ${name} (${countryName}): Stadtdossier mit amtlichen Kennzahlen zu Bildung, Beruf und Single-Leben.`,
    heroTitle: `Partnersuche in ${name}`,
    heroImage: marketHeroImage(market, profile),
    categories: [],
    contentHtml: "",
    locationName: name,
    cityWidget: null,
  };
}

const HUBS: Record<RegionalMarket, { title: string; heroTitle: string; lead: string; body: string }> = {
  at: {
    title: "Partnersuche für Akademiker in Österreich – AkademikerSingles",
    heroTitle: "Partnersuche für Akademiker in Österreich",
    lead: "Akademiker Singles in Österreich",
    body: `<p>325.077 Menschen studieren im Wintersemester 2025/26 an Österreichs öffentlichen Universitäten, 17,6 Prozent der Bevölkerung ab 15 Jahren haben einen Hochschul-, Akademie- oder Kollegabschluss, und 38,9 Prozent aller Haushalte bestehen aus einer Person. Hinter diesen Durchschnittswerten liegen Städte, die sich deutlich unterscheiden: In Graz haben 30,7 Prozent der Erwachsenen einen Hochschulabschluss, in Linz 20,4 Prozent – dafür lebt dort fast jeder zweite Haushalt allein.</p>
<p>Unsere Stadtdossiers übersetzen diese Statistik in etwas Praktisches: Wie viele Studierende hat die Stadt, welche Hochschulen prägen sie, in welchen Bezirken wohnen Menschen mit Hochschulabschluss, wie steht es um das Geschlechterverhältnis in der Altersgruppe 30 bis 49, und wo trifft man sich abends. Jede Zahl ist mit Quelle und Stand belegt: Abgestimmte Erwerbsstatistik 2024 und Bevölkerungsstand 2026 von Statistik Austria, Hochschulstatistik aus den offenen Daten des Bundes.</p>
<p>Dazu kommen Termine mit akademischem Publikum – von der Langen Nacht der Forschung über die Montagsakademie in Graz und den Kepler Salon in Linz bis zum Wiener Ball der Wissenschaften. Ist Ihre Stadt nicht dabei, legen Sie über die individuelle Suche Ort, Umkreis und Alter selbst fest.</p>`,
  },
  ch: {
    title: "Partnersuche für Akademiker in der Schweiz – AkademikerSingles",
    heroTitle: "Partnersuche für Akademiker in der Schweiz",
    lead: "Akademiker Singles in der Schweiz",
    body: `<p>270.764 Menschen studieren im Wintersemester 2025/26 an Schweizer Hochschulen – 168.533 an universitären Hochschulen und 102.231 an Fachhochschulen und pädagogischen Hochschulen. 43,7 Prozent der 25- bis 54-Jährigen sind ledig, und auf 100 ledige Frauen dieser Altersgruppe kommen landesweit 125 ledige Männer. In den Städten sieht das anders aus: Bern kommt auf 105, Zürich auf 116, St. Gallen auf 127.</p>
<p>Genau solche Unterschiede machen unsere Stadtdossiers sichtbar. Sie zeigen den Tertiäranteil der Bevölkerung, die Studierendenzahlen samt Frauenanteil je Hochschule, die Quartiere mit den höchsten Bildungsquoten und die Haushaltsstruktur – alles mit Quelle und Stand, von der STATPOP-Statistik und der Strukturerhebung des Bundesamts für Statistik bis zu den Zahlen der Stadt- und Kantonsstatistiken.</p>
<p>Dazu kommen wiederkehrende Termine mit akademischem Publikum: die Scientifica von ETH und Universität Zürich, die Ringvorlesungen in Zürich und Basel, die Nacht der Forschung in Bern, das St. Gallen Symposium oder das Festival de la Cité in Lausanne. Ist Ihre Stadt nicht dabei, legen Sie über die individuelle Suche Ort, Umkreis und Alter selbst fest.</p>`,
  },
};

export function marketCities(market: RegionalMarket): PublicPage[] {
  return getMarketProfiles(market).map(profile => cityPage(market, profile));
}

export function marketHub(market: RegionalMarket): PublicPage {
  const hub = HUBS[market];
  const names = marketCities(market).map(city => city.locationName).filter(Boolean);
  const list = names.length > 1 ? `${names.slice(0, -1).join(", ")} und ${names[names.length - 1]}` : names.join("");
  const description = `${hub.lead}: Stadtdossiers zu ${list} mit amtlichen Kennzahlen zu Bildung, Beruf und Single-Leben.`;
  return {
    path: HUB_PATH,
    sourceUrl: publicUrl(market, HUB_PATH),
    canonical: publicUrl(market, HUB_PATH),
    family: "location-hub",
    title: hub.title,
    description,
    heroTitle: hub.heroTitle,
    heroImage: null,
    categories: [],
    contentHtml: `<h2>Was in den Stadtdossiers steht</h2>${hub.body}`,
    locationName: null,
    cityWidget: null,
  };
}
