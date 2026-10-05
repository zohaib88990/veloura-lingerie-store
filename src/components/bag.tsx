"use client";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  Truck,
} from "lucide-react";
import { useShop } from "./shop-provider";
import { Dialog } from "./dialog";
import { getProduct, formatPrice } from "@/lib/catalog";
import { cartTotals, itemKey } from "@/lib/cart";

export function Bag() {
  const { bagOpen, setBagOpen, cart, updateQuantity, removeItem } = useShop();
  if (!bagOpen) return null;
  const { subtotal, shipping, total } = cartTotals(cart);
  return (
    <Dialog
      title={`Your bag (${cart.reduce((s, i) => s + i.quantity, 0)})`}
      onClose={() => setBagOpen(false)}
      drawer
    >
      {cart.length === 0 ? (
        <div className="empty-state">
          <ShoppingBag size={42} strokeWidth={1} />
          <h3>A little space for something lovely.</h3>
          <p>Your bag is waiting for its first favourite.</p>
          <Link
            href="/shop"
            className="button"
            onClick={() => setBagOpen(false)}
          >
            Explore the collection <ArrowRight size={17} />
          </Link>
        </div>
      ) : (
        <>
          <div className="shipping-progress">
            <p>
              <Truck size={17} />
              {subtotal >= 15000
                ? "Your order qualifies for complimentary shipping"
                : `You're ${formatPrice(15000 - subtotal)} from complimentary shipping`}
            </p>
            <div>
              <span
                style={{ width: `${Math.min(100, (subtotal / 15000) * 100)}%` }}
              />
            </div>
          </div>
          <div className="bag-items">
            {cart.map((item) => {
              const product = getProduct(item.productId)!;
              const key = itemKey(item);
              return (
                <article className="bag-item" key={key}>
                  <Link
                    href={`/products/${product.id}`}
                    onClick={() => setBagOpen(false)}
                  >
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={100}
                      height={125}
                    />
                  </Link>
                  <div>
                    <Link
                      href={`/products/${product.id}`}
                      onClick={() => setBagOpen(false)}
                    >
                      {product.name}
                    </Link>
                    <p>
                      {item.color} / {item.size}
                    </p>
                    <strong>
                      {formatPrice(product.price * item.quantity)}
                    </strong>
                    <div className="quantity-row">
                      <div className="quantity-control">
                        <button
                          aria-label={`Decrease quantity of ${product.name}`}
                          disabled={item.quantity === 1}
                          onClick={() => updateQuantity(key, item.quantity - 1)}
                        >
                          <Minus size={13} />
                        </button>
                        <span aria-label="Quantity">{item.quantity}</span>
                        <button
                          aria-label={`Increase quantity of ${product.name}`}
                          disabled={item.quantity === 10}
                          onClick={() => updateQuantity(key, item.quantity + 1)}
                        >
                          <Plus size={13} />
                        </button>
                      </div>
                      <button
                        className="icon-button"
                        aria-label={`Remove ${product.name} from bag`}
                        onClick={() => removeItem(key)}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
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
            <p>USD. Any applicable taxes are calculated at checkout.</p>
            <Link
              href="/checkout"
              className="button full-width"
              onClick={() => setBagOpen(false)}
            >
              Review & checkout <ArrowRight size={17} />
            </Link>
            <button
              className="text-button full-width"
              onClick={() => setBagOpen(false)}
            >
              Continue exploring
            </button>
          </div>
        </>
      )}
    </Dialog>
  );
}
