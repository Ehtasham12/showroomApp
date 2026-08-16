import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../store/store'
import {
  setMake,
  setModel,
  setPriceRange,
  setYear,
  setStatus,
  setSortBy,
  resetFilters,
} from '../store/filterSlice'
import { Button, Input, Select } from './common'

interface FilterPanelProps {
  onClose?: () => void
  isOpen?: boolean
}

export function FilterPanel({ onClose, isOpen = true }: FilterPanelProps) {
  const dispatch = useDispatch()
  const filters = useSelector((state: RootState) => state.filters)
  const [tempFilters, setTempFilters] = useState(filters)

  const handleApply = () => {
    dispatch(setMake(tempFilters.make))
    dispatch(setModel(tempFilters.model))
    dispatch(setPriceRange({ min: tempFilters.minPrice, max: tempFilters.maxPrice }))
    dispatch(setYear(tempFilters.year))
    dispatch(setStatus(tempFilters.status))
    dispatch(setSortBy(tempFilters.sortBy))
    onClose?.()
  }

  const handleReset = () => {
    dispatch(resetFilters())
    setTempFilters({
      make: undefined,
      model: undefined,
      minPrice: undefined,
      maxPrice: undefined,
      year: undefined,
      status: 'AVAILABLE',
      searchQuery: '',
      sortBy: 'newest',
    })
  }

  if (!isOpen) return null

  return (
    <div className="bg-white p-4 rounded-lg shadow-md space-y-4 mb-6">
      <h3 className="text-body font-semibold text-primary">Filters</h3>

      <Input
        label="Make"
        placeholder="e.g., Toyota"
        value={tempFilters.make || ''}
        onChange={(e) => setTempFilters({ ...tempFilters, make: e.target.value || undefined })}
      />

      <Input
        label="Model"
        placeholder="e.g., Corolla"
        value={tempFilters.model || ''}
        onChange={(e) => setTempFilters({ ...tempFilters, model: e.target.value || undefined })}
      />

      <div className="grid grid-cols-2 gap-3">
        <Input
          label="Min Price"
          type="number"
          placeholder="Min"
          value={tempFilters.minPrice || ''}
          onChange={(e) =>
            setTempFilters({ ...tempFilters, minPrice: e.target.value ? Number(e.target.value) : undefined })
          }
        />
        <Input
          label="Max Price"
          type="number"
          placeholder="Max"
          value={tempFilters.maxPrice || ''}
          onChange={(e) =>
            setTempFilters({ ...tempFilters, maxPrice: e.target.value ? Number(e.target.value) : undefined })
          }
        />
      </div>

      <Input
        label="Year"
        type="number"
        placeholder="e.g., 2020"
        value={tempFilters.year || ''}
        onChange={(e) =>
          setTempFilters({ ...tempFilters, year: e.target.value ? Number(e.target.value) : undefined })
        }
      />

      <Select
        label="Status"
        value={tempFilters.status || 'AVAILABLE'}
        onChange={(e) => setTempFilters({ ...tempFilters, status: e.target.value })}
        options={[
          { value: 'AVAILABLE', label: 'Available' },
          { value: 'SOLD', label: 'Sold' },
          { value: 'PENDING', label: 'Pending' },
        ]}
      />

      <Select
        label="Sort By"
        value={tempFilters.sortBy}
        onChange={(e) =>
          setTempFilters({
            ...tempFilters,
            sortBy: e.target.value as 'newest' | 'price-asc' | 'price-desc',
          })
        }
        options={[
          { value: 'newest', label: 'Newest First' },
          { value: 'price-asc', label: 'Price: Low to High' },
          { value: 'price-desc', label: 'Price: High to Low' },
        ]}
      />

      <div className="flex gap-2 pt-2">
        <Button onClick={handleApply} variant="primary" className="flex-1">
          Apply Filters
        </Button>
        <Button onClick={handleReset} variant="outline" className="flex-1">
          Reset
        </Button>
        {onClose && (
          <Button onClick={onClose} variant="outline">
            Close
          </Button>
        )}
      </div>
    </div>
  )
}
