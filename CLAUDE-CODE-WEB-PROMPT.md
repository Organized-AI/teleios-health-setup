# Claude Code Web Prompt

Copy and paste this entire prompt into Claude Code Web to execute the implementation.

---

## Initial Prompt

```
I need you to implement the Teleios Health GTM tracking infrastructure. This is a phased implementation using GTM (web + server-side), Meta CAPI, GA4, and Google Ads tracking.

## Context

Read these files in order to understand the project:

1. `PLANNING/PHASED-IMPLEMENTATION-PLAN.md` - Full roadmap and account IDs
2. `DATA-AUDIT-SUMMARY.md` - Current gaps and what needs to be completed
3. `.claude/skills/data-audit/SKILL.md` - Data audit workflow

## Account IDs (for reference)

- **Meta Pixel**: 912613798381607
- **Meta Ad Account**: act_1544406343374527
- **GA4 Measurement ID**: G-CS05KZX2HG
- **Google Ads Conversion ID**: 17810172296
- **Web GTM**: GTM-WM5S3WSG
- **Server GTM**: GTM-MLBJCV38
- **Stape Container**: nsawsbpg

## Execution Instructions

Execute phases sequentially:

### Phase 1: Web GTM Deployment
1. Read `PLANNING/PHASE-1-WEB-GTM.md`
2. Review the 21 tags, 14 triggers, 18 variables in Web GTM container
3. Provide the exact GTM snippets for Webflow deployment
4. Provide the form tracking dataLayer script
5. Create validation checklist

### Phase 2: Server-Side GTM + CAPIG
1. Read `PLANNING/PHASE-2-SGTM-CAPIG.md`
2. Document CAPIG tag configurations needed:
   - CAPIG - PageView
   - CAPIG - ViewContent
   - CAPIG - Lead
3. Document all server-side variables needed
4. Provide GA4 Measurement Protocol configuration
5. Create testing checklist for Stape logs and Meta Events Manager

### Phase 3: Offline Conversion Webhooks
1. Read `PLANNING/PHASE-3-WEBHOOKS.md`
2. Document webhook client configuration for sGTM
3. Provide JSON payload templates for each GHL automation:
   - Lead Qualified
   - Assessment Complete
   - Deposit Paid
   - Treatment Complete
4. Document CAPIG tags for offline events

### Phase 4: Enhanced Tracking
1. Read `PLANNING/PHASE-4-ENHANCED-TRACKING.md`
2. Provide ViewContent configurations for therapy pages
3. Document scroll depth and video engagement tracking
4. Provide Google Enhanced Conversions setup

## Output Format

For each phase, create a completion document at `PHASE-X-COMPLETE.md` with:
- Tasks completed
- Configuration details
- Validation results
- Next steps

## Important Notes

- Use the Stape MCP tools for container operations
- Use sequential thinking for complex configurations
- Check `.claude/skills/data-audit/references/capi_checklist.md` for CAPI requirements
- Target Event Match Quality of 7+ for Meta
- Ensure deduplication via event_id on all events

Start by reading the planning documents and confirming you understand the architecture.
```

---

## Alternative: Phase-by-Phase Prompts

### Phase 1 Only

```
Read PLANNING/PHASE-1-WEB-GTM.md and execute all tasks.

Context:
- Web GTM Container: GTM-WM5S3WSG
- GA4 Measurement ID: G-CS05KZX2HG
- Meta Pixel: 912613798381607
- Google Ads Conversion ID: 17810172296

Deliverables:
1. GTM head snippet for Webflow
2. GTM noscript snippet for Webflow body
3. Form tracking dataLayer script
4. Validation checklist with all expected tag fires
5. PHASE-1-COMPLETE.md summary

After completion, confirm all browser-side tracking (Meta Pixel, GA4, Google Ads) is ready to go live.
```

### Phase 2 Only

```
Read PLANNING/PHASE-2-SGTM-CAPIG.md and execute all tasks.

Context:
- Server GTM: GTM-MLBJCV38
- Stape Container: nsawsbpg
- Meta Pixel: 912613798381607
- GA4 Measurement ID: G-CS05KZX2HG

Prerequisites:
- Meta CAPI access token (from .env)
- GA4 Measurement Protocol API secret (from .env)

Deliverables:
1. GA4 Client configuration
2. CAPIG tag configurations (PageView, ViewContent, Lead)
3. Server-side variable definitions
4. GA4 Measurement Protocol tag configuration
5. Testing checklist for Stape logs and Meta Events Manager
6. PHASE-2-COMPLETE.md summary

Focus on event deduplication and user data hashing requirements.
```

### Phase 3 Only

```
Read PLANNING/PHASE-3-WEBHOOKS.md and execute all tasks.

Context:
- Server GTM: GTM-MLBJCV38
- Stape webhook endpoint: https://nsawsbpg.stape.io/webhook

Deliverables:
1. Webhook Client configuration for sGTM
2. Webhook triggers for each event type
3. JSON payload templates for GoHighLevel automations:
   - lead_qualified
   - assessment_complete
   - deposit_paid
   - treatment_complete
4. Offline CAPIG tag configurations (action_source: system_generated)
5. GHL automation setup instructions
6. PHASE-3-COMPLETE.md summary

Ensure all webhooks include user data for enhanced matching (email, phone, external_id).
```

---

## Quick Start Command (Terminal)

```bash
cd teleios-health-setup
claude --dangerously-skip-permissions
```

Then paste:

```
Read PLANNING/PHASED-IMPLEMENTATION-PLAN.md and DATA-AUDIT-SUMMARY.md to understand current state. Then execute PLANNING/PHASE-1-WEB-GTM.md. After completion, proceed automatically through Phase 2, 3, and 4. Create PHASE-X-COMPLETE.md after each phase. Git commit after each phase.
```

---

## Required .env Variables

Before running, ensure you have a `.env` file with:

```env
# Meta Configuration
META_PIXEL_ID=912613798381607
META_AD_ACCOUNT_ID=act_1544406343374527
META_CAPI_ACCESS_TOKEN=your_meta_capi_token_here

# GA4 Configuration
GA4_MEASUREMENT_ID=G-CS05KZX2HG
GA4_PROPERTY_ID=180456352
GA4_MP_API_SECRET=your_ga4_api_secret_here

# Google Ads Configuration
GOOGLE_ADS_ACCOUNT_ID=6890103064
GOOGLE_ADS_CONVERSION_ID=17810172296
GOOGLE_ADS_LABEL_LEAD=GKswCL2sndYbEIjTxqxC
GOOGLE_ADS_LABEL_DEPOSIT=C7qLCMCsndYbEIjTxqxC
GOOGLE_ADS_LABEL_TREATMENT=6j8qCMOsndYbEIjTxqxC

# GTM Configuration
GTM_WEB_CONTAINER_ID=GTM-WM5S3WSG
GTM_SERVER_CONTAINER_ID=GTM-MLBJCV38
GTM_ACCOUNT_ID=6328225355

# Stape Configuration
STAPE_CONTAINER_ID=nsawsbpg
STAPE_CONTAINER_URL=https://nsawsbpg.stape.io

# GoHighLevel Configuration
GHL_LOCATION_ID=your_ghl_location_id
GHL_API_KEY=your_ghl_api_key
```

See `.env.example` for the template.
