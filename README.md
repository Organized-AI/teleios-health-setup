# Teleios Health GTM Setup

A comprehensive Google Tag Manager implementation for Teleios Health, featuring Meta CAPI, GA4, Google Ads conversion tracking, and CRM webhook integration.

## Repository Structure

```
teleios-health-setup/
├── docs/                              # Project knowledge & guides
│   ├── teleios-health-customer-journey.md     # Customer journey & event mapping
│   ├── teleios-final-implementation-guide.md  # Complete setup instructions
│   ├── teleios-capig-implementation-guide.md  # Stape CAPIG configuration
│   ├── teleios-testing-checklist.md           # 6-phase QA checklist
│   └── gtm-plugin-guide.jsx                   # Interactive plugin documentation
│
├── gtm-implementation-plugin/         # Claude Code plugin
│   ├── agents/                        # Specialized AI agents
│   │   ├── gtm-architect.md          # Design & planning agent
│   │   └── gtm-debugger.md           # Troubleshooting agent
│   ├── commands/                      # Plugin commands
│   │   ├── gtm-setup.md              # Initialize tracking architecture
│   │   ├── gtm-test.md               # Run testing checklist
│   │   ├── gtm-capi.md               # Configure Meta CAPI
│   │   ├── gtm-webhook.md            # CRM webhook setup
│   │   └── gtm-audit.md              # Audit existing implementation
│   └── skills/                        # Implementation patterns
│       ├── event-tracking-patterns/
│       ├── meta-capi-setup/
│       └── gtm-container-management/
│
├── PHASED-IMPLEMENTATION-PLAN.md      # Remaining work breakdown
└── README.md
```

## Quick Start

### Using Claude Code Plugin

```bash
# Install the plugin
/plugin marketplace add organized-ai/teleios-health-setup
/plugin install gtm-implementation@organized-ai

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

- [Customer Journey Map](./docs/teleios-health-customer-journey.md)
- [Implementation Guide](./docs/teleios-final-implementation-guide.md)
- [CAPIG Setup Guide](./docs/teleios-capig-implementation-guide.md)
- [Testing Checklist](./docs/teleios-testing-checklist.md)
- [Phased Plan](./PHASED-IMPLEMENTATION-PLAN.md)

## License

Private - Organized AI
