// Car-related types
export interface CarSpecs {
  mileage?: number;
  transmission?: string;
  fuelType?: string;
  color?: string;
  condition?: string;
  features?: string[];
  description?: string;
}

export interface CarImage {
  id: string;
  url: string;
  order: number;
}

export interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  status: 'AVAILABLE' | 'SOLD' | 'PENDING' | 'INACTIVE';
  specifications?: string; // JSON string
  customerName?: string;
  customerPhone?: string;
  images: CarImage[];
  showroomId?: string;
  createdAt: string;
  updatedAt: string;
}

// Inquiry-related types
export interface Inquiry {
  id: string;
  carId: string;
  customerName: string;
  customerPhone: string;
  message?: string;
  status: 'PENDING' | 'CONTACTED' | 'INTERESTED' | 'NOT_INTERESTED' | 'COMPLETED';
  createdAt: string;
  updatedAt: string;
}

// DTOs for API calls
export interface CreateCarDto {
  make: string;
  model: string;
  year: number;
  price: number;
  specifications?: string;
  customerName: string;
  customerPhone: string;
}

export interface UpdateCarDto extends Partial<CreateCarDto> {
  customerPhone: string; // Required for verification
}

export interface CreateInquiryDto {
  carId: string;
  customerName: string;
  customerPhone: string;
  message?: string;
}

export interface CarFiltersDto {
  make?: string;
  model?: string;
  minPrice?: number;
  maxPrice?: number;
  year?: number;
  status?: string;
  phone?: string;
}

// API response types
export interface ApiResponse<T> {
  data: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

// User/Auth types (for Phase 2)
export interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  role: 'SHOWROOM_STAFF' | 'SHOWROOM_ADMIN' | 'SUPER_ADMIN';
  showroomId?: string;
  createdAt: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  email: string;
  password: string;
  name: string;
  phone: string;
}

export interface AuthResponse {
  accessToken: string;
  user: User;
}
