# Phase 2 Complete: Server-Side GTM + CAPIG

**Date Completed:** December 24, 2024
**Status:** Configuration Ready for Implementation

---

## Summary

Phase 2 provides complete configurations for server-side GTM with Stape CAPIG integration for Meta Conversions API and GA4 Measurement Protocol.

---

## Account Reference

| Platform | ID |
|----------|-----|
| Server GTM Container | `GTM-MLBJCV38` |
| Stape Container | `nsawsbpg` |
| Stape URL | `https://nsawsbpg.stape.io` |
| Meta Pixel | `912613798381607` |
| Meta Ad Account | `act_1544406343374527` |
| GA4 Property | `180456352` |
| GA4 Measurement ID | `G-CS05KZX2HG` |

---

## Deliverable 1: GA4 Client Configuration

### Client Setup in sGTM

**Client Name:** `GA4 Client`
**Client Type:** GA4 (from Templates Gallery)

**Configuration:**
```
Client Name: GA4 Client
Request Path: Default (/g/collect)
Default GA4 Paths: Enabled
Override Measurement ID: (leave blank - accept all)
Claim Requests: Yes

Advanced Settings:
- Run container on specific domains: teleios.health
- Allow first-party cookies: Yes
```

**Purpose:**
- Receives GA4 events from web container
- Parses event data and user properties
- Makes data available to server tags
- Enables server-side forwarding to Meta CAPI and GA4 MP

---

## Deliverable 2: CAPIG Tag Configurations

### CAPIG - PageView Tag

```
Tag Name: CAPIG - PageView
Tag Type: Stape CAPIG (from Templates Gallery)

Event Configuration:
├── Event Name: PageView
├── Action Source: website
└── Event ID: {{Event ID}}

Pixel Configuration:
├── Pixel ID: 912613798381607
└── Access Token: {{Constant - Meta CAPI Token}}

User Data Mapping:
├── client_user_agent: {{Client User Agent}}
├── client_ip_address: {{Client IP Address}}
├── fbc: {{Cookie - _fbc}}
└── fbp: {{Cookie - _fbp}}

Server Event Data:
├── event_source_url: {{Page URL}}
└── event_time: {{Event Timestamp}}

Trigger: GA4 - All Page Views
```

### CAPIG - ViewContent Tag

```
Tag Name: CAPIG - ViewContent
Tag Type: Stape CAPIG

Event Configuration:
├── Event Name: ViewContent
├── Action Source: website
└── Event ID: {{Event ID}}

Pixel Configuration:
├── Pixel ID: 912613798381607
└── Access Token: {{Constant - Meta CAPI Token}}

Custom Data:
├── content_name: {{Page - Content Name}}
├── content_category: therapy
└── content_type: service

User Data Mapping:
├── client_user_agent: {{Client User Agent}}
├── client_ip_address: {{Client IP Address}}
├── fbc: {{Cookie - _fbc}}
└── fbp: {{Cookie - _fbp}}

Trigger: GA4 - Therapy Pages
         (event_name = page_view AND page_location contains /therapy|/exosome|/gene|/clinic)
```

### CAPIG - Lead Tag

```
Tag Name: CAPIG - Lead
Tag Type: Stape CAPIG

Event Configuration:
├── Event Name: Lead
├── Action Source: website
└── Event ID: {{Event ID}}

Pixel Configuration:
├── Pixel ID: 912613798381607
└── Access Token: {{Constant - Meta CAPI Token}}

User Data Mapping (Enhanced Matching):
├── em (email): {{DL - user_data.email}}        [Hashed automatically by CAPIG]
├── ph (phone): {{DL - user_data.phone}}        [Hashed automatically by CAPIG]
├── fn (first_name): {{DL - user_data.first_name}}  [Hashed automatically by CAPIG]
├── ln (last_name): {{DL - user_data.last_name}}    [Hashed automatically by CAPIG]
├── external_id: {{Client ID}}
├── client_user_agent: {{Client User Agent}}
├── client_ip_address: {{Client IP Address}}
├── fbc: {{Cookie - _fbc}}
└── fbp: {{Cookie - _fbp}}

Custom Data:
├── content_name: Contact Form Lead
└── content_category: lead

Trigger: GA4 - Form Submit
         (event_name = form_submit OR event_name = generate_lead)
```

---

## Deliverable 3: Server-Side Variables

### Variable Definitions

