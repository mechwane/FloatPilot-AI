# Demo Script — FloatPilot AI

## 90-second pitch

“Agents can serve customers only when they have the right liquidity: physical cash for withdrawals and e-float for transfers. Today, shortages are often noticed only after service is disrupted. FloatPilot AI is a decision-support prototype that uses recent activity and transparent forecasts to flag a potential shortage early, explain what is driving it, and help an agent raise a request for human review.

In this demo, all data is synthetic. We are not connected to Zenith Bank or any live banking system, and no money moves. The value we are demonstrating is earlier visibility, clearer explanations and coordinated decisions—not autonomous finance.”

## 3-minute walkthrough

1. Open demo landing page. Say: “This is a synthetic, read-only demo environment.”
2. Select **Payday cash surge**. Say: “We are loading a fixed scenario, not a live feed.”
3. Enter agent view. Point to cash and e-float cards: “These are separate liquidity resources; one can be at risk while the other is healthy.”
4. Open forecast. “The projection uses scenario activity and a visible safety threshold. It is an estimate, not a guarantee.”
5. Open risk explanation. “The system links the risk to the withdrawal pattern and expected threshold crossing.”
6. Open recommendation and request form. “This is a suggested next step. The agent reviews and submits it; nothing is transferred.”
7. Switch to manager role. Open request queue. “The manager sees only the assigned synthetic cluster and reviews the request.”
8. Approve simulated request. “Approval updates the demo workflow and audit trail only.”

## 5-minute full demo

1. **Landing (0:00–0:30):** explain problem, product and synthetic-only boundary.
2. **Payday scenario (0:30–1:30):** choose scenario, inspect agent liquidity, forecast curve, threshold and rationale.
3. **Agent workflow (1:30–2:15):** open recommendation, use as draft, enter amount/reason, submit; show request status.
4. **Manager cluster (2:15–3:15):** open operations overview, sort risk by time-to-threshold, inspect agents, review request and approve simulated.
5. **Market-day e-float (3:15–4:00):** switch scenario, show e-float risk while cash remains adequate; compare resource-specific alerts.
6. **Assistant (4:00–4:35):** ask “Why is e-float at risk in this scenario?” Point to evidence and uncertainty. Ask an unsupported live-bank question to demonstrate refusal.
7. **Safety and close (4:35–5:00):** show demo notice, audit timeline and limitations. Close with earlier warning + explainable human action.

## Exact click path

`Explore read-only demo` → `Payday cash surge` → `Open agent dashboard` → `View cash forecast` → `Why this risk?` → `Create support request` → `Submit request` → switch to `Operations manager demo` → `Request queue` → open request → `Approve simulated` → confirm → `Market-day e-float surge` → `Ask FloatPilot`.

Labels may be adjusted during implementation but must remain consistent with the final UI.

## Judge questions and concise answers

- **What does the AI do?** Forecasting is deterministic and explainable in the MVP; the assistant summarises authorised scenario evidence. We do not claim a trained predictive model.
- **Where is the data from?** All data is synthetic and generated for repeatable scenarios.
- **Is this connected to Zenith Bank?** No. There is no live bank integration or access to bank systems.
- **Does it move money?** No. Requests and approvals change simulated workflow state only.
- **How accurate is it?** We can test against the known synthetic scenario ground truth. That is not evidence of real-world accuracy; calibration requires governed historical data and evaluation.
- **How is it safe?** Least-privilege roles, server authorisation, RLS, validation, audit metadata and mandatory human review are part of the design.
- **Can it scale?** The modular Next.js/PostgreSQL architecture is a practical starting point. Production scale requires load testing, operational controls and architecture review.
- **Could it integrate with a bank later?** Potentially, subject to formal bank approval, secure APIs, compliance, privacy assessment, testing and a separately approved scope.
- **Why not automate rebalancing?** Human approval is a deliberate MVP safety boundary; the prototype does not execute movements.
- **What happens if the assistant is wrong or unavailable?** It must disclose missing context and fall back to deterministic forecast explanations; it cannot approve or execute actions.
