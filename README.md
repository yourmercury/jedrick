# Jedrick Insurance Brokers — Website

Next.js 16 (App Router) + TypeScript + Tailwind v4.

```bash
npm run dev     # dev server
npm run build   # production build
npm run lint
```

## Where the content comes from

Everything on the site traces back to the four client documents in the parent
folder. No copy was invented about the business itself:

| Document | Used for |
| --- | --- |
| `Document from Merc Tech.docx` | Website brief — services, page list, goals, special features |
| `Document from Merc Tech(1).docx` | Risk Assessment flow — the "Know Your Risk" tool spec |
| `Document from Merc Tech.pdf` | Brand guideline (Sept 2025) — logo, colour, ratio, typography |
| `Document from Merc Tech(1).pdf` | Company profile — story, mission, vision, T.E.R.C.A. values, personas, contact |

Site-wide copy lives in [`src/lib/site.ts`](src/lib/site.ts) and page content in
[`src/content/`](src/content/), so pages stay presentational and a CMS can be
introduced later without touching components.

## Brand implementation

**Colour** — tokens in [`src/app/globals.css`](src/app/globals.css) under
`@theme`. Primary navy `#1E3A8A`, blue `#2563EB`, orange `#F97316`; secondary
gray `#CCCCCC`, charcoal ink `#374151`. The guideline mandates a **60% navy /
20% orange / 20% white** ratio, which is why the page alternates full navy
fields (hero, risk journey, claims, final CTA, footer) with white and `mist`
sections, and keeps orange to accents and actions only.

Shades beyond the palette (`navy-deep`, `navy-ink`, `mist`) are derived
extensions — needed so navy can carry large surfaces without going flat.

**Logo** — the SVGs in `public/brand/` are the real vector artwork, extracted
from the guideline PDF rather than redrawn:

| File | Guideline reference |
| --- | --- |
| `logo-primary.svg` | Primary horizontal lockup (p.4) |
| `logo-stacked.svg` | Secondary stacked lockup (p.7) |
| `logo-stacked-navy.svg` | On-navy variation (p.8) — used in the footer |
| `logo-icon.svg` | Logo icon (p.5) |
| `logo-icon-mono.svg` | Flat white mark — watermarks only |

Use them through [`src/components/ui/Logo.tsx`](src/components/ui/Logo.tsx),
which carries the correct aspect ratio per variant.

> **Note:** the logo artwork itself uses `#24387b` / `#f36e21`, which differ
> slightly from the `#1E3A8A` / `#F97316` printed on the palette page of the
> same document. The logo files are left exactly as the designer drew them; UI
> colour follows the documented palette. Worth confirming which is canonical.

**Typography** — the guideline specifies **Schrifted Sans** (Gotham secondary).
Both are licensed and not in the repo, so the closest open equivalents are used:
Outfit for display, Plus Jakarta Sans for body.

To swap in the real fonts: drop the woff2 files into `src/app/fonts/`, replace
the two `next/font/google` loaders in
[`src/app/layout.tsx`](src/app/layout.tsx) with `next/font/local`, and keep the
`--font-display` / `--font-sans` variable names. Nothing else changes.

## What is built

**Home page** — ten sections in `src/components/home/`, ordered to serve the
brief's primary goal (lead generation) while carrying trust, education and
support:

1. `Hero` — broker-not-insurer positioning + risk-check entry point
2. `Difference` — the four differentiators from the brief
3. `Solutions` — all 18 classes of cover, grouped by what is being protected
4. `RiskJourney` — Know Your Risk → Understand Your Options → Talk to a Broker
5. `PolicyCheck` — the free policy health check
6. `Claims` — claims advocacy
7. `Stories` — the three client personas from the company profile
8. `Industries` — sectors served
9. `LearningCentre` — education hub teaser
10. `ConsultationCta` — booking + real contact details

**Layout** — sticky header with dropdown navigation and a contact utility strip;
footer organised by user intent rather than mirroring the header taxonomy.
Desktop navigation switches to a full-screen mobile panel below `xl`.

**Routes** — 58 in total. All 11 pages from the brief are built, plus 18 product
pages, 10 industry guides, 8 articles, 3 case studies and 2 API endpoints. There
are no placeholders left.

## Forms and lead delivery

Four forms, all reaching a broker through one pipeline:

