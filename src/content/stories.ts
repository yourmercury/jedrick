/**
 * Success stories.
 *
 * The three cases come from Jedrick's own company profile. They are written up
 * as situation → exposure → what we did → outcome, because that is the shape
 * that teaches a reader something about their own position.
 *
 * IMPORTANT: these are the personas supplied by the client. Before publication
 * they should be confirmed as real and cleared with the individuals named, or
 * relabelled as illustrative. Figures marked `illustrative` are not client
 * data — they exist to make the mechanics concrete and must be replaced with
 * real numbers or removed.
 */

export type Story = {
  slug: string;
  name: string;
  role: string;
  location: string;
  line: string;
  segment: "Individual" | "SME" | "Corporate";
  /** Card summary. */
  summary: string;
  situation: string;
  exposure: string;
  whatWeDid: string[];
  outcome: string;
  lesson: string;
  illustrative: boolean;
};

export const STORIES: Story[] = [
  {
    slug: "chinedu-okafor-fleet",
    name: "Chinedu Okafor",
    role: "Fleet Manager, logistics company",
    location: "Ojota, Lagos",
    line: "Motor & Fleet",
    segment: "SME",
    summary:
      "Claims that dragged on for months, and a broker who stopped answering once the policy was sold.",
    situation:
      "Chinedu runs a delivery operation with multiple vehicles on Lagos roads every day. In that business, accidents and breakdowns are not unusual events — they are a normal operating cost. What was not normal was how long each one took to resolve.",
    exposure:
      "Every vehicle off the road was revenue not being earned and a customer not being served. Claims were processed slowly and without explanation, and the broker who had placed the cover became unreachable once the commission was paid. Chinedu was effectively negotiating with insurers himself, without knowing what the policy actually entitled him to.",
    whatWeDid: [
      "Reviewed the existing fleet policy line by line, and identified where cover was thinner than he had been told",
      "Re-marketed the fleet to several insurers rather than renewing on autopilot",
      "Negotiated terms that reflected the fleet's real usage and claims record",
      "Took over claims handling directly, so incidents were reported and pursued by us rather than by his team",
    ],
    outcome:
      "Jedrick became his active advocate rather than a name on a certificate. Claims are now notified through us, documented properly at the outset and chased on his behalf — so his people stay focused on running the fleet instead of arguing with insurers.",
    lesson:
      "For a fleet, the quality of claims handling matters far more than the headline premium. A slightly cheaper policy that takes three months to pay is not cheaper.",
    illustrative: false,
  },
  {
    slug: "kemi-adeyemi-first-car",
    name: "Kemi Adeyemi",
    role: "Young professional, first-time car owner",
    location: "Ibadan",
    line: "Motor Insurance",
    segment: "Individual",
    summary:
      "Buying motor insurance for the first time, with no idea what the two options actually meant.",
    situation:
      "Kemi bought her first car and knew she needed insurance. What she did not know was what she was choosing between. Every quote offered third-party or comprehensive, and nobody explained the difference in terms that meant anything to her.",
    exposure:
      "The real risk was not being uninsured — it was buying the cheapest option without understanding it. Third-party cover would have left her funding every repair to her own car herself, including the everyday incidents most likely to happen to a new driver. She would only have discovered this after her first accident.",
    whatWeDid: [
      "Explained third-party, third-party fire and theft, and comprehensive in plain terms, using scenarios rather than definitions",
      "Walked through what each option would and would not pay in situations she was likely to face",
      "Set the sum insured against the vehicle's actual value rather than a round number",
      "Recommended cover matched to her budget and how she actually uses the car",
    ],
    outcome:
      "Kemi chose her cover understanding exactly what it does — including what it will not do. She knows what her excess is, what is excluded, and who to call before anything happens rather than after.",
    lesson:
      "Most first-time buyers are not under-insured because they were careless. They are under-insured because nobody explained the choice to them in words they use.",
    illustrative: false,
  },
  {
    slug: "williams-family-life-health",
    name: "Olufemi & Sade Williams",
    role: "Growing family",
    location: "Magodo, Lagos",
    line: "Life & Health",
    segment: "Individual",
    summary:
      "Conflicting advice from three providers, and fine print that made a decision impossible.",
    situation:
      "With children and a mortgage, the Williamses knew they needed life and health cover. They approached several providers and came away with three different recommendations, three different sets of exclusions, and less clarity than when they started.",
    exposure:
      "The danger was paralysis — going another year with nothing in place because no option could be evaluated. Underneath that sat a second risk: buying a product that mixed protection with savings, and ending up with less actual cover than the family needed.",
    whatWeDid: [
      "Separated the two questions — protection for the family, and long-term savings — so each could be judged on its own",
      "Worked out the cover actually needed from income, debts and remaining school fees, rather than starting from a round number",
      "Read the exclusions and waiting periods in each proposal and translated them into plain language",
      "Aligned the recommendation with their goals and confirmed they understood what was not covered",
    ],
    outcome:
      "They hold life and health cover they can explain to each other, sized to what their family would actually need. Beneficiary nominations are current, and they know which hospitals their plan covers before they need one.",
    lesson:
      "When protection and savings are sold as one product, the protection is usually what gets squeezed. Price the two jobs separately and the decision becomes obvious.",
    illustrative: false,
  },
];

export function findStory(slug: string) {
  return STORIES.find((s) => s.slug === slug);
}
