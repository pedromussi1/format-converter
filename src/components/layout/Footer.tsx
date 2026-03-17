import Link from "next/link";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-slate-200 bg-white mt-16">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <p className="text-base font-bold text-slate-900">ConvertImg</p>
            <p className="mt-2 text-sm text-slate-500 leading-relaxed">
              Free online image converter. Convert PNG, JPEG, WebP, AVIF, GIF and TIFF
              images directly in your browser — no upload limits, no sign-up required.
            </p>
          </div>

          {/* Links */}
          <div>
            <p className="text-sm font-semibold text-slate-700 mb-3">Resources</p>
            <ul className="space-y-2 text-sm text-slate-500">
              <li><Link href="/about" className="hover:text-blue-600 transition-colors">Format Guide</Link></li>
              <li><Link href="/faq" className="hover:text-blue-600 transition-colors">FAQ</Link></li>
              <li><Link href="/privacy" className="hover:text-blue-600 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-blue-600 transition-colors">Terms of Service</Link></li>
              <li><Link href="/contact" className="hover:text-blue-600 transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Formats */}
          <div>
            <p className="text-sm font-semibold text-slate-700 mb-3">Supported Formats</p>
            <div className="flex flex-wrap gap-1.5">
              {["PNG", "JPEG", "WebP", "AVIF", "GIF", "TIFF", "BMP"].map((fmt) => (
                <span
                  key={fmt}
                  className="inline-block rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600"
                >
                  {fmt}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-400">
          <p>&copy; {year} ConvertImg. All rights reserved.</p>
          <p>Your files are processed securely and never stored on our servers.</p>
        </div>
      </div>
    </footer>
  );
}
