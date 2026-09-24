import Image from "next/image";
import Link from "next/link";
import { ArticleCard, CityTile, ReviewSeal } from "@/components/ui";
import { categoryLabel, getArticles, getCities, getLeadCategories, renderedContentHtml, topicCover, type PublicPage } from "@/lib/content";
import { legacyUrl, registrationUrl } from "@/lib/site";
import styles from "./home.module.css";

const PILLARS = [
  { numeral: "I", title: "Redaktionelle Kontrolle", text: "Jedes neue Profil wird von unserem Team persönlich geprüft – für ein Umfeld, in dem Seriosität selbstverständlich ist.", href: legacyUrl("/redaktionelle-kontrolle.html") },
  { numeral: "II", title: "Absolute Diskretion", text: "Strenger Datenschutz, Server in Deutschland und Funktionen wie anonymes Surfen für Menschen, die in der Öffentlichkeit stehen.", href: legacyUrl("/sicherheit-und-datenschutz.html") },
  { numeral: "III", title: "Begegnung auf Augenhöhe", text: "Mit dem Check des akademischen Status treffen Sie Singles, die Bildung, Ambition und Tiefgang teilen.", href: legacyUrl("/kostenlose-basis-mitgliedschaft.html") },
];

const FEATURES = [
  { title: "Fragenflirt", text: "Klare Antworten auf direkte Fragen: Sie erkennen früh, ob Lebensstil und Werte zusammenpassen.", image: "/brand/feature-fragenflirt.png", width: 722, height: 622, href: legacyUrl("/fragenflirt.html") },
  { title: "Fotoflirt", text: "Der erste Eindruck zählt. Entdecken Sie Profile mit Ausstrahlung – und zeigen Sie Ihre eigene.", image: "/brand/feature-fotoflirt.png", width: 898, height: 550, href: legacyUrl("/fotoflirt.html") },
  { title: "Videodate", text: "Persönlich kennenlernen, bevor Sie sich treffen – bequem, sicher und ohne Ihre Nummer zu teilen.", image: "/brand/feature-videodate-hand.png", width: 726, height: 693, href: legacyUrl("/videodate.html") },
];

