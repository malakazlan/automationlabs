# Simple Automation Labs Website — Foundation + HVAC Slice Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship a fast, SEO-correct, on-brand Next.js site for Simple Automation Labs covering the foundation plus the HVAC vertical slice (Home, `/industries/hvac`, `/book-a-demo`, ROI calculator), built to the Direction D design tokens.

**Architecture:** Next.js App Router (RSC by default), TypeScript strict, Tailwind v4 with CSS-variable design tokens. Industry pages are one data-driven template fed by typed config files. Pure logic (ROI math, lead validation, niche loader, structured-data + sitemap generators, the lead server action) is test-driven with Vitest. Visual sections are ported from the approved mockup `mockups/direction-d-blend.html` into focused React components and verified by build + Lighthouse. Leads persist to Supabase and notify via Resend. The live voice demo is a provider-agnostic client leaf with a graceful unwired state.

**Tech Stack:** Next.js (App Router) · TypeScript · Tailwind v4 · shadcn/ui (restyled) · Motion (`motion/react`) · Phosphor icons · React Hook Form + Zod · Supabase (Postgres) · Resend · Cal.com embed · Vitest + React Testing Library · Vercel.

**Reference artifacts (already in `D:\agency`):**
- Design spec: `docs/superpowers/specs/2026-06-13-simpleautomationlabs-website-design.md`
- Approved visual mockup (markup source of truth for sections): `mockups/direction-d-blend.html`

