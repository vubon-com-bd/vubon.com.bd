import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { ListFulfillmentsHandler } from '@application/queries/fulfillment/list-fulfillments.handler.js';
import { ListFulfillmentsQuery } from '@application/queries/fulfillment/list-fulfillments.query.js';
import type { IOrderFulfillmentService } from '@application/services/interfaces/order-fulfillment.service.interface.js';

describe('ListFulfillmentsHandler', () => {
  let handler: ListFulfillmentsHandler;
  let service: jest.Mocked<IOrderFulfillmentService>;
  beforeEach(() => {
    service = { list: jest.fn() } as unknown as jest.Mocked<IOrderFulfillmentService>;
    handler = new ListFulfillmentsHandler(service);
  });
  it('delegates to service.list', async () => {
    service.list.mockResolvedValue({ items: [], total: 0, page: 1, limit: 10, totalPages: 0 });
    await handler.execute(new ListFulfillmentsQuery({ page: 1, limit: 10 }));
    expect(service.list).toHaveBeenCalled();
  });
});
