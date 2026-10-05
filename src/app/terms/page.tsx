import Link from "next/link";
export const metadata = { title: "Terms of use" };
export default function Terms() {
  return (
    <div className="legal-page section prose">
      <span className="eyebrow">A FEW IMPORTANT DETAILS</span>
      <h1>Terms of use</h1>
      <p>
        This storefront presents the Veloura collection. Before accepting
        orders, the merchant must supply its legal identity, support contact,
        shipping destinations, fulfillment procedures and final return terms.
      </p>
      <h2>Products and prices</h2>
      <p>
        Prices are displayed in US dollars. Product illustrations are artistic
        representations; appearance, colours and fit may differ from physical
        garments. Availability and any applicable taxes are confirmed at
        checkout.
      </p>
      <h2>Checkout and payment</h2>
      <p>
        Shopping bag actions do not reserve inventory or constitute an order.
        Payment is available only once the merchant enables Stripe checkout. A
        verified payment receipt is evidence of payment; delivery timing and
        fulfillment remain the merchant’s responsibility.
      </p>
      <h2>Shipping and returns</h2>
      <p>
        Standard shipping is $8, with complimentary shipping on orders of $150
        or more. Read the{" "}
        <Link href="/help#shipping">shipping and return eligibility guide</Link>{" "}
        before placing an order. Hygiene restrictions may apply to intimate
        garments.
      </p>
      <h2>Using the website</h2>
      <p>
        Use this website lawfully and do not interfere with its security or
        availability. The brand presentation, editorial content and
        illustrations belong to this project and may not be represented as
        another merchant’s products.
      </p>
    </div>
  );
}
