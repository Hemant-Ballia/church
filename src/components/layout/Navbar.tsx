"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { navItems } from "@/data/navigation";
import { useScrollDirection } from "@/hooks/useScrollDirection";
import { MobileMenu } from "./MobileMenu";
import { Button } from "@/components/ui/Button";

export function Navbar() {
  const pathname = usePathname();
  const { isScrolled } = useScrollDirection();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ease-out ${
          isScrolled
            ? "bg-[#111111]/92 backdrop-blur-md border-b border-stone/10 py-3.5 shadow-2xl"
            : "bg-gradient-to-b from-black/80 via-black/40 to-transparent py-6 md:py-7"
        }`}
      >
        <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-8 md:px-12 flex items-center justify-between">
          {/* Logo on Left */}
          <Link href="/" className="group flex flex-col items-start focus:outline-none">
            <span className="font-serif text-lg sm:text-xl md:text-2xl font-light tracking-wide text-ivory group-hover:text-gold transition-colors duration-300 leading-tight">
              MILAGRIS
            </span>
            <span className="text-[10px] tracking-widest uppercase text-gold font-sans font-medium transition-opacity">
              CATHEDRAL
            </span>
          </Link>

          {/* Center Navigation Links (Desktop) */}
          <nav
            aria-label="Main Navigation"
            className="hidden md:flex items-center gap-8 lg:gap-10"
          >
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative py-1 text-xs uppercase tracking-widest font-medium transition-colors duration-300 ${
                    isActive
                      ? "text-gold"
                      : "text-stone hover:text-ivory"
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-px bg-gold" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action (Desktop) */}
          <div className="hidden md:flex items-center gap-4">
            <Button
              variant="outline"
              href="/visit"
              withArrow
              className="py-2.5 px-5 text-xs tracking-widest"
            >
              Visit Cathedral
            </Button>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex md:hidden items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open Navigation Menu"
              className="p-2.5 border border-stone/20 text-ivory hover:text-gold hover:border-gold transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </>
  );
}
