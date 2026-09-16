import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import path from 'path';
import { validateSiteContent } from '../validateSiteContent';

describe('validateSiteContent', () => {
  it('accepts committed public/content.json', () => {
    const p = path.join(process.cwd(), 'public', 'content.json');
    const raw = JSON.parse(readFileSync(p, 'utf8')) as unknown;
    expect(() => validateSiteContent(raw)).not.toThrow();
    const site = validateSiteContent(raw);
    expect(site.hero.mainHeadline).toBeTruthy();
    expect(site.navigation.links.length).toBeGreaterThan(0);
  });

  it('rejects empty object', () => {
    expect(() => validateSiteContent({})).toThrow(/Missing required section/);
  });

  it('rejects missing hero.ctaButtons', () => {
    const bad = {
      hero: {
        badge: { label: 'x', icon: 'Sparkles' },
        mainHeadline: 'a',
        subHeadline: 'b',
        description: 'c',
        ctaButtons: [],
        statistics: [{ number: '1', label: 'x' }],
      },
      services: { eyebrow: { label: 'e', icon: 'Rocket' }, title: 't', description: 'd', services: [{ title: 's', description: 'd', icon: 'Globe', colorGradient: 'x' }], ctaButton: { label: 'c', targetSection: '#' } },
      projects: { eyebrow: { label: 'e', icon: 'ExternalLink' }, title: 't', description: 'd', projects: [{ title: 'p', category: 'c', description: 'd', image: 'http://x', imageAlt: 'a', tags: [], colorGradient: 'x' }], ctaButton: { label: 'c', targetSection: '#' } },
      about: {
        eyebrow: { label: 'e', icon: 'Users' },
        title: 't',
        description: 'd',
        story: { title: 's', paragraphs: ['a'] },
        statistics: [{ icon: 'Users', label: 'l', value: '1', colorGradient: 'x' }],
        values: { title: 'v', items: [{ title: 't', description: 'd', icon: 'x' }] },
        ctaButton: { label: 'c', targetSection: '#' },
      },
      contact: {
        eyebrow: { label: 'e', icon: 'Send' },
        title: 't',
        description: 'd',
        contactInfo: [{ icon: 'Mail', label: 'e', value: 'v', colorGradient: 'x' }],
        officeHours: { weekdays: 'a', saturday: 'b', sunday: 'c' },
        formFields: {
          name: { label: 'n', placeholder: 'p' },
          email: { label: 'n', placeholder: 'p' },
          company: { label: 'n', placeholder: 'p' },
          message: { label: 'n', placeholder: 'p' },
        },
        submitButton: 'S',
      },
      footer: {
        brand: { name: 'b', logo: 'N', description: 'd' },
        socialLinks: [],
        linkGroups: [],
        newsletter: { title: 't', description: 'd', placeholder: 'p', buttonLabel: 'b' },
        copyright: 'c',
      },
      navigation: { brand: { name: 'b', logo: 'N' }, links: [{ name: 'H', href: '#' }] },
    };
    expect(() => validateSiteContent(bad)).toThrow(/ctaButtons/);
  });
});
