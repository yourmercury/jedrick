import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import Logo from "@/components/ui/Logo";

const proofPoints = [
  { icon: "compass", label: "Independent of every insurer" },
  { icon: "chat", label: "Plain English, always" },
  { icon: "shield", label: "We fight your claim with you" },
];

export default function Hero() {
  return (
    <section className="navy-field relative overflow-hidden">
      {/* Oversized brand mark as a watermark — the guideline's "logo on image"
          rule: quiet area, low contrast, never competing with the copy. */}
      <div
        className="pointer-events-none absolute -top-24 -right-32 hidden opacity-[0.06] lg:block"
        aria-hidden="true"
      >
        <Logo variant="icon-mono" width={620} decorative />
      </div>

      <Container size="wide">
        <div className="relative grid items-center gap-16 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:py-28">
          <div>
            <p className="eyebrow flex items-center gap-3 text-orange">
              <span className="inline-block h-px w-8 bg-orange" />
              Insurance Simplified, Security Amplified
            </p>

            <h1 className="mt-6 text-[2.6rem] leading-[1.05] font-bold !text-white sm:text-6xl lg:text-[4.1rem]">
              We work for you.
              <br />
              <span className="text-orange">Not the insurer.</span>
            </h1>

            <p className="mt-7 max-w-xl text-lg leading-relaxed text-white/80">
              Jedrick is an insurance broker, not an insurance company. We
              compare cover across multiple insurers, explain it in language
              that actually makes sense, and stand beside you when it is time to
              claim.
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button href="/risk-assessment" variant="primary" size="lg">
                Know Your Risk
                <span className="text-white/70">— 2 min</span>
              </Button>
              <Button href="/contact" variant="ghost-light" size="lg">
                Book a free consultation
                <Icon name="arrowRight" className="size-4" />
              </Button>
            </div>

            <ul className="mt-12 flex flex-wrap gap-x-8 gap-y-4">
              {proofPoints.map((p) => (
                <li
                  key={p.label}
                  className="flex items-center gap-2.5 text-[0.9rem] font-medium text-white/70"
                >
                  <span className="flex size-7 items-center justify-center rounded-full bg-white/10 text-orange">
                    <Icon name={p.icon} className="size-4" />
                  </span>
                  {p.label}
                </li>
              ))}
            </ul>
          </div>

          {/* Risk-check teaser card: the primary conversion path, previewed in
              miniature so the ask is obvious before the click. */}
          <div className="relative">
            <div className="rounded-3xl border border-white/15 bg-white p-2 shadow-[0_40px_90px_-40px_rgba(0,0,0,0.65)]">
              <div className="rounded-[1.25rem] bg-white p-7 sm:p-9">
                <div className="flex items-center justify-between">
                  <p className="eyebrow text-orange">Risk Check</p>
                  <span className="flex items-center gap-1.5 rounded-full bg-mist px-3 py-1 text-[0.72rem] font-semibold text-navy">
                    <Icon name="clock" className="size-3.5" />2 minutes
                  </span>
                </div>

                <h2 className="mt-4 text-2xl leading-snug font-bold sm:text-[1.7rem]">
                  Understand what you are protecting before choosing how to
                  protect it.
                </h2>

                <div className="mt-7 space-y-3">
                  {[
                    "Individual / Family",
                    "SME / Small Business",
                    "Corporate / Enterprise",
                  ].map((option, i) => (
                    <div
                      key={option}
                      className={`flex items-center justify-between rounded-xl border px-4 py-3.5 text-[0.95rem] font-medium transition ${
                        i === 1
                          ? "border-orange bg-orange/5 text-navy"
                          : "border-gray-line/60 text-ink/75"
                      }`}
                    >
                      {option}
                      <span
                        className={`flex size-5 items-center justify-center rounded-full border ${
                          i === 1
                            ? "border-orange bg-orange text-white"
                            : "border-gray-line"
                        }`}
                      >
                        {i === 1 && <Icon name="check" className="size-3" strokeWidth={3} />}
                      </span>
                    </div>
                  ))}
                </div>

                <Button
                  href="/risk-assessment"
                  variant="navy"
                  size="lg"
                  className="mt-7 w-full"
                >
                  Start my risk check
                  <Icon name="arrowRight" className="size-4" />
                </Button>

                <p className="mt-4 text-center text-[0.78rem] text-ink/55">
                  No jargon. No obligation. No sales pitch.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
