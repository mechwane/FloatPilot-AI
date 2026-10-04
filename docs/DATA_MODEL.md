# Data Model — FloatPilot AI

All monetary values are synthetic Nigerian naira amounts stored as integer kobo (`bigint`) to avoid floating-point errors. Timestamps use `timestamptz` in UTC; UI formats local time. UUID primary keys use `gen_random_uuid()`.

## Enums

- `app_role`: `agent`, `operations_manager`, `platform_admin`, `judge`
- `liquidity_type`: `cash`, `e_float`
- `risk_level`: `low`, `medium`, `high`, `critical`
- `recommendation_status`: `proposed`, `accepted_for_review`, `dismissed`, `expired`
- `request_status`: `submitted`, `under_review`, `approved_simulated`, `rejected`, `clarification_requested`, `cancelled`
- `alert_type`: `threshold_risk`, `forecast_change`, `snapshot_stale`, `request_update`, `scenario_notice`
- `scenario_key`: `payday_cash_surge`, `market_efloat_surge`, `cluster_intervention`, `baseline`

## Tables

Common conventions: UUID PK unless noted; `created_at timestamptz not null default now()`; use FK constraints and indexes listed below.

| Table | Proposed fields and constraints |
|---|---|
| `profiles` | `id uuid PK references auth.users(id) on delete cascade`; `display_name text not null`; `role app_role not null`; `is_active boolean default true`; timestamps |
| `agent_profiles` | `id uuid PK`; `user_id uuid unique FK profiles(id)`; `agent_code text unique not null` (synthetic); `cluster_id uuid FK operations_profiles(id)` nullable; `demo_locality text not null`; `cash_threshold_kobo bigint >= 0`; `efloat_threshold_kobo bigint >= 0`; `is_demo boolean not null default true` |
| `operations_profiles` | `id uuid PK`; `user_id uuid unique FK profiles(id)`; `cluster_code text unique not null`; `cluster_name text not null`; `coverage_label text not null`; `is_demo boolean default true` |
| `liquidity_snapshots` | `id uuid PK`; `agent_id uuid FK agent_profiles(id)`; `liquidity_type`; `balance_kobo bigint >= 0`; `observed_at timestamptz not null`; `scenario_id uuid FK demo_scenarios(id)`; `source_label text default 'synthetic_demo'`; `created_at`; unique `(agent_id, liquidity_type, observed_at, scenario_id)` |
| `transactions` | `id uuid PK`; `agent_id uuid FK agent_profiles(id)`; `liquidity_type`; `direction text check in ('inflow','outflow')`; `amount_kobo bigint > 0`; `occurred_at timestamptz`; `event_category text`; `scenario_id uuid FK demo_scenarios(id)`; `synthetic_ref text unique`; no customer identifiers |
| `forecasts` | `id uuid PK`; `agent_id uuid FK agent_profiles(id)`; `liquidity_type`; `horizon_minutes int > 0`; `generated_at timestamptz`; `engine_version text`; `projected_balance_kobo bigint[]`; `threshold_kobo bigint >= 0`; `first_breach_at timestamptz null`; `risk_level`; `assumptions jsonb`; `scenario_id uuid FK demo_scenarios(id)` |
| `liquidity_risks` | `id uuid PK`; `agent_id uuid FK agent_profiles(id)`; `liquidity_type`; `risk_level`; `estimated_gap_kobo bigint >= 0`; `expected_breach_at timestamptz null`; `reason_codes text[]`; `as_of timestamptz`; `forecast_id uuid FK forecasts(id)` |
| `recommendations` | `id uuid PK`; `agent_id uuid FK agent_profiles(id)`; `risk_id uuid FK liquidity_risks(id)`; `action_code text`; `title text`; `rationale text`; `proposed_amount_kobo bigint >= 0`; `status recommendation_status`; `approval_required boolean not null default true check (approval_required)`; `expires_at timestamptz`; timestamps |
| `rebalance_requests` | `id uuid PK`; `agent_id uuid FK agent_profiles(id)`; `created_by uuid FK profiles(id)`; `reviewed_by uuid FK profiles(id) null`; `liquidity_type`; `requested_amount_kobo bigint > 0`; `reason text`; `note text null`; `status request_status`; `review_note text null`; `scenario_id uuid FK demo_scenarios(id)`; `submitted_at`; `reviewed_at null`; timestamps |
| `nearby_support_agents` | `id uuid PK`; `display_name text`; `demo_locality text`; `supported_types liquidity_type[]`; `availability_label text`; `last_updated_at timestamptz`; `scenario_id uuid FK demo_scenarios(id)`; `is_demo boolean default true`; no precise coordinates required |
| `alerts` | `id uuid PK`; `agent_id uuid FK agent_profiles(id) null`; `cluster_id uuid FK operations_profiles(id) null`; `alert_type`; `severity risk_level`; `title text`; `body text`; `read_at timestamptz null`; `acknowledged_at timestamptz null`; `scenario_id uuid FK demo_scenarios(id)`; `created_at` |
| `assistant_messages` | `id uuid PK`; `user_id uuid FK profiles(id)`; `scenario_id uuid FK demo_scenarios(id)`; `role text check in ('user','assistant')`; `content text`; `context_refs jsonb`; `created_at`; retention-limited; no credentials/PII |
| `audit_logs` | `id uuid PK`; `actor_id uuid FK profiles(id) null`; `action text`; `entity_type text`; `entity_id uuid null`; `scenario_id uuid FK demo_scenarios(id) null`; `metadata jsonb`; `request_id text`; `created_at`; append-only |
| `demo_scenarios` | `id uuid PK`; `key scenario_key`; `name text`; `description text`; `configuration jsonb`; `is_active boolean default false`; `is_read_only boolean default false`; `version int > 0`; timestamps; unique `(key, version)` |

