import { test, expect } from "@playwright/test";

const rows = "tbody tr";

test("home shows the first page of 27 tests", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator(rows)).toHaveCount(5);
  await expect(page.getByText("27 Tests", { exact: true })).toBeVisible();
  await expect(page.getByRole("status")).toHaveText("Showing 1 to 5 of 27 tests");
  await expect(page.locator(rows).first()).toContainText("Overdue");
});

test("search filters as you type and keeps focus", async ({ page }) => {
  await page.goto("/");
  const search = page.getByRole("searchbox", { name: "Search tests" });
  await search.click();
  await search.pressSequentially("light");
  await expect(page).toHaveURL("/?q=light");
  await expect(page.locator(rows)).toHaveCount(1);
  await expect(search).toBeFocused();
});

test("class and status filters combine", async ({ page }) => {
  await page.goto("/");
  await page.getByLabel("Class").selectOption("10 Aster");
  await expect(page).toHaveURL("/?class=10+Aster");
  await page.getByLabel("Status").selectOption("Overdue");
  await expect(page).toHaveURL("/?class=10+Aster&status=Overdue");
  await expect(page.locator(rows)).toHaveCount(2);
});

test("page 2 shows the next five tests", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "2", exact: true }).click();
  await expect(page.getByRole("status")).toHaveText("Showing 6 to 10 of 27 tests");
});

test("out of range page falls back to the last page", async ({ page }) => {
  await page.goto("/?page=99");
  await expect(page.getByRole("status")).toHaveText("Showing 26 to 27 of 27 tests");
});

test("unknown status is ignored", async ({ page }) => {
  await page.goto("/?status=Banana");
  await expect(page.getByRole("status")).toHaveText("Showing 1 to 5 of 27 tests");
});

test("no matches offers Clear filters", async ({ page }) => {
  await page.goto("/?q=xyz");
  await expect(page.getByText("No tests match your filters")).toBeVisible();
  await page.getByRole("link", { name: "Clear filters" }).click();
  await expect(page).toHaveURL("/");
  await expect(page.getByRole("searchbox", { name: "Search tests" })).toHaveValue("");
});

test("/empty shows the no tests state", async ({ page }) => {
  await page.goto("/empty");
  await expect(page.getByText("No tests yet")).toBeVisible();
  await expect(page.getByRole("searchbox")).toHaveCount(0);
});

test("dates are shown in IST", async ({ page }) => {
  await page.goto("/");
  const row = page.getByRole("row", { name: /Pair of Linear Equations in Two Variables/ });
  await expect(row).toContainText("19 Sep, 4:00 PM");
});

for (const status of ["Draft", "Scheduled"]) {
  test(`Result button is disabled for ${status} tests`, async ({ page }) => {
    await page.goto(`/?status=${status}`);
    const buttons = page.getByRole("button", { name: /^Results for / });
    await expect(buttons.first()).toBeVisible();
    for (const button of await buttons.all()) {
      await expect(button).toBeDisabled();
    }
  });
}

test.describe("phone", () => {
  test.use({ viewport: { width: 360, height: 800 } });

  test("fits 360px with cards instead of the table", async ({ page }) => {
    await page.goto("/");
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(360);
    await expect(page.locator('ul[role="list"] > li').first()).toBeVisible();
    await expect(page.locator("table")).toBeHidden();
    await expect(page.getByText("Page 1 of 6")).toBeVisible();
  });

  test("menu opens and closes", async ({ page }) => {
    await page.goto("/");
    const menu = page.locator("#mobile-menu");
    await menu.locator("summary").click();
    await expect(menu.getByRole("link")).toHaveCount(8);
    await expect(menu.getByRole("link", { name: "My Tests" })).toBeVisible();
    await menu.locator("summary").click();
    await expect(menu.getByRole("link", { name: "My Tests" })).toBeHidden();
  });
});

test.describe("without JavaScript", () => {
  test.use({ javaScriptEnabled: false });

  test("Enter in the search box filters", async ({ page }) => {
    await page.goto("/");
    const search = page.getByRole("searchbox", { name: "Search tests" });
    await search.fill("light");
    await search.press("Enter");
    await expect(page).toHaveURL(/q=light/);
    await expect(page.locator(rows)).toHaveCount(1);
  });

  test("page links work", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "3", exact: true }).click();
    await expect(page.getByRole("status")).toHaveText("Showing 11 to 15 of 27 tests");
  });
});
