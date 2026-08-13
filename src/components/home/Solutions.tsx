import Link from "next/link";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Icon from "@/components/ui/Icon";
import { solutionGroups } from "@/lib/site";

export default function Solutions() {
  return (
    <section className="bg-mist py-20 sm:py-28">
      <Container size="wide">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Insurance Solutions"
            title="Whatever you need to protect, we can place it."
            lead="Eighteen classes of cover, arranged around what you are actually protecting rather than how insurers file it."
          />
          <Link
            href="/insurance"
            className="group flex shrink-0 items-center gap-2 text-[0.9rem] font-semibold text-navy transition hover:text-orange"
          >
            View all solutions
            <Icon
              name="arrowRight"
              className="size-4 transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {solutionGroups.map((group) => (
            <div
              key={group.id}
              className="flex flex-col rounded-2xl bg-white p-8 shadow-[0_20px_50px_-35px_rgba(15,28,72,0.4)]"
            >
              <h3 className="text-xl font-bold">{group.label}</h3>
              <p className="mt-3 text-[0.9rem] leading-relaxed text-ink/70">
                {group.intro}
              </p>

              <ul className="mt-7 flex-1 space-y-3 border-t border-gray-line/50 pt-7">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-[0.92rem] text-ink/85"
                  >
                    <Icon
                      name="check"
                      className="mt-0.5 size-4 shrink-0 text-orange"
                      strokeWidth={2.4}
                    />
                    {item}
                  </li>
                ))}
              </ul>

              <Link
                href={group.href}
                className="group mt-8 flex items-center justify-between rounded-xl bg-mist px-5 py-3.5 text-[0.88rem] font-semibold text-navy transition hover:bg-navy hover:text-white"
              >
                Explore {group.label}
                <Icon
                  name="arrowRight"
                  className="size-4 transition-transform group-hover:translate-x-1"
                />
              </Link>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
