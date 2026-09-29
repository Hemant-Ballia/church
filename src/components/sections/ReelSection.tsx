"use client";

import React, { useRef, useEffect } from "react";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { gsap, ScrollTrigger } from "@/animations/gsapInit";

export function ReelSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const imageFrameRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);



  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      // Playback position = 3 seconds
      if (video.duration >= 3) {
        video.currentTime = 3;
      }
      video.play().catch(() => {
        // Autoplay may be prevented by the browser
      });
    };

    video.addEventListener("loadedmetadata", handleLoadedMetadata);

    // If metadata is already loaded (cached)
    if (video.readyState >= 1) {
      handleLoadedMetadata();
    }

    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, []);

  useEffect(() => {
    if (!sectionRef.current || !headerRef.current || !imageFrameRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    tl.fromTo(
      headerRef.current.children,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power3.out" }
    ).fromTo(
      imageFrameRef.current,
      { opacity: 0, y: 30, scale: 0.98 },
      { opacity: 1, y: 0, scale: 1, duration: 1.0, ease: "power2.out" },
      "-=0.4"
    );
  }, []);

  return (
    <section ref={sectionRef} className="py-20 sm:py-32 bg-[#111111] border-b border-stone/10 overflow-hidden">
      <Container size="default">
        <div className="flex flex-col items-center max-w-5xl mx-auto">
          {/* Editorial Header */}
          <div ref={headerRef} className="text-center mb-12 sm:mb-16">
            <SectionLabel label="Visual Archive" className="mb-4" />
            <h2 className="font-serif text-3xl sm:text-5xl font-light text-ivory tracking-tight mb-4">
              A Living Heritage
            </h2>
            <p className="text-stone font-light text-base sm:text-lg max-w-2xl mx-auto">
              Witness the enduring grace of Milagris Cathedral, capturing moments of faith and architectural majesty.
            </p>
          </div>

          {/* Image Container (Landscape) */}
          <div ref={imageFrameRef} className="w-full max-w-2xl sm:max-w-4xl md:max-w-6xl lg:max-w-7xl mx-auto opacity-0 px-4 sm:px-6">
            <div 
              ref={containerRef}
              className="relative w-full aspect-video md:aspect-[21/9] lg:aspect-video bg-[#0e0e0e] flex items-center justify-center overflow-hidden border border-stone/15 rounded-sm"
            >
              <video
                ref={videoRef}
                src="/videos/heritage-reel.mp4"
                poster="/images/cathedral/interior-nave-view.jpg"
                muted
                playsInline
                loop
                className="absolute inset-0 w-full h-full object-cover"
                aria-label="Milagris Cathedral Heritage Reel"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
