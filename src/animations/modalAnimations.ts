"use client";

import { gsap, registerGSAP } from "./gsapInit";

export function animateModalOpen(backdrop: HTMLElement | null, content: HTMLElement | null) {
  registerGSAP();
  if (!backdrop || !content) return;

  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  tl.fromTo(backdrop, { opacity: 0 }, { opacity: 1, duration: 0.4 })
    .fromTo(
      content,
      { opacity: 0, scale: 0.96, y: 15 },
      { opacity: 1, scale: 1, y: 0, duration: 0.5 },
      "-=0.2"
    );

  return tl;
}

export function animateModalClose(
  backdrop: HTMLElement | null,
  content: HTMLElement | null,
  onComplete: () => void
) {
  registerGSAP();
  if (!backdrop || !content) {
    onComplete();
    return;
  }

  const tl = gsap.timeline({
    defaults: { ease: "power2.in" },
    onComplete,
  });

  tl.to(content, { opacity: 0, scale: 0.97, y: 10, duration: 0.25 })
    .to(backdrop, { opacity: 0, duration: 0.3 }, "-=0.15");

  return tl;
}
