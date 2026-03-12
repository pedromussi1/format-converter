import type { OutputFormat } from "@/types";

export interface FormatInfo {
  id: OutputFormat;
  label: string;
  mimeType: string;
  extension: string;
  lossy: boolean;
  description: string;
}

export const FORMATS: FormatInfo[] = [
  {
    id: "webp",
    label: "WebP",
    mimeType: "image/webp",
    extension: "webp",
    lossy: true,
    description: "Modern format with excellent compression. Best for web use.",
  },
  {
    id: "avif",
    label: "AVIF",
    mimeType: "image/avif",
    extension: "avif",
    lossy: true,
    description: "Next-gen format with superior compression. Smaller than WebP.",
  },
  {
    id: "jpeg",
    label: "JPEG",
    mimeType: "image/jpeg",
    extension: "jpg",
    lossy: true,
    description: "Universal format, ideal for photos.",
  },
  {
    id: "png",
    label: "PNG",
    mimeType: "image/png",
    extension: "png",
    lossy: false,
    description: "Lossless format, perfect for graphics with transparency.",
  },
  {
    id: "gif",
    label: "GIF",
    mimeType: "image/gif",
    extension: "gif",
    lossy: false,
    description: "Supports animation and simple graphics.",
  },
  {
    id: "tiff",
    label: "TIFF",
    mimeType: "image/tiff",
    extension: "tiff",
    lossy: false,
    description: "High-quality lossless format used in professional printing.",
  },
];

export const FORMAT_MAP: Record<string, FormatInfo> = Object.fromEntries(
  FORMATS.map((f) => [f.id, f])
);

/** Accepted MIME types for file input */
export const ACCEPTED_MIME_TYPES = [
  "image/png",
  "image/jpeg",
  "image/webp",
  "image/avif",
  "image/gif",
  "image/tiff",
  "image/bmp",
].join(",");

/** Normalize "jpg" alias to canonical "jpeg" key */
export function normalizeFormat(format: string): string {
  return format === "jpg" ? "jpeg" : format;
}

/** Derive the output filename from the original file + chosen format */
export function buildOutputFilename(originalName: string, format: OutputFormat): string {
  const dot = originalName.lastIndexOf(".");
  const base = dot !== -1 ? originalName.slice(0, dot) : originalName;
  return `${base}.${FORMAT_MAP[format].extension}`;
}
