import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "@/components/ui/Container";
import Icon from "@/components/ui/Icon";
import Logo from "@/components/ui/Logo";
import { INDUSTRIES, findIndustry } from "@/content/industries";

export function generateStaticParams() {
  return INDUSTRIES.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/industries/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const industry = findIndustry(slug);
  if (!industry) return { title: "Industry not found" };
  return {
    title: `Insurance for ${industry.label}`,
    description: industry.intro,
  };
}

export default async function IndustryPage({
  params,
}: PageProps<"/industries/[slug]">) {
  const { slug } = await params;
  const industry = findIndustry(slug);
  if (!industry) notFound();

  const others = INDUSTRIES.filter((i) => i.slug !== slug).slice(0, 4);

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
            <Link
              href="/industries"
              className="inline-flex items-center gap-2 text-[0.85rem] font-semibold text-white/60 transition hover:text-orange"
            >
              <Icon name="arrowRight" className="size-4 rotate-180" />
              Industries we serve
            </Link>

            <h1 className="mt-8 text-4xl leading-[1.08] font-bold !text-white sm:text-5xl">
              {industry.label}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-white/75">
              {industry.intro}
            </p>
          </div>
        </Container>
      </section>

      <section className="bg-white py-16 sm:py-24">
        <Container size="wide">
          <div className="max-w-2xl">
            <p className="eyebrow flex items-center gap-3 text-orange">
              <span className="inline-block h-px w-8 bg-orange" />
              The risks we see
            </p>
            <h2 className="mt-5 text-3xl leading-tight font-bold sm:text-4xl">
              What actually goes wrong in this sector.
            </h2>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {industry.risks.map((risk, i) => (
              <div
                key={risk.title}
                className="rounded-2xl border border-gray-line/60 bg-mist/60 p-7"
              >
                <span className="font-display text-sm font-bold text-orange">
                  0{i + 1}
                </span>
                <h3 className="mt-3 text-lg leading-snug font-bold">
                  {risk.title}
                </h3>
                <p className="mt-3 text-[0.93rem] leading-relaxed text-ink/75">
                  {risk.body}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-navy-ink py-16 sm:py-24">
        <Container size="wide">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div>
              <p className="eyebrow flex items-center gap-3 text-orange">
                <span className="inline-block h-px w-8 bg-orange" />
                Cover that responds
              </p>
              <h2 className="mt-5 text-3xl leading-tight font-bold !text-white sm:text-4xl">
                What we would look at placing.
              </h2>
              <p className="mt-5 text-[0.98rem] leading-relaxed text-white/70">
                A starting point, not a recommendation. What you actually need
                depends on how you operate, and that is a conversation.
              </p>
            </div>

            <ul className="space-y-3">
              {industry.cover.map((c) => (
                <li
                  key={c.line}
                  className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-5 sm:p-6"
                >
                  <Icon
                    name="check"
                    className="mt-1 size-4 shrink-0 text-orange"
                    strokeWidth={2.6}
                  />
                  <div>
                    <p className="font-display text-[1.02rem] font-bold !text-white">
                      {c.line}
                    </p>
                    <p className="mt-1.5 text-[0.9rem] leading-relaxed text-white/65">
                      {c.why}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section className="bg-white py-16 sm:py-24">
        <Container size="default">
          <div className="rounded-3xl border border-gray-line/60 bg-mist/60 p-8 sm:p-12">
            <p className="eyebrow text-orange">
              Gaps we find when we review existing policies
            </p>
            <h2 className="mt-4 text-2xl leading-tight font-bold sm:text-3xl">
              If you already have cover, start here.
            </h2>
            <p className="mt-5 max-w-2xl text-[0.98rem] leading-relaxed text-ink/75">
              These are the things we most often find missing when we read a
              policy in this sector. Any one of them is worth checking today,
              whether or not you ever speak to us.
            </p>

            <ul className="mt-8 space-y-3">
              {industry.gaps.map((gap) => (
                <li
                  key={gap}
                  className="flex items-start gap-3 rounded-xl bg-white p-4 text-[0.93rem] leading-relaxed text-ink/80"
                >
                  <Icon
                    name="search"
                    className="mt-0.5 size-4 shrink-0 text-orange"
                  />
                  {gap}
                </li>
              ))}
            </ul>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/policy-review"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-orange px-6 py-3.5 text-[0.92rem] font-semibold text-white transition hover:bg-orange-deep"
              >
                Have us check your policy — free
                <Icon name="arrowRight" className="size-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-navy/25 px-6 py-3.5 text-[0.92rem] font-semibold text-navy transition hover:bg-navy hover:text-white"
              >
                Talk to a broker
              </Link>
            </div>
          </div>

          <div className="mt-14">
            <h2 className="eyebrow text-orange">Other sectors</h2>
            <div className="mt-5 flex flex-wrap gap-3">
              {others.map((o) => (
                <Link
                  key={o.slug}
                  href={`/industries/${o.slug}`}
                  className="group flex items-center gap-2.5 rounded-full border border-gray-line/70 px-5 py-3 text-[0.9rem] font-medium text-ink transition hover:border-navy hover:bg-navy hover:text-white"
                >
                  {o.short}
                  <Icon
                    name="arrowRight"
                    className="size-3.5 -translate-x-1 text-orange opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100"
                  />
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
