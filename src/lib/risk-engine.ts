/**
 * The "Know Your Risk" assessment — options and scoring.
 *
 * Structure follows "Jedrick Insurance Brokers – Risk Assessment" exactly:
 * Section 1 (about you) → 2 (what matters) → 3 (biggest concern) →
 * 4 (current protection) → 5 (risk snapshot) → 6 (consultation) → 7 (contact).
 *
 * The snapshot is deliberately rules-based rather than generated. Jedrick is
 * giving regulated advice, so every line a visitor sees has to be traceable to
 * a rule someone at the firm can read, audit and defend.
 */

export type Segment = "individual" | "sme" | "corporate";

export const SEGMENTS: { id: Segment; label: string; hint: string }[] = [
  {
    id: "individual",
    label: "Individual / Family",
    hint: "Protecting yourself, your household and the people who depend on you.",
  },
  {
    id: "sme",
    label: "SME / Small Business",
    hint: "A growing business with premises, people, stock or vehicles.",
  },
  {
    id: "corporate",
    label: "Corporate / Enterprise",
    hint: "A larger organisation with complex or multi-site exposure.",
  },
];

/** Section 2 — branches by segment, per the source document. */
export const PROTECT_OPTIONS: Record<
  Segment,
  { id: string; label: string }[]
> = {
  individual: [
    { id: "health", label: "My health" },
    { id: "income", label: "My income" },
    { id: "home", label: "My home" },
    { id: "vehicle", label: "My vehicle" },
    { id: "family", label: "My family" },
    { id: "travel", label: "My travels" },
    { id: "future", label: "My future" },
    { id: "other", label: "Something else" },
  ],
  sme: [
    { id: "people", label: "People / Employees" },
    { id: "premises", label: "Property / Premises" },
    { id: "equipment", label: "Equipment" },
    { id: "stock", label: "Stock / Goods" },
    { id: "fleet", label: "Vehicles" },
    { id: "continuity", label: "Income / Business continuity" },
    { id: "liability", label: "Customers / Third parties" },
    { id: "other", label: "Something else" },
  ],
  corporate: [
    { id: "people", label: "People / Employees" },
    { id: "premises", label: "Property / Premises" },
    { id: "equipment", label: "Equipment" },
    { id: "stock", label: "Stock / Goods" },
    { id: "fleet", label: "Vehicles" },
    { id: "continuity", label: "Income / Business continuity" },
    { id: "liability", label: "Customers / Third parties" },
    { id: "other", label: "Something else" },
  ],
};

/** Section 3 — asked of everyone, exactly as listed in the document. */
export const CONCERN_OPTIONS = [
  { id: "income-loss", label: "Loss of income" },
  { id: "property-damage", label: "Damage to property" },
  { id: "asset-loss", label: "Loss of assets" },
  { id: "medical", label: "Medical expenses" },
  { id: "interruption", label: "Business interruption" },
  { id: "liability", label: "Legal liability" },
  { id: "key-person", label: "Loss of a key person" },
  { id: "other", label: "Something else" },
  { id: "unsure", label: "I'm not sure" },
] as const;

/** Section 4 */
export const COVER_OPTIONS = [
  { id: "have", label: "I already have insurance" },
  { id: "some", label: "I have some insurance" },
  { id: "none", label: "I don't have insurance" },
  { id: "unsure", label: "I'm not sure what I currently have" },
] as const;

/** Section 6 */
export const DISCUSS_OPTIONS = [
  { id: "personal", label: "My personal / family risks" },
  { id: "business", label: "My business risks" },
  { id: "existing", label: "My existing insurance" },
  { id: "guidance", label: "I'm not sure — I need guidance" },
] as const;

export const MEETING_OPTIONS = [
  { id: "online", label: "Online" },
  { id: "physical", label: "Physical meeting" },
  { id: "either", label: "Either is fine" },
] as const;

export const CONTACT_CHANNELS = [
  { id: "whatsapp", label: "WhatsApp" },
  { id: "phone", label: "Phone call" },
  { id: "email", label: "Email" },
] as const;

/* -------------------------------------------------------------------------- */
/* Risk areas                                                                  */
/* -------------------------------------------------------------------------- */

export type RiskArea = {
  id: string;
  title: string;
  /** Written in second person, plain language — no policy jargon. */
  body: string;
  /** Classes of cover Jedrick would look at. Never presented as a quote. */
  cover: string[];
  segments: Segment[];
};

