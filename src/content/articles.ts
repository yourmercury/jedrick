/**
 * Learning Centre content.
 *
 * CONTENT MODEL DECISION
 * ----------------------
 * Articles are structured data rather than MDX or a headless CMS. Reasons:
 *   - it is typed, so a malformed article fails the build rather than the page
 *   - no build-time config or third-party service to keep running
 *   - the block list is deliberately CMS-shaped, so moving to Sanity/Contentful
 *     later means writing an adapter, not rewriting the templates
 *
 * The trade-off is honest: only a developer can add an article today. If
 * Jedrick's team needs to publish without one, that is the trigger to move to a
 * CMS — not a reason to have started with one.
 */

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "list"; items: string[]; ordered?: boolean }
  | { type: "callout"; title: string; text: string }
  | { type: "quote"; text: string };

export type Category = "explainer" | "guide" | "checklist" | "business";

export const CATEGORIES: { id: Category; label: string; blurb: string }[] = [
  {
    id: "explainer",
    label: "Explainers",
    blurb: "What something actually means, in plain language.",
  },
  {
    id: "guide",
    label: "Guides",
    blurb: "Step-by-step help for a decision or a situation.",
  },
  {
    id: "checklist",
    label: "Checklists",
    blurb: "Things to check before you sign, renew or claim.",
  },
  {
    id: "business",
    label: "For business",
    blurb: "Cover, risk and continuity for organisations.",
  },
];

export type Article = {
  slug: string;
  title: string;
  category: Category;
  /** Shown on cards and used as the meta description. */
  summary: string;
  minutes: number;
  /** ISO date. Kept explicit so ordering never depends on file order. */
  published: string;
  body: Block[];
  related?: string[];
};

