import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";

const steps = [
  {
    icon: "chat",
    title: "Tell us what happened",
    body: "One call or message. We take it from there — no forms you do not understand.",
  },
  {
    icon: "book",
    title: "We build the claim",
    body: "We gather the documentation, present it properly, and speak the insurer's language for you.",
  },
  {
    icon: "handshake",
    title: "We push for settlement",
    body: "We chase, escalate and challenge on your behalf until you get a fair, timely outcome.",
  },
];

export default function Claims() {
  return (
    <section className="bg-navy-ink py-20 sm:py-28">
      <Container size="wide">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div>
            <p className="eyebrow flex items-center gap-3 text-orange">
              <span className="inline-block h-px w-8 bg-orange" />
              Claims Advocacy
            </p>
            <h2 className="mt-6 text-3xl leading-[1.12] font-bold !text-white sm:text-4xl md:text-[2.75rem]">
              The moment most brokers go quiet is the moment we show up.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-white/70">
              A policy is only worth what it pays when something goes wrong. We
              treat the claim as the product — not the paperwork that came
              before it.
            </p>

            <Button
              href="/claims"
              variant="primary"
              size="lg"
              className="mt-9"
            >
              Start a claim
              <Icon name="arrowRight" className="size-4" />
            </Button>
          </div>

          <ol className="space-y-4">
            {steps.map((s, i) => (
              <li
                key={s.title}
                className="flex gap-5 rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition hover:border-orange/40 hover:bg-white/[0.07] sm:p-7"
              >
                <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-orange text-white">
                  <Icon name={s.icon} className="size-6" />
                </span>
                <div>
                  <p className="eyebrow text-white/40">Step 0{i + 1}</p>
                  <h3 className="mt-1.5 text-lg font-bold !text-white">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-[0.93rem] leading-relaxed text-white/65">
                    {s.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
