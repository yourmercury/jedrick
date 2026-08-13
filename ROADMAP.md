# Jedrick Website — Roadmap to Launch

Status of the brief's deliverables, and everything left to build.

> **Phases 1–3 are complete.** All 11 pages from the brief and all 8 special
> features are built (58 routes). What remains is Phase 4 (launch readiness)
> and Phase 5 (assets only Jedrick can supply). See "Still outstanding" below.

## Done

All 11 pages from the brief and all 8 special features. 58 routes.

| Brief deliverable | Status |
| --- | --- |
| Home | ✅ |
| About Us | ✅ |
| Insurance Solutions (18 products) | ✅ |
| Claims Support | ✅ |
| Risk Advisory Hub | ✅ |
| Learning Centre | ✅ |
| Policy Review Service | ✅ |
| Industries We Serve (10 sectors) | ✅ |
| Success Stories | ✅ |
| Resources | ✅ |
| Contact / Consultation Booking | ✅ |

| Special feature | Status |
| --- | --- |
| Free Policy Health Check | ✅ |
| Risk Assessment Tool | ✅ |
| Insurance Learning Centre | ✅ |
| Claims Assistance Portal | ✅ |
| Industry-Specific Guides | ✅ |
| Consultation Booking System | ✅ |
| Insurance Dictionary | ✅ |
| Real Claims Success Stories | ✅ |

---

## Phases 1–3 — COMPLETE

### Phase 1 — Lead submission `DONE`
- [x] `POST /api/leads` and `POST /api/policy-review`, with server-side
      validation (zod) that does not trust the browser copy of the rules
- [x] Two delivery channels, both env-driven: Resend email and a generic
      webhook. Either, both, or neither.
- [x] Honeypot field, returning success so bots learn nothing
- [x] Fixed-window rate limiting, 6 submissions per 10 minutes per IP
- [x] No silent loss: with no channel configured, development prints the lead
      and **production refuses the submission** rather than faking success
- [x] `.env.example` documenting every variable

### Phase 2 — Special features `DONE`
- [x] **2.1 Policy Health Check** — drag-and-drop upload, type and size limits,
      documents forwarded as email attachments and never written to disk
- [x] **2.2 Claims Portal** — 11 claim types, first-response steps surfaced the
      moment a type is picked, document checklists, escalation route, and a
      phone number given equal weight to the form
- [x] **2.3 Insurance Dictionary** — 84 terms, each with a plain-English meaning
      and a concrete example; search covers meanings, so describing a concept
      finds the term
- [x] **2.4 Learning Centre** — 8 full articles, categories, body-text search,
      typed block renderer
- [x] **2.5 Success Stories** — 3 case studies, situation → exposure → what we
      did → outcome
- [x] **2.6 Resources** — 6 checklists plus working sum-insured and business
      interruption calculators
- [x] **2.7 Industry guides** — 10 sector pages with real exposures and the
      gaps we find in that sector's policies

### Phase 3 — Product and company pages `DONE`
- [x] Insurance hub, 3 group pages, **18 product pages** — each with what it
      covers, **what it does not**, who it suits, and a broker's note
- [x] About Us — story, mission, vision, T.E.R.C.A. values
- [x] Risk Advisory Hub — the four-step risk ladder and advisory services

## Phase 4 — Production readiness

- [ ] `sitemap.xml`, `robots.txt`
- [ ] JSON-LD structured data (`InsuranceAgency` / `LocalBusiness`) — matters
      for local search in Lagos
- [ ] Per-page metadata review; Open Graph images
- [ ] Analytics with conversion tracking on both forms
- [ ] **Privacy policy** — required, and non-optional once you accept uploaded
      policy documents
- [ ] Terms of use; cookie notice if analytics sets cookies
- [ ] Regulatory disclosure (NAICOM registration, broker licence number)
- [ ] Accessibility audit to WCAG AA — keyboard and screen reader pass
- [ ] Custom 404 and error pages
- [ ] Performance pass: image optimisation, LCP, Lighthouse
- [ ] Deployment: domain, hosting, environment secrets, form credentials

**Size:** M. The legal items are not optional and are easy to leave too late.

---

## Phase 5 — Assets and content `NEEDS JEDRICK`

Things I cannot produce, listed so they do not surprise you at the end:

- [ ] **Licensed fonts** — Schrifted Sans and Gotham. Currently substituted with
      Outfit and Plus Jakarta Sans. Biggest single fidelity gain available.
- [ ] **Resolve the logo colour discrepancy** — artwork uses `#24387b`/`#f36e21`,
      the palette page says `#1E3A8A`/`#F97316`
- [ ] **Photography** — no image assets exist in the source documents. The
      guideline's "logo on image" rules are implemented and unused.
- [ ] Leadership bios and headshots
- [ ] Real client stories, with permission
- [ ] Article and dictionary copy
- [ ] Set the real domain in `src/lib/site.ts`
- [ ] Decide whether non-technical staff need to edit content → CMS

---

## Still outstanding

**Phase 4** above is the launch checklist. Within it, three items block a
public launch rather than merely improving it:

1. **Privacy policy** — you now accept uploaded policy documents. This is no
   longer optional.
2. **NAICOM registration disclosure** — regulatory requirement, and it also
   supports the trust positioning.
3. **Delivery configured** — fill in `.env.local`. Until then production
   refuses submissions by design.

**Phase 5** is the asset list only Jedrick can supply. Photography is the
largest visual gap: there are no image assets anywhere in the four source
documents, and the guideline's "logo on image" rules are implemented but unused.
