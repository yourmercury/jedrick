"use client";

import { useId, useRef, useState } from "react";
import Icon from "@/components/ui/Icon";
import { cn } from "@/lib/cn";

const MAX_MB = 10;

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/**
 * Document picker with drag-and-drop.
 *
 * Sizes are shown per file and in total, because the failure people hit is
 * "your files are too big" — and being told that only after filling in the
 * whole form is exactly the kind of thing this site is supposed to avoid.
 */
export default function FileDrop({
  files,
  onChange,
  error,
  maxFiles = 5,
}: {
  files: File[];
  onChange: (files: File[]) => void;
  error?: string;
  maxFiles?: number;
}) {
  const id = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const total = files.reduce((sum, f) => sum + f.size, 0);
  const overSize = total > MAX_MB * 1024 * 1024;

  function add(incoming: FileList | null) {
    if (!incoming) return;
    const next = [...files];
    for (const file of Array.from(incoming)) {
      // Same name and size twice is a re-pick, not a second document.
      const duplicate = next.some(
        (f) => f.name === file.name && f.size === file.size,
      );
      if (!duplicate && next.length < maxFiles) next.push(file);
    }
    onChange(next);
  }

  return (
    <div>
      <p className="mb-2 block text-[0.88rem] font-semibold text-navy">
        Your policy documents
        <span className="ml-2 font-normal text-ink/50">Optional</span>
      </p>

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          add(e.dataTransfer.files);
        }}
        className={cn(
          "rounded-2xl border-2 border-dashed p-8 text-center transition",
          dragging
            ? "border-orange bg-orange/5"
            : error || overSize
              ? "border-orange/60 bg-orange/[0.03]"
              : "border-gray-line bg-mist/50",
        )}
      >
        <span className="mx-auto flex size-12 items-center justify-center rounded-xl bg-white text-orange ring-1 ring-gray-line/60">
          <Icon name="upload" className="size-6" />
        </span>

        <p className="mt-4 text-[0.95rem] font-semibold text-navy">
          Drag your policy here, or{" "}
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="text-orange underline decoration-2 underline-offset-4 hover:text-orange-deep"
          >
            browse your files
          </button>
        </p>
        <p className="mt-2 text-[0.82rem] text-ink/60">
          PDF, Word or a photo of the document. Up to {maxFiles} files, {MAX_MB}MB
          in total.
        </p>
        <p className="mt-1 text-[0.82rem] text-ink/50">
          A clear phone photo of each page is fine.
        </p>

        <input
          ref={inputRef}
          id={id}
          type="file"
          multiple
          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.heic,.webp"
          className="sr-only"
          onChange={(e) => {
            add(e.target.files);
            // Allows re-picking the same file after removing it.
            e.target.value = "";
          }}
        />
      </div>

      {files.length > 0 && (
        <ul className="mt-4 space-y-2">
          {files.map((file, i) => (
            <li
              key={`${file.name}-${file.size}-${i}`}
              className="flex items-center gap-3 rounded-xl border border-gray-line/60 bg-white px-4 py-3"
            >
              <Icon name="book" className="size-4 shrink-0 text-orange" />
              <span className="min-w-0 flex-1 truncate text-[0.9rem] text-ink">
                {file.name}
              </span>
              <span className="shrink-0 text-[0.8rem] text-ink/50">
                {formatSize(file.size)}
              </span>
              <button
                type="button"
                onClick={() => onChange(files.filter((_, index) => index !== i))}
                className="shrink-0 rounded-full p-1 text-ink/50 transition hover:bg-mist hover:text-navy"
                aria-label={`Remove ${file.name}`}
              >
                <svg
                  viewBox="0 0 24 24"
                  className="size-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </li>
          ))}
        </ul>
      )}

      {files.length > 0 && (
        <p
          className={cn(
            "mt-3 text-[0.82rem]",
            overSize ? "font-medium text-orange-deep" : "text-ink/55",
          )}
        >
          {files.length} file{files.length === 1 ? "" : "s"} · {formatSize(total)}{" "}
          of {MAX_MB}MB
          {overSize && " — that is over the limit, please remove one"}
        </p>
      )}

      {error && (
        <p className="mt-2 text-[0.82rem] font-medium text-orange-deep">{error}</p>
      )}
    </div>
  );
}
