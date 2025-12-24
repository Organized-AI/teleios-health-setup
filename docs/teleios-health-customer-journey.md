# Teleios Health - Customer Journey & Conversion Map

## Business Model
**Type:** High-ticket regenerative medicine / medical tourism  
**Primary Conversion:** Consultation request (lead form)  
**Sales Model:** High-touch consultative (phone/video → travel → treatment)

---

## Products & Services

| Product | Type | Est. Value |
|---------|------|------------|
| Minicircle Follistatin Gene Therapy | Gene Therapy | $25K-50K |
| Monad Essential (1mL) | Exosome | $5K-8K |
| Monad Advanced (2mL) | Exosome | $10K-15K |
| Monad Premium (multi-treatment) | Exosome | $20K-35K |
| Hair Restoration (3mL) | Exosome | $8K-12K |

---

## Customer Journey

```
══════════════════════════════════════════════════════════════════════════════════
                         WEBSITE JOURNEY (Trackable)
══════════════════════════════════════════════════════════════════════════════════

  AWARENESS              INTEREST               EVALUATION            CONVERSION
      │                      │                      │                      │
      ▼                      ▼                      ▼                      ▼
┌──────────────┐      ┌──────────────┐      ┌──────────────┐      ┌──────────────┐
│ • Meta Ads   │      │ • Homepage   │      │ • /exosome-  │      │ • Form Open  │
│ • Google Ads │      │ • Video Play │      │   therapy    │      │ • Form Start │
│ • Netflix PR │      │ • Scroll 50% │      │ • /gene-     │      │ • Form       │
│ • Instagram  │      │ • CTA Click  │      │   therapy    │      │   Submit     │
│ • Referral   │      │              │      │ • /clinic    │      │ • Thank You  │
│              │      │              │      │ • /faq       │      │              │
└──────────────┘      └──────────────┘      └──────────────┘      └──────────────┘
      │                      │                      │                      │
      ▼                      ▼                      ▼                      ▼
┌──────────────┐      ┌──────────────┐      ┌──────────────┐      ┌──────────────┐
│   PageView   │      │  ViewContent │      │  ViewContent │      │     Lead     │
│              │      │  (implicit)  │      │  + Interest  │      │              │
└──────────────┘      └──────────────┘      └──────────────┘      └──────────────┘


══════════════════════════════════════════════════════════════════════════════════
                         CRM JOURNEY (Offline → CAPI)
══════════════════════════════════════════════════════════════════════════════════

  QUALIFIED              ASSESSMENT              BOOKED               TREATED
      │                      │                      │                      │
      ▼                      ▼                      ▼                      ▼
┌──────────────┐      ┌──────────────┐      ┌──────────────┐      ┌──────────────┐
│ GHL Pipeline │      │ Health Form  │      │ Deposit Paid │      │ Treatment    │
│ Stage Change │      │ Completed    │      │ Travel Booked│      │ Completed    │
│              │      │              │      │              │      │              │
└──────────────┘      └──────────────┘      └──────────────┘      └──────────────┘
      │                      │                      │                      │
      ▼                      ▼                      ▼                      ▼
┌──────────────┐      ┌──────────────┐      ┌──────────────┐      ┌──────────────┐
│ Lead         │      │ Complete     │      │  Purchase    │      │  Purchase    │
│ (qualified)  │      │ Registration │      │  (deposit)   │      │  (full val)  │
│ CAPI         │      │ CAPI         │      │  CAPI        │      │  CAPI        │
└──────────────┘      └──────────────┘      └──────────────┘      └──────────────┘
```

---

