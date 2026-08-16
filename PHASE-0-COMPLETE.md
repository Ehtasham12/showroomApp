# ✅ Phase 0 Complete - UX Design Approved

**Date**: July 25, 2026  
**Status**: Ready to build Phase 1A

---

## What We're Building (MVP Overview)

### Three User Types
1. **Customers** (Rahul) - Browse cars, sell their cars, track inquiries
2. **Showroom Staff** (Priya) - Manage inventory, track inquiries  
3. **Showroom Owner** (Vikram) - Dashboard, investor management (Phase 2)

### Five Key Screens

#### Mobile (Primary)
1. **Browse Cars** - Grid of cars, filters, infinite scroll
2. **Car Detail** - Photos, specs, contact button
3. **Sell Car Form** - 4-step upload process
4. **Inquiries** - List of inquiries with status
5. **My Listings** - Customer's posted cars (edit/delete)

#### Web (Responsive)
1. **Inventory Dashboard** - Table view, staff management
2. **Same as mobile** - Responsive layout

---

## Design System (Locked)

**Colors**:
- Primary: `#1F2937` (Dark Gray)
- Secondary: `#3B82F6` (Blue)
- Accent: `#EF4444` (Red)
- Neutral: `#F3F4F6` (Light Gray)

**Typography**: Inter/Roboto (system fonts)
- H1: 32px Bold
- H2: 24px Semi-bold
- Body: 16px Regular
- Small: 14px Regular

**Spacing**: Base unit 8px (8, 16, 24, 32, 48, 64, 80)

**Touch Targets**: Minimum 48px height for buttons

---

## Performance Targets (Must Hit)

| Metric | Target |
|--------|--------|
| LCP (Largest Contentful Paint) | < 2.5s |
| FID (First Input Delay) | < 100ms |
| CLS (Cumulative Layout Shift) | < 0.1 |
| Page Load | < 3s (mobile 3G) |
| Image Load | < 1s |
| Form Submit | < 1s |

---

## Accessibility Standards

- **WCAG 2.1 Level AA** compliance
- Color contrast: 4.5:1 for text
- Keyboard navigation support
- Screen reader compatible
- Font size minimum: 16px

---

## Mobile-First Approach

**Primary**: Mobile (80% effort)
- Breakpoint: 320px - 767px
- Bottom tab navigation
- Full-screen experiences
- Touch-friendly

**Secondary**: Tablet/Web (20% effort)
- Breakpoint: 768px - 1023px+
- Responsive layout
- Sidebar navigation

---

## Custom Branding per Showroom

Each showroom instance will have:
- Showroom name & logo (configurable)
- Custom colors (optional)
- Branded mobile app
- Independent domain

Example:
```
Showroom 1: acme-auto.com
- Logo: Acme Auto logo
- Color: Custom blue

Showroom 2: premium-auto.com
- Logo: Premium Auto logo
- Color: Custom red
```

---

## What NOT to Change During Implementation

❌ **Do not deviate from**:
- Wireframe layouts (match exactly)
- Color palette (no custom colors)
- Typography sizes (follow specs)
- Touch target sizes (min 48px)
- Mobile-first approach
- Performance targets
- Accessibility standards

✅ **Can improve**:
- Animations (if doesn't hurt performance)
- Micro-interactions (loading, success states)
- Image quality/optimization
- Code efficiency

---

## Next: Phase 1A (Backend Development)

### Phase 1A: Core Infrastructure (Weeks 1-2)

**What to build**:
- User authentication (register, login, JWT)
- Database schema (users, cars, inquiries, showrooms)
- API endpoints (Auth, Users, Cars, Showrooms, Inquiries)
- Role-based access control

**No UI yet** - Just APIs that frontend will consume

**Time estimate**: 2 weeks

---

## After Phase 1A: Phase 1B (Frontend)

**Weeks 3-5**: Build the UI screens using the wireframes

Build in this order:
1. Authentication screens (register, login)
2. Browse cars screen
3. Car detail screen
4. Upload car form (4-step)
5. Inquiries list
6. My listings view
7. Inventory dashboard (web)

Each screen must match the wireframe exactly.

---

## Code Organization

```
apps/backend/        Phase 1A (now)
├── src/modules/
│   ├── auth/         → Implement Week 1
│   ├── users/        → Implement Week 1
│   ├── cars/         → Implement Week 1-2
│   ├── inquiries/    → Implement Week 1-2
│   └── showrooms/    → Implement Week 1-2
└── prisma/schema.prisma  (already designed)

apps/web/            Phase 1B (Weeks 3-5)
├── src/pages/
│   ├── Browse.tsx        → Screen 1
│   ├── CarDetail.tsx     → Screen 2
│   ├── UploadCar.tsx     → Screen 3
│   ├── Inquiries.tsx     → Screen 4
│   ├── MyListings.tsx    → Screen 5
│   └── Inventory.tsx     → Desktop screen
└── src/components/

apps/mobile/         Phase 1B (Weeks 3-5)
├── src/screens/     (same as web, mobile-optimized)
└── src/components/
```

---

## Checklist for Implementation

### Before Starting Code
- [ ] Read `spec/ux-design.md` (wireframes)
- [ ] Understand all 5 screens
- [ ] Know the design system (colors, fonts, spacing)
- [ ] Understand performance targets
- [ ] Understand accessibility requirements

### During Implementation
- [ ] Build wireframe first, no fancy UX yet
- [ ] Test on mobile (320px) + tablet (768px) + desktop (1024px)
- [ ] Check Lighthouse score > 90/100
- [ ] Check color contrast (WebAIM checker)
- [ ] Test with keyboard navigation
- [ ] Compare screenshots to wireframes

### Before Shipping
- [ ] All screens match wireframes pixel-perfect
- [ ] Lighthouse score > 90
- [ ] No console errors
- [ ] Responsive on all breakpoints
- [ ] Images optimized (< 200KB each)
- [ ] Accessibility audit passed

---

## Questions Before You Code?

Review `spec/ux-design.md` again if anything is unclear. This is your source of truth.

---

**Ready to start Phase 1A? → Begin backend development! 🚀**
