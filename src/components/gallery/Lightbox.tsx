"use client";

import React, { useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { GalleryItem } from "@/types/site";
import { animateModalOpen, animateModalClose } from "@/animations/modalAnimations";

interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  items: GalleryItem[];
  currentIndex: number;
  onSelectIndex: (index: number) => void;
}

export function Lightbox({
  isOpen,
  onClose,
  items,
  currentIndex,
  onSelectIndex,
}: LightboxProps) {
  const backdropRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentItem = items[currentIndex];

  const handlePrev = useCallback(() => {
    onSelectIndex((currentIndex - 1 + items.length) % items.length);
  }, [currentIndex, items.length, onSelectIndex]);

  const handleNext = useCallback(() => {
    onSelectIndex((currentIndex + 1) % items.length);
  }, [currentIndex, items.length, onSelectIndex]);

  const handleClose = useCallback(() => {
    animateModalClose(backdropRef.current, containerRef.current, onClose);
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    animateModalOpen(backdropRef.current, containerRef.current);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleClose, handlePrev, handleNext]);

  if (!isOpen || !currentItem) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Image Lightbox"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10"
    >
      {/* Backdrop */}
      <div
        ref={backdropRef}
        onClick={handleClose}
        className="absolute inset-0 bg-black/95 backdrop-blur-md cursor-pointer"
      />

      {/* Main Container */}
      <div
        ref={containerRef}
        className="relative z-10 w-full max-w-6xl max-h-[92vh] flex flex-col justify-between"
      >
        {/* Top bar */}
        <div className="flex items-center justify-between py-3 text-ivory border-b border-stone/10">
          <div className="flex items-center gap-3">
            <span className="text-xs uppercase tracking-[0.25em] text-gold font-mono">
              {currentItem.category}
            </span>
            <span className="text-stone/40">•</span>
            <span className="text-xs font-mono tracking-widest text-muted">
              {currentIndex + 1} / {items.length}
            </span>
          </div>

          <button
            onClick={handleClose}
            aria-label="Close Lightbox"
            className="p-2 border border-stone/20 text-stone hover:text-gold hover:border-gold transition-colors focus:outline-none"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Center Image with Navigation arrows */}
        <div className="relative my-auto flex items-center justify-center py-4">
          {/* Previous Arrow */}
          <button
            onClick={handlePrev}
            aria-label="Previous Image"
            className="absolute left-2 sm:left-4 z-20 p-3 rounded-full bg-obsidian/80 border border-stone/20 text-stone hover:text-gold hover:border-gold transition-colors focus:outline-none"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Image Frame */}
          <div className="relative w-full h-[60vh] sm:h-[70vh] flex items-center justify-center">
            <Image
              src={currentItem.src}
              alt={currentItem.alt}
              fill
              sizes="90vw"
              className="object-contain"
              priority
            />
          </div>

          {/* Next Arrow */}
          <button
            onClick={handleNext}
            aria-label="Next Image"
            className="absolute right-2 sm:right-4 z-20 p-3 rounded-full bg-obsidian/80 border border-stone/20 text-stone hover:text-gold hover:border-gold transition-colors focus:outline-none"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Bottom Metadata */}
        <div className="py-3 border-t border-stone/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-stone text-xs">
          <div>
            <h4 className="font-serif text-base sm:text-lg text-ivory font-normal">
              {currentItem.title}
            </h4>
            <p className="text-stone-dark font-light mt-0.5 line-clamp-1">
              {currentItem.description}
            </p>
          </div>
          {currentItem.year && (
            <span className="text-[11px] font-mono tracking-widest text-gold shrink-0">
              {currentItem.year}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
