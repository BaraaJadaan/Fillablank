// lib/content/manager.ts

import { SiteContent, IconMap } from './types';
import { iconMap } from './iconMap';
import { validateSiteContent } from './validateSiteContent';

function resolveGoogleDriveImageUrl(path: string): string | null {
  try {
    const url = new URL(path);

    if (url.hostname !== 'drive.google.com') {
      return null;
    }

    const filePathMatch = url.pathname.match(/^\/file\/d\/([^/]+)\//);
    const fileId = filePathMatch?.[1] ?? url.searchParams.get('id');

    if (!fileId) {
      return null;
    }

    return `https://drive.google.com/thumbnail?id=${fileId}&sz=w2000`;
  } catch {
    return null;
  }
}

export class ContentManager {
  private static instance: ContentManager;
  private content: SiteContent | null = null;
  private iconMapping: IconMap = iconMap;

  private constructor() {}

  static getInstance(): ContentManager {
    if (!ContentManager.instance) {
      ContentManager.instance = new ContentManager();
    }
    return ContentManager.instance;
  }

  async loadContent(): Promise<SiteContent> {
    try {
      const response = await fetch('/api/site-content');

      if (!response.ok) {
        throw new Error(`Failed to load content: ${response.statusText}`);
      }

      const rawContent = await response.json();
      this.content = validateSiteContent(rawContent);

      return this.content;
    } catch (error) {
      console.error('Error loading content:', error);
      return this.getDefaultContent();
    }
  }

  getIcon(iconName: string): any {
    const icon = this.iconMapping[iconName];
    if (!icon) {
      console.warn(`Icon not found: ${iconName}, using default`);
      return this.iconMapping['Sparkles'];
    }
    return icon;
  }

  resolveImagePath(path: string): string {
    // If it's an external URL, return as-is
    if (path.startsWith('http://') || path.startsWith('https://')) {
      const googleDriveImageUrl = resolveGoogleDriveImageUrl(path);

      if (googleDriveImageUrl) {
        return googleDriveImageUrl;
      }

      return path;
    }

    // If it's a relative path, ensure it starts with /
    if (!path.startsWith('/')) {
      return `/${path}`;
    }

    return path;
  }

  private getDefaultContent(): SiteContent {
    return getDefaultSiteContent();
  }
}

/** Minimal valid fallback when content.json is missing or invalid (client fetch path). */
export function getDefaultSiteContent(): SiteContent {
  return {
    hero: {
      badge: { label: 'Welcome', icon: 'Sparkles' },
      mainHeadline: 'Welcome to Our Site',
      subHeadline: 'Building Digital Solutions',
      description: 'We create amazing digital experiences.',
      ctaButtons: [{ label: 'Get Started', targetSection: '#contact' }],
      statistics: [{ number: '10+', label: 'Projects' }],
    },
    services: {
      eyebrow: { label: 'Services', icon: 'Rocket' },
      title: 'What We Offer',
      description: 'Our services',
      services: [],
      ctaButton: { label: 'Contact Us', targetSection: '#contact' },
    },
    projects: {
      eyebrow: { label: 'Portfolio', icon: 'ExternalLink' },
      title: 'Our Work',
      description: 'Featured projects',
      projects: [],
      ctaButton: { label: 'View More', targetSection: '#contact' },
    },
    about: {
      eyebrow: { label: 'About', icon: 'Users' },
      title: 'Who We Are',
      description: 'Learn about us',
      story: { title: 'Our Story', paragraphs: [] },
      statistics: [],
      values: { title: 'Our Values', items: [] },
      ctaButton: { label: 'Get In Touch', targetSection: '#contact' },
    },
    contact: {
      eyebrow: { label: 'Contact', icon: 'Send' },
      title: 'Get In Touch',
      description: 'Contact us',
      contactInfo: [],
      officeHours: { weekdays: '', saturday: '', sunday: '' },
      formFields: {
        name: { label: 'Name', placeholder: 'Your name' },
        email: { label: 'Email', placeholder: 'Your email' },
        company: { label: 'Company', placeholder: 'Your company' },
        message: { label: 'Message', placeholder: 'Your message' },
      },
      submitButton: 'Send',
    },
    footer: {
      brand: { name: 'Company', logo: 'N', description: 'Digital solutions' },
      socialLinks: [],
      linkGroups: [],
      newsletter: {
        title: 'Newsletter',
        description: 'Subscribe',
        placeholder: 'Email',
        buttonLabel: 'Subscribe',
      },
      copyright: '© 2024 Company. All rights reserved.',
    },
    navigation: {
      brand: { name: 'Company', logo: 'N' },
      links: [],
    },
  };
}

export const contentManager = ContentManager.getInstance();
