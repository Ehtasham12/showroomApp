import React from 'react'

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  options: Array<{ value: string | number; label: string }>
  placeholder?: string
  error?: string
}

export function Select({
  label,
  options,
  placeholder,
  error,
  className = '',
  ...props
}: SelectProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-small font-medium text-primary">{label}</label>}
      <select
        className={`px-3 py-2 border rounded text-body focus:outline-none focus:ring-2 focus:ring-secondary ${
          error ? 'border-error' : 'border-neutral'
        } ${className}`}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <span className="text-small text-error">{error}</span>}
    </div>
  )
}
