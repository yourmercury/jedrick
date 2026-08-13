"use client";

import Icon from "@/components/ui/Icon";
import { cn } from "@/lib/cn";

/**
 * A single selectable answer. Renders a real input so keyboard navigation,
 * screen readers and form semantics work; the visual is on the label.
 */
export default function Choice({
  type,
  name,
  value,
  label,
  hint,
  checked,
  onChange,
}: {
  type: "radio" | "checkbox";
  name: string;
  value: string;
  label: string;
  hint?: string;
  checked: boolean;
  onChange: (value: string) => void;
}) {
  return (
    <label
      className={cn(
        "group flex cursor-pointer items-start gap-4 rounded-xl border p-4 transition-all duration-200 sm:p-5",
        checked
          ? "border-orange bg-orange/5 shadow-[0_10px_30px_-18px_rgba(249,115,22,0.8)]"
          : "border-gray-line/70 bg-white hover:border-navy/40 hover:bg-mist/60",
      )}
    >
      <input
        type={type}
        name={name}
        value={value}
        checked={checked}
        onChange={() => onChange(value)}
        className="sr-only"
      />

      <span
        className={cn(
          "mt-0.5 flex size-5 shrink-0 items-center justify-center border transition",
          type === "radio" ? "rounded-full" : "rounded-md",
          checked
            ? "border-orange bg-orange text-white"
            : "border-gray-line group-hover:border-navy/50",
        )}
        aria-hidden="true"
      >
        {checked && <Icon name="check" className="size-3" strokeWidth={3.2} />}
      </span>

      <span className="min-w-0">
        <span
          className={cn(
            "block text-[0.98rem] font-semibold transition",
            checked ? "text-navy" : "text-ink",
          )}
        >
          {label}
        </span>
        {hint && (
          <span className="mt-1 block text-[0.85rem] leading-snug text-ink/65">
            {hint}
          </span>
        )}
      </span>
    </label>
  );
}
