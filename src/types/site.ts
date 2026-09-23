export interface NavItem {
  label: string;
  href: string;
  description?: string;
}

export interface ClergyMember {
  name: string;
  role: string;
  designation?: string;
}

export interface TimelineMilestone {
  number?: string;
  year: string;
  title: string;
  tagline: string;
  description: string;
  highlight?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: "Architecture" | "Sanctuary" | "Facade" | "Sacred Art" | "Heritage";
  src: string;
  alt: string;
  aspect: "landscape" | "portrait" | "square";
  description: string;
  year?: string;
}

export interface SiteConfig {
  name: string;
  title: string;
  subheading: string;
  dedicationTitle: string;
  diocese: string;
  rite: string;
  location: {
    street: string;
    neighborhood: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
    fullAddress: string;
    phone: string;
    googleMapsUrl: string;
  };
  keyDedicationEvent: {
    date: string;
    dateISO: string;
    title: string;
    presiders: string;
    videoTitle: string;
    videoYoutubeId: string;
  };
  socialLinks: {
    label: string;
    url: string;
  }[];
}
