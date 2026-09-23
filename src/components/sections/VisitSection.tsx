"use client";

import React, { useRef, useEffect } from "react";
import { Phone, Clock, ArrowUpRight, Compass } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/data/site";
import { registerGSAP, gsap } from "@/animations/gsapInit";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function VisitSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    registerGSAP();

    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1.0,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      if (cardsRef.current) {
        gsap.fromTo(
          cardsRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1.0,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsRef.current,
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
      id="visit"
      ref={sectionRef}
      className="py-24 sm:py-32 md:py-40 bg-[#101010] text-ivory relative border-b border-stone/10 overflow-hidden"
    >
      <Container size="default">
        {/* Section Header */}
        <div ref={headerRef} className="max-w-3xl mb-16 sm:mb-20 space-y-6">
          <SectionLabel label="Pilgrim & Visitor Information" />
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-light text-ivory tracking-tight leading-[1.12]">
            PLAN YOUR <br />
            <span className="text-gold italic font-normal">VISIT</span>
          </h2>
          <p className="text-stone text-sm sm:text-base font-light leading-relaxed max-w-xl">
            Milagris Cathedral welcomes pilgrims, parishioners, and visitors seeking a quiet place of prayer and contemplation in Sawantwadi.
          </p>
        </div>

        {/* Practical Panels */}
        <div ref={cardsRef} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Location & Navigation Card */}
          <div className="lg:col-span-7 p-8 sm:p-12 border border-stone/15 bg-surface/60 flex flex-col justify-between space-y-8 relative">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <Compass className="w-5 h-5 text-gold" />
                <span className="text-xs uppercase tracking-widest text-gold font-medium">
                  Cathedral Location
                </span>
              </div>

              <div className="space-y-3">
                <h3 className="font-serif text-2xl sm:text-3xl text-ivory font-normal">
                  Milagris Cathedral
                </h3>
                <p className="text-stone font-light text-base sm:text-lg leading-relaxed">
                  Milagris Church Rd, Salaiwada,
                  <br />
                  Sawantwadi, Maharashtra 416510, India
                </p>
              </div>

              <div className="pt-2 flex items-center gap-3 text-stone text-sm">
                <Phone className="w-4 h-4 text-gold shrink-0" />
                <span>Parish Office: {siteConfig.location.phone}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-6 border-t border-stone/10 flex flex-wrap items-center gap-4">
              <Button
                variant="primary"
                href={siteConfig.location.googleMapsUrl}
                isExternal
                withArrow
              >
                Open in Google Maps
              </Button>
              <Button
                variant="outline"
                href={`https://www.google.com/maps/dir/?api=1&destination=Milagris+Cathedral+Sawantwadi+Maharashtra`}
                isExternal
                withArrow
              >
                Get Directions
              </Button>
            </div>
          </div>

          {/* Mass Schedule & Liturgy Advisory Card */}
          <div className="lg:col-span-5 p-8 sm:p-12 border border-gold/30 bg-surface/40 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-gold" />
                <span className="text-xs uppercase tracking-widest text-gold font-medium">
                  Liturgical Schedule
                </span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl text-ivory font-normal">
                Service Times
              </h3>

              {/* Verified Editorial Notice */}
              <div className="p-5 border border-stone/15 bg-obsidian/70 space-y-3">
                <p className="text-stone text-sm leading-relaxed">
                  Daily Mass, Sunday Eucharistic Celebrations, and special feast day services are observed according to the Roman Rite calendar.
                </p>
                <p className="text-gold text-xs font-mono tracking-wide uppercase">
                  Please contact the parish office for the current liturgical schedule and confession hours.
                </p>
              </div>

              <div className="text-xs text-muted font-light">
                For wedding blessings, sacramental inquiries, or mass intentions, please visit the parish office during weekday hours.
              </div>
            </div>

            <div className="pt-4 border-t border-stone/10">
              <a
                href={`tel:${siteConfig.location.phone}`}
                className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-gold hover:text-ivory transition-colors group"
              >
                <span>Call Parish Office: {siteConfig.location.phone}</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
