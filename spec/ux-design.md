# UX/Design Specification - MVP Phase 1

**Document Status**: Design-First (before implementation)  
**Scope**: Phase 1A-1D (MVP features only)  
**Last Updated**: 2026-07-25  

---

## Table of Contents
1. [User Personas](#user-personas)
2. [User Flows](#user-flows)
3. [Information Architecture](#information-architecture)
4. [Design System](#design-system)
5. [Wireframes & Screens](#wireframes--screens)
6. [Mobile-First Specifications](#mobile-first-specifications)
7. [Performance Targets](#performance-targets)
8. [Accessibility Standards](#accessibility-standards)
9. [Success Metrics](#success-metrics)

---

## User Personas

### Persona 1: Rahul (Customer/Car Buyer) 👤
**Age**: 35 | **Tech Savvy**: Medium | **Goal**: Find and buy a car easily  
**Context**: Using app on mobile (primary), sometimes web  
**Pain Points**:
- Tired of visiting multiple showrooms
- Hard to compare prices
- No clear info about car history/condition
- Wants photos before visiting

**Needs**:
- Browse cars in 2 clicks
- See clear pricing & specs
- Upload his car for sale
- Get inquiries quickly

---

### Persona 2: Priya (Showroom Staff) 👤
**Age**: 28 | **Tech Savvy**: Low-Medium | **Goal**: Manage inventory efficiently  
**Context**: Using tablet or laptop (desk or mobile)  
**Pain Points**:
- Manual entry of car data (paper, Excel)
- Can't track who inquired about which car
- No visibility into inventory levels
- Owner asks "how many cars?" and she doesn't know

**Needs**:
- Quick way to add/update cars
- See all inquiries in one place
- Know which cars have offers
- Simple reporting for owner

---

### Persona 3: Vikram (Showroom Owner/Manager) 👤
**Age**: 50 | **Tech Savvy**: Low | **Goal**: Run business profitably  
**Context**: Occasional user, checks stats on mobile/web  
**Pain Points**:
- Can't see real-time inventory status
- Trust issues with staff accuracy
- No idea about investor shares
- Wants to know profit/loss quickly

**Needs**:
- Dashboard showing key stats (inventory, sales, inquiries)
- Investor management (Phase 2)
- Automated commission tracking (Phase 2)
- Simple, not too technical

---

## User Flows

### Flow 1: Customer Browsing Cars (Rahul)
```
1. LANDING PAGE
   ↓
2. BROWSE CARS (with filters)
   • See: Make, Model, Year, Price, Photo
   • Filter: Price Range, Transmission, Fuel Type
   • Sort: Newest, Price (Low→High)
   ↓
3. CAR DETAIL PAGE
   • Full specs, all photos, condition
   • Option: "Contact Showroom" or "Make Offer"
   ↓
4. INQUIRY/CONTACT FORM
   • Message + phone + preferred time
   ↓
5. SUCCESS CONFIRMATION
   • "Showroom will contact you in 24h"
```

**Mobile Optimizations**:
- Filter button on top (not sidebar)
- Large tap targets (48px min)
- Photo carousel with left/right swipe
- One-tap "Contact" button below photos

---

### Flow 2: Customer Selling Car (Rahul)
```
1. LOGIN/SIGNUP
   • Email + password (or phone OTP later)
   ↓
2. MY LISTINGS (dashboard)
   • Shows his posted cars
   • "Add New" button (prominent)
   ↓
3. CAR UPLOAD FORM
   a) Basic Info (1/4)
      - Make, Model, Year (dropdowns)
   b) Details (2/4)
      - Mileage, Transmission, Fuel, Color
      - Condition (radio buttons: Excellent/Good/Fair)
   c) Photos (3/4)
      - Upload up to 8 photos (drag & drop on web)
      - Reorder by drag
   d) Pricing (4/4)
      - Price in currency
      - Submit
   ↓
4. CONFIRMATION
   • "Car listed! Showroom will review & publish"
   ↓
5. INQUIRIES
   • See who contacted about his car
   • Reply to inquiries
```

**Mobile Optimizations**:
- One field per screen (or max 2)
- Progress bar shows step 1/4, 2/4, etc.
- Camera access for photo upload
- Save draft if user leaves

---

### Flow 3: Showroom Staff Managing Inventory (Priya)
```
1. LOGIN (as SHOWROOM_STAFF)
   ↓
2. INVENTORY DASHBOARD
   • Count: Total cars, Available, Pending, Sold
   • List of all cars with key info
   • Search/filter by status
   ↓
3. ADD NEW CAR
   • Same form as customer but with status field
   • Quick data entry (optimized for speed)
   ↓
4. CAR DETAIL VIEW
   • All specs, photos
   • Status dropdown (Available → Pending → Sold)
   • List of inquiries for this car
   • Edit/Delete buttons
   ↓
5. INQUIRIES TAB
   • All inquiries for all cars
   • Filter by status (Pending, Contacted, Interested, Not Interested)
   • Mark as "Contacted" with timestamp
   ↓
6. SIMPLE REPORTS
   • "Cars added this month"
   • "Inquiries received"
   • Export to CSV (future)
```

**Desktop-Optimized** (but also mobile-responsive):
- Table view with sortable columns
- Bulk actions (mark multiple as sold)
- Quick add button in header
- Dashboard with widget-style cards

---

### Flow 4: Showroom Owner Dashboard (Vikram)
```
1. LOGIN (as ADMIN)
   ↓
2. DASHBOARD (Overview)
   • Cards showing:
     - Total Cars in Showroom
     - Available for Sale
     - Pending Sale
     - This Month's Inquiries
     - This Month's Sales
   • Quick action buttons
   ↓
3. INVENTORY VIEW
   • Same as staff, but read-only or with admin controls
   ↓
4. SETTINGS (Basic)
   • Showroom name, logo, email
   • Add/invite staff members
   • Investor management (Phase 2)
   ↓
5. REPORTS (Basic)
   • Monthly inquiry trends (chart)
   • Sale status breakdown (pie chart)
```

**Desktop-Optimized** (or tablet):
- Dashboard overview first
- Actionable cards (click to drill down)
- Charts using simple bar/pie charts
- Settings in sidebar

---

## Information Architecture

### Navigation Structure

#### Mobile App
```
Bottom Tab Navigation (5 tabs):
├── HOME (Browse Cars)
├── MY LISTINGS / INVENTORY (depends on role)
├── SEARCH/FILTER
├── MESSAGES/INQUIRIES
└── ACCOUNT/MENU
```

#### Web App
```
Sidebar Navigation:
├── Dashboard
├── Marketplace / Inventory (role-dependent)
├── Inquiries
├── Settings
└── Logout

Top Header:
├── Logo/Showroom Name
├── Search Bar
└── User Menu (notifications, profile, logout)
```

### App Structure by Role

**CUSTOMER**:
- Browse Cars (public)
- My Listings (edit/delete own cars)
- My Inquiries (inquiries others made about his car)
- Profile/Account

**SHOWROOM_STAFF**:
- Inventory Management (add/edit/delete cars)
- All Inquiries (across all cars)
- Simple Reports
- Profile

**SHOWROOM_ADMIN**:
- Dashboard (overview)
- Inventory Management
- All Inquiries
- Staff Management (add/remove users)
- Settings
- Reports (Phase 1E)

---

## Custom Branding per Showroom

### What Gets Branded Per Instance
Each showroom's app displays:
- **Header with Logo + Showroom Name** (e.g., "🚗 Premium Auto")
- **Primary Color** (header, buttons - optional, defaults to design system)
- **Splash screen** (mobile app)
- **Email notifications**

### Example Multi-Tenant Instances

**Instance 1: Awan Care Showroom (Current Prototype)**
```
Name: "Awan Care Showroom"
Location: "Jourabad"
Logo: "AC" (white text on red circle)
Primary Color: #DC2626 (red)
Domain: awan-care-app.com
Header: [AC Logo] Awan Care Showroom | Jourabad
```

**Instance 2: Premium Auto Showroom**
```
Name: "Premium Auto Showroom"
Logo: Custom PNG (car icon)
Primary Color: #2563eb (blue)
Domain: premium-auto-app.com
```

**Instance 3: Luxury Motors**
```
Name: "Luxury Motors"
Logo: Custom PNG (luxury icon)
Primary Color: #dc2626 (red)
Domain: luxury-motors-app.com
```

**Instance 4: Budget Cars**
```
Name: "Budget Cars"
Logo: Custom PNG (budget icon)
Primary Color: #059669 (green)
Domain: budget-cars-app.com
```

### Branding Configuration (SaaS Onboarding)
Showroom owner uploads during setup:
- Showroom name (required, shown in header)
- Logo file (PNG 256x256px, optional)
- Primary color (hex code, optional - defaults to #1F2937)
- Location/city (optional)
- Contact phone (optional)

All branding loads from database on app startup.

---

## Design System (Default Theme)

### Color Palette (Default - Can be Overridden per Showroom)

| Role | Primary | Secondary | Accent | Neutral |
|------|---------|-----------|--------|---------|
| **Colors** | `#1F2937` (Dark Gray) | `#3B82F6` (Blue) | `#EF4444` (Red) | `#F3F4F6` (Light Gray) |

**Usage**:
- **Primary**: Buttons, headers, key CTAs
- **Secondary**: Links, hover states
- **Accent**: Alerts, important actions (sell, publish)
- **Neutral**: Backgrounds, borders, text

**Note**: Showroom can customize primary color during setup.

### Typography

```
Font Family: Inter, San Francisco, Roboto (system fonts)
Hierarchy:
  - H1: 32px, Bold (page title)
  - H2: 24px, Semi-bold (section titles)
  - H3: 20px, Semi-bold (subsection)
  - Body: 16px, Regular (default text)
  - Small: 14px, Regular (secondary info)
  - Tiny: 12px, Regular (captions, timestamps)
```

### Component Library

| Component | Spec |
|-----------|------|
| **Button** | 48px height (mobile), rounded corners, full-width on mobile |
| **Input Field** | 44px height, 16px padding, 1px border |
| **Card** | 8px border-radius, subtle shadow, padding 16px |
| **Modal** | 90vh max-height, 16px padding, scroll if needed |
| **Chip/Badge** | 28px height, 8px padding, small text |

### Spacing

```
Base Unit: 8px (8, 16, 24, 32, 48, 64, 80px)
- Margins: 16px between sections (mobile), 24px (web)
- Padding: 16px inside cards (mobile), 24px (web)
- Gap between items: 8px (lists), 16px (sections)
```

### Icons

- **Source**: Feather Icons or Heroicons (simple, consistent)
- **Size**: 24px (standard), 32px (large buttons), 20px (small)
- **Color**: Match text color or accent

---

## Wireframes & Screens

### Screen 1: Homepage / Browse Cars (Mobile)

```
┌────────────────────────────┐
│ 🏢 Awan Care     Jourabad  │  ← Combined header
│    Browse 500+ cars        │  ← Tagline in header
├────────────────────────────┤
│  Search make/model...      │  ← Search bar
│   ADVANCED FILTERS         │  ← Filter button
├────────────────────────────┤
│  [CAR 1 - IMAGE]           │
│  Toyota Fortuner           │  ← Professional card
│  2022 | 45,000 km | AT | D │
│  ₹45,00,000               │
│  ★★★★★ (12 reviews)       │
├────────────────────────────┤
│  [CAR 2 - IMAGE]           │
│  ...                       │
└────────────────────────────┘
```

**Showroom Branding** (Customizable per Instance):
- **Logo**: Small square image (32px) from showroom owner
- **Name**: Showroom name (e.g., "Premium Auto Showroom" → shortened to "Premium Auto")
- **Header Color**: Can use showroom's primary color (optional, defaults to #1F2937)
- **Example variants**:
  - Instance 1: 🚗 Luxury Motors (header color #2563eb)
  - Instance 2: 🏎️ Speed Zone (header color #dc2626)
  - Instance 3: 🚙 Affordable Cars (header color #059669)

**Interaction**:
- Swipe up to load more cars (infinite scroll)
- Tap filter icon → modal opens with filters
- Tap card → navigate to detail screen
- Search bar → search by make/model
- Logo/name → optionally go to showroom info (future)

---

### Screen 2: Car Detail Page (Mobile)

```
┌─────────────────────┐
│  < BACK  [CAR NAME] │  ← Header with back button
├─────────────────────┤
│   [PHOTO 1 >]       │  ← Carousel (swipe left/right)
│   • • • (3 photos)  │
├─────────────────────┤
│  Price: ₹45,00,000  │  ← Highlighted
│  ★★★★★ (2 reviews) │
├─────────────────────┤
│  SPECS:             │  ← Collapsible section
│  - Year: 2022       │
│  - Mileage: 5000km  │
│  - Transmission: AT │
│  - Fuel: Diesel     │
│  - Color: Black     │
│  - Condition: Good  │
├─────────────────────┤
│  DESCRIPTION:       │
│  Well maintained,   │
│  single owner...    │
├─────────────────────┤
│ [CONTACT SHOWROOM]  │  ← Large primary CTA
│ [ADD TO WISHLIST] ♡ │  ← Secondary
└─────────────────────┘
```

**Interaction**:
- Scroll down to see specs
- Tap CONTACT → pre-filled form with phone, message
- Tap WISHLIST → (future feature)

---

### Screen 3: Upload Car Form - Step 1 (Mobile)

```
┌─────────────────────┐
│ SELL YOUR CAR  ✓    │  ← Header
│ Step 1 of 4         │  ← Progress
├─────────────────────┤
│                     │
│ What's the make?    │  ← Large label
│                     │
│ [Select Make ▼]     │  ← Dropdown (searchable)
│ • Toyota            │
│ • Maruti            │
│ • Hyundai           │
│                     │
│ [NEXT >]            │  ← Bottom button
└─────────────────────┘
```

**Interaction**:
- Tap dropdown → search and select
- NEXT button → validate and go to step 2
- Back button → confirm exit (save draft)

---

### Screen 4: Inventory Dashboard (Web - Desktop View)

```
┌──────────────────────────────────────────────┐
│ SHOWROOM INVENTORY              [+ ADD CAR]  │ ← Header
├──────────────────────────────────────────────┤
│ Total: 45 | Available: 32 | Pending: 10     │ ← Stats
├────┬─────────────┬──────┬──────┬────────────┤
│ #  │ CAR NAME    │ YEAR │ STAT │ INQUIRIES │ ← Table headers
├────┼─────────────┼──────┼──────┼────────────┤
│ 1  │ Toyota Inno │ 2023 │ ✓ Av │ 3 pending │
│ 2  │ Maruti Swift│ 2021 │ ⏳ Pen│ 5 interes │
│ 3  │ Hyundai Cre │ 2022 │ ✗ Sold│ 2 done   │
│ .. │ ...         │      │      │           │
└────┴─────────────┴──────┴──────┴────────────┘
  Tap row to edit / Delete options on hover
```

**Interaction**:
- Click on row → detail modal or page
- Hover → show edit/delete buttons
- Click status column → dropdown to change
- Search bar → filter by make/model
- Add Car button → open upload form

---

### Screen 5: Inquiries List (Mobile)

```
┌─────────────────────┐
│   INQUIRIES    (3)  │  ← Count badge
├─────────────────────┤
│ [FILTER ▼]          │  ← Status filter
├─────────────────────┤
│ Rahul K.            │  ← Inquiry from customer
│ About: Toyota Innov │
│ "Is this available?"│
│ 2 hours ago | ★★★★☆ │
│ [REPLY] [MARK READ] │
├─────────────────────┤
│ Priya M.            │
│ About: Maruti Swift │
│ "Can I visit today?"│
│ 5 hours ago         │
│ [REPLY] [MARK READ] │
├─────────────────────┤
│ Vikram S.           │
│ About: Hyundai Creta│
│ "Best price offer?" │
│ 1 day ago | NEW ●   │
│ [REPLY] [MARK READ] │
└─────────────────────┘
```

**Interaction**:
- Swipe left → delete/archive
- Tap inquiry → full message + reply form
- Filter by status (Pending, Contacted, Interested, Not Interested)

---

## Responsive Design Specifications (Mobile + Web Equally)

**Philosophy**: Single codebase that works beautifully on all screen sizes - no compromise on either platform.

### Breakpoints (Equal Priority)
```
Mobile:    320px - 767px   (smartphones - 50% effort)
  ├─ Portrait orientation
  ├─ Touch-optimized (48px tap targets)
  └─ Bottom navigation tabs

Tablet:    768px - 1023px  (in-between)
  ├─ Can rotate (portrait/landscape)
  └─ Flexible navigation (tabs or sidebar)

Desktop:   1024px+         (web browsers - 50% effort)
  ├─ Landscape orientation
  ├─ Keyboard + mouse support
  ├─ Sidebar/top navigation
  └─ Multi-column layouts (grid)
```

### Mobile Optimization (320px - 767px)
- **Touch Targets**: Minimum 48px × 48px
- **Buttons**: Full-width or large touch areas
- **Spacing**: 8px minimum between tappable elements
- **Form inputs**: 44px height minimum
- **Orientation**: Portrait primary, landscape supported
- **Navigation**: Bottom tabs or slide-out menu
- **Layout**: Single column, vertical scrolling

### Desktop Optimization (1024px+)
- **Pointer friendly**: Smaller click areas (32px) acceptable
- **Keyboard support**: Tab navigation, arrow keys
- **Layout**: Multi-column grid, side-by-side elements
- **Navigation**: Sidebar or top navbar
- **Content width**: Max 1200px for readability
- **Horizontal space**: Utilize wider screens efficiently

### Performance Targets (All Devices)
- Load first car listing in < 2.5s (mobile 3G)
- Images optimized (WebP, max 200KB per image)
- Lazy load images below fold
- Minimal animations (respect reducedMotion)
- Works offline (cache key screens)

---

## Performance Targets

| Metric | Target | Rationale |
|--------|--------|-----------|
| **Largest Contentful Paint (LCP)** | < 2.5s | First car image visible |
| **First Input Delay (FID)** | < 100ms | Quick response to taps |
| **Cumulative Layout Shift (CLS)** | < 0.1 | Stable layout (no jumping) |
| **Page Load** | < 3s (mobile 3G) | Acceptable for slow networks |
| **Image Load** | < 1s | Photos should load quick |
| **Form Submission** | < 1s | Button tap → confirmation |
| **Search/Filter** | < 500ms | Instant filtering (debounced) |

### Optimization Strategies
- Compress images (WebP format)
- Code splitting (lazy load routes)
- Minimize JavaScript bundle
- Cache API responses (React Query)
- Debounce search input
- Progressive image loading (blur → sharp)

---

## Accessibility Standards

### WCAG 2.1 Level AA (Minimum)

| Standard | Implementation |
|----------|-----------------|
| **Color Contrast** | 4.5:1 for text, 3:1 for graphics |
| **Keyboard Navigation** | All interactive elements focusable with Tab |
| **Screen Reader** | Images have alt text, form labels associated with inputs |
| **Focus Indicator** | Clear visible focus ring (2px, blue outline) |
| **Font Size** | Minimum 16px (avoid small text) |
| **Mobile Zoom** | Never disable pinch-to-zoom |
| **Motion** | Respect `prefers-reduced-motion` |
| **Form Labels** | Visible labels or ARIA labels |

### Testing
- Test with screen readers (NVDA, JAWS, VoiceOver)
- Keyboard-only navigation
- Color contrast checker
- Mobile accessibility audit

---

## Success Metrics

### User Experience Metrics

| Metric | Target | How to Measure |
|--------|--------|-----------------|
| **Time to Browse First Car** | < 10 seconds | Analytics: page load + tap latency |
| **Form Completion Rate** | > 80% | Completed uploads / started uploads |
| **Mobile Usage %** | > 70% | Analytics: device breakdown |
| **Session Duration** | > 5 minutes | Average time on app |
| **Return Rate** | > 40% (month 1) | Users who come back |

### Business Metrics

| Metric | Target | How to Measure |
|--------|--------|-----------------|
| **Listings Created** | 50+ per showroom/month | Car count in DB |
| **Inquiries Per Listing** | 3+ average | Inquiry count / car count |
| **Staff Adoption** | > 80% of staff using app | Active user count |
| **Customer Satisfaction** | > 4.0/5.0 stars | In-app ratings |

### Technical Metrics

| Metric | Target | Tool |
|--------|--------|------|
| **Core Web Vitals** | All "Good" | Google PageSpeed Insights |
| **Performance Score** | > 90/100 | Lighthouse |
| **Error Rate** | < 0.5% | Sentry |
| **API Response Time** | < 200ms (p95) | Backend monitoring |

---

## Design Handoff Checklist (Before Implementation)

- [ ] All wireframes reviewed and approved
- [ ] Color palette and typography finalized
- [ ] Component library defined in Figma
- [ ] Mobile breakpoints tested
- [ ] Accessibility checklist reviewed
- [ ] Performance budget agreed upon
- [ ] Loading states designed (spinners, skeletons)
- [ ] Error states designed (form validation, API errors)
- [ ] Empty states designed (no cars, no inquiries)
- [ ] Success states designed (confirmation messages)

---

## ✅ Approval Sign-Off

**Status**: APPROVED & FINALIZED (2026-07-25)

**Approved By**: Ehtasham Malik  
**Final Update**: Combined header design (removed separate banner)

**Key Decisions Confirmed**:
- ✅ Personas (Rahul, Priya, Vikram) - Perfect fit for target market
- ✅ User flows (4 main journeys) - Covers all Phase 1 needs
- ✅ Wireframes (5 key screens) - Complete for MVP
- ✅ Design system (colors, typography, spacing) - Professional & consistent
- ✅ **UPDATED**: Responsive design (Mobile + Web equally) - 50% effort both platforms
  - Mobile-optimized (320px-767px): Bottom tabs, touch-friendly, full-width
  - Desktop-optimized (1024px+): Sidebar, multi-column, keyboard-friendly
- ✅ Performance targets (LCP < 2.5s, Core Web Vitals) - Realistic & achievable
- ✅ WCAG AA accessibility - Standard compliance
- ✅ Breakpoints (320px, 768px, 1024px) - Good coverage for all devices
- ✅ Custom branding per showroom - Fully configurable
- ✅ Prototype now responsive - Uses full browser width

**Next Steps**:
1. **Phase 1A (Weeks 1-2)**: Build backend API (no UI yet)
2. **Phase 1B (Weeks 3-5)**: Implement frontend UI following these wireframes exactly
3. **Phase 1C-1E**: Complete remaining features per roadmap

**Implementation Rule**: Build UI to match wireframes pixel-perfect. Any deviation requires approval.

---

**This document is the UX source of truth for Phase 1 MVP. Frontend implementation will follow these specifications exactly.**
