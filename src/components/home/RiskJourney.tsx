import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import { journey } from "@/lib/site";

export default function RiskJourney() {
  return (
    <section className="navy-field py-20 sm:py-28">
      <Container size="wide">
        <SectionHeading
          tone="light"
          align="center"
          eyebrow="Know Your Risk"
          title="Start with your risk, not with a quote."
          lead="Every other broker opens with “Get a Quote”. We think that is backwards — you cannot price protection you have not understood yet."
        />

        <ol className="mt-16 grid gap-8 md:grid-cols-3">
          {journey.map((step, i) => (
            <li key={step.step} className="relative">
              {/* Connector between steps on wide screens */}
              {i < journey.length - 1 && (
                <span
                  className="absolute top-7 left-[calc(50%+3.5rem)] hidden h-px w-[calc(100%-7rem)] bg-gradient-to-r from-white/30 to-white/5 md:block"
                  aria-hidden="true"
                />
              )}

              <div className="flex flex-col items-center text-center">
                <span className="flex size-14 items-center justify-center rounded-2xl border border-white/20 bg-white/10 font-display text-lg font-bold text-orange backdrop-blur-sm">
                  {step.step}
                </span>
                <h3 className="mt-6 text-xl font-bold !text-white">
                  {step.title}
                </h3>
                <p className="mt-3 max-w-xs text-[0.95rem] leading-relaxed text-white/70">
                  {step.body}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-16 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Button href="/risk-assessment" variant="primary" size="lg">
            Take the 2-minute risk check
            <Icon name="arrowRight" className="size-4" />
          </Button>
          <p className="text-[0.85rem] text-white/55">
            Free. No jargon. No obligation.
          </p>
        </div>
      </Container>
    </section>
  );
}
