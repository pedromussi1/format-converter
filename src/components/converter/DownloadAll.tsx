"use client";

import { useState } from "react";
import { buildZip, downloadBlob } from "@/lib/zip";
import type { ConversionJob } from "@/types";

interface DownloadAllProps {
  doneJobs: ConversionJob[];
}

export function DownloadAll({ doneJobs }: DownloadAllProps) {
  const [isZipping, setIsZipping] = useState(false);

  if (doneJobs.length < 2) return null;

  const handleDownloadAll = async () => {
    setIsZipping(true);
    try {
      const files = doneJobs
        .filter((j) => j.resultBlob && j.resultName)
        .map((j) => ({ name: j.resultName!, blob: j.resultBlob! }));
      const zip = await buildZip(files);
      downloadBlob(zip, "converted-images.zip");
    } finally {
      setIsZipping(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleDownloadAll}
      disabled={isZipping}
      className="flex items-center gap-2 rounded-xl border-2 border-blue-200 bg-blue-50 px-5 py-3 text-sm font-semibold text-blue-700 hover:bg-blue-100 hover:border-blue-300 transition-colors disabled:opacity-60"
    >
      {isZipping ? (
        <>
          <span className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
          Packaging ZIP...
        </>
      ) : (
        <>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
            <path d="M10.75 2.75a.75.75 0 00-1.5 0v8.614L6.295 8.235a.75.75 0 10-1.09 1.03l4.25 4.5a.75.75 0 001.09 0l4.25-4.5a.75.75 0 00-1.09-1.03l-2.955 3.129V2.75z" />
            <path d="M3.5 12.75a.75.75 0 00-1.5 0v2.5A2.75 2.75 0 004.75 18h10.5A2.75 2.75 0 0018 15.25v-2.5a.75.75 0 00-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5z" />
          </svg>
          Download all {doneJobs.length} images as ZIP
        </>
      )}
    </button>
  );
}
