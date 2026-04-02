# Playwright-MCP

This repository contains a Playwright test project for `automationexercise.com`, along with manual test cases and evidence screenshots.

## Project structure

- `tests/` - Playwright test files
- `playwright.config.ts` - Playwright configuration
- `manual-tests/` - Manual test case descriptions and evidence
- `manual-tests/evidence-automationexcersize/` - Screenshots and generated markdown evidence

## Setup

1. Install dependencies

```bash
npm install
```

2. Install Playwright browsers (if not already installed)

```bash
npx playwright install
```

## Run tests

Run all Playwright tests:

```bash
npx playwright test
```

Run a specific test file:

```bash
npx playwright test tests/example.spec.ts
```

## Notes

- The project uses `@playwright/test` and runs tests from the `tests` folder.
- Reports are generated in HTML format by default.
- Manual evidence is stored under `manual-tests/evidence-automationexcersize/`.
