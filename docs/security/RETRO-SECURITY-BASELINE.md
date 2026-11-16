# RETRO Technologies — Security Baseline

**Document ID:** RETRO-SEC-BASE-001  
**Version:** 1.0  
**Status:** Company standard — initial baseline; implementation evidence is tracked separately  
**Owner:** RETRO Technologies  
**Applies to:** The parent website and every RETRO Technologies product repository  
**Effective date:** 16 November 2026  
**Review cadence:** At every material release and at least quarterly

## 1. Purpose

This document defines the minimum security and assurance standard for RETRO Technologies software. The parent website is the reference implementation for portfolio-wide governance and evidence practices. It is not a claim that the website or any child product is already secure.

Every control must be classified as **PASS**, **FAIL**, **NOT VERIFIED**, **IN PROGRESS**, or **N/A**. A PASS requires reproducible evidence tied to a repository revision, deployed target, test, or provider configuration. A policy statement, design document, UI label, successful build, or absence of a search match is not sufficient by itself.

## 2. Governance principles

1. **Least privilege:** people, services, CI jobs, agents, and integrations receive only the access needed for their task.
2. **Deny by default:** missing identity, permissions, configuration, or evidence must not silently grant access.
3. **Secrets stay out of source:** credentials belong in approved secret stores or protected runtime configuration, never source code, client bundles, logs, screenshots, or public artifacts.
4. **Server-side enforcement:** client-side checks improve usability but never replace server-side authorization or validation.
5. **Data minimization:** collect, retain, and expose only data required by the product.
6. **Human approval for consequential actions:** publishing, external writes, privileged repository actions, production changes, and irreversible operations require explicit authorization appropriate to the product.
7. **Evidence over assertion:** every security claim must identify what was checked, where, when, by whom or by which tool, and against which version.
8. **Independent product boundaries:** the parent website presents products; it does not combine their credentials, data stores, runtime privileges, or release authority.

## 3. Applicability profiles

Choose the applicable profile for each repository. A repository may use more than one.

- **Static website:** static HTML/CSS/JS, no server-side identity, database, or user-submitted data. Authentication, password hashing, and database controls may be N/A only when source and deployment inspection confirm those features do not exist.
- **Backend/API:** server routes, sessions, databases, file uploads, user accounts, or external integrations.
- **AI/agent system:** model providers, prompts, tools, autonomous or queued work, retrieval, or external actions.
- **Android/mobile:** device permissions, local storage, exported components, network access, and packaged application artifacts.
- **Documentation-only:** no executable application in scope. Verify repository access, secret hygiene, workflow permissions, and links; mark runtime controls N/A with a reason.

N/A must include a short explanation and the evidence supporting non-applicability. It must not be used merely because a control has not been implemented.

## 4. Mandatory security controls

### SEC-01 — Security headers and transport

- Production and preview HTTPS endpoints must be checked for TLS validity and expected redirect behavior.
- Configure and verify an appropriate Content Security Policy (CSP), preferably starting with report-only evaluation where compatibility is uncertain, then enforce a tested policy.
- Configure and verify HSTS only after HTTPS coverage and domain ownership are confirmed.
- Set appropriate anti-framing protection (CSP `frame-ancestors` and/or `X-Frame-Options`), `X-Content-Type-Options: nosniff`, a restrictive `Referrer-Policy`, and a least-privilege `Permissions-Policy`.
- Do not copy a generic CSP blindly; enumerate required script, style, image, font, connect, and frame sources.
- Evidence: raw response headers from the real deployed hostname, date/time, target URL, and a repeatable test.

### SEC-02 — Authentication and session security

- Products with user accounts or protected APIs must authenticate users on the server.
- Validate token/session integrity, issuer, audience, expiry, and intended use; reject missing, malformed, expired, or incorrectly scoped credentials.
- Cookies used for sessions must use appropriate `Secure`, `HttpOnly`, and `SameSite` settings, with CSRF protection where required by the authentication pattern.
- Session creation, rotation, expiry, revocation, and logout behavior must be tested.
- Never trust a user ID, workspace ID, role, or permission supplied only by an untrusted client header or request body.
- Static products with no accounts or protected routes may mark this N/A with source and deployment evidence.

### SEC-03 — Secrets and environment configuration

