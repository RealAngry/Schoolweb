import * as React from "react"
import { cn } from "../../utils/cn"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "ghost" | "link" | "secondary"
  size?: "default" | "sm" | "lg" | "icon"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
          
          // Variants
          variant === "default" && "bg-blue-600 text-white hover:bg-blue-700",
          variant === "destructive" && "bg-red-600 text-white hover:bg-red-700",
          variant === "outline" && "border border-gray-300 bg-transparent hover:bg-gray-100 text-gray-900 dark:text-gray-50 dark:border-gray-700 dark:hover:bg-gray-800",
          variant === "secondary" && "bg-gray-200 text-gray-900 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-50 dark:hover:bg-gray-600",
          variant === "ghost" && "hover:bg-gray-100 hover:text-gray-900 text-gray-700 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-gray-50",
          variant === "link" && "text-blue-600 underline-offset-4 hover:underline dark:text-blue-400",
          
          // Sizes
          size === "default" && "h-10 px-4 py-2",
          size === "sm" && "h-8 rounded-md px-3 text-sm",
          size === "lg" && "h-12 rounded-md px-6",
          size === "icon" && "h-9 w-9",
          
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)

Button.displayName = "Button"

export { Button } 