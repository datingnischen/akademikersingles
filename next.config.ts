import type { NextConfig } from "next";
import { PHASE_DEVELOPMENT_SERVER } from "next/constants.js";

// nginx vor akademikersingles.de reicht nur Seitenrouten weiter: /_next/*, /_next/image und public/
// liefert der Vercel-Host aus. Überschreibbar per NEXT_PUBLIC_ASSET_HOST / NEXT_PUBLIC_ASSET_PATH_PREFIX.
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

export default function nextConfig(phase: string): NextConfig {
  const isDev = phase === PHASE_DEVELOPMENT_SERVER;
  const assetHost = trimTrailingSlash(process.env.NEXT_PUBLIC_ASSET_HOST || DEFAULT_ASSET_HOST);
  const assetHostname = new URL(assetHost).hostname;
  const assetPathPrefix = normalizeAssetPathPrefix(process.env.NEXT_PUBLIC_ASSET_PATH_PREFIX || DEFAULT_ASSET_PATH_PREFIX);

  return {
    poweredByHeader: false,
    trailingSlash: true,
    assetPrefix: isDev ? undefined : `${assetHost}${assetPathPrefix}`,
    images: {
      formats: ["image/avif", "image/webp"],
      qualities: [75, 78],
      minimumCacheTTL: 31536000,
      path: isDev ? "/_next/image" : `${assetHost}/_next/image`,
      remotePatterns: [{ protocol: "https", hostname: assetHostname, pathname: `${assetPathPrefix}/**` }],
    },
    async rewrites() {
      return [{ source: `${assetPathPrefix}/:path*`, destination: "/:path*" }];
    },
    async redirects() {
      // Die WordPress-Paginierung entfällt: Hub und Kategorien zeigen alle Artikel auf einer Seite.
      return [
        { source: "/magazin/page/:n/", destination: "/magazin/", permanent: true },
        // Social Media gehört wie in den Schwesterprojekten zu „Über uns“.
        { source: "/social-media/", destination: "/ueber-uns/social-media/", permanent: true },
        { source: "/magazin/category/:slug/page/:n/", destination: "/magazin/category/:slug/", permanent: true },
        { source: "/magazin/author/:slug/page/:n/", destination: "/magazin/author/:slug/", permanent: true },
      ];
    },
    async headers() {
      return [
        {
          source: "/(.*)",
          headers: [
            { key: "X-Content-Type-Options", value: "nosniff" },
            { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
            { key: "X-Frame-Options", value: "SAMEORIGIN" },
            { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          ],
        },
        { source: "/imported/:path*", headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }] },
      { source: `${assetPathPrefix}/imported/:path*`, headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }] },
      ];
    },
  };
}
