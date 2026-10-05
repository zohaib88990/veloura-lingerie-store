import type { MetadataRoute } from "next";
import { products } from "@/lib/catalog";
import { articles } from "@/lib/journal";
export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://veloura.example";
  return [
    "",
    "/shop",
    "/about",
    "/help",
    "/journal",
    "/privacy",
    "/terms",
    ...products.map((p) => `/products/${p.id}`),
    ...articles.map((a) => `/journal/${a.slug}`),
  ].map((path) => ({
    url: `${base}${path}`,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
