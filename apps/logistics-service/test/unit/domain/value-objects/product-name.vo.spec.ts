/**
 * ProductNameVO — Unit Tests
 */
import { describe, it, expect } from '@jest/globals';
import { ProductNameVO } from '../../../../src/module/domain/value-objects/primitives/product-name.vo.js';

describe('ProductNameVO', () => {
  describe('create()', () => {
    it('creates valid name', () => {
      const vo = ProductNameVO.create('Premium T-Shirt');
      expect(vo.value).toBe('Premium T-Shirt');
    });

    it('trims and normalizes whitespace', () => {
      const vo = ProductNameVO.create('  Premium   T-Shirt  ');
      expect(vo.value).toBe('Premium T-Shirt');
    });

    it('throws for empty string', () => {
      expect(() => ProductNameVO.create('')).toThrow();
    });

    it('throws for too short name', () => {
      expect(() => ProductNameVO.create('AB')).toThrow();
    });

    it('throws for too long name (>200)', () => {
      expect(() => ProductNameVO.create('A'.repeat(201))).toThrow();
    });

    it('accepts exactly min length (3)', () => {
      const vo = ProductNameVO.create('ABC');
      expect(vo.value).toBe('ABC');
    });

    it('accepts exactly max length (200)', () => {
      const vo = ProductNameVO.create('A'.repeat(200));
      expect(vo.value.length).toBe(200);
    });
  });

  describe('reconstitute()', () => {
    it('creates without validation', () => {
      const vo = ProductNameVO.reconstitute('X');
      expect(vo.value).toBe('X');
    });
  });

  describe('isShort()', () => {
    it('returns true for short name', () => {
      const vo = ProductNameVO.create('Short Name');
      expect(vo.isShort()).toBe(true);
    });

    it('returns false for long name', () => {
      const vo = ProductNameVO.create('A'.repeat(100));
      expect(vo.isShort()).toBe(false);
    });
  });

  describe('equals()', () => {
    it('returns true for same value', () => {
      expect(
        ProductNameVO.create('Test').equals(ProductNameVO.create('Test')),
      ).toBe(true);
    });

    it('returns false for different value', () => {
      expect(
        ProductNameVO.create('Test1').equals(ProductNameVO.create('Test2')),
      ).toBe(false);
    });
  });
});
