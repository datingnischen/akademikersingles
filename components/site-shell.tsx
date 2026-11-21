import Image from "next/image";
import Link from "@/components/market-link";
import { categoryLabel, getCategories, getCities, getGuides, guideLabel } from "@/lib/content";
import { featureLinks, legalLinks, loginUrl, REVIEW, trustLinks, legacyUrl, registrationUrl } from "@/lib/site";
import styles from "./site-shell.module.css";
import { staticAsset } from "@/lib/static-asset";
import { requestMarket } from "@/lib/market-context";
import { getMarket, getOtherMarkets, publicUrl, type MarketCode } from "@/lib/markets";

const NAV = [
  { label: "Magazin", href: "/magazin/" },
  { label: "Erfolg & Anziehung", href: "/magazin/thema/erfolg-anziehung/" },
  { label: "Unternehmer Dating", href: "/magazin/thema/unternehmer-selbststaendige-daten-anders/" },
  { label: "Lifestyle & Luxus", href: "/magazin/thema/status-luxus/" },
  { label: "Partnersuche", href: "/partnersuche/" },
];

// AT/CH haben ein eigenes Magazin ohne Themenseiten – dort führt die Navigation direkt zu Magazin und Städten.
const MARKET_NAV = [
  { label: "Magazin", href: "/magazin/" },
  { label: "Partnersuche", href: "/partnersuche/" },
  { label: "Über uns", href: "/ueber-uns/" },
  { label: "FAQ", href: "/faq/" },
];

// Landeslogos mit derselben Ansicht und Höhe wie das DE-Original.
function brand(market: MarketCode) {
  if (market === "de") return { logo: "/brand/logo.svg", logoLight: "/brand/logo-light.svg", alt: "AkademikerSingles.de", width: 232, footerWidth: 200 };
  return { logo: `/brand/logo-${market}.svg`, logoLight: `/brand/logo-light-${market}.svg`, alt: `AkademikerSingles.${market}`, width: 232, footerWidth: 200 };
}

function CountryFlag({ code }: { code: MarketCode }) {
  return <svg className={styles.countryFlag} viewBox="0 0 24 16" aria-hidden="true" focusable="false">
    {code === "de" ? <>
      <rect width="24" height="16" fill="#ffce00" />
      <rect width="24" height="10.67" fill="#dd0000" />
      <rect width="24" height="5.33" fill="#000" />
    </> : code === "at" ? <>
      <rect width="24" height="16" fill="#ed2939" />
      <rect y="5.33" width="24" height="5.33" fill="#fff" />
    </> : <>
      <rect width="24" height="16" fill="#da291c" />
      <rect x="10.5" y="3.5" width="3" height="9" fill="#fff" />
      <rect x="7.5" y="6.5" width="9" height="3" fill="#fff" />
    </>}
  </svg>;
}

/** Die Landesausgaben in der Fußzeile, wie bei Dich mit Stich: Flagge und Domain, nur für erreichbare Länderdomains. */
function FooterCountryLinks({ market }: { market: MarketCode }) {
  const others = getOtherMarkets(market);
  if (!others.length) return null;
  return <div className={`container ${styles.countries}`}>
    <span className={styles.countriesLabel}>AkademikerSingles in {others.map(entry => entry.countryPhrase).join(" und ")}</span>
    <nav aria-label="Landesausgaben">
      {others.map(entry => <a
        key={entry.code}
        className={styles.country}
        href={publicUrl(entry.code)}
        hrefLang={entry.locale}
        aria-label={`AkademikerSingles ${entry.countryName}: ${entry.domain}`}
      >
        <CountryFlag code={entry.code} />
        <span>{entry.domain}</span>
      </a>)}
    </nav>
  </div>;
}

