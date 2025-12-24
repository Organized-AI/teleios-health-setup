# Phase 3: Implement Offline Conversion Webhooks

## Objective

Connect GoHighLevel CRM pipeline stages to server-side GTM for offline conversion tracking.

## Prerequisites

- Phase 2 completed (sGTM + CAPIG operational)
- GoHighLevel account access with automation permissions
- Stape webhook endpoint URL

## Account Reference

| Platform | ID |
|----------|-----|
| Server GTM | `GTM-MLBJCV38` |
| Stape Container | `nsawsbpg` |
| Stape Webhook URL | `https://nsawsbpg.us-west-2.stape.io/webhook` |
| Meta Pixel | `912613798381607` |
| Google Ads Conversion ID | `17810172296` |

## Conversion Labels (Google Ads)

| Conversion | Label |
|------------|-------|
| Lead | `GKswCL2sndYbEIjTxqxC` |
| Deposit | `C7qLCMCsndYbEIjTxqxC` |
| Treatment | `6j8qCMOsndYbEIjTxqxC` |

---

## Tasks

### Task 3.1: Configure sGTM Webhook Client

**Steps:**
1. Open sGTM container GTM-MLBJCV38
2. Navigate to Clients → New
3. Select "Webhook" client type (or install from gallery)

**Webhook Client Configuration:**
```
Client Name: Webhook - GoHighLevel
Request Path: /webhook
Request Method: POST
Parse Body As: JSON

Claim Events: Yes
Event Name Source: Request Body Key
Event Name Key: event_name
```

**Create Webhook Claim Trigger:**
```
Trigger Name: Webhook Client Claimed
Trigger Type: Custom
Condition: Client Name equals "Webhook - GoHighLevel"
```

**Validation:**
- [ ] Webhook client created
- [ ] Path set to `/webhook`
- [ ] JSON body parsing enabled

---

### Task 3.2: Create Webhook Triggers

**Trigger 1: Webhook - Lead Qualified**
```
Trigger Type: Custom
Conditions:
- Client Name equals "Webhook - GoHighLevel"
- event_name equals "lead_qualified"
```

**Trigger 2: Webhook - Assessment Complete**
```
Trigger Type: Custom
Conditions:
- Client Name equals "Webhook - GoHighLevel"
- event_name equals "assessment_complete"
```

**Trigger 3: Webhook - Deposit Paid**
```
Trigger Type: Custom
Conditions:
- Client Name equals "Webhook - GoHighLevel"
- event_name equals "deposit_paid"
```

**Trigger 4: Webhook - Treatment Complete**
```
Trigger Type: Custom
Conditions:
- Client Name equals "Webhook - GoHighLevel"
- event_name equals "treatment_complete"
```

**Validation:**
- [ ] All 4 webhook triggers created
- [ ] Event name conditions configured correctly

---

### Task 3.3: Create Offline CAPIG Tags

**CAPIG - Lead Qualified (Offline)**
```
Tag Type: Stape CAPIG
Event Name: Lead
Action Source: system_generated
Pixel ID: 912613798381607

User Data (from webhook payload):
- em: {{Webhook - email}}
- ph: {{Webhook - phone}}
- fn: {{Webhook - first_name}}
- ln: {{Webhook - last_name}}
- external_id: {{Webhook - contact_id}}

Event Data:
- event_time: {{Webhook - timestamp}}
- event_source_url: https://teleios.health

Trigger: Webhook - Lead Qualified
```

**CAPIG - CompleteRegistration (Assessment)**
```
Tag Type: Stape CAPIG
Event Name: CompleteRegistration
Action Source: system_generated
Pixel ID: 912613798381607

User Data: [Same as Lead Qualified]

Event Data:
- event_time: {{Webhook - timestamp}}
- content_name: "Assessment Complete"

Trigger: Webhook - Assessment Complete
```

