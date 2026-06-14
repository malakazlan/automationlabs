# Simple Automation Labs — Website Design Spec

**Date:** 2026-06-13
**Status:** Draft for review
**Owner:** Simple Automation Labs (info@anorra.ai)
**Supersedes:** the Lovable single-page demo at `simple-automation-blueprint/` and the live demo at simpleautomationlabs.com

---

## 1. What we are building

A multi-page, server-rendered marketing + conversion website for **Simple Automation Labs**, an AI voice-agent agency. The flagship product is a 24/7 AI phone receptionist that answers every call, sounds human, captures the lead, and books the job straight into the customer's CRM.

The business is **multi-niche by design but HVAC-first by launch.** The site is architected as one brand with industry pages as a scaling + SEO engine, but only the HVAC page ships at launch (the only niche with real proof today).

### Primary goals
1. **Convert** skeptical trade business owners into booked sales demos and live agent calls.
2. **Rank** for high-intent terms per niche (e.g. "AI receptionist for HVAC", "answering service for HVAC", "HVAC missed call cost").
3. **Scale** to new niches by adding a data file, not by rebuilding.

### Success criteria
- Lighthouse: Performance, Accessibility, Best Practices, SEO all 95+ on Home and `/industries/hvac`.
- Core Web Vitals: LCP < 2.5s, INP < 200ms, CLS < 0.1 (field + lab).
- Every page has correct, validating JSON-LD and unique title/description/H1.
- A prospect can, from any page, in one click: start a live agent demo (or tap-to-call) and book a sales demo.
- Adding a new niche = one new `industries/<slug>.ts` data file + one case study, no template changes.

### Audience
HVAC (and later: dental, roofing, plumbing, etc.) business owners and office managers. Skeptical, ROI-driven, mobile-heavy, not design-snobs but allergic to anything that looks scammy or AI-generic. Trust and clarity beat spectacle.

---

## 2. Positioning & messaging

- **Core value prop:** "AI that answers every call you're missing, books the job, and never sleeps."
- **The hook:** missed calls = lost revenue. Every unanswered call is a job a competitor books.
- **Proof posture (mix):** real where we have it (HVAC, the offer, the process, integrations); clearly-marked illustrative placeholders for testimonials/metrics until real ones are supplied. No fabricated client names presented as fact.
- **Pricing posture:** "From $1,500/mo", setup quoted on a call. Anchor without exposing a rigid SKU.

**Copy rules (enforced, from the taste-skill):** zero em-dashes anywhere; no filler verbs ("elevate/seamless/unleash/revolutionize"); concrete numbers only, illustrative ones marked; no generic "John Doe" names; one CTA intent per label across the page ("Book a demo" is the single primary CTA label everywhere).

---

## 3. Information architecture (sitemap)

```
/                                  Home
/how-it-works                      The 4-step flow, deeper
/industries                        Parent grid of niches (HVAC live; others "coming")
/industries/hvac                   Data-driven niche template (PUBLISHED at launch)
/integrations                      Works-with grid (ServiceTitan, Housecall Pro, Jobber, ...)
/integrations/[slug]               Per-tool page (Phase 2)
/compare/ai-vs-answering-service   High-intent comparison (launch)
/compare/[slug]                    More comparisons (Phase 2)
/case-studies                      Index
/case-studies/[slug]               Individual case study
/tools/missed-call-calculator      Standalone, indexable ROI calculator
/pricing                           "From" pricing + book a call
/about                             Trust, team, why not a no-code reseller
/book-a-demo                       Cal.com embed (sales demo with SAL)
/blog                              MDX index (Phase 2)
/blog/[slug]                       MDX article (Phase 2)
/privacy  /terms                   Legal + call-data handling
```

**Decided:** HVAC is the only published niche at launch. `/industries` shows HVAC as live and others as "coming soon" without crawlable thin pages. URL pattern is nested (`/industries/hvac`) to express the scaling model.

---

## 4. The niche engine (core architecture decision)

