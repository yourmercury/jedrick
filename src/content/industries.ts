/**
 * Industry guides.
 *
 * The point of these pages is specificity — a haulier and a school fail in
 * completely different ways, and generic "we serve all sectors" copy is what
 * the brief explicitly asked to avoid. Each entry names the exposures we
 * actually see in that sector and the gaps we find when reviewing their
 * existing policies.
 */

export type Industry = {
  slug: string;
  label: string;
  /** Shown on the index and in nav chips. */
  short: string;
  intro: string;
  risks: { title: string; body: string }[];
  cover: { line: string; why: string }[];
  gaps: string[];
};

export const INDUSTRIES: Industry[] = [
  {
    slug: "smes",
    label: "SMEs & growing businesses",
    short: "SMEs",
    intro:
      "Small businesses carry the same categories of risk as large ones, with none of the balance sheet to absorb them. One fire, one liability claim or one stalled month can end an otherwise healthy business.",
    risks: [
      {
        title: "A single premises",
        body: "Most SMEs operate from one location. If it becomes unusable, there is no second site to move production to — trading simply stops.",
      },
      {
        title: "Owner concentration",
        body: "The business often depends on one or two people. Their absence does not slow the business down; it stops it.",
      },
      {
        title: "Thin cash reserves",
        body: "A loss that a large company absorbs from working capital can be terminal for an SME, even when the loss itself is modest.",
      },
      {
        title: "Informal record-keeping",
        body: "Claims are settled on evidence. Businesses without current asset registers and management accounts routinely recover less than they lost.",
      },
    ],
    cover: [
      { line: "Fire & Special Perils Insurance", why: "The building, fittings, stock and equipment." },
      { line: "Business Insurance", why: "Business interruption for the trading you lose while closed." },
      { line: "Public Liability Insurance", why: "Injury or damage to customers, visitors and their property." },
      { line: "Group Life Insurance", why: "Cover for staff, and retention of the people you have trained." },
      { line: "Motor Insurance", why: "Any vehicle used in the business, including personal cars used for work." },
    ],
    gaps: [
      "No business interruption cover at all — by far the most common and most expensive omission",
      "Sums insured fixed at start-up and never revisited while the business grew",
      "Assuming the landlord's policy covers your contents and improvements",
      "Stock insured at cost price rather than replacement cost",
    ],
  },
  {
    slug: "corporate",
    label: "Corporate organisations",
    short: "Corporate Organisations",
    intro:
      "At scale, the problem is rarely a missing policy. It is a collection of policies bought at different times by different people, which overlap in places and leave gaps in others.",
    risks: [
      {
        title: "Programme fragmentation",
        body: "Cover accumulated department by department produces duplicated premiums and uncovered exposures at the seams between policies.",
      },
      {
        title: "Multi-site aggregation",
        body: "Limits set for one location may be inadequate when a single event affects several sites at once.",
      },
      {
        title: "Directors' and professional exposure",
        body: "Decisions made by senior people create liabilities that a standard commercial policy does not answer.",
      },
      {
        title: "Contractual obligations",
        body: "Customer and lender contracts impose specific insurance requirements. Breaching them is a commercial risk as well as an insurance one.",
      },
    ],
    cover: [
      { line: "Customised Corporate Risk Solutions", why: "A structured programme rather than assembled policies." },
      { line: "Professional Indemnity Insurance", why: "Claims arising from advice, design or professional work." },
      { line: "Public Liability Insurance", why: "Third-party injury and property damage across all sites." },
      { line: "Employee Benefits", why: "Health, group life and accident cover as a retention tool." },
      { line: "Business Insurance", why: "Interruption cover sized to real recovery timelines." },
    ],
    gaps: [
      "Overlapping cover between policies bought by different departments",
      "Indemnity periods too short for the actual rebuild or replacement timeline",
      "Contractual insurance requirements not reflected in the policies held",
      "No single view of total exposure across sites and subsidiaries",
    ],
  },
  {
    slug: "logistics",
    label: "Logistics & haulage",
    short: "Logistics & Haulage",
    intro:
      "Logistics carries two risks at once — the vehicle and the cargo — and they are covered by two different policies. Holding one and assuming it covers both is the mistake we see most often in this sector.",
    risks: [
      {
        title: "The cargo is not the vehicle",
        body: "Motor cover repairs the truck. It pays nothing towards the goods it was carrying. Goods-in-transit cover is a separate policy.",
      },
      {
        title: "High road exposure",
        body: "Vehicles on Nigerian roads for long hours accumulate incidents. Frequency, not severity, is what drives cost here.",
      },
      {
        title: "Driver risk",
        body: "Cover often depends on who was driving and whether they were authorised. An unlisted driver can void a claim entirely.",
      },
      {
        title: "Customer liability",
        body: "Your contracts usually make you responsible for goods in your care, on terms that may be wider than your insurance.",
      },
    ],
    cover: [
      { line: "Motor Insurance", why: "Fleet cover for the vehicles and third-party liability." },
      { line: "Goods-in-Transit Insurance", why: "The cargo itself, while it is moving." },
      { line: "Public Liability Insurance", why: "Damage caused at customer premises during loading and delivery." },
      { line: "Group Life Insurance", why: "Drivers and warehouse staff." },
      { line: "Marine Insurance", why: "Where consignments cross borders or move by sea or air." },
    ],
    gaps: [
      "Goods-in-transit limits set per vehicle rather than per consignment value",
      "Cover excluding overnight stops or unattended vehicles, which is when much theft occurs",
      "Drivers not properly listed or licensed under the policy terms",
      "Contractual liability to customers wider than the insurance actually held",
    ],
  },
  {
    slug: "construction",
    label: "Construction & engineering",
    short: "Construction",
    intro:
      "Construction risk changes shape every week of a project. Cover that fitted at groundworks is often wrong by the time you are fitting out, and the liabilities extend well past practical completion.",
    risks: [
      {
        title: "Works in progress",
        body: "A partly built structure is not covered by a standard property policy. Contract works cover is a separate arrangement.",
      },
      {
        title: "Public exposure",
        body: "Sites next to roads, homes or businesses create third-party risk that is entirely outside your control.",
      },
      {
        title: "Plant and equipment",
        body: "Heavy plant is valuable, mobile and frequently hired in — with hire agreements that pass the risk to you.",
      },
      {
        title: "Design liability",
        body: "If you design as well as build, defective design claims are professional liability, not public liability.",
      },
    ],
    cover: [
      { line: "Engineering Insurance", why: "Contract works, plant and machinery on site." },
      { line: "Public Liability Insurance", why: "Injury and damage to the public and neighbouring property." },
      { line: "Professional Indemnity Insurance", why: "Design and specification errors." },
      { line: "Group Life Insurance", why: "Site workers, including on high-risk activities." },
      { line: "Goods-in-Transit Insurance", why: "Materials moving to and between sites." },
    ],
    gaps: [
      "Contract works sums insured not updated as the project value grows",
      "Hired-in plant assumed to be covered by the owner when the contract says otherwise",
      "Public liability limits too low for the site's surroundings",
      "No cover for the defects liability period after handover",
    ],
  },
  {
    slug: "manufacturing",
    label: "Manufacturing",
    short: "Manufacturing",
    intro:
      "In manufacturing the machine is the business. A fire policy will rebuild the factory, but it will not pay when a single critical machine fails from an internal fault — and that is the loss most likely to stop production.",
    risks: [
      {
        title: "Machinery breakdown",
        body: "Standard fire and property policies exclude internal mechanical and electrical failure. That requires engineering cover.",
      },
      {
        title: "Single points of failure",
        body: "One critical machine with a long replacement lead time can halt an entire line for months.",
      },
      {
        title: "Stock at several stages",
        body: "Raw materials, work in progress and finished goods have different values and are often insured as one undifferentiated figure.",
      },
      {
        title: "Long rebuild timelines",
        body: "Replacing imported plant takes far longer than rebuilding a shed, which is what makes short indemnity periods dangerous here.",
      },
    ],
    cover: [
      { line: "Engineering Insurance", why: "Machinery breakdown and plant damage." },
      { line: "Fire & Special Perils Insurance", why: "Buildings, plant and stock." },
      { line: "Business Insurance", why: "Interruption cover, with an indemnity period matched to plant lead times." },
      { line: "Public Liability Insurance", why: "Third-party injury, including product-related exposure." },
      { line: "Marine Insurance", why: "Imported machinery and raw materials in transit." },
    ],
    gaps: [
      "No machinery breakdown cover, on the assumption the fire policy responds",
      "Indemnity period of 12 months where plant lead times are 18 or more",
      "Stock valued at cost rather than replacement, ignoring currency movement on imports",
      "Business interruption gross profit calculated on the accounting definition rather than the insurance one",
    ],
  },
  {
    slug: "healthcare",
    label: "Healthcare providers",
    short: "Healthcare Providers",
    intro:
      "Clinics and hospitals carry a combination almost no other sector does: expensive equipment, continuous operation, and professional liability arising from clinical decisions.",
    risks: [
      {
        title: "Clinical liability",
        body: "Claims arising from treatment are professional indemnity exposure, and they can emerge years after the event.",
      },
      {
        title: "Equipment dependence",
        body: "Diagnostic and theatre equipment is expensive, and its failure stops services immediately.",
      },
      {
        title: "Continuous operation",
        body: "A facility that cannot close has no tolerance for power, water or equipment failure.",
      },
      {
        title: "Duty to patients and visitors",
        body: "Public liability exposure is elevated by the volume and vulnerability of the people on site.",
      },
    ],
    cover: [
      { line: "Professional Indemnity Insurance", why: "Clinical negligence and treatment-related claims." },
      { line: "Engineering Insurance", why: "Medical equipment breakdown." },
      { line: "Fire & Special Perils Insurance", why: "Premises, equipment and consumables." },
      { line: "Public Liability Insurance", why: "Patients and visitors on the premises." },
      { line: "Group Life Insurance", why: "Clinical and support staff." },
    ],
    gaps: [
      "Professional indemnity limits set well below realistic claim values",
      "Claims-made policies lapsing without run-off cover, leaving historic treatment unprotected",
      "Equipment insured at book value rather than replacement cost",
      "No cover for loss of refrigerated stock — vaccines, blood products, reagents",
    ],
  },
  {
    slug: "education",
    label: "Schools & education",
    short: "Schools & Education",
    intro:
      "Schools are responsible for children, which changes the character of every risk on the premises. The exposure is not primarily financial — but the financial consequences of an incident are severe.",
    risks: [
      {
        title: "Duty of care to minors",
        body: "Liability arising from injury to a pupil is the defining exposure, and it extends to trips, sports and transport.",
      },
      {
        title: "School transport",
        body: "Buses carrying pupils combine motor risk with passenger liability and intense reputational sensitivity.",
      },
      {
        title: "Term-time concentration",
        body: "Fee income arrives in blocks. An incident forcing closure mid-term has an outsized effect on cash flow.",
      },
      {
        title: "Buildings in constant use",
        body: "Laboratories, kitchens and boarding facilities each add their own fire and accident exposure.",
      },
    ],
    cover: [
      { line: "Public Liability Insurance", why: "Injury to pupils, parents and visitors." },
      { line: "Personal Accident Insurance", why: "Group cover for pupils, on and off site." },
      { line: "Fire & Special Perils Insurance", why: "Buildings, laboratories and equipment." },
      { line: "Motor Insurance", why: "School buses, including passenger liability." },
      { line: "Group Life Insurance", why: "Teaching and support staff." },
    ],
    gaps: [
      "Liability cover that excludes off-site trips and sporting activities",
      "No personal accident cover for pupils, only liability — which requires proving fault",
      "Buildings insured at market rather than reinstatement value",
      "No business interruption cover for a closure that interrupts fee income",
    ],
  },
  {
    slug: "oil-and-gas",
    label: "Oil & gas",
    short: "Oil & Gas",
    intro:
      "Energy risk is placed as a structured programme, not as a set of policies. The values are large enough that reinsurance capacity, local content rules and contractual obligations all shape what is achievable.",
    risks: [
      {
        title: "Catastrophic single events",
        body: "Low frequency, extremely high severity. Programme design matters more than premium comparison.",
      },
      {
        title: "Environmental liability",
        body: "Pollution and clean-up costs can dwarf the physical damage that caused them.",
      },
      {
        title: "Contractor interfaces",
        body: "Complex contractor chains create disputes over who carries which risk, usually discovered after a loss.",
      },
      {
        title: "Business interruption at scale",
        body: "Production downtime is often the largest component of the loss, well ahead of the physical damage.",
      },
    ],
    cover: [
      { line: "Oil & Gas Insurance", why: "Property, control of well and operational exposure." },
      { line: "Customised Corporate Risk Solutions", why: "Programme structure across the operation." },
      { line: "Public Liability Insurance", why: "Third-party and environmental liability." },
      { line: "Engineering Insurance", why: "Plant, machinery and construction works." },
      { line: "Group Life Insurance", why: "Personnel, including offshore and high-hazard roles." },
    ],
    gaps: [
      "Contractual risk allocation not matched by the insurance actually in place",
      "Business interruption values understated relative to production economics",
      "Local content requirements not reflected in how the programme is placed",
      "Certificates of insurance not maintained across the contractor chain",
    ],
  },
  {
    slug: "hospitality",
    label: "Hospitality & retail",
    short: "Hospitality & Retail",
    intro:
      "Hospitality and retail depend on customers physically coming to one location. That makes public liability and business interruption the two covers that matter most, and both are routinely under-bought.",
    risks: [
      {
        title: "Public on the premises",
        body: "High footfall means slips, falls and injury claims. In food businesses, contamination adds a further exposure.",
      },
      {
        title: "Single-location dependence",
        body: "One kitchen, one shopfront. If it closes, revenue is zero — there is no remote alternative.",
      },
      {
        title: "Fire risk from kitchens",
        body: "Commercial cooking is one of the highest fire exposures there is, and insurers price and inspect accordingly.",
      },
      {
        title: "Stock spoilage",
        body: "A power failure that spoils refrigerated stock is a loss the property policy may not answer without a specific extension.",
      },
    ],
    cover: [
      { line: "Public Liability Insurance", why: "Customer injury and property damage." },
      { line: "Fire & Special Perils Insurance", why: "Premises, fit-out, equipment and stock." },
      { line: "Business Insurance", why: "Interruption cover for the closure period." },
      { line: "Group Life Insurance", why: "Staff cover in a high-turnover sector." },
      { line: "Property Insurance", why: "Contents, fittings and tenant's improvements." },
    ],
    gaps: [
      "Fit-out and tenant's improvements not insured, on the assumption the landlord covers them",
      "No deterioration-of-stock extension for refrigerated goods",
      "Public liability limits unchanged as footfall grew",
      "Business interruption period too short for a rebuild plus re-fit plus rebuilding the customer base",
    ],
  },
  {
    slug: "professional-services",
    label: "Professional services",
    short: "Professional Services",
    intro:
      "For firms whose product is judgement, the largest exposure is not the office. It is a claim that the advice was wrong — and those claims can arrive years after the work was done.",
    risks: [
      {
        title: "Advice-based liability",
        body: "Professional indemnity responds to financial loss caused by your work. It is the core cover, not an add-on.",
      },
      {
        title: "Long-tail claims",
        body: "Claims can emerge long after an engagement ends, which makes continuous cover and run-off arrangements essential.",
      },
      {
        title: "Client contract requirements",
        body: "Corporate clients frequently mandate minimum limits before they will engage you at all.",
      },
      {
        title: "Data and records",
        body: "Client information held on your systems is both a practical and a reputational exposure.",
      },
    ],
    cover: [
      { line: "Professional Indemnity Insurance", why: "Claims arising from advice, work or omissions." },
      { line: "Public Liability Insurance", why: "Visitors to your offices and work at client sites." },
      { line: "Property Insurance", why: "Offices, equipment and records." },
      { line: "Employee Benefits", why: "Health and group life in a talent-driven market." },
      { line: "Business Insurance", why: "Interruption cover for loss of fee income." },
    ],
    gaps: [
      "Cover allowed to lapse between engagements, leaving historic work exposed",
      "No run-off cover when a firm restructures or a partner retires",
      "Limits below what client contracts actually require",
      "Sole practitioners assuming a limited company structure removes personal exposure",
    ],
  },
];

export function findIndustry(slug: string) {
  return INDUSTRIES.find((i) => i.slug === slug);
}
