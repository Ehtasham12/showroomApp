# Test Cases for ShowRoom App - Phase 1B

## Overview
This document outlines all test cases for Phase 1B features to ensure regression testing when changes are made.

---

## Backend Tests

### 1. Cars API Tests (`cars.controller.spec.ts`)

#### 1.1 GET /cars Endpoint
- **Test**: Should return an array of cars
  - Verify endpoint returns array
  - Verify response status is 200
  - Verify data structure is correct

- **Test**: Should return cars with images
  - Verify each car has `images` array
  - Verify images contain URL property
  - Verify image URLs point to local `/images/` folder

- **Test**: Should return 12 cars when database is seeded
  - Verify count = 12
  - Verify all cars have unique IDs
  - Verify no duplicate cars

#### 1.2 GET /cars/:id Endpoint
- **Test**: Should return a single car by id
  - Verify car data matches requested ID
  - Verify correct car properties returned

- **Test**: Should return car with all specifications
  - Verify make, model, year, price present
  - Verify specifications JSON parsed correctly
  - Verify mileage, fuelType, transmission, color in specs

- **Test**: Should return car image URL
  - Verify image URL is valid
  - Verify image URL starts with `/images/`

#### 1.3 Car Status Tests
- **Test**: AVAILABLE status
  - Verify status = 'AVAILABLE'
  - Verify car is displayable in marketplace

- **Test**: SOLD status
  - Verify status = 'SOLD'
  - Verify car can be queried with sold status

- **Test**: PENDING status
  - Verify status = 'PENDING'
  - Verify car exists with pending status

#### 1.4 Data Integrity Tests
- **Test**: Price validation
  - Verify price is a number
  - Verify price is positive
  - Verify price format is consistent

- **Test**: Year validation
  - Verify year is valid (between 1900 and current year)
  - Verify year is a number

- **Test**: Image validation
  - Verify each car has at least one image
  - Verify image URL is a valid string
  - Verify image order property is numeric

---

## Frontend Tests

### 2. CarCard Component Tests (`CarCard.test.tsx`)

#### 2.1 Display Tests
- **Test**: Should render car make and model
  - Verify "Honda" is displayed
  - Verify "Civic 2020" is displayed

- **Test**: Should display car image
  - Verify image element exists
  - Verify image src contains correct path

- **Test**: Should show car price in PKR
  - Verify price formatted with commas
  - Verify price displays in Pakistani Rupees

- **Test**: Should display car year
  - Verify year "2020" is shown

- **Test**: Should display mileage
  - Verify mileage "45,000" is shown
  - Verify mileage formatting is correct

- **Test**: Should display transmission type
  - Verify "Automatic" or "Manual" shown

- **Test**: Should display fuel type
  - Verify "Petrol" or "Diesel" shown

#### 2.2 Status Badge Tests
- **Test**: Should display AVAILABLE status
  - Verify status badge shows "AVAILABLE"
  - Verify status has correct styling

- **Test**: Should display SOLD status
  - Verify status badge shows "SOLD"
  - Verify SOLD has different styling

#### 2.3 Interaction Tests
- **Test**: Should call onClick handler when card is clicked
  - Verify callback function is invoked
  - Verify correct car ID is passed

#### 2.4 Image Fallback Tests
- **Test**: Should use fallback image if no image URL
  - Verify fallback image displays
  - Verify fallback is from Unsplash

---

### 3. Sidebar Component Tests (`Sidebar.test.tsx`)

#### 3.1 Rendering Tests
- **Test**: Should render sidebar with navigation items
  - Verify "Browse cars" button exists
  - Verify "My listings" button exists
  - Verify "Sell a car" button exists
  - Verify "Inquiries" button exists
  - Verify "Account" button exists
  - Verify "Log out" button exists

#### 3.2 Collapsed State Tests
- **Test**: Should have collapsed state by default
  - Verify sidebar has 64px width
  - Verify labels are hidden
  - Verify only icons visible

- **Test**: Should not show labels when collapsed
  - Verify all `.sidebar-label` elements have `display: none`

#### 3.3 Expanded State Tests
- **Test**: Should have expanded class when expanded prop is true
  - Verify sidebar has `expanded` class
  - Verify width is 240px
  - Verify labels are visible

- **Test**: Should show labels when expanded
  - Verify "Browse cars" label visible
  - Verify "My listings" label visible
  - Verify "Sell a car" label visible
  - Verify "Inquiries" label visible
  - Verify "Account" label visible
  - Verify "Log out" label visible

#### 3.4 Active State Tests
- **Test**: Should have Browse cars as active by default
  - Verify first button has `.active` class
  - Verify active button has red background color

#### 3.5 Badge Tests
- **Test**: Should have notification badge on Inquiries
  - Verify badge shows "3"
  - Verify badge has correct styling
  - Verify badge position is top-right

#### 3.6 Icon Tests
- **Test**: Should render SVG icons for each nav item
  - Verify 5+ SVG icons rendered
  - Verify icons display correctly
  - Verify icons are stroke-based (not filled)

---

### 4. Header Component Tests (`Header.test.tsx`)

#### 4.1 Content Tests
- **Test**: Should render header with Awan Cars title
  - Verify "Awan Cars" text displayed
  - Verify title styling is correct

- **Test**: Should display slogan
  - Verify "Find It. Drive It. Own It." displayed
  - Verify slogan styling is muted/gray color

#### 4.2 Logo Tests
- **Test**: Should display logo image
  - Verify logo element exists
  - Verify logo src points to asset
  - Verify logo has correct dimensions

#### 4.3 Menu Button Tests
- **Test**: Should render menu button
  - Verify menu button exists
  - Verify button has hamburger icon

