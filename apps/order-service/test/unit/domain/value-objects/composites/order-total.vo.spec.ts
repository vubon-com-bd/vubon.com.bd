/**
 * OrderTotalBreakdownVO — Unit Tests
 * @module order-service/test/unit/domain/value-objects/composites
 */
import { describe, it, expect } from '@jest/globals';
import { OrderTotalBreakdownVO } from '@domain/composites/order-total.vo.js';
import { OrderSubtotalVO } from '@domain/primitives/order-subtotal.vo.js';
import { OrderDiscountVO } from '@domain/primitives/order-discount.vo.js';
import { OrderTaxVO } from '@domain/primitives/order-tax.vo.js';
import { OrderShippingVO } from '@domain/primitives/order-shipping.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const subtotal = OrderSubtotalVO.create(1000, 'BDT');
const none = OrderDiscountVO.none('BDT');
const noTax = OrderTaxVO.none('BDT');
const freeShipping = OrderShippingVO.free('BDT');

describe('OrderTotalBreakdownVO', () => {
  describe('create', () => {
    it('creates with valid breakdown', () => {
      const vo = OrderTotalBreakdownVO.create({
        subtotal,
        discount: none,
        tax: noTax,
        shipping: freeShipping,
      });
      expect(vo.subtotal.amount).toBe(1000);
    });

    it('throws on currency mismatch', () => {
      expect(() =>
        OrderTotalBreakdownVO.create({
          subtotal,
          discount: OrderDiscountVO.none('USD'),
          tax: noTax,
          shipping: freeShipping,
        }),
      ).toThrow(ValidationError);
    });

    it('throws when discount > subtotal', () => {
      expect(() =>
        OrderTotalBreakdownVO.create({
          subtotal: OrderSubtotalVO.create(100, 'BDT'),
          discount: OrderDiscountVO.create(200, 'BDT'),
          tax: noTax,
          shipping: freeShipping,
        }),
      ).toThrow(ValidationError);
    });
  });

  describe('computeTotal', () => {
    it('returns subtotal - discount + tax + shipping', () => {
      const vo = OrderTotalBreakdownVO.create({
        subtotal: OrderSubtotalVO.create(1000, 'BDT'),
        discount: OrderDiscountVO.create(100, 'BDT'),
        tax: OrderTaxVO.create(150, 'BDT'),
        shipping: OrderShippingVO.create(50, 'BDT'),
      });
      expect(vo.computeTotal().amount).toBe(1100); // 1000 - 100 + 150 + 50
    });

    it('currency matches subtotal currency', () => {
      const vo = OrderTotalBreakdownVO.create({
        subtotal,
        discount: none,
        tax: noTax,
        shipping: freeShipping,
      });
      expect(vo.computeTotal().currency).toBe('BDT');
    });
  });

  describe('currency getter', () => {
    it('returns subtotal currency', () => {
      const vo = OrderTotalBreakdownVO.create({
        subtotal,
        discount: none,
        tax: noTax,
        shipping: freeShipping,
      });
      expect(vo.currency).toBe('BDT');
    });
  });
});
