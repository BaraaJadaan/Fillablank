// lib/content/types.ts

import { LucideIcon } from 'lucide-react';

export interface CTAButton {
  label: string;
  targetSection: string;
  variant?: 'primary' | 'secondary';
}

export interface Statistic {
  number: string;
  label: string;
}

export interface HeroContent {
  badge: {
    label: string;
    icon: string;
  };
  mainHeadline: string;
  subHeadline: string;
  description: string;
  ctaButtons: CTAButton[];
  statistics: Statistic[];
}

export interface Service {
  title: string;
  description: string;
  icon: string;
  colorGradient: string;
}

export interface ServicesContent {
  eyebrow: {
    label: string;
    icon: string;
  };
  title: string;
  description: string;
  services: Service[];
  ctaButton: {
    label: string;
    targetSection: string;
  };
}

export interface Project {
  title: string;
  category: string;
  description: string;
  image: string;
  imageAlt: string;
  tags: string[];
  colorGradient: string;
  links?: {
    demo?: string;
    github?: string;
  };
}

export interface ProjectsContent {
  eyebrow: {
    label: string;
    icon: string;
  };
  title: string;
  description: string;
  projects: Project[];
  ctaButton?: {
    label: string;
    targetSection: string;
  };
}

export interface AboutStatistic {
  icon: string;
  label: string;
  value: string;
  colorGradient: string;
}

export interface CoreValue {
  title: string;
  description: string;
  icon: string;
}

export interface AboutContent {
  eyebrow: {
    label: string;
    icon: string;
  };
  title: string;
  description: string;
  story: {
    title: string;
    paragraphs: string[];
  };
  statistics: AboutStatistic[];
  values: {
    title: string;
    items: CoreValue[];
  };
  ctaButton: {
    label: string;
    targetSection: string;
  };
}

export interface ContactInfo {
  icon: string;
  label: string;
  value: string;
  colorGradient: string;
  link?: string;
}

export interface OfficeHours {
  weekdays: string;
  saturday: string;
  sunday: string;
}

export interface ContactContent {
  eyebrow: {
    label: string;
    icon: string;
  };
  title: string;
  description: string;
  contactInfo: ContactInfo[];
  officeHours?: OfficeHours;
  formFields: {
    name: { label: string; placeholder: string };
    email: { label: string; placeholder: string };
    company: { label: string; placeholder: string };
    message: { label: string; placeholder: string };
  };
  submitButton: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
  label: string;
}

export interface FooterLinkGroup {
  category: string;
  links: Array<{
    name: string;
    href: string;
  }>;
}

export interface FooterContent {
  brand: {
    name: string;
    logo: string;
    description: string;
  };
  socialLinks: SocialLink[];
  linkGroups: FooterLinkGroup[];
  newsletter: {
    title: string;
    description: string;
    placeholder: string;
    buttonLabel: string;
  };
  copyright: string;
}

export interface NavLink {
  name: string;
  href: string;
}

export interface NavigationContent {
  brand: {
    name: string;
    logo: string;
  };
  links: NavLink[];
}

export interface SiteContent {
  hero: HeroContent;
  services: ServicesContent;
  projects: ProjectsContent;
  about: AboutContent;
  contact: ContactContent;
  footer: FooterContent;
  navigation: NavigationContent;
}

// Runtime icon mapping type
export interface IconMap {
  [key: string]: LucideIcon;
}
