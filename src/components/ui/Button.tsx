import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "navy" | "outline" | "ghost-light";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-all duration-200 ease-[--ease-out-soft] disabled:opacity-60 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  /* Orange is the action colour — the 20% accent in the brand ratio. */
  primary:
    "bg-orange text-white shadow-[0_6px_20px_-6px_rgba(249,115,22,0.7)] hover:bg-orange-deep hover:shadow-[0_10px_28px_-8px_rgba(249,115,22,0.8)] hover:-translate-y-0.5",
  navy: "bg-navy text-white hover:bg-navy-deep hover:-translate-y-0.5 shadow-[0_6px_20px_-8px_rgba(30,58,138,0.6)]",
  outline:
    "border border-navy/25 bg-white text-navy hover:border-navy hover:bg-navy hover:text-white",
  /* For use on navy fields */
  "ghost-light":
    "border border-white/30 text-white hover:bg-white hover:text-navy backdrop-blur-sm",
};

const sizes: Record<Size, string> = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-[0.95rem]",
};

export default function Button({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: {
  href: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
} & Omit<React.ComponentProps<typeof Link>, "href" | "className">) {
  return (
    <Link
      href={href}
      className={cn(base, variants[variant], sizes[size], className)}
      {...rest}
    >
      {children}
    </Link>
  );
}
