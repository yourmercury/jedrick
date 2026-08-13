import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import { contact } from "@/lib/site";

export default function ConsultationCta() {
  return (
    <section className="bg-white pb-20 sm:pb-28">
      <Container size="wide">
        <div className="navy-field relative overflow-hidden rounded-3xl px-8 py-16 sm:px-14 sm:py-20">
          <div className="relative grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="eyebrow flex items-center gap-3 text-orange">
                <span className="inline-block h-px w-8 bg-orange" />
                Let&rsquo;s talk
              </p>
              <h2 className="mt-6 text-3xl leading-[1.12] font-bold !text-white sm:text-4xl md:text-[2.75rem]">
                Let&rsquo;s kickstart your insurance journey together.
              </h2>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-white/75">
                A free consultation, online or in person. Bring your questions,
                your current policies, or nothing at all — we will start
                wherever you are.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Button href="/contact" variant="primary" size="lg">
                  Book a free consultation
                  <Icon name="arrowRight" className="size-4" />
                </Button>
                <Button
                  href={contact.whatsappHref}
                  variant="ghost-light"
                  size="lg"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon name="chat" className="size-4" />
                  Chat on WhatsApp
                </Button>
              </div>
            </div>

            <div className="rounded-2xl border border-white/15 bg-white/[0.06] p-8 backdrop-blur-sm">
              <p className="eyebrow text-white/50">Reach us anytime</p>

              <div className="mt-6 space-y-5 text-white">
                <a
                  href={contact.phoneHref}
                  className="group flex items-start gap-4"
                >
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-orange/20 text-orange">
                    <Icon name="phone" className="size-5" />
                  </span>
                  <span>
                    <span className="block font-display font-bold transition group-hover:text-orange">
                      {contact.phone}
                    </span>
                    <span className="text-[0.8rem] text-white/55">
                      {contact.hours}
                    </span>
                  </span>
                </a>

                <a
                  href={contact.emailHref}
                  className="group flex items-start gap-4"
                >
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-orange/20 text-orange">
                    <Icon name="mail" className="size-5" />
                  </span>
                  <span>
                    <span className="block font-display text-[0.95rem] font-bold break-all transition group-hover:text-orange">
                      {contact.email}
                    </span>
                    <span className="text-[0.8rem] text-white/55">
                      Mail support
                    </span>
                  </span>
                </a>

                <div className="flex items-start gap-4">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-orange/20 text-orange">
                    <Icon name="pin" className="size-5" />
                  </span>
                  <span>
                    <span className="block text-[0.95rem] font-semibold">
                      {contact.address}
                    </span>
                    <span className="text-[0.8rem] text-white/55">
                      Office address
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
