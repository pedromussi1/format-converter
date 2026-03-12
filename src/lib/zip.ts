import { zip } from "fflate";

export async function buildZip(
  files: { name: string; blob: Blob }[]
): Promise<Blob> {
  const fileMap: Record<string, Uint8Array> = {};

  await Promise.all(
    files.map(async ({ name, blob }) => {
      const buffer = await blob.arrayBuffer();
      fileMap[name] = new Uint8Array(buffer);
    })
  );

  return new Promise((resolve, reject) => {
    zip(fileMap, (err, data) => {
      if (err) reject(err);
      else resolve(new Blob([data.buffer as ArrayBuffer], { type: "application/zip" }));
    });
  });
}

export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
