"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight, LockKeyhole, ShoppingBag } from "lucide-react";
import { useShop } from "./shop-provider";
import { getProduct, formatPrice } from "@/lib/catalog";
import { cartTotals, itemKey } from "@/lib/cart";

export function Checkout({ enabled }: { enabled: boolean }) {
  const { cart, setBagOpen } = useShop();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const { subtotal, shipping, total } = cartTotals(cart);
  async function pay() {
    setBusy(true);
    setError("");
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: cart }),
      });
      const result = await response.json();
      if (!response.ok || !result.url)
        throw new Error(
          result.error ||
            "Checkout is temporarily unavailable. Please try again.",
        );
      const destination = new URL(result.url);
      if (
        destination.protocol !== "https:" ||
        destination.hostname !== "checkout.stripe.com"
      )
        throw new Error("The checkout link could not be verified.");
      window.location.assign(destination.href);
    } catch (e) {
      setError(
        e instanceof Error ? e.message : "Unable to connect to checkout.",
      );
      setBusy(false);
    }
  }
  if (!cart.length)
    return (
      <div className="empty-state section checkout-empty">
        <ShoppingBag size={42} strokeWidth={1} />
        <h2>Your next favourite is waiting.</h2>
        <p>Add a piece to your bag before checking out.</p>
        <Link className="button" href="/shop">
          Discover the collection <ArrowRight size={17} />
        </Link>
      </div>
    );
  return (
    <div className="checkout-layout section">
      <section className="checkout-info">
        <span className="eyebrow">ALMOST YOURS</span>
        <h2>
          A little luxury,
          <br />
          <em>on its way.</em>
        </h2>
        <p>
          Review your favourites before continuing to secure checkout. Delivery
          and billing information are collected by our payment provider.
        </p>
        <div className="checkout-callout">
          <LockKeyhole size={23} />
          <div>
            <h3>
              {enabled
                ? "Secure payment with Stripe"
                : "Checkout is not enabled yet"}
            </h3>
            <p>
              {enabled
                ? "Your payment details are handled securely by Stripe. We never store card information."
                : "This store is awaiting merchant payment setup. You can explore, save favourites and build your bag. No payment or order will be taken."}
            </p>
          </div>
        </div>
        <Link href="/help#shipping" className="text-link">
          Shipping & return information <ArrowRight size={16} />
        </Link>
      </section>
      <section className="checkout-summary">
        <div className="checkout-summary-head">
          <h2>Order summary</h2>
          <button className="text-button" onClick={() => setBagOpen(true)}>
            Edit bag
          </button>
        </div>
        {cart.map((i) => {
          const p = getProduct(i.productId)!;
          return (
            <div className="checkout-item" key={itemKey(i)}>
              <Image src={p.image} alt={p.name} width={68} height={85} />
              <div>
                <h3>{p.name}</h3>
                <p>
                  {i.color} / {i.size} · Qty {i.quantity}
                </p>
              </div>
              <span>{formatPrice(p.price * i.quantity)}</span>
            </div>
          );
        })}
        <div className="bag-summary">
          <div>
            <span>Subtotal</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <div>
            <span>Shipping</span>
            <span>{shipping ? formatPrice(shipping) : "Complimentary"}</span>
          </div>
          <div className="total">
            <span>Estimated total</span>
            <span>{formatPrice(total)}</span>
          </div>
          <p>
            USD. Applicable taxes, if any, are confirmed at secure checkout.
          </p>
          <button
            className="button full-width"
            disabled={!enabled || busy}
            onClick={pay}
          >
            {busy
              ? "Connecting to secure checkout…"
              : enabled
                ? "Continue to secure checkout"
                : "Payment setup pending"}
            <LockKeyhole size={16} />
          </button>
          {error && (
            <p role="alert" className="form-error">
              {error}
            </p>
          )}
          <p>
            By continuing, you agree to our <Link href="/terms">terms</Link> and{" "}
            <Link href="/privacy">privacy policy</Link>.
          </p>
        </div>
      </section>
    </div>
  );
}
