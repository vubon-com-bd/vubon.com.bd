import { jest } from '@jest/globals';
import { GetOrderItemHandler } from '../../../../src/module/application/queries/order-item/get-order-item.handler.js';
import { ListOrderItemsHandler } from '../../../../src/module/application/queries/order-item/list-order-items.handler.js';
import { GetOrderItemQuery } from '../../../../src/module/application/queries/order-item/get-order-item.query.js';
import { ORDER_ITEM_QUERY_HANDLERS } from '../../../../src/module/application/queries/order-item/index.js';
import { UUID_ITEM, UUID_ORDER, makeItem } from '../services/_helpers.js';

function mockService() {
  return {
    getById: jest.fn().mockResolvedValue(makeItem()),
    listByOrder: jest.fn().mockResolvedValue({ items: [] }),
  };
}

describe('OrderItem query handlers', () => {
  let service: ReturnType<typeof mockService>;
  beforeEach(() => { service = mockService(); });

  it('GetOrderItemHandler', async () => {
    const h = new GetOrderItemHandler(service as never);
    await h.execute(new GetOrderItemQuery(UUID_ITEM));
    expect(service.getById).toHaveBeenCalledWith(UUID_ITEM);
  });

  it('ListOrderItemsHandler', async () => {
    const h = new ListOrderItemsHandler(service as never);
    await h.execute({ orderId: UUID_ORDER } as never);
    expect(service.listByOrder).toHaveBeenCalled();
  });

  it('ORDER_ITEM_QUERY_HANDLERS exports 2', () => {
    expect(ORDER_ITEM_QUERY_HANDLERS).toHaveLength(2);
  });
});
