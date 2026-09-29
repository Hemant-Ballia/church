"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { VideoModal } from "@/components/media/VideoModal";
import { siteConfig } from "@/data/site";
import { registerGSAP, gsap } from "@/animations/gsapInit";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function DedicationSection() {
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const posterRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    registerGSAP();

    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
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
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      if (posterRef.current) {
        gsap.fromTo(
          posterRef.current,
          { clipPath: "inset(0 0 100% 0)", scale: 1.04 },
          {
            clipPath: "inset(0 0 0% 0)",
            scale: 1,
            duration: 1.2,
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: posterRef.current,
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
      ref={sectionRef}
      className="py-24 sm:py-32 bg-[#0e0e0e] text-ivory relative border-b border-stone/10 overflow-hidden"
    >
      <Container size="default">
        {/* Editorial Header */}
        <div ref={contentRef} className="max-w-4xl mb-12 sm:mb-16 space-y-4">
          <SectionLabel label="Solemn Consecration • May 9, 2026" />

          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-light text-ivory leading-[1.08] tracking-tight">
            Historic Solemn Dedication &amp; Consecration
          </h2>

          <p className="text-stone text-sm sm:text-base md:text-lg font-light leading-relaxed max-w-2xl">
            Concelebrated by Cardinal Filipe Neri Ferrão, Archbishop of Goa and Daman, and Cardinal Oswald Gracias, Archbishop Emeritus of Bombay, alongside Bishop Agnelo Pinheiro, celebrating the completion of the three-year cathedral reconstruction with over 3,000 faithful.
          </p>
        </div>

        {/* Cinematic Media Poster & Play Trigger */}
        <div
          ref={posterRef}
          onClick={() => setVideoModalOpen(true)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setVideoModalOpen(true);
            }
          }}
          aria-label="Watch the Consecration Mass video"
          className="group relative w-full aspect-[4/3] md:aspect-[21/9] overflow-hidden bg-surface cursor-pointer will-change-transform focus:outline-none focus:ring-1 focus:ring-gold"
        >
          <Image
            src="/images/cathedral/high-altar-ceremony.jpg"
            alt="Solemn dedication liturgy concelebrated by Cardinals and Bishops at Milagris Cathedral"
            fill
            sizes="100vw"
            className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
          />

          {/* Subtle cinematic gradient */}
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/25 transition-colors duration-500" />

          {/* Centered Play Trigger */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center p-6">
            <div className="w-16 sm:w-20 h-16 sm:h-20 rounded-full border border-gold/60 bg-obsidian/80 backdrop-blur-sm flex items-center justify-center text-gold transition-all duration-300 group-hover:scale-110 group-hover:bg-gold group-hover:text-obsidian">
              <Play className="w-6 sm:w-7 h-6 sm:h-7 fill-current ml-0.5" />
            </div>

            <span className="text-xs uppercase tracking-widest font-medium text-ivory group-hover:text-gold transition-colors">
              Watch the Consecration Mass
            </span>
          </div>
        </div>
      </Container>

      {/* Video Modal */}
      <VideoModal
        isOpen={videoModalOpen}
        onClose={() => setVideoModalOpen(false)}
        title={siteConfig.keyDedicationEvent.videoTitle}
        youtubeId={siteConfig.keyDedicationEvent.videoYoutubeId}
      />
    </section>
  );
}
