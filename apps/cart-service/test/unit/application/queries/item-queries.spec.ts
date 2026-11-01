import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { ListItemsHandler } from '../../../../src/module/application/queries/item/list-items.handler.js';
import { ListItemsQuery } from '../../../../src/module/application/queries/item/list-items.query.js';
import { GetItemHandler } from '../../../../src/module/application/queries/item/get-item.handler.js';
import { GetItemQuery } from '../../../../src/module/application/queries/item/get-item.query.js';
import type { ICartItemService } from '../../../../src/module/application/services/interfaces/cart-item.service.interface.js';

const ITEM_ID = '123e4567-e89b-12d3-a456-426614174000';
const CART_ID = '223e4567-e89b-12d3-a456-426614174000';

function makeService(): jest.Mocked<ICartItemService> {
  return {
    add: jest.fn(), update: jest.fn(), updateQuantity: jest.fn(),
    remove: jest.fn(), select: jest.fn(), moveToSaved: jest.fn(),
    getById: jest.fn(), getPublic: jest.fn(),
    listByCart: jest.fn(), list: jest.fn(), countByCart: jest.fn(),
  } as unknown as jest.Mocked<ICartItemService>;
}

describe('Item Query Handlers', () => {
  let service: jest.Mocked<ICartItemService>;

  beforeEach(() => {
    service = makeService();
  });

  describe('ListItemsHandler', () => {
    it('should return paginated item list', async () => {
      service.list.mockResolvedValue({
        items: [], total: 0, page: 1, limit: 10, totalPages: 0,
      });

      const handler = new ListItemsHandler(service);
      const query = new ListItemsQuery({ page: 1, limit: 10 });
      const result = await handler.execute(query);

      expect(result.total).toBe(0);
      expect(service.list).toHaveBeenCalledWith({ page: 1, limit: 10 });
    });

    it('should pass filter options', async () => {
      service.list.mockResolvedValue({
        items: [], total: 0, page: 1, limit: 10, totalPages: 0,
      });

      const handler = new ListItemsHandler(service);
      const query = new ListItemsQuery({
        page: 1, limit: 10, filter: { cartId: CART_ID },
      });
      await handler.execute(query);

      expect(service.list).toHaveBeenCalledWith({
        page: 1, limit: 10, filter: { cartId: CART_ID },
      });
    });
  });

  describe('GetItemHandler', () => {
    it('should return item by id', async () => {
      service.getById.mockResolvedValue({ id: ITEM_ID } as never);

      const handler = new GetItemHandler(service);
      const query = new GetItemQuery(ITEM_ID);
      const result = await handler.execute(query);

      expect(result.id).toBe(ITEM_ID);
    });

    it('should have correct type', () => {
      const query = new GetItemQuery(ITEM_ID);
      expect(query.type).toBe('cart.item.get');
    });
  });
});
