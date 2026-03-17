import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with the ConvertImg team for questions, feedback, or support.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 mx-auto w-full max-w-3xl px-4 py-12">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-4">Contact Us</h1>
        <p className="text-slate-500 mb-10">
          Have a question, found a bug, or want to suggest a new feature? We&rsquo;d love to hear from you.
        </p>

        <div className="grid gap-6 sm:grid-cols-2">
          {/* GitHub */}
          <a
            href="https://github.com/pedromussi1/format-converter/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:border-blue-200 hover:shadow-md transition-all"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-slate-900 flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </div>
              <div>
                <p className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">GitHub Issues</p>
                <p className="text-xs text-slate-500">Report bugs or request features</p>
              </div>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed">
              Open an issue on our public GitHub repository. We actively monitor and respond to all reports.
            </p>
          </a>

          {/* Email */}
          <a
            href="mailto:contact@convertimg.app"
            className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:border-blue-200 hover:shadow-md transition-all"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="M22 7l-10 7L2 7" />
                </svg>
              </div>
              <div>
                <p className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">Email</p>
                <p className="text-xs text-slate-500">General inquiries</p>
              </div>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed">
              Send us an email at <span className="font-medium text-slate-700">contact@convertimg.app</span> and we&rsquo;ll get back to you as soon as possible.
            </p>
          </a>
        </div>

        {/* FAQ callout */}
        <div className="mt-10 rounded-xl bg-slate-50 border border-slate-200 p-6 text-center">
          <p className="text-sm font-semibold text-slate-700 mb-1">Looking for answers?</p>
          <p className="text-sm text-slate-500 mb-4">
            Many common questions are already answered in our FAQ.
          </p>
          <a
            href="/faq"
            className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 transition-colors"
          >
            Visit FAQ
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
              <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
            </svg>
          </a>
        </div>
      </main>
      <Footer />
    </div>
  );
}
