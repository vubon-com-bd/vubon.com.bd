/**
 * InventoryQuantityVO — Unit Tests
 */
import { describe, it, expect } from '@jest/globals';
import { InventoryQuantityVO } from '../../../../src/module/domain/value-objects/primitives/inventory-quantity.vo.js';

describe('InventoryQuantityVO', () => {
  describe('create()', () => {
    it('creates 0', () => expect(InventoryQuantityVO.create(0).value).toBe(0));
    it('creates 10', () => expect(InventoryQuantityVO.create(10).value).toBe(10));
    it('creates 1000', () => expect(InventoryQuantityVO.create(1000).value).toBe(1000));
    it('throws for negative', () => expect(() => InventoryQuantityVO.create(-1)).toThrow());
    it('throws for non-integer', () => expect(() => InventoryQuantityVO.create(1.5)).toThrow());
    it('throws for NaN', () => expect(() => InventoryQuantityVO.create(NaN)).toThrow());
  });

  describe('predicates', () => {
    it('isZero for 0', () => expect(InventoryQuantityVO.create(0).isZero()).toBe(true));
    it('isPositive for 10', () => expect(InventoryQuantityVO.create(10).isPositive()).toBe(true));
    it('isLow for 5 (default threshold 10)', () => {
      expect(InventoryQuantityVO.create(5).isLow()).toBe(true);
    });
    it('isLow false for 20', () => {
      expect(InventoryQuantityVO.create(20).isLow()).toBe(false);
    });
    it('isCritical for 2 (threshold 3)', () => {
      expect(InventoryQuantityVO.create(2).isCritical()).toBe(true);
    });
    it('isCritical false for 5', () => {
      expect(InventoryQuantityVO.create(5).isCritical()).toBe(false);
    });
  });

  describe('arithmetic', () => {
    it('add', () => {
      expect(InventoryQuantityVO.create(10).add(InventoryQuantityVO.create(5)).value).toBe(15);
    });
    it('subtract', () => {
      expect(InventoryQuantityVO.create(10).subtract(InventoryQuantityVO.create(3)).value).toBe(7);
    });
    it('subtract underflow throws', () => {
      expect(() =>
        InventoryQuantityVO.create(5).subtract(InventoryQuantityVO.create(10)),
      ).toThrow();
    });
  });

  describe('static factory', () => {
    it('zero()', () => expect(InventoryQuantityVO.zero().value).toBe(0));
  });
});
