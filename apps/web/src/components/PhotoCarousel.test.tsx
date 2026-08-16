import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { PhotoCarousel } from './PhotoCarousel';
import type { CarImage } from '../types';

describe('PhotoCarousel Component', () => {
  const mockImages: CarImage[] = [
    {
      id: 'img-1',
      carId: '1',
      url: '/images/car-1.jpg',
      order: 0,
      createdAt: new Date().toISOString(),
    },
    {
      id: 'img-2',
      carId: '1',
      url: '/images/car-2.jpg',
      order: 1,
      createdAt: new Date().toISOString(),
    },
    {
      id: 'img-3',
      carId: '1',
      url: '/images/car-3.jpg',
      order: 2,
      createdAt: new Date().toISOString(),
    },
  ];

  describe('Empty State', () => {
    it('should display no images message when images array is empty', () => {
      render(<PhotoCarousel images={[]} alt="Test Car" />);

      expect(screen.getByText(/No images available/i)).toBeInTheDocument();
    });

    it('should not show navigation buttons when images array is empty', () => {
      render(<PhotoCarousel images={[]} alt="Test Car" />);

      expect(screen.queryByLabelText(/Previous image/i)).not.toBeInTheDocument();
      expect(screen.queryByLabelText(/Next image/i)).not.toBeInTheDocument();
    });
  });

  describe('Single Image', () => {
    it('should render single image without navigation buttons', () => {
      render(<PhotoCarousel images={[mockImages[0]]} alt="Test Car" />);

      const img = screen.getByAltText(/Test Car - Image 1/);
      expect(img).toBeInTheDocument();
      expect(img.getAttribute('src')).toBe('/images/car-1.jpg');
    });

    it('should not show carousel controls for single image', () => {
      render(<PhotoCarousel images={[mockImages[0]]} alt="Test Car" />);

      expect(screen.queryByLabelText(/Previous image/i)).not.toBeInTheDocument();
      expect(screen.queryByLabelText(/Next image/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/1 \//)).not.toBeInTheDocument();
    });

    it('should not show thumbnail strip for single image', () => {
      render(<PhotoCarousel images={[mockImages[0]]} alt="Test Car" />);

      expect(screen.queryByLabelText(/Go to image/i)).not.toBeInTheDocument();
    });
  });

  describe('Multiple Images', () => {
    it('should render main image correctly', () => {
      render(<PhotoCarousel images={mockImages} alt="Test Car" />);

      const mainImg = screen.getByAltText(/Test Car - Image 1/);
      expect(mainImg.getAttribute('src')).toBe('/images/car-1.jpg');
    });

    it('should display navigation buttons when multiple images', () => {
      render(<PhotoCarousel images={mockImages} alt="Test Car" />);

      expect(screen.getByLabelText(/Previous image/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Next image/i)).toBeInTheDocument();
    });

    it('should show image counter', () => {
      render(<PhotoCarousel images={mockImages} alt="Test Car" />);

      expect(screen.getByText(/1 \/ 3/)).toBeInTheDocument();
    });

    it('should display thumbnail strip', () => {
      render(<PhotoCarousel images={mockImages} alt="Test Car" />);

      const thumbnails = screen.getAllByLabelText(/Go to image/);
      expect(thumbnails).toHaveLength(3);
    });

    it('should highlight active thumbnail', () => {
      render(<PhotoCarousel images={mockImages} alt="Test Car" />);

      const firstThumbnail = screen.getByLabelText(/Go to image 1/);
      expect(firstThumbnail.className).toContain('ring-2');
      expect(firstThumbnail.className).toContain('ring-blue-500');
    });
  });

  describe('Navigation', () => {
    it('should navigate to next image on next button click', () => {
      render(<PhotoCarousel images={mockImages} alt="Test Car" />);

      const nextButton = screen.getByLabelText(/Next image/);
      fireEvent.click(nextButton);

      expect(screen.getByAltText(/Test Car - Image 2/)).toBeInTheDocument();
      expect(screen.getByText(/2 \/ 3/)).toBeInTheDocument();
    });

    it('should navigate to previous image on previous button click', () => {
      render(<PhotoCarousel images={mockImages} alt="Test Car" />);

      const nextButton = screen.getByLabelText(/Next image/);
      fireEvent.click(nextButton);
      fireEvent.click(nextButton);

      const prevButton = screen.getByLabelText(/Previous image/);
      fireEvent.click(prevButton);

      expect(screen.getByAltText(/Test Car - Image 2/)).toBeInTheDocument();
      expect(screen.getByText(/2 \/ 3/)).toBeInTheDocument();
    });

    it('should wrap around from last to first image on next', () => {
      render(<PhotoCarousel images={mockImages} alt="Test Car" />);

      const nextButton = screen.getByLabelText(/Next image/);
      fireEvent.click(nextButton);
      fireEvent.click(nextButton);
      fireEvent.click(nextButton);

      expect(screen.getByAltText(/Test Car - Image 1/)).toBeInTheDocument();
      expect(screen.getByText(/1 \/ 3/)).toBeInTheDocument();
    });

    it('should wrap around from first to last image on previous', () => {
      render(<PhotoCarousel images={mockImages} alt="Test Car" />);

      const prevButton = screen.getByLabelText(/Previous image/);
      fireEvent.click(prevButton);

      expect(screen.getByAltText(/Test Car - Image 3/)).toBeInTheDocument();
      expect(screen.getByText(/3 \/ 3/)).toBeInTheDocument();
    });
  });

  describe('Thumbnail Navigation', () => {
    it('should navigate to image when thumbnail clicked', () => {
      render(<PhotoCarousel images={mockImages} alt="Test Car" />);

      const thirdThumbnail = screen.getByLabelText(/Go to image 3/);
      fireEvent.click(thirdThumbnail);

      expect(screen.getByAltText(/Test Car - Image 3/)).toBeInTheDocument();
      expect(screen.getByText(/3 \/ 3/)).toBeInTheDocument();
    });

    it('should update active thumbnail styling when navigating', () => {
      render(<PhotoCarousel images={mockImages} alt="Test Car" />);

      const secondThumbnail = screen.getByLabelText(/Go to image 2/);
      fireEvent.click(secondThumbnail);

      expect(secondThumbnail.className).toContain('ring-2');
      expect(secondThumbnail.className).toContain('ring-blue-500');
    });

    it('should sort images by order property', () => {
      const unsortedImages: CarImage[] = [
        { ...mockImages[2], order: 2 },
        { ...mockImages[0], order: 0 },
        { ...mockImages[1], order: 1 },
      ];

      render(<PhotoCarousel images={unsortedImages} alt="Test Car" />);

      const thumbnails = screen.getAllByLabelText(/Go to image/);
      expect(thumbnails[0].querySelector('img')?.src).toContain('car-1.jpg');
      expect(thumbnails[1].querySelector('img')?.src).toContain('car-2.jpg');
      expect(thumbnails[2].querySelector('img')?.src).toContain('car-3.jpg');
    });
  });

  describe('Accessibility', () => {
    it('should have proper alt text for main image', () => {
      render(<PhotoCarousel images={mockImages} alt="Test Car" />);

      const img = screen.getByAltText(/Test Car - Image 1/);
      expect(img).toHaveAttribute('alt');
    });

    it('should have accessible navigation buttons', () => {
      render(<PhotoCarousel images={mockImages} alt="Test Car" />);

      const prevBtn = screen.getByLabelText(/Previous image/);
      const nextBtn = screen.getByLabelText(/Next image/);

      expect(prevBtn).toHaveAttribute('aria-label');
      expect(nextBtn).toHaveAttribute('aria-label');
    });

    it('should have accessible thumbnail buttons', () => {
      render(<PhotoCarousel images={mockImages} alt="Test Car" />);

      const thumbnails = screen.getAllByLabelText(/Go to image/);
      thumbnails.forEach((thumb) => {
        expect(thumb).toHaveAttribute('aria-label');
      });
    });
  });

  describe('Image Counter', () => {
    it('should update counter when navigating', () => {
      render(<PhotoCarousel images={mockImages} alt="Test Car" />);

      expect(screen.getByText(/1 \/ 3/)).toBeInTheDocument();

      const nextButton = screen.getByLabelText(/Next image/);
      fireEvent.click(nextButton);

      expect(screen.getByText(/2 \/ 3/)).toBeInTheDocument();

      fireEvent.click(nextButton);
      expect(screen.getByText(/3 \/ 3/)).toBeInTheDocument();
    });
  });
});
