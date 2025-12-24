# Phase 3 Complete: Offline Conversion Webhooks

**Date Completed:** December 24, 2024
**Status:** Configuration Ready for Implementation

---

## Summary

Phase 3 provides complete configurations for connecting GoHighLevel CRM pipeline stages to server-side GTM for offline conversion tracking via webhooks.

---

## Account Reference

| Platform | ID |
|----------|-----|
| Server GTM Container | `GTM-MLBJCV38` |
| Stape Container | `nsawsbpg` |
| Stape Webhook URL | `https://nsawsbpg.stape.io/webhook` |
| Meta Pixel | `912613798381607` |
| Google Ads Conversion ID | `17810172296` |

### Google Ads Conversion Labels

| Conversion | Label | Event |
|------------|-------|-------|
| Lead | `GKswCL2sndYbEIjTxqxC` | lead_qualified |
| Deposit | `C7qLCMCsndYbEIjTxqxC` | deposit_paid |
| Treatment | `6j8qCMOsndYbEIjTxqxC` | treatment_complete |

---

## Deliverable 1: Webhook Client Configuration

### sGTM Webhook Client Setup

```
Client Name: Webhook - GoHighLevel
Client Type: HTTP Request (or Webhook from Gallery)

Configuration:
├── Request Path: /webhook
├── Request Methods: POST
├── Parse Request Body: JSON
└── Claim Requests: Yes

Event Name Configuration:
├── Event Name Source: Request Body Key
├── Event Name Key: event_name
└── Fallback Event Name: webhook_event

Headers to Extract:
├── Content-Type: application/json
└── Authorization: (optional, for security)
```

### Alternative: HTTP Client Configuration

If Webhook client not available, use HTTP Request client:

```
Client Name: HTTP - Webhook Handler
Client Type: HTTP Request

Configuration:
├── Allowed Paths: /webhook
├── Parse JSON Body: Yes
├── Allowed Methods: POST
└── Response: 200 OK
```

---

## Deliverable 2: Webhook Triggers

### Trigger 1: Webhook - Lead Qualified

```
Trigger Name: Webhook - Lead Qualified
Trigger Type: Custom

Conditions:
├── Client Name equals "Webhook - GoHighLevel"
└── event_name equals "lead_qualified"
```

### Trigger 2: Webhook - Assessment Complete

```
Trigger Name: Webhook - Assessment Complete
Trigger Type: Custom

Conditions:
├── Client Name equals "Webhook - GoHighLevel"
└── event_name equals "assessment_complete"
```

### Trigger 3: Webhook - Deposit Paid

```
Trigger Name: Webhook - Deposit Paid
Trigger Type: Custom

Conditions:
├── Client Name equals "Webhook - GoHighLevel"
└── event_name equals "deposit_paid"
```

### Trigger 4: Webhook - Treatment Complete

```
Trigger Name: Webhook - Treatment Complete
Trigger Type: Custom

Conditions:
├── Client Name equals "Webhook - GoHighLevel"
└── event_name equals "treatment_complete"
```

---

## Deliverable 3: JSON Payload Templates

### Payload 1: Lead Qualified

```json
{
  "event_name": "lead_qualified",
  "timestamp": "{{current_timestamp}}",
  "contact_id": "{{contact.id}}",
  "email": "{{contact.email}}",
  "phone": "{{contact.phone}}",
  "first_name": "{{contact.firstName}}",
  "last_name": "{{contact.lastName}}",
  "fbp": "{{contact.customField.fbp}}",
  "fbc": "{{contact.customField.fbc}}",
  "lead_source": "{{contact.source}}",
  "pipeline": "{{pipeline.name}}",
  "stage": "Qualified"
}
```

### Payload 2: Assessment Complete

```json
{
  "event_name": "assessment_complete",
  "timestamp": "{{current_timestamp}}",
  "contact_id": "{{contact.id}}",
  "email": "{{contact.email}}",
  "phone": "{{contact.phone}}",
  "first_name": "{{contact.firstName}}",
  "last_name": "{{contact.lastName}}",
  "fbp": "{{contact.customField.fbp}}",
  "fbc": "{{contact.customField.fbc}}",
  "assessment_type": "{{appointment.appointmentType}}",
  "pipeline": "{{pipeline.name}}",
  "stage": "Assessment Complete"
}
```

### Payload 3: Deposit Paid

