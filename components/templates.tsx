import Image from "next/image";
import Link from "next/link";
import { CitySearchFallback } from "@/components/city-search-fallback";
import { ArticleCard, Breadcrumbs, CityTile, ImageCredits, JsonLd, RegisterPanel, Sidebar, breadcrumbJsonLd, type Crumb } from "@/components/ui";
import {
  aidFor, articlesInCategory, categoryLabel, formatDate, getArticles, getCategories, getCategory, getCities, getLeadCategories,
  guideLabel, imageCredits, moreCities, pageRegistrationUrl, primaryCategory, relatedArticles, renderedContentHtml, type PublicPage,
} from "@/lib/content";
import { ORIGIN, SITE_NAME } from "@/lib/site";
import styles from "./templates.module.css";
import { staticAsset } from "@/lib/static-asset";

const PUBLISHER = { "@type": "Organization", name: "AkademikerSingles.de", url: `${ORIGIN}/`, logo: { "@type": "ImageObject", url: staticAsset("/brand/logo.svg") } };

export function crumbsFor(page: PublicPage): Crumb[] {
  const items: Crumb[] = [{ name: "Startseite", href: "/" }];
  if (page.family === "location" || page.family === "location-hub") items.push({ name: "Partnersuche", href: "/partnersuche/" });
  if (page.family.startsWith("magazine")) items.push({ name: "Magazin", href: "/magazin/" });
  if (page.family === "magazine") {
    const category = primaryCategory(page);
    if (category) items.push({ name: categoryLabel(category), href: category.path });
  }
  if (page.family === "location") items.push({ name: page.locationName ?? page.heroTitle, href: page.path });
  else if (page.family === "magazine-category") items.push({ name: page.heroTitle, href: page.path });
  else if (page.family === "magazine-author") items.push({ name: page.heroTitle.replace(/^Autor:\s*/, ""), href: page.path });
  else if (page.family === "guide") items.push({ name: guideLabel(page), href: page.path });
  else if (page.family === "magazine") items.push({ name: page.heroTitle, href: page.path });
  else if (page.family === "about" || page.family === "faq") items.push({ name: page.family === "faq" ? "FAQ" : page.heroTitle, href: page.path });
  else if (page.family === "about-reviews" || page.family === "social") items.push({ name: "Über uns", href: "/ueber-uns/" }, { name: page.family === "social" ? "Social Media" : "Bewertungen", href: page.path });
  return items;
}

function Hero({ page, eyebrow, title, lead, children, image, imageAlt }: { page: PublicPage; eyebrow: string; title: string; lead?: string; children?: React.ReactNode; image?: string | null; imageAlt?: string }) {
  return <section className={`${styles.hero} ${image ? styles.heroWithImage : ""}`}>
    <div className={`container ${styles.heroInner}`}>
      <div className={styles.heroCopy}>
        <Breadcrumbs items={crumbsFor(page)} tone="dark" />
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="display">{title}</h1>
        {lead ? <p className={styles.heroLead}>{lead}</p> : null}
        {children}
      </div>
      {image ? <div className={styles.heroMedia}><Image src={image} alt={imageAlt ?? title} fill priority sizes="(max-width: 900px) 100vw, 44vw" /></div> : null}
    </div>
  </section>;
}

function TopicNav({ active }: { active?: string }) {
  return <nav className={styles.topicNav} aria-label="Magazin-Kategorien">
    <div className="container">
      <Link href="/magazin/" aria-current={!active ? "page" : undefined}>Alle Themen</Link>
      {getCategories().map(category => <Link key={category.slug} href={category.path} aria-current={active === category.slug ? "page" : undefined}>{categoryLabel(category)}</Link>)}
    </div>
  </nav>;
}

function Body({ page, children }: { page: PublicPage; children?: React.ReactNode }) {
  return <section className={`container ${styles.body}`}>
    <div className={styles.bodyMain}>
      {children}
      <div className="prose" dangerouslySetInnerHTML={{ __html: renderedContentHtml(page) }} />
      <ImageCredits credits={imageCredits(page)} />
    </div>
    <Sidebar aid={aidFor(page)} />
  </section>;
}

