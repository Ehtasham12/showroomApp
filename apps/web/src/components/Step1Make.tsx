import { useState, useMemo } from 'react';
import { ChevronDown } from 'lucide-react';

const CAR_MAKES = [
  'Honda',
  'Toyota',
  'BMW',
  'Mercedes-Benz',
  'Audi',
  'Volkswagen',
  'Nissan',
  'Hyundai',
  'Kia',
  'Ford',
  'Chevrolet',
  'Mazda',
  'Suzuki',
  'Renault',
  'Datsun',
  'Mitsubishi',
  'Peugeot',
  'Skoda',
  'MG',
  'Changan',
  'Haval',
  'JAC',
];

interface Step1MakeProps {
  selectedMake: string;
  onMakeSelect: (make: string) => void;
  onNext: () => void;
}

export const Step1Make = ({ selectedMake, onMakeSelect, onNext }: Step1MakeProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const filteredMakes = useMemo(() => {
    if (!searchTerm) return CAR_MAKES;
    return CAR_MAKES.filter((make) =>
      make.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const handleMakeSelect = (make: string) => {
    onMakeSelect(make);
    setSearchTerm('');
    setIsDropdownOpen(false);
  };

  return (
    <div className="space-y-3 py-2">
      {/* Title & Description */}
      <div className="mb-3">
        <h2 className="text-sm font-bold text-gray-900 mb-1">Select Car Make</h2>
        <p className="text-gray-600 text-xs">Choose the manufacturer of your car.</p>
      </div>

      {/* Make Selection */}
      <div>
        <label htmlFor="make" className="block text-xs font-semibold mb-2">
          Car Make <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <div className="relative">
            <input
              id="make"
              type="text"
              value={isDropdownOpen ? searchTerm : selectedMake}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setIsDropdownOpen(true);
              }}
              onFocus={() => setIsDropdownOpen(true)}
              placeholder="Search..."
              className="w-full px-2 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 pr-8"
            />
            <ChevronDown
              size={16}
              className="absolute right-2 top-2.5 text-gray-400 pointer-events-none"
            />
          </div>

          {/* Dropdown */}
          {isDropdownOpen && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded shadow-lg z-10 max-h-48 overflow-y-auto">
              {filteredMakes.length > 0 ? (
                <ul>
                  {filteredMakes.map((make) => (
                    <li key={make}>
                      <button
                        type="button"
                        onClick={() => handleMakeSelect(make)}
                        className={`w-full text-left px-2 py-1.5 text-xs hover:bg-blue-50 transition ${
                          selectedMake === make ? 'bg-blue-100 font-semibold' : ''
                        }`}
                      >
                        {make}
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="px-2 py-1.5 text-gray-500 text-xs">No matches</div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Close dropdown when clicking outside */}
      {isDropdownOpen && (
        <div
          className="fixed inset-0 z-0"
          onClick={() => setIsDropdownOpen(false)}
        />
      )}

      {/* Navigation buttons */}
      <div className="sticky bottom-0 left-0 right-0 flex gap-2 pt-2 pb-1 bg-white border-t border-gray-200 -mx-5 -mb-5 px-5 py-2">
        <button
          disabled
          className="flex-1 px-3 py-1.5 text-xs border border-gray-300 rounded font-semibold text-gray-400 cursor-not-allowed"
        >
          Back
        </button>
        <button
          onClick={onNext}
          disabled={!selectedMake}
          className={`flex-1 px-3 py-1.5 text-xs rounded font-semibold transition ${
            selectedMake
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
