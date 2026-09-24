import Image from "next/image";
import Link from "next/link";
import { crumbsFor } from "@/components/templates";
import { ArticleCard, Breadcrumbs, JsonLd, RegisterPanel, ReviewSeal, breadcrumbJsonLd } from "@/components/ui";
import { FAQ_GROUPS, faqPlainAnswer } from "@/lib/authored";
import { getArticles, getCities, type PublicPage } from "@/lib/content";
import { ORIGIN, REVIEW, REVIEW_SOURCES, SOCIAL, TRUST_LINKS, legacyUrl, registrationUrl } from "@/lib/site";
import styles from "./company.module.css";

const FOUNDER = {
  name: "Christian M. Haas",
  role: "Gründer & Datingexperte",
  image: "/brand/christian-m-haas.jpg",
  book: { title: "Dating ohne Bullshit", subtitle: "Der ungeschönte Insiderblick ins Online-Dating-Business", isbn: "9783696371210", isbnDisplay: "978-3-6963-7121-0", url: "https://www.amazon.de/dp/3696371211/", published: "2026-08-21" },
};

const STATS = [
  { value: "750.000+", label: "Mitglieder mit Anspruch" },
  { value: "100 %", label: "manuell geprüfte Profile" },
  { value: "Seit 2008", label: "Erfahrung im Online-Dating" },
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

const ABOUT_NAV = [
  { label: "Überblick", href: "/ueber-uns/" },
  { label: "Gründer", href: "/ueber-uns/#gruender" },
  { label: "Bewertungen", href: "/ueber-uns/bewertungen/" },
  { label: "Social Media", href: "/social-media/" },
  { label: "Erfolgsgeschichten", href: legacyUrl("/unsere-erfolgsgeschichten.html") },
  { label: "FAQ", href: "/faq/" },
];

const ABOUT_CARDS = [
  { eyebrow: "Gründer & Experte", title: "Christian M. Haas", text: "Seit 2008 im Online-Dating aktiv: der Mensch und die Erfahrung hinter AkademikerSingles.de.", href: "/ueber-uns/#gruender", label: "Gründer kennenlernen" },
  { eyebrow: "Bewertungen & Erfahrungen", title: "Was andere über uns sagen", text: "Testberichte unabhängiger Vergleichsportale, Trustpilot und die Geschichten unserer Paare.", href: "/ueber-uns/bewertungen/", label: "Bewertungen ansehen" },
  { eyebrow: "Social Media", title: "AkademikerSingles auf YouTube", text: "Videos, Expertenwissen und Inspiration rund um Partnerschaft, Dating und Beziehungen.", href: "/social-media/", label: "Zu Social Media" },
  { eyebrow: "Erfolgsgeschichten", title: "Paare, die sich hier fanden", text: "Aus einem Gespräch wurde ein gemeinsamer Weg – lesen Sie, wie es begann.", href: legacyUrl("/unsere-erfolgsgeschichten.html"), label: "Geschichten lesen" },
  { eyebrow: "Häufige Fragen", title: "Kurz & klar beantwortet", text: "Anmeldung, Mitgliedschaft, Sicherheit, Kosten und Kündigung auf einen Blick.", href: "/faq/", label: "Zur FAQ" },
  { eyebrow: "Das Magazin", title: "Erfolg, Stil & Tiefgang", text: "Artikel über Erfolg & Anziehung, Unternehmer Dating, Lifestyle, Status & Luxus und Beziehungen auf Augenhöhe.", href: "/magazin/", label: "Zum Magazin" },
];

function AboutNav({ current }: { current: string }) {
  return <nav className={styles.aboutNav} aria-label="Bereich Über uns">
    <div className="container">
      {ABOUT_NAV.map(item => {
        const active = item.href === current;
        return item.href.startsWith("/")
          ? <Link key={item.href} href={item.href} aria-current={active ? "page" : undefined}>{item.label}</Link>
          : <a key={item.href} href={item.href}>{item.label}</a>;
      })}
    </div>
  </nav>;
}

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
      { "@type": "Organization", "@id": `${ORIGIN}/#organization`, name: "AkademikerSingles.de", url: `${ORIGIN}/`, logo: `${ORIGIN}/brand/logo.svg`, founder: { "@id": `${page.canonical}#gruender` } },
      {
        "@type": "Person", "@id": `${page.canonical}#gruender`, name: FOUNDER.name, jobTitle: FOUNDER.role, image: `${ORIGIN}${FOUNDER.image}`, url: `${page.canonical}#gruender`,
        knowsAbout: ["Online-Dating", "Partnersuche", "Singlebörsen"],
      },
      { "@type": "Book", "@id": `${page.canonical}#buch`, name: FOUNDER.book.title, alternateName: FOUNDER.book.subtitle, isbn: FOUNDER.book.isbn, datePublished: FOUNDER.book.published, inLanguage: "de-DE", url: FOUNDER.book.url, author: { "@id": `${page.canonical}#gruender` } },
    ] }} />
    <DarkHero page={page} eyebrow="Über AkademikerSingles" title={<>Wo Anspruch auf <em>Gegenüber</em> trifft.</>} lead="Seit 2008 bringen wir gebildete Singles zusammen – mit manuell geprüften Profilen, absoluter Diskretion und dem Anspruch, dass sich Menschen auf Augenhöhe begegnen." image="/brand/success-stories.jpg" />
    <AboutNav current={page.path} />

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

    <section className={styles.expertise} id="gruender" aria-labelledby="gruender-titel">
      <div className={`container ${styles.founder}`}>
        <figure className={styles.founderPortrait}>
          <Image src={FOUNDER.image} alt="Christian M. Haas, Gründer von AkademikerSingles.de und Datingexperte" width={819} height={1024} sizes="(max-width: 900px) 90vw, 420px" />
          <figcaption><strong>{FOUNDER.name}</strong>{FOUNDER.role}</figcaption>
        </figure>
        <div className={styles.founderText}>
          <p className="eyebrow">Gründer &amp; Experte</p>
          <h2 className="display" id="gruender-titel">Christian M. Haas</h2>
          <p className={styles.founderRole}>Gründer von AkademikerSingles.de · Experte für Online-Dating</p>
          <p>Christian M. Haas hat AkademikerSingles.de gegründet und beschäftigt sich seit 2008 intensiv mit Online-Dating. Von 2008 bis 2016 hat er Singlebörsen entwickelt und betrieben – er kennt die Technik ebenso wie Community-Aufbau, Content und die Frage, was Menschen online wirklich zusammenbringt.</p>
          <p>Seine Überzeugung: Gebildete Singles suchen oft mehr als Sympathie – gemeinsame Werte, Lebensziele und echte geistige Verbindung. Auf dieser Erfahrung beruhen unsere Tipps für die erfolgreiche Partnersuche und die Ausrichtung des Magazins, in dem unsere Redaktion bislang {articleCount} Beiträge veröffentlicht hat.</p>
          <ul className={styles.founderFacts}>
            <li><strong>Seit 2008</strong><span>im Online-Dating aktiv</span></li>
            <li><strong>2008–2016</strong><span>Aufbau und Betrieb von Singlebörsen</span></li>
            <li><strong>{cityCount} Städte</strong><span>Partnersuche vor Ort</span></li>
          </ul>
          <a className={styles.book} href={FOUNDER.book.url} target="_blank" rel="noopener">
            <span className={styles.bookLabel}>Neu erschienen</span>
            <strong className="display">„{FOUNDER.book.title}“</strong>
            <span>{FOUNDER.book.subtitle} · Taschenbuch, 136 Seiten · ISBN {FOUNDER.book.isbnDisplay}</span>
            <em>Bei Amazon ansehen →</em>
          </a>
        </div>
      </div>
    </section>

    <section className={`container ${styles.aboutCards}`} aria-labelledby="mehr-ueber-uns">
      <div className={styles.aboutCardsHead}>
        <p className="eyebrow">Mehr über uns</p>
        <h2 className="display" id="mehr-ueber-uns">Hinter den <em>Kulissen</em></h2>
      </div>
      <div className={styles.cardGrid}>
        {ABOUT_CARDS.map(card => {
          const body = <><span className={styles.cardEyebrow}>{card.eyebrow}</span><h3 className="display">{card.title}</h3><p>{card.text}</p><span className={styles.cardLink}>{card.label} →</span></>;
          return card.href.startsWith("/") ? <Link key={card.href} className={styles.aboutCard} href={card.href}>{body}</Link> : <a key={card.href} className={styles.aboutCard} href={card.href}>{body}</a>;
        })}
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
        <div className={styles.closingSeal}><ReviewSeal /></div>
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
    <AboutNav current={page.path} />
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

