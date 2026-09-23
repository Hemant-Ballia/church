"use client";

import React, { useRef, useEffect } from "react";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { parishClergy, diocesanLeadership } from "@/data/clergy";
import { registerGSAP, gsap } from "@/animations/gsapInit";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function ParishSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
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

      if (listRef.current) {
        gsap.fromTo(
          listRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: listRef.current,
              start: "top 82%",
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
      id="parish"
      ref={sectionRef}
      className="py-24 sm:py-32 bg-[#121212] text-ivory relative border-b border-stone/10 overflow-hidden"
    >
      <Container size="default">
        {/* Section Header */}
        <div ref={headerRef} className="max-w-3xl mb-16 sm:mb-20 space-y-4">
          <SectionLabel label="Community & Pastoral Care" />
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-light text-ivory tracking-tight leading-[1.12]">
            THE PARISH
          </h2>
          <p className="text-stone text-sm sm:text-base font-light leading-relaxed max-w-xl">
            A welcoming communion of faith, prayer, and pastoral care serving the faithful across Sawantwadi and the Diocese of Sindhudurg.
          </p>
        </div>

        {/* Pure Editorial Typographic Presentation — No cards, no badges */}
        <div ref={listRef} className="space-y-16">
          {/* Parish Clergy */}
          <div>
            <div className="text-[11px] uppercase tracking-widest text-gold font-medium pb-4 border-b border-stone/15 mb-2">
              Parish Clergy
            </div>

            <div className="divide-y divide-stone/10">
              {parishClergy.map((member) => (
                <div
                  key={member.name}
                  className="py-6 sm:py-8 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 sm:gap-6 group"
                >
                  <div className="space-y-1">
                    <h3 className="font-serif text-2xl sm:text-3xl text-ivory font-light group-hover:text-gold transition-colors duration-300">
                      {member.name}
                    </h3>
                    <p className="text-stone text-sm font-light">
                      {member.role}
                    </p>
                  </div>
                  <span className="text-xs text-muted font-light sm:text-right shrink-0">
                    {member.designation}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Diocesan Episcopal Leadership */}
          <div>
            <div className="text-[11px] uppercase tracking-widest text-stone font-medium pb-4 border-b border-stone/15 mb-2">
              Diocesan Leadership
            </div>

            <div className="divide-y divide-stone/10">
              {diocesanLeadership.map((leader) => (
                <div
                  key={leader.name}
                  className="py-6 sm:py-8 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 sm:gap-6 group"
                >
                  <div className="space-y-1">
                    <h3 className="font-serif text-2xl sm:text-3xl text-ivory font-light group-hover:text-gold transition-colors duration-300">
                      {leader.name}
                    </h3>
                    <p className="text-stone text-sm font-light">
                      {leader.role}
                    </p>
                  </div>
                  <span className="text-xs text-muted font-light sm:text-right shrink-0">
                    {leader.designation}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
