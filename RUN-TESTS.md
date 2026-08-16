# How to Run Tests for ShowRoom App

## Quick Start

### 1. Backend Tests
```bash
cd apps/backend
npm test
```

### 2. Frontend Tests
```bash
cd apps/web
npm test
```

### 3. Run All Tests (from root)
```bash
npm test
```

---

## Test Coverage by Feature

### Phase 1B Feature Testing

#### Cars API
```bash
cd apps/backend
npm test -- cars.controller.spec.ts
```
✅ Tests 12 cars in database  
✅ Tests car images from `/images/` folder  
✅ Tests car status (AVAILABLE, SOLD, PENDING)  
✅ Tests all car properties  

#### Car Cards Display
```bash
cd apps/web
npm test -- CarCard.test.tsx
```
✅ Tests car information display  
✅ Tests image loading  
✅ Tests price formatting  
✅ Tests status badges  
✅ Tests car specifications  

#### Sidebar Navigation
```bash
cd apps/web
npm test -- Sidebar.test.tsx
```
✅ Tests collapsed/expanded states  
✅ Tests all navigation items  
✅ Tests notification badges  
✅ Tests icons rendering  

#### Header Component
```bash
cd apps/web
npm test -- Header.test.tsx
```
✅ Tests logo and title  
✅ Tests slogan display  
✅ Tests menu button toggle  
✅ Tests search box  
✅ Tests notifications  
✅ Tests user avatar  

#### Browse Page
```bash
cd apps/web
npm test -- Browse.test.tsx
```
✅ Tests 12 cars display  
✅ Tests vehicle count  
✅ Tests sort/filter dropdown  
✅ Tests responsive grid  
✅ Tests loading states  

---

## Regression Testing Workflow

### Step 1: Before Making Changes
```bash
npm test
```
Record the baseline - all tests should pass.

### Step 2: Make Your Changes
Edit the code as needed.

### Step 3: Run Tests Again
```bash
npm test
```
Verify no tests broke.

### Step 4: If Tests Fail
```bash
# Watch mode to debug
npm test -- --watch

# Run specific failing test
npm test -- CarCard.test.tsx
```

### Step 5: Fix and Re-test
Once fixed, run all tests again.

---

## Test Commands Reference

### Run All Tests
```bash
npm test
```

### Run Tests in Watch Mode
```bash
npm test -- --watch
```

### Run Specific Test File
```bash
npm test -- CarCard.test.tsx
```

### Run Tests Matching Pattern
```bash
npm test -- --testNamePattern="should render"
```

### Generate Coverage Report
```bash
npm test -- --coverage
```

### Run Tests in CI Mode (No Watch)
```bash
npm test -- --ci --coverage
```

### Debug Tests
```bash
node --inspect-brk ./node_modules/.bin/jest --runInBand
```

---

## Expected Test Results

### Backend Tests (6 test suites)
```
✓ CarsController
  ✓ GET /cars
    ✓ should return an array of cars
    ✓ should return cars with images
    ✓ should return 12 cars
  ✓ GET /cars/:id
    ✓ should return a single car
    ✓ should return car with specifications
    ✓ should return car image URL
  ✓ Car Status
    ✓ should have AVAILABLE status
    ✓ should support SOLD status
    ✓ should support PENDING status

Test Suites: 1 passed, 1 total
Tests: 11 passed, 11 total
```

### Frontend Tests (9 test suites)
```
✓ CarCard Component (10 tests)
✓ Sidebar Component (12 tests)
✓ Header Component (13 tests)
✓ Browse Page (12 tests)

Test Suites: 4 passed, 4 total
Tests: 47 passed, 47 total
```

---

## Critical Tests (High Priority)

These tests must pass before any deployment:

### Backend
```bash
cd apps/backend
npm test -- --testNamePattern="should return 12 cars"
npm test -- --testNamePattern="should return cars with images"
npm test -- --testNamePattern="should return car image URL"
```

### Frontend
```bash
cd apps/web
npm test -- --testNamePattern="should render car card with make and model"
npm test -- --testNamePattern="should display car image"
npm test -- --testNamePattern="should have expanded class"
npm test -- --testNamePattern="should render header with Awan Cars title"
npm test -- --testNamePattern="should display all 12 cars"
```

---

## Debugging Failed Tests

### If Images Tests Fail
```bash
# Check if images exist
ls apps/web/public/images/

# Verify API returns correct paths
curl http://localhost:3000/cars | grep images
```

### If Sidebar Tests Fail
```bash
# Check Sidebar.tsx syntax
npm run build:web

# Check Sidebar.css is imported
grep "import.*Sidebar.css" apps/web/src/components/Sidebar.tsx
```

### If Header Tests Fail
```bash
# Verify logo image exists
ls apps/web/src/assets/icon512.png

# Check Header imports
grep "import.*icon512" apps/web/src/components/Header.tsx
```

### If Browse Tests Fail
```bash
# Verify Redux store is configured
cat apps/web/src/store/store.ts

# Check API is accessible
curl http://localhost:3000/cars
```

---

## Performance Benchmarks

### Target Response Times
- GET /cars: < 500ms
- GET /cars/:id: < 200ms
- Page Load: < 3 seconds
- Image Load: < 1 second per image

### Check Current Performance
```bash
# Backend response time
time curl http://localhost:3000/cars

# Frontend lighthouse
npm audit
```

---

## Continuous Integration (GitHub Actions)

Tests should be automatically run on:
- Push to main branch
- Pull requests
- Before merge

```yaml
# .github/workflows/test.yml
name: Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - run: npm ci
      - run: npm test -- --ci --coverage
```

---

## Troubleshooting

### Tests Won't Run
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm test
```

### Tests Hang
```bash
# Increase timeout
npm test -- --testTimeout=10000
```

### Image Path Tests Fail
```bash
# Verify images are in public folder
find apps/web/public/images -name "*.jpg"

# Reseed database with correct paths
cd apps/backend && npm run db:seed
```

### Database Tests Fail
```bash
# Reset database
cd apps/backend
npx prisma migrate reset

# Reseed
npm run db:seed
```

---

## After Phase 1B - Before Phase 1C

Run this checklist before starting Phase 1C:

```bash
# 1. Run all tests
npm test

# 2. Generate coverage
npm test -- --coverage

# 3. Check for console errors
npm run build

# 4. Test on mobile
# Open http://localhost:3001 on phone/tablet

# 5. Verify all features
# - Browse 12 cars
# - Click sidebar menu button
# - Search for a car
# - Sort cars
# - Check responsive design
```

✅ If all pass, Phase 1B is complete and ready for Phase 1C!

---

**Test Framework**: Jest + Vitest (React Testing Library)  
**Backend**: NestJS + Jest  
**Frontend**: React + Vite + Vitest  
**Last Updated**: 2026-08-04
