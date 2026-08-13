"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Icon from "@/components/ui/Icon";
import Choice from "@/components/risk/Choice";
import Honeypot from "@/components/ui/Honeypot";
import { TextField } from "@/components/risk/Field";
import { contact as jedrick } from "@/lib/site";
import {
  buildSnapshot,
  emptyAnswers,
  CONCERN_OPTIONS,
  CONTACT_CHANNELS,
  COVER_OPTIONS,
  DISCUSS_OPTIONS,
  MEETING_OPTIONS,
  PROTECT_OPTIONS,
  SEGMENTS,
  type Answers,
  type Segment,
} from "@/lib/risk-engine";
import {
  submitRiskAssessment,
  type Booking,
  type ContactDetails,
} from "@/lib/submit";

/** Sections 1–4 are the risk check; 5 is the snapshot; 6–7 are the booking. */
const QUESTION_STEPS = 4;
const SNAPSHOT_STEP = 4;
const LAST_STEP = 6;

export default function RiskAssessment() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>(emptyAnswers);
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

  const snapshot = useMemo(() => buildSnapshot(answers), [answers]);
  const segment: Segment = answers.segment ?? "individual";
  const isBusiness = segment !== "individual";
  const protectOptions = PROTECT_OPTIONS[segment];

  function goTo(next: number) {
    setStep(next);
    setErrors({});
    // Keep the question in view when steps differ in height.
    requestAnimationFrame(() =>
      topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }),
    );
  }

  /** Only Section 1 and the contact details are mandatory — the source
      document is explicit that not every question should be required. */
  function validate(current: number) {
    const next: Record<string, string> = {};

    if (current === 0 && !answers.segment) {
      next.segment = "Choose one so we can tailor the questions that follow.";
    }

    if (current === LAST_STEP) {
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
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function next() {
    if (!validate(step)) return;
    goTo(Math.min(step + 1, LAST_STEP));
  }

  function back() {
    goTo(Math.max(step - 1, 0));
  }

  async function handleSubmit() {
    if (!validate(LAST_STEP)) return;
    setSubmitting(true);
    setSubmitError(null);

    const result = await submitRiskAssessment({
      answers,
      snapshotAreas: snapshot,
      booking,
      contact: details,
      website: honeypot,
    });
    setSubmitting(false);

    if (!result.ok) {
      // The server has the final say on validation, so surface its field
      // errors rather than only the general message.
      if (result.fieldErrors) setErrors(result.fieldErrors);
      setSubmitError(result.error ?? `Please try again, or call us on ${jedrick.phone}.`);
      return;
    }

    setSubmitted(true);
    requestAnimationFrame(() =>
      topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }),
    );
  }

  const toggleProtect = (value: string) =>
    setAnswers((a) => ({
      ...a,
      protect: a.protect.includes(value)
        ? a.protect.filter((v) => v !== value)
        : [...a.protect, value],
    }));

  if (submitted) {
    return (
      <Confirmation
        ref={topRef}
        name={details.name}
        channel={booking.channel}
        snapshotCount={snapshot.length}
      />
    );
  }

  return (
    <div ref={topRef} className="relative scroll-mt-28">
      <Honeypot value={honeypot} onChange={setHoneypot} />
      <Container size="default" className="py-14 sm:py-20">
        <Progress step={step} />

        <div className="mt-10">
          {/* ---------------------------------------------- Section 1 */}
          {step === 0 && (
            <Step
              legend="I am a…"
              caption="This decides which questions we ask next — there is no wrong answer."
              error={errors.segment}
            >
              <div className="grid gap-3">
                {SEGMENTS.map((s) => (
                  <Choice
                    key={s.id}
                    type="radio"
                    name="segment"
                    value={s.id}
                    label={s.label}
                    hint={s.hint}
                    checked={answers.segment === s.id}
                    onChange={(v) =>
                      setAnswers((a) => ({
                        ...a,
                        segment: v as Segment,
                        // Options differ per segment, so stale picks must clear.
                        protect: [],
                      }))
                    }
                  />
                ))}
              </div>

              <div className="mt-8 max-w-md">
                <TextField
                  label={isBusiness ? "What does the business do?" : "What do you do?"}
                  optional
                  placeholder={
                    isBusiness ? "e.g. haulage, fabrication, a school" : "e.g. teacher, trader, engineer"
                  }
                  value={answers.occupation}
                  onChange={(e) =>
                    setAnswers((a) => ({ ...a, occupation: e.target.value }))
                  }
                />
              </div>
            </Step>
          )}

          {/* ---------------------------------------------- Section 2 */}
          {step === 1 && (
            <Step
              legend="What are you most interested in protecting?"
              caption="Choose as many as apply."
            >
              {isBusiness && (
                <button
                  type="button"
                  onClick={() =>
                    setAnswers((a) => ({
                      ...a,
                      protect:
                        a.protect.length === protectOptions.length
                          ? []
                          : protectOptions.map((o) => o.id),
                    }))
                  }
                  className="mb-4 text-[0.85rem] font-semibold text-navy underline decoration-orange decoration-2 underline-offset-4 hover:text-orange"
                >
                  {answers.protect.length === protectOptions.length
                    ? "Clear all"
                    : "All of the above"}
                </button>
              )}

              <div className="grid gap-3 sm:grid-cols-2">
                {protectOptions.map((o) => (
                  <Choice
                    key={o.id}
                    type="checkbox"
                    name="protect"
                    value={o.id}
                    label={o.label}
                    checked={answers.protect.includes(o.id)}
                    onChange={toggleProtect}
                  />
                ))}
              </div>
            </Step>
          )}

          {/* ---------------------------------------------- Section 3 */}
          {step === 2 && (
            <Step
              legend="What would be hardest to recover from?"
              caption="If something unexpected happened tomorrow."
            >
              <div className="grid gap-3 sm:grid-cols-2">
                {CONCERN_OPTIONS.map((o) => (
                  <Choice
                    key={o.id}
                    type="radio"
                    name="concern"
                    value={o.id}
                    label={o.label}
                    checked={answers.concern === o.id}
                    onChange={(v) => setAnswers((a) => ({ ...a, concern: v }))}
                  />
                ))}
              </div>
            </Step>
          )}

          {/* ---------------------------------------------- Section 4 */}
          {step === 3 && (
            <Step
              legend="How are you currently protecting these risks?"
              caption="Honest answers give you a more useful snapshot."
            >
              <div className="grid gap-3 sm:grid-cols-2">
                {COVER_OPTIONS.map((o) => (
                  <Choice
                    key={o.id}
                    type="radio"
                    name="cover"
                    value={o.id}
                    label={o.label}
                    checked={answers.cover === o.id}
                    onChange={(v) => setAnswers((a) => ({ ...a, cover: v }))}
                  />
                ))}
              </div>

              {answers.cover && answers.cover !== "none" && (
                <div className="mt-8 max-w-xl">
                  <TextField
                    label="What would you like to review or improve?"
                    optional
                    textarea
                    placeholder="Anything about your current cover that has been bothering you."
                    value={answers.improve}
                    onChange={(e) =>
                      setAnswers((a) => ({ ...a, improve: e.target.value }))
                    }
                  />
                </div>
              )}
            </Step>
          )}

          {/* ---------------------------------------------- Section 5 */}
          {step === SNAPSHOT_STEP && (
            <Snapshot areas={snapshot} occupation={answers.occupation} />
          )}

          {/* ---------------------------------------------- Section 6 */}
          {step === 5 && (
            <Step
              legend="Book your free consultation"
              caption="All optional — it just helps us come prepared."
            >
              <div className="space-y-9">
                <SubGroup label="What would you like to discuss?">
                  <div className="grid gap-3 sm:grid-cols-2">
                    {DISCUSS_OPTIONS.map((o) => (
                      <Choice
                        key={o.id}
                        type="radio"
                        name="discuss"
                        value={o.id}
                        label={o.label}
                        checked={booking.discuss === o.id}
                        onChange={(v) =>
                          setBooking((b) => ({ ...b, discuss: v }))
                        }
                      />
                    ))}
                  </div>
                </SubGroup>

                <SubGroup label="How would you like to meet?">
                  <div className="grid gap-3 sm:grid-cols-3">
                    {MEETING_OPTIONS.map((o) => (
                      <Choice
                        key={o.id}
                        type="radio"
                        name="meeting"
                        value={o.id}
                        label={o.label}
                        checked={booking.meeting === o.id}
                        onChange={(v) =>
                          setBooking((b) => ({ ...b, meeting: v }))
                        }
                      />
                    ))}
                  </div>
                </SubGroup>

                <SubGroup label="How would you like us to reach you?">
                  <div className="grid gap-3 sm:grid-cols-3">
                    {CONTACT_CHANNELS.map((o) => (
                      <Choice
                        key={o.id}
                        type="radio"
                        name="channel"
                        value={o.id}
                        label={o.label}
                        checked={booking.channel === o.id}
                        onChange={(v) =>
                          setBooking((b) => ({ ...b, channel: v }))
                        }
                      />
                    ))}
                  </div>
                </SubGroup>

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
              </div>
            </Step>
          )}

          {/* ---------------------------------------------- Section 7 */}
          {step === LAST_STEP && (
            <Step
              legend="Where should we send it?"
              caption="A broker will review your answers before getting in touch — no automated sales calls."
            >
              <div className="grid max-w-2xl gap-6 sm:grid-cols-2">
                <TextField
                  label="Full name"
                  value={details.name}
                  error={errors.name}
                  autoComplete="name"
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

              {submitError && (
                <p
                  role="alert"
                  className="mt-6 rounded-xl border border-orange/40 bg-orange/5 p-4 text-[0.9rem] text-orange-deep"
                >
                  {submitError}
                </p>
              )}

              <p className="mt-6 flex max-w-xl items-start gap-2.5 text-[0.82rem] leading-relaxed text-ink/60">
                <Icon name="shield" className="mt-0.5 size-4 shrink-0 text-orange" />
                We use these details to prepare for your consultation and
                nothing else. We do not share them with insurers without your
                say-so.
              </p>
            </Step>
          )}
        </div>

        {/* ------------------------------------------------ Navigation */}
        <div className="mt-12 flex flex-col-reverse gap-4 border-t border-gray-line/50 pt-8 sm:flex-row sm:items-center sm:justify-between">
          {step > 0 ? (
            <button
              type="button"
              onClick={back}
              className="flex items-center gap-2 self-start text-[0.9rem] font-semibold text-ink/70 transition hover:text-navy"
            >
              <Icon name="arrowRight" className="size-4 rotate-180" />
              Back
            </button>
          ) : (
            <span className="hidden sm:block" />
          )}

          {step < LAST_STEP ? (
            <button
              type="button"
              onClick={next}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-orange px-7 py-3.5 text-[0.95rem] font-semibold whitespace-nowrap text-white shadow-[0_6px_20px_-6px_rgba(249,115,22,0.7)] transition hover:-translate-y-0.5 hover:bg-orange-deep"
            >
              {step === SNAPSHOT_STEP
                ? "Book a free consultation"
                : step === 3
                  ? "See my risk snapshot"
                  : "Continue"}
              <Icon name="arrowRight" className="size-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={submitting}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-orange px-7 py-3.5 text-[0.95rem] font-semibold whitespace-nowrap text-white shadow-[0_6px_20px_-6px_rgba(249,115,22,0.7)] transition hover:-translate-y-0.5 hover:bg-orange-deep disabled:pointer-events-none disabled:opacity-60"
            >
              {submitting ? "Sending…" : "Submit your free consultation"}
              {!submitting && <Icon name="arrowRight" className="size-4" />}
            </button>
          )}
        </div>

        {step > 0 && step < SNAPSHOT_STEP && (
          <p className="mt-5 text-center text-[0.82rem] text-ink/55 sm:text-right">
            Not sure? Skip it — none of these are required.
          </p>
        )}
      </Container>
    </div>
  );
}

