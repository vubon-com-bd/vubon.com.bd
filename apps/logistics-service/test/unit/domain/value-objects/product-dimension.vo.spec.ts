/**
 * ProductDimensionVO — Unit Tests
 */
import { describe, it, expect } from '@jest/globals';
import { ProductDimensionVO } from '../../../../src/module/domain/value-objects/primitives/product-dimension.vo.js';

describe('ProductDimensionVO', () => {
  describe('create()', () => {
    it('creates with cm', () => {
      const vo = ProductDimensionVO.create({ length: 10, width: 20, height: 5, unit: 'cm' });
      expect(vo.length).toBe(10);
      expect(vo.width).toBe(20);
      expect(vo.height).toBe(5);
      expect(vo.unit).toBe('cm');
    });

    it('creates with in', () => {
      const vo = ProductDimensionVO.create({ length: 4, width: 8, height: 2, unit: 'in' });
      expect(vo.unit).toBe('in');
    });

    it('throws for 0 length', () => {
      expect(() =>
        ProductDimensionVO.create({ length: 0, width: 20, height: 5, unit: 'cm' }),
      ).toThrow();
    });

    it('throws for negative width', () => {
      expect(() =>
        ProductDimensionVO.create({ length: 10, width: -1, height: 5, unit: 'cm' }),
      ).toThrow();
    });

    it('throws for invalid unit', () => {
      expect(() =>
        ProductDimensionVO.create({ length: 10, width: 20, height: 5, unit: 'm' as never }),
      ).toThrow();
    });

    it('throws for NaN', () => {
      expect(() =>
        ProductDimensionVO.create({ length: NaN, width: 20, height: 5, unit: 'cm' }),
      ).toThrow();
    });
  });

  describe('volume()', () => {
    it('computes volume', () => {
      const vo = ProductDimensionVO.create({ length: 10, width: 20, height: 5, unit: 'cm' });
      expect(vo.volume()).toBe(1000);
    });
  });

  describe('isOversized()', () => {
    it('true for very large dimension', () => {
      const vo = ProductDimensionVO.create({ length: 300, width: 20, height: 5, unit: 'cm' });
      expect(vo.isOversized()).toBe(true);
    });

    it('false for normal dimension', () => {
      const vo = ProductDimensionVO.create({ length: 10, width: 20, height: 5, unit: 'cm' });
      expect(vo.isOversized()).toBe(false);
    });
  });
});
