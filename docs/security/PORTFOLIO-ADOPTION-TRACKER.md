# RETRO Technologies — Portfolio Security Evidence Adoption Tracker

**Document ID:** RETRO-SEC-PORTFOLIO-001  
**Baseline:** v1.0  
**Date:** 16 November 2026  
**Status:** Adoption PRs opened; technical audits remain outstanding

## Purpose

Track adoption of the common 17-control evidence-register format across the active RETRO portfolio. A register created in a draft PR is an adoption record only. It does not mean the product passed a security audit.

## Adoption status

| Product | Repository | Evidence register PR | Adoption status | Technical audit |
|---|---|---|---|---|
| NEXUS-AI | [NEXUS-AI-](https://github.com/axdakkuu08-create/NEXUS-AI-) | [PR #1](https://github.com/axdakkuu08-create/NEXUS-AI-/pull/1) | Draft | Not started |
| RepoPilot AI | [RepoPilot-AI](https://github.com/axdakkuu08-create/RepoPilot-AI) | [PR #1](https://github.com/axdakkuu08-create/RepoPilot-AI/pull/1) | Draft | Not started |
| AI Engineering OS | [Ai-enginering.os](https://github.com/axdakkuu08-create/Ai-enginering.os) | [PR #5](https://github.com/axdakkuu08-create/Ai-enginering.os/pull/5) | Draft | Not started under this register |
| Arcane Protocol | [Arcane](https://github.com/axdakkuu08-create/Arcane) | [PR #23](https://github.com/axdakkuu08-create/Arcane/pull/23) | Draft | Not started |
| Pulse | [Spotifast-](https://github.com/axdakkuu08-create/Spotifast-) | [PR #1](https://github.com/axdakkuu08-create/Spotifast-/pull/1) | Draft | Not started |
| Gemini GitHub MCP Bridge | [gemini-github-mcp-bridge](https://github.com/axdakkuu08-create/gemini-github-mcp-bridge) | [PR #11](https://github.com/axdakkuu08-create/gemini-github-mcp-bridge/pull/11) | Draft | Not started |
| VINDEX | [Vindex-](https://github.com/axdakkuu08-create/Vindex-) | [PR #1](https://github.com/axdakkuu08-create/Vindex-/pull/1) | Draft | Not started |
| RETRO Sentinel AI | [retro-sentinel-ai](https://github.com/axdakkuu08-create/retro-sentinel-ai) | [PR #3](https://github.com/axdakkuu08-create/retro-sentinel-ai/pull/3) | Draft | Not started |
| CREATOR OS | [creator-os-docs](https://github.com/axdakkuu08-create/creator-os-docs) | [PR #5](https://github.com/axdakkuu08-create/creator-os-docs/pull/5) | Draft | Not started |
| SAM | [sam-personal-intelligence-core](https://github.com/axdakkuu08-create/sam-personal-intelligence-core) | [PR #1](https://github.com/axdakkuu08-create/sam-personal-intelligence-core/pull/1) | Draft | Not started |

## Adoption rules

- Each register starts with all controls as NOT VERIFIED.
- Product-specific applicability must be confirmed against source and runtime evidence.
- A documentation-only repository may mark runtime controls N/A only with a documented rationale.
- No product PR is merged automatically.
- Each product is audited separately; the parent website baseline does not imply child-product compliance.
- Keep product repositories, secrets, data stores, deployments, and release cycles independent.

## Parent website security gate

The parent website's live-preview evidence and current hosting controls are recorded in [WEBSITE-EVIDENCE-REGISTER.md](WEBSITE-EVIDENCE-REGISTER.md).

Current known limitations:
- Raw HTTP response headers: NOT VERIFIED.
- GitHub branch protection: NOT CONFIGURED.
- Full secret/history scan: NOT VERIFIED.
- Complete dependency and action-provenance scan: NOT VERIFIED.
- Physical Android Chrome test: NOT VERIFIED.

Cloudflare Pages production deployments have been disabled pending release-governance completion. Preview deployments are restricted to the documented branch patterns.

## Next sequence

1. Complete parent website raw-header verification and CSP design.
2. Enable GitHub branch rules for the parent website repository.
3. Complete a full secret/history scan and dependency/action provenance review.
4. Run Android Chrome tests on a physical device.
5. Merge the evidence-register adoption PRs only after review.
6. Conduct each product's technical audit in sequence and update its register with evidence.
