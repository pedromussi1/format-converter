import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";
import { isAllowedOutputFormat, MAX_FILE_SIZE_BYTES } from "@/lib/validation";
import { buildOutputFilename } from "@/lib/formats";
import type { OutputFormat } from "@/types";

export const runtime = "nodejs";

// Increase body size limit for this route
export const maxDuration = 60;

export async function POST(req: NextRequest) {
  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const fileEntry = formData.get("file");
  const outputFormat = formData.get("outputFormat");
  const qualityRaw = formData.get("quality");

  if (!fileEntry || !(fileEntry instanceof Blob)) {
    return NextResponse.json({ error: "No file provided." }, { status: 400 });
  }

  if (!outputFormat || typeof outputFormat !== "string" || !isAllowedOutputFormat(outputFormat)) {
    return NextResponse.json({ error: "Invalid output format." }, { status: 400 });
  }

  const quality = qualityRaw ? Math.min(100, Math.max(1, parseInt(String(qualityRaw), 10))) : 85;

  if (isNaN(quality)) {
    return NextResponse.json({ error: "Invalid quality value." }, { status: 400 });
  }

  if (fileEntry.size > MAX_FILE_SIZE_BYTES) {
    return NextResponse.json({ error: "File too large. Maximum size is 50 MB." }, { status: 413 });
  }

  const arrayBuffer = await fileEntry.arrayBuffer();
  const inputBuffer = Buffer.from(arrayBuffer);

  let outputBuffer: Buffer;
  const format = outputFormat as OutputFormat;

  try {
    const image = sharp(inputBuffer);

    switch (format) {
      case "jpeg":
        outputBuffer = await image.jpeg({ quality }).toBuffer();
        break;
      case "png":
        outputBuffer = await image.png().toBuffer();
        break;
      case "webp":
        outputBuffer = await image.webp({ quality }).toBuffer();
        break;
      case "avif":
        outputBuffer = await image.avif({ quality, effort: 4 }).toBuffer();
        break;
      case "gif":
        outputBuffer = await image.gif().toBuffer();
        break;
      case "tiff":
        outputBuffer = await image.tiff().toBuffer();
        break;
      default:
        return NextResponse.json({ error: "Unsupported format." }, { status: 400 });
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : "Conversion failed.";
    return NextResponse.json({ error: message }, { status: 500 });
  }

  const originalName =
    fileEntry instanceof File ? fileEntry.name : "image";
  const outputFilename = buildOutputFilename(originalName, format);

  const mimeTypes: Record<OutputFormat, string> = {
    jpeg: "image/jpeg",
    png: "image/png",
    webp: "image/webp",
    avif: "image/avif",
    gif: "image/gif",
    tiff: "image/tiff",
  };

  return new NextResponse(outputBuffer.buffer as ArrayBuffer, {
    status: 200,
    headers: {
      "Content-Type": mimeTypes[format],
      "Content-Disposition": `attachment; filename="${outputFilename}"`,
      "Content-Length": String(outputBuffer.length),
    },
  });
}
