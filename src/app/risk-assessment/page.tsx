import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import Logo from "@/components/ui/Logo";
import Icon from "@/components/ui/Icon";
import RiskAssessment from "@/components/risk/RiskAssessment";
import { journey } from "@/lib/site";

export const metadata: Metadata = {
  title: "Know Your Risk",
  description:
    "A two-minute risk check with no insurance jargon. Understand what you are protecting before choosing how to protect it.",
};

export default function RiskAssessmentPage() {
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
              Know Your Risk
            </p>
            <h1 className="mt-6 text-4xl leading-[1.08] font-bold !text-white sm:text-5xl">
              Two minutes. No insurance jargon.
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-white/75">
              Understand what you are protecting before choosing how to protect
              it. Answer a few plain questions and we will show you the areas
              that may need your attention.
            </p>

            <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
              {journey.map((s) => (
                <li
                  key={s.step}
                  className="flex items-center gap-2.5 text-[0.88rem] font-medium text-white/70"
                >
                  <Icon name="check" className="size-4 text-orange" strokeWidth={2.4} />
                  {s.title}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <RiskAssessment />
    </>
  );
}
