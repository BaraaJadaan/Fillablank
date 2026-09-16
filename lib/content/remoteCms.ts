/**
 * Optional remote CMS: Vercel hosts the app; a self-hosted server stores JSON and handles publish/revisions.
 *
 * Env:
 * - REMOTE_CMS_BASE_URL — e.g. https://cms.yourserver.com (no trailing slash)
 * - REMOTE_CMS_SECRET — shared secret; sent as Authorization: Bearer <secret>
 * - REMOTE_SITE_CONTENT_URL — optional override for the public JSON URL (defaults to REMOTE_CMS_BASE_URL/content.json)
 */

export type RemoteCmsConfig = {
  baseUrl: string;
  secret: string;
};

export function getRemoteCmsConfig(): RemoteCmsConfig | null {
  const baseUrl = process.env.REMOTE_CMS_BASE_URL?.replace(/\/$/, '').trim();
  const secret = process.env.REMOTE_CMS_SECRET?.trim();
  if (!baseUrl || !secret) return null;
  return { baseUrl, secret };
}

/** True when publish/revisions should hit the remote server. */
export function isRemoteCmsEnabled(): boolean {
  return getRemoteCmsConfig() !== null;
}

/**
 * URL to fetch live SiteContent JSON (GET). Used by SSR and /api/site-content.
 */
export function getRemoteSiteContentUrl(): string | null {
  const explicit = process.env.REMOTE_SITE_CONTENT_URL?.replace(/\/$/, '').trim();
  if (explicit) return explicit;
  const cfg = getRemoteCmsConfig();
  if (!cfg) return null;
  return `${cfg.baseUrl}/content.json`;
}

export async function fetchRemoteSiteContent(): Promise<Response> {
  const url = getRemoteSiteContentUrl();
  if (!url) {
    throw new Error('Remote content URL not configured');
  }
  return fetch(url, {
    cache: 'no-store',
    headers: { Accept: 'application/json' },
  });
}

export function remotePublishUrl(): string | null {
  const cfg = getRemoteCmsConfig();
  return cfg ? `${cfg.baseUrl}/publish` : null;
}

export function remoteRevisionsUrl(): string | null {
  const cfg = getRemoteCmsConfig();
  return cfg ? `${cfg.baseUrl}/revisions` : null;
}

export function remoteRestoreUrl(): string | null {
  const cfg = getRemoteCmsConfig();
  return cfg ? `${cfg.baseUrl}/restore` : null;
}

export function remoteAuthHeaders(): HeadersInit {
  const cfg = getRemoteCmsConfig();
  if (!cfg) return {};
  return { Authorization: `Bearer ${cfg.secret}` };
}
