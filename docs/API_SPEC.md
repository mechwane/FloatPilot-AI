# API Specification — FloatPilot AI

**Base path:** `/api/v1` · JSON over HTTPS · all financial activity is simulated.

## Conventions

Protected endpoints require a verified Supabase session. The server resolves role and scope from trusted records. Validate params, query strings and bodies with Zod. Monetary request values use integer kobo. Return ISO-8601 timestamps. Never accept role, owner or cluster scope as authoritative client input.

Success envelope: `{ "data": ..., "meta": { "requestId": "..." } }`  
Error envelope: `{ "error": { "code": "VALIDATION_ERROR", "message": "Safe explanation", "details": ... }, "meta": { "requestId": "..." } }`

## Endpoints

| Method and route | Purpose | Access |
|---|---|---|
| `GET /dashboard` | Own agent summary, current liquidity, risks, alerts, pending requests | Agent |
| `GET /forecasts?type=&horizon=` | Forecast series and assumptions | Agent own; manager assigned cluster |
| `GET /alerts` | List alerts with read state and filters | Agent own; manager cluster |
| `PATCH /alerts/:id` | Mark read/acknowledged | Owner or scoped manager |
| `GET /recommendations` | List explainable proposals | Agent own; manager cluster read |
| `PATCH /recommendations/:id` | Accept for review or dismiss proposal | Owning agent |
| `GET /requests` | List requests | Agent own; manager cluster |
| `POST /requests` | Submit simulated support request | Agent |
| `GET /requests/:id` | Request detail/history | Owner or assigned manager |
| `POST /requests/:id/review` | Approve simulated, reject or request clarification | Assigned manager |
| `POST /requests/:id/cancel` | Cancel eligible submitted request | Requesting agent |
| `GET /support?type=&locality=` | Search synthetic support directory | Authenticated roles; judge curated |
| `GET /operations/overview` | Cluster risk and liquidity aggregates | Operations manager |
| `GET /operations/agents` | Assigned cluster agent list and risk ranking | Operations manager |
| `GET /scenarios` | List available synthetic scenarios | Authenticated; judge read-only list |
| `POST /scenarios/:key/activate` | Activate scenario and seed/reset demo state | Admin; manager only if explicitly enabled |
| `POST /scenarios/:key/reset` | Reset scenario state | Admin, confirmed and audited |
| `POST /assistant/messages` | Grounded assistant response | Authenticated; judge endpoint read-only/no persistence |
| `GET /admin/demo-users` | List demo user metadata | Admin |
| `POST /admin/demo-users` | Provision demo role/user metadata | Admin |

## Request/response models

### Submit request
```json
{
  "liquidityType": "cash",
  "requestedAmountKobo": 25000000,
  "reason": "forecast_shortage",
  "note": "Synthetic scenario request"
}
```
Response returns request ID, `submitted` status, requested resource/amount, submission timestamp and `simulated: true`. It does not return a transfer reference.

### Review request
```json
{
  "decision": "approve_simulated",
  "reviewNote": "Approved for the demo workflow"
}
```
Allowed decisions: `approve_simulated`, `reject`, `request_clarification`. Response includes updated status, reviewer and timestamp, plus `simulated: true`.

### Assistant message
```json
{ "message": "Why is my e-float at risk?", "scenarioId": "uuid" }
```
Response: `{ "answer": "...", "evidence": [{"label":"Projected balance","value":"...","asOf":"..."}], "limitations": ["Synthetic scenario; estimate, not a guarantee."] }`. The server selects evidence from authorised context; clients cannot inject authoritative evidence.

## Validation and state rules

Amounts must be positive integer kobo and below the scenario-configured ceiling. Notes and messages have length limits; strip or safely render markup. Only valid state transitions are accepted. Duplicate submissions should use an idempotency key scoped to actor and route. Scenario IDs and agent IDs must be authorised server-side.

## Failure responses

- `400 VALIDATION_ERROR`: malformed or invalid input.
- `401 UNAUTHENTICATED`: no valid session.
- `403 FORBIDDEN`: role/scope does not permit action.
- `404 NOT_FOUND`: resource absent or intentionally concealed.
- `409 CONFLICT`: invalid transition, stale version or duplicate conflict.
- `413 PAYLOAD_TOO_LARGE`: body exceeds limit.
- `429 RATE_LIMITED`: request/assistant quota exceeded.
- `500 INTERNAL_ERROR`: generic safe failure with request ID.
- `503 DEPENDENCY_UNAVAILABLE`: database/assistant provider unavailable.

## Versioning

Keep breaking changes under a new `/api/v2` prefix. Additive optional response fields may be introduced in v1 with documentation and tests. Maintain generated/shared TypeScript schemas from validated contracts where practical.

## Financial movement boundary

No endpoint creates a real payment, transfer, cash dispatch, settlement or balance mutation. “Approval” updates only the simulated request workflow and audit history. Snapshot changes occur only through controlled synthetic scenario generation/reset.