const REVIEW_CARDS = [
  {
    source: "singleboersen-ueberblick.de",
    title: "Empfohlen: Singlebörsen für Akademiker",
    verdict: `${REVIEW.rating} von 5 Sternen · „sehr gut“`,
    text: "Im ausführlichen Testbericht empfiehlt Singlebörsen-Überblick AkademikerSingles.de in der Kategorie „Singlebörsen für Akademiker“.",
    seal: { src: REVIEW.seal, width: 300, height: 450, alt: "Empfehlungssiegel von Singlebörsen-Überblick: 4,5 Sterne, sehr gut" },
    href: REVIEW.url,
    label: "Testbericht lesen",
  },
  {
    source: "singleboersen-vergleichen.de",
    title: "„Diese Singlebörse empfehlen wir!“",
    verdict: "Erfolgschancen: sehr gut",
    text: "Hervorgehoben werden die manuelle Prüfung jedes Profils, ID-Checks des akademischen Status und ein sicheres Umfeld mit wenig Fake-Profilen.",
    seal: { src: REVIEW_SOURCES.vergleichen.seal, width: 300, height: 60, alt: "Empfehlungssiegel von singleboersen-vergleichen.de" },
    href: REVIEW_SOURCES.vergleichen.url,
    label: "Bewertung lesen",
  },
];

