/**
 * Inventory Query Handlers — unit tests
 */
import { jest } from '@jest/globals';
import { ListInventoryByProductHandler } from '../../../../src/module/application/queries/inventory/list-inventory-by-product.handler.js';
import { ListInventoryByProductQuery } from '../../../../src/module/application/queries/inventory/list-inventory-by-product.query.js';
import { ListLowStockHandler } from '../../../../src/module/application/queries/inventory/list-low-stock.handler.js';
import { ListLowStockQuery } from '../../../../src/module/application/queries/inventory/list-low-stock.query.js';
import { createMockInventoryService, type MockedInventoryService } from '../../../mocks/services.js';
import { PRODUCT_ID } from '../../../helpers.js';

describe('Inventory Query Handlers', () => {
  let service: MockedInventoryService;

  beforeEach(() => {
    service = createMockInventoryService();
    service.listByProduct.mockResolvedValue([]);
    service.listLowStock.mockResolvedValue([]);
  });

  describe('ListInventoryByProductHandler', () => {
    it('should call service.listByProduct', async () => {
      const handler = new ListInventoryByProductHandler(service);

      const result = await handler.execute(new ListInventoryByProductQuery(PRODUCT_ID));

      expect(service.listByProduct).toHaveBeenCalledWith(PRODUCT_ID);
      expect(result).toEqual([]);
    });
  });

  describe('ListLowStockHandler', () => {
    it('should call service.listLowStock', async () => {
      const handler = new ListLowStockHandler(service);

      const result = await handler.execute(new ListLowStockQuery());

      expect(service.listLowStock).toHaveBeenCalled();
      expect(result).toEqual([]);
    });
  });
});
