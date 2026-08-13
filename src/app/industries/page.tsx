import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Icon from "@/components/ui/Icon";
import Logo from "@/components/ui/Logo";
import { INDUSTRIES } from "@/content/industries";

export const metadata: Metadata = {
  title: "Industries We Serve",
  description:
    "A haulage fleet, a school and a fabrication yard fail in completely different ways. Sector-specific insurance guidance from Jedrick.",
};

export default function IndustriesPage() {
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
              Industries We Serve
            </p>
            <h1 className="mt-6 text-4xl leading-[1.08] font-bold !text-white sm:text-5xl">
              Your sector fails in its own particular way.
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-white/75">
              Generic cover is written for an average business that does not
              exist. These guides set out the exposures we actually see in each
              sector — and the gaps we find when we read their policies.
            </p>
          </div>
        </Container>
      </section>

      <section className="bg-white py-16 sm:py-24">
        <Container size="wide">
          <div className="grid gap-5 md:grid-cols-2">
            {INDUSTRIES.map((industry) => (
              <Link
                key={industry.slug}
                href={`/industries/${industry.slug}`}
                className="group flex flex-col rounded-2xl border border-gray-line/60 bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:border-navy/25 hover:shadow-[0_30px_60px_-30px_rgba(15,28,72,0.35)]"
              >
                <h2 className="text-xl leading-snug font-bold text-navy">
                  {industry.label}
                </h2>
                <p className="mt-3 flex-1 text-[0.93rem] leading-relaxed text-ink/70">
                  {industry.intro}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {industry.cover.slice(0, 3).map((c) => (
                    <span
                      key={c.line}
                      className="rounded-full bg-mist px-3 py-1.5 text-[0.78rem] font-medium text-navy"
                    >
                      {c.line.replace(" Insurance", "")}
                    </span>
                  ))}
                </div>

                <span className="mt-6 flex items-center gap-2 text-[0.85rem] font-semibold text-navy transition group-hover:text-orange">
                  Read the guide
                  <Icon
                    name="arrowRight"
                    className="size-4 transition-transform group-hover:translate-x-1"
                  />
                </span>
              </Link>
            ))}
          </div>

          <p className="mt-12 text-center text-[0.95rem] text-ink/65">
            Not listed?{" "}
            <Link
              href="/contact"
              className="font-semibold text-navy underline decoration-orange decoration-2 underline-offset-4 hover:text-orange"
            >
              Tell us what you do
            </Link>{" "}
            — we build bespoke corporate risk programmes.
          </p>
        </Container>
      </section>
    </>
  );
}
