import type { OutputFormat } from "@/types";

export async function convertImage(
  file: File,
  outputFormat: OutputFormat,
  quality: number
): Promise<Blob> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("outputFormat", outputFormat);
  formData.append("quality", String(quality));

  const res = await fetch("/api/convert", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    let message = "Conversion failed.";
    try {
      const json = await res.json();
      if (json.error) message = json.error;
    } catch {
      // ignore parse errors
    }
    throw new Error(message);
  }

  return res.blob();
}
