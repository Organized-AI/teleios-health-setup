# Teleios Health - GTM Implementation Guide (CAPIG Version)

## Overview

This guide covers the server-side GTM setup using **Stape CAPIG** (Conversions API Gateway) for Meta CAPI, which simplifies the implementation significantly compared to custom CAPI tags.

### Architecture with CAPIG

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              WEBSITE (Webflow)                              │
│                              teleios.health                                 │
└────────────────────────────────────┬────────────────────────────────────────┘
                                     │
                    ┌────────────────┼────────────────┐
                    │                │                │
                    ▼                ▼                ▼
            ┌───────────────┐ ┌───────────────┐ ┌───────────────┐
            │   GTM Web     │ │  Meta Pixel   │ │     GA4       │
            │ GTM-WM5S3WSG  │ │(browser-side) │ │   180456352   │
            └───────┬───────┘ └───────────────┘ └───────┬───────┘
                    │                                   │
                    └─────────────────┬─────────────────┘
                                      │
                                      ▼
                          ┌────────────────────────┐
                          │    SERVER-SIDE GTM     │
                          │     GTM-MLBJCV38       │
                          │   (Stape Container)    │
                          └────────────┬───────────┘
                                       │
                    ┌──────────────────┼──────────────────┐
                    │                  │                  │
                    ▼                  ▼                  ▼
            ┌───────────────┐  ┌───────────────┐  ┌───────────────┐
            │  Stape CAPIG  │  │  GA4 Server   │  │  Google Ads   │
            │ capig.stape.vip│ │               │  │ 476-183-2056  │
            └───────┬───────┘  └───────────────┘  └───────────────┘
                    │
                    ▼
            ┌───────────────┐
            │   Meta CAPI   │
            │  (Automatic)  │
            └───────────────┘
                    ▲
                    │ Webhooks
            ┌───────────────┐
            │  GoHighLevel  │
            │     CRM       │
            └───────────────┘
```

---

## Account IDs Reference

| Platform | ID |
|----------|-----|
| Meta Ad Account | `act_1544406343374527` |
| Meta Pixel | `912613798381607` |
| Meta Page | `836344729572623` |
| Google Ads | `476-183-2056` (AW-4761832056) |
| GA4 Property | `180456352` |
| Web GTM | `GTM-WM5S3WSG` |
| Server GTM | `GTM-MLBJCV38` |
| CAPIG Endpoint | `https://capig.stape.vip` |

---

## What is CAPIG?

**CAPIG (Conversions API Gateway)** is Stape's simplified approach to Meta CAPI:

✅ **No complex sGTM tags** - Just HTTP requests to CAPIG  
✅ **Automatic user data hashing** - CAPIG handles SHA256 hashing  
✅ **Better reliability** - Stape manages the Meta API connection  
✅ **Simpler debugging** - View events in Stape dashboard  

### CAPIG URL Structure

```
https://capig.stape.vip/{PIXEL_ID}/{EVENT_NAME}
```

For Teleios:
```
https://capig.stape.vip/912613798381607/PageView
https://capig.stape.vip/912613798381607/ViewContent
https://capig.stape.vip/912613798381607/Lead
https://capig.stape.vip/912613798381607/Purchase
https://capig.stape.vip/912613798381607/CompleteRegistration
```

---

## Setup Option 1: Stape CAPIG Tag Template (Recommended)

### Step 1: Install CAPIG Template in sGTM

1. Go to your sGTM workspace (GTM-MLBJCV38)
2. **Templates** → **Tag Templates** → **Search Gallery**
3. Search for "**Stape CAPI Gateway**"
4. Click **Add to workspace**

### Step 2: Create CAPIG Configuration Tag

Create a new tag using the Stape CAPI Gateway template:

**Tag Name:** `CAPIG - Configuration`

| Setting | Value |
|---------|-------|
| Pixel ID | `912613798381607` |
| Access Token | `YOUR_META_CAPI_ACCESS_TOKEN` |
| API Version | `v18.0` (or latest) |
| Test Event Code | Leave blank for production |

### Step 3: Create Event Tags

Create separate CAPIG tags for each event:

#### CAPIG - PageView
| Setting | Value |
|---------|-------|
| Event Name | `PageView` |
| Event Source URL | `{{ED - Page Location}}` |
| Action Source | `website` |
| Event ID | `{{ED - Event ID}}` |
| **Trigger** | GA4 Client - PageView |

#### CAPIG - ViewContent
| Setting | Value |
|---------|-------|
| Event Name | `ViewContent` |
| Event Source URL | `{{ED - Page Location}}` |
| Action Source | `website` |
| Event ID | `{{ED - Event ID}}` |
| Content Name | `{{ED - Content Name}}` |
| **Trigger** | GA4 Client - ViewContent |

