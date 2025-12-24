# Phase 5: Documentation & Handoff

## Objective

Complete documentation and prepare for ongoing management.

## Prerequisites

- Phases 1-4 completed
- All tracking verified and operational
- Access to all platform accounts

## Account Reference

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

## Conversion Labels

| Conversion | Label |
|------------|-------|
| Lead | `GKswCL2sndYbEIjTxqxC` |
| Deposit | `C7qLCMCsndYbEIjTxqxC` |
| Treatment | `6j8qCMOsndYbEIjTxqxC` |

---

## Tasks

### Task 5.1: Create Tracking Documentation

**Event Taxonomy Document:**

Create `docs/EVENT-TAXONOMY.md`:

```markdown
# Teleios Health - Event Taxonomy

## Web Events (Browser-Side)

| Event | Platform | Trigger | Parameters |
|-------|----------|---------|------------|
| page_view | GA4, Meta | All Pages | page_location, page_title |
| PageView | Meta Pixel | All Pages | - |
| ViewContent | Meta Pixel | Therapy Pages | content_name, content_category |
| view_item | GA4 | Therapy Pages | item_name, item_category |
| Lead | Meta Pixel | Form Submit | user_data.* |
| generate_lead | GA4 | Form Submit | form_id, form_name |
| scroll | GA4 | 50%, 75% Scroll | percent_scrolled |
| video_start | GA4 | Video Play | video_title |
| video_progress | GA4 | Video 50% | video_title, video_percent |
| video_complete | GA4 | Video End | video_title |

## Server Events (CAPI)

| Event | Platform | Source | Parameters |
|-------|----------|--------|------------|
| PageView | Meta CAPI | sGTM | user_agent, ip_address, fbp, fbc |
| ViewContent | Meta CAPI | sGTM | content_name, content_category |
| Lead | Meta CAPI | sGTM | em, ph, fn, ln, event_id |

## Offline Events (Webhooks)

| Event | Platform | Trigger | Parameters |
|-------|----------|---------|------------|
| Lead | Meta CAPI | GHL - Lead Qualified | em, ph, fn, ln, external_id |
| CompleteRegistration | Meta CAPI | GHL - Assessment Complete | em, ph, fn, ln |
| Purchase | Meta CAPI | GHL - Deposit Paid | value, currency |
| Purchase | Meta CAPI | GHL - Treatment Complete | value, currency |

## Google Ads Conversions

| Conversion | Label | Trigger |
|------------|-------|---------|
| Lead | GKswCL2sndYbEIjTxqxC | Form Submit |
| Deposit | C7qLCMCsndYbEIjTxqxC | GHL Webhook |
| Treatment | 6j8qCMOsndYbEIjTxqxC | GHL Webhook |
```

**DataLayer Specification Document:**

Create `docs/DATALAYER-SPEC.md`:

```markdown
# Teleios Health - DataLayer Specification

## Standard Page Load
```javascript
window.dataLayer = window.dataLayer || [];
dataLayer.push({
  'event': 'page_view',
  'page_location': window.location.href,
  'page_title': document.title,
  'page_path': window.location.pathname
});
```

## Form Submission
```javascript
dataLayer.push({
  'event': 'form_submit',
  'form_id': 'contact_form',
  'form_name': 'Contact Us',
  'user_data': {
    'email': 'user@example.com',
    'phone': '+11234567890',
    'first_name': 'John',
    'last_name': 'Doe',
    'address': '123 Main St',
    'city': 'Los Angeles',
    'state': 'CA',
    'zip': '90001',
    'country': 'US'
  },
  'event_id': 'uuid-unique-id-here'
});
```

## Required User Data Fields
| Field | Format | Required |
|-------|--------|----------|
| email | lowercase, trimmed | Yes |
| phone | E.164 format (+1...) | Yes |
| first_name | string | Recommended |
| last_name | string | Recommended |
| address | string | Optional |
| city | string | Optional |
| state | 2-letter code | Optional |
| zip | string | Optional |
| country | 2-letter ISO | Optional |
```

**Validation:**
- [ ] EVENT-TAXONOMY.md created
- [ ] DATALAYER-SPEC.md created
- [ ] All events documented
- [ ] All parameters listed

---

### Task 5.2: Build Testing Runbook

Create `docs/TESTING-RUNBOOK.md`:

