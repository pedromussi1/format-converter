"use client";

import { useRef, useState, useCallback } from "react";
import { ACCEPTED_MIME_TYPES } from "@/lib/formats";

interface UseDropZoneOptions {
  onFiles: (files: File[]) => void;
}

export function useDropZone({ onFiles }: UseDropZoneOptions) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const openPicker = useCallback(() => {
    inputRef.current?.click();
  }, []);

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
      const files = Array.from(e.dataTransfer.files).filter((f) =>
        f.type.startsWith("image/")
      );
      if (files.length > 0) onFiles(files);
    },
    [onFiles]
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files ?? []);
      if (files.length > 0) onFiles(files);
      // reset so same file can be picked again
      if (inputRef.current) inputRef.current.value = "";
    },
    [onFiles]
  );

  return {
    isDragging,
    inputRef,
    openPicker,
    dragHandlers: {
      onDragEnter: handleDragEnter,
      onDragOver: handleDragOver,
      onDragLeave: handleDragLeave,
      onDrop: handleDrop,
    },
    inputProps: {
      ref: inputRef,
      type: "file" as const,
      multiple: true,
      accept: ACCEPTED_MIME_TYPES,
      onChange: handleInputChange,
      className: "sr-only",
    },
  };
}