## Relationships

`profiles` has one optional agent or operations profile. An operations profile represents a cluster; agent profiles reference their assigned cluster. Agents have many snapshots, transactions, forecasts, risks, recommendations, requests and alerts. Forecasts produce risks; risks may produce recommendations. Requests record creator/reviewer and scenario. All scenario-specific records reference `demo_scenarios`.

## Indexes

- `agent_profiles(user_id)`, `agent_profiles(cluster_id)`, unique `agent_code`
- `liquidity_snapshots(agent_id, liquidity_type, observed_at desc)` and `(scenario_id)`
- `transactions(agent_id, liquidity_type, occurred_at desc)` and `(scenario_id, occurred_at)`
- `forecasts(agent_id, generated_at desc)`, `(scenario_id, agent_id)`
- `liquidity_risks(agent_id, risk_level, as_of desc)`
- `recommendations(agent_id, status, created_at desc)`
- `rebalance_requests(agent_id, status, submitted_at desc)`, `(reviewed_by, status)`
- `alerts(agent_id, read_at, created_at desc)`, `(cluster_id, created_at desc)`
- `assistant_messages(user_id, scenario_id, created_at)`
- `audit_logs(actor_id, created_at desc)`, `(entity_type, entity_id)`
- `demo_scenarios(key, is_active)`

Add database checks for positive horizons/amounts, non-negative balances, valid state transitions in server domain logic, and maximum request amounts configured per demo scenario. Add a partial unique index if only one active scenario is permitted.

## RLS policy matrix

| Table | Agent | Operations manager | Admin | Judge |
|---|---|---|---|---|
| profiles | Own row | Own row | Limited demo profile administration | Curated demo identity only |
| agent_profiles | Own | Assigned cluster | Demo metadata only | Curated synthetic rows |
| operations_profiles | Own cluster metadata | Assigned cluster | Demo metadata | Curated aggregates |
| snapshots/transactions/forecasts/risks | Own agent | Assigned cluster | No default operational access | Curated read-only scenario |
| recommendations | Own | Assigned cluster read | No default approval | Read-only curated |
| requests | Own create/read | Assigned cluster review | No operational approval by default | Read-only curated |
| support directory | Read synthetic directory | Read synthetic directory | Manage demo entries | Read-only |
| alerts | Own | Assigned cluster | Demo diagnostics only | Read-only curated |
| assistant messages | Own | Own | No default content access | No persistence or isolated demo |
| audit logs | No direct access | Scoped operational events if needed | Restricted metadata access | No access |
| demo scenarios | Read assigned/public | Read and select permitted | Manage | Read-only select |

RLS must use verified identity and role/cluster relationships from trusted rows, not client-supplied IDs or metadata. Writes should be performed through narrowly scoped server operations. Judge mode must never receive mutation policies. Service-role bypass must not be exposed to clients.

## Seed strategy

Use versioned SQL/TypeScript fixtures with fixed IDs or stable synthetic codes, explicit `is_demo=true`, reproducible timestamps relative to a fixed scenario clock, and no real customer identifiers. Seed each scenario independently and reset only after administrator confirmation. See `SEED_DATA.md`.
