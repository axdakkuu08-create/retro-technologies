# RETRO Technologies — Cloudflare Pages Hosting Runbook

**Status:** Pages project created; GitHub source connection blocked; no deployments  \
**Last verified:** 11 November 2026  \
**Repository:** `axdakkuu08-create/retro-technologies`  \
**Working branch:** `feat/retro-website-v1`  \
**Hosting target:** RETRO company website only  \
**Production deployment:** Disabled

## 1. Project boundary

This hosting project is for the RETRO Technologies portfolio website only. It must not combine or replace any of the six independent product applications.

Pulse remains a separate product and repository. Its existing `pulse-discovery-gateway` Worker is not part of this website deployment and must not be edited, renamed, rebound, or redeployed as part of RETRO website hosting.

## 2. Verified Cloudflare Pages project

A Pages project has been created in the connected Cloudflare account.

| Setting | Verified value |
|---|---|
| Project name | `retro-technologies` |
| Project ID | `44c8e03e-1008-42a1-8b6a-6fe634da6110` |
| Reserved Pages hostname | `retro-technologies.pages.dev` |
| Framework preset | None |
| Root directory | `/` |
| Build command | `node scripts/prepare-public-site.mjs` |
| Build output directory | `dist` |
| Node.js | 22 |
| Production branch field | `main` |
| GitHub source connection | Not connected |
| Production deployments | Disabled |
| Preview deployments | Disabled (`none`) |
| Custom domain / DNS | Not configured |
| Latest / canonical deployment | None |
| Deployment inventory | Empty (0 deployments) |

The `.pages.dev` hostname is reserved but currently has no deployed site behind it. The production branch field is project configuration only; it does not mean a deployment has occurred.

## 3. Prepared build configuration

The build script uses Node.js built-in modules only and copies an explicit allowlist of 14 public files: eight root-level website files and six product pages. It does not copy internal documentation, repository metadata, the sitemap template, or other planning files.

The source build was independently checked by GitHub Actions run [#42812468471](https://github.com/axdakkuu08-create/retro-technologies/actions/runs/42812468471), which completed successfully on the website feature branch. That CI result validates the repository build and output-boundary checks; it does not validate Cloudflare Git integration or prove a deployed site works.

## 4. GitHub source connection — blocked

The Cloudflare Pages GitHub source-connection API request failed twice with HTTP 401 and Cloudflare error `8000011`:

> There is an internal issue with your Cloudflare Pages Git installation.

The GitHub repository was verified as `axdakkuu08-create/retro-technologies` (repository ID `1452432620`; owner ID `339498127`).

The GitHub **Cloudflare Workers and Pages** App is installed on the `axdakkuu08-create` account. The supplied GitHub settings screenshot shows:
- The app is installed for the `Retro (axdakkuu08-create)` account.
- Repository access is set to **All repositories**.
- The app has metadata read access and administration, checks, code, deployments, and pull requests read/write access.

This confirms the repository is not excluded by the app's repository-selection setting. It does not prove that Cloudflare's Pages Git integration has a healthy authorization handshake or that this repository is linked to the Pages project.

### Diagnostic conclusion

The static build script and Cloudflare build settings show no obvious cause for error `8000011`. The failure currently points to the Cloudflare Pages Git integration / authorization layer. The Pages project itself is accessible through the Cloudflare API, but its source is not connected.

### Safe troubleshooting sequence

1. Keep the existing GitHub App installation intact while investigating; do not uninstall or suspend it as the first response.
2. Re-check Cloudflare's Git integration/account connection from the Cloudflare dashboard using the already authorized account.
3. If Cloudflare presents an explicit reconnect or re-authorize flow, inspect the scope and account shown before proceeding. Do not change repository access settings without separate approval.
4. If the same error persists, collect the exact error, timestamp, and Ray ID and use Cloudflare support / the official troubleshooting path.
5. Consider app uninstall/reinstall only as a later, separately confirmed recovery step. Uninstalling revokes Cloudflare access across the GitHub account's repositories and can interrupt other Cloudflare Git-connected projects.
6. Do not create a second Pages project as a workaround without a separate decision; the existing `retro-technologies` project is the intended target.

No app uninstall, suspension, permission change, repository access change, or deployment has been performed.

## 5. Branch and release policy

- Keep repository `main` untouched until a separately approved review and merge.
- Current website source work is on `feat/retro-website-v1`.
- The Pages project's current production-branch field reads `main`, but production deployment is disabled and GitHub is not connected.
- Do not enable production or preview deployments as part of connection troubleshooting.
- Once the Git integration is healthy, agree and verify the safe branch/preview configuration before enabling any build or deployment.
- Do not treat the reserved `.pages.dev` hostname as a live preview or canonical public company domain.
- Do not connect a custom domain or change DNS during initial validation.
- A public production deployment requires separate explicit approval.

## 6. Pre-publication checks

Before any public launch:

1. Confirm the public output contains exactly the allowlisted files and excludes `docs/`, including infrastructure inventory documents.
2. Verify all six product pages and internal links.
3. Test the homepage and product pages on desktop and Android mobile browsers.
4. Check keyboard navigation, focus visibility, contrast, reduced-motion behavior, and responsive layout.
5. Replace the sitemap placeholder only after the canonical domain is selected and verified.
6. Add the sitemap URL to `robots.txt` only after publishing the finalized sitemap.
7. Replace the privacy and terms pre-launch notices with final, reviewed documents.
8. Review Cloudflare logging, caching, security settings, and any analytics choices before launch.

## 7. Account boundary

The Cloudflare account inventory currently includes this one RETRO Pages project, one existing Worker named `pulse-discovery-gateway`, and no DNS zones. The Pulse Worker is outside this setup.

No D1 database, R2 bucket, DNS zone, custom domain, billing change, or deployment has been created for the RETRO website.

## 8. Approval gates

Separate explicit approval is required before:

- Uninstalling, suspending, or changing the GitHub App installation or its repository permissions.
- Enabling preview or production deployments or changing the production branch.
- Publishing a public deployment.
- Registering or connecting a parent domain.
- Creating or changing DNS records.
- Migrating any existing product website or service.

The user has authorized creation of the Pages project and investigation of its GitHub connection. That authorization does not extend to deployment, DNS, app uninstall/reinstall, or changes to other product infrastructure.
