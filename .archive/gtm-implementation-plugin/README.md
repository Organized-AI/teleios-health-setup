# GTM Implementation Plugin

A comprehensive Claude Code plugin for Google Tag Manager implementations, including Meta CAPI, GA4, Google Ads, and CRM webhook integrations.

## Features

### Commands

| Command | Description |
|---------|-------------|
| `/gtm-setup` | Initialize GTM tracking architecture for a new project |
| `/gtm-test` | Run comprehensive testing checklist |
| `/gtm-capi` | Configure Meta Conversions API with Stape CAPIG |
| `/gtm-audit` | Audit existing GTM implementation |
| `/gtm-webhook` | Configure CRM webhooks for offline conversions |

### Agents

| Agent | Description |
|-------|-------------|
| `gtm-architect` | Designs tracking solutions and conversion funnels |
| `gtm-debugger` | Troubleshoots tracking issues and fixes implementations |

### Skills

| Skill | Description |
|-------|-------------|
| `meta-capi-setup` | Server-side Meta tracking with CAPIG |
| `gtm-container-management` | Container import/export and version control |
| `event-tracking-patterns` | Best practices for cross-platform event tracking |

## Installation

### From GitHub

```bash
/plugin marketplace add organized-ai/teleios-health-setup
/plugin install gtm-implementation@organized-ai
```

### From Local Directory

```bash
/plugin marketplace add ./teleios-health-setup
/plugin install gtm-implementation@teleios-health-setup
```

## Usage Examples

### Setting Up a New Project

```
/gtm-setup

# Follow prompts to:
# 1. Enter account IDs
# 2. Map customer journey
# 3. Generate implementation files
```

### Testing Implementation

```
/gtm-test

# Runs through:
# - GTM Preview validation
# - Meta Pixel Helper checks
# - GA4 real-time verification
# - Server-side event validation
```

### Using Agents

```
# For architecture planning
"Use the gtm-architect agent to design tracking for my e-commerce site"

# For debugging
"Use the gtm-debugger agent to troubleshoot why my Lead events aren't firing"
```

## Supported Platforms

### Tracking Platforms
- Meta Pixel & Conversions API (CAPI)
- Google Analytics 4 (GA4)
- Google Ads Conversion Tracking
- Server-side GTM with Stape

### CRM Integrations
- GoHighLevel (GHL)
- HubSpot
- Salesforce
- Pipedrive
- Custom webhooks

## Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                           WEBSITE                                    │
└─────────────────────────────┬───────────────────────────────────────┘
                              │
              ┌───────────────┼───────────────┐
              │               │               │
              ▼               ▼               ▼
       ┌───────────┐   ┌───────────┐   ┌───────────┐
       │ Meta      │   │ Web GTM   │   │   GA4     │
       │ Pixel     │   │           │   │           │
       └───────────┘   └─────┬─────┘   └─────┬─────┘
              │              │               │
              │              └───────┬───────┘
              │                      │
              │                      ▼
              │          ┌────────────────────┐
              │          │   Server GTM       │
              │          │   (Stape CAPIG)    │
              │          └─────────┬──────────┘
              │                    │
              │     ┌──────────────┼──────────────┐
              │     │              │              │
              ▼     ▼              ▼              ▼
       ┌───────────────┐   ┌───────────┐   ┌───────────┐
       │   Meta CAPI   │   │ GA4 Server│   │Google Ads │
       │ (deduplicated)│   │           │   │           │
       └───────────────┘   └───────────┘   └───────────┘
              ▲
              │ Webhooks
       ┌──────┴──────┐
       │     CRM     │
       │ (GHL, etc)  │
       └─────────────┘
```

## License

MIT License - Organized AI

## Contributing

1. Fork the repository
2. Create feature branch
3. Submit pull request

## Support

- GitHub Issues: [organized-ai/teleios-health-setup](https://github.com/organized-ai/teleios-health-setup)
- Documentation: See `/gtm-*` command help
