/**
 * PriceCalculatorService — unit tests
 */
import { PriceCalculatorService } from '../../../src/module/domain/services/price-calculator.service.js';
import { ProductPricingEntity } from '../../../src/module/domain/entities/product-pricing.entity.js';
import { ProductIdVO } from '../../../src/module/domain/value-objects/primitives/product-id.vo.js';
import { PriceVO } from '../../../src/module/domain/value-objects/primitives/price.vo.js';
import { TaxRateVO } from '../../../src/module/domain/value-objects/primitives/tax-rate.vo.js';
import { DiscountPercentVO } from '../../../src/module/domain/value-objects/primitives/discount-vo.js';
import { buildPricing } from '../../fixtures.js';
import { NOW, PRODUCT_ID, DEFAULT_CURRENCY } from '../../helpers.js';
import { PRICING_TYPE } from '@vubon/shared-constants/business/product';

describe('PriceCalculatorService', () => {
  let service: PriceCalculatorService;

  beforeEach(() => {
    service = new PriceCalculatorService();
  });

  function makePricing(overrides: {
    selling?: number;
    base?: number;
    taxInclusive?: boolean;
    taxRate?: number;
  } = {}): ProductPricingEntity {
    return ProductPricingEntity.reconstitute({
      id: 'prcg-1',
      createdAt: NOW,
      updatedAt: NOW,
      props: {
        productId: ProductIdVO.create(PRODUCT_ID),
        type: PRICING_TYPE.FIXED,
        basePrice: PriceVO.create(overrides.base ?? 1000, DEFAULT_CURRENCY),
        sellingPrice: PriceVO.create(overrides.selling ?? 1000, DEFAULT_CURRENCY),
        taxRate: TaxRateVO.create(overrides.taxRate ?? 0),
        taxInclusive: overrides.taxInclusive ?? true,
        discountPercent: DiscountPercentVO.none(),
      },
    });
  }

  describe('quote()', () => {
    it('should return subtotal = unit price × quantity', () => {
      const pricing = makePricing({ selling: 100 });
      const quote = service.quote(pricing, 5);
      expect(quote.unitPrice).toBe(100);
      expect(quote.subtotal).toBe(500);
      expect(quote.taxAmount).toBe(0);
      expect(quote.total).toBe(500);
    });

    it('should add tax when not tax-inclusive', () => {
      const pricing = makePricing({ selling: 1000, taxInclusive: false, taxRate: 0.15 });
      const quote = service.quote(pricing, 1);
      expect(quote.taxAmount).toBe(150);
      expect(quote.total).toBe(1150);
    });

    it('should not add tax when tax-inclusive', () => {
      const pricing = makePricing({ selling: 1000, taxInclusive: true, taxRate: 0.15 });
      const quote = service.quote(pricing, 1);
      expect(quote.taxAmount).toBe(0);
      expect(quote.total).toBe(1000);
    });

    it('should throw for zero/negative quantity', () => {
      const pricing = makePricing();
      expect(() => service.quote(pricing, 0)).toThrow(Error);
      expect(() => service.quote(pricing, -1)).toThrow(Error);
    });

    it('should apply tier pricing when tier matches quantity', () => {
      const pricing = makePricing({ selling: 1000 });
      // PriceTier.unitPrice is Money (branded number)
      const tier = (qty: number, price: number) => ({ minQuantity: qty, unitPrice: price });
      const quote = service.quote(pricing, 10, [
        tier(1, 1000) as never,
        tier(5, 900) as never,
        tier(10, 800) as never,
      ]);
      expect(quote.unitPrice).toBe(800);
      expect(quote.subtotal).toBe(8000);
    });

    it('should include currency in quote', () => {
      const pricing = makePricing();
      const quote = service.quote(pricing, 1);
      expect(quote.currency).toBe(DEFAULT_CURRENCY);
    });
  });

  describe('calculateDiscountPercent()', () => {
    it('should calculate 20% discount', () => {
      expect(service.calculateDiscountPercent(1000, 800)).toBe(20);
    });

    it('should return 0 when selling >= base', () => {
      expect(service.calculateDiscountPercent(1000, 1000)).toBe(0);
      expect(service.calculateDiscountPercent(1000, 1500)).toBe(0);
    });

    it('should return 0 for zero base price', () => {
      expect(service.calculateDiscountPercent(0, 100)).toBe(0);
    });
  });

  void buildPricing;
});
