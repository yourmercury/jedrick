import Link from "next/link";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Icon from "@/components/ui/Icon";
import { industries } from "@/lib/site";

export default function Industries() {
  return (
    <section className="bg-mist py-20 sm:py-28">
      <Container size="wide">
        <SectionHeading
          align="center"
          eyebrow="Industries We Serve"
          title="Your sector carries risks a generic policy will not answer."
          lead="A haulage fleet, a school and a fabrication yard fail in completely different ways. We place cover accordingly."
        />

        <div className="mt-14 flex flex-wrap justify-center gap-3">
          {industries.map((industry) => (
            <Link
              key={industry.href}
              href={industry.href}
              className="group flex items-center gap-2.5 rounded-full border border-gray-line/70 bg-white px-5 py-3 text-[0.92rem] font-medium text-ink transition hover:-translate-y-0.5 hover:border-navy hover:bg-navy hover:text-white"
            >
              {industry.label}
              <Icon
                name="arrowRight"
                className="size-3.5 -translate-x-1 text-orange opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100"
              />
            </Link>
          ))}
        </div>

        <p className="mt-10 text-center text-[0.9rem] text-ink/65">
          Not listed?{" "}
          <Link
            href="/contact"
            className="font-semibold text-navy underline decoration-orange decoration-2 underline-offset-4 hover:text-orange"
          >
            Tell us what you do
          </Link>{" "}
          — we build bespoke corporate risk programmes.
        </p>
      </Container>
    </section>
  );
}
