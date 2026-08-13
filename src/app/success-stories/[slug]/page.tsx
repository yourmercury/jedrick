import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "@/components/ui/Container";
import Icon from "@/components/ui/Icon";
import { STORIES, findStory } from "@/content/stories";

export function generateStaticParams() {
  return STORIES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/success-stories/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const story = findStory(slug);
  if (!story) return { title: "Story not found" };
  return {
    title: `${story.name} — ${story.line}`,
    description: story.summary,
  };
}

export default async function StoryPage({
  params,
}: PageProps<"/success-stories/[slug]">) {
  const { slug } = await params;
  const story = findStory(slug);
  if (!story) notFound();

  const others = STORIES.filter((s) => s.slug !== slug);

  return (
    <>
      <section className="navy-field">
        <Container size="narrow">
          <div className="py-14 sm:py-20">
            <Link
              href="/success-stories"
              className="inline-flex items-center gap-2 text-[0.85rem] font-semibold text-white/60 transition hover:text-orange"
            >
              <Icon name="arrowRight" className="size-4 rotate-180" />
              Success stories
            </Link>

            <p className="mt-8 flex flex-wrap items-center gap-3 text-[0.78rem] font-semibold tracking-wide uppercase">
              <span className="rounded-full bg-orange/20 px-3 py-1 text-orange">
                {story.line}
              </span>
              <span className="text-white/40">{story.segment}</span>
            </p>

            <h1 className="mt-5 text-3xl leading-[1.12] font-bold !text-white sm:text-[2.6rem]">
              {story.name}
            </h1>
            <p className="mt-3 text-[0.95rem] text-white/60">
              {story.role} · {story.location}
            </p>
          </div>
        </Container>
      </section>

      <article className="bg-white py-14 sm:py-20">
        <Container size="narrow">
          <Section title="The situation">
            <p>{story.situation}</p>
          </Section>

          <Section title="What they were actually exposed to">
            <p>{story.exposure}</p>
          </Section>

          <div className="mt-12">
            <h2 className="font-display text-2xl leading-snug font-bold text-navy">
              What we did
            </h2>
            <ol className="mt-6 space-y-3">
              {story.whatWeDid.map((step, i) => (
                <li key={step} className="flex items-start gap-4">
                  <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-navy text-[0.72rem] font-bold text-white">
                    {i + 1}
                  </span>
                  <span className="text-[1.02rem] leading-[1.7] text-ink/85">
                    {step}
                  </span>
                </li>
              ))}
            </ol>
          </div>

          <Section title="The outcome">
            <p>{story.outcome}</p>
          </Section>

          <aside className="mt-12 rounded-2xl border border-orange/30 bg-orange/[0.06] p-7">
            <p className="flex items-center gap-2.5 font-display text-[1.02rem] font-bold text-navy">
              <Icon name="umbrella" className="size-5 shrink-0 text-orange" />
              What this shows
            </p>
            <p className="mt-3 text-[0.98rem] leading-[1.7] text-ink/80">
              {story.lesson}
            </p>
          </aside>

          <div className="mt-14 rounded-2xl bg-mist p-7 sm:p-9">
            <h2 className="text-xl leading-snug font-bold text-navy sm:text-2xl">
              Recognise any of this?
            </h2>
            <p className="mt-4 text-[0.95rem] leading-relaxed text-ink/75">
              The two-minute risk check will tell you which of these exposures
              apply to you — or send us the policy you already hold and we will
              read it properly.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/risk-assessment"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-orange px-6 py-3.5 text-[0.92rem] font-semibold text-white transition hover:bg-orange-deep"
              >
                Know Your Risk
                <Icon name="arrowRight" className="size-4" />
              </Link>
              <Link
                href="/policy-review"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-navy/25 px-6 py-3.5 text-[0.92rem] font-semibold text-navy transition hover:bg-navy hover:text-white"
              >
                Free policy health check
              </Link>
            </div>
          </div>

          {others.length > 0 && (
            <div className="mt-14">
              <h2 className="eyebrow text-orange">More stories</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {others.map((o) => (
                  <Link
                    key={o.slug}
                    href={`/success-stories/${o.slug}`}
                    className="group rounded-2xl border border-gray-line/60 p-6 transition hover:border-navy/25 hover:bg-mist/50"
                  >
                    <p className="text-[0.75rem] font-semibold tracking-wide text-orange uppercase">
                      {o.line}
                    </p>
                    <h3 className="mt-2.5 text-[1.05rem] leading-snug font-bold text-navy">
                      {o.name}
                    </h3>
                    <p className="mt-2 text-[0.88rem] leading-snug text-ink/65">
                      {o.summary}
                    </p>
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

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-12 first:mt-0">
      <h2 className="font-display text-2xl leading-snug font-bold text-navy">
        {title}
      </h2>
      <div className="mt-4 text-[1.02rem] leading-[1.75] text-ink/85">
        {children}
      </div>
    </div>
  );
}
