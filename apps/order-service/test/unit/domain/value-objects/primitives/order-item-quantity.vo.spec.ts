/**
 * OrderItemQuantityVO — Unit Tests
 * @module order-service/test/unit/domain/value-objects/primitives
 */
import { describe, it, expect } from '@jest/globals';
import { OrderItemQuantityVO } from '@domain/primitives/order-item-quantity.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

describe('OrderItemQuantityVO', () => {
  describe('create', () => {
    it('creates with valid integer', () => {
      expect(OrderItemQuantityVO.create(5).value).toBe(5);
    });

    it('accepts min (1)', () => {
      expect(OrderItemQuantityVO.create(1).value).toBe(1);
    });

    it('accepts max (999)', () => {
      expect(OrderItemQuantityVO.create(999).value).toBe(999);
    });

    it('throws for 0', () => {
      expect(() => OrderItemQuantityVO.create(0)).toThrow(ValidationError);
    });

    it('throws for negative', () => {
      expect(() => OrderItemQuantityVO.create(-1)).toThrow(ValidationError);
    });

    it('throws for > max', () => {
      expect(() => OrderItemQuantityVO.create(1000)).toThrow(ValidationError);
    });

    it('throws for non-integer', () => {
      expect(() => OrderItemQuantityVO.create(1.5)).toThrow(ValidationError);
    });
  });

  describe('arithmetic', () => {
    it('adds two quantities', () => {
      const a = OrderItemQuantityVO.create(3);
      const b = OrderItemQuantityVO.create(4);
      expect(a.add(b).value).toBe(7);
    });

    it('subtracts two quantities', () => {
      const a = OrderItemQuantityVO.create(5);
      const b = OrderItemQuantityVO.create(2);
      expect(a.subtract(b).value).toBe(3);
    });

    it('subtract resulting in 0 throws (min 1)', () => {
      const a = OrderItemQuantityVO.create(2);
      const b = OrderItemQuantityVO.create(2);
      expect(() => a.subtract(b)).toThrow(ValidationError);
    });
  });
});
