import Link from "next/link";
import { AboutNav } from "@/components/company";
import { SearchForm } from "@/components/search-form";
import { Breadcrumbs, type Crumb } from "@/components/ui";
import { SEARCH_PATH, type SearchHit } from "@/lib/search";
import companyStyles from "./company.module.css";
import styles from "./search.module.css";

export const SEARCH_CRUMBS: Crumb[] = [
  { name: "Startseite", href: "/" },
  { name: "Über uns", href: "/ueber-uns/" },
  { name: "Suche", href: SEARCH_PATH },
];

export function SearchTemplate({ query, hits }: { query: string; hits: SearchHit[] }) {
  return <main>
    <section className={companyStyles.hero}>
      <div className={`container ${companyStyles.heroInner}`}>
        <div>
          <Breadcrumbs items={SEARCH_CRUMBS} tone="dark" />
          <p className="eyebrow">Suche</p>
          <h1 className="display">Was möchten Sie <em>lesen</em>?</h1>
          <p className={companyStyles.lead}>Durchsuchen Sie Magazin, Ratgeber, Städteseiten und häufige Fragen von AkademikerSingles.de.</p>
          <SearchForm query={query} tone="dark" />
        </div>
      </div>
    </section>
    <AboutNav current={SEARCH_PATH} />
    <section className={`container ${styles.results}`} aria-live="polite">
      {!query ? <div className={styles.empty}>
        <h2 className="display">Geben Sie einen Suchbegriff ein</h2>
        <p>Zum Beispiel eine Stadt wie <Link href={`${SEARCH_PATH}?q=M%C3%BCnchen`}>München</Link>, ein Thema wie <Link href={`${SEARCH_PATH}?q=Unternehmer`}>Unternehmer</Link> oder eine Frage zur <Link href={`${SEARCH_PATH}?q=Mitgliedschaft`}>Mitgliedschaft</Link>.</p>
      </div> : hits.length === 0 ? <div className={styles.empty}>
        <h2 className="display">Leider nichts gefunden zu „{query}“</h2>
        <p>Versuchen Sie einen kürzeren oder allgemeineren Begriff – oder stöbern Sie direkt im <Link href="/magazin/">Magazin</Link>, in der <Link href="/partnersuche/">Partnersuche nach Städten</Link> oder in den <Link href="/faq/">häufigen Fragen</Link>.</p>
      </div> : <>
        <p className={styles.count}>{hits.length === 1 ? "1 Treffer" : `${hits.length} Treffer`} zu „{query}“</p>
        <ol className={styles.list}>
          {hits.map(hit => <li key={hit.href + hit.title}>
            <Link className={companyStyles.aboutCard} href={hit.href}>
              <span className={companyStyles.cardEyebrow}>{hit.section}</span>
              <h3 className="display">{hit.title}</h3>
              {hit.text ? <p>{hit.text}</p> : null}
              <span className={companyStyles.cardLink}>Weiterlesen →</span>
            </Link>
          </li>)}
        </ol>
      </>}
    </section>
  </main>;
}
