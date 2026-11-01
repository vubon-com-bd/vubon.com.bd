/**
 * ProductSlugService — Unit Tests
 */
import { describe, it, expect } from '@jest/globals';
import { ProductSlugService } from '../../../../src/module/domain/services/product-slug.service.js';

describe('ProductSlugService', () => {
  describe('generate()', () => {
    it('generates slug from name', () => {
      const r = ProductSlugService.generate({
        name: 'Premium T-Shirt',
        existingSlugs: [],
      });
      expect(r.slug.value).toBe('premium-t-shirt');
      expect(r.collisionResolved).toBe(false);
    });

    it('resolves collision with -2 suffix', () => {
      const r = ProductSlugService.generate({
        name: 'Premium T-Shirt',
        existingSlugs: ['premium-t-shirt'],
      });
      expect(r.slug.value).toBe('premium-t-shirt-2');
      expect(r.collisionResolved).toBe(true);
    });

    it('resolves multiple collisions', () => {
      const r = ProductSlugService.generate({
        name: 'Premium T-Shirt',
        existingSlugs: ['premium-t-shirt', 'premium-t-shirt-2'],
      });
      expect(r.slug.value).toBe('premium-t-shirt-3');
    });

    it('throws for empty name', () => {
      expect(() =>
        ProductSlugService.generate({ name: '', existingSlugs: [] }),
      ).toThrow();
    });
  });

  describe('isReserved()', () => {
    it('detects reserved slugs', () => {
      expect(ProductSlugService.isReserved('new')).toBe(true);
      expect(ProductSlugService.isReserved('search')).toBe(true);
      expect(ProductSlugService.isReserved('admin')).toBe(true);
    });

    it('returns false for normal slug', () => {
      expect(ProductSlugService.isReserved('premium-tshirt')).toBe(false);
    });
  });

  describe('shouldRegenerate()', () => {
    it('regenerate when name changed significantly', () => {
      const result = ProductSlugService.shouldRegenerate(
        'Premium T-Shirt',
        'Basic Shirt',
        'premium-t-shirt',
      );
      expect(result).toBe(true);
    });

    it('no regenerate for same name', () => {
      const result = ProductSlugService.shouldRegenerate(
        'Premium T-Shirt',
        'Premium T-Shirt',
        'premium-t-shirt',
      );
      expect(result).toBe(false);
    });
  });
});
