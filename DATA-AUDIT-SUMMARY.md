# Teleios Health - Data Audit Summary

**Date:** December 24, 2024
**Account:** Teleios Health
**Auditor:** Data Audit Skill Analysis

---

## Executive Summary

**Overall Readiness Score:** 7/10 [WARN]

**Current State:**
- [OK] Web GTM Container: Built with 21 tags, 14 triggers, 18 variables
- [WARN] Server GTM Container: Template installed, CAPIG configuration needed
- [WARN] Meta CAPI: Token obtained, tags need deployment
- [X] GoHighLevel Webhooks: Not configured (4 automations pending)
- [X] Webflow Scripts: Ready but not deployed

**Bottom Line:**
Infrastructure is designed but not deployed. Web GTM is ready to publish. Server-side tracking requires CAPIG tag creation and testing before going live.

---

## GTM Container Status

### Web GTM Container (GTM-WM5S3WSG)

| Component | Count | Status |
|-----------|-------|--------|
| Tags | 21 | [OK] Ready |
| Triggers | 14 | [OK] Ready |
| Variables | 18 | [OK] Ready |
| Workspace | 3 | [WARN] Unpublished |

**Tags Breakdown:**
- GA4 Tags: Page View, Events
- Meta Pixel Tags: PageView, Lead, ViewContent
- Google Ads Tags: Remarketing, Conversions (Lead, Deposit, Treatment)
- Custom Event Tags: Form tracking, Scroll depth

**What's Pending:**
1. Publish container with version name: `Teleios Health Lead Tracking v1`
2. Deploy GTM snippets to Webflow
3. Add form tracking dataLayer script to Webflow
4. Validate all tags fire correctly

---

### Server GTM Container (GTM-MLBJCV38)

| Component | Status | Notes |
|-----------|--------|-------|
| Stape Container | [OK] Created | nsawsbpg (US West Oregon) |
| GA4 Client | [WARN] Needs setup | Required to receive web events |
| CAPIG Template | [WARN] Not installed | Install from gallery |
| CAPIG Tags | [X] Not created | 3 tags needed (PageView, ViewContent, Lead) |
| Webhook Client | [X] Not configured | For offline conversions |

**Tags to Create:**

| Tag Name | Event | Action Source | Priority |
|----------|-------|---------------|----------|
| CAPIG - PageView | PageView | website | HIGH |
| CAPIG - ViewContent | ViewContent | website | MEDIUM |
| CAPIG - Lead | Lead | website | HIGH |
| CAPIG - Lead (Offline) | Lead | system_generated | HIGH |
| CAPIG - CompleteRegistration | CompleteRegistration | system_generated | MEDIUM |
| CAPIG - Purchase (Deposit) | Purchase | system_generated | HIGH |
| CAPIG - Purchase (Treatment) | Purchase | system_generated | HIGH |

**Variables to Create:**

| Variable | Type | Purpose |
|----------|------|---------|
| Client User Agent | Request Header | User matching |
| Client IP Address | Server Variable | User matching |
| Cookie - _fbc | Cookie | Click attribution |
| Cookie - _fbp | Cookie | Browser attribution |
| DL - user_data.email | Event Data | Enhanced matching |
| DL - user_data.phone | Event Data | Enhanced matching |
| DL - user_data.first_name | Event Data | Enhanced matching |
| DL - user_data.last_name | Event Data | Enhanced matching |
| Event ID | Event Data | Deduplication |

---

## Tracking Infrastructure Gap Analysis

### Current State vs. Required State

| Component | Current | Required | Gap |
|-----------|---------|----------|-----|
| Browser Pixel | [X] Not deployed | Live on all pages | Deploy to Webflow |
| CAPI Integration | [X] Token only | Full pipeline | Create CAPIG tags |
| GA4 Tracking | [X] Not deployed | Server-side enabled | Configure GA4 MP |
| Google Ads | [X] Not deployed | Conversions + Remarketing | Publish web GTM |
| CRM Webhooks | [X] Not configured | 4 pipeline automations | Set up in GHL |
| Deduplication | [X] Not implemented | event_id matching | Add to all tags |

### Expected Attribution Recovery

| Scenario | Current Loss | With CAPI | Recovery |
|----------|--------------|-----------|----------|
| iOS 14+ Users | ~40% | ~10% | +30% |
| Safari ITP | ~25% | ~5% | +20% |
| Ad Blockers | ~15% | ~5% | +10% |
| **Overall** | **~40%** | **~10%** | **+30-40%** |

---

## Critical Findings

### Finding #1: No Live Tracking
**Severity:** HIGH
**Impact:** Zero attribution data being collected

**What's Happening:**
The complete GTM architecture is built but not deployed. No tracking pixels or server-side events are currently firing on teleios.health.

**Why This Matters:**
- All ad spend is untracked
- No conversion data for optimization
- Meta/Google algorithms have no signal

**Evidence:**
- Web GTM in workspace 3 (unpublished)
- Webflow site has no GTM snippet
- Meta Events Manager shows no CAPI events

---

### Finding #2: CAPI Not Configured
**Severity:** HIGH
**Impact:** 30-40% attribution loss when browser tracking goes live

