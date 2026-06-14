# Simple Automation Labs

Marketing and conversion website for Simple Automation Labs, an AI voice-agent agency for home-services businesses (HVAC first). Built with Next.js (App Router), Tailwind, and an SEO-first, data-driven niche architecture.

## Repo layout

- `docs/superpowers/specs/` — design spec (source of truth for product + design)
- `docs/superpowers/plans/` — implementation plan (foundation + HVAC slice)
- `mockups/` — static design-direction mockups (Direction D selected). Reference only; the real site is built in Next.js.
- `tools/imagegen/` — OpenAI image-generation script + manifest for the photography set

The Next.js app is scaffolded into this repo root during implementation (see the plan, Task 1).

## Design direction

Direction D ("Operator x Dispatch"): warm paper canvas, cobalt accent, Bricolage Grotesque display, Geist body. Tokens are recorded in the spec, section 10.

## Image generation

```bash
# create a gitignored key file: automation/.image-gen.env  ->  OPENAI_API_KEY=sk-...
python tools/imagegen/generate.py
```