**Project directory:** `D:\agency\automation` (existing git repo, remote `origin` = https://github.com/malakazlan/automationlabs.git). It already contains `docs/`, `mockups/`, `tools/`, `.gitignore`. The Next.js app is scaffolded into this repo root (Task 1 handles the non-empty-dir case).

**Conventions:**
- Package manager: `pnpm`. All commands run from the project root unless stated.
- Commit after every task (Conventional Commits).
- Single light theme at launch. One accent (`cobalt`). Zero em-dashes in any user-visible string (taste-skill hard rule).

---

## File structure (created by this plan)

```
automation/                         (repo root = github.com/malakazlan/automationlabs)
  app/
    layout.tsx                      Root layout, fonts, metadata defaults, JSON-LD Organization
    page.tsx                        Home
    sitemap.ts                      Generated sitemap (published routes only)
    robots.ts                       robots.txt
    globals.css                     Tailwind v4 + design tokens
    industries/
      page.tsx                      Parent grid (HVAC live, others "coming")
      [slug]/page.tsx               Data-driven niche template
    book-a-demo/page.tsx            Cal.com embed + lead form fallback
    tools/
      missed-call-calculator/page.tsx  ROI calculator page
  components/
    layout/Header.tsx               Sticky nav, scroll-solidify
    layout/Footer.tsx
    layout/StickyCallBar.tsx        Mobile tap-to-call bar
    sections/Hero.tsx
    sections/LogoStrip.tsx
    sections/MissedCallCost.tsx
    sections/AgentCapabilities.tsx
    sections/HowItWorks.tsx
    sections/DemoBand.tsx
    sections/Proof.tsx
    sections/IndustriesTeaser.tsx
    sections/PricingTeaser.tsx
    sections/FinalCta.tsx
    industry/IndustryPage.tsx       Composes a niche page from Industry data
    demo/DemoCall.tsx               Client leaf: tap-to-call + web-voice seam
    forms/LeadForm.tsx              RHF + Zod lead form
    calc/MissedCallCalculator.tsx   Client calculator UI
    ui/Button.tsx, ui/Container.tsx, ui/Section.tsx, ui/Reveal.tsx
    seo/JsonLd.tsx                  <script type="application/ld+json"> renderer
  lib/
    seo/structured-data.ts          Builders: organization, service, faqPage, breadcrumbList
    seo/metadata.ts                 buildMetadata() helper
    content/industry.ts             Industry type + getIndustry/getPublishedIndustries
    content/industries/hvac.ts      HVAC data
    calc/roi.ts                     estimateLostRevenue() pure function
    leads/schema.ts                 Zod lead schema + types
    leads/actions.ts                createLead server action
    db/supabase.ts                  Supabase server client
    email/resend.ts                 Resend client + lead notification
    config/site.ts                  Site constants (name, url, phone, email, nav)
    utils/cn.ts                     class merge helper
  test/                             Vitest setup + unit tests
  .env.example
  next.config.ts, tailwind is v4 (via @tailwindcss/postcss), postcss.config.mjs, vitest.config.ts
```

---

## Task 1: Scaffold the Next.js app into the existing repo

The repo `D:\agency\automation` already exists (git initialized, remote set) and contains `docs/`, `mockups/`, `tools/`, `.gitignore`. `create-next-app` refuses a non-empty target, so scaffold into a temp dir and move the app files to the repo root.

**Files:**
- Create: Next.js app files at the repo root (`app/`, `package.json`, `next.config.ts`, etc.)

- [ ] **Step 1: Scaffold into a temp dir**

Run from `D:\agency\automation`:
```bash
pnpm create next-app@latest .nextapp --ts --app --eslint --tailwind --src-dir=false --import-alias "@/*" --use-pnpm --no-turbopack
```
Answer prompts to match those flags if asked.

- [ ] **Step 2: Move app files to the repo root, then remove temp**

```bash
# move everything including dotfiles, without clobbering existing docs/mockups/tools/.gitignore/.git
cp -r .nextapp/. .  && rm -rf .nextapp
# if .nextapp shipped its own .gitignore, keep ours (the repo .gitignore already covers secrets);
# append any Next-specific ignores (e.g. .next/, node_modules/) if missing.
```
Ensure `.gitignore` includes `node_modules/`, `.next/`, `out/`, `.vercel/` (add if absent).

- [ ] **Step 3: Verify dev server boots**

Run:
```bash
pnpm install
pnpm dev
```
Expected: server starts on http://localhost:3000 with the Next default page. Stop with Ctrl+C.

- [ ] **Step 4: First commit (push optional, on user request)**

```bash
git add -A
git commit -m "chore: scaffold next.js app"
```

---

## Task 2: Install dependencies and configure tooling

**Files:**
- Modify: `package.json`
- Create: `vitest.config.ts`, `test/setup.ts`
- Modify: `tsconfig.json` (ensure strict)

- [ ] **Step 1: Install runtime + dev dependencies**

```bash
pnpm add motion @phosphor-icons/react react-hook-form zod @hookform/resolvers @supabase/supabase-js resend @calcom/embed-react clsx tailwind-merge @vercel/analytics
pnpm add -D vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/dom @testing-library/jest-dom
```

- [ ] **Step 2: Add Vitest config**

Create `vitest.config.ts`:
```ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./test/setup.ts"],
  },
  resolve: { alias: { "@": path.resolve(__dirname, ".") } },
});
```

Create `test/setup.ts`:
```ts
import "@testing-library/jest-dom/vitest";
```

- [ ] **Step 3: Add test scripts**

In `package.json` `"scripts"`, add:
```json
"test": "vitest run",
"test:watch": "vitest"
```

- [ ] **Step 4: Confirm tsconfig strict**

Ensure `tsconfig.json` `compilerOptions` includes `"strict": true`. If not, set it.

- [ ] **Step 5: Sanity test that Vitest runs**

Create `test/smoke.test.ts`:
```ts
import { describe, it, expect } from "vitest";
describe("smoke", () => { it("runs", () => { expect(1 + 1).toBe(2); }); });
```
Run: `pnpm test`
Expected: 1 passing test. Then delete `test/smoke.test.ts`.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "chore: add deps, vitest, strict ts"
```

---

## Task 3: Design tokens, fonts, and global styles

**Files:**
- Create: `lib/utils/cn.ts`, `lib/config/site.ts`, `app/fonts.ts`
- Modify: `app/globals.css`, `app/layout.tsx`

- [ ] **Step 1: Add the class-merge helper**

Create `lib/utils/cn.ts`:
```ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

- [ ] **Step 2: Add site config constants**

Create `lib/config/site.ts`:
```ts
export const site = {
  name: "Simple Automation Labs",
  shortName: "SAL",
  url: "https://www.simpleautomationlabs.com",
  description:
    "AI voice agents that answer every call, sound human, and book the job straight into your CRM. Around the clock.",
  email: "hello@simpleautomationlabs.com",
  phoneDisplay: "(612) 555-1234",
  phoneHref: "tel:+16125551234",
  nav: [
    { label: "How it works", href: "/#how" },
    { label: "Industries", href: "/industries" },
    { label: "Pricing", href: "/#pricing" },
    { label: "Demo", href: "/#demo" },
  ],
  ctaLabel: "Book a demo",
  ctaHref: "/book-a-demo",
} as const;
```

- [ ] **Step 3: Configure fonts via next/font**

Create `app/fonts.ts`:
```ts
import { Bricolage_Grotesque, Geist, Geist_Mono } from "next/font/google";

export const display = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});
export const sans = Geist({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
export const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });
```

- [ ] **Step 4: Write the token layer in globals.css (Tailwind v4 @theme)**

Replace `app/globals.css` with:
```css
@import "tailwindcss";

@theme {
  --color-paper: #f6f4f0;
  --color-surface: #ffffff;
  --color-ink: #191714;
  --color-cobalt: #1d4ed8;
  --color-cobalt-dark: #1e3fae;
  --color-cobalt-soft: #eaeefb;

  --font-sans: var(--font-sans), ui-sans-serif, system-ui, sans-serif;
  --font-display: var(--font-display), ui-sans-serif, system-ui, sans-serif;
  --font-mono: var(--font-mono), ui-monospace, monospace;

  --ease-out: cubic-bezier(0.23, 1, 0.32, 1);
}

:root { color-scheme: light; }

html { scroll-behavior: smooth; }
body { background: var(--color-paper); color: var(--color-ink); -webkit-font-smoothing: antialiased; }

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
}
```

- [ ] **Step 5: Wire fonts + body classes in the root layout**

In `app/layout.tsx`, import the fonts and apply the variables to `<html>`. Minimal version (metadata expanded in Task 6):
```tsx
import type { Metadata } from "next";
import { display, sans, mono } from "./fonts";
import { site } from "@/lib/config/site";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: site.name, template: `%s · ${site.name}` },
  description: site.description,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable} ${mono.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
```

- [ ] **Step 6: Verify build + visual baseline**

Replace `app/page.tsx` body with a token check:
```tsx
export default function Home() {
  return (
    <main className="p-10">
      <h1 className="font-display text-5xl font-semibold tracking-tight text-ink">Tokens online</h1>
      <p className="mt-4 font-mono text-cobalt">$1,500/mo</p>
    </main>
  );
}
```
Run: `pnpm dev`, open http://localhost:3000.
Expected: warm paper background, Bricolage heading, cobalt mono price. Then revert `page.tsx` (Home is built in Task 12).

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: design tokens, fonts, global styles"
```

---

## Task 4: Base UI primitives

**Files:**
- Create: `components/ui/Container.tsx`, `components/ui/Section.tsx`, `components/ui/Button.tsx`, `components/ui/Reveal.tsx`

- [ ] **Step 1: Container**

Create `components/ui/Container.tsx`:
```tsx
import { cn } from "@/lib/utils/cn";
export function Container({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("mx-auto w-full max-w-[1200px] px-5 sm:px-8", className)}>{children}</div>;
}
```

- [ ] **Step 2: Section**

Create `components/ui/Section.tsx`:
```tsx
import { cn } from "@/lib/utils/cn";
export function Section({ id, className, children }: { id?: string; className?: string; children: React.ReactNode }) {
  return <section id={id} className={cn("py-20 sm:py-28", className)}>{children}</section>;
}
```

- [ ] **Step 3: Button (link + button variants)**

Create `components/ui/Button.tsx`:
```tsx
import Link from "next/link";
import { cn } from "@/lib/utils/cn";

type Variant = "primary" | "secondary" | "ink";
const base =
  "btn inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold transition-[transform,background-color,border-color] duration-200 active:scale-[0.97] motion-reduce:transition-none motion-reduce:active:scale-100";
const variants: Record<Variant, string> = {
  primary: "bg-cobalt text-white hover:bg-cobalt-dark shadow-lg shadow-cobalt/20",
  secondary: "border border-ink/15 bg-surface text-ink hover:border-ink/30",
  ink: "bg-ink text-paper hover:bg-ink/90",
};

export function Button({
  href, variant = "primary", className, children, ...rest
}: { href?: string; variant?: Variant; className?: string; children: React.ReactNode } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const cls = cn(base, variants[variant], className);
  if (href) return <Link href={href} className={cls}>{children}</Link>;
  return <button className={cls} {...rest}>{children}</button>;
}
```

- [ ] **Step 4: Reveal (scroll-in wrapper, client leaf)**

Create `components/ui/Reveal.tsx`:
```tsx
"use client";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils/cn";

export function Reveal({ as: Tag = "div", delay = 0, className, children }: {
  as?: React.ElementType; delay?: number; className?: string; children: React.ReactNode;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setShown(true); io.unobserve(el); }
    }, { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <Tag
      ref={ref as never}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn(
        "transition-[opacity,transform] duration-700 ease-[cubic-bezier(.23,1,.32,1)] motion-reduce:transition-none",
        shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5",
        className
      )}
    >
      {children}
    </Tag>
  );
}
```

- [ ] **Step 5: Typecheck**

Run: `pnpm exec tsc --noEmit`
Expected: no errors.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: base ui primitives (Container, Section, Button, Reveal)"
```

---

## Task 5: Header, Footer, sticky mobile CTA, and layout shell

**Files:**
- Create: `components/layout/Header.tsx`, `components/layout/Footer.tsx`, `components/layout/StickyCallBar.tsx`
- Modify: `app/layout.tsx`

Markup reference: nav and footer in `mockups/direction-d-blend.html` (the `<header id="nav">` and `<footer>` blocks). Port the structure, convert to `site` config + `Button`, keep the scroll-solidify behavior via an IntersectionObserver sentinel (not a scroll listener).

