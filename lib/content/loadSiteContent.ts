import type { SiteContent } from './types';
import { getDefaultSiteContent } from './manager';
import { readSiteContentFromDisk } from './readSiteContent';
import { fetchRemoteSiteContent, getRemoteSiteContentUrl } from './remoteCms';
import { validateSiteContent } from './validateSiteContent';

/**
 * Loads site content for SSR and API routes.
 * - If REMOTE_SITE_CONTENT_URL or REMOTE_CMS_BASE_URL is configured, fetches JSON from your server.
 * - Otherwise reads public/content.json from disk (self-hosted Node).
 */
export async function loadSiteContent(): Promise<SiteContent> {
  const remoteUrl = getRemoteSiteContentUrl();
  if (remoteUrl) {
    try {
      const res = await fetchRemoteSiteContent();
      if (!res.ok) {
        throw new Error(`Remote content HTTP ${res.status}`);
      }
      const raw = (await res.json()) as unknown;
      return validateSiteContent(raw);
    } catch (e) {
      console.error('loadSiteContent remote failed, falling back to disk:', e);
      try {
        return await readSiteContentFromDisk();
      } catch {
        console.error('loadSiteContent disk fallback failed');
        return getDefaultSiteContent();
      }
    }
  }

  try {
    return await readSiteContentFromDisk();
  } catch (e) {
    console.error('loadSiteContent disk read failed:', e);
    return getDefaultSiteContent();
  }
}
