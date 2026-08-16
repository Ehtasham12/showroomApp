import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { X, CheckCircle } from 'lucide-react'
import type { RootState, AppDispatch } from '../store/store'
import { submitInquiry, clearInquiry } from '../store/inquirySlice'
import type { CreateInquiryDto } from '../types'
import { Button } from './common'
import { Input } from './common'

interface InquiryModalProps {
  isOpen: boolean
  onClose: () => void
  carId: string
  carTitle: string
  onSuccess?: () => void
}

const validatePhone = (phone: string): boolean => {
  const cleaned = phone.replace(/\D/g, '')
  return cleaned.length >= 10 && cleaned.length <= 15
}

const formatPhoneDisplay = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '')
  if (cleaned.length === 11 && cleaned.startsWith('0')) {
    return '+92' + cleaned.slice(1)
  }
  if (cleaned.length === 10) {
    return '+92' + cleaned
  }
  return phone
}

export const InquiryModal = ({ isOpen, onClose, carId, carTitle, onSuccess }: InquiryModalProps) => {
  const dispatch = useDispatch<AppDispatch>()
  const { loading, error, success } = useSelector((state: RootState) => state.inquiry)

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: '',
  })

  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({})

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setFormData({ name: '', phone: '', message: '' })
      setValidationErrors({})
      dispatch(clearInquiry())
    }
  }, [isOpen, dispatch])

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {}

    if (!formData.name.trim()) {
      errors.name = 'Name is required'
    } else if (formData.name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters'
    } else if (formData.name.trim().length > 50) {
      errors.name = 'Name must be less than 50 characters'
    }

    if (!formData.phone.trim()) {
      errors.phone = 'Phone number is required'
    } else if (!validatePhone(formData.phone)) {
      errors.phone = 'Phone must be 10-15 digits'
    }

    if (formData.message && formData.message.length > 500) {
      errors.message = 'Message must be less than 500 characters'
    }

    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error for this field when user starts typing
    if (validationErrors[name]) {
      setValidationErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    const submitData: CreateInquiryDto = {
      carId,
      customerName: formData.name.trim(),
      customerPhone: formatPhoneDisplay(formData.phone),
      message: formData.message.trim() || undefined,
    }

    const result = await dispatch(submitInquiry(submitData))
    if (submitInquiry.fulfilled.match(result)) {
      onSuccess?.()
    }
  }

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Close modal"
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-4">
        <div
          className="bg-white rounded-t-2xl md:rounded-2xl w-full md:max-w-md max-h-[90vh] overflow-y-auto shadow-xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 bg-white border-b flex items-center justify-between p-4 md:p-6">
            <h2 className="text-xl font-bold">Contact Showroom</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
              aria-label="Close"
            >
              <X size={24} />
            </button>
          </div>

          {/* Content */}
          <div className="p-4 md:p-6">
            {success ? (
              // Success state
              <div className="text-center py-8">
                <div className="flex justify-center mb-4">
                  <CheckCircle size={48} className="text-green-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Inquiry Sent!</h3>
                <p className="text-gray-600 mb-6">
                  Your inquiry about the {carTitle} has been sent to the showroom. They will contact
                  you soon.
                </p>
                <Button onClick={onClose} className="w-full bg-green-600 hover:bg-green-700 text-white">
                  Close
                </Button>
              </div>
            ) : (
              // Form state
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    disabled={loading}
                    error={validationErrors.name}
                  />
                  {validationErrors.name && (
                    <p className="text-red-600 text-sm mt-1">{validationErrors.name}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold mb-2">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="0300 1234567"
                    disabled={loading}
                    error={validationErrors.phone}
                  />
                  <p className="text-gray-500 text-xs mt-1">Format: 10-15 digits (e.g., 0300 1234567)</p>
                  {validationErrors.phone && (
                    <p className="text-red-600 text-sm mt-1">{validationErrors.phone}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold mb-2">
                    Message <span className="text-gray-500">(Optional)</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Any questions or details about the car?"
                    disabled={loading}
                    rows={4}
                    maxLength={500}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 transition ${
                      validationErrors.message
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-gray-300 focus:ring-blue-500'
                    } disabled:bg-gray-100 disabled:cursor-not-allowed`}
                  />
                  <div className="flex justify-between items-start mt-1">
                    <p className="text-gray-500 text-xs">{formData.message.length}/500</p>
                    {validationErrors.message && (
                      <p className="text-red-600 text-sm">{validationErrors.message}</p>
                    )}
                  </div>
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 rounded p-3">
                    <p className="text-red-700 text-sm">{error}</p>
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Sending...' : 'Send Inquiry'}
                </Button>

                <p className="text-gray-500 text-xs text-center">
                  Your phone number will be shared with the showroom for contact purposes.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
