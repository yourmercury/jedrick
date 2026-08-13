"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Icon from "@/components/ui/Icon";
import Choice from "@/components/risk/Choice";
import Honeypot from "@/components/ui/Honeypot";
import FileDrop from "@/components/policy/FileDrop";
import { TextField } from "@/components/risk/Field";
import { contact as jedrick } from "@/lib/site";
import { submitPolicyReview } from "@/lib/submit";

const POLICY_TYPES = [
  { id: "motor", label: "Motor" },
  { id: "health", label: "Health" },
  { id: "life", label: "Life" },
  { id: "property", label: "Property / Fire" },
  { id: "business", label: "Business" },
  { id: "liability", label: "Liability" },
  { id: "marine", label: "Marine / Goods-in-transit" },
  { id: "group", label: "Group life / Employee benefits" },
  { id: "other", label: "Something else" },
];

export default function PolicyReviewForm() {
  const [policyTypes, setPolicyTypes] = useState<string[]>([]);
  const [currentInsurer, setCurrentInsurer] = useState("");
  const [renewalDate, setRenewalDate] = useState("");
  const [reviewFocus, setReviewFocus] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [honeypot, setHoneypot] = useState("");

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const topRef = useRef<HTMLDivElement>(null);

  function validate() {
    const next: Record<string, string> = {};
    if (!name.trim()) next.name = "Please tell us your name.";
    if (!phone.trim() && !email.trim()) {
      next.phone = "Add a phone number or an email so we can reach you.";
    }
    if (email.trim() && !/^\S+@\S+\.\S+$/.test(email.trim())) {
      next.email = "That email address does not look right.";
    }
    if (phone.trim() && phone.replace(/\D/g, "").length < 7) {
      next.phone = "That phone number does not look right.";
    }
    // Without either a document or a description there is nothing to review.
    if (files.length === 0 && !reviewFocus.trim()) {
      next.reviewFocus =
        "Attach your policy, or tell us what you would like reviewed.";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) {
      requestAnimationFrame(() =>
        document.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus(),
      );
      return;
    }

    setSubmitting(true);
    setSubmitError(null);

    const form = new FormData();
    form.set("website", honeypot);
    form.set("currentInsurer", currentInsurer);
    form.set("renewalDate", renewalDate);
    form.set("reviewFocus", reviewFocus);
    form.set("name", name);
    form.set("phone", phone);
    form.set("email", email);
    form.set("company", company);
    policyTypes.forEach((t) => form.append("policyTypes", t));
    files.forEach((f) => form.append("documents", f));

    const result = await submitPolicyReview(form);
    setSubmitting(false);

    if (!result.ok) {
      if (result.fieldErrors) setErrors(result.fieldErrors);
      setSubmitError(result.error ?? `Please call us on ${jedrick.phone}.`);
      return;
    }

    setSubmitted(true);
    requestAnimationFrame(() =>
      topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }),
    );
  }

  if (submitted) {
    return (
      <div ref={topRef} className="scroll-mt-28">
        <div className="text-center">
          <span className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-orange text-white">
            <Icon name="check" className="size-8" strokeWidth={2.5} />
          </span>

          <h2 className="mt-8 font-display text-3xl leading-tight font-bold text-navy">
            Got it{name.trim() ? `, ${name.trim().split(" ")[0]}` : ""}.
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-lg leading-relaxed text-ink/75">
            {files.length > 0
              ? `Your ${files.length === 1 ? "document is" : "documents are"} with us. `
              : "Your request is with us. "}
            A licensed broker will read it properly and come back to you within
            two working days.
          </p>
          <p className="mx-auto mt-4 max-w-lg text-[0.9rem] text-ink/60">
            No obligation to move your business. If your current cover is right,
            we will tell you so.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/risk-assessment"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-navy px-6 py-3 text-[0.9rem] font-semibold text-white transition hover:bg-navy-deep"
            >
              Take the 2-minute risk check
              <Icon name="arrowRight" className="size-4" />
            </Link>
            <Link
              href="/learn/dictionary"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-navy/25 px-6 py-3 text-[0.9rem] font-semibold text-navy transition hover:bg-navy hover:text-white"
            >
              Look up a term you did not understand
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div ref={topRef} className="relative scroll-mt-28">
      <form onSubmit={handleSubmit} noValidate>
        <Honeypot value={honeypot} onChange={setHoneypot} />

        <div className="space-y-10">
          <FileDrop
            files={files}
            onChange={setFiles}
            error={errors.documents}
          />

          <fieldset>
            <legend className="mb-4 text-[0.95rem] font-semibold text-navy">
              What kind of cover is it?
              <span className="ml-2 font-normal text-ink/50">Optional</span>
            </legend>
            <div className="grid gap-3 sm:grid-cols-3">
              {POLICY_TYPES.map((t) => (
                <Choice
                  key={t.id}
                  type="checkbox"
                  name="policyTypes"
                  value={t.id}
                  label={t.label}
                  checked={policyTypes.includes(t.id)}
                  onChange={(v) =>
                    setPolicyTypes((prev) =>
                      prev.includes(v)
                        ? prev.filter((p) => p !== v)
                        : [...prev, v],
                    )
                  }
                />
              ))}
            </div>
          </fieldset>

          <div className="grid gap-6 sm:grid-cols-2">
            <TextField
              label="Current insurer"
              optional
              placeholder="If you know it"
              value={currentInsurer}
              onChange={(e) => setCurrentInsurer(e.target.value)}
            />
            <TextField
              label="When does it renew?"
              optional
              placeholder="e.g. March 2027, or not sure"
              hint="Useful so we reach you before you are locked in for another year."
              value={renewalDate}
              onChange={(e) => setRenewalDate(e.target.value)}
            />
          </div>

          <TextField
            label="What would you like us to look at?"
            textarea
            placeholder="Anything that has been bothering you — a premium that jumped, a claim that was refused, wording you did not understand."
            value={reviewFocus}
            error={errors.reviewFocus}
            onChange={(e) => setReviewFocus(e.target.value)}
          />

          <div className="border-t border-gray-line/50 pt-10">
            <p className="mb-4 text-[0.95rem] font-semibold text-navy">
              Where should we send the review?
            </p>
            <div className="grid gap-6 sm:grid-cols-2">
              <TextField
                label="Full name"
                autoComplete="name"
                value={name}
                error={errors.name}
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                label="Phone number"
                type="tel"
                autoComplete="tel"
                placeholder="+234"
                value={phone}
                error={errors.phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <TextField
                label="Email address"
                type="email"
                autoComplete="email"
                value={email}
                error={errors.email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                label="Company / business name"
                optional
                autoComplete="organization"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
            </div>
          </div>

          {submitError && (
            <p
              role="alert"
              className="rounded-xl border border-orange/40 bg-orange/5 p-4 text-[0.9rem] text-orange-deep"
            >
              {submitError}
            </p>
          )}

          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="flex max-w-sm items-start gap-2.5 text-[0.82rem] leading-relaxed text-ink/60">
              <Icon name="shield" className="mt-0.5 size-4 shrink-0 text-orange" />
              Your documents go straight to a licensed broker. They are not
              stored on this website and are never shared with an insurer
              without your say-so.
            </p>

            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-orange px-7 py-3.5 text-[0.95rem] font-semibold whitespace-nowrap text-white shadow-[0_6px_20px_-6px_rgba(249,115,22,0.7)] transition hover:-translate-y-0.5 hover:bg-orange-deep disabled:pointer-events-none disabled:opacity-60"
            >
              {submitting ? "Sending…" : "Request my free review"}
              {!submitting && <Icon name="arrowRight" className="size-4" />}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
