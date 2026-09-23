import React from "react";
import { cn } from "@/lib/utils";

interface SectionLabelProps {
  label: string;
  theme?: "dark" | "light";
  className?: string;
  withRule?: boolean;
}

export function SectionLabel({
  label,
  theme = "dark",
  className,
  withRule = true,
}: SectionLabelProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2.5 text-xs uppercase tracking-widest font-medium",
        theme === "dark" ? "text-stone" : "text-stone-dark",
        className
      )}
    >
      {withRule && <span className="w-5 h-px bg-gold/50 inline-block" />}
      <span className="text-gold font-medium">{label}</span>
    </div>
  );
}
