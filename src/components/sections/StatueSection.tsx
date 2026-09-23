"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { registerGSAP, gsap } from "@/animations/gsapInit";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function StatueSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    registerGSAP();

    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (imageContainerRef.current) {
        gsap.fromTo(
          imageContainerRef.current,
          { clipPath: "inset(0 0 100% 0)", scale: 1.04 },
          {
            clipPath: "inset(0 0 0% 0)",
            scale: 1,
            duration: 1.3,
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: imageContainerRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: contentRef.current,
              start: "top 78%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      id="patroness"
      ref={sectionRef}
      className="py-24 sm:py-32 bg-[#0f0f0f] text-ivory relative border-b border-stone/10 overflow-hidden"
    >
      <Container size="default">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Portrait of Our Lady of Miracles */}
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div
              ref={imageContainerRef}
              className="relative w-full aspect-[3/4] max-w-lg mx-auto overflow-hidden bg-surface will-change-transform group"
            >
              <Image
                src="/images/statue/our-lady-miracles.jpg"
                alt="Sacred restored 1652 statue of Our Lady of Miracles (Milagris Saibin) installed in the facade niche"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="max-w-lg mx-auto mt-4 text-center">
              <span className="text-xs uppercase tracking-widest text-gold font-medium block">
                The Historic Restored Statue (1652)
              </span>
              <p className="text-xs text-muted font-light mt-1">
                Reinstalled on the Cathedral Façade • May 7, 2026
              </p>
            </div>
          </div>

          {/* Reverent Editorial Narrative */}
          <div
            ref={contentRef}
            className="lg:col-span-6 order-1 lg:order-2 space-y-8 will-change-transform"
          >
            <div className="space-y-4">
              <SectionLabel label="Sacred Veneration" />
              <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-light text-ivory tracking-tight leading-[1.08]">
                OUR LADY <br />
                <span className="text-gold italic font-normal">OF MIRACLES</span>
              </h2>
            </div>

            <div className="space-y-5 text-stone font-light text-sm sm:text-base leading-relaxed">
              <p>
                Milagris Cathedral is consecrated under the patronage of Our Lady of Miracles, affectionately known across the Konkan and Goa regions as <em>Milagris Saibin</em>. For generations, believers of diverse backgrounds have gathered here in quiet supplication, seeking solace, healing, and maternal intercession.
              </p>
              <p>
                The historic statue that adorned the facade of the original 1652 church was carefully preserved throughout the extensive cathedral reconstruction. Following thorough artistic conservation, the statue was solemnly blessed and reinstalled on the new facade on <strong>May 7, 2026</strong>, leading up to the historic dedication of the cathedral.
              </p>
              <p>
                Resting above the grand portal, the statue remains an enduring beacon of mercy, hope, and maternal protection over the city of Sawantwadi.
              </p>
            </div>

            <div className="pt-4 border-t border-stone/10 grid grid-cols-2 gap-8 text-xs text-stone">
              <div>
                <span className="text-[11px] uppercase tracking-wider text-muted block">
                  Heritage Provenance
                </span>
                <span className="font-serif text-lg text-ivory mt-1 block">
                  1652 Foundation
                </span>
              </div>
              <div>
                <span className="text-[11px] uppercase tracking-wider text-muted block">
                  Solemn Re-Enthronement
                </span>
                <span className="font-serif text-lg text-ivory mt-1 block">
                  May 7, 2026
                </span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
