# RETRO Technologies

**Technology Without Boundaries.**

RETRO Technologies is a discovery portal for independent products with different purposes, repositories, development paths, and deployments. The portal connects the portfolio without combining products into one application.

## Website contents

- `index.html` — responsive portal homepage, six division cards, static product catalogue, featured projects, company principles, technology categories, verified public update, and contact notice.
- `styles.css` — design tokens, responsive layouts, original CSS illustration, keyboard focus styles, and reduced-motion support.
- `script.js` — progressive enhancement for search, division/status filters, alphabetical sort, mobile navigation, and the legacy detail URL redirect.
- `products/<slug>/index.html` — six individual product pages served at `/products/<slug>/`.
- `project.html` — backward-compatible redirect page for old `?project=` links.
- `privacy.html` and `terms.html` — transparent pre-launch notices; these are not final legal policies.
- `404.html` — branded missing-page fallback.
- `robots.txt` — crawler access policy. Add the sitemap URL after the canonical domain is confirmed.
- `sitemap.xml.template` — route list with an explicit origin placeholder; replace it with the approved domain before public launch.

The site uses plain HTML, CSS, and vanilla JavaScript. No framework, backend, database, analytics, cookies, contact form, or external service integration is required by this implementation.

## Product catalogue

| Division | Product | Portfolio classification | Development status |
|---|---|---|---|
| AI & Automation | NEXUS-AI | Independent | Not publicly verified |
| AI & Automation | RepoPilot AI | Independent | Not publicly verified |
| Entertainment | Pulse | Retained product | Not publicly verified |
| Gaming | Arcane Protocol | Independent | Not publicly verified |
| Engineering | AI Engineering OS | Independent | Not publicly verified |
| Integrations | Gemini GitHub Bridge | Independent | Not publicly verified |
| Applications | Offline / Online App | Concept | Not represented as released |

Pulse is one of the six independent portfolio projects. Online and offline listening belong to Pulse itself; there is no separate Offline / Online App product or catalogue entry. Offline capability must not be presented as released until verified in a distributable build. Repository links, product capabilities, technology stacks, previews, platform availability, and lifecycle claims should only be added when supported by verified public evidence.

## Local preview

From this directory, start any static HTTP server, for example:

```sh
python3 -m http.server 8000
```

Open `http://localhost:8000/`. The homepage catalogue is present in HTML and remains readable when JavaScript is disabled; search, filters, sort, and the collapsible mobile menu are progressive enhancements; without JavaScript, the mobile navigation links remain visible.

## Domain and launch readiness

The canonical domain, DNS ownership, hosting provider, and deployment configuration have not been verified or changed. The sitemap template intentionally contains `SITE_ORIGIN_REQUIRED`; replace the `SITE_ORIGIN_REQUIRED` marker with the approved hostname (without `https://`) before publishing it as `sitemap.xml`, then add the absolute sitemap URL to `robots.txt`. Do not configure DNS, hosting, or deployment until the exact domain and owner approval are confirmed.

Before a public launch, also publish final privacy and terms documents and verify the provider's logging, accessibility, security, mobile rendering, and product link behavior. Browser, Android-device, independent-source-review, merge, and deployment approval are separate release gates; they are not claimed as completed by source changes alone.

## Source repository

https://github.com/axdakkuu08-create/retro-technologies
