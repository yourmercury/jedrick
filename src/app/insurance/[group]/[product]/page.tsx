import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "@/components/ui/Container";
import Icon from "@/components/ui/Icon";
import {
  PRODUCTS,
  PRODUCTS_BY_GROUP,
  findGroup,
  findProduct,
} from "@/content/insurance";
import { findTerm } from "@/content/dictionary";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ group: p.group, product: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/insurance/[group]/[product]">): Promise<Metadata> {
  const { product } = await params;
  const found = findProduct(product);
  if (!found) return { title: "Not found" };
  return { title: found.name, description: found.summary };
}

export default async function ProductPage({
  params,
}: PageProps<"/insurance/[group]/[product]">) {
  const { group, product } = await params;
  const found = findProduct(product);
  // Guards against the same product being reachable under the wrong group.
  if (!found || found.group !== group) notFound();

  const groupInfo = findGroup(found.group);
  const siblings = PRODUCTS_BY_GROUP(found.group)
    .filter((p) => p.slug !== found.slug)
    .slice(0, 3);

  const terms = (found.terms ?? [])
    .map((id) => findTerm(id))
    .filter((t) => t !== undefined);

  return (
    <>
      <section className="navy-field">
        <Container size="wide">
          <div className="max-w-3xl py-16 sm:py-20">
            <Link
              href={`/insurance/${found.group}`}
              className="inline-flex items-center gap-2 text-[0.85rem] font-semibold text-white/60 transition hover:text-orange"
            >
              <Icon name="arrowRight" className="size-4 rotate-180" />
              {groupInfo?.label}
            </Link>

            <h1 className="mt-8 text-4xl leading-[1.08] font-bold !text-white sm:text-5xl">
              {found.name}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-white/75">
              {found.summary}
            </p>
          </div>
        </Container>
      </section>

      {/* The problem it exists to solve */}
      <section className="bg-white py-14 sm:py-20">
        <Container size="default">
          <div className="rounded-2xl border-l-2 border-orange bg-mist/60 p-7 sm:p-9">
            <p className="eyebrow text-orange">Why this exists</p>
            <p className="mt-4 text-[1.05rem] leading-[1.7] text-ink/85">
              {found.problem}
            </p>
          </div>

          {/* Covered / not covered, given equal visual weight on purpose. */}
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-gray-line/60 p-7 sm:p-8">
              <p className="flex items-center gap-2.5 font-display text-lg font-bold text-navy">
                <span className="flex size-8 items-center justify-center rounded-lg bg-blue/10 text-blue">
                  <Icon name="check" className="size-4" strokeWidth={2.6} />
                </span>
                What it covers
              </p>
              <ul className="mt-5 space-y-3">
                {found.covers.map((c) => (
                  <li key={c} className="flex items-start gap-3">
                    <Icon
                      name="check"
                      className="mt-1 size-4 shrink-0 text-blue"
                      strokeWidth={2.6}
                    />
                    <span className="text-[0.95rem] leading-relaxed text-ink/80">
                      {c}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-orange/30 bg-orange/[0.04] p-7 sm:p-8">
              <p className="flex items-center gap-2.5 font-display text-lg font-bold text-navy">
                <span className="flex size-8 items-center justify-center rounded-lg bg-orange/15 text-orange">
                  <Icon name="search" className="size-4" />
                </span>
                What it does not
              </p>
              <ul className="mt-5 space-y-3">
                {found.notCovered.map((c) => (
                  <li key={c} className="flex items-start gap-3">
                    <span
                      className="mt-2 size-1.5 shrink-0 rounded-full bg-orange"
                      aria-hidden="true"
                    />
                    <span className="text-[0.95rem] leading-relaxed text-ink/80">
                      {c}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 border-t border-orange/20 pt-5 text-[0.85rem] leading-relaxed text-ink/60">
                Exclusions vary between insurers and wordings. These are the ones
                we see most often — yours should be read individually.
              </p>
            </div>
          </div>

          {/* Who it suits */}
          <div className="mt-12">
            <h2 className="font-display text-2xl leading-snug font-bold text-navy">
              Who it is usually right for
            </h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-3">
              {found.forWhom.map((w) => (
                <li
                  key={w}
                  className="rounded-xl bg-mist p-5 text-[0.92rem] leading-relaxed text-ink/80"
                >
                  {w}
                </li>
              ))}
            </ul>
          </div>

          {/* Broker's note */}
          <aside className="mt-12 rounded-2xl bg-navy-ink p-7 sm:p-9">
            <p className="eyebrow text-orange">What we would tell you</p>
            <p className="mt-4 text-[1.05rem] leading-[1.7] text-white/85">
              {found.advice}
            </p>
          </aside>

          {terms.length > 0 && (
            <div className="mt-12">
              <h2 className="eyebrow text-orange">Terms worth knowing</h2>
              <div className="mt-5 flex flex-wrap gap-2">
                {terms.map((t) => (
                  <Link
                    key={t.id}
                    href={`/learn/dictionary#${t.id}`}
                    className="rounded-full bg-mist px-4 py-2 text-[0.85rem] font-medium text-navy transition hover:bg-navy hover:text-white"
                  >
                    {t.term}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="mt-14 rounded-2xl border border-gray-line/60 bg-mist p-7 sm:p-9">
            <h2 className="text-xl leading-snug font-bold text-navy sm:text-2xl">
              We do not sell this policy to you.
            </h2>
            <p className="mt-4 text-[0.98rem] leading-relaxed text-ink/75">
              We compare it across insurers, tell you whether you actually need
              it, and stand with you if you ever have to claim on it. Start with
              a conversation, not a quote.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-orange px-6 py-3.5 text-[0.92rem] font-semibold text-white transition hover:bg-orange-deep"
              >
                Book a free consultation
                <Icon name="arrowRight" className="size-4" />
              </Link>
              <Link
                href="/policy-review"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-navy/25 px-6 py-3.5 text-[0.92rem] font-semibold text-navy transition hover:bg-navy hover:text-white"
              >
                Already have it? Have us check it
              </Link>
            </div>
          </div>

          {siblings.length > 0 && (
            <div className="mt-14">
              <h2 className="eyebrow text-orange">Often taken alongside</h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-3">
                {siblings.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/insurance/${s.group}/${s.slug}`}
                    className="group rounded-2xl border border-gray-line/60 p-5 transition hover:border-navy/25 hover:bg-mist/50"
                  >
                    <h3 className="text-[0.98rem] leading-snug font-bold text-navy">
                      {s.name}
                    </h3>
                    <span className="mt-3 flex items-center gap-2 text-[0.82rem] font-semibold text-navy transition group-hover:text-orange">
                      Read
                      <Icon
                        name="arrowRight"
                        className="size-3.5 transition-transform group-hover:translate-x-1"
                      />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
