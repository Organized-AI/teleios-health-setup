# Teleios Health - Phased Implementation Plan

## Current Status Summary

| Component | Status | Notes |
|-----------|--------|-------|
| Web GTM Container | ✅ Built | 21 tags, 14 triggers, 18 variables ready |
| Google Ads Conversions | ✅ Created | Lead/Deposit/Treatment labels obtained |
| Server GTM Container | ⏳ Pending | Stape CAPIG configuration needed |
| Meta CAPI Integration | ⏳ Pending | Token obtained, tags need deployment |
| GoHighLevel Webhooks | ⏳ Pending | 4 webhook automations to create |
| Webflow Script | ⏳ Pending | Form tracking script ready to deploy |

---

## Phase 1: Finalize Web GTM Container

### Objective
Publish the completed web GTM container and validate all browser-side tracking.

### Tasks

1. **Publish Web Container**
   - Open GTM workspace 3 for GTM-WM5S3WSG
   - Review all 21 tags, 14 triggers, 18 variables
   - Submit with version name: "Teleios Health Lead Tracking v1"
   - Publish to production

2. **Deploy Webflow Scripts**
   - Add GTM snippet to Webflow head code
   - Add noscript fallback to body start
   - Add form tracking dataLayer script before `</body>`
   - Publish Webflow site

3. **Validate Browser Tracking**
   - Use GTM Preview to verify tags fire
   - Confirm Meta Pixel Helper shows PageView/Lead
   - Check GA4 Realtime for events
   - Verify Google Ads conversion tag fires

### Deliverables
- Published web GTM container
- Working dataLayer events on teleios.health
- Browser-side Meta Pixel, GA4, and Google Ads tracking live

---

## Phase 2: Configure Server-Side GTM with CAPIG

### Objective
Set up Stape server container with CAPIG for Meta Conversions API and GA4 Measurement Protocol.

### Tasks

1. **Stape Container Setup**
   - Access sGTM container GTM-MLBJCV38
   - Install Stape CAPIG tag template from gallery
   - Configure GA4 Client to receive events

2. **Create CAPIG Event Tags**
   - CAPIG - PageView (website action source)
   - CAPIG - ViewContent (for therapy pages)
   - CAPIG - Lead (for web form submissions)
   - Configure user data mapping variables

3. **Configure GA4 Server Tag**
   - GA4 Measurement Protocol with API secret
   - Map event parameters from web container
   - Enable server-side pageview forwarding

4. **Test Event Flow**
   - Verify events arrive in Stape logs
   - Confirm Meta CAPI receives deduplicated events
   - Check GA4 shows server-side event source

### Deliverables
- Working sGTM → CAPIG → Meta CAPI pipeline
- Server-side GA4 events flowing
- Deduplication confirmed in Meta Events Manager

---

## Phase 3: Implement Offline Conversion Webhooks

### Objective
Connect GoHighLevel CRM pipeline stages to server-side GTM for offline conversion tracking.

### Tasks

1. **Configure sGTM Webhook Client**
   - Add Webhook Client to sGTM container
   - Configure for `/webhook` endpoint path
   - Set up request body parsing for JSON payloads

2. **Create Webhook Triggers**
   - Trigger: Webhook - Lead Qualified (event_name = "lead_qualified")
   - Trigger: Webhook - Assessment Complete (event_name = "assessment_complete")
   - Trigger: Webhook - Deposit Paid (event_name = "deposit_paid")
   - Trigger: Webhook - Treatment Complete (event_name = "treatment_complete")

3. **Create Offline CAPIG Tags**
   - CAPIG - Lead (action_source: system_generated)
   - CAPIG - CompleteRegistration 
   - CAPIG - Purchase (Deposit)
   - CAPIG - Purchase (Treatment)

4. **GoHighLevel Automation Setup**
   - Create 4 pipeline stage change automations
   - Configure webhook actions with JSON payloads
   - Include all user data fields for matching

5. **Test Offline Flow**
   - Create test contact in GHL
   - Move through pipeline stages
   - Verify events appear in Meta Events Manager
   - Confirm Google Ads offline conversions (if enabled)

### Deliverables
- 4 GHL webhook automations live
- Offline conversions flowing to Meta CAPI
- Complete funnel visibility in Events Manager

---

## Phase 4: Enhanced Tracking & Optimization

### Objective
Add additional engagement tracking and optimize event match quality.

### Tasks

1. **Add ViewContent Tags**
   - Create therapy-specific ViewContent tags
   - Exosome therapy page → content_name: "Exosome Therapy"
   - Gene therapy page → content_name: "Gene Therapy"
   - Clinic page → content_name: "Clinic"

2. **Implement Scroll Tracking**
   - Add scroll depth triggers (50%, 75%)
   - Create scroll depth event tags
   - Configure for key pages (homepage, therapy pages)

3. **Add Video Engagement**
   - Track hero video play start
   - Track 50%/100% video progress
   - Map video_name parameter

4. **Enhanced Conversions Setup**
   - Enable Google Ads Enhanced Conversions
   - Configure user data pass-through
   - Verify user matching in Google Ads

5. **Event Match Quality Optimization**
   - Review Meta EMQ scores
   - Add additional parameters (external_id, browser data)
   - Target 7+ match quality score

### Deliverables
- Comprehensive engagement tracking
- Video analytics data
- Improved event match quality scores
- Full attribution visibility

---

## Phase 5: Documentation & Handoff

### Objective
Complete documentation and prepare for ongoing management.

### Tasks

1. **Create Tracking Documentation**
   - Event taxonomy with all parameters
   - dataLayer specification document
   - Trigger/tag dependency map

2. **Build Testing Runbook**
   - Monthly QA checklist
   - Debugging flowcharts
   - Platform-specific troubleshooting guides

3. **Set Up Monitoring**
   - Configure GA4 alerts for event drops
   - Set up Meta CAPI health notifications
   - Create Stape usage alerts

4. **Knowledge Transfer**
   - Record walkthrough video
   - Document common issues and fixes
   - Create maintenance SOP

### Deliverables
- Complete technical documentation
- QA and monitoring systems
- Team training materials

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
| Web GTM | `GTM-WM5S3WSG` (Account: 6328225355, Container: 237555513) |
| Server GTM | `GTM-MLBJCV38` |
| Stape Container | `nsawsbpg` (US West Oregon) |

---

## Conversion Labels

| Conversion | Label |
|------------|-------|
| Lead | `GKswCL2sndYbEIjTxqxC` |
| Deposit | `C7qLCMCsndYbEIjTxqxC` |
| Treatment | `6j8qCMOsndYbEIjTxqxC` |

---

## Implementation Order Summary

| Order | Phase | Primary Tool |
|-------|-------|--------------|
| 1 | Web GTM Publish | GTM MCP Server |
| 2 | sGTM + CAPIG | Stape MCP + GTM MCP |
| 3 | GHL Webhooks | Manual GHL Configuration |
| 4 | Enhanced Tracking | GTM MCP Server |
| 5 | Documentation | Manual + Templates |

---

## Claude Code Commands

```bash
# Phase 1 - Publish and test web container
claude --dangerously-skip-permissions
> Use gtm-architect to review the Teleios web container before publishing

# Phase 2 - Configure sGTM
> /gtm-capi to set up Meta CAPIG integration

# Phase 3 - Webhook setup
> /gtm-webhook to configure GoHighLevel automations

# Phase 4 - Testing
> /gtm-test to run 7-phase validation

# Troubleshooting
> Use gtm-debugger to diagnose any issues
```
