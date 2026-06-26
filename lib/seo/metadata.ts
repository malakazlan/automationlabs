import type { Metadata } from "next";
import { site } from "@/lib/config/site";

export function buildMetadata(input: {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
}): Metadata {
  const url = new URL(input.path, site.url).toString();
  return {
    title: input.title,
    description: input.description,
    alternates: { canonical: url },
    openGraph: {
      title: input.title,
      description: input.description,
      url,
      siteName: site.name,
      type: "website",
      images: input.ogImage ? [{ url: input.ogImage }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: input.title,
      description: input.description,
    },
  };
}
