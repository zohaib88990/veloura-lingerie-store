import type { Metadata } from "next";
import { Checkout } from "@/components/checkout";
export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Checkout",
  robots: { index: false, follow: false },
};
export default function CheckoutPage() {
  const enabled = !!(
    process.env.STRIPE_SECRET_KEY &&
    process.env.SITE_URL &&
    process.env.STORE_COUNTRIES
  );
  return (
    <>
      <div className="page-heading compact">
        <span className="eyebrow">YOUR FAVOURITES, TOGETHER</span>
        <h1>
          A thoughtful <em>choice.</em>
        </h1>
      </div>
      <Checkout enabled={enabled} />
    </>
  );
}
