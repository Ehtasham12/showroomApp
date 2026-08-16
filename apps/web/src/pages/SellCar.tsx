import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, X } from 'lucide-react';
import type { RootState, AppDispatch } from '../store/store';
import {
  updateFormData,
  addPhotos,
  removePhoto,
  resetForm,
  submitCarListing,
  clearError,
} from '../store/sellCarSlice';
import type { SellCarFormData } from '../store/sellCarSlice';

const CAR_MAKES = [
  'Honda', 'Toyota', 'BMW', 'Mercedes-Benz', 'Audi', 'Volkswagen',
  'Nissan', 'Hyundai', 'Kia', 'Ford', 'Chevrolet', 'Mazda',
  'Suzuki', 'Renault', 'Datsun', 'Mitsubishi', 'Peugeot', 'Skoda',
  'MG', 'Changan', 'Haval', 'JAC',
];

export const SellCar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { formData, photos, loading, error, success } = useSelector(
    (state: RootState) => state.sellCar
  );

  const [dragActive, setDragActive] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => dispatch(clearError()), 5000);
      return () => clearTimeout(timer);
    }
  }, [error, dispatch]);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        dispatch(resetForm());
        navigate('/browse');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [success, dispatch, navigate]);

  useEffect(() => {
    return () => {
      photos.forEach((photo) => URL.revokeObjectURL(photo.preview));
    };
  }, [photos]);

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 27 }, (_, i) => currentYear - i);

  const handleFormChange = (field: keyof SellCarFormData, value: any) => {
    dispatch(updateFormData({ [field]: value }));
  };

  const validateFiles = (files: File[]): boolean => {
    for (const file of files) {
      if (!file.type.startsWith('image/')) {
        setUploadError('Only image files (JPG, PNG) are allowed');
        return false;
      }
      if (file.size > 5 * 1024 * 1024) {
        setUploadError(`File "${file.name}" is too large (max 5MB)`);
        return false;
      }
    }
    if (photos.length + files.length > 12) {
      setUploadError('Maximum 12 photos allowed');
      return false;
    }
    setUploadError(null);
    return true;
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const files = Array.from(e.dataTransfer.files);
    if (validateFiles(files)) {
      dispatch(addPhotos(files));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (validateFiles(files)) {
      dispatch(addPhotos(files));
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const isValid =
    formData.make &&
    formData.model &&
    formData.year &&
    formData.mileage &&
    formData.transmission &&
    formData.fuelType &&
    formData.condition &&
    formData.price &&
    formData.price > 0 &&
    formData.sellerName &&
    formData.sellerName.trim().length >= 2 &&
    formData.sellerPhone &&
    /^\d{10,15}$/.test(formData.sellerPhone.replace(/\D/g, '')) &&
    photos.length > 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;

    const allPhotos = photos.map((p) => p.file);
    dispatch(
      submitCarListing({
        ...(formData as SellCarFormData),
        photos: allPhotos,
      })
    );
  };

  return (
    <div className="flex flex-col flex-1 w-full bg-gray-100">
      {/* Back link */}
      <div className="w-full pt-4 px-4 md:pt-6 md:px-5 flex-shrink-0">
        <button
          onClick={() => navigate('/browse')}
          className="flex items-center gap-1.5 text-gray-600 text-xs md:text-sm hover:text-gray-900 mb-4 md:mb-6"
        >
          <ChevronLeft size={16} className="md:w-[18px] md:h-[18px]" />
          Back to browse
        </button>
      </div>

      {/* Page header */}
      <div className="w-full px-4 md:px-5 mb-4 md:mb-6 flex-shrink-0">
        <h1 className="text-xl md:text-3xl font-bold text-gray-900 mb-0.5 md:mb-1">
          Sell your car
        </h1>
        <p className="text-gray-600 text-xs md:text-sm">
          List your vehicle in a few minutes. Fields marked{' '}
          <span className="text-red-500">*</span> are required.
        </p>
      </div>

      {/* Error toast */}
      {error && (
        <div className="fixed left-1/2 bottom-24 -translate-x-1/2 bg-gray-900 text-white px-5 py-3 rounded text-sm shadow-lg z-50">
          {error}
        </div>
      )}

      {/* Success toast */}
      {success && (
        <div className="fixed left-1/2 bottom-24 -translate-x-1/2 bg-gray-900 text-white px-5 py-3 rounded text-sm shadow-lg z-50 flex items-center gap-2">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          Listing published
        </div>
      )}

      {/* Form - Scrollable content area with padding for footer */}
      <form onSubmit={handleSubmit} className="w-full flex-1 px-4 md:px-5 overflow-y-auto pb-14">
        {/* Car details */}
        <section className="w-full bg-white border border-gray-200 rounded-lg shadow-sm p-4 md:p-6 mb-3 md:mb-5">
          <h2 className="text-sm md:text-base font-semibold text-gray-900 mb-0.5 md:mb-1">Car details</h2>
          <p className="text-xs md:text-sm text-gray-600 mb-3 md:mb-5">Tell buyers what you're selling.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4.5">
            <div className="flex flex-col gap-1 md:gap-1.5">
              <label htmlFor="make" className="text-xs md:text-sm font-medium text-gray-900">
                Make <span className="text-red-500">*</span>
              </label>
              <select
                id="make"
                value={formData.make || ''}
                onChange={(e) => handleFormChange('make', e.target.value)}
                className="h-10 md:h-11 px-2.5 md:px-3 text-xs md:text-sm border border-gray-300 rounded focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20"
              >
                <option value="">Select make</option>
                {CAR_MAKES.map((make) => (
                  <option key={make} value={make}>
                    {make}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1 md:gap-1.5">
              <label htmlFor="model" className="text-xs md:text-sm font-medium text-gray-900">
                Model <span className="text-red-500">*</span>
              </label>
              <input
                id="model"
                type="text"
                value={formData.model || ''}
                onChange={(e) => handleFormChange('model', e.target.value)}
                placeholder="e.g. Corolla Altis"
                className="h-10 md:h-11 px-2.5 md:px-3 text-xs md:text-sm border border-gray-300 rounded focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20"
              />
            </div>

            <div className="flex flex-col gap-1 md:gap-1.5">
              <label htmlFor="year" className="text-xs md:text-sm font-medium text-gray-900">
                Year <span className="text-red-500">*</span>
              </label>
              <select
                id="year"
                value={formData.year || ''}
                onChange={(e) => handleFormChange('year', parseInt(e.target.value) || 0)}
                className="h-10 md:h-11 px-2.5 md:px-3 text-xs md:text-sm border border-gray-300 rounded focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20"
              >
                <option value="">Select year</option>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1 md:gap-1.5">
              <label htmlFor="mileage" className="text-xs md:text-sm font-medium text-gray-900">
                Mileage (km) <span className="text-red-500">*</span>
              </label>
              <input
                id="mileage"
                type="number"
                value={formData.mileage || ''}
                onChange={(e) => handleFormChange('mileage', parseInt(e.target.value) || 0)}
                placeholder="e.g. 41000"
                className="h-10 md:h-11 px-2.5 md:px-3 text-xs md:text-sm border border-gray-300 rounded focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20"
              />
            </div>

            <div className="md:col-span-2 flex flex-col gap-1 md:gap-1.5">
              <label htmlFor="stock" className="text-xs md:text-sm font-medium text-gray-900">
                Stock number
              </label>
              <input
                id="stock"
                type="text"
                value={formData.stock || ''}
                onChange={(e) => handleFormChange('stock', e.target.value)}
                placeholder="Optional — for your own tracking"
                className="h-10 md:h-11 px-2.5 md:px-3 text-xs md:text-sm border border-gray-300 rounded focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20"
              />
            </div>
          </div>
        </section>

        {/* Specifications */}
        <section className="w-full bg-white border border-gray-200 rounded-lg shadow-sm p-4 md:p-6 mb-3 md:mb-5">
          <h2 className="text-sm md:text-base font-semibold text-gray-900 mb-0.5 md:mb-1">Specifications</h2>
          <p className="text-xs md:text-sm text-gray-600 mb-3 md:mb-5">Help buyers filter and compare.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4.5">
            <div className="md:col-span-2 flex flex-col gap-1.5 md:gap-2">
              <label className="text-xs md:text-sm font-medium text-gray-900">
                Transmission <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-2 flex-wrap">
                {['Automatic', 'Manual'].map((option) => (
                  <label key={option} className="relative">
                    <input
                      type="radio"
                      name="transmission"
                      value={option}
                      checked={formData.transmission === option}
                      onChange={(e) => handleFormChange('transmission', e.target.value)}
                      className="sr-only"
                    />
                    <span
                      className={`inline-flex items-center justify-center px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm border rounded cursor-pointer transition-all ${
                        formData.transmission === option
                          ? 'border-red-500 bg-red-50 text-red-700 font-medium'
                          : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                      }`}
                    >
                      {option}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="md:col-span-2 flex flex-col gap-1.5 md:gap-2">
              <label className="text-xs md:text-sm font-medium text-gray-900">
                Fuel type <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-2 flex-wrap">
                {['Petrol', 'Diesel', 'Hybrid', 'Electric', 'CNG'].map((option) => (
                  <label key={option} className="relative">
                    <input
                      type="radio"
                      name="fuel"
                      value={option}
                      checked={formData.fuelType === option}
                      onChange={(e) => handleFormChange('fuelType', e.target.value)}
                      className="sr-only"
                    />
                    <span
                      className={`inline-flex items-center justify-center px-4 py-2 text-sm border rounded cursor-pointer transition-all ${
                        formData.fuelType === option
                          ? 'border-red-500 bg-red-50 text-red-700 font-medium'
                          : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                      }`}
                    >
                      {option}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-1 md:gap-1.5">
              <label htmlFor="color" className="text-xs md:text-sm font-medium text-gray-900">
                Colour
              </label>
              <input
                id="color"
                type="text"
                value={formData.color || ''}
                onChange={(e) => handleFormChange('color', e.target.value)}
                placeholder="e.g. Pearl White"
                className="h-10 md:h-11 px-2.5 md:px-3 text-xs md:text-sm border border-gray-300 rounded focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20"
              />
            </div>

            <div className="flex flex-col gap-1 md:gap-1.5">
              <label htmlFor="condition" className="text-xs md:text-sm font-medium text-gray-900">
                Condition <span className="text-red-500">*</span>
              </label>
              <select
                id="condition"
                value={formData.condition || ''}
                onChange={(e) => handleFormChange('condition', e.target.value)}
                className="h-10 md:h-11 px-2.5 md:px-3 text-xs md:text-sm border border-gray-300 rounded focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20"
              >
                <option value="">Select</option>
                <option>Used — excellent</option>
                <option>Used — good</option>
                <option>Used — fair</option>
                <option>New</option>
              </select>
            </div>

            <div className="md:col-span-2 flex flex-col gap-1 md:gap-1.5">
              <label htmlFor="desc" className="text-xs md:text-sm font-medium text-gray-900">
                Description
              </label>
              <textarea
                id="desc"
                value={formData.description || ''}
                onChange={(e) => handleFormChange('description', e.target.value)}
                placeholder="Service history, accident-free, recent work done, reason for selling…"
                className="px-2.5 md:px-3 py-2 text-xs md:text-sm border border-gray-300 rounded focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20 resize-none min-h-20 md:min-h-24"
              />
            </div>
          </div>
        </section>

        {/* Pricing & availability */}
        <section className="w-full bg-white border border-gray-200 rounded-lg shadow-sm p-4 md:p-6 mb-3 md:mb-5">
          <h2 className="text-sm md:text-base font-semibold text-gray-900 mb-0.5 md:mb-1">Pricing &amp; availability</h2>
          <p className="text-xs md:text-sm text-gray-600 mb-3 md:mb-5">Set your asking price.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4.5">
            <div className="flex flex-col gap-1 md:gap-1.5">
              <label htmlFor="price" className="text-xs md:text-sm font-medium text-gray-900">
                Price <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 text-xs md:text-sm font-medium pointer-events-none">
                  Rs
                </span>
                <input
                  id="price"
                  type="number"
                  value={formData.price || ''}
                  onChange={(e) => handleFormChange('price', parseInt(e.target.value) || 0)}
                  placeholder="1,150,000"
                  className="h-10 md:h-11 pl-8 pr-2.5 md:pr-3 text-xs md:text-sm border border-gray-300 rounded w-full focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1 md:gap-1.5">
              <label htmlFor="status" className="text-xs md:text-sm font-medium text-gray-900">
                Availability <span className="text-red-500">*</span>
              </label>
              <select
                id="status"
                value={formData.availability || ''}
                onChange={(e) => handleFormChange('availability', e.target.value)}
                className="h-10 md:h-11 px-2.5 md:px-3 text-xs md:text-sm border border-gray-300 rounded focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20"
              >
                <option>Available</option>
                <option>Reserved</option>
                <option>Sold</option>
              </select>
            </div>

            <div className="md:col-span-2 flex items-center gap-2">
              <input
                type="checkbox"
                id="negotiable"
                checked={formData.negotiable || false}
                onChange={(e) => handleFormChange('negotiable', e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 cursor-pointer accent-red-500"
              />
              <label htmlFor="negotiable" className="text-xs md:text-sm text-gray-600 cursor-pointer">
                Price is negotiable
              </label>
            </div>
          </div>
        </section>

        {/* Photos */}
        <section className="w-full bg-white border border-gray-200 rounded-lg shadow-sm p-4 md:p-6 mb-3 md:mb-5">
          <h2 className="text-sm md:text-base font-semibold text-gray-900 mb-0.5 md:mb-1">Photos</h2>
          <p className="text-xs md:text-sm text-gray-600 mb-3 md:mb-5">Add up to 12 photos. The first one becomes the cover.</p>

          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={handleUploadClick}
            className={`border-2 border-dashed rounded-lg p-4 md:p-8 text-center cursor-pointer transition-all ${
              dragActive
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-300 bg-white hover:border-gray-400'
            }`}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleUploadClick();
              }
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="mx-auto text-gray-400 mb-1.5 md:mb-2 md:w-[30px] md:h-[30px]"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            <div className="text-xs md:text-sm font-medium text-gray-900">
              <strong className="text-blue-600">Click to upload</strong> or drag photos here
            </div>
            <small className="block mt-1 md:mt-1.5 text-xs text-gray-500">JPG or PNG, up to 5 MB each</small>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            className="hidden"
          />

          {uploadError && (
            <div className="mt-2 md:mt-3 p-2 md:p-3 bg-red-50 border border-red-200 rounded text-red-700 text-xs md:text-sm">
              {uploadError}
            </div>
          )}

          {photos.length > 0 && (
            <div className="mt-3 md:mt-4">
              <p className="text-xs font-medium text-gray-900 mb-2 md:mb-3">
                {photos.length} photo{photos.length !== 1 ? 's' : ''} selected
              </p>
              <div className="grid grid-cols-3 md:grid-cols-4 gap-2.5">
                {photos.map((photo, index) => (
                  <div key={`${photo.file.name}-${index}`} className="relative aspect-square rounded overflow-hidden bg-gray-100 border border-gray-200 group">
                    <img
                      src={photo.preview}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    {index === 0 && (
                      <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-xs px-2 py-1 text-center">
                        Cover
                      </div>
                    )}
                    <button
                      type="button"
                      onClick={() => dispatch(removePhoto(index))}
                      className="absolute top-1 right-1 w-5.5 h-5.5 rounded-full bg-black/70 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition hover:bg-black/90"
                      aria-label="Remove photo"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Contact details */}
        <section className="w-full bg-white border border-gray-200 rounded-lg shadow-sm p-4 md:p-6 mb-3 md:mb-5">
          <h2 className="text-sm md:text-base font-semibold text-gray-900 mb-0.5 md:mb-1">Contact details</h2>
          <p className="text-xs md:text-sm text-gray-600 mb-3 md:mb-5">How buyers reach you about this car.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4.5">
            <div className="flex flex-col gap-1 md:gap-1.5">
              <label htmlFor="cname" className="text-xs md:text-sm font-medium text-gray-900">
                Contact name <span className="text-red-500">*</span>
              </label>
              <input
                id="cname"
                type="text"
                value={formData.sellerName || ''}
                onChange={(e) => handleFormChange('sellerName', e.target.value)}
                placeholder="Your name"
                className="h-10 md:h-11 px-2.5 md:px-3 text-xs md:text-sm border border-gray-300 rounded focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20"
              />
            </div>

            <div className="flex flex-col gap-1 md:gap-1.5">
              <label htmlFor="phone" className="text-xs md:text-sm font-medium text-gray-900">
                Phone / WhatsApp <span className="text-red-500">*</span>
              </label>
              <input
                id="phone"
                type="tel"
                value={formData.sellerPhone || ''}
                onChange={(e) => handleFormChange('sellerPhone', e.target.value)}
                placeholder="0334 7815664"
                className="h-10 md:h-11 px-2.5 md:px-3 text-xs md:text-sm border border-gray-300 rounded focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20"
              />
            </div>
          </div>
        </section>
      </form>

      {/* Actions - Fixed at bottom of viewport.
          On mobile the sidebar is a fixed 64px rail on the left, so we
          start the action bar at left-16 (64px) to avoid overlap. On md+
          the sidebar is in-flow, so we can span the full width. */}
      <div className="fixed bottom-0 left-16 right-0 md:left-0 border-t border-gray-200 flex flex-col md:flex-row md:items-center md:justify-between gap-1 md:gap-2 bg-white px-4 md:px-5 py-1 md:py-1.5 z-30">
        <p className="text-xs text-gray-600 hidden md:block">You can edit this listing anytime after publishing.</p>
        <div className="flex gap-2 md:gap-2 w-full md:w-auto">
          <button
            type="button"
            onClick={() => navigate('/browse')}
            className="flex-1 md:flex-none px-2 md:px-5 py-1 md:py-1 text-xs md:text-sm font-semibold border border-gray-300 rounded text-gray-700 hover:bg-gray-50 transition"
          >
            Save draft
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!isValid || loading}
            className={`flex-1 md:flex-none px-2 md:px-5 py-1 md:py-1 text-xs md:text-sm font-semibold rounded flex items-center justify-center md:justify-start gap-1 md:gap-2 transition ${
              isValid && !loading
                ? 'bg-green-600 hover:bg-green-700 text-white'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="md:w-[18px] md:h-[18px]">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span className="hidden md:inline">{loading ? 'Publishing...' : 'Publish listing'}</span>
            <span className="md:hidden">{loading ? 'Publishing...' : 'Publish'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