#### CAPIG - Lead (Web)
| Setting | Value |
|---------|-------|
| Event Name | `Lead` |
| Event Source URL | `{{ED - Page Location}}` |
| Action Source | `website` |
| Event ID | `{{ED - Event ID}}` |
| Value | `{{ED - Value}}` |
| Currency | `USD` |
| **User Data** | |
| Email | `{{UD - Email}}` |
| Phone | `{{UD - Phone}}` |
| First Name | `{{UD - First Name}}` |
| Last Name | `{{UD - Last Name}}` |
| Country | `{{UD - Country}}` |
| FBP | `{{Cookie - _fbp}}` |
| FBC | `{{Cookie - _fbc}}` |
| **Trigger** | GA4 Client - Lead |

#### CAPIG - Lead (Qualified - Offline)
| Setting | Value |
|---------|-------|
| Event Name | `Lead` |
| Event Source URL | `https://teleios.health` |
| Action Source | `system_generated` |
| Value | `0` |
| **User Data** | Same as above |
| **Trigger** | Webhook - Lead Qualified |

#### CAPIG - CompleteRegistration (Assessment)
| Setting | Value |
|---------|-------|
| Event Name | `CompleteRegistration` |
| Event Source URL | `https://teleios.health` |
| Action Source | `system_generated` |
| Value | `500` |
| Currency | `USD` |
| **Trigger** | Webhook - Assessment Complete |

#### CAPIG - Purchase (Deposit)
| Setting | Value |
|---------|-------|
| Event Name | `Purchase` |
| Event Source URL | `https://teleios.health` |
| Action Source | `system_generated` |
| Value | `{{ED - Value}}` |
| Currency | `USD` |
| Content Name | `{{ED - Therapy Type}}` |
| **Trigger** | Webhook - Deposit Paid |

#### CAPIG - Purchase (Treatment Complete)
| Setting | Value |
|---------|-------|
| Event Name | `Purchase` |
| Event Source URL | `https://teleios.health` |
| Action Source | `system_generated` |
| Value | `{{ED - Value}}` |
| Currency | `USD` |
| Content Name | `{{ED - Therapy Type}}` |
| **Trigger** | Webhook - Treatment Complete |

---

## Required Credentials

Before importing the container, obtain these values:

### 1. Meta CAPI Access Token

