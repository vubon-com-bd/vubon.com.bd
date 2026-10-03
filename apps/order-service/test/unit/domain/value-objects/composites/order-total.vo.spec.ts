import { OrderTotalsCompositeVO } from '../../../../../src/module/domain/value-objects/composites/order-total.vo.js';

describe('OrderTotalsCompositeVO', () => {
  describe('calculate()', () => {
    it('basic: subtotal=200, no discount/tax/shipping → total=200', () => {
      const totals = OrderTotalsCompositeVO.calculate({
        subtotal: 200,
        currency: 'BDT',
        itemCount: 2,
      });
      expect(totals.subtotal.amount).toBe(200);
      expect(totals.discount.amount).toBe(0);
      expect(totals.tax.amount).toBe(0);
      expect(totals.shipping.amount).toBe(0);
      expect(totals.total.amount).toBe(200);
    });

    it('with discount + tax + shipping', () => {
      const totals = OrderTotalsCompositeVO.calculate({
        subtotal: 200,
        currency: 'BDT',
        discountAmount: 20,
        taxRate: 0.1,
        shippingCost: 50,
        itemCount: 2,
      });
      // taxable=180, tax=18, total=180+18+50=248
      expect(totals.subtotal.amount).toBe(200);
      expect(totals.discount.amount).toBe(20);
      expect(totals.tax.amount).toBe(18);
      expect(totals.shipping.amount).toBe(50);
      expect(totals.total.amount).toBe(248);
    });

    it('caps discount at subtotal', () => {
      const totals = OrderTotalsCompositeVO.calculate({
        subtotal: 100,
        currency: 'BDT',
        discountAmount: 500,
        itemCount: 1,
      });
      expect(totals.discount.amount).toBe(100);
      expect(totals.total.amount).toBe(0);
    });
  });

  describe('empty()', () => {
    it('creates zero totals', () => {
      const totals = OrderTotalsCompositeVO.empty('BDT');
      expect(totals.subtotal.amount).toBe(0);
      expect(totals.total.amount).toBe(0);
      expect(totals.isEmpty).toBe(true);
    });
  });

  describe('getters', () => {
    it('taxableAmount = subtotal - discount', () => {
      const totals = OrderTotalsCompositeVO.calculate({
        subtotal: 200,
        currency: 'BDT',
        discountAmount: 30,
        itemCount: 2,
      });
      expect(totals.taxableAmount).toBe(170);
    });

    it('discountPercent', () => {
      const totals = OrderTotalsCompositeVO.calculate({
        subtotal: 100,
        currency: 'BDT',
        discountAmount: 25,
        itemCount: 1,
      });
      expect(totals.discountPercent).toBe(25);
    });

    it('hasFreeShipping', () => {
      const free = OrderTotalsCompositeVO.calculate({
        subtotal: 100,
        currency: 'BDT',
        itemCount: 1,
      });
      expect(free.hasFreeShipping).toBe(true);
    });

    it('hasDiscount', () => {
      const withD = OrderTotalsCompositeVO.calculate({
        subtotal: 100,
        currency: 'BDT',
        discountAmount: 10,
        itemCount: 1,
      });
      expect(withD.hasDiscount).toBe(true);
    });
  });
});
