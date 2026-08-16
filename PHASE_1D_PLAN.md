# Phase 1D Development Plan: "Sell Your Car"

## Overview
Multi-step car listing form for customers to upload and sell their vehicles.

**Timeline**: Weeks 6-7 (2 weeks)  
**Status**: Starting now  
**Reference**: [ux-design.md - Screen 3](spec/ux-design.md)

---

## Features Breakdown

### 1. 4-Step Form Flow
```
Step 1/4: Make Selection
Step 2/4: Model & Details  
Step 3/4: Photo Upload
Step 4/4: Price & Seller Info
     ↓
Success Confirmation
```

### Step 1: Make Selection
- **Input**: Searchable dropdown for car make (Honda, Toyota, BMW, etc.)
- **Validation**: Make is required
- **UI**: Progress indicator showing "1 / 4"
- **Navigation**: Next button enabled only when make is selected

### Step 2: Model & Details
- **Inputs**:
  - Model (text input or dropdown based on selected make)
  - Year (dropdown or numeric input, 2000-2026)
  - Mileage (numeric input, e.g., 45000)
  - Transmission (dropdown: Automatic, Manual)
  - Fuel Type (dropdown: Petrol, Diesel, Hybrid, Electric)
  - Condition (dropdown: Excellent, Good, Fair, Needs Repair)
  - Features (multi-select checkboxes: AC, Power Windows, Sunroof, etc.)
  - Description (textarea, optional, max 500 chars)

- **Validation**: 
  - All fields except description are required
  - Mileage must be > 0
  - Year must be realistic (not future)

- **UI**: 
  - Progress indicator showing "2 / 4"
  - Back button to return to Step 1
  - Next button to proceed to Step 3

### Step 3: Photo Upload
- **Input**: Upload up to 8 photos (or more)
- **Features**:
  - Drag-and-drop support
  - Click-to-browse file picker
  - Photo preview thumbnails
  - Reorder photos (drag thumbnails)
  - Delete photo button on each thumbnail
  - File size validation (< 5MB per image)
  - File type validation (JPEG, PNG only)

- **Validation**:
  - At least 1 photo required
  - Maximum 8-10 photos
  - All files must be valid images

- **UI**:
  - Progress indicator showing "3 / 4"
  - Photo count display (e.g., "2 / 8 photos")
  - Upload progress indicator
  - Back button
  - Next button (enabled only with >= 1 photo)

### Step 4: Price & Seller Info
- **Inputs**:
  - Price (numeric input in PKR, e.g., 1200000)
  - Seller Name (text input, required)
  - Seller Phone (text input, required, 10-15 digits format)

- **Validation**:
  - Price must be > 0
  - Name must be 2-50 characters
  - Phone must be 10-15 digits

- **UI**:
  - Progress indicator showing "4 / 4"
  - Submit button instead of Next
  - Back button
  - Summary of car info for review (optional)

### Success Confirmation
- Display message: "Your car has been listed!"
- Show listing ID for reference
- Display: Make, Model, Price, Posted Date
- Buttons:
  - "View Your Listing" → Navigate to My Listings
  - "List Another Car" → Reset form back to Step 1

---

## Technical Implementation

### State Management (Redux)
```typescript
interface SellCarState {
  currentStep: 1 | 2 | 3 | 4;
  formData: {
    make: string;
    model: string;
    year: number;
    mileage: number;
    transmission: string;
    fuelType: string;
    condition: string;
    features: string[];
    description?: string;
    price: number;
    sellerName: string;
    sellerPhone: string;
  };
  photos: File[];
  photoPreview: string[]; // Base64 or blob URLs
  loading: boolean;
  error: string | null;
  success: boolean;
  listingId?: string;
}
```

### API Endpoints Needed
```
POST /cars
- Create new car listing
- Payload: FormData with car details + images
- Response: { id, make, model, price, createdAt }

POST /cars/:id/images
- Upload images for car (if separate endpoint)
- Payload: FormData with images
- Response: { success, images: [...] }
```

