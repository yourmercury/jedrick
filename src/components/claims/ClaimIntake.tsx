"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Icon from "@/components/ui/Icon";
import Choice from "@/components/risk/Choice";
import Honeypot from "@/components/ui/Honeypot";
import { TextField } from "@/components/risk/Field";
import { contact as jedrick } from "@/lib/site";
import { submitClaim } from "@/lib/submit";
import { CLAIM_TYPES } from "@/content/claims";

/**
 * Claim notification.
 *
 * Deliberately short and single-page. Someone filling this in has just had a
 * fire, a crash or a burglary — a seven-step wizard would be the wrong thing to
 * put in front of them. Only what is needed to open the claim is asked; the
 * rest is gathered on the call.
 */
export default function ClaimIntake() {
  const [claimType, setClaimType] = useState<string | null>(null);
  const [isExistingClient, setIsExistingClient] = useState<string | null>(null);
  const [policyNumber, setPolicyNumber] = useState("");
  const [insurer, setInsurer] = useState("");
  const [incidentDate, setIncidentDate] = useState("");
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const topRef = useRef<HTMLDivElement>(null);
  const selected = CLAIM_TYPES.find((t) => t.id === claimType);

  function validate() {
    const next: Record<string, string> = {};
    if (!claimType) next.claimType = "Tell us what kind of claim this is.";
    if (!name.trim()) next.name = "Please tell us your name.";
    // A claim is urgent, so a phone number is required here even though the
    // other forms accept an email alone.
    if (!phone.trim()) next.phone = "We need a number we can call you on.";
    else if (phone.replace(/\D/g, "").length < 7) {
      next.phone = "That phone number does not look right.";
    }
    if (email.trim() && !/^\S+@\S+\.\S+$/.test(email.trim())) {
      next.email = "That email address does not look right.";
    }
    if (!description.trim()) {
      next.description = "A sentence or two on what happened is enough.";
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

    const result = await submitClaim({
      claim: {
        claimType: selected?.label ?? claimType ?? "",
        policyNumber,
        incidentDate,
        description,
        insurer,
        isExistingClient: isExistingClient === "yes",
      },
      contact: { name, phone, email, company: "" },
      website: honeypot,
    });
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
      <div ref={topRef} className="scroll-mt-28 text-center">
        <span className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-orange text-white">
          <Icon name="check" className="size-8" strokeWidth={2.5} />
        </span>

        <h2 className="mt-8 font-display text-3xl leading-tight font-bold text-navy">
          We have it{name.trim() ? `, ${name.trim().split(" ")[0]}` : ""}.
        </h2>
        <p className="mx-auto mt-5 max-w-lg text-lg leading-relaxed text-ink/75">
          Your claim is logged and a broker will call you on {phone}. From here
          we deal with the insurer — you do not have to.
        </p>

        <div className="mx-auto mt-8 max-w-md rounded-2xl border border-orange/40 bg-orange/5 p-5 text-left">
          <p className="flex items-start gap-3 text-[0.9rem] leading-relaxed text-ink/80">
            <Icon name="phone" className="mt-0.5 size-4 shrink-0 text-orange" />
            <span>
              If this cannot wait, call{" "}
              <a
                href={jedrick.phoneHref}
                className="font-semibold text-navy underline decoration-orange decoration-2 underline-offset-4"
              >
                {jedrick.phone}
              </a>{" "}
              now rather than waiting for us to reach you.
            </span>
          </p>
        </div>

        {selected && (
          <div className="mx-auto mt-8 max-w-md rounded-2xl bg-mist p-6 text-left">
            <p className="eyebrow text-orange">Start gathering</p>
            <ul className="mt-4 space-y-2.5">
              {selected.documents.map((d) => (
                <li
                  key={d}
                  className="flex items-start gap-3 text-[0.9rem] text-ink/80"
                >
                  <Icon
                    name="check"
                    className="mt-0.5 size-4 shrink-0 text-orange"
                    strokeWidth={2.4}
                  />
                  {d}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-[0.82rem] text-ink/60">
              Do not worry if you cannot get all of it. We will tell you what
              actually matters for your claim.
            </p>
          </div>
        )}

        <div className="mt-10">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-navy/25 px-6 py-3 text-[0.9rem] font-semibold text-navy transition hover:bg-navy hover:text-white"
          >
            Back to home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div ref={topRef} className="relative scroll-mt-28">
      <form onSubmit={handleSubmit} noValidate>
        <Honeypot value={honeypot} onChange={setHoneypot} />

        <div className="space-y-10">
          <fieldset>
            <legend className="mb-4 text-[0.95rem] font-semibold text-navy">
              What kind of claim is this?
            </legend>
            {errors.claimType && (
              <p
                role="alert"
                className="mb-4 rounded-xl border border-orange/40 bg-orange/5 px-4 py-3 text-[0.88rem] font-medium text-orange-deep"
              >
                {errors.claimType}
              </p>
            )}
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {CLAIM_TYPES.map((t) => (
                <Choice
                  key={t.id}
                  type="radio"
                  name="claimType"
                  value={t.id}
                  label={t.label}
                  checked={claimType === t.id}
                  onChange={setClaimType}
                />
              ))}
            </div>
          </fieldset>

          {/* Surfaced the moment a type is picked — this is the genuinely
              useful content, and it should not be buried behind submission. */}
          {selected && (
            <div className="rounded-2xl border border-navy/15 bg-navy/[0.03] p-6 sm:p-8">
              <p className="eyebrow text-orange">Do this first</p>
              <ul className="mt-5 space-y-3">
                {selected.firstSteps.map((s) => (
                  <li
                    key={s}
                    className="flex items-start gap-3 text-[0.93rem] leading-relaxed text-ink/85"
                  >
                    <Icon
                      name="check"
                      className="mt-0.5 size-4 shrink-0 text-orange"
                      strokeWidth={2.4}
                    />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <fieldset>
            <legend className="mb-4 text-[0.95rem] font-semibold text-navy">
              Is this a policy Jedrick arranged for you?
              <span className="ml-2 font-normal text-ink/50">Optional</span>
            </legend>
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                { id: "yes", label: "Yes" },
                { id: "no", label: "No, another broker" },
                { id: "unsure", label: "I'm not sure" },
              ].map((o) => (
                <Choice
                  key={o.id}
                  type="radio"
                  name="existingClient"
                  value={o.id}
                  label={o.label}
                  checked={isExistingClient === o.id}
                  onChange={setIsExistingClient}
                />
              ))}
            </div>
            <p className="mt-3 text-[0.85rem] text-ink/60">
              We help either way. If we did not place the policy we can still
              guide you, and often still speak to the insurer on your behalf.
            </p>
          </fieldset>

          <div className="grid gap-6 sm:grid-cols-3">
            <TextField
              label="Policy number"
              optional
              placeholder="If you have it to hand"
              value={policyNumber}
              onChange={(e) => setPolicyNumber(e.target.value)}
            />
            <TextField
              label="Insurer"
              optional
              value={insurer}
              onChange={(e) => setInsurer(e.target.value)}
            />
            <TextField
              label="When did it happen?"
              optional
              placeholder="e.g. yesterday evening"
              value={incidentDate}
              onChange={(e) => setIncidentDate(e.target.value)}
            />
          </div>

          <TextField
            label="What happened?"
            textarea
            placeholder="In your own words. A sentence or two is enough to start — we will get the detail on the call."
            value={description}
            error={errors.description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <div className="border-t border-gray-line/50 pt-10">
            <p className="mb-4 text-[0.95rem] font-semibold text-navy">
              How do we reach you?
            </p>
            <div className="grid gap-6 sm:grid-cols-3">
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
                hint="We will call you on this."
                value={phone}
                error={errors.phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <TextField
                label="Email address"
                optional
                type="email"
                autoComplete="email"
                value={email}
                error={errors.email}
                onChange={(e) => setEmail(e.target.value)}
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
              <Icon name="clock" className="mt-0.5 size-4 shrink-0 text-orange" />
              Logged immediately. If it is urgent, call{" "}
              <a
                href={jedrick.phoneHref}
                className="font-semibold text-navy underline decoration-orange decoration-2 underline-offset-4"
              >
                {jedrick.phone}
              </a>{" "}
              instead of waiting.
            </p>

            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-orange px-7 py-3.5 text-[0.95rem] font-semibold whitespace-nowrap text-white shadow-[0_6px_20px_-6px_rgba(249,115,22,0.7)] transition hover:-translate-y-0.5 hover:bg-orange-deep disabled:pointer-events-none disabled:opacity-60"
            >
              {submitting ? "Sending…" : "Start my claim"}
              {!submitting && <Icon name="arrowRight" className="size-4" />}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
