// lib/content/validateSiteContent.ts

import type { SiteContent } from './types';

function validateHeroSection(hero: any): void {
  if (!hero.mainHeadline || typeof hero.mainHeadline !== 'string') {
    throw new Error('Hero section: mainHeadline is required and must be a string');
  }
  if (!hero.subHeadline || typeof hero.subHeadline !== 'string') {
    throw new Error('Hero section: subHeadline is required and must be a string');
  }
  if (!Array.isArray(hero.ctaButtons) || hero.ctaButtons.length === 0) {
    throw new Error('Hero section: ctaButtons must be a non-empty array');
  }
  if (!Array.isArray(hero.statistics) || hero.statistics.length === 0) {
    throw new Error('Hero section: statistics must be a non-empty array');
  }
}

function validateServicesSection(services: any): void {
  if (!Array.isArray(services.services) || services.services.length === 0) {
    throw new Error('Services section: services must be a non-empty array');
  }

  services.services.forEach((service: any, index: number) => {
    if (!service.title || !service.description || !service.icon) {
      throw new Error(`Services section: service at index ${index} is missing required fields`);
    }
  });
}

function validateProjectsSection(projects: any): void {
  if (!Array.isArray(projects.projects) || projects.projects.length === 0) {
    throw new Error('Projects section: projects must be a non-empty array');
  }

  projects.projects.forEach((project: any, index: number) => {
    if (!project.title || !project.description || !project.image) {
      throw new Error(`Projects section: project at index ${index} is missing required fields`);
    }
  });
}

function validateAboutSection(about: any): void {
  if (!about.story || !Array.isArray(about.story.paragraphs)) {
    throw new Error('About section: story.paragraphs must be an array');
  }
  if (!Array.isArray(about.statistics) || about.statistics.length === 0) {
    throw new Error('About section: statistics must be a non-empty array');
  }
  if (!Array.isArray(about.values.items) || about.values.items.length === 0) {
    throw new Error('About section: values.items must be a non-empty array');
  }
}

function validateContactSection(contact: any): void {
  if (!Array.isArray(contact.contactInfo) || contact.contactInfo.length === 0) {
    throw new Error('Contact section: contactInfo must be a non-empty array');
  }
  if (!contact.officeHours) {
    throw new Error('Contact section: officeHours is required');
  }
}

function validateFooterSection(footer: any): void {
  if (!footer.brand || !footer.brand.name) {
    throw new Error('Footer section: brand.name is required');
  }
  if (!Array.isArray(footer.socialLinks)) {
    throw new Error('Footer section: socialLinks must be an array');
  }
  if (!Array.isArray(footer.linkGroups)) {
    throw new Error('Footer section: linkGroups must be an array');
  }
}

function validateNavigationSection(navigation: any): void {
  if (!navigation.brand || !navigation.brand.name) {
    throw new Error('Navigation section: brand.name is required');
  }
  if (!Array.isArray(navigation.links) || navigation.links.length === 0) {
    throw new Error('Navigation section: links must be a non-empty array');
  }
}

/**
 * Validates raw JSON and returns typed SiteContent. Throws on invalid data.
 */
export function validateSiteContent(content: unknown): SiteContent {
  if (!content || typeof content !== 'object') {
    throw new Error('Content must be a non-empty object');
  }

  const c = content as Record<string, unknown>;
  const requiredSections = ['hero', 'services', 'projects', 'about', 'contact', 'footer', 'navigation'];

  for (const section of requiredSections) {
    if (!c[section]) {
      throw new Error(`Missing required section: ${section}`);
    }
  }

  validateHeroSection(c.hero);
  validateServicesSection(c.services);
  validateProjectsSection(c.projects);
  validateAboutSection(c.about);
  validateContactSection(c.contact);
  validateFooterSection(c.footer);
  validateNavigationSection(c.navigation);

  return content as SiteContent;
}
