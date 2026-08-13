/**
 * Fixed-window rate limiter, in memory.
 *
 * Deliberately simple: it stops a script hammering the form from one address,
 * which is the realistic threat for a brochure site.
 *
 * IMPORTANT — behaviour on Netlify. The lead endpoints run as serverless
 * functions, which are ephemeral and horizontally scaled. This Map therefore
 * lives only for the life of one function instance, so a determined attacker
 * spread across cold starts gets more than MAX_PER_WINDOW attempts. It is a
 * speed bump, not a wall.
 *
 * That is an accepted trade-off rather than an oversight: the honeypot catches
 * naive bots, Netlify absorbs volumetric abuse upstream, and the worst outcome
 * here is junk in an inbox rather than data loss. If the volume of spam ever
 * justifies it, back this with Netlify Blobs or Upstash Redis — `rateLimit()`
 * keeps the same signature, so only this file changes.
 */

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 6;

type Entry = { count: number; resetAt: number };
const buckets = new Map<string, Entry>();

/** Keeps the map from growing without bound on a long-lived instance. */
function sweep(now: number) {
  if (buckets.size < 500) return;
  for (const [key, entry] of buckets) {
    if (entry.resetAt <= now) buckets.delete(key);
  }
}

export function rateLimit(key: string): {
  allowed: boolean;
  retryAfterSeconds: number;
} {
  const now = Date.now();
  sweep(now);

  const entry = buckets.get(key);

  if (!entry || entry.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true, retryAfterSeconds: 0 };
  }

  entry.count += 1;

  if (entry.count > MAX_PER_WINDOW) {
    return {
      allowed: false,
      retryAfterSeconds: Math.ceil((entry.resetAt - now) / 1000),
    };
  }

  return { allowed: true, retryAfterSeconds: 0 };
}

/** Best-effort client identity behind a proxy or CDN. */
export function clientKey(request: Request) {
  const headers = request.headers;
  const forwarded = headers.get("x-forwarded-for");
  const ip =
    forwarded?.split(",")[0]?.trim() ||
    headers.get("x-real-ip") ||
    headers.get("cf-connecting-ip") ||
    "unknown";
  return ip;
}
