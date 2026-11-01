/**
 * ProductWeightVO — Unit Tests
 */
import { describe, it, expect } from '@jest/globals';
import { ProductWeightVO } from '../../../../src/module/domain/value-objects/primitives/product-weight.vo.js';

describe('ProductWeightVO', () => {
  describe('create()', () => {
    it('creates 100g', () => expect(ProductWeightVO.create(100).value).toBe(100));
    it('creates 1000g', () => expect(ProductWeightVO.create(1000).value).toBe(1000));
    it('throws for 0', () => expect(() => ProductWeightVO.create(0)).toThrow());
    it('throws for negative', () => expect(() => ProductWeightVO.create(-5)).toThrow());
    it('throws for non-integer', () => expect(() => ProductWeightVO.create(1.5)).toThrow());
    it('throws for NaN', () => expect(() => ProductWeightVO.create(NaN)).toThrow());
  });

  describe('accessors', () => {
    it('grams getter', () => {
      expect(ProductWeightVO.create(500).grams).toBe(500);
    });
    it('toKilograms', () => {
      expect(ProductWeightVO.create(1500).toKilograms()).toBe(1.5);
    });
    it('isHeavy for 5000g', () => {
      expect(ProductWeightVO.create(5000).isHeavy()).toBe(true);
    });
    it('isHeavy false for 100g', () => {
      expect(ProductWeightVO.create(100).isHeavy()).toBe(false);
    });
  });
});
