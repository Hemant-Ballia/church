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
      {/* Inner Page Hero */}
      <section className="relative min-h-[55vh] sm:min-h-[65vh] flex items-end pb-16 pt-36 bg-[#0e0e0e] overflow-hidden border-b border-stone/10">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/architecture/nave-interior.jpg"
            alt="Vaulted nave of Milagris Cathedral"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-[#0e0e0e]/75 to-transparent" />
        </div>

        <Container size="default" className="relative z-10">
          <SectionLabel label="Identity & Vocation" className="mb-4" />
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light text-ivory leading-tight">
            ABOUT <br />
            <span className="text-gold italic font-normal">MILAGRIS CATHEDRAL</span>
          </h1>
          <p className="mt-4 text-stone text-base sm:text-lg max-w-2xl font-light">
            The episcopal seat of the Roman Catholic Diocese of Sindhudurg, dedicated to Our Lady of Miracles in Sawantwadi, Maharashtra.
          </p>
        </Container>
      </section>

      {/* Narrative Chronicle */}
      <section className="py-20 sm:py-28 bg-[#111111] border-b border-stone/10">
        <Container size="narrow">
          <div className="space-y-12 text-stone font-light text-base sm:text-lg leading-relaxed">
            <div>
              <span className="text-xs uppercase tracking-widest text-gold font-medium block mb-3">
                Diocesan Mother Church
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-ivory font-light mb-6">
                A Sanctuary of Faith & Unity
              </h2>
              <p>
                Milagris Cathedral serves as the central mother church for the Catholic faithful of the Diocese of Sindhudurg. Nestled in the historic town of Sawantwadi on Milagris Church Road, Salaiwada, the cathedral is a focal point of prayer, charitable outreach, and spiritual solidarity.
              </p>
            </div>

            <div className="p-8 border-l-2 border-gold bg-surface/50 my-8">
              <blockquote className="font-serif text-xl sm:text-2xl text-ivory italic leading-snug">
                &ldquo;The cathedral is more than a majestic structure of stone; it is the spiritual home where God gathers His people as one family in faith.&rdquo;
              </blockquote>
              <span className="text-xs uppercase tracking-widest text-gold block mt-4">
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
