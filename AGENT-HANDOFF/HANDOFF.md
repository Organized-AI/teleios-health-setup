# Agent Handoff Document

## Project: Teleios Health GTM Setup

### Quick Context
Claude Code plugin for implementing enterprise-grade Google Tag Manager tracking infrastructure for Teleios Health. Supports Meta CAPI, GA4, Google Ads, and GoHighLevel CRM integrations via Stape server-side GTM.

### Key Files to Read
1. `CLAUDE.md` - Project overview and build instructions
2. `README.md` - Quick start and architecture overview
3. `PLANNING/PHASED-IMPLEMENTATION-PLAN.md` - Full implementation roadmap
4. `DOCUMENTATION/` - Technical implementation guides

### Key Account IDs
- **Meta Pixel**: 912613798381607
- **GA4 Measurement ID**: G-CS05KZX2HG
- **Google Ads Account**: 6890103064
- **Web GTM**: GTM-WM5S3WSG
- **Server GTM**: GTM-MLBJCV38

### GTM Container URLs
- **Web GTM**: https://tagmanager.google.com/#/container/accounts/6328225355/containers/237555513/workspaces/3
- **Server GTM**: https://tagmanager.google.com/#/container/accounts/6328225355/containers/237556533/workspaces/3

### Current State
- Plugin Framework: ✅ Complete
- Agents: ✅ 2 agents (gtm-architect, gtm-debugger)
- Commands: ✅ 5 commands (setup, capi, test, webhook, audit)
- Skills: ✅ 8 skills
- Implementation Phases: ✅ 4 phases documented

### Available Commands
| Command | Purpose |
|---------|---------|
| `/gtm-setup` | Initialize tracking architecture |
| `/gtm-capi` | Configure Meta Conversions API |
| `/gtm-webhook` | Set up CRM webhooks |
| `/gtm-test` | Run validation checklist |
| `/gtm-audit` | Audit existing implementation |

### Next Steps
1. Execute Phase 1: Web GTM deployment (see `PLANNING/PHASE-1-WEB-GTM.md`)
2. Execute Phase 2: Server-side GTM + CAPI (see `PLANNING/PHASE-2-SGTM-CAPIG.md`)
3. Execute Phase 3: Webhook integrations (see `PLANNING/PHASE-3-WEBHOOKS.md`)
4. Execute Phase 4: Enhanced tracking (see `PLANNING/PHASE-4-ENHANCED-TRACKING.md`)

### Architecture Overview
```
Website (Webflow)
    ↓
Web GTM (GTM-WM5S3WSG)
    ↓
Server GTM/Stape (GTM-MLBJCV38)
    ↓
┌───────────┬──────────┬────────────┐
↓           ↓          ↓            ↓
Meta CAPI   GA4 Server Google Ads   CRM
            ↑
GoHighLevel (Webhook Integrations)
```
