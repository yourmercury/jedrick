import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "@/components/ui/Container";
import Icon from "@/components/ui/Icon";
import Prose from "@/components/learn/Prose";
import { ARTICLES, categoryLabel, findArticle } from "@/content/articles";

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/learn/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const article = findArticle(slug);
  if (!article) return { title: "Article not found" };
  return {
    title: article.title,
    description: article.summary,
    openGraph: {
      title: article.title,
      description: article.summary,
      type: "article",
      publishedTime: article.published,
    },
  };
}

export default async function ArticlePage({
  params,
}: PageProps<"/learn/[slug]">) {
  const { slug } = await params;
  const article = findArticle(slug);
  if (!article) notFound();

  const related = (article.related ?? [])
    .map((s) => findArticle(s))
    .filter((a) => a !== undefined);

  const published = new Date(article.published).toLocaleDateString("en-NG", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <>
      <section className="navy-field">
        <Container size="narrow">
          <div className="py-14 sm:py-20">
            <Link
              href="/learn"
              className="inline-flex items-center gap-2 text-[0.85rem] font-semibold text-white/60 transition hover:text-orange"
            >
              <Icon name="arrowRight" className="size-4 rotate-180" />
              Learning Centre
            </Link>

            <p className="mt-8 flex flex-wrap items-center gap-3 text-[0.78rem] font-semibold tracking-wide uppercase">
              <span className="rounded-full bg-orange/20 px-3 py-1 text-orange">
                {categoryLabel(article.category)}
              </span>
              <span className="text-white/40">{article.minutes} min read</span>
            </p>

            <h1 className="mt-5 text-3xl leading-[1.12] font-bold !text-white sm:text-[2.6rem]">
              {article.title}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-white/75">
              {article.summary}
            </p>
            <p className="mt-8 text-[0.82rem] text-white/45">
              Published {published}
            </p>
          </div>
        </Container>
      </section>

      <article className="bg-white py-14 sm:py-20">
        <Container size="narrow">
          <Prose blocks={article.body} />

          {/* Every article ends in the same place: a real person, not a quote form. */}
          <div className="mt-16 rounded-2xl border border-gray-line/60 bg-mist p-7 sm:p-9">
            <p className="eyebrow text-orange">Still your situation?</p>
            <h2 className="mt-3 text-xl leading-snug font-bold text-navy sm:text-2xl">
              General guidance only takes you so far.
            </h2>
            <p className="mt-4 text-[0.95rem] leading-relaxed text-ink/75">
              This article cannot know your circumstances. A free consultation
              can — bring your questions, your current policy, or nothing at all.
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
                href="/risk-assessment"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-navy/25 px-6 py-3.5 text-[0.92rem] font-semibold text-navy transition hover:bg-navy hover:text-white"
              >
                Take the 2-minute risk check
              </Link>
            </div>
          </div>

          {related.length > 0 && (
            <div className="mt-14">
              <h2 className="eyebrow text-orange">Read next</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/learn/${r.slug}`}
                    className="group rounded-2xl border border-gray-line/60 p-6 transition hover:border-navy/25 hover:bg-mist/50"
                  >
                    <p className="text-[0.75rem] font-semibold tracking-wide text-orange uppercase">
                      {categoryLabel(r.category)}
                    </p>
                    <h3 className="mt-2.5 text-[1.05rem] leading-snug font-bold text-navy">
                      {r.title}
                    </h3>
                    <span className="mt-4 flex items-center gap-2 text-[0.84rem] font-semibold text-navy transition group-hover:text-orange">
                      Read it
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
      </article>
    </>
  );
}
