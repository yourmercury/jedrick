/**
 * Single source of truth for Jedrick's site content.
 *
 * Everything here is drawn from the client documents:
 *  - "Jedrick Insurance Brokers Website Brief" (services, pages, features, goals)
 *  - "Jedrick Insurance Brokers – Risk Assessment" (the Know Your Risk flow)
 *  - "Jedrick Brand Guideline, Sept 2025" (tagline, colour, tone)
 *  - Jedrick company profile (story, mission, vision, values, use cases, contact)
 *
 * Keeping copy here means pages stay presentational and a CMS can be dropped
 * in later without rewriting components.
 */

import { INDUSTRIES } from "@/content/industries";
import { GROUPS, PRODUCTS_BY_GROUP } from "@/content/insurance";

/**
 * Canonical origin, resolved at build time.
 *
 * Order matters: an explicit NEXT_PUBLIC_SITE_URL always wins. Netlify sets
 * URL to the site's primary address and DEPLOY_PRIME_URL to the branch or
 * preview address, so previews get their own canonical rather than claiming to
 * be production. Falls back to localhost for local development.
 */
function resolveSiteUrl() {
  const candidate =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.DEPLOY_PRIME_URL ||
    process.env.URL ||
    "http://localhost:3000";
  return candidate.replace(/\/+$/, "");
}

export const site = {
  name: "Jedrick Insurance Brokers",
  shortName: "Jedrick",
  tagline: "Insurance Simplified, Security Amplified.",
  positioning:
    "Your trusted insurance advisor, risk management partner, and claims advocate.",
  description:
    "Jedrick is an independent insurance broker in Lagos. We compare cover across insurers, explain it in plain language, and stand with you when it is time to claim.",
  url: resolveSiteUrl(),
} as const;

export const contact = {
  address: "138 Ogunlana Dr, Surulere, Lagos 101241, Nigeria",
  phone: "+234 916 748 2363",
  phoneHref: "tel:+2349167482363",
  whatsappHref: "https://wa.me/2349167482363",
  hours: "Available 9am – 5pm, Monday to Friday",
  email: "jedrick360comms@gmail.com",
  emailHref: "mailto:jedrick360comms@gmail.com",
  links: "https://linktr.ee/jedrickinsure360",
} as const;

/* -------------------------------------------------------------------------- */
/* Navigation — the 11 pages requested in the brief                            */
/* -------------------------------------------------------------------------- */

export type NavItem = {
  label: string;
  href: string;
  description?: string;
  children?: NavItem[];
};

export const nav: NavItem[] = [
  {
    label: "Insurance Solutions",
    href: "/insurance",
    description: "Cover for people, property, business and specialist risk.",
    children: [
      {
        label: "Personal & Family",
        href: "/insurance/personal",
        description: "Health, life, motor, travel, home and personal accident.",
      },
      {
        label: "Business & Commercial",
        href: "/insurance/business",
        description: "Property, liability, goods-in-transit and employee benefits.",
      },
      {
        label: "Specialist & Corporate",
        href: "/insurance/specialist",
        description: "Marine, engineering, oil & gas, aviation and bespoke risk.",
      },
      {
        label: "Industries We Serve",
        href: "/industries",
        description: "Tailored programmes by sector, from SMEs to enterprise.",
      },
    ],
  },
  {
    label: "Risk Advisory",
    href: "/risk-advisory",
    description: "Understand your risk before you buy cover.",
    children: [
      {
        label: "Know Your Risk",
        href: "/risk-assessment",
        description: "A 2-minute risk check. No insurance jargon.",
      },
      {
        label: "Free Policy Health Check",
        href: "/policy-review",
        description: "Send us your current policy. We will find the gaps.",
      },
      {
        label: "Risk Advisory Hub",
        href: "/risk-advisory",
        description: "Insight and guidance on managing risk before losses occur.",
      },
    ],
  },
  {
    label: "Claims Support",
    href: "/claims",
    description: "We handle the claim with you, not just the policy.",
  },
  {
    label: "Learning Centre",
    href: "/learn",
    description: "Insurance explained in everyday language.",
    children: [
      {
        label: "Guides & Explainers",
        href: "/learn",
        description: "Articles, videos and practical guides.",
      },
      {
        label: "Insurance Dictionary",
        href: "/learn/dictionary",
        description: "Plain-English meanings for the jargon.",
      },
      {
        label: "Resources",
        href: "/resources",
        description: "Checklists, downloads and tools.",
      },
    ],
  },
  {
    label: "About",
    href: "/about",
    description: "Who we are and why we started Jedrick.",
    children: [
      {
        label: "About Us",
        href: "/about",
        description: "Our story, mission, vision and values.",
      },
      {
        label: "Success Stories",
        href: "/success-stories",
        description: "Real clients, real claims, real outcomes.",
      },
    ],
  },
];

/* -------------------------------------------------------------------------- */
/* What makes Jedrick different — brief, section 2                            */
/* -------------------------------------------------------------------------- */

