# AL Cleaning Pro - Official Website & Booking Engine

## 1. Project Description
A modern, high-converting multi-page bilingual (EN/FR) React SPA for AL Cleaning Pro, a premier family-owned cleaning service in Brampton and the Greater Toronto Area (GTA). The site uses a **quote-first** flow: visitors browse the full service catalog, submit job details, and choose their preferred contact channel (WhatsApp, SMS, or Email) to receive a personalized quote — no upfront pricing or instant booking.

**Core Slogan:** "Spotless home cleaning in Brampton & the GTA. Family-owned cleaning services you can trust."
**Domain:** https://Alcleaningpro.ca
**Headquarters:** Brampton, ON, Canada

## 2. Page Structure
- `/` - Home page (hero, why us preview, services preview, reviews preview, areas preview, CTA)
- `/services` - Services Hub (full catalog with filtering)
- `/services/:serviceId` - Individual Service Detail (residential, deep-cleaning, move, office, airbnb, post-construction)
- `/about` - About Us / Why Us
- `/reviews` - Reviews & Testimonials (with leave-a-review modal)
- `/areas` - Service Areas Hub
- `/areas/:cityId` - City Detail Pages (brampton, mississauga, toronto, vaughan, caledon, milton, georgetown)
- `/quote` - Quote Request Page (multi-channel: WhatsApp / SMS / Email)
- `/contact` - Contact Us Page
- `*` - 404 Not Found

## 3. Core Features
- [x] Top utility bar with contact info + language switcher
- [x] Sticky navigation with react-router Links + active state
- [x] English/French bilingual support with instant language switcher
- [x] Hero section with CTA buttons
- [x] Why Us value pillars grid
- [x] Services Hub with category filtering
- [x] 6 individual Service Detail pages (hero, overview, includes, pricing, process, FAQ)
- [x] About page with story, core values, and owner commitment
- [x] Reviews page with filtering by service type + leave-a-review modal
- [x] Areas Hub + 7 individual city detail pages with neighborhoods and maps
- [x] Multi-channel quote request form (WhatsApp / SMS / Email dispatch with pre-filled job details)
- [x] Full service catalog with no upfront pricing (quote-first approach)
- [x] Contact form with server-side submission
- [x] Footer with quick links, services list, contact info
- [x] Google Maps embeds for all location pages
- [x] JSON-LD structured data for LocalBusiness and CleaningService
- [x] SEO meta tags

## 4. Data Model Design
No database required. The quote form builds a pre-filled message and opens the client's chosen channel (WhatsApp / SMS / Email) — no server, no form backend, works on any static host.

## 5. Backend / Third-party Integration Plan
- **None required** for the quote-first flow (deep links to wa.me / sms: / mailto:).

## 6. Development Phase Plan

### Phase 1: Complete Landing Page
- Goal: Build all static sections of the single-page website
- Status: ✅ Complete

### Phase 2: Bilingual Support & Quote Engine
- Goal: EN/FR language switcher, multi-channel quote request form (WhatsApp / SMS / Email)
- Status: ✅ Complete

### Phase 3: Multi-Page Architecture
- Goal: Transform single-page into full multi-page SPA with dedicated routes for all sections
- Status: ✅ Complete

### Phase 4: Payment Integration (Optional, Post-Quote)
- Goal: Enable online deposit/payment after a quote is agreed (only if desired later)
- Status: Not started (requires Supabase + Stripe)

### Phase 5: SEO & Schema.org Enhancement
- Goal: Per-page SEO meta, hreflang tags, localized schema
- Status: Not started