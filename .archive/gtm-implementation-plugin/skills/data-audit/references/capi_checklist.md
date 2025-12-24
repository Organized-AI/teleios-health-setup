# CAPI Implementation Checklist

## Pre-Implementation

### Access Requirements
- [ ] Meta Business Manager admin
- [ ] Events Manager access
- [ ] Meta Pixel ID: _______________
- [ ] CRM admin access
- [ ] DNS management access

### Information Gathering
- [ ] Current pixel ID
- [ ] Ad account ID: act_____________
- [ ] CRM type and version
- [ ] Current match quality: ___/10
- [ ] Key CRM events to track

---

## Phase 1: Infrastructure

### Stape Container
- [ ] Create Stape account
- [ ] Select Europe zone (GDPR)
- [ ] Choose subscription plan
- [ ] Complete setup

### Custom Domain
- [ ] Choose domain: tracking.[domain].com
- [ ] Add CNAME record in DNS
- [ ] Wait for DNS propagation
- [ ] Verify domain connection

### Meta CAPI Credentials
- [ ] Navigate to Events Manager
- [ ] Go to Settings -> Conversions API
- [ ] Generate access token
- [ ] Document token: _______________
- [ ] Configure permissions

---

## Phase 2: CAPI Configuration

### Enhanced Matching
- [ ] Email (em) - REQUIRED
- [ ] Phone (ph) - REQUIRED
- [ ] External ID (external_id) - REQUIRED
- [ ] First name (fn) - Recommended
- [ ] Last name (ln) - Recommended
- [ ] City/State/Zip - Recommended

### Event Deduplication
- [ ] Configure event_id parameter
- [ ] Set up browser pixel event_id
- [ ] Configure server CAPI event_id
- [ ] Test deduplication logic

---

## Phase 3: CRM Integration

### Webhook Configuration
- [ ] Create webhook endpoint in Stape
- [ ] Configure webhook URL in CRM
- [ ] Set up authentication
- [ ] Test connectivity

### Event Mapping
Map CRM events to Meta events:

| CRM Event | Meta Event | Priority |
|-----------|------------|----------|
| Form submit | Lead | HIGH |
| Appointment | Schedule | HIGH |
| Payment | Purchase | HIGH |
| Deal closed | Purchase | HIGH |

---

## Phase 4: Testing

### Test Event Flow
- [ ] Send test event from CRM
- [ ] Verify in Stape logs
- [ ] Check Meta Events Manager
- [ ] Validate parameters

### Browser Pixel Integration
- [ ] Update pixel code with enhanced matching
- [ ] Test pixel firing
- [ ] Verify parameters sending
- [ ] Confirm event_id consistency

### Deduplication Testing
- [ ] Trigger same event from browser AND server
- [ ] Check Events Manager for duplicate
- [ ] Verify only ONE event recorded
- [ ] Test across event types

### Match Quality
- [ ] Check initial score
- [ ] Target: 7.0+
- [ ] Document baseline: ___/10
- [ ] Monitor improvement over 7 days

---

## Phase 5: Production

### Go-Live
- [ ] All tests validated
- [ ] Deduplication confirmed
- [ ] Enhanced matching verified
- [ ] CRM webhooks stable
- [ ] DNS propagated
- [ ] Backup plan documented

### Monitoring
- [ ] Stape dashboard configured
- [ ] Meta alerts configured
- [ ] Daily volume checks scheduled
- [ ] Match quality monitoring scheduled

---

## Week 1: Validation

- [ ] Day 1: Verify events flowing (hourly checks)
- [ ] Day 2: Validate event volumes
- [ ] Day 3: Check match quality improvement
- [ ] Day 5: Verify deduplication working
- [ ] Day 7: Compare pixel vs. CAPI+Pixel

**Expected:**
- Event volume: +30-40%
- Match quality: 6.0+
- Deduplication: >95%

---

## Ongoing Maintenance

### Daily
- [ ] Check event volume
- [ ] Monitor container health
- [ ] Review error logs

### Weekly
- [ ] Review match quality trends
- [ ] Check deduplication rates
- [ ] Validate revenue tracking

### Monthly
- [ ] Full system health check
- [ ] Token expiration review
- [ ] Performance vs. baseline

---

## Troubleshooting

### Events Not Appearing
1. Check Stape logs
2. Verify CAPI access token
3. Check pixel ID correctness
4. Review event name formatting

### Low Match Quality (<5.0)
1. Add more enhanced parameters
2. Verify email/phone hashing
3. Check external_id consistency
4. Review CRM data quality

### Duplicate Events
1. Verify event_id consistency
2. Check timing of pixel vs. CAPI
3. Review deduplication settings
4. Validate parameter matching

### Missing Revenue
1. Verify value parameter in webhook
2. Check currency format
3. Validate data type (number)
4. Review CRM field mapping

---

## Success Metrics (30 Days)

- [ ] Event volume: +30-40%
- [ ] Match quality: 7.0+
- [ ] Deduplication: >95%
- [ ] Revenue tracking: 100%
- [ ] CRM events visible: 100%
- [ ] System uptime: 99.5%+

---

## Sign-Off

- [ ] Technical Lead: ___________ Date: _______
- [ ] CRM Admin: ___________ Date: _______
- [ ] Meta Ads Manager: ___________ Date: _______

**Status:** [ ] Complete
**Go-Live:** ___/___/___
**30-Day Review:** ___/___/___
