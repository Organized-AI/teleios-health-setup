# CAPIG Tag Creation Guide - Teleios Health

**Server GTM Container:** GTM-MLBJCV38
**Stape URL:** https://nsawsbpg.stape.io
**Container URL:** https://tagmanager.google.com/#/container/accounts/6328225355/containers/237556533/workspaces/3

---

## Prerequisites

### 1. Install CAPIG Template

1. Open Server GTM container: GTM-MLBJCV38
2. Go to **Templates** → **Tag Templates** → **Search Gallery**
3. Search for **"Stape CAPIG"** or **"Conversions API Gateway"**
4. Click **Add to workspace**
5. Save

### 2. Required Secrets (from .env)

| Secret | Value |
|--------|-------|
| **Meta Pixel ID** | `912613798381607` |
| **Meta CAPI Token** | `EAAyrBDImf6wBQZAsZBqAO1EHsOClLJAifUrQ3wIj4IMtCsJsZAIw95CeZBKR5UQ5uvC0SBmM4DSGylrW5FE8pOifwWh4u4QoZBi1Q4THirYme4y0gEJlZCtSmTRJsT5tmp0O3lDmvpJqzZAC9s45dRUgNbdZB5cEW0ve1MZBmPfYp6QL9b70XwA6vYi9j7ZAAe8ne9KAZDZD` |
| **GA4 Measurement ID** | `G-CS05KZX2HG` |
| **GA4 API Secret** | `8Z-bcd2TQuaGstKV6qRLSQ` |

### 3. Create Constant Variables First

Before creating tags, create these constant variables in sGTM:

| Variable Name | Type | Value |
|--------------|------|-------|
| `Constant - Meta Pixel ID` | Constant | `912613798381607` |
| `Constant - Meta CAPI Token` | Constant | *(paste full token above)* |
| `Constant - GA4 Measurement ID` | Constant | `G-CS05KZX2HG` |
| `Constant - GA4 API Secret` | Constant | `8Z-bcd2TQuaGstKV6qRLSQ` |

---

## CAPIG Tags for Website Events (Phase 2)

These tags handle events forwarded from the web container via GA4 Client.

### Tag 1: CAPIG - PageView

**Purpose:** Send PageView to Meta CAPI for all page loads

```
Tag Name: CAPIG - PageView
Tag Type: Stape CAPIG

┌─────────────────────────────────────────────────────────────┐
│ PIXEL SETTINGS                                               │
├─────────────────────────────────────────────────────────────┤
│ Pixel ID:           {{Constant - Meta Pixel ID}}            │
│ Access Token:       {{Constant - Meta CAPI Token}}          │
│ Test Event Code:    (leave blank for production)            │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ EVENT SETTINGS                                               │
├─────────────────────────────────────────────────────────────┤
│ Event Name:         PageView                                 │
│ Action Source:      website                                  │
│ Event ID:           {{Event Data - event_id}}               │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ USER DATA                                                    │
├─────────────────────────────────────────────────────────────┤
│ client_ip_address:  {{Client IP Address}}                   │
│ client_user_agent:  {{Client User Agent}}                   │
│ fbp:                {{Cookie - _fbp}}                       │
│ fbc:                {{Cookie - _fbc}}                       │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ SERVER EVENT DATA                                            │
├─────────────────────────────────────────────────────────────┤
│ event_source_url:   {{Event Data - page_location}}          │
└─────────────────────────────────────────────────────────────┘

Trigger: GA4 - Page View
         (Client Name matches "GA4" AND event_name = "page_view")
```

---

### Tag 2: CAPIG - ViewContent

**Purpose:** Send ViewContent for therapy service pages

```
Tag Name: CAPIG - ViewContent
Tag Type: Stape CAPIG

┌─────────────────────────────────────────────────────────────┐
│ PIXEL SETTINGS                                               │
├─────────────────────────────────────────────────────────────┤
│ Pixel ID:           {{Constant - Meta Pixel ID}}            │
│ Access Token:       {{Constant - Meta CAPI Token}}          │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ EVENT SETTINGS                                               │
├─────────────────────────────────────────────────────────────┤
│ Event Name:         ViewContent                              │
│ Action Source:      website                                  │
│ Event ID:           {{Event Data - event_id}}               │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ CUSTOM DATA                                                  │
├─────────────────────────────────────────────────────────────┤
│ content_name:       {{Page - Content Name}}                 │
│ content_category:   therapy                                 │
│ content_type:       service                                 │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ USER DATA                                                    │
├─────────────────────────────────────────────────────────────┤
│ client_ip_address:  {{Client IP Address}}                   │
│ client_user_agent:  {{Client User Agent}}                   │
│ fbp:                {{Cookie - _fbp}}                       │
│ fbc:                {{Cookie - _fbc}}                       │
└─────────────────────────────────────────────────────────────┘

Trigger: GA4 - Therapy Pages
         (Client Name matches "GA4" AND event_name = "view_item")
```

