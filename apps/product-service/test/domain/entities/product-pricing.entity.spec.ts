/**
 * ProductPricingEntity — unit tests
 */
import { ProductPricingEntity } from '../../../src/module/domain/entities/product-pricing.entity.js';
import { PriceVO } from '../../../src/module/domain/value-objects/primitives/price.vo.js';
import { DiscountPercentVO } from '../../../src/module/domain/value-objects/primitives/discount-vo.js';
import { TaxRateVO } from '../../../src/module/domain/value-objects/primitives/tax-rate.vo.js';
import { buildPricing } from '../../fixtures.js';
import { DEFAULT_CURRENCY } from '../../helpers.js';

describe('ProductPricingEntity', () => {
  describe('invariants', () => {
    it('should reject sellingPrice > basePrice', () => {
      expect(() =>
        buildPricing({
          basePrice: PriceVO.create(100, DEFAULT_CURRENCY),
          sellingPrice: PriceVO.create(150, DEFAULT_CURRENCY),
        }),
      ).toThrow(Error);
    });
  });

  describe('changeBasePrice()', () => {
    it('should update base price', () => {
      const p = buildPricing();
      p.changeBasePrice(PriceVO.create(2000, DEFAULT_CURRENCY));
      expect(p.basePrice.amount).toBe(2000);
    });

    it('should reject base below selling', () => {
      const p = buildPricing({
        basePrice: PriceVO.create(1000, DEFAULT_CURRENCY),
        sellingPrice: PriceVO.create(800, DEFAULT_CURRENCY),
      });
      expect(() => p.changeBasePrice(PriceVO.create(500, DEFAULT_CURRENCY))).toThrow(Error);
    });
  });

  describe('changeSellingPrice()', () => {
    it('should update selling price', () => {
      const p = buildPricing();
      p.changeSellingPrice(PriceVO.create(800, DEFAULT_CURRENCY));
      expect(p.sellingPrice.amount).toBe(800);
    });

    it('should reject selling above base', () => {
      const p = buildPricing();
      expect(() => p.changeSellingPrice(PriceVO.create(9999, DEFAULT_CURRENCY))).toThrow(Error);
    });
  });

  describe('applyDiscount()', () => {
    it('should apply 20% discount to base price', () => {
      const p = buildPricing({
        basePrice: PriceVO.create(1000, DEFAULT_CURRENCY),
        sellingPrice: PriceVO.create(1000, DEFAULT_CURRENCY),
      });
      p.applyDiscount(DiscountPercentVO.create(20));
      expect(p.sellingPrice.amount).toBe(800);
      expect(p.discountPercent.value).toBe(20);
    });
  });

  describe('removeDiscount()', () => {
    it('should restore price to base price', () => {
      const p = buildPricing({
        basePrice: PriceVO.create(1000, DEFAULT_CURRENCY),
        sellingPrice: PriceVO.create(800, DEFAULT_CURRENCY),
        discountPercent: DiscountPercentVO.create(20),
      });
      p.removeDiscount();
      expect(p.sellingPrice.amount).toBe(1000);
      expect(p.discountPercent.value).toBe(0);
    });
  });

  describe('totalFor()', () => {
    it('should multiply selling price by quantity', () => {
      const p = buildPricing({ sellingPrice: PriceVO.create(100, DEFAULT_CURRENCY) });
      expect(p.totalFor(5)).toBe(500);
    });

    it('should reject non-positive quantity', () => {
      const p = buildPricing();
      expect(() => p.totalFor(0)).toThrow(Error);
      expect(() => p.totalFor(-1)).toThrow(Error);
    });
  });

  describe('finalPrice()', () => {
    it('returns selling price when tax inclusive', () => {
      const p = buildPricing({
        sellingPrice: PriceVO.create(1000, DEFAULT_CURRENCY),
        taxInclusive: true,
        taxRate: TaxRateVO.create(0.15),
      });
      expect(p.finalPrice()).toBe(1000);
    });

    it('adds tax when not inclusive', () => {
      const p = buildPricing({
        sellingPrice: PriceVO.create(1000, DEFAULT_CURRENCY),
        taxInclusive: false,
        taxRate: TaxRateVO.create(0.15),
      });
      expect(p.finalPrice()).toBe(1150);
    });
  });

  describe('profitMargin()', () => {
    it('returns 0 without cost', () => {
      const p = buildPricing();
      expect(p.profitMargin()).toBe(0);
    });

    it('calculates margin', () => {
      const p = buildPricing({
        sellingPrice: PriceVO.create(1000, DEFAULT_CURRENCY),
        costPrice: PriceVO.create(700, DEFAULT_CURRENCY),
      });
      expect(p.profitMargin()).toBe(30);
    });
  });

  describe('hasDiscount / effectiveDiscountPercent', () => {
    it('false without compareAtPrice', () => {
      const p = buildPricing();
      expect(p.hasDiscount()).toBe(false);
      expect(p.effectiveDiscountPercent()).toBe(0);
    });

    it('true when compareAt > selling', () => {
      const p = buildPricing({
        sellingPrice: PriceVO.create(800, DEFAULT_CURRENCY),
        compareAtPrice: PriceVO.create(1000, DEFAULT_CURRENCY),
      });
      expect(p.hasDiscount()).toBe(true);
      expect(p.effectiveDiscountPercent()).toBe(20);
    });
  });
});
