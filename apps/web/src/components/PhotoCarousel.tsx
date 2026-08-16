import { useState, useMemo } from 'react'
import type { CarImage } from '../types'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface PhotoCarouselProps {
  images: CarImage[]
  alt: string
}

export const PhotoCarousel = ({ images, alt }: PhotoCarouselProps) => {
  const [activeIndex, setActiveIndex] = useState(0)

  const sortedImages = useMemo(
    () => [...images].sort((a, b) => a.order - b.order),
    [images]
  )

  const goToPrevious = () => {
    setActiveIndex((prev) => (prev === 0 ? sortedImages.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setActiveIndex((prev) => (prev === sortedImages.length - 1 ? 0 : prev + 1))
  }

  const goToImage = (index: number) => {
    setActiveIndex(index)
  }

  if (sortedImages.length === 0) {
    return (
      <div className="w-full bg-gray-200 h-64 md:h-96 flex items-center justify-center rounded-lg">
        <span className="text-gray-500">No images available</span>
      </div>
    )
  }

  const currentImage = sortedImages[activeIndex]
  const backendUrl = 'http://localhost:3000'
  const imageUrl = currentImage.url.startsWith('http') ? currentImage.url : `${backendUrl}${currentImage.url}`

  return (
    <div className="space-y-3">
      {/* Main image display */}
      <div className="relative w-full bg-gray-100 rounded-lg overflow-hidden h-64 md:h-96">
        <img
          src={imageUrl}
          alt={`${alt} - Image ${activeIndex + 1}`}
          className="w-full h-full object-cover"
          loading="lazy"
        />

        {/* Navigation arrows - only show if more than 1 image */}
        {sortedImages.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
              aria-label="Next image"
            >
              <ChevronRight size={24} />
            </button>
          </>
        )}

        {/* Image counter - only show if multiple images */}
        {sortedImages.length > 1 && (
          <div className="absolute bottom-3 right-3 bg-black/70 text-white px-2 py-1 rounded text-xs font-medium">
            {activeIndex + 1} / {sortedImages.length}
          </div>
        )}
      </div>

      {/* Thumbnail strip - only show if more than 1 image */}
      {sortedImages.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {sortedImages.map((image, index) => (
            <button
              key={image.id}
              onClick={() => goToImage(index)}
              className={`flex-shrink-0 w-14 h-14 md:w-16 md:h-16 rounded overflow-hidden transition-all ${
                index === activeIndex
                  ? 'ring-2 ring-blue-500'
                  : 'ring-1 ring-gray-300 hover:ring-gray-400'
              }`}
              aria-label={`Go to image ${index + 1}`}
            >
              <img
                src={image.url.startsWith('http') ? image.url : `${backendUrl}${image.url}`}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
