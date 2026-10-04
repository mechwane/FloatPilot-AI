# Seed Data Strategy — FloatPilot AI

## Principles

Generate only fabricated, deterministic records. Use synthetic names/codes and broad demo localities; do not use real agent identifiers, customer data, bank credentials or actual transaction exports. Every relevant record carries a scenario reference and is marked synthetic. Seed reset must be controlled and repeatable.

## Agent profiles

Create six agents in one fictional cluster, `ABE-DEMO-01`, with codes `FP-A001` through `FP-A006`, and localities such as “Central Demo”, “Market Demo” and “North Demo”. Names should be clearly fictional (e.g. Agent One) rather than implying real individuals. Threshold defaults: cash ₦150,000; e-float ₦120,000. Amounts are stored in kobo.

| Agent | Opening cash | Opening e-float | Scenario role |
|---|---:|---:|---|
| FP-A001 | ₦420,000 | ₦680,000 | Payday cash surge |
| FP-A002 | ₦260,000 | ₦510,000 | Market e-float surge |
| FP-A003 | ₦360,000 | ₦330,000 | Moderate mixed demand |
| FP-A004 | ₦180,000 | ₦220,000 | Elevated cash risk |
| FP-A005 | ₦550,000 | ₦760,000 | Stable |
| FP-A006 | ₦310,000 | ₦145,000 | Elevated e-float risk |

## Transaction patterns

Use a 24-hour historical window in 15-minute or hourly buckets. Suggested per-event amounts: ₦2,000–₦80,000; aggregate activity should be scenario-controlled and plausible for a demo. Categories: `withdrawal`, `transfer`, `cash_in`, `efloat_topup`, `reversal_simulated`. Avoid customer identifiers. Store direction, amount, resource type, timestamp, category, scenario and synthetic reference only.

## Risk scenarios and forecast assumptions

- Horizons: 6 hours (360 minutes) and 24 hours (1,440 minutes).
- Forecast step: 30 minutes.
- Safety thresholds: cash ₦150,000; e-float ₦120,000 by default.
- Risk levels: low when projected minimum remains at least 1.5× threshold; medium when between threshold and 1.5×; high when threshold is crossed within horizon; critical when projected balance reaches zero or breach is within 60 minutes. Document exact precedence in the domain implementation.
- Baseline net outflow rates are derived from the scenario’s recent bucketed activity and capped by fixture parameters to avoid runaway extrapolation. Inflows are explicit and separately visible.
- Forecast outputs include generated time, horizon, assumptions, projected series, threshold and first breach time. They are estimates, not probabilities unless a calibrated probability method is later approved.

## Chart and table data

Generate enough points for legible line charts: 13 points for a 6-hour forecast and 49 for a 24-hour forecast at 30-minute intervals. Include historical observed points separately from projected points. Use varied but controlled trajectories, threshold crossings, stable examples, alert timestamps and request status changes. Provide equivalent accessible tabular summaries.

## Scenario fixtures

### Agent demo — payday cash withdrawal surge
FP-A001 starts at cash ₦420,000 and e-float ₦680,000. Synthetic withdrawals total approximately ₦300,000 over the upcoming six-hour scenario window; inflows are modest. Cash is forecast to cross ₦150,000 around hour 5; e-float remains above threshold. Create one high cash-risk alert, one recommendation and one submitted request example.

### Agent demo — market-day e-float surge
FP-A002 starts at cash ₦260,000 and e-float ₦510,000. Transfer demand causes approximately ₦430,000 net e-float outflow over six hours; cash activity remains moderate. E-float crosses ₦120,000 around hour 4. Create an e-float risk alert and a draft recommendation; no real transfer is performed.

### Operations demo — cluster intervention
Use all six agents: two high cash risk, two high e-float risk and two stable/medium, with scenario tuning to ensure this exact distribution. Include three requests across submitted/under-review states. Manager can review a request for an assigned agent; approval changes request status only.

### Judge demo — read-only
Expose curated snapshots, forecasts, alerts and scenario narratives for all three cases. Disable create, review, reset and admin mutations. Use stable fixture timestamps or a visible “scenario time” so the walkthrough is repeatable.

## Data ranges and example values

- Snapshot balances: ₦80,000–₦900,000.
- Request amounts: ₦20,000–₦300,000, further constrained by scenario.
- Transaction event amounts: ₦2,000–₦80,000.
- Forecast step: 30 minutes; horizon: 6h/24h.
- Support directory: 3–5 fictional entries per scenario, locality labels only, availability `Demo available`, `Demo busy` or `Demo unknown`.
- Alert severities: include low/medium/high/critical in fixtures, but never use severity as a substitute for explanatory text.
- Assistant prompts: fixed safe examples such as “Why is cash at risk?”, “What assumption drives this forecast?” and “Which agents need attention?”

Keep fixtures internally consistent: snapshot totals, transaction aggregates, forecast series, risk rows, recommendations, alerts and request histories must agree. Validate consistency with seed tests before demo use.
