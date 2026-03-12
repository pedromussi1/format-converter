import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "ConvertImg — Free Online Image Format Converter";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
          fontFamily: "system-ui, sans-serif",
          padding: "60px",
        }}
      >
        {/* Logo + brand */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "32px" }}>
          <div
            style={{
              width: "64px",
              height: "64px",
              borderRadius: "16px",
              background: "#2563eb",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 24px rgba(37,99,235,0.3)",
            }}
          >
            <svg width="36" height="36" viewBox="0 0 24 24" fill="white">
              <path d="M4 16v-2.38C4 11.5 2.97 10.43 3 8c.03-2.69 2.17-4.9 4.85-4.99C10.24 2.92 12 4.57 12 6.7V7h2c1.1 0 2 .9 2 2v1h.5C18.43 10 20 11.57 20 13.5S18.43 17 16.5 17H6c-1.1 0-2-.9-2-2z" />
              <path d="M9 17v3.5M12 17v5M15 17v3.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
          <span style={{ fontSize: "44px", fontWeight: "800", color: "#0f172a", letterSpacing: "-1px" }}>
            ConvertImg
          </span>
        </div>

        {/* Headline */}
        <div
          style={{
            fontSize: "52px",
            fontWeight: "800",
            color: "#0f172a",
            textAlign: "center",
            lineHeight: 1.1,
            letterSpacing: "-1.5px",
            marginBottom: "20px",
            maxWidth: "900px",
          }}
        >
          Convert Images to Any Format
        </div>

        {/* Subheadline */}
        <div
          style={{
            fontSize: "24px",
            color: "#64748b",
            textAlign: "center",
            marginBottom: "44px",
            maxWidth: "700px",
          }}
        >
          Free, instant, and private — your files are never stored
        </div>

        {/* Format pills */}
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", justifyContent: "center" }}>
          {["PNG", "JPEG", "WebP", "AVIF", "GIF", "TIFF"].map((fmt) => (
            <div
              key={fmt}
              style={{
                background: "white",
                border: "1.5px solid #e2e8f0",
                borderRadius: "100px",
                padding: "8px 20px",
                fontSize: "20px",
                fontWeight: "600",
                color: "#334155",
                boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
              }}
            >
              {fmt}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
