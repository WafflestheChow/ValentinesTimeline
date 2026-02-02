import { describe, expect, it } from 'vitest';
import { assetsManifest } from './assets-manifest';

describe('assetsManifest', () => {
  it('lists files for each month', () => {
    expect(Object.keys(assetsManifest)).toHaveLength(6);
    Object.values(assetsManifest).forEach((files) => {
      expect(files.length).toBeGreaterThan(0);
    });
  });
});
