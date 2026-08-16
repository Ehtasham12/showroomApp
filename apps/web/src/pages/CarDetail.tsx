import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { ArrowLeft, AlertCircle } from 'lucide-react'
import type { RootState, AppDispatch } from '../store/store'
import { fetchCarDetail, clearCarDetail } from '../store/carDetailSlice'
import { PhotoCarousel } from '../components/PhotoCarousel'
import { Button } from '../components/common'
import { InquiryModal } from '../components/InquiryModal'

export const CarDetail = () => {
  const { carId } = useParams<{ carId: string }>()
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const [showInquiryModal, setShowInquiryModal] = useState(false)

  const { data: car, loading, error } = useSelector((state: RootState) => state.carDetail)

  useEffect(() => {
    if (carId) {
      dispatch(fetchCarDetail(carId))
    }

    return () => {
      dispatch(clearCarDetail())
    }
  }, [carId, dispatch])

  const handleBack = () => {
    navigate(-1)
  }

  if (loading) {
    return (
      <main className="app-content p-4 md:p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Loading skeleton */}
          <div className="bg-gray-200 h-12 rounded w-1/3 animate-pulse" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-gray-200 aspect-video rounded animate-pulse" />
            <div className="space-y-4">
              <div className="bg-gray-200 h-20 rounded animate-pulse" />
              <div className="bg-gray-200 h-40 rounded animate-pulse" />
            </div>
          </div>
        </div>
      </main>
    )
  }

  if (error || !car) {
    return (
      <main className="app-content p-4 md:p-6">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-blue-500 hover:text-blue-700 mb-6"
          >
            <ArrowLeft size={20} />
            Back
          </button>
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 flex gap-4">
            <AlertCircle className="text-red-600 flex-shrink-0" size={24} />
            <div>
              <h3 className="text-red-800 font-semibold mb-2">Unable to Load Car Details</h3>
              <p className="text-red-700">{error || 'Car not found'}</p>
            </div>
          </div>
        </div>
      </main>
    )
  }

  const specs = car.specifications ? JSON.parse(car.specifications) : {}

  return (
    <main className="app-content p-4 md:p-6 pb-20 md:pb-6">
      <div className="max-w-4xl mx-auto">
        {/* Back button */}
        <button
          onClick={handleBack}
          className="flex items-center gap-2 text-blue-500 hover:text-blue-700 mb-6"
        >
          <ArrowLeft size={20} />
          Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Carousel and images */}
          <div className="lg:col-span-2">
            <div className="max-w-2xl">
              <PhotoCarousel images={car.images} alt={`${car.make} ${car.model}`} />
            </div>
          </div>

          {/* Right: Details panel */}
          <div className="space-y-6">
            {/* Title and price */}
            <div>
              <div className="flex items-baseline gap-2 mb-2">
                <h1 className="text-2xl md:text-3xl font-bold">
                  {car.year} {car.make} {car.model}
                </h1>
                {car.status !== 'AVAILABLE' && (
                  <span className="text-xs font-semibold px-2 py-1 rounded-full bg-gray-200 text-gray-700">
                    {car.status}
                  </span>
                )}
              </div>
              <p className="text-3xl font-bold text-red-600">
                {new Intl.NumberFormat('en-PK', {
                  style: 'currency',
                  currency: 'PKR',
                  minimumFractionDigits: 0,
                }).format(car.price)}
              </p>
            </div>

            {/* Key specs */}
            <div className="space-y-3">
              {specs.mileage && (
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Mileage</span>
                  <span className="font-semibold">
                    {new Intl.NumberFormat('en-US').format(specs.mileage)} km
                  </span>
                </div>
              )}
              {specs.transmission && (
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Transmission</span>
                  <span className="font-semibold">{specs.transmission}</span>
                </div>
              )}
              {specs.fuelType && (
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Fuel Type</span>
                  <span className="font-semibold">{specs.fuelType}</span>
                </div>
              )}
              {specs.color && (
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Color</span>
                  <span className="font-semibold">{specs.color}</span>
                </div>
              )}
              {specs.condition && (
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Condition</span>
                  <span className="font-semibold">{specs.condition}</span>
                </div>
              )}
            </div>

            {/* Features */}
            {specs.features && specs.features.length > 0 && (
              <div>
                <h3 className="font-semibold mb-2">Features</h3>
                <ul className="space-y-1 text-sm">
                  {specs.features.map((feature: string, index: number) => (
                    <li key={index} className="text-gray-700">
                      • {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Contact button - sticky on mobile */}
            <Button
              onClick={() => setShowInquiryModal(true)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg sticky bottom-4 md:relative md:bottom-auto"
            >
              Contact Showroom
            </Button>
          </div>
        </div>

        {/* Description section - full width below */}
        {specs.description && (
          <div className="mt-8 p-6 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold mb-3">Description</h3>
            <p className="text-gray-700 leading-relaxed">{specs.description}</p>
          </div>
        )}

        {/* Seller info section - for reference (can be hidden in customer view) */}
        {car.customerName && car.customerPhone && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-gray-600">
              Listed by <span className="font-semibold">{car.customerName}</span>
            </p>
          </div>
        )}
      </div>

      {/* Inquiry Modal */}
      <InquiryModal
        isOpen={showInquiryModal}
        onClose={() => setShowInquiryModal(false)}
        carId={car.id}
        carTitle={`${car.year} ${car.make} ${car.model}`}
        onSuccess={() => {
          setShowInquiryModal(false)
        }}
      />
    </main>
  )
}
