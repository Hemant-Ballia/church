"use client";

import { gsap, registerGSAP } from "./gsapInit";

interface HeroAnimationElements {
  container: HTMLElement | null;
  image: HTMLElement | null;
  overlay: HTMLElement | null;
  eyebrow: HTMLElement | null;
  headingLines: (HTMLElement | null)[];
  description: HTMLElement | null;
  ctas: HTMLElement | null;
  scrollIndicator: HTMLElement | null;
}

export function animateHero({
  container,
  image,
  overlay,
  eyebrow,
  headingLines,
  description,
  ctas,
  scrollIndicator,
}: HeroAnimationElements) {
  registerGSAP();

  if (!container) return null;

  const validHeadings = headingLines.filter(Boolean);

  const tl = gsap.timeline({
    defaults: { ease: "power3.out" },
  });

  if (image) {
    gsap.set(image, {
      opacity: 0,
      scale: 1.04,
    });
  }

  if (overlay) {
    gsap.set(overlay, { opacity: 0.8 });
  }

  if (eyebrow) {
    gsap.set(eyebrow, { opacity: 0, y: 20 });
  }

  if (validHeadings.length > 0) {
    gsap.set(validHeadings, { opacity: 0, y: 30 });
  }

  if (description) {
    gsap.set(description, { opacity: 0, y: 20 });
  }

  if (ctas) {
    gsap.set(ctas, { opacity: 0, y: 20 });
  }

  if (scrollIndicator) {
    gsap.set(scrollIndicator, { opacity: 0, y: -10 });
  }

  // Cinematic timeline sequence
  if (image) {
    tl.to(
      image,
      {
        opacity: 1,
        scale: 1,
        duration: 1.4,
        ease: "power2.out",
      },
      0.1
    );
  }

  // 0.6s: eyebrow reveal
  if (eyebrow) {
    tl.to(
      eyebrow,
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
      },
      0.6
    );
  }

  // 0.8s: heading line stagger
  if (validHeadings.length > 0) {
    tl.to(
      validHeadings,
      {
        opacity: 1,
        y: 0,
        duration: 1.0,
        stagger: 0.15,
        ease: "power3.out",
      },
      0.8
    );
  }

  // 1.2s: description reveal
  if (description) {
    tl.to(
      description,
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
      },
      1.1
    );
  }

  // 1.4s: CTA reveal
  if (ctas) {
    tl.to(
      ctas,
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
      },
      1.3
    );
  }

  // 1.8s: scroll indicator appears
  if (scrollIndicator) {
    tl.to(
      scrollIndicator,
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
      },
      1.7
    );
  }

  return tl;
}
