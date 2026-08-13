import { LEAD_LABELS, type Lead } from "@/lib/leads/schema";
import {
  CONCERN_OPTIONS,
  CONTACT_CHANNELS,
  COVER_OPTIONS,
  DISCUSS_OPTIONS,
  MEETING_OPTIONS,
  PROTECT_OPTIONS,
  SEGMENTS,
} from "@/lib/risk-engine";

/**
 * Turns a lead into something a broker can act on without opening a dashboard.
 *
 * The notification is deliberately plain text: it has to be readable on a phone
 * at 11pm, and answers are translated back into their human labels so nobody is
 * reading raw ids like "goods-in-transit" out of an inbox.
 */

const label = (
  options: readonly { id: string; label: string }[],
  id: string | null,
) => (id ? (options.find((o) => o.id === id)?.label ?? id) : "—");

function line(key: string, value: string | undefined | null) {
  if (!value || !value.trim()) return null;
  return `${key}: ${value.trim()}`;
}

export function formatLead(lead: Lead) {
  const rows: (string | null)[] = [];
  const c = lead.contact;

  rows.push(`${LEAD_LABELS[lead.kind].toUpperCase()}`);
  rows.push("");
  rows.push("— CONTACT —");
  rows.push(line("Name", c.name));
  rows.push(line("Phone", c.phone));
  rows.push(line("Email", c.email));
  rows.push(line("Company", c.company));

  if (lead.kind === "risk-check") {
    const segment = lead.answers.segment;
    const protectOptions = segment ? PROTECT_OPTIONS[segment] : [];

    rows.push("");
    rows.push("— RISK CHECK —");
    rows.push(line("Segment", label(SEGMENTS, segment)));
    rows.push(line("Occupation / sector", lead.answers.occupation));
    rows.push(
      line(
        "Wants to protect",
        lead.answers.protect.map((p) => label(protectOptions, p)).join(", "),
      ),
    );
    rows.push(line("Biggest concern", label(CONCERN_OPTIONS, lead.answers.concern)));
    rows.push(line("Current cover", label(COVER_OPTIONS, lead.answers.cover)));
    rows.push(line("Wants to review", lead.answers.improve));
    rows.push(line("Snapshot flagged", lead.snapshot.join(", ")));
  }

  if (lead.kind === "claim") {
    rows.push("");
    rows.push("— CLAIM —");
    rows.push(line("Type", lead.claimType));
    rows.push(line("Existing client", lead.isExistingClient ? "Yes" : "No"));
    rows.push(line("Policy number", lead.policyNumber));
    rows.push(line("Insurer", lead.insurer));
    rows.push(line("Date of incident", lead.incidentDate));
    rows.push(line("What happened", lead.description));
  }

  if (lead.kind === "policy-review") {
    rows.push("");
    rows.push("— POLICY REVIEW —");
    rows.push(line("Policy types", lead.policyTypes.join(", ")));
    rows.push(line("Current insurer", lead.currentInsurer));
    rows.push(line("Renewal date", lead.renewalDate));
    rows.push(line("Wants reviewed", lead.reviewFocus));
  }

  if (lead.kind === "risk-check" || lead.kind === "consultation") {
    rows.push("");
    rows.push("— CONSULTATION —");
    rows.push(line("Wants to discuss", label(DISCUSS_OPTIONS, lead.booking.discuss)));
    rows.push(line("Preferred format", label(MEETING_OPTIONS, lead.booking.meeting)));
    rows.push(line("Preferred channel", label(CONTACT_CHANNELS, lead.booking.channel)));
    rows.push(line("Preferred time", lead.booking.when));
    rows.push(line("Notes", lead.booking.notes));
  }

  return rows.filter((r) => r !== null).join("\n");
}

export function leadSubject(lead: Lead) {
  const who = lead.contact.name || "Website visitor";
  const prefix = lead.kind === "claim" ? "URGENT — " : "";
  return `${prefix}${LEAD_LABELS[lead.kind]}: ${who}`;
}