export function MagazineHubTemplate({ page }: { page: PublicPage }) {
  const articles = getArticles();
  const [featured, ...rest] = articles;
  const lead = getLeadCategories();
  const others = getCategories().filter(category => !lead.includes(category));
  const crumbs = crumbsFor(page);
  return <main>
    <JsonLd data={{ "@context": "https://schema.org", "@graph": [
      breadcrumbJsonLd(crumbs, ORIGIN),
      { "@type": "CollectionPage", name: page.heroTitle, url: page.canonical, description: page.description, inLanguage: "de-DE", isPartOf: { "@type": "WebSite", name: SITE_NAME, url: `${ORIGIN}/` } },
    ] }} />
    <section className={styles.magHero}>
      <div className="container">
        <Breadcrumbs items={crumbs} tone="dark" />
        <div className={styles.magHeroHead}>
          <h1 className="display">Das <em>Magazin</em></h1>
          <p>{page.description || "Über Erfolg, Anziehung, Lifestyle und Beziehungen auf Augenhöhe – für Singles mit Anspruch."}</p>
        </div>
        <div className={styles.magFeatured}><ArticleCard article={featured} size="large" priority /></div>
      </div>
    </section>
    <TopicNav />
    {lead.map((category, index) => {
      const items = articlesInCategory(category.slug);
      return <section key={category.slug} className={`container ${styles.topicSection}`}>
        <header className={styles.topicHead}>
          <span className={styles.topicIndex}>{String(index + 1).padStart(2, "0")}</span>
          <div>
            <h2 className="display"><Link href={category.path}>{categoryLabel(category)}</Link></h2>
            {category.description ? <p>{category.description}</p> : null}
          </div>
          <Link className="link-arrow" href={category.path}>Alle {items.length} Artikel <span aria-hidden="true">→</span></Link>
        </header>
        <div className={styles.grid}>{items.slice(0, 3).map(article => <ArticleCard key={article.path} article={article} />)}</div>
      </section>;
    })}
    <section className={`container ${styles.topicSection}`}>
      <header className={styles.topicHead}>
        <span className={styles.topicIndex}>06</span>
        <div><h2 className="display">Weitere Themen</h2><p>Psychologie, Gesellschaft und die Frage, was Menschen mit Anspruch wirklich suchen.</p></div>
      </header>
      <div className={styles.otherTopics}>{others.map(category => <Link key={category.slug} href={category.path}><strong className="display">{category.name}</strong><span>{category.count} Artikel →</span></Link>)}</div>
      <div className={`${styles.grid} ${styles.gridSpaced}`}>{rest.filter(article => !article.categories.some(slug => lead.some(category => category.slug === slug))).slice(0, 6).map(article => <ArticleCard key={article.path} article={article} />)}</div>
    </section>
  </main>;
}

export function MagazineListingTemplate({ page }: { page: PublicPage }) {
  const category = page.family === "magazine-category" ? getCategory(page.categories[0] ?? "") : null;
  const articles = category ? articlesInCategory(category.slug) : getArticles().filter(article => article.author?.path === page.path);
  const crumbs = crumbsFor(page);
  const name = category ? categoryLabel(category) : page.heroTitle.replace(/^Autor:\s*/, "");
  return <main>
    <JsonLd data={{ "@context": "https://schema.org", "@graph": [
      breadcrumbJsonLd(crumbs, ORIGIN),
      { "@type": category ? "CollectionPage" : "ProfilePage", name: page.title, url: page.canonical, description: page.description, inLanguage: "de-DE" },
    ] }} />
    <Hero page={page} eyebrow={category ? `Magazin · ${articles.length} Artikel` : "Autor"} title={category ? category.name : name} lead={page.description || category?.description || `Alle Beiträge von ${name} im AkademikerSingles-Magazin.`} />
    <TopicNav active={category?.slug} />
    <section className={`container ${styles.listing}`}>
      {articles[0] ? <div className={styles.listingLead}><ArticleCard article={articles[0]} size="large" priority /></div> : null}
      <div className={styles.grid}>{articles.slice(1).map(article => <ArticleCard key={article.path} article={article} />)}</div>
    </section>
    <section className={`container ${styles.band}`}><RegisterPanel aid="magazin" title="Aus Inspiration wird Begegnung" text="Lernen Sie Singles kennen, die Ihre Ansprüche an Bildung, Stil und Tiefgang teilen – kostenlos und diskret." /></section>
  </main>;
}

