import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";

const findings = [
  {
    label: "Gaps",
    body: "Risks you assume are covered but are not.",
    tone: "warn",
  },
  {
    label: "Overlaps",
    body: "Two policies paying for the same thing.",
    tone: "warn",
  },
  {
    label: "Under-insurance",
    body: "Sums insured that will not rebuild or replace.",
    tone: "warn",
  },
  {
    label: "Fair value",
    body: "Whether your premium matches the market.",
    tone: "good",
  },
];

export default function PolicyCheck() {
  return (
    <section className="bg-white py-20 sm:py-28">
      <Container size="wide">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Free Policy Health Check"
              title="Already insured? Let us read the fine print for you."
              lead="Send us the policy you already hold. We will tell you plainly what it covers, what it quietly does not, and where you are paying twice. No cost, no obligation to move your business."
            />

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button href="/policy-review" variant="navy" size="lg">
                <Icon name="upload" className="size-4" />
                Upload my policy
              </Button>
              <Button href="/claims" variant="outline" size="lg">
                How claims support works
              </Button>
            </div>

            <p className="mt-6 flex items-start gap-2.5 text-[0.85rem] text-ink/60">
              <Icon name="shield" className="mt-0.5 size-4 shrink-0 text-orange" />
              Your documents are handled confidentially and reviewed by a
              licensed broker — never shared with insurers without your say-so.
            </p>
          </div>

          {/* Illustrative "review output" — sets the expectation of what the
              client receives back, which is what makes the offer credible. */}
          <div className="relative">
            <div className="rounded-3xl border border-gray-line/50 bg-mist p-8 sm:p-10">
              <div className="flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-xl bg-navy text-white">
                  <Icon name="search" className="size-5" />
                </span>
                <div>
                  <p className="font-display font-bold text-navy">
                    Your policy review
                  </p>
                  <p className="text-[0.8rem] text-ink/60">
                    Returned within 2 working days
                  </p>
                </div>
              </div>

              <ul className="mt-8 space-y-3">
                {findings.map((f) => (
                  <li
                    key={f.label}
                    className="flex items-start gap-4 rounded-xl bg-white p-4"
                  >
                    <span
                      className={`mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full ${
                        f.tone === "warn"
                          ? "bg-orange/15 text-orange"
                          : "bg-blue/10 text-blue"
                      }`}
                    >
                      <Icon
                        name={f.tone === "warn" ? "search" : "check"}
                        className="size-3.5"
                        strokeWidth={2.2}
                      />
                    </span>
                    <div>
                      <p className="text-[0.92rem] font-semibold text-navy">
                        {f.label}
                      </p>
                      <p className="text-[0.85rem] text-ink/70">{f.body}</p>
                    </div>
                  </li>
                ))}
              </ul>

              <p className="mt-7 border-t border-gray-line/60 pt-6 text-[0.85rem] leading-relaxed text-ink/70">
                Rarely offered by brokers in this market — because it takes work
                and it sometimes ends with us telling you to keep the cover you
                already have.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
