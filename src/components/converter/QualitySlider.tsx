"use client";

import type { OutputFormat } from "@/types";

const LOSSY_FORMATS: OutputFormat[] = ["jpeg", "webp", "avif"];

interface QualitySliderProps {
  value: number;
  onChange: (q: number) => void;
  format: OutputFormat;
}

function qualityLabel(q: number): string {
  if (q >= 90) return "Maximum quality";
  if (q >= 75) return "High quality";
  if (q >= 55) return "Balanced";
  if (q >= 35) return "Small file";
  return "Minimum size";
}

export function QualitySlider({ value, onChange, format }: QualitySliderProps) {
  if (!LOSSY_FORMATS.includes(format)) return null;

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm font-semibold text-slate-700">Quality</p>
        <span className="text-sm text-slate-500">
          <span className="font-semibold text-slate-800">{value}</span>
          {" "}— {qualityLabel(value)}
        </span>
      </div>
      <input
        type="range"
        min={1}
        max={100}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 rounded-full appearance-none cursor-pointer accent-blue-600 bg-slate-200"
      />
      <div className="flex justify-between text-[11px] text-slate-400 mt-1">
        <span>Smaller file</span>
        <span>Better quality</span>
      </div>
    </div>
  );
}
