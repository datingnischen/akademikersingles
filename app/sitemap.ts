import type { MetadataRoute } from "next";
import { getPages } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  return getPages().map(page => ({ url: page.canonical, ...(page.modified ? { lastModified: page.modified } : {}) }));
}