- [ ] **Step 1: Header (client component for scroll-solidify)**

Create `components/layout/Header.tsx`. Requirements:
- Fixed, height 70px, one line at desktop, hamburger under `lg`.
- Brand wordmark (display font) + Phosphor `Waveform` mark in a cobalt tile.
- Nav links from `site.nav`; phone link; primary `Button` to `site.ctaHref` labeled `site.ctaLabel`.
- Solidify: render a 1px sentinel at top of `app/layout.tsx`; observe it; when not intersecting, add `bg-paper/85 backdrop-blur border-b border-ink/10`.
- Mobile menu: a `useState` toggle revealing a panel with the nav links and CTA.

```tsx
"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { List, X, Waveform, Phone } from "@phosphor-icons/react";
import { site } from "@/lib/config/site";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils/cn";

export function Header() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const sentinel = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = sentinel.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => setSolid(!e.isIntersecting), { rootMargin: "-70px 0px 0px 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <>
      <div ref={sentinel} className="absolute top-0 h-px w-full" aria-hidden />
      <header className={cn("fixed inset-x-0 top-0 z-50 transition-colors duration-300", solid && "border-b border-ink/10 bg-paper/85 backdrop-blur")}>
        <div className="mx-auto flex h-[70px] max-w-[1200px] items-center justify-between px-5 sm:px-8">
          <Link href="/" className="flex items-center gap-2.5 font-display text-lg font-semibold tracking-tight text-ink">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-cobalt text-white"><Waveform weight="fill" /></span>
            {site.name}
          </Link>
          <nav className="hidden items-center gap-8 text-sm font-medium text-ink/65 lg:flex">
            {site.nav.map((n) => (<Link key={n.href} href={n.href} className="transition-colors hover:text-ink">{n.label}</Link>))}
          </nav>
          <div className="flex items-center gap-3">
            <a href={site.phoneHref} className="hidden text-sm font-medium text-ink/65 hover:text-ink sm:block"><Phone className="inline" /> {site.phoneDisplay}</a>
            <Button href={site.ctaHref} className="px-4 py-2.5">{site.ctaLabel}</Button>
            <button className="lg:hidden" aria-label="Menu" onClick={() => setOpen((v) => !v)}>{open ? <X size={22} /> : <List size={22} />}</button>
          </div>
        </div>
        {open && (
          <div className="border-t border-ink/10 bg-paper px-5 py-4 lg:hidden">
            <nav className="flex flex-col gap-3 text-sm font-medium text-ink/80">
              {site.nav.map((n) => (<Link key={n.href} href={n.href} onClick={() => setOpen(false)} className="py-1">{n.label}</Link>))}
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
```

- [ ] **Step 2: Footer**

Create `components/layout/Footer.tsx` porting the footer block from the mockup, using `site` config for name, blurb, nav, email (`site.email`), and phone. Background `bg-ink text-paper/55`. No locale strip, no version stamp.

- [ ] **Step 3: Sticky mobile call bar**

Create `components/layout/StickyCallBar.tsx`:
```tsx
import { Phone } from "@phosphor-icons/react/dist/ssr";
import { site } from "@/lib/config/site";

export function StickyCallBar() {
  return (
    <a href={site.phoneHref}
       className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-center gap-2 border-t border-ink/10 bg-cobalt py-3 text-sm font-semibold text-white sm:hidden">
      <Phone weight="fill" /> Call us now
    </a>
  );
}
```

- [ ] **Step 4: Mount in root layout**

In `app/layout.tsx`, wrap children with Header, main, Footer, StickyCallBar:
```tsx
<body className="font-sans antialiased">
  <Header />
  <main className="pb-16 sm:pb-0">{children}</main>
  <Footer />
  <StickyCallBar />
</body>
```
Add a top padding offset where needed in pages (hero handles its own top padding).

- [ ] **Step 5: Verify**

Run `pnpm dev`. Confirm: nav is one line at desktop, solidifies on scroll, mobile menu toggles, sticky call bar shows under `sm`, footer renders.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: header, footer, sticky call bar, layout shell"
```

---

## Task 6: SEO library — structured data, metadata helper, sitemap, robots (TDD)

**Files:**
- Create: `lib/seo/structured-data.ts`, `lib/seo/metadata.ts`, `components/seo/JsonLd.tsx`, `app/sitemap.ts`, `app/robots.ts`
- Test: `test/structured-data.test.ts`, `test/sitemap.test.ts`

- [ ] **Step 1: Write failing tests for structured-data builders**

Create `test/structured-data.test.ts`:
```ts
import { describe, it, expect } from "vitest";
import { organizationLd, serviceLd, faqPageLd, breadcrumbLd } from "@/lib/seo/structured-data";

describe("structured-data", () => {
  it("organization has correct type and no LocalBusiness", () => {
    const ld = organizationLd();
    expect(ld["@type"]).toBe("Organization");
    expect(JSON.stringify(ld)).not.toContain("LocalBusiness");
  });
  it("service embeds provider and name", () => {
    const ld = serviceLd({ name: "AI Receptionist for HVAC", description: "x", url: "https://x/y" });
    expect(ld["@type"]).toBe("Service");
    expect(ld.provider["@type"]).toBe("Organization");
    expect(ld.name).toContain("HVAC");
  });
  it("faqPage maps questions", () => {
    const ld = faqPageLd([{ q: "Does it work after hours?", a: "Yes." }]);
    expect(ld["@type"]).toBe("FAQPage");
    expect(ld.mainEntity[0]["@type"]).toBe("Question");
    expect(ld.mainEntity[0].acceptedAnswer.text).toBe("Yes.");
  });
  it("breadcrumb numbers positions from 1", () => {
    const ld = breadcrumbLd([{ name: "Industries", url: "https://x/industries" }, { name: "HVAC", url: "https://x/industries/hvac" }]);
    expect(ld.itemListElement[0].position).toBe(1);
    expect(ld.itemListElement[1].position).toBe(2);
  });
});
```

- [ ] **Step 2: Run tests, verify they fail**

Run: `pnpm test structured-data`
Expected: FAIL (module not found).

- [ ] **Step 3: Implement structured-data builders**

Create `lib/seo/structured-data.ts`:
```ts
import { site } from "@/lib/config/site";

export function organizationLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: site.url,
    email: site.email,
    description: site.description,
  } as const;
}

export function serviceLd(input: { name: string; description: string; url: string; areaServed?: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: input.name,
    description: input.description,
    url: input.url,
    areaServed: input.areaServed ?? "US",
    provider: { "@type": "Organization", name: site.name, url: site.url },
  };
}