| Variable Name | Type | Configuration | Purpose |
|---------------|------|---------------|---------|
| **Client User Agent** | Request Header | Header: `User-Agent` | Browser identification for matching |
| **Client IP Address** | Server Variable | Type: Client IP Address | Geo-matching for CAPI |
| **Cookie - _fbc** | Cookie | Cookie Name: `_fbc` | Facebook Click ID for attribution |
| **Cookie - _fbp** | Cookie | Cookie Name: `_fbp` | Facebook Pixel Browser ID |
| **DL - user_data.email** | Event Data | Key Path: `user_data.email` | Enhanced matching - email |
| **DL - user_data.phone** | Event Data | Key Path: `user_data.phone` | Enhanced matching - phone |
| **DL - user_data.first_name** | Event Data | Key Path: `user_data.first_name` | Enhanced matching - first name |
| **DL - user_data.last_name** | Event Data | Key Path: `user_data.last_name` | Enhanced matching - last name |
| **Event ID** | Event Data | Key Path: `event_id` | Deduplication with browser events |
| **Event Timestamp** | Server Variable | Type: Request Timestamp | Event timing for CAPI |
| **Page URL** | Event Data | Key Path: `page_location` | Event source URL |
| **Page - Content Name** | Event Data | Key Path: `content_name` OR Lookup Table | ViewContent naming |
| **Client ID** | Event Data | Key Path: `client_id` | GA4 client ID for external_id |
| **Constant - Meta CAPI Token** | Constant | Value: `[FROM .env FILE]` | Meta API authentication |

### Variable Creation Steps

**1. Client User Agent:**
```
Variable Name: Client User Agent
Variable Type: Request Header
Header Name: User-Agent
```

**2. Client IP Address:**
```
Variable Name: Client IP Address
Variable Type: Client IP Address
(Use built-in server variable)
```

**3. Cookie Variables:**
```
Variable Name: Cookie - _fbc
Variable Type: Cookie
Cookie Name: _fbc

Variable Name: Cookie - _fbp
Variable Type: Cookie
Cookie Name: _fbp
```

**4. Event Data Variables:**
```
Variable Name: DL - user_data.email
Variable Type: Event Data
Key Path: user_data.email

Variable Name: DL - user_data.phone
Variable Type: Event Data
Key Path: user_data.phone

Variable Name: DL - user_data.first_name
Variable Type: Event Data
Key Path: user_data.first_name

Variable Name: DL - user_data.last_name
Variable Type: Event Data
Key Path: user_data.last_name

Variable Name: Event ID
Variable Type: Event Data
Key Path: event_id
```

**5. Meta CAPI Token (Constant):**
```
Variable Name: Constant - Meta CAPI Token
Variable Type: Constant
Value: [PASTE TOKEN FROM .env]
```

---

## Deliverable 4: GA4 Measurement Protocol Configuration

### GA4 Server Tag

```
Tag Name: GA4 - Server Side
Tag Type: GA4 (from Templates)

Configuration:
├── Measurement ID: G-CS05KZX2HG
├── API Secret: {{Constant - GA4 API Secret}}
└── Send to Measurement Protocol: Yes

Event Configuration:
├── Event Name: {{Event Name}}
└── Send all event parameters: Yes

Client ID Handling:
├── Client ID: {{Client ID}}
└── Override client_id: No (use incoming)

Parameters to Include:
├── page_location: {{Page URL}}
├── page_title: {{Page Title}}
├── user_id: (if available)
└── All custom parameters from web container

Trigger: All GA4 Events
```

### Getting GA4 API Secret

1. Open Google Analytics: https://analytics.google.com/
2. Navigate to: Admin → Data Streams
3. Select web stream for teleios.health
4. Scroll to "Measurement Protocol API secrets"
5. Click "Create"
6. Name: `sGTM-Teleios`
7. Copy the secret value
8. Create Constant variable in sGTM: `Constant - GA4 API Secret`

---

## Deliverable 5: Testing Checklist

### Pre-Testing Setup

| Task | Status |
|------|--------|
| CAPIG template installed in sGTM | ⏳ |
| GA4 Client configured | ⏳ |
| All variables created | ⏳ |
| Meta CAPI token added as constant | ⏳ |
| GA4 API secret added as constant | ⏳ |
| sGTM container published | ⏳ |

### Stape Logs Testing

| Test | Expected Result | Status |
|------|-----------------|--------|
| Navigate to teleios.health | Stape logs show incoming request | ⏳ |
| Check GA4 Client claim | "Client Claimed: GA4 Client" visible | ⏳ |
| Verify event_name parsing | page_view, form_submit visible | ⏳ |
| Check user data variables | email, phone populated on form submit | ⏳ |
| Verify CAPIG tag fires | "Tag Fired: CAPIG - PageView" visible | ⏳ |
| Check for errors | No red error messages | ⏳ |

