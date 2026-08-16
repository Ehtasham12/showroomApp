import type { SellCarFormData } from '../store/sellCarSlice';

interface Step2DetailsProps {
  formData: Partial<SellCarFormData>;
  onFormChange: (data: Partial<SellCarFormData>) => void;
  onBack: () => void;
  onNext: () => void;
}

export const Step2Details = ({
  formData,
  onFormChange,
  onBack,
  onNext,
}: Step2DetailsProps) => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 27 }, (_, i) => currentYear - i);

  const handleFeatureToggle = (feature: string) => {
    const features = formData.features || [];
    const updated = features.includes(feature)
      ? features.filter((f) => f !== feature)
      : [...features, feature];
    onFormChange({ features: updated });
  };

  const isValid =
    formData.model &&
    formData.year &&
    formData.mileage &&
    formData.transmission &&
    formData.fuelType &&
    formData.condition;

  return (
    <div className="space-y-0">
      {/* SECTION 1: Basic Info */}
      <div className="pb-3 mb-3 border-b border-gray-200">
        <h3 className="text-xs font-semibold text-gray-900 mb-2">Basic Info</h3>
        <div className="grid grid-cols-1 gap-2">
          <div>
            <label htmlFor="model" className="block text-xs font-semibold mb-1">
              Model <span className="text-red-500">*</span>
            </label>
            <input
              id="model"
              type="text"
              value={formData.model || ''}
              onChange={(e) => onFormChange({ model: e.target.value })}
              placeholder="Civic"
              className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label htmlFor="year" className="block text-xs font-semibold mb-1">
                Year <span className="text-red-500">*</span>
              </label>
              <select
                id="year"
                value={formData.year || ''}
                onChange={(e) => onFormChange({ year: parseInt(e.target.value) })}
                className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select</option>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="mileage" className="block text-xs font-semibold mb-1">
                Mileage <span className="text-red-500">*</span>
              </label>
              <input
                id="mileage"
                type="number"
                value={formData.mileage || ''}
                onChange={(e) => onFormChange({ mileage: parseInt(e.target.value) || 0 })}
                placeholder="50000"
                className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: Mechanical */}
      <div className="pb-3 mb-3 border-b border-gray-200">
        <h3 className="text-xs font-semibold text-gray-900 mb-2">Mechanical</h3>
        <div className="grid grid-cols-1 gap-2">
          <div>
            <label htmlFor="transmission" className="block text-xs font-semibold mb-1">
              Transmission <span className="text-red-500">*</span>
            </label>
            <select
              id="transmission"
              value={formData.transmission || ''}
              onChange={(e) => onFormChange({ transmission: e.target.value })}
              className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select</option>
              <option value="Automatic">Automatic</option>
              <option value="Manual">Manual</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label htmlFor="fuelType" className="block text-xs font-semibold mb-1">
                Fuel Type <span className="text-red-500">*</span>
              </label>
              <select
                id="fuelType"
                value={formData.fuelType || ''}
                onChange={(e) => onFormChange({ fuelType: e.target.value })}
                className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select</option>
                <option value="Petrol">Petrol</option>
                <option value="Diesel">Diesel</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Electric">Electric</option>
              </select>
            </div>
            <div>
              <label htmlFor="condition" className="block text-xs font-semibold mb-1">
                Condition <span className="text-red-500">*</span>
              </label>
              <select
                id="condition"
                value={formData.condition || ''}
                onChange={(e) => onFormChange({ condition: e.target.value })}
                className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select</option>
                <option value="Excellent">Excellent</option>
                <option value="Good">Good</option>
                <option value="Fair">Fair</option>
                <option value="Needs Repair">Needs Repair</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 3: Description */}
      <div className="pb-3 mb-3 border-b border-gray-200">
        <h3 className="text-xs font-semibold text-gray-900 mb-2">Details</h3>
        <textarea
          value={formData.description || ''}
          onChange={(e) => onFormChange({ description: e.target.value })}
          placeholder="Additional details..."
          maxLength={500}
          rows={2}
          className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />
        <div className="text-xs text-gray-500 mt-1">
          {(formData.description || '').length} / 500
        </div>
      </div>

      {/* Navigation buttons */}
      <div className="sticky bottom-0 left-0 right-0 flex gap-2 pt-2 pb-1 bg-white border-t border-gray-200 -mx-5 -mb-5 px-5 py-2">
        <button
          onClick={onBack}
          className="flex-1 px-3 py-1.5 text-xs border border-gray-300 rounded font-semibold text-gray-700 hover:bg-gray-50 transition"
        >
          Back
        </button>
        <button
          onClick={onNext}
          disabled={!isValid}
          className={`flex-1 px-3 py-1.5 text-xs rounded font-semibold transition ${
            isValid
              ? 'bg-blue-600 hover:bg-blue-700 text-white cursor-pointer'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};
