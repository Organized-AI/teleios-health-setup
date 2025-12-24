---
description: Configure CRM webhooks for offline conversion tracking (GoHighLevel, HubSpot, Salesforce)
allowed-tools: ["Read", "Write", "Edit", "Bash", "WebFetch"]
---

# GTM Webhook Command

Configure CRM webhook integrations to send offline conversions to server-side GTM for Meta CAPI, GA4, and Google Ads.

## Supported CRM Platforms

- GoHighLevel (GHL)
- HubSpot
- Salesforce
- Pipedrive
- ActiveCampaign
- Custom CRM (via webhook)

## Architecture

```
┌─────────────────┐     Webhook      ┌─────────────────┐
│   CRM System    │ ───────────────> │   Server GTM    │
│   (Pipeline     │                  │   (Webhook      │
│    Stage Change)│                  │    Client)      │
└─────────────────┘                  └────────┬────────┘
                                              │
                         ┌────────────────────┼────────────────────┐
                         │                    │                    │
                         ▼                    ▼                    ▼
                  ┌───────────┐        ┌───────────┐        ┌───────────┐
                  │ Meta CAPI │        │ GA4 MP    │        │ Google    │
                  │           │        │           │        │ Ads       │
                  └───────────┘        └───────────┘        └───────────┘
```

## Webhook Endpoint Setup

### Server GTM Webhook Client

1. Create new Client in sGTM
2. Select "Webhook" client type
3. Configure path: `/webhook`
4. Full endpoint: `https://[YOUR-STAPE-DOMAIN]/webhook`

### GoHighLevel Configuration

**Automation Setup:**
1. Go to Automation → Create Workflow
2. Trigger: Pipeline Stage Changed
3. Add Action: Webhook (Outgoing)

**Webhook Payloads by Stage:**

#### Stage: Lead Qualified
```json
{
  "event_name": "lead_qualified",
  "event_time": "{{timestamp}}",
  "user_data": {
    "email_address": "{{contact.email}}",
    "phone_number": "{{contact.phone}}",
    "address": {
      "first_name": "{{contact.firstName}}",
      "last_name": "{{contact.lastName}}",
      "country": "{{contact.country}}"
    }
  },
  "custom_data": {
    "therapy_type": "{{contact.customField.therapy_type}}",
    "lead_source": "{{contact.customField.source}}",
    "value": 0,
    "currency": "USD"
  }
}
```

#### Stage: Assessment Complete
```json
{
  "event_name": "assessment_complete",
  "event_time": "{{timestamp}}",
  "user_data": {
    "email_address": "{{contact.email}}",
    "phone_number": "{{contact.phone}}",
    "address": {
      "first_name": "{{contact.firstName}}",
      "last_name": "{{contact.lastName}}",
      "country": "{{contact.country}}"
    }
  },
  "custom_data": {
    "therapy_type": "{{contact.customField.therapy_type}}",
    "value": 500,
    "currency": "USD"
  }
}
```

#### Stage: Deposit Paid
```json
{
  "event_name": "deposit_paid",
  "event_time": "{{timestamp}}",
  "user_data": {
    "email_address": "{{contact.email}}",
    "phone_number": "{{contact.phone}}",
    "address": {
      "first_name": "{{contact.firstName}}",
      "last_name": "{{contact.lastName}}",
      "country": "{{contact.country}}"
    }
  },
  "custom_data": {
    "therapy_type": "{{contact.customField.therapy_type}}",
    "value": "{{contact.customField.deposit_amount}}",
    "currency": "USD",
    "transaction_id": "{{contact.customField.payment_id}}"
  }
}
```

#### Stage: Treatment/Service Complete
```json
{
  "event_name": "purchase_complete",
  "event_time": "{{timestamp}}",
  "user_data": {
    "email_address": "{{contact.email}}",
    "phone_number": "{{contact.phone}}",
    "address": {
      "first_name": "{{contact.firstName}}",
      "last_name": "{{contact.lastName}}",
      "country": "{{contact.country}}"
    }
  },
  "custom_data": {
    "therapy_type": "{{contact.customField.therapy_type}}",
    "value": "{{contact.customField.treatment_value}}",
    "currency": "USD",
    "transaction_id": "{{contact.customField.invoice_id}}"
  }
}
```

## Server GTM Triggers

Create triggers for each webhook event:

### Trigger: Webhook - Lead Qualified
```yaml
Trigger Type: Custom
Condition: event_name equals "lead_qualified"
```

### Trigger: Webhook - Assessment Complete
```yaml
Trigger Type: Custom
Condition: event_name equals "assessment_complete"
```

### Trigger: Webhook - Deposit Paid
```yaml
Trigger Type: Custom
Condition: event_name equals "deposit_paid"
```

### Trigger: Webhook - Purchase Complete
```yaml
Trigger Type: Custom
Condition: event_name equals "purchase_complete"
```

## Event Mapping

| CRM Stage | Webhook Event | Meta Event | GA4 Event | Google Ads |
|-----------|--------------|------------|-----------|------------|
| Qualified | lead_qualified | Lead | qualified_lead | Lead (signal) |
| Assessment Done | assessment_complete | CompleteRegistration | complete_registration | - |
| Deposit Paid | deposit_paid | Purchase | purchase | Deposit Conv |
| Complete | purchase_complete | Purchase | purchase | Purchase Conv |

## Testing Workflow

### 1. Test with Webhook.site
Before connecting to sGTM:
1. Go to https://webhook.site
2. Copy your unique URL
3. Temporarily use this URL in GHL webhook
4. Trigger a pipeline change
5. Verify payload structure

### 2. Test with sGTM Preview
1. Enable sGTM Preview mode
2. Trigger webhook from CRM
3. Verify event appears in preview
4. Check variable values populate

### 3. Verify Destination Events
- Meta Events Manager: Check offline events
- GA4: Real-time → Events
- Google Ads: Conversions → Recent

## Security Considerations

1. **HTTPS Only** - All webhook endpoints must use HTTPS
2. **Secret Headers** - Add X-Webhook-Secret for validation
3. **IP Allowlisting** - Restrict to CRM IP ranges if possible
4. **Rate Limiting** - Prevent abuse with request limits
