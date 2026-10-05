import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { isCartItem, cartTotals, itemKey, type CartItem } from "@/lib/cart";
import { getProduct } from "@/lib/catalog";

export async function POST(request: NextRequest) {
  const key = process.env.STRIPE_SECRET_KEY;
  const site = process.env.SITE_URL;
  const countries = process.env.STORE_COUNTRIES?.split(",").map((c) =>
    c.trim().toUpperCase(),
  );
  if (!key || !site || !countries?.length)
    return NextResponse.json(
      { error: "Secure checkout has not been enabled by the merchant yet." },
      { status: 503 },
    );
  let origin: string;
  try {
    const url = new URL(site);
    if (!["https:", "http:"].includes(url.protocol)) throw new Error();
    origin = url.origin;
  } catch {
    return NextResponse.json(
      { error: "Checkout configuration needs attention." },
      { status: 503 },
    );
  }
  if (
    request.headers.get("origin") !== origin &&
    request.headers.get("origin") !== request.nextUrl.origin
  )
    return NextResponse.json(
      { error: "Request origin is not allowed." },
      { status: 403 },
    );
  if (Number(request.headers.get("content-length")) > 16384)
    return NextResponse.json({ error: "Bag is too large." }, { status: 413 });
  let items: CartItem[];
  try {
    const body = await request.json();
    if (
      !Array.isArray(body.items) ||
      body.items.length === 0 ||
      body.items.length > 50 ||
      !body.items.every(isCartItem)
    )
      throw new Error();
    items = body.items;
    if (new Set(items.map(itemKey)).size !== items.length) throw new Error();
  } catch {
    return NextResponse.json(
      { error: "Please check your bag and try again." },
      { status: 400 },
    );
  }
  try {
    const stripe = new Stripe(key, { maxNetworkRetries: 2, timeout: 15000 });
    const { shipping } = cartTotals(items);
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: items.map((i) => {
        const p = getProduct(i.productId)!;
        return {
          quantity: i.quantity,
          price_data: {
            currency: "usd",
            unit_amount: p.price,
            product_data: {
              name: p.name,
              description: `${i.color} / ${i.size}`,
              metadata: { productId: p.id, size: i.size, color: i.color },
            },
          },
        };
      }),
      shipping_address_collection: {
        allowed_countries:
          countries as Stripe.Checkout.SessionCreateParams.ShippingAddressCollection.AllowedCountry[],
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: { amount: shipping, currency: "usd" },
            display_name: shipping
              ? "Standard shipping"
              : "Complimentary shipping",
          },
        },
      ],
      billing_address_collection: "required",
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout?canceled=1`,
      metadata: { store: "veloura" },
    });
    return NextResponse.json({ url: session.url });
  } catch {
    return NextResponse.json(
      {
        error:
          "Secure checkout is temporarily unavailable. Please try again later.",
      },
      { status: 502 },
    );
  }
}
