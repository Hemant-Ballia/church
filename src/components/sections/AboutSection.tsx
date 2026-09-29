"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";
import { registerGSAP, gsap } from "@/animations/gsapInit";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imgMainRef = useRef<HTMLDivElement>(null);
  const imgOverlapRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    registerGSAP();

    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (imgMainRef.current) {
        gsap.fromTo(
          imgMainRef.current,
          { clipPath: "inset(0 0 100% 0)", scale: 1.04 },
          {
            clipPath: "inset(0 0 0% 0)",
            scale: 1,
            duration: 1.2,
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: imgMainRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      if (imgOverlapRef.current) {
        gsap.fromTo(
          imgOverlapRef.current,
          { y: 25, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.0,
            delay: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: imgOverlapRef.current,
              start: "top 85%",
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
      id="about"
      ref={sectionRef}
      className="py-24 sm:py-32 bg-[#111111] text-ivory relative border-b border-stone/10 overflow-hidden"
    >
      <Container size="default">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Visual Composition with Elegant Overlap */}
          <div className="lg:col-span-6 relative order-2 lg:order-1">
            <div
              ref={imgMainRef}
              className="relative w-full aspect-[4/3] overflow-hidden bg-surface will-change-transform"
            >
              <Image
                src="/images/cathedral/interior-nave-view.jpg"
                alt="Interior nave of Milagris Cathedral looking toward the sanctuary"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>

            {/* Overlapping Detail Image */}
            <div
              ref={imgOverlapRef}
              className="relative sm:absolute sm:-bottom-10 sm:-right-8 w-full sm:w-3/5 aspect-[4/3] mt-6 sm:mt-0 overflow-hidden border border-stone/20 bg-surface will-change-transform"
            >
              <Image
                src="/images/architecture/facade-detail.jpg"
                alt="Detail of carved stone portal and Latin inscription"
                fill
                sizes="(max-width: 640px) 100vw, 30vw"
                className="object-cover"
              />
            </div>
          </div>

          {/* Right Column: Editorial Narrative */}
          <div
            ref={contentRef}
            className="lg:col-span-6 order-1 lg:order-2 space-y-6 will-change-transform"
          >
            <SectionLabel label="About Milagris" />

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light leading-[1.1] text-ivory tracking-tight">
              A place where <br />
              <span className="text-gold italic font-normal">faith meets</span>{" "}
              architecture.
            </h2>

            <div className="space-y-4 text-stone font-light text-sm sm:text-base leading-relaxed">
              <p>
                Milagris Cathedral, situated on Milagris Church Road in Salaiwada, Sawantwadi, is dedicated to Our Lady of Miracles. As the episcopal seat of the Roman Catholic Diocese of Sindhudurg, it stands as the mother church and sanctuary of solace for thousands of parishioners and pilgrims throughout coastal Maharashtra.
              </p>
              <p>
                Following an ambitious and respectful three-year architectural reconstruction, the cathedral has been renewed to elevate its spiritual dignity. The modern structure combines traditional stone arches, acoustic vaulted ceilings, and reverently illuminated sanctuaries, offering an inspiring home for Roman-Rite liturgy.
              </p>
              <p>
                Its enduring presence honors the historical roots established in the region since 1652, continuing as a testament to prayer, communal solidarity, and Christian heritage.
              </p>
            </div>

            <div className="pt-2">
              <Button href="/about" withArrow>
                Read Cathedral Chronicle
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
