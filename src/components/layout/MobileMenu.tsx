"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, ArrowRight, MapPin, Phone } from "lucide-react";
import { navItems } from "@/data/navigation";
import { siteConfig } from "@/data/site";
import { gsap } from "@/animations/gsapInit";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname();
  const overlayRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const metaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!overlayRef.current) return;

    if (isOpen) {
      document.body.style.overflow = "hidden";

      const validLinks = linksRef.current.filter(Boolean);
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.to(overlayRef.current, {
        opacity: 1,
        visibility: "visible",
        duration: 0.4,
      })
        .fromTo(
          validLinks,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.08 },
          "-=0.2"
        )
        .fromTo(
          metaRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5 },
          "-=0.3"
        );
    } else {
      document.body.style.overflow = "";

      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          if (overlayRef.current) {
            overlayRef.current.style.visibility = "hidden";
          }
        },
      });
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-label="Navigation Menu"
      className="fixed inset-0 z-50 bg-[#0e0e0e]/98 backdrop-blur-xl flex flex-col justify-between p-8 md:hidden opacity-0 invisible"
    >
      {/* Header bar */}
      <div className="flex items-center justify-between border-b border-stone/10 pb-6">
        <div>
          <span className="font-serif text-lg tracking-wider text-ivory block leading-tight">
            MILAGRIS
          </span>
          <span className="text-[10px] tracking-[0.25em] uppercase text-gold block">
            CATHEDRAL
          </span>
        </div>

        <button
          onClick={onClose}
          aria-label="Close navigation menu"
          className="p-3 border border-stone/20 rounded-full text-ivory hover:text-gold hover:border-gold transition-colors focus:outline-none"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="my-auto py-8 space-y-6">
        {navItems.map((item, index) => {
          const isActive = pathname === item.href;
          return (
            <div key={item.href} className="overflow-hidden">
              <Link
                ref={(el) => {
                  linksRef.current[index] = el;
                }}
                href={item.href}
                onClick={onClose}
                className="group flex items-center justify-between py-2 text-2xl font-serif tracking-wide transition-colors"
              >
                <span
                  className={`${
                    isActive ? "text-gold font-medium" : "text-ivory group-hover:text-gold"
                  } transition-colors`}
                >
                  {item.label}
                </span>
                <span className="text-xs text-muted font-sans tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                  Explore <ArrowRight className="w-3 h-3 text-gold" />
                </span>
              </Link>
            </div>
          );
        })}
      </nav>

      {/* Bottom metadata */}
      <div ref={metaRef} className="border-t border-stone/10 pt-6 space-y-3">
        <div className="flex items-center gap-2 text-xs text-stone">
          <MapPin className="w-3.5 h-3.5 text-gold shrink-0" />
          <span>Salaiwada, Sawantwadi, Maharashtra 416510</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-stone">
          <Phone className="w-3.5 h-3.5 text-gold shrink-0" />
          <span>{siteConfig.location.phone}</span>
        </div>
        <div className="pt-2">
          <Link
            href="/visit"
            onClick={onClose}
            className="block w-full py-3 text-center border border-gold/40 text-gold uppercase tracking-[0.2em] text-xs font-medium hover:bg-gold hover:text-obsidian transition-colors"
          >
            Plan Your Visit
          </Link>
        </div>
      </div>
    </div>
  );
}
