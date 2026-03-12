import type { OutputFormat } from "@/types";

export const MAX_FILE_SIZE_BYTES = 50 * 1024 * 1024; // 50 MB
export const MAX_FILE_SIZE_LABEL = "50 MB";

export const ALLOWED_OUTPUT_FORMATS: OutputFormat[] = [
  "png",
  "jpeg",
  "webp",
  "avif",
  "gif",
  "tiff",
];

export const ALLOWED_INPUT_MIME_TYPES = [
  "image/png",
  "image/jpeg",
  "image/webp",
  "image/avif",
  "image/gif",
  "image/tiff",
  "image/bmp",
];

export function validateFile(file: File): string | null {
  if (!ALLOWED_INPUT_MIME_TYPES.includes(file.type)) {
    return `Unsupported file type: ${file.type || "unknown"}`;
  }
  if (file.size > MAX_FILE_SIZE_BYTES) {
    return `File too large. Maximum size is ${MAX_FILE_SIZE_LABEL}.`;
  }
  return null;
}

export function isAllowedOutputFormat(format: string): format is OutputFormat {
  return ALLOWED_OUTPUT_FORMATS.includes(format as OutputFormat);
}
