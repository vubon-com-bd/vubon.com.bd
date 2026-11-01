import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { ListOrdersHandler } from '@application/queries/order/list-orders.handler.js';
import { ListOrdersQuery } from '@application/queries/order/list-orders.query.js';
import type { IOrderService } from '@application/services/interfaces/order.service.interface.js';

describe('ListOrdersHandler', () => {
  let handler: ListOrdersHandler;
  let service: jest.Mocked<IOrderService>;
  beforeEach(() => {
    service = { list: jest.fn() } as unknown as jest.Mocked<IOrderService>;
    handler = new ListOrdersHandler(service);
  });
  it('delegates to service.list', async () => {
    service.list.mockResolvedValue({ items: [], total: 0, page: 1, limit: 10, totalPages: 0 });
    const options = { page: 1, limit: 10 };
    await handler.execute(new ListOrdersQuery(options));
    expect(service.list).toHaveBeenCalledWith(options);
  });
});
