import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://convertimg.app";

const FORMATS = ["png", "jpeg", "jpg", "webp", "avif", "gif", "tiff", "bmp"];
const OUTPUT_FORMATS = ["png", "jpeg", "webp", "avif", "gif", "tiff"];

function conversionPages(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = [];
  for (const from of FORMATS) {
    for (const to of OUTPUT_FORMATS) {
      const normalizedFrom = from === "jpg" ? "jpeg" : from;
      if (normalizedFrom !== to) {
        pages.push({
          url: `${siteUrl}/convert/${from}-to-${to}`,
          lastModified: new Date(),
          changeFrequency: "monthly",
          priority: 0.7,
        });
      }
    }
  }
  return pages;
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/faq`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteUrl}/privacy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    ...conversionPages(),
  ];
}