const AREAS: RiskArea[] = [
  {
    id: "health-costs",
    title: "Medical costs you would have to fund yourself",
    body: "A single hospital admission can cost more than most households keep available. Without cover, that bill competes with rent, school fees and everything else at the worst possible moment.",
    cover: ["Health Insurance", "Personal Accident Insurance"],
    segments: ["individual"],
  },
  {
    id: "income-continuity",
    title: "Your income stops, but your bills do not",
    body: "If illness or injury kept you from working for six months, the money would have to come from somewhere. This is the exposure people most often assume is covered when it is not.",
    cover: ["Life Insurance", "Personal Accident Insurance"],
    segments: ["individual"],
  },
  {
    id: "dependents",
    title: "The people who depend on you",
    body: "If something happened to you, your family would face the loss and the finances at the same time. Cover here is less about you and more about what they are left standing on.",
    cover: ["Life Insurance", "Group Life Insurance"],
    segments: ["individual"],
  },
  {
    id: "home-property",
    title: "Rebuilding or replacing your home and its contents",
    body: "Fire, flood and burglary rarely take one thing. The question is whether your sum insured would actually rebuild and refurnish at today's prices, not what you paid years ago.",
    cover: ["Property Insurance", "Fire & Special Perils Insurance"],
    segments: ["individual"],
  },
  {
    id: "motor",
    title: "Your vehicle — and the damage it could do to others",
    body: "Third-party cover satisfies the law. It does not repair your own vehicle, and it will not stretch far if you injure someone. Most drivers discover the difference after the fact.",
    cover: ["Motor Insurance"],
    segments: ["individual"],
  },
  {
    id: "travel",
    title: "Falling ill, stranded or robbed away from home",
    body: "Medical treatment abroad is charged at local rates, in local currency, up front. Travel cover is one of the cheapest protections available and one of the most frequently skipped.",
    cover: ["Travel Insurance"],
    segments: ["individual"],
  },
  {
    id: "future",
    title: "Building something that outlasts your working years",
    body: "Protection and long-term savings are different jobs, and products that promise both often do neither well. Worth separating deliberately rather than by accident.",
    cover: ["Life Insurance", "Employee Benefits"],
    segments: ["individual"],
  },
  {
    id: "employees",
    title: "Your people",
    body: "Your obligations to staff do not pause when something goes wrong. Group cover is also one of the few benefits that measurably helps you keep good people.",
    cover: [
      "Group Life Insurance",
      "Employee Benefits",
      "Personal Accident Insurance",
    ],
    segments: ["sme", "corporate"],
  },
  {
    id: "premises",
    title: "Premises and the assets inside them",
    body: "Fire, flood and burglary take the building and its contents together. Under-insurance is the most common problem we find here — sums insured that have not moved while replacement costs have.",
    cover: ["Fire & Special Perils Insurance", "Property Insurance"],
    segments: ["sme", "corporate"],
  },
  {
    id: "equipment",
    title: "Plant and equipment failure",
    body: "Machinery breakdown is not covered by a standard fire policy. If a single piece of equipment stopping would halt your operation, that is a gap worth closing.",
    cover: ["Engineering Insurance"],
    segments: ["sme", "corporate"],
  },
  {
    id: "stock",
    title: "Stock, and goods while they are moving",
    body: "Goods in a warehouse and goods on a truck are two different risks with two different policies. Cover for one is routinely mistaken for cover for both.",
    cover: [
      "Goods-in-Transit Insurance",
      "Marine Insurance",
      "Property Insurance",
    ],
    segments: ["sme", "corporate"],
  },
  {
    id: "fleet",
    title: "Vehicles and the liabilities they carry",
    body: "Every vehicle you run is also a liability you carry. Fleet arrangements usually price better than individual policies and are far easier to claim against.",
    cover: ["Motor Insurance", "Goods-in-Transit Insurance"],
    segments: ["sme", "corporate"],
  },
  {
    id: "interruption",
    title: "Trading stops while you recover",
    body: "The fire policy rebuilds the building. It does not replace the months of revenue lost while you are closed, or the customers who found someone else. This is the cover businesses most regret not holding.",
    cover: ["Business Insurance", "Fire & Special Perils Insurance"],
    segments: ["sme", "corporate"],
  },
  {
    id: "liability",
    title: "Claims from customers and third parties",
    body: "You can be liable for injury or loss on your premises, or caused by your work or advice — including where you did nothing obviously wrong. Defence costs alone are significant.",
    cover: [
      "Public Liability Insurance",
      "Professional Indemnity Insurance",
    ],
    segments: ["sme", "corporate"],
  },
  {
    id: "key-person",
    title: "Losing someone the business depends on",
    body: "Most businesses have one or two people whose absence would stall everything. Key person cover buys the time and money to reorganise rather than improvise.",
    cover: ["Group Life Insurance", "Life Insurance"],
    segments: ["sme", "corporate"],
  },
  {
    id: "programme-design",
    title: "A programme, rather than a collection of policies",
    body: "At your scale, cover bought piecemeal tends to overlap in places and leave gaps in others. A structured programme is usually cheaper and materially easier to claim against.",
    cover: [
      "Customised Corporate Risk Solutions",
      "Professional Indemnity Insurance",
    ],
    segments: ["corporate"],
  },
];

/**
 * Weighting. The area a concern points at most directly outranks a general
 * interest; the areas it merely implies rank below anything the visitor
 * actually named. Without that split, a snapshot can lead with something the
 * visitor never mentioned while ignoring what they did — which reads as not
 * having listened.
 */
