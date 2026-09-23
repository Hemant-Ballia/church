"use client";

import React, { useRef, useEffect } from "react";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { registerGSAP, gsap } from "@/animations/gsapInit";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function IntroStatement() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    registerGSAP();

    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Decorative line growth
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleX: 0, transformOrigin: "left center" },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              end: "top 40%",
              scrub: 1,
            },
          }
        );
      }

      // Heading reveal on scroll
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          { opacity: 0.15, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
              end: "top 25%",
              scrub: 1,
            },
          }
        );
      }

      // Supporting narrative fade
      if (textRef.current) {
        gsap.fromTo(
          textRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 1.0,
            ease: "power3.out",
            scrollTrigger: {
              trigger: textRef.current,
              start: "top 85%",
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
      id="intro-statement"
      ref={sectionRef}
      className="py-24 sm:py-32 bg-[#141414] text-ivory relative border-b border-stone/10"
    >
      <Container size="default">
        <div className="max-w-5xl">
          <SectionLabel label="Reverence & Heritage" className="mb-6" />

          {/* Growing decorative horizontal rule */}
          <div
            ref={lineRef}
            className="w-20 h-px bg-gold mb-8 will-change-transform"
          />

          <h2
            ref={headingRef}
            className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-ivory leading-[1.18] tracking-tight mb-12 will-change-transform"
          >
            A cathedral shaped by{" "}
            <span className="text-gold italic font-normal">faith</span>,{" "}
            community, and{" "}
            <span className="text-stone">generations of time.</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-4">
            <div className="md:col-span-4 text-xs tracking-widest uppercase text-gold font-medium">
              The Mother Church of Sindhudurg
            </div>
            <div className="md:col-span-8">
              <p
                ref={textRef}
                className="text-stone text-base sm:text-lg lg:text-xl font-light leading-relaxed max-w-2xl"
              >
                Standing peacefully along Milagris Church Road in Sawantwadi, the Cathedral of Our Lady of Miracles serves as the spiritual heart of the Roman Catholic Diocese of Sindhudurg. A sacred sanctuary where centuries of devotion and timeless Konkan architectural craftsmanship converge.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
