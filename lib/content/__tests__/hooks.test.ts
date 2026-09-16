// lib/content/__tests__/hooks.test.ts

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
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

// Mock the useContent hook
vi.mock('../ContentProvider', () => ({
  useContent: vi.fn()
}));

describe('Content Hooks', () => {
  const mockGetIcon = vi.fn();
  const mockResolveImagePath = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('useHeroContent', () => {
    it('should return hero content, loading state, and getIcon', () => {
      const mockHeroContent = {
        badge: { label: 'Test', icon: 'Sparkles' },
        mainHeadline: 'Test Headline',
        subHeadline: 'Test Sub',
        description: 'Test Description',
        ctaButtons: [],
        statistics: []
      };

      vi.mocked(ContentProviderModule.useContent).mockReturnValue({
        content: {
          hero: mockHeroContent,
          services: {} as any,
          projects: {} as any,
          about: {} as any,
          contact: {} as any,
          footer: {} as any,
          navigation: {} as any
        },
        loading: false,
        error: null,
        getIcon: mockGetIcon,
        resolveImagePath: mockResolveImagePath
      });

      const { result } = renderHook(() => useHeroContent());

      expect(result.current.content).toEqual(mockHeroContent);
      expect(result.current.loading).toBe(false);
      expect(result.current.getIcon).toBe(mockGetIcon);
    });
  });

  describe('useServicesContent', () => {
    it('should return services content, loading state, and getIcon', () => {
      const mockServicesContent = {
        eyebrow: { label: 'Services', icon: 'Rocket' },
        title: 'Our Services',
        description: 'Test',
        services: [],
        ctaButton: { label: 'Contact', targetSection: '#contact' }
      };

      vi.mocked(ContentProviderModule.useContent).mockReturnValue({
        content: {
          hero: {} as any,
          services: mockServicesContent,
          projects: {} as any,
          about: {} as any,
          contact: {} as any,
          footer: {} as any,
          navigation: {} as any
        },
        loading: false,
        error: null,
        getIcon: mockGetIcon,
        resolveImagePath: mockResolveImagePath
      });

      const { result } = renderHook(() => useServicesContent());

      expect(result.current.content).toEqual(mockServicesContent);
      expect(result.current.loading).toBe(false);
      expect(result.current.getIcon).toBe(mockGetIcon);
    });
  });

  describe('useProjectsContent', () => {
    it('should return projects content, loading state, getIcon, and resolveImagePath', () => {
      const mockProjectsContent = {
        eyebrow: { label: 'Projects', icon: 'ExternalLink' },
        title: 'Our Projects',
        description: 'Test',
        projects: [],
        ctaButton: { label: 'View More', targetSection: '#contact' }
      };

      vi.mocked(ContentProviderModule.useContent).mockReturnValue({
        content: {
          hero: {} as any,
          services: {} as any,
          projects: mockProjectsContent,
          about: {} as any,
          contact: {} as any,
          footer: {} as any,
          navigation: {} as any
        },
        loading: false,
        error: null,
        getIcon: mockGetIcon,
        resolveImagePath: mockResolveImagePath
      });

      const { result } = renderHook(() => useProjectsContent());

      expect(result.current.content).toEqual(mockProjectsContent);
      expect(result.current.loading).toBe(false);
      expect(result.current.getIcon).toBe(mockGetIcon);
      expect(result.current.resolveImagePath).toBe(mockResolveImagePath);
    });
  });

  describe('useAboutContent', () => {
    it('should return about content, loading state, and getIcon', () => {
      const mockAboutContent = {
        eyebrow: { label: 'About', icon: 'Users' },
        title: 'About Us',
        description: 'Test',
        story: { title: 'Our Story', paragraphs: [] },
        statistics: [],
        values: { title: 'Values', items: [] },
        ctaButton: { label: 'Contact', targetSection: '#contact' }
      };

      vi.mocked(ContentProviderModule.useContent).mockReturnValue({
        content: {
          hero: {} as any,
          services: {} as any,
          projects: {} as any,
          about: mockAboutContent,
          contact: {} as any,
          footer: {} as any,
          navigation: {} as any
        },
        loading: false,
        error: null,
        getIcon: mockGetIcon,
        resolveImagePath: mockResolveImagePath
      });

      const { result } = renderHook(() => useAboutContent());

      expect(result.current.content).toEqual(mockAboutContent);
      expect(result.current.loading).toBe(false);
      expect(result.current.getIcon).toBe(mockGetIcon);
    });
  });

  describe('useContactContent', () => {
    it('should return contact content, loading state, and getIcon', () => {
      const mockContactContent = {
        eyebrow: { label: 'Contact', icon: 'Send' },
        title: 'Contact Us',
        description: 'Test',
        contactInfo: [],
        officeHours: { weekdays: '', saturday: '', sunday: '' },
        formFields: {
          name: { label: 'Name', placeholder: 'Name' },
          email: { label: 'Email', placeholder: 'Email' },
          company: { label: 'Company', placeholder: 'Company' },
          message: { label: 'Message', placeholder: 'Message' }
        },
        submitButton: 'Send'
      };

      vi.mocked(ContentProviderModule.useContent).mockReturnValue({
        content: {
          hero: {} as any,
          services: {} as any,
          projects: {} as any,
          about: {} as any,
          contact: mockContactContent,
          footer: {} as any,
          navigation: {} as any
        },
        loading: false,
        error: null,
        getIcon: mockGetIcon,
        resolveImagePath: mockResolveImagePath
      });

      const { result } = renderHook(() => useContactContent());

      expect(result.current.content).toEqual(mockContactContent);
      expect(result.current.loading).toBe(false);
      expect(result.current.getIcon).toBe(mockGetIcon);
    });
  });

  describe('useFooterContent', () => {
    it('should return footer content, loading state, and getIcon', () => {
      const mockFooterContent = {
        brand: { name: 'Company', logo: 'C', description: 'Test' },
        socialLinks: [],
        linkGroups: [],
        newsletter: {
          title: 'Newsletter',
          description: 'Subscribe',
          placeholder: 'Email',
          buttonLabel: 'Subscribe'
        },
        copyright: '© 2024'
      };

      vi.mocked(ContentProviderModule.useContent).mockReturnValue({
        content: {
          hero: {} as any,
          services: {} as any,
          projects: {} as any,
          about: {} as any,
          contact: {} as any,
          footer: mockFooterContent,
          navigation: {} as any
        },
        loading: false,
        error: null,
        getIcon: mockGetIcon,
        resolveImagePath: mockResolveImagePath
      });

      const { result } = renderHook(() => useFooterContent());

      expect(result.current.content).toEqual(mockFooterContent);
      expect(result.current.loading).toBe(false);
      expect(result.current.getIcon).toBe(mockGetIcon);
    });
  });

  describe('useNavigationContent', () => {
    it('should return navigation content, loading state, and getIcon', () => {
      const mockNavigationContent = {
        brand: { name: 'Company', logo: 'C' },
        links: []
      };

      vi.mocked(ContentProviderModule.useContent).mockReturnValue({
        content: {
          hero: {} as any,
          services: {} as any,
          projects: {} as any,
          about: {} as any,
          contact: {} as any,
          footer: {} as any,
          navigation: mockNavigationContent
        },
        loading: false,
        error: null,
        getIcon: mockGetIcon,
        resolveImagePath: mockResolveImagePath
      });

      const { result } = renderHook(() => useNavigationContent());

      expect(result.current.content).toEqual(mockNavigationContent);
      expect(result.current.loading).toBe(false);
      expect(result.current.getIcon).toBe(mockGetIcon);
    });
  });

  describe('loading state', () => {
    it('should pass through loading state from useContent', () => {
      vi.mocked(ContentProviderModule.useContent).mockReturnValue({
        content: null,
        loading: true,
        error: null,
        getIcon: mockGetIcon,
        resolveImagePath: mockResolveImagePath
      });

      const { result } = renderHook(() => useHeroContent());

      expect(result.current.loading).toBe(true);
      expect(result.current.content).toBeUndefined();
    });
  });
});
