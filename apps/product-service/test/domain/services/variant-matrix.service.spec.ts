/**
 * VariantMatrixService — unit tests
 */
import { VariantMatrixService } from '../../../src/module/domain/services/variant-matrix.service.js';

describe('VariantMatrixService', () => {
  let service: VariantMatrixService;

  beforeEach(() => {
    service = new VariantMatrixService();
  });

  describe('generateCombinations()', () => {
    it('should return empty for no attributes', () => {
      expect(service.generateCombinations([])).toEqual([]);
    });

    it('should produce cartesian product', () => {
      const combos = service.generateCombinations([
        { name: 'Color', values: ['Red', 'Blue'] },
        { name: 'Size', values: ['S', 'M'] },
      ]);
      expect(combos.length).toBe(4);
    });

    it('should produce 3×3 = 9 combinations', () => {
      const combos = service.generateCombinations([
        { name: 'Color', values: ['Red', 'Blue', 'Green'] },
        { name: 'Size', values: ['S', 'M', 'L'] },
      ]);
      expect(combos.length).toBe(9);
    });

    it('should generate unique signature per combination', () => {
      const combos = service.generateCombinations([
        { name: 'Color', values: ['Red', 'Blue'] },
      ]);
      const signatures = combos.map((c) => c.signature);
      expect(new Set(signatures).size).toBe(signatures.length);
    });

    it('should throw if an attribute has no values', () => {
      expect(() =>
        service.generateCombinations([{ name: 'Color', values: [] }]),
      ).toThrow(/no values/);
    });

    it('should throw when exceeding max combinations', () => {
      expect(() =>
        service.generateCombinations(
          [
            { name: 'A', values: Array.from({ length: 20 }, (_, i) => `a${i}`) },
            { name: 'B', values: Array.from({ length: 20 }, (_, i) => `b${i}`) },
          ],
          50,
        ),
      ).toThrow(/exceeds limit/);
    });

    it('should dedupe identical combinations', () => {
      const combos = service.generateCombinations([
        { name: 'Color', values: ['Red'] },
        { name: 'Color', values: ['Red'] },
      ]);
      const signatures = combos.map((c) => c.signature);
      expect(new Set(signatures).size).toBe(signatures.length);
    });
  });

  describe('signature()', () => {
    it('should produce consistent signature regardless of order', () => {
      const sig1 = service.signature([
        { name: 'Color', value: 'Red' },
        { name: 'Size', value: 'L' },
      ]);
      const sig2 = service.signature([
        { name: 'Size', value: 'L' },
        { name: 'Color', value: 'Red' },
      ]);
      expect(sig1).toBe(sig2);
    });
  });

  describe('countCombinations()', () => {
    it('should return 1 for no attributes', () => {
      expect(service.countCombinations([])).toBe(1);
    });

    it('should multiply values lengths', () => {
      expect(service.countCombinations([
        { name: 'Color', values: ['Red', 'Blue'] },
        { name: 'Size', values: ['S', 'M', 'L'] },
      ])).toBe(6);
    });
  });
});
