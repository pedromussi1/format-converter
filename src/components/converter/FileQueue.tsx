"use client";

import { FileCard } from "./FileCard";
import type { ConversionJob } from "@/types";

interface FileQueueProps {
  jobs: ConversionJob[];
  onRemove: (id: string) => void;
}

export function FileQueue({ jobs, onRemove }: FileQueueProps) {
  if (jobs.length === 0) return null;

  return (
    <div className="flex flex-col gap-2">
      {jobs.map((job) => (
        <FileCard key={job.id} job={job} onRemove={onRemove} />
      ))}
    </div>
  );
}
