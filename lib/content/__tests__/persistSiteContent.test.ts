import { describe, it, expect } from 'vitest';
import { readRevisionFile } from '../persistSiteContent';

describe('readRevisionFile', () => {
  it('rejects non-numeric id', async () => {
    await expect(readRevisionFile('not-a-number')).rejects.toThrow(/Invalid revision id/);
  });

  it('rejects id that does not match basename', async () => {
    await expect(readRevisionFile('12/extra')).rejects.toThrow(/Invalid revision id/);
  });
});