/* -------------------------------------------------------------------------- */

function Progress({ step }: { step: number }) {
  const phase =
    step < SNAPSHOT_STEP
      ? `Question ${step + 1} of ${QUESTION_STEPS}`
      : step === SNAPSHOT_STEP
        ? "Your risk snapshot"
        : `Booking · step ${step - SNAPSHOT_STEP} of 2`;

  const pct = Math.round(((step + 1) / (LAST_STEP + 1)) * 100);

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <p className="eyebrow text-orange">{phase}</p>
        <p className="flex items-center gap-1.5 text-[0.78rem] font-medium text-ink/55">
          <Icon name="clock" className="size-3.5" />
          About 2 minutes
        </p>
      </div>
      <div
        className="mt-3 h-1.5 overflow-hidden rounded-full bg-mist-deep"
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Risk check progress"
      >
        <div
          className="h-full rounded-full bg-orange transition-all duration-500 ease-[--ease-out-soft]"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

function Step({
  legend,
  caption,
  error,
  children,
}: {
  legend: string;
  caption?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <fieldset>
      <legend className="font-display text-2xl leading-snug font-bold text-navy sm:text-[1.85rem]">
        {legend}
      </legend>
      {caption && (
        <p className="mt-3 text-[0.95rem] text-ink/70">{caption}</p>
      )}
      {error && (
        <p
          role="alert"
          className="mt-4 rounded-xl border border-orange/40 bg-orange/5 px-4 py-3 text-[0.88rem] font-medium text-orange-deep"
        >
          {error}
        </p>
      )}
      <div className="mt-8">{children}</div>
    </fieldset>
  );
}

function SubGroup({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="mb-4 text-[0.88rem] font-semibold text-navy">{label}</p>
      {children}
    </div>
  );
}

function Snapshot({
  areas,
  occupation,
}: {
  areas: ReturnType<typeof buildSnapshot>;
  occupation: string;
}) {
  return (
    <div>
      <h2 className="font-display text-2xl leading-snug font-bold text-navy sm:text-[1.85rem]">
        Based on your answers, these are the areas that may need your attention.
      </h2>
      <p className="mt-3 max-w-2xl text-[0.95rem] text-ink/70">
        This is a starting point, not a recommendation
        {occupation.trim() ? ` for ${occupation.trim()}` : ""} — a broker will
        go through it properly with you.
      </p>

      <div className="mt-9 space-y-4">
        {areas.map((area, i) => (
          <div
            key={area.id}
            className="rounded-2xl border border-gray-line/60 bg-mist/60 p-6 sm:p-8"
          >
            <div className="flex items-start gap-5">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-navy font-display text-[0.95rem] font-bold text-white">
                {i + 1}
              </span>
              <div className="min-w-0">
                <h3 className="text-lg leading-snug font-bold text-navy">
                  {area.title}
                </h3>
                <p className="mt-3 text-[0.93rem] leading-relaxed text-ink/75">
                  {area.body}
                </p>

                <div className="mt-5 flex flex-wrap items-center gap-2">
                  <span className="text-[0.78rem] font-semibold tracking-wide text-ink/50 uppercase">
                    Worth looking at
                  </span>
                  {area.cover.map((c) => (
                    <span
                      key={c}
                      className="rounded-full bg-white px-3 py-1.5 text-[0.8rem] font-medium text-navy ring-1 ring-gray-line/70"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-8 flex items-start gap-2.5 text-[0.85rem] leading-relaxed text-ink/60">
        <Icon name="compass" className="mt-0.5 size-4 shrink-0 text-orange" />
        This snapshot is general guidance based on what you told us. It is not a
        quote and not personalised advice — that comes from the conversation.
      </p>
    </div>
  );
}

function Confirmation({
  ref,
  name,
  channel,
  snapshotCount,
}: {
  ref: React.Ref<HTMLDivElement>;
  name: string;
  channel: string | null;
  snapshotCount: number;
}) {
  const channelPhrase =
    channel === "whatsapp"
      ? "on WhatsApp"
      : channel === "phone"
        ? "by phone"
        : channel === "email"
          ? "by email"
          : "using the details you gave us";

  return (
    <div ref={ref} className="scroll-mt-28">
      <Container size="narrow" className="py-20 sm:py-28">
        <div className="text-center">
          <span className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-orange text-white">
            <Icon name="check" className="size-8" strokeWidth={2.5} />
          </span>

          <h2 className="mt-8 font-display text-3xl leading-tight font-bold text-navy sm:text-4xl">
            Thank you{name.trim() ? `, ${name.trim().split(" ")[0]}` : ""}.
          </h2>

          <p className="mt-5 text-lg leading-relaxed text-ink/75">
            We have your risk check and the {snapshotCount} areas it flagged. A
            broker will review it and reach out {channelPhrase} to arrange your
            free consultation.
          </p>

          <div className="mt-10 rounded-2xl border border-gray-line/60 bg-mist p-6 text-left sm:p-8">
            <p className="eyebrow text-orange">If it is urgent</p>
            <div className="mt-4 space-y-3 text-[0.95rem]">
              <a
                href={jedrick.phoneHref}
                className="flex items-center gap-3 font-semibold text-navy hover:text-orange"
              >
                <Icon name="phone" className="size-4 text-orange" />
                {jedrick.phone}
              </a>
              <a
                href={jedrick.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-ink/80 hover:text-navy"
              >
                <Icon name="chat" className="size-4 text-orange" />
                Chat on WhatsApp
              </a>
              <p className="flex items-center gap-3 text-ink/60">
                <Icon name="clock" className="size-4 text-orange" />
                {jedrick.hours}
              </p>
            </div>
          </div>

          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/learn"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-navy/25 px-6 py-3 text-[0.9rem] font-semibold text-navy transition hover:bg-navy hover:text-white"
            >
              Read the Learning Centre
            </Link>
            <Link
              href="/policy-review"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-navy/25 px-6 py-3 text-[0.9rem] font-semibold text-navy transition hover:bg-navy hover:text-white"
            >
              Get a free policy health check
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
