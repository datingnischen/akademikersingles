import sitemap from "../../sitemap";

// Sitemap unter der alten WordPress-Adresse: Auf der Live-Domain reicht nginx nur Seitenrouten wie /magazin/… an Vercel,
// /sitemap.xml beantwortet ICONY mit 404. ICONYs sitemap.php verweist auf /magazin/sitemap.xml.
export const revalidate = 3600;

function escapeXml(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function isoDate(value: string | Date | undefined) {
  if (!value) return "";
  const date = value instanceof Date ? value : new Date(value);
  return Number.isNaN(date.getTime()) ? "" : date.toISOString();
}

export async function GET() {
  const entries = await sitemap();
  const body = entries
    .map((entry) => {
      const lastModified = isoDate(entry.lastModified);
      return [
        "  <url>",
        `    <loc>${escapeXml(entry.url)}</loc>`,
        lastModified ? `    <lastmod>${lastModified}</lastmod>` : "",
        entry.changeFrequency ? `    <changefreq>${entry.changeFrequency}</changefreq>` : "",
        entry.priority !== undefined ? `    <priority>${entry.priority}</priority>` : "",
        "  </url>",
      ]
        .filter(Boolean)
        .join("\n");
    })
    .join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;
  return new Response(xml, { headers: { "content-type": "application/xml; charset=utf-8" } });
}
