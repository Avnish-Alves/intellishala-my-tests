# Intellishala My Tests

Live: https://intellishala-my-tests.vercel.app
Empty state (no tests at all): https://intellishala-my-tests.vercel.app/empty

## How to run

Needs Node 20.9 or newer.

```
npm install
npm run dev
```

Then open http://localhost:3000. The "no tests" state is at http://localhost:3000/empty.

For the production version:

```
npm run build
npm run start
```

## Tests

```
npm test
```

`npm run test` does the same. These are end-to-end tests with Playwright. They build the production version and start it by themselves, then check search, filters, pagination, the empty states, the phone layout and the page with JavaScript turned off. Run `npx playwright install chromium` once before the first run.

## Performance check

```
npm run perf
```

Run it while `npm run start` is running. It loads the page with a slow CPU and Slow 4G, measures the page weight with and without JavaScript, and runs Lighthouse. The summary is printed and saved to `screenshots-tmp/perf-summary.txt`.

## Screenshots

1440

![My Tests at 1440px](docs/screenshot-1440.png)

360

![My Tests at 360px](docs/screenshot-360.png)
