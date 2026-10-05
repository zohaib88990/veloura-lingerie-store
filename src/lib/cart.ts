import { getProduct, shippingCost } from "./catalog";

export type CartItem = {
  productId: string;
  size: string;
  color: string;
  quantity: number;
};
export function isCartItem(item: unknown): item is CartItem {
  if (!item || typeof item !== "object") return false;
  const i = item as CartItem;
  const product = getProduct(i.productId);
  return (
    !!product &&
    product.sizes.includes(i.size) &&
    product.colors.some((c) => c.name === i.color) &&
    Number.isInteger(i.quantity) &&
    i.quantity > 0 &&
    i.quantity <= 10
  );
}
export const itemKey = (item: Pick<CartItem, "productId" | "size" | "color">) =>
  `${item.productId}:${item.size}:${item.color}`;
export function addItem(
  cart: CartItem[],
  item: Omit<CartItem, "quantity">,
): CartItem[] {
  if (!isCartItem({ ...item, quantity: 1 })) return cart;
  const existing = cart.find((i) => itemKey(i) === itemKey(item));
  return existing
    ? cart.map((i) =>
        itemKey(i) === itemKey(item)
          ? { ...i, quantity: Math.min(i.quantity + 1, 10) }
          : i,
      )
    : [...cart, { ...item, quantity: 1 }];
}
export function cartTotals(cart: CartItem[]) {
  const subtotal = cart
    .filter(isCartItem)
    .reduce(
      (sum, item) => sum + getProduct(item.productId)!.price * item.quantity,
      0,
    );
  const shipping = shippingCost(subtotal);
  return { subtotal, shipping, total: subtotal + shipping };
}
