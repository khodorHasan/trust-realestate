import { notFound } from "next/navigation";
import PropertyDetail from "./PropertyDetail";
import properties from "../data/properties.json";

export default async function PropertyPage({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string };
}) {
  const resolvedParams = await params;
  const rawSlug = resolvedParams.slug;
  const decodedSlug = decodeURIComponent(rawSlug);

  const property = properties.find(
    (p) => p.slug === decodedSlug || p.slug === rawSlug,
  );

  if (!property) notFound();

  return <PropertyDetail property={property} />;
}

export function generateStaticParams() {
  return properties.map((p) => ({
    slug: p.slug,
  }));
}
