# Phase 2: Configure Server-Side GTM with CAPIG

## Objective

Set up Stape server container with CAPIG for Meta Conversions API and GA4 Measurement Protocol.

## Prerequisites

- Phase 1 completed (web container live)
- Access to Stape account
- Meta CAPI access token obtained
- GA4 Measurement Protocol API secret

## Account Reference

| Platform | ID |
|----------|-----|
| Server GTM | `GTM-MLBJCV38` |
| Stape Container | `nsawsbpg` (US West Oregon) |
| Meta Pixel | `912613798381607` |
| Meta Ad Account | `act_1544406343374527` |
| GA4 Property | `180456352` |
| GA4 Measurement ID | `G-CS05KZX2HG` |

**GTM Container URL:** https://tagmanager.google.com/#/container/accounts/6328225355/containers/237556533/workspaces/3

---

## Tasks

### Task 2.1: Stape Container Setup

**Steps:**
1. Access sGTM container GTM-MLBJCV38 via Stape dashboard
2. Navigate to Templates → Search Gallery
3. Install **Stape CAPIG** tag template
4. Install **GA4 Client** if not already present

**Configure GA4 Client:**
1. Go to Clients → New
2. Select "GA4" client type
3. Configure settings:
   - Default GA4 paths: enabled
   - Measurement ID override: (leave blank to accept all)
4. Save client

**Validation:**
- [ ] CAPIG template installed
- [ ] GA4 Client configured and active
- [ ] Container receiving events from web GTM

---

### Task 2.2: Create CAPIG Event Tags

**CAPIG - PageView Tag:**
```
Tag Type: Stape CAPIG
Event Name: PageView
Action Source: website
Pixel ID: 912613798381607
Access Token: [Your Meta CAPI Token]

User Data Variables:
- client_user_agent: {{Client User Agent}}
- client_ip_address: {{Client IP Address}}
- fbc: {{Cookie - _fbc}}
- fbp: {{Cookie - _fbp}}

Trigger: All Pages (GA4 Client)
```

**CAPIG - ViewContent Tag:**
```
Tag Type: Stape CAPIG
Event Name: ViewContent
Action Source: website
Pixel ID: 912613798381607

Event Parameters:
- content_name: {{Page Path}}
- content_category: therapy

Trigger: Therapy Pages (path contains /therapy/ OR /exosome/ OR /gene/)
```

**CAPIG - Lead Tag:**
```
Tag Type: Stape CAPIG
Event Name: Lead
Action Source: website
Pixel ID: 912613798381607

User Data Variables:
- em: {{DL - user_data.email}} (hashed)
- ph: {{DL - user_data.phone}} (hashed)
- fn: {{DL - user_data.first_name}} (hashed)
- ln: {{DL - user_data.last_name}} (hashed)

Deduplication:
- Event ID: {{Event ID}}

Trigger: Form Submit Event
```

**Required Variables to Create:**

| Variable Name | Type | Configuration |
|---------------|------|---------------|
| Client User Agent | Server Variable | Request Header: User-Agent |
| Client IP Address | Server Variable | Client IP Address |
| Cookie - _fbc | Cookie | Cookie name: _fbc |
| Cookie - _fbp | Cookie | Cookie name: _fbp |
| DL - user_data.email | Event Data | Key: user_data.email |
| DL - user_data.phone | Event Data | Key: user_data.phone |
| DL - user_data.first_name | Event Data | Key: user_data.first_name |
| DL - user_data.last_name | Event Data | Key: user_data.last_name |
| Event ID | Event Data | Key: event_id |

**Validation:**
- [ ] PageView CAPIG tag created
- [ ] ViewContent CAPIG tag created
- [ ] Lead CAPIG tag created
- [ ] All user data variables configured

---

### Task 2.3: Configure GA4 Server Tag

**GA4 Measurement Protocol Tag:**
```
Tag Type: GA4
Measurement ID: G-CS05KZX2HG
API Secret: [Your GA4 MP API Secret]

Event Configuration:
- Send page_view events
- Send all custom events from web container
- Include user properties

Parameters:
- page_location: {{Page URL}}
- page_title: {{Page Title}}
- client_id: {{Client ID}}

Trigger: All GA4 Events
```

