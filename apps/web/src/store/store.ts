import { configureStore } from '@reduxjs/toolkit'
import carsReducer from './carsSlice'
import filterReducer from './filterSlice'
import paginationReducer from './paginationSlice'
import carDetailReducer from './carDetailSlice'
import inquiryReducer from './inquirySlice'
import sellCarReducer from './sellCarSlice'

export const store = configureStore({
  reducer: {
    cars: carsReducer,
    filters: filterReducer,
    pagination: paginationReducer,
    carDetail: carDetailReducer,
    inquiry: inquiryReducer,
    sellCar: sellCarReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
