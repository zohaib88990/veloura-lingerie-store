"use client";
import Image from "next/image";
import Link from "next/link";
import { Heart, ArrowUpRight } from "lucide-react";
import { type Product, formatPrice } from "@/lib/catalog";
import { useShop } from "./shop-provider";

export function ProductCard({ product }: { product: Product }) {
  const { favorites, toggleFavorite } = useShop();
  const saved = favorites.includes(product.id);
  return (
    <article className="product-card">
      <div className="product-image-wrap">
        <Link
          href={`/products/${product.id}`}
          className="product-image-link"
          aria-label={`Shop ${product.name}`}
        >
          <Image
            src={product.image}
            alt={`${product.name} in ${product.colors[0].name}`}
            width={600}
            height={750}
          />
          <span className="product-hover">
            Discover the details <ArrowUpRight size={16} />
          </span>
        </Link>
        {product.badge && (
          <span className="product-badge">{product.badge}</span>
        )}
        <button
          className={`favorite-button ${saved ? "saved" : ""}`}
          aria-label={`${saved ? "Remove" : "Save"} ${product.name} ${saved ? "from" : "to"} wishlist`}
          aria-pressed={saved}
          onClick={() => toggleFavorite(product.id)}
        >
          <Heart size={18} fill={saved ? "currentColor" : "none"} />
        </button>
      </div>
      <div className="product-title">
        <Link href={`/products/${product.id}`}>{product.name}</Link>
        <span>{formatPrice(product.price)}</span>
      </div>
      <p className="product-subtitle">{product.subtitle}</p>
      <div className="swatches" role="group" aria-label="Available colors">
        {product.colors.map((c) => (
          <span
            role="img"
            key={c.name}
            style={{ backgroundColor: c.hex }}
            title={c.name}
            aria-label={c.name}
          />
        ))}
      </div>
    </article>
  );
}