```markdown
# Teleios Health - Testing Runbook

## Monthly QA Checklist

### Week 1: Browser Tracking
- [ ] Open GTM Preview mode
- [ ] Navigate to teleios.health
- [ ] Verify PageView tags fire
- [ ] Submit test form
- [ ] Verify Lead event fires
- [ ] Check Meta Pixel Helper (green checkmarks)
- [ ] Review GA4 Realtime for events

### Week 2: Server-Side Tracking
- [ ] Check Stape container logs
- [ ] Verify CAPIG events sending
- [ ] Open Meta Events Manager
- [ ] Confirm CAPI events received
- [ ] Check deduplication (no duplicates)
- [ ] Review Event Match Quality scores

### Week 3: Offline Conversions
- [ ] Create test contact in GHL
- [ ] Move through pipeline stages
- [ ] Verify webhooks fire in Stape logs
- [ ] Confirm offline events in Meta
- [ ] Check Google Ads offline conversions

### Week 4: Reporting Review
- [ ] Compare GA4 vs Meta event counts
- [ ] Review conversion attribution
- [ ] Check for data discrepancies
- [ ] Document any issues found

## Debugging Flowcharts

### Tags Not Firing
1. Is GTM container published? → Publish container
2. Are triggers configured? → Check trigger conditions
3. Is tag paused? → Enable tag
4. Console errors? → Fix JavaScript issues
5. Ad blocker active? → Test in incognito

### Meta Events Missing
1. Check Pixel Helper → Should show green
2. Check Events Manager → Look for errors
3. Verify Pixel ID → Should be 912613798381607
4. Check access token → Regenerate if expired
5. Review CAPIG logs → Check for errors

### GA4 Data Missing
1. Check Realtime → Events should appear in seconds
2. Verify Measurement ID → G-CS05KZX2HG
3. Check data stream → Should be active
4. Review tag configuration → Check parameters
5. Wait 24-48 hours → Processing delay

### Webhook Failures
1. Check GHL automation history → Look for errors
2. Verify webhook URL → Test with curl
3. Check Stape logs → Should show requests
4. Verify JSON payload → Check field names
5. Test with static values → Isolate issue
```

**Validation:**
- [ ] TESTING-RUNBOOK.md created
- [ ] Monthly checklist complete
- [ ] Debugging flowcharts included

---

### Task 5.3: Set Up Monitoring

**GA4 Custom Alerts:**

1. Open GA4 → Admin → Custom Definitions
2. Create Intelligence Alerts:

**Alert 1: Event Drop Detection**
```
Name: Lead Events Dropped
Condition: Event count for 'generate_lead' decreases by more than 50%
Period: Day over day
Notify: [admin email]
```

**Alert 2: Traffic Anomaly**
```
Name: Traffic Spike/Drop
Condition: Sessions change by more than 30%
Period: Day over day
Notify: [admin email]
```

**Meta CAPI Health Monitoring:**

1. Open Meta Events Manager
2. Go to Data Sources → Pixel Settings
3. Enable "Event Setup Tool Notifications"
4. Set up alerts for:
   - Event Match Quality drops below 5
   - CAPI connection errors
   - Deduplication issues

**Stape Usage Alerts:**

1. Open Stape Dashboard
2. Go to Container → Settings → Notifications
3. Configure alerts for:
   - Request limit approaching (80%)
   - Error rate exceeds 5%
   - Container downtime

**Create Monitoring Dashboard:**

Create `docs/MONITORING-DASHBOARD.md`:

```markdown
# Teleios Health - Monitoring Dashboard

## Daily Checks
| Platform | Metric | Threshold | Check URL |
|----------|--------|-----------|-----------|
| GA4 | Sessions | > 0 | [GA4 Realtime] |
| Meta | Events | > 0 | [Events Manager] |
| Stape | Requests | < 80% limit | [Stape Dashboard] |

## Weekly Reviews
| Metric | Target | Location |
|--------|--------|----------|
| EMQ Score | 7+ | Meta Events Manager |
| Conversion Rate | Baseline +/- 20% | Google Ads |
| GA4 vs Meta Variance | < 10% | Manual comparison |

## Alert Contacts
| Type | Contact |
|------|---------|
| Primary | [admin email] |
| Backup | [backup email] |
| Escalation | [manager email] |
```

**Validation:**
- [ ] GA4 alerts configured
- [ ] Meta notifications enabled
- [ ] Stape alerts set up
- [ ] MONITORING-DASHBOARD.md created

---

### Task 5.4: Knowledge Transfer

**Create Walkthrough Video (Recommended Topics):**

1. **GTM Overview (5 min)**
   - Container structure
   - Key tags and triggers
   - How to make changes

2. **Testing Procedures (5 min)**
   - GTM Preview mode
   - Meta Pixel Helper
   - GA4 DebugView

3. **Common Issues (5 min)**
   - Tag not firing
   - Events missing
   - Data discrepancies

4. **GHL Webhooks (5 min)**
   - Automation structure
   - How to modify payloads
   - Testing webhooks

**Create Maintenance SOP:**

Create `docs/MAINTENANCE-SOP.md`:

```markdown
# Teleios Health - Maintenance Standard Operating Procedures

## Weekly Tasks
1. Check GA4 Realtime for active events
2. Review Meta Events Manager for errors
3. Verify Stape container is running

## Monthly Tasks
1. Run full testing runbook
2. Review EMQ scores
3. Check conversion counts match CRM
4. Update documentation if changes made

## Quarterly Tasks
1. Audit all tags for relevance
2. Review and clean up unused triggers
3. Check for GTM template updates
4. Verify access permissions

## Change Management
1. All changes made in GTM workspace first
2. Test in Preview mode before publishing
3. Document changes in version notes
4. Publish during low-traffic hours
5. Monitor for 24 hours after publish

## Emergency Procedures
### Tracking Completely Down
1. Check Webflow site is live
2. Verify GTM snippet present
3. Check Stape container status
4. Contact support if unresolved

### Data Discrepancy Detected
1. Document the discrepancy
2. Check for recent changes
3. Compare raw data sources
4. Escalate if significant (>20%)

## Support Contacts
- GTM/Stape: [support@stape.io]
- Meta Business: [Meta Business Help Center]
- Google Ads: [Google Ads Support]
- GA4: [Google Analytics Help]
```

**Common Issues Document:**

Create `docs/COMMON-ISSUES.md`:

```markdown
# Teleios Health - Common Issues & Solutions

## Issue: Form submissions not tracking
**Symptoms:** No Lead events in GA4 or Meta
**Cause:** DataLayer script not loading
**Solution:**
1. Verify script is in Webflow custom code
2. Check for JavaScript errors in console
3. Confirm form field names match script
4. Test with console.log(dataLayer)

## Issue: Meta events showing duplicate
**Symptoms:** Same event appears twice in Events Manager
**Cause:** Browser and server events both firing without deduplication
**Solution:**
1. Verify event_id is passed from web to server
2. Check event_id format matches
3. Confirm deduplication is within 48 hours

## Issue: EMQ score dropped
**Symptoms:** Match quality below 5
**Cause:** User data not passing correctly
**Solution:**
1. Check form captures all user data
2. Verify data formatting (lowercase email)
3. Confirm fbp/fbc cookies are passing
4. Add external_id for better matching

## Issue: Webhook not received
**Symptoms:** GHL stage changes don't trigger events
**Cause:** Automation or webhook configuration issue
**Solution:**
1. Check GHL automation is published
2. Verify webhook URL is correct
3. Test webhook with curl command
4. Check Stape logs for incoming requests

## Issue: Google Ads conversions delayed
**Symptoms:** Conversions not showing in Google Ads
**Cause:** Normal processing delay
**Solution:**
1. Wait 24-48 hours (normal delay)
2. Verify conversion tag is firing
3. Check Google Ads conversion status
4. Contact support if >72 hours
```

**Validation:**
- [ ] Video walkthrough recorded (or script prepared)
- [ ] MAINTENANCE-SOP.md created
- [ ] COMMON-ISSUES.md created
- [ ] All documentation in docs/ folder

---

## Deliverables

| Deliverable | Status |
|-------------|--------|
| Event Taxonomy documentation | ⏳ |
| DataLayer specification | ⏳ |
| Testing Runbook | ⏳ |
| Monitoring Dashboard setup | ⏳ |
| Maintenance SOP | ⏳ |
| Common Issues guide | ⏳ |
| Knowledge transfer materials | ⏳ |

---

## Completion Criteria

Phase 5 is complete when:
- [ ] All documentation created in docs/ folder
- [ ] Monitoring alerts configured
- [ ] Testing runbook validated
- [ ] Knowledge transfer complete
- [ ] Handoff meeting conducted (if applicable)

---

## Final Checklist

### All Phases Complete
- [ ] Phase 1: Web GTM published and validated
- [ ] Phase 2: sGTM + CAPIG operational
- [ ] Phase 3: GHL webhooks firing
- [ ] Phase 4: Enhanced tracking live
- [ ] Phase 5: Documentation complete

### Tracking Verification
- [ ] Browser events firing (PageView, Lead)
- [ ] Server events flowing (CAPI)
- [ ] Offline conversions working (Webhooks)
- [ ] EMQ scores at target (7+)
- [ ] No console errors on site

### Documentation Complete
- [ ] Event taxonomy documented
- [ ] DataLayer spec finalized
- [ ] Testing procedures documented
- [ ] Monitoring set up
- [ ] Team trained

---

## Handoff Summary

**Project:** Teleios Health Tracking Implementation

**Scope Completed:**
1. Web GTM container with 21 tags, 14 triggers, 18 variables
2. Server GTM with Stape CAPIG integration
3. Meta Conversions API with deduplication
4. GA4 enhanced measurement
5. Google Ads conversion tracking with Enhanced Conversions
6. GoHighLevel offline conversion webhooks
7. Full documentation suite

**Ongoing Maintenance Required:**
- Weekly: Quick health check
- Monthly: Full testing runbook
- Quarterly: Tag audit and cleanup

**Key Contacts:**
- Technical questions: [Your contact]
- Platform support: Listed in documentation

**Project Complete!**
