import Image from "next/image";
import Link from "next/link";
import { categoryLabel, cardText, formatDate, primaryCategory, type ImageCredit, type PublicPage } from "@/lib/content";
import { REVIEW, TRUST_LINKS, registrationUrl, type Aid } from "@/lib/site";
import styles from "./ui.module.css";

export function safeJsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c").replace(/>/g, "\\u003e").replace(/&/g, "\\u0026").replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
}

export function JsonLd({ data }: { data: unknown }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(data) }} />;
}

export type Crumb = { name: string; href: string };

export function Breadcrumbs({ items, tone = "light" }: { items: Crumb[]; tone?: "light" | "dark" }) {
  return <nav className={`${styles.crumbs} ${tone === "dark" ? styles.crumbsDark : ""}`} aria-label="Brotkrümelnavigation">
    <ol>{items.map((item, index) => <li key={item.href}>{index < items.length - 1 ? <Link href={item.href}>{item.name}</Link> : <span aria-current="page">{item.name}</span>}</li>)}</ol>
  </nav>;
}

export function breadcrumbJsonLd(items: Crumb[], origin: string) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({ "@type": "ListItem", position: index + 1, name: item.name, item: `${origin}${item.href}` })),
  };
}

export function ArticleCard({ article, size = "default", priority = false }: { article: PublicPage; size?: "default" | "large" | "compact"; priority?: boolean }) {
  const category = primaryCategory(article);
  return <article className={`${styles.card} ${styles[`card_${size}`]}`}>
    <Link className={styles.cardMedia} href={article.path} tabIndex={-1} aria-hidden="true">
      {article.heroImage ? <Image src={article.heroImage} alt="" fill sizes={size === "large" ? "(max-width: 900px) 100vw, 60vw" : "(max-width: 640px) 100vw, (max-width: 1100px) 50vw, 400px"} priority={priority} /> : null}
    </Link>
    <div className={styles.cardBody}>
      <div className={styles.cardMeta}>
        {category ? <Link href={category.path}>{categoryLabel(category)}</Link> : null}
        {article.readingMinutes ? <span>{article.readingMinutes} Min. Lesezeit</span> : null}
      </div>
      <h3 className="display"><Link href={article.path}>{article.heroTitle}</Link></h3>
      {size !== "compact" ? <p>{cardText(article)}</p> : null}
      {size === "large" ? <span className={styles.cardDate}>Aktualisiert {formatDate(article.modified ?? article.published)}</span> : null}
    </div>
  </article>;
}

export function CityTile({ city, priority = false }: { city: PublicPage; priority?: boolean }) {
  return <Link className={styles.cityTile} href={city.path}>
    {city.heroImage ? <Image src={city.heroImage} alt={`Akademiker Singles in ${city.locationName}`} fill sizes="(max-width: 640px) 50vw, (max-width: 1100px) 33vw, 300px" priority={priority} /> : null}
    <span className={styles.cityLabel}><small>Singles in</small><strong>{city.locationName}</strong></span>
    <i aria-hidden="true">→</i>
  </Link>;
}

export function ReviewSeal({ variant = "card" }: { variant?: "card" | "inline" }) {
  return <a className={`${styles.review} ${variant === "inline" ? styles.reviewInline : ""}`} href={REVIEW.url} target="_blank" rel="noopener">
    <Image src={REVIEW.seal} alt="Empfohlen von Singlebörsen-Überblick in der Kategorie Singlebörsen für Akademiker – 4,5 Sterne, sehr gut" width={300} height={450} sizes="180px" />
    <span className={styles.reviewText}>
      <span className={styles.stars} aria-hidden="true">★★★★<span>★</span></span>
      <strong>{REVIEW.rating} von 5 Sternen</strong>
      <span>Empfohlen in der Kategorie „Singlebörsen für Akademiker“</span>
      <em>{REVIEW.label} lesen →</em>
    </span>
  </a>;
}

export function RegisterPanel({ aid, title = "Menschen mit Niveau kennenlernen", text = "Erstellen Sie kostenlos Ihr Profil und begegnen Sie Singles, die Bildung, Erfolg und echte Gespräche zu schätzen wissen." }: { aid?: Aid | null; title?: string; text?: string }) {
  return <div className={styles.register}>
    <p className="eyebrow">Kostenlos starten</p>
    <h2 className="display">{title}</h2>
    <p>{text}</p>
    <a className="btn btn-gold" href={registrationUrl(aid)}>Kostenlos registrieren</a>
    <ul>
      <li>Jedes Profil manuell geprüft</li>
      <li>Diskret &amp; DSGVO-konform</li>
      <li>Basis-Mitgliedschaft kostenlos</li>
    </ul>
  </div>;
}

export function TrustPanel() {
  return <div className={styles.trust}>
    <h2>Vertrauen &amp; Qualität</h2>
    <ul>{TRUST_LINKS.map(link => <li key={link.href}><a href={link.href}>{link.label}<span aria-hidden="true">→</span></a></li>)}</ul>
  </div>;
}

export function Sidebar({ aid }: { aid?: Aid | null }) {
  return <aside className={styles.sidebar}>
    <RegisterPanel aid={aid} />
    <ReviewSeal />
    <TrustPanel />
  </aside>;
}

export function ImageCredits({ credits }: { credits: ImageCredit[] }) {
  if (!credits.length) return null;
  return <aside className={styles.credits} aria-label="Bildnachweise">
    <span className={styles.creditsLabel}>Bildnachweis{credits.length > 1 ? "e" : ""}</span>
    <ul>{credits.map(credit => <li key={credit.href}><a href={credit.href} target="_blank" rel="nofollow noopener">{credit.label}</a><span> · {credit.provider}</span></li>)}</ul>
  </aside>;
}
