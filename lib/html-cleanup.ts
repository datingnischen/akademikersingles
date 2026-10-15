// Überschriften ohne Text aus dem Import (z. B. <h3>&nbsp;</h3>) entfernen; Seobility meldet sie als „leere Überschrift“.
export function withoutEmptyHeadings(html: string): string {
  return html.replace(/<h([1-6])\b[^>]*>([\s\S]*?)<\/h\1>/gi, (match: string, _level: string, inner: string) =>
    inner.replace(/<[^>]+>/g, "").replace(/&nbsp;| |\s/g, "") ? match : "");
}

// Importierte Bilder ohne Alt-Text (alt="" oder gar keins) bekommen den Seitentitel; Seobility zählt leere Alt-Texte als fehlend.
export function withImageAlt(html: string, title: string): string {
  const alt = title.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
  return html.replace(/<img\b[^>]*>/gi, (tag: string) => (/\balt="[^"]+"/i.test(tag) ? tag : tag.replace(/\salt=""/i, "").replace(/^<img\b/i, `<img alt="${alt}"`)));
}
