"use client";

import { useCallback, useRef, useState } from "react";

import { convertImage } from "@/lib/conversion";
import { buildOutputFilename } from "@/lib/formats";
import { validateFile } from "@/lib/validation";
import type { ConversionJob, OutputFormat } from "@/types";

// Simple UUID without external dep
function uid(): string {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

const MAX_CONCURRENT = 3;

export function useConverter(defaultFormat: OutputFormat = "webp") {
  const [jobs, setJobs] = useState<ConversionJob[]>([]);
  const jobsRef = useRef(jobs);
  jobsRef.current = jobs;
  const [outputFormat, setOutputFormat] = useState<OutputFormat>(defaultFormat);
  const [quality, setQuality] = useState(85);

  const addFiles = useCallback((files: File[]) => {
    const newJobs: ConversionJob[] = files
      .map((file) => {
        const error = validateFile(file);
        return {
          id: uid(),
          file,
          status: error ? ("error" as const) : ("idle" as const),
          error: error ?? undefined,
        };
      });
    setJobs((prev) => [...prev, ...newJobs]);
  }, []);

  const removeJob = useCallback((id: string) => {
    setJobs((prev) => prev.filter((j) => j.id !== id));
  }, []);

  const reset = useCallback(() => {
    setJobs([]);
  }, []);

  const convertAll = useCallback(async () => {
    const pending = jobsRef.current.filter((j) => j.status === "idle" || j.status === "error");
    if (pending.length === 0) return;

    // Mark all pending as converting
    setJobs((prev) =>
      prev.map((j) =>
        j.status === "idle" || j.status === "error"
          ? { ...j, status: "converting" as const, error: undefined }
          : j
      )
    );

    // Process with concurrency limit
    const queue = [...pending];
    const workers = Array.from({ length: Math.min(MAX_CONCURRENT, queue.length) });

    async function processNext(): Promise<void> {
      const job = queue.shift();
      if (!job) return;

      try {
        const blob = await convertImage(job.file, outputFormat, quality);
        const resultName = buildOutputFilename(job.file.name, outputFormat);
        setJobs((prev) =>
          prev.map((j) =>
            j.id === job.id
              ? { ...j, status: "done" as const, resultBlob: blob, resultName }
              : j
          )
        );
      } catch (err) {
        const message = err instanceof Error ? err.message : "Conversion failed.";
        setJobs((prev) =>
          prev.map((j) =>
            j.id === job.id
              ? { ...j, status: "error" as const, error: message }
              : j
          )
        );
      }

      return processNext();
    }

    await Promise.all(workers.map(() => processNext()));
  }, [outputFormat, quality]);

  const doneJobs = jobs.filter((j) => j.status === "done");
  const isConverting = jobs.some((j) => j.status === "converting");

  return {
    jobs,
    outputFormat,
    quality,
    isConverting,
    doneCount: doneJobs.length,
    addFiles,
    removeJob,
    reset,
    setOutputFormat,
    setQuality,
    convertAll,
    doneJobs,
  };
}
