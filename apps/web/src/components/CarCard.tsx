import type { Car } from '../types'

interface CarCardProps {
  car: Car
  onClick?: (carId: string) => void
}

export function CarCard({ car, onClick }: CarCardProps) {
  const backendUrl = 'http://localhost:3000'
  const imageUrl = car.images[0]?.url
    ? `${backendUrl}${car.images[0].url}`
    : 'https://images.unsplash.com/photo-1464207687429-7505649dae38?w=400&h=300&fit=crop'

  const specs = car.specifications ? JSON.parse(car.specifications) : {}

  return (
    <div
      onClick={() => onClick?.(car.id)}
      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer"
    >
      {/* Image */}
      <div className="aspect-square overflow-hidden bg-neutral">
        <img
          src={imageUrl}
          alt={`${car.make} ${car.model}`}
          className="w-full h-full object-cover hover:scale-105 transition-transform"
          loading="lazy"
        />
      </div>

      {/* Content */}
      <div className="p-3 md:p-4">
        {/* Title */}
        <h3 className="text-body font-semibold text-primary truncate">
          {car.make} {car.model}
        </h3>

        {/* Specs */}
        <div className="mt-2 text-small text-gray-600 flex flex-wrap gap-2">
          <span>{car.year}</span>
          {specs.mileage && <span>•</span>}
          {specs.mileage && <span>{Number(specs.mileage).toLocaleString()} km</span>}
          {specs.transmission && <span>•</span>}
          {specs.transmission && <span>{specs.transmission}</span>}
          {specs.fuelType && <span>•</span>}
          {specs.fuelType && <span>{specs.fuelType}</span>}
        </div>

        {/* Price */}
        <div className="mt-3 pt-3 border-t border-neutral">
          <p className="text-h2 font-bold text-accent">
            {new Intl.NumberFormat('en-PK', {
              style: 'currency',
              currency: 'PKR',
              minimumFractionDigits: 0,
            }).format(car.price)}
          </p>
        </div>

        {/* Status */}
        <div className="mt-2">
          <span className={`inline-block px-2 py-1 rounded text-small font-medium ${
            car.status === 'AVAILABLE' ? 'bg-green-100 text-green-700' :
            car.status === 'SOLD' ? 'bg-red-100 text-red-700' :
            'bg-yellow-100 text-yellow-700'
          }`}>
            {car.status}
          </span>
        </div>
      </div>
    </div>
  )
}
