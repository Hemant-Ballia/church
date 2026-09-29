import { SiteConfig } from "@/types/site";

export const siteConfig: SiteConfig = {
  name: "Milagris Cathedral",
  title: "Milagris Cathedral | Cathedral of Our Lady of Miracles",
  subheading: "The Mother Church of the Diocese of Sindhudurg",
  dedicationTitle: "Cathedral of Our Lady of Miracles",
  diocese: "Diocese of Sindhudurg",
  rite: "Roman Rite",
  location: {
    street: "Milagris Church Rd",
    neighborhood: "Salaiwada",
    city: "Sawantwadi",
    state: "Maharashtra",
    pincode: "416510",
    country: "India",
    fullAddress: "Milagris Church Rd, Salaiwada, Sawantwadi, Maharashtra 416510, India",
    phone: "02363-272549",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Milagris+Cathedral+Sawantwadi+Maharashtra",
  },
  keyDedicationEvent: {
    date: "May 9, 2026",
    dateISO: "2026-05-09",
    title: "Historic Solemn Dedication, Blessing & Eucharistic Celebration",
    presiders: "Presided by Cardinal Filipe Neri Ferrão • Inaugurated by Cardinal Oswald Gracias",
    videoTitle: "Historic Solemn Dedication, Blessing & Eucharistic Celebration | Milagris Cathedral Sawantwadi",
    videoYoutubeId: "9o9xGf8C8qI", // Fallback representative ID or clean modal fallback player
  },
  socialLinks: [
    { label: "Google Maps", url: "https://www.google.com/maps/search/?api=1&query=Milagris+Cathedral+Sawantwadi" },
    { label: "YouTube Livestream", url: "https://www.youtube.com/results?search_query=Milagris+Cathedral+Sawantwadi+Solemn+Dedication" },
    { label: "Diocese of Sindhudurg", url: "https://www.google.com/search?q=Diocese+of+Sindhudurg" },
  ],
};
