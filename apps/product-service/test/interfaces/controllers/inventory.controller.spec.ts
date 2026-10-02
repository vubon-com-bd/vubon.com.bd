/**
 * ProductInventoryController — unit tests
 */
import { jest } from '@jest/globals';
import { ProductInventoryController } from '../../../src/module/interfaces/controllers/rest/product-inventory.controller.js';
import { AdjustInventoryCommand } from '../../../src/module/application/commands/inventory/adjust-inventory.command.js';
import { ReserveInventoryCommand } from '../../../src/module/application/commands/inventory/reserve-inventory.command.js';
import { ReleaseInventoryCommand } from '../../../src/module/application/commands/inventory/release-inventory.command.js';
import { ListInventoryByProductQuery } from '../../../src/module/application/queries/inventory/list-inventory-by-product.query.js';
import { ListLowStockQuery } from '../../../src/module/application/queries/inventory/list-low-stock.query.js';
import { createMockCommandBus, createMockQueryBus, type MockedCommandBus, type MockedQueryBus } from '../../mocks/buses.js';
import { mockUser } from '../../mocks/users.js';
import { mockInventoryResponse } from '../../mocks/responses.js';
import { INVENTORY_ID, PRODUCT_ID, USER_ID } from '../../helpers.js';

describe('ProductInventoryController', () => {
  let controller: ProductInventoryController;
  let commandBus: MockedCommandBus;
  let queryBus: MockedQueryBus;

  beforeEach(() => {
    commandBus = createMockCommandBus();
    queryBus = createMockQueryBus();
    controller = new ProductInventoryController(commandBus, queryBus);
  });

  describe('lowStock', () => {
    it('should dispatch ListLowStockQuery', async () => {
      queryBus.execute.mockResolvedValueOnce([mockInventoryResponse()]);
      const result = await controller.lowStock();
      expect(queryBus.execute).toHaveBeenCalledWith(expect.any(ListLowStockQuery));
      expect(result.length).toBe(1);
    });
  });

  describe('listByProduct', () => {
    it('should dispatch ListInventoryByProductQuery', async () => {
      queryBus.execute.mockResolvedValueOnce([mockInventoryResponse()]);
      await controller.listByProduct(PRODUCT_ID);
      expect(queryBus.execute).toHaveBeenCalledWith(expect.any(ListInventoryByProductQuery));
    });
  });

  describe('adjust', () => {
    it('should dispatch AdjustInventoryCommand with delta, reason', async () => {
      commandBus.execute.mockResolvedValueOnce(mockInventoryResponse());

      await controller.adjust(
        INVENTORY_ID,
        { delta: 10, reason: 'restock', reference: 'PO-1' },
        mockUser() as never,
      );

      const cmd = commandBus.execute.mock.calls[0][0] as AdjustInventoryCommand;
      expect(cmd.dto.inventoryId).toBe(INVENTORY_ID);
      expect(cmd.dto.delta).toBe(10);
      expect(cmd.dto.reason).toBe('restock');
      expect(cmd.dto.adjustedBy).toBe(USER_ID);
    });
  });

  describe('reserve', () => {
    it('should dispatch ReserveInventoryCommand', async () => {
      commandBus.execute.mockResolvedValueOnce(mockInventoryResponse());

      await controller.reserve(INVENTORY_ID, { amount: 3, reference: 'ORDER-1' });

      const cmd = commandBus.execute.mock.calls[0][0] as ReserveInventoryCommand;
      expect(cmd.dto.amount).toBe(3);
      expect(cmd.dto.reference).toBe('ORDER-1');
    });
  });

  describe('release', () => {
    it('should dispatch ReleaseInventoryCommand', async () => {
      commandBus.execute.mockResolvedValueOnce(mockInventoryResponse());

      await controller.release(INVENTORY_ID, { amount: 3, reason: 'cancel' });

      const cmd = commandBus.execute.mock.calls[0][0] as ReleaseInventoryCommand;
      expect(cmd.dto.amount).toBe(3);
      expect(cmd.dto.reason).toBe('cancel');
    });
  });
});
