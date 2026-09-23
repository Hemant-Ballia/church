"use client";

import { useEffect, useState, useRef } from "react";

export function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState<"up" | "down" | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const lastScrollYRef = useRef(0);

  useEffect(() => {
    lastScrollYRef.current = window.scrollY;

    const updateScrollDirection = () => {
      const scrollY = window.scrollY;
      const lastScrollY = lastScrollYRef.current;
      const diff = scrollY - lastScrollY;

      if (Math.abs(diff) > 8) {
        setScrollDirection(diff > 0 ? "down" : "up");
        lastScrollYRef.current = scrollY > 0 ? scrollY : 0;
      }

      setIsScrolled(scrollY > 40);
    };

    window.addEventListener("scroll", updateScrollDirection, { passive: true });
    return () => window.removeEventListener("scroll", updateScrollDirection);
  }, []);

  return { scrollDirection, isScrolled };
}
