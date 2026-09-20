import { useState } from "react";
import { blurFor } from "@/data/images";
import { cn } from "@/lib/utils";

type SmartImageProps = {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  ratio?: "portrait" | "square" | "landscape" | "tall" | "auto";
  priority?: boolean;
  zoom?: boolean;
  overlay?: "none" | "soft" | "strong";
  width?: number;
};

const ratioClass: Record<NonNullable<SmartImageProps["ratio"]>, string> = {
  portrait: "aspect-[4/5]",
  square: "aspect-square",
  landscape: "aspect-[16/10]",
  tall: "aspect-[3/4]",
  auto: "",
};

export function SmartImage({
  src,
  alt,
  className,
  imgClassName,
  ratio = "landscape",
  priority = false,
  zoom = false,
  overlay = "none",
  width = 1200,
}: SmartImageProps) {
  const [state, setState] = useState<"loading" | "ready" | "error">("loading");

  const resolvedSrc =
    /^https?:\/\//.test(src) && !src.includes("w=")
      ? `${src}${src.includes("?") ? "&" : "?"}auto=format&fit=crop&w=${width}&q=80`
      : src;

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-noir-900",
        ratioClass[ratio],
        className,
      )}
      style={{ backgroundImage: state === "loading" ? blurFor(alt || src) : undefined }}
    >
      {state !== "error" ? (
        <img
          src={resolvedSrc}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          onLoad={() => setState("ready")}
          onError={() => setState("error")}
          className={cn(
            "size-full object-cover transition-[opacity,transform] duration-1000 ease-luxe",
            state === "ready" ? "opacity-100" : "opacity-0",
            zoom && "group-hover:scale-[1.06]",
            imgClassName,
          )}
        />
      ) : (
        <div className="flex size-full items-center justify-center bg-gradient-to-br from-noir-800 to-noir-950">
          <span className="font-serif text-sm italic text-cream-muted/70">{alt}</span>
        </div>
      )}

      {overlay !== "none" ? (
        <div
          className={cn(
            "pointer-events-none absolute inset-0",
            overlay === "strong"
              ? "bg-gradient-to-t from-noir-950 via-noir-950/55 to-noir-950/25"
              : "bg-gradient-to-t from-noir-950/85 via-noir-950/25 to-transparent",
          )}
        />
      ) : null}
    </div>
  );
}
