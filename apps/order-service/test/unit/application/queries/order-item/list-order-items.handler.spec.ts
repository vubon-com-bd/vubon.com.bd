import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { ListOrderItemsHandler } from '@application/queries/order-item/list-order-items.handler.js';
import { ListOrderItemsQuery } from '@application/queries/order-item/list-order-items.query.js';
import type { IOrderItemService } from '@application/services/interfaces/order-item.service.interface.js';
import { FIXTURE_ID } from '@fixtures/application/entity-factories.js';

describe('ListOrderItemsHandler', () => {
  let handler: ListOrderItemsHandler;
  let service: jest.Mocked<IOrderItemService>;
  beforeEach(() => {
    service = { listByOrder: jest.fn() } as unknown as jest.Mocked<IOrderItemService>;
    handler = new ListOrderItemsHandler(service);
  });
  it('delegates to service.listByOrder', async () => {
    service.listByOrder.mockResolvedValue({ items: [], total: 0 });
    await handler.execute(new ListOrderItemsQuery(FIXTURE_ID));
    expect(service.listByOrder).toHaveBeenCalledWith(FIXTURE_ID);
  });
});
