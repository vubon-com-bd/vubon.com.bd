/**
 * CartTotalsCompositeVO — Unit Tests
 */
import { CartTotalsCompositeVO } from '../../../../../src/module/domain/value-objects/composites/cart-totals.vo.js';

describe('CartTotalsCompositeVO', () => {
  describe('empty()', () => {
    it('creates empty totals for currency', () => {
      const vo = CartTotalsCompositeVO.empty('BDT');
      expect(vo.currency).toBe('BDT');
      expect(vo.itemCount).toBe(0);
      expect(vo.subtotal).toBe(0);
      expect(vo.grandTotal).toBe(0);
      expect(vo.isEmpty).toBe(true);
    });
  });

  describe('calculate()', () => {
    it('computes subtotal-only when no discounts/tax/shipping', () => {
      const vo = CartTotalsCompositeVO.calculate({
        currency: 'BDT',
        itemCount: 3,
        subtotal: 1000,
      });
      expect(vo.subtotal).toBe(1000);
      expect(vo.grandTotal).toBe(1000);
      expect(vo.taxAmount).toBe(0);
      expect(vo.shippingAmount).toBe(0);
    });

    it('applies item discounts before coupon', () => {
      const vo = CartTotalsCompositeVO.calculate({
        currency: 'BDT',
        itemCount: 2,
        subtotal: 1000,
        itemDiscounts: 100,
      });
      expect(vo.itemDiscounts).toBe(100);
      expect(vo.grandTotal).toBe(900);
    });

    it('applies coupon after item discounts', () => {
      const vo = CartTotalsCompositeVO.calculate({
        currency: 'BDT',
        itemCount: 2,
        subtotal: 1000,
        itemDiscounts: 100,
        couponDiscount: 200,
      });
      expect(vo.couponDiscount).toBe(200);
      expect(vo.grandTotal).toBe(700);
    });

    it('applies voucher after coupon', () => {
      const vo = CartTotalsCompositeVO.calculate({
        currency: 'BDT',
        itemCount: 2,
        subtotal: 1000,
        itemDiscounts: 100,
        couponDiscount: 200,
        voucherDiscount: 150,
      });
      expect(vo.voucherDiscount).toBe(150);
      expect(vo.grandTotal).toBe(550);
    });

    it('caps coupon discount at subtotal after item discounts', () => {
      const vo = CartTotalsCompositeVO.calculate({
        currency: 'BDT',
        itemCount: 2,
        subtotal: 500,
        itemDiscounts: 100,
        couponDiscount: 9999,
      });
      expect(vo.couponDiscount).toBe(400);
    });

    it('caps voucher discount at amount remaining after coupon', () => {
      const vo = CartTotalsCompositeVO.calculate({
        currency: 'BDT',
        itemCount: 2,
        subtotal: 500,
        itemDiscounts: 100,
        couponDiscount: 300,
        voucherDiscount: 9999,
      });
      expect(vo.voucherDiscount).toBe(100);
    });

    it('computes tax on post-discount amount', () => {
      const vo = CartTotalsCompositeVO.calculate({
        currency: 'BDT',
        itemCount: 1,
        subtotal: 1000,
        itemDiscounts: 0,
        taxRate: 15,
      });
      expect(vo.taxAmount).toBe(150);
      expect(vo.grandTotal).toBe(1150);
    });

    it('excludes tax when inclusive', () => {
      const vo = CartTotalsCompositeVO.calculate({
        currency: 'BDT',
        itemCount: 1,
        subtotal: 1000,
        taxRate: 15,
        taxInclusive: true,
      });
      expect(vo.taxAmount).toBe(0);
      expect(vo.grandTotal).toBe(1000);
    });

    it('adds shipping cost', () => {
      const vo = CartTotalsCompositeVO.calculate({
        currency: 'BDT',
        itemCount: 1,
        subtotal: 1000,
        shippingCost: 100,
      });
      expect(vo.shippingAmount).toBe(100);
      expect(vo.grandTotal).toBe(1100);
    });

    it('full flow — all discounts + tax + shipping', () => {
      const vo = CartTotalsCompositeVO.calculate({
        currency: 'BDT',
        itemCount: 5,
        subtotal: 2000,
        itemDiscounts: 200,
        couponDiscount: 300,
        voucherDiscount: 100,
        taxRate: 10,
        shippingCost: 50,
      });
      // afterItems = 1800
      // afterCoupon = 1500
      // afterVoucher = 1400
      // tax = 140
      // grand = 1400 + 140 + 50 = 1590
      expect(vo.subtotal).toBe(2000);
      expect(vo.itemDiscounts).toBe(200);
      expect(vo.couponDiscount).toBe(300);
      expect(vo.voucherDiscount).toBe(100);
      expect(vo.taxAmount).toBe(140);
      expect(vo.shippingAmount).toBe(50);
      expect(vo.grandTotal).toBe(1590);
    });

    it('rounds each value to 2 decimals', () => {
      const vo = CartTotalsCompositeVO.calculate({
        currency: 'BDT',
        itemCount: 1,
        subtotal: 100.567,
        taxRate: 10,
      });
      expect(vo.subtotal).toBe(100.57);
      expect(vo.taxAmount).toBe(10.06);
    });
  });

  describe('totalDiscounts getter', () => {
    it('sums item + coupon + voucher discounts', () => {
      const vo = CartTotalsCompositeVO.calculate({
        currency: 'BDT',
        itemCount: 1,
        subtotal: 1000,
        itemDiscounts: 100,
        couponDiscount: 50,
        voucherDiscount: 25,
      });
      expect(vo.totalDiscounts).toBe(175);
    });
  });

  describe('discountPercent getter', () => {
    it('computes discount percent of subtotal', () => {
      const vo = CartTotalsCompositeVO.calculate({
        currency: 'BDT',
        itemCount: 1,
        subtotal: 1000,
        itemDiscounts: 200,
      });
      expect(vo.discountPercent).toBe(20);
    });

    it('returns 0 for zero subtotal', () => {
      const vo = CartTotalsCompositeVO.empty('BDT');
      expect(vo.discountPercent).toBe(0);
    });
  });

  describe('hasDiscount()', () => {
    it('true when any discount exists', () => {
      const vo = CartTotalsCompositeVO.calculate({
        currency: 'BDT',
        itemCount: 1,
        subtotal: 1000,
        couponDiscount: 100,
      });
      expect(vo.hasDiscount()).toBe(true);
    });

    it('false when no discounts', () => {
      const vo = CartTotalsCompositeVO.calculate({
        currency: 'BDT',
        itemCount: 1,
        subtotal: 1000,
      });
      expect(vo.hasDiscount()).toBe(false);
    });
  });

  describe('hasFreeShipping()', () => {
    it('true when shipping is 0', () => {
      const vo = CartTotalsCompositeVO.calculate({
        currency: 'BDT',
        itemCount: 1,
        subtotal: 1000,
        shippingCost: 0,
      });
      expect(vo.hasFreeShipping()).toBe(true);
    });

    it('false when shipping > 0', () => {
      const vo = CartTotalsCompositeVO.calculate({
        currency: 'BDT',
        itemCount: 1,
        subtotal: 1000,
        shippingCost: 100,
      });
      expect(vo.hasFreeShipping()).toBe(false);
    });
  });

  describe('create()', () => {
    it('throws on negative numeric value', () => {
      expect(() =>
        CartTotalsCompositeVO.create({
          currency: 'BDT',
          itemCount: 1,
          subtotal: -1,
          itemDiscounts: 0,
          couponDiscount: 0,
          voucherDiscount: 0,
          taxAmount: 0,
          shippingAmount: 0,
          grandTotal: 0,
        }),
      ).toThrow();
    });
  });
});
