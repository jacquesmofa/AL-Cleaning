# AL Cleaning Pro - Official Website & Booking Engine

## 1. Project Description
A modern, high-converting multi-page bilingual (EN/FR) React SPA and online booking application for AL Cleaning Pro, a premier family-owned cleaning service in Brampton and the Greater Toronto Area (GTA). The site drives phone calls (416-817-4825) and online booking quotes with an automated dynamic price estimator and integrated payment checkout.

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
- `/quote` - Interactive Quote & Booking Page
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
- [x] Interactive quote form with dynamic price estimator
- [x] Checkout modal with Interac e-Transfer instructions
- [x] Contact form with server-side submission
- [x] Footer with quick links, services list, contact info
- [x] Google Maps embeds for all location pages
- [x] JSON-LD structured data for LocalBusiness and CleaningService
- [x] SEO meta tags

## 4. Data Model Design
No database required initially. Forms submit to Readdy Form API. Stripe handles payments.

## 5. Backend / Third-party Integration Plan
- **Stripe**: Payment processing (Credit Card, Apple Pay, Google Pay) - requires Supabase + Stripe connection
- **No Supabase needed** for initial version (forms submit via Readdy Form API, Interac e-Transfer for immediate payments)

## 6. Development Phase Plan

### Phase 1: Complete Landing Page
- Goal: Build all static sections of the single-page website
- Status: ✅ Complete

### Phase 2: Bilingual Support & Quote Engine
- Goal: EN/FR language switcher, dynamic quote form with price estimator, checkout modal
- Status: ✅ Complete

### Phase 3: Multi-Page Architecture
- Goal: Transform single-page into full multi-page SPA with dedicated routes for all sections
- Status: ✅ Complete

### Phase 4: Stripe Payment Integration
- Goal: Enable online card payment for bookings
- Status: Not started (requires Supabase + Stripe)

### Phase 5: SEO & Schema.org Enhancement
- Goal: Per-page SEO meta, hreflang tags, localized schema
- Status: Not started