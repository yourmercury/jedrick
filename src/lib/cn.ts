/** Tiny class-name joiner — avoids a dependency for what is a one-liner. */
export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