export function SiteShell({ children, registrationHref, current }: { children: React.ReactNode; registrationHref?: string; current?: string }) {
  const registration = registrationHref ?? registrationUrl();
  const market = requestMarket();
  const logo = brand(market);
  const isCurrent = (href: string) => current === href || (href !== "/magazin/" && current?.startsWith(href));
  const nav = market === "de" ? NAV : MARKET_NAV;
  return <div className={styles.shell}>
    <a className={styles.skip} href="#inhalt">Zum Inhalt springen</a>
    <header className={styles.header}>
      <div className={styles.topbar}>
        <div className="container"><span><span className={styles.topbarExtra}>Über 750.000 Mitglieder · </span>Jedes Profil manuell geprüft</span><nav className={styles.topbarRight} aria-label="Service"><Link href="/ueber-uns/">Über uns</Link><Link href="/ueber-uns/bewertungen/">Bewertungen</Link><Link href="/ueber-uns/social-media/">Social Media</Link><Link href="/faq/">FAQ</Link><Link href="/ueber-uns/suche/">Suche</Link><a href={legacyUrl("/hilfe/")}>Hilfe</a></nav></div>
      </div>
      <div className={`container ${styles.bar}`}>
        <Link className={styles.brand} href="/" aria-label="AkademikerSingles – Startseite">
          <Image src={staticAsset(logo.logo)} alt={logo.alt} width={logo.width} height={30} priority />
        </Link>
        <nav className={styles.nav} aria-label="Hauptnavigation">
          {nav.map(item => <Link key={item.href} href={item.href} aria-current={isCurrent(item.href) ? "page" : undefined}>{item.label}</Link>)}
        </nav>
        <div className={styles.actions}>
          <a className={styles.login} href={loginUrl()}>Login</a>
          <a className={`btn btn-dark ${styles.register}`} href={registration}>Kostenlos registrieren</a>
        </div>
        <details className={styles.mobile}>
          <summary aria-label="Menü öffnen"><span /><span /><span /></summary>
          <div className={styles.mobilePanel}>
            {nav.map(item => <Link key={item.href} href={item.href}>{item.label}</Link>)}
            {market === "de" ? <Link href="/magazin/thema/intellektuelle-anziehung-tiefgang/">Intellektuelle Anziehung</Link> : null}
            {market === "de" ? <Link href="/magazin/thema/beziehung-auf-augenhoehe/">Beziehung auf Augenhöhe</Link> : null}
            <Link href="/ueber-uns/">Über uns</Link>
            <Link href="/ueber-uns/bewertungen/">Bewertungen</Link>
            <Link href="/ueber-uns/social-media/">Social Media</Link>
            <Link href="/faq/">FAQ</Link>
            <Link href="/ueber-uns/suche/">Suche</Link>
            <a href={loginUrl()}>Login</a>
            <a className="btn btn-gold" href={registration}>Kostenlos registrieren</a>
          </div>
        </details>
      </div>
    </header>
    <div id="inhalt">{children}</div>
    <footer className={styles.footer}>
      <div className={`container ${styles.footerCta}`}>
        <div>
          <p className="eyebrow">Ihr nächstes Kapitel</p>
          {/* Footer-Texte ohne Überschriften-Tag: sie stehen auf jeder Seite (Seobility „zu viele Überschriften“ ab ca. 26 je Seite). */}
          <p className={`display ${styles.footerCtaTitle}`}>Anspruch verdient ein <em>Gegenüber</em>, das ihn teilt.</p>
        </div>
        <div className={styles.footerCtaActions}>
          <a className="btn btn-gold" href={registration}>Jetzt kostenlos registrieren</a>
          <span>Kostenlose Basis-Mitgliedschaft · Monatlich kündbar</span>
        </div>
      </div>
      <div className={`container ${styles.footerGrid}`}>
        <section className={styles.footerBrand}>
          <Image src={staticAsset(logo.logoLight)} alt={logo.alt} width={logo.footerWidth} height={26} className={styles.footerLogo} />
          <p>Die Partnersuche für Akademiker, Unternehmer und erfolgreiche Singles, die Bildung, Stil und echte Gespräche zu schätzen wissen.</p>
          <a className={styles.footerSeal} href={REVIEW.url} target="_blank" rel="noopener">
            <Image src={REVIEW.seal} alt="Empfohlen von Singlebörsen-Überblick: 4,5 Sterne – sehr gut" width={120} height={180} />
            <span><strong>{REVIEW.rating} / 5 Sterne</strong>{REVIEW.label} →</span>
          </a>
        </section>
        <section>
          <p className={styles.footerHeading}>Magazin</p>
          <Link href="/magazin/">Alle Artikel</Link>
          {getCategories().map(category => <Link key={category.slug} href={category.path}>{categoryLabel(category)}</Link>)}
        </section>
        <section>
          <p className={styles.footerHeading}>Partnersuche</p>
          <Link href="/partnersuche/">Alle Städte</Link>
          {getCities().map(city => <Link key={city.path} href={city.path}>{city.locationName}</Link>)}
        </section>
        <section>
          <p className={styles.footerHeading}>AkademikerSingles</p>
          <Link href="/ueber-uns/">Über uns</Link>
          <Link href="/ueber-uns/#gruender">Gründer Christian M. Haas</Link>
          <Link href="/ueber-uns/bewertungen/">Bewertungen &amp; Erfahrungen</Link>
          <Link href="/ueber-uns/social-media/">Social Media</Link>
          <Link href="/faq/">Häufige Fragen</Link>
          <p className={`${styles.footerHeading} ${styles.footerSub}`}>Ratgeber</p>
          {getGuides().map(guide => <Link key={guide.path} href={guide.path}>{guideLabel(guide)}</Link>)}
          <p className={`${styles.footerHeading} ${styles.footerSub}`}>Mitgliedschaft</p>
          {[...featureLinks(), ...trustLinks()].map(link => <a key={link.href} href={link.href}>{link.label}</a>)}
        </section>
      </div>
      <FooterCountryLinks market={market} />
      <div className={`container ${styles.legal}`}>
        <span>© {new Date().getFullYear()} AkademikerSingles.{getMarket(market).domain.split(".").pop()}</span>
        <nav aria-label="Rechtliches">{legalLinks().map(link => <a key={link.href} href={link.href}>{link.label}</a>)}</nav>
      </div>
    </footer>
  </div>;
}
