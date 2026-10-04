# Architecture — FloatPilot AI

## Overview

A modular Next.js application with server-side domain services and Supabase persistence. The architecture favours a small, auditable monolith for hackathon speed, with clear boundaries that permit later extraction.

## Responsibilities

- **Frontend:** accessible screens, chart presentation, forms, user feedback and read-only/demo-mode indicators. It does not decide permissions or expose secrets.
- **Route handlers/server services:** authenticate requests, validate payloads, enforce role/scope, orchestrate domain functions and return typed responses.
- **Domain layer:** deterministic forecasting, risk classification, recommendation ranking and request state transitions; independent of framework/database.
- **Database:** persistent synthetic snapshots, activity, forecasts, requests, alerts and audit records; RLS is defence in depth.
- **Supabase Auth/Storage:** identity and approved demo assets only. Storage must not contain sensitive banking data.
- **Assistant adapter:** retrieves authorised synthetic context, constructs constrained prompts and validates output; no tools that mutate financial/workflow state.

## Proposed directory structure

```text
src/
  app/(public)/demo/page.tsx
  app/(auth)/login/page.tsx
  app/(agent)/dashboard/page.tsx
  app/(agent)/forecasts/page.tsx
  app/(agent)/requests/page.tsx
  app/(ops)/operations/page.tsx
  app/(admin)/admin/page.tsx
  app/api/v1/{dashboard,forecasts,alerts,recommendations,requests,support,operations,scenarios,assistant}/route.ts
  components/{ui,layout,charts,feedback}/
  features/{agent,operations,forecasts,requests,assistant,scenarios}/
  lib/{supabase,auth,validation,logging}/
  domain/{forecast,risk,recommendation,workflow}/
  types/
supabase/migrations/
supabase/seed/
tests/{unit,integration,e2e}/
```

## Data flow

1. User authenticates or enters read-only judge mode.
2. Server resolves identity, role and permitted agent/cluster scope.
3. Route validates query/body and calls a domain service.
4. Service reads synthetic records through scoped database access, calculates forecast/risk or workflow transition, then persists permitted results.
5. RLS independently restricts rows; audit event records consequential workflow changes.
6. UI renders returned data with source window, scenario label and uncertainty.

## Authentication

Use Supabase Auth for agent, manager and administrator accounts. Judge mode uses a constrained read-only session or public scenario endpoint that exposes only curated synthetic data. Never trust client-provided role claims; resolve role from a server-verified profile and enforce it on every protected request.

## Authorisation and RLS

Default-deny policies. Agents access own rows. Managers access agents explicitly assigned to their cluster. Admin privileges are limited to demo configuration and identity metadata. Judge routes are read-only and expose curated synthetic aggregates. Server service-role credentials, if required for controlled seed/admin tasks, remain server-only and are not used as a blanket bypass for ordinary user requests. Test RLS under each role.

## Forecast and recommendation engine

Forecast engine input: latest resource-specific snapshot, time-bucketed synthetic transaction aggregates, scenario parameters, horizon and safety threshold. Output: projected balance series, first threshold-crossing time, risk level, assumptions and engine version. MVP uses deterministic moving-rate or scenario-weighted projections with explicit inflow/outflow assumptions. Recommendation rules map resource gap, urgency and scope to a small catalogue of human-reviewed actions. No hidden model or automatic action.

## AI assistant guardrails

- Ground answers in authorised records and forecast outputs only.
- Pass minimal structured context; exclude credentials and customer-level records.
- Require the assistant to distinguish observed synthetic inputs, calculated estimates and suggestions.
- If context is missing, say so; do not invent a cause, availability or bank policy.
- No SQL, arbitrary tools, payment tools, transfer execution or approval authority.
- Validate response shape, limit output, rate-limit requests and log metadata without retaining unnecessary prompt content.
- Provide a deterministic non-LLM explanation fallback.

## Error handling

Use consistent JSON errors with stable codes, safe user messages and request correlation IDs. Distinguish validation, unauthenticated, forbidden, not found, conflict, rate limit and internal errors. Never return stack traces, secrets or raw provider errors to clients. Retry only idempotent operations and avoid duplicate request transitions.

## Observability and logging

Capture request ID, route, latency, status, actor ID, role, scenario ID and event type. Avoid logging tokens, prompts containing personal data, full transaction payloads or secrets. Monitor error rate, slow queries, assistant failures and denied access. Demo logs are operational metadata, not a banking audit system.

## Deployment

Deploy Next.js to Vercel; provision separate Supabase development and demo projects; apply reviewed migrations; seed synthetic scenarios; configure environment secrets in hosting settings; enable HTTPS; restrict production demo writes; verify RLS and smoke tests after deployment. No live bank API credentials are provisioned.

## Risk register

| Risk | Impact | Mitigation |
|---|---|---|
| Forecast mistaken for certainty | Poor decisions | Show assumptions, horizon, uncertainty and synthetic label |
| Cross-agent data exposure | Privacy breach | Server scope checks, RLS, negative tests |
| Assistant hallucination | Misleading action | Grounded context, constrained output, fallback |
| Demo action mistaken for transfer | Trust/safety issue | Explicit simulation copy; no payment integration |
| Scenario data too neat | Judge overconfidence | Disclose synthetic construction and test edge cases |
| Secrets exposed | Account compromise | Server-only secrets, scanning, rotation |
| Time pressure | Incomplete quality | Phase gates and prioritised critical journeys |