export function HomeTemplate({ page }: { page: PublicPage }) {
  const register = registrationUrl();
  const articles = getArticles();
  const topics = getLeadCategories().map(category => ({ category, cover: topicCover(category.slug) })).filter(topic => topic.cover);
  const cities = getCities();
  return <main>
    <section className={styles.hero}>
      <Image className={styles.heroImage} src="/brand/hero-couple.jpg" alt="Glückliches Paar mit Niveau – Akademiker Singles" fill priority sizes="100vw" />
      <div className={`container ${styles.heroInner}`}>
        <p className="eyebrow">Die Partnersuche für Akademiker &amp; Erfolgreiche</p>
        <h1 className="display">{page.heroTitle.replace(/\.$/, "")}<em>.</em></h1>
        <p className={styles.heroLead}>Für Menschen, die Bildung, Erfolg und Stil leben – und genau das auch in der Liebe suchen. Niveauvoll, diskret und auf Augenhöhe.</p>
        <div className={styles.heroActions}>
          <a className="btn btn-gold" href={register}>Kostenlos registrieren</a>
          <Link className="btn btn-ghost" href="/magazin/">Das Magazin entdecken</Link>
        </div>
        <dl className={styles.stats}>
          <div><dt>750.000+</dt><dd>Mitglieder mit Anspruch</dd></div>
          <div><dt>100 %</dt><dd>manuell geprüfte Profile</dd></div>
          <div><dt>Seit 2008</dt><dd>Erfahrung im Online-Dating</dd></div>
        </dl>
      </div>
    </section>

    <section className={styles.ribbon} aria-label="Magazin-Themen">
      <div className={styles.ribbonTrack}>
        {[...topics, ...topics].map(({ category }, index) => <Link key={`${category.slug}-${index}`} href={category.path} tabIndex={index >= topics.length ? -1 : undefined} aria-hidden={index >= topics.length ? true : undefined}>{categoryLabel(category)}</Link>)}
      </div>
    </section>

    <section className={`container ${styles.section}`}>
      <div className={styles.sectionHead}>
        <div>
          <p className="eyebrow">Das Magazin</p>
          <h2 className="display">Über Erfolg, Stil und <em>die Kunst</em>, einander zu begegnen.</h2>
        </div>
        <Link className="link-arrow" href="/magazin/">Alle Artikel <span aria-hidden="true">→</span></Link>
      </div>
      <div className={styles.topics}>
        {topics.map(({ category, cover }, index) => <Link key={category.slug} href={category.path} className={`${styles.topic} ${index === 0 ? styles.topicLead : ""}`}>
          <Image src={cover!.heroImage!} alt="" fill sizes={index === 0 ? "(max-width: 900px) 100vw, 50vw" : "(max-width: 900px) 50vw, 25vw"} />
          <span className={styles.topicText}>
            <small>{String(index + 1).padStart(2, "0")} · {category.count} Artikel</small>
            <strong>{categoryLabel(category)}</strong>
            {index === 0 && category.description ? <span>{category.description}</span> : null}
          </span>
        </Link>)}
      </div>
    </section>

    <section className={styles.pillarsWrap}>
      <div className={`container ${styles.pillars}`}>
        <div className={styles.pillarsIntro}>
          <p className="eyebrow">Warum AkademikerSingles</p>
          <h2 className="display">Exklusivität entsteht durch <em>Sorgfalt</em>.</h2>
          <p>Wir bürgen für Qualität durch absolute Diskretion und redaktionelle Kontrolle – damit Sie Ihre Zeit nur mit Menschen verbringen, die Ihnen wirklich entsprechen.</p>
        </div>
        {PILLARS.map(pillar => <a key={pillar.title} className={styles.pillar} href={pillar.href}>
          <span className={styles.numeral}>{pillar.numeral}</span>
          <h3 className="display">{pillar.title}</h3>
          <p>{pillar.text}</p>
          <span className={styles.pillarMore}>Mehr erfahren →</span>
        </a>)}
      </div>
    </section>

    <section className={`container ${styles.section}`}>
      <div className={styles.sectionHead}>
        <div>
          <p className="eyebrow">Neu im Magazin</p>
          <h2 className="display">Lesenswert für Menschen mit <em>Anspruch</em>.</h2>
        </div>
      </div>
      <div className={styles.latest}>
        <ArticleCard article={articles[0]} size="large" />
        <div className={styles.latestList}>{articles.slice(1, 5).map(article => <ArticleCard key={article.path} article={article} size="compact" />)}</div>
      </div>
    </section>

    <section className={styles.features}>
      <div className="container">
        <div className={styles.sectionHead}>
          <div>
            <p className="eyebrow">Kennenlernen mit Stil</p>
            <h2 className="display">Drei Wege zum ersten <em>Gespräch</em>.</h2>
          </div>
        </div>
        <div className={styles.featureGrid}>
          {FEATURES.map(feature => <a key={feature.title} className={styles.feature} href={feature.href}>
            <span className={styles.featureMedia}><Image src={feature.image} alt={`${feature.title} auf AkademikerSingles`} width={feature.width} height={feature.height} sizes="(max-width: 900px) 90vw, 380px" /></span>
            <h3 className="display">{feature.title}</h3>
            <p>{feature.text}</p>
          </a>)}
        </div>
      </div>
    </section>

    <section className={`container ${styles.section}`}>
      <div className={styles.sectionHead}>
        <div>
          <p className="eyebrow">Partnersuche vor Ort</p>
          <h2 className="display">Singles in den großen <em>Universitätsstädten</em>.</h2>
        </div>
        <Link className="link-arrow" href="/partnersuche/">Alle {cities.length} Städte <span aria-hidden="true">→</span></Link>
      </div>
      <div className={styles.cities}>{cities.slice(0, 10).map(city => <CityTile key={city.path} city={city} />)}</div>
    </section>

    <section className={styles.award}>
      <div className={`container ${styles.awardInner}`}>
        <div className={styles.awardSeal}><ReviewSeal variant="inline" /></div>
        <div className={styles.awardText}>
          <p className="eyebrow">Unabhängig bewertet</p>
          <h2 className="display">Empfohlen in der Kategorie <em>Singlebörsen für Akademiker</em>.</h2>
          <p>Singlebörsen-Überblick hat AkademikerSingles.de ausführlich getestet und mit 4,5 von 5 Sternen als „sehr gut“ bewertet – für Seriosität, Profilqualität und den Datenschutz.</p>
          <a className="link-arrow" href="https://singleboersen-ueberblick.de/partnersuche/akademikersingles-de/" target="_blank" rel="noopener">Zum Testbericht <span aria-hidden="true">→</span></a>
        </div>
      </div>
    </section>

    <section className={`container ${styles.about}`}>
      <div className={styles.aboutHead}>
        <p className="eyebrow">Über AkademikerSingles</p>
        <h2 className="display">Gebildete Singles, <em>niveauvoll</em> vereint.</h2>
        <a className="btn btn-dark" href={register}>Kostenlos testen</a>
        <p className={styles.aboutMore}><Link className="link-arrow" href="/ueber-uns/">Mehr über uns</Link> <Link className="link-arrow" href="/faq/">Häufige Fragen</Link></p>
      </div>
      <div className="prose" dangerouslySetInnerHTML={{ __html: renderedContentHtml(page) }} />
    </section>

    <section className={styles.stories}>
      <div className={`container ${styles.storiesInner}`}>
        <div className={styles.storiesMedia}><Image src="/brand/success-stories.jpg" alt="Paar, das sich über AkademikerSingles gefunden hat" width={1110} height={802} sizes="(max-width: 900px) 100vw, 50vw" /></div>
        <div>
          <p className="eyebrow">Erfolgsgeschichten</p>
          <h2 className="display">Aus einem Gespräch wurde <em>ein gemeinsamer Weg</em>.</h2>
          <p>Viele Paare haben sich auf AkademikerSingles.de gefunden – weil hier Menschen aufeinandertreffen, die ähnlich denken, fühlen und leben.</p>
          <a className="btn btn-outline" href={legacyUrl("/unsere-erfolgsgeschichten.html")}>Erfolgsgeschichten lesen</a>
        </div>
      </div>
    </section>
  </main>;
}
