import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import Icon from "@/components/ui/Icon";
import Logo from "@/components/ui/Logo";
import DictionaryBrowser from "@/components/learn/DictionaryBrowser";
import { DICTIONARY } from "@/content/dictionary";

export const metadata: Metadata = {
  title: "Insurance Dictionary",
  description:
    "Every insurance term that has ever confused you, explained in everyday language with a real example. Searchable, and free.",
};

export default function DictionaryPage() {
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
          <div className="relative max-w-2xl py-16 sm:py-20">
            <p className="eyebrow flex items-center gap-3 text-orange">
              <span className="inline-block h-px w-8 bg-orange" />
              Insurance Dictionary
            </p>
            <h1 className="mt-6 text-4xl leading-[1.08] font-bold !text-white sm:text-5xl">
              Every term that has ever confused you.
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-white/75">
              {DICTIONARY.length} words insurers use, written the way we would
              explain them to a friend — each with a real example, because
              definitions alone are what made them confusing in the first place.
            </p>

            <p className="mt-8 flex items-start gap-2.5 text-[0.88rem] leading-relaxed text-white/55">
              <Icon name="book" className="mt-0.5 size-4 shrink-0 text-orange" />
              If a broker cannot explain a term to you without reading from the
              policy, that is a problem with the broker, not with you.
            </p>
          </div>
        </Container>
      </section>

      <section className="bg-white pb-20 sm:pb-28">
        <Container size="default">
          <DictionaryBrowser />
        </Container>
      </section>

      <section className="bg-mist py-16 sm:py-20">
        <Container size="narrow">
          <div className="text-center">
            <h2 className="text-2xl leading-tight font-bold sm:text-3xl">
              Still not clear? That is what we are for.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[0.98rem] leading-relaxed text-ink/75">
              Send us the sentence you are stuck on — from your own policy, or
              from a quote someone has given you. We will tell you what it
              actually means for you.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-orange px-6 py-3.5 text-[0.92rem] font-semibold text-white transition hover:bg-orange-deep"
              >
                Ask us
                <Icon name="arrowRight" className="size-4" />
              </a>
              <a
                href="/policy-review"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-navy/25 px-6 py-3.5 text-[0.92rem] font-semibold text-navy transition hover:bg-navy hover:text-white"
              >
                Have us read the whole policy
              </a>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
