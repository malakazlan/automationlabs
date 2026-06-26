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
