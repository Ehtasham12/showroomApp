import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { Car, Inquiry, CreateCarDto, UpdateCarDto, CarFiltersDto, CreateInquiryDto } from '../types'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

export const apiClient: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
})

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error('Unauthorized access')
    }
    if (error.response?.status === 500) {
      console.error('Server error:', error.response.data)
    }
    return Promise.reject(error)
  }
)

export const carsApi = {
  getAll: async (filters?: CarFiltersDto): Promise<Car[]> => {
    const params = new URLSearchParams()
    if (filters) {
      if (filters.make) params.append('make', filters.make)
      if (filters.model) params.append('model', filters.model)
      if (filters.minPrice !== undefined) params.append('minPrice', filters.minPrice.toString())
      if (filters.maxPrice !== undefined) params.append('maxPrice', filters.maxPrice.toString())
      if (filters.year) params.append('year', filters.year.toString())
      if (filters.status) params.append('status', filters.status)
      if (filters.phone) params.append('phone', filters.phone)
    }
    const response = await apiClient.get<Car[]>('/cars', { params })
    return response.data
  },

  getById: async (id: string): Promise<Car> => {
    const response = await apiClient.get<Car>(`/cars/${id}`)
    return response.data
  },

  getByPhone: async (phone: string): Promise<Car[]> => {
    const response = await apiClient.get<Car[]>('/cars', { params: { phone } })
    return response.data
  },

  create: async (data: CreateCarDto): Promise<Car> => {
    const response = await apiClient.post<Car>('/cars', data)
    return response.data
  },

  update: async (id: string, data: UpdateCarDto): Promise<Car> => {
    const response = await apiClient.put<Car>(`/cars/${id}`, data)
    return response.data
  },

  delete: async (id: string, phone: string): Promise<void> => {
    await apiClient.delete(`/cars/${id}`, { params: { phone } })
  },
}

export const inquiriesApi = {
  create: async (data: CreateInquiryDto): Promise<Inquiry> => {
    const response = await apiClient.post<Inquiry>('/inquiries', data)
    return response.data
  },

  getByPhone: async (phone: string): Promise<Inquiry[]> => {
    const response = await apiClient.get<Inquiry[]>('/inquiries', { params: { phone } })
    return response.data
  },

  getByCar: async (carId: string): Promise<Inquiry[]> => {
    const response = await apiClient.get<Inquiry[]>(`/inquiries/car/${carId}`)
    return response.data
  },
}

export default apiClient
