import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  trailingSlash: true,
  images: { formats: ["image/avif", "image/webp"], qualities: [75, 78], minimumCacheTTL: 31536000 },
  async redirects() {
    // Die WordPress-Paginierung entfällt: Hub und Kategorien zeigen alle Artikel auf einer Seite.
    return [
      { source: "/magazin/page/:n/", destination: "/magazin/", permanent: true },
      // Schwesterprojekte führen Social Media unter /ueber-uns/; hier bleibt die Live-URL /social-media/ kanonisch.
      { source: "/ueber-uns/social-media/", destination: "/social-media/", permanent: true },
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
    ];
  },
};

export default nextConfig;
