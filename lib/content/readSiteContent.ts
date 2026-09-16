// lib/content/readSiteContent.ts

import { readFile } from 'fs/promises';
import path from 'path';
import type { SiteContent } from './types';
import { getDefaultSiteContent } from './manager';
import { validateSiteContent } from './validateSiteContent';

const CONTENT_FILENAME = 'content.json';

export function getContentJsonPath(): string {
  return path.join(process.cwd(), 'public', CONTENT_FILENAME);
}

/**
 * Reads and validates public/content.json from disk (server-only).
 */
export async function readSiteContentFromDisk(): Promise<SiteContent> {
  const filePath = getContentJsonPath();
  const raw = await readFile(filePath, 'utf8');
  const parsed = JSON.parse(raw) as unknown;
  return validateSiteContent(parsed);
}

/** Like readSiteContentFromDisk but never throws (SSR bootstrap). */
export async function readSiteContentFromDiskSafe(): Promise<SiteContent> {
  try {
    return await readSiteContentFromDisk();
  } catch (e) {
    console.error('readSiteContentFromDiskSafe:', e);
    return getDefaultSiteContent();
  }
}
