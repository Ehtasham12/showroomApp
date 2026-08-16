import React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
}

export function Input({ label, error, helperText, className = '', ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-small font-medium text-primary">{label}</label>}
      <input
        className={`px-3 py-2 border rounded text-body focus:outline-none focus:ring-2 focus:ring-secondary ${
          error ? 'border-error' : 'border-neutral'
        } ${className}`}
        {...props}
      />
      {error && <span className="text-small text-error">{error}</span>}
      {helperText && <span className="text-small text-gray-600">{helperText}</span>}
    </div>
  )
}
