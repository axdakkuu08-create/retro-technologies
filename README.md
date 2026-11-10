# RETRO Technologies

**Technology Without Boundaries.**

RETRO Technologies is the parent portal for a collection of independent digital products. The portal provides discovery and navigation; it does not merge product codebases or imply that every product is production-ready.

## Product catalogue

| Division | Product | Purpose | Catalogue status |
|---|---|---|---|
| AI & Automation | NEXUS-AI | AI platform and agent orchestration | Status not yet verified |
| AI & Automation | RepoPilot AI | Repository intelligence and developer assistance | Status not yet verified |
| Entertainment | Pulse | Independent music discovery and streaming product | Status not yet verified; remains a separate product |
| Gaming | Arcane Protocol | Sci-fi first-person shooter project | Status not yet verified |
| Engineering | AI Engineering OS | AI-assisted engineering workspace | Status not yet verified |
| Integrations | Gemini GitHub Bridge | AI and GitHub workflow integration | Status not yet verified |
| Applications | Offline / Online App | New, separate product concept for offline capability with connected online features | Concept |

Pulse is not retired, deleted, or replaced. The Offline / Online App is a separate product and does not inherit Pulse's identity or repository.

## Parent portal and product boundaries

- The RETRO website is the central ecosystem landing page and catalogue.
- Each product retains its own identity, repository, roadmap, release process, and deployment boundary.
- Product detail pages are catalogue entries, not evidence that a live service or public release exists.
- Repository links, product capabilities, operational status, and release claims must be added only after verification.
- The parent portal is maintained independently from all product repositories.

## Proposed hosting and deployment architecture

This is a planning proposal, not an approved deployment configuration.

| Layer | Candidate approach | Boundary / decision |
|---|---|---|
| Parent portal | Static site on Cloudflare Pages or Vercel | Existing implementation is vanilla HTML, CSS, and JavaScript. Do not rewrite to React/Next.js without a demonstrated need. |
| Domain and DNS | Existing Pulse domain may be repurposed for the parent portal, as requested | Exact domain and DNS ownership/configuration must be confirmed before any change. Product subdomains remain proposals only. |
| NEXUS-AI | Existing Next.js frontend; separately hosted API/backend if required | Keep frontend, API, and data services independently deployable. |
| Pulse | Independent music application; web and Android delivery as separately verified targets | Media storage/CDN and realtime services are optional architecture choices, not provisioned infrastructure. |
| Arcane Protocol | Godot native Android/desktop builds; web export only after compatibility testing | Do not promise WebAssembly delivery or multiplayer hosting before a working build and requirements are verified. |
| AI Engineering OS | Browser/cloud-first workflow with explicit approvals; optional local execution where supported | A CLI-only requirement is not assumed; preserve the current Android/browser workflow constraints. |
| RepoPilot AI | Independent developer tool | Runtime, package distribution, and hosting are not yet selected. |
| Gemini GitHub Bridge | Independently hosted integration service | Webhooks, secrets, session storage, and permissions require a separate security review. |
| Offline / Online App | Separate product and repository boundary | Product name, functionality, storage/sync model, and runtime remain to be defined. |

## Operational tools under consideration

Chatwoot, OpenProject, Cal.com, Cap, Hoppscotch, and Plausible are candidates for later evaluation. None is a required dependency or confirmed deployment. Self-hosted open-source software may avoid licence fees but still incurs hosting, backup, maintenance, security, and operational costs.

## Cost and security principles

- Treat any monthly estimate as a planning range, not a guaranteed bill.
- Verify current provider limits, bandwidth, storage, build minutes, and overage policies before choosing a platform.
- Prefer free tiers and open-source tools when they meet the actual requirement.
- Keep secrets out of source control; use provider-managed environment secrets.
- Separate production data and credentials between products.
- Backups, monitoring, access controls, and recovery procedures are part of operational cost.
- Do not introduce a shared VPS as a single point of failure for unrelated products without an explicit design review.

## Website design direction

- Deep Obsidian: `#0B0F12`
- Neon Emerald: `#00FF87`
- White typography
- Responsive layouts
- Glassmorphism and subtle grid effects
- Accessible navigation and reduced-motion support

## Approval and release boundaries

- Website development branch: `feat/retro-website-v1`
- Default branch: `main`
- No individual product repository is modified by this website project.
- No merge, DNS change, hosting connection, or deployment is authorized by this proposal.
- Main must remain untouched until a separate explicit approval.
- Browser and Android verification must be recorded separately; source inspection alone is not device verification.

## Current implementation status

The website is an in-progress static HTML/CSS/JavaScript prototype. The catalogue is grouped by division and includes a static HTML fallback. Product links currently open generic catalogue detail pages. No live service status, production hosting, domain mapping, or deployment is claimed.