export function faqPageLd(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function breadcrumbLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: it.url,
    })),
  };
}
```

- [ ] **Step 4: Run tests, verify pass**

Run: `pnpm test structured-data`
Expected: PASS (4 tests).

- [ ] **Step 5: JsonLd renderer component**

Create `components/seo/JsonLd.tsx`:
```tsx
export function JsonLd({ data }: { data: object | object[] }) {
  const json = JSON.stringify(data);
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
```

- [ ] **Step 6: Metadata helper**

Create `lib/seo/metadata.ts`:
```ts
import type { Metadata } from "next";
import { site } from "@/lib/config/site";

export function buildMetadata(input: {
  title: string; description: string; path: string; ogImage?: string;
}): Metadata {
  const url = new URL(input.path, site.url).toString();
  return {
    title: input.title,
    description: input.description,
    alternates: { canonical: url },
    openGraph: {
      title: input.title, description: input.description, url, siteName: site.name, type: "website",
      images: input.ogImage ? [{ url: input.ogImage }] : undefined,
    },
    twitter: { card: "summary_large_image", title: input.title, description: input.description },
  };
}
```

- [ ] **Step 7: Write failing sitemap test**

Create `test/sitemap.test.ts`:
```ts
import { describe, it, expect } from "vitest";
import sitemap from "@/app/sitemap";

describe("sitemap", () => {
  it("includes home and hvac, excludes unpublished niches", () => {
    const urls = sitemap().map((e) => e.url);
    expect(urls.some((u) => u.endsWith("/"))).toBe(true);
    expect(urls.some((u) => u.endsWith("/industries/hvac"))).toBe(true);
    expect(urls.some((u) => u.endsWith("/industries/dental"))).toBe(false);
  });
});
```
This depends on the niche loader (Task 9). Mark Step 7-9 to run after Task 9 if executing strictly in order; the sitemap import of `getPublishedIndustries` requires it. (Implement sitemap now with a static base list plus the loader call; the loader lands in Task 9. If executing top-to-bottom, write the sitemap to import from `@/lib/content/industry` and complete this test at the end of Task 9.)

- [ ] **Step 8: Implement sitemap and robots**

Create `app/sitemap.ts`:
```ts
import type { MetadataRoute } from "next";
import { site } from "@/lib/config/site";
import { getPublishedIndustries } from "@/lib/content/industry";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = ["", "/industries", "/book-a-demo", "/tools/missed-call-calculator"].map((p) => ({
    url: new URL(p || "/", site.url).toString(),
    lastModified: new Date("2026-06-14"),
  }));
  const niches = getPublishedIndustries().map((n) => ({
    url: new URL(`/industries/${n.slug}`, site.url).toString(),
    lastModified: new Date("2026-06-14"),
  }));
  return [...base, ...niches];
}
```

Create `app/robots.ts`:
```ts
import type { MetadataRoute } from "next";
import { site } from "@/lib/config/site";
export default function robots(): MetadataRoute.Robots {
  return { rules: [{ userAgent: "*", allow: "/" }], sitemap: new URL("/sitemap.xml", site.url).toString() };
}
```

- [ ] **Step 9: Add Organization JSON-LD to root layout**

In `app/layout.tsx` body, render `<JsonLd data={organizationLd()} />` once.

- [ ] **Step 10: Run full test suite**

Run: `pnpm test`
Expected: structured-data passes; sitemap test passes once Task 9 lands (re-run then).

- [ ] **Step 11: Commit**

```bash
git add -A
git commit -m "feat: seo lib (structured data, metadata, sitemap, robots)"
```

---

## Task 7: Analytics and environment

**Files:**
- Create: `.env.example`
- Modify: `app/layout.tsx`

- [ ] **Step 1: Add env example**

Create `.env.example`:
```bash
NEXT_PUBLIC_SITE_URL=https://www.simpleautomationlabs.com
NEXT_PUBLIC_GA_ID=
NEXT_PUBLIC_VOICE_PROVIDER=         # "vapi" | "retell" | "" (unwired)
NEXT_PUBLIC_VOICE_PUBLIC_KEY=
NEXT_PUBLIC_VOICE_AGENT_ID=
NEXT_PUBLIC_CALCOM_LINK=            # e.g. "simpleautomationlabs/demo"
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
RESEND_API_KEY=
LEAD_NOTIFY_EMAIL=hello@simpleautomationlabs.com
```

- [ ] **Step 2: Add Vercel Analytics + GA**

In `app/layout.tsx`, mount `<Analytics />` from `@vercel/analytics/react` before `</body>`. Add a GA `<Script>` (next/script) gated on `process.env.NEXT_PUBLIC_GA_ID` being present.

```tsx
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";
// ... inside body, after StickyCallBar:
{process.env.NEXT_PUBLIC_GA_ID && (
  <>
    <Script src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`} strategy="afterInteractive" />
    <Script id="ga" strategy="afterInteractive">{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${process.env.NEXT_PUBLIC_GA_ID}');`}</Script>
  </>
)}
<Analytics />
```

- [ ] **Step 3: Verify build**

Run: `pnpm build`
Expected: build succeeds (analytics no-ops without IDs).

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: analytics + env scaffolding"
```

---

## Task 8: Data layer — Supabase client, leads table, Resend

**Files:**
- Create: `lib/db/supabase.ts`, `lib/email/resend.ts`, `supabase/migrations/0001_leads.sql`

- [ ] **Step 1: Supabase server client**

Create `lib/db/supabase.ts`:
```ts
import { createClient } from "@supabase/supabase-js";

export function getServiceClient() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("Supabase env not configured");
  return createClient(url, key, { auth: { persistSession: false } });
}
```

- [ ] **Step 2: Leads table migration SQL**

Create `supabase/migrations/0001_leads.sql`:
```sql
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  company text,
  email text not null,
  phone text not null,
  industry text,
  source text,
  message text,
  status text not null default 'new'
);
```
(Run this in the Supabase SQL editor when the project exists; documented here as the schema of record.)

- [ ] **Step 3: Resend notifier**

Create `lib/email/resend.ts`:
```ts
import { Resend } from "resend";

export async function sendLeadNotification(lead: { name: string; company?: string; email: string; phone: string; industry?: string; source?: string }) {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_NOTIFY_EMAIL;
  if (!key || !to) return { skipped: true as const };
  const resend = new Resend(key);
  await resend.emails.send({
    from: "leads@simpleautomationlabs.com",
    to,
    subject: `New lead: ${lead.name}${lead.company ? ` (${lead.company})` : ""}`,
    text: `Name: ${lead.name}\nCompany: ${lead.company ?? ""}\nEmail: ${lead.email}\nPhone: ${lead.phone}\nIndustry: ${lead.industry ?? ""}\nSource: ${lead.source ?? ""}`,
  });
  return { skipped: false as const };
}
```

- [ ] **Step 4: Typecheck + commit**

Run: `pnpm exec tsc --noEmit` (expected: no errors).
```bash
git add -A
git commit -m "feat: data layer (supabase client, leads schema, resend)"
```

---

## Task 9: Niche content model + HVAC data (TDD)

**Files:**
- Create: `lib/content/industry.ts`, `lib/content/industries/hvac.ts`
- Test: `test/industry.test.ts`

- [ ] **Step 1: Write failing tests**

