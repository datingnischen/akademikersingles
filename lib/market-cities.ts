import { getMarketProfiles, type CityProfile } from "@/lib/city-profile";
import { getMarket, publicUrl, type RegionalMarket } from "@/lib/markets";
import type { PublicPage } from "@/lib/content";

// Stadtseiten und Städteübersicht für Österreich und die Schweiz. Anders als in DE gibt es keine ICONY-Quelltexte:
// Die Seiten bestehen aus den Stadtdossiers (data/city-profiles/<land>/<stadt>.json) und dieser Übersicht.
// Canonical zeigt auf die künftige Landesdomain (publicUrl), die Seiten laufen bis dahin unter /at/… bzw. /ch/….

const HUB_PATH = "/partnersuche/";

function cityPage(market: RegionalMarket, profile: CityProfile): PublicPage {
  const name = profile.name ?? profile.path;
  const { countryName } = getMarket(market);
  return {
    path: profile.path,
    sourceUrl: publicUrl(market, profile.path),
    canonical: publicUrl(market, profile.path),
    family: "location",
    title: profile.seoTitle ?? `Partnersuche für Akademiker in ${name} – AkademikerSingles`,
    description: profile.seoDescription ?? `Akademiker Singles in ${name} (${countryName}): Stadtdossier mit amtlichen Kennzahlen zu Bildung, Beruf und Single-Leben.`,
    heroTitle: `Partnersuche in ${name}`,
    heroImage: null,
    categories: [],
    contentHtml: "",
    locationName: name,
    cityWidget: null,
  };
}

const HUBS: Record<RegionalMarket, { title: string; heroTitle: string; lead: string }> = {
  at: { title: "Partnersuche für Akademiker in Österreich – AkademikerSingles", heroTitle: "Partnersuche für Akademiker in Österreich", lead: "Akademiker Singles in Österreich" },
  ch: { title: "Partnersuche für Akademiker in der Schweiz – AkademikerSingles", heroTitle: "Partnersuche für Akademiker in der Schweiz", lead: "Akademiker Singles in der Schweiz" },
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
    contentHtml: `<p>Die Stadtdossiers fassen für ${list} zusammen, was amtliche Statistiken zu Bildung, Beruf und Single-Leben hergeben: Akademikeranteil, Hochschulen, wichtige Branchen und Haushaltsstrukturen, jeweils mit Quelle und Stand. Dazu kommen Orte, an denen Wissenschaft, Beruf und Freizeit der Stadt zusammenkommen.</p><p>Ist Ihre Stadt nicht dabei, finden Sie über die individuelle Suche Singles in Ihrer Region: Sie legen Ort, Umkreis und Alter selbst fest.</p>`,
    locationName: null,
    cityWidget: null,
  };
}
