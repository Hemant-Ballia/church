"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Lightbox } from "@/components/gallery/Lightbox";
import { galleryItems } from "@/data/gallery";

const categories = ["All", "Architecture", "Sanctuary", "Facade", "Sacred Art", "Heritage"] as const;

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const filteredItems =
    selectedCategory === "All"
      ? galleryItems
      : galleryItems.filter((item) => item.category === selectedCategory);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  return (
    <main className="bg-obsidian text-ivory">
      {/* Inner Page Hero */}
      <section className="relative min-h-[50vh] sm:min-h-[60vh] flex items-end pb-16 pt-36 bg-[#0e0e0e] overflow-hidden border-b border-stone/10">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero/cathedral-facade.jpg"
            alt="Milagris Cathedral exterior"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-[#0e0e0e]/80 to-transparent" />
        </div>

        <Container size="default" className="relative z-10">
          <SectionLabel label="Visual Archive" className="mb-4" />
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light text-ivory leading-tight">
            PHOTOGRAPHIC <br />
            <span className="text-gold italic font-normal">COLLECTION</span>
          </h1>
          <p className="mt-4 text-stone text-base sm:text-lg max-w-2xl font-light">
            Architectural perspectives, sanctuary craftsmanship, and moments of prayerful reverence at Milagris Cathedral.
          </p>
        </Container>
      </section>

      {/* Filter and Grid */}
      <section className="py-16 sm:py-24 bg-[#121212]">
        <Container size="default">
          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-4 pb-12 border-b border-stone/10 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 ${
                  selectedCategory === cat
                    ? "bg-gold text-obsidian font-semibold"
                    : "text-stone hover:text-ivory border border-stone/20 hover:border-stone/40"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Image Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item, idx) => (
              <div
                key={item.id}
                onClick={() => openLightbox(idx)}
                className="group relative aspect-[4/3] overflow-hidden border border-stone/15 bg-surface cursor-pointer"
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />
                <div className="absolute bottom-5 left-5 right-5">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-gold font-mono block mb-1">
                    {item.category}
                  </span>
                  <h3 className="font-serif text-lg sm:text-xl text-ivory">
                    {item.title}
                  </h3>
                  <p className="text-xs text-stone-dark mt-1 line-clamp-1 font-light">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Lightbox Dialog */}
      <Lightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        items={filteredItems}
        currentIndex={currentIndex}
        onSelectIndex={setCurrentIndex}
      />
    </main>
  );
}
