import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Icon from "@/components/ui/Icon";
import Logo from "@/components/ui/Logo";
import { coreValues, differentiators, mission, site, vision } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Jedrick was founded to bring clarity, confidence and integrity back into insurance broking. Our story, mission, vision and values.",
};

export default function AboutPage() {
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
              About Jedrick
            </p>
            <h1 className="mt-6 text-4xl leading-[1.08] font-bold !text-white sm:text-5xl">
              We started Jedrick because we had seen how it usually goes.
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-white/75">
              {site.positioning}
            </p>
          </div>
        </Container>
      </section>

      {/* Story */}
      <section className="bg-white py-16 sm:py-24">
        <Container size="narrow">
          <p className="eyebrow flex items-center gap-3 text-orange">
            <span className="inline-block h-px w-8 bg-orange" />
            Our story
          </p>
          <h2 className="mt-5 text-3xl leading-tight font-bold sm:text-4xl">
            Protection, not pressure. Clarity, not confusion.
          </h2>

          <div className="mt-8 space-y-6 text-[1.02rem] leading-[1.75] text-ink/85">
            <p>
              Our journey began after years in a sector where sales often took
              precedence over service. We saw first-hand the uncertainty and
              frustration that arises when clients are handed complicated
              policies and fine print, and left to work it out alone.
            </p>
            <p>
              It became clear that something needed to change. So we set out to
              build something different — a service that makes the complex
              simple, puts people first, and restores what insurance broking was
              always meant to be: a source of protection rather than pressure,
              and of clarity rather than confusion.
            </p>
            <p>
              We founded Jedrick to bring clarity, confidence and integrity back
              into insurance broking. Our purpose is straightforward: to be the
              trusted link between people and protection.
            </p>
          </div>

          <blockquote className="mt-10 border-l-2 border-orange py-2 pl-6 font-display text-xl leading-snug font-semibold text-navy sm:text-2xl">
            {site.tagline}
          </blockquote>
        </Container>
      </section>

      {/* Mission & vision */}
      <section className="bg-navy-ink py-16 sm:py-24">
        <Container size="wide">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-8 sm:p-10">
              <p className="eyebrow text-orange">Mission</p>
              <p className="mt-5 text-[1.05rem] leading-[1.7] text-white/85">
                {mission}
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-8 sm:p-10">
              <p className="eyebrow text-orange">Vision</p>
              <p className="mt-5 text-[1.05rem] leading-[1.7] text-white/85">
                {vision}
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* T.E.R.C.A. */}
      <section className="bg-white py-16 sm:py-24">
        <Container size="wide">
          <div className="max-w-2xl">
            <p className="eyebrow flex items-center gap-3 text-orange">
              <span className="inline-block h-px w-8 bg-orange" />
              T.E.R.C.A.
            </p>
            <h2 className="mt-5 text-3xl leading-tight font-bold sm:text-4xl">
              Five values, and they spell something on purpose.
            </h2>
            <p className="mt-5 text-[0.98rem] leading-relaxed text-ink/75">
              Values are easy to publish and harder to be held to. These are the
              ones we would want a client to test us against.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {coreValues.map((value) => (
              <div
                key={value.letter}
                className="rounded-2xl border border-gray-line/60 bg-mist/60 p-7"
              >
                <span className="flex size-12 items-center justify-center rounded-xl bg-navy font-display text-xl font-bold text-white">
                  {value.letter}
                </span>
                <h3 className="mt-5 text-lg font-bold">{value.title}</h3>
                <p className="mt-3 text-[0.92rem] leading-relaxed text-ink/75">
                  {value.body}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Why clients choose us */}
      <section className="bg-mist py-16 sm:py-24">
        <Container size="wide">
          <div className="max-w-2xl">
            <p className="eyebrow flex items-center gap-3 text-orange">
              <span className="inline-block h-px w-8 bg-orange" />
              Why clients choose Jedrick
            </p>
            <h2 className="mt-5 text-3xl leading-tight font-bold sm:text-4xl">
              We are a broker, not an insurance company.
            </h2>
            <p className="mt-5 text-[0.98rem] leading-relaxed text-ink/75">
              That single fact shapes everything else. We are paid to find you
              the right cover, not to move one insurer&rsquo;s product.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {differentiators.map((d) => (
              <Link
                key={d.title}
                href={d.href}
                className="group rounded-2xl bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgba(15,28,72,0.35)]"
              >
                <span className="flex size-12 items-center justify-center rounded-xl bg-navy text-white transition group-hover:bg-orange">
                  <Icon name={d.icon} className="size-6" />
                </span>
                <h3 className="mt-5 text-xl font-bold">{d.title}</h3>
                <p className="mt-3 text-[0.93rem] leading-relaxed text-ink/75">
                  {d.body}
                </p>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Leadership — honest placeholder rather than invented people */}
      <section className="bg-white py-16 sm:py-20">
        <Container size="narrow">
          <div className="rounded-2xl border border-dashed border-gray-line p-8 text-center sm:p-10">
            <p className="eyebrow text-orange">Leadership</p>
            <h2 className="mt-3 text-2xl leading-tight font-bold">
              This section is waiting on Jedrick.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[0.95rem] leading-relaxed text-ink/70">
              Leadership names, roles, credentials and photographs were not in
              the brief, and inventing them would be exactly the kind of thing
              this site is meant to be an alternative to. Send them over and
              they will go here, alongside NAICOM registration details.
            </p>
            <Link
              href="/contact"
              className="mt-7 inline-flex items-center gap-2 rounded-full border border-navy/25 px-6 py-3 text-[0.9rem] font-semibold text-navy transition hover:bg-navy hover:text-white"
            >
              Get in touch
              <Icon name="arrowRight" className="size-4" />
            </Link>
          </div>
        </Container>
      </section>

      <section className="bg-mist py-16 sm:py-20">
        <Container size="narrow">
          <div className="text-center">
            <h2 className="text-2xl leading-tight font-bold sm:text-3xl">
              The test is not what we say here.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[0.98rem] leading-relaxed text-ink/75">
              It is whether we explain your cover clearly and show up when you
              claim. Start with two minutes and see whether we are different.
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
                href="/success-stories"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-navy/25 px-6 py-3.5 text-[0.92rem] font-semibold text-navy transition hover:bg-navy hover:text-white"
              >
                Read our clients&rsquo; stories
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
