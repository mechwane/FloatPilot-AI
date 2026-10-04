# FloatPilot AI

**See liquidity risk before it interrupts service.**

FloatPilot AI is an original, independent decision-support prototype for bank/POS agents and operations teams. Phase 1 presents the concept through a public landing page and a locally interactive preview built entirely from fictional agents, fictional locations and synthetic financial figures.

> **Demo environment · Synthetic data · No funds are moved**

FloatPilot provides decision support only. The Phase 1 preview does not connect to a bank, use live transactions, calculate forecasts, execute actions, move funds or update balances. It is not endorsed by or affiliated with any bank.

## Phase 1 features

- Responsive public landing page at `/`.
- Static interactive scenario preview at `/demo` with payday cash-withdrawal surge, market-day e-float transfer surge and operations-manager cluster intervention.
- Local-only scenario selection and reset; no server request is made for scenario switching.
- Informational future-phase pages at `/agent`, `/operations`, `/admin` and `/judge`.
- Original navy-and-blue visual system, keyboard focus styles, semantic landmarks and reduced-motion support.
- Vitest unit tests and Playwright end-to-end/responsive checks.

## Requirements

- Node.js **24 LTS**
- npm 10 or later

The project declares Node.js `>=24 <25`. If your environment only provides another Node version, switch to Node 24 before installing or running the app.

## Run locally

```bash
cd FloatPilot-AI
npm ci
npm run dev
```

Open `http://localhost:3000`.

## Quality checks

```bash
npm run lint
npm run typecheck
npm run test
npx playwright install
npm run test:e2e
npm run build
```

All demo content is static and illustrative. No `.env.local` file is required in Phase 1; `.env.example` intentionally contains no credentials.

## Project structure

```text
src/app/                 App Router pages and global styles
src/components/layout/   Public header and footer
src/components/feedback/ Demo disclosure and status components
src/features/            Reserved for feature components
src/lib/                 Typed synthetic scenario fixtures and utilities
src/types/               Shared TypeScript types
tests/e2e/               Playwright smoke and viewport checks
docs/                    Product, architecture, safety and build documentation
```

## Phase status

**Phase 1 — Design system, application shell and static demo preview.** Implementation scope is limited to the approved Phase 1 brief. Phase 2 requires separate explicit approval. See [docs/BUILD_PLAN.md](docs/BUILD_PLAN.md).
