import { test, expect } from "@playwright/test";
test("collection filtering and sorting", async ({ page }) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: "For every side of you." }),
  ).toBeVisible();
  await page.getByRole("link", { name: "Find your favourites" }).click();
  await expect(page.locator(".product-card")).toHaveCount(8);
  await page.getByRole("button", { name: "Sleepwear", exact: true }).click();
  await expect(page.locator(".product-card")).toHaveCount(2);
  await page.getByRole("button", { name: "All pieces" }).click();
  await page
    .getByRole("searchbox", { name: "Search products", exact: true })
    .fill("Celeste");
  await expect(page.locator(".product-card")).toHaveCount(1);
  await page
    .getByRole("searchbox", { name: "Search products", exact: true })
    .fill("no-such-piece");
  await expect(
    page.getByRole("heading", { name: "Nothing here just yet." }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Reset filters" }).click();
  await expect(page.locator(".product-card")).toHaveCount(8);
  await page.getByLabel("Sort products").selectOption("price-low");
  await expect(page.locator(".product-title").first()).toContainText("Iris");
});
test("bag selections, quantities, persistence and checkout", async ({
  page,
}) => {
  await page.goto("/products/celeste-lace-set");
  await page.getByRole("button", { name: "Add to bag", exact: true }).click();
  await expect(page.locator(".size-note[role=alert]")).toContainText(
    "Please choose your size",
  );
  await page.getByRole("button", { name: "S", exact: true }).click();
  await page.getByRole("button", { name: "Add to bag", exact: true }).click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(dialog).toContainText("$97");
  await dialog.getByRole("button", { name: "Increase quantity" }).click();
  await expect(dialog).toContainText("$178");
  await expect(dialog).toContainText("qualifies for complimentary shipping");
  await page.keyboard.press("Escape");
  await page.reload();
  await page.getByRole("button", { name: "Shopping bag, 2 items" }).click();
  await expect(page.getByRole("dialog")).toContainText("$178");
  await page.getByRole("link", { name: "Review & checkout" }).click();
  await expect(
    page.getByRole("heading", { name: "Order summary" }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Payment setup pending" }),
  ).toBeDisabled();
  await page.getByRole("button", { name: "Edit bag" }).click();
  await page
    .getByRole("button", { name: "Remove Celeste Lace Set from bag" })
    .click();
  await expect(
    page.getByRole("heading", { name: "A little space for something lovely." }),
  ).toBeVisible();
});
test("wishlist and modal search", async ({ page }) => {
  await page.goto("/shop");
  await page
    .getByRole("button", { name: "Save Celeste Lace Set to wishlist" })
    .click();
  await page.goto("/wishlist");
  await expect(page.locator(".product-card")).toHaveCount(1);
  await page.reload();
  await expect(page.locator(".product-card")).toHaveCount(1);
  await page
    .getByRole("button", { name: "Remove Celeste Lace Set from wishlist" })
    .click();
  await expect(
    page.getByRole("heading", { name: "Keep your favourites close." }),
  ).toBeVisible();
  await page
    .getByRole("button", { name: "Search products", exact: true })
    .click();
  await page.getByLabel("Search our collection").fill("Luna");
  await page.getByRole("button", { name: "Submit search" }).click();
  await expect(page.locator(".product-card")).toHaveCount(1);
  await expect(page.locator(".product-title")).toContainText("Luna");
});
test("mobile layout, navigation and size guide", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await page.getByRole("button", { name: "Open navigation" }).click();
  await page
    .getByRole("dialog")
    .getByRole("link", { name: "Shop all" })
    .click();
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await page
    .getByRole("link", { name: "Shop Celeste Lace Set", exact: true })
    .click();
  await page.getByRole("button", { name: "Size guide", exact: true }).click();
  await expect(page.getByRole("table")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});
test("supporting routes and invalid products", async ({ page }) => {
  for (const path of [
    "/about",
    "/help",
    "/journal",
    "/journal/the-slow-morning",
    "/privacy",
    "/terms",
  ]) {
    const response = await page.goto(path);
    expect(response?.status()).toBe(200);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  }
  const response = await page.goto("/products/missing");
  expect(response?.status()).toBe(404);
  await expect(
    page.getByRole("heading", { name: "This page has slipped away." }),
  ).toBeVisible();
});
test("unconfigured checkout rejects payments", async ({ request }) => {
  const response = await request.post("/api/checkout", {
    data: {
      items: [{ productId: "fake", size: "S", color: "Rose", quantity: 1 }],
    },
  });
  expect(response.status()).toBe(503);
  expect(await response.json()).toHaveProperty("error");
});
