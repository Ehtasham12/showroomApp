import type { SellCarFormData } from '../store/sellCarSlice';

interface Step4PriceSellerProps {
  formData: Partial<SellCarFormData>;
  onFormChange: (data: Partial<SellCarFormData>) => void;
  onBack: () => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export const Step4PriceSeller = ({
  formData,
  onFormChange,
  onBack,
  onSubmit,
  isLoading,
}: Step4PriceSellerProps) => {
  const isValid =
    formData.price &&
    formData.price > 0 &&
    formData.sellerName &&
    formData.sellerName.trim().length >= 2 &&
    formData.sellerPhone &&
    /^\d{10,15}$/.test(formData.sellerPhone.replace(/\D/g, ''));

  return (
    <div className="space-y-0 py-2">
      {/* Title & Description */}
      <div className="mb-3 pb-3 border-b border-gray-200">
        <h2 className="text-sm font-bold text-gray-900 mb-1">Price & Contact</h2>
        <p className="text-gray-600 text-xs">Set your asking price and confirm your contact details.</p>
      </div>

      {/* SECTION 1: Pricing */}
      <div className="pb-3 mb-3 border-b border-gray-200">
        <h3 className="text-xs font-semibold text-gray-900 mb-2">Asking Price</h3>
        <div>
          <label htmlFor="price" className="block text-xs font-semibold mb-1">
            Price (PKR) <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <span className="absolute left-2 top-2.5 text-gray-600 font-semibold text-sm">₨</span>
            <input
              id="price"
              type="number"
              value={formData.price || ''}
              onChange={(e) => onFormChange({ price: parseInt(e.target.value) || 0 })}
              placeholder="1200000"
              className="w-full px-2 py-1.5 pl-5 text-xs border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {formData.price && (
            <p className="text-xs text-gray-500 mt-1">
              ₨{new Intl.NumberFormat('en-PK').format(formData.price)}
            </p>
          )}
        </div>
      </div>

      {/* SECTION 2: Seller Info */}
      <div className="pb-3 mb-3 border-b border-gray-200">
        <h3 className="text-xs font-semibold text-gray-900 mb-2">Your Contact Information</h3>
        <div className="grid grid-cols-1 gap-2">
          {/* Seller Name */}
          <div>
            <label htmlFor="sellerName" className="block text-xs font-semibold mb-1">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              id="sellerName"
              type="text"
              value={formData.sellerName || ''}
              onChange={(e) => onFormChange({ sellerName: e.target.value })}
              placeholder="Your name"
              className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {formData.sellerName && formData.sellerName.trim().length < 2 && (
              <p className="text-red-600 text-xs mt-0.5">Min 2 characters</p>
            )}
          </div>

          {/* Seller Phone */}
          <div>
            <label htmlFor="sellerPhone" className="block text-xs font-semibold mb-1">
              Phone <span className="text-red-500">*</span>
            </label>
            <input
              id="sellerPhone"
              type="tel"
              value={formData.sellerPhone || ''}
              onChange={(e) => onFormChange({ sellerPhone: e.target.value })}
              placeholder="03001234567"
              className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {formData.sellerPhone && !/^\d{10,15}$/.test(formData.sellerPhone.replace(/\D/g, '')) && (
              <p className="text-red-600 text-xs mt-0.5">10-15 digits required</p>
            )}
          </div>
        </div>
      </div>

      {/* SECTION 3: Summary */}
      <div className="pb-3 mb-3">
        <h3 className="text-xs font-semibold text-gray-900 mb-2">Review</h3>
        <div className="bg-blue-50 border border-blue-200 rounded p-2">
          <div className="space-y-1 text-xs">
            {formData.make && (
              <p><span className="text-gray-600">Car: </span>{formData.year} {formData.make} {formData.model}</p>
            )}
            {formData.price && (
              <p><span className="text-gray-600">Price: </span>₨{new Intl.NumberFormat('en-PK').format(formData.price)}</p>
            )}
            {formData.sellerName && (
              <p><span className="text-gray-600">By: </span>{formData.sellerName}</p>
            )}
          </div>
        </div>
      </div>

      {/* Navigation buttons */}
      <div className="sticky bottom-0 left-0 right-0 flex gap-2 pt-2 pb-1 bg-white border-t border-gray-200 -mx-5 -mb-5 px-5 py-2">
        <button
          onClick={onBack}
          disabled={isLoading}
          className="flex-1 px-3 py-1.5 text-xs border border-gray-300 rounded font-semibold text-gray-700 hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Back
        </button>
        <button
          onClick={onSubmit}
          disabled={!isValid || isLoading}
          className={`flex-1 px-3 py-1.5 text-xs rounded font-semibold transition ${
            isValid && !isLoading
              ? 'bg-green-600 hover:bg-green-700 text-white cursor-pointer'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          {isLoading ? 'Submitting...' : 'Submit'}
        </button>
      </div>
    </div>
  );
};
