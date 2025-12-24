# Phase 4: Enhanced Tracking & Optimization

## Objective

Add additional engagement tracking and optimize event match quality.

## Prerequisites

- Phases 1-3 completed
- All core conversion tracking operational
- Access to GTM web and server containers

## Account Reference

| Platform | ID |
|----------|-----|
| Web GTM | `GTM-WM5S3WSG` |
| Server GTM | `GTM-MLBJCV38` |
| GA4 Measurement ID | `G-CS05KZX2HG` |
| Meta Pixel | `912613798381607` |
| Google Ads Conversion ID | `17810172296` |

---

## Tasks

### Task 4.1: Add ViewContent Tags

**Web GTM - ViewContent Tags:**

**Tag: Meta - ViewContent - Exosome Therapy**
```
Tag Type: Custom HTML (or Meta Pixel tag)
Event: ViewContent

Parameters:
- content_name: "Exosome Therapy"
- content_category: "therapy"
- content_type: "service"

Trigger: Page View - path contains "/exosome"
```

**Tag: Meta - ViewContent - Gene Therapy**
```
Event: ViewContent

Parameters:
- content_name: "Gene Therapy"
- content_category: "therapy"
- content_type: "service"

Trigger: Page View - path contains "/gene"
```

**Tag: Meta - ViewContent - Clinic**
```
Event: ViewContent

Parameters:
- content_name: "Teleios Clinic"
- content_category: "location"
- content_type: "service"

Trigger: Page View - path contains "/clinic"
```

**Tag: GA4 - view_item (Therapy Pages)**
```
Tag Type: GA4 Event
Event Name: view_item

Parameters:
- item_name: {{Page - Content Name}}
- item_category: therapy
- page_location: {{Page URL}}

Trigger: Therapy Pages (combine all therapy paths)
```

**Variable: Page - Content Name**
```
Type: Lookup Table
Input: {{Page Path}}

Lookup:
/exosome → Exosome Therapy
/gene → Gene Therapy
/clinic → Teleios Clinic
Default: {{Page Title}}
```

**Validation:**
- [ ] ViewContent tag for Exosome page
- [ ] ViewContent tag for Gene page
- [ ] ViewContent tag for Clinic page
- [ ] GA4 view_item tag created
- [ ] Content name variable configured

---

### Task 4.2: Implement Scroll Tracking

**Enable Scroll Depth Variable (Web GTM):**
1. Go to Variables → Built-in Variables
2. Enable: Scroll Depth Threshold
3. Enable: Scroll Depth Units
4. Enable: Scroll Direction

**Trigger: Scroll - 50%**
```
Trigger Type: Scroll Depth
Scroll Depth Type: Vertical Scroll Depths
Percentages: 50

Enable on: Some Pages
Page Path contains: (leave blank for all, or specify key pages)
```

**Trigger: Scroll - 75%**
```
Trigger Type: Scroll Depth
Percentages: 75
```

**Tag: GA4 - Scroll Depth**
```
Tag Type: GA4 Event
Event Name: scroll

Parameters:
- percent_scrolled: {{Scroll Depth Threshold}}
- page_path: {{Page Path}}

Trigger: Scroll - 50% OR Scroll - 75%
```

**Tag: Meta - Scroll Depth (Custom Event)**
```
Tag Type: Custom HTML

<script>
fbq('trackCustom', 'ScrollDepth', {
  percent_scrolled: {{Scroll Depth Threshold}},
  page_path: '{{Page Path}}'
});
</script>

Trigger: Scroll - 75% (only deep scroll for Meta)
```

**Validation:**
- [ ] Scroll depth built-in variables enabled
- [ ] 50% scroll trigger created
- [ ] 75% scroll trigger created
- [ ] GA4 scroll event tag working
- [ ] Meta custom scroll event working

---

### Task 4.3: Add Video Engagement

**Enable Video Variables (Web GTM):**
1. Variables → Built-in Variables
2. Enable: Video Provider
3. Enable: Video Status
4. Enable: Video Title
5. Enable: Video Percent
6. Enable: Video Current Time

