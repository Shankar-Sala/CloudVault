"use client"

import * as React from "react"
import * as SeparatorPrimitive from "@radix-ui/react-separator"

import { cn } from "@/lib/utils"

const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(
  (
    { className, orientation = "horizontal", decorative = true, ...props },
    ref
  ) => (
    <SeparatorPrimitive.Root
      ref={ref}
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "shrink-0",

        // ✅ HORIZONTAL (gradient line)
        orientation === "horizontal" &&
        "h-px w-full bg-gradient-to-r from-transparent via-border to-transparent",

        // ✅ VERTICAL (keep normal)
        orientation === "vertical" &&
        "w-px h-full bg-border/60",

        // DARK MODE
        "dark:via-border/50",

        className
      )}
      {...props}
    />
  )
)
Separator.displayName = SeparatorPrimitive.Root.displayName

export { Separator }
