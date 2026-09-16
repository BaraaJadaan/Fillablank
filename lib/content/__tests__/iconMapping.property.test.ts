// lib/content/__tests__/iconMapping.property.test.ts
// Feature: content-management-system, Property 9: Icon Mapping

import { describe, it, expect, beforeEach } from 'vitest';
import * as fc from 'fast-check';
import { ContentManager } from '../manager';
import { iconMap } from '../iconMap';

describe('Icon Mapping Property-Based Tests', () => {
  let contentManager: ContentManager;

  beforeEach(() => {
    contentManager = ContentManager.getInstance();
  });

  /**
   * Property 9: Icon Mapping
   * **Validates: Requirements 3.5**
   * 
   * For any icon identifier string in the configuration, the getIcon function should return 
   * either the corresponding Lucide icon component or a default fallback icon if the 
   * identifier is not found.
   */
  it('should return valid icon component for known identifiers and fallback for unknown ones', () => {
    // Get all known icon names from the iconMap
    const knownIconNames = Object.keys(iconMap);
    
    // Generator for known icon identifiers
    const knownIconArbitrary = () => fc.constantFrom(...knownIconNames);
    
    // Generator for unknown icon identifiers (strings that are not in the iconMap)
    const unknownIconArbitrary = () =>
      fc.string({ minLength: 1, maxLength: 50 })
        .filter(name => !knownIconNames.includes(name) && !Object.prototype.hasOwnProperty.call(Object.prototype, name));
    
    // Generator that produces both known and unknown icon identifiers
    const iconIdentifierArbitrary = () =>
      fc.oneof(
        knownIconArbitrary(),
        unknownIconArbitrary()
      );

    fc.assert(
      fc.property(iconIdentifierArbitrary(), (iconIdentifier) => {
        // Get the icon using the ContentManager
        const icon = contentManager.getIcon(iconIdentifier);

        // Verify that an icon component is always returned (never null/undefined)
        expect(icon).toBeDefined();
        expect(icon).not.toBeNull();

        // Verify the icon is an object (React component - Lucide icons are forward refs)
        expect(typeof icon).toBe('object');

        // If the identifier is known, verify it returns the correct icon
        if (knownIconNames.includes(iconIdentifier)) {
          expect(icon).toBe(iconMap[iconIdentifier]);
        } else {
          // If the identifier is unknown, verify it returns the default fallback (Sparkles)
          expect(icon).toBe(iconMap['Sparkles']);
        }
      }),
      { numRuns: 100 }
    );
  });

  it('should always return Sparkles as fallback for any unknown icon identifier', () => {
    // Generator for strings that are definitely not in the iconMap
    const unknownIconArbitrary = () =>
      fc.oneof(
        // Random strings
        fc.string({ minLength: 1, maxLength: 50 })
          .filter(name => !Object.keys(iconMap).includes(name) && !Object.prototype.hasOwnProperty.call(Object.prototype, name)),
        // Strings with special characters
        fc.string({ minLength: 1, maxLength: 20 })
          .map(s => `invalid-${s}-icon`)
          .filter(name => !Object.keys(iconMap).includes(name) && !Object.prototype.hasOwnProperty.call(Object.prototype, name)),
        // Empty-like strings
        fc.constantFrom('', ' ', '  ', '\t', '\n')
          .filter(name => name !== '' && !Object.keys(iconMap).includes(name) && !Object.prototype.hasOwnProperty.call(Object.prototype, name)),
        // Numbers as strings
        fc.integer().map(n => `Icon${n}`)
          .filter(name => !Object.keys(iconMap).includes(name) && !Object.prototype.hasOwnProperty.call(Object.prototype, name))
      );

    fc.assert(
      fc.property(unknownIconArbitrary(), (unknownIdentifier) => {
        // Get the icon using the ContentManager
        const icon = contentManager.getIcon(unknownIdentifier);

        // Verify that the fallback icon (Sparkles) is returned
        expect(icon).toBe(iconMap['Sparkles']);
        expect(icon).toBeDefined();
        expect(icon).not.toBeNull();
        expect(typeof icon).toBe('object');
      }),
      { numRuns: 100 }
    );
  });

  it('should return correct icon component for all known icon identifiers', () => {
    // Test all known icons explicitly
    const knownIconNames = Object.keys(iconMap);
    
    fc.assert(
      fc.property(fc.constantFrom(...knownIconNames), (knownIconName) => {
        // Get the icon using the ContentManager
        const icon = contentManager.getIcon(knownIconName);

        // Verify that the correct icon component is returned
        expect(icon).toBe(iconMap[knownIconName]);
        expect(icon).toBeDefined();
        expect(icon).not.toBeNull();
        expect(typeof icon).toBe('object');
        
        // Verify it's not the fallback (unless the icon itself is Sparkles)
        if (knownIconName !== 'Sparkles') {
          expect(icon).not.toBe(iconMap['Sparkles']);
        }
      }),
      { numRuns: 100 }
    );
  });
});
