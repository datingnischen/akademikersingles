// Die importierten WordPress-Auszüge beginnen oft mit dem Audio-Block („Artikel kurz anhören …“). Für Kartentexte
// wird dieser Vorspann entfernt; bleibt danach kaum etwas übrig, ist die Meta-Beschreibung der bessere Teaser.
const AUDIO_PREFIX = /^\s*Artikel (?:kurz )?anhören\s*(?:Die wichtigsten Punkte (?:kurz und )?verständlich zusammengefasst\.\s*)?(?:Dein Browser unterstützt das Audio-Element nicht\.\s*)?/i;
const BROWSER_HINT = /\s*Dein Browser unterstützt das Audio-Element nicht\.\s*/gi;
const MIN_LENGTH = 60;

export function cardSource(excerpt: string | undefined, description: string): string {
  const text = (excerpt ?? "").replace(AUDIO_PREFIX, "").replace(BROWSER_HINT, " ").trim();
  return text.length >= MIN_LENGTH ? text : description;
}
