import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-sans text-xs font-medium uppercase tracking-wide2 transition-all duration-500 ease-luxe focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brass-400 focus-visible:ring-offset-2 focus-visible:ring-offset-noir-950 disabled:pointer-events-none disabled:opacity-45 [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-brass-400 text-noir-950 hover:bg-brass-300 hover:shadow-[0_16px_40px_-14px_rgba(198,161,91,0.65)] active:translate-y-px",
        outline:
          "border border-brass-400/45 text-cream hover:border-brass-400 hover:bg-brass-400/10 active:translate-y-px",
        ghost: "text-cream/80 hover:text-cream hover:bg-white/[0.06]",
        solid: "bg-cream text-noir-950 hover:bg-white active:translate-y-px",
        link: "px-0 text-brass-400 underline-offset-4 hover:underline tracking-normal normal-case",
        danger:
          "border border-wine-400/50 text-wine-400 hover:bg-wine-500/20 hover:text-cream",
      },
      size: {
        sm: "h-9 px-4 text-[0.65rem]",
        md: "h-11 px-6",
        lg: "h-[3.15rem] px-8 text-[0.7rem]",
        icon: "size-10 p-0",
      },
      shape: {
        sharp: "rounded-none",
        soft: "rounded-sm",
        pill: "rounded-full",
      },
    },
    defaultVariants: { variant: "primary", size: "md", shape: "sharp" },
  },
);

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean };

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, shape, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size, shape }), className)}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { buttonVariants };
