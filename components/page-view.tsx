import type { Metadata } from "next";
import { AboutTemplate, FaqTemplate, ReviewsTemplate, SocialTemplate } from "@/components/company";
import { HomeTemplate } from "@/components/home";
import { SiteShell } from "@/components/site-shell";
import { ArticleTemplate, GuideTemplate, LocationHubTemplate, LocationTemplate, MagazineHubTemplate, MagazineListingTemplate } from "@/components/templates";
import { JsonLd } from "@/components/ui";
import { pageRegistrationUrl, type PublicPage } from "@/lib/content";
import { MARKET_CODES, MARKET_DOMAINS_LIVE, getMarket, publicUrl, type MarketCode } from "@/lib/markets";
import { ORIGIN, SITE_NAME } from "@/lib/site";
import { staticAsset } from "@/lib/static-asset";

// Gemeinsame Darstellung der Seiten für DE (app/[[...slug]]) und die Marktrouten (app/at, app/ch).

// hreflang nur für die Städteübersicht (in jedem Markt vorhanden) und erst, wenn die Landesdomains laufen.
function hreflang(page: PublicPage): Metadata["alternates"] {
  if (!MARKET_DOMAINS_LIVE || page.family !== "location-hub") return {};
  return {
    languages: {
      ...Object.fromEntries(MARKET_CODES.map(code => [getMarket(code).locale, publicUrl(code, page.path)])),
      "x-default": publicUrl("de", page.path),
    },
  };
}

export function pageMetadata(page: PublicPage, market: MarketCode = "de"): Metadata {
  const image = page.family === "home" ? "/brand/hero-couple.jpg" : page.heroImage;
  return {
    title: { absolute: page.title },
    description: page.description,
    alternates: { canonical: page.canonical, ...hreflang(page) },
    robots: { index: true, follow: true },
    openGraph: {
      title: page.title,
      description: page.description,
      url: page.canonical,
      siteName: SITE_NAME,
      locale: getMarket(market).ogLocale,
      type: page.family === "magazine" ? "article" : "website",
      ...(page.family === "magazine" ? { publishedTime: page.published, modifiedTime: page.modified } : {}),
      ...(image ? { images: [{ url: staticAsset(image) }] } : {}),
    },
    twitter: { card: "summary_large_image", title: page.title, description: page.description },
  };
}

function Template({ page }: { page: PublicPage }) {
  switch (page.family) {
    case "home": return <HomeTemplate page={page} />;
    case "magazine-hub": return <MagazineHubTemplate page={page} />;
    case "magazine-category":
    case "magazine-author": return <MagazineListingTemplate page={page} />;
    case "magazine": return <ArticleTemplate page={page} />;
    case "location-hub": return <LocationHubTemplate page={page} />;
    case "location": return <LocationTemplate page={page} />;
    case "about": return <AboutTemplate page={page} />;
    case "faq": return <FaqTemplate page={page} />;
    case "about-reviews": return <ReviewsTemplate page={page} />;
    case "social": return <SocialTemplate page={page} />;
    default: return <GuideTemplate page={page} />;
  }
}

export function PageView({ page }: { page: PublicPage }) {
  return <SiteShell registrationHref={pageRegistrationUrl(page)} current={page.path}>
    {page.family === "home" ? <JsonLd data={{ "@context": "https://schema.org", "@graph": [
      { "@type": "Organization", "@id": `${ORIGIN}/#organization`, name: "AkademikerSingles.de", url: `${ORIGIN}/`, logo: staticAsset("/brand/logo.svg") },
      { "@type": "WebSite", "@id": `${ORIGIN}/#website`, name: SITE_NAME, url: `${ORIGIN}/`, inLanguage: "de-DE", publisher: { "@id": `${ORIGIN}/#organization` } },
    ] }} /> : null}
    <Template page={page} />
  </SiteShell>;
}
