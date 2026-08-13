"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Icon from "@/components/ui/Icon";
import Choice from "@/components/risk/Choice";
import Honeypot from "@/components/ui/Honeypot";
import { TextField } from "@/components/risk/Field";
import { contact as jedrick } from "@/lib/site";
import {
  CONTACT_CHANNELS,
  DISCUSS_OPTIONS,
  MEETING_OPTIONS,
} from "@/lib/risk-engine";
import {
  submitConsultation,
  type Booking,
  type ContactDetails,
} from "@/lib/submit";

/**
 * Sections 6 and 7 of the Risk Assessment document, as a standalone form for
 * visitors who did not come through the risk check. Presented on one page
 * rather than as a wizard — it is short, and a booking form that paginates
 * feels like an obstacle.
 */
export default function ConsultationForm() {
  const [booking, setBooking] = useState<Booking>({
    discuss: null,
    meeting: null,
    channel: null,
    when: "",
    notes: "",
  });
  const [details, setDetails] = useState<ContactDetails>({
    name: "",
    phone: "",
    email: "",
    company: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [honeypot, setHoneypot] = useState("");

  const topRef = useRef<HTMLDivElement>(null);

  function validate() {
    const next: Record<string, string> = {};
    if (!details.name.trim()) next.name = "Please tell us your name.";
    if (!details.phone.trim() && !details.email.trim()) {
      next.phone = "Add a phone number or an email so we can reach you.";
    }
    if (details.email.trim() && !/^\S+@\S+\.\S+$/.test(details.email.trim())) {
      next.email = "That email address does not look right.";
    }
    if (details.phone.trim() && details.phone.replace(/\D/g, "").length < 7) {
      next.phone = "That phone number does not look right.";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) {
      // Send focus to the first problem rather than leaving it off-screen.
      requestAnimationFrame(() =>
        document
          .querySelector<HTMLElement>('[aria-invalid="true"]')
          ?.focus({ preventScroll: false }),
      );
      return;
    }

    setSubmitting(true);
    setSubmitError(null);

    const result = await submitConsultation({
      booking,
      contact: details,
      website: honeypot,
    });
    setSubmitting(false);

    if (!result.ok) {
      if (result.fieldErrors) setErrors(result.fieldErrors);
      setSubmitError(
        result.error ?? `Please try again, or call us on ${jedrick.phone}.`,
      );
      return;
    }

    setSubmitted(true);
    requestAnimationFrame(() =>
      topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }),
    );
  }

  if (submitted) {
    const channelPhrase =
      booking.channel === "whatsapp"
        ? "on WhatsApp"
        : booking.channel === "phone"
          ? "by phone"
          : booking.channel === "email"
            ? "by email"
            : "using the details you gave us";

    return (
      <div ref={topRef} className="scroll-mt-28">
        <div className="text-center">
          <span className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-orange text-white">
            <Icon name="check" className="size-8" strokeWidth={2.5} />
          </span>

          <h2 className="mt-8 font-display text-3xl leading-tight font-bold text-navy">
            Thank you
            {details.name.trim()
              ? `, ${details.name.trim().split(" ")[0]}`
              : ""}
            .
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-lg leading-relaxed text-ink/75">
            Your consultation request is with us. A broker will reach out{" "}
            {channelPhrase} to arrange a time — no automated sales calls.
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
              href="/learn"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-navy/25 px-6 py-3 text-[0.9rem] font-semibold text-navy transition hover:bg-navy hover:text-white"
            >
              Read the Learning Centre
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
          <Group label="What would you like to discuss?" optional>
            <div className="grid gap-3 sm:grid-cols-2">
              {DISCUSS_OPTIONS.map((o) => (
                <Choice
                  key={o.id}
                  type="radio"
                  name="discuss"
                  value={o.id}
                  label={o.label}
                  checked={booking.discuss === o.id}
                  onChange={(v) => setBooking((b) => ({ ...b, discuss: v }))}
                />
              ))}
            </div>
          </Group>

          <Group label="How would you like to meet?" optional>
            <div className="grid gap-3 sm:grid-cols-3">
              {MEETING_OPTIONS.map((o) => (
                <Choice
                  key={o.id}
                  type="radio"
                  name="meeting"
                  value={o.id}
                  label={o.label}
                  checked={booking.meeting === o.id}
                  onChange={(v) => setBooking((b) => ({ ...b, meeting: v }))}
                />
              ))}
            </div>
          </Group>

          <Group label="How would you like us to reach you?" optional>
            <div className="grid gap-3 sm:grid-cols-3">
              {CONTACT_CHANNELS.map((o) => (
                <Choice
                  key={o.id}
                  type="radio"
                  name="channel"
                  value={o.id}
                  label={o.label}
                  checked={booking.channel === o.id}
                  onChange={(v) => setBooking((b) => ({ ...b, channel: v }))}
                />
              ))}
            </div>
          </Group>

          <div className="grid gap-6 sm:grid-cols-2">
            <TextField
              label="Preferred day and time"
              optional
              placeholder="e.g. Thursday afternoon"
              value={booking.when}
              onChange={(e) =>
                setBooking((b) => ({ ...b, when: e.target.value }))
              }
            />
          </div>

          <TextField
            label="Anything you'd like us to know before we speak?"
            optional
            textarea
            value={booking.notes}
            onChange={(e) =>
              setBooking((b) => ({ ...b, notes: e.target.value }))
            }
          />

          <div className="border-t border-gray-line/50 pt-10">
            <Group label="Your contact details">
              <div className="grid gap-6 sm:grid-cols-2">
                <TextField
                  label="Full name"
                  autoComplete="name"
                  value={details.name}
                  error={errors.name}
                  onChange={(e) =>
                    setDetails((d) => ({ ...d, name: e.target.value }))
                  }
                />
                <TextField
                  label="Phone number"
                  type="tel"
                  autoComplete="tel"
                  placeholder="+234"
                  value={details.phone}
                  error={errors.phone}
                  onChange={(e) =>
                    setDetails((d) => ({ ...d, phone: e.target.value }))
                  }
                />
                <TextField
                  label="Email address"
                  type="email"
                  autoComplete="email"
                  value={details.email}
                  error={errors.email}
                  onChange={(e) =>
                    setDetails((d) => ({ ...d, email: e.target.value }))
                  }
                />
                <TextField
                  label="Company / business name"
                  optional
                  autoComplete="organization"
                  value={details.company}
                  onChange={(e) =>
                    setDetails((d) => ({ ...d, company: e.target.value }))
                  }
                />
              </div>
            </Group>
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
              <Icon
                name="shield"
                className="mt-0.5 size-4 shrink-0 text-orange"
              />
              We use these details to prepare for your consultation and nothing
              else.
            </p>

            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-orange px-7 py-3.5 text-[0.95rem] font-semibold whitespace-nowrap text-white shadow-[0_6px_20px_-6px_rgba(249,115,22,0.7)] transition hover:-translate-y-0.5 hover:bg-orange-deep disabled:pointer-events-none disabled:opacity-60"
            >
              {submitting ? "Sending…" : "Submit your free consultation"}
              {!submitting && <Icon name="arrowRight" className="size-4" />}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

function Group({
  label,
  optional,
  children,
}: {
  label: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <fieldset>
      <legend className="mb-4 text-[0.95rem] font-semibold text-navy">
        {label}
        {optional && (
          <span className="ml-2 font-normal text-ink/50">Optional</span>
        )}
      </legend>
      {children}
    </fieldset>
  );
}
