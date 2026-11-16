# RETRO Technologies Website — Security Evidence Register

**Document ID:** RETRO-SEC-EVID-001  
**Version:** 1.0  
**Status:** Initial evidence snapshot — not a security certification  
**Review date:** 16 November 2026  
**Repository:** `axdakkuu08-create/retro-technologies`  
**Reviewed branch:** `feat/retro-website-v1`  
**Reviewed commit:** `d677e853a2ae471c204cccaa4ef5de187b411f87`  
**Default branch:** `main` at `f964f960cd2a7b87caba4c76fc3b0c5666224a44`

## 1. Scope and method

This snapshot combines read-only GitHub repository inspection, source-file inspection, branch metadata, and read-only Cloudflare Pages project/deployment API inspection.

It does not include a successful direct HTTP header capture, authenticated browser session, Android device test, external penetration test, complete Git-history secret scan, or independent third-party assessment. Those checks remain NOT VERIFIED.

Do not treat absence of a search result as proof that a secret or vulnerability does not exist.

## 2. Repository and hosting facts

| Item | Observed value | Evidence / interpretation |
|---|---|---|
| Repository visibility | Public | GitHub repository metadata |
| Default branch | `main` | GitHub repository metadata |
| Website implementation branch | `feat/retro-website-v1` | Branch inventory |
| Website feature commit | `d677e853a2ae471c204cccaa4ef5de187b411f87` | Git tree response |
| Main commit | `f964f960cd2a7b87caba4c76fc3b0c5666224a44` | Branch inventory |
| Existing website PR | PR #1, target `main` | GitHub PR search |
| Branch protection | Not enabled on `main` or `feat/retro-website-v1` | GitHub branch metadata reports `protected: false` |
| Website framework | Static HTML, CSS, vanilla JS | Repository README and source tree |
| Backend/database/forms | None described in the current website architecture | README; confirm again before adding features |
| Public build | Explicit allowlist of 14 files | `scripts/prepare-public-site.mjs` |
| CI workflow permissions | `contents: read` | `.github/workflows/retro-site-build.yml` |
| CI action references | `actions/checkout@v4`, `actions/setup-node@v4`, not immutable commit pins | Workflow source review |
| CI verification | Build plus file-count and exclusion checks | Workflow source; prior recorded run #42812468471 succeeded |
| Pages project | `retro-technologies` | Cloudflare Pages API |
| Production branch configured | `main` | Cloudflare Pages API |
| Preview branch setting | All branches (`*`) | Cloudflare Pages API |
| Production deployments setting | Enabled | Cloudflare Pages API |
| Custom domains | None | Cloudflare Pages API |
| Canonical production deployment | None | Cloudflare Pages API |
| Latest deployment record | Preview record for feature branch; current stage is queued/idle and marked skipped for a documentation commit | Cloudflare Pages API |
| Prior successful preview | A preview deployment from 11 November 2026 completed successfully | Cloudflare deployment history |
| Prior production attempt | Build failed on old `main` revision because it lacked the configured build script; it did not reach deploy | Cloudflare deployment history |
| Direct live header capture | Not obtained | Web retrieval attempt could not access preview URL |

**Important configuration finding:** Cloudflare currently reports automatic deployments enabled, preview deployments for all branches, and production deployments enabled. The canonical production deployment is null and there are no custom domains. This is configuration evidence, not evidence that a production site is live. The latest deployment record is a skipped/idle preview event, not a fresh successful deployment.

## 3. Control status

Statuses are limited to what the evidence above supports.

| Control | Status | Current evidence / next verification |
|---|---|---|
| SEC-01 Security headers and transport | NOT VERIFIED | No `_headers` file appears in the reviewed feature-branch tree; actual deployed response headers and TLS behavior still need direct capture. |
| SEC-02 Authentication and sessions | N/A (current scope) | Current site is described as a static portfolio with no accounts or protected API. Reassess if account features are introduced. |
| SEC-03 Secrets and environment configuration | NOT VERIFIED | No API-key search matches were returned in an earlier source search. This is not a full secret/history scan; inspect full history and generated output. |
| SEC-04 Authorization and least privilege | IN PROGRESS | Static site has no user roles. GitHub workflow uses `contents: read`; both inspected branches are unprotected. |
| SEC-05 Database and data isolation | N/A (current scope) | README describes no database or backend. Reassess if a dynamic service is added. |
| SEC-06 XSS and output handling | NOT VERIFIED | JavaScript source review and deployed behavior tests are incomplete. |
| SEC-07 Input validation and forms | N/A (current scope) | README describes no contact form or user-input endpoint. Reassess if input functionality is added. |
| SEC-08 Rate limiting and abuse controls | N/A (application scope) | No dynamic application endpoints are described. Hosting/CDN abuse controls remain unverified. |
| SEC-09 Dependency and supply-chain security | IN PROGRESS | Build script uses Node.js built-ins; workflow has read-only contents permission. Workflow actions use major-version tags; immutable pinning and complete supply-chain review remain open. |
| SEC-10 Password storage | N/A (current scope) | No local password system is described. |
| SEC-11 Debugging and error handling | NOT VERIFIED | Production response behavior and hosting diagnostics have not been tested. |
| SEC-12 Administrative routes | N/A (current scope) | No site admin routes are described. GitHub/Cloudflare administrative access is a separate account-security review. |
| SEC-13 Public files and build boundary | IN PROGRESS | Allowlist copies 14 intended public files and excludes internal docs by design; actual deployed negative-path tests and artifact inspection remain pending. |
| SEC-14 CI/CD and release integrity | FAIL (release governance gap) | Branch metadata reports both `main` and feature branch unprotected; Cloudflare allows all preview branches and has production deployments enabled. No canonical production deployment exists. |
| SEC-15 Privacy and data lifecycle | IN PROGRESS | Privacy and terms pages are explicitly pre-launch notices, not final policies. No user-data collection is described. |
| SEC-16 Android/mobile security | NOT VERIFIED | No browser/device test has been recorded for this website. |
| SEC-17 AI and agent security | N/A (current scope) | The parent website is a static portfolio and does not execute AI agents or model tools. |

