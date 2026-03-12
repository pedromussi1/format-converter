import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://convertimg.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "ConvertImg — Free Online Image Format Converter",
    template: "%s | ConvertImg",
  },
  description:
    "Convert images between PNG, JPEG, WebP, AVIF, GIF and TIFF instantly. Free, fast, and private — files are never stored on our servers.",
  keywords: [
    "image converter",
    "convert png to webp",
    "convert jpeg to avif",
    "webp converter",
    "avif converter",
    "free image converter online",
  ],
  openGraph: {
    type: "website",
    siteName: "ConvertImg",
    title: "ConvertImg — Free Online Image Format Converter",
    description:
      "Convert images between PNG, JPEG, WebP, AVIF, GIF and TIFF instantly. Free and private.",
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "ConvertImg — Free Online Image Format Converter",
    description: "Convert images between PNG, JPEG, WebP, AVIF, GIF and TIFF instantly.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const adsenseId = process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID;

  return (
    <html lang="en" className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "ConvertImg",
              url: siteUrl,
              applicationCategory: "UtilitiesApplication",
              operatingSystem: "Any",
              offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
              description:
                "Free online image converter supporting PNG, JPEG, WebP, AVIF, GIF and TIFF.",
            }),
          }}
        />
      </head>
      <body>
        {children}
        {adsenseId && (
          <Script
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseId}`}
            strategy="afterInteractive"
            crossOrigin="anonymous"
          />
        )}
      </body>
    </html>
  );
}
