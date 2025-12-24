# Phase 4 Complete: Enhanced Tracking & Optimization

**Date Completed:** December 24, 2024
**Status:** Configuration Ready for Implementation

---

## Summary

Phase 4 provides configurations for enhanced engagement tracking (ViewContent, scroll depth, video engagement), Google Enhanced Conversions, and Event Match Quality optimization to achieve 7+ EMQ scores.

---

## Account Reference

| Platform | ID |
|----------|-----|
| Web GTM Container | `GTM-WM5S3WSG` |
| Server GTM Container | `GTM-MLBJCV38` |
| GA4 Measurement ID | `G-CS05KZX2HG` |
| Meta Pixel | `912613798381607` |
| Google Ads Conversion ID | `17810172296` |

---

## Deliverable 1: ViewContent Tag Configurations

### Web GTM Tags

#### Meta - ViewContent - Exosome Therapy

```
Tag Name: Meta - ViewContent - Exosome Therapy
Tag Type: Custom HTML

Code:
<script>
  fbq('track', 'ViewContent', {
    content_name: 'Exosome Therapy',
    content_category: 'therapy',
    content_type: 'service',
    content_ids: ['exosome-therapy']
  });
</script>

Trigger: Page View - Exosome
         (Page Path contains "exosome")
```

#### Meta - ViewContent - Gene Therapy

```
Tag Name: Meta - ViewContent - Gene Therapy
Tag Type: Custom HTML

Code:
<script>
  fbq('track', 'ViewContent', {
    content_name: 'Gene Therapy',
    content_category: 'therapy',
    content_type: 'service',
    content_ids: ['gene-therapy']
  });
</script>

Trigger: Page View - Gene
         (Page Path contains "gene")
```

#### Meta - ViewContent - Clinic

```
Tag Name: Meta - ViewContent - Clinic
Tag Type: Custom HTML

Code:
<script>
  fbq('track', 'ViewContent', {
    content_name: 'Teleios Clinic',
    content_category: 'location',
    content_type: 'facility',
    content_ids: ['clinic']
  });
</script>

Trigger: Page View - Clinic
         (Page Path contains "clinic")
```

#### GA4 - view_item (Therapy Pages)

```
Tag Name: GA4 - view_item - Therapy Pages
Tag Type: GA4 Event

Configuration:
├── Measurement ID: G-CS05KZX2HG
├── Event Name: view_item
└── Parameters:
    ├── item_name: {{Page - Content Name}}
    ├── item_category: therapy
    ├── item_id: {{Page - Content ID}}
    └── page_location: {{Page URL}}

Trigger: Therapy Pages (Combined)
         (Page Path matches regex .*(exosome|gene|clinic|therapy).*)
```

### Content Lookup Variables

#### Variable: Page - Content Name

```
Variable Name: Page - Content Name
Variable Type: Lookup Table
Input Variable: {{Page Path}}

Lookup Table:
├── /exosome → Exosome Therapy
├── /gene → Gene Therapy
├── /clinic → Teleios Clinic
├── /therapy → Therapy Overview
└── Default: {{Page Title}}
```

#### Variable: Page - Content ID

```
Variable Name: Page - Content ID
Variable Type: Lookup Table
Input Variable: {{Page Path}}

Lookup Table:
├── /exosome → exosome-therapy
├── /gene → gene-therapy
├── /clinic → teleios-clinic
├── /therapy → therapy-overview
└── Default: page-{{Page Path}}
```

---

## Deliverable 2: Scroll Depth Tracking

### Enable Built-in Variables

**In Web GTM Container:**
1. Navigate to Variables → Built-in Variables
2. Enable the following:
   - ☑️ Scroll Depth Threshold
   - ☑️ Scroll Depth Units
   - ☑️ Scroll Direction

### Scroll Triggers

#### Trigger: Scroll - 50%

```
Trigger Name: Scroll - 50%
Trigger Type: Scroll Depth

Configuration:
├── Vertical Scroll Depths: Yes
├── Percentages: 50
├── Horizontal Scroll Depths: No
└── Enable this trigger on: All Pages
    (or specify: Page Path matches regex .*(home|exosome|gene|clinic).*)
```

