import React from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";
import { parishClergy, diocesanLeadership } from "@/data/clergy";

export const metadata = {
  title: "About | Milagris Cathedral, Sawantwadi",
  description:
    "Learn about the sacred identity, history, and mission of Milagris Cathedral, the seat of the Roman Catholic Diocese of Sindhudurg.",
};

export default function AboutPage() {
  return (
    <main className="bg-obsidian text-ivory">
      {/* Cinematic Editorial Header */}
      <section className="relative pt-32 pb-12 sm:pt-48 sm:pb-20 overflow-hidden">
        <Container size="default" className="relative z-10">
          <div className="max-w-4xl space-y-6">
            <SectionLabel label="Our History & Identity" className="text-gold" />
            <h1 className="font-serif text-5xl sm:text-6xl md:text-8xl font-light text-ivory leading-[1.05] tracking-tight">
              A Legacy of <br className="hidden sm:block" />
              <span className="italic text-stone-300">Faith & Grace</span>
            </h1>
            <p className="text-stone text-lg sm:text-xl font-light leading-relaxed max-w-2xl pt-4">
              Explore the sacred identity, history, and mission of Milagris Cathedral, the historic seat of the Roman Catholic Diocese of Sindhudurg.
            </p>
          </div>
        </Container>
      </section>

      {/* Standalone Clear Image - Full Bleed on Mobile, Framed on Desktop */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 pb-20 sm:pb-28">
        <div className="relative w-full aspect-[4/3] md:aspect-video bg-[#0e0e0e] border border-stone/15 overflow-hidden">
          <Image
            src="/images/cathedral/interior-nave-view.jpg"
            alt="Interior nave of Milagris Cathedral"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 90vw"
            className="object-cover"
          />
        </div>
      </section>

      {/* Narrative Chronicle */}
      <section className="py-24 sm:py-32 bg-[#0a0a0a] border-y border-stone/10">
        <Container size="narrow">
          <div className="space-y-16 text-stone font-light text-lg sm:text-xl leading-relaxed">
            <div className="space-y-6">
              <span className="text-xs uppercase tracking-[0.2em] text-gold font-medium block">
                Diocesan Mother Church
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl text-ivory font-light leading-snug">
                A Sanctuary of Faith & Unity
              </h2>
              <p>
                Milagris Cathedral serves as the central mother church for the Catholic faithful of the Diocese of Sindhudurg. Nestled in the historic town of Sawantwadi on Milagris Church Road, Salaiwada, the cathedral is a focal point of prayer, charitable outreach, and spiritual solidarity.
              </p>
            </div>

            <div className="py-10 px-8 sm:px-12 border border-gold/20 bg-gold/5 my-12 text-center">
              <blockquote className="font-serif text-2xl sm:text-3xl text-ivory italic leading-relaxed">
                &ldquo;The cathedral is more than a majestic structure of stone; it is the spiritual home where God gathers His people as one family in faith.&rdquo;
              </blockquote>
              <span className="text-xs uppercase tracking-[0.2em] text-gold block mt-6 font-medium">
                From the Solemn Consecration Rite • May 2026
              </span>
            </div>

            <div>
              <span className="text-xs uppercase tracking-widest text-gold font-medium block mb-3">
                Architectural Renewal
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-ivory font-light mb-4">
                Honoring the Sacred through Craftsmanship
              </h3>
              <p>
                The newly reconstructed cathedral is the fruit of three years of dedicated labor and prayer led under the guidance of Bishop Emeritus Alwyn Barreto and continued with Bishop Agnelo Pinheiro. The architecture reflects the historic Konkan-Portuguese ethos, featuring arched belfries, natural stone masonry, high clerestory illumination, and an acoustically refined vaulted ceiling.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Clergy & Leadership Presentation */}
      <section className="py-20 sm:py-28 bg-[#141414] border-b border-stone/10">
        <Container size="default">
          <div className="max-w-2xl mb-12">
            <SectionLabel label="Parish Governance" className="mb-4" />
            <h2 className="font-serif text-3xl sm:text-5xl font-light text-ivory">
              Clergy &amp; Leadership
            </h2>
          </div>

          <div className="space-y-12">
            <div>
              <div className="text-xs uppercase tracking-widest text-gold font-medium pb-4 border-b border-stone/15 mb-2">
                Parish Priests & Staff
              </div>
              <div className="divide-y divide-stone/10">
                {parishClergy.map((member) => (
                  <div
                    key={member.name}
                    className="py-6 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 group"
                  >
                    <div>
                      <h3 className="font-serif text-2xl text-ivory font-light group-hover:text-gold transition-colors duration-300">
                        {member.name}
                      </h3>
                      <p className="text-stone text-sm font-light mt-1">
                        {member.role}
                      </p>
                    </div>
                    <span className="text-xs text-muted font-light sm:text-right">
                      {member.designation}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="text-xs uppercase tracking-widest text-stone font-medium pb-4 border-b border-stone/15 mb-2">
                Diocesan Leadership
              </div>
              <div className="divide-y divide-stone/10">
                {diocesanLeadership.map((leader) => (
                  <div
                    key={leader.name}
                    className="py-6 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 group"
                  >
                    <div>
                      <h3 className="font-serif text-2xl text-ivory font-light group-hover:text-gold transition-colors duration-300">
                        {leader.name}
                      </h3>
                      <p className="text-stone text-sm font-light mt-1">
                        {leader.role}
                      </p>
                    </div>
                    <span className="text-xs text-muted font-light sm:text-right">
                      {leader.designation}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-[#0f0f0f] text-center">
        <Container size="narrow" className="space-y-6">
          <h2 className="font-serif text-2xl sm:text-3xl text-ivory font-light">
            Experience Milagris Cathedral in Person
          </h2>
          <Button href="/visit" withArrow>
            Plan Your Pilgrimage
          </Button>
        </Container>
      </section>
    </main>
  );
}
