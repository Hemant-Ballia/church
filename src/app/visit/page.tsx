import React from "react";
import Image from "next/image";
import { MapPin, Phone, Clock, Compass, ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";
import { DonationSection } from "@/components/sections/DonationSection";
import { siteConfig } from "@/data/site";

export const metadata = {
  title: "Visit & Liturgy | Milagris Cathedral, Sawantwadi",
  description:
    "Plan your visit to Milagris Cathedral in Sawantwadi, Maharashtra. Find location details, Google Maps directions, service schedule advisory, and parish contact information.",
};

export default function VisitPage() {
  return (
    <main className="bg-obsidian text-ivory">
      {/* Inner Page Hero */}
      <section className="relative min-h-[50vh] sm:min-h-[60vh] flex items-end pb-16 pt-36 bg-[#0e0e0e] overflow-hidden border-b border-stone/10">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/gallery/cathedral-exterior.jpg"
            alt="Milagris Cathedral exterior grounds"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-[#0e0e0e]/80 to-transparent" />
        </div>

        <Container size="default" className="relative z-10">
          <SectionLabel label="Pilgrim & Visitor Guide" className="mb-4" />
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light text-ivory leading-tight">
            PLAN YOUR <br />
            <span className="text-gold italic font-normal">PILGRIMAGE</span>
          </h1>
          <p className="mt-4 text-stone text-base sm:text-lg max-w-2xl font-light">
            Essential visitor directions, parish contact, and liturgical schedule guidance for Milagris Cathedral in Sawantwadi.
          </p>
        </Container>
      </section>

      {/* Practical Guide & Cards */}
      <section className="py-20 sm:py-28 bg-[#121212] border-b border-stone/10">
        <Container size="default">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left: Location & Route Guide */}
            <div className="lg:col-span-6 space-y-8">
              <div className="p-8 sm:p-10 border border-stone/15 bg-surface/50 space-y-6">
                <div className="flex items-center gap-3 text-gold">
                  <Compass className="w-5 h-5" />
                  <span className="text-xs uppercase tracking-[0.25em] font-mono">
                    Cathedral Address
                  </span>
                </div>

                <h2 className="font-serif text-3xl text-ivory font-light">
                  Sawantwadi, Maharashtra
                </h2>

                <div className="space-y-4 text-stone text-sm sm:text-base font-light leading-relaxed">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-gold shrink-0 mt-1" />
                    <span>
                      Milagris Church Rd, Salaiwada,
                      <br />
                      Sawantwadi, Maharashtra 416510, India
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-gold shrink-0" />
                    <span>Telephone: {siteConfig.location.phone}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-stone/10 flex flex-wrap gap-4">
                  <Button
                    variant="primary"
                    href={siteConfig.location.googleMapsUrl}
                    isExternal
                    withArrow
                  >
                    Open in Google Maps
                  </Button>
                  <Button
                    variant="outline"
                    href="https://www.google.com/maps/dir/?api=1&destination=Milagris+Cathedral+Sawantwadi+Maharashtra"
                    isExternal
                    withArrow
                  >
                    Get Directions
                  </Button>
                </div>
              </div>

              {/* Pilgrim Etiquette */}
              <div className="p-8 border border-stone/15 bg-surface/30 space-y-4">
                <div className="flex items-center gap-3 text-gold">
                  <ShieldCheck className="w-5 h-5" />
                  <span className="text-xs uppercase tracking-widest font-medium">
                    Cathedral Etiquette
                  </span>
                </div>
                <h3 className="font-serif text-xl text-ivory">
                  Reverence &amp; Decorum
                </h3>
                <p className="text-stone text-xs sm:text-sm leading-relaxed font-light">
                  Visitors are cordially requested to maintain quiet decorum inside the sanctuary. Please ensure mobile devices are silenced and modest attire is worn during liturgical services and private prayer.
                </p>
              </div>
            </div>

            {/* Right: Service Times Advisory */}
            <div className="lg:col-span-6 space-y-8">
              <div className="p-8 sm:p-10 border border-gold/30 bg-surface/40 space-y-6">
                <div className="flex items-center gap-3 text-gold">
                  <Clock className="w-5 h-5" />
                  <span className="text-xs uppercase tracking-widest font-medium">
                    Liturgical Advisory
                  </span>
                </div>

                <h2 className="font-serif text-3xl text-ivory font-light">
                  Mass & Devotional Times
                </h2>

                <div className="p-6 border border-stone/15 bg-obsidian/80 space-y-4">
                  <p className="text-stone text-sm leading-relaxed font-light">
                    The Holy Sacrifice of the Mass is offered daily in Konkani and English according to the liturgical calendar of the Roman Catholic Diocese of Sindhudurg.
                  </p>
                  <div className="p-4 border-l-2 border-gold bg-gold/5 text-xs text-stone-light">
                    <span className="font-medium text-gold block mb-1">
                      Current Liturgical Timetable:
                    </span>
                    Liturgical service times vary by solemnities, seasons, and parish feasts. For up-to-date daily schedules, confessions, and intentions, please contact the parish office directly.
                  </div>
                </div>

                <div className="pt-2 text-xs text-muted">
                  Parish Office Hours: Monday to Saturday (Morning & Evening sessions)
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Support & Stewardship */}
      <DonationSection />
    </main>
  );
}