---

### Tag 3: CAPIG - Lead (Website)

**Purpose:** Send Lead event for form submissions with full user data for matching

```
Tag Name: CAPIG - Lead
Tag Type: Stape CAPIG

┌─────────────────────────────────────────────────────────────┐
│ PIXEL SETTINGS                                               │
├─────────────────────────────────────────────────────────────┤
│ Pixel ID:           {{Constant - Meta Pixel ID}}            │
│ Access Token:       {{Constant - Meta CAPI Token}}          │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ EVENT SETTINGS                                               │
├─────────────────────────────────────────────────────────────┤
│ Event Name:         Lead                                     │
│ Action Source:      website                                  │
│ Event ID:           {{Event Data - event_id}}               │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ USER DATA (Enhanced Matching) - CAPIG hashes automatically  │
├─────────────────────────────────────────────────────────────┤
│ em (email):         {{Event Data - user_data.email}}        │
│ ph (phone):         {{Event Data - user_data.phone}}        │
│ fn (first_name):    {{Event Data - user_data.first_name}}   │
│ ln (last_name):     {{Event Data - user_data.last_name}}    │
│ external_id:        {{Event Data - client_id}}              │
│ client_ip_address:  {{Client IP Address}}                   │
│ client_user_agent:  {{Client User Agent}}                   │
│ fbp:                {{Cookie - _fbp}}                       │
│ fbc:                {{Cookie - _fbc}}                       │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ CUSTOM DATA                                                  │
├─────────────────────────────────────────────────────────────┤
│ content_name:       Contact Form Lead                       │
│ content_category:   lead                                    │
└─────────────────────────────────────────────────────────────┘

Trigger: GA4 - Form Submit
         (Client Name matches "GA4" AND event_name = "generate_lead")
```

---

## CAPIG Tags for Offline Events (Phase 3)

These tags handle webhook events from GoHighLevel CRM.

> **CRITICAL:** Offline events MUST use `action_source: system_generated`

### Tag 4: CAPIG - Lead Qualified (Offline)

**Purpose:** Track qualified leads from CRM pipeline

```
Tag Name: CAPIG - Lead Qualified (Offline)
Tag Type: Stape CAPIG

┌─────────────────────────────────────────────────────────────┐
│ PIXEL SETTINGS                                               │
├─────────────────────────────────────────────────────────────┤
│ Pixel ID:           {{Constant - Meta Pixel ID}}            │
│ Access Token:       {{Constant - Meta CAPI Token}}          │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ EVENT SETTINGS                                               │
├─────────────────────────────────────────────────────────────┤
│ Event Name:         Lead                                     │
│ Action Source:      system_generated    ← CRITICAL!         │
│ Event ID:           {{Webhook - contact_id}}-lead-{{Webhook - timestamp}} │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ USER DATA                                                    │
├─────────────────────────────────────────────────────────────┤
│ em (email):         {{Webhook - email}}                     │
│ ph (phone):         {{Webhook - phone}}                     │
│ fn (first_name):    {{Webhook - first_name}}                │
│ ln (last_name):     {{Webhook - last_name}}                 │
│ external_id:        {{Webhook - contact_id}}                │
│ fbp:                {{Webhook - fbp}}                       │
│ fbc:                {{Webhook - fbc}}                       │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ SERVER EVENT DATA                                            │
├─────────────────────────────────────────────────────────────┤
│ event_time:         {{Webhook - timestamp}}                 │
│ event_source_url:   https://teleios.health                  │
└─────────────────────────────────────────────────────────────┘

Trigger: Webhook - Lead Qualified
         (Client Name matches "Webhook" AND event_name = "lead_qualified")
```

---

### Tag 5: CAPIG - CompleteRegistration (Assessment)

**Purpose:** Track completed assessments

