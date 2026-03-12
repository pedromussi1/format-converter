import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "ConvertImg privacy policy — how we handle your data.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 mx-auto w-full max-w-3xl px-4 py-12">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-8">Privacy Policy</h1>

        <div className="prose prose-slate max-w-none text-sm leading-relaxed space-y-6 text-slate-600">
          <p className="text-slate-500 text-xs">Last updated: March 2026</p>

          <section>
            <h2 className="text-base font-bold text-slate-800 mb-2">1. Image Data</h2>
            <p>
              When you convert an image, it is transmitted to our server solely for the purpose
              of format conversion. Images are processed in memory and are never written to disk
              or stored in any database. Once the converted file is returned to your browser,
              all data is discarded immediately. We do not share, sell, or retain any image content.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-slate-800 mb-2">2. Analytics</h2>
            <p>
              We may use anonymous analytics to understand how users interact with the site
              (e.g., which formats are most commonly used). This data contains no personally
              identifiable information.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-slate-800 mb-2">3. Advertising</h2>
            <p>
              This site uses Google AdSense to display advertisements. Google may use cookies
              to serve ads based on your prior visits to this site or other sites. You can opt
              out of personalised advertising by visiting{" "}
              <a href="https://www.google.com/settings/ads" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                Google Ads Settings
              </a>.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-slate-800 mb-2">4. Cookies</h2>
            <p>
              We do not set our own cookies. Third-party services (such as Google AdSense)
              may set cookies in accordance with their own privacy policies.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-slate-800 mb-2">5. Contact</h2>
            <p>
              If you have any questions about this privacy policy, please open an issue on our
              public repository or contact us through the site.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