Create `test/industry.test.ts`:
```ts
import { describe, it, expect } from "vitest";
import { getIndustry, getPublishedIndustries } from "@/lib/content/industry";

describe("industry loader", () => {
  it("returns hvac by slug", () => {
    const i = getIndustry("hvac");
    expect(i?.slug).toBe("hvac");
    expect(i?.published).toBe(true);
    expect(i?.faqs.length).toBeGreaterThan(0);
  });
  it("returns undefined for unknown slug", () => {
    expect(getIndustry("nope")).toBeUndefined();
  });
  it("published list includes hvac only at launch", () => {
    const pub = getPublishedIndustries().map((i) => i.slug);
    expect(pub).toContain("hvac");
    expect(pub).not.toContain("dental");
  });
  it("no industry copy contains an em-dash", () => {
    const all = JSON.stringify(getPublishedIndustries());
    expect(all.includes("—") || all.includes("–")).toBe(false);
  });
});
```

- [ ] **Step 2: Run, verify fail**

Run: `pnpm test industry`
Expected: FAIL (module not found).

- [ ] **Step 3: Implement the type and loader**

Create `lib/content/industry.ts`:
```ts
export type Industry = {
  slug: string;
  name: string;
  published: boolean;
  seo: { title: string; description: string };
  hero: { eyebrow: string; headline: string; subhead: string };
  painStats: { value: string; label: string }[];
  problem: { heading: string; body: string };
  outcomes: { metric: string; caption: string }[];
  integrations: string[];
  faqs: { q: string; a: string }[];
};

import { hvac } from "./industries/hvac";

const registry: Record<string, Industry> = { hvac };

export function getIndustry(slug: string): Industry | undefined {
  return registry[slug];
}
export function getPublishedIndustries(): Industry[] {
  return Object.values(registry).filter((i) => i.published);
}
```

- [ ] **Step 4: Implement HVAC data**

Create `lib/content/industries/hvac.ts` (all strings em-dash free; illustrative stats labeled in copy):
```ts
import type { Industry } from "../industry";

export const hvac: Industry = {
  slug: "hvac",
  name: "HVAC",
  published: true,
  seo: {
    title: "AI Receptionist for HVAC Companies",
    description:
      "An AI voice agent that answers every HVAC call in two rings, books the job into ServiceTitan, Jobber, or Housecall Pro, and works around the clock.",
  },
  hero: {
    eyebrow: "AI voice agents for HVAC",
    headline: "Never miss another HVAC call.",
    subhead:
      "Your AI agent answers in two rings, sounds human, and books the job into your CRM. Nights, weekends, and the busy season included.",
  },
  painStats: [
    { value: "27%", label: "of HVAC calls go unanswered. Industry estimate." },
    { value: "2", label: "rings to answer, every single time." },
    { value: "$1.5k", label: "average job value walking away." },
  ],
  problem: {
    heading: "In HVAC, the first company to answer usually wins the job.",
    body:
      "Heat waves and cold snaps bury your phones. Calls pile up after hours. Every missed call is a homeowner who dials the next contractor on the list.",
  },
  outcomes: [
    { metric: "11", caption: "jobs booked in week one. Illustrative." },
    { metric: "0", caption: "missed calls after going live." },
    { metric: "48h", caption: "from kickoff to answering." },
  ],
  integrations: ["ServiceTitan", "Housecall Pro", "Jobber", "Google Calendar"],
  faqs: [
    { q: "Does it work after hours and on weekends?", a: "Yes. The agent answers every hour of every day, including holidays and the busy season." },
    { q: "Will it book into my CRM?", a: "Yes. It schedules the job into ServiceTitan, Housecall Pro, Jobber, or Google Calendar while the caller is still on the line." },
    { q: "Can it transfer urgent calls to a person?", a: "Yes. You set the rules. Emergencies and complex jobs route straight to your on-call tech." },
    { q: "How long does setup take?", a: "Most HVAC teams are live within 48 hours, with no changes to your phone system." },
  ],
};
```

- [ ] **Step 5: Run tests, verify pass**

Run: `pnpm test industry`
Expected: PASS (4 tests). Then re-run `pnpm test sitemap` (now passes).

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: niche content model + hvac data"
```

---

## Task 10: Home section components (port Direction D)

**Files:**
- Create: `components/sections/Hero.tsx`, `LogoStrip.tsx`, `MissedCallCost.tsx`, `AgentCapabilities.tsx`, `HowItWorks.tsx`, `DemoBand.tsx`, `Proof.tsx`, `IndustriesTeaser.tsx`, `PricingTeaser.tsx`, `FinalCta.tsx`

Markup source: the matching sections in `mockups/direction-d-blend.html`. For each component: port the markup, replace raw hex/utility colors with token classes (`text-ink`, `bg-cobalt`, `bg-paper`, `bg-surface`), swap `<i class="ph ...">` for Phosphor React icons, wrap animated blocks in `<Reveal>`, use `Container`/`Section`/`Button`. Images use `next/image` with explicit width/height and `priority` on the hero image only. Placeholder images: keep `https://picsum.photos/seed/<seed>/<w>/<h>` for now (replaced with real assets in a later task); configure the domain in `next.config.ts` `images.remotePatterns`.

- [ ] **Step 1: Allow placeholder image host**

In `next.config.ts`, add:
```ts
images: { remotePatterns: [{ protocol: "https", hostname: "picsum.photos" }] },
```

- [ ] **Step 2: Hero**

Create `components/sections/Hero.tsx`. Props: `{ eyebrow: string; headline: ReactNode; subhead: string }`. Port the hero block (eyebrow pill, display headline, subhead, primary `Button` to `site.ctaHref`, secondary `Button` variant="secondary" linking to `/#demo`, the image card with the "Incoming call answered / Booked" footer). Use `next/image` with `priority`. Headline max 2 lines, subhead is the provided string (already <= 20 words for HVAC and Home).

- [ ] **Step 3: LogoStrip**

Create `components/sections/LogoStrip.tsx`. Props: `{ heading?: string; tools: string[] }`. Renders the heading and wordmarks. Logos-only, no category labels.

- [ ] **Step 4: MissedCallCost**

Create `components/sections/MissedCallCost.tsx`. Props: `{ heading: string; body: string; stats: { value: string; label: string }[] }`. Port the eyebrow + heading + body + mono stat trio + the `ink` Button linking to `/tools/missed-call-calculator`.

- [ ] **Step 5: AgentCapabilities**

Create `components/sections/AgentCapabilities.tsx`. Port the "A receptionist that never takes a day off" grid (6 capability cells, divided grid). Static content. Phosphor icons: IdentificationCard, CalendarCheck, PhoneTransfer, ChatText, Question, MoonStars.

- [ ] **Step 6: HowItWorks**

Create `components/sections/HowItWorks.tsx`. Port the 4-step editorial list (numbered, verb-noun headings, no "Step 1" labels). Phosphor: PhoneIncoming, ChatsCircle, CalendarCheck, ArrowsClockwise.

- [ ] **Step 7: DemoBand**

Create `components/sections/DemoBand.tsx` as a thin wrapper that renders heading/copy and embeds `<DemoCall />` (Task 11) for the interactive controls and the animated waveform. Dark `bg-ink` band.

- [ ] **Step 8: Proof**

Create `components/sections/Proof.tsx`. Props: `{ quote: string; name: string; role: string; outcomes: { metric: string; caption: string }[] }`. Photo-forward layout. Include the small "Illustrative" tag next to attribution.

