/**
 * The Insurance Dictionary.
 *
 * House rules for every entry:
 *   - the meaning is written the way you would explain it to a friend, not the
 *     way a policy wording defines it
 *   - every term gets a concrete example, because abstraction is what makes
 *     insurance language confusing in the first place
 *   - Nigerian context where it is relevant (Naira, NAICOM, local practice)
 *
 * `related` uses other entries' ids and drives the cross-links.
 */

export type Term = {
  id: string;
  term: string;
  /** Alternative names people search for. */
  aka?: string[];
  meaning: string;
  example: string;
  related?: string[];
};

export const DICTIONARY: Term[] = [
  {
    id: "actuary",
    term: "Actuary",
    meaning:
      "The mathematician who works out how likely a loss is and therefore what a policy should cost. They are the reason premiums differ between a 22-year-old driver and a 45-year-old one.",
    example:
      "An actuary decides that comprehensive motor cover on a Lagos commercial vehicle should cost more than on a private car, because it is on the road far more hours per week.",
    related: ["premium", "underwriting"],
  },
  {
    id: "additional-insured",
    term: "Additional insured",
    meaning:
      "Someone other than the policyholder who is also protected by the policy. Often required by a contract before you can start work.",
    example:
      "A shopping mall requires your construction firm to name the mall as an additional insured on your liability policy before you can begin the fit-out.",
    related: ["public-liability", "certificate-of-insurance"],
  },
  {
    id: "adjuster",
    term: "Adjuster / Loss adjuster",
    aka: ["Assessor"],
    meaning:
      "The person the insurer sends to investigate your claim and work out what it should pay. They work for the insurer, not for you — which is exactly why having a broker matters.",
    example:
      "After a warehouse fire, the loss adjuster visits, photographs the damage and produces a report the insurer uses to decide the settlement.",
    related: ["claim", "broker", "loss"],
  },
  {
    id: "agent",
    term: "Agent",
    meaning:
      "Someone who sells insurance on behalf of one insurance company. An agent represents the insurer. A broker represents you. It is a meaningful difference.",
    example:
      "An agent for a single insurer can only offer you that insurer's motor policy, even if three other companies would cover you better or cheaper.",
    related: ["broker", "intermediary"],
  },
  {
    id: "all-risks",
    term: "All risks",
    meaning:
      "Cover that protects against any cause of loss except the ones the policy specifically excludes. Broader than named-perils cover — but 'all risks' never means 'everything'.",
    example:
      "An all-risks policy on a laptop covers dropping it, spilling water on it and having it stolen — but still excludes wear and tear.",
    related: ["named-perils", "exclusion"],
  },
  {
    id: "annuity",
    term: "Annuity",
    meaning:
      "A product you buy with a lump sum that then pays you a regular income, usually for the rest of your life. Commonly used at retirement.",
    example:
      "You use your retirement savings to buy an annuity that pays ₦250,000 every month for as long as you live.",
    related: ["life-insurance", "beneficiary"],
  },
  {
    id: "average-clause",
    term: "Average clause",
    aka: ["Condition of average", "Underinsurance clause"],
    meaning:
      "A rule that cuts your payout by the same proportion you were under-insured. If you insured a building for half its real value, the insurer pays half of any claim — even a small one. This catches more people than any other clause.",
    example:
      "Your factory is worth ₦100m but you insured it for ₦50m. A ₦10m fire occurs. Because you were 50% under-insured, the insurer pays ₦5m, not ₦10m.",
    related: ["sum-insured", "underinsurance", "reinstatement-value"],
  },
  {
    id: "beneficiary",
    term: "Beneficiary",
    meaning:
      "The person who receives the money from a life policy when the insured person dies. You choose them, and you can change them.",
    example:
      "You name your spouse as the beneficiary on your ₦20m life policy, so the payout goes directly to them without waiting on the estate.",
    related: ["life-insurance", "nominee", "policyholder"],
  },
  {
    id: "betterment",
    term: "Betterment",
    meaning:
      "When a repair leaves you better off than before the loss, the insurer may ask you to contribute the difference. Insurance restores your position; it does not upgrade it.",
    example:
      "A fire destroys a 10-year-old roof. The replacement is brand new, so the insurer asks you to contribute towards the improvement in value.",
    related: ["indemnity", "reinstatement-value", "depreciation"],
  },
  {
    id: "broker",
    term: "Broker",
    meaning:
      "An intermediary who works for you, not for an insurer. A broker compares cover across the market, advises on what suits you, arranges the policy and argues your corner at claim time.",
    example:
      "Rather than accepting the first motor quote you find, a broker checks several insurers, explains where the cover differs, and recommends one.",
    related: ["agent", "intermediary", "commission"],
  },
  {
    id: "business-interruption",
    term: "Business interruption",
    aka: ["Consequential loss", "BI"],
    meaning:
      "Cover for the money you stop earning while your business is closed after a loss. The fire policy rebuilds the building; this replaces the trade you lost while it was being rebuilt.",
    example:
      "A fire shuts your restaurant for four months. Property cover pays for the rebuild; business interruption cover replaces the four months of lost profit and keeps paying your staff.",
    related: ["indemnity-period", "fire-special-perils", "gross-profit"],
  },
  {
    id: "certificate-of-insurance",
    term: "Certificate of insurance",
    meaning:
      "A one-page document proving cover exists. Often demanded by landlords, banks and clients before they will deal with you.",
    example:
      "Before awarding a haulage contract, a manufacturer asks for a certificate of insurance showing your goods-in-transit cover is current.",
    related: ["policy-document", "additional-insured"],
  },
  {
    id: "claim",
    term: "Claim",
    meaning:
      "Your formal request to the insurer to pay for a loss the policy covers. It is the only moment the policy actually does anything.",
    example:
      "After a burglary you make a claim, supported by a police report and a list of what was taken.",
    related: ["adjuster", "excess", "proximate-cause"],
  },
  {
    id: "claims-history",
    term: "Claims history",
    aka: ["Loss history", "Claims experience"],
    meaning:
      "The record of claims you have made. Insurers use it to price your next policy — a clean history usually earns a discount.",
    example:
      "Three years without a motor claim earns you a no-claims discount at renewal.",
    related: ["no-claims-discount", "premium", "underwriting"],
  },
  {
    id: "co-insurance",
    term: "Co-insurance",
    meaning:
      "Two meanings. In commercial insurance, several insurers each take a share of one large risk. In health insurance, it is the percentage of a bill you pay yourself.",
    example:
      "A ₦5bn refinery risk is shared between four insurers, each taking 25%. Separately, a health plan with 10% co-insurance means you pay ₦10,000 of a ₦100,000 bill.",
    related: ["reinsurance", "excess", "health-insurance"],
  },
  {
    id: "commission",
    term: "Commission",
    meaning:
      "How brokers are usually paid — a percentage of the premium, paid by the insurer rather than billed to you. Worth asking any broker about, so you understand their incentives.",
    example:
      "On a ₦500,000 premium, the insurer pays the broker a percentage as commission. The client is not separately invoiced.",
    related: ["broker", "premium"],
  },
  {
    id: "comprehensive",
    term: "Comprehensive cover",
    meaning:
      "Motor insurance that covers damage to your own vehicle as well as damage you cause to others. The step up from third-party cover.",
    example:
      "You skid into a wall with nobody else involved. Comprehensive cover repairs your car; third-party cover would pay nothing.",
    related: ["third-party", "motor-insurance", "own-damage"],
  },
  {
    id: "contribution",
    term: "Contribution",
    meaning:
      "Where two policies cover the same loss, they share the cost between them rather than each paying in full. It is why being double-insured wastes money instead of doubling your payout.",
    example:
      "Your home contents and your business policy both cover the same laptop. They contribute proportionally; you cannot claim its full value twice.",
    related: ["indemnity", "double-insurance"],
  },
  {
    id: "cover-note",
    term: "Cover note",
    meaning:
      "Temporary written proof that cover has started while the full policy document is being prepared.",
    example:
      "You collect a new car on Friday and drive away on a cover note; the full motor policy arrives the following week.",
    related: ["policy-document", "certificate-of-insurance"],
  },
  {
    id: "declinature",
    term: "Declinature",
    aka: ["Declined claim", "Repudiation"],
    meaning:
      "The insurer's refusal to pay a claim. A declinature is not automatically the end — many are successfully challenged, especially with a broker arguing the point.",
    example:
      "A claim is declined for late notification. The broker demonstrates the delay caused the insurer no prejudice, and the decision is reversed.",
    related: ["claim", "non-disclosure", "broker"],
  },
  {
    id: "depreciation",
    term: "Depreciation",
    meaning:
      "The loss of value of an item through age and use. On an indemnity basis, insurers deduct it — you are paid what the item was worth, not what a new one costs.",
    example:
      "A five-year-old generator that cost ₦800,000 new might be valued at ₦350,000 at claim time, unless you bought new-for-old cover.",
    related: ["indemnity", "reinstatement-value", "betterment"],
  },
  {
    id: "double-insurance",
    term: "Double insurance",
    meaning:
      "Holding two policies covering the same thing. You do not get paid twice; you simply pay two premiums for one recovery.",
    example:
      "Your travel policy and your credit card both include travel medical cover. Only one meaningful recovery is available, but both premiums were paid.",
    related: ["contribution", "indemnity"],
  },
  {
    id: "employee-benefits",
    term: "Employee benefits",
    meaning:
      "Insurance an employer arranges for staff — typically health cover, group life and personal accident. Often the cheapest way for an individual to be covered.",
    example:
      "A company arranges an HMO plan and ₦5m group life cover for all 40 employees at a fraction of what each would pay individually.",
    related: ["group-life", "health-insurance", "personal-accident"],
  },
  {
    id: "endorsement",
    term: "Endorsement",
    meaning:
      "A written change to a policy after it has started. It becomes part of the contract, so it should always be read.",
    example:
      "You buy a new delivery van mid-year; an endorsement adds it to your existing fleet policy.",
    related: ["policy-document", "premium"],
  },
  {
    id: "excess",
    term: "Excess",
    aka: ["Deductible"],
    meaning:
      "The first part of any claim that you pay yourself. A higher excess lowers your premium — but you carry more of every loss.",
    example:
      "With a ₦50,000 excess and a ₦300,000 repair bill, the insurer pays ₦250,000 and you pay the rest.",
    related: ["premium", "claim", "franchise"],
  },
  {
    id: "exclusion",
    term: "Exclusion",
    meaning:
      "Something the policy specifically does not cover. Exclusions matter more than the headline cover — they are where most declined claims come from.",
    example:
      "A standard property policy excludes damage caused by wear and tear, so a roof that failed through age is not claimable.",
    related: ["all-risks", "named-perils", "declinature"],
  },
  {
    id: "fire-special-perils",
    term: "Fire & special perils",
    meaning:
      "The standard commercial property policy. Covers fire, lightning and explosion as a base, with named extras such as flood, storm, riot and impact added on.",
    example:
      "A flood damages your ground-floor stock. It is covered only if flood was added as a special peril — the base fire policy alone would not respond.",
    related: ["named-perils", "property-insurance", "business-interruption"],
  },
  {
    id: "franchise",
    term: "Franchise",
    meaning:
      "A threshold, not a deduction. Below it the insurer pays nothing; above it the insurer pays the whole claim. Different from an excess, which is always deducted.",
    example:
      "With a ₦100,000 franchise, a ₦90,000 claim pays nothing, but a ₦120,000 claim pays the full ₦120,000.",
    related: ["excess", "claim"],
  },
  {
    id: "goods-in-transit",
    term: "Goods-in-transit",
    aka: ["GIT"],
    meaning:
      "Cover for your goods while they are being moved. A property policy stops at the warehouse door; this covers what happens on the road.",
    example:
      "A truck carrying ₦8m of electronics overturns on the expressway. Goods-in-transit cover pays for the cargo; the motor policy only covers the truck.",
    related: ["marine-insurance", "motor-insurance", "property-insurance"],
  },
  {
    id: "grace-period",
    term: "Grace period",
    meaning:
      "A short window after a premium due date in which cover continues even though you have not paid. Not all policies have one — never assume.",
    example:
      "A life policy with a 30-day grace period stays in force if you pay on day 20 after the due date.",
    related: ["lapse", "premium", "renewal"],
  },
  {
    id: "gross-profit",
    term: "Gross profit (insurance definition)",
    meaning:
      "In a business interruption policy this is a specific calculation — turnover less specified variable costs — and it is usually not the same figure your accountant calls gross profit. Getting it wrong causes under-insurance.",
    example:
      "Your accounts show ₦40m gross profit, but the insurance definition produces ₦55m. Insuring for ₦40m leaves you under-insured by ₦15m.",
    related: ["business-interruption", "average-clause", "sum-insured"],
  },
  {
    id: "group-life",
    term: "Group life",
    meaning:
      "One life insurance policy covering a whole group of employees. Cheaper per person than individual cover, and usually requires no medical examination.",
    example:
      "An employer provides group life cover of three times annual salary for every member of staff.",
    related: ["life-insurance", "employee-benefits", "key-person"],
  },
  {
    id: "health-insurance",
    term: "Health insurance",
    aka: ["HMO cover", "Medical insurance"],
    meaning:
      "Cover for medical treatment. In Nigeria it is usually delivered through an HMO with a defined list of hospitals you can use.",
    example:
      "You attend a hospital on your HMO's provider list, present your card, and are treated without paying up front.",
    related: ["co-insurance", "provider-network", "pre-existing-condition"],
  },
  {
    id: "indemnity",
    term: "Indemnity",
    meaning:
      "The core principle of insurance: you are put back in the financial position you were in before the loss — no worse, and no better. It is why insurance is not a way to profit from misfortune.",
    example:
      "Your three-year-old phone is stolen. Indemnity pays what that phone was worth, not the price of the newest model.",
    related: ["depreciation", "betterment", "reinstatement-value"],
  },
  {
    id: "indemnity-period",
    term: "Indemnity period",
    meaning:
      "In business interruption cover, how long the policy keeps paying after a loss. Choosing too short a period is one of the most expensive mistakes in commercial insurance.",
    example:
      "You select a 12-month indemnity period, but rebuilding the factory takes 18. The last six months of lost profit are yours to absorb.",
    related: ["business-interruption", "gross-profit"],
  },
  {
    id: "insurable-interest",
    term: "Insurable interest",
    meaning:
      "You can only insure something you would actually lose out from. It is what separates insurance from gambling.",
    example:
      "You cannot insure your neighbour's car, because its destruction costs you nothing. You can insure your own.",
    related: ["policyholder", "indemnity"],
  },
  {
    id: "insured",
    term: "Insured",
    meaning:
      "The person or business the policy protects. Sometimes the same as the policyholder, sometimes not.",
    example:
      "A company is the policyholder on a group life scheme, while each employee is an insured person.",
    related: ["policyholder", "beneficiary", "additional-insured"],
  },
  {
    id: "insurer",
    term: "Insurer",
    aka: ["Underwriter", "Insurance company"],
    meaning:
      "The company that carries the risk and pays the claims. Your broker arranges the policy; the insurer is who the money actually comes from.",
    example:
      "Jedrick places your policy with an insurer registered with NAICOM, and that insurer pays your claim.",
    related: ["broker", "naicom", "reinsurance"],
  },
  {
    id: "intermediary",
    term: "Intermediary",
    meaning:
      "The umbrella term for anyone standing between you and an insurer — brokers and agents both. In Nigeria, intermediaries must be registered with NAICOM.",
    example:
      "Before dealing with any intermediary, you can ask for their NAICOM registration number.",
    related: ["broker", "agent", "naicom"],
  },
  {
    id: "key-person",
    term: "Key person insurance",
    meaning:
      "Cover that pays the business — not the family — if someone the business depends on dies or becomes unable to work. It buys time to reorganise.",
    example:
      "A firm insures its lead engineer for ₦50m, so it can survive the disruption and recruit a replacement if the worst happens.",
    related: ["life-insurance", "group-life", "business-interruption"],
  },
  {
    id: "lapse",
    term: "Lapse",
    meaning:
      "When a policy ends because the premium was not paid. Cover stops, usually with no refund, and restarting may require fresh underwriting.",
    example:
      "A life policy lapses after three missed monthly premiums, and reinstating it requires a new medical questionnaire.",
    related: ["grace-period", "premium", "renewal"],
  },
  {
    id: "liability",
    term: "Liability",
    meaning:
      "Legal responsibility for harm or loss suffered by someone else. Liability insurance pays what you become legally obliged to pay — plus the cost of defending you.",
    example:
      "A customer slips on a wet floor in your shop and sues. Liability cover pays the damages and the lawyers.",
    related: ["public-liability", "professional-indemnity", "third-party"],
  },
  {
    id: "life-insurance",
    term: "Life insurance",
    meaning:
      "Cover that pays a lump sum when the insured person dies. It is not really for you — it is for whoever depends on your income.",
    example:
      "A ₦20m life policy means your family can keep paying rent and school fees if your income stops permanently.",
    related: ["beneficiary", "term-life", "whole-life", "group-life"],
  },
  {
    id: "loss",
    term: "Loss",
    meaning:
      "The insurance word for the thing that went wrong — damage, theft, injury or financial harm. A 'total loss' means the item cannot economically be repaired.",
    example:
      "After a serious accident the assessor declares the vehicle a total loss and the insurer pays its value rather than repairing it.",
    related: ["claim", "adjuster", "salvage"],
  },
  {
    id: "marine-insurance",
    term: "Marine insurance",
    meaning:
      "Cover for goods moving by sea or air, and for the vessels themselves. Most Nigerian importers meet it as marine cargo cover.",
    example:
      "A container of machinery is damaged by seawater in transit from Shanghai. Marine cargo cover responds.",
    related: ["goods-in-transit", "bill-of-lading"],
  },
  {
    id: "material-fact",
    term: "Material fact",
    meaning:
      "Any information that would affect an insurer's decision to cover you or the price they charge. You must disclose these, whether or not you are asked directly.",
    example:
      "A previous fire at your premises is a material fact. Not mentioning it can void the policy entirely.",
    related: ["non-disclosure", "utmost-good-faith", "underwriting"],
  },
  {
    id: "motor-insurance",
    term: "Motor insurance",
    meaning:
      "Cover for vehicles. Third-party cover is the legal minimum in Nigeria; comprehensive adds damage to your own vehicle.",
    example:
      "Third-party cover pays for the car you hit. Comprehensive also repairs yours.",
    related: ["third-party", "comprehensive", "own-damage"],
  },
  {
    id: "naicom",
    term: "NAICOM",
    meaning:
      "The National Insurance Commission — the regulator for insurance in Nigeria. It licenses insurers and brokers, and you can verify any of them with it.",
    example:
      "Before placing your cover, check that both the broker and the insurer hold current NAICOM registration.",
    related: ["insurer", "broker", "intermediary"],
  },
  {
    id: "named-perils",
    term: "Named perils",
    meaning:
      "Cover that only responds to causes specifically listed in the policy. If it is not on the list, it is not covered.",
    example:
      "A named-perils policy lists fire, lightning and explosion. Flood damage is not covered unless flood was added by name.",
    related: ["all-risks", "fire-special-perils", "exclusion"],
  },
  {
    id: "no-claims-discount",
    term: "No-claims discount",
    aka: ["NCD", "No-claims bonus"],
    meaning:
      "A reduction in premium earned by not claiming. It is why claiming for a small amount can cost more over time than paying for it yourself.",
    example:
      "A ₦60,000 scratch repair claim wipes out a discount worth ₦120,000 over the following three years.",
    related: ["claims-history", "premium", "excess"],
  },
  {
    id: "non-disclosure",
    term: "Non-disclosure",
    meaning:
      "Failing to tell the insurer something material. It is the most common reason a policy is voided — and it is usually accidental rather than dishonest.",
    example:
      "You forget to mention that the building is partly used as a workshop. The insurer voids the policy after a fire.",
    related: ["material-fact", "utmost-good-faith", "declinature"],
  },
  {
    id: "own-damage",
    term: "Own damage",
    meaning:
      "The part of a motor policy that pays for damage to your own vehicle. Third-party cover does not include it.",
    example:
      "You reverse into a pillar in a car park. Only own-damage cover will repair the bumper.",
    related: ["comprehensive", "third-party", "motor-insurance"],
  },
  {
    id: "personal-accident",
    term: "Personal accident",
    meaning:
      "Cover paying a fixed sum for death or disability caused by an accident. It pays regardless of medical bills or lost income.",
    example:
      "An accident causing permanent loss of a hand triggers a set payout under the policy's benefit table.",
    related: ["life-insurance", "employee-benefits", "health-insurance"],
  },
  {
    id: "policy-document",
    term: "Policy document",
    aka: ["Policy wording", "Schedule"],
    meaning:
      "The actual contract. The schedule shows your specific details; the wording sets out what is and is not covered. If a broker cannot explain it in plain language, that is a warning sign.",
    example:
      "Your schedule lists a ₦25m sum insured; the wording explains the average clause that applies to it.",
    related: ["endorsement", "exclusion", "sum-insured"],
  },
  {
    id: "policyholder",
    term: "Policyholder",
    meaning:
      "The person or business that owns the policy, pays the premium and can change it.",
    example:
      "A company is the policyholder on a fleet policy, even though individual drivers are the ones covered.",
    related: ["insured", "beneficiary", "insurable-interest"],
  },
  {
    id: "pre-existing-condition",
    term: "Pre-existing condition",
    meaning:
      "A medical condition you already had before the health policy started. Often excluded at first, sometimes covered after a waiting period.",
    example:
      "A plan excludes treatment for diabetes diagnosed before the start date, but covers it after 12 months of continuous membership.",
    related: ["health-insurance", "waiting-period", "exclusion"],
  },
  {
    id: "premium",
    term: "Premium",
    meaning:
      "What you pay for the cover. It reflects how likely a claim is, how large it could be, and how much risk you have agreed to carry yourself.",
    example:
      "Raising your excess from ₦50,000 to ₦150,000 lowers the premium, because you now absorb more of any claim.",
    related: ["excess", "sum-insured", "underwriting", "no-claims-discount"],
  },
  {
    id: "professional-indemnity",
    term: "Professional indemnity",
    aka: ["PI", "Errors and omissions"],
    meaning:
      "Cover for claims that your professional advice or work caused someone a financial loss. Essential for anyone whose product is their judgement.",
    example:
      "An engineering firm's design specification proves faulty and the client sues for the cost of rectification.",
    related: ["liability", "public-liability", "additional-insured"],
  },
  {
    id: "property-insurance",
    term: "Property insurance",
    meaning:
      "Cover for buildings and their contents against physical damage. The foundation of most business and household insurance programmes.",
    example:
      "A burst pipe damages your office ceiling and furniture; property cover pays for the repairs and replacements.",
    related: ["fire-special-perils", "sum-insured", "reinstatement-value"],
  },
  {
    id: "proximate-cause",
    term: "Proximate cause",
    meaning:
      "The dominant reason a loss happened. Insurers pay based on this, not on the last thing that occurred in the chain of events.",
    example:
      "A fire is put out with water that damages stock. The proximate cause is the fire, so the water damage is covered too.",
    related: ["claim", "exclusion", "named-perils"],
  },
  {
    id: "public-liability",
    term: "Public liability",
    meaning:
      "Cover for injury or damage your business causes to members of the public or their property.",
    example:
      "A signboard falls from your shopfront and injures a passer-by. Public liability cover pays the damages and legal costs.",
    related: ["liability", "professional-indemnity", "third-party"],
  },
  {
    id: "reinstatement-value",
    term: "Reinstatement value",
    aka: ["New for old", "Replacement cost"],
    meaning:
      "Cover based on what it costs to rebuild or replace new today, with no deduction for age. More expensive than indemnity cover — and usually worth it.",
    example:
      "A 12-year-old roof destroyed by storm is replaced with a new one at no cost to you, rather than being paid at depreciated value.",
    related: ["indemnity", "depreciation", "betterment", "sum-insured"],
  },
  {
    id: "reinsurance",
    term: "Reinsurance",
    meaning:
      "Insurance bought by insurers, so that one very large loss does not sink them. It is why a single insurer can cover a refinery.",
    example:
      "An insurer covering a ₦20bn plant passes most of that exposure to international reinsurers.",
    related: ["insurer", "co-insurance"],
  },
  {
    id: "renewal",
    term: "Renewal",
    meaning:
      "The point each year at which the policy ends and must be re-agreed. The best moment to review cover, re-check sums insured and test the market.",
    example:
      "At renewal your broker re-quotes across several insurers rather than accepting the existing one's increase.",
    related: ["premium", "lapse", "broker"],
  },
  {
    id: "rider",
    term: "Rider",
    aka: ["Add-on", "Extension"],
    meaning:
      "An optional extra bolted onto a policy for an additional premium.",
    example:
      "A critical illness rider is added to a life policy, paying out on diagnosis rather than only on death.",
    related: ["endorsement", "policy-document"],
  },
  {
    id: "salvage",
    term: "Salvage",
    meaning:
      "What remains of damaged property after a claim is paid. Once the insurer has paid in full, the remains usually belong to them.",
    example:
      "After a written-off vehicle is paid out, the insurer takes and sells the wreck as salvage.",
    related: ["loss", "subrogation", "indemnity"],
  },
  {
    id: "subrogation",
    term: "Subrogation",
    meaning:
      "After paying your claim, the insurer takes over your right to recover from whoever caused the loss. It happens in the background and costs you nothing.",
    example:
      "Your insurer repairs your car after another driver hit you, then pursues that driver's insurer to recover the money.",
    related: ["claim", "indemnity", "third-party"],
  },
  {
    id: "sum-insured",
    term: "Sum insured",
    aka: ["Limit of indemnity"],
    meaning:
      "The maximum the policy will pay. Setting it correctly is the single most important number in your policy — too low and the average clause bites, too high and you overpay.",
    example:
      "Insuring a warehouse for ₦80m when rebuilding costs ₦120m leaves you badly exposed on every claim, not just a total loss.",
    related: ["average-clause", "underinsurance", "reinstatement-value"],
  },
  {
    id: "surrender-value",
    term: "Surrender value",
    meaning:
      "The cash you get back if you cancel a savings-type life policy early. Usually far less than you have paid in during the first years.",
    example:
      "Cancelling an endowment policy after three years returns a surrender value well below the total premiums paid.",
    related: ["whole-life", "life-insurance", "lapse"],
  },
  {
    id: "term-life",
    term: "Term life",
    meaning:
      "Life cover for a fixed number of years, with no savings element. The cheapest way to buy a large amount of protection.",
    example:
      "A 20-year term policy for ₦30m costs a fraction of a whole-life policy for the same sum, because it builds no cash value.",
    related: ["life-insurance", "whole-life", "beneficiary"],
  },
  {
    id: "third-party",
    term: "Third party",
    meaning:
      "Anyone other than you and your insurer — typically the other person in an accident. Third-party cover pays for the harm you cause them, and nothing for you.",
    example:
      "Third-party motor cover repairs the car you hit but leaves your own repairs entirely to you.",
    related: ["comprehensive", "liability", "own-damage"],
  },
  {
    id: "underinsurance",
    term: "Under-insurance",
    meaning:
      "Insuring for less than the true value. It is the most common and most expensive mistake in insurance, and it usually only comes to light at claim time.",
    example:
      "Sums insured set five years ago no longer reflect today's rebuild costs, so every claim is scaled down by the average clause.",
    related: ["average-clause", "sum-insured", "reinstatement-value"],
  },
  {
    id: "underwriting",
    term: "Underwriting",
    meaning:
      "The insurer's process of deciding whether to cover you, on what terms and at what price.",
    example:
      "Underwriting a factory may involve a physical survey of the fire protection before terms are offered.",
    related: ["premium", "material-fact", "insurer"],
  },
  {
    id: "utmost-good-faith",
    term: "Utmost good faith",
    aka: ["Uberrimae fidei"],
    meaning:
      "The legal duty on both sides to be completely honest. You must disclose everything material; the insurer must deal with you fairly.",
    example:
      "Answering a proposal form carelessly rather than dishonestly can still breach this duty and void the policy.",
    related: ["material-fact", "non-disclosure", "declinature"],
  },
  {
    id: "waiting-period",
    term: "Waiting period",
    meaning:
      "A stretch of time at the start of a policy during which certain benefits are not yet available.",
    example:
      "A health plan applies a 60-day waiting period before maternity benefits can be used.",
    related: ["pre-existing-condition", "health-insurance", "grace-period"],
  },
  {
    id: "whole-life",
    term: "Whole life",
    meaning:
      "Life cover that lasts your whole life and builds a cash value. More expensive than term cover, because it is part protection and part savings.",
    example:
      "A whole-life policy pays out whenever death occurs, and can be surrendered for cash during your lifetime.",
    related: ["term-life", "surrender-value", "life-insurance"],
  },
  {
    id: "write-off",
    term: "Write-off",
    aka: ["Total loss", "Constructive total loss"],
    meaning:
      "When repairing something costs more than it is worth, so the insurer pays its value instead of fixing it.",
    example:
      "Repairs are quoted at ₦2.4m on a vehicle worth ₦2m. It is written off and you are paid ₦2m less any excess.",
    related: ["loss", "salvage", "indemnity"],
  },
  {
    id: "bill-of-lading",
    term: "Bill of lading",
    meaning:
      "The shipping document that acts as receipt, contract of carriage and proof of ownership. Essential to any marine cargo claim.",
    example:
      "A cargo claim stalls because the bill of lading was signed clean, without noting the damage visible at delivery.",
    related: ["marine-insurance", "goods-in-transit", "claim"],
  },
  {
    id: "provider-network",
    term: "Provider network",
    aka: ["Panel hospitals"],
    meaning:
      "The hospitals and clinics your health plan has arranged to treat you without payment up front. Going outside it usually means paying and claiming back — if it is covered at all.",
    example:
      "Checking the provider list before an appointment avoids paying ₦180,000 out of pocket at a hospital that is not on it.",
    related: ["health-insurance", "co-insurance", "waiting-period"],
  },
  {
    id: "nominee",
    term: "Nominee",
    meaning:
      "The person named to receive a policy payout. Keeping the nomination current matters — after a marriage, a birth, or a death, an out-of-date one causes real problems.",
    example:
      "A policy still naming a parent from ten years ago delays payment to the spouse who actually depends on it.",
    related: ["beneficiary", "life-insurance", "policyholder"],
  },
  {
    id: "engineering-insurance",
    term: "Engineering insurance",
    meaning:
      "Cover for machinery, plant and construction works — including breakdown, which a standard fire policy never covers.",
    example:
      "A generator's alternator fails from an internal fault. Fire cover pays nothing; machinery breakdown cover does.",
    related: ["property-insurance", "business-interruption", "fire-special-perils"],
  },
  {
    id: "travel-insurance",
    term: "Travel insurance",
    meaning:
      "Cover for medical treatment, cancellation, delay and lost baggage while travelling. Often also a visa requirement.",
    example:
      "Emergency treatment abroad is billed at local rates in local currency up front; travel cover is what stops that becoming your problem.",
    related: ["health-insurance", "personal-accident"],
  },
  {
    id: "aviation-insurance",
    term: "Aviation insurance",
    meaning:
      "Cover for aircraft, their operation and the liabilities that come with them. Highly specialised and placed with a small number of insurers.",
    example:
      "An operator insures hull damage plus passenger and third-party liability under one aviation programme.",
    related: ["liability", "insurer", "reinsurance"],
  },
  {
    id: "oil-gas-insurance",
    term: "Oil & gas insurance",
    meaning:
      "Energy-sector cover for property, control of well, and the very large liabilities the industry carries. Usually placed as a structured programme rather than a single policy.",
    example:
      "An operator arranges offshore property, control of well and third-party liability cover as one coordinated programme.",
    related: ["liability", "reinsurance", "engineering-insurance"],
  },
];

/** Ordered A–Z, since that is how a dictionary is read. */
export const DICTIONARY_SORTED = [...DICTIONARY].sort((a, b) =>
  a.term.localeCompare(b.term),
);

export const DICTIONARY_LETTERS = Array.from(
  new Set(DICTIONARY_SORTED.map((t) => t.term[0].toUpperCase())),
).sort();

export function findTerm(id: string) {
  return DICTIONARY.find((t) => t.id === id);
}
