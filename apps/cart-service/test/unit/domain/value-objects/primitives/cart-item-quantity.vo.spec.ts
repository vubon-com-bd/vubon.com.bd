/**
 * CartItemQuantityVO unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { CartItemQuantityVO } from '@domain/value-objects/primitives/cart-item-quantity.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

describe('CartItemQuantityVO', () => {
  describe('create()', () => {
    it('accepts valid integer within range', () => {
      expect(CartItemQuantityVO.create(1).value).toBe(1);
      expect(CartItemQuantityVO.create(500).value).toBe(500);
      expect(CartItemQuantityVO.create(999).value).toBe(999);
    });

    it('throws below minimum', () => {
      expect(() => CartItemQuantityVO.create(0)).toThrow(ValidationError);
    });

    it('throws above maximum', () => {
      expect(() => CartItemQuantityVO.create(1000)).toThrow(ValidationError);
    });

    it('throws for non-integer', () => {
      expect(() => CartItemQuantityVO.create(1.5)).toThrow(ValidationError);
    });

    it('throws for NaN/Infinity', () => {
      expect(() => CartItemQuantityVO.create(Number.NaN)).toThrow(ValidationError);
      expect(() => CartItemQuantityVO.create(Number.POSITIVE_INFINITY)).toThrow(ValidationError);
    });
  });

  describe('add()', () => {
    it('sums quantities', () => {
      const a = CartItemQuantityVO.create(2);
      const b = CartItemQuantityVO.create(3);
      expect(a.add(b).value).toBe(5);
    });

    it('throws when sum exceeds max', () => {
      const a = CartItemQuantityVO.create(900);
      const b = CartItemQuantityVO.create(200);
      expect(() => a.add(b)).toThrow(ValidationError);
    });
  });

  describe('subtract()', () => {
    it('subtracts quantities', () => {
      const a = CartItemQuantityVO.create(5);
      const b = CartItemQuantityVO.create(2);
      expect(a.subtract(b).value).toBe(3);
    });

    it('throws when result below min', () => {
      const a = CartItemQuantityVO.create(2);
      const b = CartItemQuantityVO.create(2);
      expect(() => a.subtract(b)).toThrow(ValidationError);
    });
  });

  describe('canIncreaseBy()', () => {
    it('true within limit', () => {
      expect(CartItemQuantityVO.create(500).canIncreaseBy(400)).toBe(true);
    });
    it('false beyond limit', () => {
      expect(CartItemQuantityVO.create(500).canIncreaseBy(600)).toBe(false);
    });
  });

  describe('reconstitute()', () => {
    it('skips validation', () => {
      expect(CartItemQuantityVO.reconstitute(0).value).toBe(0);
    });
  });
});
