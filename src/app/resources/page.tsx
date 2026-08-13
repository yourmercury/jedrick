import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Icon from "@/components/ui/Icon";
import Logo from "@/components/ui/Logo";
import {
  CalculatorFooterNote,
  CalculatorPair,
} from "@/components/resources/Calculators";
import { CHECKLISTS } from "@/content/resources";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Checklists and calculators you can actually use — renewal checks, claim preparation, sum insured and business interruption. Free, no email required.",
};

export default function ResourcesPage() {
  return (
    <>
      <section className="navy-field relative overflow-hidden">
        <div
          className="pointer-events-none absolute -right-28 -bottom-40 hidden opacity-[0.06] lg:block"
          aria-hidden="true"
        >
          <Logo variant="icon-mono" width={460} decorative />
        </div>

        <Container size="wide">
          <div className="relative max-w-2xl py-16 sm:py-24">
            <p className="eyebrow flex items-center gap-3 text-orange">
              <span className="inline-block h-px w-8 bg-orange" />
              Resources
            </p>
            <h1 className="mt-6 text-4xl leading-[1.08] font-bold !text-white sm:text-5xl">
              Checklists and tools you can actually use.
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-white/75">
              The things we find ourselves sending clients again and again. All
              of it is on the page — no email address required, no download that
              turns out to be a sales form.
            </p>
          </div>
        </Container>
      </section>

      {/* Calculators */}
      <section className="bg-white py-16 sm:py-24">
        <Container size="wide">
          <div className="max-w-2xl">
            <p className="eyebrow flex items-center gap-3 text-orange">
              <span className="inline-block h-px w-8 bg-orange" />
              Calculators
            </p>
            <h2 className="mt-5 text-3xl leading-tight font-bold sm:text-4xl">
              The two numbers people get wrong.
            </h2>
            <p className="mt-5 text-[0.98rem] leading-relaxed text-ink/75">
              Under-insurance and a too-short indemnity period cause more
              disappointed claims than any exclusion. Both are decided at
              purchase, and both are checkable in about a minute.
            </p>
          </div>

          <div className="mt-12">
            <CalculatorPair />
          </div>
          <CalculatorFooterNote />
        </Container>
      </section>

      {/* Checklists */}
      <section className="bg-mist py-16 sm:py-24">
        <Container size="wide">
          <div className="max-w-2xl">
            <p className="eyebrow flex items-center gap-3 text-orange">
              <span className="inline-block h-px w-8 bg-orange" />
              Checklists
            </p>
            <h2 className="mt-5 text-3xl leading-tight font-bold sm:text-4xl">
              Print them, or work through them here.
            </h2>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {CHECKLISTS.map((list) => (
              <div
                key={list.slug}
                id={list.slug}
                className="scroll-mt-24 rounded-2xl bg-white p-7 sm:p-8"
              >
                <p className="text-[0.75rem] font-semibold tracking-wide text-orange uppercase">
                  {list.audience}
                </p>
                <h3 className="mt-3 text-xl leading-snug font-bold text-navy">
                  {list.title}
                </h3>
                <p className="mt-3 text-[0.92rem] leading-relaxed text-ink/70">
                  {list.summary}
                </p>

                <ul className="mt-6 space-y-3 border-t border-gray-line/50 pt-6">
                  {list.items.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span
                        className="mt-1 size-4 shrink-0 rounded border border-gray-line"
                        aria-hidden="true"
                      />
                      <span className="text-[0.92rem] leading-relaxed text-ink/80">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <Container size="narrow">
          <div className="rounded-2xl border border-gray-line/60 bg-mist/60 p-8 text-center sm:p-10">
            <h2 className="text-2xl leading-tight font-bold sm:text-3xl">
              Would rather someone just checked for you?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[0.98rem] leading-relaxed text-ink/75">
              Send us your policy. A licensed broker will read it and tell you
              plainly where the gaps are — free, and with no obligation to move
              your business.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/policy-review"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-orange px-6 py-3.5 text-[0.92rem] font-semibold text-white transition hover:bg-orange-deep"
              >
                Free policy health check
                <Icon name="arrowRight" className="size-4" />
              </Link>
              <Link
                href="/learn/dictionary"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-navy/25 px-6 py-3.5 text-[0.92rem] font-semibold text-navy transition hover:bg-navy hover:text-white"
              >
                Insurance Dictionary
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
