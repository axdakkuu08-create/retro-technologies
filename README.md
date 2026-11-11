# RETRO Technologies

**Technology Without Boundaries.**

RETRO Technologies is a portfolio portal for six independent products. Each product keeps its own identity, repository, development path, platform support, and release cycle. The portal connects the portfolio without combining products into one application.

## Portfolio

| Division | Product | Portfolio classification |
|---|---|---|
| AI & Automation | NEXUS-AI | Independent |
| AI & Automation | RepoPilot AI | Independent |
| Engineering | AI Engineering OS | Independent |
| Gaming | Arcane Protocol | Independent |
| Entertainment | Pulse | Independent |
| Integrations | Gemini GitHub Bridge | Independent |

The portfolio currently spans five divisions and six products. Pulse is an independent music product; online and offline listening are part of Pulse's own product direction, not a separate portfolio product. Offline capability must not be represented as released until verified in a distributable build.

## Website source

- `index.html` — portfolio homepage and six-product catalogue.
- `styles.css` — responsive design system, page layouts, and motion/accessibility treatments.
- `script.js` — progressive enhancement for search, filters, sorting, mobile navigation, and legacy product links.
- `products/<slug>/index.html` — six independent product pages.
- `project.html` — compatibility page for older `?project=` links.
- `privacy.html` and `terms.html` — clearly labelled pre-launch notices; neither is a final legal policy.
- `404.html` — branded missing-page page.
- `robots.txt` — crawler policy. A sitemap URL is intentionally absent until the canonical domain is confirmed.
- `sitemap.xml.template` — sitemap template with a domain placeholder; do not publish it unchanged.
- `scripts/prepare-public-site.mjs` — creates the curated static-site output.

The site uses plain HTML, CSS, and vanilla JavaScript. It does not require a framework, backend, database, analytics, cookies, contact form, or external service integration.

## Public hosting output

The public build is intentionally allowlisted. The preparation script copies only the homepage, shared assets, six product pages, compatibility page, pre-launch information notices, 404 page, and crawler policy into `dist/`.

Internal documentation, infrastructure inventories, repository metadata, source templates, and other planning files are excluded.

### Cloudflare Pages project — current state (11 November 2026)

A Cloudflare Pages project has been created for the RETRO company website:

| Setting | Current state |
|---|---|
| Project | `retro-technologies` |
| Reserved Pages hostname | `retro-technologies.pages.dev` |
| Framework preset | None |
| Root directory | `/` |
| Build command | `node scripts/prepare-public-site.mjs` |
| Build output directory | `dist` |
| Node.js | 22 |
| Production branch field | `main` |
| GitHub source connection | Not connected |
| Production deployments | Disabled |
| Preview deployments | Disabled |
| Custom domain / DNS | Not configured |
| Deployments | None |

The `.pages.dev` hostname is reserved for the project, but it does not currently serve a deployed website. The project has no latest or canonical deployment.

The Cloudflare GitHub source-connection attempt currently fails with Cloudflare error `8000011` (internal Pages Git installation issue). The GitHub **Cloudflare Workers and Pages** App is installed on the `axdakkuu08-create` account and its installation settings show access to all repositories. The repository is therefore not currently excluded by the app's repository-selection setting. The remaining fault is under investigation; do not assume the app needs to be uninstalled or reinstalled.

The project was created without a GitHub source because the initial source-connection request failed. No repository deployment has occurred. The existing Pulse Worker is separate and unaffected.

The script uses Node.js built-in modules only; no package installation or framework build is needed. See [the hosting runbook](docs/hosting/cloudflare-pages-runbook.md) for verified settings, the connection failure, and release gates.

## Domain and launch readiness

The canonical domain, DNS ownership, and custom-domain configuration have not been verified or changed. The sitemap template intentionally contains `SITE_ORIGIN_REQUIRED`; replace it with the approved HTTPS origin before publishing it as `sitemap.xml`, then add the absolute sitemap URL to `robots.txt`.

Before a public launch, publish final privacy and terms documents and verify the hosting provider's logging practices, accessibility, security, mobile rendering, and all product links. Browser/device testing, independent review, merge, and deployment approval are separate release gates. Source preparation and a configured-but-empty Pages project do not establish that the site is ready for public launch.

## Product independence and release accuracy

Each product remains independently developed and maintained. A portfolio page does not establish that a product is live, available, in beta, or released. Repository links, capabilities, technology stacks, previews, platform availability, and lifecycle claims should only be added when supported by verified public evidence.

## Source repository

https://github.com/axdakkuu08-create/retro-technologies
