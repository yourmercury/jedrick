import Link from "next/link";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Icon from "@/components/ui/Icon";

/**
 * Placeholder entries. These become real MDX/CMS records when the Learning
 * Centre is built — the shape here matches what an article record needs.
 */
const featured = [
  {
    kind: "Explainer",
    title: "Third-party vs comprehensive: what you are actually buying",
    minutes: 4,
    href: "/learn",
  },
  {
    kind: "Guide",
    title: "What to do in the first hour after a fire at your premises",
    minutes: 6,
    href: "/learn",
  },
  {
    kind: "Checklist",
    title: "Nine questions to ask before you renew any business policy",
    minutes: 3,
    href: "/learn",
  },
];

export default function LearningCentre() {
  return (
    <section className="bg-white py-20 sm:py-28">
      <Container size="wide">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div>
            <SectionHeading
              eyebrow="Learning Centre"
              title="Insurance, explained like a person would explain it."
              lead="Not a blog. A working education hub — articles, videos, guides and a dictionary that turns policy language back into English."
            />

            <div className="mt-9 space-y-3">
              <Link
                href="/learn/dictionary"
                className="group flex items-center justify-between gap-4 rounded-xl border border-gray-line/60 px-5 py-4 transition hover:border-navy hover:bg-mist"
              >
                <span className="flex items-center gap-3">
                  <Icon name="book" className="size-5 text-orange" />
                  <span className="text-[0.95rem] font-semibold text-navy">
                    Insurance Dictionary
                  </span>
                </span>
                <Icon
                  name="arrowRight"
                  className="size-4 text-navy transition-transform group-hover:translate-x-1"
                />
              </Link>
              <Link
                href="/resources"
                className="group flex items-center justify-between gap-4 rounded-xl border border-gray-line/60 px-5 py-4 transition hover:border-navy hover:bg-mist"
              >
                <span className="flex items-center gap-3">
                  <Icon name="upload" className="size-5 rotate-180 text-orange" />
                  <span className="text-[0.95rem] font-semibold text-navy">
                    Downloads, checklists & tools
                  </span>
                </span>
                <Icon
                  name="arrowRight"
                  className="size-4 text-navy transition-transform group-hover:translate-x-1"
                />
              </Link>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-1">
            {featured.map((a) => (
              <Link
                key={a.title}
                href={a.href}
                className="group flex items-start justify-between gap-6 rounded-2xl bg-mist p-7 transition hover:bg-navy"
              >
                <div>
                  <p className="flex items-center gap-3 text-[0.75rem] font-semibold tracking-wide text-orange uppercase">
                    {a.kind}
                    <span className="text-ink/40 group-hover:text-white/40">
                      {a.minutes} min read
                    </span>
                  </p>
                  <h3 className="mt-3 text-lg leading-snug font-bold transition group-hover:!text-white">
                    {a.title}
                  </h3>
                </div>
                <Icon
                  name="arrowRight"
                  className="mt-1 size-5 shrink-0 text-navy transition-all group-hover:translate-x-1 group-hover:text-orange"
                />
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
