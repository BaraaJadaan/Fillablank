// lib/content/__tests__/hooks.property.test.tsx
// Feature: content-management-system, Property 17: Content Hook Availability

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import * as fc from 'fast-check';
import {
  useHeroContent,
  useServicesContent,
  useProjectsContent,
  useAboutContent,
  useContactContent,
  useFooterContent,
  useNavigationContent
} from '../hooks';
import * as ContentProviderModule from '../ContentProvider';
import { SiteContent } from '../types';

// Mock the ContentProvider module
vi.mock('../ContentProvider', () => ({
  useContent: vi.fn()
}));

describe('Content Hook Availability Property-Based Tests', () => {
  const mockGetIcon = vi.fn((iconName: string) => ({ name: iconName }));
  const mockResolveImagePath = vi.fn((path: string) => path);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  // Generator for valid loading states
  const loadingStateArbitrary = () => fc.boolean();

  // Generator for valid error states
  const errorStateArbitrary = () =>
    fc.option(
      fc.record({
        message: fc.string({ minLength: 1, maxLength: 100 }),
        name: fc.constantFrom('Error', 'TypeError', 'ValidationError')
      }).map(({ message, name }) => {
        const error = new Error(message);
        error.name = name;
        return error;
      }),
      { nil: null }
    );

  // Generator for minimal valid SiteContent
  const minimalSiteContentArbitrary = () =>
    fc.record({
      hero: fc.record({
        badge: fc.record({
          label: fc.string({ minLength: 1, maxLength: 50 }),
          icon: fc.string({ minLength: 1, maxLength: 20 })
        }),
        mainHeadline: fc.string({ minLength: 1, maxLength: 100 }),
        subHeadline: fc.string({ minLength: 1, maxLength: 100 }),
        description: fc.string({ minLength: 1, maxLength: 200 }),
        ctaButtons: fc.array(
          fc.record({
            label: fc.string({ minLength: 1, maxLength: 50 }),
            targetSection: fc.string({ minLength: 1, maxLength: 50 })
          }),
          { minLength: 0, maxLength: 3 }
        ),
        statistics: fc.array(
          fc.record({
            number: fc.string({ minLength: 1, maxLength: 10 }),
            label: fc.string({ minLength: 1, maxLength: 50 })
          }),
          { minLength: 0, maxLength: 5 }
        )
      }),
      services: fc.record({
        eyebrow: fc.record({
          label: fc.string({ minLength: 1, maxLength: 50 }),
          icon: fc.string({ minLength: 1, maxLength: 20 })
        }),
        title: fc.string({ minLength: 1, maxLength: 100 }),
        description: fc.string({ minLength: 1, maxLength: 200 }),
        services: fc.array(
          fc.record({
            title: fc.string({ minLength: 1, maxLength: 50 }),
            description: fc.string({ minLength: 1, maxLength: 200 }),
            icon: fc.string({ minLength: 1, maxLength: 20 }),
            colorGradient: fc.string({ minLength: 1, maxLength: 50 })
          }),
          { minLength: 0, maxLength: 6 }
        ),
        ctaButton: fc.record({
          label: fc.string({ minLength: 1, maxLength: 50 }),
          targetSection: fc.string({ minLength: 1, maxLength: 50 })
        })
      }),
      projects: fc.record({
        eyebrow: fc.record({
          label: fc.string({ minLength: 1, maxLength: 50 }),
          icon: fc.string({ minLength: 1, maxLength: 20 })
        }),
        title: fc.string({ minLength: 1, maxLength: 100 }),
        description: fc.string({ minLength: 1, maxLength: 200 }),
        projects: fc.array(
          fc.record({
            title: fc.string({ minLength: 1, maxLength: 50 }),
            category: fc.string({ minLength: 1, maxLength: 30 }),
            description: fc.string({ minLength: 1, maxLength: 200 }),
            image: fc.string({ minLength: 1, maxLength: 100 }),
            imageAlt: fc.string({ minLength: 1, maxLength: 100 }),
            tags: fc.array(fc.string({ minLength: 1, maxLength: 20 }), { minLength: 0, maxLength: 5 }),
            colorGradient: fc.string({ minLength: 1, maxLength: 50 })
          }),
          { minLength: 0, maxLength: 6 }
        ),
        ctaButton: fc.record({
          label: fc.string({ minLength: 1, maxLength: 50 }),
          targetSection: fc.string({ minLength: 1, maxLength: 50 })
        })
      }),
      about: fc.record({
        eyebrow: fc.record({
          label: fc.string({ minLength: 1, maxLength: 50 }),
          icon: fc.string({ minLength: 1, maxLength: 20 })
        }),
        title: fc.string({ minLength: 1, maxLength: 100 }),
        description: fc.string({ minLength: 1, maxLength: 200 }),
        story: fc.record({
          title: fc.string({ minLength: 1, maxLength: 100 }),
          paragraphs: fc.array(fc.string({ minLength: 1, maxLength: 300 }), { minLength: 0, maxLength: 5 })
        }),
        statistics: fc.array(
          fc.record({
            icon: fc.string({ minLength: 1, maxLength: 20 }),
            label: fc.string({ minLength: 1, maxLength: 50 }),
            value: fc.string({ minLength: 1, maxLength: 20 }),
            colorGradient: fc.string({ minLength: 1, maxLength: 50 })
          }),
          { minLength: 0, maxLength: 4 }
        ),
        values: fc.record({
          title: fc.string({ minLength: 1, maxLength: 100 }),
          items: fc.array(
            fc.record({
              title: fc.string({ minLength: 1, maxLength: 50 }),
              description: fc.string({ minLength: 1, maxLength: 200 }),
              icon: fc.string({ minLength: 1, maxLength: 20 })
            }),
            { minLength: 0, maxLength: 4 }
          )
        }),
        ctaButton: fc.record({
          label: fc.string({ minLength: 1, maxLength: 50 }),
          targetSection: fc.string({ minLength: 1, maxLength: 50 })
        })
      }),
      contact: fc.record({
        eyebrow: fc.record({
          label: fc.string({ minLength: 1, maxLength: 50 }),
          icon: fc.string({ minLength: 1, maxLength: 20 })
        }),
        title: fc.string({ minLength: 1, maxLength: 100 }),
        description: fc.string({ minLength: 1, maxLength: 200 }),
        contactInfo: fc.array(
          fc.record({
            icon: fc.string({ minLength: 1, maxLength: 20 }),
            label: fc.string({ minLength: 1, maxLength: 50 }),
            value: fc.string({ minLength: 1, maxLength: 100 }),
            colorGradient: fc.string({ minLength: 1, maxLength: 50 })
          }),
          { minLength: 0, maxLength: 4 }
        ),
        officeHours: fc.record({
          weekdays: fc.string({ minLength: 0, maxLength: 50 }),
          saturday: fc.string({ minLength: 0, maxLength: 50 }),
          sunday: fc.string({ minLength: 0, maxLength: 50 })
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
      }),
      footer: fc.record({
        brand: fc.record({
          name: fc.string({ minLength: 1, maxLength: 50 }),
          logo: fc.string({ minLength: 1, maxLength: 10 }),
          description: fc.string({ minLength: 1, maxLength: 200 })
        }),
        socialLinks: fc.array(
          fc.record({
            platform: fc.string({ minLength: 1, maxLength: 20 }),
            url: fc.string({ minLength: 1, maxLength: 100 }),
            icon: fc.string({ minLength: 1, maxLength: 20 }),
            label: fc.string({ minLength: 1, maxLength: 50 })
          }),
          { minLength: 0, maxLength: 5 }
        ),
        linkGroups: fc.array(
          fc.record({
            category: fc.string({ minLength: 1, maxLength: 50 }),
            links: fc.array(
              fc.record({
                name: fc.string({ minLength: 1, maxLength: 50 }),
                href: fc.string({ minLength: 1, maxLength: 100 })
              }),
              { minLength: 0, maxLength: 5 }
            )
          }),
          { minLength: 0, maxLength: 4 }
        ),
        newsletter: fc.record({
          title: fc.string({ minLength: 1, maxLength: 50 }),
          description: fc.string({ minLength: 1, maxLength: 200 }),
          placeholder: fc.string({ minLength: 1, maxLength: 50 }),
          buttonLabel: fc.string({ minLength: 1, maxLength: 50 })
        }),
        copyright: fc.string({ minLength: 1, maxLength: 100 })
      }),
      navigation: fc.record({
        brand: fc.record({
          name: fc.string({ minLength: 1, maxLength: 50 }),
          logo: fc.string({ minLength: 1, maxLength: 10 })
        }),
        links: fc.array(
          fc.record({
            name: fc.string({ minLength: 1, maxLength: 50 }),
            href: fc.string({ minLength: 1, maxLength: 100 })
          }),
          { minLength: 0, maxLength: 7 }
        )
      })
    });

  /**
   * Property 17: Content Hook Availability
   * **Validates: Requirements 10.3**
   * 
   * For any component that needs content, the useContent hook should be available and should 
   * return a content object, loading state, error state, and utility functions (getIcon, resolveImagePath).
   */
  it('should return content object, loading state, error state, and utility functions for all hooks', () => {
    fc.assert(
      fc.property(
        minimalSiteContentArbitrary(),
        loadingStateArbitrary(),
        errorStateArbitrary(),
        (content, loading, error) => {
          // Mock useContent to return the generated state
          vi.mocked(ContentProviderModule.useContent).mockReturnValue({
            content,
            loading,
            error,
            getIcon: mockGetIcon,
            resolveImagePath: mockResolveImagePath
          });

          // Test all content hooks
          const hooks = [
            { name: 'useHeroContent', hook: useHeroContent, section: 'hero' },
            { name: 'useServicesContent', hook: useServicesContent, section: 'services' },
            { name: 'useProjectsContent', hook: useProjectsContent, section: 'projects' },
            { name: 'useAboutContent', hook: useAboutContent, section: 'about' },
            { name: 'useContactContent', hook: useContactContent, section: 'contact' },
            { name: 'useFooterContent', hook: useFooterContent, section: 'footer' },
            { name: 'useNavigationContent', hook: useNavigationContent, section: 'navigation' }
          ];

          hooks.forEach(({ name, hook, section }) => {
            const { result } = renderHook(() => hook());

            // Verify content object is returned (or undefined if content is null)
            if (content === null) {
              expect(result.current.content).toBeUndefined();
            } else {
              expect(result.current.content).toEqual(content[section as keyof SiteContent]);
            }

            // Verify loading state is returned
            expect(result.current.loading).toBe(loading);
            expect(typeof result.current.loading).toBe('boolean');

            // Verify getIcon utility function is available
            expect(result.current.getIcon).toBeDefined();
            expect(typeof result.current.getIcon).toBe('function');
            expect(result.current.getIcon).toBe(mockGetIcon);

            // Verify resolveImagePath is available for hooks that need it
            if (name === 'useProjectsContent') {
              expect(result.current.resolveImagePath).toBeDefined();
              expect(typeof result.current.resolveImagePath).toBe('function');
              expect(result.current.resolveImagePath).toBe(mockResolveImagePath);
            }
          });
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should provide functional getIcon utility that can be called', () => {
    fc.assert(
      fc.property(
        minimalSiteContentArbitrary(),
        fc.string({ minLength: 1, maxLength: 20 }),
        (content, iconName) => {
          // Mock useContent to return the generated state
          vi.mocked(ContentProviderModule.useContent).mockReturnValue({
            content,
            loading: false,
            error: null,
            getIcon: mockGetIcon,
            resolveImagePath: mockResolveImagePath
          });

          const { result } = renderHook(() => useHeroContent());

          // Verify getIcon can be called and returns a value
          const icon = result.current.getIcon(iconName);
          expect(icon).toBeDefined();
          expect(mockGetIcon).toHaveBeenCalledWith(iconName);
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should provide functional resolveImagePath utility for projects hook', () => {
    fc.assert(
      fc.property(
        minimalSiteContentArbitrary(),
        fc.string({ minLength: 1, maxLength: 100 }),
        (content, imagePath) => {
          // Mock useContent to return the generated state
          vi.mocked(ContentProviderModule.useContent).mockReturnValue({
            content,
            loading: false,
            error: null,
            getIcon: mockGetIcon,
            resolveImagePath: mockResolveImagePath
          });

          const { result } = renderHook(() => useProjectsContent());

          // Verify resolveImagePath can be called and returns a value
          const resolvedPath = result.current.resolveImagePath(imagePath);
          expect(resolvedPath).toBeDefined();
          expect(mockResolveImagePath).toHaveBeenCalledWith(imagePath);
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should handle null content gracefully across all hooks', () => {
    fc.assert(
      fc.property(loadingStateArbitrary(), errorStateArbitrary(), (loading, error) => {
        // Mock useContent to return null content
        vi.mocked(ContentProviderModule.useContent).mockReturnValue({
          content: null,
          loading,
          error,
          getIcon: mockGetIcon,
          resolveImagePath: mockResolveImagePath
        });

        const hooks = [
          useHeroContent,
          useServicesContent,
          useProjectsContent,
          useAboutContent,
          useContactContent,
          useFooterContent,
          useNavigationContent
        ];

        hooks.forEach((hook) => {
          const { result } = renderHook(() => hook());

          // Verify content is undefined when content is null
          expect(result.current.content).toBeUndefined();

          // Verify loading state is still available
          expect(result.current.loading).toBe(loading);
          expect(typeof result.current.loading).toBe('boolean');

          // Verify utility functions are still available
          expect(result.current.getIcon).toBeDefined();
          expect(typeof result.current.getIcon).toBe('function');
        });
      }),
      { numRuns: 100 }
    );
  });

  it('should maintain consistent return structure regardless of content state', () => {
    fc.assert(
      fc.property(
        fc.option(minimalSiteContentArbitrary(), { nil: null }),
        loadingStateArbitrary(),
        errorStateArbitrary(),
        (content, loading, error) => {
          // Mock useContent to return the generated state
          vi.mocked(ContentProviderModule.useContent).mockReturnValue({
            content,
            loading,
            error,
            getIcon: mockGetIcon,
            resolveImagePath: mockResolveImagePath
          });

          const hooks = [
            useHeroContent,
            useServicesContent,
            useProjectsContent,
            useAboutContent,
            useContactContent,
            useFooterContent,
            useNavigationContent
          ];

          hooks.forEach((hook) => {
            const { result } = renderHook(() => hook());

            // Verify the return structure always has these properties
            expect(result.current).toHaveProperty('content');
            expect(result.current).toHaveProperty('loading');
            expect(result.current).toHaveProperty('getIcon');

            // Verify types are consistent
            expect(typeof result.current.loading).toBe('boolean');
            expect(typeof result.current.getIcon).toBe('function');
          });
        }
      ),
      { numRuns: 100 }
    );
  });
});
