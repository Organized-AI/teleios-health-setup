# Phase 1 Complete: Web GTM Deployment

**Date Completed:** December 24, 2024
**Status:** Ready for Deployment

---

## Summary

Phase 1 provides all necessary scripts and configurations for deploying browser-side tracking on teleios.health using Google Tag Manager.

---

## Account Reference

| Platform | ID |
|----------|-----|
| Web GTM Container | `GTM-WM5S3WSG` |
| GA4 Measurement ID | `G-CS05KZX2HG` |
| Meta Pixel | `912613798381607` |
| Google Ads Conversion ID | `17810172296` |

---

## Deliverable 1: GTM Head Snippet

**Location:** Webflow → Project Settings → Custom Code → Head Code

```html
<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-WM5S3WSG');</script>
<!-- End Google Tag Manager -->
```

---

## Deliverable 2: GTM Noscript Snippet

**Location:** Webflow → Project Settings → Custom Code → Body Code (Start)

```html
<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WM5S3WSG"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->
```

---

## Deliverable 3: Form Tracking DataLayer Script

**Location:** Webflow → Project Settings → Custom Code → Body Code (End, before `</body>`)

```html
<script>
/**
 * Teleios Health - Form Tracking Script
 * Captures form submissions and pushes to dataLayer for GTM
 * Generates unique event_id for Meta CAPI deduplication
 */
(function() {
  'use strict';

  // Generate UUID v4 for event deduplication
  function generateEventId() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  // Get cookie value by name
  function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length === 2) return parts.pop().split(";").shift();
    return '';
  }

  // Normalize phone number (remove non-digits, add US country code if needed)
  function normalizePhone(phone) {
    if (!phone) return '';
    var digits = phone.replace(/\D/g, '');
    if (digits.length === 10) {
      digits = '1' + digits;
    }
    return digits;
  }

  // Parse name into first and last
  function parseName(fullName) {
    if (!fullName) return { first: '', last: '' };
    var parts = fullName.trim().split(/\s+/);
    return {
      first: parts[0] || '',
      last: parts.slice(1).join(' ') || ''
    };
  }

  // Initialize dataLayer
  window.dataLayer = window.dataLayer || [];

  // Track all form submissions
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

      form.addEventListener('submit', function(e) {
        var formData = new FormData(form);
        var eventId = generateEventId();

        // Try to get name fields
        var firstName = formData.get('first_name') || formData.get('firstName') || formData.get('First Name') || '';
        var lastName = formData.get('last_name') || formData.get('lastName') || formData.get('Last Name') || '';

        // If no separate name fields, try to parse full name
        if (!firstName && !lastName) {
          var fullName = formData.get('name') || formData.get('Name') || formData.get('full_name') || '';
          var parsed = parseName(fullName);
          firstName = parsed.first;
          lastName = parsed.last;
        }

        // Get email - try common field variations
        var email = formData.get('email') || formData.get('Email') || formData.get('email_address') || '';
        email = email.toLowerCase().trim();

        // Get phone - try common field variations
        var phone = formData.get('phone') || formData.get('Phone') || formData.get('phone_number') || formData.get('tel') || '';
        phone = normalizePhone(phone);

        // Push form submission event
        window.dataLayer.push({
          'event': 'form_submit',
          'event_id': eventId,
          'form_id': form.id || form.getAttribute('data-form-id') || 'contact_form',
          'form_name': form.getAttribute('name') || form.getAttribute('data-name') || 'Contact Form',
          'user_data': {
            'email': email,
            'phone': phone,
            'first_name': firstName.toLowerCase().trim(),
            'last_name': lastName.toLowerCase().trim()
          },
          'meta_cookies': {
            'fbp': getCookie('_fbp'),
            'fbc': getCookie('_fbc')
          }
        });

        // Log for debugging (remove in production)
        console.log('[Teleios Tracking] Form submitted:', {
          event_id: eventId,
          form_id: form.id,
          has_email: !!email,
          has_phone: !!phone
        });
      });
    });

    // Track page view with event_id for deduplication
    var pageViewEventId = generateEventId();
    window.dataLayer.push({
      'event': 'page_view_enhanced',
      'event_id': pageViewEventId,
      'page_location': window.location.href,
      'page_title': document.title,
      'meta_cookies': {
        'fbp': getCookie('_fbp'),
        'fbc': getCookie('_fbc')
      }
    });
  });
})();
</script>
```

