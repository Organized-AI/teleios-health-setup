# Teleios Health - GTM Testing Checklist

## Current Setup Summary

### Web GTM Container (GTM-WM5S3WSG)
| Component | Status | ID |
|-----------|--------|-----|
| Meta Pixel Setup | ✅ Existing | Tag 16 |
| Meta Pixel Events | ✅ Existing | Tag 15 |
| GA4 Config | ✅ Existing | Tag 13 |
| GA4 Events | ✅ Existing | Tag 14 |
| Google Ads Lead Conversion | ✅ Created | Tag 21 |
| DOM Ready Trigger | ✅ Existing | Trigger 3 |
| Custom Event Trigger | ✅ Existing | Trigger 4 |
| lead_submit Trigger | ✅ Created | Trigger 20 |
| form_start Trigger | ✅ Created | Trigger 22 |
| therapy_selected Trigger | ✅ Created | Trigger 23 |
| Exosome Page Trigger | ✅ Created | Trigger 24 |
| Gene Therapy Page Trigger | ✅ Created | Trigger 25 |
| FBEventName Variable | ✅ Updated | Variable 11 |

### Account IDs Reference
| Platform | ID |
|----------|-----|
| Meta Pixel | `912613798381607` |
| GA4 Measurement ID | `G-CS05KZX2HG` |
| Google Ads Conversion ID | `17810172296` |
| Google Ads Lead Label | `GKswCL2sndYbEIjTxqxC` |
| Server GTM | `GTM-MLBJCV38` |
| Stape Domain | `xoxfuunr.usa.stape.io` |

---

## Pre-Testing Setup

