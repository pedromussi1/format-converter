"use client";

import { useEffect, useRef, useState } from "react";

interface AdSlotProps {
  slotId: string;
  width: number;
  height: number;
  className?: string;
  /** AdSense publisher ID — set via env var in production */
  publisherId?: string;
}

/**
 * Lazy-loaded AdSense slot with min-height placeholder to prevent CLS.
 * In development (no publisherId), renders a placeholder div.
 */
export function AdSlot({ slotId, width, height, className = "", publisherId }: AdSlotProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const pid = publisherId ?? process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID;

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`overflow-hidden ${className}`}
      style={{ minWidth: width, minHeight: height }}
      aria-label="Advertisement"
    >
      {visible && pid ? (
        <ins
          className="adsbygoogle"
          style={{ display: "block", width, height }}
          data-ad-client={pid}
          data-ad-slot={slotId}
          data-full-width-responsive="true"
        />
      ) : (
        // Placeholder shown in dev or before AdSense loads
        <div
          className="flex items-center justify-center rounded bg-slate-100 text-xs text-slate-400 font-medium"
          style={{ width, height }}
        >
          Advertisement
        </div>
      )}
    </div>
  );
}