---

## Deliverable 4: Validation Checklist

### Pre-Deployment Checks

| Check | Status | Notes |
|-------|--------|-------|
| GTM container has 21 tags | ⏳ | Verify in GTM workspace |
| GTM container has 14 triggers | ⏳ | Verify in GTM workspace |
| GTM container has 18 variables | ⏳ | Verify in GTM workspace |
| Meta Pixel ID correct (912613798381607) | ⏳ | Check in pixel tags |
| GA4 Measurement ID correct (G-CS05KZX2HG) | ⏳ | Check in GA4 tags |
| Google Ads Conversion ID correct (17810172296) | ⏳ | Check in conversion tags |

### Webflow Deployment Steps

| Step | Action | Status |
|------|--------|--------|
| 1 | Open Webflow Dashboard → teleios.health | ⏳ |
| 2 | Navigate to Project Settings → Custom Code | ⏳ |
| 3 | Paste GTM head snippet in Head Code | ⏳ |
| 4 | Paste GTM noscript in Body Code (start) | ⏳ |
| 5 | Paste form tracking script in Body Code (end) | ⏳ |
| 6 | Save changes | ⏳ |
| 7 | Publish Webflow site | ⏳ |

### Post-Deployment Validation

| Test | Expected Result | Status |
|------|-----------------|--------|
| **GTM Preview Mode** | | |
| Open GTM Preview | Debug panel loads | ⏳ |
| Navigate to teleios.health | Tags fire list visible | ⏳ |
| Verify GA4 - Page View fires | ✅ on page load | ⏳ |
| Verify Meta Pixel - PageView fires | ✅ on page load | ⏳ |
| Verify Google Ads Remarketing fires | ✅ on page load | ⏳ |
| Submit test form | form_submit event in dataLayer | ⏳ |
| Verify Meta Pixel - Lead fires | ✅ on form submit | ⏳ |
| Verify Google Ads - Lead Conversion fires | ✅ on form submit | ⏳ |
| **Meta Pixel Helper** | | |
| PageView event visible | Green checkmark | ⏳ |
| Lead event on form submit | Green checkmark with user_data | ⏳ |
| event_id parameter present | Unique UUID shown | ⏳ |
| **GA4 Realtime** | | |
| Open GA4 → Reports → Realtime | Dashboard loads | ⏳ |
| page_view event visible | Shows teleios.health | ⏳ |
| generate_lead event on form submit | Shows with parameters | ⏳ |
| **Browser Console** | | |
| No JavaScript errors | Console clean | ⏳ |
| dataLayer populated | `console.log(dataLayer)` shows events | ⏳ |
| event_id generated | UUID format in events | ⏳ |

### Expected Tag Fires

**On Page Load:**
| Tag Name | Trigger | Platform |
|----------|---------|----------|
| GA4 - Page View | All Pages | Google Analytics 4 |
| Meta Pixel - PageView | All Pages | Meta |
| Google Ads Remarketing | All Pages | Google Ads |

**On Form Submit:**
| Tag Name | Trigger | Platform |
|----------|---------|----------|
| GA4 - generate_lead | form_submit event | Google Analytics 4 |
| Meta Pixel - Lead | form_submit event | Meta |
| Google Ads - Lead Conversion | form_submit event | Google Ads |

**On Therapy Pages:**
| Tag Name | Trigger | Platform |
|----------|---------|----------|
| Meta Pixel - ViewContent | Path contains /therapy, /exosome, /gene | Meta |
| GA4 - view_item | Path contains /therapy, /exosome, /gene | Google Analytics 4 |

---

## Configuration Details

### Tags in Web GTM Container (21 Total)

| # | Tag Name | Type | Trigger |
|---|----------|------|---------|
| 1 | GA4 - Page View | GA4 Configuration | All Pages |
| 2 | GA4 - Event - Form Submit | GA4 Event | form_submit |
| 3 | GA4 - Event - View Item | GA4 Event | Therapy Pages |
| 4 | GA4 - Event - Scroll Depth | GA4 Event | Scroll Triggers |
| 5 | Meta Pixel - Base Code | Custom HTML | All Pages |
| 6 | Meta Pixel - PageView | Custom HTML | All Pages |
| 7 | Meta Pixel - Lead | Custom HTML | form_submit |
| 8 | Meta Pixel - ViewContent | Custom HTML | Therapy Pages |
| 9 | Google Ads Remarketing | Google Ads Remarketing | All Pages |
| 10 | Google Ads - Lead Conversion | Google Ads Conversion | form_submit |
| 11 | Google Ads - Deposit Conversion | Google Ads Conversion | deposit_event |
| 12 | Google Ads - Treatment Conversion | Google Ads Conversion | treatment_event |
| 13-21 | Additional engagement/utility tags | Various | Various |