Industry pages are **one template fed by data**, never hand-built.

```
src/content/industries/
  hvac.ts            <- published
  dental.ts          <- authored later
  roofing.ts         <- authored later
```

Each niche data file is a typed object:

```ts
type Industry = {
  slug: string;                 // "hvac"
  name: string;                 // "HVAC"
  published: boolean;           // gates routing + sitemap
  seo: { title: string; description: string; ogImage?: string };
  hero: { eyebrow?: string; headline: string; subhead: string };
  painStats: { value: string; label: string; source?: string }[];  // illustrative ones flagged
  problem: { heading: string; body: string };
  outcomes: { metric: string; caption: string }[];
  integrations: string[];       // tool slugs relevant to this niche
  faqs: { q: string; a: string }[];
  caseStudySlug?: string;       // link to a real case study when one exists
};
```

`/industries/[slug]/page.tsx` reads the file, renders the shared `<IndustryPage>` layout, and generates metadata + JSON-LD (`Service` + `FAQPage` + `BreadcrumbList`) from the same object. `generateStaticParams` only emits `published: true` niches. Sitemap reads the same source of truth.

**Result:** adding niche #4 is a data-entry task that automatically produces a ranked, schema-complete, on-brand page.

---

## 5. Page-by-page content blocks

Layout discipline (taste-skill): at least 4 different section layout families across the page; no 3 consecutive image+text zigzags; no 3 equal feature cards; eyebrows rationed to <= ceil(sections/3).

### Home
1. **Hero** (asymmetric split): eyebrow, 2-line headline, <=20-word subhead, primary CTA "Book a demo" + secondary "Hear the agent". Real photographic asset (no overlaid pills, no fake screenshot).
2. **Integration logo strip** ("Books into the tools you already run") under the hero, not inside it.
3. **The cost of missed calls** (problem + mono-number stat trio + inline mini ROI teaser linking to the full calculator).
4. **How it works** (4-step connected timeline, not equal cards): call comes in -> AI answers -> books job -> syncs to your system.
5. **Live demo band** (`<DemoCall>`): talk to the agent in-browser (desktop) / tap to call (mobile) + a scripted sample-audio player.
6. **Proof** (one strong testimonial, illustrative-flagged, + 3 outcome stats). Different layout family.
7. **Industries** (HVAC live, others "coming") teaser into `/industries`.
8. **Pricing teaser** ("From $1,500/mo", 30-day guarantee, no contracts) -> `/pricing`.
9. **Final CTA band** + footer.

### How It Works
Deeper version of the 4-step flow with the demo, integration sync explanation, security/consent note, FAQ, CTA.

### /industries (parent)
Intro + grid: HVAC (live, links through), others rendered as non-linked "coming" tiles. No thin crawlable clones.

### /industries/hvac (template)
Niche hero (HVAC-specific headline + pain stats) -> problem -> how it works (shared) -> HVAC integrations -> outcomes/case-study link -> niche FAQ -> demo + CTA. All from `hvac.ts`.

### /integrations
Grid of supported tools with short "what syncs" copy. Per-tool pages Phase 2. Logos are representative; real marks where licensing allows.

### /compare/ai-vs-answering-service
Honest comparison (cost, speed, after-hours, booking, scale). No filled-track score bars; number + icon. Targets a real high-intent query.

### /case-studies + /[slug]
Index of outcome cards. Each study: context -> problem -> what we did -> result with numbers. Real only; none shipped as fact until supplied (launch may ship one clearly-labeled illustrative study, or none).

### /tools/missed-call-calculator
Inputs: calls/week, missed %, avg job value, close rate. Output: estimated monthly + annual lost revenue, with a "book a demo" CTA. Indexable, shareable, link-bait. Client component, no scroll listeners.

### /pricing
"From $1,500/mo" + setup-quoted-on-call, what's included, guarantee, FAQ, CTA. No rigid public SKU.

### /about
Who we are, why not a no-code reseller, how the agent is built and supported, trust signals.

