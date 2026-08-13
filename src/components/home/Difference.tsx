import Link from "next/link";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Icon from "@/components/ui/Icon";
import { differentiators } from "@/lib/site";

export default function Difference() {
  return (
    <section className="bg-white py-20 sm:py-28">
      <Container size="wide">
        <SectionHeading
          eyebrow="Why Jedrick"
          title="Most insurance websites sell products. We sell understanding."
          lead="We do not sell policies. We make sure you end up with the one that actually suits you — and that you know why."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {differentiators.map((d, i) => (
            <Link
              key={d.title}
              href={d.href}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-line/50 bg-mist/60 p-8 transition-all duration-300 hover:-translate-y-1 hover:border-navy/20 hover:bg-white hover:shadow-[0_30px_60px_-30px_rgba(15,28,72,0.35)]"
            >
              <span
                className="absolute top-6 right-7 font-display text-6xl font-bold text-navy/[0.05] transition group-hover:text-orange/15"
                aria-hidden="true"
              >
                0{i + 1}
              </span>

              <span className="flex size-12 items-center justify-center rounded-xl bg-navy text-white transition group-hover:bg-orange">
                <Icon name={d.icon} className="size-6" />
              </span>

              <h3 className="mt-6 text-xl font-bold">{d.title}</h3>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-ink/75">
                {d.body}
              </p>

              <span className="mt-6 flex items-center gap-2 text-[0.85rem] font-semibold text-navy transition group-hover:text-orange">
                Learn more
                <Icon
                  name="arrowRight"
                  className="size-4 transition-transform group-hover:translate-x-1"
                />
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
