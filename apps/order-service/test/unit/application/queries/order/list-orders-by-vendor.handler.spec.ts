import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { ListOrdersByVendorHandler } from '@application/queries/order/list-orders-by-vendor.handler.js';
import { ListOrdersByVendorQuery } from '@application/queries/order/list-orders-by-vendor.query.js';
import type { IOrderService } from '@application/services/interfaces/order.service.interface.js';
import { FIXTURE_ID_2 } from '@fixtures/application/entity-factories.js';

describe('ListOrdersByVendorHandler', () => {
  let handler: ListOrdersByVendorHandler;
  let service: jest.Mocked<IOrderService>;
  beforeEach(() => {
    service = { listByVendor: jest.fn() } as unknown as jest.Mocked<IOrderService>;
    handler = new ListOrdersByVendorHandler(service);
  });
  it('delegates to service.listByVendor', async () => {
    service.listByVendor.mockResolvedValue({ items: [], total: 0, page: 1, limit: 10, totalPages: 0 });
    const options = { page: 1, limit: 10 };
    await handler.execute(new ListOrdersByVendorQuery(FIXTURE_ID_2, options));
    expect(service.listByVendor).toHaveBeenCalledWith(FIXTURE_ID_2, options);
  });
});
