import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import Icon from "@/components/ui/Icon";
import Logo from "@/components/ui/Logo";
import ClaimIntake from "@/components/claims/ClaimIntake";
import { contact } from "@/lib/site";
import { CLAIM_TYPES, ESCALATION_REASONS, FIRST_24_HOURS } from "@/content/claims";

export const metadata: Metadata = {
  title: "Claims Support",
  description:
    "Start a claim with Jedrick. What to do in the first 24 hours, document checklists by claim type, and a broker who deals with the insurer for you.",
};

const howWeHelp = [
  {
    icon: "chat",
    title: "Tell us what happened",
    body: "One call or one form. No jargon, no forms you do not understand, no being passed between departments.",
  },
  {
    icon: "book",
    title: "We build the claim",
    body: "We gather the documentation, present it the way the insurer needs to see it, and speak their language on your behalf.",
  },
  {
    icon: "handshake",
    title: "We push for settlement",
    body: "We chase, escalate and challenge until you get a fair, timely outcome. If it is declined wrongly, we argue it.",
  },
];

export default function ClaimsPage() {
  return (
    <>
      <section className="navy-field relative overflow-hidden">
        <div
          className="pointer-events-none absolute -right-28 -bottom-40 hidden opacity-[0.06] lg:block"
          aria-hidden="true"
        >
          <Logo variant="icon-mono" width={480} decorative />
        </div>

        <Container size="wide">
          <div className="relative grid gap-12 py-16 sm:py-24 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="max-w-2xl">
              <p className="eyebrow flex items-center gap-3 text-orange">
                <span className="inline-block h-px w-8 bg-orange" />
                Claims Support
              </p>
              <h1 className="mt-6 text-4xl leading-[1.08] font-bold !text-white sm:text-5xl">
                The moment most brokers go quiet is the moment we show up.
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-white/75">
                A policy is only worth what it pays. We treat the claim as the
                product — not the paperwork that came before it.
              </p>
            </div>

            {/* Emergency contact given equal weight to the form: someone in the
                middle of a loss should not have to scroll to find a phone number. */}
            <div className="rounded-2xl border border-white/15 bg-white/[0.06] p-7 backdrop-blur-sm sm:p-8">
              <p className="eyebrow text-orange">Happening right now?</p>
              <p className="mt-4 text-[0.95rem] leading-relaxed text-white/75">
                Do not fill in a form. Call us.
              </p>
              <a
                href={contact.phoneHref}
                className="mt-5 flex items-center gap-3 font-display text-2xl font-bold text-white transition hover:text-orange"
              >
                <Icon name="phone" className="size-6 text-orange" />
                {contact.phone}
              </a>
              <p className="mt-2 text-[0.82rem] text-white/50">{contact.hours}</p>
              <a
                href={contact.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 flex items-center justify-center gap-2 rounded-full border border-white/30 px-5 py-3 text-[0.9rem] font-semibold text-white transition hover:bg-white hover:text-navy"
              >
                <Icon name="chat" className="size-4" />
                Message us on WhatsApp
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* First 24 hours */}
      <section className="bg-white py-16 sm:py-24">
        <Container size="wide">
          <div className="max-w-2xl">
            <p className="eyebrow flex items-center gap-3 text-orange">
              <span className="inline-block h-px w-8 bg-orange" />
              The first 24 hours
            </p>
            <h2 className="mt-5 text-3xl leading-tight font-bold sm:text-4xl">
              What you do today decides how the claim goes.
            </h2>
            <p className="mt-5 text-[0.98rem] leading-relaxed text-ink/75">
              Most claims that go badly go badly in the first day, before anyone
              has spoken to an insurer. None of this requires knowing anything
              about insurance.
            </p>
          </div>

          <ol className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {FIRST_24_HOURS.map((step, i) => (
              <li
                key={step.title}
                className="rounded-2xl border border-gray-line/60 bg-mist/60 p-6 sm:p-7"
              >
                <span className="font-display text-sm font-bold text-orange">
                  0{i + 1}
                </span>
                <h3 className="mt-3 text-lg leading-snug font-bold">
                  {step.title}
                </h3>
                <p className="mt-3 text-[0.92rem] leading-relaxed text-ink/75">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* How we help */}
      <section className="bg-navy-ink py-16 sm:py-24">
        <Container size="wide">
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            <div>
              <p className="eyebrow flex items-center gap-3 text-orange">
                <span className="inline-block h-px w-8 bg-orange" />
                How we help
              </p>
              <h2 className="mt-5 text-3xl leading-tight font-bold !text-white sm:text-4xl">
                You should not have to argue with an insurer alone.
              </h2>
              <p className="mt-5 text-[0.98rem] leading-relaxed text-white/70">
                Claims are decided on how well the loss is documented and
                presented. That is a skill, and it is ours, not yours.
              </p>
            </div>

            <ol className="space-y-4">
              {howWeHelp.map((s, i) => (
                <li
                  key={s.title}
                  className="flex gap-5 rounded-2xl border border-white/10 bg-white/[0.04] p-6 sm:p-7"
                >
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-orange text-white">
                    <Icon name={s.icon} className="size-6" />
                  </span>
                  <div>
                    <p className="eyebrow text-white/40">Step 0{i + 1}</p>
                    <h3 className="mt-1.5 text-lg font-bold !text-white">
                      {s.title}
                    </h3>
                    <p className="mt-2 text-[0.93rem] leading-relaxed text-white/65">
                      {s.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      {/* Intake */}
      <section id="start" className="scroll-mt-24 bg-white py-16 sm:py-24">
        <Container size="default">
          <h2 className="text-3xl leading-tight font-bold sm:text-4xl">
            Start your claim
          </h2>
          <p className="mt-4 max-w-2xl text-[0.98rem] leading-relaxed text-ink/75">
            Pick the type of claim and we will show you what to do first, before
            you fill in anything else.
          </p>

          <div className="mt-10">
            <ClaimIntake />
          </div>
        </Container>
      </section>

      {/* Document checklists */}
      <section className="bg-mist py-16 sm:py-24">
        <Container size="wide">
          <div className="max-w-2xl">
            <p className="eyebrow flex items-center gap-3 text-orange">
              <span className="inline-block h-px w-8 bg-orange" />
              Document checklists
            </p>
            <h2 className="mt-5 text-3xl leading-tight font-bold sm:text-4xl">
              What the insurer will ask for.
            </h2>
            <p className="mt-5 text-[0.98rem] leading-relaxed text-ink/75">
              Gathering these early is the single biggest thing you can do to
              speed up a settlement. Missing one is not fatal — tell us and we
              will work out what will do instead.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {CLAIM_TYPES.filter((t) => t.id !== "other").map((type) => (
              <div key={type.id} className="rounded-2xl bg-white p-6 sm:p-7">
                <h3 className="text-[1.05rem] font-bold text-navy">
                  {type.label}
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {type.documents.map((d) => (
                    <li
                      key={d}
                      className="flex items-start gap-3 text-[0.88rem] leading-snug text-ink/75"
                    >
                      <Icon
                        name="check"
                        className="mt-0.5 size-3.5 shrink-0 text-orange"
                        strokeWidth={2.6}
                      />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Escalation */}
      <section className="bg-white py-16 sm:py-24">
        <Container size="default">
          <div className="rounded-3xl border border-gray-line/60 bg-mist/60 p-8 sm:p-12">
            <p className="eyebrow text-orange">Claim already in trouble?</p>
            <h2 className="mt-4 text-2xl leading-tight font-bold sm:text-3xl">
              We take on claims other people placed.
            </h2>
            <p className="mt-5 max-w-2xl text-[0.98rem] leading-relaxed text-ink/75">
              If your claim has stalled, been underpaid or been declined, we will
              look at it even if we did not arrange the policy. Bring us any of
              these and we will tell you honestly whether it is worth fighting.
            </p>

            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {ESCALATION_REASONS.map((r) => (
                <li
                  key={r}
                  className="flex items-start gap-3 rounded-xl bg-white p-4 text-[0.9rem] leading-snug text-ink/80"
                >
                  <Icon
                    name="search"
                    className="mt-0.5 size-4 shrink-0 text-orange"
                  />
                  {r}
                </li>
              ))}
            </ul>

            <a
              href="#start"
              className="mt-9 inline-flex items-center gap-2 rounded-full bg-navy px-6 py-3.5 text-[0.92rem] font-semibold text-white transition hover:bg-navy-deep"
            >
              Tell us about it
              <Icon name="arrowRight" className="size-4" />
            </a>
          </div>
        </Container>
      </section>
    </>
  );
}