- **Test**: Should call onToggleSidebar when menu button is clicked
  - Verify callback invoked on click
  - Verify callback receives correct parameters

#### 4.4 Search Box Tests
- **Test**: Should render search input
  - Verify search input exists
  - Verify placeholder text is correct
  - Verify search is functional

- **Test**: Should allow typing in search input
  - Verify text can be entered
  - Verify value updates on change

#### 4.5 Notifications Tests
- **Test**: Should render notifications button
  - Verify notification button exists
  - Verify notification icon displays

- **Test**: Should render notification dot
  - Verify red notification indicator visible
  - Verify positioned correctly (top-right)

#### 4.6 User Avatar Tests
- **Test**: Should render user avatar
  - Verify avatar displays "RK"
  - Verify avatar is circular
  - Verify avatar has proper styling

#### 4.7 Layout Tests
- **Test**: Should have proper header structure
  - Verify header element exists
  - Verify header__left section exists
  - Verify header__right section exists
  - Verify search box in center

---

### 5. Browse Page Tests (`Browse.test.tsx`)

#### 5.1 Page Content Tests
- **Test**: Should render Browse page title
  - Verify "Browse cars" title displayed

- **Test**: Should display vehicle count
  - Verify "2 vehicles" or correct count shown

- **Test**: Should display Sell your car button
  - Verify button exists
  - Verify button is clickable

#### 5.2 Car List Tests
- **Test**: Should render car cards for each car
  - Verify all cars display
  - Verify car names match data

- **Test**: Should display all 12 cars when loaded
  - Verify 12 car cards rendered
  - Verify all car data correct
  - Verify all images loaded

#### 5.3 Sort/Filter Tests
- **Test**: Should have sort dropdown
  - Verify sort dropdown exists
  - Verify "Newest first" is default
  - Verify can change sort order

#### 5.4 Loading State Tests
- **Test**: Should show loading state
  - Verify loading indicator displays
  - Verify page doesn't crash during loading

#### 5.5 Layout Tests
- **Test**: Should have responsive grid layout
  - Verify grid class exists
  - Verify responsive columns work
  - Verify grid displays correctly on mobile

#### 5.6 Data Display Tests
- **Test**: Should display car make and model
  - Verify all make/models shown
  - Verify formatting is correct

- **Test**: Should display car prices
  - Verify all prices formatted correctly
  - Verify PKR currency shown

---

## Integration Tests

### 6. API Integration Tests

#### 6.1 End-to-End Data Flow
- **Test**: Fetch cars from API and display in UI
  - 1. Call GET /cars
  - 2. Verify response contains 12 cars
  - 3. Verify each car has images
  - 4. Verify images are accessible
  - 5. Verify UI renders all cars

#### 6.2 Image Loading Integration
- **Test**: Load images from local `/images/` folder
  - 1. Verify images exist in public/images/
  - 2. Verify API returns correct image paths
  - 3. Verify browser can load images
  - 4. Verify no broken image indicators

#### 6.3 Search Integration
- **Test**: Search functionality across API and UI
  - 1. Type in search box
  - 2. Dispatch search action to Redux
  - 3. Filter cars by search query
  - 4. Verify UI updates with filtered results

---

## Regression Test Checklist

### Before Any Code Changes, Run:
```bash
# Backend tests
cd apps/backend
npm run test

# Frontend tests
cd apps/web
npm run test
```

### Critical Tests (Must Pass Before Deployment)
- ✅ All 12 cars display in grid
- ✅ All car images load from `/images/` folder
- ✅ Sidebar toggle works (collapsed/expanded states)
- ✅ Header displays logo, title, and slogan
- ✅ Menu button toggles sidebar
- ✅ Car cards show all required info (make, model, year, price, mileage, transmission, fuel, status)
- ✅ Status badges display correctly (AVAILABLE, SOLD, PENDING)
- ✅ Responsive design works on mobile
- ✅ Search box accepts input
- ✅ Sort dropdown changes car order

---

## Performance Tests

### Frontend Performance
- [ ] Page load time < 3 seconds
- [ ] Images lazy load
- [ ] No console errors on load
- [ ] No memory leaks on navigation
- [ ] Smooth animations (60fps)

### Backend Performance
- [ ] GET /cars responds in < 500ms
- [ ] GET /cars/:id responds in < 200ms
- [ ] Database queries optimized (check N+1 queries)
- [ ] API handles concurrent requests

---

## Browser Compatibility

### Desktop
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

### Mobile
- [ ] Chrome Mobile
- [ ] Safari iOS
- [ ] Samsung Internet

---

## Accessibility Tests

- [ ] Keyboard navigation works
- [ ] Screen reader friendly (ARIA labels)
- [ ] Color contrast sufficient
- [ ] Focus indicators visible
- [ ] Images have alt text

---

## Test Execution Guide

### Run All Tests
```bash
npm test
```

### Run Specific Test Suite
```bash
# Backend only
cd apps/backend && npm test

# Frontend only
cd apps/web && npm test

# Watch mode (auto-rerun on changes)
npm test -- --watch
```

### Generate Coverage Report
```bash
npm test -- --coverage
```

### Run Specific Test File
```bash
npm test -- CarCard.test.tsx
```

---

## Success Criteria for Phase 1B

✅ All test cases pass  
✅ No regression errors  
✅ Code coverage > 80% on critical paths  
✅ All 12 cars display with images  
✅ Sidebar expand/collapse works  
✅ Responsive design verified  
✅ No console errors  
✅ Performance metrics met  

---

**Last Updated**: 2026-08-04  
**Version**: 1.0  
**Next Phase**: Phase 1C (Customer Car Upload)
