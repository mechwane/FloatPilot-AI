# Proof of Concept — FloatPilot AI

## Objective

Demonstrate that a small, transparent decision-support workflow can identify impending synthetic cash/e-float pressure, explain the signal and coordinate a human-reviewed response before a simulated service interruption.

## Technical assumptions

- Next.js server-rendered application with typed route handlers.
- Supabase PostgreSQL/Auth/RLS provides persistence and identity.
- Forecast calculations are deterministic, versioned domain functions; no model training is required for MVP.
- An optional LLM assistant receives only minimised, authorised synthetic context and cannot invoke financial actions.
- Scenario fixtures are version-controlled and reproducible.

## Demo-data limitations

All agents, balances, transactions, locations, forecasts and requests are fabricated. Data distributions are designed for understandable scenarios, not statistically representative of any bank, geography or agent population. No production calibration or real-world predictive performance is claimed.

## What the prototype proves

- Liquidity position can be represented separately by resource type.
- Rule-based projections can surface a threshold breach in a controlled scenario.
- Risk explanations can connect a forecast to visible activity and assumptions.
- An agent-to-manager request workflow can be demonstrated with role checks and audit events.
- Cluster-level prioritisation can be explored without executing a financial movement.

## Intentionally simulated

Transactions, cash/e-float balances, forecast outputs, alerts, support availability, scenario changes, manager approvals and request fulfilment. “Approved” means a demo workflow state changed; it does not mean funds were transferred or physically delivered.

## Ethical and security limitations

No customer PII, bank credentials, live account information, payment rails or real-time bank feeds. The assistant must not fabricate evidence, guarantee outcomes or present recommendations as financial advice. Demo data must be clearly labelled in UI and exported material. Human review is mandatory.

## Demonstration scenarios

### A. Payday cash-withdrawal surge
Synthetic agent opens with ₦420,000 cash and ₦680,000 e-float. A payday withdrawal pattern drives projected cash below a ₦150,000 safety threshold within six hours, while e-float remains adequate. FloatPilot explains the outflow pattern and suggests a manager-reviewed cash support request.

### B. Market-day e-float transfer surge
Synthetic agent opens with ₦260,000 cash and ₦510,000 e-float. Repeated transfer demand projects e-float below a ₦120,000 threshold within four hours. Cash remains above its threshold. The agent receives an e-float-specific alert and can request simulated support.

### C. Operations manager cluster intervention
A manager sees a synthetic cluster of six agents: two high cash risk, two high e-float risk, and two stable. The manager sorts by risk and forecast time-to-threshold, reviews requests, and approves a simulated request for one assigned agent. Aggregate risk updates; no balance or external financial system is changed.
