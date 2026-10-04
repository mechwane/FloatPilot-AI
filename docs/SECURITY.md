# Security and Privacy — FloatPilot AI

## Security posture

FloatPilot AI is a synthetic-data prototype, not a production banking platform. Security controls are still required because role boundaries, authentication and workflow integrity are core parts of the demonstration.

## Threat model

| Threat | Example | Controls |
|---|---|---|
| Account compromise | Demo credential reuse | Auth provider, demo-only credentials, session expiry |
| Broken access control | Agent requests another agent’s records | Server scope checks, RLS, negative tests |
| Privilege escalation | Client edits role field | Trusted profile lookup; no client-authoritative roles |
| Data leakage | Secrets or sensitive context in logs | Secret hygiene, minimised logging, redaction |
| Injection/XSS | Malicious note or assistant output | Zod validation, safe rendering, CSP direction |
| CSRF/session abuse | Cross-site state-changing request | SameSite cookies, origin/CSRF controls as applicable |
| Prompt injection | User asks assistant to ignore restrictions | No privileged tools, context separation, output validation |
| Workflow abuse | Repeated or oversized requests | Limits, idempotency, rate limiting, state machine |
| Demo confusion | Approval mistaken for actual transfer | Persistent simulation labels and no financial rails |
| Supply-chain issue | Vulnerable dependency | Lockfile, dependency audit and updates |

## Least privilege and authentication

Use Supabase Auth for named demo roles. Verify sessions server-side. Keep role assignment in trusted database records. Protect admin actions separately and require confirmation for reset or role changes. Judge access is read-only and limited to curated synthetic data.

## Authorisation and RLS

Enable RLS on every user-accessible table. Default deny. Agent reads/writes are restricted to own records; managers are restricted to assigned clusters; admin access is limited to demo management; judges cannot mutate. Use server-side checks in addition to RLS. Never expose the service-role key to browser code. Test direct API and database access for both allowed and denied cases.

## Audit logs

Record actor, action, entity, scenario, timestamp, request ID and minimal metadata for request submission/review, scenario activation/reset and administrative changes. Logs are append-only through application paths. Do not log passwords, tokens, secrets, raw assistant prompts with sensitive data or unnecessary user content.

## Secrets

Use environment variables and hosting secret stores. Commit only `.env.example` with names and safe placeholders. Keep privileged keys server-only, rotate exposed credentials, restrict access and separate development/demo environments. Do not paste secrets into issues, prompts, screenshots or logs.

## Input validation

Validate route params, query strings and bodies using Zod. Enforce integer kobo amounts, scenario ceilings, string length limits, enumerated values, ownership and valid workflow transitions. Use parameterised queries and safe rendering. Reject unexpected fields where practical.

## Rate limiting and abuse controls

Apply per-user and per-IP limits to authentication-sensitive endpoints, assistant requests, scenario resets and request creation. Add request-size limits, idempotency for submissions and cooldowns for costly provider calls. Exact thresholds are implementation configuration, not product promises.

## XSS and CSRF

Render user content as text; do not use unsafe HTML injection. Apply a restrictive Content Security Policy where compatible. For cookie-authenticated mutations, verify origin and use framework-appropriate CSRF protections; use secure, HttpOnly and SameSite cookies. Avoid leaking tokens in URLs.

## Secure AI usage

The assistant receives only authorised, minimised synthetic context. Treat user text and retrieved records as untrusted data, not instructions. No SQL, external browsing, privileged tools, approval authority or financial-action tools. Validate output against a schema, cap length, rate-limit and provide deterministic fallback. Disclose uncertainty and refuse unsupported claims.

## Privacy and financial claims

Do not collect live customer names, account numbers, credentials, transaction identifiers or precise location. Retain only demo information needed for the prototype. Do not claim guaranteed shortage prevention, real-world accuracy, bank endorsement or access to live systems. Any future real-data use requires separate legal, privacy, security and institutional approval.

## Security checklist

- [ ] RLS enabled and reviewed on all exposed tables
- [ ] Server verifies identity, role and scope on every protected route
- [ ] Judge mode has no write path
- [ ] No live banking/payment integrations or customer data
- [ ] Secrets absent from Git, browser bundles and logs
- [ ] Zod validation and safe error envelopes in place
- [ ] Request amount ceilings, state transitions and idempotency tested
- [ ] Assistant has no mutation tools and passes prompt-injection tests
- [ ] Rate limiting and request-size limits configured
- [ ] Audit events cover consequential demo actions
- [ ] Dependency, lint, type, unit, integration and E2E checks pass
- [ ] Accessibility, privacy copy and synthetic-data labels reviewed
- [ ] Deployment environment and rollback/reset process documented
