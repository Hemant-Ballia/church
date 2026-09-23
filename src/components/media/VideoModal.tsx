"use client";

import React, { useEffect, useRef, useCallback } from "react";
import { X } from "lucide-react";
import { animateModalOpen, animateModalClose } from "@/animations/modalAnimations";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  youtubeId?: string;
}

export function VideoModal({ isOpen, onClose, title, youtubeId }: VideoModalProps) {
  const backdropRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleClose = useCallback(() => {
    animateModalClose(backdropRef.current, contentRef.current, onClose);
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) return;

    // Body scroll lock
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // ESC key handler
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    animateModalOpen(backdropRef.current, contentRef.current);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10"
    >
      {/* Dark backdrop */}
      <div
        ref={backdropRef}
        onClick={handleClose}
        className="absolute inset-0 bg-black/92 backdrop-blur-md cursor-pointer"
      />

      {/* Modal Container */}
      <div
        ref={contentRef}
        className="relative z-10 w-full max-w-5xl bg-[#111111] border border-stone/20 shadow-2xl overflow-hidden"
      >
        {/* Top Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-stone/10 bg-[#0d0d0d]">
          <div>
            <div className="text-[10px] uppercase tracking-[0.25em] text-gold font-medium">
              Solemn Consecration Document
            </div>
            <h3 className="font-serif text-lg sm:text-xl text-ivory line-clamp-1">
              {title}
            </h3>
          </div>

          <button
            onClick={handleClose}
            aria-label="Close video player"
            className="p-2 border border-stone/20 text-stone hover:text-gold hover:border-gold transition-colors focus:outline-none"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player Area */}
        <div className="relative aspect-video w-full bg-black">
          {youtubeId ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full border-0"
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center p-6 text-stone">
              <p className="text-sm">Video stream recording available through Catholic media coverage.</p>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="p-4 sm:p-5 bg-[#0e0e0e] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone border-t border-stone/10">
          <span>Solemn Eucharistic Liturgy • May 9, 2026</span>
          <span className="text-[11px] text-muted uppercase tracking-widest">
            Diocese of Sindhudurg & TFRCC TV
          </span>
        </div>
      </div>
    </div>
  );
}
