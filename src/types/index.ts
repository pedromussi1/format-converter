export type OutputFormat = "png" | "jpeg" | "webp" | "avif" | "gif" | "tiff";

export type FileStatus = "idle" | "converting" | "done" | "error";

export interface ConversionJob {
  id: string;
  file: File;
  status: FileStatus;
  resultBlob?: Blob;
  resultName?: string;
  error?: string;
}
