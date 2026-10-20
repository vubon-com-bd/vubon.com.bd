import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { ListDeliveriesHandler } from '@application/queries/delivery/list-deliveries.handler.js';
import { ListDeliveriesQuery } from '@application/queries/delivery/list-deliveries.query.js';
import type { IDeliveryService } from '@application/services/interfaces/delivery.service.interface.js';

describe('ListDeliveriesHandler', () => {
  let handler: ListDeliveriesHandler;
  let service: jest.Mocked<IDeliveryService>;
  beforeEach(() => {
    service = { list: jest.fn() } as unknown as jest.Mocked<IDeliveryService>;
    handler = new ListDeliveriesHandler(service);
  });
  it('delegates to service.list', async () => {
    service.list.mockResolvedValue({ items: [], total: 0, page: 1, limit: 10, totalPages: 0 });
    const options = { page: 1, limit: 10 };
    await handler.execute(new ListDeliveriesQuery(options));
    expect(service.list).toHaveBeenCalledWith(options);
  });
});