export const ARTICLES: Article[] = [
  {
    slug: "third-party-vs-comprehensive",
    title: "Third-party vs comprehensive: what you are actually buying",
    category: "explainer",
    summary:
      "The difference is not a tier of service. It is whether your own vehicle is covered at all — and most first-time buyers do not realise which one they have bought.",
    minutes: 5,
    published: "2026-02-10",
    body: [
      {
        type: "p",
        text: "Almost every driver in Nigeria is sold motor insurance in the same two words: third-party or comprehensive. They sound like a basic option and a premium option, the way an economy seat differs from business class. They are not. They cover fundamentally different things, and the gap between them is where most motor disappointment lives.",
      },
      { type: "h2", text: "What third-party actually covers" },
      {
        type: "p",
        text: "Third-party cover pays for harm you cause to other people — their vehicle, their property, their injuries. It is the legal minimum to drive on a Nigerian road, and it exists to protect everyone else from you.",
      },
      {
        type: "p",
        text: "It pays nothing at all towards your own vehicle. Not if you hit a wall, not if a tree falls on it, not if it is stolen, not if it burns. If you are the only one who suffered, the policy does not respond.",
      },
      {
        type: "callout",
        title: "The sentence worth remembering",
        text: "Third-party cover protects your victims. Comprehensive cover protects your victims and you.",
      },
      { type: "h2", text: "What comprehensive adds" },
      {
        type: "p",
        text: "Comprehensive includes everything third-party does, then adds damage to your own vehicle — accident, fire, theft, and usually malicious damage. It is the only version that responds when nobody else is involved, which is the majority of everyday incidents.",
      },
      {
        type: "list",
        items: [
          "Reversing into a pillar in a car park",
          "Skidding into a ditch during heavy rain",
          "Your car being stolen from outside your house",
          "Flood damage while parked",
          "A tree or signboard falling onto the bonnet",
        ],
      },
      {
        type: "p",
        text: "Under third-party cover, every one of those costs you the full repair or replacement.",
      },
      { type: "h2", text: "How to decide" },
      {
        type: "p",
        text: "The honest test is not what you can afford in premium. It is what would happen if the car were written off tomorrow and nobody else was involved.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Could you replace the vehicle out of savings without serious disruption? If yes, third-party may be a rational choice.",
          "Is the car financed, or needed to earn a living? Comprehensive is close to essential — losing it stops your income as well as your transport.",
          "Is the vehicle old and low in value? At some point comprehensive stops being economic, because the maximum payout falls towards the premium.",
        ],
      },
      {
        type: "callout",
        title: "The middle option nobody mentions",
        text: "Third-party fire and theft sits between the two. It adds cover for your vehicle being stolen or burnt, but not for accident damage. For an older car in a high-theft area it is often the sensible compromise — and it is rarely offered unless you ask.",
      },
      { type: "h2", text: "What to check before you sign" },
      {
        type: "list",
        items: [
          "The sum insured — comprehensive pays the vehicle's value, so if that figure is wrong the cover is wrong",
          "The excess, which is the first part of every claim you pay yourself",
          "Whether the policy restricts you to particular repairers",
          "Whether flood is included, which matters more in Lagos than almost anywhere",
        ],
      },
      {
        type: "quote",
        text: "If a broker cannot tell you in one sentence what your policy will not pay for, you do not yet know what you have bought.",
      },
    ],
    related: ["nine-questions-before-you-renew", "what-under-insurance-costs"],
  },
  {
    slug: "first-hour-after-a-fire",
    title: "What to do in the first hour after a fire at your premises",
    category: "guide",
    summary:
      "Most claims that go badly go badly on the first day, before an insurer has been involved at all. Here is what protects the claim while you are dealing with everything else.",
    minutes: 6,
    published: "2026-02-24",
    body: [
      {
        type: "p",
        text: "Nobody reads this article on the day they need it. That is exactly why it is worth reading now: the decisions that decide how a fire claim goes are made in the first hour, by people who are shocked, busy, and not thinking about insurance.",
      },
      {
        type: "callout",
        title: "Before anything else",
        text: "People first. No policy condition anywhere outranks getting someone out of a burning building or into an ambulance. No insurer has ever declined a claim because you called the fire service before you called your broker.",
      },
      { type: "h2", text: "1. Get everyone out, and account for them" },
      {
        type: "p",
        text: "Evacuate, then count. Do not re-enter for documents, stock or equipment. Nothing in the building is worth more than the person who would go back in for it, and insurance exists precisely so that nobody has to.",
      },
      { type: "h2", text: "2. Call the fire service, and get the report" },
      {
        type: "p",
        text: "Beyond putting out the fire, the fire service produces a report. Most commercial property policies expect one, and obtaining it weeks later is far harder than obtaining it on the day. Ask how to get a copy before they leave.",
      },
      { type: "h2", text: "3. Do not start clearing up" },
      {
        type: "p",
        text: "This is the instruction people find hardest, because clearing up feels like taking control. But insurers frequently want to inspect the scene as found, and a loss adjuster arriving at a swept, cleared site has lost the evidence that would have supported your figures.",
      },
      {
        type: "p",
        text: "You are allowed to make the site safe. You are allowed to prevent further damage — in fact you are usually required to. What you should not do is dispose of damaged property before it has been seen.",
      },
      { type: "h2", text: "4. Photograph and video everything" },
      {
        type: "list",
        items: [
          "Wide shots of each affected room or area before anything is moved",
          "Close-ups of damaged stock, equipment and fittings",
          "The point where the fire appears to have started, if it is visible and safe",
          "Any undamaged areas too — proving what survived is as useful as proving what did not",
        ],
      },
      {
        type: "p",
        text: "This is the single most common regret we hear. Photographs cost nothing and take minutes, and they cannot be recreated once the site is cleared.",
      },
      { type: "h2", text: "5. Prevent further damage" },
      {
        type: "p",
        text: "Board up openings, cover what is exposed to rain, move undamaged stock somewhere dry. Nearly every policy places a duty on you to take reasonable steps to limit the loss, and the reasonable costs of doing so are usually recoverable. Keep the receipts.",
      },
      { type: "h2", text: "6. Notify us the same day" },
      {
        type: "p",
        text: "You do not need the paperwork, the figures, or even certainty that it is claimable. Late notification is one of the most common reasons a genuinely valid claim gets refused, and it is entirely avoidable.",
      },
      {
        type: "callout",
        title: "What happens next",
        text: "For anything sizeable the insurer appoints a loss adjuster. They investigate on the insurer's behalf, not yours. That is the point at which having a broker stops being a convenience and starts being the difference in what you are paid.",
      },
      { type: "h2", text: "Then: the claim you might not know you have" },
      {
        type: "p",
        text: "The property claim rebuilds the building and replaces the contents. It does nothing about the months of trading you lose while that happens. That is business interruption cover, and if you hold it, it is claimed alongside — start recording lost trading days and cancelled orders from day one.",
      },
    ],
    related: ["business-interruption-explained", "what-under-insurance-costs"],
  },
  {
    slug: "nine-questions-before-you-renew",
    title: "Nine questions to ask before you renew any policy",
    category: "checklist",
    summary:
      "Renewal is the one moment each year when everything is negotiable. Most people let it pass by doing nothing.",
    minutes: 4,
    published: "2026-03-09",
    body: [
      {
        type: "p",
        text: "A renewal notice is designed to be easy to ignore. Pay the same as last year, plus a bit, and nothing changes. That convenience is exactly why renewal is where cover quietly drifts out of line with reality — and it is the only moment each year when everything is up for negotiation.",
      },
      { type: "h2", text: "The nine questions" },
      {
        type: "list",
        ordered: true,
        items: [
          "Is the sum insured still right? Rebuild and replacement costs move every year. The figure you set three years ago is almost certainly too low now.",
          "What has actually changed in my life or business? New vehicle, new premises, new staff, new equipment, new line of work — each one can change what is covered.",
          "What is the excess, and has it moved? Insurers sometimes raise the excess rather than the premium. It looks like a better deal and is not.",
          "What is specifically excluded? Ask for the exclusions to be read to you in plain language. This is where declined claims come from.",
          "Has the wording changed since last year? Renewal terms are not always identical to expiring terms, and the changes are rarely highlighted.",
          "Am I paying for cover I no longer need? Sold the vehicle, closed the branch, stopped the activity — the premium does not remove itself.",
          "Am I insured twice for anything? Overlapping policies do not pay twice. You simply pay two premiums for one recovery.",
          "What would this policy not have paid for, in the last claim I made or nearly made? A concrete test beats a theoretical one.",
          "Has the market been checked, or was this just rolled over? If nobody re-quoted, you have no idea whether the price is fair.",
        ],
      },
      {
        type: "callout",
        title: "The one that catches most businesses",
        text: "Question one. Under-insurance is not just a problem on a total loss — the average clause scales down every claim, including small ones, by the same proportion you were under-insured. Insure a ₦100m building for ₦60m and a ₦5m claim pays ₦3m.",
      },
      { type: "h2", text: "When to start" },
      {
        type: "p",
        text: "Four to six weeks before renewal. Earlier than that and figures go stale; later and there is no time to market the risk properly, which means you take whatever is in front of you.",
      },
      {
        type: "quote",
        text: "A renewal you did not question is a renewal the insurer priced without competition.",
      },
    ],
    related: ["what-under-insurance-costs", "third-party-vs-comprehensive"],
  },
  {
    slug: "what-under-insurance-costs",
    title: "Under-insurance: the clause that quietly halves your claim",
    category: "explainer",
    summary:
      "The average clause is the most expensive sentence in most policies, and almost nobody has it explained to them before they sign.",
    minutes: 5,
    published: "2026-03-23",
    body: [
      {
        type: "p",
        text: "Ask most people what happens if they insure a building for less than it is worth, and they will tell you the insurer simply pays up to that limit. It is a reasonable assumption. It is also wrong, and the difference costs Nigerian businesses a great deal of money every year.",
      },
      { type: "h2", text: "How the average clause works" },
      {
        type: "p",
        text: "If you insure something for less than its true value, the insurer treats you as having carried part of the risk yourself — and reduces every claim by that same proportion. Not just total losses. Every claim.",
      },
      {
        type: "callout",
        title: "The arithmetic",
        text: "Your factory is worth ₦100m. You insured it for ₦50m. A fire causes ₦10m of damage. You are 50% under-insured, so the insurer pays ₦5m. You cover the other ₦5m, on a loss well within your sum insured.",
      },
      {
        type: "p",
        text: "That last point is what surprises people. The claim was nowhere near the ₦50m limit, so it feels like it should have been paid in full. The average clause does not work that way.",
      },
      { type: "h2", text: "Why it happens to careful people" },
      {
        type: "list",
        items: [
          "Sums insured are set once and then rolled over at each renewal without review",
          "Rebuild cost is confused with market value — they are different numbers, and for a building the rebuild figure is often higher",
          "Business growth outpaces the policy: more stock, more equipment, another floor",
          "For business interruption, the insurance definition of gross profit is not the one in your accounts, and using the accounting figure under-insures you",
        ],
      },
      { type: "h2", text: "What to do about it" },
      {
        type: "list",
        ordered: true,
        items: [
          "Get a proper reinstatement valuation for buildings, rather than estimating",
          "Review sums insured at every renewal, not every few years",
          "Take an inventory of equipment and stock at least annually",
          "For business interruption, have the gross profit figure calculated on the insurance definition",
          "Ask your broker directly: if I claimed today, would average apply?",
        ],
      },
      {
        type: "p",
        text: "That last question is the fastest diagnostic there is. Any broker should be able to answer it immediately, and if they cannot, that itself tells you something.",
      },
    ],
    related: ["nine-questions-before-you-renew", "business-interruption-explained"],
  },
  {
    slug: "business-interruption-explained",
    title: "Business interruption: the cover most SMEs forget",
    category: "business",
    summary:
      "Your fire policy rebuilds the building. It does nothing about the six months of trading you lose while that happens.",
    minutes: 6,
    published: "2026-04-07",
    body: [
      {
        type: "p",
        text: "There is a particular kind of business failure that happens after a successful insurance claim. The building is rebuilt, the equipment replaced, everything restored — and the business still does not survive, because it had no income for eight months and its customers went elsewhere.",
      },
      {
        type: "p",
        text: "Property insurance restores your assets. Business interruption cover restores your trading. They are different policies, and holding the first without the second is one of the most common gaps we find.",
      },
      { type: "h2", text: "What it actually pays" },
      {
        type: "list",
        items: [
          "The profit you would have earned during the shutdown",
          "Fixed costs that continue regardless — rent, salaries, loan repayments",
          "Reasonable extra costs of keeping trading, such as temporary premises",
          "In some cases, losses caused when a key supplier or customer is hit instead of you",
        ],
      },
      { type: "h2", text: "The two numbers that decide everything" },
      {
        type: "p",
        text: "Business interruption cover fails in practice for two reasons, and both are decided at the point of purchase rather than the point of claim.",
      },
      {
        type: "callout",
        title: "1. The indemnity period",
        text: "How long the policy keeps paying. Businesses routinely choose 12 months because it sounds like a long time. Then rebuilding takes 18 months — planning, contractors, imported equipment — and the last six months are theirs to absorb. For anything involving construction or imported plant, 24 months is often the realistic figure.",
      },
      {
        type: "callout",
        title: "2. The gross profit figure",
        text: "The insurance definition of gross profit is not your accountant's. It is turnover less specified variable costs, and it is usually the higher number. Insure on the accounting figure and you are under-insured before anything has even happened.",
      },
      { type: "h2", text: "Who needs it most" },
      {
        type: "p",
        text: "Any business where a physical event stops the revenue. That is most of them, but it is acute for manufacturers, restaurants and hotels, schools, clinics, warehousing and logistics, and any retailer with a single location.",
      },
      {
        type: "p",
        text: "A consultancy whose staff can work from anywhere is genuinely less exposed. A restaurant with one kitchen is entirely exposed.",
      },
      { type: "h2", text: "Making a claim work" },
      {
        type: "list",
        ordered: true,
        items: [
          "Notify alongside the property claim — they are assessed together",
          "Start a dated record of lost trading days, cancelled orders and turned-away customers on day one",
          "Keep receipts for everything spent to keep trading; much of it is recoverable",
          "Keep management accounts current, because the claim is calculated from them",
        ],
      },
      {
        type: "quote",
        text: "The fire policy pays to rebuild what you had. Business interruption cover pays for the business to still be there when it reopens.",
      },
    ],
    related: ["first-hour-after-a-fire", "what-under-insurance-costs"],
  },
  {
    slug: "how-much-life-cover",
    title: "How much life cover does a Nigerian family actually need?",
    category: "guide",
    summary:
      "A straightforward way to arrive at a figure, without the sales pitch and without pretending there is one right answer.",
    minutes: 5,
    published: "2026-04-21",
    body: [
      {
        type: "p",
        text: "Life insurance is sold with round numbers — ten million, twenty million — because round numbers are easy to quote. They have nothing to do with what your household would actually need. Here is a way to reach a figure you can defend.",
      },
      {
        type: "callout",
        title: "What life cover is really for",
        text: "Not for you. For whoever depends on your income. If nobody does, you may not need it at all — and a broker who tells you otherwise is selling rather than advising.",
      },
      { type: "h2", text: "Work out the four numbers" },
      {
        type: "list",
        ordered: true,
        items: [
          "Income replacement: what your household needs each year, multiplied by the number of years it would take them to become self-supporting. For young children, that can be fifteen years or more.",
          "Debts that would not disappear: mortgage, car finance, business loans you personally guaranteed.",
          "One-off costs: funeral expenses, and any immediate family obligations.",
          "Education: school and university fees still to come, at today's cost.",
        ],
      },
      {
        type: "p",
        text: "Add them together, then subtract what already exists — savings, existing cover, any group life your employer provides. What is left is the gap.",
      },
      { type: "h2", text: "A worked example" },
      {
        type: "p",
        text: "A household needs ₦4m a year and has two children aged 6 and 9. Say ten years of income replacement: ₦40m. Outstanding car finance of ₦3m. Remaining school fees estimated at ₦12m. Total need: ₦55m. Employer group life covers ₦9m and savings cover ₦4m, so the gap is around ₦42m.",
      },
      {
        type: "p",
        text: "That figure is arguable — you might use eight years, or fifteen — but it is reasoned, which a round ₦20m never was.",
      },
      { type: "h2", text: "Term or whole life?" },
      {
        type: "p",
        text: "Term life covers a fixed number of years and builds no savings, which makes it dramatically cheaper for the same sum insured. Whole life lasts your lifetime and accumulates a cash value, at considerably higher cost.",
      },
      {
        type: "p",
        text: "For most families with dependent children, term cover sized to the real gap does the actual job — protecting people during the years they cannot protect themselves. Mixing protection with savings usually means buying less protection than you needed.",
      },
      {
        type: "callout",
        title: "Do not rely only on employer cover",
        text: "Group life through your employer is genuinely valuable and usually cheap. But it ends when the job does, which is often exactly when money is tightest, and the sum insured is set by the employer rather than by your family's needs.",
      },
      { type: "h2", text: "Practical points" },
      {
        type: "list",
        items: [
          "Name your beneficiary, and update the nomination after any marriage, birth or death",
          "Tell someone the policy exists — unclaimed policies are more common than they should be",
          "Answer health questions completely; non-disclosure is the main reason life claims are refused",
          "Review the figure every few years, or whenever your circumstances change materially",
        ],
      },
    ],
    related: ["third-party-vs-comprehensive", "nine-questions-before-you-renew"],
  },
  {
    slug: "sme-insurance-starting-point",
    title: "A small business owner's starting point: what to insure first",
    category: "business",
    summary:
      "You cannot buy everything at once. Here is a defensible order of priority when the budget is finite.",
    minutes: 5,
    published: "2026-05-05",
    body: [
      {
        type: "p",
        text: "Most advice on business insurance lists every available policy and leaves you to work out which matter. That is not useful when you have a real budget and a business to run. This is an order of priority.",
      },
      {
        type: "callout",
        title: "The organising question",
        text: "Not what could go wrong, but what would end the business if it went wrong. Insure catastrophe first and inconvenience later.",
      },
      { type: "h2", text: "First: the things that would close you" },
      {
        type: "list",
        ordered: true,
        items: [
          "Property and fire cover on your premises, stock and equipment — the single event most likely to stop trading entirely.",
          "Business interruption, sized to a realistic rebuilding period. The most under-bought cover in the market.",
          "Liability cover if the public, customers or contractors come onto your site, or if your work could cause injury or loss.",
        ],
      },
      { type: "h2", text: "Second: the things tied to how you actually operate" },
      {
        type: "list",
        ordered: true,
        items: [
          "Motor or fleet cover, if vehicles are part of the business.",
          "Goods-in-transit or marine, if you move stock. Your property policy stops at the warehouse door.",
          "Machinery breakdown, if one piece of equipment failing would halt production. A fire policy never covers breakdown.",
          "Professional indemnity, if you sell advice, design or expertise.",
        ],
      },
      { type: "h2", text: "Third: your people" },
      {
        type: "p",
        text: "Group life, health cover and personal accident. These come third not because staff matter least, but because the first two categories protect the business's ability to employ anyone at all. Once stable, employee cover is also one of the most cost-effective ways to retain good people.",
      },
      { type: "h2", text: "The mistakes we see most" },
      {
        type: "list",
        items: [
          "Insuring the building and forgetting the stock inside it",
          "Sums insured set at start-up and never revisited while the business tripled",
          "Assuming a landlord's policy covers your contents — it does not",
          "Buying the cheapest quote without comparing what is excluded",
          "No business interruption cover at all, which is the most expensive omission on this list",
        ],
      },
      {
        type: "quote",
        text: "A cheaper premium for cover that will not respond is not a saving. It is a deferred loss.",
      },
    ],
    related: ["business-interruption-explained", "what-under-insurance-costs"],
  },
  {
    slug: "why-claims-get-declined",
    title: "The six reasons claims actually get declined",
    category: "explainer",
    summary:
      "Very few declined claims are declined for fraud. Most are declined for things the policyholder could have avoided without knowing anything about insurance.",
    minutes: 5,
    published: "2026-05-19",
    body: [
      {
        type: "p",
        text: "People assume claims are refused because insurers look for excuses. Sometimes that is true. Far more often a claim is declined for one of a small number of reasons, most of which are avoidable and none of which require insurance knowledge to avoid.",
      },
      { type: "h2", text: "1. Non-disclosure" },
      {
        type: "p",
        text: "Something material was not mentioned when the policy was arranged. Almost always accidental — a previous claim forgotten, a change of use not reported, a modification not declared. The consequence is severe: the insurer can void the policy entirely, as though it never existed.",
      },
      {
        type: "callout",
        title: "How to avoid it",
        text: "When in doubt, disclose. Nothing has ever been made worse by telling an insurer more than they asked for.",
      },
      { type: "h2", text: "2. Late notification" },
      {
        type: "p",
        text: "Most policies require prompt notification. People delay because they are dealing with the emergency, or want to gather paperwork first, or are unsure whether it is claimable. Notify anyway — you can always add detail later.",
      },
      { type: "h2", text: "3. An exclusion nobody read out" },
      {
        type: "p",
        text: "Wear and tear, gradual deterioration, flood where it was never added, use of the vehicle for hire when the policy says private. The cover was never there. Reading the exclusions before you buy is the only defence.",
      },
      { type: "h2", text: "4. A breached condition" },
      {
        type: "list",
        items: [
          "The alarm required by the policy was not set",
          "Fire extinguishers were not maintained as specified",
          "The vehicle was driven by someone not named on the policy",
          "Liability was admitted at the scene",
        ],
      },
      { type: "h2", text: "5. Under-insurance" },
      {
        type: "p",
        text: "Not a refusal exactly, but it feels like one. The average clause reduces the payout in proportion to how under-insured you were, and it applies to every claim, not just total losses.",
      },
      { type: "h2", text: "6. Insufficient evidence" },
      {
        type: "p",
        text: "The loss happened, but it cannot be proved to the standard the insurer requires. No photographs, no police report, no receipts, the site cleared before inspection. This is the most frustrating category, because the claim was genuine.",
      },
      { type: "h2", text: "If your claim has been declined" },
      {
        type: "p",
        text: "A declinature is not necessarily the end. Insurers make mistakes, apply exclusions too broadly, and sometimes rely on a condition that was not actually breached. A properly argued challenge — with the wording read carefully and the reasoning tested — reverses more decisions than most people expect.",
      },
      {
        type: "quote",
        text: "We will look at a declined claim even if we did not arrange the policy, and tell you honestly whether it is worth fighting.",
      },
    ],
    related: ["first-hour-after-a-fire", "nine-questions-before-you-renew"],
  },
];

export const ARTICLES_BY_DATE = [...ARTICLES].sort((a, b) =>
  b.published.localeCompare(a.published),
);

export function findArticle(slug: string) {
  return ARTICLES.find((a) => a.slug === slug);
}

export function categoryLabel(id: Category) {
  return CATEGORIES.find((c) => c.id === id)?.label ?? id;
}
