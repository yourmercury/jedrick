import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Icon from "@/components/ui/Icon";
import Logo from "@/components/ui/Logo";
import ArticleBrowser from "@/components/learn/ArticleBrowser";
import { ARTICLES } from "@/content/articles";
import { DICTIONARY } from "@/content/dictionary";

export const metadata: Metadata = {
  title: "Learning Centre",
  description:
    "Insurance explained in everyday language. Guides, explainers and checklists from a broker who thinks you should understand what you are buying.",
};

export default function LearnPage() {
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
              Learning Centre
            </p>
            <h1 className="mt-6 text-4xl leading-[1.08] font-bold !text-white sm:text-5xl">
              Insurance, explained like a person would explain it.
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-white/75">
              Not a blog. A working education hub — because the thing we actually
              sell is understanding, and you cannot sell someone understanding by
              keeping it behind a phone call.
            </p>
          </div>
        </Container>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <Container size="wide">
          <ArticleBrowser />
        </Container>
      </section>

      <section className="bg-mist py-16 sm:py-20">
        <Container size="wide">
          <div className="grid gap-5 md:grid-cols-2">
            <Link
              href="/learn/dictionary"
              className="group flex items-start justify-between gap-6 rounded-2xl bg-white p-8 transition hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgba(15,28,72,0.35)]"
            >
              <div>
                <span className="flex size-12 items-center justify-center rounded-xl bg-navy text-white transition group-hover:bg-orange">
                  <Icon name="book" className="size-6" />
                </span>
                <h2 className="mt-5 text-xl font-bold text-navy">
                  Insurance Dictionary
                </h2>
                <p className="mt-3 text-[0.93rem] leading-relaxed text-ink/70">
                  {DICTIONARY.length} terms in everyday language, each with a
                  real example. Searchable.
                </p>
              </div>
              <Icon
                name="arrowRight"
                className="mt-1 size-5 shrink-0 text-navy transition-transform group-hover:translate-x-1"
              />
            </Link>

            <Link
              href="/resources"
              className="group flex items-start justify-between gap-6 rounded-2xl bg-white p-8 transition hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgba(15,28,72,0.35)]"
            >
              <div>
                <span className="flex size-12 items-center justify-center rounded-xl bg-navy text-white transition group-hover:bg-orange">
                  <Icon name="chart" className="size-6" />
                </span>
                <h2 className="mt-5 text-xl font-bold text-navy">
                  Resources & calculators
                </h2>
                <p className="mt-3 text-[0.93rem] leading-relaxed text-ink/70">
                  Checklists, and tools that work out the two numbers people get
                  wrong most: sum insured and business interruption.
                </p>
              </div>
              <Icon
                name="arrowRight"
                className="mt-1 size-5 shrink-0 text-navy transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>

          <p className="mt-10 text-center text-[0.9rem] text-ink/60">
            {ARTICLES.length} articles and counting.{" "}
            <Link
              href="/contact"
              className="font-semibold text-navy underline decoration-orange decoration-2 underline-offset-4 hover:text-orange"
            >
              Tell us what to write next
            </Link>
            .
          </p>
        </Container>
      </section>
    </>
  );
}