### Triggers (14 Total)

| # | Trigger Name | Type | Condition |
|---|--------------|------|-----------|
| 1 | All Pages | Page View | All Pages |
| 2 | form_submit | Custom Event | event equals form_submit |
| 3 | Therapy Pages | Page View | Path contains /therapy OR /exosome OR /gene |
| 4 | Scroll - 50% | Scroll Depth | 50% vertical scroll |
| 5 | Scroll - 75% | Scroll Depth | 75% vertical scroll |
| 6 | Video - Start | YouTube Video | Video Start |
| 7 | Video - 50% | YouTube Video | 50% progress |
| 8 | Video - Complete | YouTube Video | Video Complete |
| 9-14 | Additional triggers | Various | Various |

### Variables (18 Total)

| # | Variable Name | Type | Value |
|---|---------------|------|-------|
| 1 | DL - event_id | Data Layer | event_id |
| 2 | DL - user_data.email | Data Layer | user_data.email |
| 3 | DL - user_data.phone | Data Layer | user_data.phone |
| 4 | DL - user_data.first_name | Data Layer | user_data.first_name |
| 5 | DL - user_data.last_name | Data Layer | user_data.last_name |
| 6 | DL - form_id | Data Layer | form_id |
| 7 | DL - form_name | Data Layer | form_name |
| 8 | Cookie - _fbp | 1st Party Cookie | _fbp |
| 9 | Cookie - _fbc | 1st Party Cookie | _fbc |
| 10 | Page - Content Name | Lookup Table | Path-based content names |
| 11 | Scroll Depth Threshold | Built-in | Scroll percentage |
| 12 | Video Title | Built-in | YouTube video title |
| 13 | Video Percent | Built-in | Video progress |
| 14-18 | Additional variables | Various | Various |

---

## GTM Container Publish Instructions

1. **Open GTM:** https://tagmanager.google.com/
2. **Navigate to:** Account 6328225355 → Container GTM-WM5S3WSG
3. **Select Workspace 3**
4. **Review Changes:**
   - Click "Submit" in top right
   - Review all 21 tags, 14 triggers, 18 variables
5. **Version Details:**
   - Version Name: `Teleios Health Lead Tracking v1`
   - Description: `Initial deployment with Meta Pixel, GA4, Google Ads tracking. Includes form tracking with event_id deduplication.`
6. **Publish:** Click "Publish"

---

## Troubleshooting

### Issue: GTM Preview Not Loading
**Solution:**
- Clear browser cache and cookies
- Disable ad blockers temporarily
- Try in incognito/private browsing mode
- Check if GTM snippet is in page source

### Issue: Meta Pixel Not Firing
**Solution:**
- Verify Pixel ID: `912613798381607`
- Check Meta Pixel Helper extension for errors
- Ensure no JavaScript errors blocking execution
- Verify trigger conditions in GTM

### Issue: Form Events Not Tracking
**Solution:**
- Check form has standard input fields (email, phone, name)
- Open console and verify `window.dataLayer` contains events
- Ensure form tracking script loads before form submission
- Check for form field name variations

### Issue: GA4 Events Not Appearing
**Solution:**
- Verify Measurement ID: `G-CS05KZX2HG`
- Check GA4 data stream is active
- Wait 24-48 hours for full data processing
- Use GA4 DebugView for real-time testing

---

## Next Steps

Upon successful validation:
1. ✅ Confirm all browser-side tracking is live
2. ➡️ Proceed to **Phase 2: Server-Side GTM + CAPIG**
3. Configure Meta CAPI for server-side event delivery
4. Enable event deduplication between browser and server

---

## Sign-Off

| Role | Name | Date | Status |
|------|------|------|--------|
| GTM Administrator | | | ⏳ Pending |
| Webflow Administrator | | | ⏳ Pending |
| QA Validation | | | ⏳ Pending |

**Phase 1 Status:** Ready for Deployment
