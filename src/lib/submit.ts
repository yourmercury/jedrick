import type { Answers, RiskArea } from "@/lib/risk-engine";

export type Booking = {
  discuss: string | null;
  meeting: string | null;
  channel: string | null;
  when: string;
  notes: string;
};

export type ContactDetails = {
  name: string;
  phone: string;
  email: string;
  company: string;
};

export type SubmitResult = {
  ok: boolean;
  error?: string;
  /** Server-side validation errors, keyed by field name. */
  fieldErrors?: Record<string, string>;
};

const FALLBACK_ERROR =
  "We could not send that just now. Please try again, or call us on +234 916 748 2363.";

/**
 * Single path to the lead endpoint. Every form goes through here so retry,
 * error shape and network handling stay consistent.
 */
async function post(body: unknown): Promise<SubmitResult> {
  try {
    const res = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = (await res.json().catch(() => null)) as SubmitResult | null;

    if (!res.ok) {
      return {
        ok: false,
        error: data?.error ?? FALLBACK_ERROR,
        fieldErrors: data?.fieldErrors,
      };
    }

    return { ok: true };
  } catch {
    // Network failure, offline, blocked request.
    return { ok: false, error: FALLBACK_ERROR };
  }
}

export async function submitRiskAssessment(payload: {
  answers: Answers;
  /** Full area objects; only their ids are sent. */
  snapshotAreas: RiskArea[];
  booking: Booking;
  contact: ContactDetails;
  website?: string;
}): Promise<SubmitResult> {
  return post({
    kind: "risk-check",
    website: payload.website ?? "",
    answers: payload.answers,
    snapshot: payload.snapshotAreas.map((a) => a.id),
    booking: payload.booking,
    contact: payload.contact,
  });
}

export async function submitConsultation(payload: {
  booking: Booking;
  contact: ContactDetails;
  website?: string;
}): Promise<SubmitResult> {
  return post({
    kind: "consultation",
    website: payload.website ?? "",
    booking: payload.booking,
    contact: payload.contact,
  });
}

export type ClaimDetails = {
  claimType: string;
  policyNumber: string;
  incidentDate: string;
  description: string;
  insurer: string;
  isExistingClient: boolean;
};

export async function submitClaim(payload: {
  claim: ClaimDetails;
  contact: ContactDetails;
  website?: string;
}): Promise<SubmitResult> {
  return post({
    kind: "claim",
    website: payload.website ?? "",
    ...payload.claim,
    contact: payload.contact,
  });
}

/**
 * Policy review posts multipart rather than JSON — it carries the visitor's
 * actual policy documents, so it has its own endpoint.
 */
export async function submitPolicyReview(form: FormData): Promise<SubmitResult> {
  try {
    const res = await fetch("/api/policy-review", { method: "POST", body: form });
    const data = (await res.json().catch(() => null)) as SubmitResult | null;

    if (!res.ok) {
      return {
        ok: false,
        error: data?.error ?? FALLBACK_ERROR,
        fieldErrors: data?.fieldErrors,
      };
    }
    return { ok: true };
  } catch {
    return { ok: false, error: FALLBACK_ERROR };
  }
}
