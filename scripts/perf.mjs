import { execFileSync } from "node:child_process";
import { mkdirSync, readFileSync } from "node:fs";
import { chromium } from "playwright";

const BASE = process.env.PERF_URL ?? "http://localhost:3000";
const OUT = "screenshots-tmp";
mkdirSync(OUT, { recursive: true });

// DevTools "Slow 4G" preset.
const SLOW_4G = {
  offline: false,
  latency: 562.5,
  downloadThroughput: (1.4 * 1000 * 1000) / 8,
  uploadThroughput: (675 * 1000) / 8,
};

const rows = "main tbody tr";
const statusText = "main p[role=status]";

async function time(fn) {
  const start = performance.now();
  await fn();
  return Math.round(performance.now() - start);
}

async function slowMachine(browser) {
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  const cdp = await context.newCDPSession(page);
  await cdp.send("Network.enable");
  await cdp.send("Network.emulateNetworkConditions", SLOW_4G);
  await cdp.send("Emulation.setCPUThrottlingRate", { rate: 6 });

  const result = {};

  result.initialLoad = await time(async () => {
    await page.goto(BASE + "/", { waitUntil: "commit" });
    await page.locator(rows).first().waitFor({ state: "visible" });
  });
  await page.waitForLoadState("load");

  result.search = await time(async () => {
    await page.locator("input[name=q]").pressSequentially("light");
    await page.waitForFunction(
      (sel) => {
        const r = document.querySelectorAll(sel);
        return r.length === 1 && r[0].textContent.includes("Light");
      },
      rows,
    );
  });

  await page.goto(BASE + "/", { waitUntil: "load" });
  result.statusFilter = await time(async () => {
    await page.selectOption("select[name=status]", "Overdue");
    await page.waitForFunction(
      (sel) => {
        const r = [...document.querySelectorAll(sel)];
        return r.length > 0 && r.every((tr) => tr.cells[4].textContent === "Overdue");
      },
      rows,
    );
  });

  await page.goto(BASE + "/", { waitUntil: "load" });
  result.pagination = await time(async () => {
    await page.locator("nav[aria-label=Pagination] a", { hasText: /^2$/ }).click();
    await page.waitForFunction(
      (sel) => document.querySelector(sel)?.textContent.startsWith("Showing 6 to 10"),
      statusText,
    );
  });

  await page.screenshot({ path: `${OUT}/perf-slow-page2.png` });
  await context.close();
  return result;
}

async function pageWeight(browser, javaScriptEnabled) {
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, javaScriptEnabled });
  const page = await context.newPage();
  const cdp = await context.newCDPSession(page);
  await cdp.send("Network.enable");
  await cdp.send("Network.setCacheDisabled", { cacheDisabled: true });

  let bytes = 0;
  let requests = 0;
  cdp.on("Network.requestWillBeSent", () => requests++);
  cdp.on("Network.loadingFinished", (e) => (bytes += e.encodedDataLength));

  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  const visibleRows = await page.locator(rows).evaluateAll(
    (trs) => trs.filter((tr) => tr.getBoundingClientRect().height > 0).length,
  );
  await context.close();
  return { bytes, requests, visibleRows };
}

function lighthouse(chromePath) {
  execFileSync(
    "npx",
    [
      "--yes",
      "lighthouse",
      BASE,
      "--only-categories=performance,accessibility,best-practices",
      "--output=html",
      "--output=json",
      `--output-path=${OUT}/lighthouse`,
      "--chrome-flags=--headless=new",
      "--quiet",
    ],
    { stdio: ["ignore", "ignore", "inherit"], env: { ...process.env, CHROME_PATH: chromePath } },
  );
  const report = JSON.parse(readFileSync(`${OUT}/lighthouse.report.json`, "utf8"));
  const score = (id) => Math.round(report.categories[id].score * 100);
  const audit = (id) => report.audits[id];
  return {
    performance: score("performance"),
    accessibility: score("accessibility"),
    bestPractices: score("best-practices"),
    fcp: audit("first-contentful-paint").displayValue,
    lcp: audit("largest-contentful-paint").displayValue,
    tbt: audit("total-blocking-time").displayValue,
    cls: audit("cumulative-layout-shift").displayValue,
  };
}

const kb = (n) => `${(n / 1024).toFixed(1)} KB`;

const browser = await chromium.launch();
console.log("1/3 Slow machine test (6x CPU, Slow 4G)...");
const slow = await slowMachine(browser);
console.log("2/3 Page weight...");
const withJs = await pageWeight(browser, true);
const noJs = await pageWeight(browser, false);
const chromePath = chromium.executablePath();
await browser.close();
console.log("3/3 Lighthouse (mobile)...");
const lh = lighthouse(chromePath);

const table = [
  ["Slow machine (6x CPU, Slow 4G, 1440x900)", ""],
  ["  Initial load until rows visible", `${slow.initialLoad} ms`],
  ['  Type "light" until 1 row (incl. 300 ms debounce)', `${slow.search} ms`],
  ['  Status "Overdue" until rows update', `${slow.statusFilter} ms`],
  ["  Page 2 until rows update", `${slow.pagination} ms`],
  ["Page weight (cache disabled, no throttling)", ""],
  ["  JavaScript on: transferred / requests", `${kb(withJs.bytes)} / ${withJs.requests}`],
  ["  JavaScript on: rows visible", String(withJs.visibleRows)],
  ["  JavaScript off: transferred / requests", `${kb(noJs.bytes)} / ${noJs.requests}`],
  ["  JavaScript off: rows visible", String(noJs.visibleRows)],
  ["Lighthouse (mobile emulation)", ""],
  ["  Performance / Accessibility / Best practices", `${lh.performance} / ${lh.accessibility} / ${lh.bestPractices}`],
  ["  First Contentful Paint", lh.fcp],
  ["  Largest Contentful Paint", lh.lcp],
  ["  Total Blocking Time", lh.tbt],
  ["  Cumulative Layout Shift", lh.cls],
];
const width = Math.max(...table.map(([k]) => k.length)) + 2;
console.log("\n" + "=".repeat(width + 22));
for (const [k, v] of table) console.log(k.padEnd(width) + v);
console.log("=".repeat(width + 22));
console.log(`Reports: ${OUT}/lighthouse.report.html, ${OUT}/lighthouse.report.json`);

const failures = [];
if (withJs.visibleRows !== 5) failures.push(`JS on shows ${withJs.visibleRows} rows, expected 5`);
if (noJs.visibleRows !== 5) failures.push(`JS off shows ${noJs.visibleRows} rows, expected 5`);
if (failures.length) {
  console.error("FAIL: " + failures.join("; "));
  process.exit(1);
}
