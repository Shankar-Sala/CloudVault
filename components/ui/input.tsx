import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> { }

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          // BASE
          "flex h-11 w-full rounded-xl border border-input bg-background px-4 text-sm shadow-sm transition-all",

          // TEXT + PLACEHOLDER
          "text-dark-100 dark:text-white placeholder:text-muted-foreground",

          // HOVER EFFECT
          "hover:border-blue/60",

          // FOCUS (MAIN IMPROVEMENT 🔥)
          "focus:outline-none focus:ring-2 focus:ring-blue/30 focus:border-blue",

          // DARK MODE
          "dark:bg-dark-200 dark:border-dark-300",

          // DISABLED
          "disabled:cursor-not-allowed disabled:opacity-50",

          // FILE INPUT FIX
          "file:border-0 file:bg-transparent file:text-sm file:font-medium",

          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
