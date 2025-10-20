// Simple utility function to combine class names
const cn = (...classes: (string | undefined | null | false)[]) => {
  return classes.filter(Boolean).join(' ')
}

interface CardProps {
  className?: string
  children?: any
  [key: string]: any
}

interface CardHeaderProps {
  className?: string
  children?: any
  [key: string]: any
}

interface CardTitleProps {
  className?: string
  children?: any
  [key: string]: any
}

interface CardDescriptionProps {
  className?: string
  children?: any
  [key: string]: any
}

interface CardContentProps {
  className?: string
  children?: any
  [key: string]: any
}

interface CardFooterProps {
  className?: string
  children?: any
  [key: string]: any
}

const Card = ({ className, ...props }: CardProps) => (
  <div
    className={cn(
      "rounded-lg border border-gray-200 bg-white text-gray-900 shadow-sm",
      className
    )}
    {...props}
  />
)

const CardHeader = ({ className, ...props }: CardHeaderProps) => (
  <div className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
)

const CardTitle = ({ className, ...props }: CardTitleProps) => (
  <h3
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight text-gray-900",
      className
    )}
    {...props}
  />
)

const CardDescription = ({ className, ...props }: CardDescriptionProps) => (
  <p
    className={cn("text-sm text-gray-600", className)}
    {...props}
  />
)

const CardContent = ({ className, ...props }: CardContentProps) => (
  <div className={cn("p-6 pt-0", className)} {...props} />
)

const CardFooter = ({ className, ...props }: CardFooterProps) => (
  <div
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
)

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