```json
{
  "event_name": "deposit_paid",
  "timestamp": "{{current_timestamp}}",
  "contact_id": "{{contact.id}}",
  "email": "{{contact.email}}",
  "phone": "{{contact.phone}}",
  "first_name": "{{contact.firstName}}",
  "last_name": "{{contact.lastName}}",
  "fbp": "{{contact.customField.fbp}}",
  "fbc": "{{contact.customField.fbc}}",
  "deposit_amount": "{{opportunity.monetaryValue}}",
  "currency": "USD",
  "payment_method": "{{payment.method}}",
  "pipeline": "{{pipeline.name}}",
  "stage": "Deposit Paid"
}
```

### Payload 4: Treatment Complete

```json
{
  "event_name": "treatment_complete",
  "timestamp": "{{current_timestamp}}",
  "contact_id": "{{contact.id}}",
  "email": "{{contact.email}}",
  "phone": "{{contact.phone}}",
  "first_name": "{{contact.firstName}}",
  "last_name": "{{contact.lastName}}",
  "fbp": "{{contact.customField.fbp}}",
  "fbc": "{{contact.customField.fbc}}",
  "treatment_value": "{{opportunity.monetaryValue}}",
  "currency": "USD",
  "treatment_type": "{{opportunity.name}}",
  "pipeline": "{{pipeline.name}}",
  "stage": "Treatment Complete"
}
```

---

## Deliverable 4: Offline CAPIG Tag Configurations

### CAPIG - Lead Qualified (Offline)

```
Tag Name: CAPIG - Lead Qualified (Offline)
Tag Type: Stape CAPIG

Event Configuration:
├── Event Name: Lead
├── Action Source: system_generated  ← CRITICAL: Must be system_generated for offline
└── Event ID: {{Webhook - contact_id}}-lead-{{Webhook - timestamp}}

Pixel Configuration:
├── Pixel ID: 912613798381607
└── Access Token: {{Constant - Meta CAPI Token}}

User Data Mapping:
├── em (email): {{Webhook - email}}
├── ph (phone): {{Webhook - phone}}
├── fn (first_name): {{Webhook - first_name}}
├── ln (last_name): {{Webhook - last_name}}
├── external_id: {{Webhook - contact_id}}
├── fbc: {{Webhook - fbc}}
└── fbp: {{Webhook - fbp}}

Event Data:
├── event_time: {{Webhook - timestamp}}
├── event_source_url: https://teleios.health
└── content_name: Lead Qualified

Trigger: Webhook - Lead Qualified
```

### CAPIG - CompleteRegistration (Assessment)

```
Tag Name: CAPIG - CompleteRegistration (Assessment)
Tag Type: Stape CAPIG

Event Configuration:
├── Event Name: CompleteRegistration
├── Action Source: system_generated
└── Event ID: {{Webhook - contact_id}}-assessment-{{Webhook - timestamp}}

Pixel Configuration:
├── Pixel ID: 912613798381607
└── Access Token: {{Constant - Meta CAPI Token}}

User Data Mapping:
├── em: {{Webhook - email}}
├── ph: {{Webhook - phone}}
├── fn: {{Webhook - first_name}}
├── ln: {{Webhook - last_name}}
├── external_id: {{Webhook - contact_id}}
├── fbc: {{Webhook - fbc}}
└── fbp: {{Webhook - fbp}}

Event Data:
├── event_time: {{Webhook - timestamp}}
├── event_source_url: https://teleios.health
└── content_name: Assessment Complete

Trigger: Webhook - Assessment Complete
```

### CAPIG - Purchase (Deposit)

```
Tag Name: CAPIG - Purchase (Deposit)
Tag Type: Stape CAPIG

Event Configuration:
├── Event Name: Purchase
├── Action Source: system_generated
└── Event ID: {{Webhook - contact_id}}-deposit-{{Webhook - timestamp}}

Pixel Configuration:
├── Pixel ID: 912613798381607
└── Access Token: {{Constant - Meta CAPI Token}}

User Data Mapping:
├── em: {{Webhook - email}}
├── ph: {{Webhook - phone}}
├── fn: {{Webhook - first_name}}
├── ln: {{Webhook - last_name}}
├── external_id: {{Webhook - contact_id}}
├── fbc: {{Webhook - fbc}}
└── fbp: {{Webhook - fbp}}

Event Data:
├── event_time: {{Webhook - timestamp}}
├── event_source_url: https://teleios.health
├── value: {{Webhook - deposit_amount}}
├── currency: USD
└── content_name: Deposit Payment

Trigger: Webhook - Deposit Paid
```

