/**
 * OrderTotalService — Unit Tests
 */
import { describe, it, expect } from '@jest/globals';
import { OrderTotalService } from '@domain/services/order-total.service.js';
import { OrderItemPriceVO } from '@domain/primitives/order-item-price.vo.js';
import { OrderDiscountVO } from '@domain/primitives/order-discount.vo.js';
import { OrderTaxVO } from '@domain/primitives/order-tax.vo.js';
import { OrderShippingVO } from '@domain/primitives/order-shipping.vo.js';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';

const item = (amount: number, qty: number) => ({
  unitPrice: OrderItemPriceVO.create(amount, 'BDT'),
  quantity: qty,
});

describe('OrderTotalService', () => {
  describe('calculateSubtotal', () => {
    it('sums line totals', () => {
      const subtotal = OrderTotalService.calculateSubtotal(
        [item(100, 2), item(50, 3)],
        'BDT',
      );
      expect(subtotal.amount).toBe(350);
    });

    it('throws for empty items', () => {
      expect(() => OrderTotalService.calculateSubtotal([], 'BDT')).toThrow(BusinessRuleError);
    });

    it('throws for currency mismatch', () => {
      const badItem = {
        unitPrice: OrderItemPriceVO.create(100, 'USD'),
        quantity: 1,
      };
      expect(() => OrderTotalService.calculateSubtotal([badItem], 'BDT')).toThrow(
        BusinessRuleError,
      );
    });

    it('rounds to 2 decimals', () => {
      const subtotal = OrderTotalService.calculateSubtotal([item(33.333, 3)], 'BDT');
      expect(subtotal.amount).toBeCloseTo(100, 1);
    });
  });

  describe('calculate', () => {
    it('computes full breakdown', () => {
      const result = OrderTotalService.calculate({
        items: [item(1000, 1)],
        discount: OrderDiscountVO.create(100, 'BDT'),
        tax: OrderTaxVO.create(135, 'BDT', 0.15),
        shipping: OrderShippingVO.create(50, 'BDT'),
        currency: 'BDT',
      });
      expect(result.subtotal.amount).toBe(1000);
      expect(result.discount.amount).toBe(100);
      expect(result.tax.amount).toBe(135);
      expect(result.shipping.amount).toBe(50);
      expect(result.total.amount).toBe(1085); // 1000 - 100 + 135 + 50
    });

    it('defaults missing discount/tax/shipping to zero', () => {
      const result = OrderTotalService.calculate({
        items: [item(1000, 1)],
        currency: 'BDT',
      });
      expect(result.total.amount).toBe(1000);
    });

    it('throws when discount > subtotal', () => {
      expect(() =>
        OrderTotalService.calculate({
          items: [item(100, 1)],
          discount: OrderDiscountVO.create(200, 'BDT'),
          currency: 'BDT',
        }),
      ).toThrow(BusinessRuleError);
    });

    it('throws on discount currency mismatch', () => {
      expect(() =>
        OrderTotalService.calculate({
          items: [item(100, 1)],
          discount: OrderDiscountVO.create(10, 'USD'),
          currency: 'BDT',
        }),
      ).toThrow(BusinessRuleError);
    });
  });

  describe('verify', () => {
    it('true when total matches breakdown', () => {
      const result = OrderTotalService.calculate({
        items: [item(1000, 1)],
        currency: 'BDT',
      });
      const verified = OrderTotalService.verify(
        result.subtotal,
        result.discount,
        result.tax,
        result.shipping,
        result.total,
      );
      expect(verified).toBe(true);
    });

    it('false when total does not match', () => {
      const result = OrderTotalService.calculate({
        items: [item(1000, 1)],
        currency: 'BDT',
      });
      const verified = OrderTotalService.verify(
        result.subtotal,
        result.discount,
        result.tax,
        result.shipping,
        result.subtotal as unknown as typeof result.total,
      );
      // technically equal for this case — use different total:
      const wrongTotal = OrderTotalService.calculate({
        items: [item(100, 1)],
        currency: 'BDT',
      }).total;
      expect(
        OrderTotalService.verify(
          result.subtotal,
          result.discount,
          result.tax,
          result.shipping,
          wrongTotal,
        ),
      ).toBe(false);
    });
  });
});
