"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  Heart,
  Ruler,
  Truck,
  RotateCcw,
  ShieldCheck,
  Check,
} from "lucide-react";
import { type Product, formatPrice } from "@/lib/catalog";
import { useShop } from "./shop-provider";
import { Dialog } from "./dialog";

export function ProductDetail({ product }: { product: Product }) {
  const [size, setSize] = useState("");
  const [color, setColor] = useState(product.colors[0].name);
  const [sizeGuide, setSizeGuide] = useState(false);
  const [error, setError] = useState(false);
  const { addToBag, favorites, toggleFavorite } = useShop();
  return (
    <>
      <div className="breadcrumbs">
        <Link href="/">Home</Link>
        <span>/</span>
        <Link href="/shop">The collection</Link>
        <span>/</span>
        <span>{product.name}</span>
      </div>
      <section className="product-detail">
        <div className="detail-product-image">
          <Image
            src={product.image}
            alt={`${product.name}, shown in ${product.colors[0].name}`}
            width={600}
            height={750}
            priority
          />
          {product.badge && (
            <span className="product-badge">{product.badge}</span>
          )}
          <div className="image-caption">
            THOUGHTFULLY DESIGNED. INTIMATELY YOURS.
          </div>
        </div>
        <div className="product-info">
          <span className="eyebrow">{product.category.toUpperCase()}</span>
          <h1>{product.name}</h1>
          <p className="detail-subtitle">{product.subtitle}</p>
          <p className="detail-price">
            {formatPrice(product.price)} <span>USD</span>
          </p>
          <p className="detail-description">{product.description}</p>
          <div className="color-selection">
            <p>
              Colour — <strong>{color}</strong>
            </p>
            <div>
              {product.colors.map((c) => (
                <button
                  key={c.name}
                  style={{ backgroundColor: c.hex }}
                  aria-label={`Select ${c.name}`}
                  aria-pressed={color === c.name}
                  className={color === c.name ? "chosen" : ""}
                  onClick={() => setColor(c.name)}
                >
                  {color === c.name && (
                    <Check
                      size={16}
                      color={
                        c.name === "Ivory" || c.name === "Champagne"
                          ? "#3a302c"
                          : "white"
                      }
                    />
                  )}
                </button>
              ))}
            </div>
            <small>
              Artwork shown in {product.colors[0].name}; colour options may vary
              in appearance.
            </small>
          </div>
          <div className="size-heading">
            <p>Size {size && `— ${size}`}</p>
            <button className="text-button" onClick={() => setSizeGuide(true)}>
              <Ruler size={16} /> Size guide
            </button>
          </div>
          <div
            className="size-selection"
            role="group"
            aria-label="Choose your size"
          >
            {product.sizes.map((s) => (
              <button
                key={s}
                className={size === s ? "chosen" : ""}
                aria-pressed={size === s}
                onClick={() => {
                  setSize(s);
                  setError(false);
                }}
              >
                {s}
              </button>
            ))}
          </div>
          <p className="size-note" role="alert">
            {error
              ? "Please choose your size before adding to your bag."
              : "An easy fit. Choose your usual size."}
          </p>
          <div className="product-add-row">
            <button
              className="button"
              onClick={() => {
                if (!size) {
                  setError(true);
                  return;
                }
                addToBag({ productId: product.id, size, color });
              }}
            >
              Add to bag <ArrowRight size={18} />
            </button>
            <button
              className="favorite-detail"
              aria-label={`${favorites.includes(product.id) ? "Remove from" : "Add to"} wishlist`}
              aria-pressed={favorites.includes(product.id)}
              onClick={() => toggleFavorite(product.id)}
            >
              <Heart
                size={21}
                fill={favorites.includes(product.id) ? "currentColor" : "none"}
              />
            </button>
          </div>
          <div className="product-promises">
            <span>
              <Truck size={17} /> Complimentary shipping $150+
            </span>
            <span>
              <RotateCcw size={17} /> See our return eligibility guide
            </span>
            <span>
              <ShieldCheck size={17} /> Secure checkout when enabled
            </span>
          </div>
          <div className="product-accordions">
            <details open>
              <summary>Fabric & care</summary>
              <p>{product.material}</p>
              <p>
                Hand wash cool with a mild detergent. Reshape and air dry flat.
                Do not bleach or tumble dry.
              </p>
            </details>
            <details>
              <summary>Fit & details</summary>
              <p>
                Designed with comfort in mind. See our size guide for body
                measurements. Between sizes? Choose the larger size for a more
                relaxed fit.
              </p>
            </details>
            <details>
              <summary>Shipping & returns</summary>
              <p>
                Standard shipping is $8, complimentary for orders $150 or more.
                Delivery availability is confirmed at checkout. Read the{" "}
                <Link href="/help#shipping">
                  full shipping and return policy
                </Link>{" "}
                before ordering.
              </p>
            </details>
          </div>
        </div>
      </section>
      {sizeGuide && (
        <Dialog
          title="Find your comfortable fit"
          onClose={() => setSizeGuide(false)}
        >
          <p className="dialog-note">
            Measure around the fullest part of your bust and hips, and the
            narrowest part of your waist. All measurements are in inches.
          </p>
          <SizeTable />
          <p className="dialog-note">
            This is our general fit guide. For a relaxed fit or when between
            sizes, choose one size up.
          </p>
        </Dialog>
      )}
    </>
  );
}
export function SizeTable() {
  return (
    <div className="table-scroll">
      <table className="size-table">
        <caption className="sr-only">
          Veloura body measurements in inches
        </caption>
        <thead>
          <tr>
            <th>Size</th>
            <th>Bust</th>
            <th>Waist</th>
            <th>Hip</th>
          </tr>
        </thead>
        <tbody>
          {[
            ["XS", "30–32", "24–26", "33–35"],
            ["S", "32–34", "26–28", "35–37"],
            ["M", "34–36", "28–30", "37–39"],
            ["L", "36–39", "30–33", "39–42"],
            ["XL", "39–42", "33–36", "42–45"],
            ["XXL", "42–45", "36–39", "45–48"],
          ].map((row) => (
            <tr key={row[0]}>
              {row.map((cell, i) =>
                i === 0 ? (
                  <th scope="row" key={i}>
                    {cell}
                  </th>
                ) : (
                  <td key={i}>{cell}</td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