### /book-a-demo
Cal.com embed + a short lead form fallback (name, company, phone, email, niche). Server Action -> Supabase + Resend notification.

### /privacy /terms
Standard legal + explicit AI call-recording / data-handling section (consent, retention, two-party-consent note).

---

## 6. Features & integration seams

### Live agent demo (`<DemoCall>`)
- Client leaf component, isolated, lazy-loaded.
- **Desktop:** in-browser voice via the agent platform web SDK (Vapi or Retell both supported). Connects to the agent the client (you) builds. Env-config the public agent/assistant ID.
- **Mobile:** tap-to-call a real demo number.
- **Sample audio:** scripted recording of the agent (not real customer calls), with transcript.
- **Abuse guard:** rate-limit demo starts per IP/session; clear "this is a demo" framing.
- **Integration contract (you provide):** `NEXT_PUBLIC_VOICE_PROVIDER`, public assistant/agent id, and (server-side) any signed-token endpoint the SDK requires. The site ships with a graceful "demo unavailable" state until wired.

### Booking
- **Sales demo:** Cal.com embed at `/book-a-demo`, sticky "Book a demo" in header on every page.
- **Product booking:** handled by your agent into the client's CRM. Out of website scope; only described/illustrated on the site.

### Lead capture + storage
- React Hook Form + Zod, submitted via Next.js Server Action.
- Stored in Supabase (Postgres) table `leads`.
- Notification via Resend (email) + optional Slack webhook.
- CRM write-back is Phase 2.

### Global conversion furniture
- Sticky header CTA, mobile tap-to-call, footer CTA band, exit-safe (no intrusive modals on load).

---

## 7. Tech stack (decided)

| Layer | Choice |
|---|---|
| Framework | Next.js App Router (RSC), TypeScript, strict |
| Styling | Tailwind v4, design tokens via CSS variables |
| Components | shadcn/ui, fully restyled to brand (never default) |
| Motion | `motion/react`, isolated client leaves; CSS for the 80% |
| Icons | Phosphor (`@phosphor-icons/react`), one weight |
| Fonts | self-hosted via `next/font` (display per chosen direction + mono for numerals) |
| Forms | React Hook Form + Zod |
| Data | Supabase (Postgres) |
| Email | Resend (React Email templates) |
| Booking | Cal.com embed |
| Voice | Vapi or Retell web SDK (your agent) |
| Analytics | GA4 + Search Console + Vercel Analytics |
| Content | MDX in-repo (Phase 2) |
| Hosting | Vercel |
| Package mgr | pnpm |
| Project dir | `D:\agency\automation` (repo: github.com/malakazlan/automationlabs) |

The old `simple-automation-blueprint/` is reference only. We salvage copy and a few shadcn primitives, not the SPA structure.

---

## 8. SEO strategy

- **Rendering:** static where possible (`generateStaticParams`), dynamic only where needed. Fast TTFB.
- **Per-page metadata:** unique title/description/canonical/OG via the App Router metadata API. Niche pages generate from the data file.
- **Structured data (JSON-LD), correct types:** `Organization` (site-wide), `Service` (offer + per niche), `FAQPage` (pages with FAQs), `BreadcrumbList` (nested pages), `WebSite` + `SearchAction` optional. **No `LocalBusiness`** unless real per-city pages with real NAP exist later.
- **Sitemap + robots:** generated from the route + content sources; only `published` niches included.
- **Internal linking:** Home -> industries -> niche -> case study -> demo. Calculator and comparison pages link in-context.
- **Images:** `next/image`, priority on LCP asset, explicit dimensions (CLS), modern formats.
- **Content engine:** comparison + calculator + (Phase 2) blog target the long tail. No scaled thin pages.

---

## 9. Data model (launch)

```
leads (
  id uuid pk,
  created_at timestamptz,
  name text, company text, email text, phone text,
  industry text,            -- "hvac" etc.
  source text,              -- page path / campaign
  message text null,
  status text default 'new'
)
demo_sessions (              -- optional, for the in-browser demo
  id uuid pk, created_at timestamptz, ip_hash text, industry text, outcome text
)
```

