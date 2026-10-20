/**
 * OrderItemPriceVO — Unit Tests
 * @module order-service/test/unit/domain/value-objects/primitives
 */
import { describe, it, expect } from '@jest/globals';
import { OrderItemPriceVO } from '@domain/primitives/order-item-price.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

describe('OrderItemPriceVO', () => {
  describe('create', () => {
    it('creates with amount + currency', () => {
      const vo = OrderItemPriceVO.create(99.99, 'BDT');
      expect(vo.amount).toBe(99.99);
      expect(vo.currency).toBe('BDT');
    });

    it('accepts zero', () => {
      expect(OrderItemPriceVO.create(0, 'BDT').amount).toBe(0);
    });

    it('throws for negative amount', () => {
      expect(() => OrderItemPriceVO.create(-1, 'BDT')).toThrow(ValidationError);
    });

    it('throws for non-finite', () => {
      expect(() => OrderItemPriceVO.create(NaN, 'BDT')).toThrow(ValidationError);
      expect(() => OrderItemPriceVO.create(Infinity, 'BDT')).toThrow(ValidationError);
    });

    it('throws for invalid currency', () => {
      expect(() => OrderItemPriceVO.create(100, 'XYZ')).toThrow(ValidationError);
    });
  });

  describe('multiply', () => {
    it('multiplies by factor', () => {
      const vo = OrderItemPriceVO.create(100, 'BDT');
      expect(vo.multiply(3).amount).toBe(300);
    });

    it('rounds result', () => {
      const vo = OrderItemPriceVO.create(10.5, 'BDT');
      expect(vo.multiply(3).amount).toBe(31.5);
    });

    it('throws for negative factor', () => {
      const vo = OrderItemPriceVO.create(100, 'BDT');
      expect(() => vo.multiply(-1)).toThrow(ValidationError);
    });

    it('throws for non-finite factor', () => {
      const vo = OrderItemPriceVO.create(100, 'BDT');
      expect(() => vo.multiply(NaN)).toThrow(ValidationError);
    });
  });

  describe('zero factory', () => {
    it('creates zero', () => {
      expect(OrderItemPriceVO.zero('BDT').amount).toBe(0);
    });
  });
});
