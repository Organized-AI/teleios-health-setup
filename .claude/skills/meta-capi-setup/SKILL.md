---
name: meta-capi-setup
description: Configure Meta Conversions API (CAPI) server-side tracking with Stape CAPIG. Use when setting up server-side Meta tracking, implementing CAPI, configuring offline conversions, or improving Event Match Quality scores.
---

# Meta CAPI Setup Skill

This skill guides the implementation of Meta Conversions API for server-side event tracking.

## When to Use This Skill

- Setting up server-side Meta Pixel tracking
- Implementing Stape CAPIG for CAPI
- Configuring offline conversion tracking
- Improving Event Match Quality (EMQ) scores
- Troubleshooting server-side Meta events

## Key Concepts

### CAPIG (Conversions API Gateway)
Stape's simplified CAPI integration that:
- Accepts HTTP requests at `https://capig.stape.vip/{PIXEL_ID}/{EVENT_NAME}`
- Automatically hashes user data (SHA256)
- Manages Meta API authentication
- Provides debugging through Stape dashboard

### Event Match Quality
Score from 0-10 indicating how well Meta can match events to users:
- **Poor (0-5)**: Missing critical user data
- **Good (6-7)**: Basic matching possible
- **Great (8-10)**: Strong matching capability

### Deduplication
Prevent double-counting when browser and server both fire:
- Generate unique `event_id` in browser
- Pass same `event_id` to server
- Meta deduplicates within 48-hour window

## Implementation Steps

### 1. Get Meta Access Token
```
Meta Events Manager → Pixel Settings → Conversions API → Generate Token
```

### 2. Configure sGTM Client
Create GA4 Client to receive events from web GTM.

### 3. Create CAPIG Tags
For each event (PageView, ViewContent, Lead, Purchase):
- Use Stape CAPIG template or HTTP Request tag
- Pass event_name, event_id, user_data, custom_data
- Set action_source based on origin

### 4. Configure User Data
Required for matching:
```json
{
  "em": "hashed_email",
  "ph": "hashed_phone", 
  "fn": "hashed_first_name",
  "ln": "hashed_last_name",
  "ct": "hashed_city",
  "st": "hashed_state",
  "zp": "hashed_zip",
  "country": "hashed_country",
  "fbp": "_fbp_cookie_value",
  "fbc": "_fbc_cookie_value",
  "client_ip_address": "user_ip",
  "client_user_agent": "user_agent"
}
```

### 5. Test Implementation
1. Use Meta Events Manager Test Events
2. Verify events appear with server source
3. Check Event Match Quality score
4. Confirm deduplication working

## Best Practices

1. **Always pass _fbp cookie** - Critical for matching
2. **Capture _fbc from URL** - Improves click attribution
3. **Normalize data before hashing** - Lowercase, trim whitespace
4. **Include IP and User Agent** - Required for server events
5. **Set action_source correctly** - "website" for web, "system_generated" for offline
