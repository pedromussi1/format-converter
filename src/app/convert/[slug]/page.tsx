import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ConverterTool } from "@/components/converter/ConverterTool";
import { AdSlot } from "@/components/ads/AdSlot";
import { FORMAT_MAP } from "@/lib/formats";
import type { OutputFormat } from "@/types";

// All valid conversion pairs
const VALID_FORMATS: OutputFormat[] = ["png", "jpeg", "webp", "avif", "gif", "tiff"];

function parseSlug(slug: string): { from: string; to: OutputFormat } | null {
  const match = slug.match(/^([a-z]+)-to-([a-z]+)$/);
  if (!match) return null;
  const [, from, to] = match;
  const inputFormats = [...VALID_FORMATS, "jpg", "bmp"];
  const normalizedFrom = from === "jpg" ? "jpeg" : from;
  if (!inputFormats.includes(from) || !VALID_FORMATS.includes(to as OutputFormat)) return null;
  if (normalizedFrom === to) return null;
  return { from: normalizedFrom, to: to as OutputFormat };
}

const FORMAT_LABELS: Record<string, string> = {
  png: "PNG", jpeg: "JPEG", jpg: "JPEG", webp: "WebP",
  avif: "AVIF", gif: "GIF", tiff: "TIFF", bmp: "BMP",
};

const FORMAT_DESCRIPTIONS: Record<string, string> = {
  png: "lossless PNG — perfect for graphics and transparency",
  jpeg: "JPEG — the universal format for photographs",
  webp: "WebP — modern format with 25–35% better compression than JPEG",
  avif: "AVIF — next-generation format with up to 50% better compression than JPEG",
  gif: "GIF — classic format supporting simple animation",
  tiff: "TIFF — professional lossless format for print and photography",
};

const COMPRESSION_TIPS: Record<string, string> = {
  webp: "WebP typically reduces file size by 25–35% compared to JPEG at the same visual quality.",
  avif: "AVIF delivers the best compression of any format — up to 50% smaller than JPEG with excellent quality.",
  jpeg: "JPEG is universally compatible with all devices, apps, and browsers.",
  png: "PNG is lossless — every pixel is preserved exactly. Ideal when quality must not be compromised.",
  gif: "GIF supports animation and is limited to 256 colors. Consider WebP for better quality.",
  tiff: "TIFF is used in professional print and photography workflows for its lossless quality.",
};

export async function generateStaticParams() {
  const pairs: { slug: string }[] = [];
  for (const from of [...VALID_FORMATS, "jpg", "bmp"]) {
    for (const to of VALID_FORMATS) {
      const normalizedFrom = from === "jpg" ? "jpeg" : from;
      if (normalizedFrom !== to) {
        pairs.push({ slug: `${from}-to-${to}` });
      }
    }
  }
  return pairs;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) return { title: "Not Found" };

  const fromLabel = FORMAT_LABELS[parsed.from] ?? parsed.from.toUpperCase();
  const toLabel = FORMAT_MAP[parsed.to]?.label ?? parsed.to.toUpperCase();

  return {
    title: `Convert ${fromLabel} to ${toLabel} — Free Online Converter`,
    description: `Convert ${fromLabel} images to ${toLabel} online for free. No sign-up, no upload limits. ${COMPRESSION_TIPS[parsed.to]}`,
    openGraph: {
      title: `Convert ${fromLabel} to ${toLabel} Free Online`,
      description: `Free ${fromLabel} to ${toLabel} converter. Fast, private, no sign-up required.`,
    },
  };
}