### Component Structure
```
pages/
├── SellCar.tsx (main page component)
└── components/
    ├── StepIndicator.tsx (shows 1/4, 2/4, etc.)
    ├── Step1Make.tsx
    ├── Step2Details.tsx
    ├── Step3Photos.tsx
    ├── Step4PriceSeller.tsx
    └── SuccessConfirmation.tsx
```

### Form Validation Library
- Use Zod or Yup for schema validation
- Validate on each step before allowing next
- Show field-level errors inline

### File Upload
- Use FileReader API for preview (base64)
- Validate file size, type, dimensions
- Display preview thumbnails with drag handles
- Show upload progress bar

---

## Testing Requirements

### Unit Tests
- Form validation (all fields)
- Step navigation (forward/back)
- Photo upload validation
- File size/type checking
- Data persistence across steps

### Integration Tests
- Complete form submission flow
- API integration with photo upload
- Redux state updates
- Form state reset on success

### E2E Tests (Manual)
- Full flow on mobile (iPhone, Android)
- Full flow on desktop (Chrome, Safari, Firefox)
- Slow network testing
- Large file upload (5MB+)
- Network failure recovery

---

## UI/UX Details

### Mobile (320px - 768px)
- Full-width form inputs
- Single column layout
- Touch-friendly file upload
- Large buttons (48px min height)
- Stacked button layout

### Desktop (1024px+)
- Centered form (max-width: 600px)
- Better spacing
- Side-by-side buttons where appropriate

### Accessibility
- Proper form labels + aria-labels
- Required field indicators (*)
- Clear error messages
- Keyboard navigation support
- Screen reader friendly

### Loading States
- Disable form during submission
- Show loading spinner on submit button
- Show upload progress for photos
- Prevent double-submission

### Error Handling
- Network errors → Retry button
- Validation errors → Highlight field + show message
- Upload errors → Show which file failed, allow retry
- Server errors → User-friendly message

---

## Dependencies to Add
```json
{
  "react-hook-form": "^7.x",           // Form management
  "zod": "^3.x",                       // Validation schema
  "@hookform/resolvers": "^3.x",       // Hook form + Zod integration
  "react-dropzone": "^14.x"            // Drag-drop file upload
}
```

---

## Definition of Done

✅ All 4 form steps implemented  
✅ Form validation working (Zod schema)  
✅ Photo upload with preview & reordering  
✅ Successful submission creates car listing  
✅ Success confirmation screen shows listing ID  
✅ State management with Redux  
✅ Mobile responsive (320px, 768px)  
✅ Desktop responsive (1024px+)  
✅ Accessibility tested (labels, ARIA, keyboard nav)  
✅ Error handling for upload failures  
✅ Loading states during submission  
✅ Unit tests for validation  
✅ Integration tests for form flow  
✅ Manual E2E testing on mobile & desktop  

---

## Timeline

| Task | Estimate | Start | End |
|------|----------|-------|-----|
| Design component structure | 4h | Day 1 | Day 1 |
| Redux state setup | 4h | Day 1 | Day 2 |
| Steps 1-2 implementation | 8h | Day 2 | Day 3 |
| Step 3 photo upload | 8h | Day 4 | Day 5 |
| Step 4 price/seller info | 4h | Day 5 | Day 6 |
| Success confirmation | 2h | Day 6 | Day 6 |
| API integration | 6h | Day 7 | Day 8 |
| Form validation (Zod) | 4h | Day 8 | Day 9 |
| Testing (unit + integration) | 8h | Day 9 | Day 10 |
| Mobile responsive + polish | 8h | Day 10 | Day 11 |
| Accessibility audit | 4h | Day 11 | Day 12 |
| Bug fixes & refinement | 4h | Day 12 | Day 13 |
| Documentation | 2h | Day 13 | Day 13 |

**Total: ~64 hours (fits 2-week sprint)**

