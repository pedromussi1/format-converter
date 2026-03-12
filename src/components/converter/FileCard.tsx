"use client";

import { useEffect, useState } from "react";
import { downloadBlob } from "@/lib/zip";
import type { ConversionJob } from "@/types";

function savingsPct(original: number, result: number): number {
  return Math.round(((original - result) / original) * 100);
}

function useObjectUrl(source: Blob | File | undefined): string | null {
  const [url, setUrl] = useState<string | null>(null);
  useEffect(() => {
    if (!source) { setUrl(null); return; }
    const u = URL.createObjectURL(source);
    setUrl(u);
    return () => URL.revokeObjectURL(u);
  }, [source]);
  return url;
}

interface FileCardProps {
  job: ConversionJob;
  onRemove: (id: string) => void;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function FileCard({ job, onRemove }: FileCardProps) {
  const { id, file, status, resultBlob, resultName, error } = job;
  const thumbnailUrl = useObjectUrl(file);
  const savings = resultBlob ? savingsPct(file.size, resultBlob.size) : null;

  const handleDownload = () => {
    if (resultBlob && resultName) downloadBlob(resultBlob, resultName);
  };

  return (
    <div className={`
      flex items-center gap-3 rounded-xl border bg-white px-4 py-3 shadow-sm transition-colors
      ${status === "done" ? "border-green-200" : status === "error" ? "border-red-200" : "border-slate-200"}
    `}>
      {/* Thumbnail */}
      <div className="flex-shrink-0 w-11 h-11 rounded-lg overflow-hidden bg-slate-100">
        {thumbnailUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={thumbnailUrl} alt="" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5 text-slate-400">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
          </div>
        )}
      </div>

      {/* File info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-slate-800 truncate">{file.name}</p>
        <div className="flex items-center gap-2 mt-0.5 flex-wrap">
          <span className="text-xs text-slate-400">{formatBytes(file.size)}</span>
          {resultBlob && (
            <>
              <span className="text-xs text-slate-300">→</span>
              <span className="text-xs text-green-600 font-medium">{formatBytes(resultBlob.size)}</span>
              {savings !== null && (
                <span className={`inline-block rounded-full px-1.5 py-0.5 text-[10px] font-bold leading-none ${savings > 0 ? "bg-green-100 text-green-700" : savings < 0 ? "bg-amber-100 text-amber-700" : "bg-slate-100 text-slate-500"}`}>
                  {savings > 0 ? `−${savings}%` : savings < 0 ? `+${Math.abs(savings)}%` : "same size"}
                </span>
              )}
            </>
          )}
        </div>
        {error && <p className="text-xs text-red-500 mt-0.5">{error}</p>}
      </div>

      {/* Status / Actions */}
      <div className="flex-shrink-0 flex items-center gap-2">
        {status === "converting" && (
          <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
        )}

        {status === "done" && (
          <button
            type="button"
            onClick={handleDownload}
            className="flex items-center gap-1.5 rounded-lg bg-green-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-green-600 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
              <path d="M10.75 2.75a.75.75 0 00-1.5 0v8.614L6.295 8.235a.75.75 0 10-1.09 1.03l4.25 4.5a.75.75 0 001.09 0l4.25-4.5a.75.75 0 00-1.09-1.03l-2.955 3.129V2.75z" />
              <path d="M3.5 12.75a.75.75 0 00-1.5 0v2.5A2.75 2.75 0 004.75 18h10.5A2.75 2.75 0 0018 15.25v-2.5a.75.75 0 00-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5z" />
            </svg>
            Download
          </button>
        )}

        {status === "error" && (
          <span className="text-xs text-red-500 font-medium">Failed</span>
        )}

        <button
          type="button"
          onClick={() => onRemove(id)}
          className="w-6 h-6 flex items-center justify-center rounded-md text-slate-300 hover:text-red-400 hover:bg-red-50 transition-colors"
          aria-label="Remove file"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
            <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
