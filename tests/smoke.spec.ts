import { expect, test } from "@playwright/test";

const routes = ["/", "/contact", "/services", "/about", "/work", "/ai-infrastructure"];

for (const route of routes) {
  test(`loads ${route}`, async ({ page }) => {
    await page.goto(route);
    await expect(page.locator("body")).toBeVisible();
    await expect(page.locator("header")).toBeVisible();
  });
}

test("contact validation shows required error", async ({ page }) => {
  await page.goto("/contact");
  await page.getByRole("button", { name: /compose inquiry/i }).click();
  await expect(page.locator(".form-error")).toContainText(/required/i);
});

test("no horizontal overflow on homepage", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 900 });
  await page.goto("/");
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);
  expect(overflow).toBeFalsy();
});

test("mobile menu opens", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 900 });
  await page.goto("/");
  await page.getByRole("button", { name: /toggle menu/i }).click();
  await expect(page.getByRole("navigation")).toBeVisible();
  await expect(page.getByLabel("Main navigation").getByRole("link", { name: "Services" })).toBeVisible();
});
