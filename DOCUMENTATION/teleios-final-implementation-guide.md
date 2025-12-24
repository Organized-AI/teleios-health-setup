# Teleios Health - GTM Implementation Guide (Final)

## ✅ All Credentials Configured

All container JSON files have been updated with actual credentials.

---

## Account IDs (Verified)

| Platform | ID | Status |
|----------|-----|--------|
| Meta Ad Account | `act_1544406343374527` | ✅ |
| Meta Pixel | `912613798381607` | ✅ |
| Meta Access Token | `EAAyrBDImf6w...` | ✅ Configured |
| Meta Page | `836344729572623` | ✅ |
| Google Ads Account | `6890103064` | ✅ (under MCC 4761832056) |
| GA4 Property | `180456352` | ✅ |
| GA4 Measurement ID | `G-CS05KZX2HG` | ✅ Configured |
| GA4 API Secret | `8Z-bcd2TQuaGstKV6qRLSQ` | ✅ Configured |
| Web GTM | `GTM-WM5S3WSG` | ✅ |
| Server GTM | `GTM-MLBJCV38` | ✅ |
| CAPIG Endpoint | `https://capig.stape.vip` | ✅ |

### GTM Container URLs

| Container | URL |
|-----------|-----|
| Web GTM (GTM-WM5S3WSG) | https://tagmanager.google.com/#/container/accounts/6328225355/containers/237555513/workspaces/3 |
| Server GTM (GTM-MLBJCV38) | https://tagmanager.google.com/#/container/accounts/6328225355/containers/237556533/workspaces/3 |

---

## Files Ready for Import

| File | Description |
|------|-------------|
| `teleios-gtm-web-container.json` | Web GTM container - Meta Pixel, GA4, Google Ads |
| `teleios-sgtm-capig-container.json` | Server GTM with CAPIG for Meta CAPI |
| `teleios-sgtm-server-container.json` | Alternative: Server GTM with custom CAPI tags |

---

## 🚨 REMAINING TASK: Create Google Ads Conversions

Since the Google Ads account (6890103064) is new, you need to create 3 conversion actions manually:

