import { describe, expect, it } from 'vitest';
import { months } from './timeline';

describe('timeline data', () => {
  it('includes six months with images', () => {
    expect(months).toHaveLength(6);
    months.forEach((month) => {
      expect(month.images.length).toBeGreaterThan(1);
      expect(month.title).toBeTruthy();
    });
  });
});
