# Phase 1: Finalize Web GTM Container

## Objective

Publish the completed web GTM container and validate all browser-side tracking.

## Prerequisites

- Access to GTM account (6328225355)
- Access to Webflow for teleios.health
- GTM Preview extension installed
- Meta Pixel Helper extension installed

## Account Reference

| Platform | ID |
|----------|-----|
| Web GTM | `GTM-WM5S3WSG` |
| GA4 Measurement ID | `G-CS05KZX2HG` |
| Meta Pixel | `912613798381607` |
| Google Ads Conversion ID | `17810172296` |

**GTM Container URL:** https://tagmanager.google.com/#/container/accounts/6328225355/containers/237555513/workspaces/3

---

## Tasks

### Task 1.1: Publish Web Container

**Steps:**
1. Open GTM workspace 3 for GTM-WM5S3WSG
2. Review all 21 tags, 14 triggers, 18 variables
3. Submit with version name: `Teleios Health Lead Tracking v1`
4. Publish to production

**Validation:**
- [ ] Container version published successfully
- [ ] No workspace errors or warnings

---

### Task 1.2: Deploy Webflow Scripts

**GTM Head Snippet:**
```html
<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-WM5S3WSG');</script>
<!-- End Google Tag Manager -->
```

**GTM Noscript (Body Start):**
```html
<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WM5S3WSG"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->
```

**Form Tracking DataLayer Script (Before </body>):**
```html
<script>
// Teleios Health Form Tracking
document.addEventListener('DOMContentLoaded', function() {
  var forms = document.querySelectorAll('form');
  forms.forEach(function(form) {
    form.addEventListener('submit', function(e) {
      var formData = new FormData(form);
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        'event': 'form_submit',
        'form_id': form.id || 'unnamed_form',
        'form_name': form.getAttribute('name') || form.id || 'contact_form',
        'user_data': {
          'email': formData.get('email') || formData.get('Email') || '',
          'phone': formData.get('phone') || formData.get('Phone') || '',
          'first_name': formData.get('first_name') || formData.get('firstName') || formData.get('name')?.split(' ')[0] || '',
          'last_name': formData.get('last_name') || formData.get('lastName') || formData.get('name')?.split(' ').slice(1).join(' ') || ''
        }
      });
    });
  });
});
</script>
```

**Deployment Steps:**
1. Navigate to Webflow Dashboard → teleios.health
2. Go to Project Settings → Custom Code
3. Add GTM head snippet to **Head Code** section
4. Add GTM noscript to **Body Code** (start) section
5. Add form tracking script to **Body Code** (end) section
6. Save and Publish Webflow site

**Validation:**
- [ ] Scripts added to Webflow custom code
- [ ] Webflow site published successfully

---

### Task 1.3: Validate Browser Tracking

**GTM Preview Testing:**
1. Open GTM → Preview mode
2. Navigate to https://teleios.health
3. Verify these tags fire on page load:
   - GA4 - Page View
   - Meta Pixel - PageView
   - Google Ads Remarketing

**Meta Pixel Helper Testing:**
1. Open Meta Pixel Helper extension
2. Navigate to teleios.health
3. Confirm PageView event fires
4. Submit a test form
5. Confirm Lead event fires with user data

**GA4 Realtime Testing:**
1. Open GA4 → Reports → Realtime
2. Navigate to teleios.health in new tab
3. Verify page_view event appears
4. Submit test form
5. Verify lead/form_submit event appears

**Google Ads Testing:**
1. Open Google Ads → Tools → Conversions
2. Check conversion tag status
3. Verify remarketing tag fires (via Tag Assistant)

**Validation Checklist:**
- [ ] GTM Preview shows all expected tags firing
- [ ] Meta Pixel Helper confirms PageView
- [ ] Meta Pixel Helper confirms Lead on form submit
- [ ] GA4 Realtime shows page_view events
- [ ] GA4 Realtime shows form events
- [ ] Google Ads conversion tag fires

---

## Deliverables

| Deliverable | Status |
|-------------|--------|
| Published web GTM container | ⏳ |
| Working dataLayer events on teleios.health | ⏳ |
| Browser-side Meta Pixel tracking live | ⏳ |
| Browser-side GA4 tracking live | ⏳ |
| Browser-side Google Ads tracking live | ⏳ |

---

## Completion Criteria

Phase 1 is complete when:
- [ ] GTM container version published
- [ ] Webflow site deployed with all scripts
- [ ] All browser-side tags validated as firing
- [ ] No console errors related to tracking
- [ ] Meta Pixel Helper shows green checkmarks

---

## Next Phase

Upon completion, proceed to [PHASE-2-SGTM-CAPIG.md](./PHASE-2-SGTM-CAPIG.md)

---

## Troubleshooting

### GTM Preview not loading
- Clear browser cache
- Disable ad blockers
- Try incognito mode

### Meta Pixel not firing
- Check pixel ID matches: `912613798381607`
- Verify trigger conditions in GTM
- Check for JavaScript errors in console

### GA4 events not appearing
- Verify Measurement ID: `G-CS05KZX2HG`
- Check GA4 data stream is active
- Wait 24-48 hours for full data processing

### Form events not tracking
- Verify dataLayer script is loaded before form submission
- Check form field names match script expectations
- Test with browser console: `console.log(dataLayer)`
