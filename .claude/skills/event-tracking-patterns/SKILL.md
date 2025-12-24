---
name: event-tracking-patterns
description: Best practices for implementing event tracking across platforms (Meta, GA4, Google Ads). Use when designing data layer schemas, implementing form tracking, setting up e-commerce tracking, or standardizing event naming conventions.
---

# Event Tracking Patterns Skill

This skill provides standardized patterns for implementing conversion tracking across marketing platforms.

## When to Use This Skill

- Designing data layer schemas
- Implementing form tracking
- Setting up e-commerce tracking
- Standardizing event naming
- Cross-platform event mapping

## Data Layer Standards

### Initialization
```javascript
window.dataLayer = window.dataLayer || [];
```

### Event Push Structure
```javascript
window.dataLayer.push({
  event: 'event_name',
  event_id: 'unique_id',
  timestamp: Date.now(),
  value: 100.00,
  currency: 'USD',
  content_name: 'Product Name',
  user_data: {
    email_address: 'user@example.com',
    phone_number: '+15551234567',
    address: {
      first_name: 'John',
      last_name: 'Doe',
      country: 'US'
    }
  }
});
```

## Form Tracking Pattern

### Complete Implementation
```javascript
(function() {
  var formState = { started: false, selections: {} };
  
  // Track form start
  document.addEventListener('focusin', function(e) {
    if (formState.started) return;
    var form = e.target.closest('form');
    if (!form) return;
    
    formState.started = true;
    window.dataLayer.push({
      event: 'form_start',
      form_id: form.id || 'unknown'
    });
  });
  
  // Track form submission
  document.addEventListener('submit', function(e) {
    var form = e.target;
    var formData = new FormData(form);
    var eventId = 'lead_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    
    window.dataLayer.push({
      event: 'generate_lead',
      event_id: eventId,
      value: 1000,
      currency: 'USD',
      user_data: {
        email_address: formData.get('email'),
        phone_number: formData.get('phone')
      }
    });
  });
})();
```

## Event Naming Conventions

### GA4 Standard Events
```
page_view, view_item, add_to_cart, begin_checkout, purchase, generate_lead, sign_up
```

### Meta Standard Events
```
PageView, ViewContent, AddToCart, InitiateCheckout, Purchase, Lead, CompleteRegistration
```

### Cross-Platform Mapping
| User Action | GA4 | Meta | Google Ads |
|-------------|-----|------|------------|
| Page load | page_view | PageView | page_view |
| Product view | view_item | ViewContent | page_view |
| Form submit | generate_lead | Lead | conversion |
| Purchase | purchase | Purchase | conversion |

## User Data Handling

### Normalization
```javascript
function normalizeUserData(data) {
  return {
    email_address: data.email?.toLowerCase().trim(),
    phone_number: data.phone?.replace(/[^0-9+]/g, ''),
    address: {
      first_name: data.firstName?.toLowerCase().trim(),
      last_name: data.lastName?.toLowerCase().trim(),
      country: data.country?.toUpperCase().trim()
    }
  };
}
```

### Privacy Considerations
- Only collect necessary data
- Obtain consent before tracking
- Provide opt-out mechanism
- Hash before sending to servers (or let CAPIG handle)
