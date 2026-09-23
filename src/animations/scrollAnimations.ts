"use client";

import { gsap, registerGSAP } from "./gsapInit";

/**
 * Reveal section elements on scroll entry
 */
export function revealOnScroll(element: HTMLElement | null, delay = 0) {
  registerGSAP();
  if (!element) return;

  return gsap.fromTo(
    element,
    {
      opacity: 0,
      y: 40,
    },
    {
      opacity: 1,
      y: 0,
      duration: 1.1,
      delay,
      ease: "power3.out",
      scrollTrigger: {
        trigger: element,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    }
  );
}

/**
 * Reveal editorial text lines with stagger
 */
export function revealStaggerLines(
  elements: (HTMLElement | null)[],
  triggerElement: HTMLElement | null,
  stagger = 0.12
) {
  registerGSAP();
  const validElements = elements.filter(Boolean);
  if (validElements.length === 0 || !triggerElement) return;

  return gsap.fromTo(
    validElements,
    {
      opacity: 0,
      y: 35,
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.9,
      stagger,
      ease: "power3.out",
      scrollTrigger: {
        trigger: triggerElement,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    }
  );
}

/**
 * Smooth clip-path reveal for architectural imagery
 */
export function revealImageClip(
  imageElement: HTMLElement | null,
  triggerElement?: HTMLElement | null
) {
  registerGSAP();
  if (!imageElement) return;

  const trigger = triggerElement || imageElement;

  return gsap.fromTo(
    imageElement,
    {
      clipPath: "inset(0 0 100% 0)",
      scale: 1.06,
    },
    {
      clipPath: "inset(0 0 0% 0)",
      scale: 1,
      duration: 1.4,
      ease: "power2.inOut",
      scrollTrigger: {
        trigger,
        start: "top 82%",
        toggleActions: "play none none none",
      },
    }
  );
}

/**
 * Subtle vertical parallax effect on scroll
 */
export function parallaxElement(element: HTMLElement | null, yPercentMovement = 12) {
  registerGSAP();
  if (!element) return;

  return gsap.to(element, {
    yPercent: yPercentMovement,
    ease: "none",
    scrollTrigger: {
      trigger: element,
      start: "top bottom",
      end: "bottom top",
      scrub: 1.2,
    },
  });
}

/**
 * Draw animated vertical timeline or decorative line
 */
export function drawVerticalLine(lineElement: HTMLElement | null) {
  registerGSAP();
  if (!lineElement) return;

  return gsap.fromTo(
    lineElement,
    { scaleY: 0, transformOrigin: "top center" },
    {
      scaleY: 1,
      ease: "none",
      scrollTrigger: {
        trigger: lineElement,
        start: "top 75%",
        end: "bottom 60%",
        scrub: true,
      },
    }
  );
}
