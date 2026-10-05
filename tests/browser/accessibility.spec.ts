import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

for (const path of ["/", "/shop", "/products/celeste-lace-set"]) {
  test(`accessible storefront: ${path}`, async ({ page }) => {
    await page.goto(path);
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    const result = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(result.violations).toEqual([]);
    expect(errors).toEqual([]);
  });
}
