/**
 * The 18 classes of cover from the website brief.
 *
 * Every product carries the same shape, including `notCovered`. Leading with
 * exclusions is unusual and deliberate — the brief positions Jedrick on
 * clarity, and exclusions are where declined claims come from. A product page
 * that only lists benefits is the thing we are supposed to be an alternative to.
 */

export type Group = "personal" | "business" | "specialist";

export const GROUPS: {
  id: Group;
  label: string;
  tagline: string;
  intro: string;
}[] = [
  {
    id: "personal",
    label: "Personal & Family",
    tagline: "Protecting your health, your income and the people who depend on you.",
    intro:
      "Cover for individuals and households. The question is rarely which product — it is what your family would actually need if your income stopped, or if the house had to be rebuilt.",
  },
  {
    id: "business",
    label: "Business & Commercial",
    tagline: "Keep trading when things go wrong.",
    intro:
      "Cover for your people, premises, stock and liabilities. Sized to how your business actually operates rather than to a standard package.",
  },
  {
    id: "specialist",
    label: "Specialist & Corporate",
    tagline: "Technical risk, placed with insurers who understand your sector.",
    intro:
      "Marine, engineering, energy, aviation and professional risk — plus bespoke corporate programmes where a collection of separate policies would leave gaps.",
  },
];

export type Product = {
  slug: string;
  name: string;
  group: Group;
  /** One line, used on cards and in metadata. */
  summary: string;
  /** The problem this cover exists to solve, in the reader's terms. */
  problem: string;
  covers: string[];
  notCovered: string[];
  forWhom: string[];
  /** The thing we would tell them across a desk. */
  advice: string;
  /** Dictionary term ids worth reading alongside. */
  terms?: string[];
};

