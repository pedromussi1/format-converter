"use client";

import { useConverter } from "@/hooks/useConverter";
import { DropZone } from "./DropZone";
import { FormatSelector } from "./FormatSelector";
import { QualitySlider } from "./QualitySlider";
import { FileQueue } from "./FileQueue";
import { ConvertButton } from "./ConvertButton";
import { DownloadAll } from "./DownloadAll";
import { AdSlot } from "@/components/ads/AdSlot";

export function ConverterTool() {
  const {
    jobs,
    outputFormat,
    quality,
    isConverting,
    doneJobs,
    addFiles,
    removeJob,
    reset,
    setOutputFormat,
    setQuality,
    convertAll,
  } = useConverter();

  const hasFiles = jobs.length > 0;
  const allDone = hasFiles && jobs.every((j) => j.status === "done");

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-6 sm:p-8 flex flex-col gap-6">
      {/* Drop zone */}
      <DropZone onFiles={addFiles} hasFiles={hasFiles} />

      {/* Format + quality controls */}
      <div className="flex flex-col gap-5">
        <FormatSelector value={outputFormat} onChange={setOutputFormat} />
        <QualitySlider value={quality} onChange={setQuality} format={outputFormat} />
      </div>

      {/* File list */}
      {hasFiles && (
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-slate-700">
              {jobs.length} image{jobs.length !== 1 ? "s" : ""} selected
            </p>
            <button
              type="button"
              onClick={reset}
              className="text-xs text-slate-400 hover:text-red-400 transition-colors"
            >
              Clear all
            </button>
          </div>
          <FileQueue jobs={jobs} onRemove={removeJob} />
        </div>
      )}

      {/* Post-conversion ad */}
      {allDone && doneJobs.length > 0 && (
        <div className="rounded-xl bg-slate-50 border border-slate-100 p-4 text-center">
          <p className="text-xs text-slate-400 mb-3 font-medium uppercase tracking-wide">Your files are ready</p>
          <div className="flex justify-center">
            <AdSlot slotId="post-conversion" width={468} height={60} />
          </div>
        </div>
      )}

      {/* Convert CTA */}
      <div className="flex flex-col gap-3">
        <ConvertButton
          onClick={convertAll}
          isConverting={isConverting}
          fileCount={jobs.filter((j) => j.status === "idle" || j.status === "error").length}
        />
        {doneJobs.length >= 2 && (
          <div className="flex justify-center">
            <DownloadAll doneJobs={doneJobs} />
          </div>
        )}
      </div>
    </div>
  );
}
