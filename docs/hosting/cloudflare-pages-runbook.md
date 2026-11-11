# RETRO Technologies — Cloudflare Pages Hosting Runbook

**Status:** GitHub source connected; feature-branch previews deployed; production deployment not successful  \
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
| GitHub source connection | Connected to `axdakkuu08-create/retro-technologies` |
| Production deployments | Enabled in current source configuration |
| Preview deployments | All branches (`*`) |
| Custom domain / DNS | Not configured |
| Latest deployment | Successful preview from `feat/retro-website-v1` |
| Canonical production deployment | None |
| Deployment history | Successful feature previews, one failed ad-hoc production build, and skipped documentation-only events |

The project now has a successful preview at [the branch preview URL](https://feat-retro-website-v1.retro-technologies.pages.dev). The project-level `.pages.dev` hostname is reserved, and the feature-branch alias is available for preview. The production branch field remains `main`; no successful production deployment exists.

## 3. Prepared build configuration

The build script uses Node.js built-in modules only and copies an explicit allowlist of 14 public files: eight root-level website files and six product pages. It does not copy internal documentation, repository metadata, the sitemap template, or other planning files.

The source build was independently checked by GitHub Actions run [#42812468471](https://github.com/axdakkuu08-create/retro-technologies/actions/runs/42812468471), which completed successfully on the website feature branch. That CI result validates the repository build and output-boundary checks; it does not validate Cloudflare Git integration or prove a deployed site works.

## 4. GitHub source connection — connected; initial error history retained

The Cloudflare Pages GitHub source-connection API request initially failed twice with HTTP 401 and Cloudflare error `8000011`:

> There is an internal issue with your Cloudflare Pages Git installation.

The GitHub repository was verified as `axdakkuu08-create/retro-technologies` (repository ID `1452432620`; owner ID `339498127`).

The GitHub **Cloudflare Workers and Pages** App is installed on the `axdakkuu08-create` account. The supplied GitHub settings screenshot shows:
- The app is installed for the `Retro (axdakkuu08-create)` account.
- Repository access is set to **All repositories**.
- The app has metadata read access and administration, checks, code, deployments, and pull requests read/write access.

Subsequent Cloudflare API reads now show the Pages project source as connected to the repository. GitHub push-triggered preview deployments from `feat/retro-website-v1` completed successfully. Their logs confirm repository cloning, execution of `node scripts/prepare-public-site.mjs`, preparation of 14 allowlisted files, and publication of those files.

A separate ad-hoc production deployment attempted against `main` SHA `f964f960cd2a7b87caba4c76fc3b0c5666224a44` failed during build because that older revision does not contain `scripts/prepare-public-site.mjs`. It did not reach the deploy stage. The `main` branch itself was not modified.

### Current diagnostic conclusion

The initial Git integration error appears to have cleared or been superseded by a successful connection; the exact mechanism is not established. The project now reports:
- GitHub source connected.
- Automatic deployments enabled.
- Preview deployment setting `all`, with branch include pattern `*`.
- Production deployments enabled in project configuration.
- Production branch `main`.
- No canonical production deployment.

Cloudflare's official [Pages troubleshooting guide](https://developers.cloudflare.com/pages/configuration/git-integration/troubleshooting/) classifies error `8000011` as an internal Pages SCM error. Its [GitHub integration guide](https://developers.cloudflare.com/pages/configuration/git-integration/github-integration/) describes reinstalling the GitHub App as one recovery step, but no uninstall, suspension, or permission change has been performed.

A read-only review of Cloudflare's published API schema found a Pages source-connect operation, but no documented read endpoint for inspecting the account's Git installation handshake. The project source and deployment state are visible through the API; deeper installation diagnostics require the Cloudflare dashboard or Cloudflare support.

### Safe troubleshooting sequence

1. Keep the existing GitHub App installation intact while investigating; do not uninstall or suspend it as the first response.
2. Re-check Cloudflare's Git integration/account connection from the Cloudflare dashboard using the already authorized account.
3. If Cloudflare presents an explicit reconnect or re-authorize flow, inspect the scope and account shown before proceeding. Do not change repository access settings without separate approval.
4. If the same error persists, collect the exact error, timestamp, and Ray ID and use Cloudflare support / the official troubleshooting path.
5. Since the source now connects and preview deployments have succeeded, do not repeat the earlier connect request or create a second Pages project.
6. Keep the GitHub App installed; no uninstall/reinstall is currently indicated by the successful clone/build/deploy evidence.
7. The current project configuration has automatic preview and production deployments enabled. Pause and obtain explicit authorization before changing these settings; do not treat this runbook as permission to alter them.

No app uninstall, suspension, permission change, repository access change, or deployment has been performed.

## 5. Branch and release policy

- Keep repository `main` untouched until a separately approved review and merge.
- Current website source work is on `feat/retro-website-v1`.
- The Pages project's current production-branch field reads `main`, but production deployment is disabled and GitHub is not connected.
- The current configuration enables automatic deployments for all preview branches and enables production deployments on `main`; these settings were observed, not changed in this work.
- Do not change deployment settings without separate explicit approval.
- The feature-branch preview is live at the alias recorded above; it is not the canonical public company domain.
- Do not connect a custom domain or change DNS during initial validation.
- A successful production deployment and public launch require separate explicit approval.

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
- Changing preview/production deployment settings or changing the production branch.
- Publishing a public deployment.
- Registering or connecting a parent domain.
- Creating or changing DNS records.
- Migrating any existing product website or service.

The user has authorized creation of the Pages project and investigation of its GitHub connection. That authorization does not extend to deployment, DNS, app uninstall/reinstall, or changes to other product infrastructure.