export function ArticleTemplate({ page }: { page: PublicPage }) {
  const category = primaryCategory(page);
  const related = relatedArticles(page);
  const crumbs = crumbsFor(page);
  return <main>
    <JsonLd data={{ "@context": "https://schema.org", "@graph": [
      breadcrumbJsonLd(crumbs, ORIGIN),
      {
        "@type": "BlogPosting", headline: page.heroTitle, description: page.description, url: page.canonical, mainEntityOfPage: page.canonical,
        datePublished: page.published, dateModified: page.modified, inLanguage: "de-DE",
        image: page.heroImage ? staticAsset(page.heroImage) : undefined,
        articleSection: category?.name, author: { "@type": "Organization", name: `${page.author?.name ?? "Redaktion"} AkademikerSingles`, url: `${ORIGIN}${page.author?.path ?? "/magazin/"}` },
        publisher: PUBLISHER,
      },
    ] }} />
    <article>
      <header className={`container ${styles.articleHead}`}>
        <Breadcrumbs items={crumbs} />
        {category ? <Link className="eyebrow" href={category.path}>{categoryLabel(category)}</Link> : null}
        <h1 className="display">{page.heroTitle}</h1>
        {page.description ? <p className={styles.articleLead}>{page.description}</p> : null}
        <div className={styles.articleMeta}>
          <span>Von <Link href={page.author?.path ?? "/magazin/"}>{page.author?.name ?? "Redaktion"}</Link></span>
          <time dateTime={page.modified ?? page.published}>Aktualisiert am {formatDate(page.modified ?? page.published)}</time>
          <span>{page.readingMinutes} Min. Lesezeit</span>
        </div>
      </header>
      {page.heroImage ? <div className={`container ${styles.articleImage}`}><div><Image src={page.heroImage} alt={page.heroImageAlt ?? page.heroTitle} fill priority sizes="(max-width: 1280px) 100vw, 1240px" /></div></div> : null}
      <Body page={page} />
    </article>
    <section className={styles.related}>
      <div className="container">
        <div className={styles.relatedHead}><p className="eyebrow">Weiterlesen</p><h2 className="display">Das könnte Sie auch <em>interessieren</em></h2></div>
        <div className={styles.grid}>{related.map(article => <ArticleCard key={article.path} article={article} />)}</div>
      </div>
    </section>
  </main>;
}

export function GuideTemplate({ page }: { page: PublicPage }) {
  const crumbs = crumbsFor(page);
  return <main>
    <JsonLd data={{ "@context": "https://schema.org", "@graph": [breadcrumbJsonLd(crumbs, ORIGIN), { "@type": "Article", headline: page.heroTitle, description: page.description, url: page.canonical, inLanguage: "de-DE", image: page.heroImage ? staticAsset(page.heroImage) : undefined, publisher: PUBLISHER }] }} />
    <Hero page={page} eyebrow="Ratgeber" title={page.heroTitle} lead={page.description} image={page.heroImage} />
    <Body page={page} />
  </main>;
}

const HUB_COLLAGE = ["/partnersuche/berlin/", "/partnersuche/muenchen/", "/partnersuche/hamburg/", "/partnersuche/heidelberg/"];

