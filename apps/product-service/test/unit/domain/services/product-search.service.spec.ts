/**
 * ProductSearchService (Domain) — Unit Tests
 */
import { describe, it, expect } from '@jest/globals';
import { ProductSearchService } from '../../../../src/module/domain/services/product-search.service.js';

function mockProduct(opts: {
  name?: string;
  sku?: string;
  description?: string;
  tags?: string[];
  categoryId?: string;
  totalStock?: number;
  brandId?: string;
} = {}) {
  const name = opts.name ?? 'Premium T-Shirt';
  return {
    id: 'p-1',
    vo: {
      name: { value: name },
      sku: { value: opts.sku ?? 'TSHIRT-001' },
      description: opts.description ? { value: opts.description } : undefined,
      tags: opts.tags ?? ['summer', 'cotton'],
      categoryId: { value: opts.categoryId ?? 'cat-1' },
      brandId: opts.brandId ? { value: opts.brandId } : undefined,
      totalStock: opts.totalStock ?? 10,
    },
  } as unknown as Parameters<typeof ProductSearchService.score>[0];
}

describe('ProductSearchService (Domain)', () => {
  describe('normalizeQuery()', () => {
    it('lowercases + trims', () => {
      const q = ProductSearchService.normalizeQuery('  Premium Shirt  ');
      expect(q.normalized).toBe('premium shirt');
    });

    it('extracts tokens', () => {
      const q = ProductSearchService.normalizeQuery('Premium Cotton Shirt');
      expect(q.tokens).toEqual(['premium', 'cotton', 'shirt']);
    });

    it('dedupes tokens', () => {
      const q = ProductSearchService.normalizeQuery('shirt shirt shirt');
      expect(q.tokens).toEqual(['shirt']);
    });
  });

  describe('score()', () => {
    it('exact name match yields highest score', () => {
      const q = ProductSearchService.normalizeQuery('tshirt');
      const p = mockProduct({ name: 'tshirt' });
      const s = ProductSearchService.score(p, q);
      expect(s.nameScore).toBeGreaterThan(0);
    });

    it('tag match yields score', () => {
      const q = ProductSearchService.normalizeQuery('summer');
      const p = mockProduct({ tags: ['summer', 'cotton'] });
      const s = ProductSearchService.score(p, q);
      expect(s.tagScore).toBeGreaterThan(0);
    });

    it('description match yields lower score', () => {
      const q = ProductSearchService.normalizeQuery('comfortable');
      const p = mockProduct({ description: 'Very comfortable fabric' });
      const s = ProductSearchService.score(p, q);
      expect(s.descriptionScore).toBeGreaterThan(0);
    });

    it('no match → 0 total', () => {
      const q = ProductSearchService.normalizeQuery('xyz');
      const p = mockProduct({ name: 'tshirt' });
      const s = ProductSearchService.score(p, q);
      expect(s.total).toBe(0);
    });
  });

  describe('passesFilter()', () => {
    it('passes with no filter', () => {
      expect(ProductSearchService.passesFilter(mockProduct(), {})).toBe(true);
    });

    it('filters by categoryId', () => {
      const p = mockProduct({ categoryId: 'cat-1' });
      expect(ProductSearchService.passesFilter(p, { categoryId: 'cat-1' })).toBe(true);
      expect(ProductSearchService.passesFilter(p, { categoryId: 'cat-2' })).toBe(false);
    });

    it('filters by inStockOnly', () => {
      expect(
        ProductSearchService.passesFilter(mockProduct({ totalStock: 0 }), {
          inStockOnly: true,
        }),
      ).toBe(false);
    });

    it('filters by tags (all required)', () => {
      const p = mockProduct({ tags: ['summer', 'cotton'] });
      expect(ProductSearchService.passesFilter(p, { tags: ['summer'] })).toBe(true);
      expect(ProductSearchService.passesFilter(p, { tags: ['summer', 'wool'] })).toBe(false);
    });
  });

  describe('rankByRelevance()', () => {
    it('higher score → earlier in results', () => {
      const q = ProductSearchService.normalizeQuery('premium');
      const p1 = mockProduct({ name: 'premium shirt' });
      const p2 = mockProduct({ name: 'basic shirt' });
      const ranked = ProductSearchService.rankByRelevance([p2, p1], q);
      expect(ranked[0].vo.name.value).toBe('premium shirt');
    });
  });

  describe('matchCount()', () => {
    it('counts matching tokens', () => {
      const q = ProductSearchService.normalizeQuery('premium shirt');
      const p = mockProduct({ name: 'premium shirt' });
      expect(ProductSearchService.matchCount(p, q)).toBe(2);
    });
  });
});
