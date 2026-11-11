# RETRO Infrastructure — Phase 0 Inventory

**Inventory date:** 2026-11-10  
**Status:** Partial read-only inventory; not a deployment approval  
**Target:** $0/month  
**Scope:** RETRO Technologies and its six currently listed products

## Guardrails

- This inventory is read-only.
- No Cloudflare resources were created, modified, or deleted.
- One documentation-only inventory file was added to `feat/retro-website-v1`; no application source files, protected branches, or releases were changed.
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


## Read-only source and deployment audit — 2026-11-10

This section extends the initial inventory using exact branch refs, source manifests, GitHub Actions runs, Vercel project metadata and Cloudflare Worker metadata. It does not authorize any product release.

### RETRO website source

- Feature branch `feat/retro-website-v1` is at `4601c5d3836ba834819f85f94a45917f6b7462dc` and contains 26 paths.
- The feature branch README describes a static HTML/CSS/vanilla-JavaScript portal with six separate product pages and no application backend, database, analytics, or external service integration.
- The default `main` branch tree is materially older and contains only four root-level files, including `index (1).html` and the website ZIP. The six-page website is therefore not present on the default branch as inspected.
- No Vercel project is linked to the RETRO website repository in the connected Vercel team. No Cloudflare Pages project is present in the Cloudflare account inventory.
- The feature branch README still correctly marks the canonical domain, DNS ownership, hosting and deployment as unverified.

**Decision:** keep the website on its feature branch. Do not merge merely to make the default GitHub page look current. A hosting project and a public launch remain separate approval gates.

### Vercel project and deployment audit

The connected Vercel Hobby team has three Git-linked projects:

| Product / project | Repository | Latest observed deployment | Deployment interpretation |
|---|---|---|---|
| RepoPilot AI / `repopilot-ai` | `RepoPilot-AI` | READY preview from `feat/dashboard-glassmorphism-preview` | Not a production-target deployment |
| Pulse / `convex-backend-.001-apps` | `convex-backend-.001` | READY preview from `feature/pulse-android-capacitor` | Not a production-target deployment |
| Gemini Bridge / `gemini-github-mcp-bridge` | `gemini-github-mcp-bridge` | READY preview from `feat/issue-7-db-docs-and-schema-design` | Not a production-target deployment |

Additional observed project metadata:

- All three projects report `live: false`.
- SSO protection is enabled for all three projects; do not assume their preview URLs are publicly accessible to unauthenticated consumers.
- Their listed domains are provider `.vercel.app` hostnames. No RETRO-owned custom domain was observed.
- The Vercel project detail response did not expose enough build-root configuration to verify each monorepo root directory.
- A READY preview means that Vercel marked that deployment ready; it does not prove public accessibility, full feature correctness, or production release.

#### Product-specific deployment notes

**Pulse**
- Vercel's latest observed preview is associated with commit `b03f3f477c7f5dddc9ea0f3d417019dee6fd2fa2` on `feature/pulse-android-capacitor`.
- The app package is at `apps/pulse-music-workspace`, with Capacitor 8.5.0 and app ID `com.pulse.music`.
- The separate Cloudflare Worker source is at `cloudflare/pulse-discovery-gateway`; its Wrangler config names the already-existing Worker and binds a KV namespace.
- The gateway's GitHub Actions test run passed on exact source commit `97453f2439564c790a7797a056dfe643851e8130`.
- The Vercel status check for that gateway commit failed with an account build-rate-limit / upgrade prompt. This is a Vercel account/build-capacity blocker, not evidence that the Worker tests failed.
- The Pulse Android workflow run on the Android branch failed at the public cloud configuration validation step. The log reports `PULSE_CONVEX_URL` was empty and requires the exact public HTTPS Convex deployment URL. Android project generation, Gradle build and APK upload were skipped. The log also showed the publishable-key variable empty; the workflow stopped at the URL validation first.
- Pulse workspace checks passed, including syntax, discovery/playlist modules, Internet Archive provider syntax, provider URL tests and required UI-element checks.
- The formatting workflow failed because two files were not formatted: `apps/pulse-music-workspace/media3-bridge.js` and `apps/pulse-music-workspace/scripts/install-native-android.mjs`.
- The Cloudflare account lists three deployment records for `pulse-discovery-gateway`, with the latest deployment routing 100% to one version. This does not prove that the currently inspected Git branch is byte-for-byte identical to the deployed Worker or that the public endpoints pass live tests.

