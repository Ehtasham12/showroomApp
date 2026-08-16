import axios, { AxiosInstance, AxiosError } from 'axios';
import { Car, Inquiry, CreateCarDto, UpdateCarDto, CarFiltersDto, CreateInquiryDto } from '@showroom/types';

const API_URL = typeof window !== 'undefined'
  ? (window.location.hostname === 'localhost' ? 'http://localhost:3000' : '/api')
  : 'http://localhost:3000';

export const apiClient: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Handle unauthorized (Phase 2)
      console.error('Unauthorized access');
    }
    if (error.response?.status === 500) {
      console.error('Server error:', error.response.data);
    }
    return Promise.reject(error);
  }
);

// Cars API Service
export const carsApi = {
  /**
   * Get all cars with optional filters
   */
  getAll: async (filters?: CarFiltersDto): Promise<Car[]> => {
    const params = new URLSearchParams();
    if (filters) {
      if (filters.make) params.append('make', filters.make);
      if (filters.model) params.append('model', filters.model);
      if (filters.minPrice !== undefined) params.append('minPrice', filters.minPrice.toString());
      if (filters.maxPrice !== undefined) params.append('maxPrice', filters.maxPrice.toString());
      if (filters.year) params.append('year', filters.year.toString());
      if (filters.status) params.append('status', filters.status);
      if (filters.phone) params.append('phone', filters.phone);
    }
    const response = await apiClient.get<Car[]>('/cars', { params });
    return response.data;
  },

  /**
   * Get single car by ID
   */
  getById: async (id: string): Promise<Car> => {
    const response = await apiClient.get<Car>(`/cars/${id}`);
    return response.data;
  },

  /**
   * Get cars by customer phone (My Listings)
   */
  getByPhone: async (phone: string): Promise<Car[]> => {
    const response = await apiClient.get<Car[]>('/cars', { params: { phone } });
    return response.data;
  },

  /**
   * Create new car listing
   */
  create: async (data: CreateCarDto): Promise<Car> => {
    const response = await apiClient.post<Car>('/cars', data);
    return response.data;
  },

  /**
   * Update car listing (phone verified)
   */
  update: async (id: string, data: UpdateCarDto): Promise<Car> => {
    const response = await apiClient.put<Car>(`/cars/${id}`, data);
    return response.data;
  },

  /**
   * Delete car listing (phone verified)
   */
  delete: async (id: string, phone: string): Promise<void> => {
    await apiClient.delete(`/cars/${id}`, { params: { phone } });
  },
};

// Inquiries API Service
export const inquiriesApi = {
  /**
   * Submit inquiry for a car
   */
  create: async (data: CreateInquiryDto): Promise<Inquiry> => {
    const response = await apiClient.post<Inquiry>('/inquiries', data);
    return response.data;
  },

  /**
   * Get inquiries by customer phone
   */
  getByPhone: async (phone: string): Promise<Inquiry[]> => {
    const response = await apiClient.get<Inquiry[]>('/inquiries', { params: { phone } });
    return response.data;
  },

  /**
   * Get inquiries for a car
   */
  getByCar: async (carId: string): Promise<Inquiry[]> => {
    const response = await apiClient.get<Inquiry[]>(`/inquiries/car/${carId}`);
    return response.data;
  },
};

// Upload API Service
export const uploadApi = {
  /**
   * Upload image file
   */
  uploadImage: async (file: File): Promise<{ url: string; filename: string }> => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await apiClient.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
};

// Health check
export const health = async (): Promise<boolean> => {
  try {
    const response = await apiClient.get('/health');
    return response.status === 200;
  } catch {
    return false;
  }
};

export default apiClient;
