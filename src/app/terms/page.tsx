import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "ConvertImg terms of service — rules for using our free image converter.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 mx-auto w-full max-w-3xl px-4 py-12">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-8">Terms of Service</h1>

        <div className="prose prose-slate max-w-none text-sm leading-relaxed space-y-6 text-slate-600">
          <p className="text-slate-500 text-xs">Last updated: March 2026</p>

          <section>
            <h2 className="text-base font-bold text-slate-800 mb-2">1. Acceptance of Terms</h2>
            <p>
              By accessing and using ConvertImg (&ldquo;the Service&rdquo;), you agree to be bound by
              these Terms of Service. If you do not agree with any part of these terms, please do not
              use the Service.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-slate-800 mb-2">2. Description of Service</h2>
            <p>
              ConvertImg is a free online tool that allows you to convert images between formats
              including PNG, JPEG, WebP, AVIF, GIF, and TIFF. Images are processed on our servers
              in memory and are never stored permanently.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-slate-800 mb-2">3. Acceptable Use</h2>
            <p>You agree not to:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Upload images that you do not have the right to use or distribute.</li>
              <li>Upload images containing illegal, harmful, or offensive content.</li>
              <li>Attempt to interfere with or disrupt the Service or its infrastructure.</li>
              <li>Use automated tools to scrape or overload the Service.</li>
              <li>Circumvent any rate limits or security measures.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-bold text-slate-800 mb-2">4. Intellectual Property</h2>
            <p>
              You retain all rights to images you upload. We claim no ownership over your content.
              The ConvertImg name, logo, and website design are the property of ConvertImg.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-slate-800 mb-2">5. Limitation of Liability</h2>
            <p>
              The Service is provided &ldquo;as is&rdquo; without warranties of any kind, either
              express or implied. We are not liable for any loss of data, image quality degradation,
              or any damages arising from the use of the Service. You use the Service at your own risk.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-slate-800 mb-2">6. File Size Limits</h2>
            <p>
              Individual files are limited to 50 MB. We reserve the right to change these limits at
              any time to ensure fair usage for all users.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-slate-800 mb-2">7. Advertising</h2>
            <p>
              The Service is funded by advertisements provided by Google AdSense. By using the Service,
              you acknowledge that ads will be displayed during your use.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-slate-800 mb-2">8. Changes to Terms</h2>
            <p>
              We reserve the right to modify these terms at any time. Changes will be posted on this
              page with an updated date. Continued use of the Service after changes constitutes
              acceptance of the new terms.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-slate-800 mb-2">9. Contact</h2>
            <p>
              If you have questions about these terms, please visit our{" "}
              <a href="/contact" className="text-blue-600 hover:underline">Contact page</a>.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
