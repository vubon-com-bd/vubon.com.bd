/**
 * ProductVariantController — unit tests
 */
import { jest } from '@jest/globals';
import { ProductVariantController } from '../../../src/module/interfaces/controllers/rest/product-variant.controller.js';
import { AddVariantCommand } from '../../../src/module/application/commands/variant/add-variant.command.js';
import { UpdateVariantCommand } from '../../../src/module/application/commands/variant/update-variant.command.js';
import { RemoveVariantCommand } from '../../../src/module/application/commands/variant/remove-variant.command.js';
import { ListVariantsByProductQuery } from '../../../src/module/application/queries/variant/list-variants-by-product.query.js';
import { createMockCommandBus, createMockQueryBus, type MockedCommandBus, type MockedQueryBus } from '../../mocks/buses.js';
import { mockUser } from '../../mocks/users.js';
import { mockVariantResponse } from '../../mocks/responses.js';
import { PRODUCT_ID, VARIANT_ID, USER_ID } from '../../helpers.js';

describe('ProductVariantController', () => {
  let controller: ProductVariantController;
  let commandBus: MockedCommandBus;
  let queryBus: MockedQueryBus;

  beforeEach(() => {
    commandBus = createMockCommandBus();
    queryBus = createMockQueryBus();
    controller = new ProductVariantController(commandBus, queryBus);
  });

  describe('add', () => {
    it('should dispatch AddVariantCommand with productId injected', async () => {
      commandBus.execute.mockResolvedValueOnce(mockVariantResponse());

      await controller.add(
        PRODUCT_ID,
        { name: 'Red / L', sku: 'RED-L', type: 'color', options: [], price: 1200 } as never,
        mockUser() as never,
      );

      const cmd = commandBus.execute.mock.calls[0][0] as AddVariantCommand;
      expect(cmd.dto.productId).toBe(PRODUCT_ID);
      expect(cmd.actorId).toBe(USER_ID);
    });
  });

  describe('list', () => {
    it('should dispatch ListVariantsByProductQuery', async () => {
      queryBus.execute.mockResolvedValueOnce([mockVariantResponse()]);

      const result = await controller.list(PRODUCT_ID);

      expect(queryBus.execute).toHaveBeenCalledWith(expect.any(ListVariantsByProductQuery));
      expect(result.length).toBe(1);
    });
  });

  describe('update', () => {
    it('should dispatch UpdateVariantCommand with variantId + updatedBy', async () => {
      commandBus.execute.mockResolvedValueOnce(mockVariantResponse());

      await controller.update(VARIANT_ID, { price: 1500 }, mockUser() as never);

      const cmd = commandBus.execute.mock.calls[0][0] as UpdateVariantCommand;
      expect(cmd.dto.variantId).toBe(VARIANT_ID);
      expect(cmd.dto.updatedBy).toBe(USER_ID);
      expect(cmd.dto.price).toBe(1500);
    });
  });

  describe('remove', () => {
    it('should dispatch RemoveVariantCommand', async () => {
      commandBus.execute.mockResolvedValueOnce(undefined);
      await controller.remove(VARIANT_ID, mockUser() as never);
      const cmd = commandBus.execute.mock.calls[0][0] as RemoveVariantCommand;
      expect(cmd.variantId).toBe(VARIANT_ID);
    });
  });
});