#### Trigger: Scroll - 75%

```
Trigger Name: Scroll - 75%
Trigger Type: Scroll Depth

Configuration:
├── Vertical Scroll Depths: Yes
├── Percentages: 75
├── Horizontal Scroll Depths: No
└── Enable this trigger on: All Pages
```

### Scroll Event Tags

#### GA4 - Scroll Depth

```
Tag Name: GA4 - Scroll Depth
Tag Type: GA4 Event

Configuration:
├── Measurement ID: G-CS05KZX2HG
├── Event Name: scroll
└── Parameters:
    ├── percent_scrolled: {{Scroll Depth Threshold}}
    ├── page_path: {{Page Path}}
    └── page_title: {{Page Title}}

Trigger: Scroll - 50% OR Scroll - 75%
```

#### Meta - Scroll Depth (Custom Event)

```
Tag Name: Meta - Scroll Depth
Tag Type: Custom HTML

Code:
<script>
  fbq('trackCustom', 'ScrollDepth', {
    percent_scrolled: '{{Scroll Depth Threshold}}',
    page_path: '{{Page Path}}'
  });
</script>

Trigger: Scroll - 75%
         (Only track deep scroll for Meta to reduce noise)
```

---

## Deliverable 3: Video Engagement Tracking

### Enable Video Built-in Variables

**In Web GTM Container:**
1. Navigate to Variables → Built-in Variables
2. Enable the following:
   - ☑️ Video Provider
   - ☑️ Video Status
   - ☑️ Video Title
   - ☑️ Video Percent
   - ☑️ Video Current Time
   - ☑️ Video Duration
   - ☑️ Video URL
   - ☑️ Video Visible

### Video Triggers

#### Trigger: Video - Start

```
Trigger Name: Video - Start
Trigger Type: YouTube Video

Configuration:
├── Capture: Start
├── Add JavaScript API support: Yes
└── Enable this trigger on: All Videos
```

#### Trigger: Video - 50% Progress

```
Trigger Name: Video - 50% Progress
Trigger Type: YouTube Video

Configuration:
├── Capture: Progress
├── Percentages: 50
├── Add JavaScript API support: Yes
└── Enable this trigger on: All Videos
```

#### Trigger: Video - Complete

```
Trigger Name: Video - Complete
Trigger Type: YouTube Video

Configuration:
├── Capture: Complete
├── Add JavaScript API support: Yes
└── Enable this trigger on: All Videos
```

### Video Event Tags

#### GA4 - Video Start

```
Tag Name: GA4 - Video Start
Tag Type: GA4 Event

Configuration:
├── Measurement ID: G-CS05KZX2HG
├── Event Name: video_start
└── Parameters:
    ├── video_title: {{Video Title}}
    ├── video_provider: {{Video Provider}}
    └── video_url: {{Video URL}}

Trigger: Video - Start
```

#### GA4 - Video Progress

```
Tag Name: GA4 - Video Progress
Tag Type: GA4 Event

Configuration:
├── Measurement ID: G-CS05KZX2HG
├── Event Name: video_progress
└── Parameters:
    ├── video_title: {{Video Title}}
    ├── video_percent: {{Video Percent}}
    ├── video_current_time: {{Video Current Time}}
    └── video_duration: {{Video Duration}}

Trigger: Video - 50% Progress
```

#### GA4 - Video Complete

```
Tag Name: GA4 - Video Complete
Tag Type: GA4 Event

Configuration:
├── Measurement ID: G-CS05KZX2HG
├── Event Name: video_complete
└── Parameters:
    ├── video_title: {{Video Title}}
    ├── video_provider: {{Video Provider}}
    └── video_duration: {{Video Duration}}

Trigger: Video - Complete
```

#### Meta - Video View (Custom)

```
Tag Name: Meta - Video View
Tag Type: Custom HTML

Code:
<script>
  fbq('trackCustom', 'VideoView', {
    video_title: '{{Video Title}}',
    video_percent: {{Video Percent}},
    video_status: '{{Video Status}}'
  });
</script>

Trigger: Video - 50% Progress OR Video - Complete
```

