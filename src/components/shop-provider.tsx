"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useSyncExternalStore,
} from "react";
import { addItem, type CartItem, isCartItem, itemKey } from "@/lib/cart";
import { getProduct } from "@/lib/catalog";

type SavedState = { cart: CartItem[]; favorites: string[] };
const EMPTY: SavedState = { cart: [], favorites: [] };
let snapshot = EMPTY;
let hydrated = false;
const listeners = new Set<() => void>();
function persist(next: SavedState) {
  snapshot = next;
  try {
    localStorage.setItem("veloura-shop-v1", JSON.stringify(next));
  } catch {
    /* Shopping remains usable without storage. */
  }
  listeners.forEach((l) => l());
}
function readSaved() {
  try {
    const data = JSON.parse(localStorage.getItem("veloura-shop-v1") || "null");
    snapshot = {
      cart: Array.isArray(data?.cart)
        ? data.cart.filter(isCartItem).slice(0, 50)
        : [],
      favorites: Array.isArray(data?.favorites)
        ? data.favorites
            .filter((id: unknown) => typeof id === "string" && getProduct(id))
            .slice(0, 50)
        : [],
    };
  } catch {
    snapshot = EMPTY;
  }
}
function subscribe(listener: () => void) {
  listeners.add(listener);
  if (!hydrated) {
    hydrated = true;
    readSaved();
  }
  const sync = (e: StorageEvent) => {
    if (e.key === "veloura-shop-v1") {
      readSaved();
      listeners.forEach((l) => l());
    }
  };
  window.addEventListener("storage", sync);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", sync);
  };
}
const ShopContext = createContext<{
  cart: CartItem[];
  favorites: string[];
  bagOpen: boolean;
  setBagOpen: (open: boolean) => void;
  addToBag: (item: Omit<CartItem, "quantity">) => void;
  updateQuantity: (key: string, quantity: number) => void;
  removeItem: (key: string) => void;
  toggleFavorite: (id: string) => void;
  announce: (message: string) => void;
} | null>(null);
export function ShopProvider({ children }: { children: React.ReactNode }) {
  const state = useSyncExternalStore(
    subscribe,
    () => snapshot,
    () => EMPTY,
  );
  const [bagOpen, setBagOpen] = useState(false);
  const [message, setMessage] = useState("");
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => setMessage(""), 3500);
    return () => clearTimeout(timer);
  }, [message]);
  return (
    <ShopContext.Provider
      value={{
        ...state,
        bagOpen,
        setBagOpen,
        addToBag: (item) => {
          persist({ ...snapshot, cart: addItem(snapshot.cart, item) });
          setBagOpen(true);
        },
        updateQuantity: (key, quantity) =>
          persist({
            ...snapshot,
            cart: snapshot.cart.map((i) =>
              itemKey(i) === key
                ? { ...i, quantity: Math.min(10, Math.max(1, quantity)) }
                : i,
            ),
          }),
        removeItem: (key) =>
          persist({
            ...snapshot,
            cart: snapshot.cart.filter((i) => itemKey(i) !== key),
          }),
        toggleFavorite: (id) => {
          if (!getProduct(id)) return;
          const exists = snapshot.favorites.includes(id);
          persist({
            ...snapshot,
            favorites: exists
              ? snapshot.favorites.filter((i) => i !== id)
              : [...snapshot.favorites, id],
          });
          setMessage(
            exists ? "Removed from your wishlist" : "Saved to your wishlist",
          );
        },
        announce: setMessage,
      }}
    >
      {children}
      <div
        role="status"
        aria-live="polite"
        className={`toast ${message ? "visible" : ""}`}
      >
        {message}
      </div>
    </ShopContext.Provider>
  );
}
export function useShop() {
  const context = useContext(ShopContext);
  if (!context) throw new Error("ShopProvider is required");
  return context;
}
