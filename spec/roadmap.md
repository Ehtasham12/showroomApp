# Product Roadmap

## ⚠️ SPEC-DRIVEN APPROACH: UX FIRST, BUILD SECOND

**Before coding any UI, we must finalize UX Design** (see [ux-design.md](ux-design.md))

---

## ✅ Phase 0: UX Design & Finalization (Weeks 0-1) - COMPLETE
**Goal**: Design the entire user experience before writing UI code  
**Status**: ✅ APPROVED (2026-07-25)

**Completed**:
- ✅ User personas and flows (reviewed & approved)
- ✅ All 5 wireframe screens finalized
- ✅ Color palette & typography confirmed
- ✅ Mobile-first specifications locked in (320px, 768px, 1024px)
- ✅ Accessibility standards (WCAG AA) approved
- ✅ Performance targets validated (LCP < 2.5s)
- ✅ Custom branding per showroom confirmed
- ✅ Design system complete (colors, typography, spacing, components)

**Output**: Production-ready design specs. Frontend team builds pixel-perfect implementations.

**🚀 READY TO START PHASE 1A**

---

## Phase 1: Customer Marketplace MVP (Weeks 1-8) - PRIORITY
**Focus**: Customer-facing core (Browse, Sell, View Listings)
**Platform**: Mobile-first (React Native / Web responsive)
**Design Reference**: [ux-design.md](ux-design.md)
**Target**: Customers can browse cars, sell cars, see their listings - NO LOGIN REQUIRED

### Phase 1A: Backend Infrastructure (Weeks 1-2)
**Build**: Backend API only (no UI yet)  
**Note**: Phone-based customer system. Minimal staff auth (for future phases).

**Backend Setup**:
- [ ] Database schema design (already done ✓)
- [ ] API foundation and documentation
- [ ] CORS & error handling setup

**Public API Endpoints** (no auth needed):
- [ ] `GET /cars` - List all cars with filters (make, model, price, year, etc.)
- [ ] `GET /cars/:id` - Car details with all images
- [ ] `POST /cars` - Create car listing (phone + name required)
- [ ] `GET /cars?phone=:phone` - Get seller's listings by phone
- [ ] `PUT /cars/:id` - Update car listing (phone verification)
- [ ] `DELETE /cars/:id` - Delete car listing (phone verification)
- [ ] `POST /upload` - Upload car images (no auth)
- [ ] `GET /health` - Health check endpoint

---

