"use client";

import { useDropZone } from "@/hooks/useDropZone";

interface DropZoneProps {
  onFiles: (files: File[]) => void;
  hasFiles: boolean;
}

export function DropZone({ onFiles, hasFiles }: DropZoneProps) {
  const { isDragging, dragHandlers, inputProps, openPicker } = useDropZone({ onFiles });

  return (
    <div
      {...dragHandlers}
      onClick={openPicker}
      className={`
        relative flex flex-col items-center justify-center gap-4
        w-full rounded-2xl border-2 border-dashed cursor-pointer
        transition-all duration-200 select-none
        ${isDragging
          ? "border-blue-500 bg-blue-50 scale-[1.01]"
          : "border-slate-300 bg-slate-50 hover:border-blue-400 hover:bg-blue-50/50"
        }
        ${hasFiles ? "py-8" : "py-16"}
      `}
    >
      <input {...inputProps} />

      {/* Upload icon */}
      <div className={`
        flex items-center justify-center w-16 h-16 rounded-2xl
        ${isDragging ? "bg-blue-100" : "bg-white shadow-sm"}
        transition-colors duration-200
      `}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          className={`w-8 h-8 ${isDragging ? "text-blue-600" : "text-slate-400"}`}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
        </svg>
      </div>

      <div className="text-center px-4">
        <p className={`text-lg font-semibold ${isDragging ? "text-blue-700" : "text-slate-700"}`}>
          {isDragging ? "Drop your images here" : "Drop images here or click to browse"}
        </p>
        <p className="mt-1 text-sm text-slate-500">
          PNG, JPEG, WebP, AVIF, GIF, TIFF, BMP &middot; Up to 50 MB each
        </p>
      </div>

      {hasFiles && (
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); openPicker(); }}
          className="mt-1 text-sm font-medium text-blue-600 hover:text-blue-700 underline underline-offset-2"
        >
          Add more images
        </button>
      )}
    </div>
  );
}
