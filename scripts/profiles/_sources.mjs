// Hilfsfunktionen für die Dossier-Skripte: Quellen zusammenführen und auf die tatsächlich belegten Angaben kürzen.
// Die Quellenliste der Seite soll nur enthalten, was im Text auch per Fussnote referenziert wird.

export function usedSourceIds(profile) {
  const metrics = [...profile.briefing, ...profile.kpis, ...profile.dossier.flatMap(chapter => chapter.metrics)];
  return new Set([
    ...metrics.flatMap(metric => [metric.source, metric.compareSource].filter(Boolean)),
    ...(profile.clusterSources ?? []),
    ...(profile.quarterSources ?? []),
    ...(profile.universities ?? []).flatMap(item => [item.source, item.compareSource].filter(Boolean)),
    ...(profile.quarters ?? []).map(item => item.source).filter(Boolean),
  ]);
}

/** Quellen aktualisieren/ergänzen und anschliessend auf die referenzierten kürzen. */
export function applySources(profile, updates) {
  const byId = new Map(profile.sources.map(source => [source.id, source]));
  for (const [id, data] of Object.entries(updates)) byId.set(id, { id, ...data });
  const used = usedSourceIds(profile);
  const missing = [...used].filter(id => !byId.has(id));
  if (missing.length) throw new Error(`Quellen fehlen: ${missing.join(", ")}`);
  profile.sources = [...byId.values()].filter(source => used.has(source.id));
  return profile.sources;
}

/** SEO-Texte früh prüfen: Titel max. 60, Description 110–150 Zeichen (siehe tests/city-seo-titles.test.mjs). */
export function checkSeo(profile) {
  const title = profile.seoTitle ?? "";
  const description = profile.seoDescription ?? "";
  if (title.length > 60) throw new Error(`seoTitle ${title.length} Zeichen: ${title}`);
  if (description.length < 110 || description.length > 150) throw new Error(`seoDescription ${description.length} Zeichen: ${description}`);
}
