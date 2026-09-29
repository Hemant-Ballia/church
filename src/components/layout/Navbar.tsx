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
            ? "bg-[#111111]/92 backdrop-blur-md border-b border-stone/10 py-3.5"
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



          {/* Universal Hamburger Menu Trigger */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileMenuOpen(true)}
              aria-expanded={mobileMenuOpen}
              aria-controls="navigation-menu"
              aria-label="Open Navigation Menu"
              className="group flex items-center gap-3 focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-obsidian rounded-sm"
            >
              <span className="hidden sm:block text-xs font-sans tracking-widest uppercase text-ivory group-hover:text-gold transition-colors">
                Menu
              </span>
              <div className="p-2 border border-stone/20 text-ivory group-hover:text-gold group-hover:border-gold transition-colors">
                <Menu className="w-5 h-5" strokeWidth={1.5} />
              </div>
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
