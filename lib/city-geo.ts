// Stadtmittelpunkte der Stadtseiten (WGS84) für Luftlinien-Entfernungen.
export const CITY_COORDS: Record<string, [number, number]> = {
  "/partnersuche/aachen/": [50.7753, 6.0839],
  "/partnersuche/berlin/": [52.5200, 13.4050],
  "/partnersuche/bonn/": [50.7374, 7.0982],
  "/partnersuche/dresden/": [51.0504, 13.7373],
  "/partnersuche/frankfurt-am-main/": [50.1109, 8.6821],
  "/partnersuche/freiburg-im-breisgau/": [47.9990, 7.8421],
  "/partnersuche/goettingen/": [51.5413, 9.9158],
  "/partnersuche/hamburg/": [53.5511, 9.9937],
  "/partnersuche/heidelberg/": [49.3988, 8.6724],
  "/partnersuche/karlsruhe/": [49.0069, 8.4037],
  "/partnersuche/koeln/": [50.9375, 6.9603],
  "/partnersuche/muenchen/": [48.1351, 11.5820],
  "/partnersuche/muenster/": [51.9607, 7.6261],
  "/partnersuche/stuttgart/": [48.7758, 9.1829],
  "/partnersuche/tuebingen/": [48.5216, 9.0576],
  // Österreich und Schweiz (Dossiers in data/city-profiles/at|ch/)
  "/partnersuche/wien/": [48.2082, 16.3738],
  "/partnersuche/graz/": [47.0707, 15.4395],
  "/partnersuche/salzburg/": [47.8095, 13.0550],
  "/partnersuche/innsbruck/": [47.2692, 11.4041],
  "/partnersuche/linz/": [48.3069, 14.2858],
  "/partnersuche/zuerich/": [47.3769, 8.5417],
  "/partnersuche/bern/": [46.9480, 7.4474],
  "/partnersuche/basel/": [47.5596, 7.5886],
  "/partnersuche/lausanne/": [46.5197, 6.6323],
  "/partnersuche/st-gallen/": [47.4245, 9.3767],
};

export function distanceKm(a: [number, number], b: [number, number]): number {
  const rad = (deg: number) => deg * Math.PI / 180;
  const dLat = rad(b[0] - a[0]);
  const dLon = rad(b[1] - a[1]);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(rad(a[0])) * Math.cos(rad(b[0])) * Math.sin(dLon / 2) ** 2;
  return Math.round(2 * 6371 * Math.asin(Math.sqrt(h)));
}

export function nearestCities(path: string, paths: string[], count = 5): { path: string; km: number }[] {
  const origin = CITY_COORDS[path];
  if (!origin) return [];
  return paths
    .filter(other => other !== path && CITY_COORDS[other])
    .map(other => ({ path: other, km: distanceKm(origin, CITY_COORDS[other]) }))
    .sort((a, b) => a.km - b.km)
    .slice(0, count);
}
