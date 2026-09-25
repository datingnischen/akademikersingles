// nginx vor der Live-Domain reicht nur Seitenrouten an Vercel weiter. Dateien aus public/,
// /_next/static und /_next/image kommen deshalb absolut vom Vercel-Host.
const DEFAULT_ASSET_HOST = "https://akademikersingles.vercel.app";
const DEFAULT_ASSET_PATH_PREFIX = "/app-assets";

function trimTrailingSlash(value: string) {
  return value.replace(/\/+$/, "");
}

function normalizeAssetPathPrefix(value: string) {
  const withLeadingSlash = value.startsWith("/") ? value : `/${value}`;
  const trimmed = trimTrailingSlash(withLeadingSlash);
  return trimmed || DEFAULT_ASSET_PATH_PREFIX;
}

export const assetHost = trimTrailingSlash(
  process.env.NEXT_PUBLIC_ASSET_HOST || DEFAULT_ASSET_HOST,
);

export const assetPathPrefix = normalizeAssetPathPrefix(
  process.env.NEXT_PUBLIC_ASSET_PATH_PREFIX || DEFAULT_ASSET_PATH_PREFIX,
);

export const assetBaseUrl = `${assetHost}${assetPathPrefix}`;

// Entspricht images.path in next.config.ts (mit Slash wegen trailingSlash: true).
export const imageOptimizerPath = process.env.NODE_ENV === "development" ? "/_next/image" : `${assetHost}/_next/image/`;

export function staticAsset(path: string) {
  if (!path) return path;
  if (/^https?:\/\//i.test(path)) return path;
  return `${assetBaseUrl}${path.startsWith("/") ? path : `/${path}`}`;
}
