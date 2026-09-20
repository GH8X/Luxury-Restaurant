import * as React from "react";
import { cn } from "@/lib/utils";

const fieldBase =
  "w-full rounded-none border border-white/10 bg-white/[0.03] px-4 py-3 font-sans text-sm text-cream placeholder:text-cream-muted/60 transition-colors duration-300 focus:border-brass-400/70 focus:bg-white/[0.05] focus:outline-none focus:ring-1 focus:ring-brass-400/30 disabled:opacity-50";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input ref={ref} className={cn(fieldBase, className)} {...props} />
  ),
);
Input.displayName = "Input";

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea ref={ref} className={cn(fieldBase, "min-h-28 resize-y leading-relaxed", className)} {...props} />
));
Textarea.displayName = "Textarea";

export const NativeSelect = React.forwardRef<
  HTMLSelectElement,
  React.SelectHTMLAttributes<HTMLSelectElement>
>(({ className, children, ...props }, ref) => (
  <select
    ref={ref}
    className={cn(
      fieldBase,
      "appearance-none bg-[length:0.7rem] bg-[right_1rem_center] bg-no-repeat pr-10 [&>option]:bg-noir-900 [&>option]:text-cream",
      "bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%23c6a15b%22 stroke-width=%222%22><path d=%22M6 9l6 6 6-6%22/></svg>')]",
      className,
    )}
    {...props}
  >
    {children}
  </select>
));
NativeSelect.displayName = "NativeSelect";

export function Label({ className, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      className={cn(
        "block font-sans text-[0.7rem] font-medium uppercase tracking-wide2 text-cream-muted",
        className,
      )}
      {...props}
    />
  );
}

export function Field({
  label,
  hint,
  error,
  children,
  className,
}: {
  label: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-baseline justify-between gap-3">
        <Label>{label}</Label>
        {hint ? <span className="text-[0.65rem] text-cream-muted/70">{hint}</span> : null}
      </div>
      {children}
      {error ? <p className="text-[0.7rem] text-wine-400">{error}</p> : null}
    </div>
  );
}

export { fieldBase };
