// lib/content/__tests__/errorHandling.test.ts

import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { ContentManager } from '../manager';
import fs from 'fs';
import path from 'path';

describe('Error Handling Scenarios', () => {
  let contentManager: ContentManager;
  const originalFetch = global.fetch;
  const contentJsonPath = path.join(process.cwd(), 'public', 'content.json');
  let originalContent: string | null = null;

  beforeEach(() => {
    contentManager = ContentManager.getInstance();
    vi.clearAllMocks();
  });

  afterEach(() => {
    global.fetch = originalFetch;
  });

  describe('Missing content.json file', () => {
    it('should return fallback content when content.json is missing (404)', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        statusText: 'Not Found',
        status: 404
      });

      const content = await contentManager.loadContent();

      // Verify fallback content is returned
      expect(content).toBeDefined();
      expect(content.hero).toBeDefined();
      expect(content.hero.mainHeadline).toBe('Welcome to Our Site');
      expect(content.hero.subHeadline).toBe('Building Digital Solutions');
      expect(content.services).toBeDefined();
      expect(content.projects).toBeDefined();
      expect(content.about).toBeDefined();
      expect(content.contact).toBeDefined();
      expect(content.footer).toBeDefined();
      expect(content.navigation).toBeDefined();
    });

    it('should log error when content.json is missing', async () => {
      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        statusText: 'Not Found',
        status: 404
      });

      await contentManager.loadContent();

      expect(consoleErrorSpy).toHaveBeenCalled();
      consoleErrorSpy.mockRestore();
    });
  });

  describe('Invalid JSON', () => {
    it('should return fallback content when JSON is malformed', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => {
          throw new SyntaxError('Unexpected token in JSON at position 0');
        }
      });

      const content = await contentManager.loadContent();

      // Verify fallback content is returned
      expect(content).toBeDefined();
      expect(content.hero.mainHeadline).toBe('Welcome to Our Site');
    });

    it('should log error when JSON parsing fails', async () => {
      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => {
          throw new SyntaxError('Unexpected token } in JSON at position 42');
        }
      });

      await contentManager.loadContent();

      expect(consoleErrorSpy).toHaveBeenCalled();
      const errorCall = consoleErrorSpy.mock.calls[0];
      expect(errorCall[0]).toBe('Error loading content:');
      consoleErrorSpy.mockRestore();
    });
  });

  describe('Missing required sections', () => {
    it('should return fallback content when hero section is missing', async () => {
      const invalidContent = {
        // Missing hero section
        services: { eyebrow: { label: 'S', icon: 'R' }, title: 'T', description: 'D', services: [{ title: 'S', description: 'D', icon: 'C', colorGradient: 'g' }], ctaButton: { label: 'T', targetSection: '#t' } },
        projects: { eyebrow: { label: 'P', icon: 'E' }, title: 'T', description: 'D', projects: [{ title: 'P', category: 'C', description: 'D', image: '/i.jpg', imageAlt: 'A', tags: ['t'], colorGradient: 'g' }], ctaButton: { label: 'T', targetSection: '#t' } },
        about: { eyebrow: { label: 'A', icon: 'U' }, title: 'T', description: 'D', story: { title: 'S', paragraphs: ['P'] }, statistics: [{ icon: 'U', label: 'L', value: '1', colorGradient: 'g' }], values: { title: 'V', items: [{ title: 'V', description: 'D', icon: 'A' }] }, ctaButton: { label: 'T', targetSection: '#t' } },
        contact: { eyebrow: { label: 'C', icon: 'S' }, title: 'T', description: 'D', contactInfo: [{ icon: 'M', label: 'E', value: 'e@e.com', colorGradient: 'g' }], officeHours: { weekdays: '9-5', saturday: '10-4', sunday: 'C' }, formFields: { name: { label: 'N', placeholder: 'N' }, email: { label: 'E', placeholder: 'E' }, company: { label: 'C', placeholder: 'C' }, message: { label: 'M', placeholder: 'M' } }, submitButton: 'S' },
        footer: { brand: { name: 'T', logo: 'T', description: 'T' }, socialLinks: [], linkGroups: [], newsletter: { title: 'N', description: 'S', placeholder: 'E', buttonLabel: 'S' }, copyright: '©' },
        navigation: { brand: { name: 'T', logo: 'T' }, links: [{ name: 'H', href: '#h' }] }
      };

      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => invalidContent
      });

      const content = await contentManager.loadContent();

      expect(content).toBeDefined();
      expect(content.hero.mainHeadline).toBe('Welcome to Our Site');
    });

    it('should return fallback content when services section is missing', async () => {
      const invalidContent = {
        hero: { badge: { label: 'T', icon: 'S' }, mainHeadline: 'T', subHeadline: 'T', description: 'T', ctaButtons: [{ label: 'T', targetSection: '#t' }], statistics: [{ number: '1', label: 'T' }] },
        // Missing services section
        projects: { eyebrow: { label: 'P', icon: 'E' }, title: 'T', description: 'D', projects: [{ title: 'P', category: 'C', description: 'D', image: '/i.jpg', imageAlt: 'A', tags: ['t'], colorGradient: 'g' }], ctaButton: { label: 'T', targetSection: '#t' } },
        about: { eyebrow: { label: 'A', icon: 'U' }, title: 'T', description: 'D', story: { title: 'S', paragraphs: ['P'] }, statistics: [{ icon: 'U', label: 'L', value: '1', colorGradient: 'g' }], values: { title: 'V', items: [{ title: 'V', description: 'D', icon: 'A' }] }, ctaButton: { label: 'T', targetSection: '#t' } },
        contact: { eyebrow: { label: 'C', icon: 'S' }, title: 'T', description: 'D', contactInfo: [{ icon: 'M', label: 'E', value: 'e@e.com', colorGradient: 'g' }], officeHours: { weekdays: '9-5', saturday: '10-4', sunday: 'C' }, formFields: { name: { label: 'N', placeholder: 'N' }, email: { label: 'E', placeholder: 'E' }, company: { label: 'C', placeholder: 'C' }, message: { label: 'M', placeholder: 'M' } }, submitButton: 'S' },
        footer: { brand: { name: 'T', logo: 'T', description: 'T' }, socialLinks: [], linkGroups: [], newsletter: { title: 'N', description: 'S', placeholder: 'E', buttonLabel: 'S' }, copyright: '©' },
        navigation: { brand: { name: 'T', logo: 'T' }, links: [{ name: 'H', href: '#h' }] }
      };

      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => invalidContent
      });

      const content = await contentManager.loadContent();

      expect(content).toBeDefined();
      expect(content.services).toBeDefined();
      expect(content.services.services).toEqual([]);
    });

    it('should return fallback content when multiple sections are missing', async () => {
      const invalidContent = {
        hero: { badge: { label: 'T', icon: 'S' }, mainHeadline: 'T', subHeadline: 'T', description: 'T', ctaButtons: [{ label: 'T', targetSection: '#t' }], statistics: [{ number: '1', label: 'T' }] },
        // Missing services, projects, about sections
        contact: { eyebrow: { label: 'C', icon: 'S' }, title: 'T', description: 'D', contactInfo: [{ icon: 'M', label: 'E', value: 'e@e.com', colorGradient: 'g' }], officeHours: { weekdays: '9-5', saturday: '10-4', sunday: 'C' }, formFields: { name: { label: 'N', placeholder: 'N' }, email: { label: 'E', placeholder: 'E' }, company: { label: 'C', placeholder: 'C' }, message: { label: 'M', placeholder: 'M' } }, submitButton: 'S' },
        footer: { brand: { name: 'T', logo: 'T', description: 'T' }, socialLinks: [], linkGroups: [], newsletter: { title: 'N', description: 'S', placeholder: 'E', buttonLabel: 'S' }, copyright: '©' },
        navigation: { brand: { name: 'T', logo: 'T' }, links: [{ name: 'H', href: '#h' }] }
      };

      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => invalidContent
      });

      const content = await contentManager.loadContent();

      expect(content).toBeDefined();
      expect(content.hero.mainHeadline).toBe('Welcome to Our Site');
      expect(content.services).toBeDefined();
      expect(content.projects).toBeDefined();
      expect(content.about).toBeDefined();
    });
  });

  describe('Missing required fields', () => {
    it('should return fallback content when hero mainHeadline is missing', async () => {
      const invalidContent = {
        hero: {
          badge: { label: 'T', icon: 'S' },
          // Missing mainHeadline
          subHeadline: 'T',
          description: 'T',
          ctaButtons: [{ label: 'T', targetSection: '#t' }],
          statistics: [{ number: '1', label: 'T' }]
        },
        services: { eyebrow: { label: 'S', icon: 'R' }, title: 'T', description: 'D', services: [{ title: 'S', description: 'D', icon: 'C', colorGradient: 'g' }], ctaButton: { label: 'T', targetSection: '#t' } },
        projects: { eyebrow: { label: 'P', icon: 'E' }, title: 'T', description: 'D', projects: [{ title: 'P', category: 'C', description: 'D', image: '/i.jpg', imageAlt: 'A', tags: ['t'], colorGradient: 'g' }], ctaButton: { label: 'T', targetSection: '#t' } },
        about: { eyebrow: { label: 'A', icon: 'U' }, title: 'T', description: 'D', story: { title: 'S', paragraphs: ['P'] }, statistics: [{ icon: 'U', label: 'L', value: '1', colorGradient: 'g' }], values: { title: 'V', items: [{ title: 'V', description: 'D', icon: 'A' }] }, ctaButton: { label: 'T', targetSection: '#t' } },
        contact: { eyebrow: { label: 'C', icon: 'S' }, title: 'T', description: 'D', contactInfo: [{ icon: 'M', label: 'E', value: 'e@e.com', colorGradient: 'g' }], officeHours: { weekdays: '9-5', saturday: '10-4', sunday: 'C' }, formFields: { name: { label: 'N', placeholder: 'N' }, email: { label: 'E', placeholder: 'E' }, company: { label: 'C', placeholder: 'C' }, message: { label: 'M', placeholder: 'M' } }, submitButton: 'S' },
        footer: { brand: { name: 'T', logo: 'T', description: 'T' }, socialLinks: [], linkGroups: [], newsletter: { title: 'N', description: 'S', placeholder: 'E', buttonLabel: 'S' }, copyright: '©' },
        navigation: { brand: { name: 'T', logo: 'T' }, links: [{ name: 'H', href: '#h' }] }
      };

      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => invalidContent
      });

      const content = await contentManager.loadContent();

      expect(content).toBeDefined();
      expect(content.hero.mainHeadline).toBe('Welcome to Our Site');
    });

    it('should return fallback content when services array is empty', async () => {
      const invalidContent = {
        hero: { badge: { label: 'T', icon: 'S' }, mainHeadline: 'T', subHeadline: 'T', description: 'T', ctaButtons: [{ label: 'T', targetSection: '#t' }], statistics: [{ number: '1', label: 'T' }] },
        services: {
          eyebrow: { label: 'S', icon: 'R' },
          title: 'T',
          description: 'D',
          services: [], // Empty array
          ctaButton: { label: 'T', targetSection: '#t' }
        },
        projects: { eyebrow: { label: 'P', icon: 'E' }, title: 'T', description: 'D', projects: [{ title: 'P', category: 'C', description: 'D', image: '/i.jpg', imageAlt: 'A', tags: ['t'], colorGradient: 'g' }], ctaButton: { label: 'T', targetSection: '#t' } },
        about: { eyebrow: { label: 'A', icon: 'U' }, title: 'T', description: 'D', story: { title: 'S', paragraphs: ['P'] }, statistics: [{ icon: 'U', label: 'L', value: '1', colorGradient: 'g' }], values: { title: 'V', items: [{ title: 'V', description: 'D', icon: 'A' }] }, ctaButton: { label: 'T', targetSection: '#t' } },
        contact: { eyebrow: { label: 'C', icon: 'S' }, title: 'T', description: 'D', contactInfo: [{ icon: 'M', label: 'E', value: 'e@e.com', colorGradient: 'g' }], officeHours: { weekdays: '9-5', saturday: '10-4', sunday: 'C' }, formFields: { name: { label: 'N', placeholder: 'N' }, email: { label: 'E', placeholder: 'E' }, company: { label: 'C', placeholder: 'C' }, message: { label: 'M', placeholder: 'M' } }, submitButton: 'S' },
        footer: { brand: { name: 'T', logo: 'T', description: 'T' }, socialLinks: [], linkGroups: [], newsletter: { title: 'N', description: 'S', placeholder: 'E', buttonLabel: 'S' }, copyright: '©' },
        navigation: { brand: { name: 'T', logo: 'T' }, links: [{ name: 'H', href: '#h' }] }
      };

      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => invalidContent
      });

      const content = await contentManager.loadContent();

      expect(content).toBeDefined();
      expect(content.services.services).toEqual([]);
    });

    it('should return fallback content when projects array is empty', async () => {
      const invalidContent = {
        hero: { badge: { label: 'T', icon: 'S' }, mainHeadline: 'T', subHeadline: 'T', description: 'T', ctaButtons: [{ label: 'T', targetSection: '#t' }], statistics: [{ number: '1', label: 'T' }] },
        services: { eyebrow: { label: 'S', icon: 'R' }, title: 'T', description: 'D', services: [{ title: 'S', description: 'D', icon: 'C', colorGradient: 'g' }], ctaButton: { label: 'T', targetSection: '#t' } },
        projects: {
          eyebrow: { label: 'P', icon: 'E' },
          title: 'T',
          description: 'D',
          projects: [], // Empty array
          ctaButton: { label: 'T', targetSection: '#t' }
        },
        about: { eyebrow: { label: 'A', icon: 'U' }, title: 'T', description: 'D', story: { title: 'S', paragraphs: ['P'] }, statistics: [{ icon: 'U', label: 'L', value: '1', colorGradient: 'g' }], values: { title: 'V', items: [{ title: 'V', description: 'D', icon: 'A' }] }, ctaButton: { label: 'T', targetSection: '#t' } },
        contact: { eyebrow: { label: 'C', icon: 'S' }, title: 'T', description: 'D', contactInfo: [{ icon: 'M', label: 'E', value: 'e@e.com', colorGradient: 'g' }], officeHours: { weekdays: '9-5', saturday: '10-4', sunday: 'C' }, formFields: { name: { label: 'N', placeholder: 'N' }, email: { label: 'E', placeholder: 'E' }, company: { label: 'C', placeholder: 'C' }, message: { label: 'M', placeholder: 'M' } }, submitButton: 'S' },
        footer: { brand: { name: 'T', logo: 'T', description: 'T' }, socialLinks: [], linkGroups: [], newsletter: { title: 'N', description: 'S', placeholder: 'E', buttonLabel: 'S' }, copyright: '©' },
        navigation: { brand: { name: 'T', logo: 'T' }, links: [{ name: 'H', href: '#h' }] }
      };

      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => invalidContent
      });

      const content = await contentManager.loadContent();

      expect(content).toBeDefined();
      expect(content.projects.projects).toEqual([]);
    });

    it('should return fallback content when navigation links array is empty', async () => {
      const invalidContent = {
        hero: { badge: { label: 'T', icon: 'S' }, mainHeadline: 'T', subHeadline: 'T', description: 'T', ctaButtons: [{ label: 'T', targetSection: '#t' }], statistics: [{ number: '1', label: 'T' }] },
        services: { eyebrow: { label: 'S', icon: 'R' }, title: 'T', description: 'D', services: [{ title: 'S', description: 'D', icon: 'C', colorGradient: 'g' }], ctaButton: { label: 'T', targetSection: '#t' } },
        projects: { eyebrow: { label: 'P', icon: 'E' }, title: 'T', description: 'D', projects: [{ title: 'P', category: 'C', description: 'D', image: '/i.jpg', imageAlt: 'A', tags: ['t'], colorGradient: 'g' }], ctaButton: { label: 'T', targetSection: '#t' } },
        about: { eyebrow: { label: 'A', icon: 'U' }, title: 'T', description: 'D', story: { title: 'S', paragraphs: ['P'] }, statistics: [{ icon: 'U', label: 'L', value: '1', colorGradient: 'g' }], values: { title: 'V', items: [{ title: 'V', description: 'D', icon: 'A' }] }, ctaButton: { label: 'T', targetSection: '#t' } },
        contact: { eyebrow: { label: 'C', icon: 'S' }, title: 'T', description: 'D', contactInfo: [{ icon: 'M', label: 'E', value: 'e@e.com', colorGradient: 'g' }], officeHours: { weekdays: '9-5', saturday: '10-4', sunday: 'C' }, formFields: { name: { label: 'N', placeholder: 'N' }, email: { label: 'E', placeholder: 'E' }, company: { label: 'C', placeholder: 'C' }, message: { label: 'M', placeholder: 'M' } }, submitButton: 'S' },
        footer: { brand: { name: 'T', logo: 'T', description: 'T' }, socialLinks: [], linkGroups: [], newsletter: { title: 'N', description: 'S', placeholder: 'E', buttonLabel: 'S' }, copyright: '©' },
        navigation: {
          brand: { name: 'T', logo: 'T' },
          links: [] // Empty array
        }
      };

      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => invalidContent
      });

      const content = await contentManager.loadContent();

      expect(content).toBeDefined();
      expect(content.navigation.links).toEqual([]);
    });

    it('should return fallback content when service item is missing required fields', async () => {
      const invalidContent = {
        hero: { badge: { label: 'T', icon: 'S' }, mainHeadline: 'T', subHeadline: 'T', description: 'T', ctaButtons: [{ label: 'T', targetSection: '#t' }], statistics: [{ number: '1', label: 'T' }] },
        services: {
          eyebrow: { label: 'S', icon: 'R' },
          title: 'T',
          description: 'D',
          services: [
            { title: 'S', description: 'D' } // Missing icon
          ],
          ctaButton: { label: 'T', targetSection: '#t' }
        },
        projects: { eyebrow: { label: 'P', icon: 'E' }, title: 'T', description: 'D', projects: [{ title: 'P', category: 'C', description: 'D', image: '/i.jpg', imageAlt: 'A', tags: ['t'], colorGradient: 'g' }], ctaButton: { label: 'T', targetSection: '#t' } },
        about: { eyebrow: { label: 'A', icon: 'U' }, title: 'T', description: 'D', story: { title: 'S', paragraphs: ['P'] }, statistics: [{ icon: 'U', label: 'L', value: '1', colorGradient: 'g' }], values: { title: 'V', items: [{ title: 'V', description: 'D', icon: 'A' }] }, ctaButton: { label: 'T', targetSection: '#t' } },
        contact: { eyebrow: { label: 'C', icon: 'S' }, title: 'T', description: 'D', contactInfo: [{ icon: 'M', label: 'E', value: 'e@e.com', colorGradient: 'g' }], officeHours: { weekdays: '9-5', saturday: '10-4', sunday: 'C' }, formFields: { name: { label: 'N', placeholder: 'N' }, email: { label: 'E', placeholder: 'E' }, company: { label: 'C', placeholder: 'C' }, message: { label: 'M', placeholder: 'M' } }, submitButton: 'S' },
        footer: { brand: { name: 'T', logo: 'T', description: 'T' }, socialLinks: [], linkGroups: [], newsletter: { title: 'N', description: 'S', placeholder: 'E', buttonLabel: 'S' }, copyright: '©' },
        navigation: { brand: { name: 'T', logo: 'T' }, links: [{ name: 'H', href: '#h' }] }
      };

      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => invalidContent
      });

      const content = await contentManager.loadContent();

      expect(content).toBeDefined();
      expect(content.services.services).toEqual([]);
    });
  });

  describe('Fallback content verification', () => {
    it('should have all required sections in fallback content', async () => {
      global.fetch = vi.fn().mockRejectedValue(new Error('Network error'));

      const content = await contentManager.loadContent();

      // Verify all sections exist
      expect(content.hero).toBeDefined();
      expect(content.services).toBeDefined();
      expect(content.projects).toBeDefined();
      expect(content.about).toBeDefined();
      expect(content.contact).toBeDefined();
      expect(content.footer).toBeDefined();
      expect(content.navigation).toBeDefined();
    });

    it('should have valid hero section in fallback content', async () => {
      global.fetch = vi.fn().mockRejectedValue(new Error('Network error'));

      const content = await contentManager.loadContent();

      expect(content.hero.mainHeadline).toBe('Welcome to Our Site');
      expect(content.hero.subHeadline).toBe('Building Digital Solutions');
      expect(content.hero.description).toBe('We create amazing digital experiences.');
      expect(content.hero.ctaButtons).toHaveLength(1);
      expect(content.hero.ctaButtons[0].label).toBe('Get Started');
      expect(content.hero.statistics).toHaveLength(1);
      expect(content.hero.statistics[0].number).toBe('10+');
    });

    it('should have valid services section in fallback content', async () => {
      global.fetch = vi.fn().mockRejectedValue(new Error('Network error'));

      const content = await contentManager.loadContent();

      expect(content.services.title).toBe('What We Offer');
      expect(content.services.description).toBe('Our services');
      expect(content.services.services).toEqual([]);
      expect(content.services.ctaButton.label).toBe('Contact Us');
    });

    it('should have valid projects section in fallback content', async () => {
      global.fetch = vi.fn().mockRejectedValue(new Error('Network error'));

      const content = await contentManager.loadContent();

      expect(content.projects.title).toBe('Our Work');
      expect(content.projects.description).toBe('Featured projects');
      expect(content.projects.projects).toEqual([]);
      expect(content.projects.ctaButton.label).toBe('View More');
    });

    it('should have valid about section in fallback content', async () => {
      global.fetch = vi.fn().mockRejectedValue(new Error('Network error'));

      const content = await contentManager.loadContent();

      expect(content.about.title).toBe('Who We Are');
      expect(content.about.description).toBe('Learn about us');
      expect(content.about.story.paragraphs).toEqual([]);
      expect(content.about.statistics).toEqual([]);
      expect(content.about.values.items).toEqual([]);
    });

    it('should have valid contact section in fallback content', async () => {
      global.fetch = vi.fn().mockRejectedValue(new Error('Network error'));

      const content = await contentManager.loadContent();

      expect(content.contact.title).toBe('Get In Touch');
      expect(content.contact.description).toBe('Contact us');
      expect(content.contact.contactInfo).toEqual([]);
      expect(content.contact.formFields.name.label).toBe('Name');
      expect(content.contact.submitButton).toBe('Send');
    });

    it('should have valid footer section in fallback content', async () => {
      global.fetch = vi.fn().mockRejectedValue(new Error('Network error'));

      const content = await contentManager.loadContent();

      expect(content.footer.brand.name).toBe('Company');
      expect(content.footer.socialLinks).toEqual([]);
      expect(content.footer.linkGroups).toEqual([]);
      expect(content.footer.copyright).toBe('© 2024 Company. All rights reserved.');
    });

    it('should have valid navigation section in fallback content', async () => {
      global.fetch = vi.fn().mockRejectedValue(new Error('Network error'));

      const content = await contentManager.loadContent();

      expect(content.navigation.brand.name).toBe('Company');
      expect(content.navigation.links).toEqual([]);
    });
  });
});