**Decision:** retain the existing Worker and Vercel project. No Worker edit, secret update, redeploy, or migration is warranted by this audit.

**NEXUS-AI**
- The inspected branch `ci/verify-m1-m3` contains the verification workflow, `VERIFICATION-M1-M3.md`, README and `NEXUS-AI-frontend-M1.zip`; it does not contain an unpacked application source tree at the branch root.
- The workflow extracts the ZIP into `frontend/nexus-m1-review`, applies documented CI-only source fixes, then runs lint, TypeScript, production build, route checks and Playwright mobile viewport checks.
- Run 41321365706 passed those web checks on exact branch HEAD `c77bbbc7e56f8f802c5fed13ec637303645e61b6`.
- The same run's Android job completed with success as a job, but its wrapper check found no Capacitor configuration. Java/Node/Android setup, APK build and artifact upload were all skipped. No APK was produced by that run.
- No Vercel project linked to NEXUS-AI was found in the connected team.

**Decision:** web verification evidence is positive for the ZIP candidate at that commit; Android packaging and device validation remain open. No deployment target was found.

**RepoPilot AI**
- The inspected branch `feat/github-app-auth-m1` is a Next.js application with root `package.json` and `next.config.ts`.
- Run 41986467899 passed dependency installation, ESLint, TypeScript, tests and production build on exact branch HEAD `89d942b6ab373ab52b08a2276c8b23cfc88bc04d`.
- The latest Vercel preview is from `feat/dashboard-glassmorphism-preview`, not the M1 authentication branch. A separate READY preview for the M1 branch also exists.
- The repository README states that GitHub App credentials and live OAuth have not been configured or tested. M1 validation remains a distinct acceptance gate despite the CI pass.

**Decision:** Vercel is an existing preview host, but public consumer release and live GitHub App authentication are not verified.

**AI Engineering OS**
- The inspected branch `feat/projects-registry` is at `8d7adef77f20702655508cfa46ce26ac051e8655`.
- Run 42739186521 passed locked dependency installation, Permission Engine tests and strict TypeScript checking on that exact HEAD.
- The branch README's status paragraph still cites a previous audit HEAD `e9b350263590eb4704e98bd4ac5c15a0944fe166`, so that specific documentation snapshot is stale relative to the current branch ref.
- No Vercel project linked to AI Engineering OS was found.
- The README continues to mark trusted actor identity, durable tamper-evident audit, platform-enforced worker isolation, artifact provenance and later delivery gates as incomplete or unverified.

**Decision:** current Permission Engine Milestone 1 CI is positive evidence, not proof that the full OS is production-ready. Keep the project on its existing feature branch and preserve its approval gates.

**Arcane Protocol**
- The inspected branch `security/full-stack-hardening` is at `7129b4808820ce648574214515184478987ebf0b`.
- `project.godot` configures a 1280×720 landscape project and GL Compatibility rendering for mobile.
- Godot project import/gameplay smoke checks passed, and the Godot 4.7.2 Android workflow successfully exported and uploaded a debug APK on that exact commit.
- The CI evidence does not establish installation and full control/playability on the user's physical Android device.
- No Vercel project linked to Arcane was found. The game build is a separate distributable from any future RETRO product website.

**Decision:** Android debug build generation is verified in CI; physical-device acceptance and public release remain separate gates.

