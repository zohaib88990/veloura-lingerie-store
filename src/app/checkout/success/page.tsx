import Link from "next/link";
import Stripe from "stripe";
import { CheckCircle2, ArrowRight } from "lucide-react";
export const dynamic = "force-dynamic";
export const metadata = {
  title: "Payment status",
  robots: { index: false, follow: false },
};
export default async function Success({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id } = await searchParams;
  let paid = false;
  if (
    process.env.STRIPE_SECRET_KEY &&
    session_id?.startsWith("cs_") &&
    session_id.length < 256
  ) {
    try {
      const session = await new Stripe(
        process.env.STRIPE_SECRET_KEY,
      ).checkout.sessions.retrieve(session_id);
      paid =
        session.payment_status === "paid" &&
        session.metadata?.store === "veloura";
    } catch {
      /* Do not claim a successful payment without verification. */
    }
  }
  return (
    <div className="empty-state section success-state">
      {paid && <CheckCircle2 size={48} strokeWidth={1} />}
      <span className="eyebrow">
        {paid ? "A LOVELY LITTLE MOMENT" : "PAYMENT STATUS"}
      </span>
      <h1>{paid ? "Payment confirmed." : "We couldn’t confirm a payment."}</h1>
      <p>
        {paid
          ? "Thank you for choosing Veloura. Your payment was received securely by Stripe. Keep your payment receipt for reference."
          : "No successful payment has been verified on this page. If you were charged, keep your receipt and contact the merchant before trying again."}
      </p>
      <Link href="/shop" className="button">
        Back to the collection <ArrowRight size={17} />
      </Link>
    </div>
  );
}
