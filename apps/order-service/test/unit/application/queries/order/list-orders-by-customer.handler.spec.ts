import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { ListOrdersByCustomerHandler } from '@application/queries/order/list-orders-by-customer.handler.js';
import { ListOrdersByCustomerQuery } from '@application/queries/order/list-orders-by-customer.query.js';
import type { IOrderService } from '@application/services/interfaces/order.service.interface.js';
import { FIXTURE_ID_2 } from '@fixtures/application/entity-factories.js';

describe('ListOrdersByCustomerHandler', () => {
  let handler: ListOrdersByCustomerHandler;
  let service: jest.Mocked<IOrderService>;
  beforeEach(() => {
    service = { listByCustomer: jest.fn() } as unknown as jest.Mocked<IOrderService>;
    handler = new ListOrdersByCustomerHandler(service);
  });
  it('delegates to service.listByCustomer', async () => {
    service.listByCustomer.mockResolvedValue({ items: [], total: 0, page: 1, limit: 10, totalPages: 0 });
    const options = { page: 1, limit: 10 };
    await handler.execute(new ListOrdersByCustomerQuery(FIXTURE_ID_2, options));
    expect(service.listByCustomer).toHaveBeenCalledWith(FIXTURE_ID_2, options);
  });
});