- [ ] **Step 9: IndustriesTeaser**

Create `components/sections/IndustriesTeaser.tsx`. Reads `getPublishedIndustries()` for the live tile(s) (HVAC links to `/industries/hvac`) and renders fixed "coming soon" tiles for Plumbing, Roofing, Electrical (non-linked).

- [ ] **Step 10: PricingTeaser + FinalCta**

Create `components/sections/PricingTeaser.tsx` ("From $1,500/mo", guarantee line, Button to `site.ctaHref`) and `components/sections/FinalCta.tsx` (ink band, headline, primary + secondary Buttons).

- [ ] **Step 11: Verify all render in isolation**

Temporarily compose them in `app/page.tsx`, run `pnpm dev`, scroll the page. Confirm: one accent throughout, reveals fire, buttons press, no console errors, mobile single-column.

- [ ] **Step 12: Commit**

```bash
git add -A
git commit -m "feat: home section components (direction D)"
```

---

## Task 11: DemoCall component (voice seam)

**Files:**
- Create: `components/demo/DemoCall.tsx`

- [ ] **Step 1: Implement provider-agnostic client leaf**

Create `components/demo/DemoCall.tsx`. Requirements:
- `"use client"`.
- Reads `NEXT_PUBLIC_VOICE_PROVIDER`. If empty, the "Start voice demo" button renders disabled with a small "Demo coming online" note; tap-to-call link still works.
- Renders the animated waveform (CSS keyframe `pulse`, reduced-motion collapses to static) and the "Call the demo line" link to `site.phoneHref`.
- The voice start handler is stubbed behind a `startVoiceDemo()` function that, when a provider is set, dynamically imports the relevant SDK (left as a typed TODO with a thrown "not wired" error so it fails loudly, not silently). Document the integration contract in a comment: provider, public key, agent id from env.

```tsx
"use client";
import { useState } from "react";
import { Microphone, PhoneCall, PlayCircle } from "@phosphor-icons/react";
import { site } from "@/lib/config/site";

const provider = process.env.NEXT_PUBLIC_VOICE_PROVIDER;

export function DemoCall() {
  const [status, setStatus] = useState<"idle" | "connecting" | "live" | "unavailable">("idle");
  async function startVoiceDemo() {
    if (!provider) { setStatus("unavailable"); return; }
    setStatus("connecting");
    // Integration contract: import the configured SDK (vapi/retell), start a web call
    // using NEXT_PUBLIC_VOICE_PUBLIC_KEY + NEXT_PUBLIC_VOICE_AGENT_ID, set status "live".
    throw new Error("Voice provider configured but SDK wiring not implemented yet");
  }
  return (
    <div className="rounded-2xl border border-paper/15 bg-white/[0.04] p-6">
      {/* waveform + controls; see mockup demo band for markup */}
      <div className="flex flex-wrap gap-3">
        <button onClick={startVoiceDemo} disabled={!provider}
          className="btn inline-flex items-center gap-2 rounded-xl bg-cobalt px-6 py-3.5 text-sm font-semibold text-white hover:bg-cobalt-dark active:scale-[0.97] disabled:opacity-60">
          <Microphone weight="fill" /> Start voice demo
        </button>
        <a href={site.phoneHref}
          className="btn inline-flex items-center gap-2 rounded-xl border border-paper/25 px-6 py-3.5 text-sm font-semibold text-paper hover:border-paper/50">
          <PhoneCall /> Call the demo line
        </a>
      </div>
      {status === "unavailable" && <p className="mt-3 text-xs text-paper/50">Live voice demo is coming online. Call the demo line for now.</p>}
    </div>
  );
}
```

- [ ] **Step 2: Verify**

Render `<DemoBand />` on a page; confirm the disabled state + tap-to-call work without env, and waveform animates (and stops under reduced motion).

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat: DemoCall voice seam with graceful unwired state"
```

---

## Task 12: Home page

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Compose the Home page (Server Component)**

Replace `app/page.tsx`:
```tsx
import { Hero } from "@/components/sections/Hero";
import { LogoStrip } from "@/components/sections/LogoStrip";
import { MissedCallCost } from "@/components/sections/MissedCallCost";
import { AgentCapabilities } from "@/components/sections/AgentCapabilities";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { DemoBand } from "@/components/sections/DemoBand";
import { Proof } from "@/components/sections/Proof";
import { IndustriesTeaser } from "@/components/sections/IndustriesTeaser";
import { PricingTeaser } from "@/components/sections/PricingTeaser";
import { FinalCta } from "@/components/sections/FinalCta";
import { JsonLd } from "@/components/seo/JsonLd";
import { serviceLd } from "@/lib/seo/structured-data";
import { buildMetadata } from "@/lib/seo/metadata";
import { site } from "@/lib/config/site";

export const metadata = buildMetadata({
  title: "AI Voice Agents That Answer Every Call",
  description: site.description,
  path: "/",
});

export default function Home() {
  return (
    <>
      <JsonLd data={serviceLd({ name: "AI Voice Receptionist", description: site.description, url: site.url })} />
      <Hero eyebrow="AI voice agents for home services" headline={<>Answer every call.<br />Book every job.</>}
        subhead="An AI voice agent that answers in two rings, sounds human, and books the job straight into your CRM. Around the clock." />
      <LogoStrip heading="Books into the tools you already run" tools={["ServiceTitan", "Housecall Pro", "Jobber", "Google Calendar"]} />
      <MissedCallCost heading="A missed call is not a missed call. It is a lost customer."
        body="Most home-services businesses miss one in four calls, and after hours it gets worse. Every one is a job that goes to whoever picks up first."
        stats={[{ value: "27%", label: "of calls go unanswered. Industry estimate." }, { value: "2", label: "rings to answer, every single time." }, { value: "$1.5k", label: "average job value walking away." }]} />
      <AgentCapabilities />
      <HowItWorks />
      <DemoBand />
      <Proof quote="We were missing calls every evening. The agent booked eleven jobs in our first week without us lifting a finger."
        name="Dustin Vargas" role="Owner, Northline Heating and Air"
        outcomes={[{ metric: "11", caption: "jobs booked, week one" }, { metric: "0", caption: "missed calls" }, { metric: "48h", caption: "to go live" }]} />
      <IndustriesTeaser />
      <PricingTeaser />
      <FinalCta />
    </>
  );
}
```

- [ ] **Step 2: Verify build + run**

Run: `pnpm build && pnpm start`. Open http://localhost:3000. Confirm full page renders, metadata title correct (view source), Service + Organization JSON-LD present.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat: home page"
```

---

## Task 13: Industries parent + niche template

**Files:**
- Create: `components/industry/IndustryPage.tsx`, `app/industries/page.tsx`, `app/industries/[slug]/page.tsx`

- [ ] **Step 1: IndustryPage composition**