**Stape Logs Location:**
1. Login to Stape: https://stape.io/
2. Select container: nsawsbpg
3. Click "Logs" tab
4. Filter by recent requests

### Meta Events Manager Testing

| Test | Expected Result | Status |
|------|-----------------|--------|
| Open Events Manager | Navigate to Pixel 912613798381607 | ⏳ |
| Go to Test Events | Enter test code | ⏳ |
| Generate PageView | Trigger page load on teleios.health | ⏳ |
| Verify PageView received | Action Source: website, Processing: OK | ⏳ |
| Generate Lead | Submit test form | ⏳ |
| Verify Lead received | User Data parameters visible | ⏳ |
| Check Match Quality | Score visible (target: 5+) | ⏳ |

**Meta Events Manager Location:**
1. Open: https://business.facebook.com/events_manager
2. Select Pixel: 912613798381607
3. Click "Test Events" tab

### Deduplication Testing

| Test | Expected Result | Status |
|------|-----------------|--------|
| Enable browser pixel (Phase 1) | Browser PageView fires | ⏳ |
| Enable server CAPIG (Phase 2) | Server PageView fires | ⏳ |
| Check Events Manager | Only ONE PageView event (not duplicated) | ⏳ |
| Verify event_id match | Same UUID on browser and server event | ⏳ |
| Test Lead deduplication | Submit form, verify single Lead event | ⏳ |

**Deduplication Verification:**
1. Submit form on website
2. Open Meta Events Manager → Test Events
3. Look for Lead event
4. Check "Event Deduplication" section
5. Should show "Deduplicated" if working correctly

### GA4 Server Events Testing

| Test | Expected Result | Status |
|------|-----------------|--------|
| Open GA4 DebugView | Navigate to Reports → DebugView | ⏳ |
| Enable debug mode | Add `?debug_mode=true` to URL | ⏳ |
| Verify page_view | Event shows with server indicator | ⏳ |
| Verify form events | generate_lead shows parameters | ⏳ |
| Check user properties | client_id, user_id if available | ⏳ |

---

## Event Match Quality Parameters

### Required for 7+ EMQ Score

| Parameter | Source | Priority | EMQ Impact |
|-----------|--------|----------|------------|
| em (email) | Form submission | HIGH | +2-3 points |
| ph (phone) | Form submission | HIGH | +1-2 points |
| fn (first_name) | Form submission | MEDIUM | +0.5 point |
| ln (last_name) | Form submission | MEDIUM | +0.5 point |
| client_ip_address | Server request | MEDIUM | +0.5 point |
| client_user_agent | Server request | MEDIUM | +0.5 point |
| fbc | Cookie | HIGH | +1-2 points |
| fbp | Cookie | HIGH | +1-2 points |
| external_id | Client ID | MEDIUM | +1 point |

### Hashing Requirements

CAPIG handles hashing automatically. Data should be:
- **Lowercase**: `john.doe@example.com` (not `John.Doe@Example.com`)
- **Trimmed**: No leading/trailing whitespace
- **Normalized**: Consistent formatting

The form tracking script in Phase 1 already handles these normalizations.

---

## Trigger Definitions

### GA4 - All Page Views

```
Trigger Name: GA4 - All Page Views
Trigger Type: Custom
Condition: Client Name equals "GA4 Client"
           AND Event Name equals "page_view"
```

### GA4 - Therapy Pages

```
Trigger Name: GA4 - Therapy Pages
Trigger Type: Custom
Condition: Client Name equals "GA4 Client"
           AND Event Name equals "page_view"
           AND page_location matches regex .*(therapy|exosome|gene|clinic).*
```

### GA4 - Form Submit

```
Trigger Name: GA4 - Form Submit
Trigger Type: Custom
Condition: Client Name equals "GA4 Client"
           AND (Event Name equals "form_submit" OR Event Name equals "generate_lead")
```

### All GA4 Events

```
Trigger Name: All GA4 Events
Trigger Type: Custom
Condition: Client Name equals "GA4 Client"
```

---

## Architecture Diagram