**Trigger: Video - Start**
```
Trigger Type: YouTube Video
Capture: Start

Enable on: All Videos (or specify embedded video IDs)
```

**Trigger: Video - 50% Progress**
```
Trigger Type: YouTube Video
Capture: Progress
Percentages: 50
```

**Trigger: Video - Complete**
```
Trigger Type: YouTube Video
Capture: Complete
```

**Tag: GA4 - Video Engagement**
```
Tag Type: GA4 Event

For Video Start:
Event Name: video_start
Parameters:
- video_title: {{Video Title}}
- video_provider: {{Video Provider}}

For Video Progress:
Event Name: video_progress
Parameters:
- video_title: {{Video Title}}
- video_percent: {{Video Percent}}

For Video Complete:
Event Name: video_complete
Parameters:
- video_title: {{Video Title}}
```

**Tag: Meta - Video View (Custom)**
```
Tag Type: Custom HTML

<script>
fbq('trackCustom', 'VideoView', {
  video_title: '{{Video Title}}',
  video_percent: {{Video Percent}},
  video_status: '{{Video Status}}'
});
</script>

Trigger: Video - 50% Progress OR Video - Complete
```

**Note for Non-YouTube Videos:**
For Vimeo or custom HTML5 video players, use Element Visibility triggers or custom JavaScript to track video engagement.

**Validation:**
- [ ] Video built-in variables enabled
- [ ] Video start trigger working
- [ ] Video progress trigger working
- [ ] Video complete trigger working
- [ ] GA4 video events appearing
- [ ] Meta video custom events tracked

---

### Task 4.4: Enhanced Conversions Setup

**Google Ads Enhanced Conversions (Web GTM):**

1. Edit existing Google Ads Conversion Tag (Lead)
2. Enable "Enhanced Conversions"
3. Configure user data source:

**User Data Variable:**
```
Type: User-Provided Data
Data Source: Data Layer

Email: {{DL - user_data.email}}
Phone: {{DL - user_data.phone}}
First Name: {{DL - user_data.first_name}}
Last Name: {{DL - user_data.last_name}}
Street Address: {{DL - user_data.address}}
City: {{DL - user_data.city}}
Region: {{DL - user_data.state}}
Postal Code: {{DL - user_data.zip}}
Country: {{DL - user_data.country}}
```

**Update Form Tracking Script:**
```javascript
// Enhanced data collection for Google Ads
document.addEventListener('DOMContentLoaded', function() {
  var forms = document.querySelectorAll('form');
  forms.forEach(function(form) {
    form.addEventListener('submit', function(e) {
      var formData = new FormData(form);
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        'event': 'form_submit',
        'form_id': form.id || 'unnamed_form',
        'user_data': {
          'email': (formData.get('email') || '').toLowerCase().trim(),
          'phone': formData.get('phone') || '',
          'first_name': formData.get('first_name') || '',
          'last_name': formData.get('last_name') || '',
          'address': formData.get('address') || '',
          'city': formData.get('city') || '',
          'state': formData.get('state') || '',
          'zip': formData.get('zip') || '',
          'country': formData.get('country') || 'US'
        }
      });
    });
  });
});
```

**Verification in Google Ads:**
1. Go to Google Ads → Tools → Conversions
2. Select Lead conversion
3. Check "Enhanced Conversions" status
4. Wait 48-72 hours for match rate data

**Validation:**
- [ ] Enhanced Conversions enabled on tag
- [ ] User data variable configured
- [ ] Form script captures all fields
- [ ] Google Ads shows Enhanced Conversions active

---

### Task 4.5: Event Match Quality Optimization

**Current EMQ Audit:**
1. Open Meta Events Manager
2. Select Pixel 912613798381607
3. Go to Overview → Event Match Quality
4. Note current scores for each event

**Required Improvements:**

