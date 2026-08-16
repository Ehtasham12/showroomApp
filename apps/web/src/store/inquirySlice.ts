import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { Inquiry, CreateInquiryDto } from '../types'
import { inquiriesApi } from '../services/api'

interface InquiryState {
  submitted: Inquiry | null
  loading: boolean
  error: string | null
  success: boolean
}

const initialState: InquiryState = {
  submitted: null,
  loading: false,
  error: null,
  success: false,
}

export const submitInquiry = createAsyncThunk(
  'inquiry/submitInquiry',
  async (data: CreateInquiryDto, { rejectWithValue }) => {
    try {
      const result = await inquiriesApi.create(data)
      return result
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to submit inquiry')
    }
  }
)

const inquirySlice = createSlice({
  name: 'inquiry',
  initialState,
  reducers: {
    clearInquiry: (state) => {
      state.submitted = null
      state.error = null
      state.success = false
      state.loading = false
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitInquiry.pending, (state) => {
        state.loading = true
        state.error = null
        state.success = false
      })
      .addCase(submitInquiry.fulfilled, (state, action: PayloadAction<Inquiry>) => {
        state.loading = false
        state.submitted = action.payload
        state.success = true
        state.error = null
      })
      .addCase(submitInquiry.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
        state.success = false
        state.submitted = null
      })
  },
})

export const { clearInquiry } = inquirySlice.actions
export default inquirySlice.reducer