## Primary Conversion: Consultation Form

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         "Book a Consultation" Modal                          │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│    ┌─────────────┐   ┌─────────────┐   ┌─────────────┐                     │
│    │   Patient   │   │  Physician  │   │   Partner   │    ◄── 3 Form Types │
│    └─────────────┘   └─────────────┘   └─────────────┘                     │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│  PATIENT FORM FIELDS:                                                       │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ First Name *              │ Last Name *                             │   │
│  ├───────────────────────────┴─────────────────────────────────────────┤   │
│  │ Email Address *                                                     │   │
│  ├─────────────────────────────────────────────────────────────────────┤   │
│  │ Phone *                                                             │   │
│  ├─────────────────────────────────────────────────────────────────────┤   │
│  │ Country *                                      ▼                    │   │
│  ├─────────────────────────────────────────────────────────────────────┤   │
│  │ Referred by (optional)                                              │   │
│  ├─────────────────────────────────────────────────────────────────────┤   │
│  │ How did you hear about us?                     ▼                    │   │
│  │   • From social media                                               │   │
│  │   • From an article, podcast, or documentary                        │   │
│  │   • From a friend                                                   │   │
│  │   • From my healthcare provider                                     │   │
│  │   • From online research                                            │   │
│  ├─────────────────────────────────────────────────────────────────────┤   │
│  │ What therapy are you interested in?            ▼                    │   │
│  │   • Minicircle Follistatin Gene Therapy                             │   │
│  │   • Monad Exosome Therapy                                           │   │
│  ├─────────────────────────────────────────────────────────────────────┤   │
│  │ ☑ I agree to the Terms & Conditions                                 │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│                          ┌──────────────┐                                   │
│                          │    Submit    │  ◄── LEAD EVENT                   │
│                          └──────────────┘                                   │
│                                                                             │
│  Success: "Success! We'll be in touch soon."                                │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Events to Track

### Website Events (GTM → Meta Pixel + GA4)

| Event | Trigger | Parameters |
|-------|---------|------------|
| PageView | All pages | page_title, page_path |
| ViewContent | /exosome-therapy | content_name: "Exosome" |
| ViewContent | /gene-therapy | content_name: "Gene" |
| ViewContent | /clinic | content_name: "Clinic" |
| scroll_50 | 50% page scroll | page_path |
| scroll_75 | 75% page scroll | page_path |
| video_start | Hero video plays | video_name |
| cta_click | "Book consultation" clicked | button_location |
| form_start | First field focused | form_type |
| therapy_selected | Therapy dropdown changed | therapy_type |
| Lead | Form submitted successfully | value, content_name |

### Offline Events (GHL → sGTM → CAPI)

| Event | Trigger (GHL Pipeline) | Value |
|-------|------------------------|-------|
| Lead (qualified) | Stage → "Qualified" | $0 (signal only) |
| CompleteRegistr. | Stage → "Assessment Done" | $500 |
| Purchase | Stage → "Deposit Paid" | Deposit amount |
| Purchase | Stage → "Treatment Complete" | Full treatment value |

---

## Tracking Architecture

```
                              ┌─────────────────┐
                              │    WEBSITE      │
                              │   (Webflow)     │
                              │ teleios.health  │
                              └────────┬────────┘
                                       │
                    ┌──────────────────┼──────────────────┐
                    │                  │                  │
                    ▼                  ▼                  ▼
            ┌───────────────┐  ┌───────────────┐  ┌───────────────┐
            │   GTM Web     │  │  Meta Pixel   │  │     GA4       │
            │ GTM-WM5S3WSG  │  │ 912613798381607│ │   180456352   │
            └───────┬───────┘  └───────┬───────┘  └───────┬───────┘
                    │                  │                  │
                    └──────────────────┼──────────────────┘
                                       │
                                       ▼
                          ┌────────────────────────┐
                          │    SERVER-SIDE GTM     │
                          │     GTM-MLBJCV38       │
                          │   (Stape Container)    │
                          └────────────┬───────────┘
                                       │
                    ┌──────────────────┼──────────────────┐
                    │                  │                  │
                    ▼                  ▼                  ▼
            ┌───────────────┐  ┌───────────────┐  ┌───────────────┐
            │   Meta CAPI   │  │  GA4 Server   │  │  Google Ads   │
            │               │  │               │  │ 476-183-2056  │
            └───────────────┘  └───────────────┘  └───────────────┘
                    ▲
                    │
                    │ Webhooks
                    │
            ┌───────────────┐
            │  GoHighLevel  │
            │     CRM       │
            │  (Offline     │
            │  Conversions) │
            └───────────────┘
```

---

## Account IDs

| Platform | ID |
|----------|-----|
| Meta Ad Account | `act_1544406343374527` |
| Meta Pixel | `912613798381607` |
| Meta Page | `836344729572623` |
| Google Ads | `476-183-2056` |
| GA4 Property | `180456352` |
| Web GTM | `GTM-WM5S3WSG` |
| Server GTM | `GTM-MLBJCV38` |

---

## Key Questions Before Implementation

1. **Form type:** Webflow native form or third-party embed?
2. **Success behavior:** Redirect to /thank-you or inline message?
3. **GHL integration:** How do leads currently flow to GHL?
4. **Payment processor:** Stripe/Square for offline purchase values?
5. **Lead values:** Use therapy-specific or blended average ($15K)?
