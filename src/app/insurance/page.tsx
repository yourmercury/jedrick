import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Icon from "@/components/ui/Icon";
import Logo from "@/components/ui/Logo";
import { GROUPS, PRODUCTS, PRODUCTS_BY_GROUP } from "@/content/insurance";

export const metadata: Metadata = {
  title: "Insurance Solutions",
  description:
    "Eighteen classes of cover, arranged around what you are protecting rather than how insurers file it. Independent advice from a Lagos insurance broker.",
};

export default function InsurancePage() {
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
              Insurance Solutions
            </p>
            <h1 className="mt-6 text-4xl leading-[1.08] font-bold !text-white sm:text-5xl">
              Whatever you need to protect, we can place it.
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-white/75">
              {PRODUCTS.length} classes of cover, grouped by what you are
              protecting rather than by how insurers file them. Each page says
              what the policy does — and, just as importantly, what it does not.
            </p>
          </div>
        </Container>
      </section>

      <section className="bg-white py-16 sm:py-24">
        <Container size="wide">
          <div className="space-y-16">
            {GROUPS.map((group) => (
              <div key={group.id}>
                <div className="flex flex-col gap-4 border-b border-gray-line/60 pb-6 md:flex-row md:items-end md:justify-between">
                  <div className="max-w-2xl">
                    <h2 className="text-2xl leading-tight font-bold sm:text-3xl">
                      {group.label}
                    </h2>
                    <p className="mt-3 text-[0.95rem] leading-relaxed text-ink/70">
                      {group.intro}
                    </p>
                  </div>
                  <Link
                    href={`/insurance/${group.id}`}
                    className="group flex shrink-0 items-center gap-2 text-[0.88rem] font-semibold text-navy transition hover:text-orange"
                  >
                    Overview
                    <Icon
                      name="arrowRight"
                      className="size-4 transition-transform group-hover:translate-x-1"
                    />
                  </Link>
                </div>

                <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {PRODUCTS_BY_GROUP(group.id).map((product) => (
                    <Link
                      key={product.slug}
                      href={`/insurance/${group.id}/${product.slug}`}
                      className="group flex flex-col rounded-2xl border border-gray-line/60 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-navy/25 hover:shadow-[0_24px_50px_-30px_rgba(15,28,72,0.35)]"
                    >
                      <h3 className="text-[1.05rem] leading-snug font-bold text-navy">
                        {product.name}
                      </h3>
                      <p className="mt-3 flex-1 text-[0.9rem] leading-relaxed text-ink/70">
                        {product.summary}
                      </p>
                      <span className="mt-5 flex items-center gap-2 text-[0.82rem] font-semibold text-navy transition group-hover:text-orange">
                        What it covers
                        <Icon
                          name="arrowRight"
                          className="size-3.5 transition-transform group-hover:translate-x-1"
                        />
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-mist py-16 sm:py-20">
        <Container size="narrow">
          <div className="text-center">
            <h2 className="text-2xl leading-tight font-bold sm:text-3xl">
              Not sure which of these applies to you?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[0.98rem] leading-relaxed text-ink/75">
              That is the normal position, and it is the reason the risk check
              exists. Two minutes, no jargon, and it works backwards from what
              you are actually trying to protect.
            </p>
            <Link
              href="/risk-assessment"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-orange px-6 py-3.5 text-[0.92rem] font-semibold text-white transition hover:bg-orange-deep"
            >
              Know Your Risk
              <Icon name="arrowRight" className="size-4" />
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
