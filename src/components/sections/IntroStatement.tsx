"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
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
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      tl.fromTo(
        ".intro-label",
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" }
      )
      .fromTo(
        headingRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" },
        "-=0.4"
      )
      .fromTo(
        textRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" },
        "-=0.8"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      id="intro-statement"
      ref={sectionRef}
      className="py-24 sm:py-36 bg-[#0c0c0c] text-ivory relative border-b border-stone/10 overflow-hidden"
    >
      <Container size="default">
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12 lg:gap-20">
            {/* Image Column */}
            <div className="w-full lg:w-5/12 intro-label relative">
              <div className="aspect-[4/5] relative border border-stone/15 overflow-hidden">
                <Image 
                  src="/images/cathedral/stone-cross.jpg"
                  alt="Ancient stone cross carving at Milagris Cathedral"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-1000 ease-in-out"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>
            </div>
            
            {/* Text Column */}
            <div className="w-full lg:w-7/12 flex flex-col justify-center pt-4 lg:pt-12">
              <span className="text-xs tracking-[0.2em] uppercase text-gold font-medium border-b border-stone/20 pb-4 mb-8 inline-block w-full sm:w-auto">
                Mother Church of Sindhudurg
              </span>
              
              <h2
                ref={headingRef}
                className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-ivory leading-[1.2] tracking-tight mb-8 will-change-transform"
              >
                A historic landmark of <span className="text-stone-300 italic">Konkan heritage</span>, standing as the spiritual center for the Catholic faithful of Sawantwadi.
              </h2>
              
              <p
                ref={textRef}
                className="text-stone text-base sm:text-lg font-light leading-relaxed max-w-xl"
              >
                Originally established in 1652, the Cathedral of Our Lady of Miracles represents centuries of local devotion. Recently reconstructed and solemnly consecrated in 2026, the cathedral blends traditional stone masonry with modern architectural grace to serve the community for generations to come.
              </p>
            </div>
          </div>
      </Container>
    </section>
  );
}
