"use client";

import { useId } from "react";
import { cn } from "@/lib/cn";

const control =
  "w-full rounded-xl border bg-white px-4 py-3 text-[0.95rem] text-ink transition placeholder:text-ink/40 focus:outline-none";

export function TextField({
  label,
  optional,
  error,
  textarea,
  hint,
  ...rest
}: {
  label: string;
  optional?: boolean;
  error?: string;
  textarea?: boolean;
  hint?: string;
} & React.InputHTMLAttributes<HTMLInputElement> &
  React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const id = useId();
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined;

  const classes = cn(
    control,
    error
      ? "border-orange focus:border-orange focus:ring-2 focus:ring-orange/25"
      : "border-gray-line/70 focus:border-navy focus:ring-2 focus:ring-navy/15",
  );

  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-[0.88rem] font-semibold text-navy"
      >
        {label}
        {optional && (
          <span className="ml-2 font-normal text-ink/50">Optional</span>
        )}
      </label>

      {textarea ? (
        <textarea
          id={id}
          rows={4}
          className={cn(classes, "resize-y")}
          aria-invalid={!!error}
          aria-describedby={describedBy}
          {...rest}
        />
      ) : (
        <input
          id={id}
          className={classes}
          aria-invalid={!!error}
          aria-describedby={describedBy}
          {...rest}
        />
      )}

      {hint && !error && (
        <p id={`${id}-hint`} className="mt-2 text-[0.82rem] text-ink/60">
          {hint}
        </p>
      )}
      {error && (
        <p
          id={`${id}-error`}
          className="mt-2 text-[0.82rem] font-medium text-orange-deep"
        >
          {error}
        </p>
      )}
    </div>
  );
}
