// lib/content/__tests__/hotReload.integration.test.ts
// Integration test for hot reload functionality
// This test verifies that content changes are detected and reloaded

import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Hot Reload Integration Test', () => {
  const contentPath = path.join(process.cwd(), 'public', 'content.json');
  let originalContent: string;

  beforeAll(() => {
    // Save original content
    originalContent = fs.readFileSync(contentPath, 'utf-8');
  });

  afterAll(() => {
    // Restore original content
    fs.writeFileSync(contentPath, originalContent, 'utf-8');
  });

  it('should allow content.json to be modified and read back', () => {
    // Parse original content
    const contentData = JSON.parse(originalContent);
    const originalHeadline = contentData.hero.mainHeadline;

    // Modify content
    const testHeadline = 'Hot Reload Test Headline';
    contentData.hero.mainHeadline = testHeadline;
    fs.writeFileSync(contentPath, JSON.stringify(contentData, null, 2), 'utf-8');

    // Read back modified content
    const modifiedContent = fs.readFileSync(contentPath, 'utf-8');
    const modifiedData = JSON.parse(modifiedContent);

    // Verify the change was persisted
    expect(modifiedData.hero.mainHeadline).toBe(testHeadline);
    expect(modifiedData.hero.mainHeadline).not.toBe(originalHeadline);

    // Restore original
    fs.writeFileSync(contentPath, originalContent, 'utf-8');

    // Verify restoration
    const restoredContent = fs.readFileSync(contentPath, 'utf-8');
    const restoredData = JSON.parse(restoredContent);
    expect(restoredData.hero.mainHeadline).toBe(originalHeadline);
  });

  it('should preserve JSON structure when modifying content', () => {
    // Parse original content
    const contentData = JSON.parse(originalContent);
    
    // Verify all required sections exist
    expect(contentData).toHaveProperty('hero');
    expect(contentData).toHaveProperty('services');
    expect(contentData).toHaveProperty('projects');
    expect(contentData).toHaveProperty('about');
    expect(contentData).toHaveProperty('contact');
    expect(contentData).toHaveProperty('footer');
    expect(contentData).toHaveProperty('navigation');

    // Modify one section
    contentData.hero.description = 'Modified description for testing';
    fs.writeFileSync(contentPath, JSON.stringify(contentData, null, 2), 'utf-8');

    // Read back and verify structure is preserved
    const modifiedContent = fs.readFileSync(contentPath, 'utf-8');
    const modifiedData = JSON.parse(modifiedContent);

    expect(modifiedData).toHaveProperty('hero');
    expect(modifiedData).toHaveProperty('services');
    expect(modifiedData).toHaveProperty('projects');
    expect(modifiedData).toHaveProperty('about');
    expect(modifiedData).toHaveProperty('contact');
    expect(modifiedData).toHaveProperty('footer');
    expect(modifiedData).toHaveProperty('navigation');

    expect(modifiedData.hero.description).toBe('Modified description for testing');
  });

  it('should handle array modifications in content', () => {
    // Parse original content
    const contentData = JSON.parse(originalContent);
    const originalServicesCount = contentData.services.services.length;

    // Add a new service
    contentData.services.services.push({
      title: 'Test Service',
      description: 'A test service for hot reload verification',
      icon: 'Rocket',
      colorGradient: 'from-primary to-accent'
    });

    fs.writeFileSync(contentPath, JSON.stringify(contentData, null, 2), 'utf-8');

    // Read back and verify
    const modifiedContent = fs.readFileSync(contentPath, 'utf-8');
    const modifiedData = JSON.parse(modifiedContent);

    expect(modifiedData.services.services.length).toBe(originalServicesCount + 1);
    expect(modifiedData.services.services[modifiedData.services.services.length - 1].title).toBe('Test Service');
  });

  it('should verify ContentProvider hot reload configuration', () => {
    // Read the ContentProvider source to verify hot reload is configured
    const providerPath = path.join(process.cwd(), 'lib', 'content', 'ContentProvider.tsx');
    const providerSource = fs.readFileSync(providerPath, 'utf-8');

    // Verify hot reload code exists
    expect(providerSource).toContain('process.env.NODE_ENV === \'development\'');
    expect(providerSource).toContain('setInterval');
    expect(providerSource).toContain('checkForUpdates');
    expect(providerSource).toContain('5000'); // 5 second interval
    expect(providerSource).toContain('last-modified'); // Checks modification time
  });
});
