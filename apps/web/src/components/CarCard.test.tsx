import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CarCard } from './CarCard';

describe('CarCard Component', () => {
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
        url: '/images/honda-civic.jpg',
        order: 0,
        createdAt: new Date().toISOString(),
      },
    ],
  };

  it('should render car card with make and model', () => {
    render(<CarCard car={mockCar} />);

    expect(screen.getByText(/Honda/)).toBeInTheDocument();
    expect(screen.getByText(/Civic 2020/)).toBeInTheDocument();
  });

  it('should display car image', () => {
    render(<CarCard car={mockCar} />);

    const image = screen.getByAltText(/Honda/i) as HTMLImageElement;
    expect(image).toBeInTheDocument();
    expect(image.src).toContain('/images/honda-civic.jpg');
  });

  it('should show car price in PKR', () => {
    render(<CarCard car={mockCar} />);

    expect(screen.getByText(/1,200,000/)).toBeInTheDocument();
  });

  it('should display car year', () => {
    render(<CarCard car={mockCar} />);

    expect(screen.getByText('2020')).toBeInTheDocument();
  });

  it('should display mileage', () => {
    render(<CarCard car={mockCar} />);

    expect(screen.getByText(/45,000/)).toBeInTheDocument();
  });

  it('should display transmission type', () => {
    render(<CarCard car={mockCar} />);

    expect(screen.getByText(/Automatic/)).toBeInTheDocument();
  });

  it('should display fuel type', () => {
    render(<CarCard car={mockCar} />);

    expect(screen.getByText(/Petrol/)).toBeInTheDocument();
  });

  it('should display status badge', () => {
    render(<CarCard car={mockCar} />);

    expect(screen.getByText('AVAILABLE')).toBeInTheDocument();
  });

  it('should show SOLD status badge', () => {
    const soldCar = { ...mockCar, status: 'SOLD' };
    render(<CarCard car={soldCar} />);

    expect(screen.getByText('SOLD')).toBeInTheDocument();
  });

  it('should call onClick handler when card is clicked', () => {
    const onClick = vi.fn();
    render(<CarCard car={mockCar} onClick={onClick} />);

    const card = screen.getByText(/Honda/).closest('div');
    if (card) {
      card.click();
      expect(onClick).toHaveBeenCalledWith(mockCar.id);
    }
  });

  it('should use fallback image if no image url', () => {
    const carNoImage = { ...mockCar, images: [] };
    render(<CarCard car={carNoImage} />);

    const image = screen.getByAltText(/Honda/i) as HTMLImageElement;
    expect(image.src).toContain('unsplash');
  });
});
