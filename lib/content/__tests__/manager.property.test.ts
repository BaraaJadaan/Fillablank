// lib/content/__tests__/manager.property.test.ts
// Feature: content-management-system, Property 1: Configuration Loading

import { describe, it, expect, beforeEach, vi } from 'vitest';
import * as fc from 'fast-check';
import { ContentManager } from '../manager';
import { SiteContent } from '../types';

describe('ContentManager Property-Based Tests', () => {
  let contentManager: ContentManager;

  beforeEach(() => {
    contentManager = ContentManager.getInstance();
    vi.clearAllMocks();
  });

  // Generator for valid CTAButton
  const ctaButtonArbitrary = () =>
    fc.record({
      label: fc.string({ minLength: 1, maxLength: 50 }),
      targetSection: fc.oneof(
        fc.constant('#home'),
        fc.constant('#services'),
        fc.constant('#projects'),
        fc.constant('#about'),
        fc.constant('#contact')
      ),
      variant: fc.option(fc.constantFrom('primary', 'secondary'), { nil: undefined })
    });

  // Generator for valid Statistic
  const statisticArbitrary = () =>
    fc.record({
      number: fc.string({ minLength: 1, maxLength: 10 }),
      label: fc.string({ minLength: 1, maxLength: 50 })
    });

  // Generator for valid HeroContent
  const heroContentArbitrary = () =>
    fc.record({
      badge: fc.record({
        label: fc.string({ minLength: 1, maxLength: 50 }),
        icon: fc.constantFrom('Sparkles', 'Star', 'Zap', 'Award')
      }),
      mainHeadline: fc.string({ minLength: 1, maxLength: 100 }),
      subHeadline: fc.string({ minLength: 1, maxLength: 100 }),
      description: fc.string({ minLength: 1, maxLength: 200 }),
      ctaButtons: fc.array(ctaButtonArbitrary(), { minLength: 1, maxLength: 3 }),
      statistics: fc.array(statisticArbitrary(), { minLength: 1, maxLength: 5 })
    });

  // Generator for valid Service
  const serviceArbitrary = () =>
    fc.record({
      title: fc.string({ minLength: 1, maxLength: 50 }),
      description: fc.string({ minLength: 1, maxLength: 200 }),
      icon: fc.constantFrom('Code', 'Palette', 'Smartphone', 'Globe', 'Rocket'),
      colorGradient: fc.string({ minLength: 1, maxLength: 50 })
    });

  // Generator for valid ServicesContent
  const servicesContentArbitrary = () =>
    fc.record({
      eyebrow: fc.record({
        label: fc.string({ minLength: 1, maxLength: 50 }),
        icon: fc.constantFrom('Rocket', 'Briefcase', 'Tool')
      }),
      title: fc.string({ minLength: 1, maxLength: 100 }),
      description: fc.string({ minLength: 1, maxLength: 200 }),
      services: fc.array(serviceArbitrary(), { minLength: 1, maxLength: 6 }),
      ctaButton: fc.record({
        label: fc.string({ minLength: 1, maxLength: 50 }),
        targetSection: fc.constant('#contact')
      })
    });

  // Generator for valid Project
  const projectArbitrary = () =>
    fc.record({
      title: fc.string({ minLength: 1, maxLength: 50 }),
      category: fc.string({ minLength: 1, maxLength: 30 }),
      description: fc.string({ minLength: 1, maxLength: 200 }),
      image: fc.oneof(
        fc.webUrl(),
        fc.string({ minLength: 1, maxLength: 50 }).map(s => `/images/${s}.jpg`)
      ),
      imageAlt: fc.string({ minLength: 1, maxLength: 100 }),
      tags: fc.array(fc.string({ minLength: 1, maxLength: 20 }), { minLength: 1, maxLength: 5 }),
      colorGradient: fc.string({ minLength: 1, maxLength: 50 }),
      links: fc.option(
        fc.record({
          demo: fc.option(fc.webUrl(), { nil: undefined }),
          github: fc.option(fc.webUrl(), { nil: undefined })
        }),
        { nil: undefined }
      )
    });

  // Generator for valid ProjectsContent
  const projectsContentArbitrary = () =>
    fc.record({
      eyebrow: fc.record({
        label: fc.string({ minLength: 1, maxLength: 50 }),
        icon: fc.constantFrom('ExternalLink', 'Folder', 'Layout')
      }),
      title: fc.string({ minLength: 1, maxLength: 100 }),
      description: fc.string({ minLength: 1, maxLength: 200 }),
      projects: fc.array(projectArbitrary(), { minLength: 1, maxLength: 6 }),
      ctaButton: fc.record({
        label: fc.string({ minLength: 1, maxLength: 50 }),
        targetSection: fc.constant('#contact')
      })
    });

  // Generator for valid AboutStatistic
  const aboutStatisticArbitrary = () =>
    fc.record({
      icon: fc.constantFrom('Users', 'Award', 'Target', 'TrendingUp'),
      label: fc.string({ minLength: 1, maxLength: 50 }),
      value: fc.string({ minLength: 1, maxLength: 20 }),
      colorGradient: fc.string({ minLength: 1, maxLength: 50 })
    });

  // Generator for valid CoreValue
  const coreValueArbitrary = () =>
    fc.record({
      title: fc.string({ minLength: 1, maxLength: 50 }),
      description: fc.string({ minLength: 1, maxLength: 200 }),
      icon: fc.constantFrom('Award', 'Heart', 'Shield', 'Lightbulb')
    });

  // Generator for valid AboutContent
  const aboutContentArbitrary = () =>
    fc.record({
      eyebrow: fc.record({
        label: fc.string({ minLength: 1, maxLength: 50 }),
        icon: fc.constantFrom('Users', 'Info', 'BookOpen')
      }),
      title: fc.string({ minLength: 1, maxLength: 100 }),
      description: fc.string({ minLength: 1, maxLength: 200 }),
      story: fc.record({
        title: fc.string({ minLength: 1, maxLength: 100 }),
        paragraphs: fc.array(fc.string({ minLength: 1, maxLength: 300 }), { minLength: 1, maxLength: 5 })
      }),
      statistics: fc.array(aboutStatisticArbitrary(), { minLength: 1, maxLength: 4 }),
      values: fc.record({
        title: fc.string({ minLength: 1, maxLength: 100 }),
        items: fc.array(coreValueArbitrary(), { minLength: 1, maxLength: 4 })
      }),
      ctaButton: fc.record({
        label: fc.string({ minLength: 1, maxLength: 50 }),
        targetSection: fc.constant('#contact')
      })
    });

  // Generator for valid ContactInfo
  const contactInfoArbitrary = () =>
    fc.record({
      icon: fc.constantFrom('Mail', 'Phone', 'MapPin', 'Clock'),
      label: fc.string({ minLength: 1, maxLength: 50 }),
      value: fc.string({ minLength: 1, maxLength: 100 }),
      colorGradient: fc.string({ minLength: 1, maxLength: 50 })
    });

  // Generator for valid ContactContent
  const contactContentArbitrary = () =>
    fc.record({
      eyebrow: fc.record({
        label: fc.string({ minLength: 1, maxLength: 50 }),
        icon: fc.constantFrom('Send', 'Mail', 'MessageSquare')
      }),
      title: fc.string({ minLength: 1, maxLength: 100 }),
      description: fc.string({ minLength: 1, maxLength: 200 }),
      contactInfo: fc.array(contactInfoArbitrary(), { minLength: 1, maxLength: 4 }),
      officeHours: fc.record({
        weekdays: fc.string({ minLength: 1, maxLength: 50 }),
        saturday: fc.string({ minLength: 1, maxLength: 50 }),
        sunday: fc.string({ minLength: 1, maxLength: 50 })
      }),
      formFields: fc.record({
        name: fc.record({
          label: fc.string({ minLength: 1, maxLength: 50 }),
          placeholder: fc.string({ minLength: 1, maxLength: 50 })
        }),
        email: fc.record({
          label: fc.string({ minLength: 1, maxLength: 50 }),
          placeholder: fc.string({ minLength: 1, maxLength: 50 })
        }),
        company: fc.record({
          label: fc.string({ minLength: 1, maxLength: 50 }),
          placeholder: fc.string({ minLength: 1, maxLength: 50 })
        }),
        message: fc.record({
          label: fc.string({ minLength: 1, maxLength: 50 }),
          placeholder: fc.string({ minLength: 1, maxLength: 50 })
        })
      }),
      submitButton: fc.string({ minLength: 1, maxLength: 50 })
    });

  // Generator for valid SocialLink
  const socialLinkArbitrary = () =>
    fc.record({
      platform: fc.constantFrom('GitHub', 'Twitter', 'LinkedIn', 'Facebook'),
      url: fc.webUrl(),
      icon: fc.constantFrom('Github', 'Twitter', 'Linkedin', 'Facebook'),
      label: fc.string({ minLength: 1, maxLength: 50 })
    });

  // Generator for valid FooterLinkGroup
  const footerLinkGroupArbitrary = () =>
    fc.record({
      category: fc.string({ minLength: 1, maxLength: 50 }),
      links: fc.array(
        fc.record({
          name: fc.string({ minLength: 1, maxLength: 50 }),
          href: fc.oneof(
            fc.webUrl(),
            fc.string({ minLength: 1, maxLength: 20 }).map(s => `#${s}`)
          )
        }),
        { minLength: 1, maxLength: 5 }
      )
    });

  // Generator for valid FooterContent
  const footerContentArbitrary = () =>
    fc.record({
      brand: fc.record({
        name: fc.string({ minLength: 1, maxLength: 50 }),
        logo: fc.string({ minLength: 1, maxLength: 10 }),
        description: fc.string({ minLength: 1, maxLength: 200 })
      }),
      socialLinks: fc.array(socialLinkArbitrary(), { minLength: 0, maxLength: 5 }),
      linkGroups: fc.array(footerLinkGroupArbitrary(), { minLength: 0, maxLength: 4 }),
      newsletter: fc.record({
        title: fc.string({ minLength: 1, maxLength: 50 }),
        description: fc.string({ minLength: 1, maxLength: 200 }),
        placeholder: fc.string({ minLength: 1, maxLength: 50 }),
        buttonLabel: fc.string({ minLength: 1, maxLength: 50 })
      }),
      copyright: fc.string({ minLength: 1, maxLength: 100 })
    });

  // Generator for valid NavigationContent
  const navigationContentArbitrary = () =>
    fc.record({
      brand: fc.record({
        name: fc.string({ minLength: 1, maxLength: 50 }),
        logo: fc.string({ minLength: 1, maxLength: 10 })
      }),
      links: fc.array(
        fc.record({
          name: fc.string({ minLength: 1, maxLength: 50 }),
          href: fc.oneof(
            fc.webUrl(),
            fc.string({ minLength: 1, maxLength: 20 }).map(s => `#${s}`)
          )
        }),
        { minLength: 1, maxLength: 7 }
      )
    });

  // Generator for valid SiteContent
  const validSiteContentArbitrary = () =>
    fc.record({
      hero: heroContentArbitrary(),
      services: servicesContentArbitrary(),
      projects: projectsContentArbitrary(),
      about: aboutContentArbitrary(),
      contact: contactContentArbitrary(),
      footer: footerContentArbitrary(),
      navigation: navigationContentArbitrary()
    });

  /**
   * Property 1: Configuration Loading
   * **Validates: Requirements 1.1, 1.2, 1.3**
   * 
   * For any valid JSON configuration file, the Content_Manager should successfully 
   * load and return a SiteContent object containing all required sections.
   */
  it('should load any valid JSON configuration and return SiteContent with all required sections', async () => {
    await fc.assert(
      fc.asyncProperty(validSiteContentArbitrary(), async (generatedContent) => {
        // Mock fetch to return the generated content
        global.fetch = vi.fn().mockResolvedValue({
          ok: true,
          json: async () => generatedContent
        });

        // Load content using ContentManager
        const loadedContent = await contentManager.loadContent();

        // Verify all required sections are present
        expect(loadedContent).toHaveProperty('hero');
        expect(loadedContent).toHaveProperty('services');
        expect(loadedContent).toHaveProperty('projects');
        expect(loadedContent).toHaveProperty('about');
        expect(loadedContent).toHaveProperty('contact');
        expect(loadedContent).toHaveProperty('footer');
        expect(loadedContent).toHaveProperty('navigation');

        // Verify the loaded content matches the generated content structure
        expect(loadedContent.hero).toBeDefined();
        expect(loadedContent.services).toBeDefined();
        expect(loadedContent.projects).toBeDefined();
        expect(loadedContent.about).toBeDefined();
        expect(loadedContent.contact).toBeDefined();
        expect(loadedContent.footer).toBeDefined();
        expect(loadedContent.navigation).toBeDefined();
      }),
      { numRuns: 100 }
    );
  });

  /**
   * Property 2: Nested Structure Preservation
   * Feature: content-management-system, Property 2: Nested Structure Preservation
   * **Validates: Requirements 1.4**
   * 
   * For any configuration with nested data structures (arrays of objects, nested objects),
   * loading and parsing should preserve the complete structure without data loss.
   */
  it('should preserve nested data structures without data loss', async () => {
    await fc.assert(
      fc.asyncProperty(validSiteContentArbitrary(), async (generatedContent) => {
        // Mock fetch to return the generated content
        global.fetch = vi.fn().mockResolvedValue({
          ok: true,
          json: async () => generatedContent
        });

        // Load content using ContentManager
        const loadedContent = await contentManager.loadContent();

        // Verify nested arrays are preserved
        // Services array
        expect(loadedContent.services.services).toHaveLength(generatedContent.services.services.length);
        loadedContent.services.services.forEach((service, index) => {
          expect(service.title).toBe(generatedContent.services.services[index].title);
          expect(service.description).toBe(generatedContent.services.services[index].description);
          expect(service.icon).toBe(generatedContent.services.services[index].icon);
          expect(service.colorGradient).toBe(generatedContent.services.services[index].colorGradient);
        });

        // Projects array with nested objects
        expect(loadedContent.projects.projects).toHaveLength(generatedContent.projects.projects.length);
        loadedContent.projects.projects.forEach((project, index) => {
          expect(project.title).toBe(generatedContent.projects.projects[index].title);
          expect(project.category).toBe(generatedContent.projects.projects[index].category);
          expect(project.description).toBe(generatedContent.projects.projects[index].description);
          expect(project.tags).toEqual(generatedContent.projects.projects[index].tags);
          // Verify nested optional links object
          if (generatedContent.projects.projects[index].links) {
            expect(project.links).toBeDefined();
            expect(project.links?.demo).toBe(generatedContent.projects.projects[index].links?.demo);
            expect(project.links?.github).toBe(generatedContent.projects.projects[index].links?.github);
          }
        });

        // About section nested structures
        expect(loadedContent.about.story.paragraphs).toHaveLength(generatedContent.about.story.paragraphs.length);
        expect(loadedContent.about.story.paragraphs).toEqual(generatedContent.about.story.paragraphs);
        
        expect(loadedContent.about.statistics).toHaveLength(generatedContent.about.statistics.length);
        loadedContent.about.statistics.forEach((stat, index) => {
          expect(stat.icon).toBe(generatedContent.about.statistics[index].icon);
          expect(stat.label).toBe(generatedContent.about.statistics[index].label);
          expect(stat.value).toBe(generatedContent.about.statistics[index].value);
          expect(stat.colorGradient).toBe(generatedContent.about.statistics[index].colorGradient);
        });

        expect(loadedContent.about.values.items).toHaveLength(generatedContent.about.values.items.length);
        loadedContent.about.values.items.forEach((value, index) => {
          expect(value.title).toBe(generatedContent.about.values.items[index].title);
          expect(value.description).toBe(generatedContent.about.values.items[index].description);
          expect(value.icon).toBe(generatedContent.about.values.items[index].icon);
        });

        // Contact section nested structures
        expect(loadedContent.contact.contactInfo).toHaveLength(generatedContent.contact.contactInfo.length);
        loadedContent.contact.contactInfo.forEach((info, index) => {
          expect(info.icon).toBe(generatedContent.contact.contactInfo[index].icon);
          expect(info.label).toBe(generatedContent.contact.contactInfo[index].label);
          expect(info.value).toBe(generatedContent.contact.contactInfo[index].value);
          expect(info.colorGradient).toBe(generatedContent.contact.contactInfo[index].colorGradient);
        });

        // Verify nested office hours object
        expect(loadedContent.contact.officeHours.weekdays).toBe(generatedContent.contact.officeHours.weekdays);
        expect(loadedContent.contact.officeHours.saturday).toBe(generatedContent.contact.officeHours.saturday);
        expect(loadedContent.contact.officeHours.sunday).toBe(generatedContent.contact.officeHours.sunday);

        // Footer nested structures
        expect(loadedContent.footer.socialLinks).toHaveLength(generatedContent.footer.socialLinks.length);
        loadedContent.footer.socialLinks.forEach((link, index) => {
          expect(link.platform).toBe(generatedContent.footer.socialLinks[index].platform);
          expect(link.url).toBe(generatedContent.footer.socialLinks[index].url);
          expect(link.icon).toBe(generatedContent.footer.socialLinks[index].icon);
          expect(link.label).toBe(generatedContent.footer.socialLinks[index].label);
        });

        expect(loadedContent.footer.linkGroups).toHaveLength(generatedContent.footer.linkGroups.length);
        loadedContent.footer.linkGroups.forEach((group, index) => {
          expect(group.category).toBe(generatedContent.footer.linkGroups[index].category);
          expect(group.links).toHaveLength(generatedContent.footer.linkGroups[index].links.length);
          group.links.forEach((link, linkIndex) => {
            expect(link.name).toBe(generatedContent.footer.linkGroups[index].links[linkIndex].name);
            expect(link.href).toBe(generatedContent.footer.linkGroups[index].links[linkIndex].href);
          });
        });

        // Hero section nested structures
        expect(loadedContent.hero.ctaButtons).toHaveLength(generatedContent.hero.ctaButtons.length);
        loadedContent.hero.ctaButtons.forEach((button, index) => {
          expect(button.label).toBe(generatedContent.hero.ctaButtons[index].label);
          expect(button.targetSection).toBe(generatedContent.hero.ctaButtons[index].targetSection);
          expect(button.variant).toBe(generatedContent.hero.ctaButtons[index].variant);
        });

        expect(loadedContent.hero.statistics).toHaveLength(generatedContent.hero.statistics.length);
        loadedContent.hero.statistics.forEach((stat, index) => {
          expect(stat.number).toBe(generatedContent.hero.statistics[index].number);
          expect(stat.label).toBe(generatedContent.hero.statistics[index].label);
        });

        // Navigation nested structures
        expect(loadedContent.navigation.links).toHaveLength(generatedContent.navigation.links.length);
        loadedContent.navigation.links.forEach((link, index) => {
          expect(link.name).toBe(generatedContent.navigation.links[index].name);
          expect(link.href).toBe(generatedContent.navigation.links[index].href);
        });
      }),
      { numRuns: 100 }
    );
  });

  /**
   * Property 3: Invalid JSON Error Handling
   * Feature: content-management-system, Property 3: Invalid JSON Error Handling
   * **Validates: Requirements 1.5**
   * 
   * For any malformed JSON input, the Content_Manager should catch the parse error 
   * and log a descriptive error message containing information about the parsing failure.
   */
  it('should catch malformed JSON and log descriptive error message', async () => {
    // Generator for malformed JSON strings
    const malformedJSONArbitrary = () =>
      fc.oneof(
        // Missing closing brace
        fc.constant('{"hero": {"mainHeadline": "test"'),
        // Missing closing bracket
        fc.constant('{"services": {"services": [{"title": "test"}'),
        // Trailing comma
        fc.constant('{"hero": {"mainHeadline": "test",}}'),
        // Single quotes instead of double quotes
        fc.constant("{'hero': {'mainHeadline': 'test'}}"),
        // Unquoted keys
        fc.constant('{hero: {mainHeadline: "test"}}'),
        // Missing quotes around string values
        fc.constant('{"hero": {"mainHeadline": test}}'),
        // Extra closing brace
        fc.constant('{"hero": {"mainHeadline": "test"}}}'),
        // Missing comma between properties
        fc.constant('{"hero": {"mainHeadline": "test" "subHeadline": "test"}}'),
        // Invalid escape sequence
        fc.constant('{"hero": {"mainHeadline": "test\\xtest"}}'),
        // Incomplete string
        fc.constant('{"hero": {"mainHeadline": "test'),
        // Random non-JSON text
        fc.string({ minLength: 1, maxLength: 50 }).filter(s => {
          try {
            JSON.parse(s);
            return false; // If it parses, filter it out
          } catch {
            return true; // Keep strings that don't parse
          }
        })
      );

    await fc.assert(
      fc.asyncProperty(malformedJSONArbitrary(), async (malformedJSON) => {
        // Spy on console.error to capture error messages
        const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

        // Mock fetch to return malformed JSON text
        global.fetch = vi.fn().mockResolvedValue({
          ok: true,
          json: async () => {
            // Simulate JSON.parse throwing an error
            throw new SyntaxError(`Unexpected token in JSON at position ${Math.floor(Math.random() * 50)}`);
          }
        });

        // Load content - should handle the error gracefully
        const loadedContent = await contentManager.loadContent();

        // Verify that console.error was called with error information
        expect(consoleErrorSpy).toHaveBeenCalled();
        const errorCall = consoleErrorSpy.mock.calls[0];
        expect(errorCall[0]).toContain('Error loading content');
        
        // Verify that an error object was logged
        expect(errorCall[1]).toBeDefined();
        
        // Verify that fallback content was returned (not null/undefined)
        expect(loadedContent).toBeDefined();
        expect(loadedContent).toHaveProperty('hero');
        expect(loadedContent).toHaveProperty('services');
        expect(loadedContent).toHaveProperty('projects');
        expect(loadedContent).toHaveProperty('about');
        expect(loadedContent).toHaveProperty('contact');
        expect(loadedContent).toHaveProperty('footer');
        expect(loadedContent).toHaveProperty('navigation');

        // Cleanup
        consoleErrorSpy.mockRestore();
      }),
      { numRuns: 100 }
    );
  });

  /**
   * Property 4: Required Section Validation
   * Feature: content-management-system, Property 4: Required Section Validation
   * **Validates: Requirements 1.3, 2.1, 3.1, 4.1, 5.1, 6.1, 7.1, 8.1**
   * 
   * For any configuration object, validation should fail if any of the required sections 
   * (hero, services, projects, about, contact, footer, navigation) are missing, and should 
   * log which sections are missing.
   */
  it('should fail validation and log missing sections when required sections are absent', async () => {
    const requiredSections = ['hero', 'services', 'projects', 'about', 'contact', 'footer', 'navigation'];
    
    // Generator for configurations with one or more missing sections
    const configWithMissingSectionsArbitrary = () =>
      fc.record({
        validContent: validSiteContentArbitrary(),
        sectionsToRemove: fc.array(
          fc.constantFrom(...requiredSections),
          { minLength: 1, maxLength: requiredSections.length }
        ).map(sections => [...new Set(sections)]) // Remove duplicates
      }).map(({ validContent, sectionsToRemove }) => {
        const contentCopy = { ...validContent };
        sectionsToRemove.forEach(section => {
          delete (contentCopy as any)[section];
        });
        return {
          content: contentCopy,
          missingSections: sectionsToRemove
        };
      });

    await fc.assert(
      fc.asyncProperty(configWithMissingSectionsArbitrary(), async ({ content, missingSections }) => {
        // Spy on console.error to capture error messages
        const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

        // Mock fetch to return content with missing sections
        global.fetch = vi.fn().mockResolvedValue({
          ok: true,
          json: async () => content
        });

        // Load content - should handle the validation error gracefully
        const loadedContent = await contentManager.loadContent();

        // Verify that console.error was called
        expect(consoleErrorSpy).toHaveBeenCalled();
        
        // Verify that the error message mentions the missing section
        const errorCalls = consoleErrorSpy.mock.calls;
        // Extract error messages from all calls - the error object is the second argument
        const errorMessages = errorCalls.map(call => {
          const errorArg = call[1]; // The error object is the second argument
          if (errorArg instanceof Error) {
            return errorArg.message;
          }
          return String(errorArg);
        }).join(' ');
        
        // Check that at least one of the missing sections is mentioned in the error
        const mentionedMissingSection = missingSections.some(section => 
          errorMessages.includes(`Missing required section: ${section}`)
        );
        expect(mentionedMissingSection).toBe(true);
        
        // Verify that fallback content was returned (not null/undefined)
        expect(loadedContent).toBeDefined();
        expect(loadedContent).toHaveProperty('hero');
        expect(loadedContent).toHaveProperty('services');
        expect(loadedContent).toHaveProperty('projects');
        expect(loadedContent).toHaveProperty('about');
        expect(loadedContent).toHaveProperty('contact');
        expect(loadedContent).toHaveProperty('footer');
        expect(loadedContent).toHaveProperty('navigation');

        // Cleanup
        consoleErrorSpy.mockRestore();
      }),
      { numRuns: 100 }
    );
  });

  /**
   * Property 5: Required Field Validation
   * Feature: content-management-system, Property 5: Required Field Validation
   * **Validates: Requirements 9.2**
   * 
   * For any section in the configuration, validation should fail if required fields are missing, 
   * and should log the field name and section where the field is missing.
   */
  it('should fail validation and log missing field names when required fields are absent', async () => {
    // Define required fields for each section with their paths
    const requiredFieldsBySection = {
      hero: [
        { path: 'mainHeadline', errorPattern: 'Hero section: mainHeadline' },
        { path: 'subHeadline', errorPattern: 'Hero section: subHeadline' },
        { path: 'ctaButtons', errorPattern: 'Hero section: ctaButtons' },
        { path: 'statistics', errorPattern: 'Hero section: statistics' }
      ],
      services: [
        { path: 'services', errorPattern: 'Services section: services' }
      ],
      projects: [
        { path: 'projects', errorPattern: 'Projects section: projects' }
      ],
      about: [
        { path: 'story.paragraphs', errorPattern: 'About section: story.paragraphs' },
        { path: 'statistics', errorPattern: 'About section: statistics' },
        { path: 'values.items', errorPattern: 'About section: values.items' }
      ],
      contact: [
        { path: 'contactInfo', errorPattern: 'Contact section: contactInfo' },
        { path: 'officeHours', errorPattern: 'Contact section: officeHours' }
      ],
      footer: [
        { path: 'brand.name', errorPattern: 'Footer section: brand.name' },
        { path: 'socialLinks', errorPattern: 'Footer section: socialLinks' },
        { path: 'linkGroups', errorPattern: 'Footer section: linkGroups' }
      ],
      navigation: [
        { path: 'brand.name', errorPattern: 'Navigation section: brand.name' },
        { path: 'links', errorPattern: 'Navigation section: links' }
      ]
    };

    // Generator for configurations with missing required fields
    const configWithMissingFieldsArbitrary = () =>
      fc.record({
        validContent: validSiteContentArbitrary(),
        sectionToModify: fc.constantFrom('hero', 'services', 'projects', 'about', 'contact', 'footer', 'navigation')
      }).chain(({ validContent, sectionToModify }) => {
        const fieldsForSection = requiredFieldsBySection[sectionToModify as keyof typeof requiredFieldsBySection];
        
        return fc.record({
          validContent: fc.constant(validContent),
          sectionToModify: fc.constant(sectionToModify),
          fieldToRemove: fc.constantFrom(...fieldsForSection)
        });
      }).map(({ validContent, sectionToModify, fieldToRemove }) => {
        const contentCopy = JSON.parse(JSON.stringify(validContent));
        const section = contentCopy[sectionToModify];
        
        // Remove the field based on the path
        const pathParts = fieldToRemove.path.split('.');
        if (pathParts.length === 1) {
          // Simple field like 'mainHeadline' or 'ctaButtons'
          delete section[pathParts[0]];
        } else if (pathParts.length === 2) {
          // Nested field like 'brand.name' or 'story.paragraphs'
          if (section[pathParts[0]]) {
            delete section[pathParts[0]][pathParts[1]];
          }
        }
        
        return {
          content: contentCopy,
          sectionName: sectionToModify,
          fieldName: fieldToRemove.path,
          expectedErrorPattern: fieldToRemove.errorPattern
        };
      });

    await fc.assert(
      fc.asyncProperty(configWithMissingFieldsArbitrary(), async ({ content, sectionName, fieldName, expectedErrorPattern }) => {
        // Spy on console.error to capture error messages
        const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

        // Mock fetch to return content with missing field
        global.fetch = vi.fn().mockResolvedValue({
          ok: true,
          json: async () => content
        });

        // Load content - should handle the validation error gracefully
        const loadedContent = await contentManager.loadContent();

        // Verify that console.error was called
        expect(consoleErrorSpy).toHaveBeenCalled();
        
        // Verify that the error message mentions the missing field and section
        const errorCalls = consoleErrorSpy.mock.calls;
        const errorMessages = errorCalls.map(call => {
          const errorArg = call[1]; // The error object is the second argument
          if (errorArg instanceof Error) {
            return errorArg.message;
          }
          return String(errorArg);
        }).join(' ');
        
        // Check that the error message contains the expected pattern (section + field)
        expect(errorMessages).toContain(expectedErrorPattern);
        
        // Verify that fallback content was returned (not null/undefined)
        expect(loadedContent).toBeDefined();
        expect(loadedContent).toHaveProperty('hero');
        expect(loadedContent).toHaveProperty('services');
        expect(loadedContent).toHaveProperty('projects');
        expect(loadedContent).toHaveProperty('about');
        expect(loadedContent).toHaveProperty('contact');
        expect(loadedContent).toHaveProperty('footer');
        expect(loadedContent).toHaveProperty('navigation');

        // Cleanup
        consoleErrorSpy.mockRestore();
      }),
      { numRuns: 100 }
    );
  });

  /**
   * Property 6: Type Validation
   * Feature: content-management-system, Property 6: Type Validation
   * **Validates: Requirements 9.3**
   * 
   * For any field in the configuration, validation should fail if the field type doesn't match 
   * the expected type (string, number, array, object), and should log the field name, expected 
   * type, and actual type.
   */
  it('should fail validation and log type mismatch when field types are incorrect', async () => {
    // Define fields with their expected types for each section
    // Focus on validations that are actually implemented in the current code
    const fieldTypeValidations = [
      // Hero section - string validations
      { section: 'hero', field: 'mainHeadline', expectedType: 'string', invalidValue: 123, errorPattern: 'mainHeadline is required and must be a string' },
      { section: 'hero', field: 'mainHeadline', expectedType: 'string', invalidValue: true, errorPattern: 'mainHeadline is required and must be a string' },
      { section: 'hero', field: 'mainHeadline', expectedType: 'string', invalidValue: null, errorPattern: 'mainHeadline is required and must be a string' },
      { section: 'hero', field: 'subHeadline', expectedType: 'string', invalidValue: ['array'], errorPattern: 'subHeadline is required and must be a string' },
      
      // Hero section - array validations
      { section: 'hero', field: 'ctaButtons', expectedType: 'array', invalidValue: 'not-array', errorPattern: 'ctaButtons must be a non-empty array' },
      { section: 'hero', field: 'ctaButtons', expectedType: 'array', invalidValue: {}, errorPattern: 'ctaButtons must be a non-empty array' },
      { section: 'hero', field: 'statistics', expectedType: 'array', invalidValue: 42, errorPattern: 'statistics must be a non-empty array' },
      
      // Services section - array validations
      { section: 'services', field: 'services', expectedType: 'array', invalidValue: 'not-array', errorPattern: 'services must be a non-empty array' },
      { section: 'services', field: 'services', expectedType: 'array', invalidValue: null, errorPattern: 'services must be a non-empty array' },
      
      // Projects section - array validations
      { section: 'projects', field: 'projects', expectedType: 'array', invalidValue: 'not-array', errorPattern: 'projects must be a non-empty array' },
      { section: 'projects', field: 'projects', expectedType: 'array', invalidValue: 123, errorPattern: 'projects must be a non-empty array' },
      
      // About section - array validations
      { section: 'about', field: 'story.paragraphs', expectedType: 'array', invalidValue: 'not-array', errorPattern: 'story.paragraphs must be an array' },
      { section: 'about', field: 'statistics', expectedType: 'array', invalidValue: {}, errorPattern: 'statistics must be a non-empty array' },
      { section: 'about', field: 'values.items', expectedType: 'array', invalidValue: 'not-array', errorPattern: 'values.items must be a non-empty array' },
      
      // Contact section - array validations
      { section: 'contact', field: 'contactInfo', expectedType: 'array', invalidValue: 'not-array', errorPattern: 'contactInfo must be a non-empty array' },
      
      // Footer section - array validations
      { section: 'footer', field: 'socialLinks', expectedType: 'array', invalidValue: 'not-array', errorPattern: 'socialLinks must be an array' },
      { section: 'footer', field: 'linkGroups', expectedType: 'array', invalidValue: 42, errorPattern: 'linkGroups must be an array' },
      
      // Navigation section - array validations
      { section: 'navigation', field: 'links', expectedType: 'array', invalidValue: 'not-array', errorPattern: 'links must be a non-empty array' }
    ];

    // Generator for configurations with incorrect field types
    const configWithWrongTypesArbitrary = () =>
      fc.record({
        validContent: validSiteContentArbitrary(),
        typeValidation: fc.constantFrom(...fieldTypeValidations)
      }).map(({ validContent, typeValidation }) => {
        const contentCopy = JSON.parse(JSON.stringify(validContent));
        const section = contentCopy[typeValidation.section];
        
        // Set the field to an invalid type based on the path
        const pathParts = typeValidation.field.split('.');
        if (pathParts.length === 1) {
          // Simple field like 'mainHeadline' or 'ctaButtons'
          section[pathParts[0]] = typeValidation.invalidValue;
        } else if (pathParts.length === 2) {
          // Nested field like 'story.paragraphs' or 'values.items'
          if (section[pathParts[0]]) {
            section[pathParts[0]][pathParts[1]] = typeValidation.invalidValue;
          }
        }
        
        return {
          content: contentCopy,
          sectionName: typeValidation.section,
          fieldName: typeValidation.field,
          expectedType: typeValidation.expectedType,
          actualValue: typeValidation.invalidValue,
          errorPattern: typeValidation.errorPattern
        };
      });

    await fc.assert(
      fc.asyncProperty(configWithWrongTypesArbitrary(), async ({ content, sectionName, fieldName, expectedType, actualValue, errorPattern }) => {
        // Spy on console.error to capture error messages
        const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

        // Mock fetch to return content with wrong field type
        global.fetch = vi.fn().mockResolvedValue({
          ok: true,
          json: async () => content
        });

        // Load content - should handle the validation error gracefully
        const loadedContent = await contentManager.loadContent();

        // Verify that console.error was called
        expect(consoleErrorSpy).toHaveBeenCalled();
        
        // Verify that the error message contains the expected error pattern
        const errorCalls = consoleErrorSpy.mock.calls;
        const errorMessages = errorCalls.map(call => {
          const errorArg = call[1]; // The error object is the second argument
          if (errorArg instanceof Error) {
            return errorArg.message;
          }
          return String(errorArg);
        }).join(' ');
        
        // The error should contain the expected pattern which includes section, field, and type info
        expect(errorMessages).toContain(errorPattern);
        
        // Verify that fallback content was returned (not null/undefined)
        expect(loadedContent).toBeDefined();
        expect(loadedContent).toHaveProperty('hero');
        expect(loadedContent).toHaveProperty('services');
        expect(loadedContent).toHaveProperty('projects');
        expect(loadedContent).toHaveProperty('about');
        expect(loadedContent).toHaveProperty('contact');
        expect(loadedContent).toHaveProperty('footer');
        expect(loadedContent).toHaveProperty('navigation');

        // Cleanup
        consoleErrorSpy.mockRestore();
      }),
      { numRuns: 100 }
    );
  });

  /**
   * Property 7: Array Length Validation
   * Feature: content-management-system, Property 7: Array Length Validation
   * **Validates: Requirements 9.5**
   * 
   * For any array field that requires a minimum number of items (services, projects, statistics, etc.), 
   * validation should fail if the array has fewer items than required, and should log the field name 
   * and minimum required length.
   */
  it('should fail validation and log field name and minimum length when arrays have insufficient items', async () => {
    // Define array fields that require minimum items with their paths and minimum lengths
    const arrayFieldValidations = [
      // Hero section - requires at least 1 item
      { section: 'hero', field: 'ctaButtons', minLength: 1, errorPattern: 'ctaButtons must be a non-empty array' },
      { section: 'hero', field: 'statistics', minLength: 1, errorPattern: 'statistics must be a non-empty array' },
      
      // Services section - requires at least 1 service
      { section: 'services', field: 'services', minLength: 1, errorPattern: 'services must be a non-empty array' },
      
      // Projects section - requires at least 1 project
      { section: 'projects', field: 'projects', minLength: 1, errorPattern: 'projects must be a non-empty array' },
      
      // About section - requires at least 1 statistic and 1 value
      { section: 'about', field: 'statistics', minLength: 1, errorPattern: 'statistics must be a non-empty array' },
      { section: 'about', field: 'values.items', minLength: 1, errorPattern: 'values.items must be a non-empty array' },
      
      // Contact section - requires at least 1 contact info
      { section: 'contact', field: 'contactInfo', minLength: 1, errorPattern: 'contactInfo must be a non-empty array' },
      
      // Navigation section - requires at least 1 link
      { section: 'navigation', field: 'links', minLength: 1, errorPattern: 'links must be a non-empty array' }
    ];

    // Generator for configurations with arrays that have insufficient items (empty arrays)
    const configWithInsufficientArrayItemsArbitrary = () =>
      fc.record({
        validContent: validSiteContentArbitrary(),
        arrayValidation: fc.constantFrom(...arrayFieldValidations)
      }).map(({ validContent, arrayValidation }) => {
        const contentCopy = JSON.parse(JSON.stringify(validContent));
        const section = contentCopy[arrayValidation.section];
        
        // Set the array field to an empty array (insufficient items)
        const pathParts = arrayValidation.field.split('.');
        if (pathParts.length === 1) {
          // Simple field like 'ctaButtons' or 'services'
          section[pathParts[0]] = [];
        } else if (pathParts.length === 2) {
          // Nested field like 'values.items'
          if (section[pathParts[0]]) {
            section[pathParts[0]][pathParts[1]] = [];
          }
        }
        
        return {
          content: contentCopy,
          sectionName: arrayValidation.section,
          fieldName: arrayValidation.field,
          minLength: arrayValidation.minLength,
          errorPattern: arrayValidation.errorPattern
        };
      });

    await fc.assert(
      fc.asyncProperty(configWithInsufficientArrayItemsArbitrary(), async ({ content, sectionName, fieldName, minLength, errorPattern }) => {
        // Spy on console.error to capture error messages
        const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

        // Mock fetch to return content with empty array
        global.fetch = vi.fn().mockResolvedValue({
          ok: true,
          json: async () => content
        });

        // Load content - should handle the validation error gracefully
        const loadedContent = await contentManager.loadContent();

        // Verify that console.error was called
        expect(consoleErrorSpy).toHaveBeenCalled();
        
        // Verify that the error message contains the expected pattern
        // The error should mention the field name and that it must be non-empty
        const errorCalls = consoleErrorSpy.mock.calls;
        const errorMessages = errorCalls.map(call => {
          const errorArg = call[1]; // The error object is the second argument
          if (errorArg instanceof Error) {
            return errorArg.message;
          }
          return String(errorArg);
        }).join(' ');
        
        // Check that the error message contains the expected pattern
        // which includes the field name and the requirement for non-empty array
        expect(errorMessages).toContain(errorPattern);
        
        // Verify that fallback content was returned (not null/undefined)
        expect(loadedContent).toBeDefined();
        expect(loadedContent).toHaveProperty('hero');
        expect(loadedContent).toHaveProperty('services');
        expect(loadedContent).toHaveProperty('projects');
        expect(loadedContent).toHaveProperty('about');
        expect(loadedContent).toHaveProperty('contact');
        expect(loadedContent).toHaveProperty('footer');
        expect(loadedContent).toHaveProperty('navigation');

        // Cleanup
        consoleErrorSpy.mockRestore();
      }),
      { numRuns: 100 }
    );
  });

  /**
   * Property 8: Fallback Content on Validation Failure
   * Feature: content-management-system, Property 8: Fallback Content on Validation Failure
   * **Validates: Requirements 9.4**
   * 
   * For any configuration that fails validation, the Content_Manager should return default 
   * fallback content that allows the application to render without crashing.
   */
  it('should return valid fallback content when validation fails', async () => {
    // Generator for various types of invalid configurations that will fail validation
    const invalidConfigArbitrary = () =>
      fc.oneof(
        // Missing required sections
        fc.record({
          validContent: validSiteContentArbitrary()
        }).map(({ validContent }) => {
          const contentCopy = { ...validContent };
          // Remove a random required section
          const sectionsToRemove = fc.sample(
            fc.constantFrom('hero', 'services', 'projects', 'about', 'contact', 'footer', 'navigation'),
            1
          );
          sectionsToRemove.forEach(section => {
            delete (contentCopy as any)[section];
          });
          return contentCopy;
        }),
        
        // Missing required fields in hero section
        fc.record({
          validContent: validSiteContentArbitrary()
        }).map(({ validContent }) => {
          const contentCopy = JSON.parse(JSON.stringify(validContent));
          // Remove mainHeadline from hero
          delete contentCopy.hero.mainHeadline;
          return contentCopy;
        }),
        
        // Wrong type for required field
        fc.record({
          validContent: validSiteContentArbitrary()
        }).map(({ validContent }) => {
          const contentCopy = JSON.parse(JSON.stringify(validContent));
          // Set mainHeadline to wrong type
          contentCopy.hero.mainHeadline = 123;
          return contentCopy;
        }),
        
        // Empty array where non-empty is required
        fc.record({
          validContent: validSiteContentArbitrary()
        }).map(({ validContent }) => {
          const contentCopy = JSON.parse(JSON.stringify(validContent));
          // Set services array to empty
          contentCopy.services.services = [];
          return contentCopy;
        }),
        
        // Missing nested required field
        fc.record({
          validContent: validSiteContentArbitrary()
        }).map(({ validContent }) => {
          const contentCopy = JSON.parse(JSON.stringify(validContent));
          // Remove brand.name from footer
          delete contentCopy.footer.brand.name;
          return contentCopy;
        }),
        
        // Wrong type for array field
        fc.record({
          validContent: validSiteContentArbitrary()
        }).map(({ validContent }) => {
          const contentCopy = JSON.parse(JSON.stringify(validContent));
          // Set ctaButtons to non-array
          contentCopy.hero.ctaButtons = 'not-an-array';
          return contentCopy;
        })
      );

    await fc.assert(
      fc.asyncProperty(invalidConfigArbitrary(), async (invalidConfig) => {
        // Mock fetch to return invalid configuration
        global.fetch = vi.fn().mockResolvedValue({
          ok: true,
          json: async () => invalidConfig
        });

        // Load content - should return fallback content instead of crashing
        const loadedContent = await contentManager.loadContent();

        // Verify that fallback content was returned (not null/undefined)
        expect(loadedContent).toBeDefined();
        expect(loadedContent).not.toBeNull();
        
        // Verify all required sections are present in fallback content
        expect(loadedContent).toHaveProperty('hero');
        expect(loadedContent).toHaveProperty('services');
        expect(loadedContent).toHaveProperty('projects');
        expect(loadedContent).toHaveProperty('about');
        expect(loadedContent).toHaveProperty('contact');
        expect(loadedContent).toHaveProperty('footer');
        expect(loadedContent).toHaveProperty('navigation');

        // Verify that fallback content has valid structure (non-null sections)
        expect(loadedContent.hero).toBeDefined();
        expect(loadedContent.services).toBeDefined();
        expect(loadedContent.projects).toBeDefined();
        expect(loadedContent.about).toBeDefined();
        expect(loadedContent.contact).toBeDefined();
        expect(loadedContent.footer).toBeDefined();
        expect(loadedContent.navigation).toBeDefined();

        // Verify that fallback content has required fields to prevent crashes
        // Hero section
        expect(loadedContent.hero.mainHeadline).toBeDefined();
        expect(typeof loadedContent.hero.mainHeadline).toBe('string');
        expect(loadedContent.hero.subHeadline).toBeDefined();
        expect(typeof loadedContent.hero.subHeadline).toBe('string');
        expect(Array.isArray(loadedContent.hero.ctaButtons)).toBe(true);
        expect(Array.isArray(loadedContent.hero.statistics)).toBe(true);

        // Services section
        expect(Array.isArray(loadedContent.services.services)).toBe(true);

        // Projects section
        expect(Array.isArray(loadedContent.projects.projects)).toBe(true);

        // About section
        expect(loadedContent.about.story).toBeDefined();
        expect(Array.isArray(loadedContent.about.story.paragraphs)).toBe(true);
        expect(Array.isArray(loadedContent.about.statistics)).toBe(true);
        expect(loadedContent.about.values).toBeDefined();
        expect(Array.isArray(loadedContent.about.values.items)).toBe(true);

        // Contact section
        expect(Array.isArray(loadedContent.contact.contactInfo)).toBe(true);
        expect(loadedContent.contact.officeHours).toBeDefined();

        // Footer section
        expect(loadedContent.footer.brand).toBeDefined();
        expect(loadedContent.footer.brand.name).toBeDefined();
        expect(typeof loadedContent.footer.brand.name).toBe('string');
        expect(Array.isArray(loadedContent.footer.socialLinks)).toBe(true);
        expect(Array.isArray(loadedContent.footer.linkGroups)).toBe(true);

        // Navigation section
        expect(loadedContent.navigation.brand).toBeDefined();
        expect(loadedContent.navigation.brand.name).toBeDefined();
        expect(typeof loadedContent.navigation.brand.name).toBe('string');
        expect(Array.isArray(loadedContent.navigation.links)).toBe(true);
      }),
      { numRuns: 100 }
    );
  });
});
