import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { CarFiltersDto } from '../types'

interface FilterState extends CarFiltersDto {
  searchQuery: string
  sortBy: 'newest' | 'price-asc' | 'price-desc'
}

const initialState: FilterState = {
  make: undefined,
  model: undefined,
  minPrice: undefined,
  maxPrice: undefined,
  year: undefined,
  status: 'AVAILABLE',
  searchQuery: '',
  sortBy: 'newest',
}

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setMake: (state, action: PayloadAction<string | undefined>) => {
      state.make = action.payload
    },
    setModel: (state, action: PayloadAction<string | undefined>) => {
      state.model = action.payload
    },
    setPriceRange: (state, action: PayloadAction<{ min?: number; max?: number }>) => {
      if (action.payload.min !== undefined) state.minPrice = action.payload.min
      if (action.payload.max !== undefined) state.maxPrice = action.payload.max
    },
    setYear: (state, action: PayloadAction<number | undefined>) => {
      state.year = action.payload
    },
    setStatus: (state, action: PayloadAction<string | undefined>) => {
      state.status = action.payload
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload
    },
    setSortBy: (state, action: PayloadAction<'newest' | 'price-asc' | 'price-desc'>) => {
      state.sortBy = action.payload
    },
    resetFilters: () => initialState,
  },
})

export const {
  setMake,
  setModel,
  setPriceRange,
  setYear,
  setStatus,
  setSearchQuery,
  setSortBy,
  resetFilters,
} = filterSlice.actions

export default filterSlice.reducer
