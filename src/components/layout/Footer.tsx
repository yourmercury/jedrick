import Link from "next/link";
import Container from "@/components/ui/Container";
import Logo from "@/components/ui/Logo";
import Icon from "@/components/ui/Icon";
import { contact, site, solutionGroups } from "@/lib/site";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy-ink text-white/70">
      <Container size="wide">
        <div className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo variant="stacked-navy" width={150} />
            <p className="mt-6 max-w-sm text-[0.95rem] leading-relaxed">
              {site.positioning}
            </p>

            <div className="mt-7 space-y-3 text-[0.9rem]">
              <p className="flex items-start gap-3">
                <Icon name="pin" className="mt-0.5 size-4 shrink-0 text-orange" />
                {contact.address}
              </p>
              <a
                href={contact.phoneHref}
                className="flex items-center gap-3 transition hover:text-white"
              >
                <Icon name="phone" className="size-4 shrink-0 text-orange" />
                {contact.phone}
              </a>
              <a
                href={contact.emailHref}
                className="flex items-center gap-3 transition hover:text-white"
              >
                <Icon name="mail" className="size-4 shrink-0 text-orange" />
                {contact.email}
              </a>
              <p className="flex items-center gap-3 text-white/50">
                <Icon name="clock" className="size-4 shrink-0 text-orange" />
                {contact.hours}
              </p>
            </div>
          </div>

          <FooterColumn
            title="Insurance"
            links={solutionGroups.map((g) => ({
              label: g.label,
              href: g.href,
            }))}
          />

          <FooterColumn
            title="Advice & Support"
            links={[
              { label: "Know Your Risk", href: "/risk-assessment" },
              { label: "Free Policy Health Check", href: "/policy-review" },
              { label: "Claims Support", href: "/claims" },
              { label: "Risk Advisory Hub", href: "/risk-advisory" },
              { label: "Industries We Serve", href: "/industries" },
            ]}
          />

          <FooterColumn
            title="Company"
            links={[
              { label: "About Us", href: "/about" },
              { label: "Success Stories", href: "/success-stories" },
              { label: "Learning Centre", href: "/learn" },
              { label: "Insurance Dictionary", href: "/learn/dictionary" },
              { label: "Contact", href: "/contact" },
            ]}
          />
        </div>

        {/* Regulatory clarity — reinforces the broker-not-insurer positioning */}
        <div className="border-t border-white/10 py-7">
          <p className="max-w-3xl text-[0.82rem] leading-relaxed text-white/45">
            {site.name} is an insurance broking firm. We provide advice, place
            and manage policies, and support clients through claims. We act in
            the interest of our clients rather than any single insurer.
          </p>
        </div>

        <div className="flex flex-col gap-4 border-t border-white/10 py-7 text-[0.82rem] sm:flex-row sm:items-center sm:justify-between">
          <p className="text-white/45">
            © {year} {site.name}. All rights reserved.
          </p>
          <p className="eyebrow text-orange">{site.tagline}</p>
        </div>
      </Container>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="eyebrow !text-white/90">{title}</h3>
      <ul className="mt-5 space-y-3 text-[0.9rem]">
        {links.map((l) => (
          <li key={l.href + l.label}>
            <Link href={l.href} className="transition hover:text-orange">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