export function ReviewsTemplate({ page }: { page: PublicPage }) {
  const crumbs = crumbsFor(page);
  return <main>
    <JsonLd data={{ "@context": "https://schema.org", "@graph": [
      breadcrumbJsonLd(crumbs, ORIGIN),
      { "@type": "WebPage", name: page.title, url: page.canonical, description: page.description, inLanguage: "de-DE", about: { "@id": `${ORIGIN}/#organization` } },
    ] }} />
    <DarkHero page={page} eyebrow="Was andere sagen" title={<>Bewertungen &amp; <em>Erfahrungen</em></>} lead="Vertrauen entsteht nicht durch Eigenlob. Hier lesen Sie, wie unabhängige Vergleichsportale AkademikerSingles.de bewerten – und wo Mitglieder ihre Erfahrungen teilen." />
    <AboutNav current={page.path} />
    <section className={`container ${styles.reviews}`}>
      <div className={styles.aboutCardsHead}>
        <p className="eyebrow">Unabhängig getestet</p>
        <h2 className="display">Empfohlen von <em>Vergleichsportalen</em></h2>
      </div>
      <div className={styles.reviewGrid}>
        {REVIEW_CARDS.map(card => <a key={card.source} className={styles.reviewCard} href={card.href} target="_blank" rel="noopener">
          <span className={styles.reviewSeal}><Image src={card.seal.src} alt={card.seal.alt} width={card.seal.width} height={card.seal.height} sizes="200px" /></span>
          <span className={styles.cardEyebrow}>{card.source}</span>
          <h3 className="display">{card.title}</h3>
          <strong className={styles.verdict}>{card.verdict}</strong>
          <p>{card.text}</p>
          <span className={styles.cardLink}>{card.label} →</span>
        </a>)}
      </div>
    </section>
    <section className={styles.valuesWrap}>
      <div className={`container ${styles.reviewMore}`}>
        <a className={styles.aboutCard} href={REVIEW_SOURCES.trustpilot.url} target="_blank" rel="nofollow noopener">
          <span className={styles.cardEyebrow}>Trustpilot</span>
          <h3 className="display">Stimmen von Mitgliedern</h3>
          <p>Statt hier Sterne abzudrucken, die morgen schon veraltet sind, schicken wir Sie direkt zu Trustpilot. Dort lesen Sie, was Mitglieder aktuell über AkademikerSingles.de schreiben.</p>
          <span className={styles.cardLink}>Trustpilot öffnen →</span>
        </a>
        <a className={styles.aboutCard} href={legacyUrl("/unsere-erfolgsgeschichten.html")}>
          <span className={styles.cardEyebrow}>Erfolgsgeschichten</span>
          <h3 className="display">Paare, die sich hier fanden</h3>
          <p>Die schönste Bewertung ist ein gemeinsamer Weg. Lesen Sie, wie Paare sich auf AkademikerSingles.de kennengelernt haben.</p>
          <span className={styles.cardLink}>Geschichten lesen →</span>
        </a>
        <RegisterPanel title="Machen Sie sich selbst ein Bild" text="Die Basis-Mitgliedschaft ist kostenlos. Schauen Sie sich in Ruhe um und entscheiden Sie selbst." />
      </div>
    </section>
  </main>;
}