```
Tag Name: CAPIG - CompleteRegistration (Assessment)
Tag Type: Stape CAPIG

┌─────────────────────────────────────────────────────────────┐
│ PIXEL SETTINGS                                               │
├─────────────────────────────────────────────────────────────┤
│ Pixel ID:           {{Constant - Meta Pixel ID}}            │
│ Access Token:       {{Constant - Meta CAPI Token}}          │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ EVENT SETTINGS                                               │
├─────────────────────────────────────────────────────────────┤
│ Event Name:         CompleteRegistration                     │
│ Action Source:      system_generated                         │
│ Event ID:           {{Webhook - contact_id}}-assessment-{{Webhook - timestamp}} │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ USER DATA                                                    │
├─────────────────────────────────────────────────────────────┤
│ em (email):         {{Webhook - email}}                     │
│ ph (phone):         {{Webhook - phone}}                     │
│ fn (first_name):    {{Webhook - first_name}}                │
│ ln (last_name):     {{Webhook - last_name}}                 │
│ external_id:        {{Webhook - contact_id}}                │
│ fbp:                {{Webhook - fbp}}                       │
│ fbc:                {{Webhook - fbc}}                       │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ CUSTOM DATA                                                  │
├─────────────────────────────────────────────────────────────┤
│ content_name:       Assessment Complete                     │
└─────────────────────────────────────────────────────────────┘

Trigger: Webhook - Assessment Complete
         (Client Name matches "Webhook" AND event_name = "assessment_complete")
```

---

### Tag 6: CAPIG - Purchase (Deposit)

**Purpose:** Track deposit payments with value

```
Tag Name: CAPIG - Purchase (Deposit)
Tag Type: Stape CAPIG

┌─────────────────────────────────────────────────────────────┐
│ PIXEL SETTINGS                                               │
├─────────────────────────────────────────────────────────────┤
│ Pixel ID:           {{Constant - Meta Pixel ID}}            │
│ Access Token:       {{Constant - Meta CAPI Token}}          │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ EVENT SETTINGS                                               │
├─────────────────────────────────────────────────────────────┤
│ Event Name:         Purchase                                 │
│ Action Source:      system_generated                         │
│ Event ID:           {{Webhook - contact_id}}-deposit-{{Webhook - timestamp}} │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ USER DATA                                                    │
├─────────────────────────────────────────────────────────────┤
│ em (email):         {{Webhook - email}}                     │
│ ph (phone):         {{Webhook - phone}}                     │
│ fn (first_name):    {{Webhook - first_name}}                │
│ ln (last_name):     {{Webhook - last_name}}                 │
│ external_id:        {{Webhook - contact_id}}                │
│ fbp:                {{Webhook - fbp}}                       │
│ fbc:                {{Webhook - fbc}}                       │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ PURCHASE DATA                                                │
├─────────────────────────────────────────────────────────────┤
│ value:              {{Webhook - deposit_amount}}            │
│ currency:           USD                                     │
│ content_name:       Deposit Payment                         │
└─────────────────────────────────────────────────────────────┘

Trigger: Webhook - Deposit Paid
         (Client Name matches "Webhook" AND event_name = "deposit_paid")
```

---

### Tag 7: CAPIG - Purchase (Treatment)

**Purpose:** Track completed treatments with full value

```
Tag Name: CAPIG - Purchase (Treatment)
Tag Type: Stape CAPIG

┌─────────────────────────────────────────────────────────────┐
│ PIXEL SETTINGS                                               │
├─────────────────────────────────────────────────────────────┤
│ Pixel ID:           {{Constant - Meta Pixel ID}}            │
│ Access Token:       {{Constant - Meta CAPI Token}}          │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ EVENT SETTINGS                                               │
├─────────────────────────────────────────────────────────────┤
│ Event Name:         Purchase                                 │
│ Action Source:      system_generated                         │
│ Event ID:           {{Webhook - contact_id}}-treatment-{{Webhook - timestamp}} │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ USER DATA                                                    │
├─────────────────────────────────────────────────────────────┤
│ em (email):         {{Webhook - email}}                     │
│ ph (phone):         {{Webhook - phone}}                     │
│ fn (first_name):    {{Webhook - first_name}}                │
│ ln (last_name):     {{Webhook - last_name}}                 │
│ external_id:        {{Webhook - contact_id}}                │
│ fbp:                {{Webhook - fbp}}                       │
│ fbc:                {{Webhook - fbc}}                       │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ PURCHASE DATA                                                │
├─────────────────────────────────────────────────────────────┤
│ value:              {{Webhook - treatment_value}}           │
│ currency:           USD                                     │
│ content_name:       Treatment Complete                      │
└─────────────────────────────────────────────────────────────┘

Trigger: Webhook - Treatment Complete
         (Client Name matches "Webhook" AND event_name = "treatment_complete")
```

---

## Required sGTM Variables

### Event Data Variables (for GA4 Client events)