### CAPIG - Purchase (Treatment)

```
Tag Name: CAPIG - Purchase (Treatment)
Tag Type: Stape CAPIG

Event Configuration:
├── Event Name: Purchase
├── Action Source: system_generated
└── Event ID: {{Webhook - contact_id}}-treatment-{{Webhook - timestamp}}

Pixel Configuration:
├── Pixel ID: 912613798381607
└── Access Token: {{Constant - Meta CAPI Token}}

User Data Mapping:
├── em: {{Webhook - email}}
├── ph: {{Webhook - phone}}
├── fn: {{Webhook - first_name}}
├── ln: {{Webhook - last_name}}
├── external_id: {{Webhook - contact_id}}
├── fbc: {{Webhook - fbc}}
└── fbp: {{Webhook - fbp}}

Event Data:
├── event_time: {{Webhook - timestamp}}
├── event_source_url: https://teleios.health
├── value: {{Webhook - treatment_value}}
├── currency: USD
└── content_name: Treatment Complete

Trigger: Webhook - Treatment Complete
```

---

## Deliverable 5: Webhook Variables for sGTM

### Variable Definitions

| Variable Name | Type | Path | Purpose |
|---------------|------|------|---------|
| Webhook - email | Event Data | `email` | User email for matching |
| Webhook - phone | Event Data | `phone` | User phone for matching |
| Webhook - first_name | Event Data | `first_name` | User first name |
| Webhook - last_name | Event Data | `last_name` | User last name |
| Webhook - contact_id | Event Data | `contact_id` | GHL contact ID (external_id) |
| Webhook - timestamp | Event Data | `timestamp` | Event timestamp (Unix) |
| Webhook - deposit_amount | Event Data | `deposit_amount` | Deposit value |
| Webhook - treatment_value | Event Data | `treatment_value` | Treatment value |
| Webhook - fbp | Event Data | `fbp` | Facebook Browser ID |
| Webhook - fbc | Event Data | `fbc` | Facebook Click ID |

---

## Deliverable 6: GoHighLevel Automation Setup

### Automation 1: Lead Qualified Webhook

**Step-by-Step Setup:**

1. Navigate to GHL → Automations → Create Workflow
2. **Trigger:**
   - Type: Pipeline Stage Change
   - Pipeline: [Your Sales Pipeline]
   - Stage: Qualified
   - Filter: All contacts

3. **Action:**
   - Type: Webhook
   - Name: Send to Stape - Lead Qualified

4. **Webhook Configuration:**
   ```
   URL: https://nsawsbpg.stape.io/webhook
   Method: POST
   Headers:
     Content-Type: application/json

   Body: (see JSON payload template above)
   ```

5. Save and Activate

### Automation 2: Assessment Complete Webhook

1. **Trigger:**
   - Type: Pipeline Stage Change
   - Pipeline: [Your Sales Pipeline]
   - Stage: Assessment Complete

2. **Action:**
   - Type: Webhook
   - URL: `https://nsawsbpg.stape.io/webhook`
   - Method: POST
   - Body: (see JSON payload template above)

### Automation 3: Deposit Paid Webhook

1. **Trigger:**
   - Type: Pipeline Stage Change
   - Pipeline: [Your Sales Pipeline]
   - Stage: Deposit Paid

2. **Action:**
   - Type: Webhook
   - URL: `https://nsawsbpg.stape.io/webhook`
   - Method: POST
   - Body: (see JSON payload template above)

### Automation 4: Treatment Complete Webhook

1. **Trigger:**
   - Type: Pipeline Stage Change
   - Pipeline: [Your Sales Pipeline]
   - Stage: Treatment Complete

2. **Action:**
   - Type: Webhook
   - URL: `https://nsawsbpg.stape.io/webhook`
   - Method: POST
   - Body: (see JSON payload template above)

---

## GHL Custom Fields Setup

### Required Custom Fields

Create these custom fields in GoHighLevel to capture Meta attribution cookies:

1. **Navigate to:** Settings → Custom Fields
2. **Create Fields:**

| Field Name | Field Key | Type | Description |
|------------|-----------|------|-------------|
| Facebook Browser ID | `fbp` | Text | Stores _fbp cookie value |
| Facebook Click ID | `fbc` | Text | Stores _fbc cookie value |

### Form Integration Script Update

Update the Webflow form tracking script to send Meta cookies to GHL:

```html
<script>
/**
 * Extended Form Tracking - Captures Meta cookies for GHL
 */
(function() {
  function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length === 2) return parts.pop().split(";").shift();
    return '';
  }

  document.addEventListener('DOMContentLoaded', function() {
    var forms = document.querySelectorAll('form');

    forms.forEach(function(form) {
      // Create hidden fields for Meta cookies
      var fbpInput = document.createElement('input');
      fbpInput.type = 'hidden';
      fbpInput.name = 'fbp';
      fbpInput.id = 'fbp';
      fbpInput.value = getCookie('_fbp') || '';
      form.appendChild(fbpInput);

      var fbcInput = document.createElement('input');
      fbcInput.type = 'hidden';
      fbcInput.name = 'fbc';
      fbcInput.id = 'fbc';
      fbcInput.value = getCookie('_fbc') || '';
      form.appendChild(fbcInput);

      // Update values on form submit in case cookies changed
      form.addEventListener('submit', function() {
        document.getElementById('fbp').value = getCookie('_fbp') || '';
        document.getElementById('fbc').value = getCookie('_fbc') || '';
      });
    });
  });
})();
</script>
```

---

## Testing Checklist

### Pre-Testing Setup

| Task | Status |
|------|--------|
| Webhook Client created in sGTM | ⏳ |
| All 4 webhook triggers created | ⏳ |
| All 4 CAPIG offline tags created | ⏳ |
| All webhook variables created | ⏳ |
| sGTM container published | ⏳ |
| GHL custom fields created (fbp, fbc) | ⏳ |
| All 4 GHL automations created | ⏳ |
| GHL automations activated | ⏳ |

### Test Webhook Delivery

**Manual cURL Test:**
```bash
curl -X POST https://nsawsbpg.stape.io/webhook \
  -H "Content-Type: application/json" \
  -d '{
    "event_name": "lead_qualified",
    "timestamp": 1703433600,
    "contact_id": "test_12345",
    "email": "test@teleios.health",
    "phone": "+11234567890",
    "first_name": "Test",
    "last_name": "User"
  }'
```

**Expected Response:** 200 OK

### Test Contact Flow

| Step | Action | Verification | Status |
|------|--------|--------------|--------|
| 1 | Create test contact in GHL | Contact created with email, phone | ⏳ |
| 2 | Add to sales pipeline | Contact in "New" stage | ⏳ |
| 3 | Move to "Qualified" stage | Webhook fires | ⏳ |
| 4 | Check Stape logs | lead_qualified event received | ⏳ |
| 5 | Check Meta Events Manager | Lead event (system_generated) | ⏳ |
| 6 | Move to "Assessment Complete" | CompleteRegistration event | ⏳ |
| 7 | Move to "Deposit Paid" | Purchase event with value | ⏳ |
| 8 | Move to "Treatment Complete" | Purchase event with value | ⏳ |

### Meta Events Manager Verification

| Event | Expected Source | Expected Parameters | Status |
|-------|-----------------|---------------------|--------|
| Lead | system_generated | em, ph, fn, ln, external_id | ⏳ |
| CompleteRegistration | system_generated | em, ph, content_name | ⏳ |
| Purchase (Deposit) | system_generated | em, ph, value, currency | ⏳ |
| Purchase (Treatment) | system_generated | em, ph, value, currency | ⏳ |

### GHL Automation Execution Check

| Automation | Trigger Stage | Expected Outcome | Status |
|------------|---------------|------------------|--------|
| Lead Qualified | Qualified | Webhook sent to Stape | ⏳ |
| Assessment Complete | Assessment Complete | Webhook sent to Stape | ⏳ |
| Deposit Paid | Deposit Paid | Webhook sent to Stape | ⏳ |
| Treatment Complete | Treatment Complete | Webhook sent to Stape | ⏳ |

---

## Event Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                    GOHIGHLEVEL CRM                               │
│                                                                  │
│  ┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐  │
│  │   New    │───▶│ Qualified│───▶│Assessment│───▶│ Deposit  │  │
│  │          │    │          │    │ Complete │    │  Paid    │  │
│  └──────────┘    └────┬─────┘    └────┬─────┘    └────┬─────┘  │
│                       │               │               │         │
│                       ▼               ▼               ▼         │
│                  Automation      Automation      Automation     │
│                   Webhook         Webhook         Webhook       │
│                                                                  │
│  ┌──────────┐                                                   │
│  │Treatment │                                                   │
│  │ Complete │                                                   │
│  └────┬─────┘                                                   │
│       │                                                          │
│       ▼                                                          │
│  Automation                                                      │
│   Webhook                                                        │
└───────┼─────────────────────────────────────────────────────────┘
        │
        │ POST JSON payload
        ▼