export function SocialTemplate({ page }: { page: PublicPage }) {
  const crumbs = crumbsFor(page);
  const latest = getArticles().slice(0, 3);
  return <main>
    <JsonLd data={{ "@context": "https://schema.org", "@graph": [
      breadcrumbJsonLd(crumbs, ORIGIN),
      { "@type": "WebPage", name: page.title, url: page.canonical, description: page.description, inLanguage: "de-DE" },
      { "@type": "Organization", "@id": `${ORIGIN}/#organization`, name: "AkademikerSingles.de", url: `${ORIGIN}/`, sameAs: [SOCIAL.youtube.url] },
    ] }} />
    <DarkHero page={page} eyebrow="Social Media" title={<>Folgen Sie <em>AkademikerSingles</em></>} lead={page.description || "Videos, Expertenwissen und Inspiration rund um Partnerschaft, Dating und Beziehungen für anspruchsvolle Singles."} />
    <AboutNav current={page.path} />
    <section className={`container ${styles.social}`}>
      <a className={styles.socialCard} href={SOCIAL.youtube.url} target="_blank" rel="noopener">
        <span className={styles.socialIcon} aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12 31 31 0 0 0 1 16.8a3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .5-4.8 31 31 0 0 0-.5-4.8zM9.7 15.1V8.9l5.8 3.1z" /></svg>
        </span>
        <div>
          <span className={styles.cardEyebrow}>{SOCIAL.youtube.label} · {SOCIAL.youtube.handle}</span>
          <h2 className="display">Videos mit Tiefgang</h2>
          <p>Videos, Expertenwissen und Inspiration rund um Partnerschaft, Dating und Beziehungen für anspruchsvolle Singles.</p>
          <span className={styles.cardLink}>Kanal ansehen →</span>
        </div>
      </a>
    </section>
    <section className={`container ${styles.socialMore}`}>
      <div className={styles.aboutCardsHead}>
        <p className="eyebrow">Weiterlesen</p>
        <h2 className="display">Neu im <em>Magazin</em></h2>
      </div>
      <div className={styles.articleGrid}>{latest.map(article => <ArticleCard key={article.path} article={article} />)}</div>
    </section>
  </main>;
}
