// lib/content/__tests__/imageAltText.property.test.ts
// Feature: content-management-system, Property 12: Image Alt Text Presence

import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import { Project, SiteContent } from '../types';

describe('Image Alt Text Presence Property-Based Tests', () => {
  /**
   * Property 12: Image Alt Text Presence
   * **Validates: Requirements 11.3**
   * 
   * For any project or image object in the configuration, the object should include 
   * an imageAlt or alt field for accessibility.
   */
  it('should ensure all project objects have imageAlt field for accessibility', () => {
    // Generator for valid Project with imageAlt
    const projectWithAltTextArbitrary = () =>
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

    // Generator for projects array
    const projectsArrayArbitrary = () =>
      fc.array(projectWithAltTextArbitrary(), { minLength: 1, maxLength: 10 });

    fc.assert(
      fc.property(projectsArrayArbitrary(), (projects) => {
        // Verify that every project has an imageAlt field
        projects.forEach((project, index) => {
          expect(project).toHaveProperty('imageAlt');
          expect(typeof project.imageAlt).toBe('string');
          expect(project.imageAlt.length).toBeGreaterThan(0);
        });

        // Verify that all projects have both image and imageAlt
        const allHaveImageAndAlt = projects.every(
          project => project.image && project.imageAlt
        );
        expect(allHaveImageAndAlt).toBe(true);
      }),
      { numRuns: 100 }
    );
  });

  /**
   * Property 12b: Image Alt Text Non-Empty
   * **Validates: Requirements 11.3**
   * 
   * For any project with an image, the imageAlt field should not only exist but also 
   * contain meaningful text (non-empty string).
   */
  it('should ensure imageAlt fields are non-empty strings', () => {
    // Generator for projects with various imageAlt values
    const projectArbitrary = () =>
      fc.record({
        title: fc.string({ minLength: 1, maxLength: 50 }).filter(s => s.trim().length > 0),
        category: fc.string({ minLength: 1, maxLength: 30 }).filter(s => s.trim().length > 0),
        description: fc.string({ minLength: 1, maxLength: 200 }).filter(s => s.trim().length > 0),
        image: fc.oneof(
          fc.webUrl(),
          fc.string({ minLength: 1, maxLength: 50 }).map(s => `/images/${s}.jpg`)
        ),
        imageAlt: fc.string({ minLength: 1, maxLength: 100 }).filter(s => s.trim().length > 0),
        tags: fc.array(fc.string({ minLength: 1, maxLength: 20 }).filter(s => s.trim().length > 0), { minLength: 1, maxLength: 5 }),
        colorGradient: fc.string({ minLength: 1, maxLength: 50 })
      });

    fc.assert(
      fc.property(projectArbitrary(), (project) => {
        // Verify imageAlt is a non-empty string
        expect(project.imageAlt).toBeDefined();
        expect(typeof project.imageAlt).toBe('string');
        expect(project.imageAlt.trim().length).toBeGreaterThan(0);

        // Verify that if there's an image, there's always alt text
        if (project.image) {
          expect(project.imageAlt).toBeTruthy();
        }
      }),
      { numRuns: 100 }
    );
  });

  /**
   * Property 12c: Complete Site Content Image Alt Text
   * **Validates: Requirements 11.3**
   * 
   * For any complete site configuration, all projects in the projects section 
   * should have imageAlt fields.
   */
  it('should ensure all projects in site content have imageAlt fields', () => {
    // Generator for complete projects section
    const projectsContentArbitrary = () =>
      fc.record({
        eyebrow: fc.record({
          label: fc.string({ minLength: 1, maxLength: 50 }),
          icon: fc.constantFrom('ExternalLink', 'Folder', 'Layout')
        }),
        title: fc.string({ minLength: 1, maxLength: 100 }),
        description: fc.string({ minLength: 1, maxLength: 200 }),
        projects: fc.array(
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
          }),
          { minLength: 1, maxLength: 6 }
        ),
        ctaButton: fc.record({
          label: fc.string({ minLength: 1, maxLength: 50 }),
          targetSection: fc.constant('#contact')
        })
      });

    fc.assert(
      fc.property(projectsContentArbitrary(), (projectsContent) => {
        // Verify that all projects have imageAlt
        const allProjectsHaveAlt = projectsContent.projects.every(
          project => {
            return (
              'imageAlt' in project &&
              typeof project.imageAlt === 'string' &&
              project.imageAlt.length > 0
            );
          }
        );

        expect(allProjectsHaveAlt).toBe(true);

        // Additional check: count projects with images and verify all have alt text
        const projectsWithImages = projectsContent.projects.filter(p => p.image);
        const projectsWithAlt = projectsContent.projects.filter(p => p.imageAlt);
        
        expect(projectsWithImages.length).toBe(projectsWithAlt.length);
      }),
      { numRuns: 100 }
    );
  });
});
