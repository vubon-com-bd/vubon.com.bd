/**
 * Pricing Command Handlers — unit tests
 */
import { jest } from '@jest/globals';
import { UpdatePriceHandler } from '../../../../src/module/application/commands/pricing/update-price.handler.js';
import { UpdatePriceCommand } from '../../../../src/module/application/commands/pricing/update-price.command.js';
import { ApplyDiscountHandler } from '../../../../src/module/application/commands/pricing/apply-discount.handler.js';
import { ApplyDiscountCommand } from '../../../../src/module/application/commands/pricing/apply-discount.command.js';
import { RemoveDiscountHandler } from '../../../../src/module/application/commands/pricing/remove-discount.handler.js';
import { RemoveDiscountCommand } from '../../../../src/module/application/commands/pricing/remove-discount.command.js';
import { createMockPricingService, type MockedPricingService } from '../../../mocks/services.js';
import { USER_ID, PRODUCT_ID } from '../../../helpers.js';

describe('Pricing Command Handlers', () => {
  let service: MockedPricingService;

  beforeEach(() => {
    service = createMockPricingService();
    service.update.mockResolvedValue({} as never);
    service.applyDiscount.mockResolvedValue({} as never);
    service.removeDiscount.mockResolvedValue({} as never);
  });

  describe('UpdatePriceHandler', () => {
    it('should call service.update with dto', async () => {
      const handler = new UpdatePriceHandler(service);
      const dto = { pricingId: 'prcg-1', sellingPrice: 900, updatedBy: USER_ID };

      await handler.execute(new UpdatePriceCommand(dto as never));

      expect(service.update).toHaveBeenCalledWith(dto);
    });
  });

  describe('ApplyDiscountHandler', () => {
    it('should call service.applyDiscount with productId + percent + actorId', async () => {
      const handler = new ApplyDiscountHandler(service);

      await handler.execute(new ApplyDiscountCommand(PRODUCT_ID, 20, USER_ID));

      expect(service.applyDiscount).toHaveBeenCalledWith(PRODUCT_ID, 20, USER_ID);
    });
  });

  describe('RemoveDiscountHandler', () => {
    it('should call service.removeDiscount', async () => {
      const handler = new RemoveDiscountHandler(service);

      await handler.execute(new RemoveDiscountCommand(PRODUCT_ID, USER_ID));

      expect(service.removeDiscount).toHaveBeenCalledWith(PRODUCT_ID, USER_ID);
    });
  });
});
