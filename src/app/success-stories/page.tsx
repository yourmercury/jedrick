import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Icon from "@/components/ui/Icon";
import Logo from "@/components/ui/Logo";
import { STORIES } from "@/content/stories";

export const metadata: Metadata = {
  title: "Success Stories",
  description:
    "Real clients, real exposures, real outcomes. What people were actually at risk of, what we did about it, and what changed.",
};

export default function SuccessStoriesPage() {
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
              Success Stories
            </p>
            <h1 className="mt-6 text-4xl leading-[1.08] font-bold !text-white sm:text-5xl">
              Built for real life, real protection.
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-white/75">
              Not testimonials about how pleasant we are to deal with. Accounts
              of what people were actually exposed to, what we did about it, and
              what changed as a result.
            </p>
          </div>
        </Container>
      </section>

      <section className="bg-white py-16 sm:py-24">
        <Container size="default">
          <div className="space-y-6">
            {STORIES.map((story) => (
              <Link
                key={story.slug}
                href={`/success-stories/${story.slug}`}
                className="group block rounded-2xl border border-gray-line/60 transition-all duration-300 hover:-translate-y-1 hover:border-navy/25 hover:shadow-[0_30px_60px_-30px_rgba(15,28,72,0.35)]"
              >
                <div className="flex flex-col gap-6 p-7 sm:flex-row sm:items-center sm:p-8">
                  <span className="flex size-14 shrink-0 items-center justify-center rounded-full bg-navy font-display text-xl font-bold text-white">
                    {story.name.charAt(0)}
                  </span>

                  <div className="min-w-0 flex-1">
                    <p className="flex flex-wrap items-center gap-3 text-[0.75rem] font-semibold tracking-wide uppercase">
                      <span className="text-orange">{story.line}</span>
                      <span className="text-ink/35">{story.segment}</span>
                    </p>
                    <h2 className="mt-2.5 text-xl leading-snug font-bold text-navy">
                      {story.name}
                    </h2>
                    <p className="mt-1 text-[0.85rem] text-ink/60">
                      {story.role} · {story.location}
                    </p>
                    <p className="mt-3 text-[0.95rem] leading-relaxed text-ink/75">
                      {story.summary}
                    </p>
                  </div>

                  <Icon
                    name="arrowRight"
                    className="hidden size-5 shrink-0 text-navy transition-transform group-hover:translate-x-1 sm:block"
                  />
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-14 rounded-2xl border border-gray-line/60 bg-mist p-8 text-center sm:p-10">
            <h2 className="text-2xl leading-tight font-bold sm:text-3xl">
              Your situation is probably not on this page.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[0.98rem] leading-relaxed text-ink/75">
              That is fine — no two are the same. Tell us yours and we will tell
              you honestly what you are exposed to.
            </p>
            <Link
              href="/risk-assessment"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-orange px-6 py-3.5 text-[0.92rem] font-semibold text-white transition hover:bg-orange-deep"
            >
              Take the 2-minute risk check
              <Icon name="arrowRight" className="size-4" />
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
