# Product Requirements Document — FloatPilot AI

**Status:** Planning baseline · **Release target:** Hackathon MVP · **Data:** Synthetic only

## 1. Executive summary

FloatPilot AI helps bank/POS agents and operations teams anticipate physical-cash and e-float shortages. It combines recent synthetic activity, available liquidity snapshots and deterministic short-horizon forecasts to surface risk, explain likely drivers and propose safe rebalancing workflows. People retain control: the system does not move money.

## 2. Users and personas

- **Agent:** serves customers, tracks cash/e-float, needs timely, actionable warnings and a simple way to request support.
- **Operations manager:** oversees an assigned cluster, prioritises emerging shortages and reviews simulated requests.
- **Platform administrator:** manages demo users, scenarios, configuration and operational health—not agent funds.
- **Hackathon judge:** explores a guided, read-only synthetic demo without creating or approving operational actions.

## 3. Core problem

Liquidity is often managed reactively. A shortage of cash or e-float can interrupt withdrawals or transfers, reduce commissions and damage customer confidence. Existing manual visibility may not make local patterns or cluster-level pressure obvious early enough.

## 4. Goals

1. Show each agent a clear, timely synthetic liquidity position.
2. Forecast near-term cash and e-float pressure with transparent assumptions.
3. Explain risk drivers in understandable language.
4. Present practical recommendations with human approval.
5. Help managers identify and coordinate cluster-level interventions.
6. Deliver a polished, safe and reproducible hackathon demonstration.

## 5. Non-goals

Live bank integration; payment or transfer execution; automated cash movement; customer-level banking; credit decisions; guaranteed prediction accuracy; regulatory-grade treasury management; production financial advice; route optimisation requiring live location feeds.

## 6. Feature requirements

### Agent dashboard
Display cash and e-float available, recent simulated activity, forecast horizon, risk level, next expected threshold breach, active alerts and pending requests. Show “Demo data” persistently.

### AI assistant
Answer questions grounded only in the currently authorised synthetic records and documented forecast outputs. Explain drivers and cite in-app data context (e.g. metric/time window). It must disclose uncertainty, refuse unsupported live-bank questions and never initiate a movement.

### Forecasts
Generate deterministic 6-hour and 24-hour projections from scenario activity, opening balance, expected inflows/outflows and configured safety thresholds. Show forecast range/assumptions and mark estimates as simulated.

### Alerts
Create in-app alerts for threshold crossings, forecast risk changes, stale snapshots and request updates. Support read/unread and acknowledgement where authorised. Avoid implying push/SMS delivery in MVP.

### Recommendations
Offer ranked, explainable actions such as “request e-float support” or “review cash replenishment with manager”. Include resource type, estimated gap, urgency, rationale, confidence/limitations and required approval. No execution.

### Rebalancing requests
Agent submits a simulated request with resource type, requested amount, reason and optional note. Manager reviews, approves, rejects or requests clarification. Status changes are workflow simulation only and must not alter a real balance.

### Nearby support directory
Show synthetic support agents or service points with demo locality, resource type, availability label and last-updated timestamp. No live geolocation, dispatch or verified availability claim.

### Operations dashboard
Show assigned-cluster aggregate liquidity, risk distribution, forecast pressure, agents needing attention, request queue and scenario comparison. Enforce cluster scoping.

### Demo simulator
Let permitted demo users switch among fixed scenarios, reset scenario state and inspect expected effects. Judge mode is read-only; simulator state is synthetic and visibly labelled.

### Admin tools
Manage demo users/roles, scenario definitions and seed reset controls. Restrict destructive reset/configuration actions to administrators and require confirmation. Admin cannot access secrets or real banking systems.

## 7. User stories

- As an agent, I can see cash and e-float separately so I know which service may be disrupted.
- As an agent, I can understand why a shortage is predicted and when it may occur.
- As an agent, I can submit a support request without believing funds have moved.
- As a manager, I can prioritise risk across my assigned cluster.
- As a manager, I can approve or reject a simulated request with an audit trail.
- As a judge, I can explore meaningful scenarios without write access or credentials.
- As an administrator, I can reset synthetic demo data safely.

## 8. Roles and permissions

| Capability | Agent | Operations manager | Admin | Judge |
|---|---:|---:|---:|---:|
| Read own profile/liquidity | Yes | Assigned cluster | Demo administration | Read-only demo |
| Read other agents | No | Assigned cluster only | Limited admin metadata | Synthetic aggregate/demo |
| Create request | Own | On behalf only if explicitly enabled; default no | No | No |
| Review request | No | Assigned cluster | Admin support only, not operational approval by default | No |
| Change scenario | No | Demo scenarios if enabled | Yes | Read-only selection |
| Manage demo users | No | No | Yes | No |
| Execute financial movement | Never | Never | Never | Never |

## 9. Acceptance criteria

- Dashboard distinguishes cash from e-float and displays synthetic-data labelling.
- Forecasts show horizon, assumptions, threshold and explainable drivers.
- Risk states are consistent across dashboard, alerts and operations views.
- Every recommendation states that approval is required and has no execution action.
- Requests have validated amounts, clear statuses and actor/timestamp history.
- Server and RLS enforce role and record scope, including direct-request tests.
- Judge mode cannot mutate data.
- Scenario switching/reset is deterministic and clearly communicated.
- Core screens work at mobile, tablet and desktop widths and with keyboard navigation.
- No live financial credentials, customer data, payment APIs or unsubstantiated accuracy claims exist.

## 10. Success metrics

Prototype metrics: time to identify highest-risk agent; percentage of risk cards with understandable rationale; completion rate of agent request journey; manager review completion; judge scenario completion; critical journey test pass rate; zero unauthorised access in test matrix. Forecast quality is evaluated only against generated scenario ground truth and reported as an experiment, not a real-world accuracy claim.

## 11. MVP and roadmap

**MVP:** four roles, synthetic data, deterministic forecasts, explainable rules, dashboard, alerts, approval-based simulated requests, cluster operations view, grounded assistant, scenario simulator, audit trail and deployed read-only judge demo.

**Post-hackathon:** user research, calibrated forecasting on properly governed historical data, formal model evaluation, enterprise identity, approved bank integrations, operational monitoring, localisation, mobile experience and compliance review. Each requires separate security, legal, data and product approval.
