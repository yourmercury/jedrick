import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import Icon from "@/components/ui/Icon";
import Logo from "@/components/ui/Logo";
import ConsultationForm from "@/components/contact/ConsultationForm";
import { contact } from "@/lib/site";

export const metadata: Metadata = {
  title: "Book a Free Consultation",
  description:
    "A free consultation with a Jedrick broker, online or in person. Bring your questions, your current policies, or nothing at all.",
};

export default function ContactPage() {
  return (
    <>
      <section className="navy-field relative overflow-hidden">
        <div
          className="pointer-events-none absolute -right-28 -bottom-40 hidden opacity-[0.06] lg:block"
          aria-hidden="true"
        >
          <Logo variant="icon-mono" width={480} decorative />
        </div>

        <Container size="wide">
          <div className="relative max-w-2xl py-16 sm:py-24">
            <p className="eyebrow flex items-center gap-3 text-orange">
              <span className="inline-block h-px w-8 bg-orange" />
              Let&rsquo;s talk
            </p>
            <h1 className="mt-6 text-4xl leading-[1.08] font-bold !text-white sm:text-5xl">
              Let&rsquo;s kickstart your insurance journey together.
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-white/75">
              A free consultation, online or in person. Bring your questions,
              your current policies, or nothing at all — we will start wherever
              you are.
            </p>
          </div>
        </Container>
      </section>

      <section className="bg-white py-16 sm:py-24">
        <Container size="wide">
          <div className="grid gap-14 lg:grid-cols-[1.35fr_0.65fr] lg:gap-20">
            <ConsultationForm />

            <aside className="lg:pt-2">
              <div className="rounded-2xl border border-gray-line/60 bg-mist p-7 sm:p-8">
                <p className="eyebrow text-orange">Reach us anytime</p>

                <div className="mt-6 space-y-6">
                  <ContactRow icon="phone" label="Call / WhatsApp" hint={contact.hours}>
                    <a
                      href={contact.phoneHref}
                      className="font-display font-bold text-navy transition hover:text-orange"
                    >
                      {contact.phone}
                    </a>
                  </ContactRow>

                  <ContactRow icon="mail" label="Mail support">
                    <a
                      href={contact.emailHref}
                      className="font-display text-[0.95rem] font-bold break-all text-navy transition hover:text-orange"
                    >
                      {contact.email}
                    </a>
                  </ContactRow>

                  <ContactRow icon="pin" label="Office address">
                    <span className="text-[0.95rem] font-semibold text-navy">
                      {contact.address}
                    </span>
                  </ContactRow>
                </div>

                <a
                  href={contact.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 flex items-center justify-center gap-2 rounded-full bg-navy px-5 py-3 text-[0.9rem] font-semibold text-white transition hover:bg-navy-deep"
                >
                  <Icon name="chat" className="size-4" />
                  Chat on WhatsApp
                </a>
              </div>

              <div className="mt-6 rounded-2xl border border-gray-line/60 p-7 sm:p-8">
                <p className="eyebrow text-orange">Not ready to talk?</p>
                <p className="mt-4 text-[0.92rem] leading-relaxed text-ink/75">
                  Take the two-minute risk check first. It costs nothing, asks
                  no jargon, and gives you something concrete to bring to the
                  conversation.
                </p>
                <a
                  href="/risk-assessment"
                  className="mt-5 inline-flex items-center gap-2 text-[0.9rem] font-semibold text-navy underline decoration-orange decoration-2 underline-offset-4 transition hover:text-orange"
                >
                  Know Your Risk
                  <Icon name="arrowRight" className="size-4" />
                </a>
              </div>
            </aside>
          </div>
        </Container>
      </section>
    </>
  );
}

function ContactRow({
  icon,
  label,
  hint,
  children,
}: {
  icon: string;
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-4">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white text-orange ring-1 ring-gray-line/60">
        <Icon name={icon} className="size-5" />
      </span>
      <div className="min-w-0">
        <p className="text-[0.78rem] font-semibold tracking-wide text-ink/50 uppercase">
          {label}
        </p>
        <div className="mt-1">{children}</div>
        {hint && <p className="mt-1 text-[0.8rem] text-ink/55">{hint}</p>}
      </div>
    </div>
  );
}
