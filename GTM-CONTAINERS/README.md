# GTM Container JSON Files

This directory contains exportable GTM container configurations that can be imported into Google Tag Manager.

## Files

| File | Container | Description |
|------|-----------|-------------|
| `web-gtm-container.json` | GTM-WM5S3WSG | Web container with Meta Pixel, GA4, Google Ads |
| `server-gtm-container.json` | GTM-MLBJCV38 | Server container variables and triggers (requires CAPIG template) |

## Import Instructions

### Manual Import (GTM UI)

1. Open Google Tag Manager: https://tagmanager.google.com/
2. Select the target container
3. Go to **Admin** → **Import Container**
4. Upload the JSON file
5. Choose workspace and merge strategy:
   - **New Container:** Choose "Overwrite"
   - **Existing Container:** Choose "Merge" → "Rename conflicting"
6. Review changes and confirm
7. Submit and publish

### Programmatic Import (GTM API)

See `deploy-gtm.sh` for automated deployment using the GTM API.

## Container Contents

### Web GTM (GTM-WM5S3WSG)

**Tags (15):**
- GA4 Configuration + Events (generate_lead, view_item, scroll, video)
- Meta Pixel (Base, PageView, Lead, ViewContent)
- Google Ads (Remarketing, Lead/Deposit/Treatment Conversions)
- Conversion Linker

**Triggers (8):**
- All Pages
- form_submit (Custom Event)
- Therapy Pages (Regex match)
- Scroll 50%/75%
- Video Start/Progress/Complete

**Variables (12):**
- Constants (GA4 ID, Pixel ID, Ads ID)
- DataLayer (event_id, user_data.*)
- Cookies (_fbp, _fbc)
- Lookup Table (Page Content Name)

### Server GTM (GTM-MLBJCV38)

**Clients (2):**
- GA4 Client (receives web events)
- Webhook Client (receives GHL webhooks at /webhook)

**Variables (24):**
- Constants (Pixel ID, CAPI Token, GA4 ID, API Secret)
- Event Data (event_id, event_name, user_data.*, page_location)
- Webhook Data (email, phone, names, contact_id, amounts)

**Triggers (8):**
- GA4 events (All, Page View, Form Submit, Therapy Pages)
- Webhook events (lead_qualified, assessment_complete, deposit_paid, treatment_complete)

**Tags:** None included - CAPIG tags must be created manually after importing (requires Stape CAPIG template from Community Gallery)

## Post-Import Steps

### For Web Container

1. Verify all variables reference correct IDs
2. Preview and test all tags
3. Publish container

### For Server Container

1. Install **Stape CAPIG** template from Community Gallery
2. Create CAPIG tags using configurations in `PHASE-2-COMPLETE.md`:
   - CAPIG - PageView
   - CAPIG - ViewContent
   - CAPIG - Lead
3. Create offline CAPIG tags from `PHASE-3-COMPLETE.md`:
   - CAPIG - Lead Qualified (Offline)
   - CAPIG - CompleteRegistration
   - CAPIG - Purchase (Deposit)
   - CAPIG - Purchase (Treatment)
4. Update secret constants:
   - `Constant - Meta CAPI Token` → Your actual token
   - `Constant - GA4 API Secret` → Your actual secret
5. Preview and publish

## Secrets to Replace

Before using the server container, update these placeholder values:

```
YOUR_META_CAPI_ACCESS_TOKEN_HERE → Actual Meta CAPI token from Events Manager
YOUR_GA4_API_SECRET_HERE → Actual GA4 MP API secret from Data Streams
```

## Account IDs

| Platform | ID |
|----------|-----|
| GTM Account | 6328225355 |
| Web Container | 237555513 (GTM-WM5S3WSG) |
| Server Container | 237556533 (GTM-MLBJCV38) |
| Meta Pixel | 912613798381607 |
| GA4 Measurement ID | G-CS05KZX2HG |
| Google Ads Conversion ID | 17810172296 |
