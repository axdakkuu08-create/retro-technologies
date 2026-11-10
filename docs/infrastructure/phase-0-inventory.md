# RETRO Infrastructure — Phase 0 Inventory

**Inventory date:** 2026-11-10  
**Status:** Partial read-only inventory; not a deployment approval  
**Target:** $0/month  
**Scope:** RETRO Technologies and its six currently listed products

## Guardrails

- This inventory is read-only.
- No Cloudflare resources were created, modified, or deleted.
- No GitHub source files, branches, or releases were changed as part of the inspection.
- No DNS, hosting, or production deployment changes are authorized by this document.
- Protected `main` branches remain untouched.

## Cloudflare account inventory

The connected Cloudflare account was accessible for read-only inspection.

| Resource | Observed state | Evidence / limitation |
|---|---|---|
| Pages projects | 0 listed | Account Pages project listing returned an empty result |
| Workers | 1 listed | `pulse-discovery-gateway` |
| D1 databases | 0 listed | D1 database listing returned an empty result |
| R2 buckets | Not inspectable / not enabled | API returned error 10042: enable R2 through the dashboard |
| DNS zones | 0 listed | Zone listing returned an empty result |
| Worker subdomain | Enabled for existing Worker | API reports enabled and previews enabled; exact hostname was not returned |
| Worker deployments | 3 deployment records | Latest listed deployment routes 100% to one version; this does not establish functional correctness or public reachability |

### Existing Pulse Worker

The existing Worker is named `pulse-discovery-gateway`. Its metadata reports a fetch handler and named helpers related to track normalization, deduplication, Internet Archive search, and iTunes search.

This suggests an existing Pulse discovery backend component that should be assessed and reused if appropriate. The inspection did not read or expose secret values, change bindings, or alter deployments. A live end-to-end health and playback test remains outstanding.

## GitHub repository inventory

The six product repositories are separate from the RETRO website repository.

| RETRO product | Repository | Default branch | Initial observation |
|---|---|---|---|
| RETRO website | `axdakkuu08-create/retro-technologies` | `main` | Website source is on `feat/retro-website-v1`; README says domain, DNS, hosting and deployment are not verified |
| Pulse | `axdakkuu08-create/convex-backend-.001` | `main` | Root README describes the Convex backend project, not the Pulse product. The attempted app package path was not found on the inspected ref; further branch/path inspection is required |
| NEXUS-AI | `axdakkuu08-create/NEXUS-AI-PUBLIC` | `main` | Public frontend/documentation workspace; root README is minimal. Several development branches exist; root package.json was not found |
| RepoPilot AI | `axdakkuu08-create/RepoPilot-AI` | `main` | README describes a mobile-first GitHub engineering platform; root package.json was not found |
| AI Engineering OS | `axdakkuu08-create/Ai-enginering.os` | `main` | Root README is minimal; root package.json was not found |
| Arcane Protocol | `axdakkuu08-create/Arcane` | `main` | Godot project. `project.godot` configures a 1280×720 landscape project and GL Compatibility renderer for desktop/mobile |
| Gemini GitHub Bridge | `axdakkuu08-create/gemini-github-mcp-bridge` | `main` | README describes a Vercel-oriented TypeScript scaffold and explicitly says it is not production-ready; root package scripts include typecheck, test and build |

### GitHub branch observations

- RETRO website has `feat/retro-website-v1`.
- Pulse has multiple product-specific branches, including a Cloudflare discovery gateway branch.
- NEXUS-AI has M1–M3 verification and backend foundation branches.
- RepoPilot AI has foundation and GitHub App authentication branches.
- Arcane has Android, mobile polish, navigation and Outpost Zero branches.
- Gemini GitHub Bridge has OAuth, session storage, MCP transport and Render migration branches.
- AI Engineering OS has GitHub App authentication and projects registry branches.

Branch existence alone does not establish that a branch is current, tested, deployed, or releasable.

## Initial architecture implications

1. Do not create six new Pages projects until the correct source branch, build root, output directory and hosting requirements have been verified for each product.
2. Preserve the existing `pulse-discovery-gateway`; assess its source, bindings, routes, quotas and health before making any changes.
3. Do not create D1 databases until a product's actual schema and ownership boundaries are documented.
4. R2 must first be enabled and its current pricing/quotas reviewed. No bucket should be created yet.
5. No custom domain or DNS zone is currently visible in the connected Cloudflare account. Continue with provider subdomains only after each deployment is explicitly approved.
6. The bridge README identifies Vercel as its existing intended hosting path. A Cloudflare migration requires a separate compatibility and security assessment.
7. Arcane's Godot game build distribution is a separate concern from hosting its product website.

## Outstanding Phase 0 work

- Inspect the exact active feature branches and source roots for all six products.
- Confirm current deployment providers and URLs from repository configuration and deployment evidence.
- Inspect the Pulse gateway source branch and compare it with the existing deployed Worker version.
- Identify existing authentication, database and storage dependencies in each application.
- Confirm account-level billing settings and current free-tier eligibility before provisioning anything.
- Build a per-product hosting compatibility matrix and record required verification tests.

## Phase 0 exit decision

**Phase 0 is not complete.** The connected Cloudflare account inventory and initial GitHub repository/branch inventory are recorded, but source-root, deployment, billing, and per-product dependency verification remain outstanding.

**Next permitted work:** continue read-only repository and deployment inventory. Do not provision D1/R2, create Pages projects, alter Workers, change DNS, migrate hosting, merge, or deploy without a separate explicit approval.
