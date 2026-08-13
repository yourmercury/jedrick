import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Icon from "@/components/ui/Icon";
import Logo from "@/components/ui/Logo";
import { ARTICLES_BY_DATE, categoryLabel } from "@/content/articles";

export const metadata: Metadata = {
  title: "Risk Advisory Hub",
  description:
    "Insurance is the last line of defence, not the first. How to identify, reduce and transfer the risks your household or business actually carries.",
};

const ladder = [
  {
    step: "01",
    title: "Identify",
    body: "Name the exposures honestly, including the ones with no policy attached. Most organisations can list their assets and almost none can list what would stop them trading.",
  },
  {
    step: "02",
    title: "Reduce",
    body: "Change what can be changed. Fire separation, maintenance schedules, driver standards, access control. This is cheaper than insurance and reduces its cost.",
  },
  {
    step: "03",
    title: "Retain",
    body: "Decide deliberately what you will carry yourself. An excess you chose is very different from an excess you discovered.",
  },
  {
    step: "04",
    title: "Transfer",
    body: "Insure what remains — the losses too large to absorb. This is the last step, not the first, and it works best when the three before it have been done.",
  },
];

const services = [
  {
    icon: "search",
    title: "Risk registers and exposure mapping",
    body: "A structured list of what could go wrong, how likely it is, and what it would cost. The document most businesses discover they needed only after a loss.",
  },
  {
    icon: "chart",
    title: "Sum insured and valuation review",
    body: "Checking that the numbers in your policies still relate to reality. This is where we find the most money, and it costs nothing to look.",
  },
  {
    icon: "shield",
    title: "Loss-prevention guidance",
    body: "Practical, sector-specific measures that reduce both the chance of a loss and the premium you are charged for it.",
  },
  {
    icon: "book",
    title: "Contract and obligation review",
    body: "Reading your customer and lender contracts against your policies, so an insurance requirement you signed up to is one you actually meet.",
  },
  {
    icon: "handshake",
    title: "Programme design",
    body: "For larger organisations, structuring cover as one coherent programme rather than policies accumulated department by department.",
  },
  {
    icon: "clock",
    title: "Business continuity review",
    body: "Working out how long recovery would genuinely take — the number that decides whether your indemnity period is adequate or decorative.",
  },
];

export default function RiskAdvisoryPage() {
  const featured = ARTICLES_BY_DATE.slice(0, 3);

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
              Risk Advisory Hub
            </p>
            <h1 className="mt-6 text-4xl leading-[1.08] font-bold !text-white sm:text-5xl">
              Manage the risk before you insure it.
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-white/75">
              Every other broker opens with &ldquo;Get a Quote&rdquo;. We think
              that is backwards. Insurance is the last line of defence — useful
              precisely because the earlier lines were considered first.
            </p>
          </div>
        </Container>
      </section>

      {/* The ladder */}
      <section className="bg-white py-16 sm:py-24">
        <Container size="wide">
          <div className="max-w-2xl">
            <p className="eyebrow flex items-center gap-3 text-orange">
              <span className="inline-block h-px w-8 bg-orange" />
              How risk is actually managed
            </p>
            <h2 className="mt-5 text-3xl leading-tight font-bold sm:text-4xl">
              Four steps, and insurance is the fourth.
            </h2>
            <p className="mt-5 text-[0.98rem] leading-relaxed text-ink/75">
              A broker who starts at step four is selling. Working through all
              four usually produces better protection at a lower total cost —
              including a lower premium.
            </p>
          </div>

          <ol className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {ladder.map((item) => (
              <li
                key={item.step}
                className="rounded-2xl border border-gray-line/60 bg-mist/60 p-7"
              >
                <span className="font-display text-sm font-bold text-orange">
                  {item.step}
                </span>
                <h3 className="mt-3 text-lg leading-snug font-bold">
                  {item.title}
                </h3>
                <p className="mt-3 text-[0.92rem] leading-relaxed text-ink/75">
                  {item.body}
                </p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* Services */}
      <section className="bg-navy-ink py-16 sm:py-24">
        <Container size="wide">
          <div className="max-w-2xl">
            <p className="eyebrow flex items-center gap-3 text-orange">
              <span className="inline-block h-px w-8 bg-orange" />
              Advisory services
            </p>
            <h2 className="mt-5 text-3xl leading-tight font-bold !text-white sm:text-4xl">
              What we do before a policy is discussed.
            </h2>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <div
                key={s.title}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-7"
              >
                <span className="flex size-11 items-center justify-center rounded-xl bg-orange text-white">
                  <Icon name={s.icon} className="size-5" />
                </span>
                <h3 className="mt-5 text-lg leading-snug font-bold !text-white">
                  {s.title}
                </h3>
                <p className="mt-3 text-[0.92rem] leading-relaxed text-white/65">
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Insight */}
      <section className="bg-white py-16 sm:py-24">
        <Container size="wide">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="eyebrow flex items-center gap-3 text-orange">
                <span className="inline-block h-px w-8 bg-orange" />
                Insight
              </p>
              <h2 className="mt-5 text-3xl leading-tight font-bold sm:text-4xl">
                Risk management, written down.
              </h2>
            </div>
            <Link
              href="/learn"
              className="group flex shrink-0 items-center gap-2 text-[0.9rem] font-semibold text-navy transition hover:text-orange"
            >
              All articles
              <Icon
                name="arrowRight"
                className="size-4 transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {featured.map((a) => (
              <Link
                key={a.slug}
                href={`/learn/${a.slug}`}
                className="group flex flex-col rounded-2xl border border-gray-line/60 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-navy/25 hover:shadow-[0_30px_60px_-30px_rgba(15,28,72,0.35)]"
              >
                <p className="flex items-center gap-3 text-[0.75rem] font-semibold tracking-wide uppercase">
                  <span className="text-orange">{categoryLabel(a.category)}</span>
                  <span className="text-ink/35">{a.minutes} min</span>
                </p>
                <h3 className="mt-4 flex-1 text-[1.05rem] leading-snug font-bold text-navy">
                  {a.title}
                </h3>
                <span className="mt-5 flex items-center gap-2 text-[0.84rem] font-semibold text-navy transition group-hover:text-orange">
                  Read it
                  <Icon
                    name="arrowRight"
                    className="size-3.5 transition-transform group-hover:translate-x-1"
                  />
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-mist py-16 sm:py-20">
        <Container size="narrow">
          <div className="text-center">
            <h2 className="text-2xl leading-tight font-bold sm:text-3xl">
              Start with step one.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[0.98rem] leading-relaxed text-ink/75">
              The two-minute risk check is a short version of the identify step —
              free, no jargon, and it ends with the areas that may need your
              attention rather than a quote.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/risk-assessment"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-orange px-6 py-3.5 text-[0.92rem] font-semibold text-white transition hover:bg-orange-deep"
              >
                Know Your Risk
                <Icon name="arrowRight" className="size-4" />
              </Link>
              <Link
                href="/resources"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-navy/25 px-6 py-3.5 text-[0.92rem] font-semibold text-navy transition hover:bg-navy hover:text-white"
              >
                Checklists & calculators
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
