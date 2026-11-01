/**
 * ProductPriceService — Unit Tests
 * (BD VAT 15% + AIT 5% + margin)
 */
import { describe, it, expect } from '@jest/globals';
import { ProductPriceService } from '../../../../src/module/domain/services/product-price.service.js';

describe('ProductPriceService', () => {
  describe('applyDiscount()', () => {
    it('applies 10% discount', () => {
      const r = ProductPriceService.applyDiscount({
        basePrice: 1000,
        discountPercent: 10,
        currency: 'BDT',
      });
      expect(r.discountAmount).toBe(100);
      expect(r.finalPrice).toBe(900);
    });

    it('applies 0% discount', () => {
      const r = ProductPriceService.applyDiscount({
        basePrice: 1000,
        discountPercent: 0,
        currency: 'BDT',
      });
      expect(r.finalPrice).toBe(1000);
    });

    it('throws for >90% discount', () => {
      expect(() =>
        ProductPriceService.applyDiscount({
          basePrice: 1000,
          discountPercent: 95,
          currency: 'BDT',
        }),
      ).toThrow();
    });

    it('throws for negative discount', () => {
      expect(() =>
        ProductPriceService.applyDiscount({
          basePrice: 1000,
          discountPercent: -5,
          currency: 'BDT',
        }),
      ).toThrow();
    });
  });

  describe('calculateTax() — BD VAT 15%', () => {
    it('exclusive tax: net 1000 → vat 150', () => {
      const r = ProductPriceService.calculateTax({
        amount: 1000,
        currency: 'BDT',
        taxInclusive: false,
      });
      expect(r.netAmount).toBe(1000);
      expect(r.vat).toBe(150);
      expect(r.grossAmount).toBe(1150);
    });

    it('inclusive tax: gross 1150 → net 1000 + vat 150', () => {
      const r = ProductPriceService.calculateTax({
        amount: 1150,
        currency: 'BDT',
        taxInclusive: true,
      });
      expect(r.netAmount).toBe(1000);
      expect(r.vat).toBe(150);
    });

    it('AIT 5% applied when applyAit=true', () => {
      const r = ProductPriceService.calculateTax({
        amount: 1000,
        currency: 'BDT',
        taxInclusive: false,
        applyAit: true,
      });
      expect(r.ait).toBe(50);
    });

    it('USD exempt from VAT', () => {
      const r = ProductPriceService.calculateTax({
        amount: 100,
        currency: 'USD',
        taxInclusive: false,
      });
      expect(r.vat).toBe(0);
      expect(r.vatRate).toBe(0);
    });
  });

  describe('calculateMargin()', () => {
    it('cost 100 sell 150 → margin 50 (50%)', () => {
      const r = ProductPriceService.calculateMargin({
        costPrice: 100,
        sellingPrice: 150,
      });
      expect(r.marginAmount).toBe(50);
      expect(r.marginPercent).toBe(50);
      expect(r.isHealthy).toBe(true);
    });

    it('cost 100 sell 105 → margin 5, unhealthy', () => {
      const r = ProductPriceService.calculateMargin({
        costPrice: 100,
        sellingPrice: 105,
      });
      expect(r.marginPercent).toBe(5);
      expect(r.isHealthy).toBe(false);
    });
  });

  describe('effectiveDiscountPercent()', () => {
    it('compareAt 1200, sell 900 → 25%', () => {
      expect(ProductPriceService.effectiveDiscountPercent(1200, 900)).toBe(25);
    });

    it('sell >= compareAt → 0', () => {
      expect(ProductPriceService.effectiveDiscountPercent(1000, 1000)).toBe(0);
    });
  });
});