### 1. Publish GTM Container
- [ ] Go to [GTM Workspace](https://tagmanager.google.com/#/container/accounts/6328225355/containers/237555513/workspaces/3)
- [ ] Click **Submit** (top right)
- [ ] Add version name: "Teleios Health - Lead Tracking v1"
- [ ] Click **Publish**

### 2. Install Browser Extensions
- [ ] [GTM/GA Debug (Adswerve)](https://chrome.google.com/webstore/detail/gtmga-debug/ilnpmccnfdjdjjikgkefkcegefikecdc)
- [ ] [Meta Pixel Helper](https://chrome.google.com/webstore/detail/meta-pixel-helper/fdgfkebogiimcoedlicjlajpkdmockpc)
- [ ] [Tag Assistant](https://chrome.google.com/webstore/detail/tag-assistant-legacy-by-g/kejbdjndbnbjgmefkgdddjlbokphdefk)

### 3. Add Form Tracking Script to Webflow
Add this script before `</body>` in Webflow Site Settings → Custom Code:

```html
<script>
(function() {
  var formTracked = false;
  var therapyType = '';
  
  // Track form start (first field focus)
  document.addEventListener('focusin', function(e) {
    if (formTracked) return;
    var form = e.target.closest('form');
    if (form && form.querySelector('[name*="email"], [name*="phone"], [name*="name"]')) {
      formTracked = true;
      var formType = 'patient';
      if (form.querySelector('[value*="physician"]')) formType = 'physician';
      if (form.querySelector('[value*="partner"]')) formType = 'partner';
      
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'form_start',
        form_type: formType
      });
    }
  });
  
  // Track therapy selection
  document.addEventListener('change', function(e) {
    if (e.target.name && e.target.name.toLowerCase().includes('therapy')) {
      var val = e.target.value.toLowerCase();
      therapyType = val.includes('gene') ? 'gene_therapy' : 
                    val.includes('exosome') ? 'exosome_therapy' : val;
      
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'therapy_selected',
        therapy_type: therapyType
      });
    }
  });
  
  // Track form submission
  document.addEventListener('submit', function(e) {
    var form = e.target;
    if (!form.querySelector('[name*="email"]')) return;
    
    var email = (form.querySelector('[name*="email"]') || {}).value || '';
    var phone = (form.querySelector('[name*="phone"]') || {}).value || '';
    var firstName = (form.querySelector('[name*="first"]') || {}).value || '';
    var lastName = (form.querySelector('[name*="last"]') || {}).value || '';
    var country = (form.querySelector('[name*="country"]') || {}).value || '';
    
    var value = therapyType === 'gene_therapy' ? 37500 : 15000;
    var eventId = 'lead_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'lead_submit',
      form_type: 'patient',
      therapy_type: therapyType || 'general',
      value: value,
      currency: 'USD',
      event_id: eventId,
      user_data: {
        email_address: email,
        phone_number: phone,
        address: {
          first_name: firstName,
          last_name: lastName,
          country: country
        }
      }
    });
  });
})();
</script>
```

---

## Testing Checklist

### Phase 1: GTM Preview Mode

#### 1.1 Enable Preview Mode
- [ ] Go to [GTM Workspace](https://tagmanager.google.com/#/container/accounts/6328225355/containers/237555513/workspaces/3)
- [ ] Click **Preview** (top right)
- [ ] Enter URL: `https://teleios.health`
- [ ] Click **Connect**

#### 1.2 Test Page Load Events
- [ ] Navigate to https://teleios.health
- [ ] **Verify in GTM Preview:**
  - [ ] `FB_CONVERSIONS_API-...-Web-Tag-Pixel_Setup` fired
  - [ ] `FB_CONVERSIONS_API-...-Web-Tag-GA4_Config` fired
  - [ ] `FB_CONVERSIONS_API-...-Web-Tag-GA4_Event` fired
  - [ ] `FB_CONVERSIONS_API-...-Web-Tag-ParamBuilder` fired

#### 1.3 Test Therapy Page Views
- [ ] Navigate to `/exosome-therapy`
- [ ] **Verify:** Trigger 24 (Page - Exosome Therapy) fires
- [ ] Navigate to `/gene-therapy`
- [ ] **Verify:** Trigger 25 (Page - Gene Therapy) fires

#### 1.4 Test Form Interactions
- [ ] Click on consultation form
- [ ] Focus on first form field
- [ ] **Verify in GTM Preview:**
  - [ ] `form_start` event appears in dataLayer
  - [ ] Trigger 22 (Custom Event - form_start) fires

- [ ] Select a therapy option from dropdown
- [ ] **Verify:**
  - [ ] `therapy_selected` event appears in dataLayer
  - [ ] Trigger 23 (Custom Event - therapy_selected) fires

#### 1.5 Test Form Submission
- [ ] Fill out consultation form with test data:
  - First Name: `Test`
  - Last Name: `User`
  - Email: `test@example.com`
  - Phone: `+15551234567`
  - Country: `United States`
  - Therapy: `Monad Exosome Therapy`
- [ ] Submit form
- [ ] **Verify in GTM Preview:**
  - [ ] `lead_submit` event appears in dataLayer
  - [ ] Trigger 20 (Custom Event - lead_submit) fires
  - [ ] Tag 21 (Google Ads - Lead Conversion) fires
  - [ ] Tag 15 (Meta Pixel Event) fires with `Lead` event
  - [ ] Tag 14 (GA4 Event) fires

---

### Phase 2: Meta Pixel Helper Verification

#### 2.1 PageView Event
- [ ] Open Meta Pixel Helper
- [ ] Navigate to https://teleios.health
- [ ] **Verify:**
  - [ ] ✅ PageView event detected
  - [ ] Pixel ID: `912613798381607`
  - [ ] No errors shown

#### 2.2 Lead Event
- [ ] Submit consultation form
- [ ] **Verify in Pixel Helper:**
  - [ ] ✅ Lead event detected
  - [ ] Event has `value` parameter
  - [ ] Event has `eventID` parameter (for deduplication)

---

### Phase 3: GA4 Real-Time Verification

#### 3.1 Access GA4 Real-Time
- [ ] Go to [GA4 Property](https://analytics.google.com/analytics/web/#/p180456352)
- [ ] Navigate to **Reports** → **Realtime**

#### 3.2 Verify Events
- [ ] Visit https://teleios.health
- [ ] **Verify in Real-Time:**
  - [ ] `page_view` event appears
  - [ ] Event source shows server-side (via Stape)

- [ ] Submit consultation form
- [ ] **Verify:**
  - [ ] `generate_lead` or custom event appears
  - [ ] Event parameters include `value`, `user_data`

---

### Phase 4: Google Ads Conversion Verification

#### 4.1 Access Google Ads
- [ ] Go to [Google Ads](https://ads.google.com/)
- [ ] Select account `6890103064` (Teleios Health)
- [ ] Navigate to **Goals** → **Conversions**

#### 4.2 Verify Conversion Status
- [ ] Find "Teleios Lead" conversion
- [ ] **Check status:**
  - [ ] Recording conversions (may take 24-48 hours)
  - [ ] Tag status: Active

#### 4.3 Test with Tag Assistant
- [ ] Use [Google Tag Assistant](https://tagassistant.google.com/)
- [ ] Enter https://teleios.health
- [ ] Submit form
- [ ] **Verify:**
  - [ ] Conversion tag fires
  - [ ] Conversion ID: `17810172296`
  - [ ] Conversion Label: `GKswCL2sndYbEIjTxqxC`

---

### Phase 5: Server-Side (sGTM) Verification

#### 5.1 Stape Dashboard
- [ ] Log into [Stape Dashboard](https://stape.io)
- [ ] Select container: `nsawsbpg` (US West Oregon)
- [ ] Navigate to **Logs** or **Live Events**

#### 5.2 Verify Events Flow
- [ ] Visit https://teleios.health
- [ ] **Verify in Stape logs:**
  - [ ] GA4 events arriving at server
  - [ ] Events forwarding to GA4 server endpoint
  - [ ] Events forwarding to Meta CAPI (if configured)

---

### Phase 6: Meta Events Manager Verification

#### 6.1 Access Events Manager
- [ ] Go to [Meta Events Manager](https://business.facebook.com/events_manager)
- [ ] Select Pixel: `912613798381607`
- [ ] Navigate to **Test Events**

#### 6.2 Test Mode Setup
- [ ] Click **Test Events** tab
- [ ] Note the Test Event Code (if using)

#### 6.3 Verify Event Quality
- [ ] Navigate to **Overview**
- [ ] Check **Event Match Quality** score
- [ ] **Target:** Good (6+) or Great (8+)

#### 6.4 Verify Deduplication
- [ ] Submit test form
- [ ] Check Events Manager
- [ ] **Verify:**
  - [ ] Single Lead event counted (not duplicated)
  - [ ] Shows both "Browser" and "Server" sources

---

## Event Reference Table

| User Action | dataLayer Event | Meta Event | GA4 Event | Google Ads |
|-------------|-----------------|------------|-----------|------------|
| Page load | `gtm.dom` | PageView | page_view | - |
| View /exosome-therapy | `gtm.js` | ViewContent | view_item | - |
| View /gene-therapy | `gtm.js` | ViewContent | view_item | - |
| Focus form field | `form_start` | - | form_start | - |
| Select therapy | `therapy_selected` | - | therapy_selected | - |
| Submit form | `lead_submit` | Lead | generate_lead | Lead Conversion |

---

## Troubleshooting

### Tags Not Firing
1. Check GTM Preview mode for errors
2. Verify triggers are correctly configured
3. Check for JavaScript errors in browser console
4. Ensure dataLayer events have correct event names

### Meta Pixel Not Working
1. Verify Pixel ID is correct: `912613798381607`
2. Check for Content Security Policy blocking facebook.net
3. Use Meta Pixel Helper to diagnose
4. Check Events Manager for any warnings

### GA4 Events Missing
1. Verify Measurement ID: `G-CS05KZX2HG`
2. Check transport_url configuration for server-side
3. Use GA4 DebugView (Admin → DebugView)
4. Verify API Secret for server-side events

### Google Ads Conversion Not Recording
1. Verify Conversion ID: `17810172296`
2. Verify Conversion Label: `GKswCL2sndYbEIjTxqxC`
3. Check if conversion needs to fire with Google Tag first
4. Wait 24-48 hours for conversions to appear

### Server-Side Events Not Arriving
1. Check Stape container is running
2. Verify transport_url in GA4 Config tag
3. Check Stape logs for errors
4. Verify API credentials are valid

---

## Post-Testing Checklist

- [ ] All Phase 1 tests pass
- [ ] All Phase 2 tests pass
- [ ] All Phase 3 tests pass
- [ ] All Phase 4 tests pass
- [ ] All Phase 5 tests pass
- [ ] All Phase 6 tests pass
- [ ] Remove test conversions from Google Ads (if any)
- [ ] Document any issues found
- [ ] Schedule follow-up check in 48 hours for conversion data

---

## Next Steps After Testing

1. **Add Offline Conversions** - Configure GHL webhooks for:
   - Lead Qualified → Meta CAPI Lead
   - Assessment Complete → Meta CAPI CompleteRegistration
   - Deposit Paid → Meta CAPI Purchase
   - Treatment Complete → Meta CAPI Purchase

2. **Add ViewContent Tags** - Create specific tags for therapy pages

3. **Add Scroll Tracking** - Track 50%/75% scroll depth

4. **Enhanced Conversions** - Enable for Google Ads (requires user data)
