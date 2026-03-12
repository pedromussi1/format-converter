import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "FAQ — Frequently Asked Questions",
  description:
    "Answers to common questions about ConvertImg: file safety, supported formats, quality settings, and more.",
};

const faqs = [
  {
    q: "Is my image data safe?",
    a: "Yes. Your images are sent to our server only for conversion and are never saved to disk. The converted file is returned immediately and deleted from memory. We do not log, store, or share any of your image data.",
  },
  {
    q: "What image formats are supported?",
    a: "You can upload PNG, JPEG, WebP, AVIF, GIF, TIFF, and BMP images. You can convert to PNG, JPEG, WebP, AVIF, GIF, and TIFF.",
  },
  {
    q: "What is the maximum file size?",
    a: "Each image can be up to 50 MB. There is no limit on the number of images you can convert in one session.",
  },
  {
    q: "What does the quality slider do?",
    a: "The quality slider controls the compression level for lossy formats: JPEG, WebP, and AVIF. Higher quality means a larger file size but better image fidelity. For lossless formats like PNG and TIFF, the slider has no effect.",
  },
  {
    q: "What quality setting should I use?",
    a: "For web images, a quality of 80–85 gives an excellent balance between file size and visual quality. For professional use or archiving, use 90–95. For thumbnails or previews, 60–75 is often sufficient.",
  },
  {
    q: "Why is AVIF encoding slow?",
    a: "AVIF uses a highly efficient but computationally expensive encoding algorithm. A single large image can take 3–10 seconds to encode. This is normal — the tradeoff is a significantly smaller file size compared to WebP or JPEG.",
  },
  {
    q: "What is the difference between WebP and AVIF?",
    a: "Both are modern web formats. AVIF generally produces smaller files than WebP at the same quality, but takes longer to encode. WebP has broader browser support. For most uses, either format is excellent. AVIF is the better choice when file size is the top priority.",
  },
  {
    q: "Can I convert multiple images at once?",
    a: "Yes. You can upload as many images as you like. They will be converted in parallel (up to 3 at a time) and you can download them individually or as a single ZIP file.",
  },
  {
    q: "Does conversion work on mobile?",
    a: "Yes, ConvertImg works on all modern mobile browsers including Safari on iOS and Chrome on Android.",
  },
  {
    q: "Is this tool free?",
    a: "Yes, ConvertImg is completely free to use with no sign-up required. The site is supported by ads.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

export default function FaqPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 mx-auto w-full max-w-3xl px-4 py-12">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="mt-4 text-lg text-slate-500">
            Everything you need to know about ConvertImg.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {faqs.map(({ q, a }) => (
            <div key={q} className="rounded-xl border border-slate-200 bg-white shadow-sm p-6">
              <h2 className="text-base font-bold text-slate-900 mb-2">{q}</h2>
              <p className="text-slate-600 leading-relaxed text-sm">{a}</p>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
