# Build Plan — FloatPilot AI

Phase gates are sequential. Scope changes require explicit approval. Phase 1 is implemented as a static, synthetic-only prototype; later phases remain unapproved and must not be started without explicit user approval.

## Phase 0 — Repository setup and documentation
**Status: Complete.** Product scope, safety boundaries, architecture, UX, data model, demo narrative and staged plan are documented.

## Phase 1 — Design system, application shell, demo landing
**Status: Implemented; verification pending in the current environment.**

### Included
- Next.js App Router foundation with strict TypeScript, Tailwind CSS conventions and limited shadcn-compatible configuration.
- Original FloatPilot navy-and-blue design tokens and original CSS/SVG wordmark treatment.
- Responsive public header/footer and accessible focus/reduced-motion foundations.
- Original public landing page at `/` and local-only static interactive demo at `/demo`.
- Exactly three typed synthetic fixtures: payday cash-withdrawal surge, market-day e-float transfer surge and operations-manager cluster intervention.
- Persistent demo disclosure: “Demo environment · Synthetic data · No funds are moved”.
- Minimal informational placeholders at `/agent`, `/operations`, `/admin` and `/judge`.
- Vitest and Playwright setup, unit tests, end-to-end tests and responsive viewport checks.
- Updated README and project documentation.

### Explicit exclusions
No Supabase, authentication, database, migrations, API endpoints, server actions, forecasting calculations, AI/LLM integration, dynamic-data charts, maps, geolocation, live financial operations, bank integration or live deployment. Scenario selection is local-only. No balance is automatically changed and no funds are moved.

### Verification
Required commands: `npm run lint`, `npm run typecheck`, `npm run test`, `npm run test:e2e` and `npm run build`. Responsive checks target 390px, 768px, 1280px and 1440px. Node.js 24 LTS is the project target. If the execution environment cannot provide Node 24 or dependencies, the affected checks must be reported as blocked rather than marked passed.

## Phase 2 — Authentication, roles and protected routes
**Status: Not started — explicit approval required.**

## Phase 3 — Database schema, RLS and seed data
**Status: Not started — explicit approval required.**

## Phase 4 — Agent dashboard and forecast logic
**Status: Not started — explicit approval required.**

## Phase 5 — Recommendation and rebalancing-request workflows
**Status: Not started — explicit approval required.**

## Phase 6 — Operations dashboard
**Status: Not started — explicit approval required.**

## Phase 7 — AI assistant with safe, data-grounded responses
**Status: Not started — explicit approval required.**

## Phase 8 — Demo simulator and presentation polish
**Status: Not started — explicit approval required.**

## Phase 9 — Testing, security review and deployment readiness
**Status: Not started — explicit approval required.**

## Phase 2 — Synthetic authentication, roles, and protected routes

**Status: Implemented in source; verification pending in a Node.js 24 environment.**

- Added typed roles, synthetic personas, session state, and permission definitions.
- Added a deterministic in-memory React session provider and accessible role switcher.
- Added client-side route access helpers and feedback for unauthorised previews.
- Protected the agent, operations, admin, and judge preview routes. The judge scoring preview is read-only and available to all personas.
- Added role/route permission unit tests.
- No backend authentication, tokens, database, API, server actions, financial movements, or forecasting were introduced.

Run `npm run lint`, `npx tsc --noEmit`, and `npm run test` to verify Phase 2.