| Form | Route | Endpoint |
| --- | --- | --- |
| Know Your Risk | `/risk-assessment` | `POST /api/leads` |
| Consultation booking | `/contact` | `POST /api/leads` |
| Claim notification | `/claims` | `POST /api/leads` |
| Policy health check | `/policy-review` | `POST /api/policy-review` |

**Configuration is in `.env.local`** — copy `.env.example` and fill it in. Two
independent channels, either or both:

- **Email** via Resend (`RESEND_API_KEY`, `LEAD_TO_EMAIL`, `LEAD_FROM_EMAIL`)
- **Webhook** (`LEAD_WEBHOOK_URL`) — generic JSON POST for a CRM, Zapier or a
  Google Sheet

With neither configured, development prints the lead to the terminal so the
flows can be exercised, and **production refuses the submission**. That is
deliberate: a lead accepted and silently dropped is worse than one refused,
because nobody finds out.

Server-side validation lives in `src/lib/leads/schema.ts` (zod) and is the copy
that decides — the browser rules exist only for fast feedback and can be edited
away. Also included: a honeypot that returns success so bots learn nothing, and
fixed-window rate limiting at 6 submissions per 10 minutes per IP.

Uploaded policy documents are forwarded as email attachments and are **never
written to disk or to a third-party store**. Limits are env-driven
(`POLICY_UPLOAD_MAX_MB`, `POLICY_UPLOAD_MAX_FILES`).

## Know Your Risk (`/risk-assessment`)

The full seven-section flow from the Risk Assessment document, as a seven-step
wizard in `src/components/risk/`. Only two things are required: the segment in
step 1 (it drives the branching) and, at the end, a name plus one way to reach
you — the source document is explicit that not every question should be
mandatory.

### The snapshot engine

[`src/lib/risk-engine.ts`](src/lib/risk-engine.ts) is a pure, rules-based scorer
— no AI, no API call. Jedrick gives regulated advice, so every line a visitor
sees traces to a rule someone at the firm can read and defend.

Sixteen risk areas are scored, and the top 2–3 shown. Each thing you chose to
protect adds 2; your stated concern adds 3 to the area it points at most
directly and 1.5 to areas it merely implies. **That split matters** — without
it, an area the visitor never mentioned can outrank one they explicitly chose,
which reads as not having listened.

## Content

Content lives in `src/content/` as typed data, not MDX or a CMS:

| File | Contains |
| --- | --- |
| `insurance.ts` | 18 products across 3 groups |
| `dictionary.ts` | 84 terms, each with meaning + example |
| `articles.ts` | 8 Learning Centre articles as typed blocks |
| `industries.ts` | 10 sector guides |
| `claims.ts` | 11 claim types, first-response steps, checklists |
| `stories.ts` | 3 client case studies |
| `resources.ts` | 6 checklists |

**Why not MDX or a CMS?** It is typed, so a malformed entry fails the build
rather than the page; there is no build config or third-party service to keep
running; and the shape is deliberately CMS-like, so moving to Sanity or
Contentful later means writing an adapter, not rewriting templates. The honest
trade-off: only a developer can add content today. If Jedrick's team needs to
publish without one, that is the trigger to move to a CMS.

Product pages lead with **what the policy does not cover**. That is unusual and
deliberate — exclusions are where declined claims come from, and a page that
only lists benefits is the thing this site is meant to be an alternative to.

### Content integrity

The content files reference each other by id. A broken reference does not crash
anything — it silently renders one fewer link, which is the kind of rot nobody
notices for months. `scripts/check-content.mjs` validates every cross-reference
and **runs as part of `npm run build`**, so it cannot rot silently.

```bash
npm run check:content
```

It currently validates 320 cross-references across terms, products, articles and
industry cover lines.

## Suggested next steps

1. **Wire up submissions** — one route handler, and both the risk check and the
   contact form become real. Currently the only thing between this and working
   lead capture.
2. **Policy Health Check upload** (`/policy-review`) — file upload plus secure
   storage and notification.
4. Learning Centre content model (MDX or headless CMS) and the Insurance
   Dictionary.
5. Real photography — the guideline's "logo on image" rules are implemented but
   there are no photographic assets in the source documents yet.

## Known gaps

- No form backend — see "Submission" above.
- Placeholder article titles in `LearningCentre` are illustrative.
- `site.url` in `src/lib/site.ts` is a guess; set the real domain before launch.