**CAPIG - Purchase (Deposit)**
```
Tag Type: Stape CAPIG
Event Name: Purchase
Action Source: system_generated
Pixel ID: 912613798381607

User Data: [Same as Lead Qualified]

Event Data:
- event_time: {{Webhook - timestamp}}
- value: {{Webhook - deposit_amount}}
- currency: USD
- content_name: "Deposit Payment"

Trigger: Webhook - Deposit Paid
```

**CAPIG - Purchase (Treatment)**
```
Tag Type: Stape CAPIG
Event Name: Purchase
Action Source: system_generated
Pixel ID: 912613798381607

User Data: [Same as Lead Qualified]

Event Data:
- event_time: {{Webhook - timestamp}}
- value: {{Webhook - treatment_value}}
- currency: USD
- content_name: "Treatment Complete"

Trigger: Webhook - Treatment Complete
```

**Required Variables to Create:**

| Variable Name | Type | Path |
|---------------|------|------|
| Webhook - email | Event Data | email |
| Webhook - phone | Event Data | phone |
| Webhook - first_name | Event Data | first_name |
| Webhook - last_name | Event Data | last_name |
| Webhook - contact_id | Event Data | contact_id |
| Webhook - timestamp | Event Data | timestamp |
| Webhook - deposit_amount | Event Data | deposit_amount |
| Webhook - treatment_value | Event Data | treatment_value |

**Validation:**
- [ ] All 4 CAPIG offline tags created
- [ ] Action source set to system_generated
- [ ] User data variables mapped
- [ ] Correct triggers assigned

---

### Task 3.4: GoHighLevel Automation Setup

**Automation 1: Lead Qualified Webhook**

1. Go to GHL → Automations → Create Workflow
2. Trigger: Pipeline Stage Changed
3. Condition: Stage = "Qualified"
4. Action: Webhook

**Webhook Configuration:**
```
URL: https://nsawsbpg.us-west-2.stape.io/webhook
Method: POST
Headers:
  Content-Type: application/json

Body (JSON):
{
  "event_name": "lead_qualified",
  "timestamp": {{current_timestamp}},
  "contact_id": {{contact.id}},
  "email": {{contact.email}},
  "phone": {{contact.phone}},
  "first_name": {{contact.first_name}},
  "last_name": {{contact.last_name}},
  "fbp": {{contact.custom_field.fbp}},
  "fbc": {{contact.custom_field.fbc}}
}
```

**Automation 2: Assessment Complete Webhook**
```
Trigger: Pipeline Stage Changed → "Assessment Complete"

Body:
{
  "event_name": "assessment_complete",
  "timestamp": {{current_timestamp}},
  "contact_id": {{contact.id}},
  "email": {{contact.email}},
  "phone": {{contact.phone}},
  "first_name": {{contact.first_name}},
  "last_name": {{contact.last_name}}
}
```

**Automation 3: Deposit Paid Webhook**
```
Trigger: Pipeline Stage Changed → "Deposit Paid"

Body:
{
  "event_name": "deposit_paid",
  "timestamp": {{current_timestamp}},
  "contact_id": {{contact.id}},
  "email": {{contact.email}},
  "phone": {{contact.phone}},
  "first_name": {{contact.first_name}},
  "last_name": {{contact.last_name}},
  "deposit_amount": {{opportunity.monetary_value}}
}
```

**Automation 4: Treatment Complete Webhook**
```
Trigger: Pipeline Stage Changed → "Treatment Complete"

Body:
{
  "event_name": "treatment_complete",
  "timestamp": {{current_timestamp}},
  "contact_id": {{contact.id}},
  "email": {{contact.email}},
  "phone": {{contact.phone}},
  "first_name": {{contact.first_name}},
  "last_name": {{contact.last_name}},
  "treatment_value": {{opportunity.monetary_value}}
}
```

**Validation:**
- [ ] All 4 GHL automations created
- [ ] Webhook URLs correct
- [ ] JSON payloads configured
- [ ] Pipeline stage triggers set

---

### Task 3.5: Test Offline Flow

**Create Test Contact:**
1. Create new contact in GHL with known data:
   - Email: test@teleios.health
   - Phone: +1234567890
   - First Name: Test
   - Last Name: User