### Non-YouTube Video Tracking

For Vimeo or HTML5 videos, add this script to Webflow:

```html
<script>
/**
 * Non-YouTube Video Tracking
 * Tracks HTML5 video elements and Vimeo embeds
 */
(function() {
  'use strict';

  // Track HTML5 video elements
  document.querySelectorAll('video').forEach(function(video) {
    var videoTitle = video.getAttribute('data-title') ||
                     video.getAttribute('title') ||
                     'Hero Video';
    var hasFiredStart = false;
    var hasFired50 = false;
    var hasFiredComplete = false;

    video.addEventListener('play', function() {
      if (!hasFiredStart) {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          'event': 'video_start',
          'video_title': videoTitle,
          'video_provider': 'html5'
        });
        hasFiredStart = true;
      }
    });

    video.addEventListener('timeupdate', function() {
      var percent = (video.currentTime / video.duration) * 100;

      if (percent >= 50 && !hasFired50) {
        window.dataLayer.push({
          'event': 'video_progress',
          'video_title': videoTitle,
          'video_percent': 50,
          'video_provider': 'html5'
        });
        hasFired50 = true;
      }
    });

    video.addEventListener('ended', function() {
      if (!hasFiredComplete) {
        window.dataLayer.push({
          'event': 'video_complete',
          'video_title': videoTitle,
          'video_provider': 'html5'
        });
        hasFiredComplete = true;
      }
    });
  });
})();
</script>
```

---

## Deliverable 4: Google Enhanced Conversions Setup

### Update Google Ads Conversion Tag

**Edit existing Lead Conversion Tag:**

```
Tag Name: Google Ads - Lead Conversion
Tag Type: Google Ads Conversion Tracking

Configuration:
├── Conversion ID: 17810172296
├── Conversion Label: GKswCL2sndYbEIjTxqxC
├── Conversion Value: (optional, leave blank for leads)
└── Enhanced Conversions: Enabled ✓

Enhanced Conversions Configuration:
├── Data Source: Data Layer
├── Email: {{DL - user_data.email}}
├── Phone Number: {{DL - user_data.phone}}
├── First Name: {{DL - user_data.first_name}}
├── Last Name: {{DL - user_data.last_name}}
├── Street Address: {{DL - user_data.address}}
├── City: {{DL - user_data.city}}
├── Region: {{DL - user_data.state}}
├── Postal Code: {{DL - user_data.zip}}
└── Country: {{DL - user_data.country}}

Trigger: form_submit
```

### Enhanced User Data Variable

```
Variable Name: User Provided Data - Form
Variable Type: User-Provided Data

Configuration:
├── Type: Data Layer
├── Variable name containing user data: user_data
└── Normalize and hash: Automatic
```

### Updated Form Tracking Script

Replace the form tracking script in Webflow with this enhanced version:

