import { useState } from 'react';
import { Upload, X, GripVertical } from 'lucide-react';
import type { PhotoPreview } from '../store/sellCarSlice';

interface Step3PhotosProps {
  photos: PhotoPreview[];
  onPhotosAdd: (files: File[]) => void;
  onPhotoRemove: (index: number) => void;
  onPhotoReorder: (fromIndex: number, toIndex: number) => void;
  onBack: () => void;
  onNext: () => void;
}

const MAX_PHOTOS = 8;
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export const Step3Photos = ({
  photos,
  onPhotosAdd,
  onPhotoRemove,
  onPhotoReorder,
  onBack,
  onNext,
}: Step3PhotosProps) => {
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const validateFiles = (files: File[]): boolean => {
    for (const file of files) {
      if (!file.type.startsWith('image/')) {
        setError('Only image files (JPG, PNG) are allowed');
        return false;
      }
      if (file.size > MAX_FILE_SIZE) {
        setError(`File "${file.name}" is too large (max 5MB)`);
        return false;
      }
    }

    if (photos.length + files.length > MAX_PHOTOS) {
      setError(`Maximum ${MAX_PHOTOS} photos allowed`);
      return false;
    }

    setError(null);
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
      onPhotosAdd(files);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (validateFiles(files)) {
      onPhotosAdd(files);
      e.target.value = '';
    }
  };

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex !== null && draggedIndex !== index) {
      onPhotoReorder(draggedIndex, index);
      setDraggedIndex(index);
    }
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  return (
    <div className="space-y-3 py-2">
      {/* Title & Description */}
      <div className="mb-3">
        <h2 className="text-sm font-bold text-gray-900 mb-1">Upload Photos</h2>
        <p className="text-gray-600 text-xs">Add up to 8 photos of your car (JPG/PNG, max 5MB each).</p>
      </div>

      {/* Upload zone */}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded p-4 text-center transition ${
          dragActive
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-300 bg-gray-50 hover:border-gray-400'
        }`}
      >
        <Upload size={28} className="mx-auto text-gray-400 mb-2" />
        <p className="text-sm font-semibold text-gray-900 mb-1">
          Drag or click to upload
        </p>
        <p className="text-xs text-gray-600 mb-2">
          {photos.length}/{MAX_PHOTOS} photos
        </p>
        <label>
          <span className="inline-block px-4 py-1.5 text-xs bg-blue-600 text-white rounded font-semibold hover:bg-blue-700 transition cursor-pointer">
            Choose Photos
          </span>
          <input
            type="file"
            multiple
            accept="image/jpeg,image/png"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
      </div>

      {/* Error message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded p-2">
          <p className="text-red-700 text-xs">{error}</p>
        </div>
      )}

      {/* Photo grid */}
      {photos.length > 0 && (
        <div className="space-y-1">
          <p className="text-xs font-semibold text-gray-900">Drag to reorder</p>
          <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
            {photos.map((photo, index) => (
              <div
                key={`${photo.file.name}-${index}`}
                draggable
                onDragStart={() => handleDragStart(index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDragEnd={handleDragEnd}
                className={`relative group rounded-lg overflow-hidden bg-gray-100 aspect-square cursor-move transition ${
                  draggedIndex === index ? 'opacity-50' : ''
                }`}
              >
                <img
                  src={photo.preview}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-full object-cover"
                />

                {/* Drag handle */}
                <div className="absolute top-1 left-1 bg-black/50 rounded p-1 text-white opacity-0 group-hover:opacity-100 transition">
                  <GripVertical size={16} />
                </div>

                {/* Delete button */}
                <button
                  type="button"
                  onClick={() => onPhotoRemove(index)}
                  className="absolute top-1 right-1 bg-red-600 rounded-full p-1 text-white opacity-0 group-hover:opacity-100 transition hover:bg-red-700"
                >
                  <X size={16} />
                </button>

                {/* Index indicator */}
                <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                  {index + 1}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

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
          disabled={photos.length === 0}
          className={`flex-1 px-3 py-1.5 text-xs rounded font-semibold transition ${
            photos.length > 0
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