2. Add to sales pipeline

**Move Through Pipeline:**
1. Move contact to "Qualified" stage
2. Check Stape logs for webhook received
3. Check Meta Events Manager for Lead event

4. Move contact to "Assessment Complete" stage
5. Verify CompleteRegistration event in Meta

6. Move contact to "Deposit Paid" stage
7. Verify Purchase event with deposit value

8. Move contact to "Treatment Complete" stage
9. Verify Purchase event with treatment value

**Meta Events Manager Verification:**
1. Open Meta Events Manager → Test Events
2. Filter by action_source: system_generated
3. Verify all 4 event types appear
4. Check match quality for each event

**Google Ads Offline Conversion Test (Optional):**
1. Create Google Ads Conversion Import tag in sGTM
2. Map to deposit/treatment triggers
3. Verify conversions appear in Google Ads (24-48 hour delay)

**Validation Checklist:**
- [ ] Test contact created in GHL
- [ ] Webhook fires on stage change
- [ ] Stape logs show webhook received
- [ ] Lead event appears in Meta
- [ ] CompleteRegistration event appears
- [ ] Purchase (deposit) event appears
- [ ] Purchase (treatment) event appears
- [ ] All events show system_generated source

---

## Deliverables

| Deliverable | Status |
|-------------|--------|
| sGTM Webhook Client configured | ⏳ |
| 4 Webhook triggers created | ⏳ |
| 4 Offline CAPIG tags created | ⏳ |
| 4 GHL webhook automations live | ⏳ |
| Offline conversions flowing to Meta CAPI | ⏳ |
| Complete funnel visibility in Events Manager | ⏳ |

---

## Completion Criteria

Phase 3 is complete when:
- [ ] All webhook infrastructure in sGTM configured
- [ ] All 4 GHL automations active
- [ ] Test contact successfully moves through pipeline
- [ ] All 4 event types visible in Meta Events Manager
- [ ] Events show correct action_source (system_generated)

---

## Next Phase

Upon completion, proceed to [PHASE-4-ENHANCED-TRACKING.md](./PHASE-4-ENHANCED-TRACKING.md)

---

## Troubleshooting

### Webhook not received in sGTM
- Verify Stape container is running
- Check webhook URL is correct
- Test with curl:
  ```bash
  curl -X POST https://nsawsbpg.us-west-2.stape.io/webhook \
    -H "Content-Type: application/json" \
    -d '{"event_name":"test","email":"test@test.com"}'
  ```
- Check GHL automation execution history

### Events not appearing in Meta
- Verify CAPIG access token is valid
- Check action_source is system_generated
- Confirm timestamp format (Unix seconds)
- Review Stape logs for CAPIG errors

### Wrong event data
- Check GHL merge fields syntax
- Verify custom field names in GHL
- Test JSON payload with static values first

### Duplicate events
- Offline events (system_generated) should NOT deduplicate with web events
- This is expected behavior for full funnel tracking
- Each stage is a separate, unique conversion

---

## GHL Custom Fields Setup

To capture fbp/fbc cookies from web forms, create these custom fields in GHL:

1. Go to Settings → Custom Fields
2. Create field: `fbp` (text)
3. Create field: `fbc` (text)
4. Update Webflow form to pass these cookies
5. Map fields in GHL form/webhook integration

**Updated Form Script (captures Meta cookies):**
```javascript
document.addEventListener('DOMContentLoaded', function() {
  var forms = document.querySelectorAll('form');
  forms.forEach(function(form) {
    // Add hidden fields for Meta cookies
    var fbpInput = document.createElement('input');
    fbpInput.type = 'hidden';
    fbpInput.name = 'fbp';
    fbpInput.value = getCookie('_fbp') || '';
    form.appendChild(fbpInput);

    var fbcInput = document.createElement('input');
    fbcInput.type = 'hidden';
    fbcInput.name = 'fbc';
    fbcInput.value = getCookie('_fbc') || '';
    form.appendChild(fbcInput);
  });
});

function getCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
  return '';
}
```