| Parameter | Priority | Impact |
|-----------|----------|--------|
| em (email) | High | +2-3 points |
| ph (phone) | High | +1-2 points |
| fn (first name) | Medium | +0.5 point |
| ln (last name) | Medium | +0.5 point |
| external_id | Medium | +1 point |
| fbp cookie | High | +1-2 points |
| fbc cookie | High | +1-2 points |
| client_ip_address | Medium | +0.5 point |
| client_user_agent | Medium | +0.5 point |

**Add External ID (Server GTM):**

Update CAPIG tags to include external_id:
```
External ID Source: {{DL - user_id}} OR {{Cookie - client_id}}
```

**Create Client ID Variable:**
```
Variable Name: Cookie - client_id
Type: Cookie
Cookie Name: _ga

Processing: Extract GA client ID
// Convert _ga cookie to clean client ID
// GA4.1.1234567890.1234567890 → 1234567890.1234567890
```

**Ensure Browser Data Pass-through:**

Verify sGTM receives and forwards:
- Client IP Address (from request)
- User Agent (from request header)
- fbp cookie (from web container)
- fbc cookie (from web container)

**Target Scores:**
| Event | Current | Target |
|-------|---------|--------|
| PageView | ? | 6+ |
| Lead | ? | 7+ |
| Purchase | ? | 8+ |

**Validation:**
- [ ] EMQ scores documented
- [ ] External ID configured
- [ ] All user parameters passing
- [ ] Browser data flowing to sGTM
- [ ] Target EMQ scores achieved (7+)

---

## Deliverables

| Deliverable | Status |
|-------------|--------|
| ViewContent tracking on therapy pages | ⏳ |
| Scroll depth tracking (50%, 75%) | ⏳ |
| Video engagement tracking | ⏳ |
| Google Ads Enhanced Conversions enabled | ⏳ |
| Event Match Quality optimized to 7+ | ⏳ |

---

## Completion Criteria

Phase 4 is complete when:
- [ ] All ViewContent tags firing on therapy pages
- [ ] Scroll depth events appearing in GA4
- [ ] Video events tracking (if videos present)
- [ ] Enhanced Conversions active in Google Ads
- [ ] EMQ scores at 7 or higher for key events
- [ ] All engagement data visible in analytics

---

## Next Phase

Upon completion, proceed to [PHASE-5-DOCUMENTATION.md](./PHASE-5-DOCUMENTATION.md)

---

## Troubleshooting

### Scroll tracking not firing
- Verify page has enough content to scroll
- Check trigger threshold settings
- Test in GTM Preview mode
- Ensure no JavaScript errors blocking

### Video tracking not working
- Confirm video is YouTube embedded
- Check Video variables are enabled
- For non-YouTube, implement custom tracking
- Verify video player API is accessible

### Enhanced Conversions not matching
- Ensure user data is properly formatted
- Email must be lowercase and trimmed
- Phone should include country code
- Wait 72 hours for Google to process

### Low EMQ scores
- Add more user data parameters
- Verify hashing is correct (Meta handles hashing)
- Check fbp/fbc cookies are passing
- Include external_id for offline events

---

## Event Match Quality Reference

### Improving Email Match Rate
```javascript
// Proper email formatting
email = email.toLowerCase().trim();
// Remove spaces, ensure valid format
```

### Improving Phone Match Rate
```javascript
// Include country code
phone = phone.replace(/\D/g, ''); // Remove non-digits
if (!phone.startsWith('1')) phone = '1' + phone; // Add US code
```

### FBP/FBC Cookie Importance

The `_fbp` cookie (Facebook Pixel Browser ID) is crucial for matching:
- Created when user lands on site with pixel
- Persists for 90 days
- Should be captured on form submission
- Passed to server for offline events

The `_fbc` cookie (Facebook Click ID) captures:
- URL parameter `fbclid` from Meta ad clicks
- Converts to cookie format
- Critical for attribution

### EMQ Score Breakdown

| Score | Rating | Action |
|-------|--------|--------|
| 1-3 | Poor | Add required parameters urgently |
| 4-5 | Fair | Add additional parameters |
| 6-7 | Good | Optimize existing parameters |
| 8-10 | Excellent | Maintain current setup |
