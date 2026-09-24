import Image from "next/image";
import Link from "next/link";
import { crumbsFor } from "@/components/templates";
import { Breadcrumbs, JsonLd, RegisterPanel, ReviewSeal, breadcrumbJsonLd } from "@/components/ui";
import { FAQ_GROUPS, faqPlainAnswer } from "@/lib/authored";
import { getArticles, getCities, type PublicPage } from "@/lib/content";
import { ORIGIN, TRUST_LINKS, legacyUrl, registrationUrl } from "@/lib/site";
import styles from "./company.module.css";

const STATS = [
  { value: "750.000+", label: "Mitglieder mit Anspruch" },
  { value: "100 %", label: "manuell geprüfte Profile" },
  { value: "20+ Jahre", label: "Erfahrung in der Partnersuche" },
  { value: "DE", label: "Serverstandort Deutschland" },
];

const VALUES = [
  { title: "Niveau", text: "Wir verbinden gebildete Singles, die Tiefgang, Stil und echte Gespräche suchen – keine flüchtigen Matches." },
  { title: "Diskretion", text: "Was Sie teilen, bestimmen Sie. Sensible Daten bleiben verborgen, Profildaten geben wir nicht zu Werbezwecken weiter." },
  { title: "Augenhöhe", text: "Akademiker, Unternehmer und Erfolgreiche begegnen sich hier mit Respekt – als Menschen, nicht als Lebensläufe." },
];

const STEPS = [
  { title: "Manuelle Profilprüfung", text: "Jedes neue Profil wird von unserem Team persönlich geprüft, bevor es anderen Mitgliedern begegnet.", href: legacyUrl("/redaktionelle-kontrolle.html") },
  { title: "Check des akademischen Status", text: "Mit der Prüfung des akademischen Status setzen wir unser persönliches Zeichen von Seriosität.", href: legacyUrl("/redaktionelle-kontrolle.html") },
  { title: "Verifizierte Profile", text: "Verifizierte Mitglieder tragen ein sichtbares Symbol – so wissen Sie, dass Sie mit einem echten Menschen schreiben.", href: legacyUrl("/premium-mitgliedschaft.html") },
  { title: "Sichere Technik", text: "Rechenzentren in Deutschland und eine verschlüsselte Verbindung für Login, Nachrichten und Profil.", href: legacyUrl("/sicherheit-und-datenschutz.html") },
];

function DarkHero({ page, eyebrow, title, lead, image }: { page: PublicPage; eyebrow: string; title: React.ReactNode; lead: string; image?: string }) {
  return <section className={styles.hero}>
    <div className={`container ${styles.heroInner} ${image ? styles.heroSplit : ""}`}>
      <div>
        <Breadcrumbs items={crumbsFor(page)} tone="dark" />
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="display">{title}</h1>
        <p className={styles.lead}>{lead}</p>
      </div>
      {image ? <div className={styles.heroMedia}><Image src={image} alt="Paar, das sich über AkademikerSingles gefunden hat" fill priority sizes="(max-width: 900px) 100vw, 42vw" /></div> : null}
    </div>
  </section>;
}

