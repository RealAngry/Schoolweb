import * as React from "react"
import { cn } from "../../utils/cn"
import { AlertCircle, CheckCircle, Info, XCircle } from "lucide-react"

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "destructive" | "success" | "warning"
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = "default", ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="alert"
        className={cn(
          "relative w-full rounded-lg border p-4",
          {
            "border-gray-200 bg-gray-50 text-gray-900": variant === "default",
            "border-red-200 bg-red-50 text-red-900": variant === "destructive",
            "border-green-200 bg-green-50 text-green-900": variant === "success",
            "border-yellow-200 bg-yellow-50 text-yellow-900": variant === "warning"
          },
          className
        )}
        {...props}
      />
    )
  }
)
Alert.displayName = "Alert"

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("mb-1 font-medium leading-none tracking-tight", className)}
    {...props}
  />
))
AlertTitle.displayName = "AlertTitle"

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm", className)}
    {...props}
  />
))
AlertDescription.displayName = "AlertDescription"

const AlertIcon = ({ variant }: { variant?: "default" | "destructive" | "success" | "warning" }) => {
  const iconClassName = "h-4 w-4 mr-2";
  
  switch (variant) {
    case "destructive":
      return <XCircle className={iconClassName} />;
    case "success":
      return <CheckCircle className={iconClassName} />;
    case "warning":
      return <AlertCircle className={iconClassName} />;
    default:
      return <Info className={iconClassName} />;
  }
};

export { Alert, AlertTitle, AlertDescription, AlertIcon } 