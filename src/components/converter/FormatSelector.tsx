"use client";

import { FORMATS } from "@/lib/formats";
import type { OutputFormat } from "@/types";

interface FormatSelectorProps {
  value: OutputFormat;
  onChange: (format: OutputFormat) => void;
}

export function FormatSelector({ value, onChange }: FormatSelectorProps) {
  return (
    <div>
      <p className="text-sm font-semibold text-slate-700 mb-3">Convert to</p>
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
        {FORMATS.map((fmt) => {
          const isSelected = value === fmt.id;
          return (
            <button
              key={fmt.id}
              type="button"
              onClick={() => onChange(fmt.id)}
              title={fmt.description}
              className={`
                relative flex flex-col items-center justify-center gap-1
                rounded-xl border-2 py-3 px-2 text-sm font-semibold
                transition-all duration-150 cursor-pointer
                ${isSelected
                  ? "border-blue-500 bg-blue-600 text-white shadow-md shadow-blue-200"
                  : "border-slate-200 bg-white text-slate-600 hover:border-blue-300 hover:text-blue-600"
                }
              `}
            >
              <span className="text-xs font-bold tracking-wide">{fmt.label}</span>
              {fmt.lossy && (
                <span className={`text-[10px] font-normal ${isSelected ? "text-blue-100" : "text-slate-400"}`}>
                  lossy
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
