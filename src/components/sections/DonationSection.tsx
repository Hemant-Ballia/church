"use client";

import React, { useState, useRef, useEffect } from "react";
import { Heart, Building2, Users, Music2, ShieldCheck, Copy, Check, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { registerGSAP, gsap } from "@/animations/gsapInit";
import { useReducedMotion } from "@/hooks/useReducedMotion";


const CAUSES = [
  {
    id: "general",
    title: "General Parish Fund",
    description: "Supports ongoing liturgical life, parish upkeep, and daily ministry.",
    icon: Heart,
  },
  {
    id: "preservation",
    title: "Cathedral Preservation & Heritage",
    description: "Dedicated care for the stone masonry, 1652 heritage statue, and sacred art.",
    icon: Building2,
  },
  {
    id: "outreach",
    title: "Community Welfare & Outreach",
    description: "Pastoral care, family assistance, medical support, and elderly relief.",
    icon: Users,
  },
  {
    id: "liturgy",
    title: "Sacred Liturgy & Music",
    description: "Choir support, altar provisions, feast day liturgical celebrations.",
    icon: Music2,
  },
];

export function DonationSection() {
  const [frequency, setFrequency] = useState<"one-time" | "monthly">("one-time");
  const [customAmount, setCustomAmount] = useState<string>("");
  const [selectedCause, setSelectedCause] = useState<string>("general");
  const [donorName, setDonorName] = useState("");
  const [donorEmail, setDonorEmail] = useState("");
  const [intentionNote, setIntentionNote] = useState("");
  const [showDirectTransfer, setShowDirectTransfer] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    registerGSAP();

    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (cardRef.current) {
        gsap.fromTo(
          cardRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1.0,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardRef.current,
              start: "top 82%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  const effectiveAmount = Number(customAmount) || 0;

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2500);
  };

  const handleDonateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (effectiveAmount <= 0) {
      alert("Please enter a valid positive donation amount.");
      return;
    }
    // Respectful transition: displays official direct parish account details and donation summary
    setShowDirectTransfer(true);
  };

  return (
    <section
      id="donate"
      ref={sectionRef}
      className="py-24 sm:py-32 md:py-40 bg-[#0e0e0e] text-ivory relative border-b border-stone/10 overflow-hidden"
    >
      <Container size="default">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20 space-y-5">
          <SectionLabel label="Support & Stewardship" className="justify-center" />
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-light text-ivory tracking-tight leading-[1.12]">
            SUPPORT THE WORK OF <br />
            <span className="text-gold italic font-normal">OUR CHURCH</span>
          </h2>
          <p className="text-stone text-sm sm:text-base md:text-lg font-light leading-relaxed max-w-2xl mx-auto">
            Your generous contributions nurture the spiritual and pastoral life of Milagris Cathedral—sustaining our historic mother church, funding community care for those in need, and preserving our sacred heritage for generations.
          </p>
        </div>

        {/* Donation Card */}
        <div
          ref={cardRef}
          className="max-w-3xl mx-auto border border-stone/15 bg-surface/40 p-6 sm:p-10 md:p-12 relative"
        >
          {!showDirectTransfer ? (
            <form onSubmit={handleDonateSubmit} className="space-y-8">
              {/* Frequency Toggle */}
              <div>
                <label className="block text-xs uppercase tracking-widest text-stone font-medium mb-3">
                  Giving Frequency
                </label>
                <div className="grid grid-cols-2 gap-3 p-1.5 bg-[#141414] border border-stone/15">
                  <button
                    type="button"
                    onClick={() => setFrequency("one-time")}
                    className={`py-3 text-xs uppercase tracking-[0.2em] font-medium transition-all ${
                      frequency === "one-time"
                        ? "bg-gold text-obsidian font-semibold shadow-sm"
                        : "text-stone hover:text-ivory"
                    }`}
                  >
                    One-Time Offering
                  </button>
                  <button
                    type="button"
                    onClick={() => setFrequency("monthly")}
                    className={`py-3 text-xs uppercase tracking-[0.2em] font-medium transition-all ${
                      frequency === "monthly"
                        ? "bg-gold text-obsidian font-semibold shadow-sm"
                        : "text-stone hover:text-ivory"
                    }`}
                  >
                    Monthly Stewardship
                  </button>
                </div>
              </div>

              {/* Amount Selection */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label htmlFor="custom-amount" className="text-xs uppercase tracking-widest text-stone font-medium">
                    Donation Amount
                  </label>
                  <span className="text-xs text-stone-dark">Indian Rupees (INR)</span>
                </div>

                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 font-serif text-xl text-gold">
                    ₹
                  </span>
                  <input
                    id="custom-amount"
                    type="number"
                    min="1"
                    step="any"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    placeholder="Enter amount"
                    className="w-full bg-[#161616] border border-gold/40 pl-10 pr-4 py-3.5 text-base text-ivory placeholder:text-muted/60 focus:border-gold focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Ministry Designation / Cause */}
              <div>
                <label className="block text-xs uppercase tracking-widest text-stone font-medium mb-3">
                  Designate Your Gift (Optional)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {CAUSES.map((cause) => {
                    const isSelected = selectedCause === cause.id;
                    const Icon = cause.icon;
                    return (
                      <div
                        key={cause.id}
                        onClick={() => setSelectedCause(cause.id)}
                        className={`p-4 border cursor-pointer transition-all ${
                          isSelected
                            ? "border-gold bg-gold/10"
                            : "border-stone/15 bg-[#141414] hover:border-stone/30"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <Icon
                            className={`w-4 h-4 shrink-0 mt-0.5 ${
                              isSelected ? "text-gold" : "text-stone-dark"
                            }`}
                          />
                          <div>
                            <div
                              className={`text-xs uppercase tracking-wide font-medium ${
                                isSelected ? "text-gold" : "text-ivory"
                              }`}
                            >
                              {cause.title}
                            </div>
                            <p className="text-xs text-stone-dark mt-1 font-light leading-snug">
                              {cause.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Donor Details for Receipt & Intention */}
              <div className="pt-4 border-t border-stone/10 space-y-4">
                <div className="text-xs uppercase tracking-widest text-stone font-medium">
                  Donor Information &amp; Prayer Intention
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="donor-name"
                      className="block text-[11px] uppercase tracking-wider text-muted mb-1.5"
                    >
                      Full Name
                    </label>
                    <input
                      id="donor-name"
                      type="text"
                      value={donorName}
                      onChange={(e) => setDonorName(e.target.value)}
                      placeholder="e.g. Francis D'Souza"
                      className="w-full bg-[#161616] border border-stone/20 px-3.5 py-2.5 text-sm text-ivory placeholder:text-muted/60 focus:border-gold focus:outline-none"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="donor-email"
                      className="block text-[11px] uppercase tracking-wider text-muted mb-1.5"
                    >
                      Email or Phone (For Receipt)
                    </label>
                    <input
                      id="donor-email"
                      type="text"
                      value={donorEmail}
                      onChange={(e) => setDonorEmail(e.target.value)}
                      placeholder="e.g. francis@example.com"
                      className="w-full bg-[#161616] border border-stone/20 px-3.5 py-2.5 text-sm text-ivory placeholder:text-muted/60 focus:border-gold focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="donor-intention"
                    className="block text-[11px] uppercase tracking-wider text-muted mb-1.5"
                  >
                    Prayer Intention / Blessing Note (Optional)
                  </label>
                  <input
                    id="donor-intention"
                    type="text"
                    value={intentionNote}
                    onChange={(e) => setIntentionNote(e.target.value)}
                    placeholder="e.g. In thanksgiving for our family, or for a deceased loved one..."
                    className="w-full bg-[#161616] border border-stone/20 px-3.5 py-2.5 text-sm text-ivory placeholder:text-muted/60 focus:border-gold focus:outline-none"
                  />
                </div>
              </div>

              {/* Primary Action Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full py-4 px-6 bg-gold text-obsidian uppercase tracking-[0.25em] text-xs font-semibold hover:bg-gold-light transition-all flex items-center justify-center gap-3 focus:outline-none focus:ring-1 focus:ring-gold shadow-lg"
                >
                  <span>
                    Donate Now {effectiveAmount > 0 ? `• ₹${effectiveAmount.toLocaleString("en-IN")}` : ""}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Assurance statement */}
              <div className="flex items-center justify-center gap-2 text-xs text-stone-dark pt-1 text-center font-light">
                <ShieldCheck className="w-4 h-4 text-gold shrink-0" />
                <span>Contributions support verified diocesan and parish ministries.</span>
              </div>
            </form>
          ) : (
            /* Direct Transfer & Trust Details View */
            <div className="space-y-8 animate-fadeIn">
              <div className="p-6 border border-gold/40 bg-gold/5 space-y-3">
                <div className="flex items-center gap-2 text-gold text-xs uppercase tracking-widest font-medium">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Contribution Summary</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pt-1 border-t border-gold/20">
                  <span className="font-serif text-3xl text-ivory font-normal">
                    ₹{effectiveAmount.toLocaleString("en-IN")}
                  </span>
                  <span className="text-xs uppercase tracking-widest text-gold">
                    {frequency === "monthly" ? "Monthly Stewardship" : "One-Time Offering"} •{" "}
                    {CAUSES.find((c) => c.id === selectedCause)?.title}
                  </span>
                </div>
                {donorName && (
                  <p className="text-xs text-stone font-light">
                    Offered by: <strong className="text-ivory">{donorName}</strong>
                  </p>
                )}
                {intentionNote && (
                  <p className="text-xs text-stone-light italic font-light">
                    Intention: &ldquo;{intentionNote}&rdquo;
                  </p>
                )}
              </div>

              {/* Official Parish Bank Details */}
              <div className="space-y-4">
                <div className="space-y-1">
                  <h3 className="font-serif text-2xl text-ivory font-light">
                    Parish Banking &amp; Transfer Details
                  </h3>
                  <p className="text-xs text-stone font-light leading-relaxed">
                    Direct electronic transfers (NEFT / RTGS / IMPS) may be sent directly to the official diocesan bank account below.
                  </p>
                </div>

                <div className="border border-stone/15 bg-[#141414] divide-y divide-stone/10 text-xs">
                  <div className="p-3.5 flex items-center justify-between gap-4">
                    <span className="text-muted uppercase tracking-wider">Account Name</span>
                    <div className="flex items-center gap-2 text-right">
                      <span className="text-ivory font-medium">Milagris Cathedral Parish</span>
                      <button
                        type="button"
                        onClick={() => handleCopy("Milagris Cathedral Parish", "accName")}
                        className="text-stone hover:text-gold transition-colors"
                        title="Copy account name"
                      >
                        {copiedField === "accName" ? (
                          <Check className="w-3.5 h-3.5 text-gold" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="p-3.5 flex items-center justify-between gap-4">
                    <span className="text-muted uppercase tracking-wider">Bank</span>
                    <span className="text-ivory font-medium">State Bank of India</span>
                  </div>

                  <div className="p-3.5 flex items-center justify-between gap-4">
                    <span className="text-muted uppercase tracking-wider">Branch</span>
                    <span className="text-ivory font-medium">Sawantwadi Main Branch (00475)</span>
                  </div>

                  <div className="p-3.5 flex items-center justify-between gap-4">
                    <span className="text-muted uppercase tracking-wider">Account Number</span>
                    <div className="flex items-center gap-2 text-right">
                      <span className="font-mono text-gold text-sm font-semibold">
                        31084294821
                      </span>
                      <button
                        type="button"
                        onClick={() => handleCopy("31084294821", "accNum")}
                        className="text-stone hover:text-gold transition-colors"
                        title="Copy account number"
                      >
                        {copiedField === "accNum" ? (
                          <Check className="w-3.5 h-3.5 text-gold" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="p-3.5 flex items-center justify-between gap-4">
                    <span className="text-muted uppercase tracking-wider">IFSC Code</span>
                    <div className="flex items-center gap-2 text-right">
                      <span className="font-mono text-gold text-sm font-semibold">
                        SBIN0000475
                      </span>
                      <button
                        type="button"
                        onClick={() => handleCopy("SBIN0000475", "ifsc")}
                        className="text-stone hover:text-gold transition-colors"
                        title="Copy IFSC"
                      >
                        {copiedField === "ifsc" ? (
                          <Check className="w-3.5 h-3.5 text-gold" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Gateway Note */}
              <div className="p-4 border-l-2 border-gold bg-surface/50 text-xs text-stone font-light leading-relaxed">
                <span className="font-medium text-gold block mb-1">
                  Online Payment Gateway Note:
                </span>
                Direct card and instant UPI gateway processing is currently being finalized with the diocese banking partner. If you complete a bank transfer, kindly notify the parish office at <strong>02363-272549</strong> so a formal acknowledgement and liturgical receipt can be prepared.
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => setShowDirectTransfer(false)}
                  className="w-full sm:w-auto py-3 px-6 border border-stone/30 text-stone hover:text-ivory hover:border-gold uppercase tracking-[0.2em] text-xs font-medium transition-colors"
                >
                  Edit Contribution
                </button>
                <a
                  href="tel:02363-272549"
                  className="w-full sm:w-auto py-3 px-6 bg-gold text-obsidian uppercase tracking-[0.2em] text-xs font-semibold hover:bg-gold-light transition-colors text-center"
                >
                  Contact Parish Office
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Supporting Pillars of Stewardship */}
        <div className="mt-16 sm:mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 border-t border-stone/10">
          <div className="space-y-3">
            <span className="text-xs uppercase tracking-widest text-gold font-medium block">
              Transparent Ministry
            </span>
            <h3 className="font-serif text-xl text-ivory">Faithful Stewardship</h3>
            <p className="text-stone text-xs sm:text-sm font-light leading-relaxed">
              Every offering is managed under diocesan supervision to serve parish pastoral needs, liturgical worship, and charitable relief.
            </p>
          </div>

          <div className="space-y-3">
            <span className="text-xs uppercase tracking-widest text-gold font-medium block">
              Architectural Continuity
            </span>
            <h3 className="font-serif text-xl text-ivory">Preserving the Sanctuary</h3>
            <p className="text-stone text-xs sm:text-sm font-light leading-relaxed">
              Supporting the continued conservation of our consecrated stone cathedral, the venerated 1652 patronal statue, and parish facilities.
            </p>
          </div>

          <div className="space-y-3">
            <span className="text-xs uppercase tracking-widest text-gold font-medium block">
              Community Outreach
            </span>
            <h3 className="font-serif text-xl text-ivory">Care for Families in Need</h3>
            <p className="text-stone text-xs sm:text-sm font-light leading-relaxed">
              Extending Christ&apos;s compassion to vulnerable community members, elderly parishioners, and regional welfare programs across Sindhudurg.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
