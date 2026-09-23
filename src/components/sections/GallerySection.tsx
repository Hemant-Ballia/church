"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";
import { Lightbox } from "@/components/gallery/Lightbox";
import { galleryItems } from "@/data/gallery";
import { registerGSAP, gsap } from "@/animations/gsapInit";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function GallerySection() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  const handleOpenLightbox = (index: number) => {
    setActiveIndex(index);
    setLightboxOpen(true);
  };

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
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  const previewItems = galleryItems.slice(0, 5);

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="py-24 sm:py-32 bg-[#111111] text-ivory relative border-b border-stone/10 overflow-hidden"
    >
      <Container size="default">
        {/* Header */}
        <div
          ref={headerRef}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 sm:mb-20"
        >
          <div className="max-w-2xl space-y-4">
            <SectionLabel label="Visual Archive" />
            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-light text-ivory tracking-tight leading-[1.12]">
              SANCTUARY &amp; PERSPECTIVE
            </h2>
          </div>
          <Button href="/gallery" withArrow>
            View Complete Gallery
          </Button>
        </div>

        {/* Editorial Asymmetric Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8">
          {/* Item 0: Large Hero Grid Element */}
          <div
            onClick={() => handleOpenLightbox(0)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleOpenLightbox(0);
              }
            }}
            className="md:col-span-8 relative aspect-[16/10] overflow-hidden bg-surface group cursor-pointer focus:outline-none focus:ring-1 focus:ring-gold"
          >
            <Image
              src={previewItems[0].src}
              alt={previewItems[0].alt}
              fill
              sizes="(max-width: 768px) 100vw, 65vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-75 group-hover:opacity-90 transition-opacity" />
            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
              <div>
                <span className="text-xs uppercase tracking-widest text-gold font-medium block">
                  {previewItems[0].category}
                </span>
                <h3 className="font-serif text-xl sm:text-2xl text-ivory mt-1">
                  {previewItems[0].title}
                </h3>
              </div>
              <div className="w-9 h-9 rounded-full border border-stone/30 flex items-center justify-center text-stone group-hover:border-gold group-hover:text-gold transition-colors">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Item 1: Vertical Portrait Alongside */}
          <div
            onClick={() => handleOpenLightbox(2)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleOpenLightbox(2);
              }
            }}
            className="md:col-span-4 relative aspect-[3/4] md:aspect-auto overflow-hidden bg-surface group cursor-pointer focus:outline-none focus:ring-1 focus:ring-gold"
          >
            <Image
              src={previewItems[2].src}
              alt={previewItems[2].alt}
              fill
              sizes="(max-width: 768px) 100vw, 35vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-75 group-hover:opacity-90 transition-opacity" />
            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
              <div>
                <span className="text-xs uppercase tracking-widest text-gold font-medium block">
                  {previewItems[2].category}
                </span>
                <h3 className="font-serif text-lg sm:text-xl text-ivory mt-1">
                  {previewItems[2].title}
                </h3>
              </div>
              <div className="w-9 h-9 rounded-full border border-stone/30 flex items-center justify-center text-stone group-hover:border-gold group-hover:text-gold transition-colors">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Lower Row: 3 Equal Editorial Cards */}
          <div
            onClick={() => handleOpenLightbox(1)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleOpenLightbox(1);
              }
            }}
            className="md:col-span-4 relative aspect-[4/3] overflow-hidden bg-surface group cursor-pointer focus:outline-none focus:ring-1 focus:ring-gold"
          >
            <Image
              src={previewItems[1].src}
              alt={previewItems[1].alt}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-75 group-hover:opacity-90 transition-opacity" />
            <div className="absolute bottom-5 left-5 right-5">
              <span className="text-xs uppercase tracking-widest text-gold font-medium block">
                {previewItems[1].category}
              </span>
              <h3 className="font-serif text-lg text-ivory mt-1">
                {previewItems[1].title}
              </h3>
            </div>
          </div>

          <div
            onClick={() => handleOpenLightbox(3)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleOpenLightbox(3);
              }
            }}
            className="md:col-span-4 relative aspect-[4/3] overflow-hidden bg-surface group cursor-pointer focus:outline-none focus:ring-1 focus:ring-gold"
          >
            <Image
              src={previewItems[3].src}
              alt={previewItems[3].alt}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-75 group-hover:opacity-90 transition-opacity" />
            <div className="absolute bottom-5 left-5 right-5">
              <span className="text-xs uppercase tracking-widest text-gold font-medium block">
                {previewItems[3].category}
              </span>
              <h3 className="font-serif text-lg text-ivory mt-1">
                {previewItems[3].title}
              </h3>
            </div>
          </div>

          <div
            onClick={() => handleOpenLightbox(4)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleOpenLightbox(4);
              }
            }}
            className="md:col-span-4 relative aspect-[4/3] overflow-hidden bg-surface group cursor-pointer focus:outline-none focus:ring-1 focus:ring-gold"
          >
            <Image
              src={previewItems[4].src}
              alt={previewItems[4].alt}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-75 group-hover:opacity-90 transition-opacity" />
            <div className="absolute bottom-5 left-5 right-5">
              <span className="text-xs uppercase tracking-widest text-gold font-medium block">
                {previewItems[4].category}
              </span>
              <h3 className="font-serif text-lg text-ivory mt-1">
                {previewItems[4].title}
              </h3>
            </div>
          </div>
        </div>
      </Container>

      {/* Lightbox Dialog */}
      <Lightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        items={galleryItems}
        currentIndex={activeIndex}
        onSelectIndex={setActiveIndex}
      />
    </section>
  );
}
