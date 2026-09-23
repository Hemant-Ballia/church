"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { ArrowDown, MapPin } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { animateHero } from "@/animations/heroAnimations";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const headingLine1Ref = useRef<HTMLHeadingElement>(null);
  const headingLine2Ref = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLDivElement>(null);
  const ctasRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    const ctx = animateHero({
      container: containerRef.current,
      image: imageRef.current,
      overlay: overlayRef.current,
      eyebrow: eyebrowRef.current,
      headingLines: [headingLine1Ref.current, headingLine2Ref.current],
      description: descRef.current,
      ctas: ctasRef.current,
      scrollIndicator: scrollIndicatorRef.current,
    });

    return () => {
      ctx?.kill();
    };
  }, [reducedMotion]);

  const scrollToExplore = () => {
    const nextSection = document.getElementById("intro-statement");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-[100svh] flex flex-col justify-between overflow-hidden bg-obsidian text-ivory pt-28 pb-10"
    >
      {/* Background Image with Clip-Path Reveal */}
      <div
        ref={imageRef}
        className="absolute inset-0 z-0 will-change-transform"
      >
        <Image
          src="/images/hero/cathedral-facade.jpg"
          alt="Milagris Cathedral illuminated stone facade and towers at twilight"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center scale-100"
        />
        {/* Deep cinematic gradient overlay */}
        <div
          ref={overlayRef}
          className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/60 to-[#111111]/40"
        />
        <div className="absolute inset-0 bg-radial-gradient from-transparent to-black/70 pointer-events-none" />
      </div>

      {/* Top spacer for navbar balance */}
      <div className="relative z-10" />

      {/* Main Center Content */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 sm:px-8 md:px-12 lg:px-16 my-auto">
        <div className="max-w-4xl">
          {/* Eyebrow */}
          <div
            ref={eyebrowRef}
            className="flex items-center gap-3 mb-4 sm:mb-6"
          >
            <span className="w-6 h-px bg-gold/70" />
            <span className="text-xs uppercase tracking-widest text-gold font-medium">
              Our Lady of Miracles
            </span>
          </div>

          {/* Heading with dramatic clamp */}
          <div className="overflow-hidden">
            <h1
              ref={headingLine1Ref}
              className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] tracking-tight font-light text-ivory leading-[0.92] uppercase"
            >
              MILAGRIS
            </h1>
          </div>
          <div className="overflow-hidden mb-6 sm:mb-8">
            <h1
              ref={headingLine2Ref}
              className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] tracking-tight font-light text-stone leading-[0.92] uppercase"
            >
              CATHEDRAL
            </h1>
          </div>

          {/* Supporting copy */}
          <div
            ref={descRef}
            className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 text-stone text-sm sm:text-base font-light mb-8 sm:mb-10 max-w-xl"
          >
            <div className="flex items-center gap-2 text-stone-light">
              <MapPin className="w-4 h-4 text-gold shrink-0" />
              <span className="tracking-wide">Sawantwadi, Maharashtra</span>
            </div>
            <span className="hidden sm:inline text-stone/40">•</span>
            <span className="text-muted tracking-wide">
              Diocese of Sindhudurg
            </span>
          </div>

          {/* Call to Actions */}
          <div
            ref={ctasRef}
            className="flex flex-wrap items-center gap-4 sm:gap-6"
          >
            <Button
              variant="primary"
              onClick={scrollToExplore}
              className="px-7 py-4"
            >
              Explore the Cathedral
            </Button>
            <Button
              variant="outline"
              href="/visit"
              withArrow
              className="px-7 py-4"
            >
              Plan Your Visit
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom Row with Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="relative z-10 w-full max-w-[1440px] mx-auto px-6 sm:px-8 md:px-12 flex items-center justify-between pt-6 border-t border-stone/10"
      >
        <div className="hidden sm:flex items-center gap-4 text-xs tracking-widest uppercase text-muted font-sans">
          <span>Est. 1652</span>
          <span>—</span>
          <span>Reconstructed & Consecrated 2026</span>
        </div>

        <button
          onClick={scrollToExplore}
          aria-label="Scroll down to explore"
          className="mx-auto sm:mr-0 group flex items-center gap-2 text-xs uppercase tracking-widest text-stone hover:text-gold transition-colors focus:outline-none"
        >
          <span>Scroll</span>
          <ArrowDown className="w-3.5 h-3.5 text-gold transition-transform group-hover:translate-y-1" />
        </button>
      </div>
    </section>
  );
}
