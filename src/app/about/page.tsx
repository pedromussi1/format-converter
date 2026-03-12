import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Image Format Guide — PNG vs JPEG vs WebP vs AVIF",
  description:
    "Learn the differences between PNG, JPEG, WebP, AVIF, GIF and TIFF. When to use each format and how to choose the best one for your needs.",
};

const formats = [
  {
    name: "WebP",
    ext: ".webp",
    lossy: true,
    summary: "Modern web format developed by Google. Offers 25–35% better compression than JPEG at equivalent quality, with support for transparency (like PNG). Supported by all modern browsers.",
    bestFor: "Web images, photos, anything that would previously use JPEG or PNG on a website.",
    notFor: "Print production or professional photography workflows.",
    size: "Small",
  },
  {
    name: "AVIF",
    ext: ".avif",
    lossy: true,
    summary: "Next-generation format based on the AV1 video codec. Delivers 40–50% better compression than JPEG. Supports HDR, wide color gamut, and transparency. Encoding is slower than WebP.",
    bestFor: "Highest-quality web images where file size matters most.",
    notFor: "Situations requiring fast encoding of many images in real-time.",
    size: "Smallest",
  },
  {
    name: "JPEG",
    ext: ".jpg",
    lossy: true,
    summary: "The most widely used image format for over 30 years. Excellent compatibility across every device and application. Good compression for photographs but no transparency support.",
    bestFor: "Photographs, universal compatibility, email attachments.",
    notFor: "Graphics with sharp edges, text overlays, or transparency.",
    size: "Small",
  },
  {
    name: "PNG",
    ext: ".png",
    lossy: false,
    summary: "Lossless format that preserves every pixel exactly. Supports full transparency. Larger file sizes than JPEG for photographs but essential for graphics, logos, and screenshots.",
    bestFor: "Logos, icons, screenshots, illustrations, images with transparency.",
    notFor: "Photographs where file size matters (use WebP or JPEG instead).",
    size: "Large",
  },
  {
    name: "GIF",
    ext: ".gif",
    lossy: false,
    summary: "One of the oldest web formats, limited to 256 colors. Supports simple animation. Largely superseded by WebP and AVIF for static images.",
    bestFor: "Simple animations, memes, retro-style graphics.",
    notFor: "Photographs or images with more than 256 colors.",
    size: "Medium",
  },
  {
    name: "TIFF",
    ext: ".tiff",
    lossy: false,
    summary: "Professional lossless format widely used in photography, scanning, and print. Supports layers in some applications. Very large file sizes — not suitable for the web.",
    bestFor: "Professional photography, print production, archival storage.",
    notFor: "Web use or situations where file size matters.",
    size: "Very Large",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 mx-auto w-full max-w-4xl px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
            Image Format Guide
          </h1>
          <p className="mt-4 text-lg text-slate-500">
            Everything you need to know about PNG, JPEG, WebP, AVIF, GIF and TIFF.
          </p>
        </div>

        <div className="flex flex-col gap-6">
          {formats.map((fmt) => (
            <div key={fmt.name} className="rounded-2xl border border-slate-200 bg-white shadow-sm p-6">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">{fmt.name}</h2>
                  <code className="text-sm text-slate-400">{fmt.ext}</code>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${fmt.lossy ? "bg-amber-100 text-amber-700" : "bg-green-100 text-green-700"}`}>
                    {fmt.lossy ? "Lossy" : "Lossless"}
                  </span>
                  <span className="inline-block rounded-full px-3 py-1 text-xs font-semibold bg-slate-100 text-slate-600">
                    {fmt.size} file
                  </span>
                </div>
              </div>
              <p className="text-slate-600 leading-relaxed mb-4">{fmt.summary}</p>
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="rounded-lg bg-green-50 border border-green-100 p-3">
                  <p className="text-xs font-semibold text-green-700 mb-1">Best for</p>
                  <p className="text-sm text-green-800">{fmt.bestFor}</p>
                </div>
                <div className="rounded-lg bg-red-50 border border-red-100 p-3">
                  <p className="text-xs font-semibold text-red-600 mb-1">Not ideal for</p>
                  <p className="text-sm text-red-800">{fmt.notFor}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
