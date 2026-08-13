# Deploying to Netlify

The site is configured and ready. This is the whole process.

---

## 1. Push the repository

The git repository root is this `web/` directory, so Netlify needs no base
directory. Push it to GitHub, GitLab or Bitbucket.

If the repo is ever restructured so `web/` sits inside a larger repo, set
`base = "web"` in `netlify.toml`.

## 2. Create the Netlify site

**Add new site → Import an existing project**, then pick the repository.

Netlify detects Next.js and reads `netlify.toml`, so the build settings are
already correct:

| Setting | Value | Source |
| --- | --- | --- |
| Build command | `npm run build` | `netlify.toml` |
| Publish directory | `.next` | `netlify.toml` |
| Node version | 22 | `netlify.toml` + `.nvmrc` |

Do **not** install `@netlify/plugin-nextjs` yourself. Netlify installs and
updates the Next.js runtime automatically, and pinning it manually causes
version conflicts. Next.js 16 needs no adapter configuration.

## 3. Set the environment variables

**Site configuration → Environment variables.** Values are in
[`.env.example`](.env.example), which documents every one.

### Required before launch

Without a delivery channel, **production refuses submissions** rather than
showing a visitor a false confirmation. So at minimum, configure one of:

**Email (Resend)** — all three, or email is skipped:

| Variable | Notes |
| --- | --- |
| `RESEND_API_KEY` | From resend.com, starts with `re_` |
| `LEAD_TO_EMAIL` | Who receives leads. Comma-separate for several. |
| `LEAD_FROM_EMAIL` | Must be on a domain verified in Resend. A gmail.com address will be rejected. |

Verify the jedrick domain in Resend before launch — until you do, delivery is
restricted and notifications are likely to land in spam.

**Webhook** — for a CRM, Zapier, Make or a Google Sheet:

| Variable | Notes |
| --- | --- |
| `LEAD_WEBHOOK_URL` | Receives the full lead as JSON |
| `LEAD_WEBHOOK_SECRET` | Optional. Sent as `X-Jedrick-Signature`. |

Configuring both is recommended: email so a human sees it now, webhook so
nothing is lost if an inbox is missed. A single channel succeeding is treated
as delivered.

### Set once the domain is live

| Variable | Value |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | `https://jedrick.ng` — no trailing slash |

Until this is set the site falls back to Netlify's own `URL`, which works but
puts a `.netlify.app` address in canonical links and the sitemap.

### Optional

`POLICY_UPLOAD_MAX_MB` (default 10) and `POLICY_UPLOAD_MAX_FILES` (default 5).
These are email attachment limits — Resend's ceiling is 40MB per message.

## 4. Deploy

Trigger the first deploy. The build runs the content cross-reference check
before `next build`, so a broken link between products, dictionary terms or
articles fails the deploy rather than shipping silently.

## 5. Verify the deploy

Worth doing in this order — a broken form is invisible until someone complains.

1. **Submit a real consultation** at `/contact` and confirm it arrives.
2. **Submit a policy review** at `/policy-review` with a small PDF attached, and
   confirm the attachment comes through.
3. **Check `/robots.txt`** — production should allow crawling; deploy previews
   should return `Disallow: /`.
4. **Check `/sitemap.xml`** — 55 page URLs, on the right domain.
5. **Confirm the 404s**: `/insurance/business/health-insurance` should 404
   (right product, wrong group).

## 6. Custom domain

**Domain management → Add a custom domain.** Netlify provisions the TLS
certificate automatically. Once DNS resolves, set `NEXT_PUBLIC_SITE_URL` and
redeploy so canonicals and the sitemap use the real domain.

---

## Notes on how this behaves once deployed

**Deploy previews are blocked from search engines.** `src/app/robots.ts` reads
Netlify's `CONTEXT` variable and returns `Disallow: /` for anything that is not
a production deploy. Without this, a preview of an unfinished page can be
indexed and outrank the real site.

**The API routes run as serverless functions.** `/api/leads` and
`/api/policy-review` are dynamic; everything else is prerendered static HTML.

**Rate limiting is weaker on serverless than in the code's ideal case.**
Function instances are ephemeral, so the in-memory counter does not persist
across cold starts. It is a speed bump, not a wall. The honeypot still works and
Netlify absorbs volumetric abuse upstream; the worst outcome is junk in an
inbox. If spam ever justifies it, back `src/lib/leads/rate-limit.ts` with
Netlify Blobs or Upstash — the function signature does not change.

**Uploaded policy documents are never stored.** They are forwarded as email
attachments and held only in memory during the request. There is no bucket to
secure and no retention policy to write, which is deliberate.

---

## Still outstanding before a public launch

These are not deployment blockers, but they are launch blockers:

1. **Privacy policy.** Not optional — the site accepts uploaded insurance
   policies, which are personal financial documents.
2. **NAICOM registration disclosure.** Regulatory requirement, and it supports
   the trust positioning the whole site is built on.
3. **Delivery configured.** Step 3 above. Until then production refuses
   submissions by design.

The rest of the launch checklist is in [ROADMAP.md](ROADMAP.md) Phase 4.
