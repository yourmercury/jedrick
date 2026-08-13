/**
 * Claims content.
 *
 * The document checklists and first-response steps are the practically useful
 * part of this page: they are what a client needs at the moment something has
 * gone wrong, when nobody wants to read marketing copy.
 */

export type ClaimType = {
  id: string;
  label: string;
  /** What to do immediately, before anyone thinks about paperwork. */
  firstSteps: string[];
  /** What the insurer will ask for. Gathering it early speeds settlement. */
  documents: string[];
};

export const CLAIM_TYPES: ClaimType[] = [
  {
    id: "motor",
    label: "Motor / Fleet",
    firstSteps: [
      "Make sure everyone is safe and get medical help first — the claim can wait.",
      "Report to the police and obtain a police report; most motor policies require one.",
      "Photograph the scene, both vehicles, number plates and any damage before anything is moved.",
      "Take the other driver's name, phone number, vehicle details and insurer.",
      "Do not agree liability or accept a cash settlement at the scene.",
    ],
    documents: [
      "Police report",
      "Photographs of the damage and the scene",
      "Your driver's licence and vehicle particulars",
      "Repair estimate from an approved workshop",
      "Third-party details, where another vehicle was involved",
    ],
  },
  {
    id: "fire-property",
    label: "Fire / Property damage",
    firstSteps: [
      "Get everyone out and call the fire service or emergency responders.",
      "Do not re-enter or start clearing until the property is declared safe.",
      "Tell us as early as you can — insurers often want to inspect before anything is disturbed.",
      "Photograph and video everything before you move or dispose of anything.",
      "Take reasonable steps to prevent further damage; that is a duty under most policies.",
    ],
    documents: [
      "Fire service report, where one was issued",
      "Photographs and video of the damage",
      "Inventory of what was damaged or destroyed",
      "Purchase receipts, invoices or valuations where available",
      "Repair or replacement quotations",
    ],
  },
  {
    id: "burglary",
    label: "Burglary / Theft",
    firstSteps: [
      "Report to the police immediately and get a report or extract.",
      "Do not tidy up until photographs are taken — evidence of forced entry matters.",
      "List what is missing while it is fresh, with makes, models and serial numbers.",
      "Notify your bank if cards or cheque books were taken.",
    ],
    documents: [
      "Police report",
      "Photographs of the point of entry and the damage",
      "List of stolen items with values",
      "Receipts, warranty cards or serial numbers",
    ],
  },
  {
    id: "health",
    label: "Health / Medical",
    firstSteps: [
      "Go to a hospital on your insurer's provider list where you can — it avoids paying up front.",
      "Present your health insurance card or HMO number at registration.",
      "If it is an emergency, get treated first and tell us as soon as you are able.",
      "Keep every receipt if you have to pay out of pocket.",
    ],
    documents: [
      "Completed claim form",
      "Medical report or discharge summary",
      "Itemised hospital bill and receipts",
      "Prescriptions and pharmacy receipts",
      "Referral letter, where the treatment needed one",
    ],
  },
  {
    id: "life",
    label: "Life / Group life",
    firstSteps: [
      "There is no rush on the paperwork. Tell us when you are ready and we will handle the insurer.",
      "Obtain the death certificate and, where required, a medical cause-of-death report.",
      "Locate the policy document or, for group life, confirm employment records with the employer.",
    ],
    documents: [
      "Death certificate",
      "Medical cause-of-death report",
      "Policy document or group scheme details",
      "Identification for the named beneficiary",
      "Letter of administration, where there is no named beneficiary",
    ],
  },
  {
    id: "business-interruption",
    label: "Business interruption",
    firstSteps: [
      "Notify us alongside the underlying damage claim — they are assessed together.",
      "Start keeping a dated record of lost trading days and cancelled orders now.",
      "Keep receipts for anything you spend to keep trading; much of it is usually recoverable.",
      "Do not dispose of damaged stock or equipment before it has been inspected.",
    ],
    documents: [
      "The underlying property or fire claim reference",
      "Management accounts for the preceding 12 months",
      "Records of lost revenue and cancelled contracts",
      "Receipts for costs incurred to reduce the interruption",
      "Payroll records for the affected period",
    ],
  },
  {
    id: "goods-in-transit",
    label: "Goods-in-transit / Marine",
    firstSteps: [
      "Note the damage on the delivery note or bill of lading before signing anything.",
      "Photograph the goods, the packaging and the vehicle or container.",
      "Notify the carrier in writing immediately — most carriage contracts have short notice periods.",
      "Do not dispose of damaged goods; insurers usually want to inspect or salvage.",
    ],
    documents: [
      "Bill of lading, waybill or delivery note",
      "Commercial invoice and packing list",
      "Photographs of the damaged consignment",
      "Survey report, where one was carried out",
      "Correspondence with the carrier",
    ],
  },
  {
    id: "liability",
    label: "Liability claim against you",
    firstSteps: [
      "Do not admit liability, apologise in writing, or offer any payment.",
      "Pass any letter, demand or court process to us the day you receive it.",
      "Record what happened while memories are fresh, and keep any CCTV before it is overwritten.",
      "Take names and contact details of witnesses.",
    ],
    documents: [
      "The letter of claim, demand or court papers",
      "Your written account of the incident",
      "Witness names and statements",
      "CCTV footage, photographs or an accident book entry",
    ],
  },
  {
    id: "engineering",
    label: "Machinery / Equipment breakdown",
    firstSteps: [
      "Stop using the equipment — continuing to run it can void the claim.",
      "Do not begin repairs or dismantle anything before the insurer's engineer has seen it.",
      "Record the operating conditions at the time of failure.",
      "Preserve any failed component.",
    ],
    documents: [
      "Maintenance and service records",
      "Engineer's report on the failure",
      "Purchase invoice or asset register entry",
      "Repair or replacement quotation",
      "Photographs of the failed component",
    ],
  },
  {
    id: "travel",
    label: "Travel",
    firstSteps: [
      "For medical treatment abroad, call the insurer's emergency line before you are admitted where possible.",
      "For lost baggage, get a Property Irregularity Report from the airline before leaving the airport.",
      "For theft, report to the local police within 24 hours and get a report.",
      "Keep every receipt, including for emergency purchases.",
    ],
    documents: [
      "Policy or certificate number",
      "Airline PIR or carrier report",
      "Local police report, for theft",
      "Medical reports and invoices",
      "Boarding passes and booking confirmations",
    ],
  },
  {
    id: "other",
    label: "Something else",
    firstSteps: [
      "Tell us what happened as soon as you can — early notification protects the claim.",
      "Photograph or record whatever is relevant before anything changes.",
      "Keep every document, receipt and piece of correspondence.",
      "Do not admit liability or agree a settlement with anyone before speaking to us.",
    ],
    documents: [
      "Your policy document or number, if you have it",
      "A written account of what happened and when",
      "Photographs or other evidence",
      "Any correspondence you have already received",
    ],
  },
];