### Step 1: Go to Google Ads
1. Open [Google Ads](https://ads.google.com/)
2. Select account **Teleios Health** (6890103064)

### Step 2: Create Lead Conversion
1. Go to **Goals** → **Conversions** → **+ New conversion action**
2. Select **Website**
3. Enter domain: `teleios.health`
4. Click **Add a conversion action manually**
5. Configure:
   - **Goal category:** Submit lead form
   - **Conversion name:** `Teleios Lead`
   - **Value:** Use different values for each conversion → $15,000 default
   - **Count:** One conversion per click
   - **Click-through window:** 30 days
   - **Engaged-view window:** 3 days
   - **View-through window:** 1 day
   - **Attribution model:** Data-driven
6. Save and copy the **Conversion Label** (format: `AbCdEfGhIjK`)

### Step 3: Create Deposit Conversion
1. **+ New conversion action** → **Website** → **Manual**
2. Configure:
   - **Goal category:** Purchase
   - **Conversion name:** `Teleios Deposit`
   - **Value:** Use different values for each conversion
   - **Count:** One conversion per click
3. Save and copy the **Conversion Label**

### Step 4: Create Treatment Complete Conversion
1. **+ New conversion action** → **Website** → **Manual**
2. Configure:
   - **Goal category:** Purchase
   - **Conversion name:** `Teleios Treatment Complete`
   - **Value:** Use different values for each conversion
   - **Count:** One conversion per click
3. Save and copy the **Conversion Label**

### Step 5: Update GTM Containers with Labels
After creating all 3 conversions, update the JSON files:

```bash
# Replace placeholders with actual labels
# In teleios-gtm-web-container.json AND teleios-sgtm-capig-container.json:

LEAD_CONVERSION_LABEL → [your lead label]
DEPOSIT_CONVERSION_LABEL → [your deposit label]  
TREATMENT_CONVERSION_LABEL → [your treatment label]
```

---

## Import Instructions

### 1. Web GTM Container (GTM-WM5S3WSG)

1. Open [Google Tag Manager](https://tagmanager.google.com/)
2. Select workspace for **GTM-WM5S3WSG**
3. **Admin** → **Import Container**
4. Upload `teleios-gtm-web-container.json`
5. Choose **Merge** → **Rename conflicting tags, triggers, variables**
6. Click **Confirm**
7. Review the preview, then **Submit** to publish

### 2. Server GTM Container (GTM-MLBJCV38)

1. Select workspace for **GTM-MLBJCV38**
2. **Admin** → **Import Container**
3. Upload `teleios-sgtm-capig-container.json`
4. Choose **Merge** → **Rename conflicting tags, triggers, variables**
5. **Confirm** → **Submit**

### 3. Install GTM on Webflow

Add to site **Custom Code** section (Site Settings → Custom Code):

**Head Code:**
```html
<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-WM5S3WSG');</script>
<!-- End Google Tag Manager -->
```

**Body Code (start of body):**
```html
<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WM5S3WSG"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->
```

### 4. Add Form Tracking Script

Add before `</body>` in Webflow:

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

## GoHighLevel Webhook Setup

### Webhook Endpoint
```
https://[YOUR-STAPE-DOMAIN]/webhook
```

Replace `[YOUR-STAPE-DOMAIN]` with your Stape custom domain (e.g., `sgtm.teleios.health`).

### Create 4 Webhooks in GHL

**Automation Trigger:** Pipeline Stage Change

#### 1. Lead Qualified
**Stage:** Qualified
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

#### 2. Assessment Complete
**Stage:** Assessment Done
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

#### 3. Deposit Paid
**Stage:** Deposit Paid
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
  "value": {{contact.customField.deposit_amount}},
  "currency": "USD"
}
```

#### 4. Treatment Complete
**Stage:** Treatment Complete
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
  "value": {{contact.customField.treatment_value}},
  "currency": "USD"
}
```

---

## Testing Checklist

### Browser-Side
- [ ] Open teleios.health with [Meta Pixel Helper](https://chrome.google.com/webstore/detail/meta-pixel-helper/fdgfkebogiimcoedlicjlajpkdmockpc)
- [ ] Verify PageView fires on page load
- [ ] Visit /exosome-therapy → ViewContent fires
- [ ] Visit /gene-therapy → ViewContent fires
- [ ] Focus on form field → form_start in GTM Preview
- [ ] Select therapy → therapy_selected in GTM Preview
- [ ] Submit form → Lead event with user data

### Server-Side
- [ ] Open [Stape Dashboard](https://stape.io) → Check CAPIG logs
- [ ] Verify events flow to Meta CAPI
- [ ] Check GA4 Realtime → Events appearing
- [ ] Meta Events Manager → Server events showing

### Deduplication
- [ ] Submit form → Meta shows 1 Lead (not 2)
- [ ] Event match quality should show "Good" or "Great"

### Offline Conversions
- [ ] Move contact to "Qualified" stage in GHL
- [ ] Check sGTM logs for webhook receipt
- [ ] Verify Lead event in Meta Events Manager (system_generated)
- [ ] Move to "Deposit Paid" → Purchase event appears

---

## Event Value Reference

| Event | Therapy Type | Value |
|-------|--------------|-------|
| Lead (web form) | Gene Therapy | $37,500 |
| Lead (web form) | Exosome Therapy | $15,000 |
| Lead (qualified) | Any | $0 (signal only) |
| CompleteRegistration | Any | $500 |
| Purchase (deposit) | Gene | $5,000-$10,000 |
| Purchase (deposit) | Exosome | $2,500-$5,000 |
| Purchase (treatment) | Gene | $25,000-$50,000 |
| Purchase (treatment) | Exosome | $5,000-$35,000 |