export default async function ConvertPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) notFound();

  const fromLabel = FORMAT_LABELS[parsed.from] ?? parsed.from.toUpperCase();
  const toLabel = FORMAT_MAP[parsed.to]?.label ?? parsed.to.toUpperCase();
  const toInfo = FORMAT_MAP[parsed.to];

  // Related conversions (same output format, different inputs)
  const related = VALID_FORMATS
    .filter((f) => f !== parsed.to && f !== parsed.from)
    .slice(0, 4)
    .map((f) => ({ from: f, to: parsed.to, label: `${FORMAT_LABELS[f]} to ${toLabel}` }));

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 mx-auto w-full max-w-6xl px-4 py-10">
        {/* Breadcrumb */}
        <nav className="text-xs text-slate-400 mb-6 flex items-center gap-1.5">
          <a href="/" className="hover:text-blue-600 transition-colors">Home</a>
          <span>/</span>
          <span className="text-slate-600 font-medium">Convert {fromLabel} to {toLabel}</span>
        </nav>

        {/* Hero */}
        <div className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Convert {fromLabel} to {toLabel}
          </h1>
          <p className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto">
            {COMPRESSION_TIPS[parsed.to]} Free, instant, and private — your files are never stored.
          </p>
        </div>

        {/* Converter + sidebar ad */}
        <div className="flex gap-8 items-start">
          <div className="flex-1 min-w-0">
            <ConverterTool />
          </div>
          <aside className="hidden xl:block flex-shrink-0">
            <div className="sticky top-24">
              <AdSlot slotId="sidebar-rectangle" width={300} height={600} />
            </div>
          </aside>
        </div>

        {/* In-content ad */}
        <div className="mt-12 flex justify-center">
          <AdSlot slotId="in-content-banner" width={728} height={90} className="hidden sm:block" />
          <AdSlot slotId="in-content-banner-mobile" width={320} height={100} className="block sm:hidden" />
        </div>

        {/* How it works */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            How to Convert {fromLabel} to {toLabel}
          </h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { step: "1", title: "Upload your images", desc: `Drag and drop your ${fromLabel} files onto the converter above, or click to browse.` },
              { step: "2", title: `Select ${toLabel} as output`, desc: `Click the ${toLabel} button in the format selector. Adjust quality if needed.` },
              { step: "3", title: "Download converted files", desc: `Click Convert, then download each file individually or all at once as a ZIP.` },
            ].map(({ step, title, desc }) => (
              <div key={step} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="w-7 h-7 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center mb-3">{step}</div>
                <h3 className="text-sm font-bold text-slate-900 mb-1">{title}</h3>
                <p className="text-sm text-slate-500">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* About the output format */}
        {toInfo && (
          <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 mb-3">About {toLabel}</h2>
            <p className="text-slate-600 leading-relaxed">{toInfo.description}</p>
            <div className="mt-4 flex gap-2 flex-wrap">
              <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${toInfo.lossy ? "bg-amber-100 text-amber-700" : "bg-green-100 text-green-700"}`}>
                {toInfo.lossy ? "Lossy" : "Lossless"}
              </span>
              <span className="inline-block rounded-full px-3 py-1 text-xs font-semibold bg-slate-100 text-slate-600">
                .{toInfo.extension}
              </span>
            </div>
          </section>
        )}

        {/* FAQ for this conversion */}
        <section className="mt-10">
          <h2 className="text-xl font-bold text-slate-900 mb-4">
            {fromLabel} to {toLabel} — Common Questions
          </h2>
          <div className="flex flex-col gap-3">
            {[
              {
                q: `Is converting ${fromLabel} to ${toLabel} free?`,
                a: `Yes. ConvertImg is completely free to use with no sign-up required. You can convert as many ${fromLabel} images to ${toLabel} as you need.`,
              },
              {
                q: `Will my ${fromLabel} images lose quality when converted to ${toLabel}?`,
                a: toInfo?.lossy
                  ? `${toLabel} is a lossy format, which means some quality is traded for a smaller file size. Use the quality slider (80–90) for an excellent balance. At high quality settings the difference is barely visible.`
                  : `${toLabel} is a lossless format — your images will be converted without any quality loss.`,
              },
              {
                q: `How long does ${fromLabel} to ${toLabel} conversion take?`,
                a: `Most images convert in under 2 seconds. ${parsed.to === "avif" ? "AVIF encoding can take 3–10 seconds for large images due to its advanced compression algorithm." : ""}`,
              },
              {
                q: `Are my ${fromLabel} files safe to upload?`,
                a: `Yes. Your images are processed in memory and immediately deleted after conversion. We never store, log, or share your files.`,
              },
            ].map(({ q, a }) => (
              <div key={q} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <h3 className="text-sm font-bold text-slate-900 mb-1.5">{q}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Related conversions */}
        {related.length > 0 && (
          <section className="mt-10">
            <h2 className="text-lg font-bold text-slate-900 mb-3">Related Converters</h2>
            <div className="flex flex-wrap gap-2">
              {related.map(({ from, to, label }) => (
                <a
                  key={label}
                  href={`/convert/${from}-to-${to}`}
                  className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600 hover:border-blue-300 hover:text-blue-700 hover:bg-blue-50 transition-colors shadow-sm"
                >
                  {label}
                </a>
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
