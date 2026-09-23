"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { registerGSAP, gsap } from "@/animations/gsapInit";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function ArchitectureSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const img1Ref = useRef<HTMLDivElement>(null);
  const img2Ref = useRef<HTMLDivElement>(null);
  const img3Ref = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    registerGSAP();

    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      [img1Ref.current, img2Ref.current, img3Ref.current].forEach((img, i) => {
        if (!img) return;
        gsap.fromTo(
          img,
          { clipPath: "inset(0 0 100% 0)", scale: 1.04 },
          {
            clipPath: "inset(0 0 0% 0)",
            scale: 1,
            duration: 1.2,
            delay: i * 0.12,
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: img,
              start: "top 82%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      id="architecture"
      ref={sectionRef}
      className="py-24 sm:py-32 bg-[#121212] text-ivory relative border-b border-stone/10 overflow-hidden"
    >
      <Container size="default">
        {/* Section Header */}
        <div ref={headerRef} className="max-w-3xl mb-16 sm:mb-20 space-y-4">
          <SectionLabel label="Architectural Craftsmanship" />
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-light text-ivory tracking-tight leading-[1.12]">
            ARCHITECTURE & FORM
          </h2>
          <p className="text-stone text-sm sm:text-base font-light leading-relaxed max-w-xl">
            A synthesis of Konkan stone masonry and sacred Roman-Rite geometry, defined by arched portals, natural illumination, and vaulted proportions.
          </p>
        </div>

        {/* Asymmetric Composition — Clean, photography-first, no artificial badges */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Main Large Image */}
          <div className="md:col-span-7 space-y-4">
            <div
              ref={img1Ref}
              className="relative aspect-[4/3] overflow-hidden bg-surface will-change-transform"
            >
              <Image
                src="/images/hero/cathedral-facade.jpg"
                alt="Architectural perspective of Milagris Cathedral facade"
                fill
                sizes="(max-width: 768px) 100vw, 60vw"
                className="object-cover transition-transform duration-700 ease-out hover:scale-105"
              />
            </div>
            <div className="pt-1">
              <span className="text-xs uppercase tracking-widest text-gold font-medium block">
                Cathedral Elevation
              </span>
              <p className="font-serif text-lg text-ivory mt-1">
                Warm Stone Masonry & Twin Belfry Towers
              </p>
            </div>
          </div>

          {/* Right Column: Stacked Detail Shots */}
          <div className="md:col-span-5 space-y-10">
            {/* Detail 1: Facade Carvings */}
            <div className="space-y-3">
              <div
                ref={img2Ref}
                className="relative aspect-[16/10] overflow-hidden bg-surface will-change-transform"
              >
                <Image
                  src="/images/architecture/facade-detail.jpg"
                  alt="Carved stone arch and Latin inscriptions on portal"
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover transition-transform duration-700 ease-out hover:scale-105"
                />
              </div>
              <div className="pt-1">
                <span className="text-xs uppercase tracking-widest text-gold font-medium block">
                  Stone Masonry
                </span>
                <p className="font-serif text-base text-ivory mt-0.5">
                  Carved Archway & Dedication Inscription
                </p>
              </div>
            </div>

            {/* Detail 2: Nave Vaulting */}
            <div className="space-y-3">
              <div
                ref={img3Ref}
                className="relative aspect-[16/10] overflow-hidden bg-surface will-change-transform"
              >
                <Image
                  src="/images/gallery/sanctuary-altar.jpg"
                  alt="Vaulted sanctuary and high altar detail"
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover transition-transform duration-700 ease-out hover:scale-105"
                />
              </div>
              <div className="pt-1">
                <span className="text-xs uppercase tracking-widest text-gold font-medium block">
                  The Sanctuary
                </span>
                <p className="font-serif text-base text-ivory mt-0.5">
                  High Altar & Vaulted Sanctuary
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
