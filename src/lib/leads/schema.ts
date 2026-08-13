import { z } from "zod";

/**
 * Server-side lead schema.
 *
 * The client has its own validation for fast feedback, but this is the copy
 * that decides. Anything reaching the API is untrusted — a form can be posted
 * to directly, and the browser rules can be edited away.
 */

const trimmed = (max: number) => z.string().trim().max(max);

/** Shared across every lead type: who they are and how to reach them. */
export const contactSchema = z
  .object({
    name: trimmed(120).min(1, "Please tell us your name."),
    phone: trimmed(40).default(""),
    email: z
      .union([z.literal(""), z.string().trim().email("That email address does not look right.")])
      .default(""),
    company: trimmed(160).default(""),
  })
  .refine((c) => c.phone.length > 0 || c.email.length > 0, {
    message: "Add a phone number or an email so we can reach you.",
    path: ["phone"],
  })
  .refine((c) => c.phone === "" || c.phone.replace(/\D/g, "").length >= 7, {
    message: "That phone number does not look right.",
    path: ["phone"],
  });

export const bookingSchema = z.object({
  discuss: trimmed(40).nullable().default(null),
  meeting: trimmed(40).nullable().default(null),
  channel: trimmed(40).nullable().default(null),
  when: trimmed(200).default(""),
  notes: trimmed(4000).default(""),
});

const answersSchema = z.object({
  segment: z.enum(["individual", "sme", "corporate"]).nullable(),
  occupation: trimmed(160).default(""),
  protect: z.array(trimmed(40)).max(20).default([]),
  concern: trimmed(40).nullable().default(null),
  cover: trimmed(40).nullable().default(null),
  improve: trimmed(4000).default(""),
});

/**
 * A honeypot. Real people never see this field, so anything in it is a bot.
 * Named plausibly on purpose — "website" is what a crawler expects to fill.
 */
const honeypotSchema = trimmed(200).optional().default("");

export const riskCheckLeadSchema = z.object({
  kind: z.literal("risk-check"),
  website: honeypotSchema,
  answers: answersSchema,
  snapshot: z.array(trimmed(60)).max(10).default([]),
  booking: bookingSchema,
  contact: contactSchema,
});

export const consultationLeadSchema = z.object({
  kind: z.literal("consultation"),
  website: honeypotSchema,
  booking: bookingSchema,
  contact: contactSchema,
});

export const claimLeadSchema = z.object({
  kind: z.literal("claim"),
  website: honeypotSchema,
  claimType: trimmed(60),
  policyNumber: trimmed(80).default(""),
  incidentDate: trimmed(40).default(""),
  description: trimmed(6000).default(""),
  insurer: trimmed(120).default(""),
  isExistingClient: z.boolean().default(false),
  contact: contactSchema,
});

export const policyReviewLeadSchema = z.object({
  kind: z.literal("policy-review"),
  website: honeypotSchema,
  currentInsurer: trimmed(120).default(""),
  renewalDate: trimmed(40).default(""),
  reviewFocus: trimmed(4000).default(""),
  policyTypes: z.array(trimmed(60)).max(20).default([]),
  contact: contactSchema,
});

export const leadSchema = z.discriminatedUnion("kind", [
  riskCheckLeadSchema,
  consultationLeadSchema,
  claimLeadSchema,
  policyReviewLeadSchema,
]);

export type Lead = z.infer<typeof leadSchema>;
export type LeadKind = Lead["kind"];

export const LEAD_LABELS: Record<LeadKind, string> = {
  "risk-check": "Risk check",
  consultation: "Consultation request",
  claim: "Claim notification",
  "policy-review": "Policy health check",
};

/**
 * Claims are time-critical in a way the other lead types are not — a loss is
 * already in progress. Used to flag the notification subject line.
 */
export function isUrgent(lead: Lead) {
  return lead.kind === "claim";
}
