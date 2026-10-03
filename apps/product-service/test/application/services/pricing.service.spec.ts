/**
 * PricingService — unit tests
 */
import { jest } from '@jest/globals';
import { PricingService } from '../../../src/module/application/services/impl/pricing.service.js';
import { PricingNotFoundApplicationError } from '../../../src/module/application/errors/pricing.errors.js';
import { createMockPricingRepository, type MockedPricingRepository } from '../../mocks/repositories.js';
import { buildPricing } from '../../fixtures.js';
import { DEFAULT_CURRENCY, PRODUCT_ID, USER_ID } from '../../helpers.js';
import { PriceVO } from '../../../src/module/domain/value-objects/primitives/price.vo.js';

describe('PricingService', () => {
  let service: PricingService;
  let repo: MockedPricingRepository;

  beforeEach(() => {
    repo = createMockPricingRepository();
    repo.save.mockImplementation(async (e) => e);
    service = new PricingService(repo);
  });

  describe('update()', () => {
    it('should update selling price', async () => {
      const pricing = buildPricing();
      repo.findById.mockResolvedValueOnce(pricing);

      const result = await service.update({
        pricingId: 'p-1',
        sellingPrice: 800,
        updatedBy: USER_ID,
      });
      expect(result.sellingPrice).toBe(800);
    });

    it('should throw for missing pricing', async () => {
      repo.findById.mockResolvedValueOnce(null);
      await expect(
        service.update({ pricingId: 'missing', updatedBy: USER_ID }),
      ).rejects.toThrow(PricingNotFoundApplicationError);
    });
  });

  describe('getByProduct()', () => {
    it('should return null when not found', async () => {
      repo.findByProductId.mockResolvedValueOnce(null);
      expect(await service.getByProduct(PRODUCT_ID)).toBeNull();
    });

    it('should return pricing DTO', async () => {
      repo.findByProductId.mockResolvedValueOnce(buildPricing());
      const result = await service.getByProduct(PRODUCT_ID);
      expect(result?.sellingPrice).toBe(1000);
    });
  });

  describe('applyDiscount()', () => {
    it('should apply discount and save', async () => {
      const pricing = buildPricing({
        basePrice: PriceVO.create(1000, DEFAULT_CURRENCY),
        sellingPrice: PriceVO.create(1000, DEFAULT_CURRENCY),
      });
      repo.findByProductId.mockResolvedValueOnce(pricing);

      const result = await service.applyDiscount(PRODUCT_ID, 25, USER_ID);
      expect(result.sellingPrice).toBe(750);
    });

    it('should throw if pricing not found', async () => {
      repo.findByProductId.mockResolvedValueOnce(null);
      await expect(
        service.applyDiscount(PRODUCT_ID, 10, USER_ID),
      ).rejects.toThrow(PricingNotFoundApplicationError);
    });
  });

  describe('removeDiscount()', () => {
    it('should restore base price', async () => {
      const pricing = buildPricing({
        basePrice: PriceVO.create(1000, DEFAULT_CURRENCY),
        sellingPrice: PriceVO.create(700, DEFAULT_CURRENCY),
      });
      repo.findByProductId.mockResolvedValueOnce(pricing);

      const result = await service.removeDiscount(PRODUCT_ID, USER_ID);
      expect(result.sellingPrice).toBe(1000);
    });
  });

  describe('quotePrice()', () => {
    it('should quote for quantity', async () => {
      repo.findByProductId.mockResolvedValueOnce(
        buildPricing({ sellingPrice: PriceVO.create(100, DEFAULT_CURRENCY) }),
      );
      const result = await service.quotePrice(PRODUCT_ID, 5);
      expect(result.subtotal).toBe(500);
      expect(result.total).toBe(500);
      expect(result.currency).toBe(DEFAULT_CURRENCY);
    });
  });
});
