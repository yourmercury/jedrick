import { formatLead, leadSubject } from "@/lib/leads/format";
import type { Lead } from "@/lib/leads/schema";

/**
 * Lead delivery.
 *
 * Two independent channels, both optional and both driven by environment
 * variables — see .env.example:
 *
 *   RESEND_API_KEY + LEAD_TO_EMAIL + LEAD_FROM_EMAIL  → email notification
 *   LEAD_WEBHOOK_URL                                   → POST the raw JSON
 *
 * The webhook is deliberately generic so a CRM, Zapier, Make or a Google Sheet
 * can consume it without this code knowing which.
 *
 * If a channel is configured it must succeed. A lead that is accepted and then
 * quietly dropped is worse than one that is refused, because nobody finds out.
 */

export type Attachment = {
  filename: string;
  /** base64, no data: prefix */
  content: string;
  contentType: string;
};

export type DeliveryResult = {
  delivered: boolean;
  channels: string[];
  errors: string[];
};

function env(name: string) {
  const value = process.env[name];
  return value && value.trim() ? value.trim() : null;
}

export function deliveryConfigured() {
  const email = !!(env("RESEND_API_KEY") && env("LEAD_TO_EMAIL") && env("LEAD_FROM_EMAIL"));
  const webhook = !!env("LEAD_WEBHOOK_URL");
  return { email, webhook, any: email || webhook };
}

async function sendEmail(lead: Lead, attachments: Attachment[]) {
  const apiKey = env("RESEND_API_KEY")!;
  const to = env("LEAD_TO_EMAIL")!;
  const from = env("LEAD_FROM_EMAIL")!;

  const body: Record<string, unknown> = {
    from,
    to: to.split(",").map((t) => t.trim()),
    subject: leadSubject(lead),
    text: formatLead(lead),
  };

  // Lets the broker hit reply and land in the client's inbox.
  if (lead.contact.email) body.reply_to = lead.contact.email;

  if (attachments.length) {
    body.attachments = attachments.map((a) => ({
      filename: a.filename,
      content: a.content,
      content_type: a.contentType,
    }));
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new Error(`Resend responded ${res.status}: ${await res.text()}`);
  }
}

async function sendWebhook(lead: Lead, attachments: Attachment[]) {
  const url = env("LEAD_WEBHOOK_URL")!;
  const secret = env("LEAD_WEBHOOK_SECRET");

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(secret ? { "X-Jedrick-Signature": secret } : {}),
    },
    body: JSON.stringify({
      ...lead,
      // Attachment bodies are omitted — most webhook targets reject large
      // payloads, and the email channel already carries the documents.
      attachments: attachments.map((a) => ({
        filename: a.filename,
        contentType: a.contentType,
      })),
      receivedAt: new Date().toISOString(),
    }),
  });

  if (!res.ok) {
    throw new Error(`Webhook responded ${res.status}`);
  }
}

export async function deliverLead(
  lead: Lead,
  attachments: Attachment[] = [],
): Promise<DeliveryResult> {
  const config = deliveryConfigured();
  const channels: string[] = [];
  const errors: string[] = [];

  if (!config.any) {
    // No channel configured. In development this is expected — log it so the
    // flow can still be exercised. In production it is a misconfiguration, and
    // the caller turns this into a failure rather than a false success.
    if (process.env.NODE_ENV !== "production") {
      console.info("\n[lead] no delivery configured — printing instead\n");
      console.info(formatLead(lead));
      if (attachments.length) {
        console.info(
          `\n[lead] ${attachments.length} attachment(s): ` +
            attachments.map((a) => a.filename).join(", "),
        );
      }
      return { delivered: true, channels: ["console"], errors: [] };
    }
    return { delivered: false, channels: [], errors: ["No delivery channel configured"] };
  }

  const tasks: Promise<void>[] = [];
  if (config.email) {
    tasks.push(
      sendEmail(lead, attachments).then(
        () => void channels.push("email"),
        (e: Error) => void errors.push(`email: ${e.message}`),
      ),
    );
  }
  if (config.webhook) {
    tasks.push(
      sendWebhook(lead, attachments).then(
        () => void channels.push("webhook"),
        (e: Error) => void errors.push(`webhook: ${e.message}`),
      ),
    );
  }

  await Promise.all(tasks);

  // One channel succeeding is enough — the lead reached a human somewhere.
  return { delivered: channels.length > 0, channels, errors };
}