export const PRODUCTS: Product[] = [
  /* ------------------------------ PERSONAL ------------------------------ */
  {
    slug: "health-insurance",
    name: "Health Insurance",
    group: "personal",
    summary:
      "Treatment paid for at the point of use, rather than out of savings you were keeping for something else.",
    problem:
      "A single hospital admission can cost more than most households keep available. Without cover, that bill arrives at the worst possible moment and competes with rent, fees and everything else.",
    covers: [
      "Consultations, tests and prescribed medication",
      "Hospital admission and surgery",
      "Emergency treatment",
      "Maternity, subject to a waiting period on most plans",
      "Cashless treatment at hospitals on your provider list",
    ],
    notCovered: [
      "Pre-existing conditions, usually for a defined initial period",
      "Cosmetic treatment",
      "Treatment outside the provider network, on most plans",
      "Benefits used before their waiting period has expired",
    ],
    forWhom: [
      "Families who would otherwise fund treatment from savings",
      "Employers arranging staff cover, where it is far cheaper per person",
      "Anyone with dependants and no employer scheme",
    ],
    advice:
      "Check the hospital list before you check the price. A cheaper plan whose nearest listed hospital is an hour away in traffic is not cheaper on the night you need it.",
    terms: ["health-insurance", "provider-network", "waiting-period", "pre-existing-condition"],
  },
  {
    slug: "life-insurance",
    name: "Life Insurance",
    group: "personal",
    summary:
      "A lump sum for the people who depend on your income, if that income stops permanently.",
    problem:
      "If something happened to you, your household would face the loss and the finances at the same time. Life cover is not for you — it is for what they are left standing on.",
    covers: [
      "A lump sum paid to your named beneficiary on death",
      "Terminal illness benefit on many policies",
      "Optional critical illness and disability riders",
      "Whole-life policies additionally build a surrender value",
    ],
    notCovered: [
      "Death within an initial period on some policies, particularly by suicide",
      "Claims where health questions were not answered fully",
      "Riders you did not buy — cover for illness is not automatic",
    ],
    forWhom: [
      "Anyone with children, a partner or family who rely on their income",
      "Homeowners with a mortgage still outstanding",
      "Business owners with personally guaranteed borrowing",
    ],
    advice:
      "Work out the figure from income, debts and remaining school fees rather than accepting a round number. And for most families, term cover sized correctly beats whole-life cover sized to a budget.",
    terms: ["life-insurance", "term-life", "whole-life", "beneficiary", "non-disclosure"],
  },
  {
    slug: "motor-insurance",
    name: "Motor Insurance",
    group: "personal",
    summary:
      "Cover for your vehicle and for the harm it could do to someone else.",
    problem:
      "Third-party cover is the legal minimum and pays nothing towards your own vehicle. Most drivers only discover which one they bought after the first incident.",
    covers: [
      "Third party: injury and damage you cause to others",
      "Comprehensive: the above, plus damage to your own vehicle",
      "Fire and theft, on comprehensive and on third-party fire and theft",
      "Flood, on most comprehensive policies — worth confirming explicitly",
    ],
    notCovered: [
      "Your own vehicle, under third-party cover — the most common surprise",
      "Driving by anyone not permitted under the policy",
      "Using a private vehicle for hire or ride-hailing, unless declared",
      "Wear, tear and mechanical breakdown",
    ],
    forWhom: [
      "Every vehicle owner — third party is a legal requirement",
      "Anyone whose car is financed or needed to earn a living",
      "Businesses running vehicles, where fleet terms usually price better",
    ],
    advice:
      "Ask about third-party fire and theft. For an older vehicle in a high-theft area it is often the right middle option, and it is rarely offered unless you ask for it.",
    terms: ["motor-insurance", "third-party", "comprehensive", "own-damage", "no-claims-discount"],
  },
  {
    slug: "travel-insurance",
    name: "Travel Insurance",
    group: "personal",
    summary:
      "Medical treatment, cancellation, delay and lost baggage while you are away from home.",
    problem:
      "Medical treatment abroad is charged at local rates, in local currency, up front. It is one of the cheapest covers available and one of the most frequently skipped.",
    covers: [
      "Emergency medical treatment and hospital admission abroad",
      "Medical evacuation and repatriation",
      "Cancellation and curtailment",
      "Lost, delayed or damaged baggage",
      "Personal liability while travelling",
    ],
    notCovered: [
      "Pre-existing conditions not declared before travel",
      "Countries under an official travel advisory",
      "High-risk activities unless specifically added",
      "Claims for theft without a local police report",
    ],
    forWhom: [
      "Anyone travelling abroad, and often a visa requirement",
      "Frequent travellers, for whom annual multi-trip cover is cheaper",
      "Businesses sending staff overseas",
    ],
    advice:
      "Call the insurer's emergency line before being admitted where you possibly can. Treatment arranged through them is usually paid directly; treatment you arrange yourself you may have to fund and reclaim.",
    terms: ["travel-insurance", "pre-existing-condition", "personal-accident"],
  },
  {
    slug: "property-insurance",
    name: "Property Insurance",
    group: "personal",
    summary:
      "Cover for buildings and their contents against physical damage and theft.",
    problem:
      "Fire, flood and burglary rarely take one thing. The question is whether your sum insured would actually rebuild and refurnish at today's prices, not what you paid years ago.",
    covers: [
      "The building structure, and usually fixtures and fittings",
      "Contents, to the sum insured you set",
      "Fire, lightning, explosion, and named perils such as flood and storm",
      "Burglary, where forcible entry can be shown",
      "Alternative accommodation on many household policies",
    ],
    notCovered: [
      "Wear, tear and gradual deterioration",
      "Damage from lack of maintenance",
      "Theft without evidence of forced entry, on most policies",
      "Property left unoccupied beyond the period the policy allows",
    ],
    forWhom: [
      "Homeowners, including landlords",
      "Tenants, for their own contents and improvements",
      "Anyone with a mortgage, where cover is usually a condition",
    ],
    advice:
      "Insure the rebuild cost, not the market value. They are different numbers, and for a building the rebuild figure is often the higher one — get it wrong and the average clause scales down every claim you ever make.",
    terms: ["property-insurance", "sum-insured", "average-clause", "reinstatement-value"],
  },
  {
    slug: "personal-accident-insurance",
    name: "Personal Accident Insurance",
    group: "personal",
    summary:
      "A fixed sum paid for death or disability caused by an accident, whatever the medical bills.",
    problem:
      "An accident that stops you working creates two problems at once — the treatment, and the income. Personal accident cover pays a set benefit regardless of either.",
    covers: [
      "Accidental death benefit",
      "Permanent total or partial disability, on a benefit scale",
      "Temporary disability payments on many policies",
      "Medical expenses arising from the accident, where included",
    ],
    notCovered: [
      "Illness — this is accident cover only",
      "Self-inflicted injury",
      "Hazardous activities unless declared",
      "Accidents while under the influence of alcohol or drugs",
    ],
    forWhom: [
      "People in physically demanding or higher-risk work",
      "Employers covering staff, drivers and site workers",
      "Anyone whose income depends on being physically able to work",
    ],
    advice:
      "Read the benefit scale rather than the headline sum. The figure advertised is usually the death benefit; partial disability pays a percentage, and the percentages differ a lot between insurers.",
    terms: ["personal-accident", "life-insurance", "employee-benefits"],
  },

  /* ------------------------------ BUSINESS ------------------------------ */
  {
    slug: "business-insurance",
    name: "Business Insurance",
    group: "business",
    summary:
      "A combined package for smaller businesses, usually including property, liability and business interruption.",
    problem:
      "Buying each cover separately leaves gaps at the seams. A package written for how you actually trade covers the common exposures without four separate renewal dates.",
    covers: [
      "Premises, contents, stock and equipment",
      "Business interruption for the trading you lose while closed",
      "Public liability for injury and damage to third parties",
      "Money, glass and employee dishonesty on many packages",
    ],
    notCovered: [
      "Professional advice claims — that is professional indemnity",
      "Machinery breakdown, unless engineering cover is added",
      "Goods while in transit, unless specifically extended",
      "Losses beyond the indemnity period you selected",
    ],
    forWhom: [
      "SMEs with premises, stock or customers on site",
      "Retail, hospitality, light manufacturing and services",
      "Any business where one incident would stop trading",
    ],
    advice:
      "The business interruption section is the part to get right, and the part most often left at a default. Ask specifically what indemnity period you have and whether it is realistic for your rebuild.",
    terms: ["business-interruption", "indemnity-period", "gross-profit", "public-liability"],
  },
  {
    slug: "fire-special-perils-insurance",
    name: "Fire & Special Perils Insurance",
    group: "business",
    summary:
      "The standard commercial property policy — fire, lightning and explosion, plus named extras.",
    problem:
      "The base policy covers less than most people assume. Flood, storm, riot and impact are added by name, and if they were not added, they are not covered.",
    covers: [
      "Fire, lightning and explosion as standard",
      "Flood, storm and tempest, where added",
      "Riot, strike and malicious damage, where added",
      "Impact by vehicles or falling objects, where added",
      "Bursting of water tanks and pipes, where added",
    ],
    notCovered: [
      "Perils not named in your schedule",
      "Machinery breakdown from internal fault",
      "Loss of income — that requires business interruption cover",
      "Gradual damage, wear and tear",
    ],
    forWhom: [
      "Any business owning or occupying commercial premises",
      "Landlords of commercial property",
      "Manufacturers and warehouse operators",
    ],
    advice:
      "Ask for your schedule of perils to be read to you. Almost every client we review is surprised by at least one thing they assumed was on it.",
    terms: ["fire-special-perils", "named-perils", "average-clause", "sum-insured"],
  },
  {
    slug: "group-life-insurance",
    name: "Group Life Insurance",
    group: "business",
    summary:
      "One life policy covering your whole workforce, usually without medical examinations.",
    problem:
      "Individual life cover is expensive and slow to arrange. Group cover protects every employee's family at a fraction of the cost, and is one of the few benefits staff genuinely value.",
    covers: [
      "A death benefit for each employee, usually a multiple of salary",
      "Cover regardless of individual medical history, within free cover limits",
      "Optional extension to accidental death and disability",
      "Automatic inclusion of new joiners, subject to reporting",
    ],
    notCovered: [
      "Employees not reported to the insurer",
      "Amounts above the free cover limit without individual underwriting",
      "Cover after an employee leaves — it ends with employment",
    ],
    forWhom: [
      "Employers of any size, and a statutory requirement for many",
      "Businesses competing for skilled staff",
      "Organisations with employees in higher-risk roles",
    ],
    advice:
      "Keep the member list current. The most common group life problem is not price — it is a claim for someone who joined months ago and was never reported to the insurer.",
    terms: ["group-life", "employee-benefits", "key-person", "life-insurance"],
  },
  {
    slug: "employee-benefits",
    name: "Employee Benefits",
    group: "business",
    summary:
      "Health, life and accident cover arranged as a package for your staff.",
    problem:
      "Recruiting and retaining good people is harder than it was, and benefits are one of the few levers that cost less than a salary increase and are valued more.",
    covers: [
      "Group health cover through an HMO",
      "Group life, typically a multiple of salary",
      "Group personal accident",
      "Optional extension to dependants",
    ],
    notCovered: [
      "Pre-existing conditions during initial waiting periods",
      "Treatment outside the provider network",
      "Dependants, unless specifically added",
    ],
    forWhom: [
      "Employers building a benefits package",
      "Businesses with staff in the field or on sites",
      "Organisations where staff turnover is a real cost",
    ],
    advice:
      "A benefit nobody knows about does not retain anyone. Whatever you arrange, make sure staff understand what they have and how to use it — the hospital list especially.",
    terms: ["employee-benefits", "group-life", "health-insurance", "provider-network"],
  },
  {
    slug: "public-liability-insurance",
    name: "Public Liability Insurance",
    group: "business",
    summary:
      "Cover for injury or damage your business causes to members of the public or their property.",
    problem:
      "You can be liable for an accident on your premises or caused by your work even where you did nothing obviously wrong. Defence costs alone are significant, and they arrive before any finding of fault.",
    covers: [
      "Injury to customers, visitors and members of the public",
      "Damage to third-party property, including at client sites",
      "Legal defence costs",
      "Claims arising from your products, where product liability is included",
    ],
    notCovered: [
      "Injury to your own employees — that is employers' liability",
      "Claims arising from professional advice",
      "Deliberate acts",
      "Contractual liabilities beyond your common-law position, unless agreed",
    ],
    forWhom: [
      "Any business the public physically visits",
      "Contractors working at client premises",
      "Manufacturers and distributors, for product exposure",
    ],
    advice:
      "Set the limit against the worst realistic outcome, not the average claim. The difference in premium between a modest limit and a serious one is usually far smaller than people expect.",
    terms: ["public-liability", "liability", "third-party", "professional-indemnity"],
  },
  {
    slug: "goods-in-transit-insurance",
    name: "Goods-in-Transit Insurance",
    group: "business",
    summary:
      "Cover for your goods while they are being moved, which a property policy does not reach.",
    problem:
      "Your property policy stops at the warehouse door and your motor policy covers the vehicle, not the load. Between those two sits every consignment you move.",
    covers: [
      "Loss or damage to goods while in transit",
      "Theft of goods from vehicles, subject to policy conditions",
      "Loading and unloading, on most policies",
      "Goods carried by third-party hauliers, where arranged",
    ],
    notCovered: [
      "Inadequate packing",
      "Goods left in unattended vehicles, on many policies",
      "Overnight stops outside secured premises, unless agreed",
      "Consignments above the per-load limit you selected",
    ],
    forWhom: [
      "Distributors, wholesalers and manufacturers",
      "Logistics and haulage operators",
      "Any retailer moving stock between locations",
    ],
    advice:
      "Check whether your limit is per vehicle or per consignment, and whether unattended vehicles are excluded. Those two clauses decide most goods-in-transit claims.",
    terms: ["goods-in-transit", "marine-insurance", "bill-of-lading"],
  },

  /* ----------------------------- SPECIALIST ----------------------------- */
  {
    slug: "marine-insurance",
    name: "Marine Insurance",
    group: "specialist",
    summary:
      "Cover for goods moving by sea or air, and for the vessels that carry them.",
    problem:
      "Once a consignment leaves the supplier it passes through several hands and jurisdictions. Marine cargo cover is what follows the goods rather than the party holding them.",
    covers: [
      "Cargo loss or damage in transit by sea, air or land legs",
      "General average contributions",
      "War and strikes risks, where added",
      "Hull and machinery cover for vessel owners",
    ],
    notCovered: [
      "Inherent vice or inadequate packing",
      "Delay itself, even where it causes loss",
      "War and strikes unless specifically added",
      "Damage noted at delivery but signed for clean",
    ],
    forWhom: [
      "Importers and exporters",
      "Freight forwarders and clearing agents",
      "Vessel owners and charterers",
    ],
    advice:
      "Never sign a clean bill of lading for a consignment showing visible damage. That signature is the single most common reason a valid cargo claim fails.",
    terms: ["marine-insurance", "bill-of-lading", "goods-in-transit"],
  },
  {
    slug: "engineering-insurance",
    name: "Engineering Insurance",
    group: "specialist",
    summary:
      "Cover for machinery, plant and construction works — including breakdown, which fire policies exclude.",
    problem:
      "A standard property policy covers a machine that burns. It does not cover the same machine failing from an internal fault, which is far more likely and just as capable of stopping production.",
    covers: [
      "Machinery breakdown from mechanical and electrical failure",
      "Contractors' all risks for works in progress",
      "Plant and equipment, owned and hired in",
      "Boiler and pressure vessel cover",
      "Deterioration of stock following machinery failure, where added",
    ],
    notCovered: [
      "Wear and tear and gradual deterioration",
      "Faults present before cover started",
      "Consumable parts and routine maintenance",
      "Losses where required maintenance was not carried out",
    ],
    forWhom: [
      "Manufacturers dependent on specific machines",
      "Construction firms, for works and plant",
      "Facilities with generators, lifts, boilers or cold storage",
    ],
    advice:
      "If one machine stopping would halt your operation, that machine needs engineering cover and a business interruption indemnity period long enough to replace it — including import lead time.",
    terms: ["engineering-insurance", "business-interruption", "indemnity-period"],
  },
  {
    slug: "oil-and-gas-insurance",
    name: "Oil & Gas Insurance",
    group: "specialist",
    summary:
      "Energy-sector property, control of well and liability cover, placed as a structured programme.",
    problem:
      "Energy risk is too large and too interconnected for standalone policies. What matters is programme design, reinsurance capacity, and whether the insurance matches the contracts you have signed.",
    covers: [
      "Onshore and offshore property damage",
      "Control of well and redrilling costs",
      "Third-party and environmental liability",
      "Construction and installation works",
      "Business interruption on production",
    ],
    notCovered: [
      "Liabilities you assumed contractually but did not declare",
      "Losses from unapproved changes to operating procedure",
      "Gradual pollution, on many wordings — sudden and accidental only",
    ],
    forWhom: [
      "Operators and licence holders",
      "Oilfield service companies and contractors",
      "Marine and logistics support providers",
    ],
    advice:
      "Have the insurance programme read against your contracts, not just against your assets. The most expensive gaps in this sector are liabilities accepted in a contract that the policy was never told about.",
    terms: ["oil-gas-insurance", "liability", "reinsurance", "business-interruption"],
  },
  {
    slug: "aviation-insurance",
    name: "Aviation Insurance",
    group: "specialist",
    summary:
      "Hull, passenger and third-party liability cover for aircraft and their operation.",
    problem:
      "Aviation combines very high asset values with very high liability exposure, in a market served by a small number of specialist insurers.",
    covers: [
      "Hull damage, in flight and on the ground",
      "Passenger legal liability",
      "Third-party and property liability",
      "Crew personal accident",
      "Ground handling and hangar-keepers liability",
    ],
    notCovered: [
      "Operation outside the declared geographical limits",
      "Flight by crew not named or not appropriately rated",
      "Wear, tear and progressive deterioration",
      "Use outside the declared purpose",
    ],
    forWhom: [
      "Aircraft owners and operators",
      "Charter companies",
      "Ground handling and maintenance organisations",
    ],
    advice:
      "Pilot warranties and geographical limits are where aviation claims are won and lost. Both should be reviewed whenever crew or routes change, not only at renewal.",
    terms: ["aviation-insurance", "liability", "reinsurance"],
  },
  {
    slug: "professional-indemnity-insurance",
    name: "Professional Indemnity Insurance",
    group: "specialist",
    summary:
      "Cover for claims that your advice or professional work caused someone a financial loss.",
    problem:
      "If your product is judgement, your largest exposure is not your office. It is a client asserting that your work was wrong — and those claims can arrive years after the engagement ended.",
    covers: [
      "Claims for negligent advice, design or professional services",
      "Legal defence costs",
      "Breach of professional duty and, on many wordings, confidentiality",
      "Work carried out before the policy started, where retroactive cover applies",
    ],
    notCovered: [
      "Deliberate wrongdoing",
      "Claims already known about when cover started",
      "Work done before the retroactive date",
      "Claims made after the policy ends without run-off cover",
    ],
    forWhom: [
      "Consultants, engineers, architects and surveyors",
      "Accountants, lawyers and financial advisers",
      "Agencies, IT firms and anyone contracting on deliverables",
    ],
    advice:
      "These are claims-made policies, which is the detail that catches people. Cover must be in force when the claim is made, not when the work was done — so never let it lapse just because you have stopped trading.",
    terms: ["professional-indemnity", "liability", "public-liability"],
  },
  {
    slug: "customised-corporate-risk-solutions",
    name: "Customised Corporate Risk Solutions",
    group: "specialist",
    summary:
      "A designed insurance programme for organisations whose risk does not fit standard products.",
    problem:
      "At scale, cover bought piecemeal overlaps in places and leaves gaps in others. A programme designed as a whole is usually cheaper and materially easier to claim against.",
    covers: [
      "Programme design across all classes and locations",
      "Risk surveys and exposure mapping before placement",
      "Coordinated renewal dates and consistent wordings",
      "Claims handling and escalation across the programme",
      "Alignment of cover with contractual obligations",
    ],
    notCovered: [
      "Risks deliberately retained under an agreed retention",
      "Exposures not disclosed during the survey",
    ],
    forWhom: [
      "Multi-site and multi-entity organisations",
      "Businesses with contractual insurance obligations to clients or lenders",
      "Groups whose cover has accumulated department by department",
    ],
    advice:
      "Start with an exposure map rather than a quote request. Most large organisations we review are simultaneously over-insured in one place and uncovered in another, and neither is visible policy by policy.",
    terms: ["underwriting", "reinsurance", "liability", "business-interruption"],
  },
];

export const PRODUCTS_BY_GROUP = (group: Group) =>
  PRODUCTS.filter((p) => p.group === group);

export function findProduct(slug: string) {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function findGroup(id: string) {
  return GROUPS.find((g) => g.id === id);
}