**Gemini GitHub Bridge**
- The inspected branch `feat/phase3-render-migrations` is at `e2ed22c40f0b30260d93aefa394849d319d6266f`.
- Run 42782150225 passed dependency installation, production dependency audit, typecheck, migration tests against disposable PostgreSQL 18, migration application and verification with a separate read-only database role.
- The Vercel project exists and has READY preview deployments, including a preview on the inspected Phase 3 branch. Project metadata reports `live: false` and SSO protection enabled.
- The branch includes `vercel.json` for a static `public` output and API functions, but the repository README describes the intended Auth0 + Render Node.js server architecture. These are different hosting/runtime paths and should not be treated as a verified production migration.
- The README and SECURITY.md continue to state that GitHub account-linking lifecycle, durable encrypted GitHub-token storage, complete OAuth 2.1 authorization server behavior, MCP Streamable HTTP transport and host compatibility are not complete.
- Render has one workspace named `Nitin's workspace`. The Render connector requires the user to explicitly select a workspace before listing its services; the service inventory is therefore still pending.

**Decision:** current CI and migration tests are positive; production readiness and Render service/deployment state remain unverified. Do not connect real GitHub accounts or migrate hosting based on the preview deployment alone.

### Current hosting compatibility matrix

| Product | Source / app shape | Existing hosting evidence | Current blocker / next verification |
|---|---|---|---|
| RETRO website | Static HTML/CSS/JS | No Pages or Vercel project found | Feature branch differs from main; choose hosting only after branch/source review and explicit deployment approval |
| Pulse | Web + Capacitor Android; Convex backend; separate Cloudflare discovery Worker | Vercel preview and existing Cloudflare Worker | Missing Android public cloud URL in CI; formatting failure; compare deployed Worker version to source; test live search and playback |
| NEXUS-AI | Next.js source packaged as ZIP in verification branch | CI web verification only; no linked Vercel project | Unpacked source and Capacitor wrapper absent from repository branch; no APK or device acceptance |
| RepoPilot AI | Next.js / React / TypeScript | Vercel previews | M1 live OAuth credentials and independent authentication validation remain pending |
| AI Engineering OS | TypeScript core / Vitest / strict TypeScript | GitHub Actions CI only | Identity, durable audit, worker isolation and provenance gates remain incomplete; no hosting project found |
| Arcane Protocol | Godot 4.7.2 Android game | GitHub Actions Android debug APK artifact | Physical Android device acceptance; website hosting is a separate decision |
| Gemini GitHub Bridge | Node.js / TypeScript / Express / PostgreSQL / MCP | Vercel preview; Render workspace exists but services not inspected | Choose Render workspace for read-only service inventory; resolve Vercel-vs-Render architecture before any migration |

### Updated Phase 0 exit decision

**Phase 0 remains INCOMPLETE, but source and CI discovery is substantially advanced.**

Verified in this audit:
- Active feature branch HEADs for all six products and the RETRO website.
- Product source roots and primary runtime/configuration files where available.
- Existing Vercel project connections and recent deployment states for three repositories.
- GitHub Actions outcomes and job-level steps for current feature-branch commits.
- Cloudflare account inventory and the existence of the Pulse discovery Worker.

Still outstanding:
- Render service inventory, pending explicit workspace selection.
- Exact Vercel monorepo root/build/output settings and public accessibility checks.
- Exact Cloudflare deployed Worker version/source comparison and live endpoint checks.
- Product-by-product database, authentication, storage and environment-variable dependency matrix.
- Account billing and free-tier eligibility verification.
- Browser/device testing and independent release acceptance.

**No product source code was changed. No Cloudflare resource, Worker, DNS record, database, bucket, or hosting project was created or modified. No migration, merge, or deployment was performed. Existing preview deployments and CI runs listed above were already present and were only inspected. Protected `main` branches remain untouched.**

**Next permitted work:** continue read-only deployment inspection after the user selects the Render workspace. Keep all provisioning, source changes, merges, DNS changes, migrations and production deployments behind separate explicit approval.
