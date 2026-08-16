import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  children: React.ReactNode
}

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles = 'font-medium rounded transition-colors inline-flex items-center justify-center'

  const variantStyles = {
    primary: 'bg-primary text-white hover:bg-primary/90 disabled:bg-primary/50',
    secondary: 'bg-secondary text-white hover:bg-secondary/90 disabled:bg-secondary/50',
    outline: 'border border-primary text-primary hover:bg-primary/10 disabled:border-primary/50',
  }

  const sizeStyles = {
    sm: 'px-3 py-1 text-small',
    md: 'px-4 py-2 text-body',
    lg: 'px-6 py-3 text-body',
  }

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? 'Loading...' : props.children}
    </button>
  )
}
