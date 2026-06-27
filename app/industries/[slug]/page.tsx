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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const i = getIndustry(slug);
  if (!i || !i.published) return {};
  return buildMetadata({
    title: i.seo.title,
    description: i.seo.description,
    path: `/industries/${i.slug}`,
  });
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const i = getIndustry(slug);
  if (!i || !i.published) notFound();
  const url = new URL(`/industries/${i.slug}`, site.url).toString();
  return (
    <>
      <JsonLd
        data={[
          serviceLd({ name: i.seo.title, description: i.seo.description, url }),
          faqPageLd(i.faqs),
          breadcrumbLd([
            { name: "Industries", url: new URL("/industries", site.url).toString() },
            { name: i.name, url },
          ]),
        ]}
      />
      <IndustryPage industry={i} />
    </>
  );
}