```html
<script>
/**
 * Teleios Health - Enhanced Form Tracking
 * Captures comprehensive user data for Google Enhanced Conversions
 */
(function() {
  'use strict';

  function generateEventId() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length === 2) return parts.pop().split(";").shift();
    return '';
  }

  function normalizePhone(phone) {
    if (!phone) return '';
    var digits = phone.replace(/\D/g, '');
    // Add US country code if 10 digits
    if (digits.length === 10) {
      digits = '1' + digits;
    }
    return '+' + digits;
  }

  function getFormValue(formData, ...fieldNames) {
    for (var i = 0; i < fieldNames.length; i++) {
      var value = formData.get(fieldNames[i]);
      if (value && value.trim()) {
        return value.trim();
      }
    }
    return '';
  }

  window.dataLayer = window.dataLayer || [];

  document.addEventListener('DOMContentLoaded', function() {
    var forms = document.querySelectorAll('form');

    forms.forEach(function(form) {
      // Add hidden fields for Meta cookies
      ['fbp', 'fbc'].forEach(function(cookieName) {
        var input = document.createElement('input');
        input.type = 'hidden';
        input.name = cookieName;
        input.id = cookieName + '_field';
        input.value = getCookie('_' + cookieName) || '';
        form.appendChild(input);
      });

      form.addEventListener('submit', function(e) {
        var formData = new FormData(form);
        var eventId = generateEventId();

        // Update cookie values right before submit
        document.getElementById('fbp_field').value = getCookie('_fbp') || '';
        document.getElementById('fbc_field').value = getCookie('_fbc') || '';

        // Get email with multiple field name attempts
        var email = getFormValue(formData,
          'email', 'Email', 'email_address', 'EmailAddress', 'e-mail'
        ).toLowerCase();

        // Get phone with normalization
        var phone = normalizePhone(getFormValue(formData,
          'phone', 'Phone', 'phone_number', 'PhoneNumber', 'tel', 'telephone'
        ));

        // Get name fields
        var firstName = getFormValue(formData,
          'first_name', 'firstName', 'First Name', 'fname', 'first'
        ).toLowerCase();

        var lastName = getFormValue(formData,
          'last_name', 'lastName', 'Last Name', 'lname', 'last'
        ).toLowerCase();

        // If no separate name fields, try to parse full name
        if (!firstName && !lastName) {
          var fullName = getFormValue(formData, 'name', 'Name', 'full_name', 'fullName');
          if (fullName) {
            var parts = fullName.trim().split(/\s+/);
            firstName = (parts[0] || '').toLowerCase();
            lastName = (parts.slice(1).join(' ') || '').toLowerCase();
          }
        }

        // Get address fields (for Enhanced Conversions)
        var address = getFormValue(formData,
          'address', 'Address', 'street_address', 'street'
        );
        var city = getFormValue(formData,
          'city', 'City'
        );
        var state = getFormValue(formData,
          'state', 'State', 'region', 'province'
        );
        var zip = getFormValue(formData,
          'zip', 'Zip', 'postal_code', 'postalCode', 'zipcode'
        );
        var country = getFormValue(formData,
          'country', 'Country'
        ) || 'US';

        // Push enhanced form submission event
        window.dataLayer.push({
          'event': 'form_submit',
          'event_id': eventId,
          'form_id': form.id || form.getAttribute('data-form-id') || 'contact_form',
          'form_name': form.getAttribute('name') || form.getAttribute('data-name') || 'Contact Form',
          'user_data': {
            'email': email,
            'phone': phone,
            'first_name': firstName,
            'last_name': lastName,
            'address': address,
            'city': city,
            'state': state,
            'zip': zip,
            'country': country
          },
          'meta_cookies': {
            'fbp': getCookie('_fbp'),
            'fbc': getCookie('_fbc')
          }
        });

        console.log('[Teleios Tracking] Enhanced form data captured:', {
          event_id: eventId,
          has_email: !!email,
          has_phone: !!phone,
          has_address: !!address
        });
      });
    });
  });
})();
</script>
```

### Verify Enhanced Conversions in Google Ads

1. Go to Google Ads → Tools → Conversions
2. Select "Lead" conversion action
3. Check "Enhanced Conversions" section
4. Status should show "Active"
5. Wait 48-72 hours for match rate data

---

## Deliverable 5: Event Match Quality Optimization

### Current EMQ Audit Steps

1. Open Meta Events Manager: https://business.facebook.com/events_manager
2. Select Pixel: 912613798381607
3. Click "Data Sources" → Select your pixel
4. Go to "Event Match Quality" tab
5. Document current scores:

| Event | Current Score | Target Score |
|-------|---------------|--------------|
| PageView | ? | 6+ |
| Lead | ? | 7+ |
| ViewContent | ? | 6+ |
| Purchase | ? | 8+ |

### Parameters Required for 7+ EMQ

| Parameter | Required For | Implementation | Status |
|-----------|--------------|----------------|--------|
| **em (email)** | All events | Form capture + hash | ⏳ |
| **ph (phone)** | All events | Form capture + hash | ⏳ |
| **fn (first_name)** | Enhanced matching | Form capture | ⏳ |
| **ln (last_name)** | Enhanced matching | Form capture | ⏳ |
| **external_id** | Cross-device matching | GA4 client_id | ⏳ |
| **fbp** | Browser attribution | Cookie capture | ⏳ |
| **fbc** | Click attribution | Cookie capture | ⏳ |
| **client_ip_address** | Geo matching | Server-side | ⏳ |
| **client_user_agent** | Device matching | Server-side | ⏳ |

