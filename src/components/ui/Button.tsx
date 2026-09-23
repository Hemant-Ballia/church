import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost" | "gold";
  href?: string;
  isExternal?: boolean;
  withArrow?: boolean;
  children: React.ReactNode;
}

export function Button({
  variant = "outline",
  href,
  isExternal = false,
  withArrow = false,
  children,
  className,
  ...props
}: ButtonProps) {
  const baseClasses =
    "group inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-xs uppercase tracking-widest font-medium transition-all duration-300 relative overflow-hidden focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold";

  const variantClasses = {
    outline:
      "border border-stone/30 text-ivory hover:border-gold hover:text-gold bg-transparent",
    primary:
      "bg-ivory text-obsidian border border-ivory hover:bg-gold hover:border-gold hover:text-obsidian",
    gold:
      "bg-gold text-obsidian border border-gold hover:bg-gold-light font-semibold",
    ghost:
      "text-stone hover:text-ivory bg-transparent px-2 py-1",
  };

  const content = (
    <>
      <span className="relative z-10">{children}</span>
      {withArrow && (
        <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-gold group-hover:text-current" />
      )}
    </>
  );

  if (href) {
    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(baseClasses, variantClasses[variant], className)}
        >
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={cn(baseClasses, variantClasses[variant], className)}>
        {content}
      </Link>
    );
  }

  return (
    <button
      className={cn(baseClasses, variantClasses[variant], className)}
      {...props}
    >
      {content}
    </button>
  );
}
