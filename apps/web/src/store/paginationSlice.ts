import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface PaginationState {
  page: number
  limit: number
  total: number
}

const initialState: PaginationState = {
  page: 1,
  limit: 20,
  total: 0,
}

const paginationSlice = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload
    },
    setLimit: (state, action: PayloadAction<number>) => {
      state.limit = action.payload
    },
    setTotal: (state, action: PayloadAction<number>) => {
      state.total = action.payload
    },
    nextPage: (state) => {
      if (state.page * state.limit < state.total) {
        state.page += 1
      }
    },
    resetPagination: () => initialState,
  },
})

export const { setPage, setLimit, setTotal, nextPage, resetPagination } = paginationSlice.actions
export default paginationSlice.reducer
