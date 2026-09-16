import { mkdir, readdir, readFile, rename, writeFile } from 'fs/promises';
import path from 'path';
import type { SiteContent } from './types';
import { getContentJsonPath } from './readSiteContent';
import { validateSiteContent } from './validateSiteContent';

export const REVISIONS_DIR = path.join(process.cwd(), 'data', 'content-revisions');

export type RevisionMeta = {
  id: string;
  savedAt: string;
  savedBy: string;
};

export type RevisionFile = RevisionMeta & {
  content: SiteContent;
};

async function ensureRevisionsDir(): Promise<void> {
  await mkdir(REVISIONS_DIR, { recursive: true });
}

async function atomicWriteJson(filePath: string, data: unknown): Promise<void> {
  const dir = path.dirname(filePath);
  const base = path.basename(filePath);
  const tmp = path.join(dir, `.${base}.tmp-${process.pid}-${Date.now()}`);
  await writeFile(tmp, JSON.stringify(data, null, 2), 'utf8');
  await rename(tmp, filePath);
}

/**
 * Validates new content, snapshots the previous live file as a revision (if valid), then writes live `content.json`.
 */
export async function publishSiteContent(
  nextContent: unknown,
  savedBy: string
): Promise<{ revisionId: string | null }> {
  const validated = validateSiteContent(nextContent);
  await ensureRevisionsDir();
  const livePath = getContentJsonPath();

  let previousValid: SiteContent | null = null;
  try {
    const raw = await readFile(livePath, 'utf8');
    previousValid = validateSiteContent(JSON.parse(raw) as unknown);
  } catch {
    previousValid = null;
  }

  const savedAt = new Date().toISOString();
  let revisionId: string | null = null;

  if (previousValid) {
    revisionId = `${Date.now()}`;
    const record: RevisionFile = {
      id: revisionId,
      savedAt,
      savedBy,
      content: previousValid,
    };
    await writeFile(
      path.join(REVISIONS_DIR, `${revisionId}.json`),
      JSON.stringify(record, null, 2),
      'utf8'
    );
  }

  await atomicWriteJson(livePath, validated);
  return { revisionId };
}

export async function listRevisionMetas(limit = 50): Promise<RevisionMeta[]> {
  await ensureRevisionsDir();
  const names = await readdir(REVISIONS_DIR);
  const jsonFiles = names.filter((n) => /^\d+\.json$/.test(n));
  const ids = jsonFiles
    .map((n) => n.replace(/\.json$/, ''))
    .sort((a, b) => Number(b) - Number(a))
    .slice(0, limit);

  const out: RevisionMeta[] = [];
  for (const id of ids) {
    try {
      const raw = await readFile(path.join(REVISIONS_DIR, `${id}.json`), 'utf8');
      const parsed = JSON.parse(raw) as Partial<RevisionFile>;
      if (parsed.savedAt && parsed.savedBy) {
        out.push({ id, savedAt: parsed.savedAt, savedBy: parsed.savedBy });
      }
    } catch {
      /* skip */
    }
  }
  return out;
}

export async function readRevisionFile(id: string): Promise<RevisionFile> {
  const safeId = path.basename(id);
  if (safeId !== id || !/^\d+$/.test(safeId)) {
    throw new Error('Invalid revision id');
  }
  const raw = await readFile(path.join(REVISIONS_DIR, `${safeId}.json`), 'utf8');
  const parsed = JSON.parse(raw) as RevisionFile;
  validateSiteContent(parsed.content);
  return parsed;
}

/**
 * Restores live content from a revision; snapshots current live first when valid.
 */
export async function restoreSiteContentFromRevision(
  revisionId: string,
  savedBy: string
): Promise<void> {
  const rev = await readRevisionFile(revisionId);
  const livePath = getContentJsonPath();
  let currentValid: SiteContent | null = null;
  try {
    const raw = await readFile(livePath, 'utf8');
    currentValid = validateSiteContent(JSON.parse(raw) as unknown);
  } catch {
    currentValid = null;
  }

  await ensureRevisionsDir();
  const savedAt = new Date().toISOString();
  if (currentValid) {
    const backupId = `${Date.now()}`;
    const record: RevisionFile = {
      id: backupId,
      savedAt,
      savedBy,
      content: currentValid,
    };
    await writeFile(
      path.join(REVISIONS_DIR, `${backupId}.json`),
      JSON.stringify(record, null, 2),
      'utf8'
    );
  }

  await atomicWriteJson(livePath, rev.content);
}