### Server-Side Variable Additions

Add to sGTM container for improved EMQ:

#### External ID Variable

```
Variable Name: External ID - GA Client
Variable Type: Event Data
Key Path: client_id

Alternative (from cookie):
Variable Name: External ID - Cookie
Variable Type: Cookie
Cookie Name: _ga

Processing: Extract GA client ID
// _ga cookie format: GA1.1.1234567890.1234567890
// Extract last two number groups
```

#### External ID Processing

For cleaner external_id, create a Custom JavaScript variable:

```javascript
// Variable Name: External ID - Processed
function() {
  var gaCookie = {{Cookie - _ga}};
  if (gaCookie) {
    // Extract the unique part from _ga cookie
    var parts = gaCookie.split('.');
    if (parts.length >= 4) {
      return parts[2] + '.' + parts[3];
    }
  }
  // Fallback to client_id from event data
  return {{Client ID}} || '';
}
```

### Update CAPIG Tags

Update all CAPIG tags to include external_id:

```
User Data Mapping (Add to all CAPIG tags):
├── external_id: {{External ID - Processed}}
```

### Phone Number Normalization

Ensure phone numbers are properly formatted:

```javascript
// In form tracking script
function normalizePhone(phone) {
  if (!phone) return '';

  // Remove all non-digits
  var digits = phone.replace(/\D/g, '');

  // Handle US numbers
  if (digits.length === 10) {
    return '+1' + digits;
  } else if (digits.length === 11 && digits.startsWith('1')) {
    return '+' + digits;
  }

  // Return with + prefix if not already
  return digits.startsWith('+') ? digits : '+' + digits;
}
```

### Email Normalization

Ensure emails are properly formatted:

```javascript
// In form tracking script
function normalizeEmail(email) {
  if (!email) return '';

  return email
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '');
}
```

---

## EMQ Score Reference Guide

### Score Breakdown

| Score Range | Rating | Typical Parameters |
|-------------|--------|-------------------|
| 1-3 | Poor | Only fbp/fbc or IP |
| 4-5 | Fair | + email OR phone |
| 6-7 | Good | + email AND phone + fbp/fbc |
| 8-10 | Excellent | All parameters + external_id |

### Parameter Impact

| Parameter | Typical EMQ Impact |
|-----------|-------------------|
| em (email) | +2-3 points |
| ph (phone) | +1-2 points |
| fn + ln (names) | +0.5-1 point |
| external_id | +0.5-1 point |
| fbp (browser ID) | +1-2 points |
| fbc (click ID) | +1-2 points |
| client_ip_address | +0.5 point |
| client_user_agent | +0.5 point |

### Optimization Actions by Current Score

**If Score is 1-3:**
1. Add email and phone capture to all forms
2. Ensure _fbp and _fbc cookies are passed
3. Enable server-side tracking (CAPIG)

**If Score is 4-5:**
1. Add first_name and last_name
2. Add external_id (GA client_id)
3. Verify cookie capture is working

**If Score is 6-7:**
1. Verify all parameters are being hashed correctly
2. Add additional address fields if available
3. Ensure consistency between browser and server events

**If Score is 8+:**
1. Maintain current implementation
2. Monitor for any regressions
3. Document baseline for comparison

---

## Testing Checklist

### ViewContent Testing

| Test | Expected Result | Status |
|------|-----------------|--------|
| Navigate to /exosome | ViewContent fires with content_name | ⏳ |
| Navigate to /gene | ViewContent fires with content_name | ⏳ |
| Navigate to /clinic | ViewContent fires with content_name | ⏳ |
| Check GA4 Realtime | view_item events appear | ⏳ |
| Check Meta Pixel Helper | ViewContent events shown | ⏳ |

### Scroll Depth Testing

| Test | Expected Result | Status |
|------|-----------------|--------|
| Scroll to 50% on any page | GA4 scroll event fires | ⏳ |
| Scroll to 75% on any page | GA4 scroll event fires | ⏳ |
| Scroll to 75% | Meta ScrollDepth custom event | ⏳ |
| Check GA4 Realtime | scroll events with percent | ⏳ |

