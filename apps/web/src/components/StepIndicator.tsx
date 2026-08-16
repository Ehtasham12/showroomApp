interface StepIndicatorProps {
  currentStep: 1 | 2 | 3 | 4;
  stepTitles: string[];
}

export const StepIndicator = ({ currentStep, stepTitles }: StepIndicatorProps) => {
  return (
    <div className="mb-8">
      {/* Progress bar */}
      <div className="flex gap-2 mb-4">
        {[1, 2, 3, 4].map((step) => (
          <div key={step} className="flex-1 flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold mb-2 transition-colors ${
                step <= currentStep
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-600'
              }`}
            >
              {step}
            </div>
            <div
              className={`h-1 flex-1 rounded transition-colors ${
                step < currentStep ? 'bg-blue-600' : 'bg-gray-200'
              }`}
              style={{ width: '100%' }}
            />
          </div>
        ))}
      </div>

      {/* Step title */}
      <h2 className="text-2xl font-bold text-gray-900">
        {stepTitles[currentStep - 1]}
      </h2>
      <p className="text-sm text-gray-600 mt-1">
        Step {currentStep} of 4
      </p>
    </div>
  );
};
