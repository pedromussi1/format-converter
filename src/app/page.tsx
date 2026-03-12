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
          <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 border border-blue-100 px-3 py-1 text-xs font-semibold text-blue-700 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            Free &amp; instant — no sign-up required
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Convert Images to Any Format
          </h1>
          <p className="mt-4 text-lg text-slate-500 max-w-xl mx-auto">
            PNG, JPEG, WebP, AVIF, GIF, TIFF — convert between any format in seconds.
            Switch to WebP or AVIF and shrink file sizes by up to 50%.
          </p>
          {/* Trust badges */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs font-medium text-slate-500">
            {[
              { icon: "🔒", label: "Files never stored" },
              { icon: "⚡", label: "Converts in seconds" },
              { icon: "📦", label: "Batch convert" },
              { icon: "🆓", label: "Always free" },
            ].map(({ icon, label }) => (
              <span key={label} className="flex items-center gap-1.5 rounded-full bg-white border border-slate-200 px-3 py-1.5 shadow-sm">
                <span>{icon}</span>
                {label}
              </span>
            ))}
          </div>
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
        <section className="mt-14">
          <div className="flex items-end justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Supported Formats</h2>
              <p className="text-sm text-slate-500 mt-1">Convert between all major image formats</p>
            </div>
            <a href="/about" className="text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline">
              Full format guide →
            </a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: "WebP", tag: "Recommended", tagColor: "bg-blue-100 text-blue-700", desc: "25–35% smaller than JPEG at the same quality. The best default choice for web images.", lossy: true },
              { name: "AVIF", tag: "Smallest files", tagColor: "bg-violet-100 text-violet-700", desc: "Up to 50% smaller than JPEG. Next-generation format for the highest quality web images.", lossy: true },
              { name: "JPEG", tag: "Universal", tagColor: "bg-slate-100 text-slate-600", desc: "Works everywhere. Ideal for photos, email attachments, and maximum compatibility.", lossy: true },
              { name: "PNG", tag: "Lossless", tagColor: "bg-green-100 text-green-700", desc: "Preserves every pixel. Essential for logos, screenshots, and images with transparency.", lossy: false },
              { name: "GIF", tag: "Animation", tagColor: "bg-amber-100 text-amber-700", desc: "Supports simple animation. Limited to 256 colors.", lossy: false },
              { name: "TIFF", tag: "Professional", tagColor: "bg-slate-100 text-slate-600", desc: "High-quality lossless format used in professional photography and print workflows.", lossy: false },
            ].map((fmt) => (
              <div key={fmt.name} className="group rounded-xl border border-slate-200 bg-white p-5 shadow-sm hover:border-blue-200 hover:shadow-md transition-all">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-base font-bold text-slate-900">{fmt.name}</h3>
                  <span className={`text-[10px] font-bold uppercase tracking-wide rounded-full px-2 py-0.5 ${fmt.tagColor}`}>
                    {fmt.tag}
                  </span>
                </div>
                <p className="text-sm text-slate-500 leading-relaxed">{fmt.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Popular conversions */}
        <section className="mt-10">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Popular Conversions</h2>
          <div className="flex flex-wrap gap-2">
            {[
              ["PNG", "WebP"], ["JPEG", "WebP"], ["PNG", "AVIF"], ["JPEG", "AVIF"],
              ["WebP", "PNG"], ["AVIF", "JPEG"], ["PNG", "JPEG"], ["GIF", "WebP"],
            ].map(([from, to]) => (
              <a
                key={`${from}-${to}`}
                href={`/convert/${from.toLowerCase()}-to-${to.toLowerCase()}`}
                className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600 hover:border-blue-300 hover:text-blue-700 hover:bg-blue-50 transition-colors shadow-sm"
              >
                {from} → {to}
              </a>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
