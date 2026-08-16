import { useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../store/store'
import { fetchCars } from '../store/carsSlice'
import { CarCard } from '../components/CarCard'
import { SkeletonCard } from '../components/common'
import { Button } from '../components/common'

export function Browse() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { list: cars, loading, error } = useSelector((state: RootState) => state.cars)
  const filters = useSelector((state: RootState) => state.filters)

  useEffect(() => {
    dispatch(fetchCars(filters) as any)
  }, [filters, dispatch])

  const handleCarClick = useCallback((carId: string) => {
    navigate(`/car/${carId}`)
  }, [navigate])

  const filteredCars = cars.filter((car) => {
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase()
      return (
        car.make.toLowerCase().includes(query) || car.model.toLowerCase().includes(query)
      )
    }
    return true
  })

  return (
    <div className="flex-1 overflow-auto bg-neutral">
      {/* Page Section */}
      <div className="p-6">
        {/* Title and CTA */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-h2 font-bold text-primary mb-1">Browse cars</h1>
            <p className="text-small text-muted">{filteredCars.length} vehicles ready to view</p>
          </div>
          <Button
            onClick={() => navigate('/sell')}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
          >
            + Sell your car
          </Button>
        </div>

        {/* Sort Controls (minimal) */}
        <div className="mb-6 flex items-center gap-3">
          <select className="px-3 py-2 border border-line rounded-lg text-sm text-primary">
            <option>Newest first</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
          </select>
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredCars.length === 0 && (
          <div className="text-center py-12">
            <p className="text-body text-muted">No cars found. Try adjusting your search.</p>
          </div>
        )}

        {/* Car Grid */}
        {filteredCars.length > 0 && (
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredCars.map((car) => (
              <CarCard key={car.id} car={car} onClick={handleCarClick} />
            ))}
          </div>
        )}

        {/* Loading Skeletons */}
        {loading && (
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
