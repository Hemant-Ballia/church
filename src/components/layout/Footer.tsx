import React from "react";
import Link from "next/link";
import { ArrowUpRight, MapPin, Phone } from "lucide-react";
import { navItems } from "@/data/navigation";
import { siteConfig } from "@/data/site";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0b0b0b] text-ivory border-t border-stone/10 pt-20 pb-12 relative overflow-hidden">
      {/* Subtle architectural background watermark */}
      <div className="absolute top-0 right-0 pointer-events-none select-none opacity-[0.03] text-stone font-serif text-[18vw] leading-none -translate-y-12">
        MILAGRIS
      </div>

      <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-8 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pb-16 border-b border-stone/10">
          {/* Main Column */}
          <div className="lg:col-span-6 space-y-6">
            <div className="text-xs tracking-widest uppercase text-gold font-medium">
              Diocese of Sindhudurg
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-light text-ivory leading-tight">
              MILAGRIS
              <br />
              <span className="text-stone">CATHEDRAL</span>
            </h2>
            <p className="text-stone text-sm sm:text-base leading-relaxed max-w-md font-light">
              Cathedral of Our Lady of Miracles. A sacred landmark of faith, Konkan architectural heritage, and community reverence in Sawantwadi, Maharashtra.
            </p>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-4">
            <div className="text-xs tracking-widest uppercase text-stone/80 font-medium pb-2 border-b border-stone/10">
              Navigation
            </div>
            <ul className="space-y-2.5">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-xs uppercase tracking-widest text-stone hover:text-gold transition-colors inline-block py-1 font-medium"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Location & Contact */}
          <div className="lg:col-span-3 space-y-4">
            <div className="text-xs tracking-widest uppercase text-stone/80 font-medium pb-2 border-b border-stone/10">
              Location &amp; Parish
            </div>
            <div className="space-y-3 text-xs text-stone leading-relaxed font-light">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                <span>
                  Milagris Church Rd, Salaiwada,
                  <br />
                  Sawantwadi, Maharashtra 416510
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-gold shrink-0" />
                <span>Phone: {siteConfig.location.phone}</span>
              </div>
            </div>

            <div className="pt-3">
              <a
                href={siteConfig.location.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-gold uppercase tracking-widest hover:text-ivory transition-colors group"
              >
                <span>Open in Google Maps</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted">
          <div>
            © {currentYear} Milagris Cathedral. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span className="text-[11px] tracking-wider uppercase">
              Roman Catholic Diocese of Sindhudurg
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
