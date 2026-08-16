import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { CarDetail } from './CarDetail';
import carDetailReducer from '../store/carDetailSlice';
import inquiryReducer from '../store/inquirySlice';
import carsReducer from '../store/carsSlice';
import filterReducer from '../store/filterSlice';
import paginationReducer from '../store/paginationSlice';

const mockCar = {
  id: '1',
  make: 'Honda',
  model: 'Civic 2020',
  year: 2020,
  price: 1200000,
  status: 'AVAILABLE',
  specifications: JSON.stringify({
    mileage: 45000,
    fuelType: 'Petrol',
    transmission: 'Automatic',
    color: 'Silver',
    condition: 'Good',
    features: ['Air Conditioning', 'Power Windows', 'ABS'],
    description: 'Well maintained Honda Civic',
  }),
  customerName: null,
  customerPhone: null,
  showroomId: null,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  images: [
    {
      id: 'img-1',
      carId: '1',
      url: '/images/honda-civic-1.jpg',
      order: 0,
      createdAt: new Date().toISOString(),
    },
  ],
};

const createMockStore = (carDetail = { data: null, loading: false, error: null }) => {
  return configureStore({
    reducer: {
      carDetail: () => carDetail,
      inquiry: inquiryReducer,
      cars: carsReducer,
      filter: filterReducer,
      pagination: paginationReducer,
    },
  });
};

describe('CarDetail Page', () => {
  describe('Loading State', () => {
    it('should show loading skeleton when data is loading', () => {
      const store = createMockStore({ data: null, loading: true, error: null });

      render(
        <Provider store={store}>
          <BrowserRouter>
            <CarDetail />
          </BrowserRouter>
        </Provider>
      );

      const skeletons = document.querySelectorAll('[class*="animate-pulse"]');
      expect(skeletons.length).toBeGreaterThan(0);
    });
  });

  describe('Error State', () => {
    it('should show error message when car loading fails', () => {
      const store = createMockStore({ data: null, loading: false, error: 'Failed to load' });

      render(
        <Provider store={store}>
          <BrowserRouter>
            <CarDetail />
          </BrowserRouter>
        </Provider>
      );

      expect(screen.getByText(/Unable to Load Car Details/)).toBeInTheDocument();
    });

    it('should show back button in error state', () => {
      const store = createMockStore({ data: null, loading: false, error: 'Failed to load' });

      render(
        <Provider store={store}>
          <BrowserRouter>
            <CarDetail />
          </BrowserRouter>
        </Provider>
      );

      expect(screen.getAllByText(/Back/).length).toBeGreaterThan(0);
    });
  });

  describe('Car Details Display', () => {
    it('should display car make, model, and year', () => {
      const store = createMockStore({ data: mockCar, loading: false, error: null });

      render(
        <Provider store={store}>
          <BrowserRouter>
            <CarDetail />
          </BrowserRouter>
        </Provider>
      );

      expect(screen.getByText(/2020 Honda Civic/)).toBeInTheDocument();
    });

    it('should display formatted price in PKR', () => {
      const store = createMockStore({ data: mockCar, loading: false, error: null });

      render(
        <Provider store={store}>
          <BrowserRouter>
            <CarDetail />
          </BrowserRouter>
        </Provider>
      );

      expect(screen.getByText(/1,200,000/)).toBeInTheDocument();
    });

    it('should display car specifications', () => {
      const store = createMockStore({ data: mockCar, loading: false, error: null });

      render(
        <Provider store={store}>
          <BrowserRouter>
            <CarDetail />
          </BrowserRouter>
        </Provider>
      );

      expect(screen.getByText(/Mileage/)).toBeInTheDocument();
      expect(screen.getByText(/45,000/)).toBeInTheDocument();
      expect(screen.getByText(/Automatic/)).toBeInTheDocument();
      expect(screen.getByText(/Petrol/)).toBeInTheDocument();
    });

    it('should display car features', () => {
      const store = createMockStore({ data: mockCar, loading: false, error: null });

      render(
        <Provider store={store}>
          <BrowserRouter>
            <CarDetail />
          </BrowserRouter>
        </Provider>
      );

      expect(screen.getByText(/Features/)).toBeInTheDocument();
      expect(screen.getByText(/Air Conditioning/)).toBeInTheDocument();
    });

    it('should display description section', () => {
      const store = createMockStore({ data: mockCar, loading: false, error: null });

      render(
        <Provider store={store}>
          <BrowserRouter>
            <CarDetail />
          </BrowserRouter>
        </Provider>
      );

      expect(screen.getByText(/Description/)).toBeInTheDocument();
      expect(screen.getByText(/Well maintained Honda Civic/)).toBeInTheDocument();
    });
  });

  describe('Contact Button', () => {
    it('should display Contact Showroom button', () => {
      const store = createMockStore({ data: mockCar, loading: false, error: null });

      render(
        <Provider store={store}>
          <BrowserRouter>
            <CarDetail />
          </BrowserRouter>
        </Provider>
      );

      expect(screen.getByRole('button', { name: /Contact Showroom/ })).toBeInTheDocument();
    });
  });
});
