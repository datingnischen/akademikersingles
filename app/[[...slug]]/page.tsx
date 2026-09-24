import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AboutTemplate, FaqTemplate, ReviewsTemplate, SocialTemplate } from "@/components/company";
import { HomeTemplate } from "@/components/home";
import { SiteShell } from "@/components/site-shell";
import { ArticleTemplate, GuideTemplate, LocationHubTemplate, LocationTemplate, MagazineHubTemplate, MagazineListingTemplate } from "@/components/templates";
import { JsonLd } from "@/components/ui";
import { getPage, getPages, normalizeContentPath, pageRegistrationUrl, type PublicPage } from "@/lib/content";
import { ORIGIN, SITE_NAME } from "@/lib/site";

type Props = { params: Promise<{ slug?: string[] }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getPages().map(page => ({ slug: page.path === "/" ? undefined : page.path.split("/").filter(Boolean) }));
}

async function activePage(params: Props["params"]): Promise<PublicPage> {
  const { slug } = await params;
  const page = getPage(normalizeContentPath(slug));
  if (!page) notFound();
  return page;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = await activePage(params);
  const image = page.family === "home" ? "/brand/hero-couple.jpg" : page.heroImage;
  return {
    title: { absolute: page.title },
    description: page.description,
    alternates: { canonical: page.canonical },
    robots: { index: true, follow: true },
    openGraph: {
      title: page.title,
      description: page.description,
      url: page.canonical,
      siteName: SITE_NAME,
      locale: "de_DE",
      type: page.family === "magazine" ? "article" : "website",
      ...(page.family === "magazine" ? { publishedTime: page.published, modifiedTime: page.modified } : {}),
      ...(image ? { images: [{ url: `${ORIGIN}${image}` }] } : {}),
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

export default async function PublicPageRoute({ params }: Props) {
  const page = await activePage(params);
  return <SiteShell registrationHref={pageRegistrationUrl(page)} current={page.path}>
    {page.family === "home" ? <JsonLd data={{ "@context": "https://schema.org", "@graph": [
      { "@type": "Organization", "@id": `${ORIGIN}/#organization`, name: "AkademikerSingles.de", url: `${ORIGIN}/`, logo: `${ORIGIN}/brand/logo.svg` },
      { "@type": "WebSite", "@id": `${ORIGIN}/#website`, name: SITE_NAME, url: `${ORIGIN}/`, inLanguage: "de-DE", publisher: { "@id": `${ORIGIN}/#organization` } },
    ] }} /> : null}
    <Template page={page} />
  </SiteShell>;
}
