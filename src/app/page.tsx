import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ConverterTool } from "@/components/converter/ConverterTool";
import { AdSlot } from "@/components/ads/AdSlot";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 mx-auto w-full max-w-6xl px-4 py-10">
        {/* Hero */}
        <div className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Convert Images Instantly
          </h1>
          <p className="mt-4 text-lg text-slate-500 max-w-xl mx-auto">
            Transform PNG, JPEG, WebP, AVIF, GIF and TIFF files in seconds.
            Free, fast, and private — your files never leave your browser&rsquo;s request.
          </p>
        </div>

        {/* Main layout: converter + sidebar ad */}
        <div className="flex gap-8 items-start">
          {/* Converter tool */}
          <div className="flex-1 min-w-0">
            <ConverterTool />
          </div>

          {/* Sidebar ad — desktop only */}
          <aside className="hidden xl:block flex-shrink-0">
            <div className="sticky top-6">
              <AdSlot slotId="sidebar-rectangle" width={300} height={600} />
            </div>
          </aside>
        </div>

        {/* In-content ad — below converter */}
        <div className="mt-12 flex justify-center">
          <AdSlot slotId="in-content-banner" width={728} height={90} className="hidden sm:block" />
          <AdSlot slotId="in-content-banner-mobile" width={320} height={100} className="block sm:hidden" />
        </div>

        {/* Format info section */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Supported Formats</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: "WebP", desc: "Modern format with excellent compression. 25–35% smaller than JPEG at the same quality. Perfect for web images." },
              { name: "AVIF", desc: "Next-generation format with superior compression. Up to 50% smaller than JPEG. Best choice for quality-conscious web use." },
              { name: "JPEG", desc: "The most universal image format. Ideal for photographs with broad compatibility across all devices and browsers." },
              { name: "PNG", desc: "Lossless format that preserves every pixel. Essential for graphics, logos, screenshots, and images with transparency." },
              { name: "GIF", desc: "Classic format supporting animation and simple graphics. Limited to 256 colors." },
              { name: "TIFF", desc: "High-quality lossless format used in professional photography and print production workflows." },
            ].map((fmt) => (
              <div key={fmt.name} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <h3 className="text-base font-bold text-slate-900 mb-1">{fmt.name}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{fmt.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
