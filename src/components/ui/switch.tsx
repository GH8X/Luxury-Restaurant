import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { cn } from "@/lib/utils";

export const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitive.Root
    ref={ref}
    className={cn(
      "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border border-white/15 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brass-400 data-[state=checked]:border-brass-400/60 data-[state=checked]:bg-brass-400/30 data-[state=unchecked]:bg-white/[0.05]",
      className,
    )}
    {...props}
  >
    <SwitchPrimitive.Thumb className="pointer-events-none block size-4 translate-x-1 rounded-full bg-cream-muted shadow transition-transform duration-300 ease-luxe data-[state=checked]:translate-x-6 data-[state=checked]:bg-brass-300" />
  </SwitchPrimitive.Root>
));
Switch.displayName = "Switch";
