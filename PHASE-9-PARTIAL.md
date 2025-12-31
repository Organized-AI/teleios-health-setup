# Phase 9 Partial: Programmatic Testing

**Date:** December 31, 2024
**Status:** PARTIAL - Programmatic tests complete, manual testing pending

---

## Summary

This phase documents the programmatic testing of the Teleios Health GTM implementation. Tests verify DNS configuration, endpoint availability, and webhook functionality.

---

## Test Results

### 1. DNS Resolution

| Test | Result | Status |
|------|--------|--------|
| CNAME Resolution | sst.teleios.health → xoxfuunr.usa.stape.io | PASS |
| SSL Certificate | Valid, auto-provisioned | PASS |
| Health Endpoint | HTTP 200 OK | PASS |

**Evidence:**
```
$ curl -I https://sst.teleios.health/healthy
HTTP/1.1 200 OK
date: Wed, 31 Dec 2025 15:15:03 GMT
server: envoy
```

---

### 2. sGTM Container Status

| Check | Result |
|-------|--------|
| Container Accessible | Yes |
| Root Endpoint | Returns 400 (expected - no handler) |
| Health Endpoint | Returns 200 |

---

### 3. Webhook Endpoint Tests

Tested the `/webhook` endpoint with all 4 event types:

| Event | Endpoint | HTTP Status | Notes |
|-------|----------|-------------|-------|
| lead_qualified | /webhook | 400 | Webhook handler not yet configured |
| assessment_complete | /webhook | 400 | Webhook handler not yet configured |
| deposit_paid | /webhook | 400 | Webhook handler not yet configured |
| treatment_complete | /webhook | 400 | Webhook handler not yet configured |

**Note:** HTTP 400 responses are expected because:
1. GTM containers are not yet published (Phase 5 pending)
2. Webhook Client tags need to be configured in sGTM
3. GHL webhook integration not yet complete (Phase 7-8)

**Test Commands Used:**
```bash
# lead_qualified
curl -X POST "https://sst.teleios.health/webhook" \
  -H "Content-Type: application/json" \
  -d '{"event_name":"lead_qualified","event_time":1735657503,"user_data":{"email_address":"test-phase9@example.com","phone_number":"+15551234567","address":{"first_name":"Test","last_name":"Phase9","country":"US"}},"custom_data":{"therapy_type":"exosome_therapy","value":0,"currency":"USD"}}'

# assessment_complete
curl -X POST "https://sst.teleios.health/webhook" \
  -H "Content-Type: application/json" \
  -d '{"event_name":"assessment_complete","event_time":1735657503,"user_data":{"email_address":"test-phase9@example.com","phone_number":"+15551234567","address":{"first_name":"Test","last_name":"Phase9","country":"US"}},"custom_data":{"therapy_type":"exosome_therapy","value":500,"currency":"USD"}}'

# deposit_paid
curl -X POST "https://sst.teleios.health/webhook" \
  -H "Content-Type: application/json" \
  -d '{"event_name":"deposit_paid","event_time":1735657503,"user_data":{"email_address":"test-phase9@example.com","phone_number":"+15551234567","address":{"first_name":"Test","last_name":"Phase9","country":"US"}},"custom_data":{"therapy_type":"gene_therapy","value":5000,"currency":"USD"}}'

# treatment_complete
curl -X POST "https://sst.teleios.health/webhook" \
  -H "Content-Type: application/json" \
  -d '{"event_name":"treatment_complete","event_time":1735657503,"user_data":{"email_address":"test-phase9@example.com","phone_number":"+15551234567","address":{"first_name":"Test","last_name":"Phase9","country":"US"}},"custom_data":{"therapy_type":"gene_therapy","value":37500,"currency":"USD"}}'
```

---

### 4. CAPIG Endpoint Tests

| Test | Result |
|------|--------|
| CAPIG Lead | 404 - Not configured |
| CAPIG Purchase | 404 - Not configured |

**Note:** CAPIG requires Stape account configuration linking the pixel to the CAPIG service.

---

## Pending Manual Testing

### GHL Integration (Phase 7-8)
- [ ] Custom fields created in GHL
- [ ] Webhook endpoints configured in GHL
- [ ] Test lead submission flow

### Browser Testing
- [ ] Meta Pixel Helper verification
- [ ] GA4 DebugView validation
- [ ] GTM Preview mode testing
- [ ] Form submission tracking
- [ ] PageView event verification

### Meta Events Manager
- [ ] Events appearing in Events Manager
- [ ] Event Match Quality scores
- [ ] Deduplication working

### GA4 Real-time Reports
- [ ] Events streaming correctly
- [ ] Custom parameters visible
- [ ] No duplicate events

---

## Prerequisites for Full Testing

1. **GTM Containers Published (Phase 5)**
   - sGTM: GTM-MLBJCV38 (Account 6328225355, Container 237556533)
   - Web GTM: GTM-WM5S3WSG (Account 6328225355, Container 237555513)

2. **GHL Configuration (Phase 7-8)**
   - Custom fields for tracking data
   - Webhook endpoints pointing to sst.teleios.health

3. **Stape CAPIG Setup**
   - CAPIG enabled for Pixel 912613798381607
   - Access token configured

---

## Summary

| Category | Status | Completion |
|----------|--------|------------|
| DNS Configuration | PASS | 100% |
| SSL/TLS | PASS | 100% |
| Container Accessibility | PASS | 100% |
| Webhook Handlers | PENDING | 0% |
| CAPIG Integration | PENDING | 0% |
| Browser Testing | PENDING | 0% |
| GHL Webhooks | PENDING | 0% |

**Overall Programmatic Testing:** 40% Complete
**Blocking Items:** GTM Container Publication (Phase 5)

---

## Next Steps

1. Complete Phase 5 (Publish GTM Containers)
2. Complete Phase 7 (GHL Custom Fields)
3. Complete Phase 8 (GHL Webhooks)
4. Re-run webhook tests
5. Perform browser-based testing
6. Verify in Meta Events Manager
