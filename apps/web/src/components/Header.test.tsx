import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Header } from './Header';

describe('Header Component', () => {
  it('should render header with Awan Cars title', () => {
    render(<Header />);

    expect(screen.getByText('Awan Cars')).toBeInTheDocument();
  });

  it('should display slogan', () => {
    render(<Header />);

    expect(screen.getByText('Find It. Drive It. Own It.')).toBeInTheDocument();
  });

  it('should render menu button', () => {
    render(<Header />);

    const menuBtn = screen.getByLabelText('Toggle sidebar');
    expect(menuBtn).toBeInTheDocument();
  });

  it('should call onToggleSidebar when menu button is clicked', () => {
    const onToggleSidebar = vi.fn();
    render(<Header onToggleSidebar={onToggleSidebar} />);

    const menuBtn = screen.getByLabelText('Toggle sidebar');
    fireEvent.click(menuBtn);

    expect(onToggleSidebar).toHaveBeenCalled();
  });

  it('should render search input', () => {
    render(<Header />);

    const searchInput = screen.getByPlaceholderText(/Search make, model/i);
    expect(searchInput).toBeInTheDocument();
  });

  it('should render notifications button', () => {
    render(<Header />);

    const notificationBtn = screen.getByLabelText('Notifications');
    expect(notificationBtn).toBeInTheDocument();
  });

  it('should render notification dot', () => {
    const { container } = render(<Header />);

    const notificationDot = container.querySelector('.notification-dot');
    expect(notificationDot).toBeInTheDocument();
  });

  it('should render user avatar', () => {
    render(<Header />);

    expect(screen.getByText('RK')).toBeInTheDocument();
  });

  it('should display logo image', () => {
    render(<Header />);

    const logo = screen.getByAltText('Awan Cars logo');
    expect(logo).toBeInTheDocument();
  });

  it('should render search icon', () => {
    const { container } = render(<Header />);

    const searchIcon = container.querySelector('.search-icon');
    expect(searchIcon).toBeInTheDocument();
  });

  it('should have proper header structure', () => {
    const { container } = render(<Header />);

    const header = container.querySelector('.header');
    expect(header).toBeInTheDocument();

    const headerLeft = container.querySelector('.header__left');
    expect(headerLeft).toBeInTheDocument();

    const headerRight = container.querySelector('.header__right');
    expect(headerRight).toBeInTheDocument();
  });

  it('should allow typing in search input', () => {
    render(<Header />);

    const searchInput = screen.getByPlaceholderText(/Search make, model/i) as HTMLInputElement;
    fireEvent.change(searchInput, { target: { value: 'Honda' } });

    expect(searchInput.value).toBe('Honda');
  });

  it('should have menu button SVG icon', () => {
    const { container } = render(<Header />);

    const menuBtn = screen.getByLabelText('Toggle sidebar');
    const svgs = menuBtn.querySelectorAll('svg');

    expect(svgs.length).toBeGreaterThan(0);
  });

  it('should display logo in correct position', () => {
    const { container } = render(<Header />);

    const headerLeft = container.querySelector('.header__left');
    const logo = headerLeft?.querySelector('.header-logo');

    expect(logo).toBeInTheDocument();
  });

  it('should have proper styling classes', () => {
    const { container } = render(<Header />);

    expect(container.querySelector('.header')).toBeInTheDocument();
    expect(container.querySelector('.header-search')).toBeInTheDocument();
    expect(container.querySelector('.header-title')).toBeInTheDocument();
    expect(container.querySelector('.header-slogan')).toBeInTheDocument();
  });
});
