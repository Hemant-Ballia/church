import { Hero } from "@/components/hero/Hero";
import { IntroStatement } from "@/components/sections/IntroStatement";
import { AboutSection } from "@/components/sections/AboutSection";
import { HeritageSection } from "@/components/sections/HeritageSection";
import { DedicationSection } from "@/components/sections/DedicationSection";
import { ArchitectureSection } from "@/components/sections/ArchitectureSection";
import { StatueSection } from "@/components/sections/StatueSection";
import { GallerySection } from "@/components/sections/GallerySection";
import { ParishSection } from "@/components/sections/ParishSection";
import { VisitSection } from "@/components/sections/VisitSection";
import { DonationSection } from "@/components/sections/DonationSection";

export default function HomePage() {
  return (
    <main className="relative flex flex-col w-full bg-obsidian">
      {/* Hero */}
      <Hero />

      {/* Reverent Intro Statement */}
      <IntroStatement />

      {/* About Milagris Cathedral */}
      <AboutSection />

      {/* Heritage & Historical Continuity */}
      <HeritageSection />

      {/* Dedication & Consecration */}
      <DedicationSection />

      {/* Architecture & Sacred Craftsmanship */}
      <ArchitectureSection />

      {/* Our Lady of Miracles (Patroness) */}
      <StatueSection />

      {/* Visual Archive Gallery */}
      <GallerySection />

      {/* Parish & Diocesan Communion */}
      <ParishSection />

      {/* Pilgrim & Visitor Information */}
      <VisitSection />

      {/* Support Our Mission / Stewardship */}
      <DonationSection />
    </main>
  );
}
