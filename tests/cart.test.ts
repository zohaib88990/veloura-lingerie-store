import { test } from "node:test";
import assert from "node:assert/strict";
import { addItem, cartTotals, isCartItem, itemKey } from "../src/lib/cart";
import { products, shippingCost } from "../src/lib/catalog";
const item = { productId: products[0].id, size: "S", color: "Rose" };
test("bag merges matching variants and preserves distinct sizes", () => {
  const a = addItem(addItem([], item), item);
  assert.equal(a.length, 1);
  assert.equal(a[0].quantity, 2);
  const b = addItem(a, { ...item, size: "M" });
  assert.equal(b.length, 2);
  assert.notEqual(itemKey(b[0]), itemKey(b[1]));
});
test("quantity is capped and invalid variants are rejected", () => {
  let cart = addItem([], item);
  for (let i = 0; i < 15; i++) cart = addItem(cart, item);
  assert.equal(cart[0].quantity, 10);
  assert.equal(addItem(cart, { ...item, size: "made-up" }), cart);
  for (const quantity of [-1, 1.5, 11])
    assert.equal(isCartItem({ ...item, quantity }), false);
  assert.equal(isCartItem({ ...item, color: "made-up", quantity: 1 }), false);
  assert.equal(isCartItem({ ...item, productId: "fake", quantity: 1 }), false);
});
test("totals use catalog prices and shipping threshold", () => {
  assert.deepEqual(cartTotals([]), { subtotal: 0, shipping: 0, total: 0 });
  assert.deepEqual(cartTotals([{ ...item, quantity: 1 }]), {
    subtotal: 8900,
    shipping: 800,
    total: 9700,
  });
  assert.deepEqual(cartTotals([{ ...item, quantity: 2 }]), {
    subtotal: 17800,
    shipping: 0,
    total: 17800,
  });
  assert.equal(shippingCost(14999), 800);
  assert.equal(shippingCost(15000), 0);
});
test("catalog ids are unique and products have valid variants", () => {
  assert.equal(new Set(products.map((p) => p.id)).size, products.length);
  for (const p of products) {
    assert.ok(Number.isInteger(p.price) && p.price > 0);
    assert.ok(
      isCartItem({
        productId: p.id,
        size: p.sizes[0],
        color: p.colors[0].name,
        quantity: 1,
      }),
    );
  }
});