No PII beyond standard lead contact info. Retention + consent documented in `/privacy`.

---

## 10. Design direction (DECIDED: D · Operator x Dispatch, cobalt)

Four homepage mockups were built (`mockups/`) at the same craft bar (taste-skill dials `VARIANCE 6 / MOTION 5 / DENSITY 4`, Emil motion craft, full pre-flight). **Selected: Direction D**, a blend of A (clean, trustworthy structure) and C (editorial type, photography, warm canvas), with B's live animated call in the demo band.

### Design tokens (production source of truth)
- **Theme:** single light theme on a warm paper canvas (dual-mode dark is Phase 2, not launch).
- **Canvas / surface:** `paper #F6F4F0`, elevated surface `white`, near-black text `ink #191714`. No pure black, no pure white.
- **Accent (locked, single):** `cobalt #1D4ED8`, hover/dark `#1E3FAE`, soft tint `#EAEEFB`. Used identically across every section. (Ember `#C2410C` is the documented alternate if the brand ever pivots warm; not used at launch.)
- **Type:** display `Bricolage Grotesque` (headlines), body `Geist`, numerals `Geist Mono`. Self-hosted via `next/font` in production.
- **Radius:** soft scale, `rounded-xl` buttons, `rounded-2xl`/`rounded-3xl` cards and bands, applied consistently.
- **Motion:** custom ease-out `cubic-bezier(.23,1,.32,1)`, scale-on-press buttons, IntersectionObserver / Motion scroll-reveal, animated live-call waveform (motivated), full `prefers-reduced-motion` fallback.
- **Icons:** Phosphor, one weight.

The mockup HTML in `mockups/` is a throwaway reference for look and feel only. Production is built fresh in Next.js; real photography replaces the picsum placeholders.

---

## 11. Accessibility & performance

- WCAG AA min (AAA for hero copy). Real focus states, keyboard nav, labelled forms (label above input, error below).
- `prefers-reduced-motion` honored for all motion; `prefers-color-scheme` respected if we ship dual-mode.
- No `window.addEventListener('scroll')`; IntersectionObserver / Motion `useScroll` / CSS scroll-driven only.
- Performance budget enforced; Lighthouse run before any page is called done.

---

## 12. Build phases

**Phase 0 — Foundation:** scaffold Next.js + Tailwind + shadcn + tokens + fonts, layout (header/footer + sticky CTA), SEO scaffolding (metadata helpers, JSON-LD components, sitemap/robots), analytics, Supabase + Resend wiring, `<DemoCall>` seam (graceful unwired state).

**Phase 1 — Vertical slice (the agreed first build):** Home, `/industries/hvac` (template + `hvac.ts`), `/book-a-demo`, `/tools/missed-call-calculator`. One case study if real content exists.

**Phase 2 — Depth:** `/how-it-works`, `/integrations`, `/compare/ai-vs-answering-service`, `/pricing`, `/about`, `/case-studies`, legal pages.

**Phase 3 — Scale:** additional niches (data files + studies), `/blog` (MDX), per-integration and per-comparison pages, CRM write-back.

---

## 13. Out of scope (now)

CRM write-back, headless CMS, additional niches beyond HVAC, per-tool/per-comparison child pages, building the voice agent itself (you own that), multi-language.

---

## 14. Risks & mitigations

- **Thin-content penalty** from premature niche pages -> publish only proven niches; engine ready, pages gated by `published`.
- **Wrong schema** -> Organization/Service/FAQ/Breadcrumb only; no fake LocalBusiness.
- **Demo cost/abuse** -> rate-limit, scripted sample audio, clear demo framing.
- **Consent/legal on recordings** -> scripted demo audio only; consent + retention documented.
- **Motion hurting CWV** -> CSS-first, Motion isolated and lazy.
- **Pricing exposure** -> "from" pricing, setup quoted on call.
```
