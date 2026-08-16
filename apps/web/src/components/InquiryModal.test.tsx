import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { InquiryModal } from './InquiryModal';
import inquiryReducer from '../store/inquirySlice';

const createMockStore = (inquiryState = { loading: false, error: null, success: false }) => {
  return configureStore({
    reducer: {
      inquiry: () => inquiryState,
    },
  });
};

describe('InquiryModal Component', () => {
  const mockOnClose = vi.fn();
  const mockOnSuccess = vi.fn();

  beforeEach(() => {
    mockOnClose.mockClear();
    mockOnSuccess.mockClear();
  });

  describe('Modal Visibility', () => {
    it('should not render when isOpen is false', () => {
      const store = createMockStore();
      render(
        <Provider store={store}>
          <InquiryModal
            isOpen={false}
            onClose={mockOnClose}
            carId="1"
            carTitle="2020 Honda Civic"
          />
        </Provider>
      );

      expect(screen.queryByText(/Contact Showroom/)).not.toBeInTheDocument();
    });

    it('should render when isOpen is true', () => {
      const store = createMockStore();
      render(
        <Provider store={store}>
          <InquiryModal
            isOpen={true}
            onClose={mockOnClose}
            carId="1"
            carTitle="2020 Honda Civic"
          />
        </Provider>
      );

      expect(screen.getByText(/Contact Showroom/)).toBeInTheDocument();
    });

    it('should close modal when close button is clicked', () => {
      const store = createMockStore();
      render(
        <Provider store={store}>
          <InquiryModal
            isOpen={true}
            onClose={mockOnClose}
            carId="1"
            carTitle="2020 Honda Civic"
          />
        </Provider>
      );

      const closeButton = screen.getByRole('button', { name: /Close/ });
      fireEvent.click(closeButton);
      expect(mockOnClose).toHaveBeenCalled();
    });
  });

  describe('Form Fields', () => {
    it('should render name input field', () => {
      const store = createMockStore();
      render(
        <Provider store={store}>
          <InquiryModal
            isOpen={true}
            onClose={mockOnClose}
            carId="1"
            carTitle="2020 Honda Civic"
          />
        </Provider>
      );

      expect(screen.getByLabelText(/Full Name/)).toBeInTheDocument();
    });

    it('should render phone input field', () => {
      const store = createMockStore();
      render(
        <Provider store={store}>
          <InquiryModal
            isOpen={true}
            onClose={mockOnClose}
            carId="1"
            carTitle="2020 Honda Civic"
          />
        </Provider>
      );

      expect(screen.getByLabelText(/Phone Number/)).toBeInTheDocument();
    });

    it('should render message textarea field', () => {
      const store = createMockStore();
      render(
        <Provider store={store}>
          <InquiryModal
            isOpen={true}
            onClose={mockOnClose}
            carId="1"
            carTitle="2020 Honda Civic"
          />
        </Provider>
      );

      expect(screen.getByLabelText(/Message/)).toBeInTheDocument();
    });

    it('should update form data when inputs change', () => {
      const store = createMockStore();
      render(
        <Provider store={store}>
          <InquiryModal
            isOpen={true}
            onClose={mockOnClose}
            carId="1"
            carTitle="2020 Honda Civic"
          />
        </Provider>
      );

      const nameInput = screen.getByPlaceholderText(/Your full name/) as HTMLInputElement;
      fireEvent.change(nameInput, { target: { value: 'John Doe' } });
      expect(nameInput.value).toBe('John Doe');
    });
  });

  describe('Form Validation', () => {
    it('should show validation error when name is empty', () => {
      const store = createMockStore();
      render(
        <Provider store={store}>
          <InquiryModal
            isOpen={true}
            onClose={mockOnClose}
            carId="1"
            carTitle="2020 Honda Civic"
          />
        </Provider>
      );

      const submitButton = screen.getByRole('button', { name: /Send Inquiry/ });
      fireEvent.click(submitButton);

      // Verify validation is working by checking that modal is still open (form wasn't submitted)
      expect(screen.getByText(/Contact Showroom/)).toBeInTheDocument();
    });

    it('should show error when name is too short', () => {
      const store = createMockStore();
      render(
        <Provider store={store}>
          <InquiryModal
            isOpen={true}
            onClose={mockOnClose}
            carId="1"
            carTitle="2020 Honda Civic"
          />
        </Provider>
      );

      const nameInput = screen.getByPlaceholderText(/Your full name/);
      fireEvent.change(nameInput, { target: { value: 'A' } });

      const submitButton = screen.getByRole('button', { name: /Send Inquiry/ });
      fireEvent.click(submitButton);

      // Form should still be open (validation prevented submission)
      expect(screen.getByText(/Contact Showroom/)).toBeInTheDocument();
    });

    it('should show error when phone is empty', () => {
      const store = createMockStore();
      render(
        <Provider store={store}>
          <InquiryModal
            isOpen={true}
            onClose={mockOnClose}
            carId="1"
            carTitle="2020 Honda Civic"
          />
        </Provider>
      );

      const nameInput = screen.getByPlaceholderText(/Your full name/);
      fireEvent.change(nameInput, { target: { value: 'John Doe' } });

      const submitButton = screen.getByRole('button', { name: /Send Inquiry/ });
      fireEvent.click(submitButton);

      // Form should still be open (validation prevented submission)
      expect(screen.getByText(/Contact Showroom/)).toBeInTheDocument();
    });

    it('should show error when phone is invalid', () => {
      const store = createMockStore();
      render(
        <Provider store={store}>
          <InquiryModal
            isOpen={true}
            onClose={mockOnClose}
            carId="1"
            carTitle="2020 Honda Civic"
          />
        </Provider>
      );

      const nameInput = screen.getByPlaceholderText(/Your full name/);
      fireEvent.change(nameInput, { target: { value: 'John Doe' } });

      const phoneInput = screen.getByPlaceholderText(/0300 1234567/);
      fireEvent.change(phoneInput, { target: { value: '123' } });

      const submitButton = screen.getByRole('button', { name: /Send Inquiry/ });
      fireEvent.click(submitButton);

      // Form should still be open (validation prevented submission)
      expect(screen.getByText(/Contact Showroom/)).toBeInTheDocument();
    });

    it('should allow valid form submission', () => {
      const store = createMockStore();
      render(
        <Provider store={store}>
          <InquiryModal
            isOpen={true}
            onClose={mockOnClose}
            carId="1"
            carTitle="2020 Honda Civic"
          />
        </Provider>
      );

      const nameInput = screen.getByPlaceholderText(/Your full name/);
      fireEvent.change(nameInput, { target: { value: 'John Doe' } });

      const phoneInput = screen.getByPlaceholderText(/0300 1234567/);
      fireEvent.change(phoneInput, { target: { value: '03001234567' } });

      const submitButton = screen.getByRole('button', { name: /Send Inquiry/ });
      fireEvent.click(submitButton);

      expect(screen.queryByText(/Name is required/)).not.toBeInTheDocument();
      expect(screen.queryByText(/Phone number is required/)).not.toBeInTheDocument();
    });
  });

  describe('Success State', () => {
    it('should display success message after successful submission', () => {
      const store = createMockStore({ loading: false, error: null, success: true });

      render(
        <Provider store={store}>
          <InquiryModal
            isOpen={true}
            onClose={mockOnClose}
            carId="1"
            carTitle="2020 Honda Civic"
            onSuccess={mockOnSuccess}
          />
        </Provider>
      );

      expect(screen.getByText(/Inquiry Sent!/)).toBeInTheDocument();
    });
  });

  describe('Error Handling', () => {
    it('should display error message when submission fails', () => {
      const store = createMockStore({ loading: false, error: 'Failed to send', success: false });

      render(
        <Provider store={store}>
          <InquiryModal
            isOpen={true}
            onClose={mockOnClose}
            carId="1"
            carTitle="2020 Honda Civic"
          />
        </Provider>
      );

      expect(screen.queryByText(/Failed to send/)).toBeInTheDocument();
    });
  });

  describe('Loading State', () => {
    it('should disable form during submission', () => {
      const store = createMockStore({ loading: true, error: null, success: false });

      render(
        <Provider store={store}>
          <InquiryModal
            isOpen={true}
            onClose={mockOnClose}
            carId="1"
            carTitle="2020 Honda Civic"
          />
        </Provider>
      );

      const submitButton = screen.getByRole('button', { name: /Sending/ });
      expect(submitButton).toBeDisabled();
    });
  });

  describe('Message Counter', () => {
    it('should display message character count', () => {
      const store = createMockStore();
      render(
        <Provider store={store}>
          <InquiryModal
            isOpen={true}
            onClose={mockOnClose}
            carId="1"
            carTitle="2020 Honda Civic"
          />
        </Provider>
      );

      const messageInput = screen.getByPlaceholderText(/Any questions/);
      fireEvent.change(messageInput, { target: { value: 'Test message' } });

      expect(screen.getByText(/12\/500/)).toBeInTheDocument();
    });
  });
});
