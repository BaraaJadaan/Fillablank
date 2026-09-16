// lib/content/__tests__/errorHandling.e2e.test.ts

import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { ContentManager } from '../manager';

/**
 * End-to-End Error Handling Tests
 * 
 * These tests verify that the application handles error scenarios gracefully:
 * - Missing content.json file
 * - Invalid JSON syntax
 * - Missing required sections
 * - Missing required fields
 * - Fallback content is displayed in all error cases
 */

describe('E2E Error Handling Scenarios', () => {
  let contentManager: ContentManager;
  const originalFetch = global.fetch;

  beforeEach(() => {
    contentManager = ContentManager.getInstance();
    vi.clearAllMocks();
  });

  afterEach(() => {
    global.fetch = originalFetch;
  });

  describe('Scenario 1: Missing content.json file', () => {
    it('should return fallback content when content.json returns 404', async () => {
      // Simulate missing file (404 response)
      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 404,
        statusText: 'Not Found'
      });

      const content = await contentManager.loadContent();

      // Verify fallback content is returned with all required sections
      expect(content).toBeDefined();
      expect(content.hero).toBeDefined();
      expect(content.services).toBeDefined();
      expect(content.projects).toBeDefined();
      expect(content.about).toBeDefined();
      expect(content.contact).toBeDefined();
      expect(content.footer).toBeDefined();
      expect(content.navigation).toBeDefined();

      // Verify fallback content has meaningful values
      expect(content.hero.mainHeadline).toBe('Welcome to Our Site');
      expect(content.hero.subHeadline).toBe('Building Digital Solutions');
      expect(content.hero.ctaButtons).toHaveLength(1);
      expect(content.hero.statistics).toHaveLength(1);
    });

    it('should log error when content.json is missing', async () => {
      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 404,
        statusText: 'Not Found'
      });

      await contentManager.loadContent();

      expect(consoleErrorSpy).toHaveBeenCalled();
      consoleErrorSpy.mockRestore();
    });

    it('should return fallback content when network error occurs', async () => {
      // Simulate network failure
      global.fetch = vi.fn().mockRejectedValue(new Error('Network error'));

      const content = await contentManager.loadContent();

      // Verify fallback content is returned
      expect(content).toBeDefined();
      expect(content.hero.mainHeadline).toBe('Welcome to Our Site');
    });
  });

  describe('Scenario 2: Invalid JSON syntax', () => {
    it('should return fallback content when JSON is malformed', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => {
          throw new SyntaxError('Unexpected token } in JSON at position 42');
        }
      });

      const content = await contentManager.loadContent();

      // Verify fallback content is returned
      expect(content).toBeDefined();
      expect(content.hero.mainHeadline).toBe('Welcome to Our Site');
      expect(content.services).toBeDefined();
      expect(content.projects).toBeDefined();
    });

    it('should log descriptive error when JSON parsing fails', async () => {
      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => {
          throw new SyntaxError('Unexpected token < in JSON at position 0');
        }
      });

      await contentManager.loadContent();

      expect(consoleErrorSpy).toHaveBeenCalled();
      const errorCall = consoleErrorSpy.mock.calls[0];
      expect(errorCall[0]).toBe('Error loading content:');
      expect(errorCall[1]).toBeInstanceOf(SyntaxError);
      consoleErrorSpy.mockRestore();
    });

    it('should handle JSON with trailing commas', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => {
          throw new SyntaxError('Unexpected token , in JSON');
        }
      });

      const content = await contentManager.loadContent();

      expect(content).toBeDefined();
      expect(content.hero).toBeDefined();
    });
  });

  describe('Scenario 3: Missing required sections', () => {
    it('should return fallback content when hero section is missing', async () => {
      const invalidContent = {
        // Missing hero section
        services: { 
          eyebrow: { label: 'Services', icon: 'Rocket' }, 
          title: 'Services', 
          description: 'Our services', 
          services: [{ title: 'Service', description: 'Desc', icon: 'Code', colorGradient: 'gradient' }], 
          ctaButton: { label: 'CTA', targetSection: '#contact' } 
        },
        projects: { 
          eyebrow: { label: 'Projects', icon: 'ExternalLink' }, 
          title: 'Projects', 
          description: 'Our projects', 
          projects: [{ title: 'Project', category: 'Cat', description: 'Desc', image: '/img.jpg', imageAlt: 'Alt', tags: ['tag'], colorGradient: 'gradient' }], 
          ctaButton: { label: 'CTA', targetSection: '#contact' } 
        },
        about: { 
          eyebrow: { label: 'About', icon: 'Users' }, 
          title: 'About', 
          description: 'About us', 
          story: { title: 'Story', paragraphs: ['Para'] }, 
          statistics: [{ icon: 'Users', label: 'Label', value: '1', colorGradient: 'gradient' }], 
          values: { title: 'Values', items: [{ title: 'Value', description: 'Desc', icon: 'Icon' }] }, 
          ctaButton: { label: 'CTA', targetSection: '#contact' } 
        },
        contact: { 
          eyebrow: { label: 'Contact', icon: 'Send' }, 
          title: 'Contact', 
          description: 'Contact us', 
          contactInfo: [{ icon: 'Mail', label: 'Email', value: 'email@test.com', colorGradient: 'gradient' }], 
          officeHours: { weekdays: '9-5', saturday: '10-4', sunday: 'Closed' }, 
          formFields: { name: { label: 'Name', placeholder: 'Name' }, email: { label: 'Email', placeholder: 'Email' }, company: { label: 'Company', placeholder: 'Company' }, message: { label: 'Message', placeholder: 'Message' } }, 
          submitButton: 'Send' 
        },
        footer: { 
          brand: { name: 'Brand', logo: 'B', description: 'Desc' }, 
          socialLinks: [], 
          linkGroups: [], 
          newsletter: { title: 'Newsletter', description: 'Subscribe', placeholder: 'Email', buttonLabel: 'Subscribe' }, 
          copyright: '© 2024' 
        },
        navigation: { 
          brand: { name: 'Brand', logo: 'B' }, 
          links: [{ name: 'Home', href: '#home' }] 
        }
      };

      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => invalidContent
      });

      const content = await contentManager.loadContent();

      // Should return fallback content
      expect(content).toBeDefined();
      expect(content.hero.mainHeadline).toBe('Welcome to Our Site');
    });

    it('should return fallback content when services section is missing', async () => {
      const invalidContent = {
        hero: { 
          badge: { label: 'Badge', icon: 'Sparkles' }, 
          mainHeadline: 'Headline', 
          subHeadline: 'Subheadline', 
          description: 'Description', 
          ctaButtons: [{ label: 'CTA', targetSection: '#contact' }], 
          statistics: [{ number: '1', label: 'Stat' }] 
        },
        // Missing services section
        projects: { 
          eyebrow: { label: 'Projects', icon: 'ExternalLink' }, 
          title: 'Projects', 
          description: 'Our projects', 
          projects: [{ title: 'Project', category: 'Cat', description: 'Desc', image: '/img.jpg', imageAlt: 'Alt', tags: ['tag'], colorGradient: 'gradient' }], 
          ctaButton: { label: 'CTA', targetSection: '#contact' } 
        },
        about: { 
          eyebrow: { label: 'About', icon: 'Users' }, 
          title: 'About', 
          description: 'About us', 
          story: { title: 'Story', paragraphs: ['Para'] }, 
          statistics: [{ icon: 'Users', label: 'Label', value: '1', colorGradient: 'gradient' }], 
          values: { title: 'Values', items: [{ title: 'Value', description: 'Desc', icon: 'Icon' }] }, 
          ctaButton: { label: 'CTA', targetSection: '#contact' } 
        },
        contact: { 
          eyebrow: { label: 'Contact', icon: 'Send' }, 
          title: 'Contact', 
          description: 'Contact us', 
          contactInfo: [{ icon: 'Mail', label: 'Email', value: 'email@test.com', colorGradient: 'gradient' }], 
          officeHours: { weekdays: '9-5', saturday: '10-4', sunday: 'Closed' }, 
          formFields: { name: { label: 'Name', placeholder: 'Name' }, email: { label: 'Email', placeholder: 'Email' }, company: { label: 'Company', placeholder: 'Company' }, message: { label: 'Message', placeholder: 'Message' } }, 
          submitButton: 'Send' 
        },
        footer: { 
          brand: { name: 'Brand', logo: 'B', description: 'Desc' }, 
          socialLinks: [], 
          linkGroups: [], 
          newsletter: { title: 'Newsletter', description: 'Subscribe', placeholder: 'Email', buttonLabel: 'Subscribe' }, 
          copyright: '© 2024' 
        },
        navigation: { 
          brand: { name: 'Brand', logo: 'B' }, 
          links: [{ name: 'Home', href: '#home' }] 
        }
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
        hero: { 
          badge: { label: 'Badge', icon: 'Sparkles' }, 
          mainHeadline: 'Headline', 
          subHeadline: 'Subheadline', 
          description: 'Description', 
          ctaButtons: [{ label: 'CTA', targetSection: '#contact' }], 
          statistics: [{ number: '1', label: 'Stat' }] 
        },
        // Missing services, projects, about
        contact: { 
          eyebrow: { label: 'Contact', icon: 'Send' }, 
          title: 'Contact', 
          description: 'Contact us', 
          contactInfo: [{ icon: 'Mail', label: 'Email', value: 'email@test.com', colorGradient: 'gradient' }], 
          officeHours: { weekdays: '9-5', saturday: '10-4', sunday: 'Closed' }, 
          formFields: { name: { label: 'Name', placeholder: 'Name' }, email: { label: 'Email', placeholder: 'Email' }, company: { label: 'Company', placeholder: 'Company' }, message: { label: 'Message', placeholder: 'Message' } }, 
          submitButton: 'Send' 
        },
        footer: { 
          brand: { name: 'Brand', logo: 'B', description: 'Desc' }, 
          socialLinks: [], 
          linkGroups: [], 
          newsletter: { title: 'Newsletter', description: 'Subscribe', placeholder: 'Email', buttonLabel: 'Subscribe' }, 
          copyright: '© 2024' 
        },
        navigation: { 
          brand: { name: 'Brand', logo: 'B' }, 
          links: [{ name: 'Home', href: '#home' }] 
        }
      };

      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => invalidContent
      });

      const content = await contentManager.loadContent();

      expect(content).toBeDefined();
      expect(content.services).toBeDefined();
      expect(content.projects).toBeDefined();
      expect(content.about).toBeDefined();
    });
  });

  describe('Scenario 4: Missing required fields', () => {
    it('should return fallback content when hero mainHeadline is missing', async () => {
      const invalidContent = {
        hero: {
          badge: { label: 'Badge', icon: 'Sparkles' },
          // Missing mainHeadline
          subHeadline: 'Subheadline',
          description: 'Description',
          ctaButtons: [{ label: 'CTA', targetSection: '#contact' }],
          statistics: [{ number: '1', label: 'Stat' }]
        },
        services: { 
          eyebrow: { label: 'Services', icon: 'Rocket' }, 
          title: 'Services', 
          description: 'Our services', 
          services: [{ title: 'Service', description: 'Desc', icon: 'Code', colorGradient: 'gradient' }], 
          ctaButton: { label: 'CTA', targetSection: '#contact' } 
        },
        projects: { 
          eyebrow: { label: 'Projects', icon: 'ExternalLink' }, 
          title: 'Projects', 
          description: 'Our projects', 
          projects: [{ title: 'Project', category: 'Cat', description: 'Desc', image: '/img.jpg', imageAlt: 'Alt', tags: ['tag'], colorGradient: 'gradient' }], 
          ctaButton: { label: 'CTA', targetSection: '#contact' } 
        },
        about: { 
          eyebrow: { label: 'About', icon: 'Users' }, 
          title: 'About', 
          description: 'About us', 
          story: { title: 'Story', paragraphs: ['Para'] }, 
          statistics: [{ icon: 'Users', label: 'Label', value: '1', colorGradient: 'gradient' }], 
          values: { title: 'Values', items: [{ title: 'Value', description: 'Desc', icon: 'Icon' }] }, 
          ctaButton: { label: 'CTA', targetSection: '#contact' } 
        },
        contact: { 
          eyebrow: { label: 'Contact', icon: 'Send' }, 
          title: 'Contact', 
          description: 'Contact us', 
          contactInfo: [{ icon: 'Mail', label: 'Email', value: 'email@test.com', colorGradient: 'gradient' }], 
          officeHours: { weekdays: '9-5', saturday: '10-4', sunday: 'Closed' }, 
          formFields: { name: { label: 'Name', placeholder: 'Name' }, email: { label: 'Email', placeholder: 'Email' }, company: { label: 'Company', placeholder: 'Company' }, message: { label: 'Message', placeholder: 'Message' } }, 
          submitButton: 'Send' 
        },
        footer: { 
          brand: { name: 'Brand', logo: 'B', description: 'Desc' }, 
          socialLinks: [], 
          linkGroups: [], 
          newsletter: { title: 'Newsletter', description: 'Subscribe', placeholder: 'Email', buttonLabel: 'Subscribe' }, 
          copyright: '© 2024' 
        },
        navigation: { 
          brand: { name: 'Brand', logo: 'B' }, 
          links: [{ name: 'Home', href: '#home' }] 
        }
      };

      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => invalidContent
      });

      const content = await contentManager.loadContent();

      expect(content).toBeDefined();
      expect(content.hero.mainHeadline).toBe('Welcome to Our Site');
    });

    it('should return fallback content when hero ctaButtons is empty', async () => {
      const invalidContent = {
        hero: {
          badge: { label: 'Badge', icon: 'Sparkles' },
          mainHeadline: 'Headline',
          subHeadline: 'Subheadline',
          description: 'Description',
          ctaButtons: [], // Empty array
          statistics: [{ number: '1', label: 'Stat' }]
        },
        services: { 
          eyebrow: { label: 'Services', icon: 'Rocket' }, 
          title: 'Services', 
          description: 'Our services', 
          services: [{ title: 'Service', description: 'Desc', icon: 'Code', colorGradient: 'gradient' }], 
          ctaButton: { label: 'CTA', targetSection: '#contact' } 
        },
        projects: { 
          eyebrow: { label: 'Projects', icon: 'ExternalLink' }, 
          title: 'Projects', 
          description: 'Our projects', 
          projects: [{ title: 'Project', category: 'Cat', description: 'Desc', image: '/img.jpg', imageAlt: 'Alt', tags: ['tag'], colorGradient: 'gradient' }], 
          ctaButton: { label: 'CTA', targetSection: '#contact' } 
        },
        about: { 
          eyebrow: { label: 'About', icon: 'Users' }, 
          title: 'About', 
          description: 'About us', 
          story: { title: 'Story', paragraphs: ['Para'] }, 
          statistics: [{ icon: 'Users', label: 'Label', value: '1', colorGradient: 'gradient' }], 
          values: { title: 'Values', items: [{ title: 'Value', description: 'Desc', icon: 'Icon' }] }, 
          ctaButton: { label: 'CTA', targetSection: '#contact' } 
        },
        contact: { 
          eyebrow: { label: 'Contact', icon: 'Send' }, 
          title: 'Contact', 
          description: 'Contact us', 
          contactInfo: [{ icon: 'Mail', label: 'Email', value: 'email@test.com', colorGradient: 'gradient' }], 
          officeHours: { weekdays: '9-5', saturday: '10-4', sunday: 'Closed' }, 
          formFields: { name: { label: 'Name', placeholder: 'Name' }, email: { label: 'Email', placeholder: 'Email' }, company: { label: 'Company', placeholder: 'Company' }, message: { label: 'Message', placeholder: 'Message' } }, 
          submitButton: 'Send' 
        },
        footer: { 
          brand: { name: 'Brand', logo: 'B', description: 'Desc' }, 
          socialLinks: [], 
          linkGroups: [], 
          newsletter: { title: 'Newsletter', description: 'Subscribe', placeholder: 'Email', buttonLabel: 'Subscribe' }, 
          copyright: '© 2024' 
        },
        navigation: { 
          brand: { name: 'Brand', logo: 'B' }, 
          links: [{ name: 'Home', href: '#home' }] 
        }
      };

      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => invalidContent
      });

      const content = await contentManager.loadContent();

      expect(content).toBeDefined();
      expect(content.hero.ctaButtons).toHaveLength(1);
    });

    it('should return fallback content when services array is empty', async () => {
      const invalidContent = {
        hero: { 
          badge: { label: 'Badge', icon: 'Sparkles' }, 
          mainHeadline: 'Headline', 
          subHeadline: 'Subheadline', 
          description: 'Description', 
          ctaButtons: [{ label: 'CTA', targetSection: '#contact' }], 
          statistics: [{ number: '1', label: 'Stat' }] 
        },
        services: {
          eyebrow: { label: 'Services', icon: 'Rocket' },
          title: 'Services',
          description: 'Our services',
          services: [], // Empty array
          ctaButton: { label: 'CTA', targetSection: '#contact' }
        },
        projects: { 
          eyebrow: { label: 'Projects', icon: 'ExternalLink' }, 
          title: 'Projects', 
          description: 'Our projects', 
          projects: [{ title: 'Project', category: 'Cat', description: 'Desc', image: '/img.jpg', imageAlt: 'Alt', tags: ['tag'], colorGradient: 'gradient' }], 
          ctaButton: { label: 'CTA', targetSection: '#contact' } 
        },
        about: { 
          eyebrow: { label: 'About', icon: 'Users' }, 
          title: 'About', 
          description: 'About us', 
          story: { title: 'Story', paragraphs: ['Para'] }, 
          statistics: [{ icon: 'Users', label: 'Label', value: '1', colorGradient: 'gradient' }], 
          values: { title: 'Values', items: [{ title: 'Value', description: 'Desc', icon: 'Icon' }] }, 
          ctaButton: { label: 'CTA', targetSection: '#contact' } 
        },
        contact: { 
          eyebrow: { label: 'Contact', icon: 'Send' }, 
          title: 'Contact', 
          description: 'Contact us', 
          contactInfo: [{ icon: 'Mail', label: 'Email', value: 'email@test.com', colorGradient: 'gradient' }], 
          officeHours: { weekdays: '9-5', saturday: '10-4', sunday: 'Closed' }, 
          formFields: { name: { label: 'Name', placeholder: 'Name' }, email: { label: 'Email', placeholder: 'Email' }, company: { label: 'Company', placeholder: 'Company' }, message: { label: 'Message', placeholder: 'Message' } }, 
          submitButton: 'Send' 
        },
        footer: { 
          brand: { name: 'Brand', logo: 'B', description: 'Desc' }, 
          socialLinks: [], 
          linkGroups: [], 
          newsletter: { title: 'Newsletter', description: 'Subscribe', placeholder: 'Email', buttonLabel: 'Subscribe' }, 
          copyright: '© 2024' 
        },
        navigation: { 
          brand: { name: 'Brand', logo: 'B' }, 
          links: [{ name: 'Home', href: '#home' }] 
        }
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
        hero: { 
          badge: { label: 'Badge', icon: 'Sparkles' }, 
          mainHeadline: 'Headline', 
          subHeadline: 'Subheadline', 
          description: 'Description', 
          ctaButtons: [{ label: 'CTA', targetSection: '#contact' }], 
          statistics: [{ number: '1', label: 'Stat' }] 
        },
        services: { 
          eyebrow: { label: 'Services', icon: 'Rocket' }, 
          title: 'Services', 
          description: 'Our services', 
          services: [{ title: 'Service', description: 'Desc', icon: 'Code', colorGradient: 'gradient' }], 
          ctaButton: { label: 'CTA', targetSection: '#contact' } 
        },
        projects: {
          eyebrow: { label: 'Projects', icon: 'ExternalLink' },
          title: 'Projects',
          description: 'Our projects',
          projects: [], // Empty array
          ctaButton: { label: 'CTA', targetSection: '#contact' }
        },
        about: { 
          eyebrow: { label: 'About', icon: 'Users' }, 
          title: 'About', 
          description: 'About us', 
          story: { title: 'Story', paragraphs: ['Para'] }, 
          statistics: [{ icon: 'Users', label: 'Label', value: '1', colorGradient: 'gradient' }], 
          values: { title: 'Values', items: [{ title: 'Value', description: 'Desc', icon: 'Icon' }] }, 
          ctaButton: { label: 'CTA', targetSection: '#contact' } 
        },
        contact: { 
          eyebrow: { label: 'Contact', icon: 'Send' }, 
          title: 'Contact', 
          description: 'Contact us', 
          contactInfo: [{ icon: 'Mail', label: 'Email', value: 'email@test.com', colorGradient: 'gradient' }], 
          officeHours: { weekdays: '9-5', saturday: '10-4', sunday: 'Closed' }, 
          formFields: { name: { label: 'Name', placeholder: 'Name' }, email: { label: 'Email', placeholder: 'Email' }, company: { label: 'Company', placeholder: 'Company' }, message: { label: 'Message', placeholder: 'Message' } }, 
          submitButton: 'Send' 
        },
        footer: { 
          brand: { name: 'Brand', logo: 'B', description: 'Desc' }, 
          socialLinks: [], 
          linkGroups: [], 
          newsletter: { title: 'Newsletter', description: 'Subscribe', placeholder: 'Email', buttonLabel: 'Subscribe' }, 
          copyright: '© 2024' 
        },
        navigation: { 
          brand: { name: 'Brand', logo: 'B' }, 
          links: [{ name: 'Home', href: '#home' }] 
        }
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
        hero: { 
          badge: { label: 'Badge', icon: 'Sparkles' }, 
          mainHeadline: 'Headline', 
          subHeadline: 'Subheadline', 
          description: 'Description', 
          ctaButtons: [{ label: 'CTA', targetSection: '#contact' }], 
          statistics: [{ number: '1', label: 'Stat' }] 
        },
        services: { 
          eyebrow: { label: 'Services', icon: 'Rocket' }, 
          title: 'Services', 
          description: 'Our services', 
          services: [{ title: 'Service', description: 'Desc', icon: 'Code', colorGradient: 'gradient' }], 
          ctaButton: { label: 'CTA', targetSection: '#contact' } 
        },
        projects: { 
          eyebrow: { label: 'Projects', icon: 'ExternalLink' }, 
          title: 'Projects', 
          description: 'Our projects', 
          projects: [{ title: 'Project', category: 'Cat', description: 'Desc', image: '/img.jpg', imageAlt: 'Alt', tags: ['tag'], colorGradient: 'gradient' }], 
          ctaButton: { label: 'CTA', targetSection: '#contact' } 
        },
        about: { 
          eyebrow: { label: 'About', icon: 'Users' }, 
          title: 'About', 
          description: 'About us', 
          story: { title: 'Story', paragraphs: ['Para'] }, 
          statistics: [{ icon: 'Users', label: 'Label', value: '1', colorGradient: 'gradient' }], 
          values: { title: 'Values', items: [{ title: 'Value', description: 'Desc', icon: 'Icon' }] }, 
          ctaButton: { label: 'CTA', targetSection: '#contact' } 
        },
        contact: { 
          eyebrow: { label: 'Contact', icon: 'Send' }, 
          title: 'Contact', 
          description: 'Contact us', 
          contactInfo: [{ icon: 'Mail', label: 'Email', value: 'email@test.com', colorGradient: 'gradient' }], 
          officeHours: { weekdays: '9-5', saturday: '10-4', sunday: 'Closed' }, 
          formFields: { name: { label: 'Name', placeholder: 'Name' }, email: { label: 'Email', placeholder: 'Email' }, company: { label: 'Company', placeholder: 'Company' }, message: { label: 'Message', placeholder: 'Message' } }, 
          submitButton: 'Send' 
        },
        footer: { 
          brand: { name: 'Brand', logo: 'B', description: 'Desc' }, 
          socialLinks: [], 
          linkGroups: [], 
          newsletter: { title: 'Newsletter', description: 'Subscribe', placeholder: 'Email', buttonLabel: 'Subscribe' }, 
          copyright: '© 2024' 
        },
        navigation: {
          brand: { name: 'Brand', logo: 'B' },
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
        hero: { 
          badge: { label: 'Badge', icon: 'Sparkles' }, 
          mainHeadline: 'Headline', 
          subHeadline: 'Subheadline', 
          description: 'Description', 
          ctaButtons: [{ label: 'CTA', targetSection: '#contact' }], 
          statistics: [{ number: '1', label: 'Stat' }] 
        },
        services: {
          eyebrow: { label: 'Services', icon: 'Rocket' },
          title: 'Services',
          description: 'Our services',
          services: [
            { title: 'Service', description: 'Desc' } // Missing icon
          ],
          ctaButton: { label: 'CTA', targetSection: '#contact' }
        },
        projects: { 
          eyebrow: { label: 'Projects', icon: 'ExternalLink' }, 
          title: 'Projects', 
          description: 'Our projects', 
          projects: [{ title: 'Project', category: 'Cat', description: 'Desc', image: '/img.jpg', imageAlt: 'Alt', tags: ['tag'], colorGradient: 'gradient' }], 
          ctaButton: { label: 'CTA', targetSection: '#contact' } 
        },
        about: { 
          eyebrow: { label: 'About', icon: 'Users' }, 
          title: 'About', 
          description: 'About us', 
          story: { title: 'Story', paragraphs: ['Para'] }, 
          statistics: [{ icon: 'Users', label: 'Label', value: '1', colorGradient: 'gradient' }], 
          values: { title: 'Values', items: [{ title: 'Value', description: 'Desc', icon: 'Icon' }] }, 
          ctaButton: { label: 'CTA', targetSection: '#contact' } 
        },
        contact: { 
          eyebrow: { label: 'Contact', icon: 'Send' }, 
          title: 'Contact', 
          description: 'Contact us', 
          contactInfo: [{ icon: 'Mail', label: 'Email', value: 'email@test.com', colorGradient: 'gradient' }], 
          officeHours: { weekdays: '9-5', saturday: '10-4', sunday: 'Closed' }, 
          formFields: { name: { label: 'Name', placeholder: 'Name' }, email: { label: 'Email', placeholder: 'Email' }, company: { label: 'Company', placeholder: 'Company' }, message: { label: 'Message', placeholder: 'Message' } }, 
          submitButton: 'Send' 
        },
        footer: { 
          brand: { name: 'Brand', logo: 'B', description: 'Desc' }, 
          socialLinks: [], 
          linkGroups: [], 
          newsletter: { title: 'Newsletter', description: 'Subscribe', placeholder: 'Email', buttonLabel: 'Subscribe' }, 
          copyright: '© 2024' 
        },
        navigation: { 
          brand: { name: 'Brand', logo: 'B' }, 
          links: [{ name: 'Home', href: '#home' }] 
        }
      };

      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => invalidContent
      });

      const content = await contentManager.loadContent();

      expect(content).toBeDefined();
      expect(content.services.services).toEqual([]);
    });

    it('should return fallback content when project item is missing required fields', async () => {
      const invalidContent = {
        hero: { 
          badge: { label: 'Badge', icon: 'Sparkles' }, 
          mainHeadline: 'Headline', 
          subHeadline: 'Subheadline', 
          description: 'Description', 
          ctaButtons: [{ label: 'CTA', targetSection: '#contact' }], 
          statistics: [{ number: '1', label: 'Stat' }] 
        },
        services: { 
          eyebrow: { label: 'Services', icon: 'Rocket' }, 
          title: 'Services', 
          description: 'Our services', 
          services: [{ title: 'Service', description: 'Desc', icon: 'Code', colorGradient: 'gradient' }], 
          ctaButton: { label: 'CTA', targetSection: '#contact' } 
        },
        projects: {
          eyebrow: { label: 'Projects', icon: 'ExternalLink' },
          title: 'Projects',
          description: 'Our projects',
          projects: [
            { title: 'Project', category: 'Cat', description: 'Desc' } // Missing image
          ],
          ctaButton: { label: 'CTA', targetSection: '#contact' }
        },
        about: { 
          eyebrow: { label: 'About', icon: 'Users' }, 
          title: 'About', 
          description: 'About us', 
          story: { title: 'Story', paragraphs: ['Para'] }, 
          statistics: [{ icon: 'Users', label: 'Label', value: '1', colorGradient: 'gradient' }], 
          values: { title: 'Values', items: [{ title: 'Value', description: 'Desc', icon: 'Icon' }] }, 
          ctaButton: { label: 'CTA', targetSection: '#contact' } 
        },
        contact: { 
          eyebrow: { label: 'Contact', icon: 'Send' }, 
          title: 'Contact', 
          description: 'Contact us', 
          contactInfo: [{ icon: 'Mail', label: 'Email', value: 'email@test.com', colorGradient: 'gradient' }], 
          officeHours: { weekdays: '9-5', saturday: '10-4', sunday: 'Closed' }, 
          formFields: { name: { label: 'Name', placeholder: 'Name' }, email: { label: 'Email', placeholder: 'Email' }, company: { label: 'Company', placeholder: 'Company' }, message: { label: 'Message', placeholder: 'Message' } }, 
          submitButton: 'Send' 
        },
        footer: { 
          brand: { name: 'Brand', logo: 'B', description: 'Desc' }, 
          socialLinks: [], 
          linkGroups: [], 
          newsletter: { title: 'Newsletter', description: 'Subscribe', placeholder: 'Email', buttonLabel: 'Subscribe' }, 
          copyright: '© 2024' 
        },
        navigation: { 
          brand: { name: 'Brand', logo: 'B' }, 
          links: [{ name: 'Home', href: '#home' }] 
        }
      };

      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => invalidContent
      });

      const content = await contentManager.loadContent();

      expect(content).toBeDefined();
      expect(content.projects.projects).toEqual([]);
    });
  });

  describe('Scenario 5: Fallback content verification', () => {
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

  describe('Scenario 6: Combined error scenarios', () => {
    it('should handle combination of missing sections and invalid fields', async () => {
      const invalidContent = {
        hero: {
          badge: { label: 'Badge', icon: 'Sparkles' },
          mainHeadline: 'Headline',
          // Missing subHeadline
          description: 'Description',
          ctaButtons: [{ label: 'CTA', targetSection: '#contact' }],
          statistics: []  // Empty array
        },
        // Missing services section
        projects: {
          eyebrow: { label: 'Projects', icon: 'ExternalLink' },
          title: 'Projects',
          description: 'Our projects',
          projects: [], // Empty array
          ctaButton: { label: 'CTA', targetSection: '#contact' }
        },
        // Missing about section
        contact: { 
          eyebrow: { label: 'Contact', icon: 'Send' }, 
          title: 'Contact', 
          description: 'Contact us', 
          contactInfo: [], // Empty array
          officeHours: { weekdays: '9-5', saturday: '10-4', sunday: 'Closed' }, 
          formFields: { name: { label: 'Name', placeholder: 'Name' }, email: { label: 'Email', placeholder: 'Email' }, company: { label: 'Company', placeholder: 'Company' }, message: { label: 'Message', placeholder: 'Message' } }, 
          submitButton: 'Send' 
        },
        footer: { 
          brand: { name: 'Brand', logo: 'B', description: 'Desc' }, 
          socialLinks: [], 
          linkGroups: [], 
          newsletter: { title: 'Newsletter', description: 'Subscribe', placeholder: 'Email', buttonLabel: 'Subscribe' }, 
          copyright: '© 2024' 
        },
        navigation: { 
          brand: { name: 'Brand', logo: 'B' }, 
          links: [] 
        }
      };

      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => invalidContent
      });

      const content = await contentManager.loadContent();

      // Should return complete fallback content
      expect(content).toBeDefined();
      expect(content.hero.mainHeadline).toBe('Welcome to Our Site');
      expect(content.services).toBeDefined();
      expect(content.about).toBeDefined();
    });

    it('should handle completely empty object', async () => {
      const emptyContent = {};

      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => emptyContent
      });

      const content = await contentManager.loadContent();

      // Should return complete fallback content
      expect(content).toBeDefined();
      expect(content.hero).toBeDefined();
      expect(content.services).toBeDefined();
      expect(content.projects).toBeDefined();
      expect(content.about).toBeDefined();
      expect(content.contact).toBeDefined();
      expect(content.footer).toBeDefined();
      expect(content.navigation).toBeDefined();
    });
  });
});
