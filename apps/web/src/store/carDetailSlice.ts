import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { Car } from '../types'
import { carsApi } from '../services/api'

interface CarDetailState {
  data: Car | null
  loading: boolean
  error: string | null
}

const initialState: CarDetailState = {
  data: null,
  loading: false,
  error: null,
}

export const fetchCarDetail = createAsyncThunk(
  'carDetail/fetchCarDetail',
  async (carId: string, { rejectWithValue }) => {
    try {
      const data = await carsApi.getById(carId)
      return data
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch car details')
    }
  }
)

const carDetailSlice = createSlice({
  name: 'carDetail',
  initialState,
  reducers: {
    clearCarDetail: (state) => {
      state.data = null
      state.error = null
      state.loading = false
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCarDetail.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchCarDetail.fulfilled, (state, action: PayloadAction<Car>) => {
        state.loading = false
        state.data = action.payload
        state.error = null
      })
      .addCase(fetchCarDetail.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
        state.data = null
      })
  },
})

export const { clearCarDetail } = carDetailSlice.actions
export default carDetailSlice.reducer
