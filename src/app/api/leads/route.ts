import { NextResponse } from "next/server";
import { leadSchema } from "@/lib/leads/schema";
import { deliverLead } from "@/lib/leads/deliver";
import { clientKey, rateLimit } from "@/lib/leads/rate-limit";

/** Leads are delivered, never rendered — nothing here should be cached. */
export const dynamic = "force-dynamic";

const GENERIC_FAILURE =
  "We could not send that just now. Please try again, or call us on +234 916 748 2363.";

export async function POST(request: Request) {
  const limit = rateLimit(clientKey(request));
  if (!limit.allowed) {
    return NextResponse.json(
      { ok: false, error: "Too many submissions. Please try again shortly." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSeconds) } },
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Malformed request." }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(payload);
  if (!parsed.success) {
    // Field-level errors so the client can highlight the right input, rather
    // than showing a general failure for a fixable typo.
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[issue.path.length - 1];
      if (typeof key === "string" && !fieldErrors[key]) {
        fieldErrors[key] = issue.message;
      }
    }
    return NextResponse.json(
      { ok: false, error: "Please check the highlighted fields.", fieldErrors },
      { status: 422 },
    );
  }

  const lead = parsed.data;

  // Honeypot. Return success so the bot has nothing to learn from the response.
  if (lead.website) {
    return NextResponse.json({ ok: true });
  }

  const result = await deliverLead(lead);

  if (!result.delivered) {
    console.error("[lead] delivery failed", {
      kind: lead.kind,
      errors: result.errors,
    });
    return NextResponse.json({ ok: false, error: GENERIC_FAILURE }, { status: 502 });
  }

  // Partial failure still reaches a human, but the operator needs to know a
  // channel is broken before it becomes total.
  if (result.errors.length) {
    console.warn("[lead] partial delivery", {
      kind: lead.kind,
      delivered: result.channels,
      errors: result.errors,
    });
  }

  return NextResponse.json({ ok: true });
}
