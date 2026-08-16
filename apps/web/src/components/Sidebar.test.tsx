import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Sidebar } from './Sidebar';

describe('Sidebar Component', () => {
  it('should render sidebar with navigation items', () => {
    render(<Sidebar expanded={false} />);

    expect(screen.getByTitle('Browse cars')).toBeInTheDocument();
    expect(screen.getByTitle('My listings')).toBeInTheDocument();
    expect(screen.getByTitle('Sell a car')).toBeInTheDocument();
  });

  it('should have collapsed state by default', () => {
    const { container } = render(<Sidebar expanded={false} />);

    const sidebar = container.querySelector('.sidebar');
    expect(sidebar).not.toHaveClass('expanded');
  });

  it('should have expanded class when expanded prop is true', () => {
    const { container } = render(<Sidebar expanded={true} />);

    const sidebar = container.querySelector('.sidebar');
    expect(sidebar).toHaveClass('expanded');
  });

  it('should not show labels when collapsed', () => {
    const { container } = render(<Sidebar expanded={false} />);

    const labels = container.querySelectorAll('.sidebar-label');
    labels.forEach((label) => {
      expect(label).toHaveStyle('display: none');
    });
  });

  it('should show labels when expanded', () => {
    const { container } = render(<Sidebar expanded={true} />);

    const labels = container.querySelectorAll('.sidebar-label');
    expect(labels.length).toBeGreaterThan(0);
  });

  it('should display Browse cars label', () => {
    render(<Sidebar expanded={true} />);

    expect(screen.getByText('Browse cars')).toBeInTheDocument();
  });

  it('should display My listings label', () => {
    render(<Sidebar expanded={true} />);

    expect(screen.getByText('My listings')).toBeInTheDocument();
  });

  it('should display Sell a car label', () => {
    render(<Sidebar expanded={true} />);

    expect(screen.getByText('Sell a car')).toBeInTheDocument();
  });

  it('should display Inquiries label with badge', () => {
    render(<Sidebar expanded={true} />);

    expect(screen.getByText('Inquiries')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('should display Account label', () => {
    render(<Sidebar expanded={true} />);

    expect(screen.getByText('Account')).toBeInTheDocument();
  });

  it('should display Log out button', () => {
    render(<Sidebar expanded={true} />);

    expect(screen.getByTitle('Log out')).toBeInTheDocument();
  });

  it('should have Browse cars as active by default', () => {
    const { container } = render(<Sidebar expanded={true} />);

    const firstButton = container.querySelector('.sidebar-btn');
    expect(firstButton).toHaveClass('active');
  });

  it('should have notification badge on Inquiries', () => {
    const { container } = render(<Sidebar expanded={true} />);

    const notifications = container.querySelectorAll('.notification');
    expect(notifications.length).toBeGreaterThan(0);
  });

  it('should render SVG icons for each nav item', () => {
    const { container } = render(<Sidebar expanded={false} />);

    const svgs = container.querySelectorAll('svg');
    expect(svgs.length).toBeGreaterThanOrEqual(5);
  });
});