**What's Happening:**
Meta CAPI access token is obtained but no server-side tags exist. Once browser tracking goes live, iOS/Safari users will still have degraded attribution.

**Why This Matters:**
- iOS users represent significant traffic
- Safari ITP blocks cookies after 7 days
- CAPI recovers lost signal

**Evidence:**
- Server GTM container empty
- CAPIG template not installed
- No webhook client for offline events

---

### Finding #3: Offline Conversions Not Tracked
**Severity:** MEDIUM
**Impact:** Revenue events not attributed to ads

**What's Happening:**
GoHighLevel CRM has the customer journey data but no webhooks are sending events to server GTM.

**Why This Matters:**
- Deposit payments untracked
- Treatment completions untracked
- Full funnel attribution impossible

**Evidence:**
- 0 webhook automations in GHL
- No Purchase events in Meta Events Manager
- Revenue tracking missing

---

## Action Items by Phase

### Phase 1: Web GTM Deployment [HIGH PRIORITY]

| Task | Owner | Status |
|------|-------|--------|
| Publish Web GTM container v1 | GTM Admin | ⏳ |
| Add GTM head snippet to Webflow | Webflow Admin | ⏳ |
| Add GTM noscript to Webflow body | Webflow Admin | ⏳ |
| Add form tracking dataLayer script | Webflow Admin | ⏳ |
| Publish Webflow site | Webflow Admin | ⏳ |
| Validate with GTM Preview | GTM Admin | ⏳ |
| Confirm Meta Pixel Helper green | GTM Admin | ⏳ |
| Check GA4 Realtime | GTM Admin | ⏳ |

### Phase 2: Server-Side GTM + CAPIG [HIGH PRIORITY]

| Task | Owner | Status |
|------|-------|--------|
| Install CAPIG template in sGTM | sGTM Admin | ⏳ |
| Configure GA4 Client | sGTM Admin | ⏳ |
| Create CAPIG - PageView tag | sGTM Admin | ⏳ |
| Create CAPIG - ViewContent tag | sGTM Admin | ⏳ |
| Create CAPIG - Lead tag | sGTM Admin | ⏳ |
| Create user data variables | sGTM Admin | ⏳ |
| Test in Stape logs | sGTM Admin | ⏳ |
| Verify in Meta Events Manager | sGTM Admin | ⏳ |
| Confirm deduplication works | sGTM Admin | ⏳ |

### Phase 3: Offline Conversion Webhooks [MEDIUM PRIORITY]

| Task | Owner | Status |
|------|-------|--------|
| Configure Webhook Client in sGTM | sGTM Admin | ⏳ |
| Create Lead Qualified automation | GHL Admin | ⏳ |
| Create Assessment Complete automation | GHL Admin | ⏳ |
| Create Deposit Paid automation | GHL Admin | ⏳ |
| Create Treatment Complete automation | GHL Admin | ⏳ |
| Test webhook delivery | Both | ⏳ |
| Verify offline events in Meta | Both | ⏳ |

### Phase 4: Enhanced Tracking [LOW PRIORITY]

| Task | Owner | Status |
|------|-------|--------|
| Add ViewContent for therapy pages | GTM Admin | ⏳ |
| Implement scroll depth tracking | GTM Admin | ⏳ |
| Add video engagement tracking | GTM Admin | ⏳ |
| Enable Google Enhanced Conversions | GTM Admin | ⏳ |
| Optimize Event Match Quality to 7+ | sGTM Admin | ⏳ |

---

## Quick Reference: Account IDs

| Platform | ID |
|----------|-----|
| Meta Pixel | `912613798381607` |
| Meta Ad Account | `act_1544406343374527` |
| GA4 Property | `180456352` |
| GA4 Measurement ID | `G-CS05KZX2HG` |
| Google Ads Account | `6890103064` |
| Google Ads Conversion ID | `17810172296` |
| Web GTM | `GTM-WM5S3WSG` |
| Server GTM | `GTM-MLBJCV38` |
| Stape Container | `nsawsbpg` |

## GTM Direct Links

| Container | URL |
|-----------|-----|
| Web GTM (Workspace 3) | https://tagmanager.google.com/#/container/accounts/6328225355/containers/237555513/workspaces/3 |
| Server GTM (Workspace 3) | https://tagmanager.google.com/#/container/accounts/6328225355/containers/237556533/workspaces/3 |

## Conversion Labels (Google Ads)

| Conversion | Label |
|------------|-------|
| Lead | `GKswCL2sndYbEIjTxqxC` |
| Deposit | `C7qLCMCsndYbEIjTxqxC` |
| Treatment | `6j8qCMOsndYbEIjTxqxC` |

---

## Expected Outcomes After Implementation

| Metric | Current | Target | Timeline |
|--------|---------|--------|----------|
| Event Volume | 0 | Baseline established | Week 1 |
| Match Quality | N/A | 7.0+ | Week 2 |
| Deduplication Rate | N/A | >95% | Week 1 |
| Attribution Recovery | 0% | +30-40% | Week 2-4 |
| Offline Conversions | 0 | 100% tracked | Week 3 |

---

**Audit Complete:** December 24, 2024
**Next Steps:** Execute Phase 1 (Web GTM Deployment)
