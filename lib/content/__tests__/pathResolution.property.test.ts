// lib/content/__tests__/pathResolution.property.test.ts
// Feature: content-management-system, Property 10: Image Path Resolution for External URLs

import { describe, it, expect, beforeEach } from 'vitest';
import * as fc from 'fast-check';
import { ContentManager } from '../manager';

describe('Image Path Resolution Property-Based Tests', () => {
  let contentManager: ContentManager;

  beforeEach(() => {
    contentManager = ContentManager.getInstance();
  });

  /**
   * Property 10: Image Path Resolution for External URLs
   * **Validates: Requirements 4.5, 11.1**
   * 
   * For any image path that starts with "http://" or "https://", the resolveImagePath 
   * function should return the path unchanged.
   */
  it('should return non-Google-Drive external URLs unchanged', () => {
    // Generator for HTTP URLs
    const httpUrlArbitrary = fc.webUrl({ validSchemes: ['http'] }).filter(url => new URL(url).hostname !== 'drive.google.com');
    
    // Generator for HTTPS URLs
    const httpsUrlArbitrary = fc.webUrl({ validSchemes: ['https'] }).filter(url => new URL(url).hostname !== 'drive.google.com');
    
    // Generator that produces both HTTP and HTTPS URLs
    const externalUrlArbitrary = fc.oneof(
      httpUrlArbitrary,
      httpsUrlArbitrary
    );

    fc.assert(
      fc.property(externalUrlArbitrary, (externalUrl) => {
        // Resolve the image path using the ContentManager
        const resolvedPath = contentManager.resolveImagePath(externalUrl);

        // Verify that the external URL is returned unchanged
        expect(resolvedPath).toBe(externalUrl);
        
        // Verify that the URL still starts with http:// or https://
        expect(
          resolvedPath.startsWith('http://') || resolvedPath.startsWith('https://')
        ).toBe(true);
      }),
      { numRuns: 100 }
    );
  });

  it('should normalize Google Drive share URLs to direct image URLs', () => {
    const googleDriveFileIdArbitrary = fc.stringMatching(/^[A-Za-z0-9_-]{10,}$/);

    fc.assert(
      fc.property(googleDriveFileIdArbitrary, (fileId) => {
        const shareUrl = `https://drive.google.com/file/d/${fileId}/view?usp=sharing`;
        const resolvedPath = contentManager.resolveImagePath(shareUrl);

        expect(resolvedPath).toBe(`https://drive.google.com/thumbnail?id=${fileId}&sz=w2000`);
      }),
      { numRuns: 100 }
    );
  });

  /**
   * Property 11: Image Path Resolution for Relative Paths
   * **Validates: Requirements 11.2**
   * 
   * For any image path that doesn't start with "http://" or "https://" and doesn't 
   * start with "/", the resolveImagePath function should prepend "/" to make it an 
   * absolute path relative to the public directory.
   */
  it('should prepend "/" to relative paths', () => {
    // Feature: content-management-system, Property 11: Image Path Resolution for Relative Paths
    
    // Generator for relative paths (no leading slash, no http/https)
    // We'll generate paths that look like: "images/photo.jpg", "assets/icon.png", etc.
    const relativePathArbitrary = fc.tuple(
      // Path segments (e.g., "images", "assets", "icons")
      fc.array(
        fc.stringMatching(/^[a-zA-Z0-9_-]+$/),
        { minLength: 1, maxLength: 3 }
      ),
      // Filename with extension
      fc.record({
        name: fc.stringMatching(/^[a-zA-Z0-9_-]+$/),
        ext: fc.constantFrom('jpg', 'png', 'svg', 'gif', 'webp')
      })
    ).map(([segments, file]) => {
      return `${segments.join('/')}/${file.name}.${file.ext}`;
    }).filter(path => {
      // Ensure it doesn't start with / and doesn't start with http:// or https://
      return !path.startsWith('/') && 
             !path.startsWith('http://') && 
             !path.startsWith('https://');
    });

    fc.assert(
      fc.property(relativePathArbitrary, (relativePath) => {
        // Resolve the image path using the ContentManager
        const resolvedPath = contentManager.resolveImagePath(relativePath);

        // Verify that the path now starts with "/"
        expect(resolvedPath).toMatch(/^\//);
        
        // Verify that the original path is preserved after the "/"
        expect(resolvedPath).toBe(`/${relativePath}`);
        
        // Verify it's still not an external URL
        expect(resolvedPath.startsWith('http://')).toBe(false);
        expect(resolvedPath.startsWith('https://')).toBe(false);
      }),
      { numRuns: 100 }
    );
  });
});
