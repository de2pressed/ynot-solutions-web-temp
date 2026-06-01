import { expect, test } from "@playwright/test";

const desktopViewports = [
  { width: 1280, height: 900 },
  { width: 1440, height: 900 },
  { width: 1536, height: 960 },
  { width: 1920, height: 1080 },
  { width: 2560, height: 1440 }
];

for (const viewport of desktopViewports) {
  test(`homepage visual layout holds at ${viewport.width}px`, async ({ page }) => {
    await page.setViewportSize(viewport);
    await page.goto("/");

    await expect(page.getByTestId("hero-mac-terminal")).toBeVisible();
    await expect(page.getByTestId("route-board")).toBeVisible();
    await expect(page.getByTestId("control-plane-demo")).toBeVisible();
    await expect(page.getByTestId("process-track")).toBeVisible();

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 2);
    expect(overflow).toBeFalsy();

    await page.locator("#scale").scrollIntoViewIfNeeded();
    await expect(page.getByTestId("visible-globe")).toBeVisible();
    const globeVisible = await page.getByTestId("visible-globe").evaluate((el) => {
      const rect = el.getBoundingClientRect();
      return rect.width > 300 && rect.height > 300 && rect.bottom > 0 && rect.top < window.innerHeight;
    });
    expect(globeVisible).toBeTruthy();
  });
}

test("header switches to readable dark-section theme", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  await page.locator("#modern-workloads").scrollIntoViewIfNeeded();
  await page.waitForTimeout(100);

  const header = page.getByTestId("site-header");
  await expect(header).toHaveClass(/theme-dark/);
  const linkStyles = await header.locator("nav a").first().evaluate((el) => {
    const styles = window.getComputedStyle(el);
    return { color: styles.color, opacity: Number(styles.opacity) };
  });
  expect(linkStyles.opacity).toBeGreaterThan(0.45);
  expect(linkStyles.color).not.toBe("rgba(0, 0, 0, 0)");
});

test("process cards expose hover interaction", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  const card = page.getByTestId("process-card-1");
  await card.scrollIntoViewIfNeeded();
  const before = await card.evaluate((el) => window.getComputedStyle(el).transform);
  await card.hover();
  await page.waitForTimeout(150);
  const after = await card.evaluate((el) => window.getComputedStyle(el).transform);
  expect(after).not.toBe(before);
});