┌───────────────────────────────────────────────────────────────────┐
│                 STAPE sGTM CONTAINER                              │
│                 nsawsbpg.stape.io/webhook                         │
│                                                                   │
│  Webhook Client                                                   │
│  └── Parses JSON → event_name = lead_qualified                   │
│      └── Triggers: Webhook - Lead Qualified                      │
│          └── Fires: CAPIG - Lead (Offline)                       │
│                                                                   │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │ CAPIG Tags (action_source: system_generated)               │  │
│  │ ├── CAPIG - Lead Qualified (Offline)                       │  │
│  │ ├── CAPIG - CompleteRegistration (Assessment)              │  │
│  │ ├── CAPIG - Purchase (Deposit)                             │  │
│  │ └── CAPIG - Purchase (Treatment)                           │  │
│  └────────────────────────────────────────────────────────────┘  │
└───────────────────────────────────────────────────────────────────┘
        │
        │ Server-to-Server
        ▼
┌───────────────────────────────────────────────────────────────────┐
│                    META CONVERSIONS API                           │
│                                                                   │
│  Pixel: 912613798381607                                          │
│  Ad Account: act_1544406343374527                                │
│                                                                   │
│  Received Events:                                                │
│  ├── Lead (system_generated) - from pipeline Qualified          │
│  ├── CompleteRegistration (system_generated) - from Assessment  │
│  ├── Purchase (system_generated) - Deposit with $value          │
│  └── Purchase (system_generated) - Treatment with $value        │
│                                                                   │
│  Attribution: Matched to ad clicks via external_id, email, phone │
└───────────────────────────────────────────────────────────────────┘
```

---

## Troubleshooting

### Webhook Not Received in sGTM

**Check 1: Stape Container Status**
- Verify container is running in Stape dashboard
- Check container URL is correct: `https://nsawsbpg.stape.io`

**Check 2: Webhook URL**
- Ensure path is `/webhook`
- Full URL: `https://nsawsbpg.stape.io/webhook`

**Check 3: GHL Automation**
- Check automation execution history in GHL
- Verify trigger conditions match pipeline stage names exactly

**Check 4: Test with cURL**
```bash
curl -X POST https://nsawsbpg.stape.io/webhook \
  -H "Content-Type: application/json" \
  -d '{"event_name":"test","email":"test@test.com"}'
```

### Events Not Appearing in Meta

**Check 1: Action Source**
- MUST be `system_generated` for offline events
- Not `website` (that's for browser-forwarded events)

**Check 2: Access Token**
- Verify token is valid and not expired
- Check token has correct permissions

**Check 3: Timestamp Format**
- Must be Unix timestamp (seconds since epoch)
- Example: `1703433600` not `2024-12-24T12:00:00Z`

### Wrong Event Data

**Check 1: GHL Merge Fields**
- Verify merge field syntax: `{{contact.email}}`
- Check field names match GHL exactly

**Check 2: Custom Fields**
- Ensure fbp/fbc custom fields exist in GHL
- Verify form is capturing and storing cookie values

**Check 3: Test with Static Values**
- First test with hardcoded values
- Then add merge fields one by one

### Value Not Tracking

**Check 1: Data Type**
- Value must be a number, not string
- Use `"value": 500` not `"value": "$500"`

**Check 2: Currency**
- Always include currency: `"currency": "USD"`

**Check 3: GHL Opportunity Value**
- Verify `monetaryValue` field is populated in GHL
- Check opportunity is linked to contact

---

## Next Steps

Upon successful validation:
1. ✅ Webhook infrastructure operational
2. ✅ All 4 offline conversion types flowing to Meta
3. ✅ Full funnel visibility in Events Manager
4. ➡️ Proceed to **Phase 4: Enhanced Tracking**
5. Optimize Event Match Quality to 7+

---

## Sign-Off

| Role | Name | Date | Status |
|------|------|------|--------|
| sGTM Configuration | | | ⏳ Pending |
| GHL Automation Setup | | | ⏳ Pending |
| Webhook Testing | | | ⏳ Pending |
| Meta Events Validation | | | ⏳ Pending |

**Phase 3 Status:** Configuration Ready for Implementation
