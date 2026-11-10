# RETRO Technologies — Cloudflare Pages Hosting Runbook

**Status:** Prepared / Not provisioned  
**Repository:** `axdakkuu08-create/retro-technologies`  
**Working branch:** `feat/retro-website-v1`  
**Hosting target:** RETRO company website only  
**Deployment status:** Not deployed

## 1. Project boundary

This hosting project is for the RETRO Technologies portfolio website only. It must not combine or replace any of the six independent product applications.

Pulse remains a separate product and repository. Its existing `pulse-discovery-gateway` Worker is not part of this website deployment and must not be edited, renamed, rebound, or redeployed as part of RETRO website hosting.

## 2. Prepared build configuration

| Cloudflare Pages setting | Prepared value |
|---|---|
| Framework preset | None |
| Repository | `axdakkuu08-create/retro-technologies` |
| Root directory | `/` |
| Build command | `node scripts/prepare-public-site.mjs` |
| Build output directory | `dist` |
| Node.js | 22 |
| Environment variables | None required by the static site |

The build script uses Node.js built-in modules only and copies an explicit allowlist of 14 public files: eight root-level website files and six product pages. It does not copy internal documentation, repository metadata, the sitemap template, or other planning files.

## 3. Branch and release policy

- Keep the repository's `main` branch untouched until a separately approved review and merge.
- Use `feat/retro-website-v1` for current source work.
- When Cloudflare Pages is eventually connected, first verify branch-preview behavior and the generated preview URL.
- Do not treat a preview URL as the canonical public company domain.
- Do not connect a custom domain or change DNS during initial preview validation.
- No production deployment is authorized by this runbook.

## 4. Pre-publication checks

Before any public launch:

1. Confirm the public output contains exactly the allowlisted files and excludes `docs/`, including infrastructure inventory documents.
2. Verify all six product pages and internal links.
3. Test the homepage and product pages on desktop and Android mobile browsers.
4. Check keyboard navigation, focus visibility, contrast, reduced-motion behavior, and responsive layout.
5. Replace the sitemap placeholder only after the canonical domain is selected and verified.
6. Add the sitemap URL to `robots.txt` only after publishing the finalized sitemap.
7. Replace the privacy and terms pre-launch notices with final, reviewed documents.
8. Review Cloudflare logging, caching, security settings, and any analytics choices before launch.

## 5. Account boundary

The Cloudflare account inventory at the time of preparation showed no Pages projects and no DNS zones. One existing Worker, `pulse-discovery-gateway`, belongs to Pulse and is outside this setup.

No Cloudflare Pages project, Worker, D1 database, R2 bucket, DNS zone, custom domain, billing change, or deployment has been created by this preparation.

## 6. Approval gates

Separate explicit approval is required before:

- Creating the Cloudflare Pages project or connecting GitHub.
- Selecting a production branch or enabling automatic production deployment.
- Publishing a public deployment.
- Registering or connecting a parent domain.
- Creating or changing DNS records.
- Migrating any existing product website or service.

The future RETRO parent domain and product subdomains remain proposals until domain ownership and DNS are confirmed.