- Scan current source and repository history for credentials; inspect generated bundles and public build output for accidental inclusion.
- Keep private keys and provider secrets server-side. Public client variables (for example, frontend variables embedded at build time) must contain no secrets.
- Use separate credentials and least-privilege scopes for development, preview, and production.
- Document rotation and revocation for any credential suspected of exposure.
- Do not paste secret values into audit reports. Record only the secret type, location class, status, and remediation reference.
- Evidence: secret-scanning results, configuration review, and public-artifact inspection. A text search alone is not a complete secret audit.

### SEC-04 — Authorization and least privilege

- Enforce access on every protected server-side operation, not only in the UI.
- Define roles/capabilities and resource ownership explicitly; deny by default.
- Verify tenant/workspace ownership from the authenticated principal and trusted server-side state.
- Protect administrative functions with separate authorization checks and auditable actions.
- CI tokens and integrations must have only the permissions required by the workflow.
- Evidence: positive and negative authorization tests, role matrix, and workflow permission review.

### SEC-05 — Database and data isolation

- Products using a database must use parameterized queries or safe query builders.
- Apply least-privilege database identities, environment separation, and access restrictions.
- Multi-tenant products must enforce tenant isolation in the database where supported (for example, row-level policies) and in the application layer; test cross-tenant read and write denial.
- Protect backups, migrations, logs, and exports; define retention and deletion behavior.
- Products without a database may mark this N/A with an inventory showing no database or data service.

### SEC-06 — XSS and output handling

- Treat user content, provider responses, imported files, URLs, and model output as untrusted.
- Prefer safe DOM APIs and framework escaping. Avoid unsafe HTML insertion; where rich HTML is a product requirement, use a maintained sanitizer with a strict allowlist.
- Encode output for its destination context and review URL handling, including dangerous schemes.
- CSP is defense in depth, not a substitute for safe rendering.
- Evidence: source review of rendering sinks plus tests using representative hostile input.

### SEC-07 — Input validation, forms, and file handling

- Validate all untrusted input on the server using explicit schemas, type/length limits, and allowlists where practical.
- Enforce validation again at trust boundaries even if the client validates first.
- Protect cookie-authenticated state-changing routes against CSRF.
- File uploads must constrain type, size, storage location, and access; do not execute uploaded content.
- Escape validation errors and avoid reflecting raw input into HTML or logs.
- Static websites with no forms, uploads, or input endpoints may mark the relevant subcontrols N/A after inspection.

### SEC-08 — Rate limiting and abuse controls

- Apply rate limits to authentication, expensive operations, AI/model calls, uploads, and other abuse-sensitive endpoints.
- Use identity-aware and resource-aware quotas where appropriate; do not rely solely on IP addresses.
- Define safe failure behavior and monitor repeated failures without logging secrets.
- Static sites with no dynamic endpoints may mark this N/A; hosting/CDN abuse controls can still be reviewed separately.

### SEC-09 — Dependency and software supply-chain security

- Maintain a lockfile and use supported dependency versions.
- Run dependency vulnerability checks and review critical/high findings before release.
- Review package lifecycle scripts and newly introduced dependencies.
- Pin CI actions and external build dependencies to immutable revisions where practical; review updates deliberately.
- Use minimal CI permissions and avoid exposing deployment credentials to untrusted pull-request code.
- Evidence: lockfile, dependency audit output, workflow permissions, and action pinning review.

### SEC-10 — Password storage

- If passwords are stored, use a purpose-built password hashing algorithm with per-password salts and current recommended work factors (for example, Argon2id where supported).
- Never store plaintext or reversibly encrypted passwords.
- Verify password reset, login throttling, and credential-change flows.
- Products using a trusted external identity provider without storing passwords may mark this N/A with architecture and configuration evidence.

### SEC-11 — Debugging and error handling

- Disable debug endpoints, verbose stack traces, test routes, and development-only behavior in production.
- Return generic external errors; keep diagnostic details in access-controlled logs.
- Ensure logs redact passwords, tokens, session cookies, authorization headers, and sensitive personal data.
- Evidence: production configuration and representative error-response tests.

### SEC-12 — Administrative routes and privileged operations

- Identify all administrative and privileged operations.
- Require server-side authorization, least privilege, and explicit approval for high-impact actions.
- Log actor, action, target, outcome, and timestamp without recording secret values.
- Test direct URL/API access by unauthenticated and underprivileged users.

### SEC-13 — Public files and build-output boundary