## 4. Confirmed strengths

1. The website uses a small static technology stack and currently has no described backend or database.
2. The public build is generated from an explicit 14-file allowlist.
3. The build script excludes internal documentation, repository metadata, and the sitemap template.
4. The GitHub Actions workflow declares `permissions: contents: read`.
5. The workflow checks expected files, six product pages, total file count, and exclusion of `docs/`, `README.md`, and `.git`.
6. The Cloudflare Pages project is connected to the expected GitHub repository.
7. A prior feature-branch preview completed successfully, but that does not establish current deployment health or security.

## 5. Findings and required follow-up

### F-01 — Branch protection absent

**Severity:** High (release-governance risk)  
**Evidence:** GitHub branch inventory reports `protected: false` for `main` and `feat/retro-website-v1`.  
**Required:** Propose branch protection/rulesets for `main`: pull request review, required successful CI checks, restricted direct pushes, and protection against force pushes/deletion. Verify available account/repository plan capabilities before configuration.  
**Status:** Open. No settings changed.

### F-02 — Cloudflare deployment scope is broad

**Severity:** Medium (deployment-control risk)  
**Evidence:** Cloudflare API reports preview deployments for all branches, production deployments enabled, and production branch `main`.  
**Required:** Review whether all-branch previews are necessary; establish explicit preview/production release policy and verify that only approved changes can reach production. Do not alter settings without separate authorization.  
**Status:** Open. No settings changed.

### F-03 — Security headers are not evidenced

**Severity:** High (unverified web hardening)  
**Evidence:** No `_headers` file appears in the reviewed feature-branch tree; direct response-header capture was unavailable.  
**Required:** Define a site-specific header policy, add it through a reviewed change, then verify the actual preview response. Test CSP in report-only mode before enforcing a compatible policy.  
**Status:** Open. No header configuration added.

### F-04 — Public-output boundary is only partially verified

**Severity:** Medium  
**Evidence:** Source allowlist and CI negative checks exist, but no fresh deployed artifact/path audit was completed in this review.  
**Required:** Inspect the generated `dist/` file manifest and request representative private paths against the deployed preview. Confirm no source maps, hidden files, backups, or internal documents are served.  
**Status:** Open.

### F-05 — Privacy and terms are not final

**Severity:** Medium (launch-readiness gap)  
**Evidence:** README explicitly says `privacy.html` and `terms.html` are pre-launch notices, not final policies.  
**Required:** Finalize and review policies before collecting personal data or public launch.  
**Status:** Open.

### F-06 — Workflow actions are not pinned to immutable revisions

**Severity:** Low/Medium (supply-chain hardening)  
**Evidence:** Workflow references `actions/checkout@v4`, `actions/setup-node@v4`, and prior PR description references upload-artifact major tag.  
**Required:** Review action provenance and pin to verified immutable commit SHAs with update policy.  
**Status:** Open.

## 6. Required verification run

The next evidence pass should capture:

1. Actual HTTPS response and full response headers from the current preview hostname.
2. CSP compatibility and console violations on homepage and all six product pages.
3. Generated `dist/` manifest and negative requests for internal paths.
4. Source review of all DOM insertion and URL-handling sinks in `script.js` and page scripts.
5. Secret scan of current source, full Git history, and built output; record only sanitized findings.
6. Dependency and workflow action provenance review.
7. GitHub branch protection/ruleset configuration and required checks.
8. Cloudflare deployment configuration and exact successful deployment SHA/status.
9. Android Chrome and desktop browser rendering, navigation, accessibility, and error behavior.
10. Final privacy/terms review and confirmation of whether any personal data is collected.

## 7. Change log

- **16 November 2026 — v1.0:** Initial evidence snapshot created from read-only GitHub and Cloudflare API inspection. No website code, hosting configuration, DNS, credentials, or deployment settings were changed.
