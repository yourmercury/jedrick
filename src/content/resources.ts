/**
 * Resources — checklists and downloads.
 *
 * Checklists are held as data rather than PDFs so they are readable on the page,
 * searchable, and printable without a download step. A "download" that is really
 * a gated email capture is exactly the pattern the brief asked us to avoid.
 */

export type Checklist = {
  slug: string;
  title: string;
  audience: "Individual" | "Business" | "Everyone";
  summary: string;
  items: string[];
};

export const CHECKLISTS: Checklist[] = [
  {
    slug: "before-you-renew",
    title: "Before you renew any policy",
    audience: "Everyone",
    summary:
      "Nine questions that turn a rubber-stamp renewal into a real review. Start four to six weeks before the renewal date.",
    items: [
      "Is the sum insured still right for today's rebuild or replacement cost?",
      "What has changed since last year — vehicle, premises, staff, equipment, activity?",
      "What is the excess, and has the insurer quietly increased it?",
      "What exactly is excluded? Ask for it in plain language.",
      "Has the policy wording changed since the expiring version?",
      "Am I paying for anything I no longer own or do?",
      "Am I insured twice for the same thing anywhere?",
      "What would this policy not have paid for in my last claim?",
      "Has the market actually been re-quoted, or was this rolled over?",
    ],
  },
  {
    slug: "first-24-hours-after-a-loss",
    title: "The first 24 hours after a loss",
    audience: "Everyone",
    summary:
      "What to do on the day, in order. Most claims that go badly go badly before an insurer is ever involved.",
    items: [
      "People first — injuries before paperwork, always.",
      "Make the site safe and stop the loss getting worse.",
      "Photograph and video everything before you move or clear anything.",
      "Report to the police (theft, motor) or fire service (fire) and ask how to get the report.",
      "Do not admit liability to anyone, in speech or in writing.",
      "Keep receipts for anything you spend to limit the damage.",
      "Notify us the same day, even without the paperwork.",
      "Do not dispose of damaged property until it has been inspected.",
    ],
  },
  {
    slug: "new-business-cover",
    title: "Starting a business: what to insure first",
    audience: "Business",
    summary:
      "A defensible order of priority when the budget is finite. Insure catastrophe before inconvenience.",
    items: [
      "Property and fire cover on premises, stock and equipment.",
      "Business interruption, with an indemnity period matched to a realistic rebuild.",
      "Public liability, if anyone comes onto your site or your work could injure someone.",
      "Motor or fleet cover for any vehicle used in the business.",
      "Goods-in-transit or marine, if you move stock at all.",
      "Machinery breakdown, if one machine failing would halt production.",
      "Professional indemnity, if you sell advice, design or expertise.",
      "Group life and health cover for staff, once the above are in place.",
    ],
  },
  {
    slug: "buying-motor-cover",
    title: "Buying motor insurance without regret",
    audience: "Individual",
    summary:
      "The questions to settle before you pay, especially if this is your first vehicle.",
    items: [
      "Third-party, third-party fire and theft, or comprehensive — and do you know the difference?",
      "Is the sum insured the vehicle's actual current value?",
      "What is the excess on an own-damage claim?",
      "Is flood damage included? In Lagos this matters more than almost anything.",
      "Are you restricted to particular repairers?",
      "Who else is allowed to drive the vehicle under the policy?",
      "Is the vehicle used for business, hire or ride-hailing? Say so — this is a material fact.",
      "What is the no-claims discount worth, and at what claim size is it worth not claiming?",
    ],
  },
  {
    slug: "before-you-claim",
    title: "Before you submit a claim",
    audience: "Everyone",
    summary:
      "A short pre-flight check that prevents the most common reasons for delay and refusal.",
    items: [
      "Have you notified us as early as possible, even without full details?",
      "Do you have photographs taken before anything was cleared or repaired?",
      "Do you have the official report — police, fire service, or carrier?",
      "Have you listed what was lost or damaged, with values?",
      "Have you found receipts, invoices or valuations where they exist?",
      "Have you avoided admitting liability to anyone?",
      "Have you kept damaged items rather than disposing of them?",
      "Is your claim worth more than the excess plus the no-claims discount you would lose?",
    ],
  },
  {
    slug: "employee-cover-review",
    title: "Reviewing cover for your staff",
    audience: "Business",
    summary:
      "For employers arranging or reviewing group benefits.",
    items: [
      "Is the group life sum insured a realistic multiple of salary?",
      "Does the health plan's hospital list actually cover where your staff live and work?",
      "What are the waiting periods, and do staff know about them?",
      "Are pre-existing conditions excluded, and for how long?",
      "Is personal accident cover included for staff in higher-risk roles?",
      "Are new joiners and leavers being reported to the insurer promptly?",
      "Do your staff know the benefits exist and how to use them?",
      "Is anyone whose absence would stall the business covered as a key person?",
    ],
  },
];

export function findChecklist(slug: string) {
  return CHECKLISTS.find((c) => c.slug === slug);
}