1. Go to [Meta Events Manager](https://business.facebook.com/events_manager)
2. Select Pixel **912613798381607**
3. **Settings** → **Conversions API** section
4. Click **Generate access token**
5. Copy the token (starts with `EAA...`)

### 2. GA4 Measurement ID & API Secret

1. Go to [GA4 Admin](https://analytics.google.com/)
2. Property **180456352** → **Data Streams**
3. Copy **Measurement ID** (format: `G-XXXXXXXXXX`)
4. Click stream → **Measurement Protocol API secrets**
5. Create new secret, copy the value

### 3. Google Ads Conversion Labels

1. Go to [Google Ads](https://ads.google.com/) → Account **476-183-2056**
2. **Goals** → **Conversions** → **New conversion action**
3. Create 3 conversions:
   - **Teleios Lead** (Primary, Leads category)
   - **Teleios Deposit** (Primary, Purchase category)
   - **Teleios Treatment Complete** (Primary, Purchase category)
4. Copy each conversion label

---

## Variables Reference

### Constants (Update with actual values)

| Variable | Value |
|----------|-------|
| `Const - CAPIG Endpoint` | `https://capig.stape.vip` |
| `Const - Meta Pixel ID` | `912613798381607` |
| `Const - Meta Access Token` | `YOUR_META_CAPI_ACCESS_TOKEN` |
| `Const - GA4 Measurement ID` | `G-XXXXXXXXXX` |
| `Const - GA4 API Secret` | `YOUR_GA4_API_SECRET` |
| `Const - Google Ads ID` | `AW-4761832056` |

### Event Data Variables

| Variable | Source |
|----------|--------|
| `ED - Event Name` | `event_name` |
| `ED - Client ID` | `client_id` |
| `ED - User Agent` | `user_agent` |
| `ED - IP Address` | `ip_override` |
| `ED - Page Location` | `page_location` |
| `ED - Page Referrer` | `page_referrer` |
| `ED - Page Title` | `page_title` |
| `ED - Value` | `value` |
| `ED - Currency` | `currency` |
| `ED - Content Name` | `content_name` |
| `ED - Therapy Type` | `therapy_type` |
| `ED - Form Type` | `form_type` |
| `ED - Event ID` | `event_id` |

### User Data Variables

| Variable | Source |
|----------|--------|
| `UD - Email` | `user_data.email_address` |
| `UD - Phone` | `user_data.phone_number` |
| `UD - First Name` | `user_data.address.first_name` |
| `UD - Last Name` | `user_data.address.last_name` |
| `UD - Country` | `user_data.address.country` |

---

## GoHighLevel Webhook Configuration

Send offline conversion events to your sGTM webhook endpoint.

### Webhook URL
```
https://YOUR_STAPE_DOMAIN/webhook
```

### Webhook Payloads

#### Lead Qualified
```json
{
  "event_name": "lead_qualified",
  "user_data": {
    "email_address": "{{contact.email}}",
    "phone_number": "{{contact.phone}}",
    "address": {
      "first_name": "{{contact.firstName}}",
      "last_name": "{{contact.lastName}}",
      "country": "{{contact.country}}"
    }
  },
  "therapy_type": "{{contact.customField.therapy_type}}",
  "value": 0,
  "currency": "USD"
}
```

#### Assessment Complete
```json
{
  "event_name": "assessment_complete",
  "user_data": {
    "email_address": "{{contact.email}}",
    "phone_number": "{{contact.phone}}",
    "address": {
      "first_name": "{{contact.firstName}}",
      "last_name": "{{contact.lastName}}",
      "country": "{{contact.country}}"
    }
  },
  "therapy_type": "{{contact.customField.therapy_type}}",
  "value": 500,
  "currency": "USD"
}
```

#### Deposit Paid
```json
{
  "event_name": "deposit_paid",
  "user_data": {
    "email_address": "{{contact.email}}",
    "phone_number": "{{contact.phone}}",
    "address": {
      "first_name": "{{contact.firstName}}",
      "last_name": "{{contact.lastName}}",
      "country": "{{contact.country}}"
    }
  },
  "therapy_type": "{{contact.customField.therapy_type}}",
  "value": "{{contact.customField.deposit_amount}}",
  "currency": "USD"
}
```

#### Treatment Complete
```json
{
  "event_name": "treatment_complete",
  "user_data": {
    "email_address": "{{contact.email}}",
    "phone_number": "{{contact.phone}}",
    "address": {
      "first_name": "{{contact.firstName}}",
      "last_name": "{{contact.lastName}}",
      "country": "{{contact.country}}"
    }
  },
  "therapy_type": "{{contact.customField.therapy_type}}",
  "value": "{{contact.customField.treatment_value}}",
  "currency": "USD"
}
```

---

## Event Deduplication

CAPIG automatically handles deduplication when you provide `event_id`:

1. **Browser Pixel** fires with `event_id: "abc123"`
2. **sGTM → CAPIG** fires with same `event_id: "abc123"`
3. Meta deduplicates and counts as 1 event

The web GTM container generates a unique `event_id` for Lead events that flows through to sGTM.

---

## Testing Checklist

### Stape Dashboard
- [ ] Events appearing in CAPIG logs
- [ ] No authorization errors
- [ ] User data being passed correctly

### Meta Events Manager
- [ ] PageView events with `server` source
- [ ] ViewContent events with content_name
- [ ] Lead events with user data match
- [ ] Event deduplication working (single count, dual sources)
- [ ] Purchase events from offline conversions

### GA4 DebugView
- [ ] page_view events arriving
- [ ] view_content with parameters
- [ ] generate_lead with value and user_data

### Google Ads
- [ ] Lead conversion tracking
- [ ] Deposit conversion with value
- [ ] Treatment conversion with full value

---

## Event Flow Summary

| Stage | Event Name | Meta Event | Value | Action Source |
|-------|------------|------------|-------|---------------|
| Page Load | `page_view` | PageView | - | website |
| Therapy Page | `view_content` | ViewContent | - | website |
| Form Submit | `generate_lead` | Lead | $15K-$37.5K | website |
| Lead Qualified | `lead_qualified` | Lead | $0 | system_generated |
| Assessment Done | `assessment_complete` | CompleteRegistration | $500 | system_generated |
| Deposit Paid | `deposit_paid` | Purchase | Deposit $ | system_generated |
| Treatment Done | `treatment_complete` | Purchase | Full $ | system_generated |

---

## Troubleshooting

### CAPIG Not Receiving Events
1. Check sGTM Preview mode - verify tags fire
2. Verify CAPIG endpoint URL is correct
3. Check Authorization header has valid token

### No User Data Match
1. Ensure email/phone are passed unhashed (CAPIG hashes automatically)
2. Verify user_data structure in request body
3. Check GHL webhook field mappings

### Deduplication Not Working
1. Confirm `event_id` is passed in both browser and server requests
2. Verify event_id is unique per event (not per session)
3. Check Meta Events Manager for duplicate events

### Offline Events Missing
1. Test GHL webhook with Webhook.site first
2. Verify sGTM Webhook Client is configured for `/webhook` path
3. Check trigger conditions match `event_name` values
