import { searchUrl } from "@/lib/site";
import styles from "./city-search-fallback.module.css";

// Hinweis unter der Städteübersicht: Wer seine Stadt nicht findet, sucht über die ICONY-Suche der Live-Domain.
export function CitySearchFallback() {
  return <aside className={styles.fallback} aria-labelledby="individuelle-suche">
    <div className={styles.copy}>
      <p className="eyebrow">Individuelle Suche</p>
      <h2 className="display" id="individuelle-suche">Ihre Stadt ist nicht dabei? Suchen Sie <em>im Umkreis</em>.</h2>
      <p>Nicht jede Stadt hat eine eigene Seite – Akademikerinnen und Akademiker auf Partnersuche gibt es trotzdem auch in Ihrer Region. In der individuellen Suche legen Sie Ort, Umkreis und Alter selbst fest und sehen, welche Singles in Ihrer Nähe ein Profil haben.</p>
    </div>
    <a className="btn btn-dark" href={searchUrl("location")}>Zur individuellen Suche</a>
  </aside>;
}
