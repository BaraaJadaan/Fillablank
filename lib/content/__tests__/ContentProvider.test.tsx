// lib/content/__tests__/ContentProvider.test.tsx

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { ContentProvider, useContent } from '../ContentProvider';
import { contentManager } from '../manager';
import { SiteContent } from '../types';

// Mock the contentManager
vi.mock('../manager', () => ({
  contentManager: {
    loadContent: vi.fn(),
    getIcon: vi.fn(),
    resolveImagePath: vi.fn()
  }
}));

const mockContent: SiteContent = {
  hero: {
    badge: { label: 'Test Badge', icon: 'Sparkles' },
    mainHeadline: 'Test Headline',
    subHeadline: 'Test Sub',
    description: 'Test Description',
    ctaButtons: [{ label: 'Test CTA', targetSection: '#test' }],
    statistics: [{ number: '10+', label: 'Test Stat' }]
  },
  services: {
    eyebrow: { label: 'Services', icon: 'Rocket' },
    title: 'Test Services',
    description: 'Test Description',
    services: [],
    ctaButton: { label: 'Contact', targetSection: '#contact' }
  },
  projects: {
    eyebrow: { label: 'Projects', icon: 'ExternalLink' },
    title: 'Test Projects',
    description: 'Test Description',
    projects: [],
    ctaButton: { label: 'View More', targetSection: '#contact' }
  },
  about: {
    eyebrow: { label: 'About', icon: 'Users' },
    title: 'Test About',
    description: 'Test Description',
    story: { title: 'Our Story', paragraphs: [] },
    statistics: [],
    values: { title: 'Values', items: [] },
    ctaButton: { label: 'Contact', targetSection: '#contact' }
  },
  contact: {
    eyebrow: { label: 'Contact', icon: 'Send' },
    title: 'Test Contact',
    description: 'Test Description',
    contactInfo: [],
    officeHours: { weekdays: '', saturday: '', sunday: '' },
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
    links: []
  }
};

// Test component that uses the hook
function TestComponent() {
  const { content, loading, error } = useContent();
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!content) return <div>No content</div>;
  
  return <div>Content loaded: {content.hero.mainHeadline}</div>;
}

describe('ContentProvider', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.clearAllTimers();
  });

  it('should load content on mount', async () => {
    vi.mocked(contentManager.loadContent).mockResolvedValue(mockContent);

    render(
      <ContentProvider>
        <TestComponent />
      </ContentProvider>
    );

    // Initially shows loading
    expect(screen.getByText('Loading...')).toBeInTheDocument();

    // Wait for content to load
    await waitFor(() => {
      expect(screen.getByText('Content loaded: Test Headline')).toBeInTheDocument();
    });

    expect(contentManager.loadContent).toHaveBeenCalledTimes(1);
  });

  it('should handle loading state correctly', async () => {
    vi.mocked(contentManager.loadContent).mockImplementation(
      () => new Promise(resolve => setTimeout(() => resolve(mockContent), 100))
    );

    render(
      <ContentProvider>
        <TestComponent />
      </ContentProvider>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Content loaded: Test Headline')).toBeInTheDocument();
    });
  });

  it('should handle error state correctly', async () => {
    const error = new Error('Failed to load');
    vi.mocked(contentManager.loadContent).mockRejectedValue(error);

    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <ContentProvider>
        <TestComponent />
      </ContentProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('Error: Failed to load')).toBeInTheDocument();
    });

    expect(consoleSpy).toHaveBeenCalledWith('Failed to load content:', error);
    consoleSpy.mockRestore();
  });

  it('should provide getIcon function', async () => {
    vi.mocked(contentManager.loadContent).mockResolvedValue(mockContent);
    vi.mocked(contentManager.getIcon).mockReturnValue('MockIcon');

    function TestIconComponent() {
      const { getIcon } = useContent();
      const icon = getIcon('Sparkles');
      return <div>Icon: {icon}</div>;
    }

    render(
      <ContentProvider>
        <TestIconComponent />
      </ContentProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('Icon: MockIcon')).toBeInTheDocument();
    });

    expect(contentManager.getIcon).toHaveBeenCalledWith('Sparkles');
  });

  it('should provide resolveImagePath function', async () => {
    vi.mocked(contentManager.loadContent).mockResolvedValue(mockContent);
    vi.mocked(contentManager.resolveImagePath).mockReturnValue('/resolved/path.jpg');

    function TestImageComponent() {
      const { resolveImagePath } = useContent();
      const path = resolveImagePath('image.jpg');
      return <div>Path: {path}</div>;
    }

    render(
      <ContentProvider>
        <TestImageComponent />
      </ContentProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('Path: /resolved/path.jpg')).toBeInTheDocument();
    });

    expect(contentManager.resolveImagePath).toHaveBeenCalledWith('image.jpg');
  });

  it('should render immediately when initialContent is provided (no loading flash)', async () => {
    vi.mocked(contentManager.loadContent).mockImplementation(
      () => new Promise((resolve) => setTimeout(() => resolve(mockContent), 200)),
    );

    render(
      <ContentProvider initialContent={mockContent}>
        <TestComponent />
      </ContentProvider>,
    );

    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    expect(screen.getByText('Content loaded: Test Headline')).toBeInTheDocument();

    await waitFor(() => {
      expect(contentManager.loadContent).toHaveBeenCalledTimes(1);
    });
  });

  it('should throw error when useContent is used outside provider', () => {
    // Suppress console.error for this test
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => {
      render(<TestComponent />);
    }).toThrow('useContent must be used within a ContentProvider');

    consoleSpy.mockRestore();
  });
});
