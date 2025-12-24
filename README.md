# Teleios Health GTM Setup

A comprehensive Google Tag Manager implementation for Teleios Health, featuring Meta CAPI, GA4, Google Ads conversion tracking, and CRM webhook integration.

## Repository Structure (Organized Codebase)

```
teleios-health-setup/
├── .claude/                              # Claude Code configuration
│   ├── agents/                           # Specialized AI agents
│   │   ├── gtm-architect.md             # Design & planning agent
│   │   └── gtm-debugger.md              # Troubleshooting agent
│   ├── commands/                         # Plugin commands
│   │   ├── gtm-setup.md                 # Initialize tracking architecture
│   │   ├── gtm-test.md                  # Run testing checklist
│   │   ├── gtm-capi.md                  # Configure Meta CAPI
│   │   ├── gtm-webhook.md               # CRM webhook setup
│   │   └── gtm-audit.md                 # Audit existing implementation
│   ├── hooks/                            # Pre/post tool hooks
│   └── skills/                           # Implementation patterns
│       ├── data-audit/
│       ├── event-tracking-patterns/
│       ├── gtm-container-management/
│       ├── meta-capi-setup/
│       ├── organized-codebase-applicator/
│       ├── phase-0-template/
│       ├── phased-planning/
│       └── tech-stack-orchestrator/
│
├── PLANNING/                             # Implementation phases
│   ├── PHASED-IMPLEMENTATION-PLAN.md    # Master implementation roadmap
│   ├── PHASE-1-WEB-GTM.md               # Web GTM deployment
│   ├── PHASE-2-SGTM-CAPIG.md            # Server-side GTM + CAPI
│   ├── PHASE-3-WEBHOOKS.md              # CRM webhook integrations
│   └── PHASE-4-ENHANCED-TRACKING.md     # Enhanced tracking features
│
├── DOCUMENTATION/                        # Technical documentation
│   ├── teleios-health-customer-journey.md
│   ├── teleios-final-implementation-guide.md
│   ├── teleios-capig-implementation-guide.md
│   ├── teleios-testing-checklist.md
│   └── gtm-plugin-guide.jsx
│
├── ARCHITECTURE/                         # System architecture docs
├── SPECIFICATIONS/                       # Functional/technical specs
├── AGENT-HANDOFF/                        # Agent handoff instructions
│   └── HANDOFF.md
├── CONFIG/                               # Configuration docs
├── scripts/                              # Automation scripts
├── .archive/                             # Archived iterations
│
├── CLAUDE.md                            # Quick start for Claude
└── README.md
```

## Quick Start

### Using Claude Code Plugin

```bash
# Available commands
/gtm-setup    # Initialize new tracking
/gtm-test     # Run validation checklist
/gtm-capi     # Configure Meta CAPI
/gtm-webhook  # Set up CRM webhooks
/gtm-audit    # Audit existing setup

# Use specialized agents
> Use gtm-architect to design tracking for my funnel
> Use gtm-debugger to fix duplicate Lead events
```

## Account IDs

| Platform | ID |
|----------|-----|
| Meta Pixel | `912613798381607` |
| GA4 Measurement ID | `G-CS05KZX2HG` |
| Google Ads Account | `6890103064` |
| Web GTM | `GTM-WM5S3WSG` |
| Server GTM | `GTM-MLBJCV38` |

## GTM Container URLs

| Container | URL |
|-----------|-----|
| Web GTM | https://tagmanager.google.com/#/container/accounts/6328225355/containers/237555513/workspaces/3 |
| Server GTM | https://tagmanager.google.com/#/container/accounts/6328225355/containers/237556533/workspaces/3 |

## Current Implementation Status

- ✅ Web GTM container configured (21 tags, 14 triggers, 18 variables)
- ✅ Google Ads conversion actions created with labels
- ⏳ Server-side GTM with CAPIG pending deployment
- ⏳ GoHighLevel webhook automations pending
- ⏳ Webflow tracking script pending deployment

## Architecture

```
Website (Webflow) → Web GTM → Server GTM (Stape)
                                    ↓
                    ┌───────────────┼───────────────┐
                    ↓               ↓               ↓
               Meta CAPI      GA4 Server      Google Ads
                    ↑
                    │ Webhooks
              GoHighLevel CRM
```

## Documentation

- [Customer Journey Map](./DOCUMENTATION/teleios-health-customer-journey.md)
- [Implementation Guide](./DOCUMENTATION/teleios-final-implementation-guide.md)
- [CAPIG Setup Guide](./DOCUMENTATION/teleios-capig-implementation-guide.md)
- [Testing Checklist](./DOCUMENTATION/teleios-testing-checklist.md)
- [Master Plan](./PLANNING/PHASED-IMPLEMENTATION-PLAN.md)
- [Agent Handoff](./AGENT-HANDOFF/HANDOFF.md)

## License

Private - Organized AI
