import { SEARCH_PATH } from "@/lib/search";
import styles from "./search.module.css";

// GET-Formular auf die Suchroute unter „Über uns“ – funktioniert ohne JavaScript und hinter dem nginx-Proxy.
export function SearchForm({ query = "", tone = "light", id = "suchbegriff" }: { query?: string; tone?: "light" | "dark"; id?: string }) {
  return <form className={`${styles.form} ${tone === "dark" ? styles.formDark : ""}`} action={SEARCH_PATH} method="get" role="search">
    <label className={styles.label} htmlFor={id}>Suchbegriff</label>
    <input id={id} className={styles.input} type="search" name="q" defaultValue={query} placeholder="z. B. Berlin, Status oder Unternehmer" enterKeyHint="search" autoComplete="off" />
    <button className={`btn ${tone === "dark" ? "btn-gold" : "btn-dark"}`} type="submit">Suchen</button>
  </form>;
}
