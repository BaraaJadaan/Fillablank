import { describe, it, expect } from 'vitest';
import { iconMap } from '../iconMap';
import type { SiteContent, HeroContent, Service } from '../types';

describe('Type Definitions', () => {
  it('should have valid icon map with Lucide icons', () => {
    expect(iconMap).toBeDefined();
    expect(iconMap.Sparkles).toBeDefined();
    expect(iconMap.Rocket).toBeDefined();
    expect(iconMap.Mail).toBeDefined();
    expect(typeof iconMap.Sparkles).toBe('object');
  });

  it('should support SiteContent type structure', () => {
    const mockContent: Partial<SiteContent> = {
      hero: {
        badge: { label: 'Test', icon: 'Sparkles' },
        mainHeadline: 'Test Headline',
        subHeadline: 'Test Sub',
        description: 'Test Description',
        ctaButtons: [{ label: 'Click', targetSection: '#test' }],
        statistics: [{ number: '10+', label: 'Projects' }]
      }
    };

    expect(mockContent.hero).toBeDefined();
    expect(mockContent.hero?.mainHeadline).toBe('Test Headline');
  });

  it('should support Service type structure', () => {
    const service: Service = {
      title: 'Web Development',
      description: 'Build amazing websites',
      icon: 'Code',
      colorGradient: 'from-blue-600 to-slate-800'
    };

    expect(service.title).toBe('Web Development');
    expect(service.icon).toBe('Code');
  });
});
