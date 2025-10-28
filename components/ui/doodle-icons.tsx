'use client'

export const TargetDoodle = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 64 64" 
    className={className}
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
    <circle cx="32" cy="32" r="20" stroke="currentColor" strokeWidth="2" strokeDasharray="3 3" />
    <circle cx="32" cy="32" r="12" stroke="currentColor" strokeWidth="2" />
    <circle cx="32" cy="32" r="4" fill="currentColor" />
    <path d="M32 8L36 16L32 8ZM32 8L28 16L32 8ZM56 32L48 36L56 32ZM56 32L48 28L56 32ZM32 56L28 48L32 56ZM32 56L36 48L32 56ZM8 32L16 28L8 32ZM8 32L16 36L8 32Z" fill="currentColor" />
  </svg>
)

export const TrendingUpDoodle = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 64 64" 
    className={className}
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M8 56L24 40L32 48L56 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M48 24L56 24L56 32" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <circle cx="8" cy="56" r="3" fill="currentColor" />
    <circle cx="24" cy="40" r="3" fill="currentColor" />
    <circle cx="32" cy="48" r="3" fill="currentColor" />
    <circle cx="56" cy="24" r="3" fill="currentColor" />
    <path d="M12 48C12 48 16 44 20 44C24 44 28 48 32 48C36 48 40 44 44 44C48 44 52 48 56 48" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" opacity="0.5" />
  </svg>
)

export const ZapDoodle = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 64 64" 
    className={className}
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M32 8L40 32L24 32L32 56L20 36L36 36L32 8Z" fill="currentColor" />
    <path d="M32 16L36 32L28 32L32 48L24 36L32 36L32 16Z" fill="white" />
    <path d="M16 16C16 16 20 12 24 12C28 12 32 16 36 16C40 16 44 12 48 12C52 12 56 16 60 16" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" opacity="0.5" />
    <circle cx="16" cy="16" r="2" fill="currentColor" />
    <circle cx="48" cy="16" r="2" fill="currentColor" />
  </svg>
)

export const ShieldDoodle = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 64 64" 
    className={className}
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M32 8L56 16L56 32C56 48 48 56 32 60C16 56 8 48 8 32L8 16L32 8Z" stroke="currentColor" strokeWidth="2" />
    <path d="M32 8L32 60" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
    <path d="M20 24L32 36L44 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M32 36L32 48" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <circle cx="32" cy="16" r="3" fill="currentColor" />
    <circle cx="20" cy="24" r="2" fill="currentColor" />
    <circle cx="44" cy="24" r="2" fill="currentColor" />
  </svg>
)

export const BarChartDoodle = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 64 64" 
    className={className}
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="8" y="40" width="8" height="16" fill="currentColor" rx="2" />
    <rect x="20" y="32" width="8" height="24" fill="currentColor" rx="2" />
    <rect x="32" y="24" width="8" height="32" fill="currentColor" rx="2" />
    <rect x="44" y="16" width="8" height="40" fill="currentColor" rx="2" />
    <path d="M8 56L56 56" stroke="currentColor" strokeWidth="2" />
    <path d="M8 56L8 8" stroke="currentColor" strokeWidth="2" />
    <circle cx="12" cy="40" r="1" fill="white" />
    <circle cx="24" cy="32" r="1" fill="white" />
    <circle cx="36" cy="24" r="1" fill="white" />
    <circle cx="48" cy="16" r="1" fill="white" />
    <path d="M12 32C12 32 16 28 20 28C24 28 28 32 32 32C36 32 40 28 44 28C48 28 52 32 56 32" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" opacity="0.5" />
  </svg>
)

export const SparklesDoodle = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 64 64" 
    className={className}
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M32 8L34 16L32 8ZM32 8L30 16L32 8ZM56 32L48 34L56 32ZM56 32L48 30L56 32ZM32 56L30 48L32 56ZM32 56L34 48L32 56ZM8 32L16 30L8 32ZM8 32L16 34L8 32Z" fill="currentColor" />
    <circle cx="32" cy="32" r="4" fill="currentColor" />
    <circle cx="20" cy="20" r="2" fill="currentColor" />
    <circle cx="44" cy="20" r="2" fill="currentColor" />
    <circle cx="20" cy="44" r="2" fill="currentColor" />
    <circle cx="44" cy="44" r="2" fill="currentColor" />
    <path d="M32 16C36 20 40 24 44 28" stroke="currentColor" strokeWidth="1" strokeDasharray="1 1" />
    <path d="M32 16C28 20 24 24 20 28" stroke="currentColor" strokeWidth="1" strokeDasharray="1 1" />
    <path d="M32 48C36 44 40 40 44 36" stroke="currentColor" strokeWidth="1" strokeDasharray="1 1" />
    <path d="M32 48C28 44 24 40 20 36" stroke="currentColor" strokeWidth="1" strokeDasharray="1 1" />
  </svg>
)