Create `components/industry/IndustryPage.tsx`. Props: `{ industry: Industry }`. Compose, reusing shared sections: niche `Hero` (from `industry.hero`), `MissedCallCost` (from `industry.problem` + `industry.painStats`), `HowItWorks`, a `LogoStrip` (from `industry.integrations`), `Proof`/outcomes (from `industry.outcomes`), an FAQ block (from `industry.faqs`), `DemoBand`, `FinalCta`.

- [ ] **Step 2: Niche route with static params + metadata + JSON-LD**

Create `app/industries/[slug]/page.tsx`:
```tsx
import { notFound } from "next/navigation";
import { getIndustry, getPublishedIndustries } from "@/lib/content/industry";
import { IndustryPage } from "@/components/industry/IndustryPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { serviceLd, faqPageLd, breadcrumbLd } from "@/lib/seo/structured-data";
import { buildMetadata } from "@/lib/seo/metadata";
import { site } from "@/lib/config/site";

export function generateStaticParams() {
  return getPublishedIndustries().map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const i = getIndustry(slug);
  if (!i || !i.published) return {};
  return buildMetadata({ title: i.seo.title, description: i.seo.description, path: `/industries/${i.slug}` });
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const i = getIndustry(slug);
  if (!i || !i.published) notFound();
  const url = new URL(`/industries/${i.slug}`, site.url).toString();
  return (
    <>
      <JsonLd data={[
        serviceLd({ name: i.seo.title, description: i.seo.description, url }),
        faqPageLd(i.faqs),
        breadcrumbLd([{ name: "Industries", url: new URL("/industries", site.url).toString() }, { name: i.name, url }]),
      ]} />
      <IndustryPage industry={i} />
    </>
  );
}
```

- [ ] **Step 3: Industries parent grid**

Create `app/industries/page.tsx` with `buildMetadata`, an intro, and a grid: published niches link through (`getPublishedIndustries()`), plus non-linked "coming soon" tiles. No crawlable thin pages for unpublished niches.

- [ ] **Step 4: Verify**

Run `pnpm build`. Confirm `/industries/hvac` is statically generated and `/industries/dental` 404s. Open both in `pnpm start`. Validate HVAC page has Service + FAQPage + BreadcrumbList JSON-LD (view source).

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: industries parent + data-driven niche template (hvac)"
```

---

## Task 14: ROI calculator (TDD)

**Files:**
- Create: `lib/calc/roi.ts`, `components/calc/MissedCallCalculator.tsx`, `app/tools/missed-call-calculator/page.tsx`
- Test: `test/roi.test.ts`

- [ ] **Step 1: Write failing tests for the calc**

Create `test/roi.test.ts`:
```ts
import { describe, it, expect } from "vitest";
import { estimateLostRevenue } from "@/lib/calc/roi";

describe("estimateLostRevenue", () => {
  it("computes monthly and annual lost revenue", () => {
    const r = estimateLostRevenue({ callsPerWeek: 100, missedPct: 25, avgJobValue: 1500, closeRate: 40 });
    // missed/wk = 25, won-if-answered/wk = 25*0.4 = 10, $/wk = 15000, monthly = 15000 * 4.333
    expect(Math.round(r.monthly)).toBe(64995);
    expect(r.annual).toBeCloseTo(r.monthly * 12);
    expect(r.missedPerMonth).toBeGreaterThan(0);
  });
  it("clamps negative and out-of-range inputs to zero/bounds", () => {
    const r = estimateLostRevenue({ callsPerWeek: -5, missedPct: 250, avgJobValue: -100, closeRate: 40 });
    expect(r.monthly).toBe(0);
  });
});
```

- [ ] **Step 2: Run, verify fail**

Run: `pnpm test roi`
Expected: FAIL (module not found).

- [ ] **Step 3: Implement the pure function**

Create `lib/calc/roi.ts`:
```ts
const WEEKS_PER_MONTH = 4.333;
const clamp = (n: number, min: number, max: number) => Math.min(Math.max(Number.isFinite(n) ? n : 0, min), max);

export type RoiInput = { callsPerWeek: number; missedPct: number; avgJobValue: number; closeRate: number };
export type RoiResult = { missedPerMonth: number; monthly: number; annual: number };

export function estimateLostRevenue(input: RoiInput): RoiResult {
  const calls = clamp(input.callsPerWeek, 0, 100000);
  const missed = clamp(input.missedPct, 0, 100) / 100;
  const job = clamp(input.avgJobValue, 0, 1000000);
  const close = clamp(input.closeRate, 0, 100) / 100;
  const missedPerWeek = calls * missed;
  const wonPerWeek = missedPerWeek * close;
  const monthly = wonPerWeek * job * WEEKS_PER_MONTH;
  return { missedPerMonth: missedPerWeek * WEEKS_PER_MONTH, monthly, annual: monthly * 12 };
}
```

- [ ] **Step 4: Run, verify pass**

Run: `pnpm test roi`
Expected: PASS (2 tests).

- [ ] **Step 5: Calculator UI (client)**

Create `components/calc/MissedCallCalculator.tsx` (`"use client"`): four number inputs (label above input, per the form rules), live result using `estimateLostRevenue`, formatted as USD with `Intl.NumberFormat`, and a primary `Button` to `site.ctaHref`. Inputs have sane defaults (100 / 25 / 1500 / 40).

- [ ] **Step 6: Calculator page**

Create `app/tools/missed-call-calculator/page.tsx` with `buildMetadata` (title "Missed Call Revenue Calculator", path `/tools/missed-call-calculator`), a short intro, the calculator, and `FinalCta`.

- [ ] **Step 7: Verify**

Run `pnpm dev`, open the page, change inputs, confirm the number updates and formats correctly.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat: roi missed-call calculator (logic + page)"
```

---

## Task 15: Lead capture — schema + server action (TDD)

**Files:**
- Create: `lib/leads/schema.ts`, `lib/leads/actions.ts`, `components/forms/LeadForm.tsx`
- Test: `test/leads-schema.test.ts`, `test/leads-action.test.ts`

- [ ] **Step 1: Write failing schema tests**

Create `test/leads-schema.test.ts`:
```ts
import { describe, it, expect } from "vitest";
import { leadSchema } from "@/lib/leads/schema";

describe("leadSchema", () => {
  it("accepts a valid lead", () => {
    const r = leadSchema.safeParse({ name: "Dana Reyes", email: "dana@x.com", phone: "612-555-0199", company: "Northline", industry: "hvac" });
    expect(r.success).toBe(true);
  });
  it("rejects bad email and short phone", () => {
    expect(leadSchema.safeParse({ name: "A", email: "nope", phone: "1" }).success).toBe(false);
  });
});
```

- [ ] **Step 2: Run, verify fail**

Run: `pnpm test leads-schema`
Expected: FAIL.

- [ ] **Step 3: Implement schema**

Create `lib/leads/schema.ts`:
```ts
import { z } from "zod";
export const leadSchema = z.object({
  name: z.string().min(2, "Enter your name"),
  company: z.string().optional(),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(7, "Enter a valid phone"),
  industry: z.string().optional(),
  source: z.string().optional(),
  message: z.string().optional(),
});
export type LeadInput = z.infer<typeof leadSchema>;
```

- [ ] **Step 4: Run, verify pass**