export function AboutTemplate({ page }: { page: PublicPage }) {
  const crumbs = crumbsFor(page);
  const articleCount = getArticles().length;
  const cityCount = getCities().length;
  return <main>
    <JsonLd data={{ "@context": "https://schema.org", "@graph": [
      breadcrumbJsonLd(crumbs, ORIGIN),
      { "@type": "AboutPage", name: page.title, url: page.canonical, description: page.description, inLanguage: "de-DE", mainEntity: { "@id": `${ORIGIN}/#organization` } },
      { "@type": "Organization", "@id": `${ORIGIN}/#organization`, name: "AkademikerSingles.de", url: `${ORIGIN}/`, logo: `${ORIGIN}/brand/logo.svg` },
    ] }} />
    <DarkHero page={page} eyebrow="Über AkademikerSingles" title={<>Wo Anspruch auf <em>Gegenüber</em> trifft.</>} lead="Seit über 20 Jahren bringen wir gebildete Singles zusammen – mit manuell geprüften Profilen, absoluter Diskretion und dem Anspruch, dass sich Menschen auf Augenhöhe begegnen." image="/brand/success-stories.jpg" />

    <section className={`container ${styles.manifesto}`}>
      <p className="eyebrow">Unsere Haltung</p>
      <p className={`display ${styles.statement}`}>Wer im Leben viel erreicht hat, sucht in der Liebe keinen Kompromiss, sondern <em>Resonanz</em>: einen Menschen, der mitdenkt, mitfühlt und dieselben Werte teilt.</p>
      <dl className={styles.stats}>{STATS.map(stat => <div key={stat.label}><dt>{stat.value}</dt><dd>{stat.label}</dd></div>)}</dl>
    </section>

    <section className={styles.valuesWrap}>
      <div className={`container ${styles.values}`}>
        {VALUES.map((value, index) => <article key={value.title}>
          <span className={styles.numeral}>{["I", "II", "III"][index]}</span>
          <h2 className="display">{value.title}</h2>
          <p>{value.text}</p>
        </article>)}
      </div>
    </section>

    <section className={`container ${styles.quality}`}>
      <div className={styles.qualityHead}>
        <p className="eyebrow">Qualität, die man spürt</p>
        <h2 className="display">So sorgen wir für ein Umfeld mit <em>Niveau</em>.</h2>
        <p>Exklusivität entsteht nicht durch Versprechen, sondern durch Sorgfalt – bei jedem einzelnen Profil.</p>
      </div>
      <ol className={styles.steps}>{STEPS.map(step => <li key={step.title}><a href={step.href}><h3 className="display">{step.title}</h3><p>{step.text}</p><span>Mehr erfahren →</span></a></li>)}</ol>
    </section>

    <section className={styles.expertise}>
      <div className={`container ${styles.expertiseInner}`}>
        <div>
          <p className="eyebrow">Die Expertise dahinter</p>
          <h2 className="display">Rat von Menschen, die das <em>Dating-Business</em> kennen.</h2>
          <p>Hinter unseren Tipps für die erfolgreiche Partnersuche steht Christian M. Haas, Datingexperte mit langjähriger Erfahrung. Er weiß, dass gebildete Singles oft nach mehr suchen als nur Sympathie – nach gemeinsamen Werten, Lebenszielen und echter geistiger Verbindung.</p>
          <p>Unsere Redaktion schreibt im Magazin über Erfolg & Anziehung, Unternehmer Dating, Lifestyle, Status & Luxus und Beziehungen auf Augenhöhe – bislang {articleCount} Beiträge. Dazu kommt die Partnersuche in {cityCount} Universitäts- und Wirtschaftsstädten.</p>
          <div className={styles.actions}>
            <Link className="btn btn-gold" href="/magazin/">Zum Magazin</Link>
            <Link className="btn btn-ghost" href="/partnersuche/">Partnersuche nach Städten</Link>
          </div>
        </div>
        <div className={styles.expertiseSeal}><ReviewSeal variant="inline" /></div>
      </div>
    </section>

    <section className={`container ${styles.closing}`}>
      <div className={styles.trustList}>
        <p className="eyebrow">Transparenz</p>
        <h2 className="display">Alles Wichtige auf einen Blick</h2>
        <ul>
          {TRUST_LINKS.map(link => <li key={link.href}><a href={link.href}>{link.label}<span aria-hidden="true">→</span></a></li>)}
          <li><Link href="/faq/">Häufige Fragen<span aria-hidden="true">→</span></Link></li>
        </ul>
      </div>
      <RegisterPanel title="Lernen Sie uns kennen – kostenlos" text="Erstellen Sie Ihr Profil in wenigen Minuten und entdecken Sie Singles, die Ihre Ansprüche an Bildung, Stil und Tiefgang teilen." />
    </section>
  </main>;
}

export function FaqTemplate({ page }: { page: PublicPage }) {
  const crumbs = crumbsFor(page);
  return <main>
    <JsonLd data={{ "@context": "https://schema.org", "@graph": [
      breadcrumbJsonLd(crumbs, ORIGIN),
      {
        "@type": "FAQPage", name: page.title, url: page.canonical, inLanguage: "de-DE",
        mainEntity: FAQ_GROUPS.flatMap(group => group.items).map(item => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: faqPlainAnswer(item) } })),
      },
    ] }} />
    <DarkHero page={page} eyebrow="FAQ" title={<>Häufige <em>Fragen</em></>} lead="Alles Wichtige zu Anmeldung, Mitgliedschaft, Sicherheit und Kündigung – kurz, klar und ehrlich beantwortet." />
    <section className={`container ${styles.faq}`}>
      <nav className={styles.faqNav} aria-label="FAQ-Themen">
        <p>Themen</p>
        {FAQ_GROUPS.map(group => <a key={group.id} href={`#${group.id}`}>{group.title}<small>{group.items.length}</small></a>)}
        <div className={styles.faqHelp}>
          <strong className="display">Noch Fragen?</strong>
          <span>Unser Team hilft Ihnen persönlich weiter.</span>
          <a href={legacyUrl("/hilfe/")}>Hilfe & Support →</a>
        </div>
      </nav>
      <div className={styles.faqGroups}>
        {FAQ_GROUPS.map((group, groupIndex) => <section key={group.id} id={group.id} className={styles.faqGroup} aria-labelledby={`${group.id}-titel`}>
          <h2 className="display" id={`${group.id}-titel`}><span>{String(groupIndex + 1).padStart(2, "0")}</span>{group.title}</h2>
          {group.items.map((item, index) => <details key={item.question} className={styles.faqItem} open={groupIndex === 0 && index === 0}>
            <summary><span>{item.question}</span><i aria-hidden="true" /></summary>
            <div className={styles.faqAnswer}>
              {item.answer.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
              {item.links?.length ? <p className={styles.faqLinks}>{item.links.map(link => link.href.startsWith("/") ? <Link key={link.href} href={link.href}>{link.label} →</Link> : <a key={link.href} href={link.href}>{link.label} →</a>)}</p> : null}
            </div>
          </details>)}
        </section>)}
        <div className={styles.faqCta}>
          <div><h2 className="display">Bereit für Begegnungen mit <em>Niveau</em>?</h2><p>Die Basis-Mitgliedschaft ist kostenlos – Sie entscheiden, wann Sie mehr möchten.</p></div>
          <a className="btn btn-gold" href={registrationUrl()}>Kostenlos registrieren</a>
        </div>
      </div>
    </section>
  </main>;
}
