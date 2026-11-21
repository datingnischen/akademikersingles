/**
 * Das ICONY-Frame (js.icony.com/frame) zeigt ohne `as`/`ae` nur 18 bis 60 Jahre – das sind die Standardwerte des
 * Widgets, nachweisbar im Generator-Skript (`registerOption($("#generator-frame-age-min"),"as")`). Die aus dem
 * ICONY-Import übernommenen Widget-URLs bringen die Parameter nicht mit, deshalb ergänzen wir sie beim Rendern.
 * Vorhandene Werte bleiben unangetastet.
 */
export function widgetUrlWithAgeRange(widgetUrl: string, ageMin = 18, ageMax = 99) {
  try {
    const url = new URL(widgetUrl, "https://js.icony.com");
    if (!url.searchParams.has("as")) url.searchParams.set("as", String(ageMin));
    if (!url.searchParams.has("ae")) url.searchParams.set("ae", String(ageMax));
    return url.toString();
  } catch {
    return widgetUrl;
  }
}
