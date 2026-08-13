import Link from "next/link";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Icon from "@/components/ui/Icon";
import { successStories } from "@/lib/site";

export default function Stories() {
  return (
    <section className="bg-white py-20 sm:py-28">
      <Container size="wide">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Success Stories"
            title="Built for real life, real protection."
            lead="Not testimonials about how nice we are — accounts of what people were actually exposed to, and what changed."
          />
          <Link
            href="/success-stories"
            className="group flex shrink-0 items-center gap-2 text-[0.9rem] font-semibold text-navy transition hover:text-orange"
          >
            Read all stories
            <Icon
              name="arrowRight"
              className="size-4 transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {successStories.map((s) => (
            <article
              key={s.name}
              className="flex flex-col overflow-hidden rounded-2xl border border-gray-line/50 transition hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgba(15,28,72,0.35)]"
            >
              <div className="flex items-center gap-4 bg-mist p-6">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-navy font-display text-lg font-bold text-white">
                  {s.name
                    .split(" ")[0]
                    .charAt(0)
                    .toUpperCase()}
                </span>
                <div className="min-w-0">
                  <p className="font-display leading-snug font-bold text-navy">
                    {s.name}
                  </p>
                  <p className="text-[0.8rem] leading-snug text-ink/65">
                    {s.role} · {s.location}
                  </p>
                </div>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <span className="eyebrow self-start rounded-full bg-orange/10 px-3 py-1 text-orange">
                  {s.line}
                </span>

                <p className="mt-5 text-[0.9rem] leading-relaxed text-ink/70">
                  {s.problem}
                </p>

                <div className="mt-5 flex-1 border-l-2 border-orange pl-4">
                  <p className="text-[0.9rem] leading-relaxed font-medium text-navy">
                    {s.outcome}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
