import Link from "next/link";
import { AdSlot } from "@/components/ads/AdSlot";

export function Header() {
  return (
    <header className="w-full border-b border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-4">
        {/* Top ad banner */}
        <div className="flex justify-center py-2">
          <AdSlot slotId="header-banner" width={728} height={90} className="hidden sm:block" />
          <AdSlot slotId="header-banner-mobile" width={320} height={50} className="block sm:hidden" />
        </div>

        {/* Nav */}
        <div className="flex items-center justify-between py-4">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-4 h-4">
                <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
              ConvertImg
            </span>
          </Link>

          <nav className="flex items-center gap-6 text-sm font-medium text-slate-600">
            <Link href="/" className="hover:text-blue-600 transition-colors">Converter</Link>
            <Link href="/about" className="hover:text-blue-600 transition-colors">Formats</Link>
            <Link href="/faq" className="hover:text-blue-600 transition-colors">FAQ</Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
