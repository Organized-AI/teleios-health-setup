# Teleios Health - GTM Implementation Summary

**Date:** December 24, 2024
**Project:** Complete GTM Tracking Infrastructure
**Status:** All Phases Documented - Ready for Implementation

---

## Quick Start Checklist

```
[ ] Phase 1: Deploy Web GTM to Webflow
[ ] Phase 2: Configure CAPIG in Server GTM (Stape)
[ ] Phase 3: Set up GoHighLevel Webhook Automations
[ ] Phase 4: Enable Enhanced Tracking & Optimize EMQ
[ ] Final: Validate all tracking in Meta Events Manager
```

---

## Account IDs Reference

| Platform | ID |
|----------|-----|
| **Meta Pixel** | `912613798381607` |
| **Meta Ad Account** | `act_1544406343374527` |
| **GA4 Measurement ID** | `G-CS05KZX2HG` |
| **GA4 Property** | `180456352` |
| **Google Ads Conversion ID** | `17810172296` |
| **Web GTM Container** | `GTM-WM5S3WSG` |
| **Server GTM Container** | `GTM-MLBJCV38` |
| **GTM Account** | `6328225355` |
| **Stape Container** | `nsawsbpg` |
| **Stape URL** | `https://nsawsbpg.stape.io` |

### Google Ads Conversion Labels

| Conversion | Label |
|------------|-------|
| Lead | `GKswCL2sndYbEIjTxqxC` |
| Deposit | `C7qLCMCsndYbEIjTxqxC` |
| Treatment | `6j8qCMOsndYbEIjTxqxC` |

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────────┐
│                              WEBSITE                                     │
│                          teleios.health                                  │
│  ┌───────────────────────────────────────────────────────────────────┐  │
│  │  Web GTM Container (GTM-WM5S3WSG)                                 │  │
│  │  ├── Meta Pixel: PageView, Lead, ViewContent                      │  │
│  │  ├── GA4: page_view, generate_lead, view_item, scroll, video      │  │
│  │  ├── Google Ads: Remarketing + Conversions (Lead/Deposit/Treatment)│  │
│  │  └── DataLayer: event_id, user_data, meta_cookies                 │  │
│  └───────────────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────────────────┘
                                    │
                                    │ GA4 Collection (with event_id + user_data)
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                     SERVER-SIDE GTM (STAPE)                             │
│                     nsawsbpg.stape.io                                   │
│  ┌───────────────────────────────────────────────────────────────────┐  │
│  │  GA4 Client ─────────────────────────────┐                        │  │
│  │  └── Receives browser events             │                        │  │
│  │                                          ▼                        │  │
│  │  Webhook Client ────────────────► CAPIG Tags ──────► Meta CAPI    │  │
│  │  └── Receives GHL webhooks        ├── PageView     (Pixel: 912...) │  │
│  │      /webhook endpoint            ├── ViewContent                 │  │
│  │                                   ├── Lead                        │  │
│  │                                   ├── CompleteRegistration        │  │
│  │                                   └── Purchase                    │  │
│  │                                          │                        │  │
│  │                                          ▼                        │  │
│  │                                   GA4 MP Tag ──────► GA4          │  │
│  │                                   (G-CS05KZX2HG)                  │  │
│  └───────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────┘
                                    ▲
                                    │ Webhook POST JSON
┌─────────────────────────────────────────────────────────────────────────┐
│                          GOHIGHLEVEL CRM                                │
│  ┌───────────────────────────────────────────────────────────────────┐  │
│  │  Pipeline Stage Change Automations                                │  │
│  │  ├── Qualified ────────► Webhook: lead_qualified                  │  │
│  │  ├── Assessment Complete ─► Webhook: assessment_complete          │  │
│  │  ├── Deposit Paid ─────────► Webhook: deposit_paid                │  │
│  │  └── Treatment Complete ───► Webhook: treatment_complete          │  │
│  └───────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Phase Summary

### Phase 1: Web GTM Deployment
**Document:** `PHASE-1-COMPLETE.md`
**Status:** Ready for Deployment

**Key Deliverables:**
- GTM head snippet for Webflow
- GTM noscript snippet for Webflow body
- Form tracking dataLayer script with event_id deduplication
- Validation checklist for all tag fires

**Tags:** 21 | **Triggers:** 14 | **Variables:** 18

---

### Phase 2: Server-Side GTM + CAPIG
**Document:** `PHASE-2-COMPLETE.md`
**Status:** Configuration Ready

**Key Deliverables:**
- GA4 Client configuration
- CAPIG tags: PageView, ViewContent, Lead
- Server-side variables for user data and cookies
- GA4 Measurement Protocol configuration
- Testing checklist for Stape logs and Meta Events Manager

**Focus:** Event deduplication via event_id, user data hashing

---

### Phase 3: Offline Conversion Webhooks
**Document:** `PHASE-3-COMPLETE.md`
**Status:** Configuration Ready

**Key Deliverables:**
- Webhook Client configuration for sGTM
- 4 webhook triggers (lead_qualified, assessment_complete, deposit_paid, treatment_complete)
- JSON payload templates for GoHighLevel automations
- Offline CAPIG tags with action_source: system_generated
- GHL automation setup instructions

**Focus:** CRM pipeline → Meta CAPI for full funnel attribution

---

### Phase 4: Enhanced Tracking
**Document:** `PHASE-4-COMPLETE.md`
**Status:** Configuration Ready

