/**
 * InventoryQuantityVO — unit tests
 */
import { InventoryQuantityVO } from '../../../src/module/domain/value-objects/primitives/inventory-quantity.vo.js';
import { InvalidQuantityError, StockLimitExceededError } from '../../../src/module/domain/errors/inventory.errors.js';

describe('InventoryQuantityVO', () => {
  describe('create()', () => {
    it('should accept zero', () => {
      expect(InventoryQuantityVO.create(0).value).toBe(0);
    });

    it('should accept positive integer', () => {
      expect(InventoryQuantityVO.create(100).value).toBe(100);
    });

    it('should reject negative', () => {
      expect(() => InventoryQuantityVO.create(-1)).toThrow(InvalidQuantityError);
    });

    it('should reject non-integer', () => {
      expect(() => InventoryQuantityVO.create(1.5)).toThrow(InvalidQuantityError);
    });

    it('should reject above max stock limit', () => {
      expect(() => InventoryQuantityVO.create(10_000_000)).toThrow(StockLimitExceededError);
    });
  });

  describe('zero()', () => {
    it('returns zero quantity', () => {
      expect(InventoryQuantityVO.zero().value).toBe(0);
    });
  });
});
