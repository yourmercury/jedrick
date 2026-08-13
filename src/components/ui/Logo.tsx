import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";

/**
 * Logo lockups exported from the brand guideline PDF, so the mark is the real
 * vector artwork rather than a redraw. Variants follow the guideline's
 * "Logo Variation" pages:
 *   primary       — full colour horizontal lockup, for light backgrounds
 *   stacked       — full colour stacked lockup, for light backgrounds
 *   stacked-navy  — the guideline's on-navy lockup (white disc, white wordmark)
 *   icon          — the JIB mark alone, full colour
 *   icon-mono     — flat white mark, for low-opacity watermarks only
 */
const variants = {
  primary: { ratio: 268 / 78, label: site.name },
  stacked: { ratio: 138 / 139, label: site.name },
  "stacked-navy": { ratio: 167 / 160, label: site.name },
  icon: { ratio: 1, label: `${site.shortName} mark` },
  "icon-mono": { ratio: 1, label: "" },
} as const;

export type LogoVariant = keyof typeof variants;

export default function Logo({
  variant = "primary",
  className = "",
  width = 190,
  priority = false,
  /** Watermarks are decoration — render them without a link or alt text. */
  decorative = false,
}: {
  variant?: LogoVariant;
  className?: string;
  width?: number;
  priority?: boolean;
  decorative?: boolean;
}) {
  const { ratio, label } = variants[variant];

  const image = (
    <Image
      src={`/brand/logo-${variant}.svg`}
      alt={decorative ? "" : label}
      width={width}
      height={Math.round(width / ratio)}
      priority={priority}
      aria-hidden={decorative || undefined}
      style={{ height: "auto" }}
    />
  );

  if (decorative) return image;

  return (
    <Link
      href="/"
      className={`inline-flex shrink-0 items-center ${className}`}
      aria-label={`${site.name} — home`}
    >
      {image}
    </Link>
  );
}
