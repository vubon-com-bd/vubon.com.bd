/**
 * OrderShippingVO — Unit Tests
 * @module order-service/test/unit/domain/value-objects/primitives
 */
import { describe, it, expect } from '@jest/globals';
import { OrderShippingVO } from '@domain/primitives/order-shipping.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

describe('OrderShippingVO', () => {
  describe('create', () => {
    it('creates with amount + currency', () => {
      const vo = OrderShippingVO.create(100, 'BDT');
      expect(vo.amount).toBe(100);
      expect(vo.currency).toBe('BDT');
      expect(vo.method).toBeUndefined();
    });

    it('creates with optional method', () => {
      const vo = OrderShippingVO.create(100, 'BDT', 'express');
      expect(vo.method).toBe('express');
    });

    it('throws for negative amount', () => {
      expect(() => OrderShippingVO.create(-10, 'BDT')).toThrow(ValidationError);
    });

    it('throws for invalid currency', () => {
      expect(() => OrderShippingVO.create(100, 'XYZ')).toThrow(ValidationError);
    });
  });

  describe('free factory', () => {
    it('creates zero shipping', () => {
      const vo = OrderShippingVO.free('BDT');
      expect(vo.amount).toBe(0);
      expect(vo.isFree()).toBe(true);
    });

    it('accepts method in free factory', () => {
      const vo = OrderShippingVO.free('BDT', 'pickup');
      expect(vo.method).toBe('pickup');
    });
  });

  describe('isFree', () => {
    it('true when amount is 0', () => {
      expect(OrderShippingVO.free('BDT').isFree()).toBe(true);
    });

    it('false when amount > 0', () => {
      expect(OrderShippingVO.create(50, 'BDT').isFree()).toBe(false);
    });
  });
});
