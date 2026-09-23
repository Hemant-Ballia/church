"use client";

import React, { useRef, useEffect, useState } from "react";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { heritageTimeline } from "@/data/timeline";
import { registerGSAP, gsap } from "@/animations/gsapInit";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function HeritageSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  
  // Track the active milestone's year for the sticky left panel
  const [activeYear, setActiveYear] = useState(heritageTimeline[0]?.year || "");
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    registerGSAP();

    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      itemsRef.current.forEach((item, index) => {
        if (!item) return;

        // Tighter trigger area for a more precise reading experience
        gsap.to(item, {
          scrollTrigger: {
            trigger: item,
            start: "top 60%", 
            end: "bottom 40%",
            toggleActions: "play reverse play reverse",
            onEnter: () => setActiveYear(heritageTimeline[index].year),
            onEnterBack: () => setActiveYear(heritageTimeline[index].year),
            toggleClass: "active-timeline-item",
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      id="heritage"
      ref={sectionRef}
      className="py-24 sm:py-32 md:py-48 bg-[#0a0a0a] text-white border-b border-white/5"
    >
      <Container size="default">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          
          {/* LEFT SIDE: Sticky Anchor */}
          <div className="lg:col-span-5 relative">
            {/* Sticky container stays in the top 1/3rd of the viewport */}
            <div className="lg:sticky lg:top-40 flex flex-col justify-between h-full lg:h-[65vh]">
              
              {/* Context Header */}
              <div className="space-y-6">
                <SectionLabel
                  label="Timeline"
                  className="text-[#d4af37] text-xs uppercase tracking-[0.25em] font-semibold"
                />
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1]">
                  Historical <br /> Milestones
                </h2>
                <p className="text-stone-400 text-base sm:text-lg max-w-sm leading-relaxed">
                  Tracing the foundations, architectural rebuilds, and major restorations over the centuries.
                </p>
              </div>

              {/* Dynamic Active Year - Massive Editorial Scale */}
              <div className="hidden lg:block pb-10">
                <span className="text-[7rem] xl:text-[10rem] font-bold tracking-tighter text-white font-mono leading-none transition-all duration-300 ease-out select-none">
                  {activeYear}
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: Smooth Scrolling Feed */}
          <div className="lg:col-span-7">
            <div className="flex flex-col">
              {heritageTimeline.map((milestone, idx) => (
                <div
                  key={milestone.year}
                  ref={(el) => {
                    itemsRef.current[idx] = el;
                  }}
                  // Baseline inactive state + transition details
                  className="group py-20 sm:py-28 border-b border-white/10 last:border-0 
                             opacity-25 translate-y-6 blur-[1px] 
                             transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]
                             [&.active-timeline-item]:opacity-100 
                             [&.active-timeline-item]:translate-y-0 
                             [&.active-timeline-item]:blur-0"
                >
                  {/* Mobile-only Year Header (Since left panel un-sticks on mobile) */}
                  <div className="lg:hidden mb-6 flex items-center gap-4">
                    <span className="text-4xl font-bold tracking-tighter text-white">
                      {milestone.year}
                    </span>
                    <span className="h-px w-12 bg-[#d4af37]/50 block" />
                  </div>

                  {/* Content Layout */}
                  <div className="flex flex-col gap-5">
                    <span className="text-xs uppercase font-bold tracking-[0.2em] text-[#d4af37]">
                      {milestone.tagline}
                    </span>
                    
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white leading-snug tracking-tight">
                      {milestone.title}
                    </h3>
                    
                    <p className="text-stone-400 text-base sm:text-lg leading-relaxed max-w-xl">
                      {milestone.description}
                    </p>

                    {/* Minimalist Note Line */}
                    {milestone.highlight && (
                      <div className="mt-4 pt-4 border-t border-white/10">
                        <p className="text-sm text-stone-500 font-medium">
                          {milestone.highlight}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
}