```
┌──────────────────────────────────────────────────────────────────────────┐
│                          WEB BROWSER                                      │
│  ┌─────────────────────────────────────────────────────────────────────┐ │
│  │  teleios.health                                                      │ │
│  │  ├── GTM Web Container (GTM-WM5S3WSG)                               │ │
│  │  │   ├── Meta Pixel - PageView/Lead/ViewContent                     │ │
│  │  │   ├── GA4 Events → Sends to Server Container                     │ │
│  │  │   └── Google Ads Remarketing/Conversions                         │ │
│  │  └── DataLayer (event_id, user_data, meta_cookies)                  │ │
│  └─────────────────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────────────────┘
                                    │
                                    │ GA4 Requests with event_id + user_data
                                    ▼
┌──────────────────────────────────────────────────────────────────────────┐
│                     SERVER-SIDE GTM (STAPE)                              │
│  Container: nsawsbpg.stape.io                                            │
│  GTM ID: GTM-MLBJCV38                                                    │
│  ┌─────────────────────────────────────────────────────────────────────┐ │
│  │  GA4 Client                                                          │ │
│  │  └── Claims incoming GA4 requests                                    │ │
│  │      └── Parses event data + user data                              │ │
│  └─────────────────────────────────────────────────────────────────────┘ │
│                              │                                           │
│         ┌────────────────────┼────────────────────┐                     │
│         ▼                    ▼                    ▼                     │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐         │
│  │ CAPIG Tags      │  │ GA4 MP Tag      │  │ Webhook Client  │         │
│  │ ├── PageView    │  │                 │  │ (Phase 3)       │         │
│  │ ├── ViewContent │  │ Measurement     │  │                 │         │
│  │ └── Lead        │  │ Protocol        │  │ Offline Events  │         │
│  └────────┬────────┘  └────────┬────────┘  └────────┬────────┘         │
└───────────┼────────────────────┼────────────────────┼───────────────────┘
            │                    │                    │
            ▼                    ▼                    │
     ┌──────────────┐     ┌──────────────┐           │
     │ META CAPI    │     │ GA4 SERVER   │           │
     │              │     │              │           │
     │ Pixel:       │     │ Property:    │           │
     │ 912613798381607    │ 180456352    │           │
     │              │     │ Stream:      │           │
     │ Deduplicated │     │ G-CS05KZX2HG │           │
     │ with browser │     │              │           │
     │ via event_id │     │              │           │
     └──────────────┘     └──────────────┘           │
                                                      │
                                          (Phase 3 webhooks)
```

---

## Troubleshooting

### CAPIG Events Not Appearing in Meta

**Check 1: Access Token**
- Verify token is not expired
- Token should have `ads_management` and `business_management` permissions
- Re-generate if needed in Events Manager

**Check 2: Pixel ID**
- Confirm Pixel ID is exactly: `912613798381607`
- No leading/trailing spaces

**Check 3: Stape Logs**
- Look for red error messages
- Check "Response Status" from Meta (should be 200)

### Deduplication Not Working

**Check 1: Event ID**
- Verify `event_id` is passed from web to server
- Must be identical on both browser and server events
- Check dataLayer in browser: `console.log(dataLayer)`

**Check 2: Timing**
- Events must be within 48-hour window
- Server event should fire within seconds of browser event

**Check 3: Event Name**
- Must match exactly: `Lead` not `lead` or `LEAD`

### GA4 Server Events Missing

**Check 1: API Secret**
- Verify secret matches exactly (no extra characters)
- Check it's for the correct data stream

**Check 2: Measurement ID**
- Must be: `G-CS05KZX2HG`

**Check 3: Client ID**
- Ensure `client_id` is passed through from browser
- Check GA4 DebugView for errors

### Low Match Quality Score

**Action Items:**
1. Add more user data parameters (email, phone critical)
2. Verify fbp/fbc cookies are being captured
3. Include external_id from client_id
4. Ensure proper normalization (lowercase, trimmed)
5. Wait 48 hours after changes for score update

---

## Next Steps

Upon successful validation:
1. ✅ Server-side tracking pipeline operational
2. ✅ Meta CAPI receiving deduplicated events
3. ✅ GA4 Measurement Protocol active
4. ➡️ Proceed to **Phase 3: Offline Conversion Webhooks**
5. Configure GoHighLevel automations for CRM events

---

## Sign-Off

| Role | Name | Date | Status |
|------|------|------|--------|
| sGTM Administrator | | | ⏳ Pending |
| Stape Configuration | | | ⏳ Pending |
| Meta Events Validation | | | ⏳ Pending |
| Deduplication Test | | | ⏳ Pending |

**Phase 2 Status:** Configuration Ready for Implementation
