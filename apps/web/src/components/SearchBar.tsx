import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../store/store'
import { setSearchQuery } from '../store/filterSlice'
import { Input } from './common'

export function SearchBar() {
  const dispatch = useDispatch()
  const searchQuery = useSelector((state: RootState) => state.filters.searchQuery)
  const [localValue, setLocalValue] = useState(searchQuery)

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(setSearchQuery(localValue))
    }, 500)

    return () => clearTimeout(timer)
  }, [localValue, dispatch])

  return (
    <Input
      type="text"
      placeholder="Search by make or model..."
      value={localValue}
      onChange={(e) => setLocalValue(e.target.value)}
      className="w-full"
    />
  )
}
