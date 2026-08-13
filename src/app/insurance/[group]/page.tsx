import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "@/components/ui/Container";
import Icon from "@/components/ui/Icon";
import Logo from "@/components/ui/Logo";
import { GROUPS, PRODUCTS_BY_GROUP, findGroup } from "@/content/insurance";

export function generateStaticParams() {
  return GROUPS.map((g) => ({ group: g.id }));
}

export async function generateMetadata({
  params,
}: PageProps<"/insurance/[group]">): Promise<Metadata> {
  const { group } = await params;
  const found = findGroup(group);
  if (!found) return { title: "Not found" };
  return { title: found.label, description: found.intro };
}

export default async function GroupPage({
  params,
}: PageProps<"/insurance/[group]">) {
  const { group } = await params;
  const found = findGroup(group);
  if (!found) notFound();

  const products = PRODUCTS_BY_GROUP(found.id);
  const others = GROUPS.filter((g) => g.id !== found.id);

  return (
    <>
      <section className="navy-field relative overflow-hidden">
        <div
          className="pointer-events-none absolute -right-28 -bottom-40 hidden opacity-[0.06] lg:block"
          aria-hidden="true"
        >
          <Logo variant="icon-mono" width={460} decorative />
        </div>

        <Container size="wide">
          <div className="relative max-w-2xl py-16 sm:py-24">
            <Link
              href="/insurance"
              className="inline-flex items-center gap-2 text-[0.85rem] font-semibold text-white/60 transition hover:text-orange"
            >
              <Icon name="arrowRight" className="size-4 rotate-180" />
              Insurance solutions
            </Link>

            <h1 className="mt-8 text-4xl leading-[1.08] font-bold !text-white sm:text-5xl">
              {found.label}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-white/75">
              {found.intro}
            </p>
          </div>
        </Container>
      </section>

      <section className="bg-white py-16 sm:py-24">
        <Container size="wide">
          <div className="grid gap-5 md:grid-cols-2">
            {products.map((product) => (
              <Link
                key={product.slug}
                href={`/insurance/${found.id}/${product.slug}`}
                className="group flex flex-col rounded-2xl border border-gray-line/60 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-navy/25 hover:shadow-[0_30px_60px_-30px_rgba(15,28,72,0.35)] sm:p-8"
              >
                <h2 className="text-xl leading-snug font-bold text-navy">
                  {product.name}
                </h2>
                <p className="mt-3 text-[0.93rem] leading-relaxed text-ink/70">
                  {product.summary}
                </p>

                <p className="mt-5 flex-1 border-l-2 border-orange pl-4 text-[0.9rem] leading-relaxed text-ink/75">
                  {product.problem}
                </p>

                <span className="mt-6 flex items-center gap-2 text-[0.85rem] font-semibold text-navy transition group-hover:text-orange">
                  What it covers, and what it does not
                  <Icon
                    name="arrowRight"
                    className="size-4 transition-transform group-hover:translate-x-1"
                  />
                </span>
              </Link>
            ))}
          </div>

          <div className="mt-14 flex flex-wrap items-center gap-3">
            <span className="text-[0.85rem] font-semibold text-ink/55">
              Also look at
            </span>
            {others.map((o) => (
              <Link
                key={o.id}
                href={`/insurance/${o.id}`}
                className="group flex items-center gap-2.5 rounded-full border border-gray-line/70 px-5 py-3 text-[0.9rem] font-medium text-ink transition hover:border-navy hover:bg-navy hover:text-white"
              >
                {o.label}
                <Icon
                  name="arrowRight"
                  className="size-3.5 -translate-x-1 text-orange opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100"
                />
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