### Phase 1B: Browse Cars Frontend (Weeks 3-4)
**Build**: React Native (mobile) + React Web (responsive)  
**Reference**: [UX/Mock/awan-cars-ux-prototype.html](UX/Mock/awan-cars-ux-prototype.html) (Screen 1)  
**Design**: [ux-design.md - Screen 1: Browse Cars](ux-design.md#wireframes--screens)

**API Consumption**:
- `GET /cars` — Fetch listings with filters
- `GET /cars/:id` — Fetch car detail with images

**Mobile & Web Features**:
- [ ] Home screen - Browse cars grid (responsive, masonry or list layout)
- [ ] Car cards with: thumbnail image, make/model, year, price (red), transmission, fuel type
- [ ] Filter component: price range (min/max), make, model, transmission, fuel, year
- [ ] Search bar: live search by make/model (debounced API calls)
- [ ] Sort options: newest, price low→high, price high→low
- [ ] Pagination or infinite scroll (load more)
- [ ] Responsive design: 320px (mobile) → 768px (tablet) → 1024px (desktop)
- [ ] Loading skeleton states
- [ ] Empty state: "No cars found"
- [ ] Header with Awan Care logo, showroom name, tagline
- [ ] Bottom navigation tabs (Browse, Sell, My Listings)

**Technical**:
- [ ] Set up API client (baseURL: http://localhost:3000)
- [ ] State management for cars list + filters
- [ ] Image optimization (lazy load thumbnails)
- [ ] Debounce search input
- [ ] Handle API errors gracefully

**Testing**:
- [ ] Cross-device testing (iOS 14+, Android 10+, Chrome/Safari/Firefox)
- [ ] Network throttling (slow 3G)
- [ ] Responsive layout validation (320px, 768px, 1024px)
- [ ] Loading states work correctly
- [ ] Search and filter accuracy

---

### Phase 1C: Car Detail & Inquiry (Weeks 4-5)
**Build**: Car detail page with inquiry form  
**Reference**: [ux-design.md - Screen 2: Car Detail](ux-design.md#wireframes--screens)

**Mobile & Web**:
- [ ] Car detail page - photo carousel (8+ images)
- [ ] Full specifications display (year, mileage, transmission, fuel, condition, features)
- [ ] Price prominent (red color)
- [ ] Description text
- [ ] "Contact Showroom" button → Inquiry form modal
- [ ] Inquiry form: customer name, phone, message
- [ ] Submit inquiry (no login needed)
- [ ] Success confirmation message

**Testing**:
- [ ] Form validation (required fields, phone format)
- [ ] Mobile & web responsiveness
- [ ] Photo carousel on different devices

---

### Phase 1D: Sell Your Car (Weeks 6-7)
**Build**: Multi-step car upload form  
**Reference**: [ux-design.md - Screen 3: Sell Your Car](ux-design.md#wireframes--screens)

**Mobile & Web**:
- [ ] 4-step form (progress indicator 1/4, 2/4, 3/4, 4/4)
- [ ] Step 1: Make selection (searchable dropdown)
- [ ] Step 2: Model selection & details (year, mileage, transmission, fuel, condition, features)
- [ ] Step 3: Photo upload (8 photos, reordering, preview)
- [ ] Step 4: Price entry + seller name + seller phone
- [ ] Form validation with error messages
- [ ] Save draft functionality (localStorage or server)
- [ ] Submit car listing
- [ ] Success confirmation with listing ID

**Testing**:
- [ ] Form validation edge cases
- [ ] Image upload (file size, format)
- [ ] Mobile responsiveness (touch-friendly inputs)
- [ ] Draft save/resume

---

### Phase 1E: My Listings (Week 8)
**Build**: View & manage seller's listings  
**Reference**: [ux-design.md - Screen 5: My Listings](ux-design.md#wireframes--screens)

**Mobile & Web**:
- [ ] Phone lookup screen ("Enter your phone to see your listings")
- [ ] List seller's cars by phone
- [ ] Show: image, make/model, price, status, date posted
- [ ] Edit car button → Pre-filled form
- [ ] Delete car button → Confirmation
- [ ] View inquiries count per car
- [ ] Responsive design

**Testing**:
- [ ] Phone lookup (with/without country code)
- [ ] Edit & delete operations
- [ ] Mobile & web responsiveness

---

### Phase 1F: Testing, Polish & Launch (Weeks 9-12)
**Focus**: Quality assurance, performance, and production readiness

**Frontend QA**:
- [ ] Cross-device testing (iOS 14+, Android 10+, modern browsers)
- [ ] Responsive design validation (320px, 768px, 1024px)
- [ ] Performance audit (Lighthouse > 90/100)
- [ ] Accessibility audit (WCAG 2.1 Level AA)
- [ ] Core Web Vitals (LCP < 2.5s, FID < 100ms, CLS < 0.1)
- [ ] Image optimization & compression
- [ ] Form validation edge cases
- [ ] Network error handling

**UI Polish**:
- [ ] Loading states (spinners, skeletons)
- [ ] Error states (API failures, validation messages)
- [ ] Empty states (no cars, no results)
- [ ] Success confirmations (listing posted, deleted)
- [ ] Smooth animations & transitions
- [ ] Accessibility (keyboard nav, screen readers, alt text)

**Backend Completion**:
- [ ] API documentation (Swagger/OpenAPI)
- [ ] Error handling & HTTP status codes
- [ ] Input validation on all endpoints
- [ ] Rate limiting (prevent abuse)
- [ ] CORS configuration
- [ ] Image storage & serving (local filesystem for MVP)

**Testing**:
- [ ] End-to-end tests (browse → detail → sell → edit → delete)
- [ ] Database integrity checks
- [ ] Image upload & retrieval
- [ ] Phone lookup performance

**Launch**:
- [ ] Deploy to staging environment
- [ ] Final UAT (user acceptance testing)
- [ ] Deploy to production (web + mobile builds)
- [ ] Monitoring setup (error logging, basic analytics)

---

## Phase 2: Investor Dashboard & Commission System (Months 4-6)
**Focus**: Multi-investor ownership tracking and commission automation

### Features
- [ ] Investor portfolio view
- [ ] Multi-owner car management (ownership percentage per car)
- [ ] Profit/loss calculation and reporting
- [ ] Commission calculation and automated payouts
- [ ] Investor dashboard with real-time metrics
- [ ] Financial reporting and audit trails

---

## Phase 3: Advanced Features & Scaling (Months 7+)
**Future enhancements based on user feedback**

### Potential Features
- [ ] Financing/EMI integration with banks
- [ ] Insurance partner integration
- [ ] Advanced analytics and business intelligence
- [ ] Mobile app performance optimization
- [ ] Multi-showroom support
- [ ] API for third-party integrations
- [ ] Marketing tools for dealers

---

## Timeline Summary

| Phase | Duration | Status | Start | Completion |
|-------|----------|--------|-------|------------|
| **Phase 0: UX Design** | 1 week | ✅ DONE | Week 0 | 2026-07-25 |
| **Phase 1: Customer MVP** | 12 weeks | 🚀 NEXT | Week 1 | Week 12 |
| • 1A: Backend API | 2 weeks | - | Week 1 | Week 2 |
| • 1B: Browse Cars | 2 weeks | - | Week 3 | Week 4 |
| • 1C: Car Detail & Inquiry | 2 weeks | - | Week 4 | Week 5 |
| • 1D: Sell Your Car | 2 weeks | - | Week 6 | Week 7 |
| • 1E: My Listings | 1 week | - | Week 8 | Week 8 |
| • 1F: Testing & Launch | 4 weeks | - | Week 9 | Week 12 |
| **Phase 2: Showroom Staff** | 4 weeks | Backlog | Week 13 | Week 16 |
| **Phase 3: Investor Dashboard** | 3 months | Backlog | Month 5+ | - |

**MVP Launch Target**: Week 12 (2026-09-22)

---

## Critical Path (Dependencies)

```
Phase 0 (UX Design) ← DONE ✅
    ↓
Phase 1A (Backend API) ← Start immediately
    ↓
Phase 1B-1E (Customer Features) ← Build in sequence
    ↓
Phase 1F (Testing & Launch) ← Final QA & production deploy
    ↓
LAUNCH (Customer Marketplace MVP)
    ↓
Phase 2 (Staff Features) ← After MVP stable
```

**Key Principle**: Customer marketplace MVP must work on both mobile and web before adding staff features.
