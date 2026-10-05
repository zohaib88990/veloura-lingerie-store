"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Heart, Menu, Search, ShoppingBag, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { useShop } from "./shop-provider";
import { Dialog } from "./dialog";

export function Header() {
  const { cart, favorites, setBagOpen } = useShop();
  const pathname = usePathname();
  const router = useRouter();
  const [menu, setMenu] = useState(false);
  const [search, setSearch] = useState(false);
  const nav = [
    { label: "Shop all", href: "/shop" },
    { label: "Lingerie", href: "/shop?category=Lingerie+sets" },
    { label: "Sleep & lounge", href: "/shop?category=Sleepwear" },
    { label: "Our story", href: "/about" },
  ];
  return (
    <>
      <div className="announcement">
        A little luxury, just for you.{" "}
        <span>Complimentary shipping on orders $150+</span>
        <ArrowUpRight size={12} />
      </div>
      <header className="site-header">
        <div className="header-inner">
          <button
            className="icon-button mobile-menu"
            aria-label="Open navigation"
            onClick={() => setMenu(true)}
          >
            <Menu size={22} />
          </button>
          <Link href="/" className="wordmark" aria-label="Veloura home">
            veloura<span>INTIMATELY YOURS</span>
          </Link>
          <nav aria-label="Main navigation" className="desktop-nav">
            {nav.map((n) => (
              <Link
                key={n.label}
                className={pathname === n.href ? "active" : ""}
                href={n.href}
              >
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="header-actions">
            <button
              className="icon-button"
              aria-label="Search products"
              onClick={() => setSearch(true)}
            >
              <Search size={20} />
            </button>
            <Link
              className="icon-button wishlist-icon"
              href="/wishlist"
              aria-label={`Wishlist, ${favorites.length} saved items`}
            >
              <Heart size={20} />
              {favorites.length > 0 && (
                <span className="count">{favorites.length}</span>
              )}
            </Link>
            <button
              className="icon-button"
              aria-label={`Shopping bag, ${cart.reduce((s, i) => s + i.quantity, 0)} items`}
              onClick={() => setBagOpen(true)}
            >
              <ShoppingBag size={20} />
              <span className="bag-count">
                {cart.reduce((s, i) => s + i.quantity, 0)}
              </span>
            </button>
          </div>
        </div>
      </header>
      {menu && (
        <Dialog title="Explore Veloura" onClose={() => setMenu(false)} drawer>
          <nav className="mobile-nav" aria-label="Mobile navigation">
            {nav.map((n) => (
              <Link href={n.href} key={n.label} onClick={() => setMenu(false)}>
                {n.label}
                <ArrowUpRight size={20} />
              </Link>
            ))}
            <Link href="/wishlist" onClick={() => setMenu(false)}>
              Your wishlist
              <Heart size={20} />
            </Link>
          </nav>
        </Dialog>
      )}
      {search && (
        <Dialog
          title="Find your next favourite"
          onClose={() => setSearch(false)}
        >
          <form
            action="/shop"
            onSubmit={(event) => {
              event.preventDefault();
              const query = new FormData(event.currentTarget).get("q");
              router.push(`/shop?q=${encodeURIComponent(String(query || ""))}`);
              setSearch(false);
            }}
            className="search-form"
          >
            <label htmlFor="product-search">Search our collection</label>
            <div>
              <input
                id="product-search"
                name="q"
                type="search"
                placeholder="Try lace, satin, or Celeste…"
                autoFocus
                required
              />
              <button className="icon-button" aria-label="Submit search">
                <Search size={22} />
              </button>
            </div>
          </form>
          <p className="dialog-note">
            A little inspiration:{" "}
            <Link
              href="/shop?category=Sleepwear"
              onClick={() => setSearch(false)}
            >
              something for slow mornings
            </Link>
          </p>
        </Dialog>
      )}
    </>
  );
}