**Steps to get GA4 API Secret:**
1. Open GA4 → Admin → Data Streams
2. Select web stream for teleios.health
3. Scroll to "Measurement Protocol API secrets"
4. Create new secret: `sGTM-Teleios`
5. Copy secret value

**Validation:**
- [ ] GA4 server tag created
- [ ] API secret configured
- [ ] Event parameters mapped correctly

---

### Task 2.4: Test Event Flow

**Stape Logs Testing:**
1. Open Stape dashboard → Container logs
2. Generate traffic on teleios.health
3. Verify events appear in logs:
   - PageView events from GA4 client
   - Lead events on form submission

**Meta Events Manager Testing:**
1. Open Meta Events Manager
2. Select Pixel 912613798381607
3. Go to Test Events tab
4. Enter test event code
5. Submit form on teleios.health
6. Verify event appears with:
   - Action source: website
   - Processing status: OK
   - Match quality score visible

**Deduplication Check:**
1. Submit single form on website
2. Check Meta Events Manager
3. Verify only ONE Lead event (not duplicate browser + server)
4. Confirm event_id matches between browser and server

**GA4 Server Events Check:**
1. Open GA4 → DebugView
2. Navigate to teleios.health
3. Verify events show server-side source indicator
4. Confirm user parameters pass through

**Validation Checklist:**
- [ ] Stape logs show incoming events
- [ ] CAPIG tags fire successfully
- [ ] Meta Events Manager receives CAPI events
- [ ] Deduplication working (no duplicate events)
- [ ] GA4 receives server-side events
- [ ] Match quality score acceptable (target: 5+)

---

## Deliverables

| Deliverable | Status |
|-------------|--------|
| Working sGTM → CAPIG → Meta CAPI pipeline | ⏳ |
| Server-side GA4 events flowing | ⏳ |
| Deduplication confirmed in Meta Events Manager | ⏳ |
| Event Match Quality score visible | ⏳ |

---

## Completion Criteria

Phase 2 is complete when:
- [ ] All CAPIG tags created and published
- [ ] GA4 server tag operational
- [ ] Meta Events Manager shows CAPI events
- [ ] Deduplication confirmed (no duplicates)
- [ ] Event Match Quality score at 5 or higher

---

## Next Phase

Upon completion, proceed to [PHASE-3-WEBHOOKS.md](./PHASE-3-WEBHOOKS.md)

---

## Troubleshooting

### CAPIG events not appearing in Meta
- Verify access token is valid and not expired
- Check pixel ID matches: `912613798381607`
- Confirm action_source is set correctly
- Review Stape logs for error messages

### Deduplication not working
- Ensure event_id is passed from web to server
- Verify same event_id format on both sides
- Check timing (events within 48-hour window)

### GA4 server events missing
- Verify API secret is correct
- Check Measurement ID matches
- Confirm client_id is passed through
- Review GA4 DebugView for errors

### Low Match Quality Score
- Add more user data parameters
- Ensure proper hashing (SHA256, lowercase, trimmed)
- Include fbp/fbc cookies
- Add external_id if available

---

## CAPIG Configuration Reference

### Hashing Requirements for User Data

All user data sent to Meta CAPI must be:
1. Lowercase
2. Trimmed of whitespace
3. SHA256 hashed

Example for email:
```javascript
// Before hashing
email = "John.Doe@Example.com "

// After processing
email = sha256("john.doe@example.com")
```

### Action Source Values

| Source | Use Case |
|--------|----------|
| website | Browser events forwarded to server |
| system_generated | Offline/CRM events |
| app | Mobile app events |
| physical_store | In-store events |

### Event Deduplication

Meta deduplicates events using:
- `event_id` - Unique identifier for each event
- `event_name` - Must match exactly
- 48-hour window - Events within this window are checked

Best practice: Generate UUID on web side, pass to server via dataLayer.
