import { CheckCircle, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import type { Car } from '../types';

interface SuccessConfirmationProps {
  listing: Car;
  onViewListing: () => void;
  onListAnother: () => void;
}

export const SuccessConfirmation = ({
  listing,
  onViewListing,
  onListAnother,
}: SuccessConfirmationProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopyId = () => {
    navigator.clipboard.writeText(listing.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const postedDate = new Date(listing.createdAt).toLocaleDateString('en-PK', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="max-w-md mx-auto py-12 px-4">
      <div className="text-center space-y-6">
        {/* Success icon */}
        <div className="flex justify-center">
          <div className="relative">
            <CheckCircle size={64} className="text-green-600" />
            <div className="absolute inset-0 animate-ping rounded-full border-2 border-green-400 opacity-25" />
          </div>
        </div>

        {/* Success message */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Listing Posted!</h2>
          <p className="text-gray-600">
            Your car has been successfully listed and is now visible to buyers.
          </p>
        </div>

        {/* Listing ID */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <p className="text-xs text-gray-600 mb-2">Listing ID</p>
          <div className="flex items-center gap-2 bg-white border border-gray-300 rounded p-3">
            <code className="flex-1 font-mono text-sm font-semibold text-gray-900">
              {listing.id}
            </code>
            <button
              onClick={handleCopyId}
              className="text-gray-600 hover:text-gray-900 transition"
              title="Copy listing ID"
            >
              {copied ? <Check size={18} className="text-green-600" /> : <Copy size={18} />}
            </button>
          </div>
        </div>

        {/* Listing summary */}
        <div className="space-y-3 bg-blue-50 border border-blue-200 rounded-lg p-4 text-left">
          <h3 className="font-semibold text-gray-900">Your Listing</h3>

          {listing.images && listing.images.length > 0 && (
            <img
              src={listing.images[0].url}
              alt={`${listing.make} ${listing.model}`}
              className="w-full h-40 object-cover rounded"
            />
          )}

          <div className="space-y-2 text-sm">
            <p>
              <span className="text-gray-600">Car:</span>{' '}
              <span className="font-semibold">
                {listing.year} {listing.make} {listing.model}
              </span>
            </p>
            <p>
              <span className="text-gray-600">Price:</span>{' '}
              <span className="font-semibold text-red-600">
                ₨{new Intl.NumberFormat('en-PK').format(listing.price)}
              </span>
            </p>
            <p>
              <span className="text-gray-600">Posted:</span>{' '}
              <span className="font-semibold">{postedDate}</span>
            </p>
            {listing.customerName && (
              <p>
                <span className="text-gray-600">Listed by:</span>{' '}
                <span className="font-semibold">{listing.customerName}</span>
              </p>
            )}
          </div>
        </div>

        {/* Action buttons */}
        <div className="space-y-3 pt-6">
          <button
            onClick={onViewListing}
            className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition"
          >
            View Your Listing
          </button>
          <button
            onClick={onListAnother}
            className="w-full px-6 py-3 border border-gray-300 bg-white hover:bg-gray-50 text-gray-900 font-semibold rounded-lg transition"
          >
            List Another Car
          </button>
        </div>

        {/* Tips */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-left">
          <p className="text-xs font-semibold text-amber-900 mb-2">💡 Quick Tips</p>
          <ul className="text-xs text-amber-800 space-y-1">
            <li>• Keep your phone available for buyer inquiries</li>
            <li>• Provide accurate details for faster responses</li>
            <li>• Share your listing ID with friends for referrals</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
