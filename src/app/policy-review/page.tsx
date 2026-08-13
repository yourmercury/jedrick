import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import Icon from "@/components/ui/Icon";
import Logo from "@/components/ui/Logo";
import PolicyReviewForm from "@/components/policy/PolicyReviewForm";

export const metadata: Metadata = {
  title: "Free Policy Health Check",
  description:
    "Send us the insurance policy you already hold. A licensed broker will tell you plainly where the gaps, overlaps and under-insurance are. Free, no obligation.",
};

const findings = [
  {
    icon: "search",
    title: "Gaps",
    body: "Risks you assume are covered but are not — the exclusions nobody read out to you.",
  },
  {
    icon: "book",
    title: "Overlaps",
    body: "Two policies quietly paying for the same thing, and you paying for both.",
  },
  {
    icon: "chart",
    title: "Under-insurance",
    body: "Sums insured that have not moved while rebuild and replacement costs have.",
  },
  {
    icon: "handshake",
    title: "Fair value",
    body: "Whether the premium matches what the market would charge for the same cover.",
  },
];

export default function PolicyReviewPage() {
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
          <div className="relative max-w-2xl py-16 sm:py-24">
            <p className="eyebrow flex items-center gap-3 text-orange">
              <span className="inline-block h-px w-8 bg-orange" />
              Free Policy Health Check
            </p>
            <h1 className="mt-6 text-4xl leading-[1.08] font-bold !text-white sm:text-5xl">
              Send us your policy. We will read the fine print for you.
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-white/75">
              Most policies we review contain at least one surprise. Better to
              find it now than at the moment you need to claim.
            </p>

            <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
              {[
                "Free, and genuinely no obligation",
                "Reviewed by a licensed broker",
                "Back to you in 2 working days",
              ].map((point) => (
                <li
                  key={point}
                  className="flex items-center gap-2.5 text-[0.88rem] font-medium text-white/70"
                >
                  <Icon name="check" className="size-4 text-orange" strokeWidth={2.4} />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section className="bg-mist py-16 sm:py-20">
        <Container size="wide">
          <h2 className="text-2xl font-bold sm:text-3xl">What we look for</h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {findings.map((f) => (
              <div key={f.title} className="rounded-2xl bg-white p-6">
                <span className="flex size-11 items-center justify-center rounded-xl bg-navy text-white">
                  <Icon name={f.icon} className="size-5" />
                </span>
                <h3 className="mt-5 text-lg font-bold">{f.title}</h3>
                <p className="mt-2 text-[0.9rem] leading-relaxed text-ink/70">
                  {f.body}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-10 max-w-3xl text-[0.95rem] leading-relaxed text-ink/70">
            This is rarely offered by brokers in this market, because it takes
            real work and it sometimes ends with us telling you to keep the
            cover you already have. We think that is the point.
          </p>
        </Container>
      </section>

      <section className="bg-white py-16 sm:py-24">
        <Container size="default">
          <h2 className="text-2xl font-bold sm:text-3xl">
            Start your free review
          </h2>
          <p className="mt-3 max-w-2xl text-[0.95rem] text-ink/70">
            Attach what you have. If you cannot find the documents, just tell us
            what you would like looked at and we will take it from there.
          </p>

          <div className="mt-10">
            <PolicyReviewForm />
          </div>
        </Container>
      </section>
    </>
  );
}
