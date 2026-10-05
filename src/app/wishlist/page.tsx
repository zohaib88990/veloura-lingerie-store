import type { Metadata } from "next";
import { CatalogView } from "@/components/catalog-view";
export const metadata: Metadata = {
  title: "Your wishlist",
  robots: { index: false },
};
export default function WishlistPage() {
  return (
    <>
      <div className="page-heading">
        <span className="eyebrow">A FEW THINGS TO FALL FOR</span>
        <h1>
          Your <em>wishlist.</em>
        </h1>
        <p>The lovely little pieces you’ve been thinking about.</p>
      </div>
      <div className="section catalog-section">
        <CatalogView wishlist />
      </div>
    </>
  );
}
