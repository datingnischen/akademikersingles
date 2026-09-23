import Image from "next/image";
import Link from "next/link";
import { categoryLabel, getCategories, getCities, getGuides, guideLabel } from "@/lib/content";
import { FEATURE_LINKS, LEGAL_LINKS, LOGIN_URL, REVIEW, TRUST_LINKS, registrationUrl } from "@/lib/site";
import styles from "./site-shell.module.css";

const NAV = [
  { label: "Magazin", href: "/magazin/" },
  { label: "Erfolg & Anziehung", href: "/magazin/category/erfolg-anziehung/" },
  { label: "Unternehmer Dating", href: "/magazin/category/unternehmer-selbststaendige-daten-anders/" },
  { label: "Lifestyle & Luxus", href: "/magazin/category/status-luxus/" },
  { label: "Partnersuche", href: "/partnersuche/" },
];

export function SiteShell({ children, registrationHref, current }: { children: React.ReactNode; registrationHref?: string; current?: string }) {
  const registration = registrationHref ?? registrationUrl();
  const isCurrent = (href: string) => current === href || (href !== "/magazin/" && current?.startsWith(href));
  return <div className={styles.shell}>
    <a className={styles.skip} href="#inhalt">Zum Inhalt springen</a>
    <header className={styles.header}>
      <div className={styles.topbar}>
        <div className="container"><span><span className={styles.topbarExtra}>Über 750.000 Mitglieder · </span>Jedes Profil manuell geprüft</span><span className={styles.topbarRight}>Diskret · Niveauvoll · Auf Augenhöhe</span></div>
      </div>
      <div className={`container ${styles.bar}`}>
        <Link className={styles.brand} href="/" aria-label="AkademikerSingles – Startseite">
          <Image src="/brand/logo.svg" alt="AkademikerSingles.de" width={232} height={30} priority />
        </Link>
        <nav className={styles.nav} aria-label="Hauptnavigation">
          {NAV.map(item => <Link key={item.href} href={item.href} aria-current={isCurrent(item.href) ? "page" : undefined}>{item.label}</Link>)}
        </nav>
        <div className={styles.actions}>
          <a className={styles.login} href={LOGIN_URL}>Login</a>
          <a className={`btn btn-dark ${styles.register}`} href={registration}>Kostenlos registrieren</a>
        </div>
        <details className={styles.mobile}>
          <summary aria-label="Menü öffnen"><span /><span /><span /></summary>
          <div className={styles.mobilePanel}>
            {NAV.map(item => <Link key={item.href} href={item.href}>{item.label}</Link>)}
            <Link href="/magazin/category/intellektuelle-anziehung-tiefgang/">Intellektuelle Anziehung</Link>
            <Link href="/magazin/category/beziehung-auf-augenhoehe/">Beziehung auf Augenhöhe</Link>
            <a href={LOGIN_URL}>Login</a>
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
          <h2 className="display">Anspruch verdient ein <em>Gegenüber</em>, das ihn teilt.</h2>
        </div>
        <div className={styles.footerCtaActions}>
          <a className="btn btn-gold" href={registration}>Jetzt kostenlos registrieren</a>
          <span>Kostenlose Basis-Mitgliedschaft · Monatlich kündbar</span>
        </div>
      </div>
      <div className={`container ${styles.footerGrid}`}>
        <section className={styles.footerBrand}>
          <Image src="/brand/logo-light.svg" alt="AkademikerSingles.de" width={200} height={26} className={styles.footerLogo} />
          <p>Die Partnersuche für Akademiker, Unternehmer und erfolgreiche Singles, die Bildung, Stil und echte Gespräche zu schätzen wissen.</p>
          <a className={styles.footerSeal} href={REVIEW.url} target="_blank" rel="noopener">
            <Image src={REVIEW.seal} alt="Empfohlen von Singlebörsen-Überblick: 4,5 Sterne – sehr gut" width={120} height={180} />
            <span><strong>{REVIEW.rating} / 5 Sterne</strong>{REVIEW.label} →</span>
          </a>
        </section>
        <section>
          <h3>Magazin</h3>
          <Link href="/magazin/">Alle Artikel</Link>
          {getCategories().map(category => <Link key={category.slug} href={category.path}>{categoryLabel(category)}</Link>)}
        </section>
        <section>
          <h3>Partnersuche</h3>
          <Link href="/partnersuche/">Alle Städte</Link>
          {getCities().map(city => <Link key={city.path} href={city.path}>{city.locationName}</Link>)}
        </section>
        <section>
          <h3>Ratgeber</h3>
          {getGuides().map(guide => <Link key={guide.path} href={guide.path}>{guideLabel(guide)}</Link>)}
          <h3 className={styles.footerSub}>Mitgliedschaft</h3>
          {[...FEATURE_LINKS, ...TRUST_LINKS].map(link => <a key={link.href} href={link.href}>{link.label}</a>)}
        </section>
      </div>
      <div className={`container ${styles.legal}`}>
        <span>© {new Date().getFullYear()} AkademikerSingles.de</span>
        <nav aria-label="Rechtliches">{LEGAL_LINKS.map(link => <a key={link.href} href={link.href}>{link.label}</a>)}</nav>
      </div>
    </footer>
  </div>;
}
