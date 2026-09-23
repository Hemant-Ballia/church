import React from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";
import { heritageTimeline } from "@/data/timeline";

export const metadata = {
  title: "Heritage | Milagris Cathedral, Sawantwadi",
  description:
    "Explore the sacred history of Milagris Cathedral from its 1652 roots to its solemn 2026 consecration in Sawantwadi, Maharashtra.",
};

export default function HeritagePage() {
  return (
    <main className="bg-obsidian text-ivory">
      {/* Inner Page Hero */}
      <section className="relative min-h-[60vh] sm:min-h-[70vh] flex items-end pb-16 pt-36 bg-[#0e0e0e] overflow-hidden border-b border-stone/10">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/cathedral/dedication-celebration.jpg"
            alt="Solemn dedication of Milagris Cathedral"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-[#0e0e0e]/75 to-transparent" />
        </div>

        <Container size="default" className="relative z-10">
          <SectionLabel label="Historical Archive" className="mb-4" />
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light text-ivory leading-tight">
            HERITAGE & <br />
            <span className="text-gold italic font-normal">CHRONICLE</span>
          </h1>
          <p className="mt-4 text-stone text-base sm:text-lg max-w-2xl font-light">
            A centuries-old journey of faith, preservation, and rebirth in the Konkan landscape.
          </p>
        </Container>
      </section>

      {/* Comprehensive Timeline */}
      <section className="py-24 sm:py-32 bg-[#121212] border-b border-stone/10">
        <Container size="default">
          <div className="max-w-4xl mx-auto space-y-20">
            {heritageTimeline.map((item) => (
              <div
                key={item.year}
                className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-16 border-b border-stone/10 last:border-0 items-baseline"
              >
                <div className="md:col-span-4">
                  <div className="font-serif text-3xl sm:text-4xl text-ivory">
                    {item.year}
                  </div>
                  <div className="text-xs uppercase tracking-[0.2em] text-gold mt-2">
                    {item.tagline}
                  </div>
                </div>

                <div className="md:col-span-8 space-y-4">
                  <h3 className="font-serif text-2xl text-stone-light font-normal">
                    {item.title}
                  </h3>
                  <p className="text-stone text-base font-light leading-relaxed">
                    {item.description}
                  </p>
                  {item.highlight && (
                    <div className="pt-2">
                      <span className="text-xs text-gold/90 font-light tracking-wide">
                        — {item.highlight}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Preservation & Consecration Note */}
      <section className="py-20 bg-[#161616] text-center border-b border-stone/10">
        <Container size="narrow" className="space-y-6">
          <SectionLabel label="Liturgical Memory" className="justify-center" />
          <h2 className="font-serif text-3xl sm:text-4xl text-ivory font-light">
            Documenting the Dedication of May 9, 2026
          </h2>
          <p className="text-stone text-base font-light max-w-xl mx-auto leading-relaxed">
            The historic solemn dedication ceremony represented the culmination of a community-wide renewal, uniting bishops, priests, religious, and thousands of parishioners in gratitude.
          </p>
          <div className="pt-4">
            <Button href="/gallery" withArrow>
              Explore Consecration Imagery
            </Button>
          </div>
        </Container>
      </section>
    </main>
  );
}