export const differentiators = [
  {
    title: "Independent Advice",
    body: "We are a broker, not an insurance company. We compare options across multiple insurers and recommend what genuinely suits you — because we represent your interests, not one insurer's.",
    href: "/about",
    icon: "compass",
  },
  {
    title: "Insurance Made Simple",
    body: "Complex cover, broken down into practical, everyday language. If a policy cannot be explained clearly, you should not be asked to sign it.",
    href: "/learn",
    icon: "book",
  },
  {
    title: "Claims Advocacy",
    body: "Most brokers go quiet after the sale. We stay. We guide you through the claims process and push for a fair, timely settlement when it matters most.",
    href: "/claims",
    icon: "shield",
  },
  {
    title: "Risk Advisory Approach",
    body: "Before we talk cover, we help you identify and manage the risks you actually carry — so losses are prevented, not just reimbursed.",
    href: "/risk-advisory",
    icon: "chart",
  },
] as const;

/* -------------------------------------------------------------------------- */
/* The 18 insurance lines from the brief, grouped for navigability            */
/* -------------------------------------------------------------------------- */

/**
 * Derived from the product catalogue so the home page can never advertise a
 * line that no longer has a page behind it.
 */
export const solutionGroups = GROUPS.map((group) => ({
  id: group.id,
  label: group.label,
  href: `/insurance/${group.id}`,
  intro: group.tagline,
  items: PRODUCTS_BY_GROUP(group.id).map((p) => p.name),
}));

/* -------------------------------------------------------------------------- */
/* Industries — brief, "Industries We Serve"                                  */
/* -------------------------------------------------------------------------- */

/**
 * Derived from the industry guides so the chips on the home page and the pages
 * they link to can never drift apart.
 */
export const industries = INDUSTRIES.map((i) => ({
  label: i.short,
  href: `/industries/${i.slug}`,
}));

/* -------------------------------------------------------------------------- */
/* Success stories — the three use cases from the company profile             */
/* -------------------------------------------------------------------------- */

export const successStories = [
  {
    name: "Chinedu Okafor",
    role: "Fleet Manager, Logistics Company",
    location: "Ojota, Lagos",
    problem:
      "Chinedu managed multiple delivery vehicles, but claims processing was slow and unclear. Previous brokers disappeared once policies were sold, leaving him stranded during accidents and breakdowns.",
    outcome:
      "Jedrick became his active advocate — reviewing the fleet policy, negotiating better terms with insurers, and standing by him through every claim.",
    line: "Motor & Fleet",
  },
  {
    name: "Kemi Adeyemi",
    role: "Young Professional, First-Time Car Owner",
    location: "Ibadan",
    problem:
      "Kemi felt overwhelmed buying car insurance for the first time. She did not understand the difference between third-party and comprehensive cover, and feared making the wrong decision.",
    outcome:
      "Jedrick explained every option in plain terms, walked through real-life scenarios, and recommended cover that matched her lifestyle and budget.",
    line: "Motor Insurance",
  },
  {
    name: "Olufemi & Sade Williams",
    role: "Growing Family",
    location: "Magodo, Lagos",
    problem:
      "The couple wanted life and health insurance but were confused by exclusions, fine print and conflicting advice from different providers.",
    outcome:
      "Jedrick acted as their guide — breaking down the policies, aligning cover with their family goals, and making sure they knew exactly what they were protected against.",
    line: "Life & Health",
  },
] as const;

/* -------------------------------------------------------------------------- */
/* Core values — T.E.R.C.A. from the company profile                          */
/* -------------------------------------------------------------------------- */

export const coreValues = [
  {
    letter: "T",
    title: "Trust",
    body: "Internally and externally, trust drives how we communicate, operate and lead.",
  },
  {
    letter: "E",
    title: "Empathy",
    body: "We value human experience and emotional intelligence, in team dynamics and client relations alike.",
  },
  {
    letter: "R",
    title: "Responsibility",
    body: "We are accountable, proactive and dedicated to our commitments.",
  },
  {
    letter: "C",
    title: "Clarity",
    body: "We prioritise transparency, precision and education — everyone understands the why behind what we do.",
  },
  {
    letter: "A",
    title: "Advocacy",
    body: "We fight for the best outcomes for our clients, our team and our industry.",
  },
] as const;

export const mission =
  "We simplify insurance by offering honest advice, clear education and dependable service — bridging the gap between insurance providers and policyholders, and always putting people's wellbeing and understanding first.";

export const vision =
  "To become the world's most trusted insurance ally, bridging the gap between people and providers through clarity, protection and expert guidance.";

/* -------------------------------------------------------------------------- */
/* The three-step promise that closes the Risk Assessment document            */
/* -------------------------------------------------------------------------- */

export const journey = [
  {
    step: "01",
    title: "Know Your Risk",
    body: "Answer a few plain-language questions. Two minutes, no jargon, no obligation.",
  },
  {
    step: "02",
    title: "Understand Your Options",
    body: "We show you what you are actually exposed to, and the cover that would answer it.",
  },
  {
    step: "03",
    title: "Talk to a Broker",
    body: "A free consultation — online or in person — with someone who works for you.",
  },
] as const;
