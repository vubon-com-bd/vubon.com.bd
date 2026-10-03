/**
 * Pricing Query Handlers — unit tests
 */
import { jest } from '@jest/globals';
import { GetPricingByProductHandler } from '../../../../src/module/application/queries/pricing/get-pricing-by-product.handler.js';
import { GetPricingByProductQuery } from '../../../../src/module/application/queries/pricing/get-pricing-by-product.query.js';
import { QuotePriceHandler } from '../../../../src/module/application/queries/pricing/quote-price.handler.js';
import { QuotePriceQuery } from '../../../../src/module/application/queries/pricing/quote-price.query.js';
import { createMockPricingService, type MockedPricingService } from '../../../mocks/services.js';
import { PRODUCT_ID, DEFAULT_CURRENCY } from '../../../helpers.js';

describe('Pricing Query Handlers', () => {
  let service: MockedPricingService;

  beforeEach(() => {
    service = createMockPricingService();
    service.getByProduct.mockResolvedValue(null);
    service.quotePrice.mockResolvedValue({
      unitPrice: 100,
      subtotal: 500,
      taxAmount: 0,
      total: 500,
      currency: DEFAULT_CURRENCY,
    });
  });

  describe('GetPricingByProductHandler', () => {
    it('should return null when not found', async () => {
      const handler = new GetPricingByProductHandler(service);

      const result = await handler.execute(new GetPricingByProductQuery(PRODUCT_ID));

      expect(service.getByProduct).toHaveBeenCalledWith(PRODUCT_ID);
      expect(result).toBeNull();
    });
  });

  describe('QuotePriceHandler', () => {
    it('should call service.quotePrice', async () => {
      const handler = new QuotePriceHandler(service);

      const result = await handler.execute(new QuotePriceQuery(PRODUCT_ID, 5));

      expect(service.quotePrice).toHaveBeenCalledWith(PRODUCT_ID, 5);
      expect(result.total).toBe(500);
    });
  });
});
