import type { MetadataRoute } from "next";
import { normalizeFormat } from "@/lib/formats";
import { ALLOWED_OUTPUT_FORMATS } from "@/lib/validation";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://convertimg.app";

const ALL_INPUT_FORMAT_KEYS = [...ALLOWED_OUTPUT_FORMATS, "jpg", "bmp"] as const;

function conversionPages(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const pages: MetadataRoute.Sitemap = [];
  for (const from of ALL_INPUT_FORMAT_KEYS) {
    for (const to of ALLOWED_OUTPUT_FORMATS) {
      if (normalizeFormat(from) !== to) {
        pages.push({
          url: `${siteUrl}/convert/${from}-to-${to}`,
          lastModified,
          changeFrequency: "monthly",
          priority: 0.7,
        });
      }
    }
  }
  return pages;
}

const lastModified = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/about`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/faq`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteUrl}/privacy`, lastModified, changeFrequency: "yearly", priority: 0.3 },
    { url: `${siteUrl}/terms`, lastModified, changeFrequency: "yearly", priority: 0.3 },
    { url: `${siteUrl}/contact`, lastModified, changeFrequency: "yearly", priority: 0.4 },
    ...conversionPages(),
  ];
}