const CONCERN_PRIMARY_WEIGHT = 3;
const CONCERN_SECONDARY_WEIGHT = 1.5;
const PROTECT_WEIGHT = 2;

/** Section 3 answers → the areas they imply, per segment family. */
const CONCERN_TO_AREAS: Record<string, { personal: string[]; business: string[] }> = {
  "income-loss": {
    personal: ["income-continuity", "dependents"],
    business: ["interruption", "key-person"],
  },
  "property-damage": {
    personal: ["home-property"],
    business: ["premises", "interruption"],
  },
  "asset-loss": {
    personal: ["home-property", "motor"],
    business: ["equipment", "stock"],
  },
  medical: {
    personal: ["health-costs", "income-continuity"],
    business: ["employees"],
  },
  interruption: {
    personal: ["income-continuity"],
    business: ["interruption", "equipment"],
  },
  liability: {
    personal: ["motor"],
    business: ["liability"],
  },
  "key-person": {
    personal: ["dependents", "income-continuity"],
    business: ["key-person", "employees"],
  },
  other: { personal: [], business: [] },
  unsure: { personal: [], business: [] },
};

/** Section 2 answers → areas. */
const PROTECT_TO_AREAS: Record<string, string[]> = {
  health: ["health-costs"],
  income: ["income-continuity"],
  home: ["home-property"],
  vehicle: ["motor"],
  family: ["dependents", "health-costs"],
  travel: ["travel"],
  future: ["future", "dependents"],
  people: ["employees"],
  premises: ["premises"],
  equipment: ["equipment"],
  stock: ["stock"],
  fleet: ["fleet"],
  continuity: ["interruption"],
  liability: ["liability"],
  other: [],
};

/** Shown when someone already holds cover — routes them to the health check. */
const REVIEW_AREA: RiskArea = {
  id: "existing-cover",
  title: "What you already hold may not do what you think",
  body: "Most policies we review contain at least one surprise — a gap, a duplicated cover, or a sum insured that would not rebuild what it names. A free health check tells you which, before you need to find out the hard way.",
  cover: ["Free Policy Health Check"],
  segments: ["individual", "sme", "corporate"],
};

/** Fallbacks so the snapshot is never thin, even on a mostly-skipped form. */
const DEFAULTS: Record<Segment, string[]> = {
  individual: ["health-costs", "dependents", "home-property"],
  sme: ["premises", "interruption", "employees"],
  corporate: ["programme-design", "interruption", "liability"],
};

export type Answers = {
  segment: Segment | null;
  occupation: string;
  protect: string[];
  concern: string | null;
  cover: string | null;
  improve: string;
};

export const emptyAnswers: Answers = {
  segment: null,
  occupation: "",
  protect: [],
  concern: null,
  cover: null,
  improve: "",
};

/**
 * Section 5 — "Based on your answers, these are the areas that may need your
 * attention." Returns 2–3 areas, highest scoring first.
 */
export function buildSnapshot(answers: Answers): RiskArea[] {
  const segment = answers.segment ?? "individual";
  const isBusiness = segment !== "individual";
  const scores = new Map<string, number>();

  const add = (id: string, weight: number) =>
    scores.set(id, (scores.get(id) ?? 0) + weight);

  for (const choice of answers.protect) {
    for (const areaId of PROTECT_TO_AREAS[choice] ?? []) {
      add(areaId, PROTECT_WEIGHT);
    }
  }

  if (answers.concern) {
    const mapped = CONCERN_TO_AREAS[answers.concern];
    const ids = isBusiness ? mapped?.business : mapped?.personal;
    (ids ?? []).forEach((areaId, i) =>
      add(areaId, i === 0 ? CONCERN_PRIMARY_WEIGHT : CONCERN_SECONDARY_WEIGHT),
    );
  }

  // Corporates always get the programme-design point made to them.
  if (segment === "corporate") add("programme-design", 1);

  const available = AREAS.filter((a) => a.segments.includes(segment));

  let ranked = available
    .filter((a) => scores.has(a.id))
    .sort((a, b) => (scores.get(b.id) ?? 0) - (scores.get(a.id) ?? 0));

  // Top up from segment defaults if the visitor skipped most questions.
  if (ranked.length < 2) {
    for (const id of DEFAULTS[segment]) {
      if (ranked.length >= 3) break;
      const area = available.find((a) => a.id === id);
      if (area && !ranked.some((r) => r.id === area.id)) ranked.push(area);
    }
  }

  ranked = ranked.slice(0, 3);

  // Anyone holding cover gets the review prompt, in place of the weakest area.
  if (answers.cover === "have" || answers.cover === "some" || answers.cover === "unsure") {
    if (ranked.length >= 3) ranked = ranked.slice(0, 2);
    ranked.push(REVIEW_AREA);
  }

  return ranked;
}
