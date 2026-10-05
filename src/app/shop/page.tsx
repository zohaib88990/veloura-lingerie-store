import type { Metadata } from "next";
import { CatalogView } from "@/components/catalog-view";
export const metadata: Metadata = {
  title: "The collection",
  description:
    "Shop thoughtfully designed lingerie sets, bralettes, briefs and satin sleepwear.",
};
export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; q?: string }>;
}) {
  const { category, q } = await searchParams;
  return (
    <>
      <div className="page-heading">
        <span className="eyebrow">BEAUTIFUL THINGS, EVERYDAY MOMENTS</span>
        <h1>
          The <em>collection.</em>
        </h1>
        <p>
          Your softer side. Your confident side. A little something for every
          you.
        </p>
      </div>
      <div className="section catalog-section">
        <CatalogView
          key={`${category}-${q}`}
          initialCategory={category}
          initialQuery={q}
        />
      </div>
    </>
  );
}
