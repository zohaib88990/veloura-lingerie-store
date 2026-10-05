"use client";
import { useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { products, categories } from "@/lib/catalog";
import { ProductCard } from "./product-card";
import { useShop } from "./shop-provider";

export function CatalogView({
  initialCategory = "All",
  initialQuery = "",
  wishlist = false,
}: {
  initialCategory?: string;
  initialQuery?: string;
  wishlist?: boolean;
}) {
  const [category, setCategory] = useState(
    categories.some((c) => c === initialCategory) ? initialCategory : "All",
  );
  const [query, setQuery] = useState(initialQuery);
  const [sort, setSort] = useState("featured");
  const { favorites } = useShop();
  const shown = products
    .filter(
      (p) =>
        (!wishlist || favorites.includes(p.id)) &&
        (category === "All" || p.category === category) &&
        `${p.name} ${p.subtitle} ${p.description} ${p.category}`
          .toLowerCase()
          .includes(query.toLowerCase().trim()),
    )
    .sort((a, b) =>
      sort === "price-low"
        ? a.price - b.price
        : sort === "price-high"
          ? b.price - a.price
          : sort === "name"
            ? a.name.localeCompare(b.name)
            : 0,
    );
  return (
    <div className="catalog">
      <div
        className="catalog-tabs"
        role="group"
        aria-label="Filter by category"
      >
        {["All", ...categories].map((c) => (
          <button
            key={c}
            className={category === c ? "selected" : ""}
            aria-pressed={category === c}
            onClick={() => setCategory(c)}
          >
            {c === "All" ? "All pieces" : c}
          </button>
        ))}
      </div>
      <div className="catalog-toolbar">
        <div className="catalog-search">
          <Search size={17} />
          <label htmlFor="catalog-search" className="sr-only">
            Search products
          </label>
          <input
            id="catalog-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Find something lovely…"
          />
          {query && (
            <button
              className="icon-button"
              aria-label="Clear search"
              onClick={() => setQuery("")}
            >
              <X size={15} />
            </button>
          )}
        </div>
        <span className="results-count">
          {shown.length} {shown.length === 1 ? "piece" : "pieces"}
        </span>
        <div className="catalog-sort">
          <SlidersHorizontal size={16} />
          <label htmlFor="sort" className="sr-only">
            Sort products
          </label>
          <select
            id="sort"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="featured">Featured</option>
            <option value="price-low">Price: low to high</option>
            <option value="price-high">Price: high to low</option>
            <option value="name">Name: A–Z</option>
          </select>
        </div>
      </div>
      {shown.length ? (
        <div className="product-grid catalog-grid">
          {shown.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h2>
            {wishlist && favorites.length === 0
              ? "Keep your favourites close."
              : "Nothing here just yet."}
          </h2>
          <p>
            {wishlist && favorites.length === 0
              ? "Tap the heart on any piece to save it here for later."
              : "Try another search or explore a different collection."}
          </p>
          {wishlist && favorites.length === 0 ? (
            <a href="/shop" className="button">
              Discover the collection
            </a>
          ) : (
            <button
              className="button"
              onClick={() => {
                setQuery("");
                setCategory("All");
              }}
            >
              Reset filters
            </button>
          )}
        </div>
      )}
    </div>
  );
}