export function LocationHubTemplate({ page }: { page: PublicPage }) {
  const cities = getCities();
  const collage = HUB_COLLAGE.map(path => cities.find(city => city.path === path)).filter((city): city is PublicPage => Boolean(city?.heroImage));
  const crumbs = crumbsFor(page);
  return <main>
    <JsonLd data={{ "@context": "https://schema.org", "@graph": [breadcrumbJsonLd(crumbs, ORIGIN), { "@type": "CollectionPage", name: page.heroTitle, url: page.canonical, description: page.description, inLanguage: "de-DE", hasPart: cities.map(city => ({ "@type": "WebPage", name: city.heroTitle, url: city.canonical })) }] }} />
    <section className={styles.hero}>
      <div className={`container ${styles.heroInner}`}>
        <div className={styles.heroCopy}>
          <Breadcrumbs items={crumbs} tone="dark" />
          <p className="eyebrow">{cities.length} Städte · Deutschland</p>
          <h1 className="display">{page.heroTitle}</h1>
          <p className={styles.heroLead}>Begegnen Sie gebildeten Singles in Deutschlands Universitäts- und Wirtschaftsmetropolen – von Berlin bis Tübingen.</p>
          <a className="btn btn-gold" href={pageRegistrationUrl(page)}>Singles in Ihrer Nähe finden</a>
        </div>
        <div className={styles.collage}>
          {collage.map((city, index) => <Link key={city.path} href={city.path} className={styles.collageTile}>
            <Image src={city.heroImage!} alt={`Akademiker Singles in ${city.locationName}`} fill sizes="(max-width: 900px) 50vw, 22vw" priority={index < 2} />
            <span>{city.locationName}</span>
          </Link>)}
        </div>
      </div>
    </section>
    <section className={`container ${styles.citySection}`}>
      <div className={styles.relatedHead}><p className="eyebrow">Partnersuche nach Städten</p><h2 className="display">Wählen Sie Ihre <em>Stadt</em></h2></div>
      <div className={styles.cityGrid}>{cities.map((city, index) => <CityTile key={city.path} city={city} priority={index < 5} />)}</div>
      <CitySearchFallback />
    </section>
    <Body page={page} />
  </main>;
}

export function LocationTemplate({ page }: { page: PublicPage }) {
  const register = pageRegistrationUrl(page);
  const neighbours = moreCities(page);
  const crumbs = crumbsFor(page);
  const city = page.locationName ?? page.heroTitle;
  return <main>
    <JsonLd data={{ "@context": "https://schema.org", "@graph": [breadcrumbJsonLd(crumbs, ORIGIN), { "@type": "WebPage", name: page.heroTitle, url: page.canonical, description: page.description, inLanguage: "de-DE", about: { "@type": "City", name: city } }] }} />
    <Hero page={page} eyebrow="Partnersuche vor Ort" title={page.heroTitle} lead={page.description} image={page.heroImage} imageAlt={`Stadtansicht ${city} – Akademiker Singles vor Ort`}>
      <a className="btn btn-gold" href={register}>Singles in {city} kennenlernen</a>
    </Hero>
    {page.cityWidget ? <section className={`container ${styles.widget}`} data-icony-city-widget>
      <div className={styles.widgetCopy}>
        <p className="eyebrow">Gerade aktiv</p>
        <h2 className="display">Akademiker Singles aus <em>{city}</em> und Umgebung</h2>
        <p>Entdecken Sie Menschen aus Ihrer Region, die Bildung, Erfolg und niveauvolle Gespräche zu schätzen wissen.</p>
        <a className="btn btn-dark" href={register}>Jetzt kostenlos kennenlernen</a>
      </div>
      <div className={styles.widgetFrame}>
        <iframe src={page.cityWidget.url} title={`Aktive Akademiker Singles aus ${city} und Umgebung`} width="440" height="300" loading="lazy" referrerPolicy="no-referrer" sandbox="allow-scripts allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation" />
      </div>
    </section> : null}
    <Body page={page} />
    {neighbours.length ? <section className={`container ${styles.citySection}`} aria-labelledby="weitere-staedte">
      <div className={styles.topicHead}>
        <div><p className="eyebrow">Auch in Ihrer Nähe</p><h2 className="display" id="weitere-staedte">Akademiker Singles in weiteren Städten</h2></div>
        <Link className="link-arrow" href="/partnersuche/">Alle Städte <span aria-hidden="true">→</span></Link>
      </div>
      <div className={styles.cityGrid}>{neighbours.map(item => <CityTile key={item.path} city={item} />)}</div>
    </section> : null}
  </main>;
}
