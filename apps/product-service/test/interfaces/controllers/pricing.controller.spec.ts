import { jest } from '@jest/globals';
import { ProductPricingController } from '../../../src/module/interfaces/controllers/rest/product-pricing.controller.js';
import { UpdatePriceCommand } from '../../../src/module/application/commands/pricing/update-price.command.js';
import { ApplyDiscountCommand } from '../../../src/module/application/commands/pricing/apply-discount.command.js';
import { RemoveDiscountCommand } from '../../../src/module/application/commands/pricing/remove-discount.command.js';
import { GetPricingByProductQuery } from '../../../src/module/application/queries/pricing/get-pricing-by-product.query.js';
import { createMockCommandBus, createMockQueryBus, type MockedCommandBus, type MockedQueryBus } from '../../mocks/buses.js';
import { mockUser } from '../../mocks/users.js';
import { PRODUCT_ID, USER_ID } from '../../helpers.js';

describe('ProductPricingController', () => {
  let controller: ProductPricingController;
  let commandBus: MockedCommandBus;
  let queryBus: MockedQueryBus;

  beforeEach(() => {
    commandBus = createMockCommandBus();
    queryBus = createMockQueryBus();
    controller = new ProductPricingController(commandBus, queryBus);
  });

  it('getByProduct should dispatch GetPricingByProductQuery', async () => {
    queryBus.execute.mockResolvedValueOnce(null);
    await controller.getByProduct(PRODUCT_ID);
    expect(queryBus.execute).toHaveBeenCalledWith(expect.any(GetPricingByProductQuery));
  });

  it('update should dispatch UpdatePriceCommand with updatedBy', async () => {
    commandBus.execute.mockResolvedValueOnce({});
    await controller.update('prcg-1', { sellingPrice: 800 }, mockUser() as never);
    const cmd = commandBus.execute.mock.calls[0][0] as UpdatePriceCommand;
    expect(cmd.dto.pricingId).toBe('prcg-1');
    expect(cmd.dto.updatedBy).toBe(USER_ID);
  });

  it('applyDiscount should dispatch ApplyDiscountCommand', async () => {
    commandBus.execute.mockResolvedValueOnce({});
    await controller.applyDiscount(PRODUCT_ID, { discountPercent: 20 }, mockUser() as never);
    const cmd = commandBus.execute.mock.calls[0][0] as ApplyDiscountCommand;
    expect(cmd.productId).toBe(PRODUCT_ID);
    expect(cmd.discountPercent).toBe(20);
    expect(cmd.actorId).toBe(USER_ID);
  });

  it('removeDiscount should dispatch RemoveDiscountCommand', async () => {
    commandBus.execute.mockResolvedValueOnce({});
    await controller.removeDiscount(PRODUCT_ID, mockUser() as never);
    expect(commandBus.execute).toHaveBeenCalledWith(expect.any(RemoveDiscountCommand));
  });
});
