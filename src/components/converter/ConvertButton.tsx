"use client";

interface ConvertButtonProps {
  onClick: () => void;
  isConverting: boolean;
  fileCount: number;
}

export function ConvertButton({ onClick, isConverting, fileCount }: ConvertButtonProps) {
  const disabled = fileCount === 0 || isConverting;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`
        w-full rounded-2xl py-4 px-8 text-base font-bold tracking-wide
        transition-all duration-200 shadow-lg
        ${disabled
          ? "bg-slate-200 text-slate-400 cursor-not-allowed shadow-none"
          : "bg-blue-600 text-white hover:bg-blue-700 active:scale-[0.98] shadow-blue-200 hover:shadow-blue-300"
        }
      `}
    >
      {isConverting ? (
        <span className="flex items-center justify-center gap-2">
          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          Converting...
        </span>
      ) : (
        `Convert ${fileCount > 0 ? fileCount : ""} Image${fileCount !== 1 ? "s" : ""}`
      )}
    </button>
  );
}
