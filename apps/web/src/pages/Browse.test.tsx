import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { Browse } from './Browse';
import carsReducer from '../store/carsSlice';
import filtersReducer from '../store/filterSlice';

describe('Browse Page', () => {
  const mockCars = [
    {
      id: '1',
      make: 'Honda',
      model: 'Civic 2020',
      year: 2020,
      price: 1200000,
      status: 'AVAILABLE',
      specifications: JSON.stringify({ mileage: 45000, fuelType: 'Petrol', transmission: 'Automatic' }),
      customerName: null,
      customerPhone: null,
      showroomId: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      images: [{ id: '1', carId: '1', url: '/images/honda-civic.jpg', order: 0, createdAt: new Date().toISOString() }],
    },
    {
      id: '2',
      make: 'Toyota',
      model: 'Corolla 2019',
      year: 2019,
      price: 1100000,
      status: 'AVAILABLE',
      specifications: JSON.stringify({ mileage: 52000, fuelType: 'Petrol', transmission: 'Manual' }),
      customerName: null,
      customerPhone: null,
      showroomId: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      images: [{ id: '2', carId: '2', url: '/images/toyota-corolla.jpg', order: 0, createdAt: new Date().toISOString() }],
    },
  ];

  let store: any;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        cars: carsReducer,
        filters: filtersReducer,
      },
      preloadedState: {
        cars: {
          list: mockCars,
          loading: false,
          error: null,
          total: 12,
        },
        filters: {
          make: undefined,
          model: undefined,
          minPrice: undefined,
          maxPrice: undefined,
          year: undefined,
          status: 'AVAILABLE',
          searchQuery: '',
          sortBy: 'newest',
        },
      },
    });
  });

  it('should render Browse page title', () => {
    render(
      <Provider store={store}>
        <Browse />
      </Provider>
    );

    expect(screen.getByText(/Browse cars/i)).toBeInTheDocument();
  });

  it('should display vehicle count', () => {
    render(
      <Provider store={store}>
        <Browse />
      </Provider>
    );

    expect(screen.getByText(/2 vehicles/i)).toBeInTheDocument();
  });

  it('should render car cards for each car', () => {
    render(
      <Provider store={store}>
        <Browse />
      </Provider>
    );

    expect(screen.getByText('Honda')).toBeInTheDocument();
    expect(screen.getByText('Toyota')).toBeInTheDocument();
  });

  it('should display Sell your car button', () => {
    render(
      <Provider store={store}>
        <Browse />
      </Provider>
    );

    expect(screen.getByText(/Sell your car/i)).toBeInTheDocument();
  });

  it('should have sort dropdown', () => {
    render(
      <Provider store={store}>
        <Browse />
      </Provider>
    );

    const sortDropdown = screen.getByDisplayValue(/Newest first/i);
    expect(sortDropdown).toBeInTheDocument();
  });

  it('should display all 12 cars when loaded', () => {
    const allCars = Array(12).fill(mockCars[0]).map((car, i) => ({
      ...car,
      id: String(i + 1),
    }));

    store = configureStore({
      reducer: {
        cars: carsReducer,
        filters: filtersReducer,
      },
      preloadedState: {
        cars: {
          list: allCars,
          loading: false,
          error: null,
          total: 12,
        },
        filters: {
          make: undefined,
          model: undefined,
          minPrice: undefined,
          maxPrice: undefined,
          year: undefined,
          status: 'AVAILABLE',
          searchQuery: '',
          sortBy: 'newest',
        },
      },
    });

    render(
      <Provider store={store}>
        <Browse />
      </Provider>
    );

    expect(screen.getByText(/12 vehicles/i)).toBeInTheDocument();
  });

  it('should show loading state', () => {
    const loadingStore = configureStore({
      reducer: {
        cars: carsReducer,
        filters: filtersReducer,
      },
      preloadedState: {
        cars: {
          list: [],
          loading: true,
          error: null,
          total: 0,
        },
        filters: {
          make: undefined,
          model: undefined,
          minPrice: undefined,
          maxPrice: undefined,
          year: undefined,
          status: 'AVAILABLE',
          searchQuery: '',
          sortBy: 'newest',
        },
      },
    });

    render(
      <Provider store={loadingStore}>
        <Browse />
      </Provider>
    );

    // Should render without crashing when loading
    expect(screen.getByText(/Browse cars/i)).toBeInTheDocument();
  });

  it('should have responsive grid layout', () => {
    const { container } = render(
      <Provider store={store}>
        <Browse />
      </Provider>
    );

    const grid = container.querySelector('.grid');
    expect(grid).toBeInTheDocument();
  });

  it('should display car make and model', () => {
    render(
      <Provider store={store}>
        <Browse />
      </Provider>
    );

    expect(screen.getByText('Civic 2020')).toBeInTheDocument();
    expect(screen.getByText('Corolla 2019')).toBeInTheDocument();
  });

  it('should display car prices', () => {
    render(
      <Provider store={store}>
        <Browse />
      </Provider>
    );

    expect(screen.getByText(/1,200,000/)).toBeInTheDocument();
    expect(screen.getByText(/1,100,000/)).toBeInTheDocument();
  });
});
