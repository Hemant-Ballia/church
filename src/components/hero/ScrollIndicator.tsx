import React from "react";

interface ScrollIndicatorProps {
  className?: string;
}

export function ScrollIndicator({ className = "" }: ScrollIndicatorProps) {
  return (
    <div className={`flex flex-col items-center gap-2 select-none ${className}`}>
      <span className="text-[10px] uppercase tracking-[0.3em] text-stone/80 font-medium">
        Scroll
      </span>
      <div className="w-px h-12 bg-stone/20 relative overflow-hidden">
        <div className="w-full h-1/2 bg-gold animate-bounce" />
      </div>
    </div>
  );
}