- Use an explicit public-output allowlist where feasible.
- Inspect generated output for source maps, environment files, repository metadata, internal documentation, test fixtures, backups, archives, and private configuration.
- Verify that `.git`, internal docs, source templates, and non-public artifacts are not served.
- Test representative paths against the actual deployment; a local build check alone is insufficient.
- Evidence: build manifest, output inventory, negative path tests, and deployed response checks.

### SEC-14 — CI/CD, branches, and release integrity

- Protect the default branch with appropriate review and status-check requirements where repository capabilities permit.
- Require review for changes to workflows, deployment configuration, authentication, authorization, and secrets handling.
- Keep CI permissions minimal; use separate preview and production credentials.
- Production deployment must be an explicit, auditable release decision.
- Record commit SHA, workflow run, artifact identity, deployment ID, and target URL for each release.
- Do not infer branch protection from a draft PR or a successful CI run.

### SEC-15 — Privacy, logging, and data lifecycle

- Publish accurate privacy information before collecting personal data.
- Document categories of data, purpose, access, retention, deletion, and third-party processors.
- Avoid unnecessary analytics, tracking, and persistent identifiers.
- Restrict access to logs and define retention; redact sensitive values.
- Treat pre-launch notices as notices, not final legal policies.

### SEC-16 — Android and mobile application security

- Request only permissions needed for a documented feature.
- Review exported activities, services, receivers, providers, deep links, and intent handling.
- Store sensitive local data using platform-protected storage; do not hardcode credentials in the APK.
- Use HTTPS for network traffic and review backup/debug settings for sensitive applications.
- Inspect the packaged artifact and manifest, not only source code.
- Products without mobile builds may mark this N/A.

### SEC-17 — AI and agent security

- Treat user prompts, retrieved documents, webpages, tool outputs, and model responses as untrusted input.
- Enforce tool permissions outside the model; the model must not grant itself capabilities.
- Scope tools to specific resources and actions; default to read-only.
- Require explicit human approval before external writes, publishing, privileged repository operations, or production changes.
- Protect provider credentials server-side and apply quotas to costly model operations.
- Log tool decisions and outcomes with secret redaction.
- Test prompt-injection and cross-tenant data-exposure scenarios appropriate to the product.

## 5. Evidence record format

Each control record must include:

- Control ID and status.
- Repository and branch.
- Exact commit SHA or deployed release identifier.
- Target environment and URL, where applicable.
- Test/review method and tool/version.
- Timestamp (UTC).
- Result and concise evidence reference.
- Reviewer or responsible owner.
- Finding severity and remediation issue/PR, if applicable.
- For N/A: rationale and proof of non-applicability.

Evidence must be reproducible and must not contain secrets or unnecessary personal data. Keep screenshots and raw logs access-controlled; publish sanitized summaries.

## 6. Severity and release gates

- **Critical:** confirmed credential exposure, unauthorized privileged access, cross-tenant data access, or comparable direct compromise. Stop release; contain and remediate before further deployment.
- **High:** material security weakness with a credible exploitation path. Release blocked until fixed or explicitly risk-accepted by an authorized human with a time-bound mitigation plan.
- **Medium:** meaningful weakness requiring tracked remediation. Release decision must record the risk and owner.
- **Low:** limited impact or defense-in-depth improvement. Track and review.
- **Informational:** observation with no demonstrated vulnerability.

A product may be labelled **Security Reviewed** only when all applicable mandatory controls have evidence, critical/high findings are resolved, and residual risks are explicitly accepted. **Security Reviewed** is not a guarantee of security or a formal certification.

The parent website must not be labelled **Security PASS** until its deployed headers, transport, public-file boundary, branch/release controls, dependency posture, and mobile/browser behavior have been independently checked.

## 7. Portfolio adoption

Every RETRO product repository must maintain:
1. A product-specific applicability matrix referencing these control IDs.
2. A current evidence register.
3. A remediation list with severity, owner, and target milestone.
4. A release security summary tied to a commit and deployment.
5. A record of explicit risk acceptances.

Products may add stricter controls. They may not weaken the company baseline without a documented, approved exception.

## 8. Initial parent-website status

The first website-specific evidence snapshot is maintained in [WEBSITE-EVIDENCE-REGISTER.md](WEBSITE-EVIDENCE-REGISTER.md). That register records observations and gaps; it does not confer PASS status.

## 9. Change control

Changes to this standard require a reviewed pull request, version update, rationale, and approval by the RETRO Technologies owner. Changes to product code, Cloudflare configuration, DNS, credentials, branch protection, or production deployment are separate actions and are not authorized by this document.
