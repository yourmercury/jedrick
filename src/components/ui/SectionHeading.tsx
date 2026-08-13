import { cn } from "@/lib/cn";

export default function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  tone = "dark",
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  align?: "left" | "center";
  /** "dark" = navy type on light ground. "light" = white type on navy field. */
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            "eyebrow mb-4 flex items-center gap-3",
            align === "center" && "justify-center",
            tone === "dark" ? "text-orange" : "text-orange",
          )}
        >
          <span className="inline-block h-px w-8 bg-orange" aria-hidden="true" />
          {eyebrow}
        </p>
      )}

      <h2
        className={cn(
          "text-3xl leading-[1.12] font-bold sm:text-4xl md:text-[2.75rem]",
          tone === "light" && "!text-white",
        )}
      >
        {title}
      </h2>

      {lead && (
        <p
          className={cn(
            "mt-5 text-base leading-relaxed sm:text-lg",
            tone === "dark" ? "text-ink/80" : "text-white/75",
          )}
        >
          {lead}
        </p>
      )}
    </div>
  );
}