Run: `pnpm test leads-schema`
Expected: PASS.

- [ ] **Step 5: Write failing action test (mocked deps)**

Create `test/leads-action.test.ts`:
```ts
import { describe, it, expect, vi, beforeEach } from "vitest";

const insert = vi.fn().mockResolvedValue({ error: null });
vi.mock("@/lib/db/supabase", () => ({
  getServiceClient: () => ({ from: () => ({ insert }) }),
}));
const notify = vi.fn().mockResolvedValue({ skipped: false });
vi.mock("@/lib/email/resend", () => ({ sendLeadNotification: notify }));

import { createLead } from "@/lib/leads/actions";

describe("createLead", () => {
  beforeEach(() => { insert.mockClear(); notify.mockClear(); });
  it("returns error on invalid input and does not insert", async () => {
    const res = await createLead({ name: "", email: "bad", phone: "" });
    expect(res.ok).toBe(false);
    expect(insert).not.toHaveBeenCalled();
  });
  it("inserts and notifies on valid input", async () => {
    const res = await createLead({ name: "Dana Reyes", email: "dana@x.com", phone: "612-555-0199", industry: "hvac" });
    expect(res.ok).toBe(true);
    expect(insert).toHaveBeenCalledOnce();
    expect(notify).toHaveBeenCalledOnce();
  });
});
```

- [ ] **Step 6: Run, verify fail**

Run: `pnpm test leads-action`
Expected: FAIL (module not found).

- [ ] **Step 7: Implement the server action**

Create `lib/leads/actions.ts`:
```ts
"use server";
import { leadSchema, type LeadInput } from "./schema";
import { getServiceClient } from "@/lib/db/supabase";
import { sendLeadNotification } from "@/lib/email/resend";

export async function createLead(raw: LeadInput): Promise<{ ok: boolean; error?: string }> {
  const parsed = leadSchema.safeParse(raw);
  if (!parsed.success) return { ok: false, error: "Please check the form and try again." };
  const lead = parsed.data;
  try {
    const supabase = getServiceClient();
    const { error } = await supabase.from("leads").insert({ ...lead, status: "new" });
    if (error) return { ok: false, error: "We could not save your request. Please call us." };
    await sendLeadNotification(lead);
    return { ok: true };
  } catch {
    return { ok: false, error: "Something went wrong. Please call us." };
  }
}
```

- [ ] **Step 8: Run, verify pass**

Run: `pnpm test leads-action`
Expected: PASS (2 tests).

- [ ] **Step 9: Lead form component**

Create `components/forms/LeadForm.tsx` (`"use client"`): RHF + `zodResolver(leadSchema)`, fields name/company/email/phone (+ hidden `source`, `industry` props), labels above inputs, errors below, calls `createLead`, shows success and error states (no `alert`). Submit button uses `Button`.

- [ ] **Step 10: Commit**

```bash
git add -A
git commit -m "feat: lead capture (schema, server action, form)"
```

---

## Task 16: Book-a-demo page (Cal.com)

**Files:**
- Create: `app/book-a-demo/page.tsx`, `components/demo/CalEmbed.tsx`

- [ ] **Step 1: Cal.com embed (client)**

Create `components/demo/CalEmbed.tsx`:
```tsx
"use client";
import Cal from "@calcom/embed-react";
export function CalEmbed() {
  const link = process.env.NEXT_PUBLIC_CALCOM_LINK;
  if (!link) return null;
  return <Cal calLink={link} style={{ width: "100%", height: "100%", overflow: "scroll" }} config={{ theme: "light" }} />;
}
```

- [ ] **Step 2: Book-a-demo page**

Create `app/book-a-demo/page.tsx` with `buildMetadata` (title "Book a Demo", path `/book-a-demo`), an intro, `<CalEmbed />`, and `<LeadForm source="book-a-demo" />` as a fallback below the calendar (so the page captures a lead even without `NEXT_PUBLIC_CALCOM_LINK`).

- [ ] **Step 3: Verify**

Run `pnpm dev`. Without the Cal env, the lead form still works and submits (returns the configured error path if Supabase env is absent; that is expected locally). With the env set, the calendar renders.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: book-a-demo page (cal.com embed + lead form fallback)"
```

---

## Task 17: Final SEO + performance pass

**Files:**
- Modify: `app/layout.tsx` (metadataBase), various (alt text audit)

- [ ] **Step 1: Set metadataBase + default OG**

In `app/layout.tsx` `metadata`, add `metadataBase: new URL(site.url)` so canonical/OG resolve absolutely.

- [ ] **Step 2: Run the full test suite**

Run: `pnpm test`
Expected: all tests pass (structured-data, sitemap, industry, roi, leads-schema, leads-action).

- [ ] **Step 3: Production build**

Run: `pnpm build`
Expected: build succeeds; `/` and `/industries/hvac` are static; no type errors.

- [ ] **Step 4: Lighthouse on Home and HVAC**

Run `pnpm start`, then run Lighthouse (Chrome DevTools or `pnpm dlx @lhci/cli autorun` if configured) against `/` and `/industries/hvac`.
Expected: Performance, Accessibility, Best Practices, SEO each 95+. Fix any flagged contrast, alt-text, or CLS issues (reserve image dimensions, ensure hero image `priority`).

- [ ] **Step 5: Em-dash + AI-tell final scan**

Run a search for em-dashes across rendered copy:
```bash
git grep -n $'—' -- "*.tsx" "*.ts" || echo "no em-dashes"
git grep -n $'–' -- "*.tsx" "*.ts" || echo "no en-dashes"
```
Expected: "no em-dashes" / "no en-dashes". Fix any hits.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "chore: final seo + performance pass for foundation + hvac slice"
```

---

## Out of scope for this plan (separate plans)

`/how-it-works`, `/integrations`, `/compare/*`, `/case-studies/*`, `/pricing`, `/about`, `/blog` (MDX), legal pages, additional niches, real photography swap, CRM write-back, dual-mode dark theme, live voice SDK wiring (the `DemoCall` seam is ready; wiring lands when the agent platform is chosen).

---

## Self-review notes

- **Spec coverage:** Foundation (tokens, layout, SEO lib, analytics, data layer) → Tasks 3-8. Niche engine → Tasks 9, 13. Home blocks → Tasks 10, 12. Demo seam → Task 11. ROI calculator → Task 14. Lead capture + storage → Task 15. Book-a-demo → Task 16. Correct schema (no LocalBusiness) → Task 6 (tested). Sitemap gating to published niches → Tasks 6, 9 (tested). Remaining spec pages are explicitly deferred above.
- **No placeholders:** logic tasks ship complete code + tests; visual tasks name the exact mockup source and the precise conversions, with component skeletons for the non-obvious ones (Header, DemoCall, Cal embed).
- **Type consistency:** `Industry` fields used in `hvac.ts`, `IndustryPage`, niche route, and `getPublishedIndustries` match. `estimateLostRevenue`/`RoiInput`/`RoiResult`, `leadSchema`/`LeadInput`/`createLead`, and the structured-data builders are referenced with consistent signatures across tasks.
