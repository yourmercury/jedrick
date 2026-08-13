import { NextResponse } from "next/server";
import { policyReviewLeadSchema } from "@/lib/leads/schema";
import { deliverLead, type Attachment } from "@/lib/leads/deliver";
import { clientKey, rateLimit } from "@/lib/leads/rate-limit";

export const dynamic = "force-dynamic";

/**
 * Policy health check intake.
 *
 * Separate from /api/leads because it carries the visitor's actual policy
 * documents. Those are forwarded straight to the broker as email attachments
 * and are never written to disk or to a third-party store — the fewer copies of
 * someone's insurance policy that exist, the smaller the problem if anything
 * ever leaks.
 */

const ALLOWED_TYPES = new Set([
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/heic",
  "image/webp",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

const ALLOWED_EXTENSIONS = /\.(pdf|jpe?g|png|heic|webp|docx?)$/i;

function intFromEnv(name: string, fallback: number) {
  const raw = process.env[name];
  const parsed = raw ? Number.parseInt(raw, 10) : NaN;
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

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

  const maxFiles = intFromEnv("POLICY_UPLOAD_MAX_FILES", 5);
  const maxBytes = intFromEnv("POLICY_UPLOAD_MAX_MB", 10) * 1024 * 1024;

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ ok: false, error: "Malformed request." }, { status: 400 });
  }

  const str = (key: string) => {
    const value = form.get(key);
    return typeof value === "string" ? value : "";
  };

  const parsed = policyReviewLeadSchema.safeParse({
    kind: "policy-review",
    website: str("website"),
    currentInsurer: str("currentInsurer"),
    renewalDate: str("renewalDate"),
    reviewFocus: str("reviewFocus"),
    policyTypes: form.getAll("policyTypes").filter((v): v is string => typeof v === "string"),
    contact: {
      name: str("name"),
      phone: str("phone"),
      email: str("email"),
      company: str("company"),
    },
  });

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[issue.path.length - 1];
      if (typeof key === "string" && !fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return NextResponse.json(
      { ok: false, error: "Please check the highlighted fields.", fieldErrors },
      { status: 422 },
    );
  }

  const lead = parsed.data;

  if (lead.website) return NextResponse.json({ ok: true });

  // --- Files ---------------------------------------------------------------
  const files = form
    .getAll("documents")
    .filter((f): f is File => f instanceof File && f.size > 0);

  if (files.length > maxFiles) {
    return NextResponse.json(
      {
        ok: false,
        error: `Please attach no more than ${maxFiles} files.`,
        fieldErrors: { documents: `Maximum ${maxFiles} files.` },
      },
      { status: 422 },
    );
  }

  const totalBytes = files.reduce((sum, f) => sum + f.size, 0);
  if (totalBytes > maxBytes) {
    const mb = Math.round(maxBytes / (1024 * 1024));
    return NextResponse.json(
      {
        ok: false,
        error: `Those files come to more than ${mb}MB in total. Please send the most relevant ones, or email them to us directly.`,
        fieldErrors: { documents: `Total size must be under ${mb}MB.` },
      },
      { status: 422 },
    );
  }

  for (const file of files) {
    // Content type is client-supplied and trivially spoofed, so the extension
    // is checked too. Neither is a security boundary on its own — the real
    // protection is that we never execute or serve these files back.
    const typeOk = ALLOWED_TYPES.has(file.type);
    const extOk = ALLOWED_EXTENSIONS.test(file.name);
    if (!typeOk && !extOk) {
      return NextResponse.json(
        {
          ok: false,
          error: `"${file.name}" is not a file type we can read. Please send a PDF, a Word document, or a photo.`,
          fieldErrors: { documents: "Unsupported file type." },
        },
        { status: 422 },
      );
    }
  }

  const attachments: Attachment[] = await Promise.all(
    files.map(async (file) => ({
      filename: file.name.replace(/[^\w.\- ]+/g, "_").slice(0, 120),
      content: Buffer.from(await file.arrayBuffer()).toString("base64"),
      contentType: file.type || "application/octet-stream",
    })),
  );

  const result = await deliverLead(lead, attachments);

  if (!result.delivered) {
    console.error("[policy-review] delivery failed", { errors: result.errors });
    return NextResponse.json({ ok: false, error: GENERIC_FAILURE }, { status: 502 });
  }

  if (result.errors.length) {
    console.warn("[policy-review] partial delivery", {
      delivered: result.channels,
      errors: result.errors,
    });
  }

  return NextResponse.json({ ok: true });
}