/** The universal advice, before anyone has said what kind of claim it is. */
export const FIRST_24_HOURS = [
  {
    title: "Make people safe",
    body: "Injuries first, always. No policy condition outranks getting someone medical help, and no insurer has ever declined a claim because you called an ambulance before you called us.",
  },
  {
    title: "Stop the loss getting worse",
    body: "Board up, shut off, move undamaged stock. Nearly every policy places a duty on you to take reasonable steps to limit the damage — and reasonable costs of doing so are usually recoverable.",
  },
  {
    title: "Record everything before you tidy",
    body: "Photograph and video the scene before anything is cleared. This is the single most common thing clients wish they had done, and it cannot be recovered afterwards.",
  },
  {
    title: "Report to the authorities",
    body: "Police for theft and motor accidents, fire service for fire. Most policies require an official report, and getting one later is far harder than getting one now.",
  },
  {
    title: "Do not admit liability",
    body: "Not at the scene, not in writing, not to be polite. Admitting fault can breach your policy conditions and remove the insurer's ability to defend you.",
  },
  {
    title: "Tell us early",
    body: "Even if you do not have the paperwork yet, even if you are not sure it is claimable. Late notification is one of the most common reasons a valid claim gets refused.",
  },
];

export const ESCALATION_REASONS = [
  "My claim has been declined and I do not understand why",
  "The settlement offered is lower than my loss",
  "The insurer has gone quiet and is not responding",
  "It has taken far longer than I was told it would",
  "I am being asked for documents I cannot reasonably produce",
];
