import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { Car, CarFiltersDto } from '../types'
import { carsApi } from '../services/api'

interface CarsState {
  list: Car[]
  loading: boolean
  error: string | null
  total: number
}

const initialState: CarsState = {
  list: [],
  loading: false,
  error: null,
  total: 0,
}

export const fetchCars = createAsyncThunk(
  'cars/fetchCars',
  async (filters: CarFiltersDto | undefined, { rejectWithValue }) => {
    try {
      const data = await carsApi.getAll(filters)
      return data
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch cars')
    }
  }
)

const carsSlice = createSlice({
  name: 'cars',
  initialState,
  reducers: {
    clearCars: (state) => {
      state.list = []
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCars.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchCars.fulfilled, (state, action: PayloadAction<Car[]>) => {
        state.loading = false
        state.list = action.payload
        state.total = action.payload.length
      })
      .addCase(fetchCars.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export const { clearCars } = carsSlice.actions
export default carsSlice.reducer