| Variable Name | Type | Key Path |
|--------------|------|----------|
| `Event Data - event_id` | Event Data | `event_id` |
| `Event Data - event_name` | Event Data | `event_name` |
| `Event Data - page_location` | Event Data | `page_location` |
| `Event Data - client_id` | Event Data | `client_id` |
| `Event Data - user_data.email` | Event Data | `user_data.email` |
| `Event Data - user_data.phone` | Event Data | `user_data.phone` |
| `Event Data - user_data.first_name` | Event Data | `user_data.first_name` |
| `Event Data - user_data.last_name` | Event Data | `user_data.last_name` |

### Server Variables

| Variable Name | Type | Source |
|--------------|------|--------|
| `Client IP Address` | Client IP Address | (built-in) |
| `Client User Agent` | Request Header | `User-Agent` |
| `Cookie - _fbp` | Cookie | `_fbp` |
| `Cookie - _fbc` | Cookie | `_fbc` |

### Webhook Variables (for GHL events)

| Variable Name | Type | Key Path |
|--------------|------|----------|
| `Webhook - email` | Event Data | `email` |
| `Webhook - phone` | Event Data | `phone` |
| `Webhook - first_name` | Event Data | `first_name` |
| `Webhook - last_name` | Event Data | `last_name` |
| `Webhook - contact_id` | Event Data | `contact_id` |
| `Webhook - timestamp` | Event Data | `timestamp` |
| `Webhook - deposit_amount` | Event Data | `deposit_amount` |
| `Webhook - treatment_value` | Event Data | `treatment_value` |
| `Webhook - fbp` | Event Data | `fbp` |
| `Webhook - fbc` | Event Data | `fbc` |

### Content Name Lookup (Optional)

```
Variable Name: Page - Content Name
Variable Type: Lookup Table
Input: {{Event Data - page_location}}

Lookup Rules:
├── /exosome → Exosome Therapy
├── /gene → Gene Therapy
├── /clinic → Teleios Clinic
└── Default → {{Event Data - page_title}}
```

---

## Required Triggers

### For Website Events (GA4 Client)

| Trigger Name | Condition |
|--------------|-----------|
| `GA4 - Page View` | Client Name ~ `GA4` AND event_name = `page_view` |
| `GA4 - Therapy Pages` | Client Name ~ `GA4` AND event_name = `view_item` |
| `GA4 - Form Submit` | Client Name ~ `GA4` AND event_name = `generate_lead` |

### For Offline Events (Webhook Client)

| Trigger Name | Condition |
|--------------|-----------|
| `Webhook - Lead Qualified` | Client Name ~ `Webhook` AND event_name = `lead_qualified` |
| `Webhook - Assessment Complete` | Client Name ~ `Webhook` AND event_name = `assessment_complete` |
| `Webhook - Deposit Paid` | Client Name ~ `Webhook` AND event_name = `deposit_paid` |
| `Webhook - Treatment Complete` | Client Name ~ `Webhook` AND event_name = `treatment_complete` |

---

## Tag Summary Table

| Tag Name | Event | Action Source | Trigger | EMQ Target |
|----------|-------|---------------|---------|------------|
| CAPIG - PageView | PageView | website | GA4 - Page View | 5+ |
| CAPIG - ViewContent | ViewContent | website | GA4 - Therapy Pages | 5+ |
| CAPIG - Lead | Lead | website | GA4 - Form Submit | 7+ |
| CAPIG - Lead Qualified | Lead | system_generated | Webhook - Lead Qualified | 7+ |
| CAPIG - CompleteRegistration | CompleteRegistration | system_generated | Webhook - Assessment Complete | 7+ |
| CAPIG - Purchase (Deposit) | Purchase | system_generated | Webhook - Deposit Paid | 8+ |
| CAPIG - Purchase (Treatment) | Purchase | system_generated | Webhook - Treatment Complete | 8+ |

---

## Validation Checklist

After creating all tags:

- [ ] All 4 constant variables created with correct values
- [ ] All event data variables created
- [ ] All webhook variables created
- [ ] All 7 CAPIG tags created
- [ ] All triggers configured correctly
- [ ] Preview mode shows tags firing
- [ ] Stape logs show successful requests
- [ ] Meta Events Manager receives events
- [ ] Event deduplication working (check event_id match)
- [ ] Container published

---

## Troubleshooting

### "Invalid access token"
- Check token is complete (starts with `EAAy...`)
- Token may have expired - regenerate in Events Manager

### "Pixel ID not found"
- Verify Pixel ID: `912613798381607`
- No spaces or extra characters

### Events not deduplicated
- Verify `event_id` matches between browser and server
- Check format is identical (case-sensitive)

### Low EMQ score
- Add more user data parameters
- Ensure fbp/fbc cookies are captured
- Include external_id

### Offline events not appearing
- Confirm `action_source: system_generated`
- Check timestamp is Unix format (seconds)
- Verify webhook is reaching Stape (check logs)
