import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Car } from '../types';
import axios from 'axios';

export interface PhotoPreview {
  file: File;
  preview: string;
}

export interface SellCarFormData {
  make: string;
  model: string;
  year: number;
  mileage: number;
  transmission: string;
  fuelType: string;
  condition: string;
  color: string;
  stock: string;
  availability: string;
  negotiable: boolean;
  description: string;
  price: number;
  sellerName: string;
  sellerPhone: string;
  features?: string[];
}

export interface SellCarState {
  currentStep: 1 | 2 | 3 | 4;
  formData: Partial<SellCarFormData>;
  photos: PhotoPreview[];
  loading: boolean;
  error: string | null;
  success: boolean;
  successData?: Car;
}

const initialState: SellCarState = {
  currentStep: 1,
  formData: {
    make: '',
    model: '',
    year: 0,
    mileage: 0,
    transmission: 'Automatic',
    fuelType: 'Petrol',
    condition: '',
    color: '',
    stock: '',
    availability: 'Available',
    negotiable: false,
    description: '',
    price: 0,
    sellerName: '',
    sellerPhone: '',
  },
  photos: [],
  loading: false,
  error: null,
  success: false,
};

export const submitCarListing = createAsyncThunk(
  'sellCar/submitListing',
  async (formData: SellCarFormData & { photos: File[] }, { rejectWithValue }) => {
    try {
      console.log('📤 submitCarListing - formData:', formData);

      const data = new FormData();

      // Add form fields - preserve numeric types as strings for FormData
      Object.entries(formData).forEach(([key, value]) => {
        if (key === 'photos') return;
        if (key === 'features') {
          data.append(key, JSON.stringify(value));
        } else {
          // For FormData, all values become strings, but backend will parse them correctly
          data.append(key, String(value));
        }
      });

      console.log('📤 FormData keys:', Array.from(data.keys()));

      // Add photos
      formData.photos.forEach((photo) => {
        data.append(`images`, photo);
      });

      const response = await axios.post('http://localhost:3000/cars', data);

      return response.data;
    } catch (error: any) {
      const errorMsg = error.response?.data?.message ||
                       error.response?.statusText ||
                       error.message ||
                       'Failed to submit car listing';
      return rejectWithValue(errorMsg);
    }
  }
);

const sellCarSlice = createSlice({
  name: 'sellCar',
  initialState,
  reducers: {
    setCurrentStep: (state, action: PayloadAction<1 | 2 | 3 | 4>) => {
      state.currentStep = action.payload;
    },
    updateFormData: (state, action: PayloadAction<Partial<SellCarFormData>>) => {
      if (action.payload.year !== undefined || action.payload.price !== undefined) {
        console.log('📝 updateFormData - year/price:', { year: action.payload.year, price: action.payload.price });
      }
      state.formData = { ...state.formData, ...action.payload };
    },
    addPhotos: (state, action: PayloadAction<File[]>) => {
      const newPhotos = action.payload.map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      }));
      state.photos = [...state.photos, ...newPhotos];
    },
    removePhoto: (state, action: PayloadAction<number>) => {
      const photo = state.photos[action.payload];
      if (photo) {
        URL.revokeObjectURL(photo.preview);
      }
      state.photos = state.photos.filter((_, index) => index !== action.payload);
    },
    reorderPhotos: (state, action: PayloadAction<{ fromIndex: number; toIndex: number }>) => {
      const { fromIndex, toIndex } = action.payload;
      const [moved] = state.photos.splice(fromIndex, 1);
      state.photos.splice(toIndex, 0, moved);
    },
    resetForm: (state) => {
      state.photos.forEach((photo) => URL.revokeObjectURL(photo.preview));
      state.currentStep = 1;
      state.formData = { ...initialState.formData };
      state.photos = [];
      state.error = null;
      state.success = false;
      state.successData = undefined;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitCarListing.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitCarListing.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.successData = action.payload;
        state.formData = { ...initialState.formData };
        state.photos = [];
      })
      .addCase(submitCarListing.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  setCurrentStep,
  updateFormData,
  addPhotos,
  removePhoto,
  reorderPhotos,
  resetForm,
  clearError,
} = sellCarSlice.actions;

export default sellCarSlice.reducer;