**Key Deliverables:**
- ViewContent configurations for therapy pages
- Scroll depth tracking (50%, 75%)
- Video engagement tracking (start, 50%, complete)
- Google Enhanced Conversions setup
- Event Match Quality optimization to 7+

**Focus:** Engagement analytics and improved user matching

---

## Implementation Order

| Order | Phase | Primary Tool | Estimated Time |
|-------|-------|--------------|----------------|
| 1 | Web GTM Publish | GTM + Webflow | 30 minutes |
| 2 | sGTM + CAPIG | Stape Dashboard | 2 hours |
| 3 | GHL Webhooks | GoHighLevel | 1 hour |
| 4 | Enhanced Tracking | GTM | 1 hour |

**Total Implementation Time:** ~5 hours

---

## Required Secrets/Tokens

Ensure these are available before implementation:

| Secret | Source | Used In |
|--------|--------|---------|
| Meta CAPI Access Token | Meta Events Manager | CAPIG tags |
| GA4 API Secret | GA4 Admin → Data Streams | GA4 MP tag |
| GHL API Key | GoHighLevel Settings | (optional, for advanced) |

**Location:** Store in `.env` file or sGTM Constant variables

---

## Validation Endpoints

### Meta Events Manager
```
URL: https://business.facebook.com/events_manager
Pixel: 912613798381607
Check: Test Events tab → Verify all event types
```

### GA4 Realtime
```
URL: https://analytics.google.com/
Property: 180456352
Check: Reports → Realtime → Events
```

### Google Ads Conversions
```
URL: https://ads.google.com/
Account: 6890103064
Check: Tools → Conversions → Verify status
```

### Stape Logs
```
URL: https://stape.io/
Container: nsawsbpg
Check: Logs tab → Filter by recent
```

---

## Event Taxonomy

### Website Events (action_source: website)

| Event | Trigger | Platform | Parameters |
|-------|---------|----------|------------|
| PageView | All pages | Meta | page_location, fbp, fbc |
| page_view | All pages | GA4 | page_location, page_title |
| ViewContent | Therapy pages | Meta | content_name, content_category |
| view_item | Therapy pages | GA4 | item_name, item_category |
| Lead | Form submit | Meta | email, phone, first_name, last_name |
| generate_lead | Form submit | GA4 | form_id, user_data |
| scroll | 50%/75% scroll | GA4 | percent_scrolled, page_path |
| video_start | Video play | GA4 | video_title, video_provider |
| video_complete | Video end | GA4 | video_title, video_duration |

### Offline Events (action_source: system_generated)

| Event | CRM Trigger | Platform | Parameters |
|-------|-------------|----------|------------|
| Lead | Qualified stage | Meta | email, phone, external_id |
| CompleteRegistration | Assessment stage | Meta | content_name |
| Purchase | Deposit paid | Meta | value, currency |
| Purchase | Treatment complete | Meta | value, currency |

---

## Event Match Quality Targets

| Event | Target EMQ | Key Parameters |
|-------|------------|----------------|
| PageView | 6+ | fbp, fbc, ip, user_agent |
| Lead | 7+ | email, phone, names, fbp, fbc |
| Purchase | 8+ | email, phone, external_id, value |

---

## Troubleshooting Quick Reference

### No events in Meta Events Manager
1. Check CAPI access token validity
2. Verify Pixel ID: `912613798381607`
3. Check Stape logs for errors
4. Confirm action_source is correct

### Duplicate events appearing
1. Verify event_id is passed from browser to server
2. Check event_id format is identical
3. Confirm within 48-hour dedup window

### Low EMQ scores
1. Add email and phone to all events
2. Capture fbp/fbc cookies
3. Include external_id
4. Normalize data (lowercase, trimmed)

### Webhooks not received
1. Test with cURL to Stape endpoint
2. Check GHL automation execution history
3. Verify JSON payload structure
4. Confirm Stape container is running

---

## Files in This Repository

```
teleios-health-setup/
├── IMPLEMENTATION-SUMMARY.md      # This file - master overview
├── PHASE-1-COMPLETE.md            # Web GTM deployment
├── PHASE-2-COMPLETE.md            # Server-side GTM + CAPIG
├── PHASE-3-COMPLETE.md            # Offline conversion webhooks
├── PHASE-4-COMPLETE.md            # Enhanced tracking
├── DATA-AUDIT-SUMMARY.md          # Current state audit
├── PLANNING/
│   ├── PHASED-IMPLEMENTATION-PLAN.md
│   ├── PHASE-1-WEB-GTM.md
│   ├── PHASE-2-SGTM-CAPIG.md
│   ├── PHASE-3-WEBHOOKS.md
│   └── PHASE-4-ENHANCED-TRACKING.md
└── .env.template                   # Environment variables template
```

---

## Post-Implementation Monitoring

### Daily Checks
- [ ] Event volume in Meta Events Manager
- [ ] Stape container health
- [ ] No error spikes in logs

### Weekly Checks
- [ ] EMQ score trends
- [ ] Deduplication rates
- [ ] Conversion attribution accuracy

### Monthly Checks
- [ ] Full system health audit
- [ ] Token expiration review
- [ ] Performance vs. baseline

---

## Support Resources

- **GTM Documentation:** https://support.google.com/tagmanager
- **Meta CAPI Documentation:** https://developers.facebook.com/docs/marketing-api/conversions-api
- **Stape Documentation:** https://stape.io/docs
- **GA4 Measurement Protocol:** https://developers.google.com/analytics/devguides/collection/protocol/ga4

---

**Implementation Ready:** December 24, 2024
**Expected Go-Live:** Upon deployment to Webflow and GTM publish
