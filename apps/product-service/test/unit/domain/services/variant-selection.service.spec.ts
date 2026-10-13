/**
 * VariantSelectionService — Unit Tests
 */
import { describe, it, expect } from '@jest/globals';
import { VariantSelectionService } from '../../../../src/module/domain/services/variant-selection.service.js';

function mockVariant(id: string, options: Array<{ name: string; value: string }>, stock = 5) {
  return {
    id,
    vo: {
      options,
      stock: { value: stock },
    },
  } as unknown as Parameters<typeof VariantSelectionService.totalAvailable>[0][number];
}

describe('VariantSelectionService', () => {
  const variants = [
    mockVariant('v-1', [{ name: 'size', value: 'M' }, { name: 'color', value: 'Red' }], 5),
    mockVariant('v-2', [{ name: 'size', value: 'M' }, { name: 'color', value: 'Blue' }], 3),
    mockVariant('v-3', [{ name: 'size', value: 'L' }, { name: 'color', value: 'Red' }], 0),
  ];

  describe('resolve()', () => {
    it('exact match for selected options', () => {
      const r = VariantSelectionService.resolve({
        variants,
        selectedOptions: [
          { name: 'size', value: 'M' },
          { name: 'color', value: 'Red' },
        ],
      });
      expect(r.matched).toBeTruthy();
      expect(r.matched?.id).toBe('v-1');
    });

    it('no match for nonexistent combination', () => {
      const r = VariantSelectionService.resolve({
        variants,
        selectedOptions: [
          { name: 'size', value: 'XL' },
          { name: 'color', value: 'Green' },
        ],
      });
      expect(r.matched).toBeNull();
    });

    it('empty selection → all variants partial', () => {
      const r = VariantSelectionService.resolve({
        variants,
        selectedOptions: [],
      });
      expect(r.matched).toBeNull();
      expect(r.partialMatches.length).toBe(3);
    });
  });

  describe('buildOptionMatrix()', () => {
    it('returns unique option values per name', () => {
      const m = VariantSelectionService.buildOptionMatrix(variants);
      expect(m['size']).toEqual(['L', 'M']);
      expect(m['color']).toEqual(['Blue', 'Red']);
    });
  });

  describe('totalAvailable()', () => {
    it('sums stock across all variants when no filter', () => {
      expect(VariantSelectionService.totalAvailable(variants)).toBe(8);
    });

    it('filters by partial option match', () => {
      const total = VariantSelectionService.totalAvailable(variants, [
        { name: 'size', value: 'M' },
      ]);
      expect(total).toBe(8);
    });
  });

  describe('validateMatrixConsistency()', () => {
    it('consistent matrix passes', () => {
      expect(() =>
        VariantSelectionService.validateMatrixConsistency(variants),
      ).not.toThrow();
    });

    it('empty list passes', () => {
      expect(() =>
        VariantSelectionService.validateMatrixConsistency([]),
      ).not.toThrow();
    });
  });
});
