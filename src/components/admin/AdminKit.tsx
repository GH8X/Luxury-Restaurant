import type { ReactNode } from "react";
import { SmartImage } from "@/components/media/SmartImage";
import { Input, Label, NativeSelect, Textarea } from "@/components/ui/field";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

export function AdminSection({
  title,
  description,
  children,
  actions,
  className,
}: {
  title: string;
  description?: string;
  children: ReactNode;
  actions?: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("border border-white/[0.08] bg-white/[0.015]", className)}>
      <header className="flex flex-col gap-4 border-b border-white/[0.07] px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <h2 className="font-serif text-xl font-light text-cream">{title}</h2>
          {description ? (
            <p className="mt-1.5 max-w-2xl text-[0.78rem] leading-relaxed text-cream-muted">
              {description}
            </p>
          ) : null}
        </div>
        {actions ? <div className="flex shrink-0 flex-wrap gap-2">{actions}</div> : null}
      </header>
      <div className="p-5 sm:p-6">{children}</div>
    </section>
  );
}

export function StatCard({
  label,
  value,
  hint,
  accent = false,
}: {
  label: string;
  value: string | number;
  hint?: string;
  accent?: boolean;
}) {
  return (
    <div
      className={cn(
        "border p-5",
        accent
          ? "border-brass-400/30 bg-gradient-to-br from-brass-500/[0.10] to-transparent"
          : "border-white/[0.08] bg-white/[0.02]",
      )}
    >
      <p className="font-sans text-[0.58rem] uppercase tracking-luxe text-cream-muted/75">{label}</p>
      <p
        className={cn(
          "mt-3 font-serif text-3xl font-light",
          accent ? "text-brass-200" : "text-cream",
        )}
      >
        {value}
      </p>
      {hint ? <p className="mt-2 text-[0.7rem] text-cream-muted/70">{hint}</p> : null}
    </div>
  );
}

export function TextField({
  label,
  value,
  onChange,
  placeholder,
  hint,
  type = "text",
  className,
}: {
  label: string;
  value: string | number;
  onChange: (value: string) => void;
  placeholder?: string;
  hint?: string;
  type?: string;
  className?: string;
}) {
  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-baseline justify-between gap-3">
        <Label>{label}</Label>
        {hint ? <span className="text-[0.62rem] text-cream-muted/60">{hint}</span> : null}
      </div>
      <Input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

export function TextAreaField({
  label,
  value,
  onChange,
  placeholder,
  rows = 3,
  hint,
  className,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
  hint?: string;
  className?: string;
}) {
  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-baseline justify-between gap-3">
        <Label>{label}</Label>
        {hint ? <span className="text-[0.62rem] text-cream-muted/60">{hint}</span> : null}
      </div>
      <Textarea
        value={value}
        rows={rows}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

export function SelectField({
  label,
  value,
  onChange,
  options,
  className,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  className?: string;
}) {
  return (
    <div className={cn("space-y-2", className)}>
      <Label>{label}</Label>
      <NativeSelect value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </NativeSelect>
    </div>
  );
}

export function SwitchRow({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-5 border border-white/[0.08] bg-white/[0.02] px-4 py-3.5">
      <div>
        <p className="font-sans text-[0.72rem] uppercase tracking-wide2 text-cream">{label}</p>
        {description ? <p className="mt-1 text-[0.72rem] text-cream-muted">{description}</p> : null}
      </div>
      <Switch checked={checked} onCheckedChange={onChange} />
    </div>
  );
}

export function ImageField({
  label,
  value,
  onChange,
  ratio = "landscape",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  ratio?: "portrait" | "square" | "landscape";
}) {
  return (
    <div className="space-y-3">
      <Label>{label}</Label>
      <div className="grid gap-3 sm:grid-cols-[7rem_1fr]">
        <SmartImage src={value} alt={label} ratio={ratio} className="border border-white/[0.08]" />
        <div className="space-y-2">
          <Input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="https://images.unsplash.com/photo-…"
            className="text-[0.75rem]"
          />
          <p className="text-[0.65rem] leading-relaxed text-cream-muted/70">
            Paste any image URL, or use one of the demo photos. Changes preview instantly.
          </p>
        </div>
      </div>
    </div>
  );
}

export function EmptyState({ title, body }: { title: string; body: string }) {
  return (
    <div className="border border-dashed border-white/12 px-6 py-14 text-center">
      <p className="font-serif text-xl text-cream">{title}</p>
      <p className="mx-auto mt-3 max-w-sm text-[0.8rem] leading-relaxed text-cream-muted">{body}</p>
    </div>
  );
}

export function TagInput({
  label,
  tags,
  onChange,
  placeholder = "Add a tag and press Enter",
}: {
  label: string;
  tags: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
}) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => onChange(tags.filter((t) => t !== tag))}
            className="group inline-flex items-center gap-2 border border-white/[0.12] px-2.5 py-1.5 font-sans text-[0.6rem] uppercase tracking-wide2 text-cream-muted transition-colors hover:border-wine-400/50 hover:text-cream"
          >
            {tag}
            <span className="text-cream-muted/50 group-hover:text-wine-400">×</span>
          </button>
        ))}
      </div>
      <Input
        placeholder={placeholder}
        onKeyDown={(e) => {
          if (e.key !== "Enter") return;
          e.preventDefault();
          const next = e.currentTarget.value.trim();
          if (!next || tags.includes(next)) return;
          onChange([...tags, next]);
          e.currentTarget.value = "";
        }}
      />
    </div>
  );
}