### Video Engagement Testing

| Test | Expected Result | Status |
|------|-----------------|--------|
| Start playing video | video_start event fires | ⏳ |
| Watch to 50% | video_progress event fires | ⏳ |
| Complete video | video_complete event fires | ⏳ |
| Check GA4 Realtime | All video events appear | ⏳ |
| Check Meta Events | VideoView custom events | ⏳ |

### Enhanced Conversions Testing

| Test | Expected Result | Status |
|------|-----------------|--------|
| Submit form with full data | User data in dataLayer | ⏳ |
| Check GTM Preview | user_data object populated | ⏳ |
| Verify Google Ads | Enhanced Conversions active | ⏳ |
| Wait 48-72 hours | Match rate data visible | ⏳ |

### EMQ Testing

| Test | Expected Result | Status |
|------|-----------------|--------|
| Document baseline scores | Record current EMQ | ⏳ |
| Submit test leads | Events in Meta EM | ⏳ |
| Wait 48 hours | EMQ scores update | ⏳ |
| PageView EMQ | Target: 6+ | ⏳ |
| Lead EMQ | Target: 7+ | ⏳ |
| Purchase EMQ | Target: 8+ | ⏳ |

---

## Implementation Summary

### New Tags Added (Web GTM)

| # | Tag Name | Event | Trigger |
|---|----------|-------|---------|
| 1 | Meta - ViewContent - Exosome | ViewContent | Exosome pages |
| 2 | Meta - ViewContent - Gene | ViewContent | Gene pages |
| 3 | Meta - ViewContent - Clinic | ViewContent | Clinic pages |
| 4 | GA4 - view_item - Therapy | view_item | All therapy pages |
| 5 | GA4 - Scroll Depth | scroll | 50%/75% scroll |
| 6 | Meta - Scroll Depth | ScrollDepth | 75% scroll |
| 7 | GA4 - Video Start | video_start | Video start |
| 8 | GA4 - Video Progress | video_progress | Video 50% |
| 9 | GA4 - Video Complete | video_complete | Video complete |
| 10 | Meta - Video View | VideoView | Video 50%/complete |

### New Triggers Added (Web GTM)

| # | Trigger Name | Type |
|---|--------------|------|
| 1 | Page View - Exosome | Page View (path contains /exosome) |
| 2 | Page View - Gene | Page View (path contains /gene) |
| 3 | Page View - Clinic | Page View (path contains /clinic) |
| 4 | Therapy Pages (Combined) | Page View (regex match) |
| 5 | Scroll - 50% | Scroll Depth |
| 6 | Scroll - 75% | Scroll Depth |
| 7 | Video - Start | YouTube Video |
| 8 | Video - 50% Progress | YouTube Video |
| 9 | Video - Complete | YouTube Video |

### New Variables Added (Web GTM)

| # | Variable Name | Type |
|---|---------------|------|
| 1 | Page - Content Name | Lookup Table |
| 2 | Page - Content ID | Lookup Table |
| 3 | Scroll Depth Threshold | Built-in |
| 4 | Scroll Direction | Built-in |
| 5 | Video Title | Built-in |
| 6 | Video Percent | Built-in |
| 7 | Video Status | Built-in |
| 8 | User Provided Data - Form | User-Provided Data |

---

## Next Steps

Upon successful validation:
1. ✅ All engagement tracking operational
2. ✅ Enhanced Conversions active in Google Ads
3. ✅ EMQ scores at 7+ for key events
4. ➡️ Proceed to **Phase 5: Documentation & Handoff** (optional)
5. Create monitoring dashboards
6. Set up alerts for event drops

---

## Sign-Off

| Role | Name | Date | Status |
|------|------|------|--------|
| GTM Configuration | | | ⏳ Pending |
| ViewContent Testing | | | ⏳ Pending |
| Scroll/Video Testing | | | ⏳ Pending |
| Enhanced Conversions | | | ⏳ Pending |
| EMQ Optimization | | | ⏳ Pending |

**Phase 4 Status:** Configuration Ready for Implementation
