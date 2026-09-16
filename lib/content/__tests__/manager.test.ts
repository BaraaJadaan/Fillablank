// lib/content/__tests__/manager.test.ts

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ContentManager } from '../manager';
import { SiteContent } from '../types';

describe('ContentManager', () => {
  let contentManager: ContentManager;

  beforeEach(() => {
    contentManager = ContentManager.getInstance();
    vi.clearAllMocks();
  });

  describe('Singleton Pattern', () => {
    it('should return the same instance', () => {
      const instance1 = ContentManager.getInstance();
      const instance2 = ContentManager.getInstance();
      expect(instance1).toBe(instance2);
    });
  });

  describe('loadContent', () => {
    it('should load valid content from JSON', async () => {
      const mockContent: SiteContent = {
        hero: {
          badge: { label: 'Test', icon: 'Sparkles' },
          mainHeadline: 'Test Headline',
          subHeadline: 'Test Sub',
          description: 'Test description',
          ctaButtons: [{ label: 'Test', targetSection: '#test' }],
          statistics: [{ number: '1', label: 'Test' }]
        },
        services: {
          eyebrow: { label: 'Services', icon: 'Rocket' },
          title: 'Test Services',
          description: 'Test',
          services: [
            { title: 'Service 1', description: 'Desc', icon: 'Code', colorGradient: 'test' }
          ],
          ctaButton: { label: 'Test', targetSection: '#test' }
        },
        projects: {
          eyebrow: { label: 'Projects', icon: 'ExternalLink' },
          title: 'Test Projects',
          description: 'Test',
          projects: [
            {
              title: 'Project 1',
              category: 'Test',
              description: 'Desc',
              image: '/test.jpg',
              imageAlt: 'Test',
              tags: ['tag1'],
              colorGradient: 'test'
            }
          ],
          ctaButton: { label: 'Test', targetSection: '#test' }
        },
        about: {
          eyebrow: { label: 'About', icon: 'Users' },
          title: 'Test About',
          description: 'Test',
          story: { title: 'Story', paragraphs: ['Para 1'] },
          statistics: [
            { icon: 'Users', label: 'Test', value: '10', colorGradient: 'test' }
          ],
          values: {
            title: 'Values',
            items: [{ title: 'Value 1', description: 'Desc', icon: 'Award' }]
          },
          ctaButton: { label: 'Test', targetSection: '#test' }
        },
        contact: {
          eyebrow: { label: 'Contact', icon: 'Send' },
          title: 'Test Contact',
          description: 'Test',
          contactInfo: [
            { icon: 'Mail', label: 'Email', value: 'test@test.com', colorGradient: 'test' }
          ],
          officeHours: { weekdays: '9-5', saturday: '10-4', sunday: 'Closed' },
          formFields: {
            name: { label: 'Name', placeholder: 'Name' },
            email: { label: 'Email', placeholder: 'Email' },
            company: { label: 'Company', placeholder: 'Company' },
            message: { label: 'Message', placeholder: 'Message' }
          },
          submitButton: 'Send'
        },
        footer: {
          brand: { name: 'Test', logo: 'T', description: 'Test' },
          socialLinks: [],
          linkGroups: [],
          newsletter: {
            title: 'Newsletter',
            description: 'Subscribe',
            placeholder: 'Email',
            buttonLabel: 'Subscribe'
          },
          copyright: '© 2024'
        },
        navigation: {
          brand: { name: 'Test', logo: 'T' },
          links: [{ name: 'Home', href: '#home' }]
        }
      };

      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => mockContent
      });

      const content = await contentManager.loadContent();
      expect(content).toEqual(mockContent);
    });

    it('should return default content when fetch fails', async () => {
      global.fetch = vi.fn().mockRejectedValue(new Error('Network error'));

      const content = await contentManager.loadContent();
      expect(content).toBeDefined();
      expect(content.hero.mainHeadline).toBe('Welcome to Our Site');
    });

    it('should return default content when response is not ok', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        statusText: 'Not Found'
      });

      const content = await contentManager.loadContent();
      expect(content).toBeDefined();
      expect(content.hero.mainHeadline).toBe('Welcome to Our Site');
    });
  });

  describe('getIcon', () => {
    it('should return the correct icon for valid icon name', () => {
      const icon = contentManager.getIcon('Sparkles');
      expect(icon).toBeDefined();
    });

    it('should return default icon for invalid icon name', () => {
      const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      const icon = contentManager.getIcon('InvalidIcon');
      expect(icon).toBeDefined();
      expect(consoleWarnSpy).toHaveBeenCalledWith('Icon not found: InvalidIcon, using default');
      consoleWarnSpy.mockRestore();
    });
  });

  describe('resolveImagePath', () => {
    it('should return external URLs unchanged', () => {
      expect(contentManager.resolveImagePath('https://example.com/image.jpg')).toBe('https://example.com/image.jpg');
      expect(contentManager.resolveImagePath('http://example.com/image.jpg')).toBe('http://example.com/image.jpg');
    });

    it('should normalize Google Drive share links to direct image URLs', () => {
      expect(
        contentManager.resolveImagePath('https://drive.google.com/file/d/1TZI-YPZgMorP0AsJFMbevhom1LW-zGlJ/view?usp=sharing')
      ).toBe('https://drive.google.com/thumbnail?id=1TZI-YPZgMorP0AsJFMbevhom1LW-zGlJ&sz=w2000');
    });

    it('should prepend / to relative paths', () => {
      expect(contentManager.resolveImagePath('images/test.jpg')).toBe('/images/test.jpg');
    });

    it('should return absolute paths unchanged', () => {
      expect(contentManager.resolveImagePath('/images/test.jpg')).toBe('/images/test.jpg');
    });
  });

  describe('Validation', () => {
    it('should throw error for missing required section', async () => {
      const invalidContent = {
        hero: {
          badge: { label: 'Test', icon: 'Sparkles' },
          mainHeadline: 'Test',
          subHeadline: 'Test',
          description: 'Test',
          ctaButtons: [{ label: 'Test', targetSection: '#test' }],
          statistics: [{ number: '1', label: 'Test' }]
        }
        // Missing other required sections
      };

      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => invalidContent
      });

      const content = await contentManager.loadContent();
      // Should return default content due to validation failure
      expect(content.hero.mainHeadline).toBe('Welcome to Our Site');
    });

    it('should throw error for invalid hero section', async () => {
      const invalidContent = {
        hero: {
          badge: { label: 'Test', icon: 'Sparkles' },
          // Missing mainHeadline
          subHeadline: 'Test',
          description: 'Test',
          ctaButtons: [],
          statistics: []
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
      // Should return default content due to validation failure
      expect(content.hero.mainHeadline).toBe('Welcome to Our Site');
    });
  });
});
